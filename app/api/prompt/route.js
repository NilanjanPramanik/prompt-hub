import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (request) => {
    try {
        await connectToDB();

        const prompts = await Prompt.find({}).populate('creator');

        return new Response(JSON.stringify(prompts), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all prompts", { status: 500 })
    }
}

// export async function POST (req, res) {
    
//     try {
//         await connectToDB();
//         console.log(req)
//       const prompts = await Prompt.find({}).populate('prompt');
//     //   console.log(prompts)  
//       return new Response(JSON.stringify(prompts), {status: 200})
        
//     } catch (error) {
//         console.log(error);
//     }
// }