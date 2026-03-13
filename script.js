const canvas = document.getElementById('royal-casino-visuals');
const ctx = canvas.getContext('2d');

let width, height;

function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

const colors = {
    black: '#000000',
    purples: ['#4A148C', '#6A1B9A', '#8E24AA']
};

const isMobile = window.innerWidth < 768;
const config = { liquidOrbs: isMobile ? 3 : 5 };

class RoyalLightOrb {
    constructor() { this.baseOpacity = Math.random() * 0.2 + 0.15; this.reset(); this.y = Math.random() * height; }
    reset() {
        this.radius = Math.random() * (width * 0.8) + (width * 0.4); 
        this.x = Math.random() * width; this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 1.5; this.vy = (Math.random() - 0.5) * 1.5;
        this.color = colors.purples[Math.floor(Math.random() * colors.purples.length)];
        this.maxOpacity = this.baseOpacity; 
    }
    update() {
        this.x += this.vx; this.y += this.vy;
        if (this.x < -this.radius || this.x > width + this.radius) this.vx *= -1;
        if (this.y < -this.radius || this.y > height + this.radius) this.vy *= -1;
    }
    draw() {
        ctx.beginPath();
        let gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
        let r = parseInt(this.color.slice(1,3), 16), g = parseInt(this.color.slice(3,5), 16), b = parseInt(this.color.slice(5,7), 16);
        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${this.maxOpacity})`);
        gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
        ctx.fillStyle = gradient; ctx.globalCompositeOperation = 'screen'; 
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2); ctx.fill();
        ctx.globalCompositeOperation = 'source-over';
    }
}

const liquidOrbs = [];
for (let i = 0; i < config.liquidOrbs; i++) liquidOrbs.push(new RoyalLightOrb());

function animate() {
    ctx.fillStyle = colors.black; ctx.fillRect(0, 0, width, height);
    liquidOrbs.forEach(orb => { orb.update(); orb.draw(); });
    requestAnimationFrame(animate); 
}
animate();

/* ========================================================================= */
/* CLONACIÓN DE LA CLASE CSS '.f-sparkle' POR TODO EL FONDO                  */
/* ========================================================================= */
const bgSparklesContainer = document.getElementById('bg-sparkles');
const sparkleCount = isMobile ? 60 : 150; 

for (let i = 0; i < sparkleCount; i++) {
    let sparkle = document.createElement('div');
    
    sparkle.classList.add('f-sparkle');

    sparkle.style.left = Math.random() * 100 + 'vw';
    sparkle.style.top = Math.random() * 100 + 'vh';

    let size = Math.random() * 3 + 3;
    sparkle.style.width = size + 'px';
    sparkle.style.height = size + 'px';

    sparkle.style.animationDuration = (Math.random() * 2 + 2) + 's';
    sparkle.style.animationDelay = (Math.random() * 3) + 's';

    bgSparklesContainer.appendChild(sparkle);
}

/* --- MENÚ --- */
const btnMenu = document.getElementById('btn-menu');
const btnCerrar = document.getElementById('btn-cerrar');
const menuLateral = document.getElementById('menu-lateral');

btnMenu.addEventListener('click', () => { menuLateral.classList.add('activo'); });
btnCerrar.addEventListener('click', () => { menuLateral.classList.remove('activo'); });