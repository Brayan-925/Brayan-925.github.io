// ==========================================================
// MATRIZ DE EISENHOWER
// ==========================================================

const inputTarea = document.getElementById("nueva-tarea-eisen");
const selectorCuadrante = document.getElementById("selector-cuadrante");
const btnAgregar = document.getElementById("btn-agregar-eisen");

const cuadrantes = {
    "urgente-importante": document.getElementById("lista-urgente-importante"),
    "no-urgente-importante": document.getElementById("lista-no-urgente-importante"),
    "urgente-no-importante": document.getElementById("lista-urgente-no-importante"),
    "no-urgente-no-importante": document.getElementById("lista-no-urgente-no-importante")
};

const etiquetas = {
    "urgente-importante": "Urgente + Importante",
    "no-urgente-importante": "No urgente + Importante",
    "urgente-no-importante": "Urgente + No importante",
    "no-urgente-no-importante": "No urgente + No importante"
};

// Cargar tareas guardadas
let tareasEisenhower = JSON.parse(localStorage.getItem("eisenhowerTareas")) || [];

// Guardar en localStorage
function guardarTareas() {
    localStorage.setItem("eisenhowerTareas", JSON.stringify(tareasEisenhower));
}

// Renderizar todas las tareas en sus cuadrantes
function renderizarMatriz() {
    // Limpiar todos los cuadrantes
    for (let key in cuadrantes) {
        cuadrantes[key].innerHTML = "";
    }

    // Agrupar tareas por cuadrante
    const agrupadas = { "urgente-importante": [], "no-urgente-importante": [], "urgente-no-importante": [], "no-urgente-no-importante": [] };
    tareasEisenhower.forEach(t => {
        if (agrupadas[t.cuadrante]) {
            agrupadas[t.cuadrante].push(t);
        }
    });

    // Renderizar cada cuadrante
    for (let key in cuadrantes) {
        const lista = agrupadas[key];
        if (lista.length === 0) {
            cuadrantes[key].innerHTML = `<p style="color: #64748b; font-size: 13px; text-align: center; opacity: 0.6;">Sin tareas</p>`;
            continue;
        }

        lista.forEach((tarea, idxLocal) => {
            const div = document.createElement("div");
            div.className = "item-tarea-eisen";
            div.draggable = false; // Simple: usamos botones para mover

            // Buscar índice global
            const idxGlobal = tareasEisenhower.indexOf(tarea);

            // Generar botones de mover a otros cuadrantes
            let botonesMover = "";
            const cuadrantesDestino = Object.keys(etiquetas).filter(k => k !== key);
            cuadrantesDestino.forEach(dest => {
                botonesMover += `<button class="btn-mover btn-mover-subir" data-idx="${idxGlobal}" data-destino="${dest}" title="Mover a ${etiquetas[dest]}">↗</button>`;
            });

            div.innerHTML = `
                <span class="texto-tarea">${tarea.texto}</span>
                <div class="acciones-tarea">
                    ${botonesMover}
                    <button class="btn-eliminar-eisen" data-idx="${idxGlobal}">✕</button>
                </div>
            `;

            cuadrantes[key].appendChild(div);
        });
    }

    // Asignar eventos a los botones de mover
    document.querySelectorAll(".btn-mover").forEach(btn => {
        btn.addEventListener("click", function() {
            const idx = parseInt(this.dataset.idx);
            const destino = this.dataset.destino;
            if (idx >= 0 && idx < tareasEisenhower.length) {
                tareasEisenhower[idx].cuadrante = destino;
                guardarTareas();
                renderizarMatriz();
            }
        });
    });

    // Asignar eventos a los botones de eliminar
    document.querySelectorAll(".btn-eliminar-eisen").forEach(btn => {
        btn.addEventListener("click", function() {
            const idx = parseInt(this.dataset.idx);
            if (confirm("¿Eliminar esta tarea?")) {
                tareasEisenhower.splice(idx, 1);
                guardarTareas();
                renderizarMatriz();
            }
        });
    });
}

// Agregar nueva tarea
btnAgregar.addEventListener("click", function() {
    const texto = inputTarea.value.trim();
    if (texto === "") {
        alert("Escribe el nombre de la tarea.");
        return;
    }

    tareasEisenhower.push({
        texto: texto,
        cuadrante: selectorCuadrante.value
    });

    guardarTareas();
    renderizarMatriz();
    inputTarea.value = "";
});

// Permitir Enter en el input
inputTarea.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        btnAgregar.click();
    }
});

// Renderizar al cargar
renderizarMatriz();

