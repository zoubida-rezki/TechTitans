import connecttoDB from "@/database";
import { NextResponse } from "next/server";
import Home from "@/models/Home";

export const dynamic ="force-dynamic"

export async function PUT(req){
    try {
        await connecttoDB()
        const extractData = await req.json()
        const{_id,heading,summary} = extractData
        const updateData = await Home.findOneAndUpdate({
            _id : _id
        },
        {heading,summary},
        {new: true}
        );
        if(updateData){
            return NextResponse.json({
                succcess: true,
                message : 'updated successfully'
            })
        }else{
            return NextResponse.json({
                succcess: false,
                message : 'something went wrong'
            })
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            succcess: false,
            message : 'something went wrong'
        })
    }
}

