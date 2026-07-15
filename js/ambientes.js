const pantallaInmersiva = document.getElementById("pantalla-inmersiva");
const btnSalir = document.getElementById("btn-salir-ambiente");
const tituloActivo = document.getElementById("titulo-ambiente-activo");
const videoAmbiente = document.getElementById("video-ambiente");
const relojAmbiente = document.getElementById("reloj-ambiente");
const blocNotas = document.getElementById("bloc-notas");

const botonesAmbientes = document.querySelectorAll('.card button, .mini-card button');

// --- 1. LÓGICA DE LOS BOTONES Y TEMAS DINÁMICOS ---
for (let i = 0; i < botonesAmbientes.length; i++) {
    botonesAmbientes[i].addEventListener('click', function(event) {
        event.preventDefault();

        const titulo = this.parentElement.querySelector('h3').textContent;
        tituloActivo.textContent = titulo;

        // Evaluamos el ambiente y aplicamos Gradientes, Animación y Efecto Glow
        if (titulo.includes("Rain") || titulo.includes("Lluvia")) {
            videoAmbiente.src = "https://www.youtube.com/embed/mPZkdNFkNps?autoplay=1";
            pantallaInmersiva.style.background = "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #020617 100%)"; 
            tituloActivo.style.color = "#38bdf8"; 
            tituloActivo.style.textShadow = "0px 0px 15px rgba(56, 189, 248, 0.8)";
            
        } else if (titulo.includes("Coffee") || titulo.includes("Café") || titulo.includes("Cafetería")) {
            videoAmbiente.src = "https://www.youtube.com/embed/9VqBDUuEm8I?autoplay=1";
            pantallaInmersiva.style.background = "linear-gradient(135deg, #2c1e16 0%, #432818 50%, #1a0f0a 100%)"; 
            tituloActivo.style.color = "#fb923c"; 
            tituloActivo.style.textShadow = "0px 0px 15px rgba(251, 146, 60, 0.8)";
            
        } else if (titulo.includes("Space") || titulo.includes("Espacio")) {
            videoAmbiente.src = "https://www.youtube.com/embed/2bburzrOK2k?autoplay=1";
            pantallaInmersiva.style.background = "linear-gradient(135deg, #050505 0%, #1e0033 50%, #000000 100%)"; 
            tituloActivo.style.color = "#a855f7"; 
            tituloActivo.style.textShadow = "0px 0px 20px rgba(168, 85, 247, 0.9)";
            
        } else if (titulo.includes("Library") || titulo.includes("Biblioteca")) {
            videoAmbiente.src = "https://www.youtube.com/embed/-VgN7nKx9MU?autoplay=1";
            pantallaInmersiva.style.background = "linear-gradient(135deg, #1e1b18 0%, #2a1f1a 50%, #0f0d0c 100%)"; 
            tituloActivo.style.color = "#d4a373"; 
            tituloActivo.style.textShadow = "0px 0px 15px rgba(212, 163, 115, 0.8)";
            
        } else if (titulo.includes("Night") || titulo.includes("Noche")) {
            videoAmbiente.src = "https://www.youtube.com/embed/KqC_e-ffwAw?autoplay=1";
            pantallaInmersiva.style.background = "linear-gradient(135deg, #09090b 0%, #1e1b4b 50%, #000000 100%)"; 
            tituloActivo.style.color = "#818cf8"; 
            tituloActivo.style.textShadow = "0px 0px 15px rgba(129, 140, 248, 0.8)";
            
        } else if (titulo.includes("Piano")) {
            videoAmbiente.src = "https://www.youtube.com/embed/sAcj8me7wGI?autoplay=1";
            pantallaInmersiva.style.background = "linear-gradient(135deg, #1c1917 0%, #292524 50%, #0a0908 100%)"; 
            tituloActivo.style.color = "#f3f4f6"; 
            tituloActivo.style.textShadow = "0px 0px 15px rgba(243, 244, 246, 0.6)";
        }

        // Activamos la animación de "respiración" para todos los fondos
        pantallaInmersiva.style.backgroundSize = "400% 400%";
        pantallaInmersiva.style.animation = "respiracionFondo 15s ease infinite";

        pantallaInmersiva.style.display = "flex";
    });
}

// --- 2. LÓGICA DE SALIR ---
btnSalir.addEventListener('click', function() {
    pantallaInmersiva.style.display = "none";
    videoAmbiente.src = "";
});

// --- 3. LÓGICA DEL RELOJ ---
setInterval(function() {
    const ahora = new Date();
    let h = ahora.getHours();
    let m = ahora.getMinutes();
    let s = ahora.getSeconds();
    
    if (h < 10) h = "0" + h;
    if (m < 10) m = "0" + m;
    if (s < 10) s = "0" + s;
    
    relojAmbiente.textContent = `${h}:${m}:${s}`;
}, 1000);

// --- 4. LÓGICA DEL BLOC DE NOTAS ---
blocNotas.value = localStorage.getItem("misNotasRapidas") || "";

blocNotas.addEventListener('keyup', function() {
    localStorage.setItem("misNotasRapidas", this.value);
});