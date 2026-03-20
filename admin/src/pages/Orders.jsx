import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) return;

    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { token } },
      );
      if (response.data.success) {
        setOrders(response.data.orders.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/order/status",
        { orderId, status: event.target.value },
        { headers: { token } },
      );
      if (response.data.success) {
        await fetchAllOrders();
        toast.success("Status updated");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className="flex flex-col gap-2 m-4 sm:m-6 md:m-8 w-full max-w-5xl">
      <h3 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800">
        Orders
      </h3>

      {orders.length === 0 ? (
        <div className="text-center py-16 text-gray-400 text-sm border border-gray-200 rounded-md bg-white">
          No orders found.
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-4 items-start border border-gray-200 bg-white p-4 sm:p-6 rounded-md text-sm text-gray-700"
            >
              {/* Parcel Icon */}
              <img
                src={assets.parcel_icon}
                alt="parcel"
                className="w-12 h-12"
              />

              {/* Order Items + Address */}
              <div>
                <div className="mb-2">
                  {order.items.map((item, index) => (
                    <span key={index}>
                      {item.name} x {item.quantity}
                      <span className="text-gray-400"> ({item.size})</span>
                      {index < order.items.length - 1 && ", "}
                    </span>
                  ))}
                </div>
                <p className="font-medium">
                  {order.address.firstName} {order.address.lastName}
                </p>
                <p className="text-gray-400">
                  {order.address.street}, {order.address.city},{" "}
                  {order.address.state}, {order.address.country},{" "}
                  {order.address.zipcode}
                </p>
                <p className="text-gray-400 mt-1">{order.address.phone}</p>
              </div>

              {/* Order Info */}
              <div className="flex flex-col gap-1">
                <p>Items: {order.items.length}</p>
                <p>Method: {order.paymentMethod}</p>
                <p>Payment: {order.payment ? "Done" : "Pending"}</p>
                <p>
                  Date:{" "}
                  {new Date(order.date).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>

              {/* Amount */}
              <p className="font-medium text-base">
                {currency}
                {order.amount}
              </p>

              {/* Status Selector */}
              <select
                onChange={(e) => statusHandler(e, order._id)}
                value={order.status}
                className="p-2 border border-gray-300 rounded-md bg-white text-sm font-medium cursor-pointer"
              >
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
