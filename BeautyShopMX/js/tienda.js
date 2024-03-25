function cargarTienda() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "../sec_tienda/productos.json", true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const datos = JSON.parse(xhr.responseText);
      var productos = datos.Productos;
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
        var rutasIMG=[];
        for(let j=0;j<productos[i].Rutas.length;j++)
        {
          rutasIMG.push(productos[i].Rutas[j].ruta);
        }
        img.src = rutasIMG[0];
        item.appendChild(img);
        item.appendChild(titulo);
        item.appendChild(sub);
        contenedor.appendChild(item);
        ///controles imagenes
        const ant =document.createElement("button");
        ant.className="btn-dot dot-izq";
        ant.innerHTML="❮";
        ant.onclick=function(){cargarImg(rutasIMG,0,img.src,img);};
        const sig =document.createElement("button");
        sig.className="btn-dot dot-der";
        sig.innerHTML="❯";
        sig.onclick=function(){cargarImg(rutasIMG,1,img.src,img);};
        item.appendChild(ant);
        item.appendChild(sig);

        
      }
    }
  };
  xhr.send();
}
function cargarTiendaApi() {
  const url = api.getUrl();
  const urlImg = api.getUrlImg();
  axios
    .get(url + "/products/")
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
        var rutasIMG=[];
        for(let j=0;j<productos[i].Rutas.length;j++)
        {
          rutasIMG.push(productos[i].Rutas[j].imagen);
        }
        img.src = urlImg + rutasIMG[0];
        item.appendChild(img);
        item.appendChild(titulo);
        item.appendChild(sub);

        contenedor.appendChild(item);

         ///controles imagenes
         const ant =document.createElement("button");
         ant.className="btn-dot dot-izq";
         ant.innerHTML="❮";
         ant.onclick=function(){cargarImg(rutasIMG,0,img.src,img);};
         const sig =document.createElement("button");
         sig.className="btn-dot dot-der";
         sig.innerHTML="❯";
         sig.onclick=function(){cargarImg(rutasIMG,1,img.src,img);};
         item.appendChild(ant);
         item.appendChild(sig);
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
function cargarImg(rutasImg,tipo,rutaActual,imagen)
{
  const fileSplit = rutaActual.split("/");
  const rutaDefActual=`../${fileSplit[4]}/${fileSplit[5]}/${fileSplit[6]}`;

  const isInArreglo = (element) => element === rutaDefActual;
  let i=rutasImg.findIndex(isInArreglo);
  if(tipo===0)
  {
    if(i<=0){
      i=rutasImg.length-1;
    }
    else{
      i--;
    } 
  }
  else{
    if(i>=rutasImg.length-1){
      i=0;
    }
    else{
      i++;
    } 
  }

  imagen.src=rutasImg[i];
}

