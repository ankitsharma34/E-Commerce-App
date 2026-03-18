import express from "express";
import {
  addToCart,
  getUserCart,
  updateCart,
} from "../controllers/cart.controller";
import authUser from "../middlewares/authUser";

const cartRouter = express.Router();

cartRouter.post("/get", authUser, getUserCart);
cartRouter.post("/add", authUser, addToCart);
cartRouter.post("/update", authUser, updateCart);

export default cartRouter;
