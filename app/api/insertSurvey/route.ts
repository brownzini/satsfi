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

    // Corrigido: passa o IP como identificador
    limiter.check(address, 20, "CACHE_TOKEN");

    const body = await req.json();
    const { handle, keyHub, minTime, survey } = body;

    const url =
      process.env.INSERT_SURVEY_URL ??
      "http://localhost:3007/users/insertSurvey";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "createSurvey",
        address,
        handle,
        minTime,
        survey,
        keyHub,
      }),
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
