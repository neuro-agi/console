import { auth } from "@/lib/auth";

const NEURO_API_BASE_URL = process.env.NEXT_PUBLIC_NEURO_API_BASE_URL || "/api/neuro";

export async function getReasoningEvents(params?: {
  limit?: number;
  offset?: number;
  userId?: string;
  model?: string;
  search?: string;
  startTime?: string;
  endTime?: string;
}) {
  const session = await auth();
  if (!session?.user?.id) {
    return { data: [], serverError: "Unauthorized" };
  }

  const queryParams = new URLSearchParams();
  if (params?.limit) queryParams.append("limit", params.limit.toString());
  if (params?.offset) queryParams.append("offset", params.offset.toString());
  if (params?.userId) queryParams.append("userId", params.userId);
  if (params?.model) queryParams.append("model", params.model);
  if (params?.search) queryParams.append("search", params.search);
  if (params?.startTime) queryParams.append("startTime", params.startTime);
  if (params?.endTime) queryParams.append("endTime", params.endTime);

  try {
    const response = await fetch(`${NEURO_API_BASE_URL}/monitor/events?${queryParams.toString()}`, {
      headers: {
        // Potentially add authorization headers if the /api/neuro endpoints require them
        // "Authorization": `Bearer ${session.accessToken}`,
      },
      cache: "no-store", // Ensure fresh data
    });

    if (!response.ok) {
      const error = await response.json();
      return { data: [], serverError: error.message || "Failed to fetch reasoning events" };
    }

    const data = await response.json();
    return { data, serverError: null };
  } catch (error: any) {
    console.error("Error fetching reasoning events:", error);
    return { data: [], serverError: error.message || "Network error" };
  }
}

export async function getReasoningEventDetail(reasoningId: string) {
  const session = await auth();
  if (!session?.user?.id) {
    return { data: null, serverError: "Unauthorized" };
  }

  try {
    const response = await fetch(`${NEURO_API_BASE_URL}/monitor/reasoning/${reasoningId}`, {
      headers: {
        // Potentially add authorization headers if the /api/neuro endpoints require them
        // "Authorization": `Bearer ${session.accessToken}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      const error = await response.json();
      return { data: null, serverError: error.message || "Failed to fetch reasoning event detail" };
    }

    const data = await response.json();
    return { data, serverError: null };
  } catch (error: any) {
    console.error("Error fetching reasoning event detail:", error);
    return { data: null, serverError: error.message || "Network error" };
  }
}

export async function postReasoningQuery(payload: {
  query: string;
  steps?: number;
  model?: string;
  userId: string;
}) {
  const session = await auth();
  if (!session?.user?.id) {
    return { data: null, serverError: "Unauthorized" };
  }

  try {
    const response = await fetch(`${NEURO_API_BASE_URL}/reason`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // "Authorization": `Bearer ${session.accessToken}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const error = await response.json();
      return { data: null, serverError: error.message || "Failed to post reasoning query" };
    }

    const data = await response.json();
    return { data, serverError: null };
  } catch (error: any) {
    console.error("Error posting reasoning query:", error);
    return { data: null, serverError: error.message || "Network error" };
  }
}

export async function postEvaluation(payload: {
  reasoningId: string;
  metrics?: string[];
}) {
  const session = await auth();
  if (!session?.user?.id) {
    return { data: null, serverError: "Unauthorized" };
  }

  try {
    const response = await fetch(`${NEURO_API_BASE_URL}/eval`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // "Authorization": `Bearer ${session.accessToken}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const error = await response.json();
      return { data: null, serverError: error.message || "Failed to post evaluation" };
    }

    const data = await response.json();
    return { data, serverError: null };
  } catch (error: any) {
    console.error("Error posting evaluation:", error);
    return { data: null, serverError: error.message || "Network error" };
  }
}
