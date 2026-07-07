import { describe, expect, it } from "vitest";
import { POST } from "./route";

function request(body: unknown, contentType = "application/json") {
  return new Request("http://localhost/api/analyze", {
    method: "POST",
    headers: { "content-type": contentType },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

describe("POST /api/analyze", () => {
  it("accepts a valid request", async () => {
    const response = await POST(request({ message: "Can you send this today?", preferredTone: "direct" }));
    const payload = await response.json();

    expect(response.status).toBe(200);
    expect(payload.replies.direct).toBeTypeOf("string");
  });

  it("rejects unsupported content types", async () => {
    const response = await POST(request("message=hello", "text/plain"));
    expect(response.status).toBe(415);
  });

  it("rejects malformed JSON", async () => {
    const response = await POST(request("{"));
    expect(response.status).toBe(400);
  });

  it("rejects missing and oversized messages", async () => {
    expect((await POST(request({ message: "" }))).status).toBe(400);
    expect((await POST(request({ message: "x".repeat(5_001) }))).status).toBe(413);
  });

  it("rejects an invalid tone", async () => {
    const response = await POST(request({ message: "Hello", preferredTone: "angry" }));
    expect(response.status).toBe(400);
  });
});
