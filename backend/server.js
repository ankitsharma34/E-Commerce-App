import express from "express";
import cors from "cors";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import dotenv from "dotenv";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cart.route.js";
import orderRouter from "./routes/order.route.js";

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
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
  res.send("API working");
});

app.listen(PORT, () => {
  console.log(`Server started on PORT: ${PORT}`);
});
