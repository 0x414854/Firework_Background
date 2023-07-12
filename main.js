const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


const explosions = [];

function createExplosion(x, y) {
  const colors = ['#ffffff', '#ff0000', '#F5C618'];
  const particleCount = 50;
  const particleSpeed = 5;
  const particleSize = 4;

  for (let i = 0; i < particleCount; i++) {
    const particle = {
      x,
      y,
      color: colors[Math.floor(Math.random() * colors.length)],
      angle: Math.random() * Math.PI * 2,
      speed: Math.random() * particleSpeed + 1,
      size: Math.random() * particleSize + 1,
      life: Math.random() * 20 + 10
    };
    explosions.push(particle);
  }
}

function drawExplosions() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < explosions.length; i++) {
    const particle = explosions[i];

    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.fillStyle = particle.color;
    ctx.fill();

    particle.x += Math.cos(particle.angle) * particle.speed;
    particle.y += Math.sin(particle.angle) * particle.speed + 1;
    particle.life--;

    if (particle.life <= 0) {
      explosions.splice(i, 1);
      i--;
    }
  }

  setTimeout(() => {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    createExplosion(x, y);
  }, Math.random() * 2000 + 1000);

  requestAnimationFrame(drawExplosions);
}

drawExplosions();
