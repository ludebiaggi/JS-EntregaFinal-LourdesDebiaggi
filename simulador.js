// La idea del proyecto está inspirado en mi proyecto de Diseño WEB sobre HAUS-Productores de Yerba Mate. El simulador permitirá calcular la producción estimada de Yerba Mate en función de algunas variables (espacio en hectáreas, tiempo, humedad, etc), la aplicación está destinada a usuarios que quieran incursionar en el negocio, o simplemente que sean curiosos. Al pie del simulador, se encuentra la web de HAUS.

//Declaración de variables para los elementos DOM utilizados en el script.
const form = document.querySelector("form");
const hectareasInput = document.querySelector("#hectareas");
const hectareasOutput = document.querySelector("#hectareasOutput");
const densidadSelect = document.querySelector("#densidadPlantacion");
const humedadSelect = document.querySelector("#humedad");
const tiempoInput = document.querySelector("#tiempo");
const tiempoOutput = document.querySelector("#tiempoOutput");
const resultadoElement = document.querySelector("#resultado");

//Eventos para los campos de entrada HECTÁREAS y TIEMPO en donde el usuario interactúa ingresando un valor.
hectareasInput.addEventListener("input", function() {
  hectareasOutput.textContent = hectareasInput.value;
});

tiempoInput.addEventListener("input", function() {
  tiempoOutput.textContent = tiempoInput.value;
});

//Función para detectar si los campos DENSIDAD y HUMEDAD han sido seleccionados correctamente, de no ser así, el modal advierte que debe seleccionarse un valor.

function validateForm() {
  let isValid = true;
  if (densidadSelect.value === "Seleccionar") {
    Swal.fire({    //Aplicación de librería SweetAlert, a lo largo del código se ve su uso frecuente.
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
form.addEventListener("submit", function(event) {
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
  if (tiempo < 5) { //Utilización de condicionales
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

  //Boton Último Resultado (A través del uso del storage, rescatamos el último cálculo generado por el usuario)

  function obtenerUltimoCalculo() {
    const ultimoCalculo = {
      hectareas: localStorage.getItem("hectareas"),
      densidad: localStorage.getItem("densidad"),
      humedad: localStorage.getItem("humedad"),
      tiempo: localStorage.getItem("tiempo"),
      resultado: localStorage.getItem("resultado")
    };
    return ultimoCalculo;
  }

  const mostrarCalculoAnteriorBtn = document.querySelector("#mostrarCalculoAnterior");

  mostrarCalculoAnteriorBtn.addEventListener("click", function() {
  const ultimoCalculo = obtenerUltimoCalculo();
  resultadoElement.textContent = `Hectáreas: ${ultimoCalculo.hectareas}, Densidad: ${ultimoCalculo.densidad}, Humedad: ${ultimoCalculo.humedad}, Tiempo: ${ultimoCalculo.tiempo}, Resultado: ${ultimoCalculo.resultado}`;
  });


//Almacenamiento de datos con LocalStorage y JSON.
  const resultadoJson = JSON.stringify({
    hectareas,
    densidad,
    humedad,
    tiempo,
    resultado
  });

  localStorage.setItem("resultado", resultadoJson);

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

