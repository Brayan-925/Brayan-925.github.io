document.addEventListener("DOMContentLoaded", function () {
    const btnMenu = document.getElementById("btn-menu");
    const menuNav = document.getElementById("menu-nav");

    if (btnMenu && menuNav) {
        btnMenu.addEventListener("click", function () {
            menuNav.classList.toggle("hidden");
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const paginaActual = window.location.pathname.split("/").pop() || "index.html";
    const enlaces = document.querySelectorAll("#menu-nav a");

    enlaces.forEach(function (enlace) {
        if (enlace.getAttribute("href") === paginaActual) {
            enlace.style.color = "#38bdf8";
            enlace.style.fontWeight = "900";
        }
    });
});