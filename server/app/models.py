from pydantic import BaseModel, HttpUrl


class YouTubeURL(BaseModel):
    url: HttpUrl


class YouTubeResponse(BaseModel):
    success: bool
    message: str
