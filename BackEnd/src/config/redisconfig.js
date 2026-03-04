import { createClient } from "redis";

// 1. Declare the variable, but don't assign the client yet
export let redis = null;

export const connectRedis = async () => {
  try {
    // 2. Only create the client when this function is called (after dotenv)
    if (!redis) {
      console.log("Connecting to Redis with URL:", process.env.REDIS_URL);
      
      redis = createClient({
        url: process.env.REDIS_URL,
        socket: {
          tls: true,
          rejectUnauthorized: false
        }
      });

      redis.on("error", (err) => console.error("Redis error:", err));
    }

    if (!redis.isOpen) {
      await redis.connect();
      console.log("✅ Redis connected successfully");
    }
  } catch (error) {
    console.error("Redis connection failed:", error);
  }
};