import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import FriendRequest from "../models/friendrequest.model.js";
import Notification from "../models/notification.model.js";
import { io } from "../app.js";
import User from "../models/user.model.js";

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

    io.to(receiver).emit("friendRequest", {
      sender,
      message: "sent you a friend request",
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
    const { id } = req.params;
    const request = await FriendRequest.findById(id);
    if (!request) {
      return res.status(400).json({ message: "Request not found" });
    }

    request.status = "accepted";
    await request.save();
    io.to(request.sender.toString()).emit("friendRequestAccepted", {
      receiver: request.receiver,
      message: "accepted your friend request",
    });
    res.status(200).json({
      message: "Friend request accepted",
      requestId: request._id,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteFriendRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Invalid friend request ID" });
    }

    const request = await FriendRequest.findById(id);
    if (!request) {
      return res.status(404).json({ message: "Friend request not found" });
    }

    await FriendRequest.findByIdAndDelete(id);
    io.to(request.sender.toString()).emit("friendRequestDeleted", {
      receiver: request.receiver,
      message: "deleted your friend request",
    });
    return res
      .status(200)
      .json({ message: "Friend request deleted successfully" });
  } catch (error) {
    next(error);
  }
};

//getMyFriendRequests

export const getMyFriendRequests = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const requests = await FriendRequest.find({
      receiver: id,
      status: "pending",
    }).populate("sender", "name username email profileImage");

    res.status(200).json(requests);
  } catch (error) {
    next(error);
  }
};

export const getSentRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const sentRequest = await FriendRequest.find({
      sender: id,
      status: "pending",
    }).populate("receiver", "name username email profileImage");
    res.status(200).json(sentRequest);
  } catch (error) {
    next(error);
  }
};

export const getMyFriends = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id: myUserId } = req.params;

  try {
    const acceptedRequests = await FriendRequest.find({
      status: "accepted",
      $or: [{ sender: myUserId }, { receiver: myUserId }],
    }).populate([
      {
        path: "sender",
        select: "username name profileImage email",
      },
      {
        path: "receiver",
        select: "username name profileImage email",
      },
    ]);

    const friends = acceptedRequests.map((req) => {
      return req.sender._id.toString() === myUserId ? req.receiver : req.sender;
    });

    res.status(200).json(friends);
  } catch (error) {
    next(error);
  }
};

export const getPeopleAroundYou = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id: loggedInUserId } = req.params;
    // Step 1: Sent requests
    const sentRequests = await FriendRequest.find({
      sender: loggedInUserId,
    }).select("receiver");

    // Step 2: Accepted friends
    const acceptedFriends = await FriendRequest.find({
      $or: [{ sender: loggedInUserId }, { receiver: loggedInUserId }],
      status: "accepted",
    }).select("sender receiver");

    // Step 3: Create exclusion set
    const excludeIds = new Set();

    sentRequests.forEach((req) => {
      excludeIds.add(req.receiver.toString());
    });

    acceptedFriends.forEach((friend) => {
      const friendId =
        friend.sender.toString() === loggedInUserId.toString()
          ? friend.receiver.toString()
          : friend.sender.toString();
      excludeIds.add(friendId);
    });

    excludeIds.add(loggedInUserId.toString());

    // Step 4: Find users excluding the above
    const users = await User.find({
      _id: { $nin: Array.from(excludeIds) },
    }).select("username email name profileImage");

    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
