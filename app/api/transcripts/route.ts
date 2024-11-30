import { NextResponse } from "next/server";
import MongoConnection from "@/lib/mongodb";

// Insert sample data on MongoDB Atlas manually
// export async function POST(request: Request) {
//   const mongoConnection = MongoConnection.getInstance();
//   try {
//     const client = await mongoConnection.getClient();
//     const db = client.db("quicknotes");

//     // 首先删除已存在的 collection（如果需要）
//     try {
//       await db.collection("transcripts").drop();
//     } catch (e) {
//       // 如果 collection 不存在，忽略错误
//     }

//     // 创建 collection 和验证规则
//     await db.createCollection("transcripts", {
//       validator: {
//         $jsonSchema: {
//           bsonType: "object",
//           required: ["transcript_id", "video_id", "subtitles"],
//           properties: {
//             transcript_id: {
//               bsonType: "string",
//               description: "Must be a string and is required",
//             },
//             video_id: {
//               bsonType: "string",
//               description: "Must be a string and is required",
//             },
//             subtitles: {
//               bsonType: "array",
//               items: {
//                 bsonType: "object",
//                 required: ["timestamp", "en", "cn"],
//                 properties: {
//                   timestamp: {
//                     bsonType: "string",
//                     description: "Must be a string in format HH:mm",
//                   },
//                   en: {
//                     bsonType: "string",
//                     description: "English subtitle text",
//                   },
//                   cn: {
//                     bsonType: "string",
//                     description: "Chinese subtitle text",
//                   },
//                 },
//               },
//             },
//           },
//         },
//       },
//     });

//     // 创建索引
//     await db
//       .collection("transcripts")
//       .createIndex({ transcript_id: 1 }, { unique: true });
//     await db.collection("transcripts").createIndex({ video_id: 1 });
//     await db
//       .collection("transcripts")
//       .createIndex({ "subtitles.timestamp": 1 });

//     // 插入数据
//     const result = await db.collection("transcripts").insertOne({
//       transcript_id: "T001",
//       video_id: "PnBMdJ5KeHk",
//       subtitles: [
//         {
//           timestamp: "00:04",
//           en: "Few insects have captured our imagination like the monarch butterfly. Their migration is one of the most iconic wildlife spectacles in North America, but they are also one of the best environmental indicators we have of the health of our ecosystems.",
//           cn: "鲜有昆虫能像帝王蝶这般牵动人心。它们的迁徙堪称北美最为壮观的自然奇景之一，同时也是衡量我们生态系统健康状况的最佳环境指标之一。",
//         },
//         {
//           timestamp: "00:20",
//           en: "And they have been in decline for the last 40 years. So they might be telling us a bigger story. A story about our relationship with the natural world.",
//           cn: "在过去40年里，它们的数量持续减少。这背后或许暗示着一个更大的故事——一个关于人类与自然世界关系的故事。",
//         },
//         {
//           timestamp: "00:31",
//           en: "Every year, these amazing insects undertake one of the most extraordinary journeys on this planet. It takes from three to five generations of monarchs to complete the whole migration.",
//           cn: "每年，这些神奇的昆虫都会踏上地球上最为非凡的旅程之一。完成整个迁徙需要历经三到五代帝王蝶。",
//         },
//         {
//           timestamp: "00:44",
//           en: "And it starts in Mexico in the spring, when the monarchs that spend the winter there travel back north to lay their eggs. So the first and second generation of monarchs are born and remain in the USA, and they live up to six weeks, more or less.",
//           cn: "一切始于墨西哥的春天，在那里越冬的帝王蝶会北归产卵。第一代和第二代帝王蝶出生并定居在美国，它们的寿命大约有六周左右。",
//         },
//         {
//           timestamp: "01:01",
//           en: "But most migratory monarchs belong to the third and fourth generation.",
//           cn: "但大多数迁徙的帝王蝶都是第三代和第四代。",
//         },
//       ],
//     });

//     return NextResponse.json({ success: true, insertedId: result.insertedId });
//   } catch (error) {
//     console.error("Error:", error);
//     console.log("###############");
//     console.log("Error erroInfo details:", error.errInfo.details);
//     return NextResponse.json({ error: error }, { status: 500 });
//   }
// }

export async function GET() {
  const mongoConnection = MongoConnection.getInstance();
  try {
    const client = await mongoConnection.getClient();
    const db = client.db("quicknotes");

    const transcripts = await db.collection("transcripts").find({}).toArray();

    return NextResponse.json(transcripts);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch transcripts" },
      { status: 500 }
    );
  }
}
