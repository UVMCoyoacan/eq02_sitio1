function cargarTienda() {
  console.log("Hola mundo");
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "../sec_tienda/productos.json", true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const datos = JSON.parse(xhr.responseText);
      var productos = datos.Productos;
      productos = ordenarTitulo(productos, 0);
      const contenedor = document.getElementById("tnd");
      for (let i = 0; i < productos.length; i++) {
        var item = document.createElement("div");
        item.className = "Tienda-item";
        var titulo = document.createElement("H4");
        titulo.className="Tienda-item-titulo";
        titulo.innerHTML = productos[i].Titulo;
        var sub = document.createElement("h5");
        sub.className="Tienda-item-precio";
        sub.innerHTML = "$" + productos[i].Sub + " MXN";
        var img = document.createElement("img");
        img.className = "Producto-IMG";
        img.src = productos[i].Ruta;
        item.appendChild(img);
        item.appendChild(titulo);
        item.appendChild(sub);

        contenedor.appendChild(item);
      }
    }
  };
  xhr.send();
}
function cargarTiendaApi() {
  const url = "http://localhost:3977/api/v1" + "/products/";
  const urlImg = "http://localhost:3977/";
  axios
    .get(url)
    .then(function (response) {
      var productos = response.data;
      const contenedor = document.getElementById("tnd");
      for (let i = 0; i < productos.length; i++) {
        var item = document.createElement("div");
        item.className = "Tienda-item";
        var titulo = document.createElement("H4");
        titulo.innerHTML = productos[i].titulo;
        titulo.className="Tienda-item-titulo";
        var sub = document.createElement("h5");
        sub.className="Tienda-item-precio";
        sub.innerHTML = "$" + productos[i].precio + " MXN";
        var img = document.createElement("img");
        img.className = "Producto-IMG";
        img.src = urlImg + productos[i].imagen;
        item.appendChild(img);
        item.appendChild(titulo);
        item.appendChild(sub);

        contenedor.appendChild(item);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}
function ordenarTitulo(productos, orden) {
  if (orden === 1) {
    productos.sort((a, b) => {
      const ta = a.Titulo.toLowerCase();
      const tb = b.Titulo.toLowerCase();
      if (ta < tb) {
        return -1;
      } else if (ta > tb) {
        return 1;
      }
      return 0;
    });
  } else if (orden === -1) {
    productos.sort((a, b) => {
      const ta = a.Titulo.toLowerCase();
      const tb = b.Titulo.toLowerCase();
      if (ta < tb) {
        return 1;
      } else if (ta > tb) {
        return -1;
      }
      return 0;
    });
  }
  return productos;
}
