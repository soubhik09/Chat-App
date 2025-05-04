import express from "express";
import authRoutes from "./src/routes/auth.route.js";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/lib/db.js";
import cookieParser from "cookie-parser";
import messageRoutes from "./src/routes/message.route.js";
import { app , server } from "./src/lib/socket.js";

dotenv.config();
const port = process.env.PORT;

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.FRONTEND_BASE_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

server.listen(port, () => {
  connectDB();
  console.log(`Server is running at ${port}`);
});
