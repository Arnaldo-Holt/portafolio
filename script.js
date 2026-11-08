(() => {
  const c = window.PORTFOLIO_CONTENT;
  if (!c) return;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const el = (tag, cls, html) => { const n = document.createElement(tag); if (cls) n.className = cls; if (html !== undefined) n.innerHTML = html; return n; };

  $$('[data-content]').forEach(n => {
    const v = n.dataset.content.split('.').reduce((o, k) => o?.[k], c);
    if (typeof v === 'string') n.textContent = v;
  });

  c.navigation.forEach(i => { const li = el('li'); const a = el('a'); a.href = i.href; a.textContent = i.label; li.append(a); $('#nav-links').append(li); });
  c.hero.facts.forEach(i => $('#hero-facts').append(el('div', 'fact', `<strong>${i.value}</strong><span>${i.label}</span>`)));

  const items = [...c.marquee, ...c.marquee].map(t => `<span>${t}</span><i aria-hidden="true">✦</i>`).join('');
  $('#marquee-track').innerHTML = items + items;

  c.lema.priorities.forEach(p => {
    const row = el('article', 'priority reveal', `<div class="priority-head"><span class="priority-rank">${p.rank}</span><div><span class="priority-label">${p.label}</span><h3>${p.title}</h3></div></div><p>${p.text}</p><div class="meter" aria-hidden="true"><span style="--level:${p.level}%"></span></div>`);
    $('#priorities').append(row);
  });

  c.profile.skills.forEach(s => $('#skill-chips').append(el('span', 'skill-chip', s)));
  c.value.cards.forEach(i => $('#value-cards').append(el('article', 'value-card reveal', `<span class="card-number">${i.number}</span><span class="value-icon" aria-hidden="true">${i.icon}</span><h3>${i.title}</h3><p>${i.text}</p>`)));
  c.method.steps.forEach(s => $('#method-steps').append(el('article', 'step reveal', `<span class="step-number">${s.number}</span><h3>${s.title}</h3><p>${s.text}</p>`)));

  const addTimeline = (items, target) => items.forEach(i => $(target).append(el('article', 'timeline-item reveal', `<span class="timeline-dot" aria-hidden="true"></span><p class="timeline-period">${i.period}</p><h4>${i.title}</h4><p class="timeline-place">${i.place}</p><p class="timeline-detail">${i.detail}</p>`)));
  addTimeline(c.education, '#education-timeline');
  addTimeline(c.experience, '#experience-timeline');

  c.projects.items.forEach((item, idx) => {
    const tags = item.tags.map(t => `<span>${t}</span>`).join('');
    const card = el('article', 'project-card reveal', `<div class="project-top"><span class="project-index">0${idx + 1}</span><span class="project-category">${item.category}</span></div><h3>${item.title}</h3><div class="project-facts"><p><b>Objetivo</b>${item.objective}</p><p><b>Participación</b>${item.participation}</p><p><b>Resultado</b>${item.result}</p></div><div class="project-tags" aria-label="Tecnologías utilizadas">${tags}</div>`);
    if (item.link) {
      const a = el('a', 'project-link');
      a.href = item.link.href; a.target = '_blank'; a.rel = 'noopener noreferrer';
      a.setAttribute('aria-label', `${item.link.label}: ${item.title} (se abre en una pestaña nueva)`);
      a.textContent = item.link.label + ' ';
      const arrow = el('span'); arrow.setAttribute('aria-hidden', 'true'); arrow.textContent = '↗';
      a.append(arrow); card.append(a);
    }
    $('#project-cards').append(card);
  });

  $('#email-link').href = `mailto:${c.person.email}`;
  $('#email-display').textContent = c.person.email;

  const toggle = $('.menu-toggle'), header = $('.site-header');
  const setMenu = open => { toggle.setAttribute('aria-expanded', String(open)); toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú'); header.classList.toggle('menu-open', open); };
  toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
  $$('#nav-links a').forEach(a => a.addEventListener('click', () => setMenu(false)));

  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); } }), { threshold: .12 });
  $$('.reveal').forEach(n => io.observe(n));

  const navIo = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) $$('#nav-links a').forEach(a => a.classList.toggle('active', a.hash === `#${e.target.id}`)); }), { rootMargin: '-35% 0px -55% 0px' });
  $$('main section[id]').forEach(s => navIo.observe(s));

  const bar = $('#progress');
  const onScroll = () => { const h = document.documentElement; const max = h.scrollHeight - h.clientHeight; bar.style.transform = `scaleX(${max > 0 ? h.scrollTop / max : 0})`; };
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
})();
