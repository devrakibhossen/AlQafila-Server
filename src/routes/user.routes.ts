import { Router } from "express";

const userRouter = Router();

userRouter.get("/users", (req, res) => {
  res.send("users");
});
userRouter.get("/users/:email", (req, res) => {
  res.send("users/rakib");
});
userRouter.delete("/users/:id", (req, res) => {
  res.send("users/rakib");
});

export default userRouter;
