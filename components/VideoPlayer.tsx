// VideoPlayer.tsx
import { useEffect, useRef, useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface VideoPlayerProps {
  episodeId: string;
}

export default function VideoPlayer({ episodeId }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState<string>("");
  const videoPath = `/videos/EP${episodeId}.mp4`;

  useEffect(() => {
    const video = videoRef.current;
    const handleError = () => {
      setError("视频文件不存在或无法播放");
    };

    video?.addEventListener("error", handleError);
    return () => video?.removeEventListener("error", handleError);
  }, [episodeId]);

  return (
    <div className="w-full">
      {error ? (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : (
        <video
          ref={videoRef}
          className="w-full rounded-lg"
          controls
          preload="metadata"
        >
          <source src={videoPath} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
