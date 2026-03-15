import express from "express";
import {
  addProduct,
  getSingleProductInfo,
  listProduct,
  removeProduct,
} from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.post("/add", addProduct);
productRouter.post("/remove", removeProduct);
productRouter.post("/single", getSingleProductInfo);
productRouter.get("/list", listProduct);

export default productRouter;
