document.addEventListener("DOMContentLoaded", function () {
    const btnMenu = document.getElementById("btn-menu");
    const btnCerrar = document.getElementById("btn-cerrar-drawer");
    const drawer = document.getElementById("menu-drawer");
    const overlay = document.getElementById("menu-overlay");

    function abrirDrawer() {
        if (!drawer || !overlay) return;
        overlay.classList.remove("hidden");
        setTimeout(() => {
            overlay.classList.remove("opacity-0");
            drawer.classList.remove("-translate-x-full");
        }, 10);
    }

    function cerrarDrawer() {
        if (!drawer || !overlay) return;
        drawer.classList.add("-translate-x-full");
        overlay.classList.add("opacity-0");
        setTimeout(() => {
            overlay.classList.add("hidden");
        }, 300);
    }

    if (btnMenu) btnMenu.addEventListener("click", abrirDrawer);
    if (btnCerrar) btnCerrar.addEventListener("click", cerrarDrawer);
    if (overlay) overlay.addEventListener("click", cerrarDrawer);

    // Sincronización del selector de idioma entre Escritorio y Móvil
    const selectorPC = document.getElementById("selector-idioma");
    const selectorMovil = document.getElementById("selector-idioma-movil");

    if (selectorPC && selectorMovil) {
        // Sincronizar cambios desde el menú móvil hacia el sistema general
        selectorMovil.addEventListener("change", function (e) {
            selectorPC.value = e.target.value;
            // Emitir evento change para activar la traducción de idioma.js
            selectorPC.dispatchEvent(new Event("change"));
        });

        // Sincronizar cambios desde la versión PC hacia el móvil
        selectorPC.addEventListener("change", function (e) {
            selectorMovil.value = e.target.value;
        });
    }
});