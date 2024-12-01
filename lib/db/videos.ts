import MongoConnection from "@/lib/mongodb";
import { Video } from '@/types/video';

export class Videos {
  private static async getCollection() {
    const client = await MongoConnection.getInstance().getClient();
    return client.db("quicknotes").collection<Video>('videos');
  }

  static async findAll(): Promise<Video[]> {
    const collection = await this.getCollection();
    return collection.find({}).toArray();
  }

  static async findById(id: string): Promise<Video | null> {
    const collection = await this.getCollection();
    return collection.findOne({ video_id: id });
  }

}