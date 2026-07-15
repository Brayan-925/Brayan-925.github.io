// --- VARIABLES ---
const listaTareas = document.getElementById("lista-tareas");
const formTarea = document.getElementById("form-tarea");
const inputTarea = document.getElementById("nueva-tarea");

const barraProgreso = document.getElementById("barra-progreso");
const textoProgreso = document.getElementById("texto-progreso");

// --- FUNCIÓN PARA CALCULAR LA BARRA ---
function actualizarProgreso() {
    // Contamos cuántas tareas hay en total y cuántas están marcadas
    const totalTareas = document.querySelectorAll('.tareas input[type="checkbox"]').length;
    const tareasCompletadas = document.querySelectorAll('.tareas input[type="checkbox"]:checked').length;

    // Calculamos el porcentaje matemático
    let porcentaje = 0;
    if (totalTareas > 0) {
        porcentaje = (tareasCompletadas / totalTareas) * 100;
    }

    // Actualizamos la barra y el texto visualmente
    barraProgreso.style.width = porcentaje + "%";
    textoProgreso.textContent = `${tareasCompletadas} de ${totalTareas} tareas completadas`;
}

// --- AGREGAR UNA NUEVA TAREA ---
formTarea.addEventListener("submit", function (event) {
    event.preventDefault(); // Evitamos que la página parpadee

    const texto = inputTarea.value;

    // Creamos un nuevo elemento de lista (li)
    const nuevoLi = document.createElement("li");
    nuevoLi.style.display = "flex";
    nuevoLi.style.justifyContent = "space-between"; // Separa el texto del botón de borrar
    nuevoLi.style.alignItems = "center";

    // Le inyectamos la casilla de verificación, el texto y un botón rojo de eliminar
    nuevoLi.innerHTML = `
        <div style="display: flex; gap: 10px; align-items: center;">
            <input type="checkbox">
            <label style="color: #e2e8f0; transition: 0.3s;">${texto}</label>
        </div>
        <button class="btn-eliminar" style="background: #ef4444; color: white; border: none; border-radius: 5px; padding: 4px 8px; font-size: 12px;">X</button>
    `;

    // Lo metemos a la lista
    listaTareas.appendChild(nuevoLi);
    inputTarea.value = ""; // Limpiamos el cajón

    actualizarProgreso(); // Actualizamos la barra porque hay una tarea nueva
});

// --- TACHAR O ELIMINAR TAREAS ---
// Usamos el truco de escuchar clics en toda la lista, no en cada elemento individual
listaTareas.addEventListener("click", function (event) {

    // Si hicimos clic en una casilla (checkbox)
    if (event.target.type === "checkbox") {
        const etiqueta = event.target.nextElementSibling;

        if (event.target.checked) {
            etiqueta.style.textDecoration = "line-through";
            etiqueta.style.color = "#94a3b8";
        } else {
            etiqueta.style.textDecoration = "none";
            etiqueta.style.color = "#e2e8f0";
        }
        actualizarProgreso(); // Recalculamos la barra
    }

    // Si hicimos clic en el botón rojo de la "X" (clase btn-eliminar)
    if (event.target.classList.contains("btn-eliminar")) {
        const tareaCompleta = event.target.parentElement;
        listaTareas.removeChild(tareaCompleta); // Borramos la tarea
        actualizarProgreso(); // Recalculamos la barra
    }
});

// Llamamos a la barra por primera vez para que arranque en "0 de 0"
actualizarProgreso();

// --- SALUDO Y RELOJ DINÁMICO ---
const elementoSaludo = document.getElementById("saludo-personalizado");
const elementoReloj = document.getElementById("reloj-vivo");

function actualizarRelojYSaludo() {
    // Obtenemos la hora actual del sistema
    const ahora = new Date();
    let horas = ahora.getHours();
    let minutos = ahora.getMinutes();
    let segundos = ahora.getSeconds();

    // 1. Lógica para el saludo condicional
    let saludo = "Buenas noches";
    if (horas >= 6 && horas < 12) {
        saludo = "Buenos días";
    } else if (horas >= 12 && horas < 19) {
        saludo = "Buenas tardes";
    }

    // 2. Verificamos si hay una sesión activa antes de buscar el nombre
    let nombreUsuario = "Estudiante"; // Nombre por defecto para invitados

    if (localStorage.getItem("sesionActiva") === "true") {
        // Solo si la sesión está activa, usamos el nombre guardado
        nombreUsuario = localStorage.getItem("usuarioActual") || "Estudiante";
    }
    // -------------------------------

    // Mostramos el saludo
    if (elementoSaludo) {
        elementoSaludo.textContent = `${saludo}, ${nombreUsuario} 👋`;
    }

    // 3. Formateamos el reloj para que siempre tenga 2 dígitos
    if (horas < 10) horas = "0" + horas;
    if (minutos < 10) minutos = "0" + minutos;
    if (segundos < 10) segundos = "0" + segundos;

    // Mostramos la hora en pantalla
    if (elementoReloj) {
        elementoReloj.textContent = `Hora actual: ${horas}:${minutos}:${segundos}`;
    }
}

// Ejecutamos la función cada 1000 milisegundos (1 segundo) para que el reloj funcione
setInterval(actualizarRelojYSaludo, 1000);
actualizarRelojYSaludo(); // Llamamos a la función una vez de inmediato para que no espere 1 segundo al cargar

// --- LÓGICA DE HORARIO INTELIGENTE ---
function cargarHorarioHoy() {
    const contenedorHorario = document.getElementById("horario-hoy-contenedor");
    // Buscamos el h2 que está justo arriba del contenedor para cambiarle el texto
    const tituloHorario = contenedorHorario ? contenedorHorario.previousElementSibling : null;
    
    if (!contenedorHorario) return;

    // 1. Averiguar qué día es hoy en español
    const diasSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    const hoy = new Date();
    const diaActual = diasSemana[hoy.getDay()];

    if (tituloHorario) {
        tituloHorario.textContent = `Clases de Hoy (${diaActual})`;
    }

    // 2. Traer todos los cursos de la memoria 
    let misCursos = JSON.parse(localStorage.getItem("listaCursosCompletos")) || [];

    // 3. Filtrar estrictamente los que coinciden con el día actual
    let cursosHoy = misCursos.filter(curso => curso.dia === diaActual);

    contenedorHorario.innerHTML = "";

    // 4. Mostrar los resultados
    if (cursosHoy.length === 0) {
        contenedorHorario.innerHTML = `<p style="color: #4ade80; text-align: center; font-size: 14px; margin-top: 10px;">¡Día libre! No tienes clases registradas para hoy.</p>`;
    } else {
        cursosHoy.forEach(curso => {
            const item = document.createElement("div");
            item.style.background = "#1e293b";
            item.style.padding = "12px";
            item.style.borderRadius = "8px";
            item.style.borderLeft = "4px solid #38bdf8";
            item.style.marginBottom = "10px";

            item.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px;">
                    <span style="color: #38bdf8; font-weight: bold;">⏱️ ${curso.hora}</span>
                </div>
                <p style="color: #e2e8f0; font-weight: bold; margin: 0; font-size: 16px;">${curso.nombre}</p>
                <p style="color: #94a3b8; font-size: 12px; margin: 0; margin-top: 5px;">👨‍🏫 ${curso.profesor}</p>
            `;
            contenedorHorario.appendChild(item);
        });
    }
}

// Ejecutamos la función inmediatamente al cargar la página
cargarHorarioHoy();

