import { Queue, Worker, Job } from "bullmq";
import Redis from "ioredis";

export const redisConnection = new Redis(
  process.env.REDIS_URL || "redis://localhost:6379",
  {
    maxRetriesPerRequest: null,
  }
);

// Define job types
export const emailQueue = new Queue("email", { connection: redisConnection });
export const fileProcessQueue = new Queue("file-process", {
  connection: redisConnection,
});
