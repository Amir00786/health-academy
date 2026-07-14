// OWNER CONSOLE — client-side passcode gate (NOT real security, see note in admin.html)
// plus locally-persisted Trust & Safety / Mentor review actions.
(function () {
  const PASSCODE = 'ihealth-admin-2026';
  const AUTH_KEY = 'ih-admin-authed';
  const RESOLVED_REPORTS_KEY = 'ih-admin-resolved-reports';
  const MENTOR_DECISIONS_KEY = 'ih-admin-mentor-decisions';

  const SAMPLE_REPORTS = [
    { id: 1042, title: 'Possible exam-answer sharing in a mentor session', meta: 'Report #1042 · Student account', severity: 'high', actions: [{ label: 'Review', cls: '' }, { label: 'Suspend', cls: 'danger' }] },
    { id: 1035, title: 'Inappropriate message reported by a student', meta: 'Report #1035 · Mentor account', severity: 'high', actions: [{ label: 'Review', cls: '' }, { label: 'Suspend', cls: 'danger' }] },
    { id: 1041, title: 'Mentor profile using a stock photo, unverified credentials', meta: 'Report #1041 · Mentor application', severity: 'medium', actions: [{ label: 'Review', cls: '' }, { label: 'Reject', cls: 'danger' }] },
    { id: 1038, title: '12 sign-ups from the same IP range in one hour', meta: 'Report #1038 · Possible spam', severity: 'medium', actions: [{ label: 'Review', cls: '' }, { label: 'Block', cls: 'danger' }] },
  ];

  const SAMPLE_MENTORS = [
    { id: 214, name: 'Applicant #214', meta: 'Radiology · 8 yrs experience' },
    { id: 215, name: 'Applicant #215', meta: 'Pre-Auth Specialist · 5 yrs experience' },
    { id: 216, name: 'Applicant #216', meta: 'Radiology · 11 yrs experience' },
  ];

  function loadJson(key) {
    try {
      return JSON.parse(localStorage.getItem(key)) || [];
    } catch (e) {
      return [];
    }
  }

  function initLock() {
    const lock = document.getElementById('adminLock');
    const console_ = document.getElementById('adminConsole');
    const input = document.getElementById('adminPasscode');
    const btn = document.getElementById('adminUnlockBtn');
    const error = document.getElementById('adminLockError');

    function unlock() {
      lock.hidden = true;
      console_.hidden = false;
    }

    if (localStorage.getItem(AUTH_KEY) === '1') {
      unlock();
      return;
    }

    function tryUnlock() {
      if (input.value === PASSCODE) {
        localStorage.setItem(AUTH_KEY, '1');
        unlock();
      } else {
        error.textContent = 'Incorrect passcode.';
        input.value = '';
        input.focus();
      }
    }

    btn.addEventListener('click', tryUnlock);
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') tryUnlock();
    });
    input.focus();
  }

  function renderModQueue() {
    const list = document.getElementById('modQueueList');
    const resolved = loadJson(RESOLVED_REPORTS_KEY);
    const remaining = SAMPLE_REPORTS.filter((r) => !resolved.includes(r.id));
    list.innerHTML = '';
    if (!remaining.length) {
      list.innerHTML = '<p class="empty-note">Queue is clear — nothing waiting on review.</p>';
      return;
    }
    remaining.forEach((r) => {
      const row = document.createElement('div');
      row.className = 'mod-row';
      row.innerHTML =
        '<div><div class="mod-title">' + r.title + '</div><div class="mod-meta">' + r.meta + '</div></div>' +
        '<div style="text-align:right;">' +
          '<span class="mod-severity ' + r.severity + '">' + r.severity.toUpperCase() + '</span>' +
          '<div class="mod-actions" style="margin-top:8px;">' +
            r.actions.map((a) => '<button type="button" class="mod-btn ' + a.cls + '" data-report="' + r.id + '" data-action="' + a.label + '">' + a.label + '</button>').join('') +
          '</div>' +
        '</div>';
      list.appendChild(row);
    });

    list.querySelectorAll('.mod-btn').forEach((b) => {
      b.addEventListener('click', () => {
        const action = b.getAttribute('data-action');
        if (action === 'Review') {
          alert('Opening a real case-review view needs a backend to store report details/evidence — this button is a placeholder for that flow.');
          return;
        }
        const id = Number(b.getAttribute('data-report'));
        const resolved = loadJson(RESOLVED_REPORTS_KEY);
        resolved.push(id);
        localStorage.setItem(RESOLVED_REPORTS_KEY, JSON.stringify(resolved));
        renderModQueue();
      });
    });
  }

  function renderMentorQueue() {
    const list = document.getElementById('mentorQueueList');
    const decisions = loadJson(MENTOR_DECISIONS_KEY);
    const decidedIds = decisions.map((d) => d.id);
    const remaining = SAMPLE_MENTORS.filter((m) => !decidedIds.includes(m.id));
    document.getElementById('mentorPendingMetric').innerHTML = '<b style="font-size:20px;">' + remaining.length + '</b><span>Pending review</span>';
    list.innerHTML = '';
    if (!remaining.length) {
      list.innerHTML = '<p class="empty-note">No pending mentor applications.</p>';
      return;
    }
    remaining.forEach((m) => {
      const row = document.createElement('div');
      row.className = 'mentor-row';
      row.innerHTML =
        '<div><div class="mentor-name">' + m.name + '</div><div class="mentor-meta">' + m.meta + '</div></div>' +
        '<div class="mod-actions">' +
          '<button type="button" class="mod-btn" data-mentor="' + m.id + '" data-decision="approved">Approve</button>' +
          '<button type="button" class="mod-btn danger" data-mentor="' + m.id + '" data-decision="rejected">Reject</button>' +
        '</div>';
      list.appendChild(row);
    });

    list.querySelectorAll('.mod-btn').forEach((b) => {
      b.addEventListener('click', () => {
        const id = Number(b.getAttribute('data-mentor'));
        const decision = b.getAttribute('data-decision');
        const decisions = loadJson(MENTOR_DECISIONS_KEY);
        decisions.push({ id: id, decision: decision, ts: Date.now() });
        localStorage.setItem(MENTOR_DECISIONS_KEY, JSON.stringify(decisions));
        if (decision === 'approved' && window.IH_MENTORS) {
          const applicant = SAMPLE_MENTORS.find((m) => m.id === id);
          const [trackLabel, experienceLabel] = applicant.meta.split(' · ');
          const track = trackLabel === 'Radiology' ? 'radiology' : 'preauth';
          window.IH_MENTORS.upsertMentor({
            id: 'admin-' + id,
            name: applicant.name.replace('Applicant', 'Mentor'),
            track: track,
            experience: experienceLabel,
            bio: 'Approved via the Owner Console mentor-review queue.',
            source: 'admin-sample',
          });
        }
        renderMentorQueue();
      });
    });
  }

  function renderMeetingsOverview() {
    const list = document.getElementById('meetingsOverviewList');
    if (!list || !window.IH_MENTORS) return;
    const meetings = window.IH_MENTORS.getMeetingRequests().slice().sort((a, b) => b.createdAt - a.createdAt);

    document.getElementById('meetingsPendingCount').textContent = meetings.filter((m) => m.status === 'pending').length;
    document.getElementById('meetingsAcceptedCount').textContent = meetings.filter((m) => m.status === 'accepted').length;
    document.getElementById('meetingsDeclinedCount').textContent = meetings.filter((m) => m.status === 'declined').length;

    list.innerHTML = '';
    if (!meetings.length) {
      list.innerHTML = '<p class="empty-note">No meeting requests yet.</p>';
      return;
    }
    meetings.forEach((m) => {
      const row = document.createElement('div');
      row.className = 'mentor-row';
      const label = m.status.charAt(0).toUpperCase() + m.status.slice(1);
      row.innerHTML =
        '<div><div class="mentor-name">' + m.studentName + ' → ' + m.mentorName + '</div>' +
        '<div class="mentor-meta">' + (m.preferredDate || 'No date set') + (m.note ? ' · ' + m.note : '') + '</div></div>' +
        '<span class="meeting-status status-' + m.status + '">' + label + '</span>';
      list.appendChild(row);
    });
  }

  // BACKUP & RESTORE — bundles every "ih-" localStorage key (student progress,
  // mentor directory, meeting requests, admin decisions) into one JSON file.
  function exportAllData() {
    const data = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.indexOf('ih-') === 0) data[key] = localStorage.getItem(key);
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ihealth-academy-backup-' + new Date().toISOString().slice(0, 10) + '.json';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  function importAllData(file) {
    const note = document.getElementById('backupStatusNote');
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result);
        Object.keys(data).forEach((key) => {
          if (key.indexOf('ih-') === 0) localStorage.setItem(key, data[key]);
        });
        note.textContent = 'Backup restored — reloading…';
        location.reload();
      } catch (e) {
        note.textContent = 'Could not read that file — make sure it\'s a backup JSON exported from this console.';
      }
    };
    reader.readAsText(file);
  }

  function initBackup() {
    const exportBtn = document.getElementById('exportDataBtn');
    const importBtn = document.getElementById('importDataBtn');
    const importFile = document.getElementById('importDataFile');
    if (exportBtn) exportBtn.addEventListener('click', exportAllData);
    if (importBtn && importFile) {
      importBtn.addEventListener('click', () => importFile.click());
      importFile.addEventListener('change', () => {
        if (importFile.files[0]) importAllData(importFile.files[0]);
      });
    }
  }

  initLock();
  renderModQueue();
  renderMentorQueue();
  renderMeetingsOverview();
  initBackup();
})();
