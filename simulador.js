
// EL CONTENIDO DEL HTML ESTÁ EN CONSTRUCCIÓN, hasta que aprendamos a vincular js a objetos.

// La idea del proyecto está inspirado en mi proyecto de Diseño WEB sobre HAUS-Productores de Yerba Mate. El simulador permitirá calcular la producción estimada de Yerba Mate en función de algunas variables (espacio en hectáreas, tiempo, humedad, etc), la aplicación está destinada a usuarios que quieran incursionar en el negocio, o simplemente que sean curiosos.

// Variables iniciales
let hectareas = parseInt(prompt ("¿Cuántas hectáreas querés cosechar?" ));

// Densidad
let densidades = {
baja: 1100,
alta: 2200,
super: 3200
};

let densidad = prompt("Elige la densidad de plantación: Baja, Alta o Super");

while (!densidades[densidad.toLowerCase()]) {
densidad = prompt("Ingresaste un dato inválido como densidad, indica si es: Baja, Alta o Super");
}

densidad = densidad.toLowerCase();

// Métodos de búsqueda para DENSIDAD
function buscarValorDensidad(densidad) {
    for (let key in densidades) {
        if (key === densidad) {
        return densidades[key];
        }
     } 
    return null;
    }
    
    let valorDensidad = buscarValorDensidad(densidad);
    if (valorDensidad) {
    alert("La densidad '" + densidad + "' equivale a: " + valorDensidad + "plantines por hectárea.");
    } else {
    alert("La densidad ingresada no se encuentra en la lista");
    }

// Humedad
let humedades = {
"muy baja": 0.4,
baja: 0.8,
alta: 1.25
};

let humedad = prompt("Elige la humedad del territorio: Muy baja, Baja, Alta");

while (!humedades[humedad.toLowerCase()]) {
humedad = prompt("Ingresaste un dato inválido. Selecciona la humedad del territorio entre: Muy baja, Baja, Alta");
}

humedad = humedad.toLowerCase();

//Años cosecha
let aniosCosecha = parseInt(prompt("¿Por cuantos años dejarás crecer las plantas?"));
while (aniosCosecha < 5 ) {
switch (aniosCosecha){
    case 1:
        alert("Tus plantitas están aún en modo bebé, mínimo necesitás 5 años para que crezcan!");
        break;
    case 2:
        alert("En mínimo son 5 años para que las plantas alcancen su madurez");
        break;
    case 3: 
        alert("En mínimo son 5 años para que las plantas alcancen su madurez");
        break;
    case 4: 
        alert("Te falta un año y ya podés cosechar y calcular tu producción!");
        break;
}

aniosCosecha = parseInt(prompt("¿Por cuántos años dejarás crecer las plantas?"));
}

//Cálculo final
let produccionPorHectareaAnual = densidades[densidad] * humedades[humedad];

function calcularProduccion(produccionPorHectareaAnual, hectareas, aniosCosecha) {
let produccionTotal = produccionPorHectareaAnual * hectareas * aniosCosecha;
alert("La producción total de yerba mate será de " + produccionTotal + " kg");
}

calcularProduccion(produccionPorHectareaAnual, hectareas , aniosCosecha);

