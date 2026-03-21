import orderModel from "../models/order.model.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

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

// initialize stripe gateway when called
let stripeInstance = null;
const getStripe = () => {
  if (!stripeInstance) {
    stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);
  }
  return stripeInstance;
};

// placing order using Stripe method
const placeOrderStripe = async (req, res) => {
  try {
    const stripe = getStripe(); // initialize stripe lazily
    const { userId, items, amount, address } = req.body;
    const { origin } = req.headers;

    // 1. Save order to database
    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "Stripe",
      payment: false, // -> payment is not done yet
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();
    // order saved in database

    // 2. Build line items for Stripe Checkout
    // Stripe needs items in a specific format
    const line_items = items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100, // Stripe uses cents, not dollars
      },
      quantity: item.quantity,
    }));

    // 3. Add delivery fee as a line item
    line_items.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: "Delivery Fee",
        },
        unit_amount: 10 * 100, // $10 delivery fee → 1000 cents
      },
      quantity: 1,
    });

    // 4. create stripe checkout session
    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`, // Where to redirect after SUCCESSFUL payment
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`, // Where to redirect if customer CANCELS payment
      line_items, // The items to display on Stripe's checkout page
      mode: "payment",
      // "payment" = one-time payment
      // "subscription" = recurring payments
    });

    return res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: error.message });
  }
};

// verification of payment using stripe
const verifyStripe = async (req, res) => {
  try {
    const { orderId, success, userId } = req.body;

    if (success === "true") {
      // Payment successful — update order
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      // Clear user's cart
      await userModel.findByIdAndUpdate(userId, { cartData: {} });
      return res.json({ success: true, message: "Payment successful" });
    } else {
      // Payment cancelled/failed — delete the order
      await orderModel.findByIdAndDelete(orderId);
      return res.json({ success: false, message: "Payment cancelled" });
    }
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: error.message });
  }
};

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
  verifyStripe,
};
