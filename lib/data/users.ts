"use server";

import { db } from "../db";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";
import { authenticatedAction } from "./safe-action";
import {
  getUserByEmail,
  createUser,
} from "./users-queries";

export {
  getUserByEmail,
  createUser,
};

/**
 * Retrieves the lead count for specific user
 *
 * Authenticated action
 */

export const getUsageForUser = authenticatedAction.action(
  async ({ ctx: { userId } }) => {
    const result = await db
      .select({ leadCount: (users as any).leadCount, plan: (users as any).plan })
      .from(users)
      .where(eq(users.id, userId));

    if (result.length === 0) {
      throw new Error("User not found");
    }

    return result[0];
  }
);
