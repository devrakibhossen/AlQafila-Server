import { NextFunction, Request, Response } from "express";
import Comment from "../models/comment.model.js";
import mongoose from "mongoose";

export const addComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { postId, content, authorId, parentId } = req.body;
    if (!postId || !content || !authorId) {
      throw new Error("All are required");
    }

    const newComment = await Comment.create({
      postId: new mongoose.Types.ObjectId(postId),
      content,
      authorId: new mongoose.Types.ObjectId(authorId),
      parentId,
    });

    const fullComment = await Comment.findById(newComment._id).populate(
      "authorId",
      "name username profileImage "
    );

    return res.status(200).json({
      success: true,
      message: "Comment added successfully",
      comment: fullComment,
    });
  } catch (error) {
    next(error);
  }
};

export const getComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const comment = await Comment.find()
      .sort({ createdAt: -1 })
      .populate("authorId", "name username profileImage");

    return res.status(200).json({
      success: true,
      comment,
    });
  } catch (error) {
    next(error);
  }
};

// export const deleteComment = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {};

// export const updateComment = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {};
