const redis = require("redis");
const logger = require("../utils/logger");

const client = redis.createClient({
  url: process.env.REDIS_URL, // Example: redis://localhost:6379
});


client.on("error", (err) => {
  logger.error("Error connecting to Redis DB ->", err);
});

// Event: Redis connected successfully
client.on("connect", () => {
  logger.info("Redis DB connected successfully");
});

// Function: Connect to Redis
const connectRedis = async () => {
  try {
    await client.connect();
    logger.info("Redis connection established and ready to use");
  } catch (error) {
    logger.error("Failed to connect to Redis DB ->", error);
    process.exit(1); 
  }
};

module.exports = { client, connectRedis };
