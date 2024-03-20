function cerrarSesion() {
  //console.log("Cerrar sesion");
  localStorage.removeItem("token");
  window.location.href = "../index.html";
}
document.addEventListener("DOMContentLoaded", function () {
  if (!verificarSesion()) {
    window.location.href = "../index.html";
  }

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
