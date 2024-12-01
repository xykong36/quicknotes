// app/api/expressions/route.ts
import { NextResponse } from "next/server";
import MongoConnection from "@/lib/mongodb";

export async function GET() {
  const mongoConnection = MongoConnection.getInstance();

  try {
    // 获取数据库连接
    const client = await mongoConnection.getClient();
    const database = client.db("quicknotes");
    const expressions = database.collection("expressions");

    // 获取所有视频数据
    const allExpressions = await expressions.find({}).toArray();

    return NextResponse.json(
      {
        message: "Expressions retrieved successfully",
        expressions: allExpressions,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// 可选：在应用关闭时断开连接
process.on("SIGTERM", async () => {
  const mongoConnection = MongoConnection.getInstance();
  await mongoConnection.disconnect();
  process.exit(0);
});
