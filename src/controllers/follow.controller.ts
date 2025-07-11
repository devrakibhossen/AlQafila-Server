import { NextFunction, Request, Response } from "express";
import Follow from "../models/follow.model.js";
import Notification from "../models/notification.model.js";
import mongoose from "mongoose";

export const followUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { follower, following } = req.body;
    if (!follower || !following) {
      return res
        .status(400)
        .json({ message: "follower and following are required" });
    }
    if (follower === following) {
      return res.status(400).json({ message: "You cannot follow yourself" });
    }
    const followerId = new mongoose.Types.ObjectId(follower);
    const followingId = new mongoose.Types.ObjectId(following);
    const alreadyFollowed = await Follow.findOne({
      follower: followerId,
      following: followingId,
    });
    if (alreadyFollowed)
      return res.status(400).json({ message: "Already following." });

    const follow = new Follow({ follower: followerId, following: followingId });
    await Notification.create({
      sender: followerId,
      receiver: followingId,
      type: "follow",
      message: "started following you.",
    });

    await follow.save();

    res.status(201).json({ message: "Now following.", data: follow });
  } catch (error) {
    next(error);
  }
};

export const unfollowUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { follower, following } = req.body;

    if (!follower || !following) {
      return res
        .status(400)
        .json({ message: "Follower and Following are required" });
    }

    if (follower === following) {
      return res.status(400).json({ message: "You cannot unfollow yourself" });
    }

    const followerId = new mongoose.Types.ObjectId(follower);
    const followingId = new mongoose.Types.ObjectId(following);

    const existingFollow = await Follow.findOne({
      follower: followerId,
      following: followingId,
    });

    if (!existingFollow) {
      return res
        .status(404)
        .json({ message: "You are not following this user." });
    }

    await Follow.deleteOne({
      follower: followerId,
      following: followingId,
    });

    res.status(200).json({ message: "Unfollowed successfully." });
  } catch (error) {
    next(error);
  }
};
