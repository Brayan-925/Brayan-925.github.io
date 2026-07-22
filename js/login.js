const formulario = document.getElementById("loginForm");

formulario.addEventListener("submit", function(event){
    event.preventDefault();

    // 1. Capturamos lo que el usuario está intentando ingresar
    const correoIngresado = document.getElementById("correo").value;
    const passwordIngresada = document.getElementById("password").value;

    // 2. Recuperamos los datos originales que se guardaron durante el registro
    const correoGuardado = localStorage.getItem("correoActual");
    const passwordGuardada = localStorage.getItem("passwordActual");

    // 3. Validación estricta: Comparamos si coinciden
    if (correoIngresado === correoGuardado && passwordIngresada === passwordGuardada) {
        
        // ¡Coinciden! Le damos acceso
        localStorage.setItem("sesionActiva", "true");
        alert("Inicio de sesión exitoso. ¡Bienvenido de vuelta!");
        window.location.href = "index.html";

    } else {
        // No coinciden, le negamos el acceso
        alert("❌ Correo o contraseña incorrectos. Verifica tus datos o regístrate si aún no tienes cuenta.");
    }
});