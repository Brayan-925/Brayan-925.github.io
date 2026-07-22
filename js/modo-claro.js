// ==========================================================
// MODO CLARO - FocusWave
// Crea automáticamente el botón flotante y recuerda la
// preferencia del usuario usando localStorage.
// ==========================================================

document.addEventListener("DOMContentLoaded", () => {

    // Crear el botón flotante
    const boton = document.createElement("button");
    boton.id = "boton-modo-claro";
    boton.type = "button";
    boton.title = "Cambiar tema";
    document.body.appendChild(boton);

    // Función para actualizar el ícono del botón
    function actualizarIcono(){
        boton.textContent = document.body.classList.contains("modo-claro") ? "🌙" : "☀️";
    }

    // Aplicar preferencia guardada al cargar la página
    const temaGuardado = localStorage.getItem("focuswave-tema");

    if(temaGuardado === "claro"){
        document.body.classList.add("modo-claro");
        document.documentElement.classList.add("modo-claro");
    }

    actualizarIcono();

    // Función para actualizar el reproductor de Spotify según el tema
    function actualizarSpotifyTheme(){
        const spotifyIframe = document.getElementById("spotify-player");
        if(spotifyIframe){
            const srcActual = spotifyIframe.src;
            const esClaro = document.body.classList.contains("modo-claro");
            if(esClaro && srcActual.includes("theme=0")){
                spotifyIframe.src = srcActual.replace("theme=0", "theme=1");
            } else if(!esClaro && srcActual.includes("theme=1")){
                spotifyIframe.src = srcActual.replace("theme=1", "theme=0");
            }
        }
    }

    // Evento de click para alternar el tema
    boton.addEventListener("click", () => {
        document.body.classList.toggle("modo-claro");
        document.documentElement.classList.toggle("modo-claro");

        const temaActual = document.body.classList.contains("modo-claro") ? "claro" : "oscuro";
        localStorage.setItem("focuswave-tema", temaActual);

        actualizarIcono();
        actualizarSpotifyTheme();
    });

});