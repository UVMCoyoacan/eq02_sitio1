const url = api.getUrl();
const btn = document.getElementById("btn_registrarse");
const repCont = document.getElementById("passwordRep");
const cont = document.getElementById("password");
const cb = document.getElementById("terminos");
function isAcepted() {
  if (cb.checked && cont.value == repCont.value) {
    btn.disabled = false;
  } else {
    btn.disabled = true;
  }
}
const formulario = document.getElementById("formulario-registrarse");

formulario.addEventListener("submit", function (event) {
  event.preventDefault();
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var nombre = document.getElementById("firstname").value;
  var apellidos = document.getElementById("lastname").value;

  var datosFromulario = {
    firstname: nombre,
    lastname: apellidos,
    email: email,
    password: password,
  };
  var datos = JSON.stringify(datosFromulario);

  var opFetch = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: datos,
  };

  fetch(url + "/auth/register/", opFetch)
    .then(function (response) {
      if (!response) {
        throw new Error("Hubo un problema: " + response.statusText);
      }
      return response.json();
    })
    .then(function (data) {
      localStorage.setItem("token", data.access);
      window.location.href = "../sec_inicioSesion/iniciarSesion.html";
    })
    .catch(function (error) {
      console.log("error al realizar la solicitud: " + error);
    });
});
document.addEventListener("DOMContentLoaded", function () {
  if (verificarSesion()) {
    window.location.href = "../sec_admin/admin.html";
  }
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
function verificarAdmin() {
  var token = localStorage.getItem("token");
}

repCont.addEventListener("input", function () {
  if (cont.value != repCont.value) {
    repCont.className = "form-elem contError";
    btn.disabled = true;
  } else {
    repCont.className = "form-elem";
    if (cb.checked && cont.value === repCont.value) {
      btn.disabled = false;
    }
  }
});
cont.addEventListener("change", function () {
  if (cont.value == "") {
    repCont.disabled = true;
  }
  repCont.disabled = false;
});
