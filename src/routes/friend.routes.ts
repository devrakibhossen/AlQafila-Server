import { RequestHandler, Router } from "express";
import {
  acceptFriendRequest,
  deleteFriendRequest,
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
friendRequestRouter.delete(
  "/delete-requests/:id",
  deleteFriendRequest as RequestHandler
);

export default friendRequestRouter;
