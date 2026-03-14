import express from "express";
import cors from "cors";
import connectDB from "./config/mongodb";

// app config
const app = express();
const PORT = process.env.PORT || 3000;
connectDB();

// middlewares
app.use(express.json());
app.use(cors());

// API endpoints
app.get("/", (req, res) => {
  res.send("API working");
});

app.listen(PORT, () => {
  console.log(`Server started on PORT: ${PORT}`);
});
