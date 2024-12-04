import re
import os
from youtube_transcript_api import YouTubeTranscriptApi
import yt_dlp


def extract_video_id(url: str) -> str:
    patterns = [
        r'(?:youtube\.com/watch\?v=|youtu\.be/)([A-Za-z0-9_-]+)',
        r'youtube\.com/embed/([A-Za-z0-9_-]+)'
    ]

    for pattern in patterns:
        if match := re.search(pattern, str(url)):
            return match.group(1)
    raise ValueError("Invalid YouTube URL format")


def get_transcript(video_id: str) -> list[dict]:
    try:
        return YouTubeTranscriptApi.get_transcript(video_id)
    except Exception as e:
        raise ValueError(f"Failed to get transcript: {str(e)}")


def download_audio(video_id: str) -> str:
    output_dir = "audio_downloads"
    os.makedirs(output_dir, exist_ok=True)

    output_path = os.path.join(output_dir, f"{video_id}.mp3")
    if os.path.exists(output_path):
        return output_path

    ydl_opts = {
        'format': 'bestaudio/best',
        'postprocessors': [{
            'key': 'FFmpegExtractAudio',
            'preferredcodec': 'mp3',
            'preferredquality': '192',
        }],
        'outtmpl': output_path[:-4],
    }

    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        ydl.download([f"https://www.youtube.com/watch?v={video_id}"])

    return output_path
