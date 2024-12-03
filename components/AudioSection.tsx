import React, { useState, useRef } from "react";

const AudioSection = () => {
  // 更新文件路径，添加 static 前缀
  const audioFiles = [
    "PnBMdJ5KeHk.mp3",
    "segment_1.mp3",
    "segment_2.mp3",
    "segment_3.mp3",
    "segment_4.mp3",
  ];

  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlay = async (file: string) => {
    try {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }

      // 修改这里的路径，添加 /static/
      const newAudio = new Audio(`/static/audio/${file}`);
      audioRef.current = newAudio;

      newAudio.onplay = () => {
        setCurrentlyPlaying(file);
      };

      newAudio.onended = () => {
        setCurrentlyPlaying(null);
      };

      newAudio.onerror = (e) => {
        console.error("Error playing audio:", e);
        setCurrentlyPlaying(null);
      };

      await newAudio.play();
    } catch (error) {
      console.error("Error playing audio:", error);
      setCurrentlyPlaying(null);
    }
  };

  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
      setCurrentlyPlaying(null);
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Audio Files</h2>
      <ul className="space-y-2">
        {audioFiles.map((file) => (
          <li key={file} className="flex items-center gap-2">
            {currentlyPlaying === file ? (
              <button
                onClick={handleStop}
                className="px-4 py-2 rounded transition-colors bg-green-500 hover:bg-green-600 text-white"
              >
                Stop Playing
              </button>
            ) : (
              <button
                onClick={() => handlePlay(file)}
                className="px-4 py-2 rounded transition-colors bg-blue-500 hover:bg-blue-600 text-white"
              >
                Play {file}
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AudioSection;
