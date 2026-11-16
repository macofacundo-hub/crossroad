(() => {
  'use strict';

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const img = (path, size) => UP + path + (size ? `-${size}x${size}` : '') + '.jpg';
  const full = (path) => UP + path + '.jpg';
  const href = (u) => SITE + u;
  /* Prices live in USD (the store's currency). The peso view is a reference at today's rate. */
  let cur = 'USD', rate = 40.7;
  const nf2 = new Intl.NumberFormat('es-UY', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const nf0 = new Intl.NumberFormat('es-UY', { maximumFractionDigits: 0 });
  const usd = (n, short) => (cur === 'UYU' ? '$ ' + nf0.format(Math.round(n * rate)) : 'USD ' + (short && Number.isInteger(n) ? nf0 : nf2).format(n));
  const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const norm = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[’']/g, '');
  const icon = (id, cls = '') => `<svg class="ico ${cls}" aria-hidden="true"><use href="#${id}"/></svg>`;

  /* Fallback to the full-size photo when a resized variant does not exist. */
  document.addEventListener('error', (e) => {
    const el = e.target;
    if (el.tagName === 'IMG' && el.dataset.full && el.src !== el.dataset.full) el.src = el.dataset.full;
  }, true);

  const ALL = [...NEW_ARRIVALS, ...FEATURED, ...CATALOG_MORE];
  const byId = Object.fromEntries(ALL.map((p) => [p.id, p]));
  /* Two recent Cort arrivals from the catalog (uploaded 2026-09 and 2026-11) get a card detail. */
  if (byId.m3) byId.m3.detail = 'Para guitarra eléctrica · 15 W';
  if (byId.m8) byId.m8.detail = 'Electroacústica · acero';
  if (byId['cort-lcj']) byId['cort-lcj'].detail = 'Electroacústica · acero';
  if (byId.m0) byId.m0.detail = 'Para bajo · 30 W';
  if (byId.m2) byId.m2.detail = 'Para guitarra eléctrica · 15 W';
  if (byId.m10) byId.m10.detail = 'Cuerdas de nylon';
  /* Recent arrivals that the Vintage stage above does not already show. */
  const SHELF_NEW = ['cort-lcj', 'm3', 'cort-cec5', 'm8', 'm0', 'm2', 'm10', 'm24'].map((id) => byId[id]).filter(Boolean);

  /* ── Storage (per-visitor convenience only) ── */
  const store = {
    get(k, d) { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* private mode */ } }
  };
  cur = store.get('cr-cur', 'USD') === 'UYU' ? 'UYU' : 'USD';
  const cachedRate = store.get('cr-rate', null);
  if (cachedRate && cachedRate.r > 0) rate = cachedRate.r;
  let bag = store.get('cr-bag', []).filter((x) => byId[x.id]);
  let wish = new Set(store.get('cr-wish', []).filter((id) => byId[id]));

  /* ── Render: category tiles ── */
  /* A path starting with "@" is a local asset in this project; the rest are client photos. */
  $('#tiles').innerHTML = CATEGORY_TILES.map(([name, path, cat]) => `
    <li class="tile"><a href="${href('/categoria-producto/' + cat + '/')}">
      <img src="${path[0] === '@' ? path.slice(1) : img(path, 430)}" data-full="${path[0] === '@' ? path.slice(1) : full(path)}" alt="" width="96" height="96" loading="lazy">
      <span>${name}</span>
    </a></li>`).join('');

  /* ── Render: Vintage line-up (transparent cut-outs of the client's photos, for the dark stage) ── */
  const CUTOUT = { 'v120': 'v120', 'v4-sb': 'pbass-sb1', 'vs6-bk': 'vs6-bk1', 'vj74-sb': 'jbass-sb1', 'v52-bs': 'v52bs', 'v62-ab': 'v62-1' };
  $('#lineup').innerHTML = Object.keys(CUTOUT).map((id, i) => {
    const p = byId[id];
    const model = p.name.replace(/^(Guitarra|Bajo) Vintage /, '').replace(/ ReIssued$/, '');
    const dup = Object.keys(CUTOUT).filter((k) => byId[k].name === p.name).length > 1;
    return `<li style="--i:${i}"><a href="${href(p.url)}">
      <img src="assets/cutouts/${CUTOUT[id]}.webp" alt="${esc(p.name + ' ' + p.detail)}" width="350" height="1000">
      <span class="lineup__cap">
        <strong><span class="lm">Vintage </span>${model}<span class="lm"> ReIssued</span></strong>
        <span class="lineup__fin"${dup ? ' data-dup' : ''}><span class="fin-full">${p.detail}</span><span class="fin-short">${p.detail.split(' ').pop()}</span></span>
        <b class="lineup__price" data-p="${p.price}" data-s>${usd(p.price, true)}</b>
      </span>
    </a></li>`;
  }).join('');

  /* ── Render: product cards ── */
  const addBtn = (p) => `
    <button class="add" data-add="${p.id}" aria-label="Agregar ${esc(p.name)} al carrito">
      <span class="add__icon">${icon('i-plus', 'i-idle')}${icon('i-check', 'i-done')}</span>
      <span class="add__label"><span class="add__idle">Agregar</span><span class="add__done">Agregado</span></span>
    </button>`;
  const favBtn = (p) => `
    <button class="fav" data-fav="${p.id}" aria-pressed="${wish.has(p.id)}" aria-label="Guardar ${esc(p.name)} en tu lista de elegidos">${icon('i-heart')}</button>`;

  $('#newShelf').innerHTML = SHELF_NEW.map((p, i) => `
    <li class="card" style="--i:${i}">
      ${favBtn(p)}
      <a class="card__link" href="${href(p.url)}">
        <h3 class="card__name">${p.name}</h3>
        <p class="card__detail">${p.detail}</p>
        <div class="card__img">
          <img src="${img(p.img, 430)}" data-full="${full(p.img)}" alt="${esc(p.name + ' ' + p.detail)}" loading="lazy" width="430" height="430">
        </div>
      </a>
      <div class="card__foot"><span class="card__price" data-p="${p.price}">${usd(p.price)}</span>${addBtn(p)}</div>
    </li>`).join('');

  const fClass = ['', '', '', ''];
  $('#featured').innerHTML = FEATURED.map((p, i) => {
    const big = i === 0;
    const tags = p.tags ? `<ul class="fcard__tags">${p.tags.map((t) => `<li>${t}</li>`).join('')}</ul>` : '';
    const body = `
      <a class="fcard__link" href="${href(p.url)}">
        <h3 class="fcard__name">${p.name}</h3>
        <p class="fcard__detail">${p.detail}</p>
      </a>${tags}`;
    const pic = `<div class="fcard__img"><img src="${p.cut ? `assets/cutouts/${p.cut}.webp` : img(p.img, 800)}" data-full="${full(p.img)}" alt="${esc(p.name)}" loading="lazy" width="800" height="800"></div>`;
    const foot = `<div class="card__foot"><span class="card__price" data-p="${p.price}">${usd(p.price)}</span>${addBtn(p)}</div>`;
    const inner = `${favBtn(p)}${body}${pic}${foot}`;
    return `<li class="fcard ${fClass[i]}" style="--i:${i}" ${big ? '' : ''}>${inner}</li>`;
  }).join('');

  /* ── Render: repuestos chips, directory, mega menu, footer, mobile sheet ── */
  const catUrl = (base, sub) => href(`/categoria-producto/${base}/${sub ? sub + '/' : ''}`);
  $('#partsChips').innerHTML = REPUESTOS_CHIPS.map(([n, s]) => `<li><a href="${catUrl('repuestos', s)}">${n}</a></li>`).join('');

  const groupHTML = (cls, tag) => CATEGORY_TREE.map(([name, base, subs]) => `
    <div class="${cls}">
      <${tag}><a href="${catUrl(base)}">${name}</a></${tag}>
      ${subs.length ? `<ul>${subs.map(([n, s]) => `<li><a href="${catUrl(base, s)}">${n}</a></li>`).join('')}</ul>` : ''}
    </div>`).join('');
  $('#megaInner').innerHTML = groupHTML('mega__group', 'h3');
  $('#footCats').innerHTML = CATEGORY_TREE.map(([n, b]) => `<li><a href="${catUrl(b)}">${n}</a></li>`).join('');

  $('#sheetBody').innerHTML = `
    <nav class="sheet__main" aria-label="Menú">
      <a href="#repuestos">Repuestos</a>
      <a href="#como-comprar">Cómo comprar</a>
      <a href="#contacto">Contacto</a>
    </nav>
    <div class="sheet__cats">
      ${CATEGORY_TREE.map(([name, base, subs]) => subs.length ? `
        <details><summary>${name}${icon('i-chev-d')}</summary>
          <ul><li><a href="${catUrl(base)}">Ver todo</a></li>${subs.map(([n, s]) => `<li><a href="${catUrl(base, s)}">${n}</a></li>`).join('')}</ul>
        </details>` : `<details><summary><a href="${catUrl(base)}">${name}</a></summary></details>`).join('')}
    </div>`;

  /* ── Disclosure helper: hidden → animated open/close ── */
  function openEl(el) {
    clearTimeout(el._t);
    el.hidden = false;
    el.dataset.state = 'closed';
    requestAnimationFrame(() => requestAnimationFrame(() => { el.dataset.state = 'open'; }));
  }
  function closeEl(el) {
    if (el.hidden) return;
    el.dataset.state = 'closed';
    clearTimeout(el._t);
    el._t = setTimeout(() => { el.hidden = true; }, reduceMotion ? 0 : 240);
  }

  /* ── Mega menu ── */
  const megaBtn = $('#megaBtn'), mega = $('#mega');
  megaBtn.addEventListener('click', () => {
    const open = megaBtn.getAttribute('aria-expanded') === 'true';
    megaBtn.setAttribute('aria-expanded', String(!open));
    open ? closeEl(mega) : (closeBag(), openEl(mega));
  });
  const closeMega = () => { megaBtn.setAttribute('aria-expanded', 'false'); closeEl(mega); };

  /* ── Mobile sheet ── */
  const burger = $('#burger'), sheet = $('#sheet');
  const setSheet = (open) => {
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    burger.querySelector('use').setAttribute('href', open ? '#i-close' : '#i-menu');
    document.body.style.overflow = open ? 'hidden' : '';
    document.body.classList.toggle('menu-open', open);
    open ? openEl(sheet) : closeEl(sheet);
  };
  burger.addEventListener('click', () => setSheet(burger.getAttribute('aria-expanded') !== 'true'));
  sheet.addEventListener('click', (e) => { if (e.target.closest('a')) setSheet(false); });

  /* ── Bag ── */
  const bagBtn = $('#bagBtn'), bagEl = $('#bag'), bagCount = $('#bagCount');
  let bagAuto;
  function renderBag() {
    const qty = bag.reduce((s, x) => s + x.q, 0);
    const total = bag.reduce((s, x) => s + x.q * byId[x.id].price, 0);
    bagCount.hidden = qty === 0;
    bagCount.textContent = qty;
    bagBtn.setAttribute('aria-label', qty ? `Carrito, ${qty} ${qty === 1 ? 'producto' : 'productos'}` : 'Carrito, vacío');
    $('#bagSummary').textContent = qty ? `${qty} ${qty === 1 ? 'producto' : 'productos'}` : 'Está vacío';
    $('#bagFoot').hidden = qty === 0;
    $('#bagTotal').textContent = usd(total);
    $('#bagList').innerHTML = qty ? bag.map((x) => {
      const p = byId[x.id];
      return `<li class="bag__item">
        <img src="${img(p.img, 430)}" data-full="${full(p.img)}" alt="">
        <div><p>${p.name}${p.detail ? ' · ' + p.detail : ''}</p><small>${x.q} × ${usd(p.price)}</small></div>
        <button class="bag__rm" data-rm="${x.id}" aria-label="Quitar ${esc(p.name)}">${icon('i-close')}</button>
      </li>`;
    }).join('') : '<li class="results__empty">Agregá un producto y lo vas a ver acá.</li>';
    store.set('cr-bag', bag);
  }
  function openBag(auto) {
    closeMega();
    bagBtn.setAttribute('aria-expanded', 'true');
    openEl(bagEl);
    clearTimeout(bagAuto);
    if (auto) bagAuto = setTimeout(() => { if (!bagEl.matches(':hover') && !bagEl.contains(document.activeElement)) closeBag(); }, 3200);
  }
  function closeBag() { bagBtn.setAttribute('aria-expanded', 'false'); closeEl(bagEl); }
  bagBtn.addEventListener('click', () => (bagBtn.getAttribute('aria-expanded') === 'true' ? closeBag() : openBag(false)));
  bagEl.addEventListener('click', (e) => {
    const rm = e.target.closest('[data-rm]');
    if (!rm) return;
    bag = bag.filter((x) => x.id !== rm.dataset.rm);
    $$(`[data-add="${rm.dataset.rm}"]`).forEach((b) => b.classList.remove('is-added'));
    renderBag();
  });

  function addToBag(id, btn) {
    const line = bag.find((x) => x.id === id);
    line ? line.q++ : bag.push({ id, q: 1 });
    renderBag();
    bagCount.classList.remove('bump'); void bagCount.offsetWidth; bagCount.classList.add('bump');
    btn.classList.add('is-added');
    clearTimeout(btn._t);
    btn._t = setTimeout(() => btn.classList.remove('is-added'), 1800);
    openBag(true);
  }

  /* ── Wishlist ── */
  const wishCount = $('#wishCount');
  const renderWish = () => { wishCount.hidden = wish.size === 0; wishCount.textContent = wish.size; store.set('cr-wish', [...wish]); };

  /* ── Toast ── */
  const toastEl = $('#toast');
  let toastT;
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastT);
    toastT = setTimeout(() => toastEl.classList.remove('show'), 2400);
  }

  document.addEventListener('click', (e) => {
    const add = e.target.closest('[data-add]');
    if (add) { e.preventDefault(); addToBag(add.dataset.add, add); return; }
    const fav = e.target.closest('[data-fav]');
    if (fav) {
      e.preventDefault();
      const id = fav.dataset.fav;
      const on = !wish.has(id);
      on ? wish.add(id) : wish.delete(id);
      $$(`[data-fav="${id}"]`).forEach((b) => b.setAttribute('aria-pressed', String(on)));
      renderWish();
      toast(on ? 'Guardado en tu lista de elegidos' : 'Quitado de tu lista de elegidos');
      return;
    }
    if (!e.target.closest('#bag, #bagBtn, [data-rm]')) closeBag();
    if (!e.target.closest('#mega, #megaBtn')) closeMega();
    if (!e.target.closest('#search')) closeResults();
  });

  /* ── Shelf paddles ── */
  $$('.paddles').forEach((wrap) => {
    const track = document.getElementById(wrap.dataset.for);
    const [prev, next] = $$('.paddle', wrap);
    const update = () => {
      prev.disabled = track.scrollLeft < 8;
      next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 8;
    };
    wrap.addEventListener('click', (e) => {
      const b = e.target.closest('.paddle');
      if (!b) return;
      const step = Math.max(track.clientWidth * 0.8, 240);
      track.scrollBy({ left: step * Number(b.dataset.dir), behavior: reduceMotion ? 'auto' : 'smooth' });
    });
    track.addEventListener('scroll', update, { passive: true });
    addEventListener('resize', update);
    update();
  });

  /* ── Shelf entrance (once) ── */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      const el = en.target;
      el.classList.add('in');
      io.unobserve(el);
      const kids = [...el.children];
      setTimeout(() => kids.forEach((k) => k.classList.add('settled')), 700 + kids.length * 55);
    });
  }, { rootMargin: '0px 0px -12% 0px' });
  $$('.lineup').forEach((el) => io.observe(el));

  /* ── Scroll reveal: titles, cards, logos, steps and contact rows rise in, staggered per group ── */
  const revealSel = '.h2, .contact__title, .parts__title, .parts__lead, .chips, .parts__copy > .btn, .shelf__grid .card, .featured .fcard, .step, .rev__head .h2, .rev__score, .rev__card, .visit > div, .contact__cta, .map';
  const rv = $$(revealSel);
  rv.forEach((el) => {
    el.classList.add('rv');
    const sib = [...el.parentElement.children].filter((c) => c.classList.contains('rv'));
    el.style.setProperty('--i', sib.indexOf(el));
  });
  const rvIO = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in-view'); rvIO.unobserve(en.target); } });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.05 });
  rv.forEach((el) => rvIO.observe(el));

  /* ── Steps: play the three scenes once, in order ── */
  const stepsList = $('.steps__list');
  if (stepsList) {
    const playIO = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) return;
      playIO.disconnect();
      stepsList.classList.add('play');
      const addEl = $('.mk--cart .add', stepsList);
      setTimeout(() => { if (addEl) addEl.classList.add('is-added'); }, reduceMotion ? 0 : 2400);
    }, { threshold: 0.35 });
    playIO.observe(stepsList);
  }

  /* ── Reviews: the score counts up from zero when it scrolls in ── */
  const revScore = $('.rev__score');
  if (revScore && !reduceMotion) {
    const nums = $$('[data-count]', revScore);
    const fmt = (n, v) => (n.dataset.dec ? v.toFixed(1).replace('.', ',') : String(Math.round(v)));
    nums.forEach((n) => { n.textContent = fmt(n, 0); });
    const scIO = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) return;
      scIO.disconnect();
      const t0 = performance.now(), dur = 1500;
      const tick = (now) => {
        const x = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - x, 3);
        nums.forEach((n) => { n.textContent = fmt(n, +n.dataset.count * e); });
        if (x < 1) requestAnimationFrame(tick);
      };
      setTimeout(() => requestAnimationFrame(tick), 250);
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.05 });
    scIO.observe(revScore);
  }

  /* ── Parts drawer: pieces drift with the pointer, each by its own depth (--d).
        Eased toward the target every frame so it feels physical, not glued to the cursor. ── */
  const partsSection = $('#repuestos'), parts = $$('#partsArt .part');
  if (partsSection && parts.length && !reduceMotion && matchMedia('(hover: hover) and (pointer: fine)').matches) {
    const depth = parts.map((el) => parseFloat(getComputedStyle(el).getPropertyValue('--d')) || 1);
    let tx = 0, ty = 0, cx = 0, cy = 0, raf = 0;
    const tick = () => {
      cx += (tx - cx) * 0.08; cy += (ty - cy) * 0.08;
      parts.forEach((el, k) => { el.style.transform = `translate3d(${(cx * depth[k] * 16).toFixed(2)}px, ${(cy * depth[k] * 16).toFixed(2)}px, 0)`; });
      raf = Math.abs(tx - cx) + Math.abs(ty - cy) > 0.001 ? requestAnimationFrame(tick) : 0;
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(tick); };
    partsSection.addEventListener('pointermove', (e) => {
      const r = partsSection.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
      kick();
    });
    partsSection.addEventListener('pointerleave', () => { tx = 0; ty = 0; kick(); });
  }

  /* ── Search ── */
  const q = $('#q'), results = $('#results');
  const catIndex = CATEGORY_TREE.flatMap(([name, base, subs]) => [
    { label: name, url: catUrl(base), cat: true },
    ...subs.map(([n, s]) => ({ label: `${n}`, sub: name, url: catUrl(base, s), cat: true }))
  ]);
  let active = -1, current = [];

  function highlight(text, terms) {
    let out = esc(text);
    terms.forEach((t) => {
      if (!t) return;
      const n = norm(out);
      const i = n.indexOf(t);
      if (i >= 0 && !/[<>]/.test(out.slice(i, i + t.length))) out = out.slice(0, i) + '<mark>' + out.slice(i, i + t.length) + '</mark>' + out.slice(i + t.length);
    });
    return out;
  }

  function runSearch() {
    const raw = q.value.trim();
    if (!raw) { closeResults(); return; }
    const terms = norm(raw).split(/\s+/).filter(Boolean);
    const match = (s) => terms.every((t) => norm(s).includes(t));
    const prods = ALL.filter((p) => match(`${p.name} ${p.detail} ${p.brand || ''}`)).slice(0, 7);
    const cats = catIndex.filter((c) => match(`${c.label} ${c.sub || ''}`)).slice(0, 3);
    current = [...cats.map((c) => ({ url: c.url })), ...prods.map((p) => ({ url: href(p.url) }))];
    active = -1;
    if (!current.length) {
      results.innerHTML = `<p class="results__empty">No encontramos «<strong>${esc(raw)}</strong>» en esta vista. Probá con otra palabra o <a class="link" href="#contacto">escribinos</a> y te decimos si lo tenemos.</p>`;
    } else {
      results.innerHTML = [
        ...cats.map((c, i) => `<a class="result" role="option" id="r${i}" aria-selected="false" href="${c.url}">
            <span aria-hidden="true" style="display:grid;place-items:center;width:52px;height:52px;border-radius:12px;background:var(--stage);color:var(--mute)">${icon('i-search')}</span>
            <div><p>${highlight(c.label, terms)}</p><small>${c.sub ? 'Categoría · ' + c.sub : 'Categoría'}</small></div><span></span></a>`),
        ...prods.map((p, j) => `<a class="result" role="option" id="r${cats.length + j}" aria-selected="false" href="${href(p.url)}">
            <img src="${img(p.img, 430)}" data-full="${full(p.img)}" alt="">
            <div><p>${highlight(p.name, terms)}</p>${p.detail ? `<small>${esc(p.detail)}</small>` : ''}</div>
            <span class="price">${usd(p.price)}</span></a>`)
      ].join('');
    }
    if (results.hidden) openEl(results);
    q.setAttribute('aria-expanded', 'true');
  }
  function closeResults() { q.setAttribute('aria-expanded', 'false'); q.removeAttribute('aria-activedescendant'); closeEl(results); }
  function setActive(i) {
    const opts = $$('.result', results);
    if (!opts.length) return;
    active = (i + opts.length) % opts.length;
    opts.forEach((o, k) => o.setAttribute('aria-selected', String(k === active)));
    q.setAttribute('aria-activedescendant', opts[active].id);
    opts[active].scrollIntoView({ block: 'nearest' });
  }
  q.addEventListener('input', runSearch);
  q.addEventListener('focus', () => { if (q.value.trim()) runSearch(); });
  q.setAttribute('role', 'combobox');
  q.setAttribute('aria-autocomplete', 'list');
  q.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive(active + 1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive(active - 1); }
    else if (e.key === 'Enter') {
      const opts = $$('.result', results);
      const target = opts[active] || opts[0];
      if (target) { e.preventDefault(); location.href = target.href; }
    } else if (e.key === 'Escape') { closeResults(); }
  });
  const focusSearch = () => { q.focus({ preventScroll: true }); $('#search').scrollIntoView({ block: 'center', behavior: reduceMotion ? 'auto' : 'smooth' }); };
  $('#searchJump').addEventListener('click', () => { setSheet(false); focusSearch(); });
  document.addEventListener('keydown', (e) => {
    if (e.key === '/' && !/input|textarea|select/i.test(document.activeElement.tagName)) { e.preventDefault(); focusSearch(); }
    if (e.key === 'Escape') {
      if (bagBtn.getAttribute('aria-expanded') === 'true') { closeBag(); bagBtn.focus(); }
      if (megaBtn.getAttribute('aria-expanded') === 'true') { closeMega(); megaBtn.focus(); }
      if (burger.getAttribute('aria-expanded') === 'true') { setSheet(false); burger.focus(); }
    }
  });

  /* ── Currency: USD ⇄ pesos ── */
  function applyCurrency() {
    $$('[data-p]').forEach((el) => { el.textContent = usd(Number(el.dataset.p), el.hasAttribute('data-s')); });
    $$('.cur__b').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.cur === cur)));
    const note = $('#curNote');
    if (note) note.textContent = cur === 'UYU'
      ? `Precios en pesos uruguayos, como referencia al cambio de 1 US$ = $ ${rate.toFixed(2).replace('.', ',')}. Los precios de la tienda están en dólares.`
      : 'Precios en dólares estadounidenses.';
    renderBag();
    if (q.value.trim()) runSearch();
  }
  document.addEventListener('click', (e) => {
    const b = e.target.closest('.cur__b');
    if (!b || b.dataset.cur === cur) return;
    cur = b.dataset.cur;
    store.set('cr-cur', cur);
    applyCurrency();
  });
  /* Today's rate from a public feed (no personal data is sent); the value above is the offline fallback. */
  if (!cachedRate || Date.now() - cachedRate.t > 6 * 3600e3) {
    fetch('https://open.er-api.com/v6/latest/USD').then((r) => r.json()).then((d) => {
      const r = d && d.rates && d.rates.UYU;
      if (r > 0) { rate = r; store.set('cr-rate', { r, t: Date.now() }); applyCurrency(); }
    }).catch(() => {});
  }

  renderBag();
  renderWish();
  applyCurrency();
})();
