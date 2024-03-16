const Product = require("../models/product");
const image = require("../utils/image");

async function getProducts(req, res) {
  const { active } = req.query;
  let response = null;
  if (active === undefined) {
    response = await Product.find();
  } else {
    response = await Product.find({ active });
  }
  res.status(200).send(response);
}
async function addProduct(req, res) {
  try {
    const { titulo, precio, imagen } = req.body;
    const product = new Product({
      titulo: titulo,
      precio: precio,
      fecha: Date.now(),
      imagen: imagen,
      active: true,
    });
    if (req.files.imagen) {
      const imagePath = image.getImagePath(req.files.imagen);
      product.imagen = imagePath;
    }
    const productStorage = await product.save();
    res.status(200).send(productStorage);
  } catch (error) {
    console.log(error);
  }
}
async function deleteProduct(req, res) {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete({ _id: id });
    res.status(200).send({ msg: "Eliminacion correcta" });
  } catch (error) {
    console.error(error);
    res.status(400).send({ msg: "Error al eliminar al producto" });
  }
}

module.exports = {
  getProducts,
  addProduct,
  deleteProduct,
};
