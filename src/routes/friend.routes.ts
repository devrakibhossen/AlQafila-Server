import { RequestHandler, Router } from "express";
import {
  acceptFriendRequest,
  sendFriendRequest,
} from "../controllers/friend.controller.js";

const friendRequestRouter = Router();
friendRequestRouter.post(
  "/friend-requests",
  sendFriendRequest as RequestHandler
);
friendRequestRouter.post(
  "/accept-requests",
  acceptFriendRequest as RequestHandler
);

export default friendRequestRouter;
