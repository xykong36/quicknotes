import React, { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX, Repeat, List } from "lucide-react";

const AudioPlayer = () => {
  const audioFiles = [
    "PnBMdJ5KeHk.mp3",
    "segment_1.mp3",
    "segment_2.mp3",
    "segment_3.mp3",
    "segment_4.mp3",
  ];

  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLooping, setIsLooping] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.loop = isLooping;
    }
  }, [volume, isLooping]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handlePlay = async (file: string) => {
    try {
      if (audioRef.current) {
        audioRef.current.pause();
      }

      const newAudio = new Audio(`/static/audio/${file}`);
      audioRef.current = newAudio;

      newAudio.onloadedmetadata = () => {
        setDuration(newAudio.duration);
      };

      newAudio.ontimeupdate = () => {
        setProgress(newAudio.currentTime);
      };

      newAudio.onended = () => {
        if (!isLooping) {
          setIsPlaying(false);
          setCurrentlyPlaying(null);
        }
      };

      newAudio.volume = volume;
      newAudio.loop = isLooping;
      await newAudio.play();

      setIsPlaying(true);
      setCurrentlyPlaying(file);
    } catch (error) {
      console.error("Error playing audio:", error);
      setIsPlaying(false);
      setCurrentlyPlaying(null);
    }
  };

  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
      setIsPlaying(false);
      setCurrentlyPlaying(null);
      setProgress(0);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    setIsMuted(newVolume === 0);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !progressBarRef.current) return;

    const rect = progressBarRef.current.getBoundingClientRect();
    const clickPosition = (e.clientX - rect.left) / rect.width;
    const newTime = clickPosition * duration;

    audioRef.current.currentTime = newTime;
    setProgress(newTime);
  };

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = volume;
        setIsMuted(false);
      } else {
        audioRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  };

  return (
    <div className="mt-8 max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Audio Player</h2>
        <button
          onClick={() => setShowPlaylist(!showPlaylist)}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <List size={24} />
        </button>
      </div>

      {/* Current Playing Info */}
      <div className="mb-4 text-center">
        <p className="text-lg font-medium">
          {currentlyPlaying || "Select a track to play"}
        </p>
      </div>

      {/* Progress Bar */}
      <div
        ref={progressBarRef}
        className="h-2 bg-gray-200 rounded-full mb-4 cursor-pointer"
        onClick={handleProgressClick}
      >
        <div
          className="h-full bg-blue-500 rounded-full"
          style={{ width: `${(progress / duration) * 100}%` }}
        />
      </div>

      {/* Time Display */}
      <div className="flex justify-between text-sm text-gray-600 mb-4">
        <span>{formatTime(progress)}</span>
        <span>{formatTime(duration)}</span>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mb-6">
        {/* Volume Control */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleMute}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-24"
          />
        </div>

        {/* Loop Control */}
        <button
          onClick={() => setIsLooping(!isLooping)}
          className={`p-2 rounded-full ${
            isLooping ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100"
          }`}
        >
          <Repeat size={20} />
        </button>
      </div>

      {/* Playlist */}
      <div className={`${showPlaylist ? "block" : "hidden"} mt-4`}>
        <div className="border rounded-lg divide-y">
          {audioFiles.map((file) => (
            <div
              key={file}
              className={`flex items-center justify-between p-3 hover:bg-gray-50 cursor-pointer ${
                currentlyPlaying === file ? "bg-blue-50" : ""
              }`}
              onClick={() =>
                currentlyPlaying === file ? handleStop() : handlePlay(file)
              }
            >
              <span className="font-medium">{file}</span>
              <button
                className={`px-4 py-1 rounded ${
                  currentlyPlaying === file
                    ? "bg-red-500 hover:bg-red-600 text-white"
                    : "bg-blue-500 hover:bg-blue-600 text-white"
                }`}
              >
                {currentlyPlaying === file ? "Stop" : "Play"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
