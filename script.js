// 1. Selección de elementos del DOM
const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const mascot = document.getElementById('mascot');
const mainCard = document.getElementById('main-card');
const successScreen = document.getElementById('success-screen');

// ---------------------------------------------------------
// 2. CONFIGURACIÓN ACTUALIZADA DE GOOGLE FORMS
// ---------------------------------------------------------
// Nota: La URL debe terminar en 'formResponse', no en 'viewform'
const FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSdP0d4vuBPY_hS8B71-zqEHX7bj65QJxKvOxi3UgzPtEyC7OA/formResponse";

// Este es el ID que saqué de tu enlace:
const ENTRY_ID = "entry.652535723"; 

/**
 * Envía la respuesta a Google Forms.
 * Se usa 'no-cors' por lo que no verás respuesta en la consola, 
 * pero el dato se enviará si la conexión es correcta.
 */
function enviarRespuesta(valor) {
    const formData = new FormData();
    formData.append(ENTRY_ID, valor);

    fetch(FORM_URL, {
        method: "POST",
        mode: "no-cors",
        body: formData
    }).then(() => {
        console.log("Intento de envío: " + valor);
    }).catch(err => {
        console.error("Error de red", err);
    });
}
// ---------------------------------------------------------

// 3. Lógica de frases y contador
const sadPhrases = [
    "No", 
    "¿Estás segura? 🥺", 
    "¿De verdad? 💔", 
    "¡Piénsalo bien!",
    "Me romperás el corazón...", 
    "¡Voy a llorar! 😭", 
    "No seas así...",
    "¡Por favor! 🙏", 
    "¡Me muero de tristeza!", 
    "Mira que eres mala...",
    "Ok, ya no pregunto más..."
];

let clickCount = 0;

/**
 * Función que se ejecuta al pulsar (o intentar pulsar) el botón NO
 */

function rejectLove() {
    clickCount++;
    
    // Enviamos el aviso de que intentó decir que NO
    enviarRespuesta(`No`);

    // Cambiar el texto del botón NO según el array de frases
    if (clickCount < sadPhrases.length) {
        noBtn.innerText = sadPhrases[clickCount];
    } else {
        noBtn.innerText = ""; 
        noBtn.style.display = 'none'; // Desaparece tras agotar frases
    }

    // Efectos de escala: el NO se achica, el SÍ crece
    const newScaleNo = Math.max(0, 1 - (clickCount * 0.1));
    const newScaleYes = 1 + (clickCount * 0.4);
    
    noBtn.style.transform = `scale(${newScaleNo})`;
    yesBtn.style.transform = `scale(${newScaleYes})`;
    
    // Al primer rechazo, cambiamos la mascota por una que llora
    if (clickCount === 1) {
        // Asegúrate de que esta imagen cargue bien o usa una local
        mascot.src = "https://media.tenor.com/Qu6GUg0Yx90AAAAi/mocha-cry.gif"; 
    }
}
    /*
   function rejectLove() {
    // Enviamos la confirmación final a Google Forms
    enviarRespuesta("No");

    // Cambiamos de pantalla
    mainCard.style.display = 'none';
    document.getElementById('no-screen').classList.remove('hidden');
    document.getElementById('no-screen').classList.add('flex');
    
    // Lanzamos la explosión de corazones
    
}
    */

/**
 * Función que se ejecuta al pulsar el botón SÍ
 */
function acceptLove() {
    // Enviamos la confirmación final a Google Forms
    enviarRespuesta("Si");

    // Cambiamos de pantalla
    mainCard.style.display = 'none';
    successScreen.classList.remove('hidden');
    successScreen.classList.add('flex');
    
    // Lanzamos la explosión de corazones
    createHeartsExplosion();
}

/**
 * Crea una lluvia de corazones al aceptar
 */
function createHeartsExplosion() {
    const container = document.body;
    for (let i = 0; i < 50; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.classList.add('floating-heart');
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = (Math.random() * 3 + 2) + 's';
        heart.style.fontSize = (Math.random() * 2 + 1) + 'rem';
        heart.style.zIndex = "100";
        container.appendChild(heart);
        
        setTimeout(() => heart.remove(), 5000);
    }
}

// Lluvia constante de fondo
setInterval(() => {
    const container = document.getElementById('hearts-container');
    if (!container) return;
    
    const heart = document.createElement('div');
    heart.innerHTML = '💖';
    heart.classList.add('floating-heart');
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = (Math.random() * 10 + 5) + 's';
    heart.style.fontSize = '1.5rem';
    heart.style.opacity = '0.3';
    container.appendChild(heart);
    
    setTimeout(() => heart.remove(), 15000);
}, 1000);