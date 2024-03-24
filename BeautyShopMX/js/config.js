// modulo.js
const api = (function () {
  // Variables privadas
  let url = "http://localhost:3977/api/v1";
  // Lo que deseas exponer públicamente
  return {
    getUrl: function () {
      return url;
    },
  };
})();
