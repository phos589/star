const canvas = document.getElementById("starCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const numStars = 500;
const stars = [];

// Create stars
for (let i = 0; i < numStars; i++) {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height;
  const speed = Math.random() * 5 + 1;
  const size = Math.random() * 2;
  stars.push({ x, y, speed, size });
}

const tunnelRadius = 1000;
const tunnelRotationSpeed = 0.001;
let tunnelAngle = 0;

function drawTunnel() {
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
  ctx.lineWidth = 2;

  for (let i = 0; i < numStars; i++) {
    const angle = (i / numStars) * Math.PI * 2 + tunnelAngle;
    const x1 = canvas.width / 2 + tunnelRadius * Math.cos(angle);
    const y1 = canvas.height / 2 + tunnelRadius * Math.sin(angle);
    const x2 = canvas.width / 2 + (tunnelRadius + 30) * Math.cos(angle);
    const y2 = canvas.height / 2 + (tunnelRadius + 30) * Math.sin(angle);

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  tunnelAngle += tunnelRotationSpeed;

  // Draw stars
  for (const star of stars) {
    star.x -= star.speed;
    if (star.x < 0) {
      star.x = canvas.width;
      star.y = Math.random() * canvas.height;
    }

    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
    ctx.fill();
  }

  // Draw the warp tunnel
  drawTunnel();

  requestAnimationFrame(animate);
}

animate();

// Resize canvas when the window is resized
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});