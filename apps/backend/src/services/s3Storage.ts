import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import multer from "multer";
import crypto from "crypto";
import path from "path";

const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

// Generate unique S3 key
export const generateKey = (originalName: string, userId: number): string => {
  const ext = path.extname(originalName);
  const random = crypto.randomBytes(16).toString("hex");
  return `uploads/${userId}/${Date.now()}-${random}${ext}`;
};

// Upload file buffer to S3
export const uploadToS3 = async (
  buffer: Buffer,
  key: string,
  mimeType: string
): Promise<void> => {
  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME!,
    Key: key,
    Body: buffer,
    ContentType: mimeType,
  });
  await s3.send(command);
};

// Delete file from S3
export const deleteFromS3 = async (
  bucket: string,
  key: string
): Promise<void> => {
  const command = new DeleteObjectCommand({ Bucket: bucket, Key: key });
  await s3.send(command);
};

// Multer config (memory storage)
export const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});
