const express = require("express");
const multiparty = require("connect-multiparty");
const ProductController = require("../controllers/product");
const md_auth = require("../middlewares/autenticate");

const md_upload = multiparty({ uploadDir: "./uploads/products" });
const api = express.Router();

api.get("/products", [md_upload], ProductController.getProducts);
api.post(
  "/products/add",
  [md_auth.asureAuth, md_upload],
  ProductController.addProduct
);
api.delete(
  "/product/:id",
  [md_auth.asureAuth, md_upload],
  ProductController.deleteProduct
);

module.exports = api;
