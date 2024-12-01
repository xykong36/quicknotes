import { VideosService } from "@/services/videoService";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const videosService = new VideosService();
    const { searchParams } = new URL(req.url);
    const videoId = searchParams.get("videoId");

    if (videoId) {
      const video = await videosService.findById(videoId);
      if (!video) {
        return NextResponse.json({ error: "Video not found" }, { status: 404 });
      }
      return NextResponse.json({ video });
    } else {
      const videos = await videosService.findAll();
      return NextResponse.json({ videos });
    }
  } catch (error) {
    console.error("Failed to fetch videos:", error);
    return NextResponse.json(
      { error: "Failed to fetch videos" },
      { status: 500 }
    );
  }
}
