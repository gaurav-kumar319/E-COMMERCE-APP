const express = require("express");
const router = express.Router();

const {
  getProducts,
  getProductById,
  createProduct,
} = require("../controllers/productController");

// GET ALL PRODUCTS
router.get("/", getProducts);

// GET SINGLE PRODUCT
router.get("/:id", getProductById);

// CREATE PRODUCT
router.post("/", createProduct);

module.exports = router;