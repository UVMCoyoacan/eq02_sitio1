function cargarTienda() {
  console.log("Hola mundo");
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "../sec_tienda/productos.json", true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const datos = JSON.parse(xhr.responseText);
      const productos = datos.Productos;
      var contenedor = document.getElementById("tnd");
      for (let i = 0; i < productos.length; i++) {
        var item = document.createElement("div");
        item.className = "Tienda-item";
        var titulo = document.createElement("H2");
        titulo.innerHTML = productos[i].Titulo;
        var sub = document.createElement("h5");
        sub.innerHTML = productos[i].Sub;
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
