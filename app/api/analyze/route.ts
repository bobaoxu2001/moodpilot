import { NextResponse } from "next/server";
import { analyzeMessage } from "@/lib/analyzeMessage";
import type { AnalyzeRequest } from "@/lib/analyzeMessage";

const MAX_MESSAGE_LENGTH = 5_000;
const MAX_CONTEXT_LENGTH = 1_000;
const VALID_TONES = new Set(["warm", "direct", "professional", "boundary"]);
const WINDOW_MS = 60_000;
const REQUESTS_PER_WINDOW = 30;
const requestWindows = new Map<string, { count: number; resetAt: number }>();

export async function POST(request: Request) {
  let body: Partial<AnalyzeRequest>;

  if (!request.headers.get("content-type")?.toLowerCase().includes("application/json")) {
    return NextResponse.json(
      { error: "Content-Type must be application/json." },
      { status: 415 }
    );
  }

  const clientId = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  const now = Date.now();
  const currentWindow = requestWindows.get(clientId);
  if (!currentWindow || currentWindow.resetAt <= now) {
    requestWindows.set(clientId, { count: 1, resetAt: now + WINDOW_MS });
  } else if (currentWindow.count >= REQUESTS_PER_WINDOW) {
    return NextResponse.json(
      { error: "Too many requests. Please try again shortly." },
      { status: 429, headers: { "Retry-After": "60" } }
    );
  } else {
    currentWindow.count += 1;
  }

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Request body must be valid JSON." },
      { status: 400 }
    );
  }

  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!message) {
    return NextResponse.json(
      { error: "message is required." },
      { status: 400 }
    );
  }

  if (message.length > MAX_MESSAGE_LENGTH) {
    return NextResponse.json(
      { error: `message must be ${MAX_MESSAGE_LENGTH} characters or fewer.` },
      { status: 413 }
    );
  }

  const context = typeof body.context === "string" ? body.context.trim() : undefined;
  if (context && context.length > MAX_CONTEXT_LENGTH) {
    return NextResponse.json(
      { error: `context must be ${MAX_CONTEXT_LENGTH} characters or fewer.` },
      { status: 413 }
    );
  }

  if (body.preferredTone !== undefined && !VALID_TONES.has(body.preferredTone)) {
    return NextResponse.json({ error: "preferredTone is invalid." }, { status: 400 });
  }

  return NextResponse.json(
    analyzeMessage({
      message,
      context,
      preferredTone: body.preferredTone,
    })
  );
}
