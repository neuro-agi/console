import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { reasoningEvents, evaluations } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  req: Request,
  { params }: { params: { reasoningId: string } }
) {
  try {
    const { reasoningId } = params;

    if (!reasoningId) {
      return new NextResponse("Missing reasoningId parameter", { status: 400 });
    }

    const event = await db.select().from(reasoningEvents).where(eq(reasoningEvents.reasoningId, reasoningId));

    if (!event || event.length === 0) {
      return new NextResponse("Reasoning event not found", { status: 404 });
    }

    const eventEvaluations = await db
      .select()
      .from(evaluations)
      .where(eq(evaluations.reasoningId, reasoningId));

    const eventDetail = {
      ...event[0],
      eval: eventEvaluations.map((e) => ({
        evalId: e.evalId,
        metric: e.metric,
        score: e.score,
        explanation: e.explanation,
      })),
    };

    return NextResponse.json(eventDetail);
  } catch (error) {
    console.error("Error in /api/neuro/monitor/reasoning/[reasoningId]:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
