import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { userRouter } from "./routes/users.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

app.listen(3001, () => console.log("SERVER STARTED"));
