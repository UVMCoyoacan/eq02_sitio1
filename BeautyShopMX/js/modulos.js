const modulo = (function () {
  // Lo que deseas exponer públicamente
  return {
    getMisPagos: function (response) {
      return createMisPagos(response);
    },
    getMisDatos: function (response) {
      return createMisDatos(response);
    },
  };
})();

function createMisDatos(response) {
  const encabezados = ["Nombre(s)", "Apellido(s)", "Correo electrónico"];

  const contenedor = document.getElementById("User-cont");
  const contenedorNaranja = document.createElement("div");
  const contenedorRojo = document.createElement("div");
  const contenedorAzul = document.createElement("div");
  const botonMod = document.createElement("input");
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

  botonMod.type = "button";
  botonMod.value = "Modificar contraseña";
  botonMod.name = "boton";
  botonMod.id = "boton";
  botonMod.className = "btn-principal";
  botonMod.onclick = () => contenedorAzul.appendChild(aparecerCambioContra());
  contenedorNaranja.appendChild(botonMod);
}

function aparecerCambioContra() {
  const formulario = document.createElement("form");
  const contraActual = document.createElement("input");
  const contraNueva = document.createElement("input");
  const contraNueva2 = document.createElement("input");
  const botonCambio = document.createElement("input");

  contraActual.id = "contraActual";
  contraActual.name = "contraActual";
  contraActual.type = "password";
  contraActual.className = "form-elem";
  contraActual.placeholder = "Contraseña actual";
  formulario.appendChild(contraActual);
  formulario.appendChild(document.createElement("br"));

  contraNueva.id = "contraNueva1";
  contraNueva.name = "contraNueva";
  contraNueva.type = "password";
  contraNueva.className = "form-elem";
  contraNueva.placeholder = "Contraseña nueva";
  formulario.appendChild(contraNueva);
  formulario.appendChild(document.createElement("br"));

  contraNueva2.id = "contraNueva2";
  contraNueva2.name = "contraNueva";
  contraNueva2.type = "password";
  contraNueva2.className = "form-elem";
  contraNueva2.placeholder = "Repetir Contraseña nueva";

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
  formulario.appendChild(contraNueva2);
  formulario.appendChild(document.createElement("br"));

  botonCambio.type = "submit";
  botonCambio.name = "boton";
  botonCambio.id = "boton";
  botonCambio.className = "btn-principal";
  botonCambio.value = "Cambiar contraseña";
  formulario.appendChild(botonCambio);
  formulario.appendChild(document.createElement("br"));

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
    axios
      .post(url + "/user/updatePassword/", multi, { headers })
      .then(function (response) {
        msg.innerHTML = response.data.msg;
        contenedor.appendChild(msg);
      })
      .catch(function (error) {
        console.log(error);
        msg.innerHTML = error.response.data.msg;
        contenedor.appendChild(msg);
      });
  });

  return formulario;
}

function createMisPagos(response) {
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
