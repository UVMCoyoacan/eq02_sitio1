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
      const encabezados = ["Fecha", "Monto"];
      const contenedor = document.getElementById("User-cont");

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
        const mes = (fechaFormateada.getMonth() + 1)
          .toString()
          .padStart(2, "0");
        const ye = fechaFormateada.getFullYear();
        datosPetAdeudosPagados[i].fecha = `${dia}/${mes}/${ye}`;
        datosPetAdeudosPagados[
          i
        ].total = `$${datosPetAdeudosPagados[i].total} MXN`;
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
      console.log(response.data);
      for (let i = 0; i < response.data.pagos.length; i++) {
        datosPet.push(response.data.pagos[i]);
        const fechaFormateada = new Date(datosPet[i].fecha);
        const dia = fechaFormateada.getDate().toString().padStart(2, "0");
        const mes = (fechaFormateada.getMonth() + 1)
          .toString()
          .padStart(2, "0");
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
      console.log(datosPet);
      contenedorHijo.appendChild(p);
      contenedorPago.appendChild(contFecha);
      contenedorPago.appendChild(contMonto);
      contenedorHijo.appendChild(contenedorPago);
      contenedor.appendChild(contenedorHijo);
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
