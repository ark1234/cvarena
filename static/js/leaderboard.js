// Sortable leaderboard with placeholder rows.
// Replace the LEADERBOARD_DATA array with real numbers from your eval pipeline.

const LEADERBOARD_DATA = [
  // { rank, model, type, elo, winRate, judgeScore }
  { model: "CV-Agent (ours)",     type: "agentic",     elo: 1287, winRate: 71.2, judgeScore: 0.812 },
  { model: "GPT-Image-1",         type: "proprietary", elo: 1241, winRate: 64.5, judgeScore: 0.778 },
  { model: "Gemini-2.5-Flash-Img",type: "proprietary", elo: 1218, winRate: 60.9, judgeScore: 0.751 },
  { model: "Imagen-3-Edit",       type: "proprietary", elo: 1196, winRate: 58.1, judgeScore: 0.733 },
  { model: "FLUX.1-Kontext",      type: "open",        elo: 1174, winRate: 54.6, judgeScore: 0.709 },
  { model: "Step1X-Edit",         type: "open",        elo: 1153, winRate: 51.3, judgeScore: 0.684 },
  { model: "OmniGen2",            type: "open",        elo: 1142, winRate: 49.7, judgeScore: 0.671 },
  { model: "SeedEdit-3.0",        type: "proprietary", elo: 1129, winRate: 47.4, judgeScore: 0.658 },
  { model: "Qwen-Image-Edit",     type: "open",        elo: 1108, winRate: 44.0, judgeScore: 0.631 },
  { model: "MagicBrush",          type: "open",        elo: 1052, winRate: 36.2, judgeScore: 0.573 },
  { model: "InstructPix2Pix",     type: "open",        elo: 998,  winRate: 28.5, judgeScore: 0.512 },
];

const COLUMNS = [
  { key: "rank",       label: "#",              type: "num",  sortable: false, render: (_, i) => `<span class="rank">${i + 1}</span>` },
  { key: "model",      label: "Model",          type: "str",  sortable: true,  render: v => `<span class="model">${v}</span>` },
  { key: "type",       label: "Type",           type: "str",  sortable: true,  render: v => `<span class="tag ${v === 'open' ? 'open' : v === 'agentic' ? 'agentic' : ''}">${v}</span>` },
  { key: "elo",        label: "Active Elo ↑",   type: "num",  sortable: true,  render: v => `<span class="num">${v}</span>` },
  { key: "winRate",    label: "Win Rate (%) ↑", type: "num",  sortable: true,  render: v => `<span class="num">${v.toFixed(1)}</span>` },
  { key: "judgeScore", label: "CV-Judge ↑",     type: "num",  sortable: true,  render: v => `<span class="num">${v.toFixed(3)}</span>` },
];

let sortState = { key: "elo", dir: "desc" };

function renderLeaderboard() {
  const sorted = [...LEADERBOARD_DATA].sort((a, b) => {
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

  const tbody = `<tbody>${sorted.map((row, i) =>
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
        sortState.dir = col.type === "num" ? "desc" : "asc";
      }
      renderLeaderboard();
    });
  });
}

document.addEventListener("DOMContentLoaded", renderLeaderboard);
