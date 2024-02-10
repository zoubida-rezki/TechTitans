import connecttoDB from "@/database";
import { NextResponse } from "next/server";
import About from "@/models/About";

export const dynamic ="force-dynamic"

export async function PUT(req){
    try {
        await connecttoDB()
        const extractData = await req.json()
        const{_id,aboutme,noofprojects,yearofexperience,noofclients,skills} = extractData
        const updateData = await About.findOneAndUpdate({
            _id : _id
        },
        {aboutme,noofprojects,yearofexperience,noofclients,skills},
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

