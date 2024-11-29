/**
 * MongoDB connection manager implementation
 * Handles database connection lifecycle using singleton pattern
 */
import { MongoClient, MongoClientOptions } from "mongodb";

// Environment variables validation and type assertion
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  throw new Error("Missing required environment variable: MONGODB_URI");
}

// Ensure MONGODB_URI is defined before using it
const MONGO_CONNECTION_URL: string = MONGODB_URI;

// MongoDB connection options
const OPTIONS: MongoClientOptions = {
  maxPoolSize: 10,
  minPoolSize: 1,
  maxIdleTimeMS: 30000,
  connectTimeoutMS: 5000,
};

// 扩展 globalThis 类型
declare global {
  // eslint-disable-next-line no-var
  var mongoClient: MongoClient | undefined;
}

class MongoConnection {
  private static instance: MongoConnection;
  private client: MongoClient | null = null;
  private connectionPromise: Promise<MongoClient> | null = null;

  private constructor() {}

  public static getInstance(): MongoConnection {
    if (!MongoConnection.instance) {
      MongoConnection.instance = new MongoConnection();
    }
    return MongoConnection.instance;
  }

  public async getClient(): Promise<MongoClient> {
    try {
      if (this.client) {
        return this.client;
      }

      if (this.connectionPromise) {
        return await this.connectionPromise;
      }

      if (process.env.NODE_ENV === "development" && globalThis.mongoClient) {
        this.client = globalThis.mongoClient;
        return this.client;
      }

      this.connectionPromise = MongoClient.connect(
        MONGO_CONNECTION_URL,
        OPTIONS
      );
      this.client = await this.connectionPromise;

      if (process.env.NODE_ENV === "development") {
        globalThis.mongoClient = this.client;
      }

      return this.client;
    } catch (error) {
      this.client = null;
      this.connectionPromise = null;
      throw error;
    } finally {
      this.connectionPromise = null;
    }
  }

  public async disconnect(): Promise<void> {
    if (!this.client) {
      return;
    }

    try {
      await this.client.close();
      this.client = null;

      if (process.env.NODE_ENV === "development") {
        globalThis.mongoClient = undefined;
      }
    } catch (error) {
      console.error("Error closing MongoDB connection:", error);
      throw error;
    }
  }

  /**
   * Check if client is connected
   * Compatible with MongoDB Driver 6.x
   */
  public async isConnected(): Promise<boolean> {
    try {
      if (!this.client) {
        return false;
      }
      // 在新版本中使用 db.admin().ping() 来检查连接状态
      await this.client.db().admin().ping();
      return true;
    } catch {
      return false;
    }
  }
}

export default MongoConnection;
