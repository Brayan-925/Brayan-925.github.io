// Este código se ejecuta en cuanto carga la página
function actualizarMenusSesion() {
    const sesionActiva = localStorage.getItem("sesionActiva");
    const nombreUsuario = localStorage.getItem("usuarioActual") || "Estudiante";

    // --- MENÚ DE ESCRITORIO (nav ul) ---
    const navUl = document.querySelector("nav ul");
    if (sesionActiva === "true" && navUl) {
        // Eliminar enlaces de Iniciar sesión y Registrarse
        const enlaces = navUl.querySelectorAll("li a");
        for (let i = 0; i < enlaces.length; i++) {
            const destino = enlaces[i].getAttribute("href");
            if (destino === "iniciarSesion.html" || destino === "registrarse.html") {
                enlaces[i].parentElement.remove();
            }
        }

        // Verificar si ya se agregaron los elementos de sesión (para no duplicar)
        if (!navUl.querySelector("#btn-cerrar-sesion")) {
            const liPerfil = document.createElement("li");
            liPerfil.innerHTML = `<a href="#" style="color: #38bdf8; pointer-events: none;">👤 ${nombreUsuario}</a>`;

            const liCerrar = document.createElement("li");
            liCerrar.innerHTML = `<a href="#" id="btn-cerrar-sesion" style="color: #ef4444;">🚪 Cerrar sesión</a>`;

            navUl.appendChild(liPerfil);
            navUl.appendChild(liCerrar);

            document.getElementById("btn-cerrar-sesion").addEventListener("click", function(event) {
                event.preventDefault();
                cerrarSesion();
            });
        }
    }

    // --- MENÚ MÓVIL (drawer) ---
    const drawerUl = document.querySelector("#menu-drawer ul");
    if (sesionActiva === "true" && drawerUl) {
        // Eliminar enlaces de Iniciar sesión y Registrarse del drawer
        const enlacesDrawer = drawerUl.querySelectorAll("li a");
        for (let i = 0; i < enlacesDrawer.length; i++) {
            const destino = enlacesDrawer[i].getAttribute("href");
            if (destino === "iniciarSesion.html" || destino === "registrarse.html") {
                enlacesDrawer[i].parentElement.remove();
            }
        }

        // Verificar si ya se agregaron en el drawer
        if (!drawerUl.querySelector("#btn-cerrar-sesion-drawer")) {
            const liPerfilDrawer = document.createElement("li");
            liPerfilDrawer.innerHTML = `<a href="#" class="block py-2 px-3 text-sky-400 font-medium rounded-lg" style="pointer-events: none;">👤 ${nombreUsuario}</a>`;

            const liCerrarDrawer = document.createElement("li");
            liCerrarDrawer.innerHTML = `<a href="#" id="btn-cerrar-sesion-drawer" class="block py-2 px-3 text-red-400 hover:bg-slate-800 font-medium rounded-lg transition-colors">🚪 Cerrar sesión</a>`;

            drawerUl.appendChild(liPerfilDrawer);
            drawerUl.appendChild(liCerrarDrawer);

            document.getElementById("btn-cerrar-sesion-drawer").addEventListener("click", function(event) {
                event.preventDefault();
                cerrarSesion();
            });
        }
    }
}

function cerrarSesion() {
    localStorage.removeItem("sesionActiva");
    // Recargar para que los menús vuelvan a su estado original
    window.location.href = "iniciarSesion.html";
}

document.addEventListener("DOMContentLoaded", actualizarMenusSesion);
