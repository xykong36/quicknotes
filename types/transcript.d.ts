export interface Subtitle {
  timestamp: string;
  en: string;
  cn: string;
}

export interface Transcript {
  transcript_id: string;
  video_id: string;
  subtitles: Subtitle[];
}