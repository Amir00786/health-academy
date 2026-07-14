// I18N — English/Arabic toggle with RTL layout switch, persisted per browser.
// Usage: add data-i18n="dictionary.key" to any element whose textContent should translate.
(function () {
  const STORAGE_KEY = 'ih-lang';

  // Shared across every page (nav, utility bar, footer, common buttons).
  const SHARED = {
    'nav.home': { en: 'Home', ar: 'الرئيسية' },
    'nav.findPath': { en: 'Find Your Path', ar: 'اكتشف مسارك' },
    'nav.radiology': { en: 'Radiology', ar: 'الأشعة' },
    'nav.dashboard': { en: 'Dashboard', ar: 'لوحة التحكم' },
    'nav.recruit': { en: 'Recruit', ar: 'التوظيف' },
    'nav.languages': { en: 'Languages', ar: 'اللغات' },
    'nav.academy': { en: 'iHealthAcademy', ar: 'أكاديمية آي هيلث' },
    'nav.connections': { en: 'Connections', ar: 'التواصل' },
    'nav.contact': { en: 'Contact Us', ar: 'اتصل بنا' },
    'nav.signin': { en: 'Sign in', ar: 'تسجيل الدخول' },
    'nav.signup': { en: 'Sign up', ar: 'إنشاء حساب' },
    'nav.help': { en: 'Help', ar: 'مساعدة' },
    'nav.dd.findpath.title': { en: '🧭 Find Your Path', ar: '🧭 اكتشف مسارك' },
    'nav.dd.findpath.sub': { en: 'Not sure yet? Take the 2-minute quiz', ar: 'لست متأكدًا بعد؟ خذ اختبار الدقيقتين' },
    'nav.dd.insurance.title': { en: 'Insurance Industry', ar: 'قطاع التأمين' },
    'nav.dd.insurance.sub': { en: 'Become a Pre-Auth Specialist', ar: 'كن أخصائي تصريح مسبق' },
    'nav.dd.managers.title': { en: 'Managers Professional', ar: 'برنامج المدراء المحترفين' },
    'nav.dd.managers.sub': { en: 'Leadership track for health managers', ar: 'مسار قيادي لمدراء الرعاية الصحية' },
    'nav.dd.specialties.title': { en: 'Medical Specialties', ar: 'التخصصات الطبية' },
    'nav.dd.specialties.sub': { en: 'Radiology', ar: 'الأشعة' },
    'nav.dd.mentor.title': { en: 'Mentorships', ar: 'الإرشاد المهني' },
    'nav.dd.mentor.sub': { en: '1:1 guidance from practicing professionals', ar: 'إرشاد فردي من ممارسين محترفين' },
    'nav.dd.supporters.title': { en: 'Supporters', ar: 'الداعمون' },
    'nav.dd.supporters.sub': { en: 'Volunteering, teaching & side-missions — earn a certificate', ar: 'التطوع والتدريس ومهام إضافية — احصل على شهادة' },
    'nav.dd.cofounders.title': { en: 'Co-Founders', ar: 'الشركاء المؤسسون' },
    'nav.dd.cofounders.sub': { en: 'Join the founding team', ar: 'انضم إلى الفريق المؤسس' },
    'badge.live': { en: 'LIVE', ar: 'متاح الآن' },
    'badge.soon': { en: 'COMING SOON', ar: 'قريبًا' },

    'footer.brandTagline': { en: 'Career support for healthcare professionals — CV tools, exam prep, and career growth, all in one place.', ar: 'دعم مهني لأخصائيي الرعاية الصحية — أدوات السيرة الذاتية، التحضير للامتحانات، والتطور المهني في مكان واحد.' },
    'footer.product': { en: 'Product', ar: 'المنتج' },
    'footer.company': { en: 'Company', ar: 'الشركة' },
    'footer.legal': { en: 'Legal', ar: 'قانوني' },
    'footer.ecosystem': { en: 'Ecosystem', ar: 'المنظومة' },
    'footer.radiology': { en: 'Radiology', ar: 'الأشعة' },
    'footer.about': { en: 'About', ar: 'من نحن' },
    'footer.meetFounder': { en: 'Meet the Founder', ar: 'تعرف على المؤسس' },
    'footer.contactSupport': { en: 'Contact & support', ar: 'التواصل والدعم' },
    'footer.privacy': { en: 'Privacy policy', ar: 'سياسة الخصوصية' },
    'footer.terms': { en: 'Terms and conditions', ar: 'الشروط والأحكام' },
    'footer.copy': { en: '© 2026 iHealth Academy. All rights reserved.', ar: '© 2026 أكاديمية آي هيلث. جميع الحقوق محفوظة.' },
    'footer.paypalBtn': { en: 'Support us', ar: 'ادعمنا' },
    'footer.paypalProBtn': { en: 'Get Pro access — $20', ar: 'احصل على وصول برو — 20$' },
    'footer.paypalProUnlocked': { en: '✓ Pro unlocked', ar: '✓ تم تفعيل برو' },

    'chat.title': { en: 'iHealth Academy Support', ar: 'دعم أكاديمية آي هيلث' },
    'chat.subtitle': { en: 'We typically reply within a few hours', ar: 'عادة ما نرد خلال بضع ساعات' },
    'chat.greeting': { en: 'Hi! How can we help you today?', ar: 'مرحبًا! كيف يمكننا مساعدتك اليوم؟' },
    'chat.placeholder': { en: 'Type your message…', ar: 'اكتب رسالتك…' },
    'chat.qr.courseAccess': { en: 'Course access', ar: 'الوصول للدورة' },
    'chat.qr.payment': { en: 'Payment issue', ar: 'مشكلة في الدفع' },
    'chat.qr.technical': { en: 'Technical problem', ar: 'مشكلة تقنية' },
    'chat.qr.human': { en: 'Talk to a human', ar: 'التحدث مع شخص' },
    'chat.reply.courseAccess': { en: "Course access issues are usually fixed by signing out and back in. If a lesson still won't unlock, tell us which course and lesson name and we'll check your account.", ar: 'غالبًا ما تُحل مشاكل الوصول للدورة بتسجيل الخروج ثم الدخول مجددًا. إذا ظل الدرس مغلقًا، أخبرنا باسم الدورة والدرس وسنتحقق من حسابك.' },
    'chat.reply.payment': { en: "Sorry about that. Please share the email used for payment and roughly when it happened, and our team will look into it and follow up by email.", ar: 'نأسف لذلك. يرجى مشاركة البريد الإلكتروني المستخدم في الدفع ووقت حدوثه تقريبًا، وسيتابع فريقنا الأمر عبر البريد الإلكتروني.' },
    'chat.reply.technical': { en: "Thanks for flagging this — please describe what happened (page, browser, and what you expected vs. what you saw) and our team will investigate.", ar: 'شكرًا لإبلاغنا. يرجى وصف ما حدث (الصفحة والمتصفح وما توقعته مقابل ما رأيته) وسيقوم فريقنا بالتحقيق.' },
    'chat.reply.human': { en: 'Sure — you can reach our team directly at <a href="mailto:info@ihealthacademy.com">info@ihealthacademy.com</a> and we\'ll get back to you personally.', ar: 'بالتأكيد — يمكنك التواصل مع فريقنا مباشرة عبر <a href="mailto:info@ihealthacademy.com">info@ihealthacademy.com</a> وسنرد عليك شخصيًا.' },
    'chat.reply.fallback': { en: 'Thanks for your message — our team will review it and get back to you soon. For a faster reply, email us at <a href="mailto:info@ihealthacademy.com">info@ihealthacademy.com</a>.', ar: 'شكرًا على رسالتك — سيقوم فريقنا بمراجعتها والرد عليك قريبًا. للحصول على رد أسرع، راسلنا عبر <a href="mailto:info@ihealthacademy.com">info@ihealthacademy.com</a>.' },
    'chat.reply.voice': { en: 'Thanks for the voice note — our team will listen to it and follow up by email at <a href="mailto:info@ihealthacademy.com">info@ihealthacademy.com</a>.', ar: 'شكرًا على الرسالة الصوتية — سيستمع فريقنا إليها ويتابع عبر البريد الإلكتروني على <a href="mailto:info@ihealthacademy.com">info@ihealthacademy.com</a>.' },
    'chat.micDenied': { en: 'Microphone access was denied — please allow microphone permission to record a voice message.', ar: 'تم رفض الوصول إلى الميكروفون — يرجى السماح بإذن الميكروفون لتسجيل رسالة صوتية.' },
    'chat.newConversation': { en: 'New conversation', ar: 'محادثة جديدة' },
    'chat.downloadTranscript': { en: 'Download transcript', ar: 'تحميل نسخة المحادثة' },
    'chat.today': { en: 'Today', ar: 'اليوم' },
  };

  // Page-specific dictionaries are often defined in an inline <script> further
  // down the page (after this file loads), so the merge happens lazily at
  // apply()-time — by then all synchronous scripts have run.
  function dict() {
    return Object.assign({}, SHARED, window.I18N_PAGE_DICT || {});
  }

  function currentLang() {
    return localStorage.getItem(STORAGE_KEY) || 'en';
  }

  function apply(lang) {
    const DICT = dict();
    // Only the visible text switches — dir stays "ltr" always so the layout
    // never shifts/mirrors when toggling to Arabic.
    document.documentElement.lang = lang === 'ar' ? 'ar' : 'en';
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      const entry = DICT[key];
      if (entry) el.innerHTML = entry[lang] || entry.en;
    });
    document.querySelectorAll('[data-i18n-ph]').forEach((el) => {
      const key = el.getAttribute('data-i18n-ph');
      const entry = DICT[key];
      if (entry) el.placeholder = entry[lang] || entry.en;
    });
    document.querySelectorAll('.lang-option').forEach((el) => {
      el.classList.toggle('active', el.getAttribute('data-lang') === lang);
    });
    document.dispatchEvent(new CustomEvent('ih:langchange', { detail: { lang } }));
  }

  function setLang(lang) {
    localStorage.setItem(STORAGE_KEY, lang);
    apply(lang);
  }

  function toggle() {
    setLang(currentLang() === 'ar' ? 'en' : 'ar');
  }

  function init() {
    apply(currentLang());

    document.querySelectorAll('.lang-option').forEach((el) => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        setLang(el.getAttribute('data-lang'));
        el.closest('.lang-switcher') && el.closest('.lang-switcher').classList.remove('open');
      });
    });

    // Hover opens the dropdown on desktop (CSS-driven); this click toggle
    // is the fallback for touch devices that can't hover.
    document.querySelectorAll('.lang-switcher').forEach((switcher) => {
      const trigger = switcher.querySelector('.lang-toggle');
      if (!trigger) return;
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        switcher.classList.toggle('open');
      });
    });
    document.addEventListener('click', (e) => {
      document.querySelectorAll('.lang-switcher.open').forEach((switcher) => {
        if (!switcher.contains(e.target)) switcher.classList.remove('open');
      });
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

  window.I18N = { apply, toggle, setLang, currentLang, dict };
})();
