// ===============================================
// FUNCIÓN 1: Mostrar / Ocultar datos curiosos
// ===============================================
function mostrarInfo(id) {
    let info = document.getElementById(id);
    if (info.style.display === "none" || info.style.display === "") {
        info.style.display = "block";
    } else {
        info.style.display = "none";
    }
}

// ===============================================
// FUNCIÓN 2: Mostrar la fecha actual en el footer
// ===============================================
function mostrarFecha() {
    let fecha = new Date();
    let opciones = { year: 'numeric', month: 'long', day: 'numeric' };
    let textoFecha = fecha.toLocaleDateString('es-ES', opciones);
    document.getElementById('fecha-actual').innerHTML = "📅 Hoy es " + textoFecha;
}
mostrarFecha();

// ===============================================
// FUNCIÓN 3: Scroll suave con offset para el nav
// ===============================================
document.addEventListener('DOMContentLoaded', function() {
    const enlaces = document.querySelectorAll('nav a');
    const nav = document.querySelector('nav');
    const alturaNav = nav ? nav.offsetHeight : 0;

    enlaces.forEach(enlace => {
        enlace.addEventListener('click', function(e) {
            const destinoId = this.getAttribute('href');
            if (destinoId && destinoId.startsWith('#')) {
                e.preventDefault();
                const destino = document.querySelector(destinoId);
                if (destino) {
                    const posicion = destino.getBoundingClientRect().top + window.pageYOffset - alturaNav - 10;
                    window.scrollTo({ top: posicion, behavior: 'smooth' });
                }
            }
        });
    });
});

// ===============================================
// JUEGO 1: ASOCIA LA CARACTERÍSTICA
// ===============================================
const preguntasJuego1 = [
    { id: 1, descripcion: "Usaban cintas magnéticas y costaban $20,000", opciones: ["1ª Gen (1971-1980)", "2ª Gen (1981-1990)", "3ª Gen (1991-2000)"], correcta: "1ª Gen (1971-1980)" },
    { id: 2, descripcion: "Primera PC con MS-DOS y mouse", opciones: ["1ª Gen (1971-1980)", "2ª Gen (1981-1990)", "4ª Gen (2001-2010)"], correcta: "2ª Gen (1981-1990)" },
    { id: 3, descripcion: "Llegaron los CD-ROM, Windows 95 e Internet", opciones: ["2ª Gen (1981-1990)", "3ª Gen (1991-2000)", "5ª Gen (2011-act.)"], correcta: "3ª Gen (1991-2000)" },
    { id: 4, descripcion: "Aparecen las laptops y el WiFi", opciones: ["3ª Gen (1991-2000)", "4ª Gen (2001-2010)", "5ª Gen (2011-act.)"], correcta: "4ª Gen (2001-2010)" },
    { id: 5, descripcion: "Pantallas táctiles, IA y computación en la nube", opciones: ["3ª Gen (1991-2000)", "4ª Gen (2001-2010)", "5ª Gen (2011-act.)"], correcta: "5ª Gen (2011-act.)" }
];

function generarJuego1() {
    let contenedor = document.getElementById('preguntas-juego1');
    if (!contenedor) return;
    let html = '';
    for (let i = 0; i < preguntasJuego1.length; i++) {
        let p = preguntasJuego1[i];
        let opcionesHTML = '';
        for (let j = 0; j < p.opciones.length; j++) {
            opcionesHTML += `<option value="${p.opciones[j]}">${p.opciones[j]}</option>`;
        }
        html += `<div class="pregunta-item"><span class="descripcion">${p.descripcion}</span><select id="j1-respuesta-${p.id}"><option value="">-- Selecciona --</option>${opcionesHTML}</select></div>`;
    }
    contenedor.innerHTML = html;
}
generarJuego1();

function verificarJuego1() {
    let correctas = 0;
    for (let i = 0; i < preguntasJuego1.length; i++) {
        let p = preguntasJuego1[i];
        let select = document.getElementById(`j1-respuesta-${p.id}`);
        if (select.value === p.correcta) {
            correctas++;
            select.style.backgroundColor = '#2ecc71';
        } else if (select.value === '') {
            select.style.backgroundColor = '#f39c12';
        } else {
            select.style.backgroundColor = '#e74c3c';
        }
    }
    let total = preguntasJuego1.length;
    let mensaje = correctas === total
        ? `🎉 ¡Excelente! Obtuviste ${correctas} de ${total}. ¡Eres un experto! 🏆`
        : correctas >= total * 0.6
        ? `👍 Buen trabajo. Obtuviste ${correctas} de ${total}.`
        : `📖 Obtuviste ${correctas} de ${total}. Repasa las generaciones e intenta de nuevo.`;
    document.getElementById('resultado-juego1').innerHTML = mensaje;
}

function reiniciarJuego1() {
    for (let i = 0; i < preguntasJuego1.length; i++) {
        let select = document.getElementById(`j1-respuesta-${preguntasJuego1[i].id}`);
        if (select) {
            select.value = '';
            select.style.backgroundColor = '#ecf0f1';
        }
    }
    document.getElementById('resultado-juego1').innerHTML = '';
}

// ===============================================
// JUEGO 2: ADIVINA EL AÑO
// ===============================================
const preguntasJuego2 = [
    { id: 1, descripcion: "¿En qué generación apareció el mouse?", opciones: ["1ª Gen (1971-1980)", "2ª Gen (1981-1990)", "3ª Gen (1991-2000)"], correcta: "2ª Gen (1981-1990)" },
    { id: 2, descripcion: "¿Cuándo se popularizó Internet en las PC?", opciones: ["2ª Gen (1981-1990)", "3ª Gen (1991-2000)", "4ª Gen (2001-2010)"], correcta: "3ª Gen (1991-2000)" },
    { id: 3, descripcion: "¿Cuándo aparecieron las laptops?", opciones: ["3ª Gen (1991-2000)", "4ª Gen (2001-2010)", "5ª Gen (2011-act.)"], correcta: "4ª Gen (2001-2010)" },
    { id: 4, descripcion: "¿Cuándo surgieron las pantallas táctiles?", opciones: ["3ª Gen (1991-2000)", "4ª Gen (2001-2010)", "5ª Gen (2011-act.)"], correcta: "5ª Gen (2011-act.)" },
    { id: 5, descripcion: "¿Cuándo aparecieron los primeros discos duros?", opciones: ["1ª Gen (1971-1980)", "2ª Gen (1981-1990)", "3ª Gen (1991-2000)"], correcta: "2ª Gen (1981-1990)" }
];

function generarJuego2() {
    let contenedor = document.getElementById('preguntas-juego2');
    if (!contenedor) return;
    let html = '';
    for (let i = 0; i < preguntasJuego2.length; i++) {
        let p = preguntasJuego2[i];
        let opcionesHTML = '';
        for (let j = 0; j < p.opciones.length; j++) {
            opcionesHTML += `<option value="${p.opciones[j]}">${p.opciones[j]}</option>`;
        }
        html += `<div class="pregunta-item"><span class="descripcion">${p.descripcion}</span><select id="j2-respuesta-${p.id}"><option value="">-- Selecciona --</option>${opcionesHTML}</select></div>`;
    }
    contenedor.innerHTML = html;
}
generarJuego2();

function verificarJuego2() {
    let correctas = 0;
    for (let i = 0; i < preguntasJuego2.length; i++) {
        let p = preguntasJuego2[i];
        let select = document.getElementById(`j2-respuesta-${p.id}`);
        if (select.value === p.correcta) {
            correctas++;
            select.style.backgroundColor = '#2ecc71';
        } else if (select.value === '') {
            select.style.backgroundColor = '#f39c12';
        } else {
            select.style.backgroundColor = '#e74c3c';
        }
    }
    let total = preguntasJuego2.length;
    let mensaje = correctas === total
        ? `🎉 ¡Excelente! Obtuviste ${correctas} de ${total}. ¡Sigue así! 🏆`
        : correctas >= total * 0.6
        ? `👍 Buen trabajo. Obtuviste ${correctas} de ${total}.`
        : `📖 Obtuviste ${correctas} de ${total}. Repasa las generaciones e intenta de nuevo.`;
    document.getElementById('resultado-juego2').innerHTML = mensaje;
}

function reiniciarJuego2() {
    for (let i = 0; i < preguntasJuego2.length; i++) {
        let select = document.getElementById(`j2-respuesta-${preguntasJuego2[i].id}`);
        if (select) {
            select.value = '';
            select.style.backgroundColor = '#ecf0f1';
        }
    }
    document.getElementById('resultado-juego2').innerHTML = '';
}

// ===============================================
// JUEGO 3: MEMORIA DE LAS PC
// ===============================================
// Parejas de conceptos relacionados con la historia de las PC
const parejasMemoria = [
    { id: 1, texto: "IBM 5100", pareja: "1ª Gen" },
    { id: 2, texto: "MS-DOS", pareja: "2ª Gen" },
    { id: 3, texto: "Windows 95", pareja: "3ª Gen" },
    { id: 4, texto: "WiFi", pareja: "4ª Gen" },
    { id: 5, texto: "IA", pareja: "5ª Gen" },
    { id: 6, texto: "Mouse", pareja: "2ª Gen" }
];

let cartasMemoria = [];
let cartasVolteadas = [];
let parejasEncontradas = 0;
let bloqueo = false;

function generarMemoria() {
    // Creamos un array con cada concepto duplicado (pareja)
    cartasMemoria = [];
    parejasMemoria.forEach(p => {
        cartasMemoria.push({ id: p.id, texto: p.texto, tipo: 'concepto' });
        cartasMemoria.push({ id: p.id, texto: p.pareja, tipo: 'generacion' });
    });
    // Mezclamos las cartas
    cartasMemoria.sort(() => Math.random() - 0.5);

    // Generamos el tablero
    let tablero = document.getElementById('tablero-memoria');
    if (!tablero) return;
    let html = '';
    cartasMemoria.forEach((carta, index) => {
        html += `<div class="carta" data-index="${index}" onclick="voltearCarta(${index})">?</div>`;
    });
    tablero.innerHTML = html;

    // Reiniciamos variables
    cartasVolteadas = [];
    parejasEncontradas = 0;
    bloqueo = false;
    document.getElementById('resultado-memoria').innerHTML = '';
}

function voltearCarta(index) {
    if (bloqueo) return;
    let carta = document.querySelector(`.carta[data-index="${index}"]`);
    if (carta.classList.contains('volteada') || carta.classList.contains('encontrada')) return;

    carta.classList.add('volteada');
    carta.textContent = cartasMemoria[index].texto;
    cartasVolteadas.push(index);

    if (cartasVolteadas.length === 2) {
        bloqueo = true;
        let [i1, i2] = cartasVolteadas;
        let c1 = cartasMemoria[i1];
        let c2 = cartasMemoria[i2];

        // Verificamos si son pareja (mismo id pero diferente tipo)
        if (c1.id === c2.id && c1.tipo !== c2.tipo) {
            // Son pareja
            document.querySelector(`.carta[data-index="${i1}"]`).classList.add('encontrada');
            document.querySelector(`.carta[data-index="${i2}"]`).classList.add('encontrada');
            parejasEncontradas++;
            cartasVolteadas = [];
            bloqueo = false;

            if (parejasEncontradas === parejasMemoria.length) {
                document.getElementById('resultado-memoria').innerHTML = '🎉 ¡Felicidades! Encontraste todas las parejas. 🏆';
            }
        } else {
            // No son pareja, las volteamos de nuevo después de 1 segundo
            setTimeout(() => {
                document.querySelector(`.carta[data-index="${i1}"]`).classList.remove('volteada');
                document.querySelector(`.carta[data-index="${i1}"]`).textContent = '?';
                document.querySelector(`.carta[data-index="${i2}"]`).classList.remove('volteada');
                document.querySelector(`.carta[data-index="${i2}"]`).textContent = '?';
                cartasVolteadas = [];
                bloqueo = false;
            }, 1000);
        }
    }
}

function reiniciarMemoria() {
    generarMemoria();
}

// Inicializamos el juego de memoria al cargar
generarMemoria();

// ===============================================
// JUEGO 4: ROMPECABEZAS CON IMAGEN REAL
// ===============================================
// Este rompecabezas usa una imagen real dividida
// en 9 partes (3x3) usando CSS.
// El usuario hace clic en dos piezas para
// intercambiarlas y armar la imagen.
// ===============================================

// Ruta de la imagen que vamos a usar como rompecabezas
const IMAGEN_ROMPECABEZAS = "./imagenes/IBM5100.jpg";

let ordenPiezas = []; // Guarda el orden actual de las piezas
let piezaSeleccionada = null; // Índice de la primera pieza seleccionada

function generarRompecabezas() {
    let contenedor = document.getElementById('rompecabezas');
    if (!contenedor) return;

    // Creamos el orden inicial (0 al 8) y lo mezclamos
    ordenPiezas = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    ordenPiezas.sort(() => Math.random() - 0.5);

    // Generamos las 9 piezas del tablero
    let html = '';
    ordenPiezas.forEach((posicionOriginal, indiceActual) => {
        // Calculamos la posición de la imagen para esta pieza
        // Fila y columna original dentro de la imagen
        let fila = Math.floor(posicionOriginal / 3);
        let columna = posicionOriginal % 3;

        // Cada pieza muestra una parte diferente de la imagen
        // background-position se calcula según la fila y columna
        let posX = columna * 50; // 0%, 50%, 100%
        let posY = fila * 50;    // 0%, 50%, 100%

        html += `<div class="pieza" 
                      data-indice="${indiceActual}" 
                      data-posicion="${posicionOriginal}"
                      onclick="seleccionarPieza(${indiceActual})"
                      style="background-image: url('${IMAGEN_ROMPECABEZAS}');
                             background-position: ${posX}% ${posY}%;">
                 </div>`;
    });

    contenedor.innerHTML = html;
    piezaSeleccionada = null;
    document.getElementById('resultado-rompecabezas').innerHTML = '';
}

function seleccionarPieza(indice) {
    let pieza = document.querySelector(`.pieza[data-indice="${indice}"]`);
    if (!pieza || pieza.classList.contains('correcta')) return;

    if (piezaSeleccionada === null) {
        // Primera pieza seleccionada
        piezaSeleccionada = indice;
        pieza.classList.add('seleccionada');
    } else if (piezaSeleccionada === indice) {
        // Hizo clic en la misma pieza, la deseleccionamos
        pieza.classList.remove('seleccionada');
        piezaSeleccionada = null;
    } else {
        // Segunda pieza: intercambiamos las posiciones
        let pieza1 = document.querySelector(`.pieza[data-indice="${piezaSeleccionada}"]`);
        let pieza2 = pieza;

        // Guardamos las posiciones de las dos piezas
        let pos1 = pieza1.getAttribute('data-posicion');
        let pos2 = pieza2.getAttribute('data-posicion');

        // Intercambiamos las posiciones en el atributo
        pieza1.setAttribute('data-posicion', pos2);
        pieza2.setAttribute('data-posicion', pos1);

        // Actualizamos la imagen de cada pieza con la nueva posición
        actualizarImagenPieza(pieza1, pos2);
        actualizarImagenPieza(pieza2, pos1);

        // Quitamos la selección
        pieza1.classList.remove('seleccionada');
        piezaSeleccionada = null;

        // Verificamos si está resuelto
        verificarRompecabezas();
    }
}

// Esta función actualiza la imagen de fondo de una pieza
// según su posición actual (0 al 8)
function actualizarImagenPieza(pieza, posicion) {
    let fila = Math.floor(posicion / 3);
    let columna = posicion % 3;
    let posX = columna * 50;
    let posY = fila * 50;
    pieza.style.backgroundPosition = `${posX}% ${posY}%`;
}

function verificarRompecabezas() {
    let todasCorrectas = true;

    // Recorremos todas las piezas y verificamos que cada una
    // esté en su posición original (data-posicion === data-indice)
    let piezas = document.querySelectorAll('.pieza');
    piezas.forEach(pieza => {
        let indice = pieza.getAttribute('data-indice');
        let posicion = pieza.getAttribute('data-posicion');
        if (indice !== posicion) {
            todasCorrectas = false;
        }
    });

    if (todasCorrectas) {
        // Marcamos todas las piezas como correctas
        piezas.forEach(p => p.classList.add('correcta'));
        document.getElementById('resultado-rompecabezas').innerHTML = '🎉 ¡Excelente! Armaste la imagen del IBM 5100. 🏆';
    }
}

function reiniciarRompecabezas() {
    generarRompecabezas();
}

// Inicializamos el rompecabezas al cargar
generarRompecabezas();

// ===============================================
// JUEGO 5: CONECTA LAS PAREJAS
// ===============================================
// El usuario debe hacer clic en un computador
// y luego en su año correspondiente. Si acierta,
// ambos se marcan en verde.
// ===============================================

const parejasConecta = [
    { id: 1, computador: "IBM 5100", anio: "1975" },
    { id: 2, computador: "IBM PC 5150", anio: "1981" },
    { id: 3, computador: "iMac G3", anio: "1998" },
    { id: 4, computador: "MacBook Pro", anio: "2006" },
    { id: 5, computador: "Surface Pro", anio: "2012" }
];

let itemSeleccionado = null;
let emparejamientosCorrectos = 0;

function generarConecta() {
    let contenedor = document.getElementById('conecta-juego');
    if (!contenedor) return;

    // Mezclamos los computadores y los años por separado
    let computadores = [...parejasConecta].sort(() => Math.random() - 0.5);
    let anios = [...parejasConecta].sort(() => Math.random() - 0.5);

    let html = `
        <div class="columna-conecta">
            <h4>🖥️ Computador</h4>
            ${computadores.map(c => `<div class="item-conecta" data-tipo="computador" data-id="${c.id}" onclick="seleccionarConecta(this)">${c.computador}</div>`).join('')}
        </div>
        <div class="columna-conecta">
            <h4>📅 Año</h4>
            ${anios.map(a => `<div class="item-conecta" data-tipo="anio" data-id="${a.id}" onclick="seleccionarConecta(this)">${a.anio}</div>`).join('')}
        </div>
    `;
    contenedor.innerHTML = html;

    itemSeleccionado = null;
    emparejamientosCorrectos = 0;
    document.getElementById('resultado-conecta').innerHTML = '';
}

function seleccionarConecta(elemento) {
    if (elemento.classList.contains('emparejado')) return;

    if (itemSeleccionado === null) {
        // Primera selección
        itemSeleccionado = elemento;
        elemento.classList.add('seleccionado');
    } else if (itemSeleccionado === elemento) {
        // Hizo clic en el mismo, lo deseleccionamos
        elemento.classList.remove('seleccionado');
        itemSeleccionado = null;
    } else {
        // Segunda selección: verificamos si son pareja
        let tipo1 = itemSeleccionado.getAttribute('data-tipo');
        let tipo2 = elemento.getAttribute('data-tipo');
        let id1 = itemSeleccionado.getAttribute('data-id');
        let id2 = elemento.getAttribute('data-id');

        // Solo emparejamos si son de tipos diferentes (computador con año)
        if (tipo1 !== tipo2 && id1 === id2) {
            // ¡Correcto!
            itemSeleccionado.classList.remove('seleccionado');
            itemSeleccionado.classList.add('emparejado');
            elemento.classList.add('emparejado');
            emparejamientosCorrectos++;

            if (emparejamientosCorrectos === parejasConecta.length) {
                document.getElementById('resultado-conecta').innerHTML = '🎉 ¡Felicidades! Conectaste todas las parejas. 🏆';
            }
        } else {
            // Incorrecto: quitamos la selección
            itemSeleccionado.classList.remove('seleccionado');
        }

        itemSeleccionado = null;
    }
}

function reiniciarConecta() {
    generarConecta();
}

// Inicializamos el juego de conectar al cargar
generarConecta();