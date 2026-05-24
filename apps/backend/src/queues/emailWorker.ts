import { Worker } from "bullmq";
import { redisConnection } from "./queueConfig.js";
import { sendEmail } from "../services/emailService.js";

export const emailWorker = new Worker(
  "email",
  async (job) => {
    const { to, subject, html, text } = job.data;
    console.log(`Processing email to ${to}`);
    await sendEmail({ to, subject, text, html });
    return { success: true };
  },
  { connection: redisConnection }
);

emailWorker.on("completed", (job) => {
  console.log(`Email job ${job.id} completed`);
});

emailWorker.on("failed", (job, err) => {
  console.error(`Email job ${job?.id} failed:`, err);
});
