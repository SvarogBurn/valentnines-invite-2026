// Animation utilities
function shakeCard(elementId) {
    const el = document.getElementById(elementId);
    el.classList.add('shake');
    
    setTimeout(() => {
        el.classList.remove('shake');
    }, 450);
}

function shakeScreen() {
    document.body.classList.add('shake-screen');
    
    setTimeout(() => {
        document.body.classList.remove('shake-screen');
    }, 500);
}

// Confetti/celebration animation
function triggerConfetti() {
    const decorImages = [
        'https://a.lovart.ai/artifacts/user/zV7GRS8bYmiTpRqM.png',
        'https://a.lovart.ai/artifacts/user/Z5cydlEVB47bzNLE.png',
        'https://a.lovart.ai/artifacts/user/hDQfQ2yjcmimj3W6.png'
    ];
    
    // Initial burst
    createPetalBurst(decorImages, 80, 50);
    
    // Continuous waves
    const petalInterval = setInterval(() => {
        createPetalBurst(decorImages, 5, 100);
    }, 1000);
    
    // Stop after 15 seconds
    setTimeout(() => {
        clearInterval(petalInterval);
    }, 15000);
}

function createPetalBurst(images, count, delayBetween) {
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            createFallingPetal(images);
        }, i * delayBetween);
    }
}

function createFallingPetal(images) {
    const petal = document.createElement('img');
    petal.src = images[Math.floor(Math.random() * images.length)];
    
    const size = Math.random() * 40 + 30;
    const duration = Math.random() * 2 + 3;
    const rotation = Math.random() * 720 - 360;
    
    petal.style.position = 'fixed';
    petal.style.left = Math.random() * 100 + 'vw';
    petal.style.top = '-80px';
    petal.style.width = size + 'px';
    petal.style.height = 'auto';
    petal.style.zIndex = '1000';
    petal.style.transition = `transform ${duration}s linear, opacity 8s`;
    petal.style.pointerEvents = 'none';
    
    document.body.appendChild(petal);
    
    // Trigger animation
    setTimeout(() => {
        petal.style.transform = `translateY(110vh) rotate(${rotation}deg)`;
        petal.style.opacity = '0';
    }, 100);
    
    // Clean up
    setTimeout(() => {
        petal.remove();
    }, 11000);
}
