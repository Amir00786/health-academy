// FIND YOUR PATH — pre-med / residency compass quiz
// Ported from the iHealth Academy v2 mockup. window.storage (a sandbox-only
// API in that mockup) is replaced here with a small localStorage shim so
// "save to my journey" still works on a plain static site.
(function () {
  const fpIntro = document.getElementById('fpIntro');
  if (!fpIntro) return;

  const storage = {
    async set(key, value) { localStorage.setItem(key, value); },
    async get(key) {
      const v = localStorage.getItem(key);
      return v == null ? null : { value: v };
    },
    async list(prefix) {
      const keys = Object.keys(localStorage).filter((k) => k.startsWith(prefix));
      return { keys };
    },
  };

  // Quiz UI + question text translations. Looked up by exact English string so
  // the TRACKS data below (question banks, dimension labels) didn't need to be
  // restructured — tr(s) returns the Arabic match when Arabic is active.
  const QUIZ_AR = {
    'Before Medical School': 'قبل كلية الطب',
    'After Medical School': 'بعد كلية الطب',
    'Strongly disagree': 'أرفض بشدة',
    'Disagree': 'أرفض',
    'Neutral': 'محايد',
    'Agree': 'أوافق',
    'Strongly agree': 'أوافق بشدة',

    'Scientific & Analytical Aptitude': 'القدرة العلمية والتحليلية',
    'Hands-On / Procedural Drive': 'الميل العملي / الإجرائي',
    'People & Bedside Orientation': 'التوجه نحو الناس ورعاية المريض',
    'Resilience & Stamina': 'الصمود والتحمل',
    'Financial Realism': 'الواقعية المالية',
    'Ethics & Service Drive': 'الأخلاق والدافع للخدمة',
    'Future & AI-Era Readiness': 'الاستعداد لعصر الذكاء الاصطناعي',

    'Procedural & Surgical Drive': 'الميل الإجرائي والجراحي',
    'Diagnostic Puzzle-Solving': 'حل الألغاز التشخيصية',
    'Continuity of Care': 'استمرارية الرعاية',
    'Emotional & Acute Intensity Tolerance': 'تحمل الشدة العاطفية والحادة',
    'Controllable Lifestyle Priority': 'أولوية نمط حياة يمكن التحكم به',
    'Income Ambition': 'الطموح المادي',
    'AI-Era Exposure Comfort': 'الارتياح للتعامل مع الذكاء الاصطناعي',

    'You retained chemistry and biology concepts more easily than most of your classmates.': 'استوعبت مفاهيم الكيمياء والأحياء بسهولة أكبر من معظم زملائك.',
    'You like knowing the exact mechanism behind why something happens in the body, not just that it does.': 'تحب معرفة الآلية الدقيقة وراء حدوث شيء في الجسم، وليس فقط أنه يحدث.',
    "Standardized science exams and long prep don't scare you off — you find a way to grind through them.": 'الامتحانات العلمية الموحدة والتحضير الطويل لا تخيفك — تجد طريقة لتجتازها.',
    "You'd rather read a real research paper than a simplified summary of it.": 'تفضل قراءة بحث علمي حقيقي على قراءة ملخص مبسط له.',

    "You'd rather perform a physical procedure yourself than direct someone else through it.": 'تفضل تنفيذ الإجراء الجسدي بنفسك على توجيه شخص آخر لتنفيذه.',
    'Fine motor tasks — stitching, building, precise repetitive movement — come naturally to you.': 'المهام الحركية الدقيقة — الخياطة، البناء، الحركة المتكررة الدقيقة — تأتي بشكل طبيعي لك.',
    'You get more satisfaction from a visible, immediate physical fix than a long-term management plan.': 'تشعر برضا أكبر من إصلاح جسدي فوري وملموس أكثر من خطة علاج طويلة الأمد.',
    'Labs, clinics, or operating rooms with hands-on equipment appeal to you more than a desk.': 'المختبرات أو العيادات أو غرف العمليات ذات المعدات العملية تجذبك أكثر من مكتب.',

    'You want a career built around one-on-one conversations with people who are scared or in pain.': 'تريد مسيرة مهنية مبنية على محادثات فردية مع أشخاص خائفين أو يعانون من الألم.',
    "You're comfortable delivering difficult news calmly and staying present afterward.": 'تشعر بالارتياح عند إيصال أخبار صعبة بهدوء والبقاء حاضرًا بعدها.',
    'Long-term relationships with the same patients over years sound rewarding, not repetitive.': 'العلاقات طويلة الأمد مع نفس المرضى عبر سنوات تبدو مجزية وليست مملة.',
    "You read people's emotional state quickly, even when they don't say it directly.": 'تقرأ الحالة العاطفية للناس بسرعة، حتى عندما لا يصرحون بها مباشرة.',

    'You can function and think clearly after a night of interrupted sleep.': 'يمكنك العمل والتفكير بوضوح بعد ليلة من النوم المتقطع.',
    "You're willing to commit 7+ years of intense training before your income reflects your effort.": 'أنت مستعد للالتزام بأكثر من 7 سنوات من التدريب المكثف قبل أن يعكس دخلك جهدك.',
    "Seeing suffering repeatedly wouldn't erode your motivation to keep showing up.": 'رؤية المعاناة بشكل متكرر لن تُضعف دافعك للاستمرار.',
    'You handle high-stakes pressure, where a mistake has real consequences, without shutting down.': 'تتعامل مع الضغط عالي المخاطر، حيث للخطأ عواقب حقيقية، دون أن تنهار.',

    "Earning potential is a real factor in which health path you'd choose, not just passion.": 'إمكانية الكسب عامل حقيقي في اختيار مسارك الصحي، وليس الشغف فقط.',
    "You're prepared to take on significant training debt for a payoff many years away.": 'أنت مستعد لتحمل ديون تدريب كبيرة مقابل عائد بعد سنوات عديدة.',
    'A high-ceiling path with years of low pay upfront appeals to you more than steady moderate pay sooner.': 'مسار ذو سقف مرتفع مع سنوات من الأجر المنخفض في البداية يجذبك أكثر من أجر معتدل وثابت مبكرًا.',
    "You've already thought about which health fields have stronger long-term earning potential.": 'لقد فكرت بالفعل في أي المجالات الصحية لديها إمكانية كسب أقوى على المدى الطويل.',

    "You feel a pull toward serving people who can't easily access good healthcare.": 'تشعر بانجذاب نحو خدمة الأشخاص الذين لا يستطيعون الوصول بسهولة إلى رعاية صحية جيدة.',
    "You'd choose the path that does more good over the one that pays better, if forced to pick.": 'ستختار المسار الذي يحقق خيرًا أكبر على المسار الذي يدفع أكثر، إذا اضطررت للاختيار.',
    'Fairness in how patients are treated regardless of background matters deeply to you.': 'العدالة في معاملة المرضى بغض النظر عن خلفيتهم أمر يهمك بعمق.',
    'You measure a good career partly by lives changed, not just income or prestige.': 'تقيس المسيرة المهنية الجيدة جزئيًا بعدد الحياة التي غيّرتها، وليس فقط بالدخل أو المكانة.',

    "You're curious about how AI is already changing diagnosis and treatment, not threatened by it.": 'أنت فضولي حول كيفية تغيير الذكاء الاصطناعي للتشخيص والعلاج، ولا تشعر بالتهديد منه.',
    'You want a role where human judgment stays central even as AI tools keep improving.': 'تريد دورًا يبقى فيه الحكم البشري محوريًا حتى مع استمرار تحسن أدوات الذكاء الاصطناعي.',
    "You already use, or want to learn, AI and health-tech tools as part of how you study or plan to work.": 'أنت بالفعل تستخدم، أو تريد تعلم، أدوات الذكاء الاصطناعي والتقنية الصحية كجزء من طريقة دراستك أو عملك المستقبلي.',
    "You're drawn to a field being actively reshaped by technology right now, not one that feels settled.": 'أنت منجذب إلى مجال تعيد التقنية تشكيله بنشاط الآن، وليس مجالًا يبدو مستقرًا.',

    "You'd rather be the one performing a procedure than managing a condition with medication alone.": 'تفضل أن تكون من يقوم بالإجراء بدلاً من إدارة الحالة بالأدوية فقط.',
    'Working with your hands under time pressure energizes you rather than drains you.': 'العمل بيديك تحت ضغط الوقت يمنحك طاقة بدلاً من أن يستنزفك.',
    'You want to see the direct physical result of your work within minutes or hours, not months.': 'تريد رؤية النتيجة الجسدية المباشرة لعملك خلال دقائق أو ساعات، وليس أشهرًا.',
    "Long stretches of standing, focus, and precision during a procedure don't wear you down the way they might others.": 'فترات طويلة من الوقوف والتركيز والدقة أثناء الإجراء لا تُنهكك كما قد تُنهك الآخرين.',

    'You enjoy chasing an unclear diagnosis through a long list of possibilities more than treating a known one.': 'تستمتع بملاحقة تشخيص غير واضح عبر قائمة طويلة من الاحتمالات أكثر من علاج حالة معروفة.',
    "You'd rather reason broadly across systems — labs, imaging, history — than specialize narrowly on one organ.": 'تفضل التفكير بشكل واسع عبر الأنظمة — المختبرات، التصوير، التاريخ المرضي — على التخصص الضيق في عضو واحد.',
    "Ambiguous cases that don't fit a textbook pattern excite you rather than frustrate you.": 'الحالات الغامضة التي لا تتناسب مع نمط الكتب الدراسية تُثيرك بدلاً من أن تُحبطك.',
    "You like being the doctor other doctors call when they're stuck.": 'تحب أن تكون الطبيب الذي يتصل به الأطباء الآخرون عندما يعلقون.',

    "You want to know your patients well enough to remember their kids' names and life events.": 'تريد معرفة مرضاك جيدًا بما يكفي لتتذكر أسماء أطفالهم وأحداث حياتهم.',
    'Managing a chronic condition over years, adjusting slowly, sounds more satisfying than one decisive intervention.': 'إدارة حالة مزمنة عبر سنوات، مع تعديلات تدريجية، تبدو أكثر إرضاءً من تدخل حاسم واحد.',
    "You'd rather build trust over many visits than resolve something in a single encounter.": 'تفضل بناء الثقة عبر زيارات عديدة على حل شيء ما في لقاء واحد.',
    'Preventive care and long-term relationship-building matter more to you than acute crisis response.': 'الرعاية الوقائية وبناء العلاقات طويلة الأمد تهمك أكثر من الاستجابة للأزمات الحادة.',

    'You can stay emotionally steady around death, terminal diagnoses, or pediatric suffering without it eroding you over time.': 'يمكنك البقاء مستقرًا عاطفيًا حول الموت، أو التشخيصات النهائية، أو معاناة الأطفال دون أن يُنهكك ذلك مع الوقت.',
    'High-stakes, rapid-decision environments, where seconds matter, bring out your best performance.': 'البيئات عالية المخاطر وسريعة القرار، حيث تهم الثواني، تُخرج أفضل أدائك.',
    "You'd rather work unpredictable, high-adrenaline shifts than a calm, scheduled clinic day.": 'تفضل العمل في نوبات غير متوقعة وعالية الأدرينالين على يوم عيادة هادئ ومجدول.',
    "Delivering devastating news is something you could do regularly without it wearing you down.": 'إيصال أخبار مدمرة هو أمر يمكنك القيام به بانتظام دون أن يُنهكك.',

    'Predictable hours and a controllable schedule matter more to you than being at the center of the action.': 'الساعات المتوقعة والجدول القابل للتحكم يهمانك أكثر من أن تكون في مركز الحدث.',
    "You want a specialty where overnight call is the exception, not the norm.": 'تريد تخصصًا تكون فيه المناوبة الليلية استثناءً، وليست القاعدة.',
    'Protecting time for family, hobbies, or a second interest outside medicine is a real priority for you.': 'حماية الوقت للعائلة أو الهوايات أو اهتمام آخر خارج الطب أولوية حقيقية بالنسبة لك.',
    "You'd trade some prestige or income for a schedule you can actually plan your life around.": 'ستتنازل عن بعض المكانة أو الدخل مقابل جدول يمكنك التخطيط لحياتك حوله فعليًا.',

    "Earning potential is a real factor in which specialty you'd rank first, not an afterthought.": 'إمكانية الكسب عامل حقيقي في ترتيب التخصص الأول لديك، وليس فكرة ثانوية.',
    "You're willing to do an extra 1-2 years of fellowship if it meaningfully raises your ceiling.": 'أنت مستعد لقضاء 1-2 سنة إضافية من الزمالة إذا رفعت سقفك بشكل ملموس.',
    'A demanding schedule is worth it to you if the compensation reflects that demand.': 'الجدول الشاق يستحق العناء بالنسبة لك إذا كان التعويض يعكس ذلك الجهد.',
    "You've already looked into which specialties tend to pay more, and it influences your ranking.": 'لقد بحثت بالفعل عن التخصصات التي تدفع أكثر، وهذا يؤثر على ترتيبك.',

    "You're comfortable in a specialty where AI already reads images or flags findings alongside you.": 'أنت مرتاح في تخصص يقرأ فيه الذكاء الاصطناعي الصور بالفعل أو يُشير إلى النتائج بجانبك.',
    "You'd rather be augmented by powerful diagnostic AI than avoid a field because of it.": 'تفضل أن يُعزز عملك ذكاء اصطناعي تشخيصي قوي على تجنب مجال بسببه.',
    'You want your specialty to still need a human at the center of it in 30 years, even if AI handles more of the routine work.': 'تريد أن يظل تخصصك بحاجة إلى إنسان في مركزه بعد 30 عامًا، حتى لو تولى الذكاء الاصطناعي المزيد من العمل الروتيني.',
    "You're excited to learn AI-assisted tools — image analysis, robotic assistance, predictive models — as part of your specialty, not reluctant.": 'أنت متحمس لتعلم أدوات مدعومة بالذكاء الاصطناعي — تحليل الصور، المساعدة الروبوتية، النماذج التنبؤية — كجزء من تخصصك، وليس مترددًا.',
  };

  function fpLang() {
    return (window.I18N && window.I18N.currentLang) ? window.I18N.currentLang() : 'en';
  }
  function tr(s) {
    if (fpLang() !== 'ar') return s;
    return QUIZ_AR[s] || s;
  }
  function fpQuestionCounter(n, total) {
    return fpLang() === 'ar' ? `السؤال ${n} من ${total}` : `Question ${n} of ${total}`;
  }

  const TRACKS = {
    premed: {
      label: 'Pre-Medical',
      heroNote: 'Before Medical School',
      resultsTitle: 'Your top ten health paths',
      resultsSub: "Not everyone who loves biology should become a physician — this compares your answers against twelve real paths in health care, from clinical practice to research to the technology behind it.",
      dims: [
        { id: 'science', label: 'Scientific & Analytical Aptitude', short: 'SCIENCE', color: '#C9A227' },
        { id: 'hands', label: 'Hands-On / Procedural Drive', short: 'HANDS', color: '#E7C766' },
        { id: 'bedside', label: 'People & Bedside Orientation', short: 'BEDSIDE', color: '#5FA8A0' },
        { id: 'resilience', label: 'Resilience & Stamina', short: 'GRIT', color: '#C1594B' },
        { id: 'financial', label: 'Financial Realism', short: 'MONEY', color: '#8FB8DE' },
        { id: 'ethical', label: 'Ethics & Service Drive', short: 'ETHICS', color: '#D6A9E0' },
        { id: 'future', label: 'Future & AI-Era Readiness', short: 'AI-ERA', color: '#78D6C6' },
      ],
      questions: {
        science: [
          'You retained chemistry and biology concepts more easily than most of your classmates.',
          "You like knowing the exact mechanism behind why something happens in the body, not just that it does.",
          "Standardized science exams and long prep don't scare you off — you find a way to grind through them.",
          "You'd rather read a real research paper than a simplified summary of it.",
        ],
        hands: [
          "You'd rather perform a physical procedure yourself than direct someone else through it.",
          'Fine motor tasks — stitching, building, precise repetitive movement — come naturally to you.',
          "You get more satisfaction from a visible, immediate physical fix than a long-term management plan.",
          'Labs, clinics, or operating rooms with hands-on equipment appeal to you more than a desk.',
        ],
        bedside: [
          "You want a career built around one-on-one conversations with people who are scared or in pain.",
          "You're comfortable delivering difficult news calmly and staying present afterward.",
          'Long-term relationships with the same patients over years sound rewarding, not repetitive.',
          "You read people's emotional state quickly, even when they don't say it directly.",
        ],
        resilience: [
          'You can function and think clearly after a night of interrupted sleep.',
          "You're willing to commit 7+ years of intense training before your income reflects your effort.",
          "Seeing suffering repeatedly wouldn't erode your motivation to keep showing up.",
          'You handle high-stakes pressure, where a mistake has real consequences, without shutting down.',
        ],
        financial: [
          "Earning potential is a real factor in which health path you'd choose, not just passion.",
          "You're prepared to take on significant training debt for a payoff many years away.",
          'A high-ceiling path with years of low pay upfront appeals to you more than steady moderate pay sooner.',
          "You've already thought about which health fields have stronger long-term earning potential.",
        ],
        ethical: [
          "You feel a pull toward serving people who can't easily access good healthcare.",
          "You'd choose the path that does more good over the one that pays better, if forced to pick.",
          'Fairness in how patients are treated regardless of background matters deeply to you.',
          'You measure a good career partly by lives changed, not just income or prestige.',
        ],
        future: [
          "You're curious about how AI is already changing diagnosis and treatment, not threatened by it.",
          'You want a role where human judgment stays central even as AI tools keep improving.',
          "You already use, or want to learn, AI and health-tech tools as part of how you study or plan to work.",
          "You're drawn to a field being actively reshaped by technology right now, not one that feels settled.",
        ],
      },
      items: [
        { name: 'Physician (MD/DO) — General Path', field: 'Medicine', path: '4 yrs undergrad + 4 yrs med school + 3-7 yrs residency', v: [.90, .55, .85, .95, .55, .80, .55], note: 'The longest and most demanding route on this list — but the widest range of specialties waits on the other side, from high-touch primary care to highly technical surgery.' },
        { name: 'Dentistry', field: 'Oral Health', path: '4 yrs undergrad + 4 yrs dental school', v: [.80, .85, .55, .70, .80, .50, .50], note: 'Shorter, more predictable training than medicine, strong controllable earning potential, and a heavy hands-on core.' },
        { name: 'Pharmacy', field: 'Pharmaceutical Care', path: '4 yrs undergrad + 4 yrs PharmD', v: [.85, .35, .45, .55, .55, .55, .60], note: 'Deep pharmacology expertise with far more predictable hours than clinical medicine.' },
        { name: 'Physician Assistant / Clinical Associate', field: 'Medicine (Advanced Practice)', path: 'Undergrad + ~2-3 yr PA program', v: [.75, .60, .80, .65, .55, .65, .60], note: 'Broad clinical practice and direct patient care in roughly a third of the training time of becoming a physician.' },
        { name: 'Nursing (BSN → Nurse Practitioner)', field: 'Nursing', path: '3-4 yrs BSN, +2 yrs for NP', v: [.60, .55, .90, .65, .40, .80, .50], note: 'The fastest route into sustained direct patient care, with a clear path to prescribing authority via NP training.' },
        { name: 'Biomedical Engineering / MedTech', field: 'Engineering', path: '4-5 yrs undergrad, often +grad', v: [.90, .60, .25, .50, .70, .55, .95], note: 'For people who want to build the devices and diagnostics doctors use, rather than use them directly on patients.' },
        { name: 'Public Health / Epidemiology', field: 'Population Health', path: '3-4 yrs undergrad, often +MPH', v: [.65, .20, .45, .50, .35, .85, .65], note: 'Population-scale impact through policy, outbreak response, and health systems, without direct one-on-one clinical practice.' },
        { name: 'Physical Therapy', field: 'Rehabilitation', path: 'Undergrad + Doctor of Physical Therapy', v: [.60, .80, .80, .55, .45, .65, .40], note: 'Hands-on rehabilitation with long-term patient relationships and a shorter path than medicine.' },
        { name: 'Medical Research / MD-PhD', field: 'Academic Science', path: 'Undergrad + 6-8 yr combined program', v: [.95, .40, .30, .75, .40, .60, .85], note: 'For people more excited by discovering the next treatment than delivering the current one.' },
        { name: 'Veterinary Medicine', field: 'Animal Health', path: '4 yrs undergrad + 4 yrs vet school', v: [.85, .75, .60, .70, .45, .70, .45], note: 'Same rigor and hands-on clinical skill as human medicine, applied to a very different kind of bedside manner.' },
        { name: 'Health Administration / Hospital Management', field: 'Health Systems', path: 'Undergrad + often MHA/MBA', v: [.40, .20, .50, .50, .70, .55, .55], note: 'Runs the systems doctors work inside — a business-and-policy path into the same institutions.' },
        { name: 'Mental Health Counseling / Clinical Psychology', field: 'Behavioral Health', path: 'Undergrad + Masters or Doctorate', v: [.50, .20, .95, .60, .35, .85, .45], note: 'The most conversation-centered path in health care, without the biological or procedural core of medicine.' },
      ],
    },

    residency: {
      label: 'Residency Match',
      heroNote: 'After Medical School',
      resultsTitle: 'Your top ten specialties',
      resultsSub: "Ranked by how closely your answers align with the daily reality of each specialty — not its reputation. Tap a card for the specific AI-era note on that field.",
      dims: [
        { id: 'procedural', label: 'Procedural & Surgical Drive', short: 'PROC', color: '#C9A227' },
        { id: 'cognitive', label: 'Diagnostic Puzzle-Solving', short: 'DX', color: '#E7C766' },
        { id: 'continuity', label: 'Continuity of Care', short: 'RELATE', color: '#5FA8A0' },
        { id: 'intensity', label: 'Emotional & Acute Intensity Tolerance', short: 'INTENSE', color: '#C1594B' },
        { id: 'lifestyle', label: 'Controllable Lifestyle Priority', short: 'HOURS', color: '#8FB8DE' },
        { id: 'financial', label: 'Income Ambition', short: 'INCOME', color: '#D6A9E0' },
        { id: 'future', label: 'AI-Era Exposure Comfort', short: 'AI-ERA', color: '#78D6C6' },
      ],
      questions: {
        procedural: [
          "You'd rather be the one performing a procedure than managing a condition with medication alone.",
          'Working with your hands under time pressure energizes you rather than drains you.',
          'You want to see the direct physical result of your work within minutes or hours, not months.',
          "Long stretches of standing, focus, and precision during a procedure don't wear you down the way they might others.",
        ],
        cognitive: [
          'You enjoy chasing an unclear diagnosis through a long list of possibilities more than treating a known one.',
          "You'd rather reason broadly across systems — labs, imaging, history — than specialize narrowly on one organ.",
          "Ambiguous cases that don't fit a textbook pattern excite you rather than frustrate you.",
          "You like being the doctor other doctors call when they're stuck.",
        ],
        continuity: [
          "You want to know your patients well enough to remember their kids' names and life events.",
          'Managing a chronic condition over years, adjusting slowly, sounds more satisfying than one decisive intervention.',
          "You'd rather build trust over many visits than resolve something in a single encounter.",
          'Preventive care and long-term relationship-building matter more to you than acute crisis response.',
        ],
        intensity: [
          'You can stay emotionally steady around death, terminal diagnoses, or pediatric suffering without it eroding you over time.',
          'High-stakes, rapid-decision environments, where seconds matter, bring out your best performance.',
          "You'd rather work unpredictable, high-adrenaline shifts than a calm, scheduled clinic day.",
          "Delivering devastating news is something you could do regularly without it wearing you down.",
        ],
        lifestyle: [
          'Predictable hours and a controllable schedule matter more to you than being at the center of the action.',
          "You want a specialty where overnight call is the exception, not the norm.",
          'Protecting time for family, hobbies, or a second interest outside medicine is a real priority for you.',
          "You'd trade some prestige or income for a schedule you can actually plan your life around.",
        ],
        financial: [
          "Earning potential is a real factor in which specialty you'd rank first, not an afterthought.",
          "You're willing to do an extra 1-2 years of fellowship if it meaningfully raises your ceiling.",
          'A demanding schedule is worth it to you if the compensation reflects that demand.',
          "You've already looked into which specialties tend to pay more, and it influences your ranking.",
        ],
        future: [
          "You're comfortable in a specialty where AI already reads images or flags findings alongside you.",
          "You'd rather be augmented by powerful diagnostic AI than avoid a field because of it.",
          'You want your specialty to still need a human at the center of it in 30 years, even if AI handles more of the routine work.',
          "You're excited to learn AI-assisted tools — image analysis, robotic assistance, predictive models — as part of your specialty, not reluctant.",
        ],
      },
      items: [
        { name: 'Internal Medicine', field: 'Cognitive / Primary', path: '3 yr residency, +2-3 yr fellowship for subspecialty', v: [.25, .85, .75, .55, .45, .45, .55], note: 'The broadest cognitive specialty and the gateway to most subspecialties (cardiology, GI, pulmonology) if you want more procedures later.', ai: 'AI-driven decision support is expanding fast here, but synthesizing a whole patient across systems keeps the physician central.' },
        { name: 'Family Medicine', field: 'Primary Care', path: '3 yr residency', v: [.30, .55, .95, .35, .70, .35, .45], note: 'The most relationship-dense specialty on this list — you may treat three generations of the same family.', ai: 'AI scribing and triage tools are easing documentation load, but the relational core is the hardest part of medicine to automate.' },
        { name: 'Pediatrics', field: 'Primary / Continuity', path: '3 yr residency, +fellowship for subspecialty', v: [.30, .60, .85, .55, .55, .30, .40], note: 'Continuity care with an entirely different communication skill set — your patient and your decision-maker are often different people.', ai: 'Growth and developmental screening tools are becoming AI-assisted, but pediatric judgment stays heavily human.' },
        { name: 'General Surgery', field: 'Procedural', path: '5 yr residency, +fellowship common', v: [.95, .55, .30, .85, .20, .75, .45], note: 'Physically and mentally demanding with the most direct, visible outcomes in medicine.', ai: 'Robotic-assisted platforms are changing technique, not replacing the surgeon — someone still has to own the operating table.' },
        { name: 'Orthopedic Surgery', field: 'Procedural', path: '5 yr residency, +fellowship common', v: [.95, .45, .35, .60, .35, .90, .50], note: 'Highly procedural, mechanically minded, with strong long-term earning potential across most health systems.', ai: 'Surgical planning and implant-fitting software are advancing quickly, mostly as precision tools for the surgeon.' },
        { name: 'Neurosurgery', field: 'Procedural', path: '6-7 yr residency', v: [.95, .60, .25, .95, .10, .95, .50], note: 'The most demanding training length and intensity here, matched by the highest technical ceiling.', ai: 'Intraoperative navigation and imaging AI assist precision, but margin for error stays entirely human-owned.' },
        { name: 'Obstetrics & Gynecology', field: 'Procedural / Continuity', path: '4 yr residency', v: [.80, .50, .60, .85, .25, .65, .40], note: 'A rare mix of surgery, primary care, and unpredictable emergencies — no two shifts look the same.', ai: 'Fetal monitoring and prenatal risk models are AI-assisted, but delivery-room decisions remain fast, human, and high-stakes.' },
        { name: 'Psychiatry', field: 'Cognitive / Relational', path: '4 yr residency', v: [.10, .60, .90, .70, .70, .40, .25], note: 'The specialty most built around sustained conversation and trust — least procedural, most relational.', ai: 'Currently one of the most AI-resistant specialties: the therapeutic relationship itself is the treatment.' },
        { name: 'Emergency Medicine', field: 'Acute', path: '3-4 yr residency', v: [.65, .80, .10, .95, .55, .60, .50], note: 'Rapid triage across every organ system with no continuity and no advance warning of what walks through the door.', ai: 'Triage and risk-scoring AI is already common in EDs, functioning as a second opinion under time pressure, not a replacement.' },
        { name: 'Anesthesiology', field: 'Procedural / Acute', path: '4 yr residency, +fellowship common', v: [.80, .45, .10, .80, .55, .80, .55], note: 'High-stakes vigilance during procedures, with more schedule predictability than surgery itself.', ai: 'Closed-loop monitoring and dosing-assist systems are advancing, keeping the anesthesiologist as the safety-critical overseer.' },
        { name: 'Diagnostic Radiology', field: 'Cognitive / Imaging', path: '4-5 yr residency, +fellowship common', v: [.30, .95, .05, .30, .75, .80, .90], note: 'The most image-and-pattern-driven specialty in medicine, with strong lifestyle flexibility.', ai: 'The specialty most transformed by AI over the last 20 years — image-analysis models now flag findings routinely; radiologists increasingly supervise, correlate, and communicate rather than read every pixel alone.' },
        { name: 'Pathology', field: 'Cognitive / Diagnostic', path: '4 yr residency, +fellowship common', v: [.35, .90, .05, .25, .80, .60, .85], note: "The diagnostic backbone behind nearly every other specialty's decisions, with minimal direct patient contact.", ai: "Digital pathology and AI slide-analysis are following radiology's trajectory closely — expect the same augmentation curve over the next decade." },
        { name: 'Dermatology', field: 'Procedural / Cognitive', path: '3-4 yr residency, highly competitive', v: [.55, .65, .55, .15, .90, .85, .50], note: 'Strong lifestyle control, pattern-recognition-heavy diagnosis, and a mix of medical and procedural work.', ai: 'Skin-lesion classification AI is maturing quickly; expect it as a routine second check rather than a threat to the specialty.' },
        { name: 'Ophthalmology', field: 'Procedural', path: '4 yr residency', v: [.80, .55, .50, .30, .70, .75, .55], note: 'Microsurgical precision work with generally predictable scheduling outside of emergencies.', ai: 'Retinal-imaging AI already screens for diabetic and macular disease at scale, freeing physicians for surgical and complex cases.' },
        { name: 'Otolaryngology (ENT)', field: 'Procedural', path: '5 yr residency', v: [.80, .55, .45, .50, .55, .75, .50], note: 'Broad surgical scope across head and neck, from routine clinic work to complex reconstructive cases.', ai: 'Imaging-assist tools are growing, but the anatomical variability of the region keeps hands-on skill central.' },
        { name: 'Urology', field: 'Procedural', path: '5 yr residency', v: [.80, .50, .45, .45, .55, .75, .55], note: 'A strong mix of office-based medicine and operating-room work, including a fast-growing robotic-surgery track.', ai: 'Robotic platforms are now standard in much of urologic surgery — comfort with tech-assisted operating is a real asset here.' },
        { name: 'Plastic Surgery', field: 'Procedural', path: '6 yr integrated residency', v: [.90, .40, .40, .50, .45, .90, .50], note: 'Reconstructive and aesthetic work with high technical creativity and strong earning ceiling.', ai: '3D imaging and surgical-simulation tools are increasingly used in planning, but execution stays entirely manual.' },
        { name: 'Physical Medicine & Rehabilitation', field: 'Continuity', path: '4 yr residency', v: [.35, .45, .80, .20, .85, .40, .35], note: 'One of the best-controlled lifestyles in medicine, centered on function and long-term recovery.', ai: 'Wearable sensors and movement-tracking AI are starting to inform rehab plans, mostly as data feeding human-designed programs.' },
        { name: 'Neurology', field: 'Cognitive', path: '4 yr residency, +fellowship common', v: [.20, .95, .60, .50, .50, .50, .55], note: "Complex, often slow-moving diagnostic reasoning through one of medicine's least-understood systems.", ai: 'Stroke-imaging AI already speeds time-critical decisions; broader neurologic diagnosis remains a deeply human reasoning task.' },
        { name: 'Medical Oncology', field: 'Cognitive / Continuity', path: '3 yr IM residency + 3 yr fellowship', v: [.15, .75, .80, .90, .35, .55, .50], note: 'Emotionally demanding, relationship-heavy care through some of the highest-stakes conversations in medicine.', ai: 'Treatment-matching and genomic-analysis AI are accelerating fast, but breaking news and guiding decisions stays profoundly human.' },
        { name: 'Radiation Oncology', field: 'Procedural / Cognitive', path: '5 yr residency', v: [.40, .60, .55, .60, .60, .80, .60], note: 'A hybrid of physics, imaging, and oncology with more schedule control than most cancer-focused fields.', ai: 'Treatment-planning software already uses AI-assisted dose optimization, making comfort with tech-heavy workflows a real advantage.' },
        { name: 'Preventive Medicine / Public Health (Physician)', field: 'Population Health', path: '1 yr clinical + 2 yr preventive medicine residency', v: [.05, .45, .50, .15, .90, .30, .50], note: 'The physician track most focused on populations and systems rather than individual patients.', ai: 'Outbreak-prediction and population-risk models are growing tools of the trade, complementing rather than replacing policy judgment.' },
      ],
    },
  };

  let trackKey = null;
  let track = null;
  let order = [];
  let answers = [];
  let current = 0;

  const fpSvgNS = 'http://www.w3.org/2000/svg';
  const fpCx = 160, fpCy = 160;

  function fpInterleave(arr) {
    const buckets = {};
    arr.forEach((item) => { (buckets[item.dim] = buckets[item.dim] || []).push(item); });
    const keys = Object.keys(buckets);
    const out = [];
    let i = 0;
    while (out.length < arr.length) {
      keys.forEach((k) => { if (buckets[k][i]) out.push(buckets[k][i]); });
      i++;
    }
    return out;
  }

  function fpStartTrack(key) {
    trackKey = key;
    track = TRACKS[key];
    const o = [];
    track.dims.forEach((d, di) => { track.questions[d.id].forEach((q) => o.push({ dim: d.id, dimIdx: di, text: q })); });
    order = fpInterleave(o);
    answers = new Array(order.length).fill(null);
    current = 0;

    document.getElementById('fpIntro').classList.add('hidden');
    document.getElementById('fpQuiz').classList.remove('hidden');
    document.getElementById('fpResults').classList.add('hidden');
    document.getElementById('fpJourney').classList.add('hidden');
    document.getElementById('fpTrackPill').textContent = tr(track.heroNote);
    fpBuildCompassLabels();
    fpRenderQuestion();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  document.getElementById('fpCardPremed').addEventListener('click', () => fpStartTrack('premed'));
  document.getElementById('fpCardResidency').addEventListener('click', () => fpStartTrack('residency'));

  document.addEventListener('ih:langchange', () => {
    if (track && !document.getElementById('fpQuiz').classList.contains('hidden')) {
      document.getElementById('fpTrackPill').textContent = tr(track.heroNote);
      fpRenderQuestion();
    }
  });

  function fpBuildCompassLabels() {
    const ticksG = document.getElementById('fpTicks');
    const labelsG = document.getElementById('fpDimLabels');
    ticksG.innerHTML = '';
    labelsG.innerHTML = '';
    const dims = track ? track.dims : [
      { short: 'SCIENCE' }, { short: 'HANDS' }, { short: 'BEDSIDE' }, { short: 'GRIT' }, { short: 'MONEY' }, { short: 'ETHICS' }, { short: 'AI-ERA' },
    ];
    const n = dims.length;
    for (let i = 0; i < n; i++) {
      const angle = (i / n) * 2 * Math.PI - Math.PI / 2;
      const x1 = fpCx + 140 * Math.cos(angle), y1 = fpCy + 140 * Math.sin(angle);
      const x2 = fpCx + 128 * Math.cos(angle), y2 = fpCy + 128 * Math.sin(angle);
      const tick = document.createElementNS(fpSvgNS, 'line');
      tick.setAttribute('x1', x1); tick.setAttribute('y1', y1);
      tick.setAttribute('x2', x2); tick.setAttribute('y2', y2);
      tick.setAttribute('stroke', '#E8A33D'); tick.setAttribute('stroke-width', '2');
      ticksG.appendChild(tick);
      const lx = fpCx + 154 * Math.cos(angle), ly = fpCy + 154 * Math.sin(angle) + 3;
      const label = document.createElementNS(fpSvgNS, 'text');
      label.setAttribute('x', lx); label.setAttribute('y', ly);
      label.setAttribute('class', 'fp-c-label');
      label.textContent = dims[i].short;
      labelsG.appendChild(label);
    }
  }
  fpBuildCompassLabels();

  const FP_RING_LEN = 2 * Math.PI * 128;
  document.getElementById('fpProgressRing').setAttribute('stroke-dasharray', FP_RING_LEN.toFixed(1));

  function fpCurrentAverages() {
    const dims = track.dims;
    const sums = dims.map(() => ({ s: 0, c: 0 }));
    order.forEach((q, i) => {
      if (answers[i] != null) {
        sums[q.dimIdx].s += (answers[i] - 1) / 4;
        sums[q.dimIdx].c += 1;
      }
    });
    return sums.map((s) => (s.c ? s.s / s.c : 0.5));
  }

  function fpUpdateCompass() {
    const answeredCount = answers.filter((a) => a != null).length;
    const pct = answeredCount / order.length;
    const off = FP_RING_LEN * (1 - pct);
    document.getElementById('fpProgressRing').setAttribute('stroke-dashoffset', off.toFixed(1));
    document.getElementById('fpPctText').textContent = Math.round(pct * 100) + '%';

    const avgs = fpCurrentAverages();
    let maxI = 0;
    avgs.forEach((v, i) => { if (v > avgs[maxI]) maxI = i; });
    const angleDeg = (maxI / track.dims.length) * 360;
    document.getElementById('fpNeedle').style.transform = 'rotate(' + angleDeg + 'deg)';
  }

  function fpRenderQuestion() {
    const q = order[current];
    const dim = track.dims[q.dimIdx];
    document.getElementById('fpDimTag').textContent = '● ' + tr(dim.label);
    document.getElementById('fpQCount').textContent = fpQuestionCounter(current + 1, order.length);
    document.getElementById('fpQText').textContent = tr(q.text);

    const scale = document.getElementById('fpScale');
    scale.innerHTML = '';
    const labels = ['Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree'];
    labels.forEach((lbl, idx) => {
      const val = idx + 1;
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.innerHTML = '<span class="fp-dot"></span>' + tr(lbl);
      if (answers[current] === val) btn.classList.add('selected');
      btn.addEventListener('click', () => {
        answers[current] = val;
        fpUpdateCompass();
        setTimeout(() => {
          if (current < order.length - 1) { current++; fpRenderQuestion(); }
          else { fpShowResults(); }
        }, 180);
      });
      scale.appendChild(btn);
    });

    document.getElementById('fpBackBtn').style.visibility = current === 0 ? 'hidden' : 'visible';
    const qcard = document.getElementById('fpQcard');
    qcard.style.animation = 'none';
    void qcard.offsetWidth;
    qcard.style.animation = '';
    fpUpdateCompass();
  }

  document.getElementById('fpBackBtn').addEventListener('click', () => {
    if (current > 0) { current--; fpRenderQuestion(); }
  });
  document.getElementById('fpSkipBtn').addEventListener('click', () => {
    if (current < order.length - 1) { current++; fpRenderQuestion(); }
    else { fpShowResults(); }
  });

  function fpDot(a, b) { return a.reduce((s, v, i) => s + v * b[i], 0); }
  function fpMag(a) { return Math.sqrt(a.reduce((s, v) => s + v * v, 0)); }
  function fpCosine(a, b) { const m = fpMag(a) * fpMag(b); return m === 0 ? 0 : fpDot(a, b) / m; }

  let fpLastResults = [];
  let fpUserVec = [];

  function fpShowResults() {
    document.getElementById('fpQuiz').classList.add('hidden');
    document.getElementById('fpResults').classList.remove('hidden');
    document.getElementById('fpJourney').classList.remove('hidden');
    fpUserVec = fpCurrentAverages();

    document.getElementById('fpResultsTitle').textContent = track.resultsTitle;
    document.getElementById('fpResultsSub').textContent = track.resultsSub;

    const scored = track.items.map((s) => {
      const sim = fpCosine(fpUserVec, s.v);
      return { ...s, match: Math.round(sim * 100) };
    }).sort((a, b) => b.match - a.match).slice(0, 10);
    fpLastResults = scored;

    fpRenderRadar(fpUserVec, scored[0].v);
    fpRenderRankList(scored, fpUserVec);
    fpRenderJourney();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function fpPolar(valueFrac, index, total, radius) {
    const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
    const r = radius * valueFrac;
    return [fpCx + r * Math.cos(angle), fpCy + r * Math.sin(angle)];
  }

  function fpRenderRadar(userV, topV) {
    const svg = document.getElementById('fpRadarSvg');
    svg.innerHTML = '';
    const dims = track.dims;
    const n = dims.length;
    const maxR = 108;

    [0.25, 0.5, 0.75, 1].forEach((f) => {
      const pts = [];
      for (let i = 0; i < n; i++) pts.push(fpPolar(f, i, n, maxR).join(','));
      const poly = document.createElementNS(fpSvgNS, 'polygon');
      poly.setAttribute('points', pts.join(' '));
      poly.setAttribute('fill', 'none');
      poly.setAttribute('stroke', '#E3EAE9');
      svg.appendChild(poly);
    });
    for (let i = 0; i < n; i++) {
      const [x, y] = fpPolar(1, i, n, maxR);
      const line = document.createElementNS(fpSvgNS, 'line');
      line.setAttribute('x1', fpCx); line.setAttribute('y1', fpCy);
      line.setAttribute('x2', x); line.setAttribute('y2', y);
      line.setAttribute('stroke', '#E3EAE9');
      svg.appendChild(line);
      const [lx, ly] = fpPolar(1.22, i, n, maxR);
      const t = document.createElementNS(fpSvgNS, 'text');
      t.setAttribute('x', lx); t.setAttribute('y', ly + 3);
      t.setAttribute('text-anchor', 'middle');
      t.setAttribute('font-family', 'Roboto, sans-serif');
      t.setAttribute('font-size', '7.5');
      t.setAttribute('fill', '#5B6B69');
      t.textContent = dims[i].short;
      svg.appendChild(t);
    }
    function polyFor(v, stroke, fill) {
      const pts = [];
      for (let i = 0; i < n; i++) pts.push(fpPolar(v[i], i, n, maxR).join(','));
      const poly = document.createElementNS(fpSvgNS, 'polygon');
      poly.setAttribute('points', pts.join(' '));
      poly.setAttribute('fill', fill);
      poly.setAttribute('stroke', stroke);
      poly.setAttribute('stroke-width', '2');
      svg.appendChild(poly);
    }
    polyFor(topV, 'rgba(232,163,61,0.95)', 'rgba(232,163,61,0.14)');
    polyFor(userV, '#0B7A75', 'rgba(11,122,117,0.16)');

    document.getElementById('fpRadarLegend').innerHTML =
      '<div><span class="fp-swatch" style="background:#0B7A75"></span> You</div>' +
      '<div><span class="fp-swatch" style="background:#E8A33D"></span> Top match: ' + fpLastResults[0].name + '</div>';
  }

  function fpRenderRankList(scored, userV) {
    const list = document.getElementById('fpRankList');
    list.innerHTML = '';
    const dims = track.dims;
    scored.forEach((s, idx) => {
      const card = document.createElement('div');
      card.className = 'fp-rank-card';
      const gapDims = dims.map((d, i) => ({ label: d.short, you: userV[i], need: s.v[i] }));
      const strengths = [...gapDims].sort((a, b) => b.you * b.need - a.you * a.need).slice(0, 2).map((g) => g.label.toLowerCase());
      card.innerHTML = `
        <div class="fp-rank-num">${String(idx + 1).padStart(2, '0')}</div>
        <div>
          <div class="fp-rank-name">${s.name}</div>
          <div class="fp-rank-meta">${s.field} · ${s.path}</div>
        </div>
        <div class="fp-rank-match"><b>${s.match}%</b><span>match</span></div>
        <div class="fp-rank-detail">
          <p>${s.note}</p>
          <p class="fp-why">Strongest overlap with your answers: <strong>${strengths.join(' &amp; ')}</strong>.</p>
          ${s.ai ? `<p class="fp-ai-note">${s.ai}</p>` : ''}
          ${dims.map((d, i) => `
            <div class="fp-bar-row">
              <span class="fp-lbl">${d.short}</span>
              <div class="fp-bar-track"><div class="fp-bar-fill" style="width:${Math.round(s.v[i] * 100)}%; background:${d.color}"></div></div>
            </div>`).join('')}
        </div>
      `;
      card.addEventListener('click', () => card.classList.toggle('open'));
      list.appendChild(card);
    });
  }

  document.getElementById('fpRetakeBtn').addEventListener('click', () => {
    answers = new Array(order.length).fill(null);
    current = 0;
    document.getElementById('fpResults').classList.add('hidden');
    document.getElementById('fpQuiz').classList.remove('hidden');
    fpRenderQuestion();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  document.getElementById('fpSwitchTrackBtn').addEventListener('click', () => {
    document.getElementById('fpResults').classList.add('hidden');
    document.getElementById('fpJourney').classList.add('hidden');
    document.getElementById('fpIntro').classList.remove('hidden');
    fpBuildCompassLabels();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  async function fpSaveJourneyEntry() {
    try {
      const entry = {
        date: new Date().toISOString(),
        track: trackKey,
        trackLabel: track.label,
        top: fpLastResults.slice(0, 3).map((r) => ({ name: r.name, match: r.match })),
        vector: fpUserVec,
      };
      const key = 'fp-journey:' + trackKey + ':' + Date.now();
      await storage.set(key, JSON.stringify(entry));
      fpRenderJourney();
    } catch (e) {
      console.error('Could not save journey entry', e);
    }
  }
  document.getElementById('fpSaveJourneyBtn').addEventListener('click', fpSaveJourneyEntry);

  async function fpRenderJourney() {
    const listEl = document.getElementById('fpJourneyList');
    listEl.innerHTML = '<p class="fp-empty-note">Loading your saved bearings…</p>';
    try {
      const listing = await storage.list('fp-journey:');
      if (!listing || !listing.keys || listing.keys.length === 0) {
        listEl.innerHTML = '<p class="fp-empty-note">No saved bearings yet — save your result above to start tracking your journey.</p>';
        return;
      }
      const entries = [];
      for (const k of listing.keys) {
        try {
          const r = await storage.get(k);
          if (r && r.value) entries.push(JSON.parse(r.value));
        } catch (e) { /* skip unreadable entry */ }
      }
      entries.sort((a, b) => new Date(b.date) - new Date(a.date));
      if (entries.length === 0) {
        listEl.innerHTML = '<p class="fp-empty-note">No saved bearings yet — save your result above to start tracking your journey.</p>';
        return;
      }
      listEl.innerHTML = '';
      entries.forEach((e) => {
        const d = new Date(e.date);
        const row = document.createElement('div');
        row.className = 'fp-journey-entry';
        row.innerHTML = `
          <div>
            <div class="fp-je-date">${d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })} · ${d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}</div>
            <div class="fp-je-track">${e.trackLabel || e.track}</div>
            <div class="fp-je-pick">${e.top && e.top[0] ? e.top[0].name : '—'}</div>
          </div>
          <div class="fp-rank-meta">${(e.top || []).slice(1).map((t) => t.name + ' (' + t.match + '%)').join(' · ')}</div>
        `;
        listEl.appendChild(row);
      });
    } catch (e) {
      listEl.innerHTML = '<p class="fp-empty-note">Your journey could not be loaded right now.</p>';
    }
  }
})();
