// CERTIFICATE — shown when a course/track is fully completed. "Print" saves as PDF via the browser.
(function () {
  const overlay = document.createElement('div');
  overlay.className = 'cert-overlay';
  overlay.innerHTML = `
    <div class="cert-shell">
      <button type="button" class="cert-close no-print" aria-label="Close">✕</button>
      <div class="cert-card" id="certCard">
        <div class="cert-mark">iH</div>
        <div class="cert-brand">iHealth Academy</div>
        <div class="cert-heading">Certificate of Completion</div>
        <div class="cert-body">This certifies that</div>
        <div class="cert-name" id="certName">—</div>
        <div class="cert-body">has successfully completed</div>
        <div class="cert-course" id="certCourse">—</div>
        <div class="cert-date" id="certDate">—</div>
        <div class="cert-sign">iHealth Academy — front-end demo, not a verified credential</div>
      </div>
      <button type="button" class="cert-print-btn no-print" id="certPrintBtn">Print / Save as PDF</button>
    </div>
  `;
  document.body.appendChild(overlay);

  const els = {
    name: overlay.querySelector('#certName'),
    course: overlay.querySelector('#certCourse'),
    date: overlay.querySelector('#certDate'),
    close: overlay.querySelector('.cert-close'),
    print: overlay.querySelector('#certPrintBtn'),
  };

  function generate(course) {
    let name = localStorage.getItem('ih-student-name');
    if (!name) {
      name = window.prompt('Name for your certificate:', '') || 'iHealth Academy Student';
      localStorage.setItem('ih-student-name', name);
    }
    els.name.textContent = name;
    els.course.textContent = course;
    els.date.textContent = new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
    overlay.classList.add('open');
  }

  function close() {
    overlay.classList.remove('open');
  }

  els.close.addEventListener('click', close);
  els.print.addEventListener('click', () => window.print());
  overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });

  window.Certificate = { generate };
})();
