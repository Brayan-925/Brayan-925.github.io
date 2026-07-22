const formulario = document.getElementById("registroForm");

formulario.addEventListener("submit", function(event){
    event.preventDefault();

    // Capturamos todos los campos
    const nombre = document.getElementById("nombre").value;
    const correo = document.getElementById("correo").value;
    const password = document.getElementById("password").value;
    const confirmar = document.getElementById("confirmar").value;

    // Validación 1: Longitud de la contraseña
    if (password.length < 6) {
        alert("Tu contraseña es muy corta. Debe tener al menos 6 caracteres.");
        return; // El "return" detiene la ejecución aquí mismo, no avanza más.
    }

    // Validación 2: Coincidencia de contraseñas
    if (password !== confirmar) {
        alert("Las contraseñas no coinciden. Por favor, verifica.");
        return; 
    }

    // Si pasa todas las validaciones, guardamos los datos en nuestra "base de datos"
    localStorage.setItem("usuarioActual", nombre);
    localStorage.setItem("correoActual", correo); // Guardamos el correo
    localStorage.setItem("passwordActual", password); // Guardamos la contraseña
    
    // Activamos la sesión
    localStorage.setItem("sesionActiva", "true");

    alert("¡Registrado exitosamente!");
    window.location.href = "index.html";
});