import express from "express";
import {
  deleteProduct,
  getAdminProducts,
  getAllCategories,
  getLatestProducts,
  getSingleProduct,
  newProduct,
  searchAllProductsWithFilter,
  updateProduct,
} from "../controllers/product.js";
import { singleUpload } from "../middlewares/multer.js";
import { adminOnly } from "../middlewares/auth.js";

const app = express.Router();

// to create new product - /api/v1/product/new
app.post("/new", adminOnly, singleUpload, newProduct);

// to search all product with filter - /api/v1/product/allSearch
app.get("/all", searchAllProductsWithFilter);

// to get latest 10 product - /api/v1/product/latest
app.get("/latest", getLatestProducts);

// to get all unique categories - /api/v1/product/categories
app.get("/categories", getAllCategories);

// to get all product - /api/v1/product/admin-products
app.get("/admin-products", adminOnly,getAdminProducts);

//to Get, Upadate and Delete product
app
  .route("/:id")
  .get(getSingleProduct)
  .put(adminOnly,singleUpload, updateProduct)
  .delete(adminOnly,deleteProduct);

export default app;
