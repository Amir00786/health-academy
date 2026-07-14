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
