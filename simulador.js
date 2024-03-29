// La idea del proyecto está inspirado en mi proyecto de Diseño WEB sobre HAUS-Productores de Yerba Mate. El simulador permitirá calcular la producción estimada de Yerba Mate en función de algunas variables (espacio en hectáreas, tiempo, humedad, etc), la aplicación está destinada a usuarios que quieran incursionar en el negocio, o simplemente que sean curiosos.

//Declaración de variables para los elementos DOM utilizados en el script.
const form = document.querySelector("form");
const hectareasInput = document.querySelector("#hectareas");
const hectareasOutput = document.querySelector("#hectareasOutput");
const densidadSelect = document.querySelector("#densidadPlantacion");
const humedadSelect = document.querySelector("#humedad");
const tiempoInput = document.querySelector("#tiempo");
const tiempoOutput = document.querySelector("#tiempoOutput");
const resultadoElement = document.querySelector("#resultado");

// Declaración de una lista vacía para almacenar los resultados anteriores (variable global)
let resultadosAnteriores = [];


//Eventos para los campos de entrada HECTÁREAS y TIEMPO.
hectareasInput.addEventListener("input", function () {
  hectareasOutput.textContent = hectareasInput.value;
});

tiempoInput.addEventListener("input", function () {
  tiempoOutput.textContent = tiempoInput.value;
});

//Función para detectar si los campos DENSIDAD y HUMEDAD han sido seleccionados correctamente.
function validateForm() {
  let isValid = true;
  if (densidadSelect.value === "Seleccionar") {
    Swal.fire({
      icon: 'error',
      title: 'Apa la lá!',
      text: 'Parece que no seleccionaste una densidad válida'
    });
    isValid = false;
  }
  if (humedadSelect.value === "Seleccionar") {
    Swal.fire({
      icon: 'error',
      title: 'Apa la lá!',
      text: 'Parece que no seleccionaste una humedad válida'
    });
    isValid = false;
  }
  if (isValid) {
    resultadoElement.textContent = "";
  }
  return isValid;
}


//Evento para cuando se envía el formulario, evita que el mismo se envíe predeterminado y permite que se avance siempre que los campos posean valores admitidos.
form.addEventListener("submit", function (event) {
  event.preventDefault();
  if (!validateForm()) {
    return;
  };

  const hectareas = parseInt(hectareasInput.value);
  const densidades = {
    baja: 1100,
    alta: 2200,
    super: 3200
  };

  const densidad = densidadSelect.value.toLowerCase();
  const valorDensidad = densidades[densidad];
  const humedades = [0.4, 0.8, 1.25];
  const humedad = humedadSelect.value.toLowerCase();
  const humedadIndex = [
    "muybaja",
    "baja",
    "alta"
  ].indexOf(humedad);

  const tiempo = parseInt(tiempoInput.value);
  if (tiempo < 5) {
    if (tiempo === 1) {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Tus plantitas aún son bebés, el mínimo es de 5 años para que crezcan!'
      });
    } else if (tiempo === 2 || tiempo === 3) {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'El mínimo son 5 años para que tus plantitas crezcan...'
      });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Te falta un año y ya podés cosechar!'
      });
    }
    return;
  }


  //Cálculo Resultado
  const resultado = hectareas * valorDensidad * humedades[humedadIndex] * tiempo;

  //Almacenamiento de datos con LocalStorage y JSON.
  const resultadoJson = JSON.stringify({
    hectareas,
    densidad,
    humedad,
    tiempo,
    resultado
  });

  resultadosAnteriores.push(JSON.parse(resultadoJson));
localStorage.setItem("resultadosAnteriores", JSON.stringify(resultadosAnteriores));


  Swal.fire({
    title: 'Producción de Yerba Mate',
    text: `La producción total de Yerba Mate será de: ${resultado} Kg.`,
    icon: 'success',
    timer: 5000,
    timerProgressBar: true,
    showConfirmButton: false,
    toast: true,
    position: 'top-center'
  });

});

//Evento para mostrar todos los resultados anteriores al hacer clic en el botón "Ver Cálculos anteriores"
document.querySelector("#mostrarCalculosAnteriores").addEventListener("click", function () {
  resultadosAnteriores = JSON.parse(localStorage.getItem("resultadosAnteriores")) || [];

  let html = "<table><tr><th>Hectáreas</th><th>Densidad</th><th>Humedad</th><th>Tiempo</th><th>Resultado</th></tr>";
  
  //Recorre todos los resultados anteriores almacenados en la lista resultadosAnteriores
  resultadosAnteriores.forEach(function (resultado) {
    html += `<tr><td>${resultado.hectareas}</td><td>${resultado.densidad}</td><td>${resultado.humedad}</td><td>${resultado.tiempo}</td><td>${resultado.resultado}</td></tr>`;
     });
  
  html += "</table>";
  
  Swal.fire({
    title: 'Historial de cálculos',
    html: html,
    icon: 'info'
  });
});


