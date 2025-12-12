import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/authRoutes.js";
import placeRoutes from "./routes/placeRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = process.env.PORT || 3000;

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/uploads", express.static(__dirname + "/uploads/"));

app.use("/", authRoutes);
app.use("/", placeRoutes);
app.use("/", bookingRoutes);

app.get("/test", (req, res) => {
  res.json("Hello World!");
});

await mongoose.connect(process.env.MONGO_URL);
console.log("MongoDB Conneccted");

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
