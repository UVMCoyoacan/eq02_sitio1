
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
  const contenedor = document.getElementById("submenu");
  const btnTitulos = [
    "Modificar contraseña",
    "Agregar producto",
    "Eliminar producto",
    "Registrar deuda",
    "Registrar pago",
    "Buscar cliente",
    "Cerrar Sesión",
  ];

  for (let i = 0; i < btnTitulos.length; i++) {
    const btn = document.createElement("button");
    btn.className = "btn-principal btn-secundario";
    btn.innerHTML = btnTitulos[i];
    botones.push(btn);
    contenedor.appendChild(btn);
  }
  for (let i = 0; i < botones.length; i++) {
    botones[i].onclick = function () {
      clickMenu(i, botones);
    };
  }
  ////Seleccionar [0] como el elemento seleccionado por defecto
  clickMenu(0, botones);
}
function vaciarDiv(contenedor) {
  contenedor.innerHTML = "";
}
function clickMenu(btnSelec, botones) {
  vaciarDiv(document.getElementById("User-cont"));
  for (let i = 0; i < botones.length; i++) {
    botones[i].className = "btn-principal btn-secundario";
  }
  botones[btnSelec].className = "btn-principal btn-principal-selected btn-secundario";
  if (btnSelec === 0) {
    misDatos();
  } else if (btnSelec === 1) {
    agregarProducto();
  }
  else if (btnSelec === 2) {
    editarTienda();
  }
  else if (btnSelec === 3) {
    registrarDeuda();
  } else if (btnSelec === 4) {
    registrarPago();
  } else if (btnSelec === 5) {
    buscarCliente();
  } else if (btnSelec === 6) {
    cerrarSesion();
  }
}
async function misDatos() {
  const url = api.getUrl();
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  axios
    .get(url + "/user/me/", { headers })
    .then(function (response) {
      modulo.getMisDatos(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}
function agregarProducto() {
  document.getElementsByTagName("title")[0].innerHTML = "Agregar producto";
  const contenedor = document.getElementById("User-cont");
  const p = document.createElement("h3");
  p.innerHTML = "Agregar un producto:";
  p.className = "addProductEnc";
  contenedor.appendChild(p);
  createFormTienda();

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

            const multipart = new FormData();
            const fileForm = document.getElementById("imagenProd");
            const tituloForm = document.getElementById("titulo").value;
            const precioForm = document.getElementById("precio").value;
            const categoria = document.getElementById("categoria").value;
            const contenedorPadre = document.getElementById("contPadre");

            for (let i = 0; i < fileForm.files.length; i++) {
              multipart.append(`file${i}`, fileForm.files[i]);
            }

            multipart.append("titulo", tituloForm);
            multipart.append("precio", precioForm);
            multipart.append("categoria", categoria);
            console.log(url + "/products/add");
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
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  });
}
function registrarDeuda() {
  document.getElementsByTagName("title")[0].innerHTML = "Registrar deuda";
  const contenedor = document.getElementById("User-cont");
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
  boton.id = "btn-principal";

  formulario.appendChild(cajaCorreo);
  formulario.appendChild(cajaDinero);
  formulario.appendChild(boton);
  contPapa.appendChild(formulario);

  return formulario;
}

function registrarPago() {
  document.getElementsByTagName("title")[0].innerHTML = "Registrar pago";
  const contenedor = document.getElementById("User-cont");
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
  const contenedor = document.getElementById("User-cont");
  const p = document.createElement("p");
  p.innerHTML = "Este es el contenido de buscar cliente";
  contenedor.appendChild(p);
  const url = api.getUrl();
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const form = document.createElement("form");
  const cajaBuscar = document.createElement("input");
  cajaBuscar.id = "buscar";
  cajaBuscar.name = "buscar";
  cajaBuscar.placeholder = "Buscar por correo electrónico";
  cajaBuscar.type = "email";
  cajaBuscar.required = true;
  cajaBuscar.className = "form-elem";
  const btnBuscar = document.createElement("input");
  btnBuscar.id = "btnBuscar";
  btnBuscar.name = "btnBuscar";
  btnBuscar.value = "Buscar";
  btnBuscar.type = "submit";
  btnBuscar.className = "btn-principal";

  form.appendChild(cajaBuscar);
  form.appendChild(btnBuscar);
  contenedor.appendChild(form);
  const titulo = document.createElement("h3");
  contenedor.appendChild(titulo);
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const usuario = document.getElementById("buscar").value;
    const multipart = new FormData();
    multipart.append("email", usuario);
    multipart.append("active", true);

    axios
      .post(url + "/user/getUser/", multipart, { headers })
      .then(function (response) {
        titulo.innerHTML = `Finanzas de ${response.data.firstname} ${response.data.lastname}:`;
        modulo.getMisPagos(response);
      })
      .catch(function (error) {
        titulo.innerHTML = `El correo ${usuario} no se ha encontrado:`;
        if (document.getElementById("contenedorDeMisPagos") != undefined) {
          document.getElementById("contenedorDeMisPagos").innerHTML = "";
        }
      });
  });
}
function editarTienda() {
  const contenedor = document.getElementById("User-cont");
  const seccion1 = document.createElement("div");
  seccion1.className = "Seccion";
  contenedor.appendChild(seccion1);
  const tiendaFilt = document.createElement("div");
  tiendaFilt.className = "tienda-filtros";
  tiendaFilt.id = "tienda-filtros";
  seccion1.appendChild(tiendaFilt);
  ///////////////////
  const seccion2 = document.createElement("div");
  seccion2.className = "Seccion";
  contenedor.appendChild(seccion2);
  const tienda = document.createElement("div");
  tienda.className = "Tienda";
  tienda.id = "tnd";
  seccion2.appendChild(tienda);
  cargarFiltros();
  const ordenarPor = modulo.getFiltros(Number(0));
  const url = api.getUrl();
  const urlImg = api.getUrlImg();
  const filtro = "Todos";
  const params = {
    active: true,
    ordenarPor,
    filtro: filtro,
  };
  axios
    .post(url + "/products/", { params })
    .then(function (response) {
      modulo.getTienda(response, 1);
    })
    .catch(function (error) {
      console.log(error);
    });
}