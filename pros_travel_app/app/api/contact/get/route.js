// import connecttoDB from "@/database";
// import { NextResponse } from "next/server";
// import Experience from "@/models/Experience";

// export const dynamic = "force-dynamic"

// export async function GET(req){
// try {
//     await connecttoDB();
//     const extractData = await Experience.find({});

//     if(extractData){
//         return NextResponse.json({
//             success: true,
//             data: extractData
//         });
//     }else{
// return NextResponse.json({
//         success: false,
//         message : 'something goes wrong try again'
//     });
//     }

// } catch (error) {
//     console.log(error)

//     return NextResponse.json({
//         success: false,
//         message : 'something goes wrong try again'
//     });
// }
// }