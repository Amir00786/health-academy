/* PRE-AUTH CERTIFICATE — name entry -> final check -> printable certificate.
   Once confirmed, the record locks in localStorage so re-visiting the page
   (or reloading) always shows the same certificate instead of a blank form. */
(function () {
  const INSTRUCTOR_NAME = "Dr. Musab M. Ahmed";
  const CEO_NAME = "Dr. Musab M. Ahmed";
  const STORAGE_KEY = "ih-preauth-certificate";

  const stages = {
    name: document.getElementById("nameStage"),
    confirm: document.getElementById("confirmStage"),
    cert: document.getElementById("certStage"),
  };

  function showStage(key) {
    Object.keys(stages).forEach(k => stages[k].classList.toggle("hidden", k !== key));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function formatDate(iso) {
    if (!iso) return "—";
    const d = new Date(iso + "T00:00:00");
    if (isNaN(d)) return iso;
    return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  }

  function todayIso() {
    return new Date().toISOString().slice(0, 10);
  }

  function generateSerial(name, examDate) {
    const seed = (name || "") + "|" + (examDate || "") + "|" + Date.now();
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
    }
    return "IH-PA-" + hash.toString(36).toUpperCase().slice(0, 6);
  }

  function renderCertificate(record) {
    document.getElementById("certName").textContent = record.name;
    document.getElementById("certExamDate").textContent = formatDate(record.examDate);
    document.getElementById("certIssueDate").textContent = formatDate(record.issueDate);
    document.getElementById("instructorName").textContent = INSTRUCTOR_NAME;
    document.getElementById("ceoName").textContent = CEO_NAME;
    document.getElementById("certSerial").textContent = record.serial;
    showStage("cert");
  }

  function loadRecord() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  function saveRecord(record) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
    } catch (e) { /* ignore */ }
  }

  function lockIn(name, examDate) {
    const record = {
      name: name,
      examDate: examDate,
      issueDate: todayIso(),
      serial: generateSerial(name, examDate),
    };
    saveRecord(record);
    renderCertificate(record);
  }

  /* ---------------- init ---------------- */
  const existing = loadRecord();
  if (existing) {
    renderCertificate(existing);
  } else {
    const params = new URLSearchParams(window.location.search);
    const prefillName = (params.get("name") || "").trim();
    const prefillDate = params.get("examDate") || "";

    const nameInput = document.getElementById("nameInput");
    const examDateInput = document.getElementById("examDateInput");
    examDateInput.max = todayIso();

    if (prefillName && prefillDate) {
      nameInput.value = prefillName;
      examDateInput.value = prefillDate;
      document.getElementById("confirmNamePreview").textContent = prefillName;
      document.getElementById("confirmDatePreview").textContent = formatDate(prefillDate);
      showStage("confirm");
    } else {
      if (prefillName) nameInput.value = prefillName;
      if (prefillDate) examDateInput.value = prefillDate;
      showStage("name");
    }

    document.getElementById("reviewNameBtn").addEventListener("click", () => {
      const name = nameInput.value.trim();
      const examDate = examDateInput.value;
      if (!name) { alert("Please enter your name."); return; }
      if (!examDate) { alert("Please select the date you took the exam."); return; }
      document.getElementById("confirmNamePreview").textContent = name;
      document.getElementById("confirmDatePreview").textContent = formatDate(examDate);
      showStage("confirm");
    });

    document.getElementById("editNameBtn").addEventListener("click", () => showStage("name"));

    document.getElementById("confirmNameBtn").addEventListener("click", () => {
      lockIn(nameInput.value.trim(), examDateInput.value);
    });
  }

  document.getElementById("printBtn").addEventListener("click", () => window.print());
})();
