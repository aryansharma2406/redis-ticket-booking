import { createClient } from "redis";

let redisClient;

export const connectRedis = async () => {
  redisClient = createClient({
    url: process.env.REDIS_URL || "redis://localhost:6379"
  });

  redisClient.on("error", (err) => {
    console.error("Redis Error:", err);
  });

  await redisClient.connect();
  console.log("✅ Redis connected");
};
app.get("/api/book/:seatId", async (req, res) => {
  const seatId = req.params.seatId;
  res.send(`Demo endpoint working. Use POST to book seat ${seatId}`);
});

export const getRedisClient = () => redisClient;