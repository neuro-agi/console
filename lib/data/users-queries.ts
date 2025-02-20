"use server";

import { db } from "../db";
import { users } from "../db/schema";
import { eq, sql } from "drizzle-orm";

/**
 * Get user by email
 */
export const getUserByEmail = async (email: string) => {
  const user = await db.query.users.findFirst({
    where: eq(users.email, email),
  });
  return user;
};

/**
 * Create a new user
 */
export const createUser = async (data: {
  email: string;
  password?: string;
  name?: string;
}) => {
  const newUser = await db.insert(users).values((data as any)).returning();
  return newUser[0];
};
