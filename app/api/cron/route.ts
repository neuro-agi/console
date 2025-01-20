import type { NextRequest } from "next/server";

/**
 * Cron job placeholder
 */
export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }

  return Response.json({ success: true, message: "No action taken." });
}
