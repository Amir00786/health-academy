window.I18N_PAGE_DICT = {
  'pcert.topbarTag': { en: 'Pre-Authorization Specialist &middot; Certificate Issuance', ar: 'أخصائي التصريح المسبق &middot; إصدار الشهادة' },
  'pcert.eyebrowName': { en: 'PRE-AUTHORIZATION SPECIALIST', ar: 'أخصائي التصريح المسبق' },
  'pcert.nameH2': { en: 'Your certificate is ready.', ar: 'شهادتك جاهزة.' },
  'pcert.nameLead': { en: 'Enter your full name exactly as you want it to appear, and the date you took the exam. This can only be entered once, so please check both carefully before confirming.', ar: 'أدخل اسمك الكامل تمامًا كما تريد ظهوره على الشهادة، وتاريخ تقديمك للاختبار. لا يمكن إدخال هذه المعلومات إلا مرة واحدة، لذا يرجى التحقق من الاثنين بعناية قبل التأكيد.' },
  'pcert.namePh': { en: 'e.g. Sara Al-Mutairi', ar: 'مثال: سارة المطيري' },
  'pcert.dateLabel': { en: 'Date you took the exam', ar: 'تاريخ تقديم الاختبار' },
  'pcert.warnNote': { en: '<b>This cannot be edited later</b> — once confirmed, your name and exam date are permanently set on your certificate record.', ar: '<b>لا يمكن تعديل هذا لاحقًا</b> — بعد التأكيد، يصبح اسمك وتاريخ الاختبار مثبتين بشكل دائم في سجل شهادتك.' },
  'pcert.reviewBtn': { en: 'Review before confirming <i class="fi fi-rr-arrow-small-right"></i>', ar: 'مراجعة قبل التأكيد ←' },
  'pcert.eyebrowConfirm': { en: 'FINAL CHECK', ar: 'التحقق النهائي' },
  'pcert.confirmH2': { en: 'Please confirm this is spelled exactly right.', ar: 'يرجى التأكد من أن الإملاء صحيح تمامًا.' },
  'pcert.confirmLead': { en: 'Your certificate will be generated with this exact name and date and cannot be changed afterward.', ar: 'سيتم إصدار شهادتك بهذا الاسم والتاريخ تمامًا، ولا يمكن تغييرهما بعد ذلك.' },
  'pcert.nameOnCert': { en: 'Name on certificate', ar: 'الاسم على الشهادة' },
  'pcert.examDateLabel2': { en: 'Exam date', ar: 'تاريخ الاختبار' },
  'pcert.editBtn': { en: '← Edit', ar: '<i class="fi fi-rr-arrow-small-right"></i> تعديل' },
  'pcert.confirmBtn': { en: 'Yes, this is correct — generate my certificate', ar: 'نعم، هذا صحيح — أنشئ شهادتي' },
  'pcert.printBtn': { en: '🖨 Print / Save as PDF', ar: '🖨 طباعة / حفظ كملف PDF' },
  'pcert.certEyebrow': { en: 'Certificate of Completion', ar: 'شهادة إتمام' },
  'pcert.certTitle': { en: 'Pre-Authorization Specialist', ar: 'أخصائي التصريح المسبق' },
  'pcert.certifies': { en: 'This certifies that', ar: 'تشهد هذه الوثيقة بأن' },
  'pcert.certDesc': { en: 'has successfully completed the full <b>Pre-Authorization Specialist</b> track at iHealth Academy — seven core modules, applied practice, and a comprehensive 15-case practical examination — and is hereby recognized as <b>ready for work</b> in medical pre-authorization.', ar: 'أتم بنجاح مسار <b>أخصائي التصريح المسبق</b> الكامل في أكاديمية آي هيلث — سبع وحدات أساسية، وتدريبًا تطبيقيًا، واختبارًا عمليًا شاملًا من 15 حالة — ويُعتمد بموجب هذه الشهادة بأنه <b>جاهز للعمل</b> في مجال التصريح المسبق الطبي.' },
  'pcert.dateOfExam': { en: 'Date of Exam', ar: 'تاريخ الاختبار' },
  'pcert.dateIssued': { en: 'Date Issued', ar: 'تاريخ الإصدار' },
  'pcert.instructorRole': { en: 'Course Instructor', ar: 'مدرب الدورة' },
  'pcert.instructorTitle': { en: 'Pre-Authorization Specialist Track', ar: 'مسار أخصائي التصريح المسبق' },
  'pcert.ceoRole': { en: 'Founder &amp; CEO', ar: 'المؤسس والرئيس التنفيذي' },
  'pcert.verifyId': { en: 'UNIQUE VERIFICATION ID', ar: 'رقم التحقق الفريد' },
  'pcert.legal': { en: 'Any alteration, reproduction, or misuse of this certificate is strictly prohibited. iHealth Academy reserves the right to take legal action.', ar: 'يُمنع منعًا باتًا أي تعديل أو نسخ أو سوء استخدام لهذه الشهادة، وتحتفظ أكاديمية آي هيلث بحقها في اتخاذ الإجراءات القانونية.' },
  'pcert.alertName': { en: 'Please enter your name.', ar: 'يرجى إدخال اسمك.' },
  'pcert.alertDate': { en: 'Please select the date you took the exam.', ar: 'يرجى تحديد تاريخ تقديم الاختبار.' },
};

/* PRE-AUTH CERTIFICATE — name entry -> final check -> printable certificate.
   Once confirmed, the record locks in localStorage so re-visiting the page
   (or reloading) always shows the same certificate instead of a blank form. */
(function () {
  const INSTRUCTOR_NAME = "Dr. Musab M. Ahmed";
  const CEO_NAME = "Dr. Musab M. Ahmed";
  const STORAGE_KEY = "ih-preauth-certificate";
  const MONTHS_AR = ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];

  function t(key) {
    const lang = (window.I18N && window.I18N.currentLang) ? window.I18N.currentLang() : "en";
    const entry = window.I18N_PAGE_DICT[key];
    if (!entry) return key;
    return entry[lang] || entry.en;
  }

  const stages = {
    name: document.getElementById("nameStage"),
    confirm: document.getElementById("confirmStage"),
    cert: document.getElementById("certStage"),
  };

  function showStage(key) {
    Object.keys(stages).forEach(k => stages[k].classList.toggle("hidden", k !== key));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function formatDate(iso) {
    if (!iso) return "—";
    const d = new Date(iso + "T00:00:00");
    if (isNaN(d)) return iso;
    const lang = (window.I18N && window.I18N.currentLang) ? window.I18N.currentLang() : "en";
    if (lang === "ar") {
      return d.getDate() + " " + MONTHS_AR[d.getMonth()] + " " + d.getFullYear();
    }
    return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  }

  function todayIso() {
    return new Date().toISOString().slice(0, 10);
  }

  function generateSerial(name, examDate) {
    const seed = (name || "") + "|" + (examDate || "") + "|" + Date.now();
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
    }
    return "IH-PA-" + hash.toString(36).toUpperCase().slice(0, 6);
  }

  function renderCertificate(record) {
    document.getElementById("certName").textContent = record.name;
    document.getElementById("certExamDate").textContent = formatDate(record.examDate);
    document.getElementById("certIssueDate").textContent = formatDate(record.issueDate);
    document.getElementById("instructorName").textContent = INSTRUCTOR_NAME;
    document.getElementById("ceoName").textContent = CEO_NAME;
    document.getElementById("certSerial").textContent = record.serial;
    showStage("cert");
  }

  function loadRecord() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  function saveRecord(record) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
    } catch (e) { /* ignore */ }
  }

  function lockIn(name, examDate) {
    const record = {
      name: name,
      examDate: examDate,
      issueDate: todayIso(),
      serial: generateSerial(name, examDate),
    };
    saveRecord(record);
    renderCertificate(record);
  }

  /* ---------------- init ---------------- */
  const existing = loadRecord();
  if (existing) {
    renderCertificate(existing);
  } else {
    const params = new URLSearchParams(window.location.search);
    const prefillName = (params.get("name") || "").trim();
    const prefillDate = params.get("examDate") || "";

    const nameInput = document.getElementById("nameInput");
    const examDateInput = document.getElementById("examDateInput");
    examDateInput.max = todayIso();

    if (prefillName && prefillDate) {
      nameInput.value = prefillName;
      examDateInput.value = prefillDate;
      document.getElementById("confirmNamePreview").textContent = prefillName;
      document.getElementById("confirmDatePreview").textContent = formatDate(prefillDate);
      showStage("confirm");
    } else {
      if (prefillName) nameInput.value = prefillName;
      if (prefillDate) examDateInput.value = prefillDate;
      showStage("name");
    }

    document.getElementById("reviewNameBtn").addEventListener("click", () => {
      const name = nameInput.value.trim();
      const examDate = examDateInput.value;
      if (!name) { alert(t("pcert.alertName")); return; }
      if (!examDate) { alert(t("pcert.alertDate")); return; }
      document.getElementById("confirmNamePreview").textContent = name;
      document.getElementById("confirmDatePreview").textContent = formatDate(examDate);
      showStage("confirm");
    });

    document.getElementById("editNameBtn").addEventListener("click", () => showStage("name"));

    document.getElementById("confirmNameBtn").addEventListener("click", () => {
      lockIn(nameInput.value.trim(), examDateInput.value);
    });
  }

  document.getElementById("printBtn").addEventListener("click", () => window.print());

  // Dates are rendered via textContent (not data-i18n), so re-format them
  // in the current language whenever the page's language is switched while
  // the confirm step or the finished certificate is already on screen.
  document.addEventListener("ih:langchange", () => {
    const record = loadRecord();
    if (record && stages.cert && !stages.cert.classList.contains("hidden")) {
      document.getElementById("certExamDate").textContent = formatDate(record.examDate);
      document.getElementById("certIssueDate").textContent = formatDate(record.issueDate);
    }
    if (stages.confirm && !stages.confirm.classList.contains("hidden")) {
      const examDateInput = document.getElementById("examDateInput");
      if (examDateInput && examDateInput.value) {
        document.getElementById("confirmDatePreview").textContent = formatDate(examDateInput.value);
      }
    }
  });
})();
