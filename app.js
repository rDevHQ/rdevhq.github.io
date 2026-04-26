const navItems = Array.from(document.querySelectorAll("[data-panel]"));
const panels = Array.from(document.querySelectorAll(".panel"));
const panelLinks = Array.from(document.querySelectorAll("[data-link-panel]"));

function getPanelId(panel) {
  return panel.dataset.panelId;
}

function showPanel(panelId, updateHash = true) {
  const normalizedPanelId = panelId === "sharing" ? "rrepodocs" : panelId;
  const targetPanel = panels.find((panel) => getPanelId(panel) === normalizedPanelId) ?? panels[0];
  const targetPanelId = getPanelId(targetPanel);

  panels.forEach((panel) => {
    panel.classList.toggle("is-active", panel === targetPanel);
  });

  navItems.forEach((item) => {
    const isActive = item.dataset.panel === targetPanelId;
    item.classList.toggle("is-active", isActive);
    item.setAttribute("aria-current", isActive ? "page" : "false");
  });

  if (updateHash || panelId !== normalizedPanelId) {
    history.replaceState(null, "", `#${targetPanelId}`);
  }

  requestAnimationFrame(() => {
    window.scrollTo({ top: 0, left: 0 });
  });
  window.setTimeout(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, 30);
}

navItems.forEach((item) => {
  item.addEventListener("click", () => showPanel(item.dataset.panel));
});

panelLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    showPanel(link.dataset.linkPanel);
  });
});

window.addEventListener("hashchange", () => {
  showPanel(location.hash.replace("#", "") || "overview", false);
});

showPanel(location.hash.replace("#", "") || "overview", false);
