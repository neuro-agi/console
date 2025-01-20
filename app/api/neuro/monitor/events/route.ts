import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { reasoningEvents, evaluations } from "@/lib/db/schema";
import { eq, like, desc, sql } from "drizzle-orm";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get("limit") || "10");
    const offset = parseInt(searchParams.get("offset") || "0");
    const userId = searchParams.get("userId");
    const model = searchParams.get("model");
    const search = searchParams.get("search"); // Fuzzy search query text
    const startTime = searchParams.get("startTime");
    const endTime = searchParams.get("endTime");

    let query = db.select().from(reasoningEvents).$dynamic();

    if (userId) {
      query = query.where(eq(reasoningEvents.userId, userId));
    }
    if (model) {
      query = query.where(eq(reasoningEvents.model, model));
    }
    if (search) {
      query = query.where(like(reasoningEvents.query, `%${search}%`));
    }
    if (startTime) {
      query = query.where(sql`${reasoningEvents.timestamp} >= ${new Date(startTime).toISOString()}`);
    }
    if (endTime) {
      query = query.where(sql`${reasoningEvents.timestamp} <= ${new Date(endTime).toISOString()}`);
    }

    const events = await query.orderBy(desc(reasoningEvents.timestamp)).limit(limit).offset(offset);

    // For each event, fetch its evaluations
    const eventsWithEvals = await Promise.all(
      events.map(async (event) => {
        const eventEvaluations = await db
          .select()
          .from(evaluations)
          .where(eq(evaluations.reasoningId, event.reasoningId));

        return {
          ...event,
          evalScores: eventEvaluations.map((e) => ({
            evalId: e.evalId,
            metric: e.metric,
            score: e.score,
            explanation: e.explanation,
          })),
        };
      })
    );

    return NextResponse.json(eventsWithEvals);
  } catch (error) {
    console.error("Error in /api/neuro/monitor/events:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
