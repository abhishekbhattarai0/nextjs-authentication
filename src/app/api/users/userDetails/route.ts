import { connect } from "@/app/dbconfig/dbConfig";
import User  from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();
export async function POST (request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { userId } = reqBody;
    
        const user = await User.findById({_id: userId});
    
        if(!user){
            return NextResponse.json({message: "User not found."}, {status: 400});
        }
    
        return NextResponse.json(user);
    } catch (error) {
        console.log("error from  getuser",error)
        return NextResponse.json({
            error: error.message
        })
    }
}