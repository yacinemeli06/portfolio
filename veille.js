// Effet d’apparition au scroll
const fadeEls = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.1 });
fadeEls.forEach(el => observer.observe(el));

// Fond neuronal animé
const c = document.getElementById("neurons");
const ctx = c.getContext("2d");
let W, H;
function resize() {
  W = c.width = window.innerWidth;
  H = c.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

let nodes = Array.from({length: 40}, () => ({
  x: Math.random() * W,
  y: Math.random() * H,
  dx: (Math.random() - 0.5) * 0.3,
  dy: (Math.random() - 0.5) * 0.3
}));

function animate() {
  ctx.clearRect(0, 0, W, H);
  for (let i=0; i<nodes.length; i++) {
    const n = nodes[i];
    n.x += n.dx; n.y += n.dy;
    if (n.x<0||n.x>W) n.dx*=-1;
    if (n.y<0||n.y>H) n.dy*=-1;

    ctx.beginPath();
    ctx.arc(n.x, n.y, 2, 0, Math.PI*2);
    ctx.fillStyle = "#60a5fa";
    ctx.fill();

    for (let j=i+1; j<nodes.length; j++) {
      const n2 = nodes[j];
      const dist = Math.hypot(n.x-n2.x, n.y-n2.y);
      if (dist < 120) {
        ctx.strokeStyle = "rgba(147,197,253," + (1 - dist/120) * 0.4 + ")";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(n.x, n.y);
        ctx.lineTo(n2.x, n2.y);
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(animate);
}
animate();
