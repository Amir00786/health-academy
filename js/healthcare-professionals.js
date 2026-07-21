window.I18N_PAGE_DICT = {
  'hcpick.tag': { en: 'Healthcare Professionals', ar: 'الكوادر الصحية' },
  'hcpick.h1': { en: 'Choose your specialty.', ar: 'اختر تخصصك.' },
  'hcpick.desc': { en: 'Pick the track that matches your role — more specialties are being added soon.', ar: 'اختر المسار الذي يناسب دورك — يتم إضافة المزيد من التخصصات قريبًا.' },
  'hcpick.radTitle': { en: 'Radiology Speciality', ar: 'تخصص الأشعة' },
  'hcpick.radDesc': { en: 'Foundations, systems, report writing, research, and full exam prep — FRCR, Arab Board, Saudi Board, ABR.', ar: 'الأساسيات، الأنظمة، كتابة التقارير، البحث العلمي، وتحضير كامل للامتحانات — FRCR، البورد العربي، البورد السعودي، ABR.' },
  'hcpick.radArrow': { en: 'Enter <i class="fi fi-rr-arrow-small-right"></i>', ar: '<i class="fi fi-rr-arrow-small-left"></i> ادخل' },
  'hcpick.comingSoon': { en: 'Coming soon', ar: 'قريبًا' },
  'hcpick.othersTitle': { en: 'Others', ar: 'أخرى' },
  'hcpick.othersDesc': { en: 'Pharmacy, dentistry, nursing, physiotherapy, and every other allied health track — on the way.', ar: 'الصيدلة، طب الأسنان، التمريض، العلاج الطبيعي، وكل مسار صحي مساعد آخر — قريبًا.' },
};

function showComingSoon() {
  const isAr = (window.I18N && window.I18N.currentLang) ? window.I18N.currentLang() === 'ar' : false;
  alert(isAr ? 'قريبًا — هذا المسار قيد الإعداد.' : 'Coming soon — this track is being built.');
}

AOS.init({ duration: 700, easing: 'ease', once: true, offset: 80 });
