window.I18N_PAGE_DICT = {
      'dash.title': { en: 'Dashboard', ar: 'لوحة التحكم' },
      'dash.nameLabel': { en: 'Name', ar: 'الاسم' },
      'dash.specialtyLabel': { en: 'Speciality', ar: 'التخصص' },
      'dash.stat1Label': { en: 'Active courses', ar: 'الدورات النشطة' },
      'dash.viewCourses': { en: 'View →', ar: '← عرض' },
      'dash.stat2Label': { en: 'Lessons completed', ar: 'الدروس المكتملة' },
      'dash.stat3Label': { en: 'Certificates', ar: 'الشهادات' },
      'dash.autoTag': { en: 'Updates automatically', ar: 'يتحدث تلقائيًا' },
      'dash.stat4Label': { en: 'Anatomy Spotting tier', ar: 'مستوى تحديد التشريح' },
      'dash.viewAnatomy': { en: 'Practice →', ar: '← تدرّب' },
      'dash.recTitle': { en: 'What to learn next — recommended for you', ar: 'ماذا تتعلم بعد ذلك — موصى به لك' },
      'dash.recSoon': { en: '(Coming soon: personalized AI recommendations — showing your in-progress courses for now)', ar: '(قريبًا: توصيات مخصصة بالذكاء الاصطناعي — يتم حاليًا عرض دوراتك الجارية)' },
      'dash.comingSoon': { en: 'Coming soon', ar: 'قريبًا' },
      'dash.radiologyName': { en: 'Radiology', ar: 'الأشعة' },
      'dash.insuranceName': { en: 'Pre-Auth Specialist', ar: 'أخصائي التصريح المسبق' },
      'dash.continueLesson': { en: 'lessons complete', ar: 'دروس مكتملة' },
      'dash.startCourse': { en: 'Not started yet — click to begin', ar: 'لم يبدأ بعد — انقر للبدء' },
      'dash.favTitle': { en: 'Favorite course', ar: 'الدورة المفضلة' },
      'dash.mentorTitle': { en: 'Select your mentor', ar: 'اختر مرشدك' },
      'dash.guestStudent': { en: 'Guest Student', ar: 'طالب زائر' },
      'dash.pricingFreePlusPro': { en: '(Free + $100)', ar: '(مجاني + 100$)' },
      'mentor.trackBoth': { en: 'Both', ar: 'كلاهما' },
      'mentor.demoTitle': { en: 'This runs locally, in this browser.', ar: 'يعمل هذا محليًا، في هذا المتصفح فقط.' },
      'mentor.demoDescStudent': { en: 'Mentors listed here were added on this same browser (via the Owner Console or the Mentor Dashboard) — real cross-device matching needs a backend.', ar: 'المرشدون المدرجون هنا تمت إضافتهم على نفس هذا المتصفح (عبر لوحة تحكم المالك أو لوحة تحكم المرشد) — التوافق الحقيقي عبر الأجهزة يحتاج إلى خادم خلفي.' },
      'mentor.noMentors': { en: 'No mentors available yet — approve one in the Owner Console, or set up a mentor profile via Sign up → As Mentor, to see it appear here.', ar: 'لا يوجد مرشدون متاحون بعد — وافق على أحدهم في لوحة تحكم المالك، أو أنشئ ملف مرشد عبر إنشاء حساب ← كمرشد، ليظهر هنا.' },
      'mentor.select': { en: 'Select', ar: 'اختيار' },
      'mentor.selected': { en: 'Selected ✓', ar: 'تم الاختيار ✓' },
      'course.radiology': { en: 'Radiology', ar: 'الأشعة' },
      'course.preauth': { en: 'Pre-Auth Specialist', ar: 'أخصائي التصريح المسبق' },
      'meet.title': { en: 'Meeting requests', ar: 'طلبات الاجتماعات' },
      'meet.selectMentorFirst': { en: 'Select a mentor above to request a meeting.', ar: 'اختر مرشدًا أعلاه لطلب اجتماع.' },
      'meet.dateLabel': { en: 'Preferred date', ar: 'التاريخ المفضل' },
      'meet.noteLabel': { en: 'Note for your mentor', ar: 'ملاحظة لمرشدك' },
      'meet.notePlaceholder': { en: 'What would you like to discuss?', ar: 'ما الذي تود مناقشته؟' },
      'meet.requestBtn': { en: 'Request a meeting', ar: 'اطلب اجتماعًا' },
      'meet.noneYet': { en: 'No meeting requests yet.', ar: 'لا توجد طلبات اجتماعات بعد.' },
      'meet.noDate': { en: 'No date set', ar: 'لم يتم تحديد تاريخ' },
      'meet.pending': { en: 'Pending', ar: 'قيد الانتظار' },
      'meet.accepted': { en: 'Accepted', ar: 'تم القبول' },
      'meet.declined': { en: 'Declined', ar: 'تم الرفض' },
    };

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
    const name = localStorage.getItem('ih-student-name') || t('dash.guestStudent', 'Guest Student');
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

    document.getElementById('dashActiveCourses').textContent = activeCourses;
    document.getElementById('dashLessonsDone').textContent = lessonsDone;
    document.getElementById('dashCerts').textContent = certs;
    document.getElementById('dashAnatomyTier').textContent = t('dash.comingSoon', 'Coming soon');
  }

  function courseCard(nameKey, href, stats, opts) {
    opts = opts || {};
    const dict = (window.I18N && window.I18N.dict) ? window.I18N.dict() : {};
    const t = (key, fallback) => (dict[key] ? dict[key][lang()] || dict[key].en : fallback);
    const pct = stats.total ? Math.round((stats.done / stats.total) * 100) : 0;
    const meta = opts.comingSoon
      ? t('dash.comingSoon', 'Coming soon')
      : stats.done > 0
        ? `${stats.done}/${stats.total} ${t('dash.continueLesson', 'lessons complete')}`
        : t('dash.startCourse', 'Not started yet — click to begin');
    const title = t(nameKey, nameKey) + (opts.priceTag ? ` <span class="dash-course-price">${opts.priceTag}</span>` : '');
    const tag = opts.comingSoon ? 'div' : 'a';
    const hrefAttr = opts.comingSoon ? '' : ` href="${href}"`;
    const classAttr = 'dash-course-card' + (opts.comingSoon ? ' dash-course-card-soon' : '');
    return `
      <${tag} class="${classAttr}"${hrefAttr}>
        <div class="dash-course-title">${title}</div>
        <div class="dash-course-meta">${meta}</div>
        <div class="dash-progress-track"><div class="dash-progress-fill" style="width:${pct}%"></div></div>
      </${tag}>
    `;
  }

  function renderCourses() {
    const rad = radiologyStats();
    const ins = insuranceStats();
    document.getElementById('dashCourseGrid').innerHTML =
      courseCard('dash.radiologyName', 'radiology-dept.html', rad, { comingSoon: true }) +
      courseCard('dash.insuranceName', 'insurance-dept.html', ins, { priceTag: t('dash.pricingFreePlusPro', '(Free + $100)') });
  }

  function initials(fullName) {
    const parts = (fullName || '').trim().split(/\s+/).filter(Boolean);
    if (!parts.length) return '?';
    return (parts[0][0] + (parts[1] ? parts[1][0] : '')).toUpperCase();
  }

  const FAVORITE_COURSES = [
    { id: 'preauth', key: 'course.preauth', icon: 'fi-sr-shield-check' },
  ];

  function t(key, fallback) {
    const dict = (window.I18N && window.I18N.dict) ? window.I18N.dict() : {};
    return dict[key] ? (dict[key][lang()] || dict[key].en) : fallback;
  }

  function renderFavoriteCourse() {
    const row = document.getElementById('favoriteCourseRow');
    if (!row) return;
    const current = localStorage.getItem('ih-favorite-course') || '';
    row.innerHTML = FAVORITE_COURSES.map((c) =>
      `<button type="button" class="favorite-course-btn${c.id === current ? ' active' : ''}" data-course="${c.id}">
        <i class="fi ${c.icon}"></i><i class="fi fi-sr-star"></i> ${t(c.key, c.id)}
      </button>`
    ).join('');
    row.querySelectorAll('.favorite-course-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-course');
        const already = localStorage.getItem('ih-favorite-course') === id;
        if (already) localStorage.removeItem('ih-favorite-course');
        else localStorage.setItem('ih-favorite-course', id);
        renderFavoriteCourse();
      });
    });
  }

  function trackLabelFor(track) {
    if (track === 'radiology') return t('course.radiology', 'Radiology');
    if (track === 'preauth') return t('course.preauth', 'Pre-Auth Specialist');
    return t('mentor.trackBoth', 'Both');
  }

  function renderMentorDirectory() {
    const list = document.getElementById('mentorDirectoryList');
    if (!list || !window.IH_MENTORS) return;
    const mentors = window.IH_MENTORS.getDirectory();
    const selection = window.IH_MENTORS.getSelection();
    if (!mentors.length) {
      list.innerHTML = `<p class="mentee-empty">${t('mentor.noMentors', 'No mentors available yet.')}</p>`;
      return;
    }
    list.innerHTML = mentors.map((m) => {
      const isSelected = selection && selection.mentorId === m.id;
      return `
        <div class="mentor-directory-card">
          <div class="mentee-avatar">${initials(m.name)}</div>
          <div class="mentor-directory-info">
            <div class="mentor-directory-name">${m.name}</div>
            <div class="mentor-directory-meta">${trackLabelFor(m.track)}${m.experience ? ' · ' + m.experience : ''}</div>
            ${m.bio ? `<div class="mentor-directory-bio">${m.bio}</div>` : ''}
          </div>
          <button type="button" class="mentor-select-btn${isSelected ? ' selected' : ''}" data-mentor-id="${m.id}" data-mentor-name="${m.name}">
            ${isSelected ? t('mentor.selected', 'Selected ✓') : t('mentor.select', 'Select')}
          </button>
        </div>
      `;
    }).join('');

    list.querySelectorAll('.mentor-select-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-mentor-id');
        const name = btn.getAttribute('data-mentor-name');
        const current = window.IH_MENTORS.getSelection();
        if (current && current.mentorId === id) window.IH_MENTORS.clearSelection();
        else window.IH_MENTORS.selectMentor({ id, name });
        renderMentorDirectory();
        renderMeetingSection();
      });
    });
  }

  function statusLabel(status) {
    if (status === 'accepted') return t('meet.accepted', 'Accepted');
    if (status === 'declined') return t('meet.declined', 'Declined');
    return t('meet.pending', 'Pending');
  }

  function renderMeetingSection() {
    const formWrap = document.getElementById('meetingRequestFormWrap');
    const noMentorNote = document.getElementById('meetingNoMentorNote');
    const list = document.getElementById('meetingRequestList');
    if (!list || !window.IH_MENTORS) return;

    const selection = window.IH_MENTORS.getSelection();
    if (formWrap) formWrap.hidden = !selection;
    if (noMentorNote) noMentorNote.hidden = !!selection;

    const all = window.IH_MENTORS.getMeetingRequests().slice().reverse();
    list.innerHTML = '';
    if (!all.length) {
      list.innerHTML = `<p class="mentee-empty">${t('meet.noneYet', 'No meeting requests yet.')}</p>`;
      return;
    }
    all.forEach((m) => {
      const row = document.createElement('div');
      row.className = 'mentee-row';
      row.innerHTML =
        '<div class="mentee-avatar">' + initials(m.mentorName) + '</div>' +
        '<div style="flex:1;"><div class="mentee-name">' + m.mentorName + '</div>' +
        '<div class="mentee-meta">' + (m.preferredDate || t('meet.noDate', 'No date set')) + (m.note ? ' · ' + m.note : '') + '</div></div>' +
        '<span class="meeting-status status-' + m.status + '">' + statusLabel(m.status) + '</span>';
      list.appendChild(row);
    });
  }

  const meetingRequestBtn = document.getElementById('meetingRequestBtn');
  if (meetingRequestBtn) {
    meetingRequestBtn.addEventListener('click', () => {
      const selection = window.IH_MENTORS && window.IH_MENTORS.getSelection();
      if (!selection) return;
      const preferredDate = document.getElementById('meetingDateInput').value;
      const note = document.getElementById('meetingNoteInput').value.trim();
      window.IH_MENTORS.requestMeeting({ mentorId: selection.mentorId, mentorName: selection.mentorName, note, preferredDate });
      document.getElementById('meetingDateInput').value = '';
      document.getElementById('meetingNoteInput').value = '';
      renderMeetingSection();
    });
  }

  function renderAll() {
    renderProfile();
    renderStats();
    renderCourses();
    renderFavoriteCourse();
    renderMentorDirectory();
    renderMeetingSection();
  }

  renderAll();
  document.addEventListener('ih:langchange', renderAll);
})();

AOS.init({ duration: 700, easing: 'ease', once: true, offset: 80 });
