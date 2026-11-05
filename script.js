// Payment route tabs
(function () {
  const tabs = Array.from(document.querySelectorAll('.route-tabs [role="tab"]'));
  function select(tab) {
    tabs.forEach((t) => {
      const on = t === tab;
      t.setAttribute('aria-selected', on);
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
    });
  }
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => select(t));
    t.addEventListener('keydown', (e) => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      const next = tabs[(i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length];
      select(next); next.focus();
    });
  });
})();

// Expandable panels ("¿Qué viene después de marzo?", opcionales)
document.querySelectorAll('button[aria-controls][data-open]').forEach((btn) => {
  const panel = document.getElementById(btn.getAttribute('aria-controls'));
  if (!panel) return;
  btn.addEventListener('click', () => {
    const open = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!open));
    btn.textContent = open ? btn.dataset.closed : btn.dataset.open;
    panel.hidden = open;
  });
});
