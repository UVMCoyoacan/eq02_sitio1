var formulario = document.getElementById("login-form");

formulario.addEventListener("submit", function (event) {
  const url = "http://localhost:3977/api/v1" + "/auth/login/";
  event.preventDefault();
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var errorIS = document.getElementById("error");
  var datosFromulario = {
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

  fetch(url, opFetch)
    .then(function (response) {
      if (!response) {
        throw new Error("Hubo un problema: " + response.statusText);
      }
      return response.json();
    })
    .then(function (data) {
      if (data.role === "admin") {
        window.location.href = "../sec_admin/admin.html";
        localStorage.setItem("token", data.access);
      } else if (data.role === "user") {
        window.location.href = "../sec_user/user.html";
        localStorage.setItem("token", data.access);
      } else {
        errorIS.innerHTML = "Correo o contraseña incorrecta";
      }
    })
    .catch(function (error) {
      console.log("error al realizar la solicitud: " + error);
    });
});
document.addEventListener("DOMContentLoaded", function () {
  if (verificarSesion()) {
    const url = "http://localhost:3977/api/v1" + "/user/me/";
    const opFetch = {
      method: "GET",
      headers: {
        AUTHORIZATION: `Bearer ${localStorage.getItem("token")}`,
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
        if (data.role === "admin") {
          window.location.href = "../sec_admin/admin.html";
        } else if (data.role === "user") {
          window.location.href = "../sec_user/user.html";
        } else {
          console.log("error");
        }
      })
      .catch(function (error) {
        console.log("error al realizar la solicitud: " + error);
      });
    window.location.href = "../sec_user/user.html";
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
