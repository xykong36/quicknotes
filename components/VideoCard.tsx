import React, { useState } from "react";
import { Modal } from "antd";
import { Search } from "lucide-react";
import VideoLearningPage from "./VideoLearningPage";
import { YoutubeVideo } from "@/app/types/YoutubeVideo";

interface VideoCardProps {
  video: YoutubeVideo;
}

export const VideoCard = ({ video }: VideoCardProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <div
        className="relative group rounded-lg overflow-hidden cursor-pointer"
        onClick={showModal}
      >
        <img
          src={video.thumbnail_url}
          alt={video.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center">
                <Search className="w-3 h-3 text-white" />
              </div>
              <span className="text-sm">{video.duration}</span>
            </div>
          </div>
          {/* <h3 className="mt-2 text-white font-medium">{video.title}</h3> */}
        </div>
      </div>

      <Modal
        title={video.title}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={800}
      >
        {/* <img
          src={video.thumbnail_url}
          alt={video.title}
          className="w-full h-48 object-cover mb-4"
        /> */}

        <div>
          <VideoLearningPage />
        </div>
      </Modal>
    </>
  );
};
