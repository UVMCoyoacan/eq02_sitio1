const express = require("express");
const multiparty = require("connect-multiparty");
const UserController = require("../controllers/user");
const md_auth = require("../middlewares/autenticate");

const md_upload = multiparty({ uploadDir: "./uploads/products" });
const api = express.Router();

api.get("/user/me", [md_auth.asureAuth], UserController.getMe);
api.get("/users", [md_auth.asureAuth], UserController.getUsers);
api.post("/user", [md_auth.asureAuth, md_upload], UserController.createUser);
api.post(
  "/user/setDeuda",
  [md_auth.asureAuth, md_upload],
  UserController.setDeuda
);
api.post(
  "/user/addPago",
  [md_auth.asureAuth, md_upload],
  UserController.addPago
);
api.patch(
  "/user/:id",
  [md_auth.asureAuth, md_upload],
  UserController.updateUser
);
api.delete(
  "/user/:id",
  [md_auth.asureAuth, md_upload],
  UserController.deleteUser
);
module.exports = api;
