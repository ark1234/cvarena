// Render the CV-Arena leaderboard with tab switcher (Active Elo / Human / CV-Judge / EditReward).
// Data lives in leaderboard_data.js as `LEADERBOARD` and `MODEL_TYPE`.

let currentSetting = "active_elo";
let sortState = { key: "elo", dir: "desc" };

const COLUMNS = [
  { key: "rank",  label: "#",        sortable: false, render: (_, i) => `<span class="rank">${i + 1}</span>` },
  { key: "model", label: "Model",    sortable: true,  render: v => `<span class="model">${v}</span>` },
  { key: "type",  label: "Type",     sortable: true,  render: v => {
      const cls = v === "open" ? "open" : v === "agentic" ? "agentic" : "";
      return `<span class="tag ${cls}">${v}</span>`;
    }},
  { key: "elo",   label: "Elo ↑",    sortable: true,  render: v => `<span class="num">${v}</span>` },
  { key: "ci",    label: "95% CI",   sortable: false, render: (_, __, row) => `<span class="num muted">+${row.ciHi}/&minus;${row.ciLo}</span>` },
];

function buildRows(setting) {
  return LEADERBOARD.rows[setting].map(r => ({
    ...r,
    type: MODEL_TYPE[r.model] || "—",
  }));
}

function renderTabs() {
  const tabs = LEADERBOARD.settings.map(s =>
    `<button class="tab-btn ${s === currentSetting ? "active" : ""}" data-setting="${s}">${LEADERBOARD.labels[s]}</button>`
  ).join("");
  document.getElementById("leaderboard-tabs").innerHTML = tabs;
  document.querySelectorAll("#leaderboard-tabs .tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      currentSetting = btn.dataset.setting;
      sortState = { key: "elo", dir: "desc" };
      renderTabs();
      renderTable();
    });
  });
}

function renderTable() {
  const rows = buildRows(currentSetting);
  rows.sort((a, b) => {
    const av = a[sortState.key], bv = b[sortState.key];
    if (typeof av === "number") return sortState.dir === "asc" ? av - bv : bv - av;
    return sortState.dir === "asc" ? String(av).localeCompare(String(bv)) : String(bv).localeCompare(String(av));
  });

  const thead = `<thead><tr>${COLUMNS.map(c => {
    const cls = c.sortable && sortState.key === c.key
      ? (sortState.dir === "asc" ? "sorted-asc" : "sorted-desc")
      : "";
    const arrow = c.sortable ? `<span class="arrow">${sortState.key === c.key ? (sortState.dir === "asc" ? "▲" : "▼") : "↕"}</span>` : "";
    return `<th data-key="${c.key}" class="${cls}" ${c.sortable ? '' : 'style="cursor:default"'}>${c.label}${arrow}</th>`;
  }).join("")}</tr></thead>`;

  const tbody = `<tbody>${rows.map((row, i) =>
    `<tr>${COLUMNS.map(c => `<td>${c.render(row[c.key], i, row)}</td>`).join("")}</tr>`
  ).join("")}</tbody>`;

  document.getElementById("leaderboard").innerHTML = thead + tbody;

  document.querySelectorAll("#leaderboard thead th").forEach(th => {
    const key = th.getAttribute("data-key");
    const col = COLUMNS.find(c => c.key === key);
    if (!col || !col.sortable) return;
    th.addEventListener("click", () => {
      if (sortState.key === key) {
        sortState.dir = sortState.dir === "asc" ? "desc" : "asc";
      } else {
        sortState.key = key;
        sortState.dir = key === "model" || key === "type" ? "asc" : "desc";
      }
      renderTable();
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderTabs();
  renderTable();
});
