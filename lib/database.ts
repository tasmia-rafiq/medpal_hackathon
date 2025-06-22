import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

let isConnected = false;

export async function connectToDatabase() {
  if (isConnected) {
    console.log("MongoDb is already connected.");
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI, {
      dbName: "medpal",
    });
    isConnected = true;
    console.log("MongoDB Connected.");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
}
