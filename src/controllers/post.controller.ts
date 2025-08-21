import { NextFunction, Request, Response } from "express";
import Post from "../models/post.model.js";
import mongoose from "mongoose";
// addPost

export const addPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      authorId,
      text,
      hashtags,
      shares,
      images,
      video,
      profileStatus,
      views,
    } = req.body;

    if (!authorId || !text) {
      throw new Error("All fields are required");
    }
    const newPost = await Post.create({
      authorId: new mongoose.Types.ObjectId(authorId),
      text,
      hashtags,
      shares,
      images,
      video,
      profileStatus,
      views,
    });

    const fullPost = await Post.findById(newPost._id).populate(
      "authorId",
      "name username profileImage email"
    );
    return res.status(201).json({
      success: true,
      message: "Post created successfully",
      post: fullPost,
    });
  } catch (error) {
    next(error);
  }
};

// getPost

export const getPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate("authorId", "name username profileImage email");
    res.status(200).json({
      success: true,
      data: posts,
    });
  } catch (error) {
    next(error);
  }
};

// deletePost

export const deletePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.send("post deleted");
  } catch (error) {
    next(error);
  }
};

// updatePost

export const updatePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.send("post Updated");
  } catch (error) {
    next(error);
  }
};

export const getPostDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, slug } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Post Id" });
    }

    const post = await Post.findOne({
      _id: id,
      slug: { $regex: `^${decodeURIComponent(slug)}$`, $options: "i" },
    }).populate("authorId", "name username profileImage");
    if (!post) {
      return res.status(404).json({ message: "Post Not Found" });
    }

    return res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    next(error);
  }
};
