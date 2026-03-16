import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";
// function for adding product
const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body;

    const image1 = req.files.image1 && req.files.image1[0]; // if image1 exists, read it
    const image2 = req.files.image2 && req.files.image2[0]; // if image2 exists, read it
    const image3 = req.files.image3 && req.files.image3[0]; // if image3 exists, read it
    const image4 = req.files.image3 && req.files.image4[0]; // if image4 exists, read it

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined,
    );

    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      }),
    );

    // save all the data in DB
    const productData = {
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      sizes: JSON.parse(sizes),
      bestseller: bestseller === "true" ? true : false,
      images: imagesUrl,
      date: Date.now(),
    };
    const product = new productModel(productData);
    await product.save();

    return res.json({ success: true, message: "product Data Added" });
  } catch (error) {
    console.error(error);
    return res.json({ success: false, error });
  }
};

// function to list products
const listProduct = async (req, res) => {
  try {
    const products = await productModel.find({});
    return res.json({ success: true, products });
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: error.message });
  }
};

// function to remove products
const removeProduct = async (req, res) => {};

// function to get single products info
const getSingleProductInfo = async (req, res) => {};

export { addProduct, listProduct, removeProduct, getSingleProductInfo };
