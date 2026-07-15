const formCurso = document.getElementById("form-curso");
const contenedorCursos = document.getElementById("contenedor-cursos");

// Al cargar el documento, mostramos los cursos que ya estén guardados
document.addEventListener("DOMContentLoaded", function() {
    dibujarCursos();
});

// Evento para procesar el formulario al enviar
if (formCurso) {
    formCurso.addEventListener("submit", function(event) {
        event.preventDefault();

        // Captura de valores de los inputs
        const nombre = document.getElementById("nombre-curso").value;
        const dia = document.getElementById("dia-curso").value;
        const profesor = document.getElementById("profesor-curso").value;
        const hora = document.getElementById("hora-curso").value;

        // Recuperamos la base de datos de localStorage
        let misCursos = JSON.parse(localStorage.getItem("listaCursosCompletos")) || [];

        // Estructuramos el objeto completo del curso
        const nuevoCurso = {
            nombre: nombre,
            dia: dia,
            profesor: profesor,
            hora: hora
        };

        // Insertamos el nuevo objeto al arreglo
        misCursos.push(nuevoCurso);
        
        // Algoritmo de ordenamiento por día de la semana y luego por hora cronológica
        const ordenDias = { "Lunes": 1, "Martes": 2, "Miércoles": 3, "Jueves": 4, "Viernes": 5, "Sábado": 6, "Domingo": 7 };
        misCursos.sort((a, b) => {
            if (ordenDias[a.dia] !== ordenDias[b.dia]) {
                return ordenDias[a.dia] - ordenDias[b.dia];
            }
            return a.hora.localeCompare(b.hora);
        });

        // Actualizamos la memoria local transformando el objeto a texto JSON
        localStorage.setItem("listaCursosCompletos", JSON.stringify(misCursos));

        // Limpiamos los campos del formulario y refrescamos la pantalla
        formCurso.reset();
        dibujarCursos();
    });
}

// Función encargada de renderizar el HTML de las tarjetas
function dibujarCursos() {
    if (!contenedorCursos) return;
    
    let misCursos = JSON.parse(localStorage.getItem("listaCursosCompletos")) || [];
    contenedorCursos.innerHTML = "";

    if (misCursos.length === 0) {
        contenedorCursos.innerHTML = "<p style='color: #94a3b8; width: 100%; grid-column: 1/-1; text-align: center;'>Aún no has registrado ningún curso en el sistema.</p>";
        return;
    }

    // Recorremos el arreglo mapeando los datos a elementos HTML
    misCursos.forEach(function(curso, index) {
        const tarjeta = document.createElement("article");
        tarjeta.style.background = "rgba(30, 41, 59, 0.6)";
        tarjeta.style.padding = "20px";
        tarjeta.style.borderRadius = "12px";
        tarjeta.style.borderLeft = "4px solid #818cf8"; 
        tarjeta.style.position = "relative";
        tarjeta.style.boxShadow = "0 4px 10px rgba(0,0,0,0.1)";

        tarjeta.innerHTML = `
            <div style="padding-right: 25px;">
                <h3 style="margin: 0 0 8px 0; font-size: 18px; color: #e2e8f0;">${curso.nombre}</h3>
                <p style="color: #94a3b8; font-size: 14px; margin: 0 0 6px 0;">👨‍🏫 ${curso.profesor}</p>
                <p style="color: #38bdf8; font-size: 14px; font-weight: bold; margin: 0;">📅 ${curso.dia} &nbsp;⏱️ ${curso.hora}</p>
            </div>
            <button class="btn-eliminar-curso" data-index="${index}" style="position: absolute; top: 15px; right: 15px; background: transparent; color: #ef4444; border: none; cursor: pointer; font-size: 16px; padding: 0; transition: 0.2s;">🗑️</button>
        `;

        contenedorCursos.appendChild(tarjeta);
    });

    // Vinculamos la escucha de clics para los botones de eliminación recién creados
    activarBotonesEliminar();
}

// Función para remover elementos específicos de la lista
function activarBotonesEliminar() {
    const botones = document.querySelectorAll(".btn-eliminar-curso");
    botones.forEach(boton => {
        boton.addEventListener("click", function() {
            const indice = this.getAttribute("data-index");
            let misCursos = JSON.parse(localStorage.getItem("listaCursosCompletos"));
            
            // Removemos el elemento del arreglo usando su índice
            misCursos.splice(indice, 1);
            
            // Sincronizamos los cambios con el almacenamiento local
            localStorage.setItem("listaCursosCompletos", JSON.stringify(misCursos));
            dibujarCursos();
        });
    });
}