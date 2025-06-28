import express from "express";
import cookieParser from "cookie-parser";
import { PORT } from "./config/env.js";
import cors from "cors";
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import postRouter from "./routes/post.routes.js";
import connectToDatabase from "./database/mongodb.js";
import errorMiddleware from "./middlewares/error.middleware.js";
// import { Server as SocketIOServer } from "socket.io";
// import * as http from "http";

const app = express();

// const server = http.createServer(app);
// export const io = new SocketIOServer(server, {
//   cors: {
//     origin: "*",
//     methods: ["GET", "POST"],
//   },
// });
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);
app.use(errorMiddleware);
app.get("/", (req, res) => {
  res.send("Welcome to the Alqafila api !");
});

// io.on("connection", (socket) => {
//   console.log("🟢 A user connected:", socket.id);

//   socket.on("disconnect", () => {
//     console.log("🔴 A user disconnected:", socket.id);
//   });
// });
app.listen(PORT, async () => {
  console.log(`Alqafila api is running on  http://localhost:${PORT}`);

  // await connectToDatabase();
});

connectToDatabase();

// (async () => {
//   try {
//     await connectToDatabase();
//     server.listen(PORT, () => {
//       console.log(`Alqafila api is running on http://localhost:${PORT}`);
//     });
//   } catch (error) {
//     console.error("Failed to connect to database", error);
//   }
// })();
