from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from .models import YouTubeURL, YouTubeResponse
from .config import get_settings

app = FastAPI()
settings = get_settings()

# 配置 CORS
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
        # 打印接收到的 URL
        print(f"Received YouTube URL: {youtube_data.url}")

        # 这里可以添加更多的 URL 处理逻辑

        return YouTubeResponse(
            success=True,
            message="URL received successfully"
        )
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


@app.get("/health")
async def health_check():
    return {"status": "healthy"}
