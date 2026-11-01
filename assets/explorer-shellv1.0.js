/* explorer-shell v1.0 · 微观馆漫游共享外壳
   Include right after the page markup and BEFORE the page's own <script>:
   it defines window.XS (language helpers), moves the text panels into an on-demand
   "讲解 Explain" drawer and turns the rest into a compact HUD over a full-viewport stage.
   Works with any page that follows the explorer markup (.app/.top/.view/.lower/.bottom ids). */
(() => {
  'use strict';
  const d = document, root = d.documentElement;
  const LS = {
    get: k => { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: (k, v) => { try { localStorage.setItem(k, v); } catch (e) { /* private mode */ } }
  };
  const LANGS = ['zh', 'en', 'both'];
  const Q = new URLSearchParams(location.search);
  let lang = Q.get('lang') || LS.get('xs-lang');           // ?lang=zh|en|both overrides the saved choice
  if (!LANGS.includes(lang)) lang = 'both';
  const subs = [];
  const has = v => v !== undefined && v !== null && v !== '';
  const XS = window.XS = {
    lang: () => lang,
    /* stacked pair: Chinese, then English on a lighter line (CSS decides by html[data-lang]) */
    b: (zh, en) => !has(en) || en === zh ? String(zh) : '<span class="t-zh" lang="zh-CN">' + zh + '</span><span class="t-en" lang="en">' + en + '</span>',
    /* inline pair: 中文 English on one line */
    i: (zh, en) => '<span class="bi-in">' + XS.b(zh, en) + '</span>',
    /* plain text for canvas / aria: zh, en or a both-form */
    pick: (zh, en, both) => lang === 'zh' ? zh : lang === 'en' ? en : (has(both) ? both : zh + ' ' + en),
    onLang: fn => subs.push(fn),
    setLang(l) {
      if (!LANGS.includes(l)) return;
      lang = l; LS.set('xs-lang', l);
      root.dataset.lang = l; root.lang = l === 'en' ? 'en' : 'zh-CN';
      langBtns.forEach(b => { b.classList.toggle('on', b.dataset.l === l); b.setAttribute('aria-pressed', b.dataset.l === l); });
      subs.forEach(fn => { try { fn(l); } catch (e) { console.error(e); } });
      requestAnimationFrame(measure);
    }
  };
  root.dataset.lang = lang; root.lang = lang === 'en' ? 'en' : 'zh-CN';
  root.classList.add('xs');

  const $ = s => d.querySelector(s);
  const app = $('#app'), view = $('#view'), top = app && app.querySelector('.top');
  const langBtns = [];
  if (!app || !view || !top) return;
  const el = (tag, cls, html) => { const e = d.createElement(tag); if (cls) e.className = cls; if (html !== undefined) e.innerHTML = html; return e; };

  /* ---- status: group live + magnification, add language toggle and HUD toggle ---- */
  const status = top.querySelector('.status');
  if (status) {
    const live = status.querySelector('.live'), mg = status.querySelector('.mg'), ib = status.querySelector('.ibtns');
    const grp = el('div', 'xmg'); if (live) grp.appendChild(live); if (mg) grp.appendChild(mg);
    status.insertBefore(grp, status.firstChild);
    const lg = el('div', 'xlang'); lg.setAttribute('role', 'group'); lg.setAttribute('aria-label', '语言 Language');
    [['zh', '中'], ['en', 'EN'], ['both', '中英']].forEach(([l, t]) => {
      const b = el('button', '', t); b.type = 'button'; b.dataset.l = l; b.title = { zh: '只显示中文', en: 'English only', both: '中英对照 · bilingual' }[l];
      b.onclick = () => XS.setLang(b.classList.contains('on') ? LANGS[(LANGS.indexOf(l) + 1) % 3] : l);
      langBtns.push(b); lg.appendChild(b);
    });
    status.insertBefore(lg, ib);
    if (ib) {
      const hb = el('button', 'ib', '◐'); hb.type = 'button'; hb.id = 'xHud';
      hb.title = '精简画面 / Clean view (H)'; hb.setAttribute('aria-label', '精简画面 Clean view (H)'); hb.setAttribute('aria-pressed', 'false');
      hb.onclick = () => setClean(!app.classList.contains('xclean'));
      ib.insertBefore(hb, ib.firstChild);
    }
  }
  langBtns.forEach(b => { b.classList.toggle('on', b.dataset.l === lang); b.setAttribute('aria-pressed', b.dataset.l === lang); });

  /* ---- drawer ---- */
  const title = top.querySelector('.title');
  const sub = title && title.querySelector('p');
  const drawer = el('aside', 'xdrawer');
  drawer.id = 'xdrawer'; drawer.setAttribute('aria-label', '讲解 Explain'); drawer.setAttribute('aria-hidden', 'true');
  const hd = el('div', 'xd-hd',
    '<div class="xd-t"><b>' + XS.i('讲解', 'Explain') + '</b><small id="xdSub"></small></div>' +
    '<button class="ib" id="xdX" type="button" title="关闭 Close (E / Esc)" aria-label="关闭讲解 Close">✕</button>');
  const body = el('div', 'xd-body');
  drawer.appendChild(hd); drawer.appendChild(body);
  if (sub) hd.querySelector('#xdSub').innerHTML = sub.innerHTML;
  const take = sel => { const n = app.querySelector(sel); if (n) body.appendChild(n); return n; };
  take('.p.focus'); take('.p.vitp');
  const prof = top.querySelector('.profile');
  if (prof) { prof.classList.add('p'); prof.insertBefore(el('div', 'hd', '<span class="k">' + XS.i('档案', 'Profile') + '</span><span>' + XS.i('典型值', 'typical') + '</span>'), prof.firstChild); body.appendChild(prof); }
  const atp = top.querySelector('.atp'); if (atp) body.appendChild(atp);
  take('.p.actp'); take('.p.logp'); take('.foot');
  app.appendChild(drawer);

  /* ---- minimap and phone chips become stage HUD ---- */
  const loc = app.querySelector('.p.loc');
  if (loc) {
    loc.classList.add('xhud'); view.appendChild(loc);
    const lh = loc.querySelector('.hd');
    if (lh) { lh.title = '收起 / 展开 Collapse'; lh.onclick = () => { const c = !loc.classList.contains('xcol'); loc.classList.toggle('xcol', c); app.classList.toggle('xmcol', c); LS.set('xs-mini', c ? '1' : '0'); }; }
    if (LS.get('xs-mini') === '1') { loc.classList.add('xcol'); app.classList.add('xmcol'); }
  }
  const chips = $('#mchips'); if (chips) view.appendChild(chips);

  /* ---- station list: collapsible ---- */
  /* (added after the page script has filled the list, so station indices stay 0..N-1) */
  const stops = $('#stops');
  function addStopsToggle() {
    if (!stops || stops.querySelector('.xcolb')) return;
    const cb = el('div', 'xcolb', '<i></i>≡');
    cb.setAttribute('role', 'button'); cb.tabIndex = 0;
    cb.title = '收起 / 展开站点 Collapse stations'; cb.setAttribute('aria-label', '收起或展开站点列表 Collapse station list');
    const tog = () => { const c = !stops.classList.contains('xcol'); stops.classList.toggle('xcol', c); LS.set('xs-stops', c ? '1' : '0'); };
    cb.onclick = tog; cb.onkeydown = e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); e.stopPropagation(); tog(); } };
    stops.appendChild(cb);
    if (LS.get('xs-stops') === '1') stops.classList.add('xcol');
  }

  /* ---- Explain button in the play bar ---- */
  const ctrl = view.querySelector('.ctrl');
  const xb = el('button', 'xexp', '<span>' + XS.i('讲解', 'Explain') + '</span><kbd>E</kbd>');
  xb.type = 'button'; xb.id = 'xExplain'; xb.title = '讲解 / Explain (E)'; xb.setAttribute('aria-controls', 'xdrawer'); xb.setAttribute('aria-expanded', 'false');
  if (ctrl) ctrl.appendChild(xb);

  /* ---- behaviour ---- */
  let pausedByDrawer = false, ready = false;
  const relayout = () => requestAnimationFrame(() => { window.dispatchEvent(new Event('resize')); });
  function setDrawer(open, save) {
    if (app.classList.contains('xopen') === open) return;
    app.classList.toggle('xopen', open);
    drawer.setAttribute('aria-hidden', String(!open)); xb.setAttribute('aria-expanded', String(open));
    if (save !== false) LS.set('xs-drawer', open ? '1' : '0');
    const pb = $('#ppB');
    if (ready && pb) {
      if (open && !app.classList.contains('paused')) { pausedByDrawer = true; pb.click(); }
      else if (!open && pausedByDrawer) { pausedByDrawer = false; if (app.classList.contains('paused')) pb.click(); }
    }
    if (open) { const b = drawer.querySelector('.xd-body'); if (b) b.scrollTop = 0; }
    relayout();
  }
  function setClean(c) {
    app.classList.toggle('xclean', c);
    const hb = $('#xHud'); if (hb) { hb.classList.toggle('on', c); hb.setAttribute('aria-pressed', String(c)); }
  }
  xb.onclick = () => setDrawer(!app.classList.contains('xopen'));
  hd.querySelector('#xdX').onclick = () => setDrawer(false);
  const sheetOpen = () => { const s = $('#sheet'); return !!(s && s.classList.contains('open')); };
  addEventListener('keydown', e => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    if (e.target.closest && e.target.closest('input,textarea,select')) return;
    if (sheetOpen()) return;
    const k = e.key;
    if (k === 'e' || k === 'E' || k === 'i' || k === 'I') { e.preventDefault(); setDrawer(!app.classList.contains('xopen')); }
    else if (k === 'Escape' && app.classList.contains('xopen')) setDrawer(false);
    else if (k === 'h' || k === 'H') setClean(!app.classList.contains('xclean'));
  });

  /* HUD offset below the title chip */
  function measure() {
    const r = top.getBoundingClientRect();
    app.style.setProperty('--xt', Math.round(r.bottom + 8) + 'px');
  }
  measure();
  addEventListener('resize', measure);
  if (d.fonts && d.fonts.ready) d.fonts.ready.then(measure);

  /* restore drawer state after the page script has started its tour */
  d.addEventListener('DOMContentLoaded', () => {
    ready = true; measure(); addStopsToggle();
    const st = parseInt(Q.get('stop'), 10);                   // ?stop=3 opens the page at station 3 (1-based)
    if (stops && st > 1) { const bs = stops.querySelectorAll('button'); if (bs[st - 1]) bs[st - 1].click(); }
    const qx = Q.get('explain');                             // ?explain=1 / 0 overrides the saved drawer state
    if (qx === '1' || (qx !== '0' && LS.get('xs-drawer') === '1')) {
      app.classList.add('xopen'); drawer.setAttribute('aria-hidden', 'false'); xb.setAttribute('aria-expanded', 'true');
      const pb = $('#ppB'); if (pb && !app.classList.contains('paused')) { pausedByDrawer = true; pb.click(); }
      relayout();
    }
  });
})();
