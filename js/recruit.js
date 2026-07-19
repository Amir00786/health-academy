window.I18N_PAGE_DICT = {
      'recruit.back': { en: 'Back to home', ar: 'العودة إلى الرئيسية' },
      'recruit.tag': { en: 'Talent network', ar: 'شبكة المواهب' },
      'recruit.title': { en: 'Get on our radar for future roles.', ar: 'كن على رادارنا للفرص القادمة.' },
      'recruit.desc': { en: "Whatever your specialty, drop your CV and tell us where you'd like to grow. When a matching role opens up with iHealth Academy or one of our partner organizations, you'll be one of the first we reach out to.", ar: 'أيًا كان تخصصك، أرسل سيرتك الذاتية وأخبرنا أين تودّ أن تنمو مهنيًا. عندما تتوفر فرصة مناسبة لدى أكاديمية آي هيلث أو إحدى المؤسسات الشريكة، ستكون من أوائل من نتواصل معهم.' },
      'recruit.nameLabel': { en: 'Full name', ar: 'الاسم الكامل' },
      'recruit.emailLabel': { en: 'Email', ar: 'البريد الإلكتروني' },
      'recruit.specialtyLabel': { en: 'Your specialty', ar: 'تخصصك' },
      'recruit.specIT': { en: 'IT', ar: 'تقنية المعلومات' },
      'recruit.specMedicine': { en: 'Medicine', ar: 'الطب' },
      'recruit.specPediatrics': { en: 'Pediatrics', ar: 'طب الأطفال' },
      'recruit.specNursing': { en: 'Nursing', ar: 'التمريض' },
      'recruit.specEmergency': { en: 'Emergency', ar: 'الطوارئ' },
      'recruit.specPathology': { en: 'Pathology', ar: 'علم الأمراض' },
      'recruit.specOther': { en: 'Others', ar: 'أخرى' },
      'recruit.roleLabel': { en: 'Your role', ar: 'دورك' },
      'recruit.roleStudent': { en: 'Student', ar: 'طالب' },
      'recruit.roleResident': { en: 'Resident', ar: 'طبيب مقيم' },
      'recruit.rolePhysician': { en: 'Physician', ar: 'طبيب' },
      'recruit.roleConsultant': { en: 'Consultant', ar: 'استشاري' },
      'recruit.roleOther': { en: 'Other', ar: 'أخرى' },
      'recruit.messageLabel': { en: 'Message', ar: 'الرسالة' },
      'recruit.messagePlaceholder': { en: 'What kind of role are you looking for?', ar: 'ما نوع الدور الذي تبحث عنه؟' },
      'recruit.cvLabel': { en: 'Upload your CV (PDF or Word)', ar: 'ارفع سيرتك الذاتية (PDF أو Word)' },
      'recruit.uploadCta': { en: 'Click to upload', ar: 'اضغط للرفع' },
      'recruit.uploadHint': { en: ' or drag and drop — PDF or Word, up to 10MB', ar: ' أو اسحب وأفلت — PDF أو Word، حتى 10 ميجابايت' },
      'recruit.submitBtn': { en: 'Submit my CV', ar: 'إرسال سيرتي الذاتية' },
      'recruit.successTitle': { en: 'CV received.', ar: 'تم استلام سيرتك الذاتية.' },
      'recruit.successDesc': { en: "Thanks for dropping your CV — we'll keep it on file and reach out by email as soon as a matching role opens up.", ar: 'شكرًا لإرسال سيرتك الذاتية — سنحتفظ بها وسنتواصل معك عبر البريد الإلكتروني بمجرد توفر فرصة مناسبة.' },
      'recruit.errorMsg': { en: 'Something went wrong — please try again, or email your CV directly to info@ihealthacademy.com.', ar: 'حدث خطأ ما — يرجى المحاولة مرة أخرى، أو إرسال سيرتك الذاتية مباشرة إلى info@ihealthacademy.com.' },
      'recruit.sending': { en: 'Sending…', ar: 'جارٍ الإرسال…' },
    };

// RECRUIT — general talent CV drop, submitted via Formspree (no backend needed).
// IMPORTANT: the form action in recruit.html still has the placeholder
// "https://formspree.io/f/YOUR_FORM_ID" — sign up free at formspree.io, create a
// form that delivers to info@ihealthacademy.com, and replace that URL before this goes live.
(function () {
  function lang() {
    return (window.I18N && window.I18N.currentLang) ? window.I18N.currentLang() : 'en';
  }

  function t(key, fallback) {
    const dict = (window.I18N && window.I18N.dict) ? window.I18N.dict() : {};
    return dict[key] ? (dict[key][lang()] || dict[key].en) : fallback;
  }

  const form = document.getElementById('recruitForm');
  const status = document.getElementById('recruitFormStatus');
  const submitBtn = document.getElementById('recruitSubmitBtn');
  const success = document.getElementById('recruitSuccess');

  // CV UPLOAD DROPZONE
  const uploadZone = document.getElementById('recruitUploadZone');
  const cvInput = document.getElementById('recruitCvInput');
  const cvFilename = document.getElementById('recruitCvFilename');
  const cvRemove = document.getElementById('recruitCvRemove');

  function showFile(file) {
    if (!file) return;
    uploadZone.classList.add('has-file');
    cvFilename.textContent = file.name;
  }

  function clearFile() {
    cvInput.value = '';
    uploadZone.classList.remove('has-file');
    cvFilename.textContent = '';
  }

  cvInput.addEventListener('change', () => showFile(cvInput.files[0]));

  cvRemove.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    clearFile();
  });

  ['dragenter', 'dragover'].forEach((evt) => {
    uploadZone.addEventListener(evt, (e) => {
      e.preventDefault();
      uploadZone.classList.add('drag-over');
    });
  });

  ['dragleave', 'dragend'].forEach((evt) => {
    uploadZone.addEventListener(evt, (e) => {
      e.preventDefault();
      uploadZone.classList.remove('drag-over');
    });
  });

  uploadZone.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadZone.classList.remove('drag-over');
    const file = e.dataTransfer.files[0];
    if (!file) return;
    cvInput.files = e.dataTransfer.files;
    showFile(file);
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (form.action.indexOf('YOUR_FORM_ID') !== -1) {
      status.textContent = 'This form is not connected yet — set up a Formspree endpoint (see js/recruit.js) before publishing.';
      return;
    }

    submitBtn.disabled = true;
    status.style.color = 'rgba(6, 6, 8, 0.5)';
    status.textContent = t('recruit.sending', 'Sending…');

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        form.hidden = true;
        success.hidden = false;
        success.scrollIntoView({ behavior: 'smooth' });
      } else {
        status.style.color = '#C0392B';
        status.textContent = t('recruit.errorMsg', 'Something went wrong — please try again, or email your CV directly to info@ihealthacademy.com.');
        submitBtn.disabled = false;
      }
    } catch (err) {
      status.style.color = '#C0392B';
      status.textContent = t('recruit.errorMsg', 'Something went wrong — please try again, or email your CV directly to info@ihealthacademy.com.');
      submitBtn.disabled = false;
    }
  });
})();

AOS.init({ duration: 700, easing: 'ease', once: true, offset: 80 });
