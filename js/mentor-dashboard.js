// MENTOR DASHBOARD — profile setup + local mentee matching (see the note on the
// page itself: this only "matches" a student who uses this same browser).
(function () {
  function lang() {
    return (window.I18N && window.I18N.currentLang) ? window.I18N.currentLang() : 'en';
  }

  function t(key, fallback) {
    const dict = (window.I18N && window.I18N.dict) ? window.I18N.dict() : {};
    return dict[key] ? (dict[key][lang()] || dict[key].en) : fallback;
  }

  function trackLabel(track) {
    if (track === 'radiology') return t('nav.radiology', 'Radiology');
    if (track === 'preauth') return t('dash.insuranceName', 'Pre-Auth Specialist');
    return t('mentor.trackBoth', 'Both');
  }

  function initials(name) {
    const parts = (name || '').trim().split(/\s+/).filter(Boolean);
    if (!parts.length) return '?';
    return (parts[0][0] + (parts[1] ? parts[1][0] : '')).toUpperCase();
  }

  const setupPanel = document.getElementById('mentorSetupPanel');
  const statGrid = document.getElementById('mentorStatGrid');
  const menteesSection = document.getElementById('menteesSection');
  const menteesList = document.getElementById('menteesList');

  function renderMentees(profile) {
    const selection = window.IH_MENTORS.getSelection();
    menteesList.innerHTML = '';
    if (selection && selection.mentorId === profile.id) {
      const studentName = localStorage.getItem('ih-student-name') || 'Guest Student';
      const specialty = localStorage.getItem('ih-student-specialty') || '';
      const row = document.createElement('div');
      row.className = 'mentee-row';
      row.innerHTML =
        '<div class="mentee-avatar">' + initials(studentName) + '</div>' +
        '<div><div class="mentee-name">' + studentName + '</div><div class="mentee-meta">' + (specialty || '') + '</div></div>';
      menteesList.appendChild(row);
      document.getElementById('mentorMenteeCount').textContent = '1';
    } else {
      const empty = document.createElement('p');
      empty.className = 'mentee-empty';
      empty.textContent = t('mentor.noMentees', "No mentees yet — once a student (in this same browser) selects you, they'll show up here.");
      menteesList.appendChild(empty);
      document.getElementById('mentorMenteeCount').textContent = '0';
    }
  }

  function renderMeetings(profile) {
    const reqSection = document.getElementById('meetingRequestsSection');
    const reqList = document.getElementById('meetingRequestsList');
    const upSection = document.getElementById('upcomingMeetingsSection');
    const upList = document.getElementById('upcomingMeetingsList');
    if (!reqSection || !window.IH_MENTORS) return;

    const all = window.IH_MENTORS.getMeetingsForMentor(profile.id);
    const pending = all.filter((m) => m.status === 'pending');
    const accepted = all.filter((m) => m.status === 'accepted');

    reqSection.hidden = false;
    reqList.innerHTML = '';
    if (!pending.length) {
      reqList.innerHTML = `<p class="mentee-empty">${t('meet.noRequests', 'No pending meeting requests.')}</p>`;
    } else {
      pending.forEach((m) => {
        const row = document.createElement('div');
        row.className = 'mentee-row';
        row.innerHTML =
          '<div class="mentee-avatar">' + initials(m.studentName) + '</div>' +
          '<div style="flex:1;"><div class="mentee-name">' + m.studentName + '</div>' +
          '<div class="mentee-meta">' + (m.preferredDate || t('meet.noDate', 'No date set')) + (m.note ? ' · ' + m.note : '') + '</div></div>' +
          '<div class="mod-actions">' +
            '<button type="button" class="mod-btn" data-meeting="' + m.id + '" data-decision="accepted">' + t('meet.accept', 'Accept') + '</button>' +
            '<button type="button" class="mod-btn danger" data-meeting="' + m.id + '" data-decision="declined">' + t('meet.decline', 'Decline') + '</button>' +
          '</div>';
        reqList.appendChild(row);
      });
      reqList.querySelectorAll('.mod-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
          window.IH_MENTORS.respondToMeeting(btn.getAttribute('data-meeting'), btn.getAttribute('data-decision'));
          renderMeetings(profile);
        });
      });
    }

    upSection.hidden = false;
    upList.innerHTML = '';
    if (!accepted.length) {
      upList.innerHTML = `<p class="mentee-empty">${t('meet.noUpcoming', 'No upcoming meetings yet.')}</p>`;
    } else {
      accepted.forEach((m) => {
        const row = document.createElement('div');
        row.className = 'mentee-row';
        row.innerHTML =
          '<div class="mentee-avatar">' + initials(m.studentName) + '</div>' +
          '<div><div class="mentee-name">' + m.studentName + '</div>' +
          '<div class="mentee-meta">' + (m.preferredDate || t('meet.noDate', 'No date set')) + '</div></div>';
        upList.appendChild(row);
      });
    }
  }

  function renderProfile() {
    const profile = window.IH_MENTORS.getOwnProfile();
    if (!profile) {
      setupPanel.hidden = false;
      statGrid.hidden = true;
      menteesSection.hidden = true;
      document.getElementById('meetingRequestsSection').hidden = true;
      document.getElementById('upcomingMeetingsSection').hidden = true;
      return;
    }
    setupPanel.hidden = true;
    statGrid.hidden = false;
    menteesSection.hidden = false;

    document.getElementById('mentorNameVal').textContent = profile.name;
    document.getElementById('mentorTrackVal').textContent = trackLabel(profile.track);
    document.getElementById('mentorAvatar').textContent = initials(profile.name);
    document.getElementById('mentorTrackStat').textContent = trackLabel(profile.track);

    renderMentees(profile);
    renderMeetings(profile);
  }

  document.getElementById('mentorSaveBtn').addEventListener('click', () => {
    const name = document.getElementById('mentorFormName').value.trim();
    const track = document.getElementById('mentorFormTrack').value;
    const experience = document.getElementById('mentorFormExperience').value.trim();
    const bio = document.getElementById('mentorFormBio').value.trim();
    if (!name) {
      window.alert(lang() === 'ar' ? 'يرجى إدخال اسمك.' : 'Please enter your name.');
      return;
    }
    window.IH_MENTORS.saveOwnProfile({ id: 'self', name, track, experience, bio });
    renderProfile();
  });

  function editField(fieldKey, promptLabel) {
    const profile = window.IH_MENTORS.getOwnProfile();
    if (!profile) return;
    const current = profile[fieldKey] || '';
    const next = window.prompt(promptLabel, current);
    if (next !== null && next.trim()) {
      profile[fieldKey] = next.trim();
      window.IH_MENTORS.saveOwnProfile(profile);
      renderProfile();
    }
  }

  document.getElementById('mentorNameField').addEventListener('click', () => {
    editField('name', lang() === 'ar' ? 'الاسم:' : 'Your name:');
  });
  document.getElementById('mentorTrackField').addEventListener('click', () => {
    const profile = window.IH_MENTORS.getOwnProfile();
    if (!profile) return;
    const next = window.prompt(
      lang() === 'ar' ? 'المسار (radiology / preauth / both):' : 'Track (radiology / preauth / both):',
      profile.track
    );
    if (next && ['radiology', 'preauth', 'both'].includes(next.trim())) {
      profile.track = next.trim();
      window.IH_MENTORS.saveOwnProfile(profile);
      renderProfile();
    }
  });
  document.getElementById('mentorEditProfileLink').addEventListener('click', (e) => {
    e.preventDefault();
    const profile = window.IH_MENTORS.getOwnProfile();
    if (!profile) return;
    document.getElementById('mentorFormName').value = profile.name || '';
    document.getElementById('mentorFormTrack').value = profile.track || 'radiology';
    document.getElementById('mentorFormExperience').value = profile.experience || '';
    document.getElementById('mentorFormBio').value = profile.bio || '';
    setupPanel.hidden = false;
    setupPanel.scrollIntoView({ behavior: 'smooth' });
  });

  renderProfile();
  document.addEventListener('ih:langchange', renderProfile);
})();
