///variables globales:
let btnSelec = 0;
const url = api.getUrl();
function cerrarSesion() {
  //console.log("Cerrar sesion");
  localStorage.removeItem("token");
  window.location.href = "../index.html";
}
document.addEventListener("DOMContentLoaded", function () {
  //verificar si se tiene una sesion iniciada
  if (!verificarSesion()) {
    window.location.href = "../index.html";
  }
  //verificar si es un admin o no

  var opFetch = {
    method: "GET",
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };

  fetch(url + "/user/me/", opFetch)
    .then(function (response) {
      if (!response) {
        throw new Error("Hubo un problema: " + response.statusText);
      }
      return response.json();
    })
    .then(function (data) {
      if (data.role === "user") {
        window.location.href = "../sec_user/user.html";
      }
    })
    .catch(function (error) {
      console.log("error al realizar la solicitud: " + error);
    });
  insertarMenu();
});
function verificarSesion() {
  // Recuperar el token almacenado en LocalStorage
  var token = localStorage.getItem("token");

  // Verificar si el token existe
  if (token) {
    // Si el token existe, la sesión está iniciada
    return true;
  } else {
    // Si el token no existe, la sesión no está iniciada
    return false;
  }
}
function insertarMenu() {
  //insertar el menu
  var botones = [];
  var elementosLista = [];
  const contenedor = document.getElementById("submenu");
  const nav = document.createElement("nav");
  nav.className = "Submenu";
  const lista = document.createElement("ul");
  lista.className = "Submenu-lista";
  const btnTitulos = [
    "Mis datos",
    "Agregar producto",
    "Registrar deuda",
    "Registrar pago",
    "Buscar cliente",
    "Cerrar Sesión",
  ];

  for (let i = 0; i < btnTitulos.length; i++) {
    const elem = document.createElement("li");
    elem.className = "Submenu-item";
    const btn = document.createElement("button");
    btn.className = "btn-principal";
    btn.innerHTML = btnTitulos[i];
    elem.appendChild(btn);
    botones.push(btn);
    elementosLista.push(elem);
  }
  for (let i = 0; i < botones.length; i++) {
    lista.appendChild(elementosLista[i]);
    botones[i].onclick = function () {
      clickMenu(i, botones);
    };
  }
  nav.appendChild(lista);
  contenedor.appendChild(nav);
  ////Seleccionar [0] como el elemento seleccionado por defecto
  clickMenu(0, botones);
}
function vaciarDiv(contenedor) {
  contenedor.innerHTML = "";
}
function clickMenu(ind, botones) {
  vaciarDiv(document.getElementById("admin-cont"));
  btnSelec = ind;
  for (let i = 0; i < botones.length; i++) {
    botones[i].className = "btn-principal";
  }
  botones[btnSelec].className = "btn-principal btn-principal-selected";
  if (btnSelec === 0) {
    misDatos();
  } else if (btnSelec === 1) {
    agregarProducto();
  } else if (btnSelec === 2) {
    registrarDeuda();
  } else if (btnSelec === 3) {
    registrarPago();
  } else if (btnSelec === 4) {
    buscarCliente();
  } else if (btnSelec === 5) {
    cerrarSesion();
  }
}
async function misDatos() {
  document.getElementsByTagName("title")[0].innerHTML = "Mis datos";
  var datos = [];

  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const encabezados = ["Nombre(s)", "Apellido(s)", "Correo electrónico"];
  datos.toString;
  const contenedor = document.getElementById("admin-cont");
  const contenedorHijo = document.createElement("div");

  axios
    .get(url + "/user/me/", { headers })
    .then(function (response) {
      var datosPet = [];
      datosPet.push(response.data.firstname);
      datosPet.push(response.data.lastname);
      datosPet.push(response.data.email);
      for (let i = 0; i < encabezados.length; i++) {
        const enc = document.createElement("h5");
        enc.innerHTML = encabezados[i];
        const dato = document.createElement("h6");
        dato.innerHTML = datosPet[i];
        contenedorHijo.appendChild(enc);
        contenedorHijo.appendChild(document.createElement("br"));
        contenedorHijo.appendChild(dato);
        contenedorHijo.appendChild(document.createElement("br"));
      }
    })
    .catch(function (error) {
      console.log(error);
    });

  contenedor.appendChild(contenedorHijo);
}
function agregarProducto() {
  document.getElementsByTagName("title")[0].innerHTML = "Agregar producto";
  const contenedor = document.getElementById("admin-cont");
  const p = document.createElement("h3");
  p.innerHTML = "Agregar un producto:";
  p.className = "addProductEnc";
  contenedor.appendChild(p);
  const contenedorPadre = document.createElement("div");
  contenedorPadre.className = "contAddProduct";
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

  formulario.addEventListener("submit", function (event) {
    event.preventDefault();
    if (verificarSesion()) {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      axios
        .get(url + "/user/me/", { headers })
        .then(function (response) {
          if (response.data.role === "admin") {
            if (btnSelec === 1) {
              const multipart = new FormData();
              const fileForm = document.getElementById("imagenProd");
              const tituloForm = document.getElementById("titulo").value;
              const precioForm = document.getElementById("precio").value;
              const categoria = document.getElementById("categoria").value;

              for (let i = 0; i < fileForm.files.length; i++) {
                multipart.append(`file${i}`, fileForm.files[i]);
              }

              multipart.append("titulo", tituloForm);
              multipart.append("precio", precioForm);
              multipart.append("categoria", categoria);
              axios
                .post(url + "/products/add", multipart, { headers })
                .then(function (response) {
                  //console.log(response.data);
                  const msgCont = document.createElement("div");
                  msgCont.className = "addProductResp";
                  contenedorPadre.appendChild(msgCont);
                  const msg = document.createElement("h5");
                  msg.innerHTML = `${tituloForm} se ha agregado exitosamente a la tienda`;
                  msgCont.appendChild(msg);
                  formulario.reset();
                })
                .catch(function (error) {
                  console.log(error);
                });
            }
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  });
}
function registrarDeuda() {
  document.getElementsByTagName("title")[0].innerHTML = "Registrar deuda";
  const contenedor = document.getElementById("admin-cont");
  const formulario = formularioFinanzas("Monto de deuda");
  contenedor.appendChild(formulario);
  formulario.addEventListener("submit", function (event) {
    event.preventDefault();

    const url = api.getUrl();
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const correo = document.getElementById("email").value;
    const deuda = document.getElementById("dinero").value;

    const datos = new FormData();
    datos.append("email", correo);
    datos.append("deuda", deuda);

    axios
      .post(url + "/user/setDeuda", datos, { headers })
      .then(function (response) {
        const contMensaje = document.createElement("div");
        contMensaje.className = "addProductResp";
        const mensaje = document.createElement("h2");
        mensaje.innerHTML =
          "Deuda a " +
          correo +
          " por $" +
          deuda +
          "MXN ha sido registrada exitosamente";
        contMensaje.appendChild(mensaje);
        contenedor.appendChild(contMensaje);
        formulario.reset();
      })
      .catch(function (error) {
        const contMensaje = document.createElement("div");
        contMensaje.className = "addProductResp";
        const mensaje = document.createElement("h2");
        mensaje.innerHTML = "Deuda no registrada. Revise los campos";
        contMensaje.appendChild(mensaje);
        contenedor.appendChild(contMensaje);
      });
  });
}

function formularioFinanzas(nombre) {
  const contPapa = document.createElement("div");
  const formulario = document.createElement("form");
  formulario.id = "formulario";
  const cajaCorreo = document.createElement("input");
  cajaCorreo.type = "email";
  cajaCorreo.id = "email";
  cajaCorreo.name = "email";
  cajaCorreo.required = true;
  cajaCorreo.placeholder = "Correo electrónico";
  cajaCorreo.className = "form-elem";

  const cajaDinero = document.createElement("input");
  cajaDinero.type = "number";
  cajaDinero.id = "dinero";
  cajaDinero.name = "dinero";
  cajaDinero.required = true;
  cajaDinero.placeholder = nombre;
  cajaDinero.className = "form-elem";
  cajaDinero.min = 0;

  const boton = document.createElement("input");
  boton.type = "submit";
  boton.value = "Registrar";
  boton.className = "btn-principal";
  boton.id = "btn-registrar";

  formulario.appendChild(cajaCorreo);
  formulario.appendChild(cajaDinero);
  formulario.appendChild(boton);
  contPapa.appendChild(formulario);

  return formulario;
}

function registrarPago() {
  document.getElementsByTagName("title")[0].innerHTML = "Registrar pago";
  const contenedor = document.getElementById("admin-cont");
  const formulario = formularioFinanzas("Monto de pago");
  contenedor.appendChild(formulario);
  formulario.addEventListener("submit", function (event) {
    event.preventDefault();

    const url = api.getUrl();
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const correo = document.getElementById("email").value;
    const deuda = document.getElementById("dinero").value;

    const datos = new FormData();
    datos.append("email", correo);
    datos.append("abono", deuda);

    axios
      .post(url + "/user/addPago/", datos, { headers })
      .then(function (response) {
        const contMensaje = document.createElement("div");
        contMensaje.className = "addProductResp";
        const mensaje = document.createElement("h2");

        axios
          .post(
            url + "/user/getUser/",
            { email: correo, active: true },
            { headers }
          )
          .then(function (response) {
            mensaje.innerHTML =
              "Pago de " +
              correo +
              " por $" +
              deuda +
              "MXN ha sido registrada exitosamente. ";
            mensaje.innerHTML +=
              "Deuda restante: $" + response.data.porPagar + "MXN";
          })
          .catch(function (error) {
            console.log(error);
          });

        contMensaje.appendChild(mensaje);
        contenedor.appendChild(contMensaje);
        formulario.reset();
      })
      .catch(function (error) {
        console.log(error);
        const contMensaje = document.createElement("div");
        contMensaje.className = "addProductResp";
        const mensaje = document.createElement("h2");
        mensaje.innerHTML = "Pago no registrado. Revise los campos";
        contMensaje.appendChild(mensaje);
        contenedor.appendChild(contMensaje);
      });
  });
}

function buscarCliente() {
  document.getElementsByTagName("title")[0].innerHTML = "Buscar cliente";
  const contenedor = document.getElementById("admin-cont");
  const p = document.createElement("p");
  p.innerHTML = "Este es el contenido de buscar cliente";
  contenedor.appendChild(p);
}
