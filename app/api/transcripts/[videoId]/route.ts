import { NextResponse } from "next/server";
import MongoConnection from "@/lib/mongodb";

export async function GET(request) {
  const mongoConnection = MongoConnection.getInstance();

  try {
    // Get videoId from URL parameters
    const url = new URL(request.url);
    const videoId = url.searchParams.get("videoId");

    // Validate videoId
    if (!videoId) {
      return NextResponse.json(
        { error: "videoId is required" },
        { status: 400 }
      );
    }

    // Connect to MongoDB and fetch the video
    const client = await mongoConnection.getClient();
    const db = client.db("quicknotes");

    const videoTranscript = await db
      .collection("transcripts")
      .findOne({ video_id: videoId });

    // Check if video exists
    if (!videoTranscript) {
      return NextResponse.json({ error: "Video not found" }, { status: 404 });
    }

    return NextResponse.json(video);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch video" },
      { status: 500 }
    );
  }
}
