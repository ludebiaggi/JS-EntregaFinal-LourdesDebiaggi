
// EL CONTENIDO DEL HTML ESTÁ EN CONSTRUCCIÓN, hasta que aprendamos a vincular js a objetos.

// La idea del proyecto está inspirado en mi proyecto de Diseño WEB sobre HAUS-Productores de Yerba Mate. El simulador permitirá calcular la producción estimada de Yerba Mate en función de algunas variables (espacio en hectáreas, tiempo, humedad, etc), la aplicación está destinada a usuarios que quieran incursionar en el negocio, o simplemente que sean curiosos.

// Variables iniciales
let hectareas = parseInt(prompt ("¿Cuántas hectáreas querés cosechar?" ));
let densidad = prompt("Elige la densidad de plantación: Baja 1100 plantas por hectárea , Alta 2200 plantas por hectárea, Super 3200 plantas por hectárea");


// Densidad

while (densidad !== "baja" && densidad !== "Baja" && densidad !== "alta" && densidad !== "Alta" && densidad !== "super" && densidad !== "Super") {
    let produccionPorHectareaAnual;
    densidad = prompt("Ingresaste un dato inválido como densidad, indica si es: Baja, Alta o Super");
}

let produccionPorHectareaAnual;
if ((densidad === "baja") || (densidad === "Baja")) {
 produccionPorHectareaAnual = 3000;
} else if ((densidad === "alta") || (densidad === "Alta")) {
    produccionPorHectareaAnual = 6000;
} else if ((densidad === "super") || (densidad === "Super")) {
    produccionPorHectareaAnual = 9000;
} else {
    densidad = prompt("Ingresaste un dato inválido como densidad, indica si es: Baja, Alta o Super");  
}


// Humedad
let humedad = prompt("Elige la humedad del territorio: Muy baja, Baja, Alta");

while (humedad !== "muy baja" && humedad !== "Muy baja" && humedad !== "baja" && humedad !== "Baja" && humedad !== "alta" && humedad !== "Alta") {
    let produccionPorHectareaAnual;
    humedad = prompt("Ingresaste un dato inválido. Selecciona la humedad humedad del territorio entre: Muy baja, Baja, Alta");
}


if ((humedad === "muy baja") || (humedad === "Muy baja")) {
    produccionPorHectareaAnual *= 0.4;
} else if ((humedad === "baja") || (humedad === "Baja")) {
    produccionPorHectareaAnual *= 0.8;
} else if ((humedad === "alta") || (humedad === "Alta")){
    produccionPorHectareaAnual *= 1.25;
}  else {
    humedad = prompt("Ingresaste un dato inválido. Selecciona la humedad humedad del territorio entre: Muy baja, Baja, Alta");
}

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
function calcularProduccion(produccionPorHectareaAnual, hectareas, aniosCosecha) {
    let produccionTotal = produccionPorHectareaAnual * hectareas * aniosCosecha;
    alert("La producción total de yerba mate será de " + produccionTotal + " kg");
}

calcularProduccion(produccionPorHectareaAnual, hectareas , aniosCosecha);