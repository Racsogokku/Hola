const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const mascot = document.getElementById('mascot');
const mainCard = document.getElementById('main-card');
const successScreen = document.getElementById('success-screen');

// Frases para dar pena cuando dan click a NO
const sadPhrases = [
    "No", // Default
    "¿Estás segura?",
    "¿De verdad?",
    "¡Piénsalo bien!",
    "Me romperás el corazón 💔",
    "¡Voy a llorar!",
    "No seas así...",
    "¡Por favor!",
    "¡Me muero de tristeza!",
    "Mira que eres mal@...",
    "Ok, ya no pregunto más..."
];

let clickCount = 0;

function rejectLove() {
    clickCount++;

    // Cambiar el texto del botón NO
    if (clickCount < sadPhrases.length) {
        noBtn.innerText = sadPhrases[clickCount];
    } else {
        noBtn.innerText = "Adiós mundo cruel...";
        noBtn.style.display = 'none';
    }

    // Hacer el botón NO más pequeño
    const newScaleNo = 1 - (clickCount * 0.1);
    noBtn.style.transform = `scale(${Math.max(0, newScaleNo)})`;
    
    // Hacer el botón SÍ más grande
    const newScaleYes = 1 + (clickCount * 0.4);
    yesBtn.style.transform = `scale(${newScaleYes})`;
    
    // --- AQUÍ ESTÁ EL CAMBIO ---
    // Cambiar imagen del osito al triste que pediste
    if (clickCount === 1) {
        // He usado un enlace directo fiable de Mocha llorando
        mascot.src = "https://media.tenor.com/Qu6GUg0Yx90AAAAi/mocha-cry.gif"; 
    }
}

function acceptLove() {
    mainCard.style.display = 'none';
    successScreen.classList.remove('hidden');
    successScreen.classList.add('flex');
    createHearts();
}

function createHearts() {
    const container = document.getElementById('success-screen');
    for (let i = 0; i < 50; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.classList.add('floating-heart');
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 3 + 2 + 's';
        heart.style.fontSize = Math.random() * 2 + 1 + 'rem';
        container.appendChild(heart);
    }
}

setInterval(() => {
    const container = document.getElementById('hearts-container');
    const heart = document.createElement('div');
    heart.innerHTML = '💖';
    heart.classList.add('floating-heart');
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 10 + 5 + 's';
    heart.style.fontSize = '1.5rem';
    heart.style.opacity = '0.3';
    container.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 15000);
}, 1000);