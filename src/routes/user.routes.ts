import { RequestHandler, Router } from "express";
import {
  getUser,
  getUsers,
  updateInfo,
  getUserByUsername,
  updateAbout,
  addEducation,
  updateEducation,
  addExperience,
  updateExperience,
} from "../controllers/user.controller.js";

const userRouter = Router();

// all users
userRouter.get("/", getUsers);

userRouter.get("/:email", getUser);
userRouter.get("/username/:username", getUserByUsername);

userRouter.put("/:email/personal-info", updateInfo);
userRouter.put("/:email/about", updateAbout);
userRouter.post("/:email/education", addEducation as RequestHandler);
userRouter.put("/:email/education/:id", updateEducation as RequestHandler);
userRouter.post("/:email/experience", addExperience as RequestHandler);
userRouter.put("/:email/experience/:id", updateExperience as RequestHandler);

export default userRouter;
