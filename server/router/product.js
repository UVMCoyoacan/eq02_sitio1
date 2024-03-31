const express = require("express");
const multiparty = require("connect-multiparty");
const ProductController = require("../controllers/product");
const md_auth = require("../middlewares/autenticate");
const multipar = multiparty();

const md_upload = multiparty({ uploadDir: "./uploads/products" });
const api = express.Router();

api.post("/products", [md_upload], ProductController.getProducts);
api.post(
  "/products/add",
  [md_auth.asureAuth, md_upload],
  ProductController.addProduct
);
api.post(
  "/product/delete",
  [md_auth.asureAuth, multipar],
  ProductController.deleteProduct
);

module.exports = api;
