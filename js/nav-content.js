// NAV CONTENT RENDERER — draws the "iHealthAcademy" dropdown into the
// #academyDropdownMenu placeholder that ships in every page's header, reading
// from window.IH_CONTENT (js/site-content.js). Re-renders on language change.
// This is the ONLY file that needs js/site-content.js edits to reach every page —
// no per-page HTML changes are needed to add/remove/reorder dropdown items.
(function () {
  function lang() {
    return (window.I18N && window.I18N.currentLang) ? window.I18N.currentLang() : 'en';
  }

  function t(key, fallback) {
    const dict = (window.I18N && window.I18N.dict) ? window.I18N.dict() : {};
    return dict[key] ? (dict[key][lang()] || dict[key].en) : fallback;
  }

  function itemHtml(item) {
    const title = item.titleKey ? t(item.titleKey, item.title || '') : (item.title || '');
    const sub = item.subKey ? t(item.subKey, item.sub || '') : (item.sub || '');
    const badgeText = item.badge === 'live' ? t('badge.live', 'LIVE') : t('badge.soon', 'COMING SOON');
    const style = item.highlight ? ' style="background:var(--primary-tint); margin-bottom:6px;"' : '';
    const inner =
      '<div><div class="ddi-title">' + title + '</div><div class="ddi-sub">' + sub + '</div></div>' +
      '<span class="badge ' + item.badge + '">' + badgeText + '</span>';
    return item.href
      ? '<a class="ddi" href="' + item.href + '"' + style + '>' + inner + '</a>'
      : '<div class="ddi ddi-disabled"' + style + '>' + inner + '</div>';
  }

  function render() {
    const menu = document.getElementById('academyDropdownMenu');
    if (!menu || !window.IH_CONTENT) return;
    menu.innerHTML = window.IH_CONTENT.dropdown.map(itemHtml).join('');
  }

  render();
  document.addEventListener('ih:langchange', render);
})();
