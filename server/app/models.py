# models.py
from pydantic import BaseModel, HttpUrl
from typing import Optional, List


class YouTubeURL(BaseModel):
    url: HttpUrl
    start_timestamp: Optional[str] = None
    end_timestamp: Optional[str] = None


class YouTubeResponse(BaseModel):
    success: bool
    message: str
    video_id: str
    audio_path: str
    start_timestamp: Optional[str] = None
    end_timestamp: Optional[str] = None
    transcript: List[dict]
