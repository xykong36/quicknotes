// app/api/videos/route.ts
import { Videos } from '@/lib/db/videos';
import { Video } from '@/types/video';

export class VideosService {

  async findAll(): Promise<Video[]> {
    return await Videos.findAll();
  }

  async findById(videoId: string): Promise<Video | null> {
    return await Videos.findById(videoId);
  }
}

