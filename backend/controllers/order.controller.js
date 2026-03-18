// placing order using COD method
const placeOrder = async (req, res) => {};

// placing order using Stripe method
const placeOrderStripe = async (req, res) => {};

// placing order using Razorpay method
const placeOrderRazorpay = async (req, res) => {};

// all order data for admin
const allOrders = async (req, res) => {};

// user order data
const userOrders = async (req, res) => {};

// update order status by admin
const updateStatus = async (req, res) => {};

export {
  placeOrder,
  placeOrderRazorpay,
  placeOrderStripe,
  allOrders,
  userOrders,
  updateStatus,
};
