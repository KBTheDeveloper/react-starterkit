import { Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
import db from "../models/index.js";
import { User as UserModel } from "../models/User.js";
import { emailQueue } from "../queues/queueConfig.js";

const { User } = db;

const generateToken = (user: UserModel) => {
  if (!user.id || !user.email) {
    throw new Error("Invalid user object: missing id or email");
  }
  return jwt.sign(
    { id: user.id!, email: user.email! },
    process.env.JWT_SECRET!,
    { expiresIn: (process.env.JWT_EXPIRES_IN || "7d") as any }
  );
};

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

const verifyCaptcha = async (token: string): Promise<boolean> => {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  if (!secretKey) {
    console.warn("RECAPTCHA_SECRET_KEY not set – skipping verification in dev");
    return process.env.NODE_ENV !== "production"; // allow in dev if no secret
  }
  try {
    const response = await fetch(process.env.RECAPTCHA_VERIFY_URL!, {
      method: "POST",
      body: JSON.stringify({
        secret: secretKey,
        response: token,
      }),
    });
    const data: any = response.json();

    return data.success === true;
  } catch (error) {
    console.error("Captcha verification error:", error);
    return false;
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, captchaToken } = req.body;

    const isCaptchaValid = await verifyCaptcha(captchaToken);
    if (!isCaptchaValid) {
      return res
        .status(400)
        .json({ error: "Invalid CAPTCHA. Please try again." });
    }

    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    const user = await User.create({ name, email, password });
    const token = generateToken(user);

    res.cookie("token", token, cookieOptions);

    await emailQueue.add("welcome-email", {
      to: user.email,
      subject: "Welcome!",
      html: `<p>Hello ${user.name}, thanks for joining!</p>`,
    });

    res.status(201).json({ id: user.id, name: user.name, email: user.email });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const isValid = await user.validatePassword(password);

    if (!isValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const token = generateToken(user);
    res.cookie("token", token, cookieOptions);
    const { id, name, email: _email } = user.dataValues;
    res.json({
      id,
      name,
      email: _email,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie("token", cookieOptions);
  res.json({ message: "Logged out successfully" });
};

export const getMe = async (req: Request, res: Response) => {
  // The user is attached by verifyToken middleware
  if (!req.user) {
    return res.status(401).json({ error: "Not authenticated" });
  }
  // Return user data without password (already excluded in middleware)
  res.json(req.user);
};
