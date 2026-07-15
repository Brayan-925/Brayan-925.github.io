// ==========================================================
// LOGIN CON FACEBOOK - FocusWave
// Se conecta con el mismo sistema de sesión que ya usan
// login.js / registro.js / google-login.js
// (localStorage: sesionActiva, usuarioActual, correoActual)
// ==========================================================

// 1. ESTA FUNCIÓN LA LLAMA TU BOTÓN (onclick="checkLoginState();")
function checkLoginState() {
    // Detectamos si la página se abrió de forma local (archivo directo)
    if (window.location.protocol === "file:") {
        // Al estar en local, abrimos la ventana emergente puente para evitar bloqueos
        abrirVentanaFlotanteLocal();
    } else {
        // Si está en un servidor (Live Server), usamos el flujo real del SDK de Facebook
        if (typeof FB !== "undefined") {
            FB.getLoginStatus(function (response) {
                manejarRespuestaFacebook(response);
            });
        } else {
            // Por si acaso el SDK falló en cargar en el servidor
            abrirVentanaFlotanteLocal();
        }
    }
}

function manejarRespuestaFacebook(response) {
    // "connected" significa que el usuario ya inició sesión y autorizó la app
    if (response.status === "connected") {
        // Pedimos su nombre a la API de Facebook
        FB.api("/me", { fields: "name" }, function (datosUsuario) {
            completarInicioSesion(datosUsuario.name);
        });
    }
}

// 2. FUNCIÓN AUXILIAR PARA CENTRALIZAR EL GUARDADO EN LOCALSTORAGE
function completarInicioSesion(nombreUsuario) {
    localStorage.setItem("sesionActiva", "true");
    localStorage.setItem("usuarioActual", nombreUsuario);
    localStorage.setItem("correoActual", ""); // Queda vacío como lo tenías definido

    alert(`¡Bienvenido, ${nombreUsuario}! Ingresaste con Facebook.`);
    window.location.href = "index.html";
}

// 3. FUNCIÓN PARA LEVANTAR EL POPUP SEGURO EN MODO LOCAL (file:///)
function abrirVentanaFlotanteLocal() {
    const ancho = 600;
    const alto = 650;
    const izquierda = (screen.width / 2) - (ancho / 2);
    const arriba = (screen.height / 2) - (alto / 2);
    
    // Abrimos el archivo puente que creamos previamente
    const urlLocal = "fb-popup.html";

    window.open(
        urlLocal, 
        "FacebookLogin", 
        `width=${ancho},height=${alto},top=${arriba},left=${izquierda},scrollbars=yes,resizable=yes`
    );
}