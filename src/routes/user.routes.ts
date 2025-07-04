import { Router } from "express";
import {
  getUser,
  getUsers,
  updateInfo,
  addEducation,
  updateEducation,
  addExperience,
  updateExperience,
  getUserByUsername,
  updateAbout,
} from "../controllers/user.controller.js";

const userRouter = Router();

// all users
userRouter.get("/", getUsers);

userRouter.get("/:email", getUser);
userRouter.get("/username/:username", getUserByUsername);

userRouter.put("/:email/personal-info", updateInfo);
userRouter.put("/:email/about", updateAbout);
userRouter.post("/:email/education", addEducation);
userRouter.put("/:email/education/:id", updateEducation);
userRouter.post("/:email/experience", addExperience);
userRouter.put("/:email/experience/:id", updateExperience);

export default userRouter;
