import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { evaluations } from "@/lib/db/schema";
import { v4 as uuidv4 } from "uuid";

// Mock Neuro API endpoint
const NEURO_API_BASE_URL = process.env.NEURO_API_BASE_URL || "http://localhost:8080/v1";

export async function POST(req: Request) {
  try {
    const { reasoningId, metrics } = await req.json();

    if (!reasoningId || !metrics || !Array.isArray(metrics)) {
      return new NextResponse("Missing required fields: reasoningId, metrics (array)", { status: 400 });
    }

    // 1. Call Neuro POST /v1/eval
    const neuroEvalResponse = await fetch(`${NEURO_API_BASE_URL}/eval`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.NEURO_API_KEY}`, // Securely use API key
      },
      body: JSON.stringify({ reasoningId, metrics }),
    });

    if (!neuroEvalResponse.ok) {
      const errorData = await neuroEvalResponse.json();
      console.error("Neuro Eval API Error:", errorData);
      return new NextResponse(`Neuro Eval API error: ${errorData.message || neuroEvalResponse.statusText}`, { status: neuroEvalResponse.status });
    }

    const neuroEvalData = await neuroEvalResponse.json();
    const { evalId, scores } = neuroEvalData;

    // 2. Persist the evaluation result
    const newEvaluations = scores.map((score: any) => ({
      id: uuidv4(), // Generate a new UUID for each evaluation entry
      evalId,
      reasoningId,
      metric: score.metric,
      score: score.score,
      explanation: score.explanation || "", // Neuro API might not always return explanation
      timestamp: new Date(),
    }));

    await db.insert(evaluations).values(newEvaluations);

    return NextResponse.json({ evalId, scores });
  } catch (error) {
    console.error("Error in /api/neuro/eval:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
