from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from pathlib import Path
import aiohttp
import asyncio
import os
from dotenv import load_dotenv

# 加载环境变量
load_dotenv()

app = FastAPI(title="TTS Service")

# 配置CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 在生产环境中应该设置具体的域名
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 音频文件存储路径
AUDIO_DIR = Path("audio_files")
AUDIO_DIR.mkdir(exist_ok=True)

# 创建静态文件服务
app.mount("/audio", StaticFiles(directory="audio_files"), name="audio")

class TTSRequest(BaseModel):
    word: str

async def generate_audio_openai(word: str, output_path: Path):
    """使用OpenAI API生成音频"""
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        raise HTTPException(status_code=500, detail="OpenAI API key not found")

    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
    
    payload = {
        "model": "tts-1",
        "input": word,
        "voice": "alloy"
    }

    async with aiohttp.ClientSession() as session:
        async with session.post(
            "https://api.openai.com/v1/audio/speech",
            headers=headers,
            json=payload
        ) as response:
            if response.status != 200:
                error_detail = await response.text()
                raise HTTPException(
                    status_code=response.status,
                    detail=f"OpenAI API error: {error_detail}"
                )
            
            # 保存音频文件
            audio_content = await response.read()
            with open(output_path, "wb") as f:
                f.write(audio_content)

@app.post("/api/tts")
async def text_to_speech(request: TTSRequest):
    """处理TTS请求"""
    try:
        # 清理和标准化单词
        word = request.word.lower().strip()
        file_name = f"{word}.mp3"
        file_path = AUDIO_DIR / file_name

        # 检查文件是否已存在
        if not file_path.exists():
            # 生成新的音频文件
            await generate_audio_openai(word, file_path)

        # 返回音频文件的URL
        return JSONResponse({
            "success": True,
            "audio_url": f"/audio/{file_name}",
            "word": word
        })

    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={
                "success": False,
                "error": str(e)
            }
        )

@app.get("/api/check/{word}")
async def check_audio_exists(word: str):
    """检查音频文件是否存在"""
    file_path = AUDIO_DIR / f"{word.lower().strip()}.mp3"
    return {"exists": file_path.exists()}

@app.on_event("startup")
async def startup_event():
    """服务启动时的初始化"""
    print("TTS Service Started")
    print(f"Audio files directory: {AUDIO_DIR.absolute()}")
    print("OpenAI API Key:", "Configured" if os.getenv("OPENAI_API_KEY") else "Missing")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
