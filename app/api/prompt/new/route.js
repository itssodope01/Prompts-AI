import { connectToDB } from "@/utils/database";
import Prompt from "@/models/prompt";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const { userID, prompt, tag } = await req.json();

    await connectToDB();
    const newPrompt = new Prompt({
      creator: userID,
      prompt,
      tag,
    });
    await newPrompt.save();
    return NextResponse.json(
      { message: "Prompt created", prompt: newPrompt },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
