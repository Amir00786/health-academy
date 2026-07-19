    window.I18N_PAGE_DICT = {
      'spec.tag': { en: '✦ Free tool — no sign up needed', ar: '✦ أداة مجانية — لا حاجة للتسجيل' },
      'spec.h1': { en: 'Find your<br><span>medical specialty.</span>', ar: 'اكتشف<br><span>تخصصك الطبي.</span>' },
      'spec.desc': { en: 'Not sure which specialty is right for you? Answer 10 questions about your personality, strengths, and goals — and we will show you your top matches with a full explanation.', ar: 'لست متأكدًا من التخصص المناسب لك؟ أجب عن 10 أسئلة حول شخصيتك ونقاط قوتك وأهدافك — وسنعرض لك أفضل التخصصات المطابقة مع شرح كامل.' },
      'spec.startBtn': { en: 'Start the finder', ar: 'ابدأ الاختبار' },
      'spec.note': { en: 'Takes about 3 minutes · Results are instant · Free forever', ar: 'يستغرق حوالي 3 دقائق · النتائج فورية · مجاني دائمًا' },
      'spec.stat1': { en: 'Specialties ranked', ar: 'تخصص مرتب' },
      'spec.stat2': { en: 'Questions', ar: 'أسئلة' },
      'spec.stat3': { en: 'Free', ar: 'مجاني' },
      'spec.back': { en: 'Back', ar: 'رجوع' },
      'spec.resultsTag': { en: '✦ Your specialty matches', ar: '✦ أفضل التخصصات المطابقة لك' },
      'spec.resultsH2': { en: 'Here are your<br>top 3 matches.', ar: 'إليك أفضل<br>3 تخصصات مطابقة.' },
      'spec.resultsDesc': { en: 'Based on your answers, these specialties align best with your personality, strengths, and goals.', ar: 'بناءً على إجاباتك، هذه التخصصات هي الأكثر توافقًا مع شخصيتك ونقاط قوتك وأهدافك.' },
      'spec.retakeBtn': { en: 'Retake the finder', ar: 'أعد الاختبار' },
      'spec.exploreBtn': { en: 'Explore learning paths', ar: 'استكشف مسارات التعلم' },
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

    const questions = [
      {
        num: '01', text: 'How do you prefer to interact with patients?', sub: 'Think about your ideal daily patient experience.',
        options: [
          { label: 'A', text: 'Brief and focused — I like solving the diagnostic puzzle, less bedside time.', tags: { radiology: 3, pathology: 3, anesthesia: 1 } },
          { label: 'B', text: 'Long-term relationships — I want to follow patients over years.', tags: { gp: 3, psychiatry: 2, pediatrics: 2 } },
          { label: 'C', text: 'High-intensity, short bursts — emergency situations energize me.', tags: { emergency: 3, icu: 2, surgery: 1 } },
          { label: 'D', text: 'Moderate — I like a mix of brief and deeper interactions.', tags: { internal: 2, dermatology: 2, ophthalmology: 2 } },
        ]
      },
      {
        num: '02', text: 'How do you handle high-pressure, life-or-death situations?', sub: 'Be honest — there is no wrong answer here.',
        options: [
          { label: 'A', text: 'I thrive under pressure. Adrenaline helps me focus.', tags: { emergency: 3, surgery: 3, icu: 3 } },
          { label: 'B', text: 'I manage well but prefer controlled, planned environments.', tags: { radiology: 2, dermatology: 2, psychiatry: 2 } },
          { label: 'C', text: 'I prefer to avoid it — I do better with time to think.', tags: { pathology: 3, radiology: 2, research: 3 } },
          { label: 'D', text: 'It depends — I can handle it but need recovery time.', tags: { internal: 2, gp: 2, pediatrics: 2 } },
        ]
      },
      {
        num: '03', text: 'Are you drawn to procedures and hands-on technical work?', sub: 'Scalpels, scopes, catheters — or more thinking and analyzing?',
        options: [
          { label: 'A', text: 'Yes — I love working with my hands and learning technical skills.', tags: { surgery: 3, interventional: 3, orthopedics: 3 } },
          { label: 'B', text: 'Somewhat — I like some procedures but not all day.', tags: { radiology: 2, emergency: 2, ophthalmology: 2 } },
          { label: 'C', text: 'Not really — I prefer diagnosis, management, and communication.', tags: { internal: 3, psychiatry: 2, gp: 3 } },
          { label: 'D', text: 'No — I prefer analytical, image-based, or lab work.', tags: { radiology: 3, pathology: 3, nuclear: 2 } },
        ]
      },
      {
        num: '04', text: 'What is your relationship with technology and AI?', sub: 'Healthcare is changing fast — how do you feel about that?',
        options: [
          { label: 'A', text: 'I am excited by it — I want to be at the frontier of tech in medicine.', tags: { radiology: 3, nuclear: 2, research: 3 } },
          { label: 'B', text: 'I appreciate it as a tool but prefer human connection.', tags: { gp: 2, psychiatry: 3, pediatrics: 2 } },
          { label: 'C', text: 'I am neutral — I will use whatever helps patients.', tags: { internal: 2, surgery: 2, emergency: 2 } },
          { label: 'D', text: 'I prefer traditional medicine and direct clinical work.', tags: { surgery: 2, orthopedics: 2, dermatology: 1 } },
        ]
      },
      {
        num: '05', text: 'How do you feel about night shifts and irregular hours?', sub: 'Some specialties demand it more than others.',
        options: [
          { label: 'A', text: 'Fine with it — I adapt easily to any schedule.', tags: { emergency: 3, icu: 3, surgery: 2 } },
          { label: 'B', text: 'Acceptable early in my career, but I want balance long-term.', tags: { internal: 2, radiology: 2, gp: 2 } },
          { label: 'C', text: 'I prefer predictable hours and work-life balance.', tags: { dermatology: 3, psychiatry: 3, radiology: 2 } },
          { label: 'D', text: 'Flexible — depends on the role and compensation.', tags: { anesthesia: 2, orthopedics: 2, ophthalmology: 2 } },
        ]
      },
      {
        num: '06', text: 'What drives you most in your career?', sub: 'Your core motivation shapes your specialty fit.',
        options: [
          { label: 'A', text: 'Intellectual challenge — I want to solve complex diagnostic puzzles.', tags: { radiology: 3, internal: 3, pathology: 3 } },
          { label: 'B', text: 'Direct patient impact — I want to see the difference I make.', tags: { surgery: 3, pediatrics: 3, emergency: 2 } },
          { label: 'C', text: 'Research and advancing medicine — I want to contribute to knowledge.', tags: { research: 3, radiology: 2, pathology: 2 } },
          { label: 'D', text: 'Financial stability and lifestyle — a good balance of both.', tags: { dermatology: 3, radiology: 2, ophthalmology: 3 } },
        ]
      },
      {
        num: '07', text: 'Where do you see yourself academically?', sub: 'Research, teaching, or pure clinical practice?',
        options: [
          { label: 'A', text: 'Academic — I want to publish, teach, and contribute to research.', tags: { research: 3, radiology: 2, pathology: 2 } },
          { label: 'B', text: 'Clinical — I want to focus entirely on patient care.', tags: { gp: 3, emergency: 2, surgery: 2 } },
          { label: 'C', text: 'Mixed — some clinical work with occasional research.', tags: { internal: 3, radiology: 2, pediatrics: 2 } },
          { label: 'D', text: 'Private practice — I want to run my own practice eventually.', tags: { dermatology: 3, ophthalmology: 3, orthopedics: 2 } },
        ]
      },
      {
        num: '08', text: 'How do you feel about mental and emotional demands?', sub: 'Some specialties carry heavier emotional loads.',
        options: [
          { label: 'A', text: 'I am emotionally resilient — heavy cases do not follow me home.', tags: { surgery: 3, icu: 3, emergency: 3 } },
          { label: 'B', text: 'I empathize deeply — I want to support patients emotionally too.', tags: { psychiatry: 3, pediatrics: 3, gp: 2 } },
          { label: 'C', text: 'I prefer emotional distance — I want to stay objective.', tags: { radiology: 3, pathology: 3, anesthesia: 2 } },
          { label: 'D', text: 'I manage it but need clear boundaries.', tags: { internal: 2, dermatology: 2, ophthalmology: 2 } },
        ]
      },
      {
        num: '09', text: 'What type of problems excite you most?', sub: 'Think about the cases that would keep you engaged for decades.',
        options: [
          { label: 'A', text: 'Imaging and visual diagnosis — patterns, anatomy, finding the hidden.', tags: { radiology: 3, nuclear: 3, ophthalmology: 2 } },
          { label: 'B', text: 'Systems and physiology — understanding the body as a whole.', tags: { internal: 3, icu: 3, research: 2 } },
          { label: 'C', text: 'Surgical problems — fixing what is broken, restoring function.', tags: { surgery: 3, orthopedics: 3, interventional: 3 } },
          { label: 'D', text: 'Skin, mind, eyes, teeth — specific organ systems.', tags: { dermatology: 3, psychiatry: 3, ophthalmology: 3 } },
        ]
      },
      {
        num: '10', text: 'Finally — what matters most to you in your future career?', sub: 'Pick the one that resonates most honestly.',
        options: [
          { label: 'A', text: 'Being the best diagnostician — the one everyone calls when it is difficult.', tags: { radiology: 3, internal: 3, pathology: 2 } },
          { label: 'B', text: 'Saving lives directly — in the room, in the moment.', tags: { surgery: 3, emergency: 3, icu: 3 } },
          { label: 'C', text: 'Quality of life — meaningful work with time for myself and family.', tags: { dermatology: 3, psychiatry: 2, gp: 3, radiology: 2 } },
          { label: 'D', text: 'Global impact — advancing medicine beyond my own patients.', tags: { research: 3, radiology: 2, nuclear: 2 } },
        ]
      },
    ];

    const questions_ar = [
      {
        num: '01', text: 'كيف تفضل التعامل مع المرضى؟', sub: 'فكر في تجربتك اليومية المثالية مع المرضى.',
        options: [
          { label: 'أ', text: 'مختصر ومركّز — أحب حل لغز التشخيص، مع وقت أقل بجانب السرير.', tags: { radiology: 3, pathology: 3, anesthesia: 1 } },
          { label: 'ب', text: 'علاقات طويلة الأمد — أريد متابعة المرضى على مدى سنوات.', tags: { gp: 3, psychiatry: 2, pediatrics: 2 } },
          { label: 'ج', text: 'كثافة عالية ولفترات قصيرة — الحالات الطارئة تمنحني الطاقة.', tags: { emergency: 3, icu: 2, surgery: 1 } },
          { label: 'د', text: 'معتدل — أحب مزيجًا من التفاعلات المختصرة والعميقة.', tags: { internal: 2, dermatology: 2, ophthalmology: 2 } },
        ]
      },
      {
        num: '02', text: 'كيف تتعامل مع المواقف شديدة الضغط التي تتعلق بالحياة أو الموت؟', sub: 'كن صادقًا — لا توجد إجابة خاطئة هنا.',
        options: [
          { label: 'أ', text: 'أتألق تحت الضغط. الأدرينالين يساعدني على التركيز.', tags: { emergency: 3, surgery: 3, icu: 3 } },
          { label: 'ب', text: 'أتعامل بشكل جيد لكنني أفضّل البيئات المنظمة والمخطط لها.', tags: { radiology: 2, dermatology: 2, psychiatry: 2 } },
          { label: 'ج', text: 'أفضّل تجنبها — أنجز بشكل أفضل عندما يتوفر لي وقت للتفكير.', tags: { pathology: 3, radiology: 2, research: 3 } },
          { label: 'د', text: 'الأمر يعتمد على الحالة — يمكنني التعامل معها لكنني أحتاج وقتًا للتعافي.', tags: { internal: 2, gp: 2, pediatrics: 2 } },
        ]
      },
      {
        num: '03', text: 'هل تنجذب إلى الإجراءات والعمل التقني اليدوي؟', sub: 'المشارط والمناظير والقسطرة — أم التفكير والتحليل أكثر؟',
        options: [
          { label: 'أ', text: 'نعم — أحب العمل بيدي وتعلّم المهارات التقنية.', tags: { surgery: 3, interventional: 3, orthopedics: 3 } },
          { label: 'ب', text: 'إلى حد ما — أحب بعض الإجراءات لكن ليس طوال اليوم.', tags: { radiology: 2, emergency: 2, ophthalmology: 2 } },
          { label: 'ج', text: 'ليس فعلًا — أفضّل التشخيص والإدارة والتواصل.', tags: { internal: 3, psychiatry: 2, gp: 3 } },
          { label: 'د', text: 'لا — أفضّل العمل التحليلي أو المعتمد على الصور أو المختبري.', tags: { radiology: 3, pathology: 3, nuclear: 2 } },
        ]
      },
      {
        num: '04', text: 'ما هي علاقتك بالتكنولوجيا والذكاء الاصطناعي؟', sub: 'الرعاية الصحية تتغير بسرعة — كيف تشعر حيال ذلك؟',
        options: [
          { label: 'أ', text: 'متحمس لذلك — أريد أن أكون في طليعة التقنية في الطب.', tags: { radiology: 3, nuclear: 2, research: 3 } },
          { label: 'ب', text: 'أقدّرها كأداة لكنني أفضّل التواصل الإنساني.', tags: { gp: 2, psychiatry: 3, pediatrics: 2 } },
          { label: 'ج', text: 'محايد — سأستخدم أي شيء يساعد المرضى.', tags: { internal: 2, surgery: 2, emergency: 2 } },
          { label: 'د', text: 'أفضّل الطب التقليدي والعمل السريري المباشر.', tags: { surgery: 2, orthopedics: 2, dermatology: 1 } },
        ]
      },
      {
        num: '05', text: 'كيف تشعر تجاه النوبات الليلية وساعات العمل غير المنتظمة؟', sub: 'بعض التخصصات تتطلب ذلك أكثر من غيرها.',
        options: [
          { label: 'أ', text: 'لا مشكلة لدي — أتكيف بسهولة مع أي جدول.', tags: { emergency: 3, icu: 3, surgery: 2 } },
          { label: 'ب', text: 'مقبول في بداية مسيرتي المهنية، لكنني أريد توازنًا على المدى الطويل.', tags: { internal: 2, radiology: 2, gp: 2 } },
          { label: 'ج', text: 'أفضّل ساعات عمل يمكن التنبؤ بها وتوازنًا بين العمل والحياة.', tags: { dermatology: 3, psychiatry: 3, radiology: 2 } },
          { label: 'د', text: 'مرن — يعتمد على الدور والتعويض المادي.', tags: { anesthesia: 2, orthopedics: 2, ophthalmology: 2 } },
        ]
      },
      {
        num: '06', text: 'ما الذي يحفزك أكثر في مسيرتك المهنية؟', sub: 'دافعك الأساسي يحدد مدى ملاءمتك للتخصص.',
        options: [
          { label: 'أ', text: 'التحدي الفكري — أريد حل ألغاز تشخيصية معقدة.', tags: { radiology: 3, internal: 3, pathology: 3 } },
          { label: 'ب', text: 'التأثير المباشر على المرضى — أريد أن أرى الفرق الذي أحدثه.', tags: { surgery: 3, pediatrics: 3, emergency: 2 } },
          { label: 'ج', text: 'البحث وتطوير الطب — أريد المساهمة في المعرفة.', tags: { research: 3, radiology: 2, pathology: 2 } },
          { label: 'د', text: 'الاستقرار المالي ونمط الحياة — توازن جيد بين الاثنين.', tags: { dermatology: 3, radiology: 2, ophthalmology: 3 } },
        ]
      },
      {
        num: '07', text: 'أين ترى نفسك أكاديميًا؟', sub: 'البحث، أم التدريس، أم الممارسة السريرية البحتة؟',
        options: [
          { label: 'أ', text: 'أكاديمي — أريد النشر والتدريس والمساهمة في البحث.', tags: { research: 3, radiology: 2, pathology: 2 } },
          { label: 'ب', text: 'سريري — أريد التركيز بالكامل على رعاية المرضى.', tags: { gp: 3, emergency: 2, surgery: 2 } },
          { label: 'ج', text: 'مزيج — بعض العمل السريري مع بحث بين الحين والآخر.', tags: { internal: 3, radiology: 2, pediatrics: 2 } },
          { label: 'د', text: 'ممارسة خاصة — أريد إدارة عيادتي الخاصة في النهاية.', tags: { dermatology: 3, ophthalmology: 3, orthopedics: 2 } },
        ]
      },
      {
        num: '08', text: 'كيف تشعر تجاه المتطلبات النفسية والعاطفية؟', sub: 'بعض التخصصات تحمل أعباءً عاطفية أثقل.',
        options: [
          { label: 'أ', text: 'أتمتع بمرونة عاطفية — الحالات الصعبة لا ترافقني إلى المنزل.', tags: { surgery: 3, icu: 3, emergency: 3 } },
          { label: 'ب', text: 'أتعاطف بعمق — أريد دعم المرضى عاطفيًا أيضًا.', tags: { psychiatry: 3, pediatrics: 3, gp: 2 } },
          { label: 'ج', text: 'أفضّل مسافة عاطفية — أريد البقاء موضوعيًا.', tags: { radiology: 3, pathology: 3, anesthesia: 2 } },
          { label: 'د', text: 'أتعامل معها لكنني أحتاج حدودًا واضحة.', tags: { internal: 2, dermatology: 2, ophthalmology: 2 } },
        ]
      },
      {
        num: '09', text: 'ما نوع المشكلات التي تثيرك أكثر؟', sub: 'فكر في الحالات التي ستبقيك متفاعلًا لعقود.',
        options: [
          { label: 'أ', text: 'التصوير والتشخيص البصري — الأنماط والتشريح واكتشاف الخفي.', tags: { radiology: 3, nuclear: 3, ophthalmology: 2 } },
          { label: 'ب', text: 'الأنظمة وعلم وظائف الأعضاء — فهم الجسم ككل.', tags: { internal: 3, icu: 3, research: 2 } },
          { label: 'ج', text: 'المشكلات الجراحية — إصلاح ما هو معطوب واستعادة الوظيفة.', tags: { surgery: 3, orthopedics: 3, interventional: 3 } },
          { label: 'د', text: 'الجلد، العقل، العينان، الأسنان — أنظمة أعضاء محددة.', tags: { dermatology: 3, psychiatry: 3, ophthalmology: 3 } },
        ]
      },
      {
        num: '10', text: 'أخيرًا — ما الأهم بالنسبة لك في مستقبلك المهني؟', sub: 'اختر ما يعبّر عنك بصدق أكثر.',
        options: [
          { label: 'أ', text: 'أن أكون أفضل مُشخِّص — الشخص الذي يلجأ إليه الجميع عند الصعوبة.', tags: { radiology: 3, internal: 3, pathology: 2 } },
          { label: 'ب', text: 'إنقاذ الأرواح مباشرة — في الغرفة وفي اللحظة نفسها.', tags: { surgery: 3, emergency: 3, icu: 3 } },
          { label: 'ج', text: 'جودة الحياة — عمل ذو معنى مع وقت لنفسي ولعائلتي.', tags: { dermatology: 3, psychiatry: 2, gp: 3, radiology: 2 } },
          { label: 'د', text: 'تأثير عالمي — تطوير الطب إلى ما هو أبعد من مرضاي.', tags: { research: 3, radiology: 2, nuclear: 2 } },
        ]
      },
    ];

    const specialties = {
      radiology: { name: 'Diagnostic Radiology', ico: '<i class="fi fi-sr-x-ray"></i>', color: '#00C896', desc: 'You interpret medical images — X-rays, CT, MRI, ultrasound — and guide clinical decisions without direct patient contact. A highly intellectual, technology-driven specialty with excellent lifestyle balance. Rapidly evolving with AI.', strengths: ['Strong work-life balance', 'High intellectual demand', 'AI and technology frontier', 'No night calls in many settings'], risks: ['Limited direct patient contact', 'Long training pathway', 'Heavily affected by AI in future'], path: ['FRCR / Arab Board / Saudi Board', 'Pre-authorization certificate', 'RIS & PACS proficiency', 'AI in radiology module'] },
      surgery: { name: 'General Surgery', ico: '🔪', color: '#FF6B6B', desc: 'You operate. You fix what is broken. High-pressure, technically demanding, and directly impactful. Surgery is one of the most respected and challenging specialties — requiring stamina, precision, and emotional resilience.', strengths: ['Direct, visible patient impact', 'High respect and autonomy', 'Technical mastery', 'Subspecialty options'], risks: ['Demanding lifestyle and hours', 'Long training', 'High stress and burnout risk'], path: ['Basic surgical skills training', 'MRCS / Arab Board Surgery', 'Fellowship in subspecialty', 'Simulation-based learning'] },
      emergency: { name: 'Emergency Medicine', ico: '🚨', color: '#FF6B6B', desc: 'Every shift is different. You stabilize, diagnose, and decide fast — across every specialty simultaneously. Emergency medicine rewards adaptability, rapid thinking, and composure under pressure.', strengths: ['Variety every single day', 'Direct impact', 'No long follow-ups', 'Strong team environment'], risks: ['Irregular hours and night shifts', 'Emotional burnout', 'High litigation risk'], path: ['MRCEM / Arab Board EM', 'Advanced life support (ALS, ATLS)', 'Ultrasound certification', 'Triage and systems training'] },
      internal: { name: 'Internal Medicine', ico: '🫀', color: '#4A9EFF', desc: 'The core of hospital medicine. You manage complex, multi-system cases and are the physician other doctors consult. A strong foundation for any subspecialty and highly respected academically.', strengths: ['Intellectual depth', 'Gateway to all subspecialties', 'Strong research base', 'Respected academically'], risks: ['Heavy workload', 'Less procedural income', 'Complex cases'], path: ['MRCP / Arab Board Internal Med', 'Subspecialty fellowship', 'Research and publication', 'CME and board recertification'] },
      dermatology: { name: 'Dermatology', ico: '<i class="fi fi-sr-skin"></i>', color: '#A78BFA', desc: 'One of the best lifestyles in medicine. Visual diagnosis, procedural options, and a growing aesthetic branch. Highly competitive to enter but rewards those who get in with excellent quality of life.', strengths: ['Best lifestyle in medicine', 'High income potential', 'Visual and procedural', 'Aesthetic subspecialty option'], risks: ['Extremely competitive entry', 'Mostly outpatient (some prefer hospital)', 'Less acute drama'], path: ['Dermatology board exam', 'Dermoscopy certification', 'Aesthetic procedures training', 'Private practice setup'] },
      psychiatry: { name: 'Psychiatry', ico: '🧠', color: '#A78BFA', desc: 'You treat the mind. Long-term relationships with complex patients, high emotional intelligence required, and a field finally getting the attention it deserves globally. Growing rapidly with mental health awareness.', strengths: ['Deep patient relationships', 'Growing demand globally', 'Good lifestyle', 'Research opportunities'], risks: ['Emotional weight', 'Slower visible outcomes', 'Stigma in some cultures'], path: ['MRCPsych / Arab Board Psychiatry', 'CBT and therapy training', 'Mental health system navigation', 'Liaison psychiatry subspecialty'] },
      pediatrics: { name: 'Pediatrics', ico: '👶', color: '#F5A623', desc: 'You care for children from newborns to adolescents. Highly rewarding, emotionally rich, and demanding in equal measure. Families trust you completely — a huge responsibility and privilege.', strengths: ['Deeply rewarding', 'Variety of conditions', 'Strong community', 'Family-centered care'], risks: ['Emotional difficulty with sick children', 'Long training', 'Lower income than some specialties'], path: ['Arab Board Pediatrics / DCH / MRCPCH', 'Neonatal training', 'Subspecialty fellowship', 'Communication and family skills'] },
      pathology: { name: 'Pathology', ico: '🔬', color: '#00C896', desc: 'You are the doctor\'s doctor. You analyze tissue, blood, and cells to provide the definitive diagnosis. Minimal patient contact, strong academic orientation, and critical to every clinical decision.', strengths: ['Intellectual and academic', 'No night calls typically', 'Critical to all clinical decisions', 'Research opportunities'], risks: ['Limited direct patient interaction', 'Less visible role', 'Long training for subspecialties'], path: ['FRCPath / Arab Board Pathology', 'Lab management training', 'Molecular pathology subspecialty', 'Research and publication'] },
      gp: { name: 'General Practice / Family Medicine', ico: '🏡', color: '#F5A623', desc: 'You are the first line of care. You see everything, build long-term relationships, and are the backbone of any healthcare system. Excellent lifestyle, strong community connection, and growing importance globally.', strengths: ['Long-term patient relationships', 'Excellent work-life balance', 'Variety of presentations', 'Community impact'], risks: ['Less specialist respect in some cultures', 'Complex administrative burden', 'Jack of all trades challenge'], path: ['MRCGP / Arab Board Family Med', 'Chronic disease management', 'Preventive medicine certification', 'Practice management skills'] },
      interventional: { name: 'Interventional Radiology', ico: '<i class="fi fi-sr-x-ray"></i>', color: '#00C896', desc: 'The best of both worlds — imaging and procedures. You perform minimally invasive procedures guided by imaging. Growing rapidly and increasingly replacing open surgery in many areas.', strengths: ['Highly technical and procedural', 'Growing rapidly', 'Less invasive than surgery', 'High demand'], risks: ['Radiation exposure', 'Long and demanding training', 'High technical skill requirement'], path: ['FRCR plus interventional fellowship', 'Vascular and non-vascular procedures', 'IR board certification', 'Pre-auth for IR procedures'] },
      anesthesia: { name: 'Anesthesiology', ico: '💉', color: '#4A9EFF', desc: 'You keep patients alive during surgery. High technical skill, rapid decision-making, and critical care expertise. Excellent pay, some lifestyle flexibility, and essential to every surgical team.', strengths: ['Essential to every surgical team', 'High income', 'Strong ICU crossover', 'Some lifestyle flexibility'], risks: ['Stress in critical moments', 'Limited long-term patient relationships', 'Medicolegal exposure'], path: ['FRCA / Arab Board Anesthesia', 'Critical care subspecialty', 'Pain management fellowship', 'Advanced airway certification'] },
      ophthalmology: { name: 'Ophthalmology', ico: '<i class="fi fi-sr-eye"></i>', color: '#4A9EFF', desc: 'You specialize in the eye — one of the most complex organs. Highly technical, procedural, and with excellent lifestyle and income. Also one of the most satisfying when you restore someone\'s sight.', strengths: ['Excellent lifestyle', 'High income', 'Highly technical', 'Deeply satisfying outcomes'], risks: ['Competitive entry', 'Microscope-dependent skills', 'Narrow subspecialty'], path: ['MRCOphth / Arab Board Ophthalmology', 'Surgical skills simulation', 'Subspecialty: retina, glaucoma, cornea', 'Private practice development'] },
      research: { name: 'Academic Medicine & Research', ico: '📚', color: '#A78BFA', desc: 'Your impact is measured in papers, not patients. You advance medicine for everyone. Any specialty can lead to academic medicine — but if research excites you more than clinical work, this path is your calling.', strengths: ['Global impact', 'Intellectual freedom', 'Teaching and mentoring', 'Grant funding opportunities'], risks: ['Lower income in many settings', 'Slow career progression', 'Publishing pressure'], path: ['PhD or research fellowship', 'Grant writing skills', 'Statistical analysis training', 'Academic networking and publishing'] },
      icu: { name: 'Intensive Care / Critical Care', ico: '⚠️', color: '#FF6B6B', desc: 'You manage the sickest patients in the hospital. Multi-organ failure, ventilators, complex pharmacology — all at once. High intensity, deeply technical, and profoundly impactful.', strengths: ['High intensity and impact', 'Multi-system expertise', 'Team leadership', 'Strong research base'], risks: ['Extremely demanding emotionally', 'Night calls and irregular hours', 'High burnout rate'], path: ['FFICM / Critical care fellowship', 'Ventilator and ECMO training', 'Point-of-care ultrasound', 'Palliative care communication'] },
      nuclear: { name: 'Nuclear Medicine', ico: '☢️', color: '#00C896', desc: 'You use radioactive materials to diagnose and treat disease. Growing rapidly with PET/CT and theranostics. Combines physics, pharmacology, and imaging — a niche but increasingly important specialty.', strengths: ['Technology frontier', 'Growing with theranostics', 'Good lifestyle', 'Strong academic base'], risks: ['Radiation safety requirements', 'Niche specialty', 'Smaller job market'], path: ['Arab Board Nuclear Medicine', 'PET/CT reporting certification', 'Theranostics training', 'Radiation safety certification'] },
      orthopedics: { name: 'Orthopedic Surgery', ico: '🦴', color: '#F5A623', desc: 'You fix bones, joints, and the musculoskeletal system. Highly procedural, physically demanding, and rewarding when you restore mobility. High income and strong private practice potential.', strengths: ['High income potential', 'Clear outcomes', 'Strong private practice', 'Physical and technical'], risks: ['Physically demanding long-term', 'High litigation', 'Demanding training'], path: ['FRCS Ortho / Arab Board Orthopedics', 'Subspecialty fellowship', 'Arthroscopy and joint replacement', 'Trauma and spine training'] },
    };

    const specialties_ar = {
      radiology: { name: 'الأشعة التشخيصية', ico: '<i class="fi fi-sr-x-ray"></i>', color: '#00C896', desc: 'تقوم بتفسير الصور الطبية — الأشعة السينية، والأشعة المقطعية، والرنين المغناطيسي، والموجات فوق الصوتية — وتوجيه القرارات السريرية دون تواصل مباشر مع المريض. تخصص فكري بامتياز ومعتمد على التقنية مع توازن ممتاز في نمط الحياة. يتطور بسرعة مع الذكاء الاصطناعي.', strengths: ['توازن قوي بين العمل والحياة', 'متطلبات فكرية عالية', 'في طليعة الذكاء الاصطناعي والتقنية', 'لا مناوبات ليلية في العديد من الأماكن'], risks: ['تواصل محدود مباشر مع المرضى', 'مسار تدريب طويل', 'تأثر كبير بالذكاء الاصطناعي مستقبلًا'], path: ['FRCR / البورد العربي / البورد السعودي', 'شهادة التصريح المسبق', 'إتقان أنظمة RIS و PACS', 'وحدة الذكاء الاصطناعي في الأشعة'] },
      surgery: { name: 'الجراحة العامة', ico: '🔪', color: '#FF6B6B', desc: 'أنت تُجري العمليات. تُصلح ما هو معطوب. تخصص عالي الضغط ويتطلب مهارة تقنية وله تأثير مباشر. الجراحة من أكثر التخصصات احترامًا وتحديًا — تتطلب قدرة على التحمل ودقة ومرونة عاطفية.', strengths: ['تأثير مباشر وملموس على المرضى', 'احترام كبير واستقلالية', 'إتقان تقني', 'خيارات تخصصات فرعية'], risks: ['نمط حياة وساعات عمل مرهقة', 'تدريب طويل', 'ضغط عالٍ وخطر الإرهاق النفسي'], path: ['تدريب على المهارات الجراحية الأساسية', 'MRCS / البورد العربي للجراحة', 'زمالة في تخصص فرعي', 'التعلم القائم على المحاكاة'] },
      emergency: { name: 'طب الطوارئ', ico: '🚨', color: '#FF6B6B', desc: 'كل مناوبة مختلفة. تقوم بتثبيت الحالة والتشخيص واتخاذ القرار بسرعة — عبر جميع التخصصات في آنٍ واحد. طب الطوارئ يكافئ القدرة على التكيف والتفكير السريع والهدوء تحت الضغط.', strengths: ['تنوع في كل يوم', 'تأثير مباشر', 'لا متابعات طويلة الأمد', 'بيئة عمل جماعية قوية'], risks: ['ساعات عمل غير منتظمة ونوبات ليلية', 'إرهاق عاطفي', 'خطر مرتفع للمقاضاة القانونية'], path: ['MRCEM / البورد العربي لطب الطوارئ', 'دعم الحياة المتقدم (ALS, ATLS)', 'شهادة الموجات فوق الصوتية', 'تدريب على الفرز وأنظمة العمل'] },
      internal: { name: 'الطب الباطني', ico: '🫀', color: '#4A9EFF', desc: 'جوهر الطب في المستشفى. تدير حالات معقدة متعددة الأنظمة وتكون الطبيب الذي يستشيره الأطباء الآخرون. أساس قوي لأي تخصص فرعي ومحترم أكاديميًا بشكل كبير.', strengths: ['عمق فكري', 'بوابة لجميع التخصصات الفرعية', 'قاعدة بحثية قوية', 'محترم أكاديميًا'], risks: ['عبء عمل كبير', 'دخل أقل من الإجراءات', 'حالات معقدة'], path: ['MRCP / البورد العربي للطب الباطني', 'زمالة في تخصص فرعي', 'البحث والنشر العلمي', 'التعليم الطبي المستمر وإعادة اعتماد البورد'] },
      dermatology: { name: 'الأمراض الجلدية', ico: '<i class="fi fi-sr-skin"></i>', color: '#A78BFA', desc: 'من أفضل التخصصات من حيث نمط الحياة في الطب. تشخيص بصري وخيارات إجرائية وفرع تجميلي متنامٍ. تنافسي جدًا للدخول إليه لكنه يكافئ من يصل إليه بجودة حياة ممتازة.', strengths: ['أفضل نمط حياة في الطب', 'إمكانية دخل مرتفع', 'بصري وإجرائي', 'خيار تخصص فرعي تجميلي'], risks: ['دخول تنافسي للغاية', 'غالبًا عيادات خارجية (البعض يفضل المستشفى)', 'أقل إثارة في الحالات الحرجة'], path: ['امتحان بورد الأمراض الجلدية', 'شهادة التنظير الجلدي', 'تدريب على الإجراءات التجميلية', 'إعداد عيادة خاصة'] },
      psychiatry: { name: 'الطب النفسي', ico: '🧠', color: '#A78BFA', desc: 'تعالج العقل. علاقات طويلة الأمد مع مرضى معقّدين، وتتطلب ذكاءً عاطفيًا عاليًا، ومجال بدأ أخيرًا يحظى بالاهتمام الذي يستحقه عالميًا. ينمو بسرعة مع تزايد الوعي بالصحة النفسية.', strengths: ['علاقات عميقة مع المرضى', 'طلب متزايد عالميًا', 'نمط حياة جيد', 'فرص بحثية'], risks: ['عبء عاطفي', 'نتائج مرئية أبطأ', 'وصمة اجتماعية في بعض الثقافات'], path: ['MRCPsych / البورد العربي للطب النفسي', 'تدريب على العلاج المعرفي السلوكي والعلاج النفسي', 'التعامل مع نظام الصحة النفسية', 'تخصص فرعي في الطب النفسي الرابط'] },
      pediatrics: { name: 'طب الأطفال', ico: '👶', color: '#F5A623', desc: 'تعتني بالأطفال من حديثي الولادة حتى المراهقين. مُجزٍ للغاية وغني عاطفيًا ومتطلب بنفس القدر. تثق بك العائلات ثقة كاملة — مسؤولية وامتياز كبيران.', strengths: ['مُجزٍ بعمق', 'تنوع في الحالات', 'مجتمع مهني قوي', 'رعاية محورها العائلة'], risks: ['صعوبة عاطفية مع الأطفال المرضى', 'تدريب طويل', 'دخل أقل من بعض التخصصات'], path: ['البورد العربي لطب الأطفال / DCH / MRCPCH', 'تدريب في طب حديثي الولادة', 'زمالة في تخصص فرعي', 'مهارات التواصل مع العائلة'] },
      pathology: { name: 'علم الأمراض', ico: '🔬', color: '#00C896', desc: 'أنت طبيب الأطباء. تحلل الأنسجة والدم والخلايا لتقديم التشخيص النهائي. تواصل محدود مع المرضى، وتوجه أكاديمي قوي، وأهمية حاسمة في كل قرار سريري.', strengths: ['فكري وأكاديمي', 'عادة بلا مناوبات ليلية', 'أهمية حاسمة في جميع القرارات السريرية', 'فرص بحثية'], risks: ['تفاعل محدود مباشر مع المرضى', 'دور أقل ظهورًا', 'تدريب طويل للتخصصات الفرعية'], path: ['FRCPath / البورد العربي لعلم الأمراض', 'تدريب على إدارة المختبرات', 'تخصص فرعي في علم الأمراض الجزيئي', 'البحث والنشر العلمي'] },
      gp: { name: 'الممارسة العامة / طب الأسرة', ico: '🏡', color: '#F5A623', desc: 'أنت خط الرعاية الأول. ترى كل شيء، وتبني علاقات طويلة الأمد، وتُشكّل العمود الفقري لأي نظام رعاية صحية. نمط حياة ممتاز، وارتباط قوي بالمجتمع، وأهمية متنامية عالميًا.', strengths: ['علاقات طويلة الأمد مع المرضى', 'توازن ممتاز بين العمل والحياة', 'تنوع في الحالات', 'تأثير مجتمعي'], risks: ['احترام أقل من الأخصائيين في بعض الثقافات', 'عبء إداري معقد', 'تحدي الإلمام بكل شيء دون تخصص عميق'], path: ['MRCGP / البورد العربي لطب الأسرة', 'إدارة الأمراض المزمنة', 'شهادة الطب الوقائي', 'مهارات إدارة العيادة'] },
      interventional: { name: 'الأشعة التداخلية', ico: '<i class="fi fi-sr-x-ray"></i>', color: '#00C896', desc: 'أفضل ما في العالمين — التصوير والإجراءات. تقوم بإجراءات طفيفة التوغل موجّهة بالتصوير. ينمو بسرعة ويحل تدريجيًا محل الجراحة المفتوحة في مجالات عديدة.', strengths: ['تقني وإجرائي بشكل كبير', 'ينمو بسرعة', 'أقل توغلًا من الجراحة', 'طلب مرتفع'], risks: ['التعرض للإشعاع', 'تدريب طويل ومرهق', 'متطلبات مهارة تقنية عالية'], path: ['FRCR مع زمالة في الأشعة التداخلية', 'إجراءات وعائية وغير وعائية', 'شهادة بورد الأشعة التداخلية', 'التصريح المسبق لإجراءات الأشعة التداخلية'] },
      anesthesia: { name: 'التخدير', ico: '💉', color: '#4A9EFF', desc: 'تحافظ على حياة المرضى أثناء الجراحة. مهارة تقنية عالية، واتخاذ قرار سريع، وخبرة في الرعاية الحرجة. أجر ممتاز، ومرونة نسبية في نمط الحياة، وضروري لكل فريق جراحي.', strengths: ['ضروري لكل فريق جراحي', 'دخل مرتفع', 'تداخل قوي مع العناية المركزة', 'بعض المرونة في نمط الحياة'], risks: ['ضغط في اللحظات الحرجة', 'علاقات محدودة طويلة الأمد مع المرضى', 'تعرض قانوني طبي'], path: ['FRCA / البورد العربي للتخدير', 'تخصص فرعي في الرعاية الحرجة', 'زمالة إدارة الألم', 'شهادة متقدمة في إدارة مجرى الهواء'] },
      ophthalmology: { name: 'طب وجراحة العيون', ico: '<i class="fi fi-sr-eye"></i>', color: '#4A9EFF', desc: 'تتخصص في العين — أحد أكثر الأعضاء تعقيدًا. تقني وإجرائي بشكل كبير، مع نمط حياة ودخل ممتازين. كما أنه من أكثر التخصصات إرضاءً عندما تُعيد لشخص بصره.', strengths: ['نمط حياة ممتاز', 'دخل مرتفع', 'تقني بشكل كبير', 'نتائج مُرضية بعمق'], risks: ['دخول تنافسي', 'مهارات تعتمد على المجهر', 'تخصص فرعي ضيق'], path: ['MRCOphth / البورد العربي لطب العيون', 'محاكاة المهارات الجراحية', 'تخصص فرعي: الشبكية، الزرق، القرنية', 'تطوير عيادة خاصة'] },
      research: { name: 'الطب الأكاديمي والبحث العلمي', ico: '📚', color: '#A78BFA', desc: 'يُقاس تأثيرك بالأبحاث المنشورة، لا بعدد المرضى. أنت تُطوّر الطب للجميع. يمكن لأي تخصص أن يقود إلى الطب الأكاديمي — لكن إذا كان البحث العلمي يثيرك أكثر من العمل السريري، فهذا المسار هو دعوتك.', strengths: ['تأثير عالمي', 'حرية فكرية', 'التدريس والإرشاد', 'فرص التمويل البحثي'], risks: ['دخل أقل في العديد من الأماكن', 'تقدم وظيفي بطيء', 'ضغط النشر العلمي'], path: ['دكتوراه أو زمالة بحثية', 'مهارات كتابة طلبات التمويل', 'تدريب على التحليل الإحصائي', 'التواصل الأكاديمي والنشر العلمي'] },
      icu: { name: 'العناية المركزة / الرعاية الحرجة', ico: '⚠️', color: '#FF6B6B', desc: 'تدير أكثر الحالات خطورة في المستشفى. فشل متعدد الأعضاء، وأجهزة التنفس الصناعي، وصيدلة معقدة — كل ذلك في آنٍ واحد. كثافة عالية، وتقني بعمق، وذو تأثير كبير.', strengths: ['كثافة وتأثير كبيران', 'خبرة متعددة الأنظمة', 'قيادة الفريق', 'قاعدة بحثية قوية'], risks: ['مرهق عاطفيًا للغاية', 'مناوبات ليلية وساعات غير منتظمة', 'معدل مرتفع للإرهاق النفسي'], path: ['FFICM / زمالة الرعاية الحرجة', 'تدريب على أجهزة التنفس الصناعي و ECMO', 'الموجات فوق الصوتية عند نقطة الرعاية', 'التواصل في الرعاية التلطيفية'] },
      nuclear: { name: 'الطب النووي', ico: '☢️', color: '#00C896', desc: 'تستخدم مواد مشعة لتشخيص الأمراض وعلاجها. ينمو بسرعة مع تقنيات PET/CT والعلاج التشخيصي. يجمع بين الفيزياء والصيدلة والتصوير — تخصص متخصص لكن أهميته تتزايد.', strengths: ['في طليعة التقنية', 'ينمو مع العلاج التشخيصي', 'نمط حياة جيد', 'قاعدة أكاديمية قوية'], risks: ['متطلبات السلامة الإشعاعية', 'تخصص متخصص وضيق', 'سوق عمل أصغر'], path: ['البورد العربي للطب النووي', 'شهادة تقارير PET/CT', 'تدريب على العلاج التشخيصي', 'شهادة السلامة الإشعاعية'] },
      orthopedics: { name: 'جراحة العظام', ico: '🦴', color: '#F5A623', desc: 'تُصلح العظام والمفاصل والجهاز العضلي الهيكلي. إجرائي بشكل كبير، ومتطلب جسديًا، ومُجزٍ عندما تُعيد الحركة. دخل مرتفع وإمكانية قوية للعيادة الخاصة.', strengths: ['إمكانية دخل مرتفع', 'نتائج واضحة', 'عيادة خاصة قوية', 'جسدي وتقني'], risks: ['مرهق جسديًا على المدى الطويل', 'مقاضاة قانونية مرتفعة', 'تدريب مرهق'], path: ['FRCS Ortho / البورد العربي لجراحة العظام', 'زمالة في تخصص فرعي', 'تنظير المفاصل واستبدالها', 'تدريب على الإصابات والعمود الفقري'] },
    };

    function lang() {
      return (window.I18N && window.I18N.currentLang) ? window.I18N.currentLang() : 'en';
    }
    function currentSpecialties() {
      return lang() === 'ar' ? specialties_ar : specialties;
    }
    function currentQuestions() {
      return lang() === 'ar' ? questions_ar : questions;
    }

    let current = 0;
    const answers = {};

    function startQuiz() {
      document.getElementById('landing').style.display = 'none';
      document.getElementById('quizWrap').classList.add('show');
      renderQ();
      if (window.AOS) AOS.refreshHard();
    }

    function renderQ() {
      const isAr = lang() === 'ar';
      const qList = currentQuestions();
      const q = qList[current];
      const pct = Math.round(current / qList.length * 100);
      document.getElementById('stepLabel').textContent = isAr
        ? `السؤال ${current + 1} من ${qList.length}`
        : `Question ${current + 1} of ${qList.length}`;
      document.getElementById('stepPct').textContent = pct + '%';
      document.getElementById('quizFill').style.width = pct + '%';
      document.getElementById('backBtn').style.opacity = current === 0 ? '0.3' : '1';
      document.getElementById('backBtn').disabled = current === 0;
      const sel = answers[current];
      document.getElementById('nextBtn').disabled = sel === undefined;
      const isLast = current === qList.length - 1;
      document.getElementById('nextBtn').innerHTML = isAr
        ? (isLast ? '<i class="fi fi-sr-arrow-small-left"></i> عرض نتائجي' : '<i class="fi fi-sr-arrow-small-left"></i> متابعة')
        : (isLast ? 'See my results <i class="fi fi-sr-arrow-small-right"></i>' : 'Continue <i class="fi fi-sr-arrow-small-right"></i>');
      document.getElementById('questionCard').innerHTML = `
    <span class="q-num">${isAr ? 'السؤال' : 'Question'} ${q.num}</span>
    <div class="q-text">${q.text}</div>
    <div class="q-sub">${q.sub}</div>
    <div class="options">
      ${q.options.map((o, i) => `
        <div class="opt${sel === i ? ' selected' : ''}" onclick="selectOpt(${i})">
          <div class="opt-label">${o.label}</div>
          <div class="opt-text">${o.text}</div>
        </div>`).join('')}
    </div>`;
    }

    function selectOpt(i) {
      answers[current] = i;
      document.getElementById('nextBtn').disabled = false;
      renderQ();
    }

    function nextQ() {
      if (current < questions.length - 1) { current++; renderQ(); }
      else showResults();
    }

    function prevQ() {
      if (current > 0) { current--; renderQ(); }
    }

    function showResults() {
      const isAr = lang() === 'ar';
      document.getElementById('quizWrap').classList.remove('show');
      const scores = {};
      questions.forEach((q, qi) => {
        const ans = answers[qi];
        if (ans === undefined) return;
        const tags = q.options[ans].tags;
        Object.entries(tags).forEach(([k, v]) => { scores[k] = (scores[k] || 0) + v });
      });
      const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
      const maxScore = sorted[0] ? sorted[0][1] : 1;
      const top3 = sorted.slice(0, 3);
      const rankClass = ['rank-1', 'rank-2', 'rank-3'];
      const rankLabel = isAr
        ? ['#1 الأفضل تطابقًا', '#2 تطابق قوي', '#3 تطابق جيد']
        : ['#1 Best match', '#2 Strong match', '#3 Good match'];
      const alignmentSuffix = isAr ? 'تطابق مع ملفك الشخصي' : 'alignment with your profile';
      const strengthsLabel = isAr ? 'نقاط القوة' : 'Strengths';
      const considerLabel = isAr ? 'اعتبارات' : 'Consider';
      const pathLabel = isAr ? 'مسار التعلم' : 'Learning path';
      const barColors = ['#00C896', '#4A9EFF', '#F5A623'];
      const specs = currentSpecialties();
      document.getElementById('specCards').innerHTML = top3.map((s, i) => {
        const spec = specs[s[0]];
        if (!spec) return '';
        const pct = Math.round(s[1] / maxScore * 100);
        return `<div class="spec-card${i === 0 ? ' top' : ''}" data-aos="fade-up" data-aos-delay="${i * 100}">
      <div class="spec-card-header">
        <div class="spec-rank ${rankClass[i]}">${i + 1}</div>
        <div class="spec-info">
          <div class="spec-name">${spec.ico} ${spec.name}</div>
          <div class="spec-match">${isAr ? `${rankLabel[i]} — ${alignmentSuffix} ${pct}%` : `${rankLabel[i]} — ${pct}% ${alignmentSuffix}`}</div>
          <div class="spec-bar-wrap"><div class="spec-bar" style="width:0%;background:${barColors[i]}" data-w="${pct}"></div></div>
        </div>
      </div>
      <div class="spec-desc">${spec.desc}</div>
      <div class="spec-grid">
        <div class="spec-box">
        <div class='spec-title-wrap'>
            <div class="spec-box-ico">
            <i class="fi fi-br-badge-check"></i>
            </div>
          <div class="spec-box-title">${strengthsLabel}</div>
          </div>
          <div class="spec-box-items">${spec.strengths.map(x => `<div class="spec-box-item">${x}</div>`).join('')}</div>
        </div>
        <div class="spec-box">
        <div class="spec-title-wrap">
            <div class="spec-box-ico"><i class="fi fi-sr-choose"></i></div>
          <div class="spec-box-title">${considerLabel}</div>
          </div>
          <div class="spec-box-items">${spec.risks.map(x => `<div class="spec-box-item">${x}</div>`).join('')}</div>
        </div>
        <div class="spec-box">
          <div class='spec-title-wrap'>
            <div class="spec-box-ico"><i class="fi fi-bs-code-compare"></i></div>
          <div class="spec-box-title">${pathLabel}</div>
          </div>
          <div class="spec-box-items">${spec.path.slice(0, 3).map(x => `<div class="spec-box-item">${x}</div>`).join('')}</div>
        </div>
      </div>
    </div>`;
      }).join('');
      document.getElementById('resultsWrap').classList.add('show');
      setTimeout(() => { document.querySelectorAll('.spec-bar').forEach(b => { b.style.width = b.dataset.w + '%' }) }, 200);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (window.AOS) AOS.refreshHard();
    }

    document.addEventListener('ih:langchange', () => {
      if (document.getElementById('quizWrap').classList.contains('show')) renderQ();
      if (document.getElementById('resultsWrap').classList.contains('show')) showResults();
    });

    function restart() {
      Object.keys(answers).forEach(k => delete answers[k]);
      current = 0;
      document.getElementById('resultsWrap').classList.remove('show');
      document.getElementById('landing').style.display = '';
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (window.AOS) AOS.refreshHard();
    }

    AOS.init({
      duration: 700,
      easing: 'ease',
      once: true,
      offset: 80
    });
