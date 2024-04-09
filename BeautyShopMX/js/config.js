// modulo.js
const api = (function () {
  // Variables privadas
  const url = "http://servergutierrez.ddns.net:3977/api/v1";
  const urlIMG = "http://servergutierrez.ddns.net/eq02_sitio1/server/uploads/";
  //const url = "http://localhost:3977/api/v1/";
  //const urlIMG = "http://localhost/"
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
