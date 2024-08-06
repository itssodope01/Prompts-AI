import { connectToDB } from "@/utils/database";
import Prompt from "@/models/prompt";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await connectToDB();

    const prompts = await Prompt.find({}).populate("creator");

    return NextResponse.json(prompts, { status: 200 }); // Return the array directly
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
