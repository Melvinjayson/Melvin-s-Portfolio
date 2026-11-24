/* Progressive enhancement only. Every page works without this file. */
(() => {
  const root = document.documentElement;
  root.classList.remove('no-js');

  // Theme toggle — preference persisted per viewer; falls back to OS setting.
  const toggle = document.querySelector('[data-theme-toggle]');
  const label = () => {
    if (!toggle) return;
    const dark = root.dataset.theme === 'dark';
    toggle.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
    toggle.setAttribute('aria-pressed', String(dark));
  };
  label();
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const syncThemeColor = () => {
    const c = getComputedStyle(root).getPropertyValue('--bg').trim();
    document.querySelectorAll('meta[name="theme-color"]').forEach((m) => { m.content = c; m.removeAttribute('media'); });
  };
  if (localStorage.getItem?.('mj-theme')) syncThemeColor();
  const applyTheme = () => {
    // Suppress per-element colour transitions so the theme changes as one surface, not a cascade.
    root.classList.add('theme-instant');
    requestAnimationFrame(() => requestAnimationFrame(() => root.classList.remove('theme-instant')));
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem('mj-theme', root.dataset.theme); } catch (e) {}
    label(); syncThemeColor();
  };
  // Theme switch: a 220ms crossfade via a same-document view transition.
  // Instant when reduced motion is requested or the API is missing.
  toggle?.addEventListener('click', () => {
    if (!document.startViewTransition || reduce.matches) return applyTheme();
    root.classList.add('theme-vt');
    const vt = document.startViewTransition(applyTheme);
    vt.finished.finally(() => root.classList.remove('theme-vt'));
  });
  // The hero entrance runs once per session; clear the class so it never replays mid-visit.
  if (root.classList.contains('intro')) setTimeout(() => root.classList.remove('intro'), 1200);

  // Mobile navigation
  const menu = document.querySelector('[data-menu-toggle]');
  const nav = document.getElementById('site-nav');
  const closeMenu = () => { nav?.classList.remove('is-open'); menu?.setAttribute('aria-expanded', 'false'); };
  menu?.addEventListener('click', () => {
    const open = !nav.classList.contains('is-open');
    nav.classList.toggle('is-open', open);
    menu.setAttribute('aria-expanded', String(open));
    if (open) nav.querySelector('a')?.focus();
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && nav?.classList.contains('is-open')) { closeMenu(); menu.focus(); } });
  nav?.addEventListener('click', (e) => { if (e.target.closest('a')) closeMenu(); });

  // Contact form — posts JSON to /api/contact; plain email fallback always shown.
  const form = document.querySelector('[data-contact-form]');
  if (form) {
    const status = form.querySelector('[data-form-status]');
    const send = form.querySelector('[type=submit]');
    const reason = form.querySelector('[name=service]');
    const params = new URLSearchParams(location.search);
    const preset = params.get('service');
    if (preset && [...reason.options].some((o) => o.value === preset)) reason.value = preset;
    form.querySelector('[name=startedAt]').value = String(Date.now());
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!form.reportValidity()) return;
      send.disabled = true; send.textContent = 'Sending…';
      status.dataset.state = 'progress'; status.textContent = 'Sending your message…';
      const data = Object.fromEntries(new FormData(form).entries());
      data.consent = form.querySelector('[name=consent]').checked;
      try {
        const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
        const out = await res.json().catch(() => ({}));
        if (!res.ok || !out.ok) throw new Error(out.error || 'The message could not be sent.');
        status.dataset.state = 'success'; status.textContent = 'Sent. Thank you — I will reply by email.';
        form.reset(); form.querySelector('[name=startedAt]').value = String(Date.now());
      } catch (err) {
        status.dataset.state = 'error';
        status.textContent = (err.message || 'Unable to send.') + ' You can email melvinogbalu@gmail.com directly.';
      } finally { send.disabled = false; send.textContent = 'Send message'; }
    });
  }
})();
