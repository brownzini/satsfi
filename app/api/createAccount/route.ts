import { rateLimit } from "@/utils/middleware/rateLimit";
import { NextResponse } from "next/server";

export const config = {
  runtime: "edge",
  api: {
    bodyParser: {
      sizeLimit: "3kb",
    },
  },
};

const limiter = rateLimit({
  interval: 300 * 1000,
  uniqueTokenPerInterval: 500,
});

export async function POST(req: Request): Promise<Response> {
  try {
    const forwarded = req.headers.get("x-forwarded-for");
    const clientIp = forwarded ? forwarded.split(",")[0].trim() : "unknown_ip";
    const address = clientIp.replace("::ffff:", "");

    // Use o IP como token de limitação
    await limiter.check(address, 3, "CACHE_TOKEN");

    const body = await req.json();
    const { handle } = body;

    const url =
      process.env.CREATE_USER_URL ??
      "http://localhost:3002/users/createUser/cqi13ioojdsx777";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ address, handle }),
    });

    if (!response.ok) {
      return NextResponse.json({ msg: "Not_valid_req" }, { status: 401 });
    }

    await response.json();
    return NextResponse.json({ msg: "ok" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ msg: "Too many requests" }, { status: 429 });
  }
}
