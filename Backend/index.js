import express from "express";
import authRoutes from "./src/routes/auth.route.js";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/lib/db.js";
import cookieParser from "cookie-parser";
import messageRoutes from "./src/routes/message.route.js";

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
  connectDB();
});
