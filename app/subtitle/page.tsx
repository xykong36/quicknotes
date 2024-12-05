"use client";
import { useState } from "react";

interface TranscriptItem {
  text: string;
  start: number;
  duration: number;
}

interface YouTubeRequest {
  url: string;
  start_timestamp?: string;
  end_timestamp?: string;
}

interface YouTubeResponse {
  success: boolean;
  message: string;
  video_id: string;
  audio_path: string;
  transcript: TranscriptItem[];
}

const validateTimestamp = (timestamp: string): boolean => {
  if (!timestamp) return true;
  // Check seconds format
  if (/^\d+(\.\d+)?$/.test(timestamp)) {
    return Number(timestamp) >= 0;
  }
  // Check MM:SS format
  if (/^\d{1,2}:\d{2}$/.test(timestamp)) {
    const [minutes, seconds] = timestamp.split(":").map(Number);
    return minutes >= 0 && seconds >= 0 && seconds < 60;
  }
  return false;
};

const convertToSeconds = (timestamp: string): string => {
  if (!timestamp) return "";
  if (/^\d+(\.\d+)?$/.test(timestamp)) return timestamp;
  const [minutes, seconds] = timestamp.split(":").map(Number);
  return String(minutes * 60 + seconds);
};

export default function YouTubeForm() {
  const [url, setUrl] = useState("");
  const [startTimestamp, setStartTimestamp] = useState("");
  const [endTimestamp, setEndTimestamp] = useState("");
  const [response, setResponse] = useState<YouTubeResponse | null>(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (
      !validateTimestamp(startTimestamp) ||
      !validateTimestamp(endTimestamp)
    ) {
      setError("Invalid timestamp format. Use MM:SS or seconds");
      return;
    }

    const requestData: YouTubeRequest = {
      url,
      ...(startTimestamp && {
        start_timestamp: convertToSeconds(startTimestamp),
      }),
      ...(endTimestamp && { end_timestamp: convertToSeconds(endTimestamp) }),
    };

    try {
      const res = await fetch("http://localhost:8000/api/youtube", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },
        body: JSON.stringify(requestData),
      });

      if (res.ok) {
        const data = await res.json();
        setResponse(data);
        setUrl("");
        setStartTimestamp("");
        setEndTimestamp("");
      } else {
        setError("Failed to process request");
      }
    } catch (error) {
      setError("Error connecting to server");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold mb-6">Submit YouTube URL</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="url" className="block text-sm font-medium mb-1">
                YouTube URL
              </label>
              <input
                type="url"
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://youtube.com/watch?v=..."
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="startTime"
                  className="block text-sm font-medium mb-1"
                >
                  Start Time (MM:SS or seconds)
                </label>
                <input
                  type="text"
                  id="startTime"
                  value={startTimestamp}
                  onChange={(e) => setStartTimestamp(e.target.value)}
                  placeholder="05:30 or 330"
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>

              <div>
                <label
                  htmlFor="endTime"
                  className="block text-sm font-medium mb-1"
                >
                  End Time (MM:SS or seconds)
                </label>
                <input
                  type="text"
                  id="endTime"
                  value={endTimestamp}
                  onChange={(e) => setEndTimestamp(e.target.value)}
                  placeholder="05:30 or 330"
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
            </div>

            {error && <p className="text-red-500">{error}</p>}

            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Submit
            </button>
          </form>
        </div>

        {response && (
          <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
            <div className="border-b pb-2">
              <p className="font-medium">Status: {response.message}</p>
              <p>Video ID: {response.video_id}</p>
              <p>Audio Path: {response.audio_path}</p>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-2">Transcript</h2>
              <div className="max-h-96 overflow-y-auto space-y-2">
                {response.transcript.map((item, index) => (
                  <div key={index} className="p-2 hover:bg-gray-50">
                    <span className="text-gray-500">
                      {new Date(item.start * 1000).toISOString().substr(11, 8)}
                    </span>
                    <p>{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
