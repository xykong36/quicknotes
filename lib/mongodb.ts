// lib/mongodb.ts
import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URL) {
  throw new Error("Please add your Mongodb URL to .env");
}

const MONGODB_URL = process.env.MONGODB_URL;

// 声明全局变量用于保存连接实例
declare global {
  var mongoClient: MongoClient | undefined;
}

// 创建连接管理类
class MongoConnection {
  private static instance: MongoConnection;
  private client: MongoClient | null = null;
  private connecting = false;

  private constructor() {}

  public static getInstance(): MongoConnection {
    if (!MongoConnection.instance) {
      MongoConnection.instance = new MongoConnection();
    }
    return MongoConnection.instance;
  }

  public async getClient(): Promise<MongoClient> {
    // 如果已经有连接，直接返回
    if (this.client) {
      return this.client;
    }

    // 如果正在连接中，等待连接完成
    if (this.connecting) {
      await new Promise((resolve) => setTimeout(resolve, 100));
      return this.getClient();
    }

    // 开发环境下复用全局连接
    if (process.env.NODE_ENV === "development") {
      if (global.mongoClient) {
        this.client = global.mongoClient;
        return this.client;
      }
    }

    try {
      this.connecting = true;
      this.client = await MongoClient.connect(MONGODB_URL);

      // 开发环境下保存到全局变量
      if (process.env.NODE_ENV === "development") {
        global.mongoClient = this.client;
      }

      return this.client;
    } finally {
      this.connecting = false;
    }
  }

  public async disconnect(): Promise<void> {
    if (this.client) {
      await this.client.close();
      this.client = null;
    }
  }
}

export default MongoConnection;
