from functools import lru_cache
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    app_name: str = "YouTube URL API"
    cors_origins: list = ["http://localhost:3000"]  # NextJS 默认端口

    class Config:
        env_file = ".env"


@lru_cache()
def get_settings():
    return Settings()
