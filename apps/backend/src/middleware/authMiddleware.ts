import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import db from "../models/index.js";

const { User } = db;

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: number;
    };
    const user = await User.findByPk(decoded.id, {
      attributes: { exclude: ["password"] },
    });
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};
