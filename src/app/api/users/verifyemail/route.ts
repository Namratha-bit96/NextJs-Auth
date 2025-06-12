import { connect } from "@/dbConfig/dbConfig";
import User from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";

// Ensure DB is connected
connect();

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json();
    console.log("Received token:", token);

    if (!token) {
      return NextResponse.json({ error: "Token is required" }, { status: 400 });
    }

    // Look for a user with matching token and unexpired time
    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpire: { $gt: Date.now() },
    });

    if (!user) {
      console.log("Invalid or expired token");
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
    }

    // If already verified, no need to update again
    if (user.isVerified) {
      console.log("User already verified");
      return NextResponse.json({ message: "User already verified", success: true });
    }

    // Update verification status
    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpire = undefined;
    await user.save();

    console.log("User verified successfully");
    return NextResponse.json({ message: "Email verified successfully", success: true });
  } catch (error: any) {
    console.error("Verification error:", error.message);
    return NextResponse.json({ error: "Something went wrong during verification" }, { status: 500 });
  }
}
