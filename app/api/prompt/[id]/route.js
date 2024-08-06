import { connectToDB } from "@/utils/database";
import Prompt from "@/models/prompt";
import { NextResponse } from "next/server";

// Helper function to extract the prompt ID from the URL
const getPromptIdFromUrl = (url) => {
  return new URL(url).pathname.split("/").pop();
};

export const GET = async (req) => {
  try {
    await connectToDB();

    const promptId = getPromptIdFromUrl(req.url);
    const prompt = await Prompt.findById(promptId).populate("creator");

    if (!prompt) {
      return NextResponse.json(
        { message: "Prompt not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(prompt, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};

export const PATCH = async (req) => {
  const { prompt, tag } = await req.json();
  try {
    await connectToDB();

    const promptId = getPromptIdFromUrl(req.url);
    const existingPrompt = await Prompt.findById(promptId);

    if (!existingPrompt) {
      return NextResponse.json(
        { message: "Prompt not found" },
        { status: 404 }
      );
    }

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save();

    const updatedPrompt = await Prompt.findById(promptId).populate("creator");

    return NextResponse.json(updatedPrompt, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};

export const DELETE = async (req) => {
  try {
    await connectToDB();

    const promptId = getPromptIdFromUrl(req.url);
    if (!promptId) {
      console.error("Prompt ID not found in the request URL");
      return NextResponse.json(
        { message: "Prompt ID not found" },
        { status: 400 }
      );
    }

    const prompt = await Prompt.findById(promptId);
    if (!prompt) {
      console.error(`Prompt with ID ${promptId} not found`);
      return NextResponse.json(
        { message: "Prompt not found" },
        { status: 404 }
      );
    }

    await Prompt.deleteOne({ _id: promptId });
    console.log(`Prompt with ID ${promptId} successfully deleted`);
    return NextResponse.json({ message: "Prompt deleted" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting prompt:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
