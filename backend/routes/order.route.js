import express from "express";
import adminAuth from "../middlewares/adminAuth.js";
import {
  allOrders,
  placeOrder,
  placeOrderRazorpay,
  placeOrderStripe,
  updateStatus,
  userOrders,
} from "../controllers/order.controller.js";
import authUser from "../middlewares/authUser.js";

const orderRouter = express.Router();

// admin feature
orderRouter.post("/list", adminAuth, allOrders);
orderRouter.post("status", adminAuth, updateStatus);

// payment features
orderRouter.post("/place", authUser, placeOrder);
orderRouter.post("/stripe", authUser, placeOrderStripe);
orderRouter.post("/razorpay", authUser, placeOrderRazorpay);

// user feature
orderRouter.post("/user-orders", authUser, userOrders);

export default orderRouter;
