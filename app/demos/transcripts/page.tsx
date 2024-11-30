"use client";
import { useState } from "react";

export default function TranscriptsPage() {
  const [message, setMessage] = useState("");
  const [transcripts, setTranscripts] = useState([]);
  const [error, setError] = useState("");

  const createTranscript = async () => {
    try {
      const response = await fetch("/api/transcripts", {
        method: "POST",
      });

      const data = await response.json();

      if (data.success) {
        setMessage("Transcript created successfully!");
        setError("");
        // After creating, fetch the updated list
        fetchTranscripts();
      } else {
        setMessage("Failed to create transcript");
        setError(data.error || "Unknown error occurred");
      }
    } catch (error) {
      setMessage("Error creating transcript");
      setError(error.message);
    }
  };

  const fetchTranscripts = async () => {
    try {
      const response = await fetch("/api/transcripts");
      const data = await response.json();

      if (Array.isArray(data)) {
        setTranscripts(data);
        setError("");
      } else {
        setError("Invalid data received");
      }
    } catch (error) {
      setError("Error fetching transcripts: " + error.message);
    }
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="flex gap-4 mb-6">
        <button
          onClick={createTranscript}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
        >
          Create Transcript
        </button>
        <button
          onClick={fetchTranscripts}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition-colors"
        >
          Fetch Transcripts
        </button>
      </div>

      {message && (
        <p className="mt-4 text-gray-700 bg-blue-50 p-3 rounded">{message}</p>
      )}

      {error && (
        <p className="mt-4 text-red-600 bg-red-50 p-3 rounded">{error}</p>
      )}

      {transcripts.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Transcripts</h2>
          {transcripts.map((transcript, index) => (
            <div
              key={transcript._id || index}
              className="border rounded-lg p-4 mb-4 bg-white shadow-sm"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="font-medium">Video ID:</span>{" "}
                  {transcript.video_id}
                </div>
                <div className="text-sm text-gray-500">
                  Created: {formatTimestamp(transcript.created_at)}
                </div>
              </div>

              <div className="space-y-4 mt-4">
                {transcript.subtitles.map((subtitle, sIndex) => (
                  <div key={sIndex} className="bg-gray-50 p-3 rounded">
                    <div className="text-sm text-gray-600 mb-1">
                      Timestamp: {subtitle.timestamp}
                    </div>
                    <p className="text-gray-800 mb-2">{subtitle.en}</p>
                    <p className="text-gray-800">{subtitle.cn}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
