import { Request, Response } from "express";
import { uploadToS3 } from "../services/s3Storage.js";
import db from "../models/index.js";

const { File } = db;

export const uploadFile = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    const userId = req.user!.id;
    const { originalname, mimetype, size, buffer } = req.file;

    const { key, url } = await uploadToS3(req.file, userId);

    // Save metadata to database
    const file = await File.create({
      userId,
      originalName: originalname,
      key,
      bucket: process.env.S3_BUCKET_NAME!,
      region: process.env.AWS_REGION!,
      mimeType: mimetype,
      size,
      url,
    });

    res.status(201).json({
      id: file.id,
      url: file.url,
      originalName: file.originalName,
      size: file.size,
    });
  } catch (error: any) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "File upload failed" });
  }
};

export const getUserFiles = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const files = await File.findAll({
      where: { userId },
      order: [["createdAt", "DESC"]],
    });
    res.json(files);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch files" });
  }
};

export const deleteFile = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const fileId = parseInt(req.params.id);
    const userId = req.user!.id;
    const file = await File.findOne({ where: { id: fileId, userId } });
    if (!file) {
      return res.status(404).json({ error: "File not found" });
    }
    // Delete from S3
    const { DeleteObjectCommand } = await import("@aws-sdk/client-s3");
    const s3 = new (await import("@aws-sdk/client-s3")).S3Client({
      region: file.region,
    });
    await s3.send(
      new DeleteObjectCommand({ Bucket: file.bucket, Key: file.key })
    );
    // Delete DB record
    await file.destroy();
    res.json({ message: "File deleted" });
  } catch (error) {
    res.status(500).json({ error: "Delete failed" });
  }
};
