const modulo = (function () {
  // Lo que deseas exponer públicamente
  return {
    getMisPagos: function (response) {
      return createMisPagos(response);
    },
    getMisDatos: function (response) {
      return createMisDatos(response);
    },
    getFormTienda: function () {
      createFormTienda();
    },
    getTienda: function (response, tipo) {
      createTienda(response, tipo);
    },
    getFiltros: function (ordenar) {
      return obtenerFiltros(ordenar);
    }
  };
})();
function createModulo(etiqueta, contenido, clase, id) {
  const elemento = document.createElement(etiqueta);
  elemento.innerHTML = contenido;
  elemento.className = clase;
  elemento.id = id;
  return elemento;
}
function createElementoForm(tipo, contenido, clase, id) {
  const elemento = document.createElement("input");
  elemento.type = tipo;
  elemento.id = id;
  elemento.name = id;
  elemento.placeholder = contenido;
  elemento.className = clase;
  elemento.required = true;
  if (tipo === "button" || tipo === "submit") {
    elemento.value = contenido;
  } else {
    elemento.value = "";
  }
  return elemento;
}
function createMisDatos(response) {
  const encabezados = ["Nombre(s)", "Apellido(s)", "Correo electrónico"];

  const contenedor = document.getElementById("User-cont");
  const contenedorNaranja = document.createElement("div");
  const contenedorRojo = document.createElement("div");
  const contenedorAzul = document.createElement("div");
  const botonMod = createElementoForm(
    "button",
    "Modificar contraseña",
    "btn-principal",
    "boton"
  );
  var datosPet = [];
  datosPet.push(response.data.firstname);
  datosPet.push(response.data.lastname);
  datosPet.push(response.data.email);

  for (let i = 0; i < encabezados.length; i++) {
    const enc = document.createElement("h4");
    enc.innerHTML = encabezados[i];
    const dato = document.createElement("h5");
    dato.innerHTML = datosPet[i];
    contenedorRojo.appendChild(enc);
    contenedorRojo.appendChild(dato);
    contenedorRojo.appendChild(document.createElement("br"));
  }
  contenedorNaranja.appendChild(contenedorRojo);
  contenedor.appendChild(contenedorNaranja);
  contenedor.appendChild(contenedorAzul);
  contenedorNaranja.appendChild(botonMod);

  botonMod.onclick = function () {
    contenedorAzul.innerHTML = "";
    contenedorAzul.appendChild(aparecerCambioContra());
  };
}

function aparecerCambioContra() {
  const formulario = createModulo("form", "", "", "");
  const contraActual = createElementoForm(
    "password",
    "Contraseña actual",
    "form-elem",
    "contraActual"
  );
  const contraNueva = createElementoForm(
    "password",
    "Contraseña nueva",
    "form-elem",
    "contraNueva1"
  );
  const contraNueva2 = createElementoForm(
    "password",
    "Repetir contraseña nueva",
    "form-elem",
    "contraNueva2"
  );
  const botonCambio = createElementoForm(
    "submit",
    "Cambiar contraseña",
    "btn-principal",
    "boton"
  );
  botonCambio.disabled = true;

  formulario.appendChild(contraActual);
  formulario.appendChild(document.createElement("br"));
  formulario.appendChild(contraNueva);
  formulario.appendChild(document.createElement("br"));
  formulario.appendChild(contraNueva2);
  formulario.appendChild(document.createElement("br"));
  formulario.appendChild(botonCambio);
  formulario.appendChild(document.createElement("br"));
  contraNueva2.addEventListener("input", function () {
    if (
      document.getElementById("contraNueva1").value !=
      document.getElementById("contraNueva2").value
    ) {
      contraNueva2.className = "form-elem contError";
      botonCambio.disabled = true;
    } else {
      contraNueva2.className = "form-elem";
      botonCambio.disabled = false;
    }
  });

  formulario.addEventListener("submit", function (event) {
    event.preventDefault();
    const contraViejita = document.getElementById("contraActual").value;
    const contraNueva = document.getElementById("contraNueva1").value;
    const multi = new FormData();
    multi.append("password", contraViejita);
    multi.append("newPassword", contraNueva);

    const url = api.getUrl();
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const contenedor = document.getElementById("User-cont");
    const msg = document.createElement("h5");
    contenedor.appendChild(msg);
    axios
      .post(url + "/user/updatePassword/", multi, { headers })
      .then(function (response) {
        msg.innerHTML = response.data.msg;
      })
      .catch(function (error) {
        console.log(error);
        msg.innerHTML = error.response.data.msg;
      });
  });

  return formulario;
}

function createMisPagos(response) {
  const encabezados = ["Fecha", "Monto"];
  const contenedorPrincipal = document.getElementById("User-cont");
  let contenedor;
  console.log(contenedorPrincipal);
  if (document.getElementById("contenedorDeMisPagos") != undefined) {
    contenedor = document.getElementById("contenedorDeMisPagos");
  } else {
    contenedor = document.createElement("div");
  }
  contenedorPrincipal.appendChild(contenedor);
  contenedorPrincipal.appendChild(contenedor);
  contenedor.innerHTML = "";
  contenedor.id = "contenedorDeMisPagos";

  /*/////////////////////////////////////////////////////////////////////////////////////////////////////*/
  const encabezadosAdeudosPagados = ["Cantidad", "Fecha de liquidación"];
  const tituloAdeudosPagados = document.createElement("h3");
  tituloAdeudosPagados.innerHTML = "ADEUDOS ANTERIORES";

  const adeudosPagados = document.createElement("div");

  adeudosPagados.className = "contenedor-adeudo";
  const contDatos = document.createElement("div");
  contDatos.className = "cont-adeudo2";
  const contCantidad = document.createElement("div");
  const contFechaLiq = document.createElement("div");
  contCantidad.className = "cont-deuda";
  contFechaLiq.className = "cont-porPagar";

  let datosPetAdeudosPagados = [];

  for (let i = 0; i < response.data.deudasSaldadas.length; i++) {
    datosPetAdeudosPagados.push(response.data.deudasSaldadas[i]);
    const fechaFormateada = new Date(datosPetAdeudosPagados[i].fecha);
    const dia = fechaFormateada.getDate().toString().padStart(2, "0");
    const mes = (fechaFormateada.getMonth() + 1).toString().padStart(2, "0");
    const ye = fechaFormateada.getFullYear();
    datosPetAdeudosPagados[i].fecha = `${dia}/${mes}/${ye}`;
    datosPetAdeudosPagados[i].total = `$${datosPetAdeudosPagados[i].total} MXN`;
  }

  const enc11 = document.createElement("h4");
  enc11.innerHTML = encabezadosAdeudosPagados[0];
  const enc22 = document.createElement("h4");
  enc22.innerHTML = encabezadosAdeudosPagados[1];
  contCantidad.appendChild(enc11);
  contFechaLiq.appendChild(enc22);

  for (let j = 0; j < datosPetAdeudosPagados.length; j++) {
    const dato = document.createElement("h5");
    const dato2 = document.createElement("h5");
    dato.innerHTML = datosPetAdeudosPagados[j].total;
    dato2.innerHTML = datosPetAdeudosPagados[j].fecha;
    contCantidad.appendChild(dato);
    contFechaLiq.appendChild(dato2);
  }

  contDatos.appendChild(contCantidad);
  contDatos.appendChild(contFechaLiq);
  adeudosPagados.appendChild(tituloAdeudosPagados);
  adeudosPagados.appendChild(contDatos);
  contenedor.appendChild(adeudosPagados);
  /*/////////////////////////////////////////////////////////////////////////////////////////////////////*/

  const p = document.createElement("h3");
  p.innerHTML = "PAGOS REALIZADOS";
  const contenedorHijo = document.createElement("div");
  contenedorHijo.className = "contenedor-hijo";
  const contenedorAdeudo = document.createElement("div");
  contenedorAdeudo.className = "contenedor-adeudo";
  const contenedorPago = document.createElement("div");
  contenedorPago.className = "contenedor-pago";
  let datosPet = [];
  for (let i = 0; i < response.data.pagos.length; i++) {
    datosPet.push(response.data.pagos[i]);
    const fechaFormateada = new Date(datosPet[i].fecha);
    const dia = fechaFormateada.getDate().toString().padStart(2, "0");
    const mes = (fechaFormateada.getMonth() + 1).toString().padStart(2, "0");
    const ye = fechaFormateada.getFullYear();
    datosPet[i].fecha = `${dia}/${mes}/${ye}`;
    datosPet[i].monto = `$${datosPet[i].monto} MXN`;
  }

  contenedor.appendChild(contenedorAdeudo);
  const adeudo = response.data.deuda;
  const porPagar = response.data.porPagar;

  const titulo = document.createElement("h3");
  const tituloDeuda = document.createElement("h5");
  const tituloPorPagar = document.createElement("h5");
  const cantidadDeuda = document.createElement("h6");
  const cantidadPorPagar = document.createElement("h6");
  titulo.innerHTML = "ADEUDOS";
  tituloDeuda.innerHTML = "Deuda Total";
  tituloPorPagar.innerHTML = "Por Pagar";
  cantidadDeuda.innerHTML = `$${adeudo} MXN`;
  cantidadPorPagar.innerHTML = `$${porPagar} MXN`;
  const contAdeudo = document.createElement("div");
  contAdeudo.className = "cont-adeudo2";
  const contDeuda = document.createElement("div");
  contDeuda.className = "cont-deuda";
  const contPorPagar = document.createElement("div");
  contPorPagar.className = "cont-porPagar";
  contenedorAdeudo.appendChild(titulo);
  contenedorAdeudo.appendChild(contAdeudo);
  contAdeudo.appendChild(contDeuda);
  contAdeudo.appendChild(contPorPagar);
  contDeuda.appendChild(tituloDeuda);
  contPorPagar.appendChild(tituloPorPagar);
  contDeuda.appendChild(cantidadDeuda);
  contPorPagar.appendChild(cantidadPorPagar);

  const enc = document.createElement("h4");
  enc.innerHTML = encabezados[0];
  const enc2 = document.createElement("h4");
  enc2.innerHTML = encabezados[1];

  const contMonto = document.createElement("div");
  const contFecha = document.createElement("div");
  contFecha.appendChild(enc);
  contMonto.appendChild(enc2);

  for (let j = 0; j < datosPet.length; j++) {
    const dato = document.createElement("h5");
    const dato2 = document.createElement("h5");
    dato.innerHTML = datosPet[j].fecha;
    dato2.innerHTML = datosPet[j].monto;
    contFecha.appendChild(dato);
    contMonto.appendChild(dato2);
  }
  contenedorHijo.appendChild(p);
  contenedorPago.appendChild(contFecha);
  contenedorPago.appendChild(contMonto);
  contenedorHijo.appendChild(contenedorPago);
  contenedor.appendChild(contenedorHijo);
}
function createFormTienda() {
  const contenedor = document.getElementById("User-cont");
  const contenedorPadre = document.createElement("div");
  contenedorPadre.className = "contAddProduct";
  contenedorPadre.id = "contPadre";
  contenedor.appendChild(contenedorPadre);
  //formulario

  const contenedorHijo = document.createElement("div");
  contenedorHijo.className = "contAddProductForm";
  const formulario = document.createElement("form");
  formulario.id = "formulario";
  contenedorHijo.appendChild(formulario);
  contenedorPadre.appendChild(contenedorHijo);

  //Titulo producto
  const formTitulo = document.createElement("input");
  formTitulo.type = "text";
  formTitulo.id = "titulo";
  formTitulo.name = "titulo";
  formTitulo.className = "form-elem";
  formTitulo.required = true;
  formTitulo.placeholder = "Titulo del prodcuto";
  formulario.appendChild(formTitulo);
  formulario.appendChild(document.createElement("br"));
  //precio producto
  const formPrecio = document.createElement("input");
  formPrecio.type = "number";
  formPrecio.id = "precio";
  formPrecio.name = "precio";
  formPrecio.className = "form-elem";
  formPrecio.required = true;
  formPrecio.placeholder = "Precio del prodcuto";
  formPrecio.min = 0;
  formulario.appendChild(formPrecio);
  formulario.appendChild(document.createElement("br"));
  //Imagen producto
  const formImagen = document.createElement("input");
  formImagen.type = "file";
  formImagen.id = "imagenProd";
  formImagen.name = "imagenProd";
  formImagen.className = "form-elem";
  formImagen.required = true;
  formImagen.placeholder = "Imagen del prodcuto";
  formImagen.accept = "image/*";
  formImagen.multiple = true;
  formulario.appendChild(formImagen);
  formulario.appendChild(document.createElement("br"));
  //Categoria
  nombresCategorias = api.getCategorias();
  const listaCategoria = document.createElement("select");
  listaCategoria.name = "categoria";
  listaCategoria.id = "categoria";
  listaCategoria.className = "form-elem lista-productos";
  listaCategoria.required = true;
  for (let i = 0; i < nombresCategorias.length; i++) {
    const opc = document.createElement("option");
    opc.value = nombresCategorias[i];
    opc.innerHTML = nombresCategorias[i];
    listaCategoria.appendChild(opc);
  }
  formulario.appendChild(listaCategoria);
  formulario.appendChild(document.createElement("br"));
  //boton enviar
  const enviarBtn = document.createElement("input");
  enviarBtn.type = "submit";
  enviarBtn.value = "Subir producto";
  enviarBtn.className = "btn-principal";
  formulario.appendChild(enviarBtn);
}
function vaciarDiv(contenedor) {
  contenedor.innerHTML = "";
}
function createTienda(response, tipo) {
  const urlImg = api.getUrlImg();
  const productos = response.data;
  const contenedor = document.getElementById("tnd");
  vaciarDiv(contenedor);
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
    //control admin para eliminar 
    if (tipo === 1) {
      const eliminar = document.createElement("button");
      eliminar.className = "btn-dot dot-eliminar";
      eliminar.innerHTML = "x";
      eliminar.onclick = function () {
        eliminarProducto(productos[i]._id);
      }
      item.appendChild(eliminar);
    }
  }
}
function cambiarImgApi(rutasImg, tipo, rutaActual, imagen) {
  const urlImg = api.getUrlImg();

  const fileSplit = rutaActual.split("/");
  const rutaDefActual = `${fileSplit[fileSplit.length - 2]}/${fileSplit[fileSplit.length - 1]
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
function cargarFiltros() {
  const categorias = api.getCategorias();
  const ordenarPor = api.getOrdenarPor();
  const contenedor = document.getElementById("tienda-filtros");
  contenedor.innerHTML = "";
  //////////lista categorias
  const cont1 = document.createElement("div");
  const listaCat = document.createElement("select");
  listaCat.className = "form-elem lista-filtros";
  listaCat.id = "listaCat";
  for (let i = 0; i < categorias.length; i++) {
    const op = document.createElement("option");
    op.innerHTML = categorias[i];
    op.value = categorias[i];
    listaCat.appendChild(op);
  }
  cont1.appendChild(listaCat);
  contenedor.appendChild(cont1);
  //////////////lista ordenar
  const cont2 = document.createElement("div");
  const listaOrd = document.createElement("select");
  listaOrd.className = "form-elem lista-filtros";
  listaOrd.id = "listaOrd";
  for (let i = 0; i < ordenarPor.length; i++) {
    const op = document.createElement("option");
    op.innerHTML = ordenarPor[i];
    op.value = i;
    listaOrd.appendChild(op);
  }
  cont2.appendChild(listaOrd);
  contenedor.appendChild(cont2);
  listaOrd.addEventListener("change", function () {
    cargarTiendaApi(listaOrd.value, listaCat.value);
  });
  listaCat.addEventListener("change", function () {
    cargarTiendaApi(listaOrd.value, listaCat.value);
  });
}
function cargarTiendaApi(ordenar, filtro) {
  const ordenarPor = obtenerFiltros(Number(ordenar));
  const url = api.getUrl();
  const urlImg = api.getUrlImg();
  const params = {
    active: true,
    ordenarPor,
    filtro: filtro,
  };
  axios
    .post(url + "/products/", { params })
    .then(function (response) {
      modulo.getTienda(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}


function obtenerFiltros(ordenar) {
  let respuesta;
  switch (ordenar) {
    case 0:
      respuesta = { fecha: -1 };
      break;
    case 1:
      respuesta = { fecha: 1 };
      break;
    case 2:
      respuesta = { precio: 1 };
      break;
    case 3:
      respuesta = { precio: -1 };
      break;
    default:
      respuesta = { fecha: -1 };
      break;
  }
  return respuesta;
}
function vaciarDiv(contenedor) {
  contenedor.innerHTML = "";
}

async function eliminarProducto(id) {
  const url = api.getUrl();
  const multi = new FormData();
  multi.append("id", id);
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  }
  axios
    .post(url + "/product/delete/", multi, { headers })
    .then(function (response) {
      window.location.href = "../sec_tienda/tienda.html";
    })
    .catch(function (error) {
      console.log(error);
    });
}