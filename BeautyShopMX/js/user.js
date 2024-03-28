let btnSelect = 0;

function cerrarSesion() {
  //console.log("Cerrar sesion");
  localStorage.removeItem("token");
  window.location.href = "../index.html";
}
document.addEventListener("DOMContentLoaded", function () {
  if (!verificarSesion()) {
    window.location.href = "../index.html";
  }
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
  const btnTitulos = ["Mis datos", "Mis finanzas", "Cerrar Sesión"];

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
  vaciarDiv(document.getElementById("User-cont"));
  btnSelec = ind;
  for (let i = 0; i < botones.length; i++) {
    botones[i].className = "btn-principal";
  }
  botones[btnSelec].className = "btn-principal btn-principal-selected";
  if (btnSelec === 0) {
    misDatos();
  } else if (btnSelec === 1) {
    verAdeudo();
  } else if (btnSelec === 2) {
    cerrarSesion();
  }
}

function verAdeudo() {
  const url = api.getUrl();
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  axios
    .get(url + "/user/me/", { headers })
    .then(function (response) {
      modulo.getMisPagos(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}

function misDatos() {
  const url = api.getUrl();
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  axios
    .get(url + "/user/me/", { headers })
    .then(function (response) {
      const encabezados = [
        "Nombre(s)",
        "Apellido(s)",
        "Correo electrónico",
        "Rol",
      ];
      const contenedor = document.getElementById("User-cont");
      const p = document.createElement("p");
      p.innerHTML = "Este es el contenido de mis datos";
      const contenedorHijo = document.createElement("div");

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
        contenedor.appendChild(p);
        contenedor.appendChild(contenedorHijo);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}
