import { createContext, useContext, useRef, useState } from "react";
import { useAudioFileCheck, useAudioPlayer } from "@/hooks/useAudio";
import { getAudioUrl } from "@/lib/audioUtils";

interface AudioState {
  isPlaying: boolean;
  status: "loading" | "error" | "ready";
  error: Error | null;
  currentTime: number;
  duration: number;
  buffered: number;
  isLooping: boolean;
  playbackSpeed: number;
}

interface AudioContextType extends AudioState {
  audioRef: React.RefObject<HTMLAudioElement>;
  handlePlayPause: () => void;
  seek: (time: number) => void;
  setLooping: (isLooping: boolean) => void;
  setPlaybackSpeed: (speed: number) => void;
}

const AudioContext = createContext<AudioContextType | null>(null);

const PLAYBACK_SPEEDS = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

export function AudioProvider({
  children,
  episodeId,
}: {
  children: React.ReactNode;
  episodeId: string;
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioUrl = getAudioUrl(episodeId);
  const status = useAudioFileCheck(audioUrl);
  const [isLooping, setIsLooping] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  const {
    isPlaying,
    currentTime,
    duration,
    buffered,
    error,
    handlePlayPause,
    seek,
  } = useAudioPlayer(audioRef, {
    onError: (error) => console.error("Audio playback error:", error),
  });

  const handleLoopToggle = () => {
    if (audioRef.current) {
      audioRef.current.loop = !isLooping;
      setIsLooping(!isLooping);
    }
  };

  const handleSpeedChange = (speed: number) => {
    if (audioRef.current) {
      audioRef.current.playbackRate = speed;
      setPlaybackSpeed(speed);
    }
  };

  return (
    <AudioContext.Provider
      value={{
        audioRef,
        status,
        isPlaying,
        currentTime,
        duration,
        buffered,
        error,
        isLooping,
        playbackSpeed,
        handlePlayPause,
        seek,
        setLooping: handleLoopToggle,
        setPlaybackSpeed: handleSpeedChange,
      }}
    >
      <audio
        ref={audioRef}
        src={audioUrl}
        preload="none"
        controlsList="nodownload"
        className="hidden"
        loop={isLooping}
      />
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
}

export { PLAYBACK_SPEEDS };
