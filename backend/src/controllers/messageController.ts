import type { NextFunction, Response } from "express";
import type { AuthRequest } from "../middleware/auth";
import { Chat } from "../models/Chat";
import { Message } from "../models/Message";

/**
 * Retrieve messages for a chat if the requesting user is a participant.
 *
 * @param req - Authenticated request. Expects `req.params.chatId` as the chat identifier and `req.userId` as the authenticated user's id.
 * @param res - Express response used to send the resulting JSON payload or error status.
 * @param next - Express next function invoked with any encountered error.
 * @returns The HTTP response: a JSON array of messages for the chat when found, or a 404 JSON `{ message: "Chat not found" }` when the chat is not accessible by the requester. */
export async function getMessages(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = req.userId;
    const { chatId } = req.params;
    const chat = await Chat.find({ _id: chatId, participants: userId });

    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    const messages = await Message.find({ chat: chatId })
      .populate("sender", "name email avatar")
      .sort({ createdAt: 1 });

    return res.status(200).json(messages);
  } catch (error) {
    res.status(500);
    next(error);
  }
}