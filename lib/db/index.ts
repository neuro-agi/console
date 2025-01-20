// import "@/lib/db/config";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { users, reasoningLogs, evaluations } from "./schema";
import * as schema from "./schema";

export type User = InferSelectModel<typeof users>;
export type NewUser = InferInsertModel<typeof users>;

export type ReasoningLog = InferSelectModel<typeof reasoningLogs>;
export type NewReasoningLog = InferInsertModel<typeof reasoningLogs>;

export type Evaluation = InferSelectModel<typeof evaluations>;
export type NewEvaluation = InferInsertModel<typeof evaluations>;

export const db = drizzle(sql, { schema });
