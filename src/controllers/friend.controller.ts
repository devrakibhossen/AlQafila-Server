import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import FriendRequest from "../models/friendrequest.model.js";
import Notification from "../models/notification.model.js";

export const sendFriendRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { sender, receiver } = req.body;

    if (!sender || !receiver) {
      return res
        .status(400)
        .json({ message: "Sender and Receiver are required" });
    }
    if (sender === receiver) {
      return res
        .status(400)
        .json({ message: "You cannot send request to yourself" });
    }

    const senderId = new mongoose.Types.ObjectId(sender);
    const receiverId = new mongoose.Types.ObjectId(receiver);

    const existingRequest = await FriendRequest.findOne({
      sender: senderId,
      receiver: receiverId,
    });
    if (existingRequest) {
      return res.status(409).json({ message: "Friend request already sent" });
    }

    const newRequest = await FriendRequest.create({
      sender: senderId,
      receiver: receiverId,
      status: "pending",
    });

    await Notification.create({
      sender: senderId,
      receiver: receiverId,
      type: "friend_request",
      message: "sent you a friend request.",
    });

    return res.status(201).json({
      message: "Friend request sent successfully",
      data: newRequest,
    });
  } catch (error) {
    next(error);
  }
};

export const acceptFriendRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.body;
    const request = await FriendRequest.findById(id);
    if (!request) {
      return res.status(400).json({ message: "Request not found" });
    }

    request.status = "accepted";
    await request.save();
  } catch (error) {
    next(error);
  }
};
