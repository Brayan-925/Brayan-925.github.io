// ==========================================================
// LOGIN CON GOOGLE - FocusWave
// Se conecta con el mismo sistema de sesión que ya usa
// login.js / registro.js (localStorage: sesionActiva, usuarioActual)
// ==========================================================

// Esta función la llama Google automáticamente cuando el usuario
// inicia sesión correctamente (ver data-callback en el HTML)
function manejarRespuestaGoogle(response) {

    // "response.credential" es un token (JWT) que trae los datos del usuario
    const datosUsuario = decodificarJWT(response.credential);

    // Guardamos la sesión exactamente igual que en el login normal,
    // así el resto del sitio (auth.js, saludo, etc.) funciona sin cambios
    localStorage.setItem("sesionActiva", "true");
    localStorage.setItem("usuarioActual", datosUsuario.name);
    localStorage.setItem("correoActual", datosUsuario.email);

    alert(`¡Bienvenido, ${datosUsuario.name}! Ingresaste con Google.`);
    window.location.href = "index.html";
}

// Lee el contenido del token de Google sin necesidad de librerías externas
function decodificarJWT(token) {
    const payloadBase64 = token.split(".")[1];
    const payloadDecodificado = atob(payloadBase64.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(payloadDecodificado);
}
