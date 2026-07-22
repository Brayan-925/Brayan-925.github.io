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
const faseActualTexto = document.getElementById("fase-actual");

// Elementos de Flashcards
const tarjeta = document.getElementById("tarjeta");
const textoTarjeta = document.getElementById("texto-tarjeta");
const btnSiguiente = document.getElementById("btn-siguiente");
const formFlashcard = document.getElementById("form-flashcard");
const filtroCurso = document.getElementById("filtro-curso");

const metodoGuardado = localStorage.getItem("metodoSeleccionado");

if (metodoGuardado) {
    tituloMetodo.textContent = metodoGuardado;


    // 1. LÓGICA DE ACTIVE RECALL CLASIFICADO

    if (metodoGuardado.includes("Active Recall")) {
        interfazReloj.style.display = "none";
        interfazFlashcards.style.display = "block";

        instruccionesMetodo.innerHTML = "Filtra por curso arriba. Lee la pregunta y trata de recordar la respuesta exacta antes de voltear la tarjeta.";

        // Llenar los Selects dinámicamente ---
        function cargarCursosEnSelects() {
            const selectFiltro = document.getElementById("filtro-curso");
            const selectNuevo = document.getElementById("nuevo-curso");

            if (!selectFiltro || !selectNuevo) return;

            let misCursosGuardados = JSON.parse(localStorage.getItem("listaCursosCompletos")) || [];

            // Extraemos solo los nombres de los cursos y quitamos duplicados 
            // (por si llevas Física tanto el Lunes como el Miércoles)
            let nombresUnicos = [...new Set(misCursosGuardados.map(curso => curso.nombre))];

            // Limpiamos los selects manteniendo las opciones por defecto
            selectFiltro.innerHTML = '<option value="Todos">Todos los cursos</option>';
            selectNuevo.innerHTML = '<option value="" disabled selected>Selecciona el curso...</option>';

            // Si no hay cursos, avisamos visualmente
            if (nombresUnicos.length === 0) {
                selectNuevo.innerHTML = '<option value="" disabled selected>Ve a "Cursos" para agregar materias</option>';
                return;
            }

            // Inyectamos las opciones dinámicamente
            nombresUnicos.forEach(nombre => {
                selectFiltro.innerHTML += `<option value="${nombre}">${nombre}</option>`;
                selectNuevo.innerHTML += `<option value="${nombre}">${nombre}</option>`;
            });
        }

        // Ejecutamos la carga de cursos inmediatamente
        cargarCursosEnSelects();
        // -----------------------------------------------------
        let todasLasFlashcards = JSON.parse(localStorage.getItem("misFlashcards")) || [];
        let flashcardsFiltradas = [];
        let indiceActual = 0;
        let mostrandoRespuesta = false;

        function aplicarFiltro() {
            const cursoSeleccionado = filtroCurso.value;
            if (cursoSeleccionado === "Todos") {
                flashcardsFiltradas = todasLasFlashcards;
            } else {
                flashcardsFiltradas = todasLasFlashcards.filter(fc => fc.curso === cursoSeleccionado);
            }
            indiceActual = 0;
            cargarTarjeta();
        }

        function cargarTarjeta() {
            if (flashcardsFiltradas.length === 0) {
                textoTarjeta.textContent = "No hay tarjetas en este curso. ¡Añade una abajo!";
                textoTarjeta.style.color = "#94a3b8";
                return;
            }
            textoTarjeta.textContent = flashcardsFiltradas[indiceActual].pregunta;
            textoTarjeta.style.color = "#e2e8f0";
            mostrandoRespuesta = false;
        }

        tarjeta.addEventListener("click", function () {
            if (flashcardsFiltradas.length === 0) return;
            if (!mostrandoRespuesta) {
                textoTarjeta.textContent = flashcardsFiltradas[indiceActual].respuesta;
                textoTarjeta.style.color = "#4ade80";
                mostrandoRespuesta = true;
            } else {
                cargarTarjeta();
            }
        });

        btnSiguiente.addEventListener("click", function () {
            if (flashcardsFiltradas.length === 0) return;
            indiceActual++;
            if (indiceActual >= flashcardsFiltradas.length) indiceActual = 0;
            cargarTarjeta();
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

            aplicarFiltro(); // Recargar la vista
        });

        aplicarFiltro(); // Cargar al inicio

    }

    // 2. LÓGICA DEL TEMPORIZADOR INMERSIVO
    else {
        interfazFlashcards.style.display = "none";
        interfazReloj.style.display = "block";

        let minEnfoque = 25, minDescanso = 5;

        // Configuramos los ciclos según el método
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
        let tiempo = minEnfoque * 60; // Convertimos a segundos
        let intervalo;
        let corriendo = false;

        function actualizarAmbiente() {
            if (fase === "Enfoque") {
                faseActualTexto.textContent = "Fase: Enfoque 🔥";
                faseActualTexto.style.color = "#38bdf8";
                cuerpoPagina.style.backgroundColor = "#020617"; // Fondo extra oscuro para concentrarse
            } else {
                faseActualTexto.textContent = "Fase: Descanso ☕";
                faseActualTexto.style.color = "#4ade80";
                cuerpoPagina.style.backgroundColor = "#78350f"; // Fondo marrón cálido (Cafetería)
            }
        }

        function actualizarDisplay() {
            let m = Math.floor(tiempo / 60);
            let s = tiempo % 60;
            tiempoPantalla.textContent = `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
        }

        actualizarAmbiente();
        actualizarDisplay();

        btnIniciar.addEventListener("click", function () {
            if (!corriendo) {
                corriendo = true;
                intervalo = setInterval(function () {
                    if (tiempo > 0) {
                        tiempo--;
                        actualizarDisplay();
                    } else {
                        // Cambio de ciclo automático
                        if (fase === "Enfoque") {
                            fase = "Descanso";
                            tiempo = minDescanso * 60;
                        } else {
                            fase = "Enfoque";
                            tiempo = minEnfoque * 60;
                        }
                        actualizarAmbiente();
                        actualizarDisplay();

                        // Pequeña alerta para avisar del cambio
                        alert("¡Cambio de fase! Revisa tu temporizador.");
                    }
                }, 1000);
            }
        });

        btnPausar.addEventListener("click", function () {
            clearInterval(intervalo);
            corriendo = false;
        });
    }
}