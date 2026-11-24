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

  // Icon grammar lab
  const lab = document.querySelector('[data-icon-lab]');
  if (lab) {
    const shapes = {
      inference: '<path d="M4 12h5l3-6 3 12 3-6h3"/><circle cx="4" cy="12" r="1"/><circle cx="21" cy="12" r="1"/>',
      confidence: '<path d="M12 3 21 8v8l-9 5-9-5V8z"/><path d="m8 12 3 3 5-6"/>',
      latency: '<circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 3"/>',
      handoff: '<path d="M3 8h10m-4-4 4 4-4 4"/><path d="M21 16H11m4-4-4 4 4 4"/>',
      verification: '<path d="m4 13 5 5L20 6"/><path d="M5 5h6"/>'
    };
    const notes = {
      inference: 'Transformation from one signal to another. Not a claim of correctness.',
      confidence: 'A supported judgement, deliberately not a tick of certainty.',
      latency: 'A waiting period the person should be able to see and plan around.',
      handoff: 'A change in who is responsible — human to system or back.',
      verification: 'A reviewable checkpoint where a person confirms the output.'
    };
    const stage = lab.querySelector('[data-stage]');
    const name = lab.querySelector('[data-name]');
    const note = lab.querySelector('[data-note]');
    const size = lab.querySelector('[data-size]');
    const stroke = lab.querySelector('[data-stroke]');
    const sizeOut = lab.querySelector('[data-size-out]');
    const strokeOut = lab.querySelector('[data-stroke-out]');
    let current = 'inference';
    const render = () => {
      stage.innerHTML = '<svg viewBox="0 0 24 24" role="img" aria-label="' + current + ' icon concept">' + shapes[current] + '</svg>';
      stage.style.setProperty('--icon-size', size.value + 'px');
      stage.style.setProperty('--icon-stroke', (Number(stroke.value) / (Number(size.value) / 24)).toFixed(3));
      name.textContent = current[0].toUpperCase() + current.slice(1);
      note.textContent = notes[current];
      sizeOut.textContent = size.value + ' px';
      strokeOut.textContent = stroke.value + ' px';
    };
    lab.querySelectorAll('[data-symbol]').forEach((b) => b.addEventListener('click', () => {
      if (current === b.dataset.symbol) return;
      current = b.dataset.symbol;
      lab.querySelectorAll('[data-symbol]').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
      render();
      // Blur crossfade on deliberate switches only — never on slider input, which fires per frame.
      stage.firstChild?.animate(reduce.matches ? [{ opacity: 0 }, { opacity: 1 }] : [{ opacity: 0, filter: 'blur(3px)', transform: 'scale(.97)' }, { opacity: 1, filter: 'blur(0)', transform: 'none' }], { duration: 180, easing: 'cubic-bezier(.23,1,.32,1)' });
    }));
    size.addEventListener('input', render);
    stroke.addEventListener('input', render);
    lab.querySelector('[data-copy]')?.addEventListener('click', async (e) => {
      try { await navigator.clipboard.writeText(stage.querySelector('svg').outerHTML); e.target.textContent = 'SVG copied'; }
      catch { e.target.textContent = 'Copy unavailable in this browser'; }
    });
    render();
  }

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
