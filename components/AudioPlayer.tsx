"use client";

import { Play, Pause, Repeat, ChevronDown } from "lucide-react";
import {
  LoadingPlaceholder,
  ErrorAlert,
  AudioContainer,
} from "./AudioComponents";
import { AUDIO_ERRORS, formatTime } from "@/lib/audioUtils";
import { useAudio, PLAYBACK_SPEEDS } from "@/contexts/AudioContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const PlayPauseButton = () => {
  const { isPlaying, handlePlayPause } = useAudio();
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handlePlayPause}
      aria-label={isPlaying ? "Pause" : "Play"}
      className="hover:bg-gray-200"
    >
      {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
    </Button>
  );
};

const TimeDisplay = () => {
  const { currentTime, duration } = useAudio();
  return (
    <div className="text-sm text-gray-600 min-w-[100px]">
      {formatTime(currentTime)} / {formatTime(duration)}
    </div>
  );
};

const LoopButton = () => {
  const { isLooping, setLooping } = useAudio();
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setLooping(!isLooping)}
      aria-label="Toggle loop"
      className={`hover:bg-gray-200 ${isLooping ? "text-blue-500" : ""}`}
    >
      <Repeat className="w-5 h-5" />
    </Button>
  );
};

const SpeedControl = () => {
  const { playbackSpeed, setPlaybackSpeed } = useAudio();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={`flex items-center gap-1 px-2 py-1 
            ${playbackSpeed !== 1 ? "text-blue-500" : "text-gray-600"}
            hover:bg-gray-200 transition-colors`}
        >
          {playbackSpeed}x
          <ChevronDown className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-20">
        {PLAYBACK_SPEEDS.map((speed) => (
          <DropdownMenuItem
            key={speed}
            onClick={() => setPlaybackSpeed(speed)}
            className={`justify-center ${
              playbackSpeed === speed
                ? "bg-blue-50 text-blue-500 font-medium"
                : ""
            }`}
          >
            {speed}x
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const ProgressBar = () => {
  const { currentTime, duration, buffered, seek } = useAudio();

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const bar = e.currentTarget;
    const rect = bar.getBoundingClientRect();
    const percentage = (e.clientX - rect.left) / rect.width;
    seek(percentage * duration);
  };

  return (
    <div
      className="relative h-2 bg-gray-200 rounded cursor-pointer"
      onClick={handleProgressBarClick}
    >
      <div
        className="absolute h-full bg-gray-300 rounded"
        style={{ width: `${buffered}%` }}
      />
      <div
        className="absolute h-full bg-blue-500 rounded"
        style={{ width: `${(currentTime / duration) * 100}%` }}
      />
    </div>
  );
};

export default function AudioPlayer() {
  const { status, error } = useAudio();

  if (status === "loading") {
    return <LoadingPlaceholder />;
  }

  if (status === "error" || error) {
    return <ErrorAlert message={AUDIO_ERRORS.NOT_FOUND} />;
  }

  return (
    <AudioContainer>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-4">
          <PlayPauseButton />
          <TimeDisplay />
          <LoopButton />
          <SpeedControl />
        </div>
        <ProgressBar />
      </div>
    </AudioContainer>
  );
}
