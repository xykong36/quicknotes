"use client";

import React, { useState } from "react";

import {
  HelpCircle,
  CheckCircle2,
  Coffee,
  ChevronRight,
  ChevronDown,
} from "lucide-react";

interface ExampleToggleProps {
  chinese: string;
  english: string;
}

const ExampleToggle: React.FC<ExampleToggleProps> = ({ chinese, english }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="group">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-2 text-gray-400 hover:text-gray-300 transition-colors"
      >
        <Coffee className="w-4 h-4 flex-shrink-0" />
        <span className="flex-grow text-left">{chinese}</span>
        {isOpen ? (
          <ChevronDown className="w-4 h-4 flex-shrink-0" />
        ) : (
          <ChevronRight className="w-4 h-4 flex-shrink-0" />
        )}
      </button>
      {isOpen && (
        <div className="mt-2 pl-6 text-gray-300 animate-fadeIn">{english}</div>
      )}
    </div>
  );
};

const LanguageLearningPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      {/* First Section */}
      <div className="mb-12">
        <h2 className="text-xl font-medium mb-6 text-gray-200 flex items-center gap-2">
          一. 对照中文，尝试开口说英文
        </h2>

        <div className="bg-gray-800/50 rounded-lg p-6">
          <div className="text-lg leading-relaxed">
            <p>
              我感觉自己的脑子
              <span className="text-green-400">每分钟都在飞速运转</span>
              ，而且这一整周都是这样，所以今天我想有个
              <span className="text-orange-400">慢节奏的早晨</span>
              。今天我起床、做准备，我觉得我每天起床都很
              <span className="text-blue-400">焦虑</span>
              ，是因为我的手机就是我的闹钟。我有个Hatch的闹钟，但我一直没
              <span className="text-red-400">弄清楚</span>
              如何连接，所以就一直把它放在
              <span className="text-pink-400">窗台</span>
              上没用。总之，今天我起床后立即
              <span className="text-orange-400">关掉闹钟</span>
              ，因为通常我关掉闹钟后，第一件事就是
              <span className="text-pink-400">查看待办清单</span>
              ，然后脑子就开始飞速运转。我不想这样，这让我感到非常
              <span className="text-blue-400">焦虑</span>
              。虽然我知道，有些人面临的处境比我难得多，他们可能有家庭或经济上的压力。
            </p>
          </div>
        </div>
      </div>

      {/* Second Section */}
      <div>
        <h2 className="text-xl font-medium mb-6 text-gray-200">
          二、对照英文，排查卡壳的地方
          <div className="mt-2 flex items-center gap-2 text-sm">
            <HelpCircle className="w-5 h-5 text-yellow-500" />
            <span className="text-gray-400">
              对照母语者的表达，查看不会和卡壳的地方。
            </span>
          </div>
        </h2>

        <div className="grid grid-cols-2 gap-6">
          <div className="bg-gray-800/50 rounded-lg p-6">
            <p className="text-lg leading-relaxed">
              I felt like my mind was{" "}
              <span className="text-green-400">
                going a million miles a minute
              </span>{" "}
              and that was happening to me all week, so I wanted to focus on
              having a <span className="text-orange-400">slower morning</span>.
              Today I got up, got ready and I think the reason I was waking up
              feeling so <span className="text-blue-400">anxious</span> every
              day was because my phone is my alarm. I have the Hatch alarm that
              I brought but I could never really{" "}
              <span className="text-red-400">figure out</span> how to connect it
              so just been sitting on the{" "}
              <span className="text-pink-400">window sill</span>. Anyway I got
              up <span className="text-orange-400">shut off my alarm</span>{" "}
              immediately and the first thing I{" "}
              <span className="text-pink-400">pull up</span> is my To do list
              and my mind starts racing. And I don&apos;t want like that and I
              just felt so <span className="text-blue-400">anxious</span> and I
              know there&apos;s people that have it way more difficult than I do
              that have hard family situations or financial situations.
            </p>
          </div>

          <div className="bg-gray-800/50 rounded-lg p-6">
            <p className="text-lg leading-relaxed">
              我感觉自己的脑子
              <span className="text-green-400">每分钟都在飞速运转</span>
              ，而且这一整周都是这样，所以今天我想有个
              <span className="text-orange-400">慢节奏的早晨</span>
              。今天我起床、做准备，我觉得我每天起床都很
              <span className="text-blue-400">焦虑</span>
              ，是因为我的手机就是我的闹钟。我有个Hatch的闹钟，但我一直没
              <span className="text-red-400">弄清楚</span>
              如何连接，所以就一直把它放在
              <span className="text-pink-400">窗台</span>
              上没用。总之，今天我起床后立即
              <span className="text-orange-400">关掉闹钟</span>
              ，因为通常我关掉闹钟后，第一件事就是
              <span className="text-pink-400">查看待办清单</span>
              ，然后脑子就开始飞速运转。我不想这样，这让我感到非常
              <span className="text-blue-400">焦虑</span>
              。虽然我知道，有些人面临的处境比我难得多，他们可能有家庭或经济上的压力。
            </p>
          </div>
        </div>
      </div>

      {/* Third Section - Updated with Toggle */}
      <div>
        <h2 className="text-xl font-medium mb-6 text-gray-200">
          三、精读文本，积累地道实用生词和短语
        </h2>

        <div className="flex items-center gap-2 mb-4 text-gray-300">
          <HelpCircle className="w-5 h-5 text-yellow-500" />
          <span>
            学习母语者地道的表达，坚持每天积累一点点，你会惊讶于自己的词汇量增长速度。
          </span>
        </div>

        <div className="flex items-center gap-2 mb-6 text-gray-300">
          <Coffee className="w-5 h-5 text-yellow-500" />
          <span>
            【例句可以先看中文，尝试开口用英文表达后点开右侧箭头查看英文表达】
          </span>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-6">
          <h3 className="text-lg text-yellow-500 mb-6">母语者地道表达</h3>

          <div className="space-y-8">
            {/* First Expression */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span className="text-green-400">
                  go a million miles a minute
                </span>
                <span className="text-green-400">每分钟都在飞速运转</span>
              </div>
              <div className="mb-2">
                <span className="text-green-400">my mind start racing</span>
                <span className="text-green-400 ml-2">脑子开始飞速运转</span>
              </div>

              <div className="ml-4 space-y-4">
                <ExampleToggle
                  chinese="例：开完会后，我的思绪飞速运转，脑子里全是要做的任务。"
                  english="After the meeting, my thoughts were going a million miles a minute. I couldn't stop thinking about all the tasks I had to do."
                />
                <ExampleToggle
                  chinese="例：我一躺下准备睡觉，脑子里就开始飞快地想明天要做的事情。"
                  english="As soon as I lay down to sleep, my mind started racing with thoughts about tomorrow's tasks."
                />
              </div>

              <div className="mt-4 space-y-2">
                <div className="text-gray-300">相关表达：</div>
                <ul className="list-disc ml-6 space-y-2 text-gray-300">
                  <li>I&apos;m overwhelmed with thoughts. 我满脑子都是想法</li>
                  <li>My head is spinning. 我感觉脑子都转不过来了</li>
                </ul>
              </div>
            </div>

            {/* Second Expression */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span className="text-orange-400">a slower morning</span>
                <span className="text-orange-400">慢节奏的早晨</span>
              </div>

              <div className="mt-2">
                <div className="text-gray-300">
                  英文释义：A relaxed, less hectic morning where tasks at a
                  leisurely pace.
                </div>
              </div>

              <div className="ml-4 mt-4">
                <ExampleToggle
                  chinese="例：忙碌了一周后，我真的需要一个悠闲的早晨来充电和整理思绪。"
                  english="After a busy week, I really needed a slower morning to recharge and organize my thoughts."
                />
              </div>

              <div className="mt-4">
                <div className="text-gray-300">同义表达：</div>
                <div className="text-orange-400">
                  A laid-back morning 轻松的早晨 A leisurely morning 悠闲的早晨
                </div>
              </div>

              <div className="mt-4">
                <div className="text-gray-300">相关表达：</div>
                <ul className="list-disc ml-6 space-y-2 text-gray-300">
                  <li>A lazy morning 慵懒的早晨</li>
                  <li>A hectic morning 忙碌的早晨</li>
                  <li>A chaotic morning 混乱/手忙脚乱的早晨</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LanguageLearningPage;
