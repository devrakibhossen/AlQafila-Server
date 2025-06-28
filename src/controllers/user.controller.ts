import { NextFunction, Request, Response } from "express";
import User from "../models/user.model.js";

// All user

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find();
    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

// signle user

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findOne({ email: req.params.email }).select(
      "-password"
    );

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
// controller
export const getUserByUsername = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const username = req.params.username;

    const user = await User.findOne({
      username: { $regex: new RegExp(`^${username}$`, "i") },
    }).select("-password");

    if (!user) {
      const error: any = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const updateInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.params;
    const updateData = {
      name: req.body.name,
      bio: req.body.bio,
      location: req.body.location,
      profileImage: req.body.profileImage,
      coverImage: req.body.coverImage,
    };
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { $set: updateData },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      const error = new Error("User not found");
      (error as any).statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      message: "User info updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};
export const updateAbout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.params;
    const { about } = req.body;

    const updatedUser = await User.findOneAndUpdate(
      { email },
      { $set: { about } },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      const error: any = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      message: "User about updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

// Education

export const addEducation = async (req, res) => {
  try {
    const { email } = req.params;
    const newEducation = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    user.education = user.education || [];
    user.education.push(newEducation);

    await user.save();

    res.status(200).json({
      message: "Education added successfully",
      education: user.education,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const updateEducation = async (req, res) => {
  try {
    const { email, id } = req.params;
    const updatedEducation = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Check if education exists
    const educationEntry = user.education.id(id); // Mongoose subdocument method

    if (!educationEntry) {
      return res.status(404).json({ message: "Education entry not found" });
    }

    // Update fields
    Object.keys(updatedEducation).forEach((key) => {
      educationEntry[key] = updatedEducation[key];
    });

    await user.save();

    res.status(200).json({
      message: "Education updated successfully",
      education: educationEntry,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// experience

export const addExperience = async (req, res) => {
  try {
    const { email } = req.params;
    const newExperience = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    user.experience = user.experience || [];
    user.experience.push(newExperience);

    await user.save();

    res.status(200).json({
      message: "Experience added successfully",
      experience: user.experience,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const updateExperience = async (req, res) => {
  try {
    const { email, id } = req.params;
    const updatedExperience = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Check if experience exists
    const experienceEntry = user.experience.id(id);

    if (!experienceEntry) {
      return res.status(404).json({ message: "Experience entry not found" });
    }

    // Update fields
    Object.keys(updatedExperience).forEach((key) => {
      experienceEntry[key] = updatedExperience[key];
    });

    await user.save();

    res.status(200).json({
      message: "Experience updated successfully",
      experience: experienceEntry,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
