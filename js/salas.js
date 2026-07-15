const botonesUnirse = document.querySelectorAll('.sala-card button');

for (let i = 0; i < botonesUnirse.length; i++) {
    botonesUnirse[i].addEventListener('click', function() {
        
        // Atrapamos el título de la sala (el <h3> que está arriba del botón)
        const tituloSala = this.parentElement.querySelector('h3').textContent;
        
        // Lo guardamos en la "memoria" del navegador
        localStorage.setItem('salaSeleccionada', tituloSala);
        
        // Nos vamos a la sala en vivo
        window.location.href = "sala-en-vivo.html";
    });
}