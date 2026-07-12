// LIVE CHAT WIDGET — floating bottom-right launcher, triage bot + quick replies,
// with a real human hand-off (mailto:) since the site has no chat backend.
// Conversation history persists per-browser via localStorage.
(function () {
  const MSG_KEY = 'ih-livechat-messages';
  const SEEN_KEY = 'ih-livechat-seen';

  const CANNED_REPLY = {
    courseAccess: 'chat.reply.courseAccess',
    payment: 'chat.reply.payment',
    technical: 'chat.reply.technical',
    human: 'chat.reply.human',
    fallback: 'chat.reply.fallback',
  };

  const QUICK_REPLIES = [
    { id: 'courseAccess', key: 'chat.qr.courseAccess' },
    { id: 'payment', key: 'chat.qr.payment' },
    { id: 'technical', key: 'chat.qr.technical' },
    { id: 'human', key: 'chat.qr.human' },
  ];

  const EMOJIS = ['😀', '😂', '😊', '😍', '👍', '🙏', '🎉', '❤️', '😢', '😮', '🤔', '👏', '🔥', '✅', '❌', '💡', '📚', '🩺', '💊', '🧠', '🦴', '🫀', '📅', '⏰', '🎯', '💯', '🙌', '😅', '😴', '🤝', '📌', '⭐'];

  const MAX_RECORDING_SECONDS = 120;

  function t(key) {
    const dict = window.I18N ? window.I18N.dict() : {};
    const lang = window.I18N ? window.I18N.currentLang() : 'en';
    const entry = dict[key];
    if (!entry) return key;
    return entry[lang] || entry.en;
  }

  function loadMessages() {
    try {
      return JSON.parse(localStorage.getItem(MSG_KEY)) || [];
    } catch (e) {
      return [];
    }
  }

  function saveMessages(messages) {
    localStorage.setItem(MSG_KEY, JSON.stringify(messages));
  }

  function buildWidget() {
    const launcher = document.createElement('button');
    launcher.type = 'button';
    launcher.className = 'ih-chat-launcher';
    launcher.id = 'ihChatLauncher';
    launcher.setAttribute('aria-label', 'Open live chat');
    launcher.innerHTML = '<i class="fi fi-sr-comment-alt" id="ihChatLauncherIcon"></i><span class="ih-chat-dot" id="ihChatDot" hidden></span>';

    const panel = document.createElement('div');
    panel.className = 'ih-chat-panel';
    panel.id = 'ihChatPanel';
    panel.hidden = true;
    panel.innerHTML =
      '<div class="ih-chat-header">' +
        '<div>' +
          '<div class="ih-chat-title" data-i18n="chat.title">iHealth Academy Support</div>' +
          '<div class="ih-chat-subtitle" data-i18n="chat.subtitle">We typically reply within a few hours</div>' +
        '</div>' +
        '<div class="ih-chat-header-actions">' +
          '<button type="button" class="ih-chat-more" id="ihChatMore" aria-label="More options"><i class="fi fi-sr-menu-dots-vertical"></i></button>' +
          '<div class="ih-chat-more-menu" id="ihChatMoreMenu">' +
            '<button type="button" id="ihChatNewConvo"><i class="fi fi-sr-plus-small"></i><span data-i18n="chat.newConversation">New conversation</span></button>' +
            '<button type="button" id="ihChatDownload"><i class="fi fi-sr-download"></i><span data-i18n="chat.downloadTranscript">Download transcript</span></button>' +
          '</div>' +
          '<button type="button" class="ih-chat-close" id="ihChatClose" aria-label="Close chat"><i class="fi fi-sr-cross-small"></i></button>' +
        '</div>' +
      '</div>' +
      '<div class="ih-chat-body" id="ihChatBody"></div>' +
      '<div class="ih-chat-quick" id="ihChatQuick">' +
        QUICK_REPLIES.map((qr) => '<button type="button" class="ih-chat-chip" data-qr="' + qr.id + '" data-i18n="' + qr.key + '"></button>').join('') +
      '</div>' +
      '<div class="ih-chat-composer" id="ihChatComposer">' +
        '<textarea class="ih-chat-input" id="ihChatInput" data-i18n-ph="chat.placeholder" rows="1"></textarea>' +
        '<div class="ih-chat-tools">' +
          '<div class="ih-chat-emoji-wrap">' +
            '<button type="button" class="ih-chat-tool-btn" id="ihChatEmojiBtn" aria-label="Insert emoji">😊</button>' +
            '<div class="ih-chat-emoji-picker" id="ihChatEmojiPicker">' +
              EMOJIS.map((em) => '<button type="button" data-emoji="' + em + '">' + em + '</button>').join('') +
            '</div>' +
          '</div>' +
          '<button type="button" class="ih-chat-tool-btn" id="ihChatMicBtn" aria-label="Record voice message"><i class="fi fi-sr-microphone"></i></button>' +
          '<span class="ih-chat-rec-timer" id="ihChatRecTimer" hidden>0:00</span>' +
          '<div class="ih-chat-tools-spacer"></div>' +
          '<button type="button" class="ih-chat-send" id="ihChatSendBtn" aria-label="Send"><i class="fi fi-sr-paper-plane"></i></button>' +
        '</div>' +
      '</div>';

    document.body.appendChild(launcher);
    document.body.appendChild(panel);

    return { launcher, panel };
  }

  function formatDateLabel(ts) {
    const d = new Date(ts);
    const now = new Date();
    const sameDay = d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth() && d.getDate() === now.getDate();
    if (sameDay) return t('chat.today');
    return d.toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long' });
  }

  function formatTimeLabel(ts) {
    return new Date(ts).toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
  }

  function dayKey(ts) {
    const d = new Date(ts);
    return d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate();
  }

  function renderMessages(body) {
    const messages = loadMessages();
    body.innerHTML = '';
    let lastDay = null;
    messages.forEach((msg) => {
      const thisDay = dayKey(msg.ts);
      if (thisDay !== lastDay) {
        const divider = document.createElement('div');
        divider.className = 'ih-chat-date-divider';
        divider.textContent = formatDateLabel(msg.ts);
        body.appendChild(divider);
        lastDay = thisDay;
      }
      const row = document.createElement('div');
      row.className = 'ih-chat-msg ' + msg.from;
      const bubble = document.createElement('div');
      bubble.className = 'ih-chat-bubble';
      if (msg.kind === 'audio') {
        bubble.classList.add('ih-chat-audio-bubble');
        bubble.innerHTML = '<audio controls src="' + msg.audioUrl + '"></audio>';
      } else {
        bubble.innerHTML = msg.from === 'bot' ? t(msg.key) : escapeHtml(msg.text);
      }
      const time = document.createElement('div');
      time.className = 'ih-chat-timestamp';
      time.textContent = formatTimeLabel(msg.ts);
      row.appendChild(bubble);
      row.appendChild(time);
      body.appendChild(row);
    });
    body.scrollTop = body.scrollHeight;
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function showTyping(body) {
    const typing = document.createElement('div');
    typing.className = 'ih-chat-typing';
    typing.id = 'ihChatTypingRow';
    typing.innerHTML = '<span></span><span></span><span></span>';
    body.appendChild(typing);
    body.scrollTop = body.scrollHeight;
    return typing;
  }

  function pushBotReply(body, key, delay) {
    const typing = showTyping(body);
    setTimeout(() => {
      typing.remove();
      const messages = loadMessages();
      messages.push({ from: 'bot', key: key, ts: Date.now() });
      saveMessages(messages);
      renderMessages(body);
    }, delay || 900);
  }

  function buildTranscript() {
    const messages = loadMessages();
    const lines = messages.map((msg) => {
      const who = msg.from === 'bot' ? 'iHealth Academy Support' : 'You';
      const text = msg.kind === 'audio' ? '[voice message]' : (msg.from === 'bot' ? t(msg.key).replace(/<[^>]+>/g, '') : msg.text);
      return '[' + new Date(msg.ts).toLocaleString() + '] ' + who + ': ' + text;
    });
    return lines.join('\n');
  }

  function downloadTranscript() {
    const blob = new Blob([buildTranscript()], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ihealth-academy-chat.txt';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  function init() {
    const { launcher, panel } = buildWidget();
    const body = panel.querySelector('#ihChatBody');
    const closeBtn = panel.querySelector('#ihChatClose');
    const moreBtn = panel.querySelector('#ihChatMore');
    const moreMenu = panel.querySelector('#ihChatMoreMenu');
    const newConvoBtn = panel.querySelector('#ihChatNewConvo');
    const downloadBtn = panel.querySelector('#ihChatDownload');
    const input = panel.querySelector('#ihChatInput');
    const sendBtn = panel.querySelector('#ihChatSendBtn');
    const emojiBtn = panel.querySelector('#ihChatEmojiBtn');
    const emojiPicker = panel.querySelector('#ihChatEmojiPicker');
    const micBtn = panel.querySelector('#ihChatMicBtn');
    const recTimer = panel.querySelector('#ihChatRecTimer');
    const dot = launcher.querySelector('#ihChatDot');
    const launcherIcon = launcher.querySelector('#ihChatLauncherIcon');

    // Seed the conversation with a greeting the very first time a visitor opens the widget.
    if (!loadMessages().length) {
      saveMessages([{ from: 'bot', key: 'chat.greeting', ts: Date.now() }]);
    }
    // Unread nudge shown once, until the widget is opened for the first time on this browser.
    if (!localStorage.getItem(SEEN_KEY)) dot.hidden = false;

    function open() {
      panel.hidden = false;
      dot.hidden = true;
      localStorage.setItem(SEEN_KEY, '1');
      launcherIcon.className = 'fi fi-sr-cross-small';
      launcher.setAttribute('aria-label', 'Close live chat');
      renderMessages(body);
      input.focus();
    }

    function close() {
      panel.hidden = true;
      moreMenu.classList.remove('open');
      launcherIcon.className = 'fi fi-sr-comment-alt';
      launcher.setAttribute('aria-label', 'Open live chat');
    }

    launcher.addEventListener('click', () => {
      if (panel.hidden) open(); else close();
    });
    closeBtn.addEventListener('click', close);

    moreBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      moreMenu.classList.toggle('open');
    });
    document.addEventListener('click', (e) => {
      if (!moreMenu.contains(e.target) && e.target !== moreBtn) moreMenu.classList.remove('open');
    });

    newConvoBtn.addEventListener('click', () => {
      saveMessages([{ from: 'bot', key: 'chat.greeting', ts: Date.now() }]);
      renderMessages(body);
      moreMenu.classList.remove('open');
    });

    downloadBtn.addEventListener('click', () => {
      downloadTranscript();
      moreMenu.classList.remove('open');
    });

    panel.querySelectorAll('.ih-chat-chip').forEach((chip) => {
      chip.addEventListener('click', () => {
        const id = chip.getAttribute('data-qr');
        const qr = QUICK_REPLIES.find((q) => q.id === id);
        const messages = loadMessages();
        messages.push({ from: 'user', text: t(qr.key), ts: Date.now() });
        saveMessages(messages);
        renderMessages(body);
        pushBotReply(body, CANNED_REPLY[id]);
      });
    });

    function sendText() {
      const text = input.value.trim();
      if (!text) return;
      const messages = loadMessages();
      messages.push({ from: 'user', text: text, ts: Date.now() });
      saveMessages(messages);
      input.value = '';
      input.style.height = '';
      renderMessages(body);
      pushBotReply(body, CANNED_REPLY.fallback);
    }

    sendBtn.addEventListener('click', sendText);
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendText();
      }
    });
    input.addEventListener('input', () => {
      input.style.height = 'auto';
      input.style.height = Math.min(input.scrollHeight, 90) + 'px';
    });

    // Emoji picker — inserts at the cursor position, keeps focus in the textarea.
    emojiBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      emojiPicker.classList.toggle('open');
    });
    emojiPicker.querySelectorAll('button[data-emoji]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const emoji = btn.getAttribute('data-emoji');
        const start = input.selectionStart || input.value.length;
        const end = input.selectionEnd || input.value.length;
        input.value = input.value.slice(0, start) + emoji + input.value.slice(end);
        input.focus();
        input.selectionStart = input.selectionEnd = start + emoji.length;
        emojiPicker.classList.remove('open');
      });
    });
    document.addEventListener('click', (e) => {
      if (!emojiPicker.contains(e.target) && e.target !== emojiBtn) emojiPicker.classList.remove('open');
    });

    // Voice recorder — records via MediaRecorder, stores the clip as a data: URL
    // (localStorage can't hold a live Blob across reloads, so it's converted to base64).
    let mediaRecorder = null;
    let recordedChunks = [];
    let recTimerInterval = null;
    let recSeconds = 0;

    function stopRecordingUI() {
      micBtn.classList.remove('recording');
      micBtn.innerHTML = '<i class="fi fi-sr-microphone"></i>';
      recTimer.hidden = true;
      clearInterval(recTimerInterval);
      recSeconds = 0;
    }

    function startRecording() {
      navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
        recordedChunks = [];
        mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.ondataavailable = (e) => { if (e.data.size > 0) recordedChunks.push(e.data); };
        mediaRecorder.onstop = () => {
          stream.getTracks().forEach((track) => track.stop());
          const blob = new Blob(recordedChunks, { type: 'audio/webm' });
          const reader = new FileReader();
          reader.onload = () => {
            const messages = loadMessages();
            messages.push({ from: 'user', kind: 'audio', audioUrl: reader.result, ts: Date.now() });
            saveMessages(messages);
            renderMessages(body);
            pushBotReply(body, 'chat.reply.voice');
          };
          reader.readAsDataURL(blob);
        };
        mediaRecorder.start();
        micBtn.classList.add('recording');
        micBtn.innerHTML = '<i class="fi fi-sr-cross-small"></i>';
        recTimer.hidden = false;
        recTimer.textContent = '0:00';
        recSeconds = 0;
        recTimerInterval = setInterval(() => {
          recSeconds += 1;
          const m = Math.floor(recSeconds / 60);
          const s = String(recSeconds % 60).padStart(2, '0');
          recTimer.textContent = m + ':' + s;
          if (recSeconds >= MAX_RECORDING_SECONDS) micBtn.click();
        }, 1000);
      }).catch(() => {
        const messages = loadMessages();
        messages.push({ from: 'bot', key: 'chat.micDenied', ts: Date.now() });
        saveMessages(messages);
        renderMessages(body);
      });
    }

    micBtn.addEventListener('click', () => {
      if (mediaRecorder && mediaRecorder.state === 'recording') {
        mediaRecorder.stop();
        stopRecordingUI();
      } else {
        startRecording();
      }
    });

    // Re-apply translations for the just-built markup — the page's own
    // DOMContentLoaded i18n pass already ran before this widget existed.
    if (window.I18N) window.I18N.apply(window.I18N.currentLang());
    document.addEventListener('ih:langchange', () => renderMessages(body));
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
