import type { NextFunction, Response } from "express";
import type { AuthRequest } from "../middleware/auth";
import { User } from "../models/User";

export async function getUsers(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const users = await User.find({
      _id: { $ne: req.userId },
    })
      .select("name email avatar")
      .sort({ createdAt: -1 });
    return res.status(200).json(users);
  } catch (error) {
    res.status(500);
    next(error);
  }
}
