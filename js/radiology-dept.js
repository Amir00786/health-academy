    window.I18N_PAGE_DICT = {
      'rad.tag': { en: 'Provider — Radiology department', ar: 'مقدم الخدمة — قسم الأشعة' },
      'rad.h1': { en: 'Radiology.<br><span>Done right.</span>', ar: 'الأشعة.<br><span>بالطريقة الصحيحة.</span>' },
      'rad.desc': { en: 'Everything a radiologist needs — from your first scan to passing your board exam to writing pre-auth requests that never get rejected. Structured. Practical. Built from 7 years of real experience.', ar: 'كل ما يحتاجه أخصائي الأشعة — من أول فحص إلى اجتياز اختبار البورد إلى كتابة طلبات تصريح مسبق لا تُرفض أبدًا. منظم وعملي، ومبني على 7 سنوات من الخبرة الحقيقية.' },
      'rad.stat1': { en: 'Learning tracks', ar: 'مسارات تعليمية' },
      'rad.stat2': { en: 'Lessons', ar: 'دروس' },
      'rad.stat3': { en: 'Exam tracks', ar: 'مسارات امتحانات' },
      'rad.stat4val': { en: 'Free', ar: 'مجاني' },
      'rad.stat4': { en: 'To start', ar: 'للبدء' },
      'rad.anatomyBtn': { en: '🩻 Try Anatomy Spotting — timed mock test →', ar: '🩻 جرّب تحديد التشريح — اختبار تجريبي محدد بوقت ←' },
      'rad.tabFoundations': { en: 'Foundations', ar: 'الأساسيات' },
      'rad.tabSystems': { en: 'Systems', ar: 'الأنظمة' },
      'rad.tabReports': { en: 'Reports', ar: 'التقارير' },
      'rad.tabResearch': { en: 'Research', ar: 'البحث العلمي' },
      'rad.tabExams': { en: 'Exams', ar: 'الامتحانات' },
      'rad.sideL1': { en: 'What is radiology?', ar: 'ما هي الأشعة؟' },
      'rad.sideL2': { en: 'How imaging works', ar: 'كيف يعمل التصوير الطبي' },
      'rad.sideL3': { en: 'X-ray basics', ar: 'أساسيات الأشعة السينية' },
      'rad.sideL4': { en: 'CT explained simply', ar: 'التصوير المقطعي ببساطة' },
      'rad.sideL5': { en: 'MRI — when and why', ar: 'الرنين المغناطيسي — متى ولماذا' },
      'rad.sideL6': { en: 'Ultrasound & nuclear', ar: 'الموجات فوق الصوتية والطب النووي' },
      'rad.progressLabel': { en: 'Your progress', ar: 'تقدمك' },
    };

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

    const modules = {
      preauth: {
        num: 'Module 01',
        title: 'Pre-Authorization Specialist — start here.',
        desc: 'The complete back-end workflow of medical pre-authorization — from request review and policy interpretation to approvals, denials, and appeals. Free, start to finish.',
        meta: [{ ico: '<i class="fi fi-sr-alarm-clock"></i>', txt: '~3h 19m total' }, { ico: '<i class="fi fi-sr-user-graduate"></i>', txt: 'All levels' }, { ico: '<i class="fi fi-sr-lock-open-alt"></i>', txt: 'Free to access' }],
        exams: [],
        lessons: [
          { num: '01', title: 'What is the Medical Insurance?', desc: 'The core definitions and terms every specialist must know cold.', dur: '37:05', tag: 'free', featured: true, locked: false, video: 'images/vid-1.mp4' },
          { num: '02', title: 'General Overview', desc: 'See how patients, providers, insurers, and regulators all connect in one claim.', dur: '10:47', tag: 'free', featured: false, locked: false, video: 'images/vid-2.mp4' },
          { num: '03', title: 'Health Questionnaire', desc: 'Disclosure rules, investigation standards, and what genuinely requires declaration.', dur: '26:18', tag: 'free', featured: false, locked: false, video: 'images/vid-3.mp4' },
          { num: '04', title: 'CHI Exclusion Items', desc: 'What\'s excluded, and the difference between reject and refer.', dur: '39:22', tag: 'free', featured: false, locked: false, video: 'images/vid-4.mp4' },
          { num: '05', title: 'CHI Inclusion Items & Coverage', desc: 'What\'s actually covered — maternity, chronic conditions, and organ transplants.', dur: '31:03', tag: 'free', featured: false, locked: false, video: 'images/vid-5.mp4' },
          { num: '06', title: 'Special Terms & Conditions', desc: 'Ex gratia, second opinions, and the professional judgment behind every decision.', dur: '30:49', tag: 'free', featured: false, locked: false, video: 'images/vid-6.mp4' },
          { num: '07', title: 'Let\'s Practice Before the Exam', desc: 'Apply your knowledge with real-life scenarios and make the right decisions.', dur: '23:53', tag: 'free', featured: false, locked: false, video: 'images/vid-7.mp4' },
        ]
      }
    };

    // Arabic mirror of `modules` — same shape/order. No Arabic translation has
    // been provided for this replaced content yet, so it mirrors the English
    // strings verbatim (rather than mixing in stale/removed radiology text).
    const modules_ar = {
      preauth: {
        num: 'الوحدة 01',
        title: 'Pre-Authorization Specialist — start here.',
        desc: 'The complete back-end workflow of medical pre-authorization — from request review and policy interpretation to approvals, denials, and appeals. Free, start to finish.',
        meta: [{ ico: '<i class="fi fi-sr-alarm-clock"></i>', txt: '~3h 19m total' }, { ico: '<i class="fi fi-sr-user-graduate"></i>', txt: 'All levels' }, { ico: '<i class="fi fi-sr-lock-open-alt"></i>', txt: 'Free to access' }],
        exams: [],
        lessons: [
          { num: '01', title: 'What is the Medical Insurance?', desc: 'The core definitions and terms every specialist must know cold.', dur: '37:05', tag: 'free', featured: true, locked: false, video: 'images/vid-1.mp4' },
          { num: '02', title: 'General Overview', desc: 'See how patients, providers, insurers, and regulators all connect in one claim.', dur: '10:47', tag: 'free', featured: false, locked: false, video: 'images/vid-2.mp4' },
          { num: '03', title: 'Health Questionnaire', desc: 'Disclosure rules, investigation standards, and what genuinely requires declaration.', dur: '26:18', tag: 'free', featured: false, locked: false, video: 'images/vid-3.mp4' },
          { num: '04', title: 'CHI Exclusion Items', desc: 'What\'s excluded, and the difference between reject and refer.', dur: '39:22', tag: 'free', featured: false, locked: false, video: 'images/vid-4.mp4' },
          { num: '05', title: 'CHI Inclusion Items & Coverage', desc: 'What\'s actually covered — maternity, chronic conditions, and organ transplants.', dur: '31:03', tag: 'free', featured: false, locked: false, video: 'images/vid-5.mp4' },
          { num: '06', title: 'Special Terms & Conditions', desc: 'Ex gratia, second opinions, and the professional judgment behind every decision.', dur: '30:49', tag: 'free', featured: false, locked: false, video: 'images/vid-6.mp4' },
          { num: '07', title: 'Let\'s Practice Before the Exam', desc: 'Apply your knowledge with real-life scenarios and make the right decisions.', dur: '23:53', tag: 'free', featured: false, locked: false, video: 'images/vid-7.mp4' },
        ]
      }
    };

    function lang() {
      return (window.I18N && window.I18N.currentLang) ? window.I18N.currentLang() : 'en';
    }
    function currentModules() {
      return lang() === 'ar' ? modules_ar : modules;
    }

    let progress = {};
    let currentModule = 'preauth';

    function renderModule(id) {
      const m = currentModules()[id];
      if (!m) return;
      currentModule = id;
      let html = `
    <div class="module-header" data-aos="fade-up">
      <div class="module-num">${m.num}</div>
      <div class="module-title">${m.title}</div>
      <p class="module-desc">${m.desc}</p>
      <div class="module-meta">${m.meta.map(x => `<div class="meta-item"><span class="meta-ico">${x.ico}</span><span class="meta-txt">${x.txt}</span></div>`).join('')}</div>
    </div>
  `;
      if (m.exams && m.exams.length) {
        m.exams.forEach((ex, ei) => {
          html += `<div class="exam-track-box" data-aos="fade-up" data-aos-delay="${50 + ei * 50}">
        <div class="exam-left">
          <div class="exam-ico">${ex.ico}</div>
          <div>
            <div class="exam-name">${ex.name}</div>
            <div class="exam-info">${ex.info}</div>
          </div>
        </div>
        <div class="exam-badges">${ex.badges.map(b => `<span class="exam-badge">${b}</span>`).join('')}</div>
        <button class="exam-btn" id="examBtn-${id}" onclick="document.querySelector('.lessons-list').scrollIntoView({behavior:'smooth'})">${lang() === 'ar' ? '← ابدأ المسار' : 'Start track →'}</button>
      </div>`;
        });
        html += `<div class="section-divider"><div class="section-divider-line"></div><span class="section-divider-label">${lang() === 'ar' ? 'جميع الدروس' : 'All lessons'}</span><div class="section-divider-line"></div></div>`;
      }
      html += `<div class="lessons-list">`;
      m.lessons.forEach((l, i) => {
        const tagClass = l.tag === 'free' ? 'tag-free' : l.tag === 'new' ? 'tag-new' : 'tag-pro';
        const tagTxt = l.tag === 'free' ? (lang() === 'ar' ? 'فيديو' : 'Video') : l.tag === 'new' ? (lang() === 'ar' ? 'جديد' : 'New') : (lang() === 'ar' ? 'برو' : 'Pro');
        const isDone = progress[id] && progress[id].has(i);
        html += `
      <div class="lesson-card${l.featured ? ' featured' : ''}${l.locked ? ' locked' : ''}${isDone ? ' done' : ''}" onclick="${l.locked ? `showUpgrade()` : `openLesson(${i},'${id}',this)`}" data-aos="fade-up" data-aos-delay="${Math.min(i, 6) * 50}">
        <div class="lesson-card-inner">
          <div class="lesson-card-num">${l.num}</div>
          <div class="lesson-card-body">
            <div class="lesson-card-title">${l.title}</div>
            <div class="lesson-card-desc">${l.desc}</div>
          </div>
          <div class="lesson-card-right">
            <span class="lesson-dur-tag">${l.dur}</span>
            <span class="lesson-tag ${tagClass}">${tagTxt}</span>
            ${l.locked ? '<span class="lock-ico"><i class="fi fi-sr-lock"></i></span>' : '<span class="lesson-arrow"><i class="fi fi-br-arrow-right"></i></span>'}
          </div>
        </div>
      </div>`;
      });
      html += `</div>`;
      html += `<div class="free-cta" data-aos="fade-up">
    <div>
      <div class="free-cta-txt">${lang() === 'ar' ? 'مستعد لفتح كل شيء؟' : 'Ready to unlock everything?'}</div>
      <div class="free-cta-sub">${lang() === 'ar' ? 'احصل على وصول كامل لجميع الدروس والامتحانات وشهادة التصريح المسبق.' : 'Get full access to all lessons, exams, and your pre-auth certificate.'}</div>
    </div>
    <button class="free-cta-btn">${lang() === 'ar' ? '← ابدأ Pro — 7 أيام مجانًا' : 'Start Pro — 7 days free →'}</button>
  </div>`;
      document.getElementById('contentArea').innerHTML = html;
      updateProgress();
      updateCertButton(id);
      if (window.AOS) AOS.refreshHard();
    }

    function loadModule(id, btn) {
      renderModule(id);
      if (btn) {
        document.querySelectorAll('.mod-tab').forEach(t => t.classList.remove('active-tab'));
        btn.classList.add('active-tab');
      }
    }

    function toggleTrack(el) {
      document.querySelectorAll('.sidebar-track').forEach(t => { if (t !== el) t.classList.remove('active-track') });
      el.classList.toggle('active-track');
    }

    function openLesson(idx, modId, el) {
      const lesson = currentModules()[modId].lessons[idx];
      LessonViewer.open(lesson, () => markDone(idx, modId, el));
    }

    function markDone(idx, modId, el) {
      if (!progress[modId]) progress[modId] = new Set();
      progress[modId].add(idx);
      if (el) el.classList.add('done');
      updateProgress();
      updateCertButton(modId);
      saveProgress();
    }

    function updateCertButton(modId) {
      const m = currentModules()[modId];
      if (!m || !m.exams || !m.exams.length) return;
      const unlockedLessons = m.lessons.filter(l => !l.locked);
      const doneCount = progress[modId] ? progress[modId].size : 0;
      const allDone = unlockedLessons.length > 0 && doneCount >= unlockedLessons.length;
      const btn = document.getElementById('examBtn-' + modId);
      if (!btn) return;
      if (allDone) {
        btn.textContent = lang() === 'ar' ? '← تحميل الشهادة' : 'Download certificate →';
        btn.onclick = () => Certificate.generate(m.exams[0].name);
      } else {
        btn.textContent = lang() === 'ar' ? '← ابدأ المسار' : 'Start track →';
        btn.onclick = () => document.querySelector('.lessons-list').scrollIntoView({ behavior: 'smooth' });
      }
    }

    function saveProgress() {
      const plain = {};
      Object.keys(progress).forEach((k) => { plain[k] = Array.from(progress[k]); });
      localStorage.setItem('ih-radiology-progress', JSON.stringify(plain));
    }

    function loadProgress() {
      try {
        const raw = localStorage.getItem('ih-radiology-progress');
        if (!raw) return;
        const plain = JSON.parse(raw);
        Object.keys(plain).forEach((k) => { progress[k] = new Set(plain[k]); });
      } catch (e) { /* ignore corrupt data */ }
    }

    function updateProgress() {
      let total = 0, done = 0;
      Object.keys(modules).forEach(k => {
        const unlocked = modules[k].lessons.filter(l => !l.locked).length;
        total += unlocked;
        if (progress[k]) done += progress[k].size;
      });
      const pct = total ? Math.round(done / total * 100) : 0;
      document.getElementById('progFill').style.width = pct + '%';
      document.getElementById('progPct').textContent = pct + '%';
      const dots = document.getElementById('progDots');
      dots.innerHTML = Object.keys(modules).map((k, i) => {
        const cls = progress[k] && progress[k].size > 0 ? 'done' : '';
        return `<div class="prog-dot ${cls}" onclick="loadModule('${k}',document.querySelectorAll('.mod-tab')[${i}])"></div>`;
      }).join('');
    }

    function showUpgrade() {
      alert(lang() === 'ar'
        ? '🔒 هذا الدرس جزء من خطة iHealth Academy Pro.\n\nابدأ تجربتك المجانية لمدة 7 أيام لفتح جميع الدروس والمسارات الامتحانية وشهادة التصريح المسبق.'
        : '🔒 This lesson is part of iHealth Academy Pro.\n\nStart your 7-day free trial to unlock all lessons, exam tracks, and your pre-auth certificate.');
    }

    loadProgress();
    renderModule('preauth');
    document.addEventListener('ih:langchange', () => renderModule(currentModule));

    AOS.init({
      duration: 700,
      easing: 'ease',
      once: true,
      offset: 80
    });
