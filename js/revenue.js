// REVENUE PROVIDER — the Owner Console's Revenue/KPI panels only ever call the
// functions returned below (getSummary / getTransactions / importCSV). V1 implements
// them on top of a manually-imported PayPal CSV export, cached in localStorage. When
// a real PayPal/Stripe API is ready, only this file needs to change (e.g. getSummary
// and getTransactions fetch from that API instead of reading localStorage) — admin.html
// and admin.js keep calling the same function names, so the dashboard layout never
// needs to be redesigned.
window.IH_REVENUE = (function () {
  const TRANSACTIONS_KEY = 'ih-revenue-transactions';

  function getTransactions() {
    try {
      return JSON.parse(localStorage.getItem(TRANSACTIONS_KEY)) || [];
    } catch (e) {
      return [];
    }
  }

  function saveTransactions(list) {
    localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(list));
  }

  function planFor(itemTitle) {
    const title = (itemTitle || '').toLowerCase();
    if (title.indexOf('institution') >= 0) return 'Institution';
    if (title.indexOf('pro') >= 0) return 'Pro';
    return 'Free';
  }

  // Minimal RFC4180-style CSV parser — handles quoted fields containing commas/newlines,
  // which PayPal's "Item Title" / "Note" columns often do.
  function parseCSV(text) {
    const rows = [];
    let row = [], field = '', inQuotes = false;
    for (let i = 0; i < text.length; i++) {
      const c = text[i];
      if (inQuotes) {
        if (c === '"') {
          if (text[i + 1] === '"') { field += '"'; i++; } else { inQuotes = false; }
        } else field += c;
      } else if (c === '"') {
        inQuotes = true;
      } else if (c === ',') {
        row.push(field); field = '';
      } else if (c === '\n' || c === '\r') {
        if (c === '\r' && text[i + 1] === '\n') i++;
        row.push(field); field = '';
        if (row.length > 1 || row[0] !== '') rows.push(row);
        row = [];
      } else {
        field += c;
      }
    }
    if (field !== '' || row.length) { row.push(field); rows.push(row); }
    return rows;
  }

  function findCol(headers, candidates) {
    for (const c of candidates) {
      const idx = headers.findIndex((h) => h.trim().toLowerCase() === c);
      if (idx >= 0) return idx;
    }
    return -1;
  }

  // Accepts the raw text of a PayPal "Activity" CSV export and replaces the cached
  // transaction list with whatever completed payments it finds.
  function importCSV(text) {
    const rows = parseCSV(text);
    if (!rows.length) return { imported: 0 };
    const headers = rows[0];
    const dateCol = findCol(headers, ['date']);
    const nameCol = findCol(headers, ['name']);
    const emailCol = findCol(headers, ['from email address', 'email', "buyer's email"]);
    const statusCol = findCol(headers, ['status']);
    const grossCol = findCol(headers, ['gross', 'gross amount', 'amount']);
    const currencyCol = findCol(headers, ['currency']);
    const itemCol = findCol(headers, ['item title', 'subject', 'description', 'item']);

    const transactions = [];
    for (let i = 1; i < rows.length; i++) {
      const r = rows[i];
      if (!r || r.every((f) => f === '')) continue;
      const statusRaw = statusCol >= 0 ? (r[statusCol] || '') : '';
      if (statusRaw && !/completed|success/i.test(statusRaw)) continue;
      const gross = grossCol >= 0 ? parseFloat((r[grossCol] || '0').replace(/[^0-9.\-]/g, '')) : 0;
      if (!gross || gross <= 0) continue;
      transactions.push({
        date: dateCol >= 0 ? r[dateCol] : '',
        name: nameCol >= 0 ? r[nameCol] : '',
        email: emailCol >= 0 ? r[emailCol] : '',
        amount: gross,
        currency: currencyCol >= 0 ? (r[currencyCol] || 'USD') : 'USD',
        plan: planFor(itemCol >= 0 ? r[itemCol] : ''),
        status: statusRaw || 'Completed',
      });
    }
    saveTransactions(transactions);
    return { imported: transactions.length };
  }

  // Shape any future provider (PayPal/Stripe API) must also return from getSummary():
  // { paidMembers, mrr, revenueByPlan: {Free, Pro, Institution}, currency, hasData }
  function getSummary() {
    const transactions = getTransactions();
    const revenueByPlan = { Free: 0, Pro: 0, Institution: 0 };
    const payerEmails = new Set();
    let mrr = 0;
    transactions.forEach((t) => {
      revenueByPlan[t.plan] = (revenueByPlan[t.plan] || 0) + t.amount;
      if (t.email) payerEmails.add(t.email);
      if (t.plan !== 'Free') mrr += t.amount;
    });
    return {
      paidMembers: payerEmails.size,
      mrr,
      revenueByPlan,
      currency: transactions[0] ? transactions[0].currency : 'USD',
      hasData: transactions.length > 0,
    };
  }

  return { getSummary, getTransactions, importCSV };
})();
