import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const POST = async (req) => {
  const { userId, prompt, tag } = await req.json();
  console.log(tag);
  console.log(typeof tag);
  console.log(Array.isArray(tag));
  try {
    await connectToDB();
    const newPrompt = new Prompt({
      creator: userId,
      prompt,
      tag,
    });

    console.log(newPrompt);
    await newPrompt.save();
    return new Response(JSON.stringify(newPrompt), { status: 200 });
  } catch (error) {
    console.error("Error creating prompt:", error);
    return new Response("Failed to create a new prompt!", { status: 500 });
  }
};
