// SITE CONTENT — single source of truth for the "iHealthAcademy" nav dropdown that
// appears on every page. Add, remove, reorder, or flip an item between "Coming Soon"
// and "Live" by editing THIS array only — no page's HTML needs to change, and no new
// page needs to be added just to announce something is coming.
//
// Each item:
//   href    — the page to link to, or null while it's still "Coming Soon"
//   badge   — 'live' or 'soon'
//   highlight (optional) — true to give it the tinted "featured" row style
//   Text can come from EITHER:
//     titleKey / subKey — a translated key already in js/i18n.js's SHARED dict (bilingual)
//     title / sub       — plain text used as-is (fastest way to add something new;
//                         add titleKey/subKey later if/when you want an Arabic translation)
window.IH_CONTENT = {
  dropdown: [
    { titleKey: 'nav.dd.findpath.title', subKey: 'nav.dd.findpath.sub', href: 'find-your-path.html', badge: 'live', highlight: true },
    { titleKey: 'nav.dd.insurance.title', subKey: 'nav.dd.insurance.sub', href: 'insurance-dept.html', badge: 'live' },
    { titleKey: 'nav.dd.managers.title', subKey: 'nav.dd.managers.sub', href: null, badge: 'soon' },
    { titleKey: 'nav.dd.specialties.title', subKey: 'nav.dd.specialties.sub', href: 'radiology-dept.html', badge: 'live' },
    { titleKey: 'nav.dd.mentor.title', subKey: 'nav.dd.mentor.sub', href: null, badge: 'soon' },
    { titleKey: 'nav.dd.supporters.title', subKey: 'nav.dd.supporters.sub', href: null, badge: 'soon' },
    { titleKey: 'nav.dd.cofounders.title', subKey: 'nav.dd.cofounders.sub', href: 'join-team.html', badge: 'live' },
  ],
  leadershipDropdown: [
    { titleKey: 'nav.dd.founder.title', subKey: 'nav.dd.founder.sub', href: 'founder.html', badge: 'live', highlight: true },
    { titleKey: 'nav.dd.execleadership.title', subKey: 'nav.dd.execleadership.sub', href: 'leadership-bubbles.html', badge: 'live' },
    { titleKey: 'nav.dd.advisors.title', subKey: 'nav.dd.advisors.sub', href: null, badge: 'soon' },
    { titleKey: 'nav.dd.directors.title', subKey: 'nav.dd.directors.sub', href: null, badge: 'soon' },
    { titleKey: 'nav.dd.foundingteam.title', subKey: 'nav.dd.foundingteam.sub', href: 'join-team.html', badge: 'live' },
  ],
};
