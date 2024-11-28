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

export interface IdiomData {
  meaning: {
    en: string;
    zh: string;
  };
  usage_context: {
    en: string;
    zh: string;
  };
  examples: Array<{
    english: string;
    chinese: string;
    context: {
      en: string;
      zh: string;
    };
  }>;
  synonymous_phrases: Array<{
    en: string;
    zh: string;
  }>;
  related_expressions: Array<{
    phrase: {
      en: string;
      zh: string;
    };
    meaning: {
      en: string;
      zh: string;
    };
  }>;
}
