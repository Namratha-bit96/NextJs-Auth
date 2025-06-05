import {connect} from "@/dbConfig/dbConfig";
import User from "@/model/userModel";
import {NextRequest, NextResponse} from "next/server";
import bcryptjs from "bcryptjs";
import  axios  from "axios";
import { sendMail } from "@/helpers/mailer";




connect()

export async function POST(request: NextRequest) {
    try {
       const reqbody = await request.json()
       const {email,password,username} = reqbody

       console.log(reqbody);

       //Check if user already exists

       const user= await User.findOne({email})

       if(user){
           return NextResponse.json({error:"Email already exists"},{status:400})
       }

       //hash password
       const salt = await bcryptjs.genSalt(10);
       const hashedPassword = await bcryptjs.hash(password, salt);

       const newUser = new User({
        username,
        email,
        password:hashedPassword,
       })

       const savedUser = await newUser.save()
       console.log(savedUser);

       //send verification email
       const token = await sendMail({email,emailtype:"VERIFY",userID:savedUser._id})

       return NextResponse.json({message:"User created successfully"},{status:201})

    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }
}