import { Transcripts } from '@/lib/db/transcripts';
import { Transcript } from '@/types/transcript';

export class TranscriptService {
  async findAll(): Promise<Transcript[]> {
    return await Transcripts.findAll();
  }

  async findById(transcriptId: string): Promise<Transcript | null> {
    return await Transcripts.findById(transcriptId);
  }
}