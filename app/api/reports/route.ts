import { connectToDatabase } from "@/lib/database";
import Report from "@/models/Report";
import User from "@/models/User"; // ✅ import User model
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { text, userEmail, formattedText, image } = await req.json();

    if (!text || !userEmail || !formattedText || !image) {
      console.log("Missing text or userEmail or formattedText or image:", { text, userEmail, formattedText, image });
      return NextResponse.json(
        { success: false, error: "Missing fields" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // ✅ Look up the user by email
    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    // ✅ Use user's Mongo ObjectId as the userId in Report
    const newReport = await Report.create({
      userId: user._id,
      text,
      formattedText,
      image,
    });

    return NextResponse.json({ success: true, reportId: newReport._id });
  } catch (err) {
    console.error("Error saving report:", err);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}