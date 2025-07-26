import { RequestHandler, Router } from "express";
import {
  acceptFriendRequest,
  deleteFriendRequest,
  getMyFriendRequests,
  getMyFriends,
  getPeopleAroundYou,
  getSentRequest,
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
friendRequestRouter.get(
  "/mySentRequests/:id",
  getSentRequest as RequestHandler
);
friendRequestRouter.get("/myFriends/:id", getMyFriends as RequestHandler);
friendRequestRouter.get(
  "/people-around-you/:id",
  getPeopleAroundYou as RequestHandler
);

export default friendRequestRouter;
