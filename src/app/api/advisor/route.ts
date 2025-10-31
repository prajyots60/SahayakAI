import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
  type GenerateContentResponse,
} from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

type ClientMessage = {
  role: "user" | "assistant";
  content: string;
};

const DEFAULT_MODEL = "gemini-pro-latest";
const SYSTEM_PROMPT = `You are SahayakAI, an AI co-pilot for Indian MSME founders.
Deliver concise, actionable advice rooted in best practices for finance, growth, and compliance.
Whenever possible, return structured steps, quick wins, and metrics the business should track.
Use plain English, keep the tone supportive and pragmatic, and avoid hallucinating data.`;

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
  },
];

export async function POST(req: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Gemini API key not configured" },
      { status: 500 }
    );
  }

  let body: { messages?: ClientMessage[]; model?: string };
  try {
    body = await req.json();
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid JSON payload" },
      { status: 400 }
    );
  }

  const conversation = Array.isArray(body.messages) ? body.messages : [];
  if (conversation.length === 0) {
    return NextResponse.json(
      { error: "At least one user message is required" },
      { status: 400 }
    );
  }

  const lastMessage = conversation[conversation.length - 1];
  if (lastMessage.role !== "user") {
    return NextResponse.json(
      { error: "The last message in the conversation must be from the user" },
      { status: 400 }
    );
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const modelName = body.model ?? DEFAULT_MODEL;

  const model = genAI.getGenerativeModel({
    model: modelName,
    systemInstruction: SYSTEM_PROMPT,
    safetySettings,
  });

  const requestContents = conversation.map((message) => ({
    role: message.role === "assistant" ? "model" : "user",
    parts: [{ text: message.content }],
  }));

  try {
    const generation = await model.generateContentStream({
      contents: requestContents,
    });

    const textEncoder = new TextEncoder();

    const readableStream = new ReadableStream<Uint8Array>({
      async start(controller) {
        let deliveredText = "";
        try {
          for await (const chunk of generation.stream) {
            console.log("Gemini chunk:", JSON.stringify(chunk, null, 2));
            const chunkText = extractText(chunk);
            if (!chunkText) {
              continue;
            }
            deliveredText += chunkText;
            controller.enqueue(
              textEncoder.encode(
                JSON.stringify({ type: "chunk", text: chunkText }) + "\n"
              )
            );
          }

          const finalResponse = await generation.response;
          console.log(
            "Gemini final response:",
            JSON.stringify(finalResponse, null, 2)
          );
          const finalText = extractText(finalResponse) || deliveredText;
          const sources = extractSources(finalResponse);

          controller.enqueue(
            textEncoder.encode(
              JSON.stringify({
                type: "final",
                text: finalText,
                sources,
              }) + "\n"
            )
          );
        } catch (error) {
          controller.enqueue(
            textEncoder.encode(
              JSON.stringify({
                type: "error",
                error: error instanceof Error ? error.message : String(error),
              }) + "\n"
            )
          );
        } finally {
          controller.close();
        }
      },
    });

    return new NextResponse(readableStream, {
      headers: {
        "Content-Type": "application/x-ndjson",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
        "Transfer-Encoding": "chunked",
      },
    });
  } catch (error) {
    console.error("Error communicating with Gemini API:", error);
    return NextResponse.json(
      {
        error: "Failed to generate response",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

function extractText(response: GenerateContentResponse | unknown): string {
  if (!response || typeof response !== "object") {
    return "";
  }

  const candidate = (response as GenerateContentResponse).candidates?.[0];
  if (!candidate || !candidate.content?.parts) {
    // Fallback for older response formats or cases where text() is available
    if ("text" in response && typeof (response as any).text === "function") {
      try {
        const computed = (response as any).text();
        if (typeof computed === "string") {
          return computed;
        }
      } catch (error) {
        console.warn("Failed to call response.text():", error);
      }
    }
    return "";
  }

  // Join the text from all parts
  return candidate.content.parts
    .map((part) => part.text)
    .filter(Boolean)
    .join("");
}

function extractSources(response: GenerateContentResponse | unknown): string[] {
  if (!response || typeof response !== "object") {
    return [];
  }

  const candidate = (response as GenerateContentResponse).candidates?.[0];
  const sourceParts = candidate?.content?.parts ?? [];

  const references = sourceParts
    .map((part) => {
      const metadata = (part as any)?.groundingMetadata;
      if (!metadata?.groundingChunks) {
        return [] as string[];
      }
      return metadata.groundingChunks
        .map((chunk: any) => chunk.web?.title ?? chunk.web?.uri)
        .filter(Boolean);
    })
    .flat();

  return Array.from(new Set(references));
}
