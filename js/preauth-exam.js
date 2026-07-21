/* ============================================================
   I18N — page-specific dictionary (merged with the SHARED dict in
   js/i18n.js). Static chrome uses data-i18n in the HTML; dynamic
   content built here picks the Arabic variant via isAr()/t() below.
   ============================================================ */
window.I18N_PAGE_DICT = {
  'pex.topbarTitle': { en: 'Pre-Auth Practical Exam', ar: 'الامتحان العملي للتصريح المسبق' },
  'pex.eyebrow': { en: 'PRE-AUTH SPECIALIST · PRACTICAL EXAM', ar: 'أخصائي التصريح المسبق · امتحان عملي' },
  'pex.h1': { en: 'Twenty cases. Fifteen decisions. One certificate.', ar: 'عشرون حالة. خمسة عشر قرارًا. شهادة واحدة.' },
  'pex.introP': { en: "This simulates a real pre-authorization queue. Review each case's history, health questionnaire, and documents — ask up to two questions if you need more — then decide. Score more than 7 out of 15 and you pass.", ar: 'يحاكي هذا التمرين قائمة انتظار حقيقية للتصريح المسبق. راجع تاريخ كل حالة، والاستبيان الصحي، والمستندات — واطرح ما يصل إلى سؤالين إذا احتجت إلى مزيد من التفاصيل — ثم اتخذ قرارك. احصل على أكثر من 7 من 15 لتنجح.' },
  'pex.rule1': { en: "<b>The dashboard</b> shows a full queue like a real hospital line — cases are color-coded by how long they've been waiting.", ar: '<b>لوحة التحكم</b> تعرض قائمة انتظار كاملة كما في طابور حقيقي بالمستشفى — الحالات مرمّزة بالألوان بحسب مدة انتظارها.' },
  'pex.rule2': { en: '<b>Fifteen cases are real</b> and count toward your score. A few tiles are marked "not yet checked in" — they\'re just there for realism.', ar: '<b>خمس عشرة حالة حقيقية</b> وتُحسب في نتيجتك. بعض البطاقات مُعلَّمة بـ"لم يتم تسجيل الوصول بعد" — وهي موجودة فقط لإضفاء الواقعية.' },
  'pex.rule3': { en: "<b>Each case</b> gives you a patient summary, insured claims history, HQ status, and three documents — not all of them matter.", ar: '<b>كل حالة</b> تزوّدك بملخص للمريض، وتاريخ مطالبات المؤمَّن له، وحالة الاستبيان الصحي، وثلاثة مستندات — ليست كلها مهمة.' },
  'pex.rule4': { en: "<b>You may ask up to two questions</b> per case for more detail. Choose them wisely.", ar: '<b>يمكنك طرح سؤالين على الأكثر</b> لكل حالة للحصول على مزيد من التفاصيل. اختر أسئلتك بحكمة.' },
  'pex.rule5': { en: "<b>Decide</b>: Approve, Partially Approve, Reject, or Refer for Review — the same categories used in real pre-auth software.", ar: '<b>اتخذ قرارك</b>: موافقة، موافقة جزئية، رفض، أو تحويل للمراجعة — وهي نفس التصنيفات المستخدمة في برامج التصريح المسبق الحقيقية.' },
  'pex.rule6': { en: "You'll see your full results — and the correct reasoning for every case — only at the end.", ar: 'ستشاهد نتائجك الكاملة — والتحليل الصحيح لكل حالة — في النهاية فقط.' },
  'pex.namePlaceholder': { en: 'Your name, for the certificate', ar: 'اسمك، لإضافته في الشهادة' },
  'pex.startBtn': { en: 'Enter the queue →', ar: 'ادخل قائمة الانتظار ←' },

  'pex.dashTitle': { en: "Today's Queue", ar: 'قائمة انتظار اليوم' },
  'pex.dashDesc': { en: 'Click a case to open it. Color reflects waiting time — treat red cases with urgency, same as you would on the floor.', ar: 'اضغط على أي حالة لفتحها. اللون يعكس مدة الانتظار — تعامل مع الحالات الحمراء بإلحاح، تمامًا كما تفعل في الواقع الميداني.' },
  'pex.legend1': { en: '&lt; 30 min', ar: '&lt; 30 دقيقة' },
  'pex.legend2': { en: '30–90 min', ar: '30–90 دقيقة' },
  'pex.legend3': { en: '&gt; 90 min', ar: '&gt; 90 دقيقة' },

  'pex.backToQueue': { en: '← Back to queue', ar: '← رجوع إلى قائمة الانتظار' },
  'pex.claimRefLabel': { en: 'Claim Ref:', ar: 'مرجع المطالبة:' },
  'pex.benefitLabel': { en: 'Benefit:', ar: 'الميزة:' },
  'pex.hcpLabel': { en: 'HCP:', ar: 'مقدم الخدمة الصحية:' },
  'pex.ageLabel': { en: 'Age:', ar: 'العمر:' },
  'pex.genderLabel': { en: 'Gender:', ar: 'الجنس:' },
  'pex.panelDiagnosis': { en: '📋 Diagnosis &amp; Request', ar: '📋 التشخيص والطلب' },
  'pex.fieldDiagnosisLabel': { en: 'Diagnosis', ar: 'التشخيص' },
  'pex.fieldRequestedLabel': { en: 'Requested', ar: 'المطلوب' },
  'pex.panelHQ': { en: '🩺 Health Questionnaire (HQ)', ar: '🩺 الاستبيان الصحي' },
  'pex.panelDocs': { en: '📎 Documents', ar: '📎 المستندات' },
  'pex.panelAsk': { en: '❓ Ask a Question', ar: '❓ اطرح سؤالًا' },
  'pex.panelHistory': { en: '🗂 Insured Claims History', ar: '🗂 تاريخ مطالبات المؤمَّن له' },
  'pex.yourDecision': { en: 'Your Decision', ar: 'قرارك' },
  'pex.decApprove': { en: 'Approve', ar: 'موافقة' },
  'pex.decPartial': { en: 'Partially Approve', ar: 'موافقة جزئية' },
  'pex.decReject': { en: 'Reject', ar: 'رفض' },
  'pex.decRefer': { en: 'Refer for Review', ar: 'تحويل للمراجعة' },
  'pex.submitBtn': { en: 'Submit &amp; Next Case', ar: 'إرسال والانتقال للحالة التالية' },
  'pex.reviewTitle': { en: 'Case-by-case review', ar: 'مراجعة كل حالة على حدة' },
  'pex.retryBtn': { en: 'Retry the exam', ar: 'إعادة الامتحان' },

  'pex.hqNone': { en: 'No HQ on file', ar: 'لا يوجد استبيان صحي في الملف' },
  'pex.hqNoneDeclared': { en: 'HQ present — no relevant conditions declared', ar: 'الاستبيان الصحي موجود — لم يُصرَّح بأي حالات ذات صلة' },
  'pex.hqPresent': { en: 'HQ on file', ar: 'الاستبيان الصحي موجود في الملف' },
  'pex.noHistory': { en: 'No prior claims on file for this member.', ar: 'لا توجد مطالبات سابقة في الملف لهذا المؤمَّن له.' },
  'pex.historyRef': { en: 'Ref', ar: 'المرجع' },
  'pex.historyDate': { en: 'Date', ar: 'التاريخ' },
  'pex.historyBenefit': { en: 'Benefit', ar: 'الميزة' },
  'pex.historyDx': { en: 'Diagnosis', ar: 'التشخيص' },
  'pex.historyAmount': { en: 'Amount', ar: 'المبلغ' },
  'pex.historyStatus': { en: 'Status', ar: 'الحالة' },

  'pex.notPartOfExam': { en: 'Not part of this exam', ar: 'ليست جزءًا من هذا الامتحان' },
  'pex.seeResults': { en: 'See my results →', ar: 'عرض نتيجتي ←' },
  'pex.decidedPrefix': { en: '✓ Decided: ', ar: '✓ تم اتخاذ القرار: ' },

  'pex.correctTag': { en: '✓ Correct', ar: '✓ صحيح' },
  'pex.incorrectTag': { en: '✗ Incorrect', ar: '✗ غير صحيح' },
  'pex.yourDecisionReview': { en: 'Your decision:', ar: 'قرارك:' },
  'pex.correctDecisionReview': { en: 'Correct decision:', ar: 'القرار الصحيح:' },

  'pex.certEyebrow': { en: 'CERTIFICATE OF COMPLETION', ar: 'شهادة إتمام' },
  'pex.passHeading': { en: 'Congratulations — you have passed the exam!', ar: 'تهانينا — لقد نجحت في الامتحان!' },
  'pex.passBody': { en: 'You are now eligible to work as a specialist at any of the biggest companies in the market. The insurance industry is waiting for you.', ar: 'أنت الآن مؤهل للعمل كأخصائي في أي من أكبر الشركات في السوق. قطاع التأمين في انتظارك.' },
  'pex.finalScoreLabel': { en: 'Final score:', ar: 'النتيجة النهائية:' },
  'pex.getCertBtn': { en: 'Get your certificate →', ar: 'احصل على شهادتك ←' },
  'pex.failEyebrow': { en: 'RESULT', ar: 'النتيجة' },
  'pex.failHeading': { en: "Bad luck — but don't let this mark define your limit.", ar: 'حظ عاثر — لكن لا تدع هذه العلامة تحدد قدراتك.' },
  'pex.failBody': { en: "You can do this. Slow down and focus before making each decision — the HQ is important, and checking exclusion criteria is a must before you decide, not an afterthought.", ar: 'يمكنك تحقيق ذلك. تمهّل وركّز قبل اتخاذ كل قرار — فالاستبيان الصحي مهم، وفحص معايير الاستثناء واجب قبل اتخاذ القرار، لا بعده.' },
  'pex.scoreLabel': { en: 'Score:', ar: 'النتيجة:' },
  'pex.needMorePrefix': { en: 'need more than', ar: 'يجب الحصول على أكثر من' },
  'pex.needMoreSuffix': { en: 'to pass', ar: 'للنجاح' },
  'pex.reviewBelowRetry': { en: 'Review the cases below, then retry the full exam.', ar: 'راجع الحالات أدناه، ثم أعد الامتحان بالكامل.' },
  'pex.selectDecisionAlert': { en: 'Please select a decision before submitting.', ar: 'يرجى اختيار قرار قبل الإرسال.' },
  'pex.candidateDefault': { en: 'Candidate', ar: 'المرشح' },
};

/* ---------------- I18N HELPERS ---------------- */
function isAr(){ return !!(window.I18N && window.I18N.currentLang && window.I18N.currentLang() === 'ar'); }
function t(key){
  const d = (window.I18N && window.I18N.dict) ? window.I18N.dict() : {};
  const e = d[key];
  if(!e) return key;
  return (isAr() ? e.ar : e.en) || e.en;
}

/* Lookup tables for values that repeat across the case bank — translating
   these once here is far cheaper than a per-case Arabic field. */
const NAME_AR = {
  "Male Patient": "مريض ذكر",
  "Female Patient": "مريضة",
  "Female Newborn Patient": "رضيعة حديثة الولادة",
  "Male Newborn Patient": "رضيع حديث الولادة"
};
const GENDER_AR = { M: "ذكر", F: "أنثى" };
const BENEFIT_AR = {
  "H-OP / Out Patient": "H-OP / العيادات الخارجية",
  "H-IP / In Patient": "H-IP / التنويم الداخلي",
  "H-ER / Emergency": "H-ER / الطوارئ",
  "H-Maternity": "H-Maternity / الولادة",
  "H-IP / In Patient (Newborn)": "H-IP / التنويم الداخلي (المولود)"
};
const HCP_AR = {
  "Al Noor Medical Center - Riyadh": "مركز النور الطبي - الرياض",
  "United Doctors Hospital - Jeddah": "مستشفى الأطباء المتحدين - جدة",
  "Al Samria Medical Center 2 - Jeddah": "مركز السامرية الطبي 2 - جدة",
  "Al Andalus Specialized Clinic - Riyadh": "عيادات الأندلس التخصصية - الرياض"
};
const HQ_ITEM_AR = {
  "No relevant conditions declared": "لم تُصرَّح أي حالات ذات صلة",
  "Type 2 Diabetes Mellitus with nephropathy — declared at enrollment": "داء السكري من النوع الثاني مع اعتلال الكلى — مُصرَّح به عند الالتحاق بالوثيقة",
  "COPD — declared at enrollment": "الانسداد الرئوي المزمن — مُصرَّح به عند الالتحاق بالوثيقة"
};
const HIST_BENEFIT_AR = {
  "Out Patient": "العيادات الخارجية",
  "Pre-Existing & Chronic": "الحالات السابقة والمزمنة"
};
const HIST_DX_AR = {
  "Type 2 Diabetes": "داء السكري من النوع الثاني",
  "Fatigue, unspecified": "تعب غير محدد",
  "Diabetic Nephropathy": "اعتلال الكلى السكري",
  "COPD": "الانسداد الرئوي المزمن"
};
const STATUS_AR = { "Paid": "مدفوعة" };
const DOC_TITLE_AR = {
  "HQ Declaration Form": "نموذج التصريح بالاستبيان الصحي",
  "Clinic Referral Note": "مذكرة تحويل من العيادة",
  "Dental Invoice (2023)": "فاتورة أسنان (2023)",
  "Admission Medical Report": "التقرير الطبي للدخول",
  "Underwriting Review Note": "مذكرة مراجعة التحصين",
  "Current MRI Report": "تقرير الرنين المغناطيسي الحالي",
  "Prior MRI Report (Pre-Policy)": "تقرير رنين مغناطيسي سابق (قبل الوثيقة)",
  "ENT Consultation Report": "تقرير استشارة الأنف والأذن والحنجرة",
  "Old Lab Report": "تقرير مخبري سابق",
  "Emergency Admission Report": "تقرير دخول الطوارئ",
  "Civil Defense Incident Report": "تقرير حادثة الدفاع المدني",
  "Insurance Card Copy": "نسخة بطاقة التأمين",
  "Neonatal Surgical Report": "تقرير جراحة حديثي الولادة",
  "NICU Admission Note": "مذكرة دخول وحدة العناية المركزة لحديثي الولادة",
  "Family Insurance Summary": "ملخص التأمين العائلي",
  "Emergency Report": "تقرير الطوارئ",
  "Policy Exclusions Schedule": "جدول استثناءات الوثيقة",
  "Najm (Police) Report": "تقرير نجم (الشرطة)",
  "Employer Duty Schedule": "جدول دوام جهة العمل",
  "Old Physiotherapy Note": "مذكرة علاج طبيعي سابقة",
  "Chronic Condition Utilization Summary": "ملخص استخدام الحالات المزمنة",
  "Nephrology Treatment Plan": "خطة علاج أمراض الكلى",
  "Pulmonology Report with Oximetry": "تقرير أمراض الرئة مع قياس التأكسج",
  "DME Coverage Schedule": "جدول تغطية المعدات الطبية المعمرة",
  "Physician Prescription & Referral Note": "وصفة الطبيب ومذكرة التحويل",
  "Network Pharmacy Directory": "دليل الصيدليات المتعاقدة",
  "Unrelated Lab Slip": "إيصال مخبري غير ذي صلة",
  "Admission & Progress Notes": "مذكرات الدخول والتقدم",
  "CHI Essential Benefits Framework Excerpt": "مقتطف من إطار المزايا الأساسية للمجلس",
  "Member's Policy Wording": "نص وثيقة المؤمَّن له",
  "Insurance Card / Policy Extract": "بطاقة التأمين / مقتطف الوثيقة",
  "Delivery Summary Report": "تقرير ملخص الولادة",
  "Cash Payment Receipt": "إيصال الدفع النقدي",
  "Linked Maternity Claim Note": "مذكرة مطالبة الولادة المرتبطة",
  "Newborn Enrollment Status": "حالة تسجيل المولود",
  "Lab Report": "تقرير مخبري",
  "Prescription Request": "طلب الوصفة الطبية",
  "Old Employment Physical": "فحص طبي سابق لجهة عمل"
};
const FILLER_AR = {
  "Not yet checked in": "لم يتم تسجيل الوصول بعد",
  "Awaiting documents": "في انتظار المستندات",
  "Registration pending": "التسجيل قيد الإجراء"
};

function L(en, ar){ return isAr() ? (ar || en) : en; }
function localizedName(name){ return isAr() ? (NAME_AR[name] || name) : name; }
function localizedGender(g){ return isAr() ? (GENDER_AR[g] || g) : g; }
function localizedBenefit(b){ return isAr() ? (BENEFIT_AR[b] || b) : b; }
function localizedHcp(h){ return isAr() ? (HCP_AR[h] || h) : h; }
function localizedHqItem(h){ return isAr() ? (HQ_ITEM_AR[h] || h) : h; }
function localizedHistBenefit(b){ return isAr() ? (HIST_BENEFIT_AR[b] || b) : b; }
function localizedHistDx(dx){ return isAr() ? (HIST_DX_AR[dx] || dx) : dx; }
function localizedStatus(s){ return isAr() ? (STATUS_AR[s] || s) : s; }
function localizedDocTitle(title){ return isAr() ? (DOC_TITLE_AR[title] || title) : title; }
function localizedFillerName(n){ return isAr() ? (FILLER_AR[n] || n) : n; }
function decisionLabel(d){
  const map = { approve:'pex.decApprove', partial:'pex.decPartial', reject:'pex.decReject', refer:'pex.decRefer' };
  return map[d] ? t(map[d]) : (DECISION_LABELS[d] || d);
}

/* ============================================================
   CASE DATA — 15 graded cases, drawn from the same concepts
   already taught across Videos 2–6 (HQ, exclusions, liability,
   chronic limits, DME) for course consistency.

   Arabic fields use the *_ar suffix convention (dx_ar, complaint_ar,
   requested_ar, rationale_ar, content_ar on documents, q_ar/a_ar on
   questions) — see js/anatomy-spotting.js for the same pattern.
   ============================================================ */
const CASES = [
  { id:1, ref:"2026/700101", wait:12, name:"Male Patient", age:45, gender:"M", benefit:"H-OP / Out Patient", hcp:"Al Noor Medical Center - Riyadh",
    dx:"E11.9 — Type 2 Diabetes Mellitus, without complications",
    dx_ar:"E11.9 — داء السكري من النوع الثاني، دون مضاعفات",
    complaint:"Routine follow-up visit, requesting HbA1c and Metformin renewal.",
    complaint_ar:"زيارة متابعة دورية، مع طلب تجديد فحص السكر التراكمي (HbA1c) ودواء الميتفورمين.",
    requested:"HbA1c test, Metformin 500mg × 90 tabs",
    requested_ar:"فحص السكر التراكمي (HbA1c)، ميتفورمين 500 ملغ × 90 قرصًا",
    hasHQ:true, hqList:[],
    history:[
      {ref:"2025/551201",date:"14/03/2025",benefit:"Out Patient",dx:"Type 2 Diabetes",amt:"96.00",status:"Paid"},
      {ref:"2024/338820",date:"02/09/2024",benefit:"Out Patient",dx:"Type 2 Diabetes",amt:"88.50",status:"Paid"}
    ],
    documents:[
      {title:"HQ Declaration Form", necessary:false, content:"Health Questionnaire on file at enrollment. No hospital admission history for this member. Routine outpatient-managed conditions like DM and HTN are not required HQ declaration items unless there has been a prior admission for them.",
        content_ar:"استبيان الحالة الصحية موجود في الملف منذ الالتحاق بالوثيقة. لا يوجد سجل لأي دخول إلى المستشفى لهذا المؤمَّن له. الحالات التي تُعالَج عادةً في العيادات الخارجية مثل السكري وارتفاع ضغط الدم لا تُعد بنودًا واجبة التصريح في الاستبيان الصحي إلا إذا كان هناك دخول سابق للمستشفى بسببها."},
      {title:"Clinic Referral Note", necessary:true, content:"Stable T2DM, routine 3-month follow-up, HbA1c due, continue Metformin.",
        content_ar:"حالة سكري من النوع الثاني مستقرة، متابعة دورية كل 3 أشهر، مطلوب فحص السكر التراكمي، والاستمرار على الميتفورمين."},
      {title:"Dental Invoice (2023)", necessary:false, content:"Unrelated dental scaling invoice from a prior year — no relevance to this request.",
        content_ar:"فاتورة تنظيف أسنان من سنة سابقة لا علاقة لها بالطلب الحالي."}
    ],
    questions:[
      {q:"Does Diabetes need to be declared on the HQ?", a:"Not necessarily — DM and HTN are only required HQ items if the member has a prior hospital admission for the condition. This member has no admission history, so non-declaration isn't an issue here.",
        q_ar:"هل يجب التصريح بمرض السكري في الاستبيان الصحي؟",
        a_ar:"ليس بالضرورة — السكري وارتفاع ضغط الدم يُشترط التصريح بهما فقط إذا كان للمؤمَّن له دخول سابق للمستشفى بسبب الحالة. هذا المؤمَّن له لا يوجد له سجل دخول، لذا عدم التصريح لا يمثل مشكلة في هذه الحالة."},
      {q:"Any new complications since enrollment?", a:"No new complications reported; the condition remains stable on oral therapy.",
        q_ar:"هل ظهرت أي مضاعفات جديدة منذ الالتحاق بالوثيقة؟",
        a_ar:"لم تُسجَّل أي مضاعفات جديدة؛ الحالة مستقرة على العلاج الفموي."},
      {q:"Is the requested treatment consistent with standard guidelines?", a:"Yes — HbA1c monitoring and Metformin continuation are standard first-line management.",
        q_ar:"هل العلاج المطلوب متوافق مع الإرشادات المعتمدة؟",
        a_ar:"نعم — متابعة السكر التراكمي والاستمرار على الميتفورمين يمثلان خط العلاج الأول المعتمد."}
    ],
    correct:"approve", rationale:"Stable, guideline-consistent outpatient management of a routine chronic condition. DM doesn't require HQ declaration absent a prior admission, so there's no disclosure issue — no exclusion applies.",
    rationale_ar:"إدارة مستقرة ومتوافقة مع الإرشادات لحالة مزمنة روتينية في العيادات الخارجية. السكري لا يتطلب التصريح في الاستبيان الصحي في غياب دخول سابق للمستشفى، لذا لا توجد مشكلة إفصاح — ولا ينطبق أي استثناء. القرار: الموافقة."
  },
  { id:2, ref:"2026/700102", wait:95, name:"Male Patient", age:38, gender:"M", benefit:"H-IP / In Patient", hcp:"United Doctors Hospital - Jeddah",
    dx:"B18.2 — Chronic viral hepatitis C, with decompensation",
    dx_ar:"B18.2 — التهاب الكبد الفيروسي الوبائي (سي) المزمن، مع تدهور وظائف الكبد",
    complaint:"Admitted with jaundice and ascites, decompensated liver disease.",
    complaint_ar:"تم إدخاله بسبب اليرقان (اصفرار) والاستسقاء البطني، مع تدهور في وظائف الكبد.",
    requested:"Inpatient admission, liver function panel, diuretics, paracentesis",
    requested_ar:"دخول للتنويم الداخلي، فحوصات وظائف الكبد، مدرات البول، وبزل السائل البطني (الاستسقاء)",
    hasHQ:true, hqList:[],
    history:[{ref:"2025/119004",date:"20/01/2025",benefit:"Out Patient",dx:"Fatigue, unspecified",amt:"64.00",status:"Paid"}],
    documents:[
      {title:"HQ Declaration Form", necessary:true, content:"Health Questionnaire signed 6 months ago at policy inception. No chronic illness declared. No liver disease mentioned.",
        content_ar:"تم توقيع الاستبيان الصحي منذ 6 أشهر عند بدء الوثيقة. لم يُصرَّح بأي مرض مزمن. لم يُذكر أي مرض في الكبد."},
      {title:"Admission Medical Report", necessary:true, content:"History taking documents the patient's own report: 'known Hepatitis C, diagnosed approximately 3 years ago, previously untreated.' Current decompensation is consistent with long-standing disease.",
        content_ar:"يوثّق أخذ التاريخ المرضي إفادة المريض نفسه: 'مصاب بالتهاب الكبد الوبائي سي، تم تشخيصه منذ نحو 3 سنوات، ولم يُعالَج سابقًا.' التدهور الحالي متوافق مع مرض طويل الأمد."},
      {title:"Underwriting Review Note", necessary:true, content:"Case flagged and reviewed by underwriting: non-disclosure confirmed. Diagnosis pre-dates policy inception by approximately 2.5 years and was not disclosed on the HQ.",
        content_ar:"تمت مراجعة الحالة من قبل قسم التحصين (Underwriting) وتأكيد عدم الإفصاح. التشخيص يسبق بدء الوثيقة بنحو 2.5 سنة ولم يُصرَّح به في الاستبيان الصحي."}
    ],
    questions:[
      {q:"Was Hepatitis C declared on the Health Questionnaire?", a:"No — the HQ shows no chronic illness declared at enrollment.",
        q_ar:"هل تم التصريح بالتهاب الكبد الوبائي سي في الاستبيان الصحي؟",
        a_ar:"لا — لا يُظهر الاستبيان الصحي أي مرض مزمن مُصرَّح به عند الالتحاق بالوثيقة."},
      {q:"Does the medical record show when the condition was first diagnosed?", a:"Yes — the admission report documents the patient's own account of diagnosis roughly 3 years before the policy started.",
        q_ar:"هل يوضح السجل الطبي تاريخ التشخيص الأول للحالة؟",
        a_ar:"نعم — يوثّق تقرير الدخول إفادة المريض نفسه بأن التشخيص تم قبل نحو 3 سنوات من بدء الوثيقة."}
    ],
    correct:"reject", rationale:"Underwriting has already confirmed non-disclosure of a condition that materially pre-dates the policy. This isn't a snap judgment — the investigation is complete, and it supports rejection.",
    rationale_ar:"قسم التحصين أكد بالفعل عدم الإفصاح عن حالة تسبق بشكل جوهري بدء الوثيقة. هذا ليس قرارًا متسرعًا — التحقيق مكتمل، وهو يدعم الرفض."
  },
  { id:3, ref:"2026/700103", wait:40, name:"Male Patient", age:29, gender:"M", benefit:"H-OP / Out Patient", hcp:"Al Samria Medical Center 2 - Jeddah",
    dx:"S83.5 — Sprain of cruciate ligament, right knee",
    dx_ar:"S83.5 — التواء الرباط الصليبي، الركبة اليمنى",
    complaint:"Requesting ACL reconstruction surgery, right knee instability.",
    complaint_ar:"طلب إجراء جراحة إعادة بناء الرباط الصليبي الأمامي بسبب عدم استقرار الركبة اليمنى.",
    requested:"MRI-confirmed ACL reconstruction, pre-operative workup",
    requested_ar:"إعادة بناء الرباط الصليبي الأمامي المؤكدة بالرنين المغناطيسي، والفحوصات التحضيرية قبل الجراحة",
    hasHQ:true, hqList:[],
    history:[],
    documents:[
      {title:"HQ Declaration Form", necessary:true, content:"Health Questionnaire signed 14 months ago. No prior joint or orthopedic issues declared.",
        content_ar:"تم توقيع الاستبيان الصحي منذ 14 شهرًا. لم يُصرَّح بأي مشاكل سابقة في المفاصل أو العظام."},
      {title:"Current MRI Report", necessary:true, content:"Right knee MRI: complete ACL tear, moderate joint effusion.",
        content_ar:"تقرير رنين مغناطيسي للركبة اليمنى: تمزق كامل في الرباط الصليبي الأمامي، مع انصباب متوسط في المفصل."},
      {title:"Prior MRI Report (Pre-Policy)", necessary:true, content:"MRI dated 15 months before policy inception, from a different facility: partial tear of the right ACL, same knee.",
        content_ar:"تقرير رنين مغناطيسي سابق يعود تاريخه إلى 15 شهرًا قبل بدء الوثيقة، من منشأة مختلفة: تمزق جزئي في الرباط الصليبي الأمامي لنفس الركبة."}
    ],
    questions:[
      {q:"Is there any imaging that predates the policy?", a:"Yes — a prior MRI exists, dated 15 months before the policy started, showing a partial tear in the same knee.",
        q_ar:"هل توجد أي صور تصوير طبي تسبق تاريخ بدء الوثيقة؟",
        a_ar:"نعم — يوجد تقرير رنين مغناطيسي سابق يعود إلى 15 شهرًا قبل بدء الوثيقة، يُظهر تمزقًا جزئيًا في نفس الركبة."},
      {q:"Was any knee condition declared on the HQ?", a:"No — the HQ shows no orthopedic history declared.",
        q_ar:"هل تم التصريح بأي حالة في الركبة في الاستبيان الصحي؟",
        a_ar:"لا — لا يُظهر الاستبيان الصحي أي تاريخ سابق في العظام أو المفاصل."}
    ],
    correct:"reject", rationale:"Imaging confirms pre-existing joint pathology predating the policy, and it wasn't disclosed on the HQ.",
    rationale_ar:"التصوير الطبي يؤكد وجود حالة سابقة في المفصل تسبق بدء الوثيقة، ولم يتم الإفصاح عنها في الاستبيان الصحي. القرار: الرفض."
  },
  { id:4, ref:"2026/700104", wait:20, name:"Female Patient", age:26, gender:"F", benefit:"H-OP / Out Patient", hcp:"Al Andalus Specialized Clinic - Riyadh",
    dx:"J34.2 — Deviated nasal septum (patient-reported)",
    dx_ar:"J34.2 — انحراف الحاجز الأنفي (بحسب إفادة المريضة)",
    complaint:"Requesting rhinoplasty, states difficulty breathing.",
    complaint_ar:"طلب إجراء عملية تجميل الأنف، مع إفادة بوجود صعوبة في التنفس.",
    requested:"Septorhinoplasty",
    requested_ar:"عملية تجميل الأنف وتقويم الحاجز الأنفي",
    hasHQ:true, hqList:["No relevant conditions declared"],
    history:[],
    documents:[
      {title:"HQ Declaration Form", necessary:false, content:"No relevant prior conditions declared — not directly informative for this decision.",
        content_ar:"لم يُصرَّح بأي حالات سابقة ذات صلة — غير مفيد بشكل مباشر لهذا القرار."},
      {title:"ENT Consultation Report", necessary:true, content:"ENT exam: nasal airway patent bilaterally, no septal deviation on endoscopy, no functional obstruction identified. Cosmetic concern noted by the patient regarding nasal appearance.",
        content_ar:"فحص الأنف والأذن والحنجرة: الممر الأنفي سالك من الجانبين، لا يوجد انحراف في الحاجز عند التنظير، ولم يُحدَّد أي انسداد وظيفي. لوحظ اهتمام المريضة بالمظهر التجميلي للأنف."},
      {title:"Old Lab Report", necessary:false, content:"Routine CBC from 8 months ago, within normal limits — unrelated to the current request.",
        content_ar:"تحليل دم شامل روتيني من قبل 8 أشهر، ضمن الحدود الطبيعية — لا علاقة له بالطلب الحالي."}
    ],
    questions:[
      {q:"Does the ENT exam confirm a functional airway obstruction?", a:"No — the ENT report specifically notes no septal deviation and no functional obstruction on exam.",
        q_ar:"هل يؤكد فحص الأنف والأذن والحنجرة وجود انسداد وظيفي في مجرى التنفس؟",
        a_ar:"لا — يوضح تقرير الفحص تحديدًا عدم وجود انحراف في الحاجز أو انسداد وظيفي عند الفحص."},
      {q:"Is there objective testing documenting breathing impairment?", a:"No airflow study was performed or documented; the complaint is subjective and appearance-related per the consultation note.",
        q_ar:"هل توجد فحوصات موضوعية توثّق ضعفًا في التنفس؟",
        a_ar:"لم يتم إجراء أو توثيق أي فحص لتدفق الهواء؛ والشكوى ذاتية ومرتبطة بالمظهر بحسب مذكرة الاستشارة."}
    ],
    correct:"reject", rationale:"No confirmed functional impairment — the ENT exam is normal. This reads as a cosmetic request, excluded under routine policy terms.",
    rationale_ar:"لا يوجد ضعف وظيفي مؤكد — فحص الأنف والأذن والحنجرة طبيعي. يبدو الطلب تجميليًا، وهو مستثنى بموجب شروط الوثيقة المعتادة. القرار: الرفض."
  },
  { id:5, ref:"2026/700105", wait:80, name:"Male Patient", age:52, gender:"M", benefit:"H-ER / Emergency", hcp:"United Doctors Hospital - Jeddah",
    dx:"T14.8 — Injury from external cause, storm-related",
    dx_ar:"T14.8 — إصابة ناتجة عن سبب خارجي، مرتبطة بعاصفة",
    complaint:"Admitted with crush injuries following a building collapse during severe flooding.",
    complaint_ar:"تم إدخاله بإصابات سحق ناتجة عن انهيار مبنى خلال فيضانات شديدة.",
    requested:"Emergency admission, surgical fixation of fractures",
    requested_ar:"دخول طارئ، وتثبيت جراحي للكسور",
    hasHQ:false, hqList:[],
    history:[],
    documents:[
      {title:"Emergency Admission Report", necessary:true, content:"Patient brought in following structural collapse during a declared flood event in the region. Multiple long-bone fractures, hemodynamically stable.",
        content_ar:"تم إحضار المريض بعد انهيار إنشائي خلال حدث فيضان معلن رسميًا في المنطقة. كسور متعددة في العظام الطويلة، والحالة الدموية مستقرة."},
      {title:"Civil Defense Incident Report", necessary:true, content:"Official incident report confirms the injury occurred during a declared flood/natural disaster event in the area.",
        content_ar:"تقرير رسمي من الدفاع المدني يؤكد أن الإصابة وقعت خلال حدث فيضان/كارثة طبيعية معلنة في المنطقة."},
      {title:"Insurance Card Copy", necessary:false, content:"Standard insurance card image — no additional clinical information.",
        content_ar:"صورة بطاقة تأمين عادية — لا تحتوي على أي معلومات طبية إضافية."}
    ],
    questions:[
      {q:"Is this injury related to a declared natural disaster event?", a:"Yes — the Civil Defense report confirms the injury occurred during a declared flood event.",
        q_ar:"هل هذه الإصابة مرتبطة بحدث كارثة طبيعية معلنة؟",
        a_ar:"نعم — يؤكد تقرير الدفاع المدني أن الإصابة وقعت خلال حدث فيضان معلن."},
      {q:"Is there any rider or legal requirement overriding the standard exclusion?", a:"No special legal mandate or policy rider is on file for this member.",
        q_ar:"هل توجد أي ملحقة تأمينية أو مطلب قانوني يتجاوز الاستثناء المعتاد؟",
        a_ar:"لا يوجد أي إلزام قانوني خاص أو ملحقة تأمينية مسجلة لهذا المؤمَّن له."}
    ],
    correct:"reject", rationale:"Natural disaster injuries are excluded under the Basic Health Insurance Policy unless required by law or covered by a specific rider — neither applies here.",
    rationale_ar:"إصابات الكوارث الطبيعية مستثناة بموجب وثيقة التأمين الصحي الأساسية، إلا إذا كان التغطية مطلوبة قانونًا أو مشمولة بملحقة خاصة — وكلا الحالتين لا تنطبق هنا. القرار: الرفض."
  },
  { id:6, ref:"2026/700106", wait:5, name:"Female Newborn Patient", age:0, gender:"F", benefit:"H-IP / In Patient", hcp:"United Doctors Hospital - Jeddah",
    dx:"Q79.1 — Congenital diaphragmatic hernia",
    dx_ar:"Q79.1 — فتق الحجاب الحاجز الخلقي",
    complaint:"Newborn with severe respiratory distress, confirmed diaphragmatic hernia, requires emergency surgical repair.",
    complaint_ar:"مولود يعاني من ضيق تنفس شديد، مع تأكيد فتق في الحجاب الحاجز، ويحتاج إلى إصلاح جراحي طارئ.",
    requested:"Emergency neonatal surgical repair, NICU admission",
    requested_ar:"إصلاح جراحي طارئ لحديثي الولادة، ودخول وحدة العناية المركزة لحديثي الولادة",
    hasHQ:false, hqList:[],
    history:[],
    documents:[
      {title:"Neonatal Surgical Report", necessary:true, content:"Confirmed congenital diaphragmatic hernia with bowel herniation into the thoracic cavity, causing severe respiratory compromise. Immediate surgical repair indicated to prevent mortality.",
        content_ar:"تأكيد وجود فتق خلقي في الحجاب الحاجز مع انزلاق للأمعاء داخل التجويف الصدري، مما تسبب في ضعف شديد في التنفس. الإصلاح الجراحي الفوري مطلوب لمنع الوفاة."},
      {title:"NICU Admission Note", necessary:true, content:"Neonate in critical but stabilized condition on ventilatory support, awaiting emergency surgery.",
        content_ar:"المولود في حالة حرجة لكنه مستقر على دعم التنفس الآلي، وفي انتظار الجراحة الطارئة."},
      {title:"Family Insurance Summary", necessary:false, content:"General family policy summary document, not specific to this admission.",
        content_ar:"مستند ملخص عام لوثيقة التأمين العائلية، غير خاص بهذا الدخول."}
    ],
    questions:[
      {q:"Is this condition immediately life-threatening without intervention?", a:"Yes — without urgent surgical repair, the condition carries a high risk of mortality due to respiratory compromise.",
        q_ar:"هل هذه الحالة مهددة للحياة بشكل فوري دون تدخل؟",
        a_ar:"نعم — دون الإصلاح الجراحي العاجل، تحمل الحالة خطرًا كبيرًا للوفاة بسبب ضعف التنفس."},
      {q:"Is this an urgent or elective congenital case?", a:"This is an urgent, life-threatening presentation requiring emergency intervention, not an elective correction.",
        q_ar:"هل هذه حالة خلقية طارئة أم اختيارية؟",
        a_ar:"هذه حالة طارئة ومهددة للحياة تتطلب تدخلًا فوريًا، وليست تصحيحًا اختياريًا."}
    ],
    correct:"approve", rationale:"Congenital anomalies are generally excluded, but life-threatening congenital conditions requiring urgent intervention are a recognized exception.",
    rationale_ar:"التشوهات الخلقية مستثناة بشكل عام، إلا أن الحالات الخلقية المهددة للحياة التي تتطلب تدخلًا عاجلًا تُعد استثناءً معتمدًا. القرار: الموافقة."
  },
  { id:7, ref:"2026/700107", wait:55, name:"Male Patient", age:24, gender:"M", benefit:"H-ER / Emergency", hcp:"Al Samria Medical Center 2 - Jeddah",
    dx:"S52.5 — Fracture of distal radius",
    dx_ar:"S52.5 — كسر في الطرف البعيد لعظم الكعبرة",
    complaint:"Injured during a motocross racing competition, open wrist fracture.",
    complaint_ar:"أصيب خلال منافسة سباق دراجات موتوكروس، مع كسر مفتوح في المعصم.",
    requested:"Emergency reduction and fixation of wrist fracture",
    requested_ar:"رد وتثبيت طارئ لكسر المعصم",
    hasHQ:true, hqList:["No relevant conditions declared"],
    history:[],
    documents:[
      {title:"Emergency Report", necessary:true, content:"Patient sustained an open distal radius fracture during a motocross competition. Immediate surgical fixation required.",
        content_ar:"تعرض المريض لكسر مفتوح في الطرف البعيد لعظم الكعبرة خلال منافسة موتوكروس. يتطلب تثبيتًا جراحيًا فوريًا."},
      {title:"Policy Exclusions Schedule", necessary:true, content:"Policy exclusions list includes: 'Injuries sustained during motor racing, motocross, or similar hazardous motorsport competitions are excluded from coverage.'",
        content_ar:"تتضمن قائمة استثناءات الوثيقة: 'الإصابات الناتجة عن سباقات السيارات أو الموتوكروس أو منافسات رياضات المحركات الخطرة المماثلة مستثناة من التغطية.'"},
      {title:"HQ Declaration Form", necessary:false, content:"No relevant prior conditions declared — not informative for this specific exclusion question.",
        content_ar:"لم يُصرَّح بأي حالات سابقة ذات صلة — غير مفيد لهذا السؤال المحدد المتعلق بالاستثناء."}
    ],
    questions:[
      {q:"Is motocross racing specifically listed as an excluded activity?", a:"Yes — the policy exclusions schedule explicitly lists motocross and motor racing competitions as excluded hazardous activities.",
        q_ar:"هل يتم ذكر رياضة الموتوكروس تحديدًا كنشاط مستثنى؟",
        a_ar:"نعم — يذكر جدول استثناءات الوثيقة صريحًا منافسات الموتوكروس وسباقات السيارات كأنشطة خطرة مستثناة."},
      {q:"Was this an official competition or casual riding?", a:"Confirmed as an official motocross competition per the emergency report.",
        q_ar:"هل كانت هذه منافسة رسمية أم قيادة عادية؟",
        a_ar:"تم تأكيد أنها منافسة موتوكروس رسمية بحسب تقرير الطوارئ."}
    ],
    correct:"reject", rationale:"The policy explicitly excludes motocross and motor racing competitions as a hazardous activity.",
    rationale_ar:"تستثني الوثيقة صريحًا منافسات الموتوكروس وسباقات السيارات كنشاط خطر. القرار: الرفض."
  },
  { id:8, ref:"2026/700108", wait:30, name:"Male Patient", age:34, gender:"M", benefit:"H-OP / Out Patient", hcp:"Al Noor Medical Center - Riyadh",
    dx:"S82.0 — Fracture of patella",
    dx_ar:"S82.0 — كسر في الرضفة",
    complaint:"Injured in a traffic accident while commuting home after work hours.",
    complaint_ar:"أصيب في حادث سير خلال تنقله إلى المنزل بعد ساعات العمل.",
    requested:"Outpatient orthopedic management, casting",
    requested_ar:"علاج عظمي في العيادات الخارجية، وتجبير",
    hasHQ:true, hqList:["No relevant conditions declared"],
    history:[],
    documents:[
      {title:"Najm (Police) Report", necessary:true, content:"Traffic accident report: member's liability assessed at 0%. The other driver was found fully at fault.",
        content_ar:"تقرير حادث مروري (نجم): تم تقييم مسؤولية المؤمَّن له بنسبة 0%. تم تحديد مسؤولية السائق الآخر بالكامل."},
      {title:"Employer Duty Schedule", necessary:true, content:"Duty schedule confirms the accident occurred after official working hours, during the member's personal commute home — not during a work assignment.",
        content_ar:"يؤكد جدول العمل أن الحادث وقع بعد ساعات العمل الرسمية، خلال تنقل المؤمَّن له الشخصي إلى المنزل — وليس أثناء مهمة عمل."},
      {title:"Old Physiotherapy Note", necessary:false, content:"Unrelated physiotherapy note from over a year ago, for a different, resolved complaint.",
        content_ar:"مذكرة علاج طبيعي سابقة منذ أكثر من سنة، لشكوى مختلفة تم حلها، ولا علاقة لها بالحالة الحالية."}
    ],
    questions:[
      {q:"Does the duty schedule confirm this happened during work duties?", a:"No — the duty schedule confirms the accident occurred after working hours, during a personal commute.",
        q_ar:"هل يؤكد جدول العمل أن الحادث وقع أثناء مهام العمل؟",
        a_ar:"لا — يؤكد جدول العمل أن الحادث وقع بعد ساعات العمل، خلال تنقل شخصي."},
      {q:"What does the Najm report say about liability?", a:"The member was found 0% liable; the other driver was fully at fault.",
        q_ar:"ماذا يذكر تقرير نجم بشأن المسؤولية؟",
        a_ar:"تم تحديد مسؤولية المؤمَّن له بنسبة 0%؛ وكانت المسؤولية الكاملة على السائق الآخر."},
      {q:"Does third-party liability affect the member's own health coverage eligibility?", a:"No — the member's health policy covers eligible treatment regardless of fault. Liability only determines whether the insurer can later recover costs from the at-fault party — it doesn't delay the member's own care.",
        q_ar:"هل تؤثر مسؤولية الطرف الثالث على أهلية المؤمَّن له للتغطية الصحية؟",
        a_ar:"لا — تغطي وثيقة المؤمَّن له الصحية العلاج المستحق بغض النظر عن المسؤولية. المسؤولية تحدد فقط إمكانية استرداد شركة التأمين للتكاليف من الطرف المتسبب لاحقًا — ولا تُعد سببًا لتأخير رعاية المؤمَّن له."}
    ],
    correct:"approve", rationale:"This is not an occupational injury — it happened outside work duties, so no work-related exclusion applies. The member's own health coverage pays for eligible treatment regardless of who was at fault; recovering costs from the at-fault driver's motor insurer is a separate subrogation process handled by the insurer afterward, not a reason to withhold the member's care. Approve.",
    rationale_ar:"هذه ليست إصابة عمل — فقد وقعت خارج مهام العمل، ولذلك لا ينطبق أي استثناء متعلق بالعمل. تغطي وثيقة المؤمَّن له الصحية العلاج المستحق بغض النظر عن المسؤولية؛ واسترداد التكاليف من شركة تأمين السائق المتسبب هو إجراء حلول (Subrogation) منفصل تتولاه شركة التأمين لاحقًا، ولا يُعد سببًا لحجب رعاية المؤمَّن له. القرار: الموافقة."
  },
  { id:9, ref:"2026/700109", wait:65, name:"Female Patient", age:58, gender:"F", benefit:"H-IP / In Patient", hcp:"United Doctors Hospital - Jeddah",
    dx:"N18.6 — End-stage renal disease, diabetic nephropathy",
    dx_ar:"N18.6 — الفشل الكلوي في مرحلته النهائية، اعتلال الكلى السكري",
    complaint:"Longstanding declared diabetic nephropathy, now requiring initiation of hemodialysis.",
    complaint_ar:"اعتلال كلى سكري مُصرَّح به منذ فترة طويلة، ويحتاج الآن إلى بدء الغسيل الكلوي.",
    requested:"Hemodialysis sessions, vascular access placement",
    requested_ar:"جلسات غسيل كلوي، وتركيب منفذ وعائي",
    hasHQ:true, hqList:["Type 2 Diabetes Mellitus with nephropathy — declared at enrollment"],
    history:[
      {ref:"2025/882210",date:"10/06/2025",benefit:"Pre-Existing & Chronic",dx:"Diabetic Nephropathy",amt:"210,000.00",status:"Paid"},
      {ref:"2025/441098",date:"22/02/2025",benefit:"Pre-Existing & Chronic",dx:"Diabetic Nephropathy",amt:"640,000.00",status:"Paid"}
    ],
    documents:[
      {title:"HQ Declaration Form", necessary:false, content:"Diabetic nephropathy declared at enrollment — already established, not the key issue in this case.",
        content_ar:"تم التصريح باعتلال الكلى السكري عند الالتحاق بالوثيقة — وهو أمر ثابت مسبقًا وليس القضية الجوهرية في هذه الحالة."},
      {title:"Chronic Condition Utilization Summary", necessary:true, content:"Cumulative paid amount under the Pre-Existing & Chronic Conditions benefit this policy year: SAR 850,000. Policy maximum for this benefit: SAR 1,000,000. Remaining balance: SAR 150,000.",
        content_ar:"إجمالي المبلغ المدفوع ضمن مزايا الحالات السابقة والمزمنة لهذا العام التأميني: 850,000 ريال سعودي. الحد الأقصى للوثيقة لهذه الميزة: 1,000,000 ريال سعودي. الرصيد المتبقي: 150,000 ريال سعودي."},
      {title:"Nephrology Treatment Plan", necessary:true, content:"Hemodialysis initiation — estimated cost for the requested course of sessions: SAR 210,000.",
        content_ar:"بدء الغسيل الكلوي — التكلفة التقديرية لسلسلة الجلسات المطلوبة: 210,000 ريال سعودي."}
    ],
    questions:[
      {q:"What is the remaining balance under the chronic condition limit?", a:"SAR 150,000 remains available under the SAR 1,000,000 chronic/pre-existing condition cap this policy year.",
        q_ar:"ما هو الرصيد المتبقي ضمن حد الحالات المزمنة؟",
        a_ar:"يتبقى 150,000 ريال سعودي متاحة ضمن الحد الأقصى البالغ 1,000,000 ريال سعودي لهذا العام التأميني."},
      {q:"What is the estimated cost of the requested treatment course?", a:"Approximately SAR 210,000 for the full requested course of dialysis sessions.",
        q_ar:"ما هي التكلفة التقديرية لسلسلة العلاج المطلوبة؟",
        a_ar:"حوالي 210,000 ريال سعودي للسلسلة الكاملة من جلسات الغسيل الكلوي المطلوبة."}
    ],
    correct:"partial", rationale:"The condition and treatment are covered, but the requested amount (SAR 210,000) exceeds the SAR 150,000 remaining under the chronic condition cap. Partially approve up to the remaining limit.",
    rationale_ar:"الحالة والعلاج مغطاة، لكن المبلغ المطلوب (210,000 ريال) يتجاوز الرصيد المتبقي البالغ 150,000 ريال ضمن حد الحالات المزمنة. الموافقة جزئيًا بحدود الرصيد المتبقي. القرار: موافقة جزئية."
  },
  { id:10, ref:"2026/700110", wait:15, name:"Male Patient", age:66, gender:"M", benefit:"H-OP / Out Patient", hcp:"Al Noor Medical Center - Riyadh",
    dx:"J44.9 — Chronic obstructive pulmonary disease",
    dx_ar:"J44.9 — الانسداد الرئوي المزمن",
    complaint:"Severe COPD with resting hypoxemia, requesting home oxygen therapy.",
    complaint_ar:"انسداد رئوي مزمن شديد مع نقص أكسجين عند الراحة، مع طلب علاج الأكسجين المنزلي.",
    requested:"Home oxygen concentrator (durable medical equipment)",
    requested_ar:"مكثف أكسجين منزلي (معدات طبية معمرة)",
    hasHQ:true, hqList:["COPD — declared at enrollment"],
    history:[{ref:"2025/220456",date:"05/11/2025",benefit:"Out Patient",dx:"COPD",amt:"145.00",status:"Paid"}],
    documents:[
      {title:"HQ Declaration Form", necessary:false, content:"COPD declared at enrollment — already established.",
        content_ar:"تم التصريح بالانسداد الرئوي المزمن عند الالتحاق بالوثيقة — وهو أمر ثابت مسبقًا."},
      {title:"Pulmonology Report with Oximetry", necessary:true, content:"Resting oxygen saturation 87% on room air, consistent with criteria for home oxygen therapy per standard clinical guidelines.",
        content_ar:"تشبع الأكسجين عند الراحة على الهواء الجوي 87%، وهو متوافق مع معايير علاج الأكسجين المنزلي بحسب الإرشادات السريرية المعتمدة."},
      {title:"DME Coverage Schedule", necessary:true, content:"Policy DME schedule confirms home oxygen concentrators are a covered benefit when medical necessity criteria (documented hypoxemia) are met.",
        content_ar:"يؤكد جدول المعدات الطبية المعمرة في الوثيقة أن مكثفات الأكسجين المنزلية مغطاة عند استيفاء معايير الضرورة الطبية (نقص الأكسجين الموثق)."}
    ],
    questions:[
      {q:"Does the oximetry result meet medical necessity criteria for home oxygen?", a:"Yes — resting saturation of 87% meets standard clinical criteria for home oxygen therapy.",
        q_ar:"هل تستوفي نتيجة قياس التأكسج معايير الضرورة الطبية للأكسجين المنزلي؟",
        a_ar:"نعم — تشبع الأكسجين عند الراحة البالغ 87% يستوفي المعايير السريرية المعتمدة لعلاج الأكسجين المنزلي."},
      {q:"Is home oxygen equipment covered under this policy's DME schedule?", a:"Yes — the DME schedule confirms coverage when documented medical necessity criteria are met, which this case satisfies.",
        q_ar:"هل معدات الأكسجين المنزلي مغطاة ضمن جدول المعدات الطبية المعمرة في هذه الوثيقة؟",
        a_ar:"نعم — يؤكد الجدول التغطية عند استيفاء معايير الضرورة الطبية الموثقة، وهو ما تستوفيه هذه الحالة."}
    ],
    correct:"approve", rationale:"Documented medical necessity (hypoxemia on oximetry) meets DME coverage criteria under the policy.",
    rationale_ar:"الضرورة الطبية الموثقة (نقص الأكسجين في قياس التأكسج) تستوفي معايير تغطية المعدات الطبية المعمرة بموجب الوثيقة. القرار: الموافقة."
  },
  { id:11, ref:"2026/700111", wait:22, name:"Male Patient", age:31, gender:"M", benefit:"H-OP / Out Patient", hcp:"Al Noor Medical Center - Riyadh",
    dx:"J18.9 — Community-acquired pneumonia",
    dx_ar:"J18.9 — التهاب رئوي مكتسب من المجتمع",
    complaint:"On oral antibiotics; physician referred the member to an external retail pharmacy to dispense the medication, since the hospital pharmacy doesn't stock this formulation.",
    complaint_ar:"يتلقى مضادات حيوية فموية؛ وقد أحاله الطبيب إلى صيدلية خارجية لصرف الدواء، لأن صيدلية المستشفى لا تتوفر لديها هذا التركيب.",
    requested:"Dispense a 7-day antibiotic course at an external retail pharmacy per physician referral",
    requested_ar:"صرف مضاد حيوي لمدة 7 أيام من صيدلية خارجية بموجب إحالة الطبيب",
    hasHQ:false, hqList:[],
    history:[],
    documents:[
      {title:"Physician Prescription & Referral Note", necessary:true, content:"Prescribes a 7-day oral antibiotic course; refers the member to an external retail pharmacy for dispensing, as the hospital pharmacy does not stock this specific formulation.",
        content_ar:"يصف الطبيب مضادًا حيويًا فمويًا لمدة 7 أيام؛ ويحيل المؤمَّن له إلى صيدلية خارجية للصرف، لأن صيدلية المستشفى لا تتوفر لديها هذا التركيب المحدد."},
      {title:"Network Pharmacy Directory", necessary:true, content:"Confirms the named external pharmacy IS listed as a contracted, in-network pharmacy provider for this member's plan.",
        content_ar:"يؤكد أن الصيدلية الخارجية المذكورة مدرجة ضمن مقدمي الخدمة المتعاقدين داخل الشبكة لخطة هذا المؤمَّن له."},
      {title:"Unrelated Lab Slip", necessary:false, content:"Routine lab slip from an earlier, unrelated visit — no relevance to this request.",
        content_ar:"إيصال تحليل مخبري روتيني من زيارة سابقة غير ذات صلة — لا علاقة له بهذا الطلب."}
    ],
    questions:[
      {q:"Is the external pharmacy within the payer's contracted network?", a:"Yes — the network pharmacy directory confirms this pharmacy is a contracted, in-network provider.",
        q_ar:"هل الصيدلية الخارجية ضمن الشبكة المتعاقدة مع شركة التأمين؟",
        a_ar:"نعم — يؤكد دليل الصيدليات المتعاقدة أن هذه الصيدلية مقدم خدمة متعاقد ضمن الشبكة."},
      {q:"Is there a clinical reason the hospital pharmacy can't dispense this medication?", a:"Yes — the hospital pharmacy does not stock this specific antibiotic formulation, per the physician's note.",
        q_ar:"هل يوجد سبب سريري يمنع صيدلية المستشفى من صرف هذا الدواء؟",
        a_ar:"نعم — لا تتوفر لدى صيدلية المستشفى هذا التركيب المحدد من المضاد الحيوي، بحسب مذكرة الطبيب."}
    ],
    correct:"approve", rationale:"Coverage for a prescribed medication doesn't require it be filled in-house — what matters is whether the dispensing pharmacy is within the network. This one is confirmed in-network, with a documented clinical reason for the referral. Approve.",
    rationale_ar:"تغطية الدواء الموصوف لا تشترط صرفه من داخل المنشأة نفسها — ما يهم هو أن تكون الصيدلية الصارفة ضمن الشبكة. وقد تم تأكيد أن هذه الصيدلية ضمن الشبكة، مع وجود سبب سريري موثق للإحالة. القرار: الموافقة."
  },
  { id:12, ref:"2026/700112", wait:70, name:"Male Patient", age:71, gender:"M", benefit:"H-IP / In Patient", hcp:"United Doctors Hospital - Jeddah",
    dx:"Z74.0 — Reduced mobility, custodial care (post-stroke, medically stable)",
    dx_ar:"Z74.0 — انخفاض الحركة، رعاية تمريضية غير علاجية (بعد سكتة دماغية، مستقر طبيًا)",
    complaint:"Admitted 1 July for stroke rehabilitation; remained hospitalized through 31 July. Notes show the patient became medically stable by 10 July, but discharge was delayed pending family/placement arrangements.",
    complaint_ar:"تم إدخاله في 1 يوليو لإعادة التأهيل بعد سكتة دماغية؛ واستمر تنويمه حتى 31 يوليو. تشير الملاحظات إلى أن حالته أصبحت مستقرة طبيًا بتاريخ 10 يوليو، لكن الخروج تأخر بانتظار ترتيبات الأسرة/مكان الإقامة.",
    requested:"Continued inpatient admission for the full month of July (31 days)",
    requested_ar:"استمرار التنويم الداخلي لشهر يوليو كاملًا (31 يومًا)",
    hasHQ:true, hqList:["No relevant conditions declared"],
    history:[],
    documents:[
      {title:"Admission & Progress Notes", necessary:true, content:"Admitted 1 July for acute stroke management. Medically and neurologically stable by 10 July. Notes from 11–31 July describe the patient as 'medically stable, awaiting family arrangements for home care setup' — no active acute treatment documented for this period.",
        content_ar:"تم الإدخال في 1 يوليو لعلاج السكتة الدماغية الحادة. أصبح مستقرًا طبيًا وعصبيًا بتاريخ 10 يوليو. تصف الملاحظات من 11 إلى 31 يوليو المريض بأنه 'مستقر طبيًا، في انتظار ترتيبات الأسرة لتجهيز الرعاية المنزلية' — دون توثيق أي علاج حاد فعّال خلال هذه الفترة."},
      {title:"CHI Essential Benefits Framework Excerpt", necessary:true, content:"Inpatient benefits are covered for medically necessary acute care. Extended admission beyond resolution of the acute condition, for custodial, social, or placement reasons, is not a covered inpatient service — this applies regardless of whether the individual policy document separately restates it.",
        content_ar:"تُغطى مزايا التنويم الداخلي للرعاية الحادة الضرورية طبيًا. التنويم الممتد بعد انتهاء الحالة الحادة، لأسباب تمريضية أو اجتماعية أو تتعلق بالإقامة، لا يُعد خدمة تنويم مغطاة — وينطبق هذا بغض النظر عن كون وثيقة التأمين الفردية تُعيد ذكره صراحة أم لا."},
      {title:"Member's Policy Wording", necessary:true, content:"The individual policy document does not explicitly mention or exclude extended/custodial stays.",
        content_ar:"لا تذكر وثيقة التأمين الفردية أو تستثني صراحة فترات التنويم الممتدة أو التمريضية."}
    ],
    questions:[
      {q:"When did the patient become medically stable?", a:"By 10 July, per the progress notes — the remaining 21 days show no active acute treatment.",
        q_ar:"متى أصبح المريض مستقرًا طبيًا؟",
        a_ar:"بتاريخ 10 يوليو، بحسب ملاحظات التقدم — ولا تُظهر الأيام المتبقية (21 يومًا) أي علاج حاد فعّال."},
      {q:"Does the specific policy document exclude extended stays?", a:"No — the policy wording is silent on this; it neither explicitly covers nor excludes it.",
        q_ar:"هل تستثني وثيقة التأمين المحددة فترات التنويم الممتدة؟",
        a_ar:"لا — نص الوثيقة صامت بهذا الشأن؛ فهو لا يشمل ذلك ولا يستثنيه صريحًا."}
    ],
    correct:"reject", rationale:"CHI's essential benefits framework governs inpatient medical necessity regardless of whether the individual policy restates every rule. Extended admission after the acute condition resolved, for custodial/placement reasons, is not covered under CHI regulations — even though this policy document doesn't separately exclude it. Policy silence doesn't create coverage that the regulatory framework doesn't provide.",
    rationale_ar:"يحكم إطار المزايا الأساسية للمجلس (CHI) مبدأ الضرورة الطبية للتنويم بغض النظر عن إعادة ذكر كل قاعدة في الوثيقة الفردية. التنويم الممتد بعد انتهاء الحالة الحادة، لأسباب تمريضية أو تتعلق بالإقامة، غير مغطى بموجب لوائح المجلس — حتى وإن لم تستثنِه وثيقة التأمين هذه صراحة. صمت الوثيقة لا يمنح تغطية لم يوفرها الإطار التنظيمي. القرار: الرفض."
  },
  { id:13, ref:"2026/700113", wait:48, name:"Female Patient", age:27, gender:"F", benefit:"H-Maternity", hcp:"Al Andalus Specialized Clinic - Riyadh",
    dx:"O80 — Full-term normal delivery",
    dx_ar:"O80 — ولادة طبيعية مكتملة المدة",
    complaint:"Presented in labor at term; delivered vaginally. Marital status on the insurance card is recorded as single. Hospital has billed the delivery on a cash basis pending a coverage decision.",
    complaint_ar:"حضرت في حالة مخاض مكتملة المدة؛ وأنجبت ولادة طبيعية. الحالة الاجتماعية المسجلة على بطاقة التأمين هي 'أعزب/عزباء'. قامت المستشفى بفوترة الولادة نقدًا في انتظار قرار التغطية.",
    requested:"Coverage or reimbursement for maternity delivery services",
    requested_ar:"التغطية أو استرداد تكاليف خدمات الولادة",
    hasHQ:true, hqList:["No relevant conditions declared"],
    history:[],
    documents:[
      {title:"Insurance Card / Policy Extract", necessary:true, content:"Marital status field: Single. Class: Standard Employee coverage.",
        content_ar:"خانة الحالة الاجتماعية: أعزب/عزباء. الفئة: تغطية موظف قياسية."},
      {title:"Delivery Summary Report", necessary:true, content:"Uncomplicated vaginal delivery at term, mother and baby stable.",
        content_ar:"ولادة طبيعية مكتملة المدة دون مضاعفات، والأم والمولود في حالة مستقرة."},
      {title:"Cash Payment Receipt", necessary:false, content:"Hospital cash receipt for delivery charges, submitted by the family requesting reimbursement consideration.",
        content_ar:"إيصال دفع نقدي من المستشفى مقابل رسوم الولادة، مقدَّم من الأسرة لطلب النظر في استرداد التكاليف."}
    ],
    questions:[
      {q:"What is the member's marital status on file?", a:"Single, per the insurance card and policy record.",
        q_ar:"ما هي الحالة الاجتماعية المسجلة للمؤمَّن له؟",
        a_ar:"أعزب/عزباء، بحسب بطاقة التأمين وسجل الوثيقة."},
      {q:"Does the policy restrict maternity benefits by marital status?", a:"Yes — maternity benefits under this plan are limited to married spouses and married female employees.",
        q_ar:"هل تقيّد الوثيقة مزايا الولادة بحسب الحالة الاجتماعية؟",
        a_ar:"نعم — تقتصر مزايا الولادة في هذه الخطة على الزوجات وموظفات المتزوجات."}
    ],
    correct:"reject", rationale:"Maternity benefits are restricted to married spouses and married female employees. The member's policy record shows single marital status, so the delivery does not meet eligibility criteria — not covered.",
    rationale_ar:"مزايا الولادة مقيدة بالزوجات وموظفات المتزوجات. يُظهر سجل وثيقة المؤمَّن له حالة اجتماعية 'أعزب/عزباء'، ولذلك لا تستوفي الولادة معايير الأهلية — وهي غير مغطاة. القرار: الرفض."
  },
  { id:14, ref:"2026/700114", wait:52, name:"Male Newborn Patient", age:0, gender:"M", benefit:"H-IP / In Patient (Newborn)", hcp:"Al Andalus Specialized Clinic - Riyadh",
    dx:"P22.0 — Transient tachypnea of the newborn, observation",
    dx_ar:"P22.0 — تسرع التنفس العابر عند المولود، تحت الملاحظة",
    complaint:"Newborn from the delivery under Claim Ref 2026/700113 (not covered — mother's single marital status) now requires NICU observation for transient respiratory distress. Family requests coverage for the newborn as a dependent.",
    complaint_ar:"المولود الناتج عن الولادة تحت مرجع المطالبة 2026/700113 (غير مغطاة — بسبب الحالة الاجتماعية 'أعزب/عزباء' للأم) يحتاج الآن إلى ملاحظة في وحدة العناية المركزة لحديثي الولادة بسبب ضيق تنفس عابر. تطلب الأسرة التغطية للمولود كمُعال.",
    requested:"NICU admission and observation for the newborn",
    requested_ar:"دخول وحدة العناية المركزة لحديثي الولادة وملاحظة المولود",
    hasHQ:false, hqList:[],
    history:[],
    documents:[
      {title:"Linked Maternity Claim Note", necessary:true, content:"Cross-reference to Claim Ref 2026/700113: the mother's delivery was not covered — single marital status, maternity benefit not applicable.",
        content_ar:"إشارة مرجعية إلى المطالبة رقم 2026/700113: ولادة الأم لم تكن مغطاة — بسبب الحالة الاجتماعية 'أعزب/عزباء'، ولا تنطبق ميزة الولادة."},
      {title:"Newborn Enrollment Status", necessary:true, content:"No newborn enrollment or dependent-addition request has been submitted or approved for this policy.",
        content_ar:"لم يتم تقديم أو الموافقة على أي طلب تسجيل للمولود أو إضافة مُعال ضمن هذه الوثيقة."},
      {title:"NICU Admission Note", necessary:true, content:"Newborn observed for transient tachypnea, stable, routine NICU monitoring.",
        content_ar:"المولود تحت الملاحظة بسبب تسرع تنفس عابر، وحالته مستقرة، ضمن المتابعة الروتينية لوحدة العناية المركزة لحديثي الولادة."}
    ],
    questions:[
      {q:"Was the mother's delivery covered under the policy?", a:"No — Claim Ref 2026/700113 confirms the delivery was not covered due to the mother's single marital status.",
        q_ar:"هل كانت ولادة الأم مغطاة بموجب الوثيقة؟",
        a_ar:"لا — تؤكد المطالبة رقم 2026/700113 أن الولادة لم تكن مغطاة بسبب الحالة الاجتماعية 'أعزب/عزباء' للأم."},
      {q:"Has the newborn been formally enrolled as a dependent?", a:"No — no newborn enrollment or dependent addition has been submitted or approved.",
        q_ar:"هل تم تسجيل المولود رسميًا كمُعال؟",
        a_ar:"لا — لم يتم تقديم أو الموافقة على أي طلب تسجيل للمولود أو إضافة مُعال."}
    ],
    correct:"reject", rationale:"Newborn coverage as a dependent generally flows from an eligible, covered maternity benefit and proper dependent enrollment. Since the delivery itself wasn't covered and the newborn hasn't been separately enrolled, the NICU admission is not covered.",
    rationale_ar:"تغطية المولود كمُعال تنبع بشكل عام من ميزة ولادة مؤهلة ومغطاة، ومن تسجيل صحيح للمُعال. وبما أن الولادة نفسها لم تكن مغطاة ولم يتم تسجيل المولود بشكل مستقل، فإن دخول وحدة العناية المركزة لحديثي الولادة غير مغطى. القرار: الرفض."
  },
  { id:15, ref:"2026/700115", wait:18, name:"Male Patient", age:33, gender:"M", benefit:"H-OP / Out Patient", hcp:"Al Noor Medical Center - Riyadh",
    dx:"E11.9 — Type 2 Diabetes Mellitus (per submitted diagnosis)",
    dx_ar:"E11.9 — داء السكري من النوع الثاني (بحسب التشخيص المقدَّم)",
    complaint:"Requesting renewal of Mounjaro (tirzepatide) injections for 'diabetic control.' Most recent HbA1c: 4.8% — within the normal, non-diabetic range.",
    complaint_ar:"طلب تجديد حقن مونجارو (تيرزيباتيد) بغرض 'ضبط السكري'. آخر قياس للسكر التراكمي: 4.8% — ضمن المعدل الطبيعي غير السكري.",
    requested:"Mounjaro (tirzepatide) injection, monthly supply renewal",
    requested_ar:"حقن مونجارو (تيرزيباتيد)، تجديد الكمية الشهرية",
    hasHQ:false, hqList:[],
    history:[],
    documents:[
      {title:"Lab Report", necessary:true, content:"HbA1c 4.8% (reference range for non-diabetic adults: 4.0–5.6%). Result is within the normal, non-diabetic range.",
        content_ar:"السكر التراكمي 4.8% (المعدل المرجعي للبالغين غير المصابين بالسكري: 4.0–5.6%). النتيجة ضمن المعدل الطبيعي غير السكري."},
      {title:"Prescription Request", necessary:true, content:"Requests continued monthly Mounjaro (tirzepatide) injections; diagnosis listed as Type 2 Diabetes Mellitus.",
        content_ar:"طلب الاستمرار في حقن مونجارو (تيرزيباتيد) الشهرية؛ مع تسجيل التشخيص كداء السكري من النوع الثاني."},
      {title:"Old Employment Physical", necessary:false, content:"Routine physical from a prior employer, no diabetes mentioned — no relevance to this request.",
        content_ar:"فحص طبي روتيني من جهة عمل سابقة، دون ذكر لمرض السكري — لا علاقة له بهذا الطلب."}
    ],
    questions:[
      {q:"Is the HbA1c consistent with a diabetes diagnosis requiring ongoing pharmacologic control?", a:"No — 4.8% is within the normal, non-diabetic reference range; it doesn't indicate poorly controlled or active diabetes requiring escalating therapy.",
        q_ar:"هل السكر التراكمي يتوافق مع تشخيص سكري يتطلب ضبطًا دوائيًا مستمرًا؟",
        a_ar:"لا — 4.8% ضمن المعدل المرجعي الطبيعي غير السكري؛ ولا يشير إلى سكري غير مضبوط أو نشط يتطلب تصعيد العلاج."},
      {q:"Is there documentation supporting continued therapy despite normal levels?", a:"No hypoglycemic symptoms or additional clinical justification are documented in the request.",
        q_ar:"هل يوجد توثيق يدعم الاستمرار في العلاج رغم المستويات الطبيعية؟",
        a_ar:"لا توجد أعراض نقص سكر أو أي تبرير سريري إضافي موثق في الطلب."}
    ],
    correct:"reject", rationale:"A normal, non-diabetic HbA1c doesn't support medical necessity for an anti-diabetic medication often used off-label for weight loss. This pattern should raise suspicion the request is for weight management rather than legitimate diabetic control — not medically justified as submitted. Reject.",
    rationale_ar:"السكر التراكمي الطبيعي غير السكري لا يدعم الضرورة الطبية لدواء مضاد للسكري يُستخدم غالبًا خارج نطاق الاستطباب المعتمد لإنقاص الوزن. يجب أن يثير هذا النمط الشك في أن الطلب لأغراض إدارة الوزن وليس لضبط سكري حقيقي — وهو غير مبرر طبيًا كما قُدِّم. القرار: الرفض."
  }
];

const FILLER = [
  {name:"Not yet checked in", ref:"—"}, {name:"Awaiting documents", ref:"—"},
  {name:"Registration pending", ref:"—"}, {name:"Not yet checked in", ref:"—"},
  {name:"Awaiting documents", ref:"—"}
];

const DECISION_LABELS = { approve:"Approve", partial:"Partially Approve", reject:"Reject", refer:"Refer for Review" };

/* ---------------- STATE ---------------- */
let decisions = {};       // caseId -> decision string
let questionsAsked = {};  // caseId -> array of asked question indices
let currentCaseId = null;
let studentName = "";

/* ---------------- PERSISTENCE — real localStorage, not the non-existent
   window.storage API this prototype originally used ---------------- */
function saveProgress(){
  try{
    localStorage.setItem("ih-preauth-exam-progress", JSON.stringify({decisions, questionsAsked, studentName}));
  } catch(e){ /* ignore */ }
}
function loadProgress(){
  try{
    const raw = localStorage.getItem("ih-preauth-exam-progress");
    if(raw){
      const data = JSON.parse(raw);
      decisions = data.decisions || {};
      questionsAsked = data.questionsAsked || {};
      studentName = data.studentName || "";
    }
  } catch(e){ /* fresh start */ }
}

function waitColor(mins){ return mins < 30 ? "green" : (mins <= 90 ? "amber" : "red"); }

/* ---------------- INTRO ---------------- */
document.getElementById("startBtn").addEventListener("click", ()=>{
  studentName = document.getElementById("studentName").value.trim() || t('pex.candidateDefault');
  saveProgress();
  showView("dashboard");
  renderDashboard();
});

/* ---------------- VIEW SWITCH ---------------- */
function showView(name){
  ["intro","dashboard","case","results"].forEach(v=>{
    document.getElementById("view-"+v).classList.toggle("hidden", v!==name);
  });
  window.scrollTo({top:0, behavior:"smooth"});
}

function currentViewName(){
  const views = ["intro","dashboard","case","results"];
  return views.find(v=> !document.getElementById("view-"+v).classList.contains("hidden")) || "intro";
}

function questionsRemainingText(remaining){
  if(!isAr()) return remaining + " question" + (remaining===1?"":"s") + " remaining";
  if(remaining === 0) return "لا توجد أسئلة متبقية";
  if(remaining === 1) return "سؤال واحد متبقٍ";
  if(remaining === 2) return "سؤالان متبقيان";
  return remaining + " أسئلة متبقية";
}

function updateProgressPill(){
  const count = Object.keys(decisions).length;
  document.getElementById("progressPill").textContent = isAr()
    ? (count + " / " + CASES.length + " حالة تم اتخاذ قرار بشأنها")
    : (count + " / " + CASES.length + " cases decided");
}

/* ---------------- DASHBOARD ---------------- */
function renderDashboard(){
  updateProgressPill();
  const grid = document.getElementById("caseGrid");
  grid.innerHTML = "";

  CASES.forEach(c=>{
    const color = waitColor(c.wait);
    const isDone = !!decisions[c.id];
    const tile = document.createElement("div");
    tile.className = "tile " + color + (isDone ? " done" : "");
    tile.innerHTML = `
      <div class="tile-top">
        <span class="tile-ref">${c.ref}</span>
        <span class="tile-wait ${color}">${c.wait}m</span>
      </div>
      <div class="tile-name">${localizedName(c.name)}</div>
      <div class="tile-benefit">${localizedBenefit(c.benefit)}</div>
      ${isDone ? `<div class="tile-check">${t('pex.decidedPrefix')}${decisionLabel(decisions[c.id])}</div>` : ""}
    `;
    tile.addEventListener("click", ()=> openCase(c.id));
    grid.appendChild(tile);
  });

  FILLER.forEach(f=>{
    const tile = document.createElement("div");
    tile.className = "tile filler";
    tile.innerHTML = `
      <div class="tile-top"><span class="tile-ref">${f.ref}</span></div>
      <div class="tile-name">${localizedFillerName(f.name)}</div>
      <div class="tile-benefit">${t('pex.notPartOfExam')}</div>
    `;
    grid.appendChild(tile);
  });

  if(Object.keys(decisions).length === CASES.length){
    const banner = document.createElement("div");
    banner.style.cssText = "grid-column:1/-1; text-align:center; margin-top:10px;";
    banner.innerHTML = `<button class="btn btn-primary" id="finishExamBtn">${t('pex.seeResults')}</button>`;
    grid.appendChild(banner);
    document.getElementById("finishExamBtn").addEventListener("click", showResults);
  }
}

/* ---------------- CASE WORKSPACE ---------------- */
function openCase(id){
  currentCaseId = id;
  const c = CASES.find(x=>x.id===id);
  if(!questionsAsked[id]) questionsAsked[id] = [];

  document.getElementById("cRef").textContent = c.ref;
  document.getElementById("cBenefit").textContent = localizedBenefit(c.benefit);
  document.getElementById("cHcp").textContent = localizedHcp(c.hcp);
  document.getElementById("cName").textContent = localizedName(c.name);
  document.getElementById("cAge").textContent = c.age;
  document.getElementById("cGender").textContent = localizedGender(c.gender);
  document.getElementById("cDx").textContent = isAr() ? (c.dx_ar || c.dx) : c.dx;
  document.getElementById("cComplaint").textContent = isAr() ? (c.complaint_ar || c.complaint) : c.complaint;
  document.getElementById("cRequested").textContent = isAr() ? (c.requested_ar || c.requested) : c.requested;

  // HQ
  const hqArea = document.getElementById("cHqBadgeArea");
  const hqList = document.getElementById("cHqList");
  if(!c.hasHQ){
    hqArea.innerHTML = `<span class="hq-badge none">${t('pex.hqNone')}</span>`;
    hqList.innerHTML = "";
  } else if(c.hqList.length === 0){
    hqArea.innerHTML = `<span class="hq-badge none">${t('pex.hqNoneDeclared')}</span>`;
    hqList.innerHTML = "";
  } else {
    hqArea.innerHTML = `<span class="hq-badge present">${t('pex.hqPresent')}</span>`;
    hqList.innerHTML = c.hqList.map(h=>`<p>• ${localizedHqItem(h)}</p>`).join("");
  }

  // Documents
  const docsEl = document.getElementById("cDocs");
  docsEl.innerHTML = "";
  c.documents.forEach(d=>{
    const row = document.createElement("div");
    row.className = "doc-row";
    row.innerHTML = `<span class="doc-icon">📄</span><span class="doc-title">${localizedDocTitle(d.title)}</span>`;
    row.addEventListener("click", ()=> openDoc(d));
    docsEl.appendChild(row);
  });

  // Questions
  renderQuestions(c);

  // History
  const histEl = document.getElementById("cHistory");
  if(c.history.length === 0){
    histEl.innerHTML = `<p style="font-size:12.5px; color:var(--ink-dim);">${t('pex.noHistory')}</p>`;
  } else {
    histEl.innerHTML = `<table class="history-table"><thead><tr><th>${t('pex.historyRef')}</th><th>${t('pex.historyDate')}</th><th>${t('pex.historyBenefit')}</th><th>${t('pex.historyDx')}</th><th>${t('pex.historyAmount')}</th><th>${t('pex.historyStatus')}</th></tr></thead><tbody>` +
      c.history.map(h=>`<tr><td>${h.ref}</td><td>${h.date}</td><td>${localizedHistBenefit(h.benefit)}</td><td>${localizedHistDx(h.dx)}</td><td>${h.amt}</td><td>${localizedStatus(h.status)}</td></tr>`).join("") +
      `</tbody></table>`;
  }

  // Decision buttons reset / restore
  document.querySelectorAll(".dopt").forEach(btn=> btn.classList.remove("selected"));
  if(decisions[id]){
    const btn = document.querySelector(`.dopt[data-d="${decisions[id]}"]`);
    if(btn) btn.classList.add("selected");
  }

  showView("case");
}

function renderQuestions(c){
  const qEl = document.getElementById("cQuestions");
  const asked = questionsAsked[c.id] || [];
  const remaining = Math.max(0, 2 - asked.length);
  document.getElementById("qCounter").textContent = questionsRemainingText(remaining);

  qEl.innerHTML = "";
  c.questions.forEach((q, idx)=>{
    const wasAsked = asked.includes(idx);
    const qText = isAr() ? (q.q_ar || q.q) : q.q;
    const aText = isAr() ? (q.a_ar || q.a) : q.a;
    if(wasAsked){
      const ansDiv = document.createElement("div");
      ansDiv.innerHTML = `<button class="q-btn" disabled>${qText}</button><div class="q-answer">${aText}</div>`;
      qEl.appendChild(ansDiv);
    } else {
      const btn = document.createElement("button");
      btn.className = "q-btn";
      btn.textContent = qText;
      if(remaining === 0) btn.disabled = true;
      btn.addEventListener("click", ()=>{
        if((questionsAsked[c.id]||[]).length >= 2) return;
        questionsAsked[c.id] = [...(questionsAsked[c.id]||[]), idx];
        saveProgress();
        renderQuestions(c);
      });
      qEl.appendChild(btn);
    }
  });
}

document.querySelectorAll(".dopt").forEach(btn=>{
  btn.addEventListener("click", ()=>{
    document.querySelectorAll(".dopt").forEach(b=> b.classList.remove("selected"));
    btn.classList.add("selected");
  });
});

document.getElementById("submitDecisionBtn").addEventListener("click", ()=>{
  const selected = document.querySelector(".dopt.selected");
  if(!selected){ alert(t('pex.selectDecisionAlert')); return; }
  decisions[currentCaseId] = selected.dataset.d;
  saveProgress();
  showView("dashboard");
  renderDashboard();
});

document.getElementById("backToDashBtn").addEventListener("click", ()=>{
  showView("dashboard");
  renderDashboard();
});

/* ---------------- DOCUMENT MODAL ---------------- */
function openDoc(d){
  document.getElementById("docTitle").textContent = localizedDocTitle(d.title);
  document.getElementById("docContent").textContent = isAr() ? (d.content_ar || d.content) : d.content;
  document.getElementById("docOverlay").classList.remove("hidden");
}
document.getElementById("docClose").addEventListener("click", ()=> document.getElementById("docOverlay").classList.add("hidden"));
document.getElementById("docOverlay").addEventListener("click",(e)=>{ if(e.target.id==="docOverlay") e.currentTarget.classList.add("hidden"); });

/* ---------------- RESULTS ---------------- */
function showResults(){
  let correctCount = 0;
  const reviewList = document.getElementById("reviewList");
  reviewList.innerHTML = "";

  CASES.forEach(c=>{
    const studentDecision = decisions[c.id];
    const isCorrect = studentDecision === c.correct;
    if(isCorrect) correctCount++;
    const row = document.createElement("div");
    row.className = "review-row";
    row.innerHTML = `
      <div class="review-top">
        <span class="rn">${c.ref} — ${localizedName(c.name)}</span>
        <span class="rtag ${isCorrect ? "correct" : "wrong"}">${isCorrect ? t('pex.correctTag') : t('pex.incorrectTag')}</span>
      </div>
      <div class="review-detail">${t('pex.yourDecisionReview')} <b>${studentDecision ? decisionLabel(studentDecision) : "—"}</b> · ${t('pex.correctDecisionReview')} <b>${decisionLabel(c.correct)}</b></div>
      <div class="review-detail">${isAr() ? (c.rationale_ar || c.rationale) : c.rationale}</div>
    `;
    reviewList.appendChild(row);
  });

  const verdictArea = document.getElementById("verdictArea");
  const PASS_THRESHOLD = 7; // pass if strictly more than 7 correct
  const passed = correctCount > PASS_THRESHOLD;
  if(passed){
    const examDate = new Date().toISOString().slice(0,10);
    const certUrl = "preauth-certificate.html?name=" + encodeURIComponent(studentName) + "&examDate=" + encodeURIComponent(examDate);
    verdictArea.innerHTML = `
      <div class="verdict pass">
        <div class="eyebrow" style="color:#CFE3DF;">${t('pex.certEyebrow')}</div>
        <h2>${t('pex.passHeading')}</h2>
        <p style="color:#CFE3DF; max-width:52ch; margin:0 auto;">${t('pex.passBody')}</p>
        <div class="cert-name">${studentName}</div>
        <div class="score">${t('pex.finalScoreLabel')} ${correctCount} / ${CASES.length}</div>
        <a class="btn btn-primary" href="${certUrl}" style="display:inline-block; margin-top:18px;">${t('pex.getCertBtn')}</a>
      </div>`;
  } else {
    verdictArea.innerHTML = `
      <div class="verdict fail">
        <div class="eyebrow">${t('pex.failEyebrow')}</div>
        <h2>${t('pex.failHeading')}</h2>
        <p style="max-width:54ch; margin:10px auto 0; color:var(--ink-dim);">${t('pex.failBody')}</p>
        <div class="score" style="margin-top:10px;">${t('pex.scoreLabel')} ${correctCount} / ${CASES.length} (${t('pex.needMorePrefix')} ${PASS_THRESHOLD} ${t('pex.needMoreSuffix')}). ${t('pex.reviewBelowRetry')}</div>
      </div>`;
  }

  showView("results");
}

document.getElementById("retryBtn").addEventListener("click", ()=>{
  decisions = {}; questionsAsked = {};
  saveProgress();
  showView("dashboard");
  renderDashboard();
});

/* ---------------- LANGUAGE CHANGE — re-render whatever view is open so
   dynamically-built content (tiles, case workspace, results) refreshes
   into the newly selected language. ---------------- */
document.addEventListener("ih:langchange", ()=>{
  updateProgressPill();
  const view = currentViewName();
  if(view === "dashboard"){
    renderDashboard();
  } else if(view === "case" && currentCaseId != null){
    openCase(currentCaseId);
  } else if(view === "results"){
    showResults();
  }
});

/* ---------------- INIT ---------------- */
(function init(){
  loadProgress();
  if(studentName) document.getElementById("studentName").value = studentName;
  updateProgressPill();
})();
