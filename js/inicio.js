// --- DATOS DE EJEMPLO PARA LA PRIMERA VISITA ---
// Si es la primera vez que se abre (no hay cursos guardados),
// precargamos algunos datos de ejemplo para que el panel no se vea vacío
function precargarDatosDemo() {
    const yaHayCursos = localStorage.getItem("listaCursosCompletos");

    if (!yaHayCursos) {
        const cursosDemo = [
            { nombre: "Cálculo Integral", dia: "Lunes", profesor: "Ing. Torres", hora: "08:00" },
            { nombre: "Base de Datos", dia: "Martes", profesor: "Ing. Salazar", hora: "09:00" },
            { nombre: "Programación Web", dia: "Miércoles", profesor: "Ing. Vidal", hora: "10:00" },
            { nombre: "Física II", dia: "Jueves", profesor: "Ing. Ramírez", hora: "11:00" },
            { nombre: "Ingeniería de Software", dia: "Viernes", profesor: "Ing. Cabrera", hora: "13:00" }
        ];
        localStorage.setItem("listaCursosCompletos", JSON.stringify(cursosDemo));
    }
}

precargarDatosDemo();

// Atajo para obtener el diccionario de textos dinámicos en el idioma actual
function t() {
    const idioma = (typeof window.obtenerIdioma === "function") ? window.obtenerIdioma() : "es";
    return (window.textosDinamicos && window.textosDinamicos[idioma]) || window.textosDinamicos.es;
}

function actualizarRacha() {
    const hoy = new Date().toDateString(); // Ej: "Tue Jul 21 2026"
    const ultimaVisita = localStorage.getItem("ultimaVisita");
    let racha = parseInt(localStorage.getItem("rachaDias")) || 0;

    if (ultimaVisita !== hoy) {
        const ayer = new Date();
        ayer.setDate(ayer.getDate() - 1);

        if (ultimaVisita === ayer.toDateString()) {
            racha++; // Visitó ayer también, la racha sigue
        } else {
            racha = 1; // Rompió la racha, empieza de nuevo
        }

        localStorage.setItem("ultimaVisita", hoy);
        localStorage.setItem("rachaDias", racha);
    }

    const elementoRacha = document.getElementById("racha-dias");
    if (elementoRacha) {
        const textos = t();
        const etiquetaDia = racha !== 1 ? textos.dias : textos.dia;
        elementoRacha.textContent = `${racha} ${etiquetaDia}`;
    }
}

actualizarRacha();
// --- VARIABLES ---
const listaTareas = document.getElementById("lista-tareas");
const formTarea = document.getElementById("form-tarea");
const inputTarea = document.getElementById("nueva-tarea");

const barraProgreso = document.getElementById("barra-progreso");
const textoProgreso = document.getElementById("texto-progreso");

// --- MENSAJE CUANDO NO HAY TAREAS ---
function mostrarMensajeVacio() {
    if (listaTareas.children.length === 0) {
        listaTareas.innerHTML = `<p style="color: #94a3b8; text-align: center; padding: 10px 0;">${t().sinTareas}</p>`;
    }
}

// --- FUNCIÓN PARA CALCULAR LA BARRA ---
function actualizarProgreso() {
    const totalTareas = document.querySelectorAll('.tareas input[type="checkbox"]').length;
    const tareasCompletadas = document.querySelectorAll('.tareas input[type="checkbox"]:checked').length;

    let porcentaje = 0;
    if (totalTareas > 0) {
        porcentaje = (tareasCompletadas / totalTareas) * 100;
    }

    barraProgreso.style.width = porcentaje + "%";
    const textos = t();
    textoProgreso.textContent = `${tareasCompletadas} ${textos.de} ${totalTareas} ${textos.tareasCompletadas}`;

    mostrarMensajeVacio();
}

// --- AGREGAR UNA NUEVA TAREA ---
formTarea.addEventListener("submit", function (event) {
    event.preventDefault();

    const texto = inputTarea.value;

    // Si estaba el mensaje de "no tienes tareas", lo quitamos
    const mensajeVacio = listaTareas.querySelector("p");
    if (mensajeVacio) mensajeVacio.remove();

    const nuevoLi = document.createElement("li");
    nuevoLi.style.display = "flex";
    nuevoLi.style.justifyContent = "space-between";
    nuevoLi.style.alignItems = "center";

    nuevoLi.innerHTML = `
        <div style="display: flex; gap: 10px; align-items: center;">
            <input type="checkbox">
            <label style="color: #e2e8f0; transition: 0.3s;">${texto}</label>
        </div>
        <button class="btn-eliminar" style="background: #ef4444; color: white; border: none; border-radius: 5px; padding: 4px 8px; font-size: 12px;">X</button>
    `;

    listaTareas.appendChild(nuevoLi);
    inputTarea.value = "";

    actualizarProgreso();
});

// --- TACHAR O ELIMINAR TAREAS ---
listaTareas.addEventListener("click", function (event) {

    if (event.target.type === "checkbox") {
        const etiqueta = event.target.nextElementSibling;

        if (event.target.checked) {
            etiqueta.style.textDecoration = "line-through";
            etiqueta.style.color = "#94a3b8";
        } else {
            etiqueta.style.textDecoration = "none";
            etiqueta.style.color = "#e2e8f0";
        }
        actualizarProgreso();
    }

    if (event.target.classList.contains("btn-eliminar")) {
        const tareaCompleta = event.target.parentElement;
        listaTareas.removeChild(tareaCompleta);
        actualizarProgreso();
    }
});

actualizarProgreso();

// --- SALUDO Y RELOJ DINÁMICO ---
const elementoSaludo = document.getElementById("saludo-personalizado");
const elementoReloj = document.getElementById("reloj-vivo");

function actualizarRelojYSaludo() {
    const ahora = new Date();
    let horas = ahora.getHours();
    let minutos = ahora.getMinutes();
    let segundos = ahora.getSeconds();

    const textos = t();

    let saludo = textos.buenasNoches;
    if (horas >= 6 && horas < 12) {
        saludo = textos.buenosDias;
    } else if (horas >= 12 && horas < 19) {
        saludo = textos.buenasTardes;
    }

    let nombreUsuario = textos.estudiante;

    if (localStorage.getItem("sesionActiva") === "true") {
        nombreUsuario = localStorage.getItem("usuarioActual") || textos.estudiante;
    }

    if (elementoSaludo) {
        elementoSaludo.textContent = `${saludo}, ${nombreUsuario} 👋`;
    }

    if (horas < 10) horas = "0" + horas;
    if (minutos < 10) minutos = "0" + minutos;
    if (segundos < 10) segundos = "0" + segundos;

    if (elementoReloj) {
        elementoReloj.textContent = `${textos.horaActual}: ${horas}:${minutos}:${segundos}`;
    }
}

setInterval(actualizarRelojYSaludo, 1000);
actualizarRelojYSaludo();

// --- LÓGICA DE HORARIO INTELIGENTE ---
// Nota: los días se guardan siempre en español en localStorage (así los registra cursos.js),
// así que el filtrado usa siempre los nombres en español; solo la etiqueta mostrada se traduce.
const diasSemanaEs = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

function cargarHorarioHoy() {
    const contenedorHorario = document.getElementById("horario-hoy-contenedor");
    const tituloHorario = contenedorHorario ? contenedorHorario.previousElementSibling : null;

    if (!contenedorHorario) return;

    const textos = t();
    const hoy = new Date();
    const diaActual = diasSemanaEs[hoy.getDay()];

    if (tituloHorario) {
        tituloHorario.textContent = `${textos.clasesDeHoy} (${textos.nombresDias[diaActual]})`;
    }

    let misCursos = JSON.parse(localStorage.getItem("listaCursosCompletos")) || [];
    let cursosHoy = misCursos.filter(curso => curso.dia === diaActual);

    contenedorHorario.innerHTML = "";

    if (cursosHoy.length === 0) {
        contenedorHorario.innerHTML = `<p style="color: #4ade80; text-align: center; font-size: 14px; margin-top: 10px;">${textos.diaLibre}</p>`;
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

cargarHorarioHoy();

function mostrarProximaClase() {
    const contenedor = document.getElementById("proxima-clase");
    if (!contenedor) return;

    const textos = t();
    const ahora = new Date();
    const diaActual = diasSemanaEs[ahora.getDay()];

    let misCursos = JSON.parse(localStorage.getItem("listaCursosCompletos")) || [];
    let cursosHoy = misCursos.filter(curso => curso.dia === diaActual);

    let proxima = null;
    let fechaProxima = null;

    cursosHoy.forEach(curso => {
        const [h, m] = curso.hora.split(":").map(Number);
        const fechaCurso = new Date();
        fechaCurso.setHours(h, m, 0, 0);

        if (fechaCurso > ahora && (!fechaProxima || fechaCurso < fechaProxima)) {
            proxima = curso;
            fechaProxima = fechaCurso;
        }
    });

    if (proxima) {
        const diffMin = Math.floor((fechaProxima - ahora) / 60000);
        const horasFaltan = Math.floor(diffMin / 60);
        const minFaltan = diffMin % 60;
        const textoFaltan = horasFaltan > 0 ? `${horasFaltan}h ${minFaltan}m` : `${minFaltan}m`;

        contenedor.innerHTML = `📌 <strong>${textos.proximaClase}</strong> ${proxima.nombre} ${textos.aLas} ${proxima.hora} ${textos.con} ${proxima.profesor} — ${textos.faltan} ${textoFaltan}`;
    } else if (cursosHoy.length > 0) {
        contenedor.innerHTML = `✅ ${textos.clasesTerminadas}`;
    } else {
        contenedor.innerHTML = `🎉 ${textos.sinClasesHoy}`;
    }
}

mostrarProximaClase();
setInterval(mostrarProximaClase, 1000); // Se actualiza solo, cada segundo

document.querySelectorAll(".mini-card").forEach(function (tarjeta, indice) {
    tarjeta.style.animationDelay = `${indice * 0.08}s`;
});

function mostrarFraseDelDia() {
    const elementoFrase = document.getElementById("frase-motivacion");
    if (!elementoFrase) return;

    const frases = t().frases;
    const hoy = new Date();
    const inicioAno = new Date(hoy.getFullYear(), 0, 0);
    const diaDelAno = Math.floor((hoy - inicioAno) / 86400000);

    elementoFrase.textContent = `"${frases[diaDelAno % frases.length]}"`;
}

mostrarFraseDelDia();

// --- REFRESCO AL CAMBIAR DE IDIOMA ---
// idioma.js llama a esta función cuando el usuario cambia el idioma,
// para actualizar todo el contenido dinámico sin recargar la página
window.refrescarTextosDinamicos = function () {
    actualizarRacha();
    actualizarProgreso();
    actualizarRelojYSaludo();
    cargarHorarioHoy();
    mostrarProximaClase();
    mostrarFraseDelDia();
};

document.addEventListener("DOMContentLoaded", function () {
    const btnAbrir = document.getElementById("btn-menu-abrir");
    const btnCerrar = document.getElementById("btn-menu-cerrar");
    const drawer = document.getElementById("menu-drawer");
    const overlay = document.getElementById("menu-overlay");

    function abrirMenu() {
        if (!drawer || !overlay) return;
        overlay.classList.remove("hidden");
        setTimeout(() => {
            overlay.classList.remove("opacity-0");
            drawer.classList.remove("-translate-x-full");
        }, 10);
    }

    function cerrarMenu() {
        if (!drawer || !overlay) return;
        drawer.classList.add("-translate-x-full");
        overlay.classList.add("opacity-0");
        setTimeout(() => {
            overlay.classList.add("hidden");
        }, 300);
    }

    if (btnAbrir) btnAbrir.addEventListener("click", abrirMenu);
    if (btnCerrar) btnCerrar.addEventListener("click", cerrarMenu);
    if (overlay) overlay.addEventListener("click", cerrarMenu);

    // Sincronización del selector de idioma móvil con el de escritorio y con idioma.js
    const selectorMovil = document.getElementById("selector-idioma-movil");
    const selectorPC = document.getElementById("selector-idioma");

    if (selectorMovil && selectorPC) {
        if (typeof obtenerIdioma === "function") {
            const idiomaActual = obtenerIdioma();
            selectorMovil.value = idiomaActual;
            selectorPC.value = idiomaActual;
        }

        selectorMovil.addEventListener("change", function (e) {
            selectorPC.value = e.target.value;
            if (typeof cambiarIdioma === "function") {
                cambiarIdioma(e.target.value);
            }
        });

        selectorPC.addEventListener("change", function (e) {
            selectorMovil.value = e.target.value;
        });
    }
});

const playlistsSpotify = {
    lofi: "https://open.spotify.com/embed/album/1PiqaSNptT2HN7Znz16fiK?utm_source=generator&si=6645ada3d24f4c1a",
    piano: "https://open.spotify.com/embed/playlist/37i9dQZF1DX4sWSpwq3LiO?utm_source=generator&theme=0",
    synth: "https://open.spotify.com/embed/playlist/7gh5NAVKOqUZ8fPrM5NvXh?utm_source=generator&si=f1538e6c3b1241fa"
};

function cambiarPlaylist(tipo) {
    const iframe = document.getElementById("spotify-player");
    if (!iframe || !playlistsSpotify[tipo]) return;

    // Cambiar la fuente del iframe
    iframe.src = playlistsSpotify[tipo];

    // Actualizar estilos visuales de las pestañas
    const tabs = ['lofi', 'piano', 'synth'];
    tabs.forEach(t => {
        const btn = document.getElementById(`tab-${t}`);
        if (!btn) return;

        if (t === tipo) {
            btn.className = "flex-1 py-1.5 text-xs font-semibold rounded-lg bg-emerald-500 text-slate-950 transition-all cursor-pointer";
        } else {
            btn.className = "flex-1 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-all cursor-pointer";
        }
    });
}