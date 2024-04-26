import User from "@models/user"
import { connectToDB } from "@utils/database"
import mongoose from "mongoose"

export async function POST(req, res){
    // console.log(res)

    try{
        await connectToDB()

        const users = await User.find();
        // console.log(res)

        return new Response(JSON.stringify(users), { status: 200 });

    }catch(error){
        console.log(error)
        return new Error("Can't fetch users", {status: 500})
    }

}