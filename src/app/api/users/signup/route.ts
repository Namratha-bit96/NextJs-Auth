import { connect } from "../../../../dbConfig/dbConfig";
import User from "../../../../model/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendMail } from "../../../../helpers/mailer";


connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password, username } = reqBody;

    console.log("Received data:", reqBody);

    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "Email already exists" }, { status: 400 });
    }

    
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    console.log("Saved user:", savedUser);

    
    await sendMail({
      email,
      emailtype: "VERIFY",
      user: savedUser,
    });

    return NextResponse.json({ message: "User created successfully" }, { status: 201 });

  } catch (error: unknown) {
    let message = 'Unknown error';
    if (error instanceof Error) {
      message = error.message;
    }
    console.error("Signup error:", error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
