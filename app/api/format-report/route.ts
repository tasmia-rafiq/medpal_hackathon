import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a medical report formatter. Clean and convert OCR-extracted medical report text into a structured format, preferably like a readable table or organized list. Only include the formatted result.",
        },
        {
          role: "user",
          content: text,
        },
      ],
    });

    const formatted = completion.choices?.[0]?.message?.content?.trim();

    if (!formatted) {
      return NextResponse.json({ success: false, error: "No formatted text from OpenAI" });
    }

    return NextResponse.json({ success: true, formatted });
  } catch (error) {
    console.error("OpenAI API Error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch from OpenAI" }, { status: 500 });
  }
}