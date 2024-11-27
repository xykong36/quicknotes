export interface Subtitle {
  timestamp: string;
  en: string;
  cn: string;
  highlights: {
    en: string[];
    cn: string[];
  };
}

export interface VideoSubtitle {
  video_id: string;
  subtitle: Subtitle[];
}
