// CERTIFICATE — shown when a course/track is fully completed. "Print" saves as PDF via the browser.
(function () {
  function lang() {
    return (window.I18N && window.I18N.currentLang) ? window.I18N.currentLang() : 'en';
  }

  const STRINGS = {
    closeLabel: { en: 'Close', ar: 'إغلاق' },
    heading: { en: 'Certificate of Completion', ar: 'شهادة إتمام' },
    certifies: { en: 'This certifies that', ar: 'تشهد هذه الشهادة بأن' },
    completed: { en: 'has successfully completed', ar: 'قد أكمل بنجاح' },
    sign: { en: 'iHealth Academy — front-end demo, not a verified credential', ar: 'أكاديمية آي هيلث — نموذج تجريبي، ليست شهادة موثقة' },
    printBtn: { en: 'Print / Save as PDF', ar: 'طباعة / حفظ كملف PDF' },
    namePrompt: { en: 'Name for your certificate:', ar: 'الاسم على شهادتك:' },
    defaultName: { en: 'iHealth Academy Student', ar: 'طالب أكاديمية آي هيلث' },
  };
  function t(key) {
    return STRINGS[key][lang()] || STRINGS[key].en;
  }

  const overlay = document.createElement('div');
  overlay.className = 'cert-overlay';
  overlay.innerHTML = `
    <div class="cert-shell">
      <button type="button" class="cert-close no-print" aria-label="Close">✕</button>
      <div class="cert-card" id="certCard">
        <div class="cert-mark">iH</div>
        <div class="cert-brand">iHealth Academy</div>
        <div class="cert-heading" id="certHeading">Certificate of Completion</div>
        <div class="cert-body" id="certCertifies">This certifies that</div>
        <div class="cert-name" id="certName">—</div>
        <div class="cert-body" id="certCompleted">has successfully completed</div>
        <div class="cert-course" id="certCourse">—</div>
        <div class="cert-date" id="certDate">—</div>
        <div class="cert-sign" id="certSign">iHealth Academy — front-end demo, not a verified credential</div>
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

  function applyStaticStrings() {
    els.close.setAttribute('aria-label', t('closeLabel'));
    overlay.querySelector('#certHeading').textContent = t('heading');
    overlay.querySelector('#certCertifies').textContent = t('certifies');
    overlay.querySelector('#certCompleted').textContent = t('completed');
    overlay.querySelector('#certSign').textContent = t('sign');
    els.print.textContent = t('printBtn');
  }
  applyStaticStrings();
  document.addEventListener('ih:langchange', applyStaticStrings);

  function generate(course) {
    let name = localStorage.getItem('ih-student-name');
    if (!name) {
      name = window.prompt(t('namePrompt'), '') || t('defaultName');
      localStorage.setItem('ih-student-name', name);
    }
    els.name.textContent = name;
    els.course.textContent = course;
    els.date.textContent = new Date().toLocaleDateString(lang() === 'ar' ? 'ar-EG' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' });
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
