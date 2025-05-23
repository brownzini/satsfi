import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { handle } = body;

    const forwarded = req.headers.get("x-forwarded-for");

    const clientIp = forwarded 
      ? forwarded.split(",")[0].trim()
      : null;

    const address = clientIp 
      ? clientIp.replace("::ffff:", "")
      : "";

    const url = process.env.BG_REMOVE_URL ?? "http://localhost:3002/users/createUser/cqi13ioojdsx777";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ address, handle }),
    });

    if (!response.ok) {
        return NextResponse.json({ msg: "credential_error" });
    } else {
      const data = await response.json();
      return NextResponse.json({ msg: "ok" });
    }
  } catch (error) {
    return NextResponse.json({ msg: "error" });
  }
}
