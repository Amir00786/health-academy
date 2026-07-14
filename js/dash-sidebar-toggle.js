// DASH SIDEBAR TOGGLE — on mobile, the icon sidebar becomes an off-canvas drawer
// opened via the hamburger button above the page title (see css/dashboard.css's
// max-width:640px rules). Shared by dashboard.html and mentor-dashboard.html.
(function () {
  const toggle = document.getElementById('dashSidebarToggle');
  const sidebar = document.querySelector('.dash-sidebar');
  if (!toggle || !sidebar) return;

  function close() {
    sidebar.classList.remove('open');
  }

  toggle.addEventListener('click', () => {
    sidebar.classList.toggle('open');
  });

  document.addEventListener('click', (e) => {
    if (!sidebar.classList.contains('open')) return;
    if (sidebar.contains(e.target) || toggle.contains(e.target)) return;
    close();
  });

  sidebar.querySelectorAll('a, button').forEach((el) => {
    el.addEventListener('click', close);
  });
})();
