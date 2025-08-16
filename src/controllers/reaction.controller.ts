import { NextFunction, Request, Response } from "express";
import Reaction from "../models/reaction.model.js";
import mongoose from "mongoose";

export const addReaction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { postId, userId, type } = req.body;

  if (!postId || !userId) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const existingReaction = await Reaction.findOne({ postId, userId });

    if (existingReaction) {
      if (type === null) {
        await Reaction.deleteOne({ _id: existingReaction._id });
        return res.status(200).json({ message: "Reaction removed" });
      } else {
        existingReaction.type = type;
        await existingReaction.save();
        return res
          .status(200)
          .json({ message: "Reaction updated", reaction: existingReaction });
      }
    }

    const newReaction = await Reaction.create({ postId, userId, type });
    return res
      .status(201)
      .json({ message: "Reaction added", reaction: newReaction });
  } catch (error) {
    next(error);
  }
};

export const getReaction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const postId = req.params.id;
  console.log(postId, mongoose.Types.ObjectId.isValid(postId));

  if (!mongoose.Types.ObjectId.isValid(postId)) {
    return res.status(400).json({ message: "Invalid postId" });
  }
  try {
    const reactions = await Reaction.find({
      postId: new mongoose.Types.ObjectId(postId),
    }).populate("userId", "username name profileImage");

    const reactioncount = reactions.reduce((acc, curr) => {
      acc[curr.type] = (acc[curr.type] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });

    return res.status(200).json({ reactions, reactioncount });
  } catch (error) {
    next(error);
  }
};
