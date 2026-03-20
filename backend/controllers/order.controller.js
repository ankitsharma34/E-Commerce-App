import orderModel from "../models/order.model.js";
import userModel from "../models/userModel.js";

// placing order using COD method
const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    return res.json({ success: true, message: "Order Placed" });
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: error.message });
  }
};

// placing order using Stripe method
const placeOrderStripe = async (req, res) => {};

// placing order using Razorpay method
const placeOrderRazorpay = async (req, res) => {};

// all order data for admin
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, orders });
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: error.message });
  }
};

// user order data
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;

    const orders = await orderModel.find({ userId });
    return res.json({ success: true, orders });
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: error.message });
  }
};

// update order status by admin
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    if (!orderId || !status) {
      return res.json({ success: false, message: "Missing required fields" });
    }

    const order = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true },
    );

    if (!order) {
      return res.json({ success: false, message: "Order not found" });
    }

    return res.json({ success: true, message: "Status updated" });
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: error.message });
  }
};

export {
  placeOrder,
  placeOrderRazorpay,
  placeOrderStripe,
  allOrders,
  userOrders,
  updateStatus,
};
