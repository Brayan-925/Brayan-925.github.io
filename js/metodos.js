// Seleccionamos todos los botones de la página de métodos
const botonesMetodos = document.querySelectorAll('.metodo-card button');

for (let i = 0; i < botonesMetodos.length; i++) {
    botonesMetodos[i].addEventListener('click', function() {
        // Atrapamos el título (el <h3> que está arriba del botón)
        const tituloMetodo = this.parentElement.querySelector('h3').textContent;
        
        // Lo guardamos en la memoria
        localStorage.setItem('metodoSeleccionado', tituloMetodo);

        // La Matriz de Eisenhower tiene su propia página
        if (tituloMetodo.includes("Eisenhower")) {
            window.location.href = "eisenhower.html";
        } else {
            // Saltamos a la página de trabajo
            window.location.href = "metodo-activo.html";
        }
    });
}
