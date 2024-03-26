const Product = require("../models/product");
const image = require("../utils/image");

async function getProducts(req, res) {
  const { active,ordenar,filtro } = req.query;
  let response = null;
  if (!req.query) {
    response = await Product.find();
  } else if (active) {
    //response = await Product.find({ active });
    response = await Product.find({ active },{ categoria: filtro }).sort(ordenar);
  }
  res.status(200).send(response);
}
async function addProduct(req, res) {
  try {
    const { titulo, precio, categoria } = req.body;
    const product = new Product({
      titulo: titulo,
      precio: precio,
      rutas: [],
      fecha: Date.now(),
      categoria: categoria,
      active: true,
    });

    if (req.files) {
      var nuevasRutas = [];
      for (let i = 0; i < Object.keys(req.files).length; i++) {
        const imagePath = image.getImagePath(req.files[`file${i}`]);
        var nuevaRuta = { imagen: imagePath };
        nuevasRutas.push(nuevaRuta);
      }
      product.rutas = nuevasRutas;
    }
    const productStorage = await product.save();
    //console.log(productStorage);
    res.status(200).send({ msg: "ok" });
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
