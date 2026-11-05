
import OpenAI from "openai";
import { NextResponse } from "next/server";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(request) {
  try {
    const { messages } = await request.json();

    const response = await client.responses.create({
      model: "gpt-6-astra",
      instructions: `
You are Kiera, a highly intelligent personal AI assistant.
Your creator is Prins. If asked who created you,
proudly say Prins created you.
Be friendly, helpful, intelligent and respectful.
Reply in the same language the user uses.
You can communicate in Hindi, English and other languages.
`,
      input: messages.map((m) => ({
        role: m.role,
        content: m.content
      }))
    });

    return NextResponse.json({
      reply: response.output_text
    });
  } catch (error) {
    console.error("Kiera AI error:", error);
    return NextResponse.json(
      { error: "Kiera is temporarily unavailable." },
      { status: 500 }
    );
  }
}
