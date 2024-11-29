// app/api/movies/route.ts
import { NextResponse } from "next/server";
import MongoConnection from "@/lib/mongodb";

export async function GET(request: Request) {
  const mongoConnection = MongoConnection.getInstance();

  try {
    // 获取电影标题
    const { searchParams } = new URL(request.url);
    const movieTitle = searchParams.get("title");

    if (!movieTitle) {
      return NextResponse.json(
        { error: "Movie title is required" },
        { status: 400 }
      );
    }

    // 获取数据库连接
    const client = await mongoConnection.getClient();
    const database = client.db("sample_mflix");
    const movies = database.collection("movies");

    // 查询电影
    const movie = await movies.findOne({ title: movieTitle });

    if (!movie) {
      return NextResponse.json({ error: "Movie not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        message: "Movie found",
        movie: movie,
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
  // 注意：不再在这里关闭连接
}

// 可选：在应用关闭时断开连接
process.on("SIGTERM", async () => {
  const mongoConnection = MongoConnection.getInstance();
  await mongoConnection.disconnect();
  process.exit(0);
});
