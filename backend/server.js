import express from "express";
import cors from "cors";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import dotenv from "dotenv";

// app config
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
connectDB();
connectCloudinary();

// middlewares
app.use(express.json());
app.use(cors());

// API endpoints
app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  res.send("API working");
});

app.listen(PORT, () => {
  console.log(`Server started on PORT: ${PORT}`);
});
