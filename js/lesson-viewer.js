// LESSON VIEWER — video gate, then a short quiz gate, before a lesson counts as complete.
// Usage: LessonViewer.open({ title, video, quiz: [{q, options:[...], correct:idx}, ...] }, onComplete)
(function () {
  const PLACEHOLDER_VIDEO = 'https://www.w3schools.com/html/mov_bbb.mp4';

  const overlay = document.createElement('div');
  overlay.className = 'lv-overlay';
  overlay.innerHTML = `
    <div class="lv-modal">
      <div class="lv-header">
        <span class="lv-header-title" id="lvTitle">—</span>
        <div class="lv-header-actions">
          <span class="lv-discussions"><i class="fi fi-sr-comment-alt"></i> 0 Discussions</span>
          <button type="button" class="lv-icon-btn" id="lvExpand" aria-label="Toggle fullscreen"><i class="fi fi-sr-expand"></i></button>
          <button type="button" class="lv-icon-btn lv-close" aria-label="Close"><i class="fi fi-sr-cross"></i></button>
        </div>
      </div>
      <div class="lv-step" id="lvStepVideo">
        <video class="lv-video" id="lvVideo" controls></video>
        <div class="lv-footer">
          <button type="button" class="lv-btn lv-btn-primary" id="lvToQuiz" disabled>Complete & Continue →</button>
        </div>
      </div>
      <div class="lv-step lv-hidden" id="lvStepQuiz">
        <div class="lv-quiz-body">
          <div class="lv-eyebrow">Quick check</div>
          <h3 class="lv-title" id="lvQuizTitle">Answer to complete this lesson</h3>
          <div id="lvQuestions"></div>
          <div class="lv-quiz-result hidden" id="lvResult"></div>
          <button type="button" class="lv-btn lv-btn-primary" id="lvSubmit">Submit answers</button>
          <button type="button" class="lv-btn lv-btn-ghost lv-hidden" id="lvRetry">Try again</button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  const els = {
    modal: overlay.querySelector('.lv-modal'),
    video: overlay.querySelector('#lvVideo'),
    title: overlay.querySelector('#lvTitle'),
    toQuiz: overlay.querySelector('#lvToQuiz'),
    stepVideo: overlay.querySelector('#lvStepVideo'),
    stepQuiz: overlay.querySelector('#lvStepQuiz'),
    questions: overlay.querySelector('#lvQuestions'),
    submit: overlay.querySelector('#lvSubmit'),
    retry: overlay.querySelector('#lvRetry'),
    result: overlay.querySelector('#lvResult'),
    close: overlay.querySelector('.lv-close'),
    expand: overlay.querySelector('#lvExpand'),
  };

  els.expand.addEventListener('click', () => {
    els.modal.classList.toggle('lv-expanded');
  });

  let currentLesson = null;
  let currentOnComplete = null;

  function renderQuiz(quiz) {
    els.questions.innerHTML = quiz.map((item, qi) => `
      <div class="lv-question">
        <p class="lv-q-text">${qi + 1}. ${item.q}</p>
        <div class="lv-options">
          ${item.options.map((opt, oi) => `
            <label class="lv-option">
              <input type="radio" name="lvq${qi}" value="${oi}">
              <span>${opt}</span>
            </label>
          `).join('')}
        </div>
      </div>
    `).join('');
  }

  function open(lesson, onComplete) {
    currentLesson = lesson;
    currentOnComplete = onComplete;
    els.title.textContent = lesson.title;
    els.video.src = lesson.video || PLACEHOLDER_VIDEO;
    els.toQuiz.disabled = true;
    els.stepVideo.classList.remove('lv-hidden');
    els.stepQuiz.classList.add('lv-hidden');
    els.result.classList.add('hidden');
    els.retry.classList.add('lv-hidden');
    renderQuiz(lesson.quiz || []);
    overlay.classList.add('open');
  }

  function close() {
    overlay.classList.remove('open');
    els.video.pause();
  }

  els.video.addEventListener('timeupdate', () => {
    if (els.video.duration && els.video.currentTime / els.video.duration > 0.85) {
      els.toQuiz.disabled = false;
    }
  });
  els.video.addEventListener('ended', () => {
    els.toQuiz.disabled = false;
  });

  els.toQuiz.addEventListener('click', () => {
    els.stepVideo.classList.add('lv-hidden');
    els.stepQuiz.classList.remove('lv-hidden');
  });

  els.submit.addEventListener('click', () => {
    const quiz = currentLesson.quiz || [];
    let correctCount = 0;
    quiz.forEach((item, qi) => {
      const picked = els.questions.querySelector(`input[name="lvq${qi}"]:checked`);
      if (picked && parseInt(picked.value, 10) === item.correct) correctCount++;
    });
    const passed = quiz.length === 0 || correctCount / quiz.length >= 0.7;
    els.result.classList.remove('hidden');
    if (passed) {
      els.result.className = 'lv-quiz-result lv-result-pass';
      els.result.textContent = `Nice — ${correctCount}/${quiz.length} correct. Lesson complete.`;
      els.retry.classList.add('lv-hidden');
      if (currentOnComplete) currentOnComplete();
      setTimeout(close, 1100);
    } else {
      els.result.className = 'lv-quiz-result lv-result-fail';
      els.result.textContent = `${correctCount}/${quiz.length} correct — review the video and try again.`;
      els.retry.classList.remove('lv-hidden');
    }
  });

  els.retry.addEventListener('click', () => {
    els.result.classList.add('hidden');
    els.retry.classList.add('lv-hidden');
    els.stepQuiz.classList.add('lv-hidden');
    els.stepVideo.classList.remove('lv-hidden');
    els.video.currentTime = 0;
  });

  els.close.addEventListener('click', close);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && overlay.classList.contains('open')) close(); });

  window.LessonViewer = { open, close };
})();
