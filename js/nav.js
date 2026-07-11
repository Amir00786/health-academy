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

