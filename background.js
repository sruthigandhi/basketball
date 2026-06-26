const canvas = document.createElement("canvas");
canvas.id = "background-canvas";
document.body.appendChild(canvas);

const ctx = canvas.getContext("2d");

let w, h;

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}

window.addEventListener("resize", resize);
resize();

const balls = [];

const colors = [
  "#ff7b00",
  "#ff8c1a",
  "#ff9d33",
  "#ffb347",
  "#ff9900"
];

// Create balls
for (let i = 0; i < 35; i++) {
  balls.push({
    x: Math.random() * w,
    y: Math.random() * h,

    radius: 30 + Math.random() * 80,

    dx: (Math.random() - 0.5) * 0.8,
    dy: (Math.random() - 0.5) * 0.8,

    color: colors[Math.floor(Math.random() * colors.length)]
  });
}

function animate() {

  // 🔥 DARK ORANGE BACKGROUND (new)
  ctx.fillStyle = "#2a1205"; // deep burnt orange / near-brown orange
  ctx.fillRect(0, 0, w, h);

  for (const b of balls) {

    b.x += b.dx;
    b.y += b.dy;

    // Wrap around screen
    if (b.x < -b.radius) b.x = w + b.radius;
    if (b.x > w + b.radius) b.x = -b.radius;
    if (b.y < -b.radius) b.y = h + b.radius;
    if (b.y > h + b.radius) b.y = -b.radius;

    const grad = ctx.createRadialGradient(
      b.x,
      b.y,
      0,
      b.x,
      b.y,
      b.radius
    );

    grad.addColorStop(0, "rgba(255,185,80,0.85)");
    grad.addColorStop(0.3, "rgba(255,145,40,0.45)");
    grad.addColorStop(0.7, "rgba(255,120,20,0.15)");
    grad.addColorStop(1, "rgba(255,120,20,0)");

    ctx.beginPath();
    ctx.fillStyle = grad;
    ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
    ctx.fill();
  }

  requestAnimationFrame(animate);
}

animate();

/* Scroll animation */

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, {
  threshold: 0.15
});

window.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".glass-card").forEach(card => {
    observer.observe(card);
  });
});
