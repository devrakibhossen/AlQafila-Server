import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";
import User from "../models/user.model.js";
import { NextFunction, Request, Response } from "express";

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { username, email, password } = req.body;
    if (!email || !username) {
      throw new Error("All fields are required");
    }
    const emailAlreadyExists = await User.findOne({ email });
    if (emailAlreadyExists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }
    const usernameAlreadyExists = await User.findOne({ username });
    if (usernameAlreadyExists) {
      return res
        .status(400)
        .json({ success: false, message: "username already taken" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create(
      [
        {
          username,
          email,
          password: hashedPassword,
        },
      ],
      { session }
    );
    const token = jwt.sign({ userId: newUser[0]._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });
    await session.commitTransaction();
    session.endSession();
    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: {
        token,
        user: newUser,
      },
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error("User not Found");
      error.statusCode = 404;
      throw error;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      const error = new Error("Invalid password");
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    res.status(200).json({
      success: true,
      message: "User signed in successfully",
      data: {
        token,
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};



export const socialSignIn = async (req, res, next) => {
  try {
    const { name, email, username, profileImage } = req.body;

    if (!email || !username || !name) {
      return res.status(400).json({
        success: false,
        message: 'Name, Email, and Username are required',
      });
    }

    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        name,
        email,
        username,
        profileImage,
        authType: 'social',
      });

      await user.save();
    }

    res.status(201).json({
      success: true,
      message: 'Social user signin successfully',
      data: { user },
    });
  } catch (error) {
    console.error('Social Sign-In Error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};


export const signOut = async (req, res, next) => {};


