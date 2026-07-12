// ANATOMY SPOTTING — timed hotspot-labeling game with Hero/Master/Legendary tiers.
// SYSTEMS use placeholder schematic diagrams (no real anatomy photos available yet).
// Each hotspot is just an {x%, y%, label} over an SVG/image, so swapping in real
// labeled photos later is a data change, not an engine change.
(function () {
  const TEST_DURATION_SECONDS = 90 * 60;
  const TIER_THRESHOLDS = [
    { name: 'Legendary', min: 150, ico: '👑' },
    { name: 'Master', min: 100, ico: '🥇' },
    { name: 'Hero', min: 50, ico: '🦸' },
    { name: 'Learner', min: 0, ico: '🌱' },
  ];

  const SYSTEMS = {
    skeletal: {
      name: 'Skeletal System',
      svg: `<svg viewBox="0 0 200 400" xmlns="http://www.w3.org/2000/svg">
        <circle cx="100" cy="35" r="25" fill="none" stroke="#5B6B69" stroke-width="2"/>
        <line x1="100" y1="60" x2="100" y2="220" stroke="#5B6B69" stroke-width="4"/>
        <line x1="55" y1="85" x2="145" y2="85" stroke="#5B6B69" stroke-width="3"/>
        <rect x="75" y="90" width="50" height="70" fill="none" stroke="#5B6B69" stroke-width="2" rx="6"/>
        <line x1="60" y1="95" x2="35" y2="200" stroke="#5B6B69" stroke-width="3"/>
        <line x1="35" y1="200" x2="30" y2="250" stroke="#5B6B69" stroke-width="3"/>
        <line x1="140" y1="95" x2="165" y2="200" stroke="#5B6B69" stroke-width="3"/>
        <line x1="165" y1="200" x2="170" y2="250" stroke="#5B6B69" stroke-width="3"/>
        <path d="M70,220 Q100,240 130,220 L130,240 Q100,260 70,240 Z" fill="none" stroke="#5B6B69" stroke-width="2"/>
        <line x1="80" y1="245" x2="72" y2="330" stroke="#5B6B69" stroke-width="4"/>
        <line x1="120" y1="245" x2="128" y2="330" stroke="#5B6B69" stroke-width="4"/>
        <line x1="72" y1="330" x2="70" y2="390" stroke="#5B6B69" stroke-width="3"/>
        <line x1="128" y1="330" x2="130" y2="390" stroke="#5B6B69" stroke-width="3"/>
      </svg>`,
      hotspots: [
        { x: 50, y: 9, label: 'Skull' },
        { x: 27, y: 21, label: 'Clavicle' },
        { x: 50, y: 30, label: 'Sternum' },
        { x: 16, y: 40, label: 'Humerus' },
        { x: 15, y: 58, label: 'Radius & Ulna' },
        { x: 50, y: 58, label: 'Pelvis' },
        { x: 40, y: 72, label: 'Femur' },
        { x: 35, y: 92, label: 'Tibia & Fibula' },
      ],
    },
    cardiovascular: {
      name: 'Cardiovascular System',
      svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path d="M100,180 C40,130 20,90 40,60 C55,38 85,40 100,65 C115,40 145,38 160,60 C180,90 160,130 100,180 Z" fill="none" stroke="#C1594B" stroke-width="3"/>
        <line x1="100" y1="65" x2="100" y2="20" stroke="#8FB8DE" stroke-width="6"/>
        <line x1="115" y1="45" x2="140" y2="20" stroke="#8FB8DE" stroke-width="5"/>
        <line x1="70" y1="90" x2="45" y2="90" stroke="#C1594B" stroke-width="3" stroke-dasharray="4 3"/>
        <line x1="130" y1="90" x2="155" y2="90" stroke="#C1594B" stroke-width="3" stroke-dasharray="4 3"/>
      </svg>`,
      hotspots: [
        { x: 50, y: 10, label: 'Aorta' },
        { x: 72, y: 22, label: 'Pulmonary Artery' },
        { x: 22, y: 46, label: 'Left Atrium' },
        { x: 78, y: 46, label: 'Right Atrium' },
        { x: 32, y: 78, label: 'Left Ventricle' },
        { x: 68, y: 78, label: 'Right Ventricle' },
      ],
    },
    respiratory: {
      name: 'Respiratory System',
      svg: `<svg viewBox="0 0 200 260" xmlns="http://www.w3.org/2000/svg">
        <rect x="90" y="10" width="20" height="60" rx="8" fill="none" stroke="#5FA8A0" stroke-width="3"/>
        <line x1="100" y1="70" x2="100" y2="100" stroke="#5FA8A0" stroke-width="4"/>
        <line x1="100" y1="90" x2="60" y2="120" stroke="#5FA8A0" stroke-width="3"/>
        <line x1="100" y1="90" x2="140" y2="120" stroke="#5FA8A0" stroke-width="3"/>
        <ellipse cx="55" cy="160" rx="40" ry="65" fill="none" stroke="#5FA8A0" stroke-width="3"/>
        <ellipse cx="145" cy="160" rx="40" ry="65" fill="none" stroke="#5FA8A0" stroke-width="3"/>
        <line x1="15" y1="230" x2="185" y2="230" stroke="#5FA8A0" stroke-width="3" stroke-dasharray="5 4"/>
      </svg>`,
      hotspots: [
        { x: 50, y: 15, label: 'Larynx' },
        { x: 50, y: 30, label: 'Trachea' },
        { x: 40, y: 44, label: 'Bronchus' },
        { x: 27, y: 62, label: 'Left Lung' },
        { x: 73, y: 62, label: 'Right Lung' },
        { x: 50, y: 88, label: 'Diaphragm' },
      ],
    },
  };

  function storageKey(sys) { return 'ih-anatomy-score:' + sys; }

  function getScore(sys) {
    return parseInt(localStorage.getItem(storageKey(sys)) || '0', 10);
  }
  function addScore(sys, n) {
    const total = getScore(sys) + n;
    localStorage.setItem(storageKey(sys), String(total));
    return total;
  }
  function tierFor(score) {
    return TIER_THRESHOLDS.find((t) => score >= t.min);
  }
  function nextTierFor(score) {
    const remaining = TIER_THRESHOLDS.filter((t) => t.min > score).sort((a, b) => a.min - b.min);
    return remaining[0] || null;
  }

  // ---- Landing UI ----
  function renderLanding() {
    const tierWrap = document.getElementById('asTierBar');
    if (tierWrap) {
      const totalScore = Object.keys(SYSTEMS).reduce((s, k) => s + getScore(k), 0);
      const tier = tierFor(totalScore);
      const next = nextTierFor(totalScore);
      tierWrap.innerHTML = `
        <div class="as-tier-badge"><span class="as-tier-ico">${tier.ico}</span> ${tier.name}</div>
        <div class="as-tier-progress">
          <div class="as-tier-progress-track"><div class="as-tier-progress-fill" style="width:${next ? Math.min(100, (totalScore / next.min) * 100) : 100}%"></div></div>
          <div class="as-tier-progress-lbl">${totalScore} correct labels total${next ? ` — ${next.min - totalScore} more to ${next.name}` : ' — top tier reached'}</div>
        </div>
      `;
    }
    const grid = document.getElementById('asSystemGrid');
    if (grid) {
      grid.innerHTML = Object.keys(SYSTEMS).map((key) => {
        const s = SYSTEMS[key];
        const score = getScore(key);
        return `
          <button type="button" class="as-system-card" onclick="AnatomySpotting.start('${key}')">
            <div class="as-system-ico">🩻</div>
            <div class="as-system-name">${s.name}</div>
            <div class="as-system-meta">${s.hotspots.length} labeled points · ${score} correct so far</div>
          </button>
        `;
      }).join('');
    }
  }

  // ---- Game overlay ----
  const overlay = document.createElement('div');
  overlay.className = 'as-game-overlay';
  overlay.innerHTML = `
    <div class="as-game-top">
      <button type="button" class="as-game-exit" id="asExit">← Exit mock test</button>
      <div class="as-timer" id="asTimer">90:00</div>
      <div class="as-game-score" id="asScore">0 correct</div>
    </div>
    <div class="as-game-body">
      <div id="asPlayArea"></div>
      <div id="asResultArea" class="lv-hidden"></div>
    </div>
  `;
  document.body.appendChild(overlay);

  let session = null; // { systemKey, correct, total, secondsLeft, timerId }

  function pickRandomHotspot(system) {
    return system.hotspots[Math.floor(Math.random() * system.hotspots.length)];
  }

  function buildOptions(system, correctLabel) {
    const others = system.hotspots.map((h) => h.label).filter((l) => l !== correctLabel);
    const shuffled = others.sort(() => Math.random() - 0.5).slice(0, 3);
    const all = [...shuffled, correctLabel].sort(() => Math.random() - 0.5);
    return all;
  }

  function renderQuestion() {
    const system = SYSTEMS[session.systemKey];
    const target = pickRandomHotspot(system);
    session.currentTarget = target;
    const options = buildOptions(system, target.label);

    document.getElementById('asPlayArea').innerHTML = `
      <div class="as-canvas-wrap">
        ${system.svg}
        <svg class="as-hotspot-layer" viewBox="0 0 100 100" preserveAspectRatio="none" style="position:absolute; inset:0; width:100%; height:100%;">
          <circle class="as-hotspot as-hotspot-active" cx="${target.x}" cy="${target.y}" r="3.2"></circle>
        </svg>
      </div>
      <p class="as-prompt">What structure is highlighted?</p>
      <div class="as-options" id="asOptions">
        ${options.map((opt) => `<button type="button" class="as-option-btn" data-label="${opt}">${opt}</button>`).join('')}
      </div>
      <p class="as-feedback" id="asFeedback"></p>
    `;
    document.querySelectorAll('.as-option-btn').forEach((btn) => {
      btn.addEventListener('click', () => answerQuestion(btn.dataset.label));
    });
  }

  function answerQuestion(pickedLabel) {
    const correctLabel = session.currentTarget.label;
    const isCorrect = pickedLabel === correctLabel;
    session.total++;
    if (isCorrect) session.correct++;

    document.querySelectorAll('.as-option-btn').forEach((btn) => {
      btn.disabled = true;
      if (btn.dataset.label === correctLabel) btn.classList.add('as-correct');
      else if (btn.dataset.label === pickedLabel) btn.classList.add('as-wrong');
    });
    const fb = document.getElementById('asFeedback');
    fb.textContent = isCorrect ? 'Correct!' : `Not quite — that's the ${correctLabel}.`;
    fb.className = 'as-feedback ' + (isCorrect ? 'as-fb-correct' : 'as-fb-wrong');
    document.getElementById('asScore').textContent = session.correct + ' correct';

    setTimeout(() => {
      if (session) renderQuestion();
    }, 900);
  }

  function formatTime(sec) {
    const m = Math.floor(sec / 60).toString().padStart(2, '0');
    const s = Math.floor(sec % 60).toString().padStart(2, '0');
    return m + ':' + s;
  }

  function tick() {
    session.secondsLeft--;
    const timerEl = document.getElementById('asTimer');
    if (timerEl) {
      timerEl.textContent = formatTime(Math.max(0, session.secondsLeft));
      timerEl.classList.toggle('as-timer-low', session.secondsLeft <= 300);
    }
    if (session.secondsLeft <= 0) endSession();
  }

  function start(systemKey) {
    session = { systemKey, correct: 0, total: 0, secondsLeft: TEST_DURATION_SECONDS, currentTarget: null };
    overlay.classList.add('open');
    document.getElementById('asResultArea').classList.add('lv-hidden');
    document.getElementById('asPlayArea').classList.remove('lv-hidden');
    document.getElementById('asScore').textContent = '0 correct';
    document.getElementById('asTimer').textContent = formatTime(TEST_DURATION_SECONDS);
    document.getElementById('asTimer').classList.remove('as-timer-low');
    renderQuestion();
    session.timerId = setInterval(tick, 1000);
  }

  function endSession() {
    if (session.timerId) clearInterval(session.timerId);
    const beforeScore = getScore(session.systemKey);
    const afterScore = addScore(session.systemKey, session.correct);
    const beforeTier = tierFor(beforeScore);
    const afterTier = tierFor(afterScore);
    const tieredUp = afterTier.name !== beforeTier.name;

    document.getElementById('asPlayArea').classList.add('lv-hidden');
    const resultArea = document.getElementById('asResultArea');
    resultArea.classList.remove('lv-hidden');
    resultArea.innerHTML = `
      <div class="as-result-panel">
        <div class="as-result-title">Session complete</div>
        <div class="as-result-stat">${session.correct} of ${session.total} correct this session · ${afterScore} correct all-time in ${SYSTEMS[session.systemKey].name}</div>
        ${tieredUp ? `<div class="as-tierup">${afterTier.ico} Tier up — you're now ${afterTier.name}!</div>` : ''}
        <button type="button" class="as-result-btn" onclick="AnatomySpotting.start('${session.systemKey}')">Practice again</button>
        <button type="button" class="as-result-btn as-btn-ghost" id="asBackToMenu">Back to systems</button>
      </div>
    `;
    document.getElementById('asBackToMenu').addEventListener('click', exit);
    session = null;
  }

  function exit() {
    if (session && session.timerId) clearInterval(session.timerId);
    session = null;
    overlay.classList.remove('open');
    renderLanding();
  }

  document.getElementById('asExit').addEventListener('click', () => {
    if (session && !confirm('End this mock test early? Your progress so far will still count.')) return;
    if (session) endSession();
    else exit();
  });

  window.AnatomySpotting = { start, exit, renderLanding };
  document.addEventListener('DOMContentLoaded', renderLanding);
  if (document.readyState !== 'loading') renderLanding();
})();
