import User from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json();
    console.log("Received token:", token); // Log received token

    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpire: { $gt: Date.now() },
    });

    if (!user) {
      console.log("Invalid or expired token");
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
    }

    if (user.isVerified) {
      console.log("User already verified");
      return NextResponse.json({ message: "User already verified", success: true });
    }

    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpire = undefined;

    await user.save();

    return NextResponse.json({ message: "Email verified successfully", success: true });
  } catch (error: any) {
    console.error("Verification error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
