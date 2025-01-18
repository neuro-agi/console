import { NextResponse } from "next/server";
import {
  convertToCorrectTypes,
  generateDynamicSchema,
  validateAndParseData,
} from "@/lib/validation";
import { headers } from "next/headers";
import { createLead } from "@/lib/data/leads";
import { createLog } from "@/lib/data/logs";
import { getErrorMessage } from "@/lib/helpers/error-message";
import { constructBodyFromURLParameters } from "@/lib/helpers/construct-body";
import { getPostingEndpointById } from "@/lib/data/endpoints";
import {
  incrementLeadCount,
  getUserPlan,
  getLeadCount,
} from "@/lib/data/users";

/**
 * API route for posting a lead using POST
 */
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const headersList = headers();
    const authorization = headersList.get("authorization");

    if (!authorization || !authorization.startsWith("Bearer ")) {
      return NextResponse.json(
        { message: "Unauthorized. No valid bearer token provided." },
        { status: 401 }
      );
    }

    const token = authorization.split(" ")[1];
    const data = await request.json();
    const endpoint = await getPostingEndpointById(params.id);

    if (!endpoint)
      return NextResponse.json(
        { message: "Endpoint not found." },
        { status: 404 }
      );

    if (endpoint.token !== token) {
      return NextResponse.json(
        { message: "Unauthorized. Invalid token provided." },
        { status: 401 }
      );
    }

    if (!endpoint.enabled) {
      return NextResponse.json(
        { message: "Endpoint is disabled." },
        { status: 403 }
      );
    }

    const plan = await getUserPlan(params.id);
    const leadCount = await getLeadCount(params.id);

    let leadLimit: number;
    switch (plan) {
      case "free":
        leadLimit = 100;
        break;
      case "lite":
        leadLimit = 1000;
        break;
      case "pro":
        leadLimit = 10000;
        break;
      case "business":
        leadLimit = 50000;
        break;
      case "enterprise":
        leadLimit = 999999;
        break;
      default:
        leadLimit = 100; // Fallback to free tier limit
    }

    if (leadCount >= leadLimit) {
      return NextResponse.json(
        { message: "Lead limit reached." },
        { status: 429 }
      );
    }

    const schema = endpoint?.schema as GeneralSchema[];
    const dynamicSchema = generateDynamicSchema(schema);
    const parsedData = validateAndParseData(dynamicSchema, data);

    if (!parsedData.success) {
      createLog(
        "error",
        "http",
        JSON.stringify(parsedData.error.format()),
        endpoint.id
      );

      return NextResponse.json(
        { errors: parsedData.error.format() },
        { status: 400 }
      );
    }

    const leadId = await createLead(endpoint.id, parsedData.data);

    await createLog("success", "http", leadId, endpoint.id);
    await incrementLeadCount(params.id);

    return NextResponse.json({ success: true, id: leadId });
  } catch (error: unknown) {
    await createLog("error", "http", getErrorMessage(error), params.id);

    console.error(error);

    return NextResponse.json({ error: "An error occurred." }, { status: 500 });
  }
}

/**
 * API route for posting a lead using GET
 *
 * Only used when the user is posting via HTML form element
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const headersList = headers();
    const referer = headersList.get("referer");
    const { searchParams } = new URL(request.url);

    const endpoint = await getPostingEndpointById(params.id);

    if (!endpoint) {
      return NextResponse.json(
        { message: "Endpoint not found." },
        { status: 404 }
      );
    }

    if (!endpoint.enabled) {
      return NextResponse.json(
        { message: "Endpoint is disabled." },
        { status: 403 }
      );
    }

    const plan = await getUserPlan(params.id);
    const leadCount = await getLeadCount(params.id);

    let leadLimit: number;
    switch (plan) {
      case "free":
        leadLimit = 100;
        break;
      case "lite":
        leadLimit = 1000;
        break;
      case "pro":
        leadLimit = 10000;
        break;
      case "business":
        leadLimit = 50000;
        break;
      case "enterprise":
        leadLimit = 999999;
        break;
      default:
        leadLimit = 100; // Fallback to free tier limit
    }

    if (leadCount >= leadLimit) {
      return NextResponse.json(
        { message: "Lead limit reached." },
        { status: 429 }
      );
    }

    const rawData = constructBodyFromURLParameters(searchParams);
    const schema = endpoint?.schema as GeneralSchema[];
    const data = convertToCorrectTypes(rawData, schema);
    const dynamicSchema = generateDynamicSchema(schema);
    const parsedData = validateAndParseData(dynamicSchema, data);

    if (!parsedData.success) {
      createLog(
        "error",
        "http",
        JSON.stringify(parsedData.error.format()),
        endpoint.id
      );

      return NextResponse.redirect(
        new URL(endpoint?.failUrl || referer || "/fail")
      );
    }

    const leadId = await createLead(endpoint.id, parsedData.data);

    await createLog("success", "http", leadId, endpoint.id);
    await incrementLeadCount(params.id);

    return NextResponse.redirect(
      new URL(endpoint?.successUrl || referer || "/success")
    );
  } catch (error: unknown) {
    await createLog("error", "http", getErrorMessage(error), params.id);

    console.error(error);

    return NextResponse.json({ error: "An error occurred." }, { status: 500 });
  }
}
