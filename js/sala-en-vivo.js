// --- VARIABLES GLOBALES ---
const tituloElemento = document.getElementById("titulo-sala");
const videoElemento = document.getElementById("video-sala");
const cajaMensajes = document.getElementById("caja-mensajes");

const formChat = document.getElementById("form-chat");
const inputMensaje = document.getElementById("input-mensaje");


// 1. Recuperamos el nombre de la sala que guardamos
const salaGuardada = localStorage.getItem('salaSeleccionada');

if (salaGuardada) {
    // Cambiamos el título
    tituloElemento.textContent = salaGuardada + " - En Vivo";
    
    // Vaciamos el chat que venía por defecto en el HTML
    cajaMensajes.innerHTML = "";
    
    // 2. Evaluamos la sala para cambiar el video y el chat usando condicionales
    if (salaGuardada.includes("Rain")) {
        // Sala de lluvia
        videoElemento.src = "https://www.youtube.com/embed/mPZkdNFkNps?autoplay=1&mute=0"; 
        
        cajaMensajes.innerHTML = `
            <div class="mensaje"><strong>Sistema:</strong> <span>Bienvenidos a Rain Study. Enfoque al máximo.</span></div>
            <div class="mensaje"><strong style="color: #38bdf8;">FisicaBoi_99:</strong> <span>Oigan, para el proyecto del cohete, ¿están haciendo la gráfica sin linealizar, solo usando L vs T?</span></div>
            <div class="mensaje"><strong style="color: #f472b6;">Ana_Estudia:</strong> <span>Sí, y recuerda que la posición y velocidad inicial son 0, así que a0 tiene que dar casi 0.</span></div>
        `;
        
    } else if (salaGuardada.includes("Library")) {
        // Sala de biblioteca
        videoElemento.src = "https://www.youtube.com/embed/4vIQON2fDWM?autoplay=1&mute=0";
        
        cajaMensajes.innerHTML = `
            <div class="mensaje"><strong>Sistema:</strong> <span>Silencio por favor, biblioteca activa.</span></div>
            <div class="mensaje"><strong style="color: #c084fc;">MathWizard:</strong> <span>Estoy sufriendo con el sustitutorio de cálculo integral... ¿alguien tiene ejercicios para sacar el centroide de esas figuras compuestas en forma de pez?</span></div>
            <div class="mensaje"><strong style="color: #fbbf24;">Ingeniero_X:</strong> <span>Te paso unos por Discord, solo aplica bien la regla de Leibniz.</span></div>
        `;
        
    } else if (salaGuardada.includes("Night")) {
        // Sala de noche 
        videoElemento.src = "https://www.youtube.com/embed/SQM38DJdaeU?autoplay=1&mute=0";
        
        cajaMensajes.innerHTML = `
            <div class="mensaje"><strong>Sistema:</strong> <span>Buenas noches a todos los noctámbulos.</span></div>
            <div class="mensaje"><strong style="color: #4ade80;">IoT_Dev:</strong> <span>Avanzando un proyecto de alerta temprana biométrica con LoRaWAN. Me va a explotar la cabeza jaja.</span></div>
        `;
        
    } else {
        // Programming Room (Por defecto)
        videoElemento.src = "https://www.youtube.com/embed/lTRiuFIWV54?autoplay=1&mute=0";
        
        cajaMensajes.innerHTML = `
            <div class="mensaje"><strong>Sistema:</strong> <span>Bienvenidos a Programming Room.</span></div>
            <div class="mensaje"><strong style="color: #fbbf24;">CodeNinja:</strong> <span>Gente, ¿alguien más está repasando el manejo de excepciones y las clases internas en Java?</span></div>
            <div class="mensaje"><strong style="color: #38bdf8;">Dev_Junior:</strong> <span>Yo justo estoy con eso para el examen práctico.</span></div>
        `;
    }
}


formChat.addEventListener("submit", function(event){
    event.preventDefault();

    const textoMensaje = inputMensaje.value;

    const nuevoMensaje = document.createElement("div");
    nuevoMensaje.classList.add("mensaje");

    nuevoMensaje.innerHTML = `
        <strong style="color: #4ade80;">Tú:</strong> 
        <span>${textoMensaje}</span>
    `;

    cajaMensajes.appendChild(nuevoMensaje);
    inputMensaje.value = "";
    cajaMensajes.scrollTop = cajaMensajes.scrollHeight;
});