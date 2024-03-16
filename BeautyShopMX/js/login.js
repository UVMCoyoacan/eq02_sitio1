function iniciarSesion() {
  let url = "http://localhost:3977/api/v1" + "/auth/login/";
  fetch(url)
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.log(error));
}
function habilitarBoton() {
  var checkbox = document.getElementById("opcion");
  var boton = document.getElementById("botonSubmit");
  
  if (checkbox.checked) {
    boton.disabled = false;
  } else {
    boton.disabled = true;
  }
}
