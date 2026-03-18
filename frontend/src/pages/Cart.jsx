import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import CartItemComp from "../components/CartItemComp";
import CartTotal from "../components/CartTotal";

const Cart = () => {
  const { products, cartItems, navigate } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item],
            });
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products]);

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>

      {cartData.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-lg text-gray-400">Your cart is empty</p>
          <button
            onClick={() => navigate("/collection")}
            className="mt-6 bg-black text-white text-sm px-8 py-3 cursor-pointer hover:bg-gray-800 transition-colors"
          >
            CONTINUE SHOPPING
          </button>
        </div>
      ) : (
        <>
          <div>
            {cartData.map((item) => {
              const productData = products.find(
                (product) => product._id === item._id,
              );
              if (!productData) return null;
              return (
                <CartItemComp
                  key={`${item._id}-${item.size}`}
                  productData={productData}
                  item={item}
                />
              );
            })}
          </div>

          <div className="flex justify-end my-20">
            <div className="w-full sm:w-[450px]">
              <CartTotal />
              <div className="w-full text-end">
                <button
                  onClick={() => navigate("/place-order")}
                  className="bg-black text-white text-sm my-8 px-8 py-3 cursor-pointer hover:bg-gray-800 transition-colors"
                >
                  PROCEED TO CHECKOUT
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
