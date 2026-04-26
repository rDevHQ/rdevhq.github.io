const navItems = Array.from(document.querySelectorAll("[data-panel]"));
const panels = Array.from(document.querySelectorAll(".panel"));
const panelLinks = Array.from(document.querySelectorAll("[data-link-panel]"));

function showPanel(panelId, updateHash = true) {
  const targetPanel = panels.find((panel) => panel.id === panelId) ?? panels[0];

  panels.forEach((panel) => {
    panel.classList.toggle("is-active", panel === targetPanel);
  });

  navItems.forEach((item) => {
    const isActive = item.dataset.panel === targetPanel.id;
    item.classList.toggle("is-active", isActive);
    item.setAttribute("aria-current", isActive ? "page" : "false");
  });

  if (updateHash) {
    history.replaceState(null, "", `#${targetPanel.id}`);
  }
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
