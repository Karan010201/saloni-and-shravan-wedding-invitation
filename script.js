document.addEventListener("DOMContentLoaded", () => {

    // 1. Intersection Observer for Scroll Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    const elementsToReveal = document.querySelectorAll('.reveal, .reveal-slide-up, .reveal-slide-left, .reveal-slide-right');
    elementsToReveal.forEach(el => observer.observe(el));


    // 2. Falling Golden Flakes Simulation (Matches Ivory theme nicely)
    const particlesContainer = document.getElementById('particles-container');

    function createParticle() {
        if (!particlesContainer) return;

        const particle = document.createElement('div');
        particle.classList.add('particle');

        // Slightly rectangular to simulate falling confetti/flakes
        const width = Math.random() * 8 + 4;
        const height = Math.random() * 6 + 4;
        const leftPos = Math.random() * 100; // 0vw to 100vw
        const animationDuration = Math.random() * 12 + 8; // gentle falling speed
        const delay = Math.random() * 3;

        // Apply varying opacity
        const baseOpacity = Math.random() * 0.7 + 0.3;

        particle.style.width = `${width}px`;
        particle.style.height = `${height}px`;
        particle.style.left = `${leftPos}vw`;
        particle.style.animationDuration = `${animationDuration}s`;
        particle.style.animationDelay = `${delay}s`;
        particle.style.opacity = baseOpacity;

        // Horizontal drift while falling
        const drift = Math.random() * 200 - 100;
        particle.style.setProperty('--drift', `${drift}px`);

        particlesContainer.appendChild(particle);

        // Remove and recreate
        setTimeout(() => {
            particle.remove();
            createParticle();
        }, (animationDuration + delay) * 1000);
    }

    // Initialize initial batch
    const initialParticlesCount = 60;
    for (let i = 0; i < initialParticlesCount; i++) {
        setTimeout(() => {
            createParticle();
        }, Math.random() * 2000);
    }
});
