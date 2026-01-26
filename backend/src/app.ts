import express from "express";
import { clerkMiddleware } from "@clerk/express";

import authRoutes from "./routes/authRoutes";
import chatRoutes from "./routes/chatRoutes";
import messageRoutes from "./routes/messageRoutes";
import userRoutes from "./routes/userRoutes";
import { errorHandler } from "./middleware/errorHandle";

const app = express();

app.use(express.json());

app.use(clerkMiddleware());

app.get("/health", (req, res) => {
  res.status(200).json({ message: "OK" });
});

app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

// Error handler must come after all the routes and other middlewares
// so they can catch errors passed with next(err) or thrown inside async handlers
app.use(errorHandler);

export default app;
