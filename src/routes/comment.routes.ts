import { Router } from "express";
import {
  addComment,
  deleteComment,
  getComment,
  updateComment,
} from "../controllers/comment.controller.js";

const commentRouter = Router();

commentRouter.post("/", addComment);
commentRouter.get("/:id", getComment);
commentRouter.delete("/:id", deleteComment);
commentRouter.put("/:id", updateComment);

export default commentRouter;
