// NAV V2 — iHealthAcademy dropdown + mobile hamburger toggle
(function () {
  // Send mentors to their own dashboard wherever the shared nav's "Dashboard" link appears.
  if (localStorage.getItem('ih-student-role') === 'mentor') {
    document.querySelectorAll('a[data-i18n="nav.dashboard"]').forEach(function (link) {
      link.setAttribute('href', 'mentor-dashboard.html');
    });
  }

  ['academyDropdown', 'leadershipDropdown'].forEach(function (id) {
    var dropdown = document.getElementById(id);
    if (!dropdown) return;
    var btn = dropdown.querySelector('button.nav-link');
    if (!btn) return;
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      dropdown.classList.toggle('open');
    });
    document.addEventListener('click', function (e) {
      if (!dropdown.contains(e.target)) dropdown.classList.remove('open');
    });
  });

  var hamburgerBtn = document.getElementById('hamburgerBtn');
  var navLinks = document.getElementById('navLinks');
  if (hamburgerBtn && navLinks) {
    hamburgerBtn.addEventListener('click', function () {
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
      });
    });
  }
})();

// AUTH MODAL (Sign in / Sign up)
(function () {
  var signinBtns = document.querySelectorAll('.nav-signin');
  var signupBtns = document.querySelectorAll('.nav-signup');
  if (!signinBtns.length && !signupBtns.length) return;

  var overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.id = 'authOverlay';
  overlay.innerHTML =
    '<div class="modal">' +
    '<button class="modal-close" id="modalClose" type="button">✕</button>' +
    '<h2 id="modalTitle">Sign in</h2>' +
    '<div class="role-tabs">' +
    '<button class="role-tab active" data-role="student" type="button">As Student</button>' +
    '<button class="role-tab" data-role="mentor" type="button">As Mentor</button>' +
    '</div>' +
    '<div class="field"><label>Full name</label><input type="text" id="modalNameInput" placeholder="e.g. Sara Ahmed"></div>' +
    '<div class="field"><label>Email</label><input type="email" placeholder="you@example.com"></div>' +
    '<div class="field"><label>Password</label><input type="password" placeholder="••••••••"></div>' +
    '<button class="btn-primary" id="modalSubmit" type="button">Continue as Student</button>' +
    '<p class="modal-note">This is a front-end demo — no account is actually created.</p>' +
    '</div>';
  document.body.appendChild(overlay);

  var modalTitle = overlay.querySelector('#modalTitle');
  var modalSubmit = overlay.querySelector('#modalSubmit');
  var modalClose = overlay.querySelector('#modalClose');
  var modalNameInput = overlay.querySelector('#modalNameInput');
  var selectedRole = 'student';

  function updateSubmitLabel() {
    modalSubmit.textContent = 'Continue as ' + (selectedRole === 'mentor' ? 'Mentor' : 'Student');
  }

  function openModal(mode) {
    overlay.classList.add('open');
    modalTitle.textContent = mode === 'signup' ? 'Sign up' : 'Sign in';
    updateSubmitLabel();
  }
  function closeModal() {
    overlay.classList.remove('open');
  }

  signinBtns.forEach(function (btn) {
    btn.addEventListener('click', function (e) { e.preventDefault(); openModal('signin'); });
  });
  signupBtns.forEach(function (btn) {
    btn.addEventListener('click', function (e) { e.preventDefault(); openModal('signup'); });
  });
  modalClose.addEventListener('click', closeModal);
  overlay.addEventListener('click', function (e) { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeModal(); });

  overlay.querySelectorAll('.role-tab').forEach(function (tab) {
    tab.addEventListener('click', function () {
      overlay.querySelectorAll('.role-tab').forEach(function (t) { t.classList.remove('active'); });
      tab.classList.add('active');
      selectedRole = tab.dataset.role;
      updateSubmitLabel();
    });
  });

  modalSubmit.addEventListener('click', function () {
    var name = (modalNameInput.value || '').trim();
    if (name) localStorage.setItem('ih-student-name', name);
    localStorage.setItem('ih-student-role', selectedRole);
    closeModal();
    window.location.href = selectedRole === 'mentor' ? 'mentor-dashboard.html' : 'dashboard.html';
  });
})();
