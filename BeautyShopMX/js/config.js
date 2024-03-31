// modulo.js
const api = (function () {
  // Variables privadas
  //let url = "http://localhost:3977/api/v1";
  let url = "http://servergutierrez.ddns.net/:3977/api/v1";
  let urlIMG = "http://servergutierrez.ddns.net/";
  const categorias = [
    "Todos",
    "Ropa",
    "Maquillaje",
    "Skincare",
    "Zapatos",
    "Accesorios",
  ];
  const ordenarPor = [
    "Fecha: mas recientes primero",
    "Fecha: mas antiguos primero",
    "Precio: de menor a mayor",
    "Precio: de mayor a menor",
  ];

  // Lo que deseas exponer públicamente
  return {
    getUrl: function () {
      return url;
    },
    getUrlImg: function () {
      return urlIMG;
    },
    getCategorias: function () {
      return categorias;
    },
    getOrdenarPor: function () {
      return ordenarPor;
    },
  };
})();
