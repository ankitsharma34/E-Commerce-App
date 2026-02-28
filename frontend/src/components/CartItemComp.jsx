import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";

const CartItemComp = ({ productData, item }) => {
  const { currency } = useContext(ShopContext);
  return (
    <div className="py-4 border-t text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4">
      <div className="flex flex-start gap-6">
        <img
          className="w-16 sm:w-20"
          src={productData.image[0]}
          alt={productData.name}
        />
        <div>
          <p className="text-xs sm:text-lg font-medium">{productData.name}</p>
          <div className="flex items-center gap-5 mt-2">
            <p>
              {currency}
              {productData.price}
            </p>
            <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">
              {item.size}
            </p>
          </div>
        </div>
      </div>
      <input
        className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
        type="number"
        min={1}
        defaultValue={item.quantity}
      />
      <img
        className="w-4 mr-4 sm:w-5 cursor-pointer"
        src={assets.bin_icon}
        alt=""
      />
    </div>
  );
};

export default CartItemComp;
