var formulario = document.getElementById("login-form");

formulario.addEventListener("submit", function(event) {
  const url = "http://localhost:3977/api/v1" + "/auth/login/";
  event.preventDefault();
  var email=document.getElementById("email").value;
  var password=document.getElementById("password").value;
  var datosFromulario={
    "email":email,
    "password":password
  };
  var datos=JSON.stringify(datosFromulario);

  var opFetch={
    method: 'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body:datos
  };

  fetch(url,opFetch).then(function(response){
    if(!response)
    {
      throw new Error('Hubo un problema: '+ response.statusText);
    }
    return response.json();
  }).then(function(data){
    console.log(data);
  }).catch(function(error){
    console.log("error al realizar la solicitud: "+ error);
  });
  console.log(url);

});