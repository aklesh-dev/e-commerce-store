import { redis } from "../lib/redis.config.js";

export const storeRefreshToken = async (userId, refreshToken) => {
  try {
    await redis.set(`refreshToken:${userId}`, refreshToken, "EX", 60 * 60 * 24 * 7); // 7 days
  } catch (error) {
    console.error("Error while storing refresh token in redis: ", error.message);    
  }
};