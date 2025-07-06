import { NextFunction, Request, Response } from "express";
import User from "../models/user.model.js";
interface HttpError extends Error {
  statusCode?: number;
}
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
      const error = new Error("User not found") as HttpError;
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
      const error = new Error("User not found") as HttpError;
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
      locations: req.body.locations,
      profileImage: req.body.profileImage,
      coverImage: req.body.coverImage,
    };
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { $set: updateData },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      const error = new Error("User not found") as HttpError;
      error.statusCode = 404;
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
      const error = new Error("User not found") as HttpError;
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

export const addEducation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
    next(error);
  }
};

export const updateEducation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, id } = req.params;
    const updatedEducation = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });
    if (!user.education || !Array.isArray(user.education)) {
      return res.status(404).json({ message: "No education records found" });
    }
    // Check if education exists
    const educationEntry = user.education.id(id);

    if (!educationEntry) {
      return res.status(404).json({ message: "Education entry not found" });
    }

    // Update fields
    // Object.keys(updatedEducation).forEach((key) => {
    //   educationEntry[key] = updatedEducation[key];
    // });

    Object.assign(educationEntry, updatedEducation);

    await user.save();

    res.status(200).json({
      message: "Education updated successfully",
      education: educationEntry,
    });
  } catch (error) {
    next(error);
  }
};

// experience

export const addExperience = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
    next(error);
  }
};

export const updateExperience = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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

    // Object.entries(updatedExperience).forEach(([key, value]) => {
    //   const k = key as keyof typeof updatedExperience;
    //   experienceEntry[k] = value;
    // });

    Object.assign(experienceEntry, updatedExperience);

    await user.save();

    res.status(200).json({
      message: "Experience updated successfully",
      experience: experienceEntry,
    });
  } catch (error) {
    next(error);
  }
};
