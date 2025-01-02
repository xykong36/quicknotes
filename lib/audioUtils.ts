// Constants
export const AUDIO_STATUS = {
  LOADING: "loading",
  ERROR: "error",
  READY: "ready",
} as const;

export const AUDIO_ERRORS = {
  NOT_FOUND: "Audio file not found",
  LOAD_ERROR: "Error loading audio file",
  PLAYBACK_ERROR: "Error playing audio file",
} as const;

// Helper functions
export const getAudioUrl = (episodeId: string): string =>
  `/audio/episodes/EP${episodeId}.mp3`;

export const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

// Type definitions
export type AudioStatus = (typeof AUDIO_STATUS)[keyof typeof AUDIO_STATUS];
export type AudioError = (typeof AUDIO_ERRORS)[keyof typeof AUDIO_ERRORS];
