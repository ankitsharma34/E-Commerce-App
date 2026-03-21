// pages/Verify.jsx
import React, { useContext, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const Verify = () => {
  const { navigate, token, setCartItems, backendUrl } = useContext(ShopContext);
  const [searchParams] = useSearchParams();

  // Read query params: ?success=true&orderId=abc123
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const verifyPayment = async () => {
    try {
      if (!token) return;

      const response = await axios.post(
        backendUrl + "/api/order/verify-stripe",
        { success, orderId },
        { headers: { token } },
      );

      if (response.data.success) {
        setCartItems({});
        navigate("/orders");
        toast.success("Payment successful!");
      } else {
        navigate("/cart");
        toast.error("Payment cancelled");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    verifyPayment();
  }, [token]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-20 h-20 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
    </div>
  );
};

export default Verify;
