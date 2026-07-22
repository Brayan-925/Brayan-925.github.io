const tituloMetodo = document.getElementById("titulo-metodo");
const instruccionesMetodo = document.getElementById("instrucciones-metodo");
const cuerpoPagina = document.getElementById("cuerpo-pagina");

// Interfaces
const interfazReloj = document.getElementById("interfaz-reloj");
const interfazFlashcards = document.getElementById("interfaz-flashcards");

// Elementos del Reloj
const tiempoPantalla = document.getElementById("tiempo-pantalla");
const btnIniciar = document.getElementById("btn-iniciar");
const btnPausar = document.getElementById("btn-pausar");
const btnReiniciar = document.getElementById("btn-reiniciar");
const faseActualTexto = document.getElementById("fase-actual");
const circuloProgreso = document.getElementById("circulo-progreso");
const contadorCiclosEl = document.getElementById("contador-ciclos");
const notificacion = document.getElementById("notificacion-fase");

// Elementos de Flashcards
const flashcardInner = document.getElementById("flashcard-inner");
const textoTarjeta = document.getElementById("texto-tarjeta");
const respuestaTarjeta = document.getElementById("respuesta-tarjeta");
const btnSiguiente = document.getElementById("btn-siguiente");
const btnAnterior = document.getElementById("btn-anterior");
const btnEditar = document.getElementById("btn-editar");
const btnEliminarTarjeta = document.getElementById("btn-eliminar-tarjeta");
const formFlashcard = document.getElementById("form-flashcard");
const filtroCurso = document.getElementById("filtro-curso");
const contadorTarjetas = document.getElementById("contador-tarjetas");
const pistaVolteo = document.getElementById("pista-volteo");

const metodoGuardado = localStorage.getItem("metodoSeleccionado");

// Función para reproducir un beep usando Web Audio API
function reproducirBeep() {
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.value = 800;
        osc.type = "sine";
        gain.gain.value = 0.3;
        osc.start();
        osc.stop(ctx.currentTime + 0.5);
    } catch (e) {
        console.log("Beep no disponible");
    }
}

// Función para mostrar notificación visual
function mostrarNotificacion(mensaje, tipo) {
    notificacion.textContent = mensaje;
    notificacion.className = "notificacion-cambio " + tipo + " mostrar";
    setTimeout(() => {
        notificacion.classList.remove("mostrar");
    }, 3000);
}

if (metodoGuardado) {
    tituloMetodo.textContent = metodoGuardado;

    // ========================================
    // 1. ACTIVE RECALL - FLASHCARDS
    // ========================================
    if (metodoGuardado.includes("Active Recall")) {
        interfazReloj.style.display = "none";
        interfazFlashcards.style.display = "block";

        instruccionesMetodo.innerHTML = "Filtra por curso arriba. Haz clic en la tarjeta para ver la respuesta.";

        // --- Cargar cursos desde localStorage ---
        function cargarCursosEnSelects() {
            const selectFiltro = document.getElementById("filtro-curso");
            const selectNuevo = document.getElementById("nuevo-curso");
            if (!selectFiltro || !selectNuevo) return;

            let misCursosGuardados = JSON.parse(localStorage.getItem("listaCursosCompletos")) || [];
            let nombresUnicos = [...new Set(misCursosGuardados.map(curso => curso.nombre))];

            selectFiltro.innerHTML = '<option value="Todos">Todos los cursos</option>';
            selectNuevo.innerHTML = '<option value="" disabled selected>Selecciona el curso...</option>';

            if (nombresUnicos.length === 0) {
                selectNuevo.innerHTML = '<option value="" disabled selected>Ve a "Cursos" para agregar materias</option>';
                return;
            }

            nombresUnicos.forEach(nombre => {
                selectFiltro.innerHTML += `<option value="${nombre}">${nombre}</option>`;
                selectNuevo.innerHTML += `<option value="${nombre}">${nombre}</option>`;
            });
        }

        cargarCursosEnSelects();

        // --- Lógica de flashcards ---
        let todasLasFlashcards = JSON.parse(localStorage.getItem("misFlashcards")) || [];
        let flashcardsFiltradas = [];
        let indiceActual = 0;
        let mostrandoRespuesta = false;

        function actualizarContador() {
            const total = flashcardsFiltradas.length;
            if (total === 0) {
                contadorTarjetas.textContent = "No hay tarjetas";
                pistaVolteo.textContent = "💡 Agrega una tarjeta abajo";
            } else {
                contadorTarjetas.textContent = `Tarjeta ${indiceActual + 1} de ${total}`;
                pistaVolteo.textContent = "💡 Haz clic en la tarjeta para voltear";
            }
        }

        function aplicarFiltro() {
            const cursoSeleccionado = filtroCurso.value;
            if (cursoSeleccionado === "Todos") {
                flashcardsFiltradas = todasLasFlashcards;
            } else {
                flashcardsFiltradas = todasLasFlashcards.filter(fc => fc.curso === cursoSeleccionado);
            }
            indiceActual = 0;
            flashcardInner.classList.remove("volteada");
            mostrandoRespuesta = false;
            cargarTarjeta();
            actualizarContador();
        }

        function cargarTarjeta() {
            if (flashcardsFiltradas.length === 0) {
                textoTarjeta.textContent = "No hay tarjetas en este curso. ¡Añade una abajo!";
                respuestaTarjeta.textContent = "";
                return;
            }
            const actual = flashcardsFiltradas[indiceActual];
            textoTarjeta.textContent = actual.pregunta;
            respuestaTarjeta.textContent = actual.respuesta;
            flashcardInner.classList.remove("volteada");
            mostrandoRespuesta = false;
            actualizarContador();
        }

        // Voltear tarjeta al hacer clic
        flashcardInner.addEventListener("click", function () {
            if (flashcardsFiltradas.length === 0) return;
            flashcardInner.classList.toggle("volteada");
            mostrandoRespuesta = flashcardInner.classList.contains("volteada");
        });

        // Botón Anterior
        btnAnterior.addEventListener("click", function () {
            if (flashcardsFiltradas.length === 0) return;
            indiceActual--;
            if (indiceActual < 0) indiceActual = flashcardsFiltradas.length - 1;
            cargarTarjeta();
        });

        // Botón Siguiente
        btnSiguiente.addEventListener("click", function () {
            if (flashcardsFiltradas.length === 0) return;
            indiceActual++;
            if (indiceActual >= flashcardsFiltradas.length) indiceActual = 0;
            cargarTarjeta();
        });

        // Botón Editar
        btnEditar.addEventListener("click", function () {
            if (flashcardsFiltradas.length === 0) return;
            const actual = flashcardsFiltradas[indiceActual];
            const nuevaPreg = prompt("Editar pregunta:", actual.pregunta);
            if (nuevaPreg === null || nuevaPreg.trim() === "") return;
            const nuevaResp = prompt("Editar respuesta:", actual.respuesta);
            if (nuevaResp === null || nuevaResp.trim() === "") return;

            actual.pregunta = nuevaPreg.trim();
            actual.respuesta = nuevaResp.trim();

            // Actualizar en el array principal
            const idxGlobal = todasLasFlashcards.findIndex(fc => fc.curso === actual.curso && fc.pregunta === actual.pregunta);
            if (idxGlobal !== -1) {
                todasLasFlashcards[idxGlobal] = actual;
            }
            localStorage.setItem("misFlashcards", JSON.stringify(todasLasFlashcards));
            cargarTarjeta();
        });

        // Botón Eliminar
        btnEliminarTarjeta.addEventListener("click", function () {
            if (flashcardsFiltradas.length === 0) return;
            if (!confirm("¿Eliminar esta tarjeta?")) return;

            const actual = flashcardsFiltradas[indiceActual];
            // Buscar en el array principal y eliminar
            const idxGlobal = todasLasFlashcards.findIndex(fc => fc.curso === actual.curso && fc.pregunta === actual.pregunta && fc.respuesta === actual.respuesta);
            if (idxGlobal !== -1) {
                todasLasFlashcards.splice(idxGlobal, 1);
            }
            localStorage.setItem("misFlashcards", JSON.stringify(todasLasFlashcards));
            aplicarFiltro();
        });

        filtroCurso.addEventListener("change", aplicarFiltro);

        formFlashcard.addEventListener("submit", function (event) {
            event.preventDefault();
            const curso = document.getElementById("nuevo-curso").value;
            const pregunta = document.getElementById("nueva-pregunta").value;
            const respuesta = document.getElementById("nueva-respuesta").value;
            if (pregunta === "" || respuesta === "") {
                alert("Escribe tanto la pregunta como la respuesta.");
                return;
            }
            todasLasFlashcards.push({ curso, pregunta, respuesta });
            localStorage.setItem("misFlashcards", JSON.stringify(todasLasFlashcards));

            document.getElementById("nueva-pregunta").value = "";
            document.getElementById("nueva-respuesta").value = "";

            aplicarFiltro();
        });

        aplicarFiltro();
    }

    // ========================================
    // 2. TEMPORIZADOR (Pomodoro / 52/17 / Deep Work)
    // ========================================
    else {
        interfazFlashcards.style.display = "none";
        interfazReloj.style.display = "block";

        let minEnfoque = 25, minDescanso = 5;

        if (metodoGuardado.includes("Pomodoro")) {
            instruccionesMetodo.innerHTML = "Ciclo de 25 minutos de trabajo y 5 minutos de descanso.";
            minEnfoque = 25; minDescanso = 5;
        } else if (metodoGuardado.includes("52/17")) {
            instruccionesMetodo.innerHTML = "Ciclo largo: 52 minutos de inmersión y 17 minutos de descanso.";
            minEnfoque = 52; minDescanso = 17;
        } else if (metodoGuardado.includes("Deep Work")) {
            instruccionesMetodo.innerHTML = "Trabajo profundo sin interrupciones. 90 minutos de foco y 20 de descanso.";
            minEnfoque = 90; minDescanso = 20;
        }

        let fase = "Enfoque";
        let tiempo = minEnfoque * 60;
        let tiempoTotal = tiempo;
        let intervalo;
        let corriendo = false;
        let ciclosCompletados = 0;

        // Calcular la circunferencia para la barra circular
        const circunferencia = 2 * Math.PI * 95; // ~596.9

        function actualizarBarraProgreso() {
            const porcentaje = tiempo / tiempoTotal;
            const offset = circunferencia * (1 - porcentaje);
            circuloProgreso.style.strokeDashoffset = offset;
        }

        function actualizarAmbiente() {
            if (fase === "Enfoque") {
                faseActualTexto.textContent = "Fase: Enfoque 🔥";
                faseActualTexto.style.color = "#38bdf8";
                circuloProgreso.style.stroke = "#38bdf8";
                cuerpoPagina.style.backgroundColor = "#020617";
            } else {
                faseActualTexto.textContent = "Fase: Descanso ☕";
                faseActualTexto.style.color = "#4ade80";
                circuloProgreso.style.stroke = "#4ade80";
                cuerpoPagina.style.backgroundColor = "#78350f";
            }
        }

        function actualizarDisplay() {
            let m = Math.floor(tiempo / 60);
            let s = tiempo % 60;
            tiempoPantalla.textContent = `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
            actualizarBarraProgreso();
        }

        function reiniciarTemporizador() {
            clearInterval(intervalo);
            corriendo = false;
            fase = "Enfoque";
            tiempo = minEnfoque * 60;
            tiempoTotal = tiempo;
            actualizarAmbiente();
            actualizarDisplay();
            btnIniciar.textContent = "▶ Iniciar";
        }

        actualizarAmbiente();
        actualizarDisplay();

        btnIniciar.addEventListener("click", function () {
            if (!corriendo) {
                corriendo = true;
                btnIniciar.textContent = "⏳ En curso";
                intervalo = setInterval(function () {
                    if (tiempo > 0) {
                        tiempo--;
                        actualizarDisplay();
                    } else {
                        // Cambio de fase
                        reproducirBeep();

                        if (fase === "Enfoque") {
                            fase = "Descanso";
                            tiempo = minDescanso * 60;
                            tiempoTotal = tiempo;
                            ciclosCompletados++;
                            contadorCiclosEl.textContent = `Ciclo #${ciclosCompletados} completados`;
                            mostrarNotificacion("☕ ¡Tiempo de descanso! " + minDescanso + " minutos.", "descanso");
                        } else {
                            fase = "Enfoque";
                            tiempo = minEnfoque * 60;
                            tiempoTotal = tiempo;
                            mostrarNotificacion("🔥 ¡Vuelve al enfoque! " + minEnfoque + " minutos.", "enfoque");
                        }
                        actualizarAmbiente();
                        actualizarDisplay();
                    }
                }, 1000);
            }
        });

        btnPausar.addEventListener("click", function () {
            clearInterval(intervalo);
            corriendo = false;
            btnIniciar.textContent = "▶ Reanudar";
        });

        btnReiniciar.addEventListener("click", reiniciarTemporizador);
    }
}

