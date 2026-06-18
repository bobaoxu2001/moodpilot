import { NextResponse } from "next/server";
import { analyzeMessage } from "@/lib/analyzeMessage";
import type { AnalyzeRequest } from "@/lib/analyzeMessage";

export async function POST(request: Request) {
  let body: Partial<AnalyzeRequest>;

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

  return NextResponse.json(
    analyzeMessage({
      message,
      context: typeof body.context === "string" ? body.context : undefined,
      preferredTone: body.preferredTone,
    })
  );
}
