import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  // Retrieve the client IP from common headers
  const forwarded = req.headers.get("x-forwarded-for");
  const realIp = req.headers.get("x-real-ip");
  
  let ip = "unknown";
  if (forwarded) {
    // x-forwarded-for can contain a comma-separated list of IPs. The client IP is the first one.
    ip = forwarded.split(",")[0].trim();
  } else if (realIp) {
    ip = realIp.trim();
  } else {
    // Fallback to NextRequest connection info if available (depends on runtime environment)
    const socketIp = (req as any).socket?.remoteAddress;
    if (socketIp) {
      ip = socketIp;
    }
  }

  return NextResponse.json({ ip });
}
