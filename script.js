// ===============================================
// FUNCIÓN 1: Mostrar / Ocultar datos curiosos
// ===============================================
// Esta función recibe el ID de un elemento HTML
// y lo muestra u oculta según su estado actual.
// Es útil para que los estudiantes decidan cuándo
// ver información adicional.
// ===============================================
function mostrarInfo(id) {
    let info = document.getElementById(id);
    // Si está oculto o no tiene estilo definido, lo mostramos
    if (info.style.display === "none" || info.style.display === "") {
        info.style.display = "block";
    } else {
        // Si está visible, lo ocultamos
        info.style.display = "none";
    }
}

// ===============================================
// FUNCIÓN 2: Mostrar la fecha actual en el footer
// ===============================================
// Esta función obtiene la fecha del sistema
// y la escribe en el elemento con id "fecha-actual"
// ===============================================
function mostrarFecha() {
    let fecha = new Date();
    let opciones = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    let textoFecha = fecha.toLocaleDateString('es-ES', opciones);
    document.getElementById('fecha-actual').innerHTML = "📅 Hoy es " + textoFecha;
}

// Llamamos a la función cuando la página carga
mostrarFecha();

// ===============================================
// FUNCIÓN 3: Juego "Asocia la característica"
// ===============================================
// Esta función genera las preguntas del juego
// y las muestra en la sección correspondiente.
// ===============================================
const preguntas = [
    {
        id: 1,
        descripcion: "Usaban cintas magnéticas y costaban $20,000",
        opciones: ["1ª Gen (1971-1980)", "2ª Gen (1981-1990)", "3ª Gen (1991-2000)"],
        correcta: "1ª Gen (1971-1980)"
    },
    {
        id: 2,
        descripcion: "Primera PC con MS-DOS y mouse",
        opciones: ["1ª Gen (1971-1980)", "2ª Gen (1981-1990)", "4ª Gen (2001-2010)"],
        correcta: "2ª Gen (1981-1990)"
    },
    {
        id: 3,
        descripcion: "Llegaron los CD-ROM, Windows 95 e Internet",
        opciones: ["2ª Gen (1981-1990)", "3ª Gen (1991-2000)", "5ª Gen (2011-act.)"],
        correcta: "3ª Gen (1991-2000)"
    },
    {
        id: 4,
        descripcion: "Aparecen las laptops y el WiFi",
        opciones: ["3ª Gen (1991-2000)", "4ª Gen (2001-2010)", "5ª Gen (2011-act.)"],
        correcta: "4ª Gen (2001-2010)"
    },
    {
        id: 5,
        descripcion: "Pantallas táctiles, IA y computación en la nube",
        opciones: ["3ª Gen (1991-2000)", "4ª Gen (2001-2010)", "5ª Gen (2011-act.)"],
        correcta: "5ª Gen (2011-act.)"
    }
];

// ===============================================
// FUNCIÓN 4: Generar preguntas en el HTML
// ===============================================
function generarPreguntas() {
    let contenedor = document.getElementById('preguntas-juego');
    let html = '';

    // Recorremos el arreglo de preguntas
    for (let i = 0; i < preguntas.length; i++) {
        let p = preguntas[i];
        // Creamos las opciones del select
        let opcionesHTML = '';
        for (let j = 0; j < p.opciones.length; j++) {
            opcionesHTML += `<option value="${p.opciones[j]}">${p.opciones[j]}</option>`;
        }

        html += `
            <div class="pregunta-item">
                <span class="descripcion">${p.descripcion}</span>
                <select id="respuesta-${p.id}">
                    <option value="">-- Selecciona --</option>
                    ${opcionesHTML}
                </select>
            </div>
        `;
    }

    contenedor.innerHTML = html;
}

// Llamamos a la función para que las preguntas aparezcan al cargar
generarPreguntas();

// ===============================================
// FUNCIÓN 5: Verificar respuestas del juego
// ===============================================
function verificarRespuestas() {
    let correctas = 0;
    let total = preguntas.length;
    let mensaje = '';

    for (let i = 0; i < preguntas.length; i++) {
        let p = preguntas[i];
        let select = document.getElementById(`respuesta-${p.id}`);
        let seleccion = select.value;

        if (seleccion === p.correcta) {
            correctas++;
            // Cambiamos el color del select a verde
            select.style.backgroundColor = '#2ecc71';
        } else if (seleccion === '') {
            // No seleccionó nada
            select.style.backgroundColor = '#f39c12';
        } else {
            // Seleccionó algo incorrecto
            select.style.backgroundColor = '#e74c3c';
        }
    }

    // Mostramos el resultado
    let resultadoDiv = document.getElementById('resultado-juego');

    if (correctas === total) {
        mensaje = `🎉 ¡Excelente! Obtuviste ${correctas} de ${total} respuestas correctas. ¡Eres un experto en la historia de las PC! 🏆`;
    } else if (correctas >= total * 0.6) {
        mensaje = `👍 Buen trabajo. Obtuviste ${correctas} de ${total}. ¡Sigue aprendiendo!`;
    } else {
        mensaje = `📖 Obtuviste ${correctas} de ${total}. Te sugiero repasar las secciones del museo y volver a intentarlo.`;
    }

    resultadoDiv.innerHTML = mensaje;
}

// ===============================================
// FUNCIÓN 6: Reiniciar el juego
// ===============================================
function reiniciarJuego() {
    // Limpiamos los selects
    for (let i = 0; i < preguntas.length; i++) {
        let p = preguntas[i];
        let select = document.getElementById(`respuesta-${p.id}`);
        select.value = '';
        select.style.backgroundColor = '#ecf0f1'; // Color original
    }

    // Limpiamos el resultado
    document.getElementById('resultado-juego').innerHTML = '';
}

// ===============================================
// FUNCIÓN 7: Scroll suave al hacer clic en el nav
// ===============================================
// Esta función no es necesaria porque los enlaces
// con # ya hacen scroll, pero podemos agregar
// un comportamiento más suave con CSS:
// (se puede poner en el CSS)
// html { scroll-behavior: smooth; }

// Ya está en el CSS (al final del archivo estilos.css)