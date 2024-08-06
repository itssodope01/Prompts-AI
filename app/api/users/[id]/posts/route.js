import { connectToDB } from "@/utils/database";
import Prompt from "@/models/prompt";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();

    const posts = await Prompt.find({
      creator: params.id,
    }).populate("creator");

    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
