function cargarTiendaApi(ordenar, filtro) {
  const ordenarPor = obtenerFiltros(Number(ordenar));
  const url = api.getUrl();
  const urlImg = api.getUrlImg();
  const params = {
    active: true,
    ordenarPor,
    filtro: filtro,
  };
  axios
    .post(url + "/products/", { params })
    .then(function (response) {
      modulo.getTienda(response, 0);
    })
    .catch(function (error) {
      console.log(error);
    });
}


