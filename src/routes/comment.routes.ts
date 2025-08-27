import { Router } from "express";
import {
  addComment,
  //   deleteComment,
  getComment,
  //   updateComment,
} from "../controllers/comment.controller.js";

const commentRouter = Router();

commentRouter.post("/", addComment);
commentRouter.get("/", getComment);
// commentRouter.delete("/", deleteComment);
// commentRouter.put("/", updateComment);

export default commentRouter;
