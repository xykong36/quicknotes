import { useState, useRef, useCallback, useEffect } from "react";

export type AudioStatus = "loading" | "error" | "ready";

// 简化的状态接口
interface AudioState {
  isPlaying: boolean;
  status: AudioStatus;
  error: Error | null;
  duration: number;
  currentTime: number;
  buffered: number;
}

type AudioEventHandler = {
  onEnded?: () => void;
  onError?: (error: Error) => void;
  onTimeUpdate?: (currentTime: number) => void;
  onDurationChange?: (duration: number) => void;
  onBufferChange?: (buffered: number) => void;
};

// 简化的文件检查 hook
export const useAudioFileCheck = (audioUrl: string) => {
  const [status, setStatus] = useState<AudioStatus>("loading");

  useEffect(() => {
    const controller = new AbortController();

    fetch(audioUrl, {
      method: "HEAD",
      signal: controller.signal,
      cache: "force-cache",
    })
      .then((response) => setStatus(response.ok ? "ready" : "error"))
      .catch((err) => {
        if (err instanceof Error && err.name !== "AbortError") {
          setStatus("error");
        }
      });

    return () => controller.abort();
  }, [audioUrl]);

  return status;
};

// 简化的主 hook
export const useAudioPlayer = (
  audioRef: React.RefObject<HTMLAudioElement>,
  handlers?: AudioEventHandler
) => {
  const [state, setState] = useState<AudioState>({
    isPlaying: false,
    status: "loading",
    error: null,
    duration: 0,
    currentTime: 0,
    buffered: 0,
  });

  // 统一的状态更新处理器
  const updateState = useCallback((updates: Partial<AudioState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  }, []);

  // 播放控制
  const handlePlayPause = useCallback(() => {
    if (!audioRef.current) return;

    if (state.isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.load();
      audioRef.current.play().catch((error) => {
        const err =
          error instanceof Error ? error : new Error("Playback error");
        updateState({ error: err, status: "error", isPlaying: false });
      });
    }

    updateState({ isPlaying: !state.isPlaying });
  }, [state.isPlaying, updateState]);

  // 统一的事件处理器映射
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const eventHandlers = {
      ended: () => {
        updateState({ isPlaying: false });
        handlers?.onEnded?.();
      },
      error: (e: Event) => {
        const error =
          e instanceof ErrorEvent ? e.error : new Error("Audio error");
        updateState({ error, status: "error", isPlaying: false });
        handlers?.onError?.(error);
      },
      timeupdate: () => {
        const currentTime = audio.currentTime;
        updateState({ currentTime });
        handlers?.onTimeUpdate?.(currentTime);
      },
      durationchange: () => {
        const duration = audio.duration;
        updateState({ duration });
        handlers?.onDurationChange?.(duration);
      },
      progress: () => {
        if (audio.buffered.length > 0) {
          const buffered =
            (audio.buffered.end(audio.buffered.length - 1) / audio.duration) *
            100;
          updateState({ buffered });
          handlers?.onBufferChange?.(buffered);
        }
      },
      playing: () => updateState({ isPlaying: true }),
      pause: () => updateState({ isPlaying: false }),
      loadedmetadata: () => updateState({ status: "ready" }),
    };

    // 批量添加事件监听器
    Object.entries(eventHandlers).forEach(([event, handler]) => {
      audio.addEventListener(event, handler);
    });

    return () => {
      Object.entries(eventHandlers).forEach(([event, handler]) => {
        audio.removeEventListener(event, handler);
      });
    };
  }, [audioRef, handlers, updateState]);

  return {
    ...state,
    handlePlayPause,
    seek: useCallback((time: number) => {
      audioRef.current && (audioRef.current.currentTime = time);
    }, []),
  };
};
