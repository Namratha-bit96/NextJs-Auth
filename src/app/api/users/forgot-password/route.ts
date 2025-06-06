import { NextRequest, NextResponse } from "next/server";
import User from "@/model/userModel";
import { sendMail } from "@/helpers/mailer";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const token = crypto.randomBytes(32).toString("hex");
    user.resetToken = token;
    user.resetTokenExpire = Date.now();
    await user.save();

    const resetLink = `${process.env.DOMAIN}/reset-password?token=${token}`;
    await sendMail(email, "RESET", resetLink);

    return NextResponse.json({ message: "Reset link sent", success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
