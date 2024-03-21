///variables globales:
var btnSelec = 0;

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
  const url = "http://localhost:3977/api/v1" + "/user/me/";

  var opFetch = {
    method: "GET",
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };

  fetch(url, opFetch)
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
  }
}
async function misDatos() {
  var datos = [];
  const url = "http://localhost:3977/api/v1" + "/user/me/";
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const encabezados = ["Nombre(s)", "Apellido(s)", "Correo electrónico", "Rol"];
  datos.toString;
  const contenedor = document.getElementById("admin-cont");
  const p = document.createElement("p");
  p.innerHTML = "Este es el contenido de mis datos";
  const contenedorHijo = document.createElement("div");

  axios
    .get(url, { headers })
    .then(function (response) {
      var datosPet = [];
      datosPet.push(response.data.firstname);
      datosPet.push(response.data.lastname);
      datosPet.push(response.data.email);
      datosPet.push(response.data.role);
      for (let i = 0; i < encabezados.length; i++) {
        const enc = document.createElement("h4");
        enc.innerHTML = encabezados[i];
        const dato = document.createElement("h5");
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

  contenedor.appendChild(p);
  contenedor.appendChild(contenedorHijo);
}
function agregarProducto() {
  const contenedor = document.getElementById("admin-cont");
  const p = document.createElement("p");
  p.innerHTML = "Este es el contenido de agregar producto";
  contenedor.appendChild(p);
  const contenedorHijo = document.createElement("div");
  const formulario = document.createElement("form");
  formulario.id = "formulario";
  contenedorHijo.appendChild(formulario);
  contenedor.appendChild(contenedorHijo);
  const formTitulo = document.createElement("input");
  formTitulo.type = "text";
  formTitulo.id = "titulo";
  formTitulo.name = "titulo";
  formTitulo.required = true;
  formTitulo.placeholder = "Titulo del prodcuto";
  formulario.appendChild(formTitulo);
  formulario.appendChild(document.createElement("br"));
  const formPrecio = document.createElement("input");
  formPrecio.type = "number";
  formPrecio.id = "precio";
  formPrecio.name = "precio";
  formPrecio.required = true;
  formPrecio.placeholder = "Precio del prodcuto";
  formPrecio.min = 0;
  formulario.appendChild(formPrecio);
  formulario.appendChild(document.createElement("br"));
  const formImagenlb = document.createElement("label");
  formImagenlb.for = "imagenProd";
  formImagenlb.innerHTML = "Selecciona la imagen para el producto";
  formulario.appendChild(formImagenlb);
  formulario.appendChild(document.createElement("br"));
  const formImagen = document.createElement("input");
  formImagen.type = "file";
  formImagen.id = "imagenProd";
  formImagen.name = "imagenProd";
  formImagen.required = true;
  formImagen.placeholder = "Imagen del prodcuto";
  formImagen.accept = "image/*";
  formulario.appendChild(formImagen);
  formulario.appendChild(document.createElement("br"));
  const enviarBtn = document.createElement("input");
  enviarBtn.type = "submit";
  enviarBtn.value = "Subir producto";
  enviarBtn.className = "btn_contacto_enviar";
  formulario.appendChild(enviarBtn);

  formulario.addEventListener("submit", function (event) {
    const urlGet = "http://localhost:3977/api/v1" + "/user/me/";
    event.preventDefault();
    if (verificarSesion()) {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      axios
        .get(urlGet, { headers })
        .then(function (response) {
          if (response.data.role === "admin") {
            if (btnSelec === 1) {
              const url = "http://localhost:3977/api/v1" + "/products/add/";
              const multipart = new FormData();
              const fileForm = document.getElementById("imagenProd");
              const tituloForm = document.getElementById("titulo").value;
              const precioForm = document.getElementById("precio").value;
              multipart.append("imagen", fileForm.files[0]);
              multipart.append("titulo", tituloForm);
              multipart.append("precio", precioForm);
              axios
                .post(url, multipart, { headers })
                .then(function (response) {
                  console.log(response.data);
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
  const contenedor = document.getElementById("admin-cont");
  const p = document.createElement("p");
  p.innerHTML = "Este es el contenido de registrar deuda";
  contenedor.appendChild(p);
}
function registrarPago() {
  const contenedor = document.getElementById("admin-cont");
  const p = document.createElement("p");
  p.innerHTML = "Este es el contenido de registrar pago";
  contenedor.appendChild(p);
}
function buscarCliente() {
  const contenedor = document.getElementById("admin-cont");
  const p = document.createElement("p");
  p.innerHTML = "Este es el contenido de buscar cliente";
  contenedor.appendChild(p);
}
