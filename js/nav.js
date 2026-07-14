// PAGE LOADER
(function () {
  const pageLoader = document.getElementById('pageLoader');
  if (!pageLoader) return;
  window.addEventListener('load', () => {
    setTimeout(() => {
      pageLoader.classList.add('hide');
      document.documentElement.classList.remove('is-loading');
      setTimeout(() => pageLoader.remove(), 600);
    }, 500);
  });
})();

(function () {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  const navClose = document.getElementById('navClose');
  if (!hamburger || !navMenu) return;

  function closeMenu() {
    navMenu.classList.remove('open');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  function toggleMenu() {
    const isOpen = navMenu.classList.toggle('open');
    hamburger.classList.toggle('active', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  hamburger.addEventListener('click', toggleMenu);
  if (navClose) navClose.addEventListener('click', closeMenu);
  navMenu.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1280) closeMenu();
  });

  document.addEventListener('click', (e) => {
    if (!navMenu.classList.contains('open')) return;
    if (navMenu.contains(e.target) || hamburger.contains(e.target)) return;
    closeMenu();
  });
})();

// PRO ACCESS CHECKOUT — real PayPal Buy Now button in the footer, separate from the
// donate button. The `return` URL is built from the current origin so this works on
// any domain without hardcoding one. Like the insurance bonus-tier checkout, this is a
// trust-based unlock (no server-side payment verification) — anyone could add
// ?pro=unlocked to the URL manually to set the flag for free.
(function () {
  const PRO_KEY = 'ih-pro-access';

  const params = new URLSearchParams(location.search);
  if (params.get('pro') === 'unlocked') {
    localStorage.setItem(PRO_KEY, 'true');
    params.delete('pro');
    const qs = params.toString();
    history.replaceState(null, '', location.pathname + (qs ? '?' + qs : ''));
  }

  const returnUrl = location.origin + location.pathname + '?pro=unlocked';
  document.querySelectorAll('.pro-return-input').forEach((input) => { input.value = returnUrl; });

  if (localStorage.getItem(PRO_KEY) === 'true') {
    document.querySelectorAll('.footer-paypal-btn-pro').forEach((btn) => {
      btn.disabled = true;
      btn.classList.add('is-unlocked');
      const label = btn.querySelector('[data-i18n]');
      if (label) {
        label.setAttribute('data-i18n', 'footer.paypalProUnlocked');
        label.textContent = '✓ Pro unlocked';
      }
    });
  }
})();

