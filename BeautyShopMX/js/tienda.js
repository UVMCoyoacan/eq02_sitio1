

function cargarTienda() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "../sec_tienda/productos.json", true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const datos = JSON.parse(xhr.responseText);
      let productos = datos.Productos;
      productos = ordenarTitulo(productos, 0);
      const contenedor = document.getElementById("tnd");
      for (let i = 0; i < productos.length; i++) {
        item = document.createElement("div");
        item.className = "Tienda-item";
        const titulo = document.createElement("H4");
        titulo.className = "Tienda-item-titulo";
        titulo.innerHTML = productos[i].Titulo;
        const sub = document.createElement("h5");
        sub.className = "Tienda-item-precio";
        sub.innerHTML = "$" + productos[i].Sub + " MXN";
        const img = document.createElement("img");
        img.className = "Producto-IMG";
        let rutasIMG = [];
        for (let j = 0; j < productos[i].Rutas.length; j++) {
          rutasIMG.push(productos[i].Rutas[j].ruta);
        }
        img.src = rutasIMG[0];
        item.appendChild(img);
        item.appendChild(titulo);
        item.appendChild(sub);
        contenedor.appendChild(item);
        ///controles imagenes
        const ant = document.createElement("button");
        ant.className = "btn-dot dot-izq";
        ant.innerHTML = "❮";
        ant.onclick = function () {
          cambiarImg(rutasIMG, 0, img.src, img);
        };
        const sig = document.createElement("button");
        sig.className = "btn-dot dot-der";
        sig.innerHTML = "❯";
        sig.onclick = function () {
          cambiarImg(rutasIMG, 1, img.src, img);
        };
        item.appendChild(ant);
        item.appendChild(sig);
      }
    }
  };
  xhr.send();
}
function cargarTiendaApi(ordenar,filtro) {
  if(filtro==="Todos"){filtro=""}
  const ordenarPor=obtenerFiltros(ordenar);
  const url = api.getUrl();
  const urlImg = api.getUrlImg();
  const params = {
    active: true,
    ordenar: ordenarPor,
    filtro:filtro,
  };
  axios
    .get(url + "/products/", { params: params })
    .then(function (response) {
      const productos = response.data;
      const contenedor = document.getElementById("tnd");
      for (let i = 0; i < productos.length; i++) {
        const item = document.createElement("div");
        item.className = "Tienda-item";
        const titulo = document.createElement("H4");
        titulo.innerHTML = productos[i].titulo;
        titulo.className = "Tienda-item-titulo";
        const sub = document.createElement("h5");
        sub.className = "Tienda-item-precio";
        sub.innerHTML = "$" + productos[i].precio + " MXN";
        const img = document.createElement("img");
        img.className = "Producto-IMG";
        let rutasIMG = [];

        for (let j = 0; j < Object.keys(productos[i].rutas).length; j++) {
          rutasIMG.push(productos[i].rutas[j].imagen);
        }
        img.src = urlImg + rutasIMG[0];
        item.appendChild(img);
        item.appendChild(titulo);
        item.appendChild(sub);

        contenedor.appendChild(item);

        ///controles imagenes
        const ant = document.createElement("button");
        ant.className = "btn-dot dot-izq";
        ant.innerHTML = "❮";
        ant.onclick = function () {
          cambiarImgApi(rutasIMG, 0, img.src, img);
        };
        const sig = document.createElement("button");
        sig.className = "btn-dot dot-der";
        sig.innerHTML = "❯";
        sig.onclick = function () {
          cambiarImgApi(rutasIMG, 1, img.src, img);
        };
        if (rutasIMG.length > 1) {
          item.appendChild(ant);
          item.appendChild(sig);
        }
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

function cambiarImg(rutasImg, tipo, rutaActual, imagen) {
  const fileSplit = rutaActual.split("/");
  const rutaDefActual = `../${fileSplit[4]}/${fileSplit[5]}/${fileSplit[6]}`;

  const isInArreglo = (element) => element === rutaDefActual;
  let i = rutasImg.findIndex(isInArreglo);
  if (tipo === 0) {
    if (i <= 0) {
      i = rutasImg.length - 1;
    } else {
      i--;
    }
  } else {
    if (i >= rutasImg.length - 1) {
      i = 0;
    } else {
      i++;
    }
  }

  imagen.src = rutasImg[i];
}
function cambiarImgApi(rutasImg, tipo, rutaActual, imagen) {
  const urlImg = api.getUrlImg();
  const fileSplit = rutaActual.split("/");
  const rutaDefActual = `${fileSplit[fileSplit.length - 2]}/${
    fileSplit[fileSplit.length - 1]
  }`;

  const isInArreglo = (element) => element === rutaDefActual;
  let i = rutasImg.findIndex(isInArreglo);
  if (tipo === 0) {
    if (i <= 0) {
      i = rutasImg.length - 1;
    } else {
      i--;
    }
  } else {
    if (i >= rutasImg.length - 1) {
      i = 0;
    } else {
      i++;
    }
  }
  imagen.src = urlImg + `/${rutasImg[i]}`;
}
function cargarFiltros()
{
  const categorias=api.getCategorias();
  const ordenarPor=api.getOrdenarPor();
  const contenedor=document.getElementById("tienda-filtros");
  //////////lista categorias
  const cont1=document.createElement("div");
  const listaCat=document.createElement("select");
  listaCat.className="form-elem lista-filtros";
  listaCat.id="listaCat";
  for(let i=0;i<categorias.length;i++)
  {
    const op=document.createElement("option");
    op.innerHTML=categorias[i];
    op.value=categorias[i];
    listaCat.appendChild(op);
  }
  cont1.appendChild(listaCat);
  contenedor.appendChild(cont1);
  //////////////lista ordenar
  const cont2=document.createElement("div");
  const listaOrd=document.createElement("select");
  listaOrd.className="form-elem lista-filtros";
  listaOrd.id="listaOrd";
  for(let i=0;i<ordenarPor.length;i++)
  {
    const op=document.createElement("option");
    op.innerHTML=ordenarPor[i];
    op.value=i;
    listaOrd.appendChild(op);
  }
  cont2.appendChild(listaOrd);
  contenedor.appendChild(cont2);
  listaOrd.addEventListener("change", function(){
    cargarTiendaApi(listaOrd.sele,listaCat.value);
  });
  listaCat.addEventListener("change", function(){
    cargarTiendaApi(listaOrd.value,listaCat.value);
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


function obtenerFiltros(ordenar)
{
  let respuesta;
  switch (ordenar){
    case 0:
      respuesta={"fecha":"desc"};
      break;
    case 1:
      respuesta={"fecha":"asc"};
      break;
    case 2:
      respuesta={"precio":"asc"};
      break;
    case 3:
      respuesta={"precio":"desc"};
      break;
  }
  return respuesta;
}

