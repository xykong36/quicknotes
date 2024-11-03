import React, { useState } from "react";
import { Modal } from "antd";
import { Search } from "lucide-react";
import ParagraphPage from "./ParagraphPage";

interface ExampleCardProps {
  example: {
    image: string;
    title: string;
    duration: string;
    tags: string[];
  };
}

export const ExampleCard = ({ example }: ExampleCardProps) => {
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
          src={example.image}
          alt={example.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center">
                <Search className="w-3 h-3 text-white" />
              </div>
              <span className="text-sm">{example.duration}</span>
            </div>
            <div className="flex gap-2">
              {example.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 rounded-full text-xs bg-white/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <h3 className="mt-2 text-white font-medium">{example.title}</h3>
        </div>
      </div>

      <Modal
        title={example.title}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={800}
      >
        <img
          src={example.image}
          alt={example.title}
          className="w-full h-48 object-cover mb-4"
        />
        <p>{example.duration}</p>
        <div>
          <ParagraphPage />
        </div>
        <div className="flex gap-2">
          {example.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 rounded-full text-xs bg-gray-200"
            >
              {tag}
            </span>
          ))}
        </div>
      </Modal>
    </>
  );
};
