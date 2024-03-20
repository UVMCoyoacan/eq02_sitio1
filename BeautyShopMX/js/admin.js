///variables globales:
var btnSelec=0;


function cerrarSesion() {
  //console.log("Cerrar sesion");
  localStorage.removeItem("token");
  window.location.href = "../index.html";
}
document.addEventListener("DOMContentLoaded", function () {
  //verificar si se tiene una sesion iniciada
  if (/*!verificarSesion()*/ false) {
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
function insertarMenu()
{
//insertar el menu
var botones=[];
var elementosLista=[];
const contenedor= document.getElementById("submenu");
const nav=document.createElement("nav");
nav.className="Submenu";
const lista = document.createElement("ul");
lista.className="Submenu-lista";
const btnTitulos=["Mis datos","Agregar producto","Registrar deuda","Registrar pago","Buscar cliente"];

for(let i=0;i<btnTitulos.length;i++){
  const elem=document.createElement("li");
  elem.className="Submenu-item";
  const btn=document.createElement("button");
  btn.className="btn-principal";
  btn.innerHTML=btnTitulos[i];
  elem.appendChild(btn);
  botones.push(btn);
  elementosLista.push(elem);
}
for(let i=0;i<botones.length;i++)
{
  lista.appendChild(elementosLista[i]);
  botones[i].onclick=function(){clickMenu(i,botones);}
}
nav.appendChild(lista);
contenedor.appendChild(nav);
////Seleccionar [0] como el elemento seleccionado por defecto
clickMenu(0,botones);
}
function vaciarDiv(contenedor){
  contenedor.innerHTML='';
}
function clickMenu(ind, botones)
{
  vaciarDiv(document.getElementById("admin-cont"));
  btnSelec=ind;
  for(let i=0;i<botones.length;i++)
  {
    botones[i].className="btn-principal";
  }
  botones[btnSelec].className="btn-principal btn-principal-selected"
  if(btnSelec===0)
  {
    misDatos();
  }
}
function misDatos()
{
  const contenedor=document.getElementById("admin-cont");
  const p=document.createElement("p");
  p.innerHTML="Este es el contenido de mis datos";
  contenedor.appendChild(p);
}