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
    miniCtx.fillStyle = `rgba(6,6,8,${s.o * 0.5})`;
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
    miniCtx.strokeStyle = 'rgba(6,6,8,0.09)';
    miniCtx.lineWidth = 1;
    miniCtx.stroke();

    miniCtx.beginPath();
    miniCtx.arc(px, py, p.r, 0, Math.PI * 2);
    miniCtx.fillStyle = p.color + 'CC';
    miniCtx.fill();

    miniCtx.font = '600 8px Cabinet Grotesk,sans-serif';
    miniCtx.fillStyle = 'rgba(6,6,8,0.6)';
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
function cvFieldValue(selectId, otherInputId) {
  const select = document.getElementById(selectId);
  const otherInput = document.getElementById(otherInputId);
  if (select.value === 'Other') {
    otherInput.classList.remove('hidden');
    return otherInput.value.trim();
  }
  otherInput.classList.add('hidden');
  return select.value;
}

async function cvExtractPdfText(file) {
  const buffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;
  let text = '';
  for (let i = 1; i <= pdf.numPages; i++) {
    const pageContent = await pdf.getPage(i).then((page) => page.getTextContent());
    let lastY = null;
    pageContent.items.forEach((item) => {
      const y = item.transform[5];
      if (lastY !== null && Math.abs(y - lastY) > 2) text += '\n';
      else if (lastY !== null) text += ' ';
      text += item.str;
      lastY = y;
    });
    text += '\n';
  }
  return text;
}

function cvFindSection(text, headings) {
  const lines = text.split('\n').map((l) => l.trim()).filter(Boolean);
  const headingPattern = new RegExp('^(' + headings.join('|') + ')\\s*[:\\-]?\\s*$', 'i');
  const stopPattern = /^[A-Z][A-Z\s&/]{3,}$/;
  for (let i = 0; i < lines.length; i++) {
    if (headingPattern.test(lines[i])) {
      const collected = [];
      for (let j = i + 1; j < lines.length; j++) {
        if (stopPattern.test(lines[j])) break;
        collected.push(lines[j]);
        if (collected.length >= 8) break;
      }
      return collected.join(' ').trim();
    }
  }
  return '';
}

async function cvHandleUpload(event) {
  const file = event.target.files[0];
  const status = document.getElementById('cvUploadStatus');
  if (!file) return;

  status.classList.remove('hidden');
  status.textContent = 'Reading ' + file.name + '...';

  try {
    const text = await cvExtractPdfText(file);

    const summarySection = cvFindSection(text, ['PROFESSIONAL SUMMARY', 'SUMMARY', 'PROFILE', 'OBJECTIVE']);
    const skillsSection = cvFindSection(text, ['KEY SKILLS', 'SKILLS', 'CORE COMPETENCIES', 'CERTIFICATIONS']);

    let filled = [];
    if (summarySection) {
      document.getElementById('cvsu').value = summarySection;
      filled.push('professional summary');
    }
    if (skillsSection) {
      const items = skillsSection.split(/[•,\-]/).map((s) => s.trim()).filter((s) => s.length > 1);
      document.getElementById('cvsk').value = items.join(', ');
      filled.push('key skills');
    }

    if (filled.length) {
      status.textContent = 'Auto-filled ' + filled.join(' and ') + ' from your CV — review and edit as needed.';
    } else {
      status.textContent = "Couldn't find clear summary/skills sections in this PDF — please fill them in manually.";
    }
    cvScore();
  } catch (err) {
    status.textContent = 'Could not read that PDF. Please try a different file or fill in the fields manually.';
  }
}

function cvScore() {
  const name = document.getElementById('cvn').value.trim();
  const specialty = cvFieldValue('cvs', 'cvsOther');
  const level = cvFieldValue('cvl', 'cvlOther');
  const country = cvFieldValue('cvc', 'cvcOther');
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
  const specialty = cvFieldValue('cvs', 'cvsOther') || 'Healthcare';
  const level = cvFieldValue('cvl', 'cvlOther') || 'Professional';
  const country = cvFieldValue('cvc', 'cvcOther') || 'International';
  const skills = document.getElementById('cvsk').value.trim() || 'Clinical skills, Patient care';
  const summary = document.getElementById('cvsu').value.trim() || 'Dedicated healthcare professional committed to excellence.';

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit: 'pt', format: 'a4' });
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 48;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  function heading(text) {
    y += 22;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(11, 122, 117);
    doc.text(text.toUpperCase(), margin, y);
    y += 6;
    doc.setDrawColor(11, 122, 117);
    doc.setLineWidth(0.75);
    doc.line(margin, y, pageWidth - margin, y);
    y += 16;
  }

  function paragraph(text, size = 10.5) {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(size);
    doc.setTextColor(20, 20, 20);
    const lines = doc.splitTextToSize(text, contentWidth);
    doc.text(lines, margin, y);
    y += lines.length * (size * 1.35);
  }

  function bulletList(items) {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10.5);
    doc.setTextColor(20, 20, 20);
    items.forEach((item) => {
      const lines = doc.splitTextToSize('-  ' + item, contentWidth - 10);
      doc.text(lines, margin, y);
      y += lines.length * 14;
    });
  }

  // Name
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(15, 43, 42);
  doc.text(name, margin, y);
  y += 20;

  // Specialty | Level | Country
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(90, 90, 90);
  doc.text(`${specialty}  |  ${level}  |  ${country}`, margin, y);
  y += 4;
  doc.setDrawColor(220, 220, 220);
  doc.setLineWidth(1);
  doc.line(margin, y + 10, pageWidth - margin, y + 10);
  y += 10;

  heading('Professional Summary');
  paragraph(summary);

  heading('Key Skills');
  bulletList(skills.split(',').map((x) => x.trim()).filter(Boolean));

  heading('Education');
  bulletList(['Add your degree - University, Year', 'Add specialty training - Hospital, Years']);

  heading('Experience');
  bulletList(['Most recent role - Title, Institution, Dates', 'Responsibilities using action verbs']);

  heading('Certifications & Licenses');
  bulletList(['Add: FRCR / Arab Board / Saudi Board / License number']);

  heading('Languages');
  bulletList(['Arabic - Native', 'English - Fluent']);

  heading('References');
  paragraph('Available upon request.');

  // Footer
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8.5);
  doc.setTextColor(150, 150, 150);
  doc.text('ATS-optimized CV generated by iHealth Academy — ihealthacademy.com', margin, doc.internal.pageSize.getHeight() - 24);

  doc.save(name.replace(/\s+/g, '_') + '_CV_iHealthAcademy.pdf');
}

// OFFER CAROUSEL
const offerGrid = document.getElementById('offerGrid');
const offerPrev = document.querySelector('.offer-arrow--prev');
const offerNext = document.querySelector('.offer-arrow--next');

if (offerGrid && offerPrev && offerNext) {
  const scrollStep = () => {
    const card = offerGrid.querySelector('.offer-card');
    const gap = parseFloat(getComputedStyle(offerGrid).gap) || 0;
    return card ? card.getBoundingClientRect().width + gap : offerGrid.clientWidth;
  };
  offerPrev.addEventListener('click', () => offerGrid.scrollBy({ left: -scrollStep(), behavior: 'smooth' }));
  offerNext.addEventListener('click', () => offerGrid.scrollBy({ left: scrollStep(), behavior: 'smooth' }));
}
