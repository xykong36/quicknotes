import React, { useState } from "react";
import { Modal } from "antd";
import { Search } from "lucide-react";
import ParagraphPage from "./ParagraphPage";

// 标签颜色映射
const TAG_COLORS = {
  Content: "bg-pink-100",
  SEO: "bg-green-100",
  Sales: "bg-purple-100",
  Social: "bg-purple-200",
  Ads: "bg-yellow-100",
  Copywriting: "bg-blue-100",
  "Landing Page": "bg-pink-100",
  Retention: "bg-green-100",
  Brand: "bg-purple-100",
  Referral: "bg-purple-200",
  Creative: "bg-yellow-100",
};

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

  // 获取标签颜色的辅助函数
  const getTagColor = (tag: string) => {
    return TAG_COLORS[tag] || "bg-gray-200"; // 默认颜色
  };

  // 获取标签文字颜色
  const getTagTextColor = (tag: string) => {
    // 根据背景色返回对应的文字颜色
    switch (getTagColor(tag)) {
      case "bg-purple-200":
      case "bg-purple-100":
        return "text-purple-900";
      case "bg-pink-100":
        return "text-pink-900";
      case "bg-green-100":
        return "text-green-900";
      case "bg-yellow-100":
        return "text-yellow-900";
      case "bg-blue-100":
        return "text-blue-900";
      default:
        return "text-gray-900";
    }
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
                  className={`px-3 py-1 rounded text-xs ${getTagColor(
                    tag
                  )} ${getTagTextColor(tag)}`}
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
        <div className="flex gap-2 mt-4">
          {example.tags.map((tag) => (
            <span
              key={tag}
              className={`px-3 py-1 rounded text-xs ${getTagColor(
                tag
              )} ${getTagTextColor(tag)}`}
            >
              {tag}
            </span>
          ))}
        </div>
      </Modal>
    </>
  );
};
