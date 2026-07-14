// CONTACT PAGE — no backend, so "Email us" builds a mailto: link (opens the visitor's
// own mail app with the fields pre-filled) instead of posting anywhere. "Live chat"
// just opens the existing chat widget (js/livechat.js) via its launcher button.
(function () {
  const SUPPORT_EMAIL = 'info@ihealthacademy.com';
  const MAX_WORDS = 250;

  const messageEl = document.getElementById('contactMessage');
  const countEl = document.getElementById('contactWordCount');
  const form = document.getElementById('contactForm');
  const status = document.getElementById('contactStatus');
  const chatBtn = document.getElementById('contactChatBtn');

  function updateCount() {
    if (!messageEl || !countEl) return;
    const words = messageEl.value.trim() ? messageEl.value.trim().split(/\s+/) : [];
    if (words.length > MAX_WORDS) {
      messageEl.value = words.slice(0, MAX_WORDS).join(' ');
    }
    countEl.textContent = Math.min(words.length, MAX_WORDS) + ' / ' + MAX_WORDS + ' words';
  }

  if (messageEl) {
    messageEl.addEventListener('input', updateCount);
    updateCount();
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('contactEmail').value.trim();
      const phone = document.getElementById('contactPhone').value.trim();
      const message = messageEl.value.trim();
      if (!email || !message) return;

      const subject = 'Contact from iHealth Academy website';
      const bodyLines = ['From: ' + email];
      if (phone) bodyLines.push('Phone: ' + phone);
      bodyLines.push('', message);
      const mailto = 'mailto:' + SUPPORT_EMAIL + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(bodyLines.join('\n'));
      if (status) status.textContent = 'Opening your email app…';
      window.location.href = mailto;
    });
  }

  if (chatBtn) {
    chatBtn.addEventListener('click', () => {
      const launcher = document.getElementById('ihChatLauncher');
      if (launcher) launcher.click();
    });
  }
})();
