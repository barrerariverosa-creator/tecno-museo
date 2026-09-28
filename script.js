// ===============================================
// FUNCIÓN 1: Cambiar de pestaña
// ===============================================
function cambiarPestana(nombrePestana, boton) {
    document.querySelectorAll('.pestana').forEach(p => p.classList.remove('activa'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('activo'));
    document.getElementById('tab-' + nombrePestana).classList.add('activa');
    boton.classList.add('activo');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===============================================
// FUNCIÓN 2: Abrir dato curioso en nueva pestaña
// ===============================================
function abrirDatoCurioso(id) {
    let ventana = window.open('', '_blank', 'width=500,height=400');
    ventana.document.write(`
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <title>Dato Curioso - Museo Digital</title>
            <style>
                body {
                    font-family: 'Segoe UI', sans-serif;
                    padding: 2rem;
                    background: linear-gradient(135deg, #fef9e7, #fff);
                    color: #1a2a3a;
                    text-align: center;
                }
                h1 { color: #b7950b; }
                p { font-size: 1.2rem; line-height: 1.6; }
                .cerrar {
                    margin-top: 2rem;
                    padding: 0.8rem 2rem;
                    background: #e67e22;
                    color: white;
                    border: none;
                    border-radius: 8px;
                    font-size: 1rem;
                    cursor: pointer;
                }
                .cerrar:hover { background: #d35400; }
            </style>
        </head>
        <body>
            ${obtenerContenidoDato(id)}
            <button class="cerrar" onclick="window.close()">Cerrar ventana</button>
        </body>
        </html>
    `);
}

function obtenerContenidoDato(id) {
    const datos = {
        dato1: `<h1>💡 Dato Curioso: Altair 8800</h1>
                <p>El Altair 8800 (1975) se vendía como un kit que el usuario debía ensamblar.</p>
                <p>No tenía monitor ni teclado: se conectaba a un televisor.</p>`,
        dato2: `<h1>💡 Dato Curioso: IBM PC</h1>
                <p>El IBM PC de 1981 se convirtió en el estándar de la industria.</p>
                <p>Gracias a él aparecieron los "PC compatibles".</p>`,
        dato3: `<h1>💡 Dato Curioso: Windows 95</h1>
                <p>Windows 95 fue uno de los sistemas operativos más populares de la historia.</p>
                <p>Introdujo el menú de inicio y la barra de tareas como los conocemos hoy.</p>`,
        dato4: `<h1>💡 Dato Curioso: Cuarta Generación</h1>
                <p>En esta época aparecieron los SSD (discos de estado sólido) y el Wi-Fi.</p>
                <p>Las laptops se volvieron el estándar para estudiar y trabajar.</p>`,
        dato5: `<h1>💡 Dato Curioso: Quinta Generación</h1>
                <p>Hoy un teléfono inteligente tiene más poder de cómputo que el computador que llevó al hombre a la Luna en 1969.</p>`
    };
    return datos[id] || '<h1>Dato no encontrado</h1>';
}

// ===============================================
// FUNCIÓN 3: Mostrar la fecha actual en el footer
// ===============================================
function mostrarFecha() {
    let fecha = new Date();
    let opciones = { year: 'numeric', month: 'long', day: 'numeric' };
    let textoFecha = fecha.toLocaleDateString('es-ES', opciones);
    let elemento = document.getElementById('fecha-actual');
    if (elemento) elemento.innerHTML = "📅 Hoy es " + textoFecha;
}
mostrarFecha();

// ===============================================
// JUEGO 1: ASOCIA LA CARACTERÍSTICA
// ===============================================
const preguntasJuego1 = [
    { id: 1, descripcion: "¿Qué computador de 1975 se vendía como kit?", opciones: ["Altair 8800", "IBM PC", "Macintosh"], correcta: "Altair 8800" },
    { id: 2, descripcion: "¿Quién desarrolló el Apple I en 1976?", opciones: ["Steve Wozniak y Steve Jobs", "Bill Gates", "Douglas Engelbart"], correcta: "Steve Wozniak y Steve Jobs" },
    { id: 3, descripcion: "¿Qué computador de 1981 se convirtió en referencia?", opciones: ["IBM PC", "Commodore 64", "Apple II"], correcta: "IBM PC" },
    { id: 4, descripcion: "¿Qué computador de 1984 usaba interfaz gráfica y mouse?", opciones: ["Macintosh", "Altair 8800", "IBM PC"], correcta: "Macintosh" },
    { id: 5, descripcion: "¿Qué sistema operativo apareció en 1995?", opciones: ["Windows 95", "MS-DOS", "Mac OS"], correcta: "Windows 95" },
    { id: 6, descripcion: "¿Qué tecnología es característica de la 5ª generación?", opciones: ["Inteligencia artificial", "Tarjetas perforadas", "Disquetes"], correcta: "Inteligencia artificial" },
    { id: 7, descripcion: "¿Qué procesadores fueron importantes en los 90?", opciones: ["Intel 386, 486 y Pentium", "Intel 4004", "Apple M1"], correcta: "Intel 386, 486 y Pentium" },
    { id: 8, descripcion: "¿Qué aportó la cuarta generación?", opciones: ["Computación móvil y conectada", "Los primeros videojuegos", "La programación doméstica"], correcta: "Computación móvil y conectada" }
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
        : `📖 Obtuviste ${correctas} de ${total}. Repasa e intenta de nuevo.`;
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
    { id: 1, descripcion: "¿Cuándo apareció el Intel 4004?", opciones: ["1970-1979", "1980-1989", "1990-1999"], correcta: "1970-1979" },
    { id: 2, descripcion: "¿Cuándo se lanzó el IBM PC?", opciones: ["1970-1979", "1980-1989", "1990-1999"], correcta: "1980-1989" },
    { id: 3, descripcion: "¿Cuándo apareció Windows 95?", opciones: ["1980-1989", "1990-1999", "2000-2010"], correcta: "1990-1999" },
    { id: 4, descripcion: "¿Cuándo se popularizaron las laptops y el Wi-Fi?", opciones: ["1990-1999", "2000-2010", "2010-actualidad"], correcta: "2000-2010" },
    { id: 5, descripcion: "¿Cuándo surgió la IA moderna?", opciones: ["1990-1999", "2000-2010", "2010-actualidad"], correcta: "2010-actualidad" },
    { id: 6, descripcion: "¿Cuándo apareció el Apple II?", opciones: ["1970-1979", "1980-1989", "1990-1999"], correcta: "1970-1979" },
    { id: 7, descripcion: "¿Cuándo apareció el Commodore 64?", opciones: ["1970-1979", "1980-1989", "1990-1999"], correcta: "1980-1989" },
    { id: 8, descripcion: "¿Cuándo se expandieron los CD-ROM?", opciones: ["1980-1989", "1990-1999", "2000-2010"], correcta: "1990-1999" }
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
        ? `🎉 ¡Excelente! Obtuviste ${correctas} de ${total}. 🏆`
        : correctas >= total * 0.6
        ? `👍 Buen trabajo. Obtuviste ${correctas} de ${total}.`
        : `📖 Obtuviste ${correctas} de ${total}. Repasa e intenta de nuevo.`;
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
const parejasMemoria = [
    { id: 1, texto: "Altair 8800", pareja: "1ª Gen" },
    { id: 2, texto: "MS-DOS", pareja: "2ª Gen" },
    { id: 3, texto: "Windows 95", pareja: "3ª Gen" },
    { id: 4, texto: "WiFi", pareja: "4ª Gen" },
    { id: 5, texto: "IA", pareja: "5ª Gen" },
    { id: 6, texto: "Macintosh", pareja: "2ª Gen" }
];

let cartasMemoria = [];
let cartasVolteadas = [];
let parejasEncontradas = 0;
let bloqueoMemoria = false;

function generarMemoria() {
    let tablero = document.getElementById('tablero-memoria');
    if (!tablero) return;

    cartasMemoria = [];
    parejasMemoria.forEach(p => {
        cartasMemoria.push({ id: p.id, texto: p.texto, tipo: 'concepto' });
        cartasMemoria.push({ id: p.id, texto: p.pareja, tipo: 'generacion' });
    });
    cartasMemoria.sort(() => Math.random() - 0.5);

    let html = '';
    cartasMemoria.forEach((carta, index) => {
        html += `<div class="carta" data-index="${index}" onclick="voltearCarta(${index})">?</div>`;
    });
    tablero.innerHTML = html;

    cartasVolteadas = [];
    parejasEncontradas = 0;
    bloqueoMemoria = false;
    document.getElementById('resultado-memoria').innerHTML = '';
}

function voltearCarta(index) {
    if (bloqueoMemoria) return;
    let carta = document.querySelector(`.carta[data-index="${index}"]`);
    if (!carta || carta.classList.contains('volteada') || carta.classList.contains('encontrada')) return;

    carta.classList.add('volteada');
    carta.textContent = cartasMemoria[index].texto;
    cartasVolteadas.push(index);

    if (cartasVolteadas.length === 2) {
        bloqueoMemoria = true;
        let [i1, i2] = cartasVolteadas;
        let c1 = cartasMemoria[i1];
        let c2 = cartasMemoria[i2];

        if (c1.id === c2.id && c1.tipo !== c2.tipo) {
            document.querySelector(`.carta[data-index="${i1}"]`).classList.add('encontrada');
            document.querySelector(`.carta[data-index="${i2}"]`).classList.add('encontrada');
            parejasEncontradas++;
            cartasVolteadas = [];
            bloqueoMemoria = false;

            if (parejasEncontradas === parejasMemoria.length) {
                document.getElementById('resultado-memoria').innerHTML = '🎉 ¡Felicidades! Encontraste todas las parejas. 🏆';
            }
        } else {
            document.getElementById('resultado-memoria').innerHTML = '❌ Esas no son pareja. ¡Intenta de nuevo!';
            setTimeout(() => {
                document.querySelector(`.carta[data-index="${i1}"]`).classList.remove('volteada');
                document.querySelector(`.carta[data-index="${i1}"]`).textContent = '?';
                document.querySelector(`.carta[data-index="${i2}"]`).classList.remove('volteada');
                document.querySelector(`.carta[data-index="${i2}"]`).textContent = '?';
                cartasVolteadas = [];
                bloqueoMemoria = false;
                document.getElementById('resultado-memoria').innerHTML = '';
            }, 1500);
        }
    }
}

function reiniciarMemoria() {
    generarMemoria();
}

// ===============================================
// JUEGO 4: ROMPECABEZAS CON IMAGEN
// ===============================================
const IMAGEN_ROMPECABEZAS = "./imagenes/IBM5100.jpg";
let piezaSeleccionada = null;

function generarRompecabezas() {
    let contenedor = document.getElementById('rompecabezas');
    if (!contenedor) return;

    let ordenPiezas = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    ordenPiezas.sort(() => Math.random() - 0.5);

    let html = '';
    ordenPiezas.forEach((posicionOriginal, indiceActual) => {
        let fila = Math.floor(posicionOriginal / 3);
        let columna = posicionOriginal % 3;
        let posX = columna * 50;
        let posY = fila * 50;

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
        piezaSeleccionada = indice;
        pieza.classList.add('seleccionada');
    } else if (piezaSeleccionada === indice) {
        pieza.classList.remove('seleccionada');
        piezaSeleccionada = null;
    } else {
        let pieza1 = document.querySelector(`.pieza[data-indice="${piezaSeleccionada}"]`);
        let pieza2 = pieza;

        let pos1 = pieza1.getAttribute('data-posicion');
        let pos2 = pieza2.getAttribute('data-posicion');

        pieza1.setAttribute('data-posicion', pos2);
        pieza2.setAttribute('data-posicion', pos1);

        actualizarImagenPieza(pieza1, pos2);
        actualizarImagenPieza(pieza2, pos1);

        pieza1.classList.remove('seleccionada');
        piezaSeleccionada = null;

        verificarRompecabezas();
    }
}

function actualizarImagenPieza(pieza, posicion) {
    let fila = Math.floor(posicion / 3);
    let columna = posicion % 3;
    let posX = columna * 50;
    let posY = fila * 50;
    pieza.style.backgroundPosition = `${posX}% ${posY}%`;
}

function verificarRompecabezas() {
    let piezas = document.querySelectorAll('.pieza');
    let todasCorrectas = true;
    piezas.forEach(pieza => {
        if (pieza.getAttribute('data-indice') !== pieza.getAttribute('data-posicion')) {
            todasCorrectas = false;
        }
    });

    if (todasCorrectas) {
        piezas.forEach(p => p.classList.add('correcta'));
        document.getElementById('resultado-rompecabezas').innerHTML = '🎉 ¡Excelente! Armaste la imagen. 🏆';
    }
}

function reiniciarRompecabezas() {
    generarRompecabezas();
}

// ===============================================
// JUEGO 5: CONECTA LAS PAREJAS
// ===============================================
const parejasConecta = [
    { id: 1, computador: "Altair 8800", anio: "1975" },
    { id: 2, computador: "IBM PC", anio: "1981" },
    { id: 3, computador: "Macintosh", anio: "1984" },
    { id: 4, computador: "Windows 95", anio: "1995" },
    { id: 5, computador: "Intel Pentium", anio: "1993" }
];

let itemSeleccionado = null;
let emparejamientosCorrectos = 0;

function generarConecta() {
    let contenedor = document.getElementById('conecta-juego');
    if (!contenedor) return;

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
        itemSeleccionado = elemento;
        elemento.classList.add('seleccionado');
    } else if (itemSeleccionado === elemento) {
        elemento.classList.remove('seleccionado');
        itemSeleccionado = null;
    } else {
        let tipo1 = itemSeleccionado.getAttribute('data-tipo');
        let tipo2 = elemento.getAttribute('data-tipo');
        let id1 = itemSeleccionado.getAttribute('data-id');
        let id2 = elemento.getAttribute('data-id');

        if (tipo1 !== tipo2 && id1 === id2) {
            itemSeleccionado.classList.remove('seleccionado');
            itemSeleccionado.classList.add('emparejado');
            elemento.classList.add('emparejado');
            emparejamientosCorrectos++;

            if (emparejamientosCorrectos === parejasConecta.length) {
                document.getElementById('resultado-conecta').innerHTML = '🎉 ¡Felicidades! Conectaste todas las parejas. 🏆';
            }
        } else {
            itemSeleccionado.classList.remove('seleccionado');
        }

        itemSeleccionado = null;
    }
}

function reiniciarConecta() {
    generarConecta();
}

// ===============================================
// JUEGO 6: SOPA DE LETRAS
// ===============================================
const palabrasSopa = ["MOUSE", "IBM", "APPLE", "WINDOWS", "WIFI", "IA", "NUBE", "PENTIUM"];
const tamanoSopa = 10;
let sopaMatriz = [];
let celdasSeleccionadas = [];
let palabrasEncontradas = [];

function generarSopa() {
    let contenedor = document.getElementById('sopa-letras');
    let contenedorPalabras = document.getElementById('palabras-buscar');
    if (!contenedor) return;

    sopaMatriz = [];
    for (let i = 0; i < tamanoSopa; i++) {
        sopaMatriz[i] = [];
        for (let j = 0; j < tamanoSopa; j++) {
            sopaMatriz[i][j] = String.fromCharCode(65 + Math.floor(Math.random() * 26));
        }
    }

    palabrasSopa.forEach(palabra => {
        let fila = Math.floor(Math.random() * tamanoSopa);
        let colInicio = Math.floor(Math.random() * (tamanoSopa - palabra.length));
        for (let k = 0; k < palabra.length; k++) {
            sopaMatriz[fila][colInicio + k] = palabra[k];
        }
    });

    let html = '';
    for (let i = 0; i < tamanoSopa; i++) {
        for (let j = 0; j < tamanoSopa; j++) {
            html += `<div class="celda-sopa" data-fila="${i}" data-col="${j}" onclick="seleccionarCelda(${i}, ${j})">${sopaMatriz[i][j]}</div>`;
        }
    }
    contenedor.innerHTML = html;

    let htmlPalabras = '';
    palabrasSopa.forEach(p => {
        htmlPalabras += `<span class="palabra-buscar" data-palabra="${p}">${p}</span>`;
    });
    contenedorPalabras.innerHTML = htmlPalabras;

    celdasSeleccionadas = [];
    palabrasEncontradas = [];
    document.getElementById('resultado-sopa').innerHTML = '';
}

function seleccionarCelda(fila, col) {
    let celda = document.querySelector(`.celda-sopa[data-fila="${fila}"][data-col="${col}"]`);
    if (!celda || celda.classList.contains('encontrada')) return;

    if (celda.classList.contains('seleccionada')) {
        celda.classList.remove('seleccionada');
        celdasSeleccionadas = celdasSeleccionadas.filter(c => !(c.fila === fila && c.col === col));
        return;
    }

    celda.classList.add('seleccionada');
    celdasSeleccionadas.push({ fila, col });
    verificarPalabraSopa();
}

function verificarPalabraSopa() {
    if (celdasSeleccionadas.length < 2) return;

    let palabraFormada = celdasSeleccionadas.map(c => sopaMatriz[c.fila][c.col]).join('');

    let palabraEncontrada = palabrasSopa.find(p =>
        (p === palabraFormada || p === palabraFormada.split('').reverse().join('')) &&
        !palabrasEncontradas.includes(p)
    );

    if (palabraEncontrada) {
        palabrasEncontradas.push(palabraEncontrada);
        celdasSeleccionadas.forEach(c => {
            let celda = document.querySelector(`.celda-sopa[data-fila="${c.fila}"][data-col="${c.col}"]`);
            celda.classList.remove('seleccionada');
            celda.classList.add('encontrada');
        });
        document.querySelector(`.palabra-buscar[data-palabra="${palabraEncontrada}"]`).classList.add('encontrada');
        celdasSeleccionadas = [];

        if (palabrasEncontradas.length === palabrasSopa.length) {
            document.getElementById('resultado-sopa').innerHTML = '🎉 ¡Felicidades! Encontraste todas las palabras. 🏆';
        }
    } else if (celdasSeleccionadas.length > 8) {
        celdasSeleccionadas.forEach(c => {
            let celda = document.querySelector(`.celda-sopa[data-fila="${c.fila}"][data-col="${c.col}"]`);
            celda.classList.remove('seleccionada');
        });
        celdasSeleccionadas = [];
    }
}

function reiniciarSopa() {
    generarSopa();
}

// ===============================================
// JUEGO 7: ORDENA LA LÍNEA DE TIEMPO
// ===============================================
const eventosLineaTiempo = [
    { id: 1, texto: "1971: Intel 4004", orden: 1 },
    { id: 2, texto: "1975: Altair 8800", orden: 2 },
    { id: 3, texto: "1977: Apple II", orden: 3 },
    { id: 4, texto: "1981: IBM PC", orden: 4 },
    { id: 5, texto: "1984: Macintosh", orden: 5 },
    { id: 6, texto: "1995: Windows 95", orden: 6 },
    { id: 7, texto: "2000: Laptops y Wi-Fi", orden: 7 },
    { id: 8, texto: "2010: IA moderna", orden: 8 }
];

let eventosActuales = [];

function generarLineaTiempo() {
    let contenedor = document.getElementById('linea-tiempo-juego');
    if (!contenedor) return;

    eventosActuales = [...eventosLineaTiempo].sort(() => Math.random() - 0.5);
    renderizarLineaTiempo();
    document.getElementById('resultado-linea').innerHTML = '';
}

function renderizarLineaTiempo() {
    let contenedor = document.getElementById('linea-tiempo-juego');
    let html = '';
    eventosActuales.forEach((evento, i) => {
        html += `
            <div class="evento-tiempo" data-index="${i}">
                <span class="texto-evento">${evento.texto}</span>
                <div class="flechas">
                    <button onclick="moverEvento(${i}, -1)">⬆️</button>
                    <button onclick="moverEvento(${i}, 1)">⬇️</button>
                </div>
            </div>
        `;
    });
    contenedor.innerHTML = html;
}

function moverEvento(index, direccion) {
    let nuevoIndex = index + direccion;
    if (nuevoIndex < 0 || nuevoIndex >= eventosActuales.length) return;

    let temp = eventosActuales[index];
    eventosActuales[index] = eventosActuales[nuevoIndex];
    eventosActuales[nuevoIndex] = temp;

    renderizarLineaTiempo();
}

function verificarLineaTiempo() {
    let correcto = true;
    for (let i = 0; i < eventosActuales.length; i++) {
        if (eventosActuales[i].orden !== i + 1) {
            correcto = false;
            break;
        }
    }

    if (correcto) {
        document.getElementById('resultado-linea').innerHTML = '🎉 ¡Excelente! Ordenaste correctamente la línea de tiempo. 🏆';
    } else {
        document.getElementById('resultado-linea').innerHTML = '❌ Aún no está en orden. Revisa las fechas e intenta de nuevo.';
    }
}

function reiniciarLineaTiempo() {
    generarLineaTiempo();
}

// ===============================================
// INICIALIZACIÓN: Ejecutar todas las funciones
// cuando la página cargue
// ===============================================
document.addEventListener('DOMContentLoaded', function() {
    generarJuego1();
    generarJuego2();
    generarMemoria();
    generarRompecabezas();
    generarConecta();
    generarSopa();
    generarLineaTiempo();
});