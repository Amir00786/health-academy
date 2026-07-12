// USER DASHBOARD — reads real progress already tracked in localStorage by
// radiology-dept.html, insurance-dept.html, and anatomy-spotting.html.
(function () {
  const ANATOMY_SYSTEMS = ['skeletal', 'cardiovascular', 'respiratory'];
  const TIER_THRESHOLDS = [
    { name: 'Legendary', ar: 'أسطوري', min: 150 },
    { name: 'Master', ar: 'خبير', min: 100 },
    { name: 'Hero', ar: 'بطل', min: 50 },
    { name: 'Learner', ar: 'متعلم', min: 0 },
  ];
  const RADIOLOGY_FREE_LESSONS = { foundations: 3, reports: 2, preauth: 2, systems: 2, research: 2 };
  const INSURANCE_TOTAL_LESSONS = 6;

  function lang() {
    return (window.I18N && window.I18N.currentLang) ? window.I18N.currentLang() : 'en';
  }

  function getRadiologyProgress() {
    try {
      return JSON.parse(localStorage.getItem('ih-radiology-progress') || '{}');
    } catch (e) { return {}; }
  }
  function getInsuranceProgress() {
    try {
      return JSON.parse(localStorage.getItem('ih-preauth-progress') || '[]');
    } catch (e) { return []; }
  }
  function getAnatomyTotal() {
    return ANATOMY_SYSTEMS.reduce((sum, sys) => sum + parseInt(localStorage.getItem('ih-anatomy-score:' + sys) || '0', 10), 0);
  }
  function tierFor(score) {
    return TIER_THRESHOLDS.find((t) => score >= t.min);
  }

  function radiologyStats() {
    const progress = getRadiologyProgress();
    let done = 0, total = 0, modulesStarted = 0, modulesComplete = 0;
    Object.keys(RADIOLOGY_FREE_LESSONS).forEach((mod) => {
      const freeCount = RADIOLOGY_FREE_LESSONS[mod];
      const doneCount = (progress[mod] || []).length;
      total += freeCount;
      done += Math.min(doneCount, freeCount);
      if (doneCount > 0) modulesStarted++;
      if (doneCount >= freeCount) modulesComplete++;
    });
    return { done, total, inProgress: modulesStarted > 0 && done < total, complete: done >= total && total > 0 };
  }

  function insuranceStats() {
    const progress = getInsuranceProgress();
    const done = progress.length;
    return { done, total: INSURANCE_TOTAL_LESSONS, inProgress: done > 0 && done < INSURANCE_TOTAL_LESSONS, complete: done >= INSURANCE_TOTAL_LESSONS };
  }

  function initials(name) {
    const parts = name.trim().split(/\s+/).filter(Boolean);
    if (!parts.length) return '?';
    return (parts[0][0] + (parts[1] ? parts[1][0] : '')).toUpperCase();
  }

  function renderProfile() {
    const name = localStorage.getItem('ih-student-name') || 'Guest Student';
    const specialty = localStorage.getItem('ih-student-specialty') || (lang() === 'ar' ? 'غير محدد' : 'Not set');
    document.getElementById('dashNameVal').textContent = name;
    document.getElementById('dashSpecialtyVal').textContent = specialty;
    document.getElementById('dashAvatar').textContent = initials(name);
  }

  document.getElementById('dashNameField').addEventListener('click', () => {
    const current = localStorage.getItem('ih-student-name') || '';
    const next = window.prompt(lang() === 'ar' ? 'الاسم:' : 'Your name:', current);
    if (next !== null && next.trim()) {
      localStorage.setItem('ih-student-name', next.trim());
      renderProfile();
    }
  });
  document.getElementById('dashSpecialtyField').addEventListener('click', () => {
    const current = localStorage.getItem('ih-student-specialty') || '';
    const next = window.prompt(lang() === 'ar' ? 'التخصص:' : 'Your speciality:', current);
    if (next !== null && next.trim()) {
      localStorage.setItem('ih-student-specialty', next.trim());
      renderProfile();
    }
  });

  function renderStats() {
    const rad = radiologyStats();
    const ins = insuranceStats();
    const activeCourses = (rad.inProgress ? 1 : 0) + (ins.inProgress ? 1 : 0);
    const lessonsDone = rad.done + ins.done;
    const certs = (rad.complete ? 1 : 0) + (ins.complete ? 1 : 0);
    const anatomyTotal = getAnatomyTotal();
    const tier = tierFor(anatomyTotal);

    document.getElementById('dashActiveCourses').textContent = activeCourses;
    document.getElementById('dashLessonsDone').textContent = lessonsDone;
    document.getElementById('dashCerts').textContent = certs;
    document.getElementById('dashAnatomyTier').textContent = lang() === 'ar' ? tier.ar : tier.name;
  }

  function courseCard(nameKey, href, stats) {
    const dict = (window.I18N && window.I18N.dict) ? window.I18N.dict() : {};
    const t = (key, fallback) => (dict[key] ? dict[key][lang()] || dict[key].en : fallback);
    const pct = stats.total ? Math.round((stats.done / stats.total) * 100) : 0;
    const meta = stats.done > 0
      ? `${stats.done}/${stats.total} ${t('dash.continueLesson', 'lessons complete')}`
      : t('dash.startCourse', 'Not started yet — click to begin');
    return `
      <a class="dash-course-card" href="${href}">
        <div class="dash-course-title">${t(nameKey, nameKey)}</div>
        <div class="dash-course-meta">${meta}</div>
        <div class="dash-progress-track"><div class="dash-progress-fill" style="width:${pct}%"></div></div>
      </a>
    `;
  }

  function renderCourses() {
    const rad = radiologyStats();
    const ins = insuranceStats();
    document.getElementById('dashCourseGrid').innerHTML =
      courseCard('dash.radiologyName', 'radiology-dept.html', rad) +
      courseCard('dash.insuranceName', 'insurance-dept.html', ins);
  }

  function renderAll() {
    renderProfile();
    renderStats();
    renderCourses();
  }

  renderAll();
  document.addEventListener('ih:langchange', renderAll);
})();
