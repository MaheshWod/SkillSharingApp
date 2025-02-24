import express from "express";
import formidable from "express-formidable";
import { isAdmin, requireSignIn } from "../middlewares/authMiddlewares.js";
import {
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productFiltersController,
  productPhotoController,
  updateProductController,
  // productCountController,
  // productListController,
  searchProductController,
  productCategoryController,
} from "../controllers/productController.js";

const router = express.Router();

// Create Product
router.post("/create-product", requireSignIn, isAdmin, formidable(), createProductController);

// Get All Products
router.get("/get-product", getProductController);

// Get Single Product by Slug
router.get("/get-product/:slug", getSingleProductController);

// Get Product Photo
router.get("/product-photo/:pid", productPhotoController);

// Delete Product
router.delete("/product/:pid", requireSignIn, isAdmin, deleteProductController);

// Update Product
router.put("/update-product/:pid", requireSignIn, isAdmin, formidable(), updateProductController);
// filtering Route
router.post("/product-filters", productFiltersController);

// product count or pagenumber
// router.get('/product-count',productCountController)
// page ko anusar get garna
// router.get('/product-list/:page',productListController)


// searching route
router.get('/search/:keyword',searchProductController)


// semilar product 
// router.get('/related-product/:slug',relatedProductController)

// get-category-list
router.get('/product-category/:slug',productCategoryController)
export default router;

