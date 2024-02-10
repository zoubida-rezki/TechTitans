import mongoose from "mongoose";

export default async function connecttoDB(){
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("connected to mongodb")
    } catch (error) {
        console.log(error)
    }
}
