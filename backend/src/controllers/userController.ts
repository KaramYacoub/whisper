import type { NextFunction, Response } from "express";
import type { AuthRequest } from "../middleware/auth";
import { User } from "../models/User";

/**
 * Retrieve all users except the authenticated user, returning only each user's name, email, and avatar.
 *
 * @param req - Authenticated request; `req.userId` is used to exclude the current user from results
 * @returns An array of user objects with `name`, `email`, and `avatar` fields serialized in the JSON response
 */
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