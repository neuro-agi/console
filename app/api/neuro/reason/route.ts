import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { reasoningLogs } from "@/lib/db/schema";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const userId = session.user.id;

  const { query } = await request.json();

  if (!query) {
    return NextResponse.json({ error: "Query is required" }, { status: 400 });
  }

  // Simulate a call to an external reasoning API
  const startTime = Date.now();
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const endTime = Date.now();
  const latency = endTime - startTime;

  const response = {
    result: `This is a dummy response for the query: "${query}"`, 
    latency,
    cost: 0.01,
  };

  // Store the log in the database
  await db.insert(reasoningLogs).values({
    userId,
    query,
    response,
    latency,
    cost: 0.01,
  });

  return NextResponse.json(response);
}