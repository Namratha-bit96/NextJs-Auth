import {connect} from "@/dbConfig/dbConfig";
import User from "@/model/userModel";
import {NextRequest, NextResponse} from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";


connect()

export async function POST(request: NextRequest) {
    try {
        const reqbody= await request.json()
        const {email,password} = reqbody

        console.log(reqbody);

        //Check if user exists

        const user= await User.findOne({email})

        if(!user){
            return NextResponse.json({error:"User not found"},{status:400})
        }
        
        //Check if password is correct

        const isPasswordCorrect = await bcryptjs.compare(password,user.password)

        if(!isPasswordCorrect){
            return NextResponse.json({error:"Incorrect password"},{status:400})
        }
        
        //Create  token Data

        const tokenData = {
            id:user._id,
            username:user.username,
            email:user.email,
        }

        //create token

        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!)

        const response = NextResponse.json({
            message: "Login successful",
            success : true
        })

        response.cookies.set("token",token,{
            httpOnly:true,
        
        })
        return response;
        
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
        
    }

}