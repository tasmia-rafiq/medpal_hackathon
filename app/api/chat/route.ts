import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  try {
    const { question 
      // ,user_id
     } = await req.json();

    if (!question 
      // || !user_id
    ) {
      return NextResponse.json({ error: "Missing question or user_id" }, { status: 400 });
    }

    const response = await axios.post("http://localhost:8000/chat", {
      question,
      // user_id,
    });

    return NextResponse.json(response.data);
  } catch (err) {
    console.error("Chat error:", err);
    return NextResponse.json({ error: "Chat failed" }, { status: 500 });
  }
}
