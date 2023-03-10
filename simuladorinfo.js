//Simulador para consultar info sobre la Yerba Mate (Aplicación de Fetch, promesas + Fake API y Sweet Alert) Me pareció más interesante incluir al proyecto algo distinto para salir un poco del cálculo matemático del primer simulador. En el presente, el usario puede consultar información sobre los distintos tipos de yerba. La info es capturada y traida de la api, para mostrarla en el front.

$(document).ready(function() {
    $('#buscar-btn').click(function() {
      let yerbaType = $('#yerba-type').val();
      fetch(`https://jsonplaceholder.typicode.com/posts?userId=${yerbaType}`) //Llamado a la Fake Api para obtener textos
        .then(response => response.json())
        .then(json => {
          let resultadosHtml = '<ul>';
          json.forEach(result => {
            resultadosHtml += `<li>${result.title}</li>`;
          });
          resultadosHtml += '</ul>';
          Swal.fire({
            title: `Info sobre la yerba seleccionada`,
            html: resultadosHtml,
            icon: 'success'
          });
        })
        .catch(error => { //En el caso de que falle la misma, arroja error.
          console.error(error);
          Swal.fire({
            title: 'Error al obtener los resultados',
            text: 'Por favor, inténtelo de nuevo más tarde',
            icon: 'error'
          });
        });
    });
  });