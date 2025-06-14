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

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "";

    // Limite com IP ou token fixo
    await limiter.check(ip, 20, "CACHE_TOKEN"); // <- provavelmente precisa do IP aqui

    const body = await req.json();
    const { handle, keyHub } = body;

    const address = ip.replace("::ffff:", "");

    const url =
      process.env.END_SURVEY_URL ?? "http://localhost:3002/users/endSurvey";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "createSurvey",
        address,
        handle,
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
