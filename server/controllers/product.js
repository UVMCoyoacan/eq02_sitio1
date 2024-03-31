const { json } = require("body-parser");
const Product = require("../models/product");
const image = require("../utils/image");
const fs = require("fs");

async function getProducts(req, res) {
  const { active, ordenarPor, filtro } = req.body.params;
  //console.log(req.body.params);
  let response = null;
  if (!req.body) {
    response = await Product.find();
  } else {
    //response = await Product.find({ active });
    if (filtro === "Todos") {
      response = await Product.find({ active }).sort(ordenarPor);
    } else {
      response = await Product.find({ active, categoria: filtro }).sort(
        ordenarPor
      );
    }
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
    const { id } = req.body;
    let response = await Product.findById({ _id: id });
    const { rutas } = response;
    for (let i = 0; i < rutas.length; i++) {
      console.log(`Imagen ./uploads/${rutas[i].imagen} borrada`);
      fs.unlink(`./uploads/${rutas[i].imagen}`, (err) => {
        if (err) {
          console.log("error");
        }
      });
    }
    response = await Product.findByIdAndDelete({ _id: id });
    res.status(200).send(response);
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
