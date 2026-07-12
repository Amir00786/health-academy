// MENTOR DIRECTORY + MATCHING — shared, localStorage-only helpers.
// This is scoped to a single browser: there is no backend, so a mentor and a
// student only "match" if they're using the same browser (e.g. testing the
// flow yourself). Real cross-device matching between different people's
// devices needs a real backend — this demonstrates the intended workflow:
// admin approves a mentor -> mentor appears in the student-facing directory ->
// student selects a mentor -> the mentor dashboard shows who selected them.
window.IH_MENTORS = (function () {
  const DIRECTORY_KEY = 'ih-approved-mentors';
  const SELECTION_KEY = 'ih-student-mentor-selection';
  const PROFILE_KEY = 'ih-mentor-profile';

  function getDirectory() {
    try {
      return JSON.parse(localStorage.getItem(DIRECTORY_KEY)) || [];
    } catch (e) {
      return [];
    }
  }

  function saveDirectory(list) {
    localStorage.setItem(DIRECTORY_KEY, JSON.stringify(list));
  }

  function upsertMentor(entry) {
    const list = getDirectory();
    const idx = list.findIndex((m) => m.id === entry.id);
    if (idx >= 0) list[idx] = entry; else list.push(entry);
    saveDirectory(list);
  }

  function removeMentor(id) {
    saveDirectory(getDirectory().filter((m) => m.id !== id));
  }

  function getSelection() {
    try {
      return JSON.parse(localStorage.getItem(SELECTION_KEY));
    } catch (e) {
      return null;
    }
  }

  function selectMentor(mentor) {
    localStorage.setItem(SELECTION_KEY, JSON.stringify({ mentorId: mentor.id, mentorName: mentor.name, ts: Date.now() }));
  }

  function clearSelection() {
    localStorage.removeItem(SELECTION_KEY);
  }

  function getOwnProfile() {
    try {
      return JSON.parse(localStorage.getItem(PROFILE_KEY));
    } catch (e) {
      return null;
    }
  }

  function saveOwnProfile(profile) {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
    upsertMentor(Object.assign({}, profile, { source: 'self' }));
  }

  return { getDirectory, upsertMentor, removeMentor, getSelection, selectMentor, clearSelection, getOwnProfile, saveOwnProfile };
})();
