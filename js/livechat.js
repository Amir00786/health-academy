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
    launcher.innerHTML = '<i class="fi fi-sr-comment-alt"></i><span class="ih-chat-dot" id="ihChatDot" hidden></span>';

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
        '<button type="button" class="ih-chat-close" id="ihChatClose" aria-label="Close chat"><i class="fi fi-sr-cross-small"></i></button>' +
      '</div>' +
      '<div class="ih-chat-body" id="ihChatBody"></div>' +
      '<div class="ih-chat-quick" id="ihChatQuick">' +
        QUICK_REPLIES.map((qr) => '<button type="button" class="ih-chat-chip" data-qr="' + qr.id + '" data-i18n="' + qr.key + '"></button>').join('') +
      '</div>' +
      '<form class="ih-chat-inputrow" id="ihChatForm">' +
        '<input type="text" class="ih-chat-input" id="ihChatInput" data-i18n-ph="chat.placeholder" autocomplete="off" />' +
        '<button type="submit" class="ih-chat-send" aria-label="Send"><i class="fi fi-sr-paper-plane"></i></button>' +
      '</form>';

    document.body.appendChild(launcher);
    document.body.appendChild(panel);

    return { launcher, panel };
  }

  function renderMessages(body) {
    const messages = loadMessages();
    body.innerHTML = '';
    messages.forEach((msg) => {
      const row = document.createElement('div');
      row.className = 'ih-chat-msg ' + msg.from;
      const bubble = document.createElement('div');
      bubble.className = 'ih-chat-bubble';
      bubble.innerHTML = msg.from === 'bot' ? t(msg.key) : escapeHtml(msg.text);
      row.appendChild(bubble);
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

  function init() {
    const { launcher, panel } = buildWidget();
    const body = panel.querySelector('#ihChatBody');
    const closeBtn = panel.querySelector('#ihChatClose');
    const form = panel.querySelector('#ihChatForm');
    const input = panel.querySelector('#ihChatInput');
    const dot = launcher.querySelector('#ihChatDot');

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
      renderMessages(body);
      input.focus();
    }

    function close() {
      panel.hidden = true;
    }

    launcher.addEventListener('click', () => {
      if (panel.hidden) open(); else close();
    });
    closeBtn.addEventListener('click', close);

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

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = input.value.trim();
      if (!text) return;
      const messages = loadMessages();
      messages.push({ from: 'user', text: text, ts: Date.now() });
      saveMessages(messages);
      input.value = '';
      renderMessages(body);
      pushBotReply(body, CANNED_REPLY.fallback);
    });

    // Re-apply translations for the just-built markup — the page's own
    // DOMContentLoaded i18n pass already ran before this widget existed.
    if (window.I18N) window.I18N.apply(window.I18N.currentLang());
    document.addEventListener('ih:langchange', () => renderMessages(body));
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
