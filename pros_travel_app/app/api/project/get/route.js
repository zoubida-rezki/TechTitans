import connecttoDB from "@/database";
import { NextResponse } from "next/server";
import Project from "@/models/Projects";

export const dynamic = "force-dynamic"

export async function GET(req){
try {
    await connecttoDB();
    const extractData = await Project.find({});

    if(extractData){
        return NextResponse.json({
            success: true,
            data: extractData
        });
    }else{
return NextResponse.json({
        success: false,
        message : 'something goes wrong try again'
    });
    }

} catch (error) {
    console.log(error)

    return NextResponse.json({
        success: false,
        message : 'something goes wrong try again'
    });
}
}