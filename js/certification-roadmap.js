window.I18N_PAGE_DICT = {
      'rm.back': { en: 'Back to home', ar: 'العودة إلى الرئيسية' },
      'rm.eyebrow': { en: 'Certification Roadmap', ar: 'خارطة طريق الشهادة' },
      'rm.title': { en: 'Your road to Board Certified.', ar: 'طريقك نحو الاعتماد المهني.' },
      'rm.sub': { en: 'Track your progress station by station. The Egyptian Board is coming soon.', ar: 'تتبع تقدمك محطة بمحطة. البورد المصري قريبًا.' },
      'rm.disclaimer': { en: "This roadmap reflects each college's publicly published requirements as a general reference. Exam formats, sitting dates, and eligibility rules change — always confirm current specifics with the official board before making decisions.", ar: 'تعكس خارطة الطريق هذه المتطلبات المنشورة علنًا لكل كلية كمرجع عام. تتغير صيغ الامتحانات ومواعيدها وشروط الأهلية — تأكد دائمًا من التفاصيل الحالية مع البورد الرسمي قبل اتخاذ القرار.' },
      'rm.askMentor': { en: 'Need help with this station? Email our team <i class="fi fi-rr-arrow-small-right"></i>', ar: 'تحتاج مساعدة في هذه المحطة؟ راسل فريقنا ←' },
      'rm.you': { en: 'YOU ARE HERE', ar: 'أنت هنا' },
      'rm.exempted': { en: 'Exempted', ar: 'مُعفى' },
      'rm.completed': { en: 'Completed', ar: 'مكتمل' },
      'rm.certified': { en: 'Board Certified', ar: 'معتمد' },
      'rm.locked': { en: 'Locked', ar: 'مغلق' },
      'rm.actionNeeded': { en: 'Action Needed', ar: 'إجراء مطلوب' },
      'rm.markComplete': { en: 'Mark this station complete', ar: 'وضع علامة اكتمال على هذه المحطة' },
      'rm.markNote': { en: "This is self-tracked, not independently verified — mark a station complete once you've prepared what it needs.", ar: 'هذا تتبع ذاتي وليس تحققًا مستقلاً — ضع علامة الاكتمال بمجرد تجهيز ما تحتاجه المحطة.' },
      'rm.doneOn': { en: 'Marked complete on', ar: 'تم وضع علامة الاكتمال في' },
      'rm.waived': { en: 'Waived —', ar: 'مُعفى —' },
      'rm.exemptionLabel': { en: "I hold a Royal College membership (e.g. MRCP, MRCS) or a relevant Master's degree", ar: 'أحمل عضوية كلية ملكية (مثل MRCP، MRCS) أو درجة ماجستير ذات صلة' },
      'rm.exemptionNote': { en: "2 years are deducted from your rotation, and the First Part Exam is waived.", ar: 'يتم خصم سنتين من دورتك التدريبية، ويتم إعفاؤك من امتحان الجزء الأول.' },
      'nav.dashboard': { en: 'Dashboard', ar: 'لوحة التحكم' },
      'rm.soonTag': { en: 'Soon', ar: 'قريبًا' },
      'rm.batchNoLabel': { en: 'Batch No.', ar: 'الدفعة رقم' },
      'rm.twiceYearlyIntake': { en: 'twice-yearly intake', ar: 'قبول مرتين سنويًا' },
      'rm.batchTBC': { en: 'Batch dates to be confirmed', ar: 'مواعيد الدفعة قيد التأكيد' },
      'rm.batchAnnounced': { en: 'Batch schedule announced at launch', ar: 'يُعلن عن جدول الدفعات عند الإطلاق' },
    };

// CERTIFICATION ROADMAP — board-by-board certification journey tracker.
// Scoped down from the original design: no admin review queue — stations are
// self-tracked ("mark complete" once you've prepared what's needed), not
// verified by anyone. All boards are interactive except the Egyptian Board,
// which is shown for reference and marked "Coming soon" for now.
(function () {
  function lang() {
    return (window.I18N && window.I18N.currentLang) ? window.I18N.currentLang() : 'en';
  }
  function t(key, fallback) {
    const dict = (window.I18N && window.I18N.dict) ? window.I18N.dict() : {};
    return dict[key] ? (dict[key][lang()] || dict[key].en) : fallback;
  }
  // Picks the Arabic variant of a BOARDS data field when the page is in
  // Arabic mode, falling back to the English value if no _ar text exists.
  function pick(en, ar) {
    return (lang() === 'ar' && ar) ? ar : en;
  }

  const BOARDS = {
    usa: {
      active: false, name: 'American Board (ABR)', nameAr: 'البورد الأمريكي (ABR)',
      country: 'United States', countryAr: 'الولايات المتحدة الأمريكية',
      note: 'Diagnostic Radiology pathway, standard ACGME residency route.',
      noteAr: 'مسار الأشعة التشخيصية، عبر مسار الإقامة الطبية المعتمد من ACGME.',
      stations: [
        { title: 'Clinical Internship', titleAr: 'التدريب السريري (الامتياز)', sub: '1 year', subAr: 'سنة واحدة', musts: ['Complete PGY-1 in an ACGME- or RCPSC-accredited program', 'Hold a valid training medical license'], mustsAr: ['إتمام سنة الامتياز (PGY-1) في برنامج معتمد من ACGME أو RCPSC', 'الحصول على ترخيص طبي تدريبي ساري المفعول'] },
        { title: 'DR Residency', titleAr: 'إقامة الأشعة التشخيصية', sub: '4 years, PGY2–5', subAr: '4 سنوات، من PGY2 إلى PGY5', musts: ['Complete all 4 years at one sponsoring institution (or approved transfer)', 'Maintain satisfactory in-training evaluations'], mustsAr: ['إتمام السنوات الأربع كاملة في مؤسسة راعية واحدة (أو نقل معتمد)', 'الحفاظ على تقييمات تدريبية مُرضية طوال فترة الإقامة'] },
        { title: 'Qualifying (Core) Exam', titleAr: 'امتحان التأهيل (الأساسي)', sub: 'After 36 months', subAr: 'بعد 36 شهرًا', musts: ['Pass the 3-day computer-based Core Exam', 'Covers all DR domains plus embedded physics'], mustsAr: ['اجتياز الامتحان الأساسي الحاسوبي الذي يمتد على 3 أيام', 'يغطي جميع مجالات الأشعة التشخيصية بالإضافة إلى الفيزياء المدمجة'] },
        { title: 'Complete Residency', titleAr: 'إتمام الإقامة', sub: 'End of PGY-5', subAr: 'نهاية PGY5', musts: ['Program director confirms full 4-year completion'], mustsAr: ['تأكيد مدير البرنامج إتمام السنوات الأربع كاملة'] },
        { title: 'Certifying Exam', titleAr: 'امتحان الاعتماد', sub: '≥12 months after residency', subAr: 'بعد 12 شهرًا على الأقل من انتهاء الإقامة', musts: ['Pass the Certifying Exam module set', 'Hold a valid, unrestricted state or provincial license'], mustsAr: ['اجتياز مجموعة وحدات امتحان الاعتماد', 'الحصول على ترخيص طبي ساري وغير مقيّد على مستوى الولاية أو المقاطعة'] },
        { title: 'Board Certified', titleAr: 'معتمد من البورد', sub: 'ABR Diplomate', subAr: 'زميل البورد الأمريكي للأشعة (ABR)', certified: true, musts: ['Diplomate status active — maintain via MOC'], mustsAr: ['الحفاظ على صفة الزميل نشطة — من خلال برنامج الحفاظ على الاعتماد (MOC)'] }
      ]
    },
    uk: {
      active: false, name: 'UK Board (Royal Colleges)', nameAr: 'البورد البريطاني (الكليات الملكية)',
      country: 'United Kingdom', countryAr: 'المملكة المتحدة',
      note: "General UK specialty training structure — worked example uses Radiology's FRCR.",
      noteAr: 'الهيكل العام للتدريب التخصصي في المملكة المتحدة — المثال التوضيحي يعتمد على زمالة FRCR في الأشعة.',
      stations: [
        { title: 'Foundation Programme', titleAr: 'برنامج التأسيس (Foundation)', sub: '2 years', subAr: 'سنتان', musts: ['Full GMC registration', 'IELTS/OET English requirement for IMGs'], mustsAr: ['تسجيل كامل لدى الهيئة العامة الطبية البريطانية (GMC)', 'استيفاء شرط اللغة الإنجليزية (IELTS/OET) للأطباء الخريجين من الخارج'] },
        { title: 'Part 1 Exam', titleAr: 'امتحان الجزء الأول', sub: 'e.g. FRCR Part 1', subAr: 'مثل الجزء الأول من FRCR', musts: ['Pass Anatomy and Physics modules', 'Required before ST2/ST3'], mustsAr: ['اجتياز وحدتي التشريح والفيزياء', 'مطلوب قبل الالتحاق بـ ST2/ST3'] },
        { title: 'Specialty Training', titleAr: 'التدريب التخصصي', sub: 'Length varies by specialty', subAr: 'تختلف مدته حسب التخصص', musts: ['Satisfactory ARCP outcome each year'], mustsAr: ['الحصول على تقييم ARCP مُرضٍ كل عام'] },
        { title: 'Final Exam — Part A', titleAr: 'الامتحان النهائي — الجزء أ', sub: 'e.g. FRCR Part 2A', subAr: 'مثل الجزء 2A من FRCR', musts: ['Pass both SBA papers on the same sitting'], mustsAr: ['اجتياز ورقتي أسئلة الاختيار الأفضل (SBA) في نفس الدورة'] },
        { title: 'Final Exam — Part B', titleAr: 'الامتحان النهائي — الجزء ب', sub: 'e.g. FRCR Part 2B', subAr: 'مثل الجزء 2B من FRCR', musts: ['Minimum 34 months in a formal clinical post', 'Pass all clinical/oral components'], mustsAr: ['ما لا يقل عن 34 شهرًا في منصب سريري رسمي', 'اجتياز جميع المكونات السريرية والشفوية'] },
        { title: 'CCT Certified', titleAr: 'معتمد بشهادة CCT', sub: 'GMC Specialist Register', subAr: 'التسجيل في سجل الأخصائيين لدى GMC', certified: true, musts: ['Apply to your Royal College and the GMC within 12 months'], mustsAr: ['التقديم إلى الكلية الملكية المختصة وهيئة GMC في غضون 12 شهرًا'] }
      ]
    },
    ireland: {
      active: false, name: 'Ireland Board (FFR RCSI)', nameAr: 'البورد الأيرلندي (زمالة FFR - الكلية الملكية للجراحين)',
      country: 'Ireland', countryAr: 'أيرلندا',
      note: 'Fellowship of the Faculty of Radiologists, Royal College of Surgeons in Ireland.',
      noteAr: 'زمالة كلية أخصائيي الأشعة، الكلية الملكية للجراحين في أيرلندا.',
      stations: [
        { title: 'Pre-Training Experience', titleAr: 'الخبرة السابقة للتدريب', sub: '≥2 years post-registration', subAr: 'سنتان على الأقل بعد التسجيل', musts: ['1 year internship + 1 year clinical experience'], mustsAr: ['سنة امتياز + سنة خبرة سريرية'] },
        { title: 'Primary FFR Exam', titleAr: 'امتحان FFR الأساسي', sub: 'End of Year 1', subAr: 'نهاية السنة الأولى', musts: ['Pass MCQ, digital image exam and viva voce'], mustsAr: ['اجتياز الاختيار من متعدد، وامتحان الصور الرقمية، والامتحان الشفوي'] },
        { title: 'Core Training', titleAr: 'التدريب الأساسي', sub: 'Years 2–3', subAr: 'السنتان 2 و3', musts: ['Satisfactory annual training review'], mustsAr: ['مراجعة تدريبية سنوية مُرضية'] },
        { title: 'Final FFR Part IIa', titleAr: 'الجزء IIa من امتحان FFR النهائي', sub: 'Year 4', subAr: 'السنة الرابعة', musts: ['Pass both SBA/EMQ papers'], mustsAr: ['اجتياز ورقتي أسئلة SBA/EMQ'] },
        { title: 'Final FFR Part IIb', titleAr: 'الجزء IIb من امتحان FFR النهائي', sub: 'Year 4', subAr: 'السنة الرابعة', musts: ['Pass vivas, rapid reporting and long cases'], mustsAr: ['اجتياز الامتحانات الشفوية والتقارير السريعة والحالات المطوّلة'] },
        { title: 'Fellowship Certified', titleAr: 'معتمد بالزمالة', sub: 'FFR RCSI', subAr: 'زمالة FFR RCSI', certified: true, musts: ['Complete all 5 years of training'], mustsAr: ['إتمام سنوات التدريب الخمس كاملة'] }
      ]
    },
    australia: {
      active: false, name: 'Australian / NZ Board (RANZCR)', nameAr: 'البورد الأسترالي/النيوزيلندي (RANZCR)',
      country: 'Australia & New Zealand', countryAr: 'أستراليا ونيوزيلندا',
      note: 'Fellowship of RANZCR (FRANZCR), three-phase Clinical Radiology Training Program.',
      noteAr: 'زمالة الكلية الملكية الأسترالية والنيوزيلندية لأخصائيي الأشعة (FRANZCR)، برنامج تدريب الأشعة السريرية المكوّن من ثلاث مراحل.',
      stations: [
        { title: 'Prevocational Years', titleAr: 'سنوات ما قبل التخصص', sub: 'Internship + PGY', subAr: 'الامتياز + سنوات PGY', musts: ['AHPRA or Medical Council of NZ registration'], mustsAr: ['التسجيل لدى هيئة AHPRA أو المجلس الطبي النيوزيلندي'] },
        { title: 'Phase 1 Exams', titleAr: 'امتحانات المرحلة الأولى', sub: 'Anatomy + AIT', subAr: 'التشريح + AIT', musts: ['Pass both online proctored written exams'], mustsAr: ['اجتياز كلا الامتحانين الكتابيين عبر الإنترنت تحت المراقبة'] },
        { title: 'Phase 2 Training & Exams', titleAr: 'تدريب وامتحانات المرحلة الثانية', sub: '≥24 months FTE', subAr: '24 شهرًا على الأقل بدوام كامل', musts: ['Pass the MCQ + Case Reporting exam', 'Pass OSCER'], mustsAr: ['اجتياز امتحان الاختيار من متعدد وتقارير الحالات', 'اجتياز امتحان OSCER'] },
        { title: 'Phase 3', titleAr: 'المرحلة الثالثة', sub: 'To 60 months FTE total', subAr: 'حتى إجمالي 60 شهرًا بدوام كامل', musts: ['Complete subspecialty consolidation training'], mustsAr: ['إتمام تدريب التوطيد في التخصص الفرعي'] },
        { title: 'Fellowship Certified', titleAr: 'معتمد بالزمالة', sub: 'FRANZCR', subAr: 'زمالة FRANZCR', certified: true, musts: ['All training program requirements met'], mustsAr: ['استيفاء جميع متطلبات برنامج التدريب'] }
      ]
    },
    saudi: {
      active: false, name: 'Saudi Board (SCFHS)', nameAr: 'البورد السعودي (الهيئة السعودية للتخصصات الصحية)',
      country: 'Saudi Arabia', countryAr: 'المملكة العربية السعودية',
      note: 'Saudi Commission for Health Specialties, Diagnostic Radiology residency.',
      noteAr: 'الهيئة السعودية للتخصصات الصحية، برنامج إقامة الأشعة التشخيصية.',
      stations: [
        { title: 'Rotating Internship', titleAr: 'سنة الامتياز التدويري', sub: '12 months', subAr: '12 شهرًا', musts: ['Complete internship post-MBBS or equivalent'], mustsAr: ['إتمام سنة الامتياز بعد البكالوريوس في الطب والجراحة أو ما يعادلها'] },
        { title: 'R1–R2', titleAr: 'السنتان R1–R2', sub: 'Years 1–2 of residency', subAr: 'السنتان الأولى والثانية من الإقامة', musts: ['Pass yearly promotion exams'], mustsAr: ['اجتياز امتحانات الترقية السنوية'] },
        { title: 'R3–R4', titleAr: 'السنتان R3–R4', sub: 'Years 3–4 of residency', subAr: 'السنتان الثالثة والرابعة من الإقامة', musts: ['Pass yearly promotion exams', 'Pass the Final Written Exam'], mustsAr: ['اجتياز امتحانات الترقية السنوية', 'اجتياز الامتحان الكتابي النهائي'] },
        { title: 'Final Clinical Exam', titleAr: 'الامتحان السريري النهائي', sub: 'OSCE-style', subAr: 'بصيغة OSCE', musts: ['Pass the clinical/OSCE assessment'], mustsAr: ['اجتياز التقييم السريري بصيغة OSCE'] },
        { title: 'Saudi Board Certified', titleAr: 'معتمد من البورد السعودي', sub: 'SCFHS Diplomate', subAr: 'زميل الهيئة السعودية للتخصصات الصحية', certified: true, musts: ['All requirements and exams completed'], mustsAr: ['استيفاء جميع المتطلبات والامتحانات'] }
      ]
    },
    egypt: {
      active: false, name: 'Egyptian Board', nameAr: 'البورد المصري',
      country: 'Egypt', countryAr: 'مصر',
      note: 'Egyptian Fellowship (egyfellow.com), under the Ministry of Health & Population.',
      noteAr: 'الزمالة المصرية (egyfellow.com)، تحت إشراف وزارة الصحة والسكان.',
      exemption: {
        label: 'rm.exemptionLabel',
        stationIndex: 3,
        note: 'rm.exemptionNote'
      },
      stations: [
        {
          title: 'Document Submission', titleAr: 'تقديم المستندات', sub: 'Required before licensing', subAr: 'مطلوب قبل الترخيص', musts: [
            'Medical practice license from the Ministry of Health',
            'Malpractice insurance policy from an Egyptian insurance company',
            'Original Bachelor\'s certificate, authenticated by the Egyptian Ministry of Foreign Affairs',
            'Original internship certificate, authenticated the same way',
            'Original equivalency certificate from the Supreme Council of Universities',
            '3 recent passport-style photos (6×4 cm)',
            'Clinical checkup valid within 3 months from an approved center'
          ],
          mustsAr: [
            'ترخيص مزاولة المهنة الطبية من وزارة الصحة',
            'بوليصة تأمين ضد أخطاء المهنة من شركة تأمين مصرية',
            'أصل شهادة البكالوريوس، مصدّقة من وزارة الخارجية المصرية',
            'أصل شهادة الامتياز، مصدّقة بنفس الطريقة',
            'أصل شهادة معادلة من المجلس الأعلى للجامعات',
            '3 صور شخصية حديثة بمقاس (6×4 سم)',
            'فحص سريري ساري المفعول خلال 3 أشهر من مركز معتمد'
          ]
        },
        {
          title: 'Enrollment & Licensing', titleAr: 'التسجيل والترخيص', sub: 'Via egyfellow.com', subAr: 'عبر موقع egyfellow.com', musts: [
            'Pay the enrollment fee plus service fees',
            'Documents forwarded to the Medical Licensing Department',
            'Collect your license within 1 month of approval'
          ],
          mustsAr: [
            'دفع رسوم التسجيل بالإضافة إلى رسوم الخدمات',
            'إحالة المستندات إلى إدارة ترخيص المهن الطبية',
            'استلام الترخيص خلال شهر واحد من الموافقة'
          ]
        },
        {
          title: 'Training Registration', titleAr: 'تسجيل التدريب', sub: 'Supreme Committee, Princess Fatma Academy', subAr: 'اللجنة العليا، أكاديمية الأميرة فاطمة', musts: [
            'Submit remaining documents and pay remaining fees',
            'Confirm your rotation start date'
          ],
          mustsAr: [
            'تقديم باقي المستندات ودفع الرسوم المتبقية',
            'تأكيد تاريخ بدء الدورة التدريبية'
          ]
        },
        { title: 'First Part Exam', titleAr: 'امتحان الجزء الأول', sub: 'After required rotation', subAr: 'بعد إتمام الدورة التدريبية المطلوبة', musts: ['Sit the First Part Exam after completing the required rotation years', 'Waived for holders of a recognized Royal College membership or relevant Master\'s degree'], mustsAr: ['التقدم لامتحان الجزء الأول بعد إتمام سنوات الدورة التدريبية المطلوبة', 'يُعفى منه حاملو عضوية كلية ملكية معتمدة أو درجة ماجستير ذات صلة'] },
        { title: 'Second Part Exam', titleAr: 'امتحان الجزء الثاني', sub: '', subAr: '', musts: ['Pass the Second Part Exam to progress toward certification'], mustsAr: ['اجتياز امتحان الجزء الثاني للتقدم نحو الاعتماد'] },
        { title: 'Third Part Exam', titleAr: 'امتحان الجزء الثالث', sub: '', subAr: '', musts: ['Pass the Third Part Exam — final assessment before certification'], mustsAr: ['اجتياز امتحان الجزء الثالث — التقييم النهائي قبل الاعتماد'] },
        { title: 'Board Certified', titleAr: 'معتمد من البورد', sub: 'Egyptian Fellowship', subAr: 'الزمالة المصرية', certified: true, musts: ['All required parts and committee approvals completed'], mustsAr: ['استيفاء جميع الأجزاء المطلوبة وموافقات اللجان'] }
      ]
    },
    sudan: {
      active: false, name: 'Sudanese Board (SMSB)', nameAr: 'البورد السوداني (المجلس السوداني للتخصصات الطبية)',
      country: 'Sudan', countryAr: 'السودان',
      note: 'Sudan Medical Specialization Board, Diagnostic Radiology residency.',
      noteAr: 'المجلس السوداني للتخصصات الطبية، برنامج إقامة الأشعة التشخيصية.',
      stations: [
        { title: 'Selection Exam', titleAr: 'امتحان القبول', sub: 'Entry to the program', subAr: 'للالتحاق بالبرنامج', musts: ['Pass the SMSB radiology selection exam'], mustsAr: ['اجتياز امتحان القبول في تخصص الأشعة الخاص بالمجلس السوداني'] },
        { title: 'Residency Training', titleAr: 'التدريب في الإقامة', sub: '4 years', subAr: '4 سنوات', musts: ['Full-time training at an SMSB-accredited center', 'Pass the first-year assessment'], mustsAr: ['تدريب بدوام كامل في مركز معتمد من المجلس السوداني', 'اجتياز تقييم السنة الأولى'] },
        { title: 'Final Exam', titleAr: 'الامتحان النهائي', sub: 'End of Year 4', subAr: 'نهاية السنة الرابعة', musts: ['Pass the SMSB final radiology exam'], mustsAr: ['اجتياز امتحان الأشعة النهائي الخاص بالمجلس السوداني'] },
        { title: 'Sudan Board Certified', titleAr: 'معتمد من البورد السوداني', sub: 'SMSB Diagnostic Radiology', subAr: 'زمالة الأشعة التشخيصية - المجلس السوداني', certified: true, musts: ['All requirements completed'], mustsAr: ['استيفاء جميع المتطلبات'] }
      ]
    },
    arab: {
      active: false, name: 'Arab Board', nameAr: 'البورد العربي',
      country: 'Pan-Arab (League of Arab States)', countryAr: 'عموم الدول العربية (جامعة الدول العربية)',
      note: 'Arab Board of Radiology & Medical Imaging, under the ABHS.',
      noteAr: 'البورد العربي للأشعة والتصوير الطبي، تحت مجلس هيئات التخصصات الصحية العربية (ABHS).',
      stations: [
        { title: 'Residency Training', titleAr: 'التدريب في الإقامة', sub: '4 years minimum', subAr: '4 سنوات كحد أدنى', musts: ['Full-time training at an approved Arab Board center', '≥80% attendance at academic activities'], mustsAr: ['تدريب بدوام كامل في مركز معتمد من البورد العربي', 'حضور 80% على الأقل من الأنشطة العلمية'] },
        { title: 'Part One Exam', titleAr: 'امتحان الجزء الأول', sub: 'During training', subAr: 'خلال فترة التدريب', musts: ['Pass Part One before sitting Part Two'], mustsAr: ['اجتياز الجزء الأول قبل التقدم للجزء الثاني'] },
        { title: 'Final (Part Two) Exam', titleAr: 'الامتحان النهائي (الجزء الثاني)', sub: 'Written, film-viewing & oral', subAr: 'كتابي، وعرض أفلام، وشفوي', musts: ['Submit your completed, approved log book', 'Up to 4 attempts allowed'], mustsAr: ['تقديم سجل الأنشطة (log book) مكتملاً ومعتمدًا', 'يُسمح بما يصل إلى 4 محاولات'] },
        { title: 'Arab Board Certified', titleAr: 'معتمد من البورد العربي', sub: 'Fellowship of the Arab Board', subAr: 'زمالة البورد العربي', certified: true, musts: ['Recognized across most of the Arab League'], mustsAr: ['معتمد في غالبية دول جامعة الدول العربية'] }
      ]
    }
  };

  let currentBoard = 'usa';
  let activeStationIdx = null;

  function progressKey(boardId) { return 'ih-roadmap-progress:' + boardId; }
  function exemptionKey(boardId) { return 'ih-roadmap-exemption:' + boardId; }

  function loadProgress(boardId) {
    try {
      return JSON.parse(localStorage.getItem(progressKey(boardId))) || {};
    } catch (e) {
      return {};
    }
  }
  function saveProgress(boardId, data) {
    localStorage.setItem(progressKey(boardId), JSON.stringify(data));
  }
  function loadExemption(boardId) {
    return localStorage.getItem(exemptionKey(boardId)) === '1';
  }
  function saveExemption(boardId, on) {
    localStorage.setItem(exemptionKey(boardId), on ? '1' : '0');
  }

  // Batch/intake scheduling — computed from one anchor point, not hand-typed per year.
  const BATCH_CONFIG = {
    egypt: { referenceBatchNumber: 1, referenceStartDate: '2014-07-01', intervalMonths: 6 }
  };

  function computeBatch(boardKey) {
    const cfg = BATCH_CONFIG[boardKey];
    if (!cfg) return null;
    const ref = new Date(cfg.referenceStartDate + 'T00:00:00');
    const now = new Date();
    const monthsDiff = (now.getFullYear() - ref.getFullYear()) * 12 + (now.getMonth() - ref.getMonth());
    const cyclesElapsed = Math.floor(monthsDiff / cfg.intervalMonths);
    const batchNumber = cfg.referenceBatchNumber + cyclesElapsed;
    const batchStart = new Date(ref);
    batchStart.setMonth(batchStart.getMonth() + cyclesElapsed * cfg.intervalMonths);
    const batchEnd = new Date(batchStart);
    batchEnd.setMonth(batchEnd.getMonth() + cfg.intervalMonths);
    const fmt = (d) => d.toLocaleDateString(undefined, { year: 'numeric', month: 'short' });
    return { batchNumber, fromLabel: fmt(batchStart), toLabel: fmt(batchEnd) };
  }

  function renderBoardRow() {
    const row = document.getElementById('rmBoardRow');
    row.innerHTML = '';
    Object.keys(BOARDS).forEach((key) => {
      const b = BOARDS[key];
      const pill = document.createElement('button');
      const isActive = !!b.active;
      pill.type = 'button';
      pill.className = 'rm-board-pill' + (key === currentBoard && isActive ? ' active' : '') + (!isActive ? ' soon' : '');
      pill.innerHTML = pick(b.name, b.nameAr) + (!isActive ? ' <span class="rm-soon-tag">' + t('rm.soonTag', 'Soon') + '</span>' : '');
      if (isActive) {
        pill.addEventListener('click', () => { currentBoard = key; renderAll(); });
      } else {
        pill.disabled = true;
      }
      row.appendChild(pill);
    });
  }

  function renderAll() {
    renderBoardRow();
    const b = BOARDS[currentBoard];
    const batch = computeBatch(currentBoard);
    const batchLine = b.active
      ? (batch
        ? '<div class="rm-batch-line"><i class="fi fi-sr-calendar"></i> ' + t('rm.batchNoLabel', 'Batch No.') + ' ' + batch.batchNumber + ' &nbsp;·&nbsp; ' + batch.fromLabel + ' – ' + batch.toLabel + ' <span class="rm-batch-tag">' + t('rm.twiceYearlyIntake', 'twice-yearly intake') + '</span></div>'
        : '<div class="rm-batch-line"><i class="fi fi-sr-calendar"></i> ' + t('rm.batchTBC', 'Batch dates to be confirmed') + '</div>')
      : '<div class="rm-batch-line soon"><i class="fi fi-sr-calendar"></i> ' + t('rm.batchAnnounced', 'Batch schedule announced at launch') + '</div>';
    document.getElementById('rmBoardHead').innerHTML = '<h3>' + pick(b.name, b.nameAr) + '</h3>' + batchLine + '<p>' + pick(b.country, b.countryAr) + ' · ' + pick(b.note, b.noteAr) + '</p>';

    const exemptArea = document.getElementById('rmExemptionArea');
    let exemptionOn = false;
    if (b.exemption) {
      exemptionOn = loadExemption(currentBoard);
      exemptArea.innerHTML =
        '<div class="rm-exemption-box' + (exemptionOn ? ' on' : '') + '" id="rmExemptionBox">' +
        '<input type="checkbox" id="rmExemptionCheck" ' + (exemptionOn ? 'checked' : '') + '>' +
        '<div><label for="rmExemptionCheck">' + t(b.exemption.label, "I hold a Royal College membership or relevant Master's degree") + '</label>' +
        '<div class="rm-exemption-note">' + t(b.exemption.note, '2 years are deducted from your rotation, and the First Part Exam is waived.') + '</div></div></div>';
      document.getElementById('rmExemptionCheck').addEventListener('change', (e) => {
        saveExemption(currentBoard, e.target.checked);
        renderAll();
      });
    } else {
      exemptArea.innerHTML = '';
    }

    const progress = loadProgress(currentBoard);
    const completedSet = new Set(Object.keys(progress).map(Number));
    const exemptIdx = (b.exemption && exemptionOn) ? b.exemption.stationIndex : null;
    const stations = b.stations;

    const effectiveSet = new Set(completedSet);
    if (exemptIdx !== null) effectiveSet.add(exemptIdx);
    let currentIdx = stations.findIndex((s, i) => !effectiveSet.has(i));
    if (currentIdx === -1) currentIdx = stations.length;

    const track = document.getElementById('rmTrack');
    track.innerHTML = '';
    stations.forEach((s, i) => {
      const isExempted = exemptIdx === i && !completedSet.has(i);
      const isComplete = completedSet.has(i);
      const isCurrent = i === currentIdx;
      const isLocked = i > currentIdx;
      const isCertified = !!s.certified;
      let stateClass = 'locked';
      if (isExempted) stateClass = 'exempt';
      else if (isComplete) stateClass = isCertified ? 'certified' : 'complete';
      else if (isCurrent) stateClass = 'current';

      const wrap = document.createElement('div');
      wrap.className = 'rm-station';

      if (isCurrent && !isComplete && !isExempted) {
        const you = document.createElement('div');
        you.className = 'rm-you';
        you.innerHTML = '<span class="rm-you-arrow">▼</span><span>' + t('rm.you', 'YOU ARE HERE') + '</span>';
        wrap.appendChild(you);
      }

      const node = document.createElement('button');
      node.type = 'button';
      node.className = 'rm-node ' + stateClass;
      node.innerHTML = isExempted ? '—' : isComplete ? '<i class="fi fi-sr-check"></i>' : (isLocked ? '<i class="fi fi-sr-lock"></i>' : (i + 1));
      if (!isLocked || isExempted) {
        node.addEventListener('click', () => openStationDetail(i));
      }
      wrap.appendChild(node);

      const title = document.createElement('div');
      title.className = 'rm-station-title';
      title.textContent = pick(s.title, s.titleAr);
      wrap.appendChild(title);

      const status = document.createElement('div');
      status.className = 'rm-station-status ' + stateClass;
      status.textContent = isExempted ? t('rm.exempted', 'Exempted')
        : isComplete ? (isCertified ? t('rm.certified', 'Board Certified') : t('rm.completed', 'Completed'))
          : isLocked ? t('rm.locked', 'Locked')
            : t('rm.actionNeeded', 'Action Needed');
      wrap.appendChild(status);

      track.appendChild(wrap);

      if (i < stations.length - 1) {
        const connector = document.createElement('div');
        connector.className = 'rm-connector' + ((isComplete || isExempted) ? ' lit' : '');
        track.appendChild(connector);
      }
    });
  }

  function openStationDetail(i) {
    activeStationIdx = i;
    const b = BOARDS[currentBoard];
    const s = b.stations[i];
    const progress = loadProgress(currentBoard);
    const isComplete = Object.prototype.hasOwnProperty.call(progress, i);
    const exemptionOn = b.exemption ? loadExemption(currentBoard) : false;
    const isExempted = b.exemption && exemptionOn && b.exemption.stationIndex === i && !isComplete;

    document.getElementById('rmDetailSub').textContent = pick(s.sub || '', s.subAr || '').toUpperCase();
    document.getElementById('rmDetailTitle').textContent = pick(s.title, s.titleAr);
    const list = document.getElementById('rmMustList');
    list.innerHTML = '';
    const musts = s.musts || [];
    const mustsAr = s.mustsAr || [];
    musts.forEach((m, mi) => {
      const li = document.createElement('li');
      li.innerHTML = '<span class="rm-must-check"></span><span>' + pick(m, mustsAr[mi]) + '</span>';
      list.appendChild(li);
    });

    const submitArea = document.getElementById('rmSubmitArea');
    if (isExempted) {
      submitArea.innerHTML = '<div class="rm-review-note" style="background:#F3EFFB; border-left-color:#8B6FD1;">' + t('rm.waived', 'Waived —') + ' ' + t(b.exemption.note, '') + '</div>';
    } else if (isComplete) {
      const doneAt = progress[i];
      submitArea.innerHTML = '<div class="rm-review-note">✓ ' + t('rm.doneOn', 'Marked complete on') + ' ' + new Date(doneAt).toLocaleDateString() + '.</div>';
    } else {
      submitArea.innerHTML =
        '<button type="button" class="rm-mark-btn" id="rmMarkBtn">' + t('rm.markComplete', 'Mark this station complete') + '</button>' +
        '<p style="font-size:12px; color:var(--ink-dim); text-align:center; margin-top:10px;">' + t('rm.markNote', "This is self-tracked, not independently verified — mark a station complete once you've prepared what it needs.") + '</p>';
      document.getElementById('rmMarkBtn').addEventListener('click', () => {
        const progress = loadProgress(currentBoard);
        progress[i] = Date.now();
        saveProgress(currentBoard, progress);
        document.getElementById('rmDetailOverlay').classList.remove('open');
        renderAll();
      });
    }

    document.getElementById('rmDetailOverlay').classList.add('open');
  }

  document.getElementById('rmDetailClose').addEventListener('click', () => {
    document.getElementById('rmDetailOverlay').classList.remove('open');
  });
  document.getElementById('rmDetailOverlay').addEventListener('click', (e) => {
    if (e.target.id === 'rmDetailOverlay') e.currentTarget.classList.remove('open');
  });

  renderAll();
  document.addEventListener('ih:langchange', () => {
    renderAll();
    // Refresh the open station-detail overlay too, so its title/sub/musts
    // switch language immediately instead of waiting for the next open.
    const overlay = document.getElementById('rmDetailOverlay');
    if (overlay.classList.contains('open') && activeStationIdx !== null) {
      openStationDetail(activeStationIdx);
    }
  });
})();

AOS.init({ duration: 700, easing: 'ease', once: true, offset: 80 });
