import React, { useState, useRef } from "react";
import { Play, Pause, Volume2, VolumeX, Repeat, Gauge } from "lucide-react";

interface Subtitle {
  timestamp: string;
  en: string;
  cn: string;
}

const SubtitlePlayer = () => {
  const subtitles: Subtitle[] = [
    {
      timestamp: "00:04",
      en: "Few insects have captured our imagination like the monarch butterfly. Their migration is one of the most iconic wildlife spectacles in North America, but they are also one of the best environmental indicators we have of the health of our ecosystems.",
      cn: "鲜有昆虫能像帝王蝶这般牵动人心。它们的迁徙堪称北美最为壮观的自然奇景之一，同时也是衡量我们生态系统健康状况的最佳环境指标之一。",
    },
    {
      timestamp: "00:20",
      en: "And they have been in decline for the last 40 years. So they might be telling us a bigger story. A story about our relationship with the natural world.",
      cn: "在过去40年里，它们的数量持续减少。这背后或许暗示着一个更大的故事——一个关于人类与自然世界关系的故事。",
    },
    {
      timestamp: "00:31",
      en: "Every year, these amazing insects undertake one of the most extraordinary journeys on this planet. It takes from three to five generations of monarchs to complete the whole migration.",
      cn: "每年，这些神奇的昆虫都会踏上地球上最为非凡的旅程之一。完成整个迁徙需要历经三到五代帝王蝶。",
    },
    {
      timestamp: "00:44",
      en: "And it starts in Mexico in the spring, when the monarchs that spend the winter there travel back north to lay their eggs. So the first and second generation of monarchs are born and remain in the USA, and they live up to six weeks, more or less.",
      cn: "一切始于墨西哥的春天，在那里越冬的帝王蝶会北归产卵。第一代和第二代帝王蝶出生并定居在美国，它们的寿命大约有六周左右。",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(1);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isLooping, setIsLooping] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [playbackRate, setPlaybackRate] = useState<number>(1);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playbackRates = [1, 1.25, 1.5, 1.75, 2];

  const playSegment = (index: number) => {
    if (audioRef.current) {
      audioRef.current.pause();
    }

    const audio = new Audio(`/audio/segment_${index + 1}.mp3`);
    audioRef.current = audio;

    // Configure audio properties
    audio.volume = isMuted ? 0 : volume;
    audio.loop = isLooping;
    audio.playbackRate = playbackRate;

    // Set up event listeners
    audio.addEventListener("loadedmetadata", () => setDuration(audio.duration));
    audio.addEventListener("timeupdate", () => setProgress(audio.currentTime));
    audio.addEventListener("ended", () => {
      if (!isLooping) {
        if (currentIndex < subtitles.length - 1) {
          setCurrentIndex(currentIndex + 1);
          playSegment(currentIndex + 1);
        } else {
          setIsPlaying(false);
          setCurrentIndex(0);
          setProgress(0);
        }
      }
    });

    audio.play();
    setIsPlaying(true);
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setProgress(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handlePlaybackRateChange = (rate: number) => {
    setPlaybackRate(rate);
    if (audioRef.current) {
      audioRef.current.playbackRate = rate;
    }
  };

  const handleSegmentClick = (index: number) => {
    setCurrentIndex(index);
    playSegment(index);
  };

  const togglePlay = () => {
    if (isPlaying && audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      playSegment(currentIndex);
    }
  };

  const toggleLoop = () => {
    setIsLooping(!isLooping);
    if (audioRef.current) {
      audioRef.current.loop = !isLooping;
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? volume : 0;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-900 text-white rounded-lg">
      {/* Main Controls */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <button
            onClick={togglePlay}
            className="p-2 rounded-full hover:bg-gray-700"
            title={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <Pause className="w-6 h-6" />
            ) : (
              <Play className="w-6 h-6" />
            )}
          </button>
          <button
            onClick={toggleMute}
            className="p-2 rounded-full hover:bg-gray-700"
          >
            {isMuted ? (
              <VolumeX className="w-6 h-6" />
            ) : (
              <Volume2 className="w-6 h-6" />
            )}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="w-24"
          />
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleLoop}
            className={`p-2 rounded-full transition-colors ${
              isLooping
                ? "bg-green-600 hover:bg-green-700"
                : "hover:bg-gray-700"
            }`}
          >
            <Repeat className="w-6 h-6" />
          </button>

          <div className="flex items-center gap-2">
            <Gauge className="w-4 h-4" />
            <select
              value={playbackRate}
              onChange={(e) => handlePlaybackRateChange(Number(e.target.value))}
              className="bg-gray-800 rounded px-2 py-1"
            >
              {playbackRates.map((rate) => (
                <option key={rate} value={rate}>
                  {rate}x
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <input
          type="range"
          min="0"
          max={duration || 100}
          value={progress}
          onChange={handleProgressChange}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-sm text-gray-400 mt-1">
          <span>{formatTime(progress)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Subtitles */}
      <div className="space-y-6">
        {subtitles.map((subtitle, index) => (
          <div
            key={index}
            onClick={() => handleSegmentClick(index)}
            className={`p-4 rounded-lg transition-all duration-300 cursor-pointer hover:bg-gray-800 ${
              currentIndex === index
                ? "bg-gray-800 border-l-4 border-green-400"
                : "opacity-70"
            }`}
          >
            <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
              <span>{subtitle.timestamp}</span>
              {currentIndex === index && (
                <div className="flex items-center gap-2">
                  {isLooping && (
                    <span className="px-2 py-0.5 rounded-full bg-green-600">
                      Looping
                    </span>
                  )}
                  <span className="px-2 py-0.5 rounded-full bg-blue-600">
                    {playbackRate}x
                  </span>
                </div>
              )}
            </div>
            <p
              className={`text-lg mb-2 leading-relaxed ${
                currentIndex === index ? "text-green-400" : ""
              }`}
            >
              {subtitle.en}
            </p>
            <p className="text-gray-400 leading-relaxed">{subtitle.cn}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubtitlePlayer;
