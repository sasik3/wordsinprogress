const STORAGE_KEY = "worksInProgress";
const FUTURE_KEY = "futureWorks";
function getWips() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
}
function saveWips(wips) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(wips));
}
function getFutures() {
  return JSON.parse(localStorage.getItem(FUTURE_KEY) || "[]");
}
function saveFutures(futures) {
  localStorage.setItem(FUTURE_KEY, JSON.stringify(futures));
}
function render() {
  const wips = getWips();
  const list = document.getElementById("wipList");
  list.innerHTML = "";
  wips.forEach((wip, index) => {
    const pct = wip.goal > 0 ? Math.min(100, Math.round((wip.words / wip.goal) * 100)) : 0;
    const card = document.createElement("div");
    card.className = "wipCard";
    card.innerHTML = `
      <div class="wipHeader">
        <span class="wipName">${wip.title}</span>
        <button class="deleteBtn" data-index="${index}">✕</button>
      </div>
      <div class="wipBarTrack">
        <div class="wipBarFill" style="width:${pct}%"></div>
      </div>
      <div class="wipStats">${wip.words} / ${wip.goal} words (${pct}%)</div>
    `;
    list.appendChild(card);
  });
  list.querySelectorAll(".deleteBtn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const wips = getWips();
      wips.splice(Number(e.target.dataset.index), 1);
      saveWips(wips);
      render();
    });
  });
}
document.getElementById("addWip").addEventListener("click", () => {
  const title = document.getElementById("titleInput").value.trim();
  const words = Number(document.getElementById("wipWords").value) || 0;
  const goal = Number(document.getElementById("wipGoal").value) || 0;
  if (!title) return;
  const wips = getWips();
  wips.push({ title, words, goal });
  saveWips(wips);
  document.getElementById("titleInput").value = "";
  document.getElementById("wipWords").value = "";
  document.getElementById("wipGoal").value = "";
  render();
});
function renderFuture() {
  const futures = getFutures();
  const list = document.getElementById("futureList");
  list.innerHTML = "";
  futures.forEach((item, index) => {
    const card = document.createElement("div");
    card.className = "wipCard";
    card.innerHTML = `
      <div class="wipHeader">
        <span class="wipName">${item.title}</span>
        <button class="deleteBtn" data-index="${index}">✕</button>
      </div>
    `;
    list.appendChild(card);
  });
  list.querySelectorAll(".deleteBtn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const futures = getFutures();
      futures.splice(Number(e.target.dataset.index), 1);
      saveFutures(futures);
      renderFuture();
    });
  });
}
document.getElementById("addFuture").addEventListener("click", () => {
  const title = document.getElementById("futureTitleInput").value.trim();
  if (!title) return;
  const futures = getFutures();
  futures.push({ title });
  saveFutures(futures);
  document.getElementById("futureTitleInput").value = "";
  renderFuture();
});
render();
renderFuture();
