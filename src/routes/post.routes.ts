import { RequestHandler, Router } from "express";
import {
  addPost,
  deletePost,
  getPost,
  updatePost,
} from "../controllers/post.controller.js";

const postRouter = Router();

postRouter.post("/", addPost as RequestHandler);
postRouter.get("/", getPost);
postRouter.delete("/:id", deletePost);
postRouter.put("/:id", updatePost);

export default postRouter;
