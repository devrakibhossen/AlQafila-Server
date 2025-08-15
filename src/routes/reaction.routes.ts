import { Router } from "express";
import {
  addReaction,
  getReaction,
} from "../controllers/reaction.controller.js";

const reactionRouter = Router();

reactionRouter.post("/", addReaction);
reactionRouter.get("/:id", getReaction);

export default reactionRouter;
