import express from "express";
import authRoutes from "./src/routes/auth.route.js";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/lib/db.js";
import cookieParser from "cookie-parser";
import messageRoutes from "./src/routes/message.route.js";
import { app , server } from "./src/lib/socket.js";
import path from "path"

dotenv.config();
const port = process.env.PORT;
const __dirname = path.resolve();

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);


if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/Frontend/dist")));

  app.get('/{*splat}', (req, res) => {
    res.sendFile(path.join(__dirname, "Frontend", "dist", "index.html"));
  });
}

server.listen(port, () => {
  connectDB();
  console.log(`Server is running at ${port}`);
});
