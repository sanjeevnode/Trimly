import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, name } = body;

    if (!email || !password || !name) {
      return new NextResponse("Missing Info", {
        status: 400,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = {
      email,
      name,
      hashedPassword,
    };

    return NextResponse.json(user);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log("REGISTRATION ERROR", error);
    return new NextResponse(error.message, {
      status: 500,
    });
  }
}
