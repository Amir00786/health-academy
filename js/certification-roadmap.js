// CERTIFICATION ROADMAP — board-by-board certification journey tracker.
// Scoped down from the original design: no admin review queue — stations are
// self-tracked ("mark complete" once you've prepared what's needed), not
// verified by anyone. Only the Egyptian Board is interactive; the rest are
// shown for reference and marked "Coming soon", matching the source design.
(function () {
  function lang() {
    return (window.I18N && window.I18N.currentLang) ? window.I18N.currentLang() : 'en';
  }
  function t(key, fallback) {
    const dict = (window.I18N && window.I18N.dict) ? window.I18N.dict() : {};
    return dict[key] ? (dict[key][lang()] || dict[key].en) : fallback;
  }

  const BOARDS = {
    usa: {
      active: false, name: 'American Board (ABR)', country: 'United States',
      note: 'Diagnostic Radiology pathway, standard ACGME residency route.',
      stations: [
        { title: 'Clinical Internship', sub: '1 year', musts: ['Complete PGY-1 in an ACGME- or RCPSC-accredited program', 'Hold a valid training medical license'] },
        { title: 'DR Residency', sub: '4 years, PGY2–5', musts: ['Complete all 4 years at one sponsoring institution (or approved transfer)', 'Maintain satisfactory in-training evaluations'] },
        { title: 'Qualifying (Core) Exam', sub: 'After 36 months', musts: ['Pass the 3-day computer-based Core Exam', 'Covers all DR domains plus embedded physics'] },
        { title: 'Complete Residency', sub: 'End of PGY-5', musts: ['Program director confirms full 4-year completion'] },
        { title: 'Certifying Exam', sub: '≥12 months after residency', musts: ['Pass the Certifying Exam module set', 'Hold a valid, unrestricted state or provincial license'] },
        { title: 'Board Certified', sub: 'ABR Diplomate', certified: true, musts: ['Diplomate status active — maintain via MOC'] }
      ]
    },
    uk: {
      active: false, name: 'UK Board (Royal Colleges)', country: 'United Kingdom',
      note: "General UK specialty training structure — worked example uses Radiology's FRCR.",
      stations: [
        { title: 'Foundation Programme', sub: '2 years', musts: ['Full GMC registration', 'IELTS/OET English requirement for IMGs'] },
        { title: 'Part 1 Exam', sub: 'e.g. FRCR Part 1', musts: ['Pass Anatomy and Physics modules', 'Required before ST2/ST3'] },
        { title: 'Specialty Training', sub: 'Length varies by specialty', musts: ['Satisfactory ARCP outcome each year'] },
        { title: 'Final Exam — Part A', sub: 'e.g. FRCR Part 2A', musts: ['Pass both SBA papers on the same sitting'] },
        { title: 'Final Exam — Part B', sub: 'e.g. FRCR Part 2B', musts: ['Minimum 34 months in a formal clinical post', 'Pass all clinical/oral components'] },
        { title: 'CCT Certified', sub: 'GMC Specialist Register', certified: true, musts: ['Apply to your Royal College and the GMC within 12 months'] }
      ]
    },
    ireland: {
      active: false, name: 'Ireland Board (FFR RCSI)', country: 'Ireland',
      note: 'Fellowship of the Faculty of Radiologists, Royal College of Surgeons in Ireland.',
      stations: [
        { title: 'Pre-Training Experience', sub: '≥2 years post-registration', musts: ['1 year internship + 1 year clinical experience'] },
        { title: 'Primary FFR Exam', sub: 'End of Year 1', musts: ['Pass MCQ, digital image exam and viva voce'] },
        { title: 'Core Training', sub: 'Years 2–3', musts: ['Satisfactory annual training review'] },
        { title: 'Final FFR Part IIa', sub: 'Year 4', musts: ['Pass both SBA/EMQ papers'] },
        { title: 'Final FFR Part IIb', sub: 'Year 4', musts: ['Pass vivas, rapid reporting and long cases'] },
        { title: 'Fellowship Certified', sub: 'FFR RCSI', certified: true, musts: ['Complete all 5 years of training'] }
      ]
    },
    australia: {
      active: false, name: 'Australian / NZ Board (RANZCR)', country: 'Australia & New Zealand',
      note: 'Fellowship of RANZCR (FRANZCR), three-phase Clinical Radiology Training Program.',
      stations: [
        { title: 'Prevocational Years', sub: 'Internship + PGY', musts: ['AHPRA or Medical Council of NZ registration'] },
        { title: 'Phase 1 Exams', sub: 'Anatomy + AIT', musts: ['Pass both online proctored written exams'] },
        { title: 'Phase 2 Training & Exams', sub: '≥24 months FTE', musts: ['Pass the MCQ + Case Reporting exam', 'Pass OSCER'] },
        { title: 'Phase 3', sub: 'To 60 months FTE total', musts: ['Complete subspecialty consolidation training'] },
        { title: 'Fellowship Certified', sub: 'FRANZCR', certified: true, musts: ['All training program requirements met'] }
      ]
    },
    saudi: {
      active: false, name: 'Saudi Board (SCFHS)', country: 'Saudi Arabia',
      note: 'Saudi Commission for Health Specialties, Diagnostic Radiology residency.',
      stations: [
        { title: 'Rotating Internship', sub: '12 months', musts: ['Complete internship post-MBBS or equivalent'] },
        { title: 'R1–R2', sub: 'Years 1–2 of residency', musts: ['Pass yearly promotion exams'] },
        { title: 'R3–R4', sub: 'Years 3–4 of residency', musts: ['Pass yearly promotion exams', 'Pass the Final Written Exam'] },
        { title: 'Final Clinical Exam', sub: 'OSCE-style', musts: ['Pass the clinical/OSCE assessment'] },
        { title: 'Saudi Board Certified', sub: 'SCFHS Diplomate', certified: true, musts: ['All requirements and exams completed'] }
      ]
    },
    egypt: {
      active: true, name: 'Egyptian Board', country: 'Egypt',
      note: 'Egyptian Fellowship (egyfellow.com), under the Ministry of Health & Population.',
      exemption: {
        label: 'rm.exemptionLabel',
        stationIndex: 3,
        note: 'rm.exemptionNote'
      },
      stations: [
        {
          title: 'Document Submission', sub: 'Required before licensing', musts: [
            'Medical practice license from the Ministry of Health',
            'Malpractice insurance policy from an Egyptian insurance company',
            'Original Bachelor\'s certificate, authenticated by the Egyptian Ministry of Foreign Affairs',
            'Original internship certificate, authenticated the same way',
            'Original equivalency certificate from the Supreme Council of Universities',
            '3 recent passport-style photos (6×4 cm)',
            'Clinical checkup valid within 3 months from an approved center'
          ]
        },
        {
          title: 'Enrollment & Licensing', sub: 'Via egyfellow.com', musts: [
            'Pay the enrollment fee plus service fees',
            'Documents forwarded to the Medical Licensing Department',
            'Collect your license within 1 month of approval'
          ]
        },
        {
          title: 'Training Registration', sub: 'Supreme Committee, Princess Fatma Academy', musts: [
            'Submit remaining documents and pay remaining fees',
            'Confirm your rotation start date'
          ]
        },
        { title: 'First Part Exam', sub: 'After required rotation', musts: ['Sit the First Part Exam after completing the required rotation years', 'Waived for holders of a recognized Royal College membership or relevant Master\'s degree'] },
        { title: 'Second Part Exam', sub: '', musts: ['Pass the Second Part Exam to progress toward certification'] },
        { title: 'Third Part Exam', sub: '', musts: ['Pass the Third Part Exam — final assessment before certification'] },
        { title: 'Board Certified', sub: 'Egyptian Fellowship', certified: true, musts: ['All required parts and committee approvals completed'] }
      ]
    },
    sudan: {
      active: false, name: 'Sudanese Board (SMSB)', country: 'Sudan',
      note: 'Sudan Medical Specialization Board, Diagnostic Radiology residency.',
      stations: [
        { title: 'Selection Exam', sub: 'Entry to the program', musts: ['Pass the SMSB radiology selection exam'] },
        { title: 'Residency Training', sub: '4 years', musts: ['Full-time training at an SMSB-accredited center', 'Pass the first-year assessment'] },
        { title: 'Final Exam', sub: 'End of Year 4', musts: ['Pass the SMSB final radiology exam'] },
        { title: 'Sudan Board Certified', sub: 'SMSB Diagnostic Radiology', certified: true, musts: ['All requirements completed'] }
      ]
    },
    arab: {
      active: false, name: 'Arab Board', country: 'Pan-Arab (League of Arab States)',
      note: 'Arab Board of Radiology & Medical Imaging, under the ABHS.',
      stations: [
        { title: 'Residency Training', sub: '4 years minimum', musts: ['Full-time training at an approved Arab Board center', '≥80% attendance at academic activities'] },
        { title: 'Part One Exam', sub: 'During training', musts: ['Pass Part One before sitting Part Two'] },
        { title: 'Final (Part Two) Exam', sub: 'Written, film-viewing & oral', musts: ['Submit your completed, approved log book', 'Up to 4 attempts allowed'] },
        { title: 'Arab Board Certified', sub: 'Fellowship of the Arab Board', certified: true, musts: ['Recognized across most of the Arab League'] }
      ]
    }
  };

  let currentBoard = 'egypt';
  let activeStationIdx = null;

  function progressKey(boardId) { return 'ih-roadmap-progress:' + boardId; }
  function exemptionKey(boardId) { return 'ih-roadmap-exemption:' + boardId; }

  function loadProgress(boardId) {
    try {
      return JSON.parse(localStorage.getItem(progressKey(boardId))) || {};
    } catch (e) {
      return {};
    }
  }
  function saveProgress(boardId, data) {
    localStorage.setItem(progressKey(boardId), JSON.stringify(data));
  }
  function loadExemption(boardId) {
    return localStorage.getItem(exemptionKey(boardId)) === '1';
  }
  function saveExemption(boardId, on) {
    localStorage.setItem(exemptionKey(boardId), on ? '1' : '0');
  }

  // Batch/intake scheduling — computed from one anchor point, not hand-typed per year.
  const BATCH_CONFIG = {
    egypt: { referenceBatchNumber: 1, referenceStartDate: '2014-07-01', intervalMonths: 6 }
  };

  function computeBatch(boardKey) {
    const cfg = BATCH_CONFIG[boardKey];
    if (!cfg) return null;
    const ref = new Date(cfg.referenceStartDate + 'T00:00:00');
    const now = new Date();
    const monthsDiff = (now.getFullYear() - ref.getFullYear()) * 12 + (now.getMonth() - ref.getMonth());
    const cyclesElapsed = Math.floor(monthsDiff / cfg.intervalMonths);
    const batchNumber = cfg.referenceBatchNumber + cyclesElapsed;
    const batchStart = new Date(ref);
    batchStart.setMonth(batchStart.getMonth() + cyclesElapsed * cfg.intervalMonths);
    const batchEnd = new Date(batchStart);
    batchEnd.setMonth(batchEnd.getMonth() + cfg.intervalMonths);
    const fmt = (d) => d.toLocaleDateString(undefined, { year: 'numeric', month: 'short' });
    return { batchNumber, fromLabel: fmt(batchStart), toLabel: fmt(batchEnd) };
  }

  function renderBoardRow() {
    const row = document.getElementById('rmBoardRow');
    row.innerHTML = '';
    Object.keys(BOARDS).forEach((key) => {
      const b = BOARDS[key];
      const pill = document.createElement('button');
      const isActive = !!b.active;
      pill.type = 'button';
      pill.className = 'rm-board-pill' + (key === currentBoard ? ' active' : '') + (!isActive ? ' soon' : '');
      pill.innerHTML = b.name + (!isActive ? ' <span class="rm-soon-tag">Soon</span>' : '');
      if (isActive) {
        pill.addEventListener('click', () => { currentBoard = key; renderAll(); });
      } else {
        pill.disabled = true;
      }
      row.appendChild(pill);
    });
  }

  function renderAll() {
    renderBoardRow();
    const b = BOARDS[currentBoard];
    const batch = computeBatch(currentBoard);
    const batchLine = b.active
      ? (batch
        ? '<div class="rm-batch-line"><i class="fi fi-sr-calendar"></i> Batch No. ' + batch.batchNumber + ' &nbsp;·&nbsp; ' + batch.fromLabel + ' – ' + batch.toLabel + ' <span class="rm-batch-tag">twice-yearly intake</span></div>'
        : '<div class="rm-batch-line"><i class="fi fi-sr-calendar"></i> Batch dates to be confirmed</div>')
      : '<div class="rm-batch-line soon"><i class="fi fi-sr-calendar"></i> Batch schedule announced at launch</div>';
    document.getElementById('rmBoardHead').innerHTML = '<h3>' + b.name + '</h3>' + batchLine + '<p>' + b.country + ' · ' + b.note + '</p>';

    const exemptArea = document.getElementById('rmExemptionArea');
    let exemptionOn = false;
    if (b.exemption) {
      exemptionOn = loadExemption(currentBoard);
      exemptArea.innerHTML =
        '<div class="rm-exemption-box' + (exemptionOn ? ' on' : '') + '" id="rmExemptionBox">' +
        '<input type="checkbox" id="rmExemptionCheck" ' + (exemptionOn ? 'checked' : '') + '>' +
        '<div><label for="rmExemptionCheck">' + t(b.exemption.label, "I hold a Royal College membership or relevant Master's degree") + '</label>' +
        '<div class="rm-exemption-note">' + t(b.exemption.note, '2 years are deducted from your rotation, and the First Part Exam is waived.') + '</div></div></div>';
      document.getElementById('rmExemptionCheck').addEventListener('change', (e) => {
        saveExemption(currentBoard, e.target.checked);
        renderAll();
      });
    } else {
      exemptArea.innerHTML = '';
    }

    const progress = loadProgress(currentBoard);
    const completedSet = new Set(Object.keys(progress).map(Number));
    const exemptIdx = (b.exemption && exemptionOn) ? b.exemption.stationIndex : null;
    const stations = b.stations;

    const effectiveSet = new Set(completedSet);
    if (exemptIdx !== null) effectiveSet.add(exemptIdx);
    let currentIdx = stations.findIndex((s, i) => !effectiveSet.has(i));
    if (currentIdx === -1) currentIdx = stations.length;

    const track = document.getElementById('rmTrack');
    track.innerHTML = '';
    stations.forEach((s, i) => {
      const isExempted = exemptIdx === i && !completedSet.has(i);
      const isComplete = completedSet.has(i);
      const isCurrent = i === currentIdx;
      const isLocked = i > currentIdx;
      const isCertified = !!s.certified;
      let stateClass = 'locked';
      if (isExempted) stateClass = 'exempt';
      else if (isComplete) stateClass = isCertified ? 'certified' : 'complete';
      else if (isCurrent) stateClass = 'current';

      const wrap = document.createElement('div');
      wrap.className = 'rm-station';

      if (isCurrent && !isComplete && !isExempted) {
        const you = document.createElement('div');
        you.className = 'rm-you';
        you.innerHTML = '<span class="rm-you-arrow">▼</span><span>' + t('rm.you', 'YOU ARE HERE') + '</span>';
        wrap.appendChild(you);
      }

      const node = document.createElement('button');
      node.type = 'button';
      node.className = 'rm-node ' + stateClass;
      node.innerHTML = isExempted ? '—' : isComplete ? '<i class="fi fi-sr-check"></i>' : (isLocked ? '<i class="fi fi-sr-lock"></i>' : (i + 1));
      if (!isLocked || isExempted) {
        node.addEventListener('click', () => openStationDetail(i));
      }
      wrap.appendChild(node);

      const title = document.createElement('div');
      title.className = 'rm-station-title';
      title.textContent = s.title;
      wrap.appendChild(title);

      const status = document.createElement('div');
      status.className = 'rm-station-status ' + stateClass;
      status.textContent = isExempted ? t('rm.exempted', 'Exempted')
        : isComplete ? (isCertified ? t('rm.certified', 'Board Certified') : t('rm.completed', 'Completed'))
          : isLocked ? t('rm.locked', 'Locked')
            : t('rm.actionNeeded', 'Action Needed');
      wrap.appendChild(status);

      track.appendChild(wrap);

      if (i < stations.length - 1) {
        const connector = document.createElement('div');
        connector.className = 'rm-connector' + ((isComplete || isExempted) ? ' lit' : '');
        track.appendChild(connector);
      }
    });
  }

  function openStationDetail(i) {
    activeStationIdx = i;
    const b = BOARDS[currentBoard];
    const s = b.stations[i];
    const progress = loadProgress(currentBoard);
    const isComplete = Object.prototype.hasOwnProperty.call(progress, i);
    const exemptionOn = b.exemption ? loadExemption(currentBoard) : false;
    const isExempted = b.exemption && exemptionOn && b.exemption.stationIndex === i && !isComplete;

    document.getElementById('rmDetailSub').textContent = (s.sub || '').toUpperCase();
    document.getElementById('rmDetailTitle').textContent = s.title;
    const list = document.getElementById('rmMustList');
    list.innerHTML = '';
    (s.musts || []).forEach((m) => {
      const li = document.createElement('li');
      li.innerHTML = '<span class="rm-must-check"></span><span>' + m + '</span>';
      list.appendChild(li);
    });

    const submitArea = document.getElementById('rmSubmitArea');
    if (isExempted) {
      submitArea.innerHTML = '<div class="rm-review-note" style="background:#F3EFFB; border-left-color:#8B6FD1;">' + t('rm.waived', 'Waived —') + ' ' + t(b.exemption.note, '') + '</div>';
    } else if (isComplete) {
      const doneAt = progress[i];
      submitArea.innerHTML = '<div class="rm-review-note">✓ ' + t('rm.doneOn', 'Marked complete on') + ' ' + new Date(doneAt).toLocaleDateString() + '.</div>';
    } else {
      submitArea.innerHTML =
        '<button type="button" class="rm-mark-btn" id="rmMarkBtn">' + t('rm.markComplete', 'Mark this station complete') + '</button>' +
        '<p style="font-size:12px; color:var(--ink-dim); text-align:center; margin-top:10px;">' + t('rm.markNote', "This is self-tracked, not independently verified — mark a station complete once you've prepared what it needs.") + '</p>';
      document.getElementById('rmMarkBtn').addEventListener('click', () => {
        const progress = loadProgress(currentBoard);
        progress[i] = Date.now();
        saveProgress(currentBoard, progress);
        document.getElementById('rmDetailOverlay').classList.remove('open');
        renderAll();
      });
    }

    document.getElementById('rmDetailOverlay').classList.add('open');
  }

  document.getElementById('rmDetailClose').addEventListener('click', () => {
    document.getElementById('rmDetailOverlay').classList.remove('open');
  });
  document.getElementById('rmDetailOverlay').addEventListener('click', (e) => {
    if (e.target.id === 'rmDetailOverlay') e.currentTarget.classList.remove('open');
  });

  renderAll();
  document.addEventListener('ih:langchange', renderAll);
})();
