import express from "express";
import authRoutes from "./src/routes/auth.route.js";
import dotenv from "dotenv";
import connectDB from "./src/lib/db.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cookieParser())
app.use("/api/auth", authRoutes);

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
  connectDB();
});
