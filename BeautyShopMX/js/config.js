// modulo.js
const api = (function () {
  // Variables privadas
  //let url = "http://localhost:3977/api/v1";
  let url = "http://localhost:3977/api/v1";
  let urlIMG = "http://localhost:3977/";

  // Lo que deseas exponer públicamente
  return {
    getUrl: function () {
      return url;
    },
    getUrlImg: function () {
      return urlIMG;
    },
  };
})();
