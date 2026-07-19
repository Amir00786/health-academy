window.I18N_PAGE_DICT = {
  'inspick.tag': { en: 'Insurance Professionals', ar: 'متخصصو التأمين الصحي' },
  'inspick.h1': { en: 'Choose your track.', ar: 'اختر مسارك.' },
  'inspick.desc': { en: 'Pick the track that matches your role — more tracks are being added soon.', ar: 'اختر المسار الذي يناسب دورك — يتم إضافة المزيد من المسارات قريبًا.' },
  'inspick.preauthTitle': { en: 'Pre-Auth Specialist', ar: 'أخصائي التصريح المسبق' },
  'inspick.preauthDesc': { en: 'Writing requests that get approved, handling denials, appeals, ICD/CPT coding, and a certificate on completion.', ar: 'كتابة طلبات تُعتمد، والتعامل مع الرفض، والاستئناف، وترميز ICD/CPT، وشهادة عند الإتمام.' },
  'inspick.preauthArrow': { en: 'Enter →', ar: '← ادخل' },
  'inspick.comingSoon': { en: 'Coming soon', ar: 'قريبًا' },
  'inspick.othersTitle': { en: 'Others', ar: 'أخرى' },
  'inspick.othersDesc': { en: 'Claims, utilisation review, case management, and more insurance tracks — on the way.', ar: 'المطالبات، مراجعة الاستخدام، إدارة الحالات، ومسارات تأمين أخرى — قريبًا.' },
};

function showComingSoon() {
  const isAr = (window.I18N && window.I18N.currentLang) ? window.I18N.currentLang() === 'ar' : false;
  alert(isAr ? 'قريبًا — هذا المسار قيد الإعداد.' : 'Coming soon — this track is being built.');
}

AOS.init({ duration: 700, easing: 'ease', once: true, offset: 80 });
