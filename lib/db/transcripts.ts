import MongoConnection from "@/lib/mongodb";
import { Transcript } from '@/types/transcript';

export class Transcripts {
  private static async getCollection() {
    const client = await MongoConnection.getInstance().getClient();
    return client.db("quicknotes").collection<Transcript>('transcripts');
  }

  static async findAll(): Promise<Transcript[]> {
    const collection = await this.getCollection();
    return collection.find({}).toArray();
  }

  static async findById(id: string): Promise<Transcript | null> {
    const collection = await this.getCollection();
    return collection.findOne({ video_id: id });
  }

}