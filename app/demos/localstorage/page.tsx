// app/demo/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DemoPage() {
  // 用于存储当前点击次数
  const [clickCount, setClickCount] = useState(0);
  // 用于存储所有点击记录
  const [clickHistory, setClickHistory] = useState<Record<string, string>>({});

  // 组件加载时从 localStorage 读取历史记录
  useEffect(() => {
    // 获取所有 localStorage 数据
    const allKeys = Object.keys(localStorage);
    const clickKeys = allKeys.filter((key) => key.match(/^click_/));

    const history: Record<string, string> = {};
    clickKeys.forEach((key) => {
      history[key] = localStorage.getItem(key) || "";
    });

    setClickHistory(history);
    // 设置初始点击次数为最大的记录数
    setClickCount(clickKeys.length);
  }, []);

  const handleClick = () => {
    const newCount = clickCount + 1;
    const key = `click_${newCount}`;
    const value = `第${newCount}次点击`;

    // 保存到 localStorage
    localStorage.setItem(key, value);

    // 更新状态
    setClickCount(newCount);
    setClickHistory((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleReset = () => {
    // 清除所有带 click_ 前缀的数据
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith("click_")) {
        localStorage.removeItem(key);
      }
    });

    // 重置状态
    setClickCount(0);
    setClickHistory({});
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>LocalStorage 点击记录演示</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex gap-4">
            <Button
              onClick={handleClick}
              className="bg-blue-500 hover:bg-blue-600"
            >
              点击记录 ({clickCount})
            </Button>

            <Button onClick={handleReset} variant="destructive">
              重置记录
            </Button>
          </div>

          <div className="bg-gray-100 rounded-lg p-4">
            <h3 className="font-semibold mb-3">localStorage 内容：</h3>
            {Object.entries(clickHistory).length > 0 ? (
              <div className="grid gap-2">
                {Object.entries(clickHistory)
                  .sort(([a], [b]) => {
                    const numA = parseInt(a.split("_")[1]);
                    const numB = parseInt(b.split("_")[1]);
                    return numA - numB;
                  })
                  .map(([key, value]) => (
                    <div
                      key={key}
                      className="flex justify-between items-center bg-white p-2 rounded"
                    >
                      <span className="font-mono text-sm text-gray-600">
                        {key}
                      </span>
                      <span className="text-gray-800">{value}</span>
                    </div>
                  ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-2">暂无点击记录</p>
            )}
          </div>

          <div className="text-sm text-gray-500">* 刷新页面后记录仍然保留</div>
        </CardContent>
      </Card>
    </div>
  );
}
