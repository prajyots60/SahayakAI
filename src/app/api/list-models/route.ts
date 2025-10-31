import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Gemini API key not configured" },
      { status: 500 }
    );
  }

  try {
    // The REST API endpoint for listing models
    const url = "https://generativelanguage.googleapis.com/v1beta/models";
    const response = await fetch(`${url}?key=${apiKey}`);

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(
        `Failed to list models: ${response.status} ${response.statusText} - ${errorBody}`
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error listing models:", error);
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json(
      {
        error: "Failed to list models",
        details: errorMessage,
      },
      { status: 500 }
    );
  }
}
