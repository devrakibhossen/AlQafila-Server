import { RequestHandler, Router } from "express";
import {
  acceptFriendRequest,
  deleteFriendRequest,
  getMyFriendRequests,
  sendFriendRequest,
} from "../controllers/friend.controller.js";

const friendRequestRouter = Router();
friendRequestRouter.post(
  "/friend-requests",
  sendFriendRequest as RequestHandler
);
friendRequestRouter.patch(
  "/accept-requests/:id",
  acceptFriendRequest as RequestHandler
);
friendRequestRouter.delete(
  "/delete-requests/:id",
  deleteFriendRequest as RequestHandler
);
friendRequestRouter.get(
  "/myFriendRequests/:id",
  getMyFriendRequests as RequestHandler
);

export default friendRequestRouter;
