import { NextResponse } from "next/server";

export async function GET() {
  const stream = new ReadableStream({
    start(controller) {
      const enc = new TextEncoder();
      const send = (data: string) => controller.enqueue(enc.encode(`data: ${data}\n\n`));
      send(JSON.stringify({ type: "connected" }));
      const iv = setInterval(() => send(JSON.stringify({ type: "ping", t: Date.now() })), 25000);
      // @ts-ignore
      (controller as any)._iv = iv;
    },
    cancel() {},
  });
  return new NextResponse(stream, { headers: { "Content-Type": "text/event-stream", "Cache-Control": "no-cache", Connection: "keep-alive" } });
}