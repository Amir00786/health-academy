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
      foundations: {
        num: 'Module 01',
        title: 'Radiology foundations — start here.',
        desc: 'Before anything else, you need to understand what radiology is, how each imaging modality works, and when to use which. These lessons are written for everyone — from medical students to senior residents who want to fill in the gaps.',
        meta: [{ ico: '<i class="fi fi-sr-alarm-clock"></i>', txt: '~57 min total' }, { ico: '<i class="fi fi-sr-user-graduate"></i>', txt: 'All levels' }, { ico: '<i class="fi fi-sr-lock-open-alt"></i>', txt: 'Free to access' }],
        exams: [],
        lessons: [
          { num: '01', title: 'What is radiology?', desc: 'The role of the radiologist in modern medicine — clinical, administrative, and consultative.', dur: '5 min', tag: 'free', featured: true, locked: false,
            quiz: [
              { q: 'A radiologist\'s role is best described as:', options: ['Purely administrative', 'Clinical, administrative, and consultative', 'Only performing surgery'], correct: 1 },
              { q: 'Radiology sits at the center of modern medicine mainly because it:', options: ['Informs diagnosis and treatment decisions across specialties', 'Replaces the need for physical exams', 'Is only used in emergencies'], correct: 0 },
            ] },
          { num: '02', title: 'How imaging works', desc: 'The physics behind every modality — explained simply without heavy math.', dur: '8 min', tag: 'free', featured: false, locked: false,
            quiz: [
              { q: 'Different imaging modalities (X-ray, CT, MRI, ultrasound) mainly differ by:', options: ['The physical principle used to create the image', 'The color of the machine', 'The size of the hospital'], correct: 0 },
              { q: 'Understanding the physics behind imaging helps a radiologist:', options: ['Choose the right modality and interpret images correctly', 'Skip clinical training', 'Avoid talking to referring doctors'], correct: 0 },
            ] },
          { num: '03', title: 'X-ray — the foundation of everything', desc: 'How X-rays are produced, what they show, and how to read a chest X-ray step by step.', dur: '10 min', tag: 'free', featured: false, locked: false,
            quiz: [
              { q: 'X-ray is often called the foundation of imaging because it is:', options: ['The oldest and most widely used modality', 'Never used anymore', 'Only used for bones'], correct: 0 },
              { q: 'Reading a chest X-ray step by step means:', options: ['Following a consistent, systematic review pattern', 'Guessing based on the first thing you notice', 'Only checking the corners of the image'], correct: 0 },
            ] },
          { num: '04', title: 'CT scan — when and how', desc: 'How CT works, why it is requested, and what the numbers mean.', dur: '12 min', tag: 'pro', featured: false, locked: true },
          { num: '05', title: 'MRI — the most powerful tool', desc: 'When MRI beats CT, sequences explained, and how to avoid common mistakes.', dur: '12 min', tag: 'pro', featured: false, locked: true },
          { num: '06', title: 'Ultrasound & nuclear medicine', desc: 'The role of US and nuclear in modern practice — including PET/CT basics.', dur: '10 min', tag: 'pro', featured: false, locked: true },
        ]
      },
      reports: {
        num: 'Module 02',
        title: 'Report writing — your voice as a radiologist.',
        desc: 'A radiology report is a medical-legal document. Every word matters. This module teaches you to write reports that are clear, clinically useful, and impossible to misinterpret. Based on real cases and international standards.',
        meta: [{ ico: '<i class="fi fi-sr-alarm-clock"></i>', txt: '~43 min total' }, { ico: '<i class="fi fi-sr-graduation-cap"></i>', txt: 'R1 and above' }, { ico: '<i class="fi fi-sr-comet"></i>', txt: 'High impact' }],
        exams: [],
        lessons: [
          { num: '01', title: 'Structure of a good report', desc: 'The four parts every radiology report must have — and why most reports fail at part three.', dur: '10 min', tag: 'free', featured: true, locked: false,
            quiz: [
              { q: 'A radiology report is best described as:', options: ['A casual note', 'A medical-legal document', 'An optional summary'], correct: 1 },
              { q: 'Most weak reports fail specifically at:', options: ['The findings/impression section', 'The patient name field', 'The date field'], correct: 0 },
            ] },
          { num: '02', title: 'Language & clarity', desc: 'How to write so the referring doctor understands — and takes action.', dur: '8 min', tag: 'free', featured: false, locked: false,
            quiz: [
              { q: 'The main goal of clear report language is to:', options: ['Impress other radiologists', 'Help the referring doctor understand and act', 'Use as much medical jargon as possible'], correct: 1 },
              { q: 'A report that is technically correct but confusing is:', options: ['Still a good report', 'Not clinically useful', 'Always the referring doctor\'s fault'], correct: 1 },
            ] },
          { num: '03', title: 'Describing common findings', desc: 'Standard language for the 20 most common findings in chest, abdomen, and brain.', dur: '15 min', tag: 'pro', featured: false, locked: true },
          { num: '04', title: 'Critical findings & communication', desc: 'What to do when you find something urgent — legally, clinically, and practically.', dur: '10 min', tag: 'pro', featured: false, locked: true },
        ]
      },
      exams: {
        num: 'Module 04',
        title: 'Exam preparation — pass on your first attempt.',
        desc: 'Structured study plans for every major radiology board exam. Not just question banks — actual strategies, timelines, and the specific topics that appear most in each exam. Built for people with real clinical workloads.',
        meta: [{ ico: '<i class="fi fi-sr-alarm-clock"></i>', txt: '~90 min total' }, { ico: '<i class="fi fi-sr-graduation-cap"></i>', txt: 'R2 and above' }, { ico: '<i class="fi fi-sr-track"></i>', txt: '5 exam tracks' }],
        exams: [
          { ico: '<img src="images/uk.webp" alt="UK">', name: 'FRCR Part 1 & 2B', info: 'UK Royal College — most internationally recognized', badges: ['Physics', 'Anatomy', 'Rapid reporting'] },
          { ico: '🌍', name: 'Arab Board of Radiology', info: 'Arab countries — structured written & clinical', badges: ['Written exam', 'Clinical cases', 'Oral prep'] },
          { ico: '<img src="images/saudi.jpg" alt="Saudi Arabia">', name: 'Saudi Board', info: 'Saudi Arabia — full residency board exam', badges: ['All modalities', 'Case-based', 'Viva prep'] },
          { ico: '<img src="images/us.webp" alt="United States">', name: 'ABR — American Board', info: 'For those targeting the United States', badges: ['Core exam', 'Certifying exam', 'Physics'] },
        ],
        lessons: [
          { num: '01', title: 'FRCR Part 1 — the complete study plan', desc: 'Physics, anatomy, and how to pass in 90 days with a full-time clinical schedule.', dur: '20 min', tag: 'pro', featured: true, locked: true },
          { num: '02', title: 'FRCR Part 2B — rapid reporting mastered', desc: 'The technique, the common cases, and how to avoid the most common mistakes.', dur: '25 min', tag: 'pro', featured: false, locked: true },
          { num: '03', title: 'Arab Board — structure and strategy', desc: 'What the exam tests, how to prepare, and what most candidates get wrong.', dur: '15 min', tag: 'pro', featured: false, locked: true },
          { num: '04', title: 'Saudi Board — the complete guide', desc: 'All modalities, case formats, viva preparation, and the topics that repeat every year.', dur: '15 min', tag: 'pro', featured: false, locked: true },
          { num: '05', title: 'ABR — for those targeting the United States', desc: 'Core exam structure, certifying exam strategy, and physics review.', dur: '15 min', tag: 'pro', featured: false, locked: true },
        ]
      },
      systems: {
        num: 'Module 05',
        title: 'Systems & technology — what every radiologist must know.',
        desc: 'RIS, PACS, NPHIES, and AI tools are part of your daily work. This module explains what each system does, how they connect, and how to use them efficiently.',
        meta: [{ ico: '<i class="fi fi-sr-alarm-clock"></i>', txt: '~30 min total' }, { ico: '<i class="fi fi-sr-graduation-cap"></i>', txt: 'All levels' }, { ico: '<i class="fi fi-sr-calendar"></i>', txt: 'Updated 2026' }],
        exams: [],
        lessons: [
          { num: '01', title: 'RIS & PACS — what they do and why they matter', desc: 'The two systems behind every scan — from order entry to report delivery.', dur: '8 min', tag: 'free', featured: false, locked: false,
            quiz: [
              { q: 'RIS and PACS together handle:', options: ['Order entry through report/image delivery', 'Only billing', 'Only patient parking'], correct: 0 },
              { q: 'Knowing these systems well helps a radiologist:', options: ['Work more efficiently day to day', 'Avoid learning imaging physics', 'Skip writing reports'], correct: 0 },
            ] },
          { num: '02', title: 'NPHIES for radiologists', desc: 'Saudi Arabia\'s national health data platform — what you must know to submit correctly.', dur: '10 min', tag: 'free', featured: true, locked: false,
            quiz: [
              { q: 'NPHIES is:', options: ['Saudi Arabia\'s national health data exchange platform', 'A private imaging brand', 'An international exam board'], correct: 0 },
              { q: 'Submitting correctly through NPHIES mainly affects:', options: ['Claims and pre-auth processing', 'Image resolution', 'Report font size'], correct: 0 },
            ] },
          { num: '03', title: 'AI tools in radiology today', desc: 'What AI is actually doing in radiology right now — triage, detection, and reporting.', dur: '12 min', tag: 'pro', featured: false, locked: true },
        ]
      },
      research: {
        num: 'Module 06',
        title: 'Research basics — build your academic profile.',
        desc: 'Research is not just for professors. Every level of training benefits from understanding how to read studies, write case reports, and contribute to the literature. This module makes it practical and achievable.',
        meta: [{ ico: '<i class="fi fi-sr-alarm-clock"></i>', txt: '~52 min total' }, { ico: '<i class="fi fi-sr-graduation-cap"></i>', txt: 'All levels' }, { ico: '<i class="fi fi-sr-train-track"></i>', txt: 'Academic track' }],
        exams: [],
        lessons: [
          { num: '01', title: 'How to read a radiology study', desc: 'The five questions to ask before trusting any paper. Critical appraisal made simple.', dur: '12 min', tag: 'free', featured: true, locked: false,
            quiz: [
              { q: 'Critical appraisal of a study means:', options: ['Judging its methods before trusting its conclusions', 'Accepting every published paper as fact', 'Only reading the abstract'], correct: 0 },
              { q: 'Asking structured questions before trusting a paper helps you:', options: ['Avoid basing decisions on weak evidence', 'Read faster with no comprehension', 'Skip the discussion section entirely'], correct: 0 },
            ] },
          { num: '02', title: 'Writing your first case report', desc: 'Structure, language, and where to submit. Everything you need to publish your first paper.', dur: '15 min', tag: 'free', featured: false, locked: false,
            quiz: [
              { q: 'A case report is typically written to:', options: ['Describe an unusual or instructive clinical case', 'Replace a full research study', 'Avoid peer review'], correct: 0 },
              { q: 'Before submitting a case report you should:', options: ['Follow the target journal\'s structure and guidelines', 'Ignore formatting requirements', 'Submit to as many journals at once as possible'], correct: 0 },
            ] },
          { num: '03', title: 'Evidence-based radiology in practice', desc: 'How to find, evaluate, and apply the best evidence to clinical decisions.', dur: '10 min', tag: 'pro', featured: false, locked: true },
          { num: '04', title: 'Publishing your first paper — a step by step guide', desc: 'From idea to acceptance. Journal selection, submission, and responding to reviewers.', dur: '15 min', tag: 'pro', featured: false, locked: true },
        ]
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
        lessons: [
          { num: '01', title: 'ما هي الأشعة؟', desc: 'دور أخصائي الأشعة في الطب الحديث — سريريًا وإداريًا واستشاريًا.', dur: '5 دقائق', tag: 'free', featured: true, locked: false,
            quiz: [
              { q: 'يمكن وصف دور أخصائي الأشعة بأنه:', options: ['إداري بحت', 'سريري وإداري واستشاري', 'إجراء العمليات الجراحية فقط'], correct: 1 },
              { q: 'تحتل الأشعة مكانة محورية في الطب الحديث بشكل أساسي لأنها:', options: ['توجه قرارات التشخيص والعلاج في جميع التخصصات', 'تحل محل الحاجة للفحص السريري', 'تُستخدم فقط في الحالات الطارئة'], correct: 0 },
            ] },
          { num: '02', title: 'كيف يعمل التصوير الطبي', desc: 'الفيزياء الكامنة خلف كل وسيلة تصوير — موضحة ببساطة دون رياضيات معقدة.', dur: '8 دقائق', tag: 'free', featured: false, locked: false,
            quiz: [
              { q: 'تختلف وسائل التصوير المختلفة (الأشعة السينية، التصوير المقطعي، الرنين المغناطيسي، الموجات فوق الصوتية) بشكل أساسي في:', options: ['المبدأ الفيزيائي المستخدم لتكوين الصورة', 'لون الجهاز', 'حجم المستشفى'], correct: 0 },
              { q: 'فهم الفيزياء الكامنة خلف التصوير يساعد أخصائي الأشعة على:', options: ['اختيار الوسيلة المناسبة وتفسير الصور بشكل صحيح', 'تجاوز التدريب السريري', 'تجنب التحدث مع الأطباء المحوِّلين'], correct: 0 },
            ] },
          { num: '03', title: 'الأشعة السينية — أساس كل شيء', desc: 'كيف تُنتج الأشعة السينية، وماذا تُظهر، وكيفية قراءة صورة أشعة الصدر خطوة بخطوة.', dur: '10 دقائق', tag: 'free', featured: false, locked: false,
            quiz: [
              { q: 'غالبًا ما تُسمى الأشعة السينية أساس التصوير لأنها:', options: ['أقدم وأكثر الوسائل استخدامًا', 'لم تعد تُستخدم أبدًا', 'تُستخدم فقط للعظام'], correct: 0 },
              { q: 'قراءة صورة أشعة الصدر خطوة بخطوة تعني:', options: ['اتباع نمط مراجعة منظم وثابت', 'التخمين بناءً على أول ما تلاحظه', 'فحص زوايا الصورة فقط'], correct: 0 },
            ] },
          { num: '04', title: 'التصوير المقطعي — متى وكيف', desc: 'كيف يعمل التصوير المقطعي، ولماذا يُطلب، وماذا تعني الأرقام.', dur: '12 دقيقة', tag: 'pro', featured: false, locked: true },
          { num: '05', title: 'الرنين المغناطيسي — الأداة الأقوى', desc: 'متى يتفوق الرنين المغناطيسي على التصوير المقطعي، وشرح التسلسلات، وكيفية تجنب الأخطاء الشائعة.', dur: '12 دقيقة', tag: 'pro', featured: false, locked: true },
          { num: '06', title: 'الموجات فوق الصوتية والطب النووي', desc: 'دور الموجات فوق الصوتية والطب النووي في الممارسة الحديثة — بما في ذلك أساسيات PET/CT.', dur: '10 دقائق', tag: 'pro', featured: false, locked: true },
        ]
      },
      reports: {
        num: 'الوحدة 02',
        title: 'كتابة التقارير — صوتك كأخصائي أشعة.',
        desc: 'تقرير الأشعة هو وثيقة طبية-قانونية. كل كلمة مهمة. تُعلّمك هذه الوحدة كتابة تقارير واضحة ومفيدة سريريًا ولا يمكن إساءة تفسيرها. مبنية على حالات حقيقية ومعايير دولية.',
        meta: [{ ico: '<i class="fi fi-sr-alarm-clock"></i>', txt: '~43 دقيقة إجمالاً' }, { ico: '<i class="fi fi-sr-graduation-cap"></i>', txt: 'من مستوى R1 وما فوق' }, { ico: '<i class="fi fi-sr-comet"></i>', txt: 'تأثير عالٍ' }],
        exams: [],
        lessons: [
          { num: '01', title: 'بنية التقرير الجيد', desc: 'الأجزاء الأربعة التي يجب أن يحتويها كل تقرير أشعة — ولماذا تفشل معظم التقارير في الجزء الثالث.', dur: '10 دقائق', tag: 'free', featured: true, locked: false,
            quiz: [
              { q: 'يمكن وصف تقرير الأشعة بأنه:', options: ['ملاحظة عابرة', 'وثيقة طبية-قانونية', 'ملخص اختياري'], correct: 1 },
              { q: 'تفشل معظم التقارير الضعيفة بشكل خاص في:', options: ['قسم النتائج/الانطباع', 'حقل اسم المريض', 'حقل التاريخ'], correct: 0 },
            ] },
          { num: '02', title: 'اللغة والوضوح', desc: 'كيف تكتب بطريقة يفهمها الطبيب المحوِّل — ويتخذ إجراءً بناءً عليها.', dur: '8 دقائق', tag: 'free', featured: false, locked: false,
            quiz: [
              { q: 'الهدف الأساسي من لغة التقرير الواضحة هو:', options: ['إثارة إعجاب أخصائيي الأشعة الآخرين', 'مساعدة الطبيب المحوِّل على الفهم والتصرف', 'استخدام أكبر قدر ممكن من المصطلحات الطبية المعقدة'], correct: 1 },
              { q: 'التقرير الصحيح تقنيًا ولكن المُربك يُعتبر:', options: ['لا يزال تقريرًا جيدًا', 'غير مفيد سريريًا', 'خطأ الطبيب المحوِّل دائمًا'], correct: 1 },
            ] },
          { num: '03', title: 'وصف النتائج الشائعة', desc: 'لغة موحدة لأكثر 20 نتيجة شائعة في الصدر والبطن والدماغ.', dur: '15 دقيقة', tag: 'pro', featured: false, locked: true },
          { num: '04', title: 'النتائج الحرجة والتواصل', desc: 'ما يجب فعله عند اكتشاف أمر عاجل — قانونيًا وسريريًا وعمليًا.', dur: '10 دقائق', tag: 'pro', featured: false, locked: true },
        ]
      },
      exams: {
        num: 'الوحدة 04',
        title: 'التحضير للامتحانات — انجح من المحاولة الأولى.',
        desc: 'خطط دراسية منظمة لكل امتحان بورد رئيسي في الأشعة. ليست مجرد بنوك أسئلة — بل استراتيجيات فعلية وجداول زمنية والمواضيع المحددة الأكثر ظهورًا في كل امتحان. مُصممة لأصحاب أعباء العمل السريري الحقيقية.',
        meta: [{ ico: '<i class="fi fi-sr-alarm-clock"></i>', txt: '~90 دقيقة إجمالاً' }, { ico: '<i class="fi fi-sr-graduation-cap"></i>', txt: 'من مستوى R2 وما فوق' }, { ico: '<i class="fi fi-sr-track"></i>', txt: '5 مسارات امتحانات' }],
        exams: [
          { ico: '<img src="images/uk.webp" alt="UK">', name: 'FRCR Part 1 & 2B', info: 'الكلية الملكية البريطانية — الأكثر اعتمادًا دوليًا', badges: ['الفيزياء', 'التشريح', 'التقارير السريعة'] },
          { ico: '🌍', name: 'البورد العربي للأشعة', info: 'الدول العربية — امتحان تحريري وسريري منظم', badges: ['امتحان تحريري', 'حالات سريرية', 'تحضير شفوي'] },
          { ico: '<img src="images/saudi.jpg" alt="Saudi Arabia">', name: 'البورد السعودي', info: 'المملكة العربية السعودية — امتحان بورد الإقامة الكامل', badges: ['جميع الوسائل', 'قائم على الحالات', 'تحضير للمناقشة الشفوية'] },
          { ico: '<img src="images/us.webp" alt="United States">', name: 'ABR — البورد الأمريكي', info: 'لمن يستهدف الولايات المتحدة الأمريكية', badges: ['الامتحان الأساسي', 'امتحان الشهادة', 'الفيزياء'] },
        ],
        lessons: [
          { num: '01', title: 'FRCR الجزء 1 — خطة الدراسة الكاملة', desc: 'الفيزياء والتشريح وكيفية النجاح في 90 يومًا مع جدول عمل سريري كامل.', dur: '20 دقيقة', tag: 'pro', featured: true, locked: true },
          { num: '02', title: 'FRCR الجزء 2B — احتراف التقارير السريعة', desc: 'التقنية، الحالات الشائعة، وكيفية تجنب الأخطاء الأكثر شيوعًا.', dur: '25 دقيقة', tag: 'pro', featured: false, locked: true },
          { num: '03', title: 'البورد العربي — البنية والاستراتيجية', desc: 'ما يختبره الامتحان، وكيفية التحضير، وأكثر الأخطاء شيوعًا بين المتقدمين.', dur: '15 دقيقة', tag: 'pro', featured: false, locked: true },
          { num: '04', title: 'البورد السعودي — الدليل الكامل', desc: 'جميع الوسائل، صيغ الحالات، التحضير للمناقشة الشفوية، والمواضيع المتكررة كل عام.', dur: '15 دقيقة', tag: 'pro', featured: false, locked: true },
          { num: '05', title: 'ABR — لمن يستهدف الولايات المتحدة الأمريكية', desc: 'بنية الامتحان الأساسي، استراتيجية امتحان الشهادة، ومراجعة الفيزياء.', dur: '15 دقيقة', tag: 'pro', featured: false, locked: true },
        ]
      },
      systems: {
        num: 'الوحدة 05',
        title: 'الأنظمة والتقنية — ما يجب أن يعرفه كل أخصائي أشعة.',
        desc: 'RIS و PACS و NPHIES وأدوات الذكاء الاصطناعي جزء من عملك اليومي. تشرح هذه الوحدة وظيفة كل نظام، وكيفية ارتباطها ببعضها، وكيفية استخدامها بكفاءة.',
        meta: [{ ico: '<i class="fi fi-sr-alarm-clock"></i>', txt: '~30 دقيقة إجمالاً' }, { ico: '<i class="fi fi-sr-graduation-cap"></i>', txt: 'جميع المستويات' }, { ico: '<i class="fi fi-sr-calendar"></i>', txt: 'مُحدَّث 2026' }],
        exams: [],
        lessons: [
          { num: '01', title: 'RIS و PACS — ماذا تفعل ولماذا هي مهمة', desc: 'النظامان الكامنان خلف كل فحص — من إدخال الطلب إلى تسليم التقرير.', dur: '8 دقائق', tag: 'free', featured: false, locked: false,
            quiz: [
              { q: 'يتعامل RIS و PACS معًا مع:', options: ['من إدخال الطلب حتى تسليم التقرير/الصورة', 'الفوترة فقط', 'مواقف انتظار المرضى فقط'], correct: 0 },
              { q: 'معرفة هذه الأنظمة جيدًا تساعد أخصائي الأشعة على:', options: ['العمل بكفاءة أكبر يوميًا', 'تجنب تعلم فيزياء التصوير', 'تجاوز كتابة التقارير'], correct: 0 },
            ] },
          { num: '02', title: 'NPHIES لأخصائيي الأشعة', desc: 'منصة البيانات الصحية الوطنية في السعودية — ما يجب معرفته للتقديم الصحيح.', dur: '10 دقائق', tag: 'free', featured: true, locked: false,
            quiz: [
              { q: 'NPHIES هي:', options: ['منصة تبادل البيانات الصحية الوطنية في السعودية', 'علامة تجارية خاصة للتصوير', 'هيئة امتحانات دولية'], correct: 0 },
              { q: 'التقديم الصحيح عبر NPHIES يؤثر بشكل أساسي على:', options: ['معالجة المطالبات والتصريح المسبق', 'دقة الصورة', 'حجم خط التقرير'], correct: 0 },
            ] },
          { num: '03', title: 'أدوات الذكاء الاصطناعي في الأشعة اليوم', desc: 'ما يفعله الذكاء الاصطناعي فعليًا في الأشعة الآن — الفرز، الكشف، وكتابة التقارير.', dur: '12 دقيقة', tag: 'pro', featured: false, locked: true },
        ]
      },
      research: {
        num: 'الوحدة 06',
        title: 'أساسيات البحث العلمي — بناء ملفك الأكاديمي.',
        desc: 'البحث العلمي ليس للأساتذة فقط. تستفيد كل مستويات التدريب من فهم كيفية قراءة الدراسات، وكتابة تقارير الحالات، والمساهمة في الأدبيات الطبية. تجعل هذه الوحدة ذلك عمليًا وقابلاً للتحقيق.',
        meta: [{ ico: '<i class="fi fi-sr-alarm-clock"></i>', txt: '~52 دقيقة إجمالاً' }, { ico: '<i class="fi fi-sr-graduation-cap"></i>', txt: 'جميع المستويات' }, { ico: '<i class="fi fi-sr-train-track"></i>', txt: 'المسار الأكاديمي' }],
        exams: [],
        lessons: [
          { num: '01', title: 'كيفية قراءة دراسة في الأشعة', desc: 'خمسة أسئلة يجب طرحها قبل الوثوق بأي بحث. التقييم النقدي ببساطة.', dur: '12 دقيقة', tag: 'free', featured: true, locked: false,
            quiz: [
              { q: 'التقييم النقدي للدراسة يعني:', options: ['تقييم منهجيتها قبل الوثوق باستنتاجاتها', 'قبول كل بحث منشور كحقيقة', 'قراءة الملخص فقط'], correct: 0 },
              { q: 'طرح أسئلة منظمة قبل الوثوق بالبحث يساعدك على:', options: ['تجنب اتخاذ القرارات بناءً على أدلة ضعيفة', 'القراءة بشكل أسرع دون فهم', 'تجاوز قسم النقاش بالكامل'], correct: 0 },
            ] },
          { num: '02', title: 'كتابة تقرير حالتك الأولى', desc: 'البنية واللغة وأين تُقدّم. كل ما تحتاجه لنشر بحثك الأول.', dur: '15 دقيقة', tag: 'free', featured: false, locked: false,
            quiz: [
              { q: 'يُكتب تقرير الحالة عادةً لـ:', options: ['وصف حالة سريرية غير عادية أو تعليمية', 'استبدال دراسة بحثية كاملة', 'تجنب مراجعة الأقران'], correct: 0 },
              { q: 'قبل تقديم تقرير الحالة يجب عليك:', options: ['اتباع بنية وإرشادات المجلة المستهدفة', 'تجاهل متطلبات التنسيق', 'التقديم لأكبر عدد ممكن من المجلات في نفس الوقت'], correct: 0 },
            ] },
          { num: '03', title: 'الأشعة المبنية على الأدلة في الممارسة', desc: 'كيفية إيجاد وتقييم وتطبيق أفضل الأدلة في القرارات السريرية.', dur: '10 دقائق', tag: 'pro', featured: false, locked: true },
          { num: '04', title: 'نشر بحثك الأول — دليل خطوة بخطوة', desc: 'من الفكرة إلى القبول. اختيار المجلة والتقديم والرد على المراجعين.', dur: '15 دقيقة', tag: 'pro', featured: false, locked: true },
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
    renderModule('foundations');
    document.addEventListener('ih:langchange', () => renderModule(currentModule));

    AOS.init({
      duration: 700,
      easing: 'ease',
      once: true,
      offset: 80
    });
