// Este código se ejecuta en cuanto carga la página
document.addEventListener("DOMContentLoaded", function() {
    
    // Revisamos la "memoria" del navegador
    const sesionActiva = localStorage.getItem("sesionActiva");
    const nombreUsuario = localStorage.getItem("usuarioActual") || "Estudiante";

    // Buscamos la lista de enlaces de navegación (nav ul)
    const navUl = document.querySelector("nav ul");

    // Si la sesión está activa y encontramos el menú de navegación
    if (sesionActiva === "true" && navUl) {
        
        // 1. Buscamos y eliminamos los botones de Iniciar Sesión y Registrarse
        // (se identifican por su "href", no por su texto, para que funcione sin importar el idioma activo)
        const enlaces = navUl.querySelectorAll("li a");
        for (let i = 0; i < enlaces.length; i++) {
            const destino = enlaces[i].getAttribute("href");
            if (destino === "iniciarSesion.html" || destino === "registrarse.html") {
                enlaces[i].parentElement.remove(); // Borramos el <li> completo
            }
        }

        // 2. Creamos el botón con el saludo al usuario
        const liPerfil = document.createElement("li");
        liPerfil.innerHTML = `<a href="#" style="color: #38bdf8;">Hola, ${nombreUsuario}</a>`;

        // 3. Creamos el botón de Cerrar Sesión
        const liCerrar = document.createElement("li");
        liCerrar.innerHTML = `<a href="#" id="btn-cerrar-sesion" style="color: #ef4444;">Cerrar sesión</a>`;

        // 4. Los agregamos al final del menú
        navUl.appendChild(liPerfil);
        navUl.appendChild(liCerrar);

        // 5. Le damos funcionalidad al botón de Cerrar Sesión
        document.getElementById("btn-cerrar-sesion").addEventListener("click", function(event) {
            event.preventDefault();
            // Borramos la marca de sesión activa
            localStorage.removeItem("sesionActiva");
            // Recargamos la página para que vuelvan a aparecer los botones originales
            window.location.href = "iniciarSesion.html";
        });
    }
});