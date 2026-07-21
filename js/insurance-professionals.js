window.I18N_PAGE_DICT = {
  'inspick.tag': { en: 'Insurance Professionals', ar: 'متخصصو التأمين الصحي' },
  'inspick.h1': { en: 'Choose your track.', ar: 'اختر مسارك.' },
  'inspick.desc': { en: 'Pick the track that matches your role — more tracks are being added soon.', ar: 'اختر المسار الذي يناسب دورك — يتم إضافة المزيد من المسارات قريبًا.' },
  'inspick.preauthTitle': { en: 'Pre-Auth Specialist', ar: 'أخصائي التصريح المسبق' },
  'inspick.preauthDesc': { en: 'Master the fundamentals of medical pre-authorization, coverage policies, health questionnaires, exclusions, claim review, and real-world decision making in health insurance.', ar: 'إتقان أساسيات التصريح المسبق الطبي، وسياسات التغطية، والاستبيانات الصحية، والاستثناءات، ومراجعة المطالبات، واتخاذ القرارات في حالات واقعية ضمن التأمين الصحي.' },
  'inspick.preauthArrow': { en: 'Enter <i class="fi fi-rr-arrow-small-right"></i>', ar: '<i class="fi fi-rr-arrow-small-left"></i> ادخل' },
  'inspick.comingSoon': { en: 'Coming soon', ar: 'قريبًا' },
  'inspick.othersTitle': { en: 'Others', ar: 'أخرى' },
  'inspick.othersDesc': { en: 'Claims, utilisation review, case management, and more insurance tracks — on the way.', ar: 'المطالبات، مراجعة الاستخدام، إدارة الحالات، ومسارات تأمين أخرى — قريبًا.' },
};

function showComingSoon() {
  const isAr = (window.I18N && window.I18N.currentLang) ? window.I18N.currentLang() === 'ar' : false;
  alert(isAr ? 'قريبًا — هذا المسار قيد الإعداد.' : 'Coming soon — this track is being built.');
}

AOS.init({ duration: 700, easing: 'ease', once: true, offset: 80 });
