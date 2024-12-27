"use client";

import { useState, useRef, useEffect } from "react";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface AudioPlayerProps {
  episodeId: string;
}

export default function AudioPlayer({ episodeId }: AudioPlayerProps) {
  const [error, setError] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setIsChecking(true);

    const checkAudioFile = async () => {
      try {
        const response = await fetch(`/audio/episodes/EP${episodeId}.mp3`, {
          method: "HEAD",
        });

        if (!response.ok) {
          setError("Audio file not found");
        } else {
          setError(null);
        }
      } catch {
        setError("Audio file not found");
      } finally {
        setIsChecking(false);
      }
    };

    checkAudioFile();
  }, [episodeId]);

  if (isChecking) {
    return null;
  }

  if (error) {
    return (
      <Alert variant="destructive" className="border border-red-200 bg-white">
        <div className="flex gap-3">
          <AlertCircle className="h-5 w-5 flex-shrink-0 text-red-500" />
          <div className="flex flex-col gap-1">
            <h3 className="font-medium text-red-500">Error</h3>
            <AlertDescription className="text-red-500">
              {error}
            </AlertDescription>
          </div>
        </div>
      </Alert>
    );
  }

  return (
    <div className="w-full bg-gray-100 p-4 rounded-lg">
      <div className="relative">
        <audio
          ref={audioRef}
          className="w-full"
          src={`/audio/episodes/EP${episodeId}.mp3`}
          preload="metadata"
          controls
          controlsList="nodownload"
        >
          Your browser does not support the audio element.
        </audio>
      </div>
    </div>
  );
}
