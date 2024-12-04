# main.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from .models import YouTubeURL, YouTubeResponse
from .config import get_settings
from .utils import extract_video_id, get_transcript, download_audio

app = FastAPI()
settings = get_settings()

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/api/youtube", response_model=YouTubeResponse)
async def process_youtube_url(youtube_data: YouTubeURL):
    try:
        print(youtube_data.start_timestamp)
        print(youtube_data.end_timestamp)
        video_id = extract_video_id(youtube_data.url)
        transcript = get_transcript(video_id)
        filtered_transcript = [
            t for t in transcript
            if int(youtube_data.start_timestamp) <= t['start'] <= int(youtube_data.end_timestamp)
        ]
        audio_path = download_audio(video_id)

        return YouTubeResponse(
            success=True,
            message="Processing completed successfully",
            video_id=video_id,
            audio_path=audio_path,
            start_timestamp=youtube_data.start_timestamp,
            end_timestamp=youtube_data.end_timestamp,
            transcript=filtered_transcript
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/health")
async def health_check():
    return {"status": "healthy"}
