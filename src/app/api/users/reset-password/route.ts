import { NextRequest, NextResponse } from "next/server";
import User from "@/model/userModel";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const { token, password } = await req.json();

    const user = await User.findOne({
      resetToken: token,
      resetTokenExpire: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpire = undefined;

    await user.save();

    return NextResponse.json({ message: "Password reset successful", success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

