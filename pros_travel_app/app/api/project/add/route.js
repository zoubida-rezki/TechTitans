import connecttoDB from "@/database";
import { NextResponse } from "next/server";
import Projects from "@/models/Projects";

export const dynamic = "force-dynamic"

export async function POST(req){
try {
    await connecttoDB();
    const extractData = await req.json();
    const saveData = await Projects.create(extractData);

    if(saveData){
        return NextResponse.json({
            success: true,
            message : 'Data saved'
        })
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