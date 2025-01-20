import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { evaluations } from "@/lib/db/schema";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { logId, score, comment } = await request.json();

  if (!logId || !score) {
    return NextResponse.json(
      { error: "logId and score are required" },
      { status: 400 }
    );
  }

  await db.insert(evaluations).values({
    logId,
    score,
    comment,
  });

  return NextResponse.json({ success: true });
}
