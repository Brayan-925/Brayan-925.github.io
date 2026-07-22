
function checkLoginState() {
    const nombreSimulado = "Usuario de Facebook";

    // Pequeño retraso para que se sienta como una conexión real
    setTimeout(function () {
        completarInicioSesion(nombreSimulado);
    }, 600);
}

function completarInicioSesion(nombreUsuario) {
    localStorage.setItem("sesionActiva", "true");
    localStorage.setItem("usuarioActual", nombreUsuario);
    localStorage.setItem("correoActual", "");

    alert(`¡Bienvenido, ${nombreUsuario}! Ingresaste con Facebook.`);
    window.location.href = "index.html";
}