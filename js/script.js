// CURSOR
const cur = document.getElementById('cur');
const ring = document.getElementById('ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', (e) => {
  mx = e.clientX;
  my = e.clientY;
  cur.style.transform = `translate(${mx - 5}px,${my - 5}px)`;
});

(function animateRing() {
  rx += (mx - rx - 17) * 0.1;
  ry += (my - ry - 17) * 0.1;
  ring.style.transform = `translate(${rx}px,${ry}px)`;
  requestAnimationFrame(animateRing);
})();

document.querySelectorAll('a, button, .serve-card, .offer-card, .plan').forEach((el) => {
  el.addEventListener('mouseenter', () => {
    ring.style.width = '52px';
    ring.style.height = '52px';
    ring.style.borderColor = 'rgba(0,200,150,.7)';
  });
  el.addEventListener('mouseleave', () => {
    ring.style.width = '34px';
    ring.style.height = '34px';
    ring.style.borderColor = 'rgba(0,200,150,.4)';
  });
});

// SCROLL REVEAL
const observer = new IntersectionObserver(
  (entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  }),
  { threshold: 0.08 }
);
document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

// COUNTER
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1200;
  const start = performance.now();

  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    el.textContent = Math.round(progress * target);
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

const counterObserver = new IntersectionObserver(
  (entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  }),
  { threshold: 0.5 }
);
document.querySelectorAll('.counter').forEach((el) => counterObserver.observe(el));

// MINI ECOSYSTEM CANVAS
const miniCanvas = document.getElementById('miniEco');
const miniCtx = miniCanvas.getContext('2d');
let miniWidth, miniHeight, miniTime = 0;

function resizeMiniCanvas() {
  miniWidth = miniCanvas.width = miniCanvas.offsetWidth;
  miniHeight = miniCanvas.height = miniCanvas.offsetHeight;
}
resizeMiniCanvas();
window.addEventListener('resize', resizeMiniCanvas);

const miniPlanets = [
  { color: '#A78BFA', orbit: 0.32, speed: 0.0004, angle: 0.5, r: 14, label: 'Regulator' },
  { color: '#00C896', orbit: 0.42, speed: 0.0003, angle: 2.1, r: 18, label: 'Provider' },
  { color: '#4A9EFF', orbit: 0.52, speed: 0.00022, angle: 3.8, r: 17, label: 'Insurance' },
  { color: '#FF6B6B', orbit: 0.62, speed: 0.00016, angle: 1.2, r: 13, label: 'Cycle' },
];

(function animateMiniEcosystem() {
  miniTime += 1;
  miniCtx.clearRect(0, 0, miniWidth, miniHeight);
  const cx = miniWidth / 2, cy = miniHeight / 2;

  // Stars
  if (!animateMiniEcosystem.stars) {
    animateMiniEcosystem.stars = Array.from({ length: 60 }, () => ({
      x: Math.random() * 800,
      y: Math.random() * 500,
      r: Math.random() + 0.3,
      o: Math.random() * 0.5 + 0.1,
    }));
  }
  animateMiniEcosystem.stars.forEach((s) => {
    miniCtx.beginPath();
    miniCtx.arc(s.x % miniWidth, s.y % miniHeight, s.r, 0, Math.PI * 2);
    miniCtx.fillStyle = `rgba(248,246,241,${s.o})`;
    miniCtx.fill();
  });

  // Sun glow
  const glow = miniCtx.createRadialGradient(cx, cy, 0, cx, cy, 40);
  glow.addColorStop(0, 'rgba(0,200,150,0.2)');
  glow.addColorStop(1, 'rgba(0,200,150,0)');
  miniCtx.beginPath();
  miniCtx.arc(cx, cy, 40, 0, Math.PI * 2);
  miniCtx.fillStyle = glow;
  miniCtx.fill();

  miniCtx.beginPath();
  miniCtx.arc(cx, cy, 18, 0, Math.PI * 2);
  miniCtx.fillStyle = 'rgba(13,13,26,1)';
  miniCtx.fill();

  miniCtx.beginPath();
  miniCtx.arc(cx, cy, 18, 0, Math.PI * 2);
  miniCtx.strokeStyle = 'rgba(0,200,150,0.5)';
  miniCtx.lineWidth = 1;
  miniCtx.stroke();

  miniCtx.font = '600 7px Cabinet Grotesk,sans-serif';
  miniCtx.fillStyle = 'rgba(0,200,150,0.8)';
  miniCtx.textAlign = 'center';
  miniCtx.textBaseline = 'middle';
  miniCtx.fillText('iHealth', cx, cy);

  miniPlanets.forEach((p) => {
    p.angle += p.speed;
    const orbitR = Math.min(miniWidth, miniHeight) * p.orbit;
    const px = cx + Math.cos(p.angle) * orbitR;
    const py = cy + Math.sin(p.angle) * orbitR * 0.5;

    miniCtx.beginPath();
    miniCtx.ellipse(cx, cy, orbitR, orbitR * 0.5, 0, 0, Math.PI * 2);
    miniCtx.strokeStyle = 'rgba(255,255,255,0.04)';
    miniCtx.lineWidth = 1;
    miniCtx.stroke();

    miniCtx.beginPath();
    miniCtx.arc(px, py, p.r, 0, Math.PI * 2);
    miniCtx.fillStyle = p.color + 'CC';
    miniCtx.fill();

    miniCtx.font = '600 8px Cabinet Grotesk,sans-serif';
    miniCtx.fillStyle = 'rgba(248,246,241,0.6)';
    miniCtx.textAlign = 'center';
    miniCtx.textBaseline = 'top';
    miniCtx.fillText(p.label, px, py + p.r + 3);
  });

  requestAnimationFrame(animateMiniEcosystem);
})();

document.querySelector('.eco-preview-visual').addEventListener('click', () => {
  window.location = 'ecosystem.html';
});

// CV BUILDER
function cvScore() {
  const name = document.getElementById('cvn').value.trim();
  const specialty = document.getElementById('cvs').value;
  const level = document.getElementById('cvl').value;
  const country = document.getElementById('cvc').value;
  const skills = document.getElementById('cvsk').value.trim();
  const summary = document.getElementById('cvsu').value.trim();

  let score = 0;
  const tips = [];

  if (name.length > 3) {
    score += 20;
  } else {
    tips.push({ c: 'r', t: 'Add your full name — ATS needs it at the top.' });
  }

  if (specialty) {
    score += 15;
  } else {
    tips.push({ c: 'a', t: 'Select your specialty to match the right roles.' });
  }

  if (level) {
    score += 10;
  } else {
    tips.push({ c: 'a', t: 'Your training level helps employers filter correctly.' });
  }

  if (country) {
    score += 10;
  } else {
    tips.push({ c: 'a', t: 'Target country changes your CV format — select yours.' });
  }

  if (skills.length > 10) {
    score += 25;
    const keywords = ['mri', 'ct', 'frcr', 'pre-auth', 'pacs', 'ris', 'ultrasound', 'arab board', 'saudi board', 'abr', 'nursing', 'pharmacy', 'dentist'];
    const matched = keywords.filter((k) => skills.toLowerCase().includes(k));
    if (matched.length >= 2) {
      tips.push({ c: 'g', t: `Good keywords found: ${matched.slice(0, 3).join(', ')}.` });
    } else {
      tips.push({ c: 'a', t: 'Add specific skills: FRCR, MRI, CT, pre-authorization, PACS...' });
    }
  } else {
    tips.push({ c: 'r', t: 'Skills are the most important ATS field — add at least 5.' });
  }

  if (summary.length > 60) {
    score += 20;
    tips.push({ c: 'g', t: 'Good summary length. Keep it under 3 clear sentences.' });
  } else if (summary.length > 0) {
    tips.push({ c: 'a', t: 'Summary is short — aim for 2-3 sentences.' });
  } else {
    tips.push({ c: 'r', t: 'Add a professional summary — first thing ATS and humans read.' });
  }

  const box = document.getElementById('atsBox');
  if (name || specialty || level) box.classList.add('show');

  document.getElementById('atsFill').style.width = score + '%';
  document.getElementById('atsLbl').textContent = 'ATS score: ' + score + '%';

  const hint = document.getElementById('atsHint');
  if (score >= 80) {
    hint.textContent = 'Excellent — your CV will pass most ATS filters.';
  } else if (score >= 50) {
    hint.textContent = 'Good start — a few more details will help.';
  } else {
    hint.textContent = 'Keep filling — your score rises with each field.';
  }

  document.getElementById('cvTips').innerHTML = tips
    .slice(0, 3)
    .map((t) => `<div class="cv-tip"><div class="tdot ${t.c}"></div><span>${t.t}</span></div>`)
    .join('');
}

function genCV() {
  const name = document.getElementById('cvn').value.trim() || 'Your Name';
  const specialty = document.getElementById('cvs').value || 'Healthcare';
  const level = document.getElementById('cvl').value || 'Professional';
  const country = document.getElementById('cvc').value || 'International';
  const skills = document.getElementById('cvsk').value.trim() || 'Clinical skills, Patient care';
  const summary = document.getElementById('cvsu').value.trim() || 'Dedicated healthcare professional committed to excellence.';

  const cv = `${name}\n${specialty} | ${level} | ${country}\n\nPROFESSIONAL SUMMARY\n${summary}\n\nKEY SKILLS\n${skills.split(',').map((x) => '• ' + x.trim()).join('\n')}\n\nEDUCATION\n[Add your degree — University, Year]\n[Add specialty training — Hospital, Years]\n\nEXPERIENCE\n[Most recent role — Title, Institution, Dates]\n[Responsibilities using action verbs]\n\nCERTIFICATIONS & LICENSES\n[Add: FRCR / Arab Board / Saudi Board / License number]\n\nLANGUAGES\n[Arabic — Native, English — Fluent]\n\nREFERENCES\nAvailable upon request\n\n---\nATS-optimized CV generated by iHealth Academy\nihealthacademy.com`;

  const blob = new Blob([cv], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name.replace(/\s+/g, '_') + '_CV_iHealthAcademy.txt';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
