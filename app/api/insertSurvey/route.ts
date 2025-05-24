import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { handle, keyHub, minTime, survey } = body;

    const forwarded = req.headers.get("x-forwarded-for");

    const clientIp = forwarded ? forwarded.split(",")[0].trim() : null;

    const address = clientIp ? clientIp.replace("::ffff:", "") : "";

    const url =
      process.env.INSERT_SURVEY_URL ?? "http://localhost:3002/users/insertSurvey";
   
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type:"createSurvey",
        address,
        handle,
        minTime,
        survey,
        keyHub,
      }),
    });

    if (!response.ok) {
      throw new Error();
    } else {
      await response.json();
      return NextResponse.json({ msg: "ok" });
    }
  } catch (error) {
    return NextResponse.json({ msg: "error" });
  }
}
