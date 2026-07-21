    window.I18N_PAGE_DICT = {
      'rad.tag': { en: 'Provider — Radiology department', ar: 'مقدم الخدمة — قسم الأشعة' },
      'rad.h1': { en: 'Radiology.<br><span>Done right.</span>', ar: 'الأشعة.<br><span>بالطريقة الصحيحة.</span>' },
      'rad.desc': { en: 'Everything a radiologist needs — from your first scan to passing your board exam to writing pre-auth requests that never get rejected. Structured. Practical. Built from 7 years of real experience.', ar: 'كل ما يحتاجه أخصائي الأشعة — من أول فحص إلى اجتياز اختبار البورد إلى كتابة طلبات تصريح مسبق لا تُرفض أبدًا. منظم وعملي، ومبني على 7 سنوات من الخبرة الحقيقية.' },
      'rad.stat1': { en: 'Learning tracks', ar: 'مسارات تعليمية' },
      'rad.stat2': { en: 'Lessons', ar: 'دروس' },
      'rad.stat3': { en: 'Exam tracks', ar: 'مسارات امتحانات' },
      'rad.stat4val': { en: 'Free', ar: 'مجاني' },
      'rad.stat4': { en: 'To start', ar: 'للبدء' },
      'rad.anatomyBtn': { en: '🩻 Try Anatomy Spotting — timed mock test <i class="fi fi-rr-arrow-small-right"></i>', ar: '🩻 جرّب تحديد التشريح — اختبار تجريبي محدد بوقت <i class="fi fi-rr-arrow-small-left"></i>' },
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

    // Shared 7-video course, reused identically across every module tab.
    const VIDEO_LESSONS = [
      { num: '01', title: 'What is the Medical Insurance?', desc: 'The core definitions and terms every specialist must know cold.', dur: '37:05', tag: 'free', featured: true, locked: false, video: 'images/medical-approval-specialist-1.mp4' },
      { num: '02', title: 'General Overview', desc: 'How patients, providers, insurers, and regulators all connect in one claim.', dur: '10:47', tag: 'free', featured: false, locked: false, video: 'images/medical-approval-specialist-2.mp4' },
      { num: '03', title: 'Health Questionnaire', desc: 'Disclosure rules, investigation standards, and what genuinely requires declaration.', dur: '26:18', tag: 'free', featured: false, locked: false, video: 'images/medical-approval-specialist-3.mp4' },
      { num: '04', title: 'CHI Exclusion Items', desc: "What's excluded, and the difference between reject and refer.", dur: '39:22', tag: 'free', featured: false, locked: false, video: 'images/medical-approval-specialist-4.mp4' },
      // 05 and 06 (CHI Inclusion Items & Coverage, Special Terms) are pending final videos — re-add once provided.
      { num: '07', title: "Let's Practice Before the Exam", desc: 'Apply what you learned with real-life scenarios before sitting the exam.', dur: '23:53', tag: 'free', featured: false, locked: false, video: 'images/medical-approval-specialist-7.mov' },
    ];
    const VIDEO_LESSONS_AR = [
      { num: '01', title: 'ما هو التأمين الطبي؟', desc: 'التعريفات والمصطلحات الأساسية التي يجب أن يعرفها كل أخصائي جيدًا.', dur: '37:05', tag: 'free', featured: true, locked: false, video: 'images/medical-approval-specialist-1.mp4' },
      { num: '02', title: 'نظرة عامة', desc: 'كيف يرتبط المريض ومقدم الخدمة وشركة التأمين والجهة الرقابية في مطالبة واحدة.', dur: '10:47', tag: 'free', featured: false, locked: false, video: 'images/medical-approval-specialist-2.mp4' },
      { num: '03', title: 'الاستبيان الصحي', desc: 'قواعد الإفصاح، ومعايير التحقيق، وما يستوجب التصريح فعليًا.', dur: '26:18', tag: 'free', featured: false, locked: false, video: 'images/medical-approval-specialist-3.mp4' },
      { num: '04', title: 'بنود استثناء CHI', desc: 'ما هو مستثنى، والفرق بين الرفض والإحالة.', dur: '39:22', tag: 'free', featured: false, locked: false, video: 'images/medical-approval-specialist-4.mp4' },
      // 05 and 06 (بنود التغطية والشمول في CHI، الشروط الخاصة) are pending final videos — re-add once provided.
      { num: '07', title: 'لنتدرب قبل الامتحان', desc: 'طبّق ما تعلمته من خلال سيناريوهات واقعية قبل دخول الامتحان.', dur: '23:53', tag: 'free', featured: false, locked: false, video: 'images/medical-approval-specialist-7.mov' },
    ];

    const modules = {
      foundations: {
        num: 'Module 01',
        title: 'Radiology foundations — start here.',
        desc: 'Before anything else, you need to understand what radiology is, how each imaging modality works, and when to use which. These lessons are written for everyone — from medical students to senior residents who want to fill in the gaps.',
        meta: [{ ico: '<i class="fi fi-sr-alarm-clock"></i>', txt: '~57 min total' }, { ico: '<i class="fi fi-sr-user-graduate"></i>', txt: 'All levels' }, { ico: '<i class="fi fi-sr-lock-open-alt"></i>', txt: 'Free to access' }],
        exams: [],
        lessons: VIDEO_LESSONS
      },
      reports: {
        num: 'Module 03',
        title: 'Report writing — your voice as a radiologist.',
        desc: 'A radiology report is a medical-legal document. Every word matters. This module teaches you to write reports that are clear, clinically useful, and impossible to misinterpret. Based on real cases and international standards.',
        meta: [{ ico: '<i class="fi fi-sr-alarm-clock"></i>', txt: '~43 min total' }, { ico: '<i class="fi fi-sr-graduation-cap"></i>', txt: 'R1 and above' }, { ico: '<i class="fi fi-sr-comet"></i>', txt: 'High impact' }],
        exams: [],
        lessons: VIDEO_LESSONS
      },
      exams: {
        num: 'Module 05',
        title: 'Exam preparation — pass on your first attempt.',
        desc: 'Structured study plans for every major radiology board exam. Not just question banks — actual strategies, timelines, and the specific topics that appear most in each exam. Built for people with real clinical workloads.',
        meta: [{ ico: '<i class="fi fi-sr-alarm-clock"></i>', txt: '~90 min total' }, { ico: '<i class="fi fi-sr-graduation-cap"></i>', txt: 'R2 and above' }, { ico: '<i class="fi fi-sr-track"></i>', txt: '5 exam tracks' }],
        exams: [
          { ico: '<img src="images/uk.webp" alt="UK">', name: 'FRCR Part 1 & 2B', info: 'UK Royal College — most internationally recognized', badges: ['Physics', 'Anatomy', 'Rapid reporting'] },
          { ico: '🌍', name: 'Arab Board of Radiology', info: 'Arab countries — structured written & clinical', badges: ['Written exam', 'Clinical cases', 'Oral prep'] },
          { ico: '<img src="images/saudi.jpg" alt="Saudi Arabia">', name: 'Saudi Board', info: 'Saudi Arabia — full residency board exam', badges: ['All modalities', 'Case-based', 'Viva prep'] },
          { ico: '<img src="images/us.webp" alt="United States">', name: 'ABR — American Board', info: 'For those targeting the United States', badges: ['Core exam', 'Certifying exam', 'Physics'] },
        ],
        lessons: VIDEO_LESSONS
      },
      systems: {
        num: 'Module 02',
        title: 'Systems & technology — what every radiologist must know.',
        desc: 'RIS, PACS, NPHIES, and AI tools are part of your daily work. This module explains what each system does, how they connect, and how to use them efficiently.',
        meta: [{ ico: '<i class="fi fi-sr-alarm-clock"></i>', txt: '~30 min total' }, { ico: '<i class="fi fi-sr-graduation-cap"></i>', txt: 'All levels' }, { ico: '<i class="fi fi-sr-calendar"></i>', txt: 'Updated 2026' }],
        exams: [],
        lessons: VIDEO_LESSONS
      },
      research: {
        num: 'Module 04',
        title: 'Research basics — build your academic profile.',
        desc: 'Research is not just for professors. Every level of training benefits from understanding how to read studies, write case reports, and contribute to the literature. This module makes it practical and achievable.',
        meta: [{ ico: '<i class="fi fi-sr-alarm-clock"></i>', txt: '~52 min total' }, { ico: '<i class="fi fi-sr-graduation-cap"></i>', txt: 'All levels' }, { ico: '<i class="fi fi-sr-train-track"></i>', txt: 'Academic track' }],
        exams: [],
        lessons: VIDEO_LESSONS
      }
    };

    // Arabic mirror of `modules` — same shape/order, translated strings only.
    const modules_ar = {
      foundations: {
        num: 'الوحدة 01',
        title: 'أساسيات الأشعة — ابدأ من هنا.',
        desc: 'قبل أي شيء آخر، تحتاج إلى فهم ما هي الأشعة، وكيف تعمل كل وسيلة تصوير، ومتى تُستخدم كل منها. هذه الدروس مكتوبة للجميع — من طلاب الطب إلى الأطباء المقيمين المتقدمين الذين يريدون سد الثغرات.',
        meta: [{ ico: '<i class="fi fi-sr-alarm-clock"></i>', txt: '~57 دقيقة إجمالاً' }, { ico: '<i class="fi fi-sr-user-graduate"></i>', txt: 'جميع المستويات' }, { ico: '<i class="fi fi-sr-lock-open-alt"></i>', txt: 'مجاني الوصول' }],
        exams: [],
        lessons: VIDEO_LESSONS_AR
      },
      reports: {
        num: 'الوحدة 03',
        title: 'كتابة التقارير — صوتك كأخصائي أشعة.',
        desc: 'تقرير الأشعة هو وثيقة طبية-قانونية. كل كلمة مهمة. تُعلّمك هذه الوحدة كتابة تقارير واضحة ومفيدة سريريًا ولا يمكن إساءة تفسيرها. مبنية على حالات حقيقية ومعايير دولية.',
        meta: [{ ico: '<i class="fi fi-sr-alarm-clock"></i>', txt: '~43 دقيقة إجمالاً' }, { ico: '<i class="fi fi-sr-graduation-cap"></i>', txt: 'من مستوى R1 وما فوق' }, { ico: '<i class="fi fi-sr-comet"></i>', txt: 'تأثير عالٍ' }],
        exams: [],
        lessons: VIDEO_LESSONS_AR
      },
      exams: {
        num: 'الوحدة 05',
        title: 'التحضير للامتحانات — انجح من المحاولة الأولى.',
        desc: 'خطط دراسية منظمة لكل امتحان بورد رئيسي في الأشعة. ليست مجرد بنوك أسئلة — بل استراتيجيات فعلية وجداول زمنية والمواضيع المحددة الأكثر ظهورًا في كل امتحان. مُصممة لأصحاب أعباء العمل السريري الحقيقية.',
        meta: [{ ico: '<i class="fi fi-sr-alarm-clock"></i>', txt: '~90 دقيقة إجمالاً' }, { ico: '<i class="fi fi-sr-graduation-cap"></i>', txt: 'من مستوى R2 وما فوق' }, { ico: '<i class="fi fi-sr-track"></i>', txt: '5 مسارات امتحانات' }],
        exams: [
          { ico: '<img src="images/uk.webp" alt="UK">', name: 'FRCR Part 1 & 2B', info: 'الكلية الملكية البريطانية — الأكثر اعتمادًا دوليًا', badges: ['الفيزياء', 'التشريح', 'التقارير السريعة'] },
          { ico: '🌍', name: 'البورد العربي للأشعة', info: 'الدول العربية — امتحان تحريري وسريري منظم', badges: ['امتحان تحريري', 'حالات سريرية', 'تحضير شفوي'] },
          { ico: '<img src="images/saudi.jpg" alt="Saudi Arabia">', name: 'البورد السعودي', info: 'المملكة العربية السعودية — امتحان بورد الإقامة الكامل', badges: ['جميع الوسائل', 'قائم على الحالات', 'تحضير للمناقشة الشفوية'] },
          { ico: '<img src="images/us.webp" alt="United States">', name: 'ABR — البورد الأمريكي', info: 'لمن يستهدف الولايات المتحدة الأمريكية', badges: ['الامتحان الأساسي', 'امتحان الشهادة', 'الفيزياء'] },
        ],
        lessons: VIDEO_LESSONS_AR
      },
      systems: {
        num: 'الوحدة 02',
        title: 'الأنظمة والتقنية — ما يجب أن يعرفه كل أخصائي أشعة.',
        desc: 'RIS و PACS و NPHIES وأدوات الذكاء الاصطناعي جزء من عملك اليومي. تشرح هذه الوحدة وظيفة كل نظام، وكيفية ارتباطها ببعضها، وكيفية استخدامها بكفاءة.',
        meta: [{ ico: '<i class="fi fi-sr-alarm-clock"></i>', txt: '~30 دقيقة إجمالاً' }, { ico: '<i class="fi fi-sr-graduation-cap"></i>', txt: 'جميع المستويات' }, { ico: '<i class="fi fi-sr-calendar"></i>', txt: 'مُحدَّث 2026' }],
        exams: [],
        lessons: VIDEO_LESSONS_AR
      },
      research: {
        num: 'الوحدة 04',
        title: 'أساسيات البحث العلمي — بناء ملفك الأكاديمي.',
        desc: 'البحث العلمي ليس للأساتذة فقط. تستفيد كل مستويات التدريب من فهم كيفية قراءة الدراسات، وكتابة تقارير الحالات، والمساهمة في الأدبيات الطبية. تجعل هذه الوحدة ذلك عمليًا وقابلاً للتحقيق.',
        meta: [{ ico: '<i class="fi fi-sr-alarm-clock"></i>', txt: '~52 دقيقة إجمالاً' }, { ico: '<i class="fi fi-sr-graduation-cap"></i>', txt: 'جميع المستويات' }, { ico: '<i class="fi fi-sr-train-track"></i>', txt: 'المسار الأكاديمي' }],
        exams: [],
        lessons: VIDEO_LESSONS_AR
      }
    };

    function lang() {
      return (window.I18N && window.I18N.currentLang) ? window.I18N.currentLang() : 'en';
    }
    function currentModules() {
      return lang() === 'ar' ? modules_ar : modules;
    }

    let progress = {};
    let currentModule = 'foundations';

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
        <button class="exam-btn" id="examBtn-${id}" onclick="document.querySelector('.lessons-list').scrollIntoView({behavior:'smooth'})">${lang() === 'ar' ? '<i class="fi fi-rr-arrow-small-left"></i> ابدأ المسار' : 'Start track <i class="fi fi-rr-arrow-small-right"></i>'}</button>
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
    <button class="free-cta-btn">${lang() === 'ar' ? '<i class="fi fi-rr-arrow-small-left"></i> ابدأ Pro — 7 أيام مجانًا' : 'Start Pro — 7 days free <i class="fi fi-rr-arrow-small-right"></i>'}</button>
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
        btn.innerHTML = lang() === 'ar' ? '<i class="fi fi-rr-arrow-small-left"></i> تحميل الشهادة' : 'Download certificate <i class="fi fi-rr-arrow-small-right"></i>';
        btn.onclick = () => Certificate.generate(m.exams[0].name);
      } else {
        btn.innerHTML = lang() === 'ar' ? '<i class="fi fi-rr-arrow-small-left"></i> ابدأ المسار' : 'Start track <i class="fi fi-rr-arrow-small-right"></i>';
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
    renderModule('foundations');
    document.addEventListener('ih:langchange', () => renderModule(currentModule));

    AOS.init({
      duration: 700,
      easing: 'ease',
      once: true,
      offset: 80
    });
