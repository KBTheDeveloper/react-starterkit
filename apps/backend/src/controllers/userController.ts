import { Response, Request } from "express";
import db from "../models/index.js";

const { User } = db;

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteUser = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const userId = parseInt(req.params.id);
    const currentUser = req.user; // attached by verifyToken middleware

    // Check if user exists
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Authorization: only delete yourself (or admin – extend later)
    if (currentUser?.id !== userId) {
      return res
        .status(403)
        .json({ error: "Forbidden: Cannot delete other users" });
    }

    await user.destroy();
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
