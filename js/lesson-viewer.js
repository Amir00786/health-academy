// LESSON VIEWER — video gate, then a short quiz gate, before a lesson counts as complete.
// Usage: LessonViewer.open({ title, video, quiz: [{q, options:[...], correct:idx}, ...] }, onComplete)
(function () {
  const PLACEHOLDER_VIDEO = 'https://www.w3schools.com/html/mov_bbb.mp4';

  function lang() {
    return (window.I18N && window.I18N.currentLang) ? window.I18N.currentLang() : 'en';
  }

  const STRINGS = {
    discussions: { en: '0 Discussions', ar: '0 مناقشات' },
    expandLabel: { en: 'Toggle fullscreen', ar: 'تبديل ملء الشاشة' },
    closeLabel: { en: 'Close', ar: 'إغلاق' },
    completeContinue: { en: 'Complete & Continue <i class="fi fi-rr-arrow-small-right"></i>', ar: '<i class="fi fi-rr-arrow-small-left"></i> إتمام والمتابعة' },
    quickCheck: { en: 'Quick check', ar: 'تحقق سريع' },
    answerToComplete: { en: 'Answer to complete this lesson', ar: 'أجب لإكمال هذا الدرس' },
    submitAnswers: { en: 'Submit answers', ar: 'إرسال الإجابات' },
    tryAgain: { en: 'Try again', ar: 'حاول مرة أخرى' },
    continueBtn: { en: 'Continue <i class="fi fi-rr-arrow-small-right"></i>', ar: '<i class="fi fi-rr-arrow-small-left"></i> متابعة' },
  };
  function t(key) {
    return STRINGS[key][lang()] || STRINGS[key].en;
  }

  const overlay = document.createElement('div');
  overlay.className = 'lv-overlay';
  overlay.innerHTML = `
    <div class="lv-modal">
      <div class="lv-header">
        <div class="lv-header-text">
          <span class="lv-header-title" id="lvTitle">—</span>
          <span class="lv-header-duration" id="lvDuration"></span>
        </div>
        <div class="lv-header-actions">
          <span class="lv-discussions"><i class="fi fi-sr-comment-alt"></i> <span id="lvDiscussions">0 Discussions</span></span>
          <button type="button" class="lv-icon-btn" id="lvExpand" aria-label="Toggle fullscreen"><i class="fi fi-sr-expand"></i></button>
          <button type="button" class="lv-icon-btn lv-close" aria-label="Close"><i class="fi fi-sr-cross"></i></button>
        </div>
      </div>
      <div class="lv-step" id="lvStepVideo">
        <video class="lv-video" id="lvVideo" controls></video>
        <div class="lv-video lv-hidden" id="lvYoutube"></div>
        <div class="lv-footer">
          <button type="button" class="lv-btn lv-btn-primary" id="lvToQuiz" disabled>Complete & Continue <i class="fi fi-rr-arrow-small-right"></i></button>
        </div>
      </div>
      <div class="lv-step lv-hidden" id="lvStepQuiz">
        <div class="lv-quiz-body">
          <div class="lv-eyebrow" id="lvEyebrow">Quick check</div>
          <h3 class="lv-title" id="lvQuizTitle">Answer to complete this lesson</h3>
          <div id="lvQuestions"></div>
          <div class="lv-quiz-result hidden" id="lvResult"></div>
          <button type="button" class="lv-btn lv-btn-primary" id="lvSubmit">Submit answers</button>
          <button type="button" class="lv-btn lv-btn-ghost lv-hidden" id="lvRetry">Try again</button>
          <button type="button" class="lv-btn lv-btn-primary lv-hidden" id="lvContinue">Continue <i class="fi fi-rr-arrow-small-right"></i></button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  function applyStaticStrings() {
    overlay.querySelector('#lvDiscussions').textContent = t('discussions');
    overlay.querySelector('#lvExpand').setAttribute('aria-label', t('expandLabel'));
    overlay.querySelector('.lv-close').setAttribute('aria-label', t('closeLabel'));
    overlay.querySelector('#lvToQuiz').innerHTML = t('completeContinue');
    overlay.querySelector('#lvEyebrow').textContent = t('quickCheck');
    overlay.querySelector('#lvQuizTitle').textContent = t('answerToComplete');
    overlay.querySelector('#lvSubmit').textContent = t('submitAnswers');
    overlay.querySelector('#lvRetry').textContent = t('tryAgain');
    overlay.querySelector('#lvContinue').innerHTML = t('continueBtn');
  }
  applyStaticStrings();
  document.addEventListener('ih:langchange', applyStaticStrings);

  const els = {
    modal: overlay.querySelector('.lv-modal'),
    video: overlay.querySelector('#lvVideo'),
    youtube: overlay.querySelector('#lvYoutube'),
    title: overlay.querySelector('#lvTitle'),
    duration: overlay.querySelector('#lvDuration'),
    toQuiz: overlay.querySelector('#lvToQuiz'),
    stepVideo: overlay.querySelector('#lvStepVideo'),
    stepQuiz: overlay.querySelector('#lvStepQuiz'),
    questions: overlay.querySelector('#lvQuestions'),
    submit: overlay.querySelector('#lvSubmit'),
    retry: overlay.querySelector('#lvRetry'),
    continueBtn: overlay.querySelector('#lvContinue'),
    result: overlay.querySelector('#lvResult'),
    close: overlay.querySelector('.lv-close'),
    expand: overlay.querySelector('#lvExpand'),
  };

  els.expand.addEventListener('click', () => {
    els.modal.classList.toggle('lv-expanded');
  });

  let currentLesson = null;
  let currentOnComplete = null;

  // YOUTUBE SUPPORT — lessons may point at a YouTube URL instead of a hosted
  // .mp4. A plain <iframe> embed (rather than the YT IFrame Player API) is
  // used deliberately: the API's origin validation fails outside a matching
  // live https domain (e.g. opening the file locally), surfacing as
  // "Error 153". A plain iframe has no such restriction. The trade-off is we
  // can't read real playback progress across origins, so "Complete &
  // Continue" unlocks on a timer sized to the lesson's stated duration
  // instead of a live watched-percentage check.
  function getYouTubeId(url) {
    if (!url) return null;
    const m = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]{11})/);
    return m ? m[1] : null;
  }

  function parseDurationSeconds(dur) {
    if (!dur) return 0;
    const parts = String(dur).split(':').map((n) => parseInt(n, 10) || 0);
    return parts.reduce((acc, n) => acc * 60 + n, 0);
  }

  let usingYouTube = false;
  let ytUnlockTimer = null;

  function stopYouTube() {
    if (ytUnlockTimer) { clearTimeout(ytUnlockTimer); ytUnlockTimer = null; }
    els.youtube.innerHTML = '';
    usingYouTube = false;
  }

  function startYouTube(videoId, dur) {
    usingYouTube = true;
    els.video.classList.add('lv-hidden');
    els.youtube.classList.remove('lv-hidden');
    els.youtube.innerHTML = `<iframe src="https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1" style="width:100%; height:100%; border:0;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    const seconds = parseDurationSeconds(dur);
    if (ytUnlockTimer) clearTimeout(ytUnlockTimer);
    ytUnlockTimer = setTimeout(() => { els.toQuiz.disabled = false; }, Math.max(seconds * 0.85, 20) * 1000);
  }

  function renderQuiz(quiz) {
    els.questions.innerHTML = quiz.map((item, qi) => `
      <div class="lv-question">
        <p class="lv-q-text">${qi + 1}. ${item.q}</p>
        <div class="lv-options" id="lvOpts${qi}">
          ${item.options.map((opt, oi) => `
            <label class="lv-option" data-idx="${oi}">
              <input type="radio" name="lvq${qi}" value="${oi}">
              <span>${opt}</span>
            </label>
          `).join('')}
        </div>
        ${item.explanation ? `<div class="lv-explanation" id="lvExp${qi}"><b>${lang() === 'ar' ? 'التفسير' : 'Explanation'}</b>${item.explanation}</div>` : ''}
      </div>
    `).join('');
  }

  function open(lesson, onComplete) {
    currentLesson = lesson;
    currentOnComplete = onComplete;
    els.title.textContent = lesson.title;
    els.duration.textContent = lesson.dur || lesson.duration || '';
    stopYouTube();
    const ytId = getYouTubeId(lesson.video);
    if (ytId) {
      els.video.removeAttribute('src');
      startYouTube(ytId, lesson.dur || lesson.duration);
    } else {
      els.youtube.classList.add('lv-hidden');
      els.video.classList.remove('lv-hidden');
      els.video.src = lesson.video || PLACEHOLDER_VIDEO;
    }
    els.toQuiz.disabled = true;
    els.stepVideo.classList.remove('lv-hidden');
    els.stepQuiz.classList.add('lv-hidden');
    els.result.classList.add('hidden');
    els.retry.classList.add('lv-hidden');
    els.continueBtn.classList.add('lv-hidden');
    els.submit.classList.remove('lv-hidden');
    renderQuiz(lesson.quiz || []);
    overlay.classList.add('open');
  }

  function close() {
    overlay.classList.remove('open');
    els.video.pause();
    stopYouTube();
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
      const pickedIdx = picked ? parseInt(picked.value, 10) : -1;
      const isCorrect = pickedIdx === item.correct;
      if (isCorrect) correctCount++;

      // Lock this question and reveal correct/wrong + explanation
      const optsWrap = document.getElementById(`lvOpts${qi}`);
      if (optsWrap) {
        optsWrap.querySelectorAll('input').forEach((input) => { input.disabled = true; });
        optsWrap.querySelectorAll('.lv-option').forEach((optEl) => {
          const oi = parseInt(optEl.dataset.idx, 10);
          optEl.classList.add('lv-opt-disabled');
          if (oi === item.correct) optEl.classList.add('lv-opt-correct');
          else if (oi === pickedIdx) optEl.classList.add('lv-opt-wrong');
        });
      }
      const expEl = document.getElementById(`lvExp${qi}`);
      if (expEl) {
        expEl.classList.add('show', isCorrect ? 'lv-exp-correct' : 'lv-exp-wrong');
      }
    });
    const passed = quiz.length === 0 || correctCount / quiz.length >= 0.7;
    els.result.classList.remove('hidden');
    els.submit.classList.add('lv-hidden');
    if (passed) {
      els.result.className = 'lv-quiz-result lv-result-pass';
      els.result.textContent = lang() === 'ar'
        ? `رائع — ${correctCount}/${quiz.length} صحيحة. تم إكمال الدرس.`
        : `Nice — ${correctCount}/${quiz.length} correct. Lesson complete.`;
      els.retry.classList.add('lv-hidden');
      els.continueBtn.classList.remove('lv-hidden');
      if (currentOnComplete) currentOnComplete();
    } else {
      els.result.className = 'lv-quiz-result lv-result-fail';
      els.result.textContent = lang() === 'ar'
        ? `${correctCount}/${quiz.length} صحيحة — راجع الشرح أدناه وحاول مرة أخرى.`
        : `${correctCount}/${quiz.length} correct — review the explanations below and try again.`;
      els.retry.classList.remove('lv-hidden');
    }
  });

  els.continueBtn.addEventListener('click', close);

  els.retry.addEventListener('click', () => {
    els.result.classList.add('hidden');
    els.retry.classList.add('lv-hidden');
    els.submit.classList.remove('lv-hidden');
    els.stepQuiz.classList.add('lv-hidden');
    els.stepVideo.classList.remove('lv-hidden');
    if (usingYouTube) {
      const ytId = getYouTubeId(currentLesson.video);
      if (ytId) startYouTube(ytId, currentLesson.dur || currentLesson.duration);
    } else {
      els.video.currentTime = 0;
    }
    els.toQuiz.disabled = true;
    renderQuiz(currentLesson.quiz || []);
  });

  els.close.addEventListener('click', close);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && overlay.classList.contains('open')) close(); });

  window.LessonViewer = { open, close };
})();
