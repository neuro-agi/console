import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { reasoningEvents } from "@/lib/db/schema";
import { v4 as uuidv4 } from "uuid";

// Mock Neuro API endpoint
const NEURO_API_BASE_URL = process.env.NEURO_API_BASE_URL || "http://localhost:8080/v1";

export async function POST(req: Request) {
  try {
    const { query, steps, model, userId } = await req.json();

    if (!query || !userId) {
      return new NextResponse("Missing required fields: query, userId", { status: 400 });
    }

    const startTime = Date.now();

    // 1. Call Neuro POST /v1/reason
    const neuroReasonResponse = await fetch(`${NEURO_API_BASE_URL}/reason`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.NEURO_API_KEY}`, // Securely use API key
      },
      body: JSON.stringify({ query, steps, model, userId }),
    });

    if (!neuroReasonResponse.ok) {
      const errorData = await neuroReasonResponse.json();
      console.error("Neuro API Error:", errorData);
      return new NextResponse(`Neuro API error: ${errorData.message || neuroReasonResponse.statusText}`, { status: neuroReasonResponse.status });
    }

    const neuroReasonData = await neuroReasonResponse.json();
    const latencyMs = Date.now() - startTime;

    const { reasoningId, finalAnswer, chain } = neuroReasonData;

    // Mock cost calculation
    const cost = (latencyMs / 1000) * 0.001; // Example cost: $0.001 per second

    // 2. Store minimal normalized record in Drizzle
    const newReasoningEvent = {
      reasoningId,
      userId,
      timestamp: new Date(),
      query,
      model: model || "default",
      stepsRequested: steps || 4,
      latencyMs,
      cost,
      finalAnswer,
      chain,
    };

    await db.insert(reasoningEvents).values(newReasoningEvent);

    // 3. Schedule automatic POST /v1/eval
    // In a real-world scenario, this would be an async job/message to avoid blocking the response
    // For this example, we'll call it directly.
    const evalResponse = await fetch(`${NEURO_API_BASE_URL}/eval`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.NEURO_API_KEY}`,
      },
      body: JSON.stringify({ reasoningId, metrics: ["faithfulness", "safety"] }),
    });

    if (!evalResponse.ok) {
      console.error("Failed to trigger Neuro evaluation:", await evalResponse.json());
      // Continue without evaluation if it fails, but log the error
    } else {
      const evalData = await evalResponse.json();
      // Store evaluation results (this will be handled by a separate API route or consumer in a real system)
      // For now, we'll just log it.
      console.log("Neuro Evaluation triggered and received:", evalData);
    }

    // 4. Ship events and eval results to monitoring (via message bus - conceptual here)
    // publishToMessageBus({ ...newReasoningEvent, eval: evalData.scores });

    return NextResponse.json(newReasoningEvent);
  } catch (error) {
    console.error("Error in /api/neuro/reason:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
