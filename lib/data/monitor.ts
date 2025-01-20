"use server";

import { db } from "../db";
import { authenticatedAction } from "./safe-action";
import { reasoningLogs } from "../db/schema";
import { eq, sql } from "drizzle-orm";

export const getReasoningLogs = authenticatedAction.action(
  async ({ ctx: { userId } }) => {
    const logs = await db
      .select()
      .from(reasoningLogs)
      .where(eq(reasoningLogs.userId, userId));
    return logs;
  }
);

export const getReasoningLogsSummary = authenticatedAction.action(
  async ({ ctx: { userId } }) => {
    const data = await db.execute(sql`
    WITH date_series AS (
        SELECT generate_series(
            date_trunc('day', now() - interval '1 month'),
            date_trunc('day', now()),
            '1 day'::interval
        ) AS date
    ),
    log_counts AS (
        SELECT
            date_trunc('day', "createdAt") AS date,
            COUNT(*)::int AS count
        FROM
            "reasoning_logs"
        WHERE
            "userId" = ${userId}
            AND "createdAt" >= now() - interval '1 month'
        GROUP BY
            date
    )
    SELECT
        to_char(ds.date, 'YYYY-MM-DD') AS date,
        COALESCE(lc.count, 0)::int AS count
    FROM
        date_series ds
    LEFT JOIN
        log_counts lc ON ds.date = lc.date
    ORDER BY
        ds.date;
    `);

    return data.rows as { date: string; count: number }[];
  }
);