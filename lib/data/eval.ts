"use server";

import { db } from "../db";
import { authenticatedAction } from "./safe-action";
import { reasoningLogs, evaluations } from "../db/schema";
import { eq, notInArray, sql } from "drizzle-orm";

export const getUnevaluatedLogs = authenticatedAction.action(
  async ({ ctx: { userId } }) => {
    const evaluatedLogIds = await db
      .select({ logId: evaluations.logId })
      .from(evaluations);

    const logs = await db
      .select()
      .from(reasoningLogs)
      .where(eq(reasoningLogs.userId, userId))
      .where(
        notInArray(
          reasoningLogs.id,
          evaluatedLogIds.map((row) => row.logId)
        )
      );
    return logs;
  }
);

export const getEvaluations = authenticatedAction.action(
  async ({ ctx: { userId } }) => {
    const evals = await db
      .select()
      .from(evaluations)
      .innerJoin(reasoningLogs, eq(evaluations.logId, reasoningLogs.id))
      .where(eq(reasoningLogs.userId, userId));
    return evals;
  }
);

export const getEvaluationsSummary = authenticatedAction.action(
  async ({ ctx: { userId } }) => {
    const data = await db.execute(sql`
      SELECT
        score,
        COUNT(*)::int AS count
      FROM
        evaluations
      INNER JOIN
        reasoning_logs ON evaluations."logId" = reasoning_logs.id
      WHERE
        reasoning_logs."userId" = ${userId}
      GROUP BY
        score
      ORDER BY
        score;
    `);

    return data.rows as { score: number; count: number }[];
  }
);