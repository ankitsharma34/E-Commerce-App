import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";

const List = ({ token }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/product/remove",
        { id },
        { headers: { token } },
      );

      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="flex flex-col gap-3 m-4 sm:m-6 md:m-8 lg:m-10 w-full max-w-5xl">
      {/* Title */}
      <p className="text-lg sm:text-xl font-semibold mb-4 text-gray-800">
        All Products List
      </p>

      {/* Table Header */}
      <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-3 px-6 border border-gray-200 bg-gray-100 rounded-t-md text-sm font-semibold text-gray-700">
        <b>Image</b>
        <b>Name</b>
        <b>Category</b>
        <b>Price</b>
        <b className="text-center">Action</b>
      </div>

      {/* Product List */}
      {list.length === 0 ? (
        <div className="text-center py-16 text-gray-400 text-sm border border-gray-200 rounded-md bg-white">
          No products found.
        </div>
      ) : (
        <div className="flex flex-col gap-2 md:gap-0">
          {list.map((item) => (
            <div
              key={item._id}
              className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-4 py-3 px-6 border border-gray-200 bg-white hover:bg-gray-50 transition-colors text-sm text-gray-700 rounded-md md:rounded-none"
            >
              <img
                src={item.images?.[0]}
                alt={item.name}
                className="w-14 h-14 object-cover rounded-md border border-gray-100"
              />
              <p className="truncate font-medium">{item.name}</p>
              <p className="hidden md:block text-gray-500">{item.category}</p>
              <p className="font-medium">
                {currency}
                {item.price}
              </p>
              <div className="flex justify-end md:justify-center">
                <p
                  onClick={() => removeProduct(item._id)}
                  className="w-8 h-8 flex items-center justify-center text-base cursor-pointer text-red-400 hover:text-white hover:bg-red-500 rounded-full transition-all select-none"
                >
                  X
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Product Count */}
      {list.length > 0 && (
        <p className="text-xs text-gray-400 mt-2 ml-2">
          Showing {list.length} product{list.length !== 1 ? "s" : ""}
        </p>
      )}
    </div>
  );
};

export default List;
