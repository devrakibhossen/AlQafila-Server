import express from "express";
import { PORT } from "./config/env.js";
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import connectToDatabase from "./database/mongodb.js";

const app = express();

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the Alqafila api !");
});

app.listen(PORT, async () => {
  console.log(`Alqafila api is running on  https://localhost:${PORT}`);

  await connectToDatabase();
});
