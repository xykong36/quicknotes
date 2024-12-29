import Link from "next/link";

export default function NotFound() {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4">页面未找到</h2>
      <p className="mb-4">抱歉，您请求的内容不存在。</p>
      <Link href="/" className="text-blue-600 hover:underline">
        返回首页
      </Link>
    </div>
  );
}
