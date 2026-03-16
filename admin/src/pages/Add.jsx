import React, { useState } from "react";
import { assets } from "../assets/assets";

const Add = () => {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [price, setPrice] = useState("");
  const [sizes, setSizes] = useState([]);
  const [bestseller, setBestseller] = useState(false);

  const toggleSize = (size) => {
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size],
    );
  };

  const submitHandler = (event) => {
    event.preventDefault();
    console.log({
      name,
      description,
      category,
      subCategory,
      price,
      sizes,
      bestseller,
      images: [image1, image2, image3, image4].filter(Boolean),
    });
  };

  return (
    <form
      onSubmit={submitHandler}
      className="flex flex-col gap-4 sm:gap-6 w-full max-w-4xl ml-0 sm:ml-4 md:ml-8 lg:ml-12"
    >
      {/* Image Upload */}
      <div className="flex flex-col gap-2">
        <p className="text-sm sm:text-base font-medium text-gray-700">
          Upload Image
        </p>
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {[
            { id: "image1", state: image1, setter: setImage1 },
            { id: "image2", state: image2, setter: setImage2 },
            { id: "image3", state: image3, setter: setImage3 },
            { id: "image4", state: image4, setter: setImage4 },
          ].map(({ id, state, setter }) => (
            <label key={id} htmlFor={id} className="cursor-pointer">
              <img
                src={state ? URL.createObjectURL(state) : assets.upload_area}
                alt={`Upload area ${id}`}
                className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-cover border border-dashed border-gray-300 rounded-md hover:border-gray-500 transition-colors"
              />
              <input
                type="file"
                id={id}
                hidden
                onChange={(e) => setter(e.target.files[0])}
              />
            </label>
          ))}
        </div>
      </div>

      {/* Product Name */}
      <div className="flex flex-col gap-1">
        <p className="text-sm sm:text-base font-medium text-gray-700">
          Product Name
        </p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full max-w-2xl px-3 sm:px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-gray-800 transition-colors text-sm"
          placeholder="Type here"
          required
        />
      </div>

      {/* Product Description */}
      <div className="flex flex-col gap-1">
        <p className="text-sm sm:text-base font-medium text-gray-700">
          Product Description
        </p>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full max-w-2xl px-3 sm:px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-gray-800 transition-colors text-sm resize-none"
          placeholder="Write content here"
          rows={4}
          required
        />
      </div>

      {/* Category, Sub Category, Price */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 max-w-2xl">
        <div className="flex flex-col gap-1">
          <p className="text-sm sm:text-base font-medium text-gray-700">
            Product Category
          </p>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-gray-800 transition-colors text-sm bg-white"
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-sm sm:text-base font-medium text-gray-700">
            Product Sub Category
          </p>
          <select
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
            className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-gray-800 transition-colors text-sm bg-white"
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-sm sm:text-base font-medium text-gray-700">
            Product Price
          </p>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-gray-800 transition-colors text-sm"
            placeholder="25"
            required
          />
        </div>
      </div>

      {/* Sizes */}
      <div className="flex flex-col gap-2">
        <p className="text-sm sm:text-base font-medium text-gray-700">
          Product Sizes
        </p>
        <div className="flex flex-wrap gap-2">
          {["S", "M", "L", "XL", "XXL"].map((size) => (
            <div
              key={size}
              onClick={() => toggleSize(size)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 text-sm cursor-pointer rounded-md border transition-colors select-none ${
                sizes.includes(size)
                  ? "bg-black text-white border-black"
                  : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
              }`}
            >
              {size}
            </div>
          ))}
        </div>
      </div>

      {/* Bestseller */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="bestseller"
          checked={bestseller}
          onChange={() => setBestseller((prev) => !prev)}
          className="w-4 h-4 cursor-pointer accent-black"
        />
        <label
          htmlFor="bestseller"
          className="text-sm text-gray-700 cursor-pointer"
        >
          Add to bestseller
        </label>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full sm:w-fit bg-black text-white px-8 py-3 text-sm rounded-md cursor-pointer hover:bg-gray-800 active:bg-gray-700 transition-colors"
      >
        ADD PRODUCT
      </button>
    </form>
  );
};

export default Add;
