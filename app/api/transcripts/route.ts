import { TranscriptService } from "@/services/transcriptService";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const transcriptService = new TranscriptService();
    const transcripts = await transcriptService.findAll();
    return NextResponse.json({ transcripts });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch transcripts" },
      { status: 500 }
    );
  }
}
