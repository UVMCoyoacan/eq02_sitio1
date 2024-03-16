const mongoose = require("mongoose");
const ProductSchema = mongoose.Schema({
  titulo: String,
  precio: Number,
  imagen: String,
  fecha: Date,
  active: Boolean,
});
module.exports = mongoose.model("Product", ProductSchema);
