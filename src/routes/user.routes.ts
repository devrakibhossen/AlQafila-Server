import { Request, Response, Router } from "express";

const userRouter = Router();

userRouter.get("/users", (req: Request, res: Response) => {
  res.send("users");
});
userRouter.get("/users/:email", (req: Request, res: Response) => {
  res.send("users/rakib");
});
userRouter.delete("/users/:id", (req: Request, res: Response) => {
  res.send("users/rakib");
});

export default userRouter;
