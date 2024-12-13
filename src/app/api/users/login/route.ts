import { connect } from "@/app/dbconfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bycryptjs from "bcryptjs";
import jwt from "jsonwebtoken";


connect();

export async function POST(request:NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    const user = await User.findOne({email});

    if(!user){
      return NextResponse.json({error: "user doesnot exits create one"});
    }



    const validateUser = await bycryptjs.compare(password, user.password);
    if(!validateUser){
      return NextResponse.json({ error : "wrong Password."},{status:400});
    };
    const payload = {
      email: user.email,
      userId: user._id
      
    }

    const token = await jwt.sign(payload, process.env.TOKEN_SECRET,{expiresIn:'1d'});

    const response = NextResponse.json(user);

    response.cookies.set("token",token);
    return response;
    
    
  } catch (error) {
    return NextResponse.json({error},{status:500});
  }
}