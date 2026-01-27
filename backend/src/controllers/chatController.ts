import type { NextFunction, Response } from "express";
import type { AuthRequest } from "../middleware/auth";
import { Chat } from "../models/Chat";
import { Types } from "mongoose";

/**
 * Retrieve chats that include the authenticated user and return each chat formatted to expose the other participant and last-message metadata.
 *
 * @param req - AuthRequest where `req.userId` is the authenticated user's id
 * @returns An array of chat objects each containing:
 *  - `_id`: chat identifier
 *  - `participant`: the other participant's populated record (or null)
 *  - `lastMessage`: the chat's last message (populated)
 *  - `lastMessageAt`: timestamp of the last message
 *  - `createdAt`: chat creation timestamp
 */
export async function getChats(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = req.userId;

    const chats = await Chat.find({ participants: userId })
      .populate("participants", "name email avatar")
      .populate("lastMessage", "lastMessage")
      .sort({ lastMessageAt: -1 });

    if (!chats) {
      return res.status(404).json({ message: "Chats not found" });
    }

    const formatChats = chats.map((chat) => {
      const otherParticipant = chat.participants.find(
        (participant) => participant._id.toString() !== userId,
      );
      return {
        _id: chat._id,
        participant: otherParticipant,
        lastMessage: chat.lastMessage,
        lastMessageAt: chat.lastMessageAt,
        createdAt: chat.createdAt,
      };
    });

    return res.status(200).json(formatChats);
  } catch (error) {
    res.status(500);
    next(error);
  }
}

/**
 * Retrieves an existing chat between the authenticated user and a specified participant, or creates a new chat if none exists, then returns the chat's summary.
 *
 * Looks up a chat that contains both `req.userId` and `req.params.participantId`; if not found, creates and persists a new chat with those participants. The response payload includes the chat id, the other participant (or `null` if not available), the last message, and timestamps.
 *
 * @param req - Express request where `req.userId` is the authenticated user's id and `req.params.participantId` is the other participant's id
 * @returns An object containing:
 *   - `_id`: The chat's id
 *   - `participant`: The other participant's user object (name, email, avatar) or `null`
 *   - `lastMessage`: The chat's last message document or `undefined`
 *   - `lastMessageAt`: Timestamp of the last message
 *   - `createdAt`: Chat creation timestamp
 */
export async function getOrCreateChat(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = req.userId;
    const { participantId } = req.params;

    if (!participantId) {
      return res.status(400).json({ message: "Participant ID is required" });
    }

    if (!Types.ObjectId.isValid(participantId.toString())) {
      return res.status(400).json({ message: "Invalid participant ID" });
    }

    if (userId === participantId) {
      return res.status(400).json({ message: "You cannot chat with yourself" });
    }

    let chat = await Chat.findOne({
      participants: { $all: [userId, participantId] },
    })
      .populate("participants", "name email avatar")
      .populate("lastMessage", "lastMessage");

    if (!chat) {
      const newChat = new Chat({
        participants: [userId, participantId],
      });
      await newChat.save();
      chat = await newChat.populate("participants", "name email avatar");
    }

    const otherParticipant = chat.participants.find(
      (participant) => participant._id.toString() !== userId,
    );

    return res.status(200).json({
      _id: chat._id,
      participant: otherParticipant ?? null,
      lastMessage: chat.lastMessage,
      lastMessageAt: chat.lastMessageAt,
      createdAt: chat.createdAt,
    });
  } catch (error) {
    res.status(500);
    next(error);
  }
}