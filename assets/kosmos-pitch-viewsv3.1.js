/* aiai · Kosmos-lite 科主任讲解课 — 动画视图（白底版）
   Engine contract (loopgraph-engine v1.x): V[name] = { title, build(root, api, keys) -> { set(k, keys, instant) } }.
   set(k) renders the state after line k of the beat (k = -1: before the first line).
   Photos: original generated images under lessons/media/kosmos-pitch/v3/. The demo view is fictional and labelled on screen. */
(() => {
'use strict';
const V = window.LG_VIEWS = {};
let A, E, S;
const init = api => { A = api; E = api.el; S = api.svg; };
const reach = (keys, k) => b => { const i = keys.indexOf(b); return i >= 0 && i <= k; };
const tg = (el, c, on) => el && el.classList.toggle(c, !!on);
const sh = (el, on) => { tg(el, 'hide', !on); tg(el, 'dn', !on); };
const lit = (el, on, off) => { el.style.opacity = on ? 1 : (off == null ? .3 : off); };
const box = root => A.el('div', 'sv', root);
const pos = (el, x, y, w, h) => { el.style.left = x + 'px'; el.style.top = y + 'px'; if (w != null) el.style.width = w + 'px'; if (h != null) el.style.height = h + 'px'; return el; };
const div = (p, cls, html, x, y, w, h) => { const e = A.el('div', cls, p, html); e.style.position = 'absolute'; if (x != null) pos(e, x, y, w, h); return e; };
const svgIn = (p, w, h, x, y) => { const s = A.svg('svg', { viewBox: `0 0 ${w} ${h}`, width: w, height: h }, p); s.style.position = 'absolute'; s.style.left = (x || 0) + 'px'; s.style.top = (y || 0) + 'px'; s.style.overflow = 'visible'; return s; };
const C = { am: '#d97706', am2: '#b45309', gold: '#d99a0b', ice: '#1f5fae', ice2: '#3b82c4', cr: '#172033', dim: '#5b6577', dim2: '#8a93a3', red: '#c0352b', gr: '#0f7b4f', navy: '#0d1a33' };
const IMG = n => `media/kosmos-pitch/v3/kc3-${n}v3.0.webp`;
const photo = (root, n, mode, op) => { const p = A.el('div', 'ph3 ' + (mode || 'f'), null); p.style.backgroundImage = `url(${IMG(n)})`; if (op != null) p.style.setProperty('--po', op); root.insertBefore(p, root.firstChild); return p; };
const atmo = (root, blobs) => {
  const a = A.el('div', 'gatmo', null); root.insertBefore(a, root.firstChild);
  (blobs || [[380, 700, 520, 'rgba(79,159,224,.5)', .28], [1540, 520, 560, 'rgba(227,150,43,.45)', .24]]).forEach(([x, y, r, c, o]) => { const bl = A.el('div', 'gblob', a); bl.style.cssText = `left:${x - r}px;top:${y - r}px;width:${2 * r}px;height:${2 * r}px;background:radial-gradient(circle,${c} 0%,transparent 68%);opacity:${o}`; });
  return a;
};
const tset = (els, on, api, step) => els.forEach((l, i) => { if (on) api.later(() => sh(l, true), i * (step || 160)); else sh(l, false); });

/* line-art icons (original) */
const IC = {
  clock: (c = C.am2, s = 64) => `<svg width="${s}" height="${s}" viewBox="0 0 64 64"><circle cx="32" cy="32" r="24" fill="none" stroke="${c}" stroke-width="3.5"/><path d="M32 18 V32 L42 38" fill="none" stroke="${c}" stroke-width="3.5" stroke-linecap="round"/></svg>`,
  flask: (c = C.am2, s = 64) => `<svg width="${s}" height="${s}" viewBox="0 0 64 64"><path d="M25 8 h14 M28 8 v16 L14 52 q-2 5 4 5 h28 q6 0 4 -5 L36 24 V8" fill="none" stroke="${c}" stroke-width="3.5" stroke-linejoin="round"/><path d="M19 42 h26" stroke="${c}" stroke-width="3"/></svg>`,
  people: (c = C.am2, s = 64) => `<svg width="${s}" height="${s}" viewBox="0 0 64 64"><circle cx="23" cy="22" r="8" fill="none" stroke="${c}" stroke-width="3.5"/><circle cx="43" cy="24" r="7" fill="none" stroke="${c}" stroke-width="3"/><path d="M8 52 q15 -24 30 0 M34 50 q10 -18 22 0" fill="none" stroke="${c}" stroke-width="3.5"/></svg>`,
  robot: (c = C.ice, s = 56) => `<svg width="${s}" height="${s}" viewBox="0 0 64 64"><rect x="12" y="18" width="40" height="30" rx="8" fill="none" stroke="${c}" stroke-width="3.5"/><circle cx="25" cy="33" r="4" fill="${c}"/><circle cx="39" cy="33" r="4" fill="${c}"/><line x1="32" y1="18" x2="32" y2="8" stroke="${c}" stroke-width="3.5"/><circle cx="32" cy="7" r="3" fill="${c}"/></svg>`,
  pen: (c = C.am2, s = 56) => `<svg width="${s}" height="${s}" viewBox="0 0 64 64"><path d="M14 50 L18 38 L44 12 L52 20 L26 46 Z" fill="none" stroke="${c}" stroke-width="3.5" stroke-linejoin="round"/><path d="M10 56 h40" stroke="${c}" stroke-width="3"/></svg>`,
  doc: (c = C.gr, s = 56) => `<svg width="${s}" height="${s}" viewBox="0 0 44 44"><path d="M10 4 h17 l9 9 v27 h-26z" fill="none" stroke="${c}" stroke-width="3" stroke-linejoin="round"/><path d="M27 4 v9 h9" fill="none" stroke="${c}" stroke-width="3"/><path d="M15 22 h15 M15 28 h15 M15 34 h10" stroke="${c}" stroke-width="2.5"/></svg>`,
  lock: (c = C.am2, s = 40) => `<svg width="${s}" height="${s}" viewBox="0 0 44 44"><rect x="8" y="19" width="28" height="21" rx="5" fill="none" stroke="${c}" stroke-width="3"/><path d="M14 19 v-6 a8 8 0 0 1 16 0 v6" fill="none" stroke="${c}" stroke-width="3"/><circle cx="22" cy="29" r="3" fill="${c}"/></svg>`,
  shield: (c = C.ice, s = 40) => `<svg width="${s}" height="${s}" viewBox="0 0 44 44"><path d="M22 4 L37 10 V22 q0 11 -15 18 q-15 -7 -15 -18 V10 Z" fill="none" stroke="${c}" stroke-width="3" stroke-linejoin="round"/><path d="M15 22 l5 5 l9 -10" fill="none" stroke="${c}" stroke-width="3" stroke-linecap="round"/></svg>`,
  scalpel: (c = C.am2, s = 34) => `<svg width="${s}" height="${s}" viewBox="0 0 46 46"><path d="M6 40 L26 20 l6 6 L12 46z" fill="none" stroke="${c}" stroke-width="3" stroke-linejoin="round"/><path d="M26 20 l10 -14 q4 -2 4 3 l-8 17" fill="none" stroke="${c}" stroke-width="3" stroke-linejoin="round"/></svg>`,
};
const ANA = (html) => `<span class="ana3"><span class="lbl">外科类比</span><span>${html}</span></span>`;
const ILL = '示意 · 数据虚构';

/* ---------- glow toolkit: hex pads on halo dials joined by luminous paths ---------- */
const GK = {};
let GID = 0;
GK.defs = svg => {
  const id = 'k3g' + (++GID);
  const d = S('defs', {}, svg);
  const f1 = S('filter', { id: id + 's', x: '-60%', y: '-60%', width: '220%', height: '220%' }, d);
  S('feGaussianBlur', { stdDeviation: 5, result: 'b' }, f1);
  const m1 = S('feMerge', {}, f1); S('feMergeNode', { in: 'b' }, m1); S('feMergeNode', { in: 'SourceGraphic' }, m1);
  const f2 = S('filter', { id: id + 'b', x: '-80%', y: '-80%', width: '260%', height: '260%' }, d);
  S('feGaussianBlur', { stdDeviation: 22 }, f2);
  const f3 = S('filter', { id: id + 'm', x: '-40%', y: '-200%', width: '180%', height: '500%' }, d);
  S('feGaussianBlur', { stdDeviation: 7 }, f3);
  svg._g = id; return id;
};
const COLS = { ok: C.ice, ai: C.ice, au: C.gold, warn: C.am2, bad: C.red, go: C.gr, off: '#b7bfcc' };
GK.pad = (svg, x, y, state, glyph, sc = 1) => {
  const id = svg._g;
  const g = S('g', { class: 'gpad', transform: `translate(${x},${y}) scale(${sc})` }, svg);
  g.style.color = COLS[state] || state;
  S('ellipse', { cx: 0, cy: 6, rx: 150, ry: 54, fill: 'currentColor', opacity: .33, filter: `url(#${id}b)`, class: 'gl' }, g);
  S('ellipse', { cx: 0, cy: 4, rx: 132, ry: 44, fill: 'none', stroke: 'currentColor', 'stroke-width': 1.5, 'stroke-dasharray': '2 9', opacity: .7 }, g);
  S('ellipse', { cx: 0, cy: 4, rx: 112, ry: 37, fill: 'none', stroke: 'currentColor', 'stroke-width': 3.2, filter: `url(#${id}s)` }, g);
  const hx = a => [Math.cos(a) * 74, Math.sin(a) * 25.5];
  const top = [], bot = [];
  for (let i = 0; i < 6; i++) { const [px, py] = hx(i * Math.PI / 3); top.push([px, py - 22]); bot.push([px, py - 2]); }
  const side = [top[0], top[1], top[2], top[3], bot[3], bot[2], bot[1], bot[0]];
  S('polygon', { points: side.map(p => p.join(',')).join(' '), fill: 'currentColor', opacity: .42 }, g);
  S('polygon', { points: [top[1], top[2], bot[2], bot[1]].map(p => p.join(',')).join(' '), fill: '#fff', opacity: .18 }, g);
  S('polygon', { points: top.map(p => p.join(',')).join(' '), fill: 'currentColor', opacity: .95, filter: `url(#${id}s)` }, g);
  S('polygon', { points: top.map(p => [p[0] * .62, (p[1] + 22) * .62 - 22].join(',')).join(' '), fill: '#fff', opacity: .55 }, g);
  const holo = S('g', { class: 'holo' }, g);
  S('path', { d: 'M-40 -100 L40 -100 L48 -40 L-48 -40 Z', fill: '#ffffff', stroke: 'currentColor', 'stroke-width': 2, opacity: .95 }, holo);
  S('line', { x1: 0, y1: -40, x2: 0, y2: -26, stroke: 'currentColor', 'stroke-width': 2, opacity: .7 }, holo);
  const t = S('text', { x: 0, y: -58, 'text-anchor': 'middle', fill: C.cr, 'font-size': 36, 'font-weight': 800 }, holo);
  t.textContent = glyph || '';
  return { g, set(st) { g.style.color = COLS[st] || st; g.dataset.st = st; }, glyph(s) { t.textContent = s; } };
};
GK.curve = pts => {
  let d = `M${pts[0][0]} ${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2;
    d += ` C${p1[0] + (p2[0] - p0[0]) / 6} ${p1[1] + (p2[1] - p0[1]) / 6}, ${p2[0] - (p3[0] - p1[0]) / 6} ${p2[1] - (p3[1] - p1[1]) / 6}, ${p2[0]} ${p2[1]}`;
  }
  return d;
};
GK.path = (svg, d, col, opt = {}) => {
  const id = svg._g, g = S('g', { class: 'gpath f' }, svg);
  let stroke = col;
  if (Array.isArray(col)) {
    const gid = id + 'g' + (++GID), defs = svg.querySelector('defs');
    const lg = S('linearGradient', { id: gid, gradientUnits: 'userSpaceOnUse', x1: opt.x1 || 0, y1: 0, x2: opt.x2 || 1680, y2: 0 }, defs);
    col.forEach((c, i) => S('stop', { offset: i / (col.length - 1), 'stop-color': c }, lg));
    stroke = `url(#${gid})`;
  }
  S('path', { d, fill: 'none', stroke, 'stroke-width': opt.w ? opt.w * 3 : 12, opacity: opt.dashed ? .12 : .42, filter: `url(#${id}m)` }, g);
  const core = S('path', { d, fill: 'none', stroke, 'stroke-width': opt.w || 3.5, 'stroke-linecap': 'round', opacity: opt.dashed ? .7 : 1 }, g);
  if (opt.dashed) core.setAttribute('stroke-dasharray', '10 12');
  if (!opt.dashed && !opt.still) {
    const sp = S('path', { d, fill: 'none', stroke: '#ffffff', 'stroke-width': 3, 'stroke-linecap': 'round', 'stroke-dasharray': '2 46', opacity: .9, class: 'gspark' }, g);
    sp.style.animationDuration = (opt.speed || 1.8) + 's';
  }
  g._core = core; return g;
};
GK.chip = (p, x, y, html, kind) => { const c = div(p, 'gchip abs f hide ' + (kind || ''), html); c.style.left = x + 'px'; c.style.top = y + 'px'; return c; };
GK.label = (p, x, y, html, w = 260, cls = '') => div(p, 'glabel f ' + cls, html, x - w / 2, y, w);
const setKind = (el, kind) => { el.classList.remove('ok', 'ai', 'au', 'warn', 'bad', 'go', 'dim'); if (kind) el.classList.add(kind); };

/* chapter cards get the chapter's photo (the engine only sets number / kicker / title) */
const CARD_BG = { '00': 'cover', '01': 'meeting', '02': 'network', '03': 'or', '04': 'topiccard', '05': 'network', '06': 'bench', '07': 'archive', '08': 'review', '09': 'bench', '10': 'archive', '11': 'topiccard', '12': 'meeting', '13': 'or', '14': 'review', '15': 'cover', '16': 'close' };
(function cardPhotos() {
  const c = document.querySelector('#card'), no = c && c.querySelector('.no');
  if (!c || !no) return;
  const ph = document.createElement('div'); ph.className = 'cph'; c.insertBefore(ph, c.firstChild);
  const upd = () => { const n = CARD_BG[no.textContent.trim()]; ph.style.backgroundImage = n ? `url(${IMG(n)})` : ''; ph.style.animation = 'none'; void ph.offsetWidth; ph.style.animation = ''; };
  new MutationObserver(upd).observe(no, { childList: true, characterData: true, subtree: true });
})();

/* 00 · COVER */
V.cover = {
  title: '',
  build(root, api) {
    init(api); root.classList.add('nohd'); photo(root, 'cover', 'l', .95);
    const f = div(root, 'free', '', 0, 0);
    const eb = div(f, 'eyebrow f hide dn', 'aiai 人工智能学院 · 写给科主任的 30 分钟', 140, 150);
    const t = div(f, 'cv-t f hide dn', '选题，<br><em>不再靠拍脑袋</em>', 136, 196, 1200);
    const note = div(f, 'cv-note f hide dn', '选题定得急 → 代价往往几个月后才出现', 140, 515, 1100);
    const st = div(f, 'cv-s f hide dn', '让每个课题在湿实验之前，<br>先做一次<b>“术前评估”</b>', 140, 505, 1100);
    const an = div(f, 'cv-row f hide dn', ['术前看影像', '查化验', '术前讨论'].map(s => `<span class="pill3 c-ice">${s}</span>`).join('') + `<span class="pill3 c-am">→ 课题也先查一遍</span>`, 140, 668);
    const pills = div(f, 'cv-row f hide dn', `<span class="pill3 c-ice">${IC.robot(C.ice, 30)}AI 跑腿</span><span class="pill3 c-am">${IC.pen(C.am2, 30)}人只签关键几步</span><span class="pill3 c-gr">${IC.doc(C.gr, 28)}每一步留痕、可核查</span>`, 140, 668);
    const road = div(f, 'cv-road f hide dn', '<span>三笔账</span><i>→</i><span>选题变轻松</span><i>→</i><span>承诺不做的事</span><i>→</i><span>怎么合作</span>', 140, 752);
    const dec = div(f, 'cv-road f hide dn', `<span style="border-color:rgba(255,192,98,.7);color:var(--or2)">最后 · 只请您做一个决定</span>`, 140, 752);
    return { set(k, keys) {
      const at = reach(keys, k);
      sh(eb, true); sh(t, true);
      sh(note, at('c2') && !at('c4')); sh(st, at('c4'));
      sh(an, at('c5') && !at('c6')); sh(pills, at('c6'));
      sh(road, at('c7') && !at('c8')); sh(dec, at('c8'));
    } };
  }
};

/* 01 · THREE LEDGERS */
V.ledger = {
  title: '科主任的<em>三笔账</em>',
  build(root, api) {
    init(api); photo(root, 'meeting', 'f', .5);
    const b = box(root);
    const cols = [
      ['t', '时间账', 'TIME', IC.clock, [['t1', '门诊·手术·值班排满，科研只剩碎片'], ['t2', '碎片时间最怕“重新开始”'], ['t3', '跑腿挤占了思考和判断']]],
      ['m', '钱账', 'MONEY', IC.flask, [['m1', '试剂·动物·测序，经费有限'], ['m2', '方向一错，钱基本收不回'], ['m3', '立项时少问了几个问题'], ['m4', '公开数据？最便宜的验证？对照？']]],
      ['p', '人账', 'PEOPLE', IC.people, [['p1', '选题靠导师经验与直觉'], ['p2', '导师时间有限，陪不过来'], ['p3', '做到一半才发现撞车'], ['p4', '标书：“创新性不足”'], ['p5', '学生毕业，来龙去脉断档']]],
    ].map(([id, t, en, ic, items], i) => {
      const c = div(b, 'g3 lg-col', `<div class="lg-h">${ic(C.am2, 60)}<div><div class="t3">${t}</div></div></div>`, i * 575, 0, 530, 470);
      const its = items.map(([k, s]) => { const e = E('div', 'lg-b f hide dn', c, s); e.dataset.k = k; return e; });
      return { id, c, its };
    });
    const band = div(b, 'band f hide dn', '三笔账都不陌生 · 缺一个<b>统一、省力</b>的办法去管', 0, 492, 1680);
    const band2 = div(b, 'band am f hide dn', '→ 今天要讲的，就是这样一个办法', 0, 492, 1680);
    return { set(k, keys) {
      const at = reach(keys, k), cur = keys[k] || '';
      cols.forEach(c => {
        const active = cur[0] === c.id || at('s1');
        lit(c.c, active || cur === 'a1' || k < 0, .38);
        tg(c.c, 'am', cur[0] === c.id);
        c.its.forEach(e => sh(e, at(e.dataset.k)));
      });
      sh(band, at('s1') && !at('s2')); sh(band2, at('s2'));
    } };
  }
};

/* 02 · WHY IT IS HARD — four obstacles on the road from idea to experiment */
V.hard = {
  title: '选题为什么难：<em>四个坎</em>',
  build(root, api) {
    init(api); photo(root, 'network', 'f', .55);
    const b = box(root);
    const s = svgIn(b, 1680, 430, 0, 0); GK.defs(s);
    const P = [[70, 230], [330, 250], [640, 190], [950, 250], [1260, 190], [1600, 230]];
    const solid = GK.path(s, GK.curve(P.slice(0, 4)), [C.ice, C.am2], { x1: 70, x2: 950 });
    const gap = GK.path(s, GK.curve(P.slice(3)), C.red, { dashed: true });
    const ends = [[P[0], '想法'], [P[5], '实验']].map(([[x, y], t]) => { const g = S('g', {}, s); S('circle', { cx: x, cy: y, r: 46, fill: '#ffffff', stroke: C.cr, 'stroke-width': 2.5 }, g); const tx = S('text', { x, y: y + 10, 'text-anchor': 'middle', fill: C.cr, 'font-size': 28, 'font-weight': 800 }, g); tx.textContent = t; return g; });
    const pads = P.slice(1, 5).map(([x, y], i) => GK.pad(s, x, y, 'off', '①②③④'[i], .66));
    const T = [['h1', '文献读不完', '只能读最前面几篇<br>容易漏掉关键一篇'], ['h3', '撞车难查', '换说法、物种、数据库<br>结果都可能不同'], ['h5', '公开数据没人挖', '数据免费在那里<br>想法却直接跳到湿实验'], ['h8', '缺一座桥', '推理、证据、决定没处记<br>实验太大、太贵、缺对照']];
    const chips = P.slice(1, 5).map(([x, y], i) => GK.chip(b, x, y - 132, T[i][1], 'warn'));
    const caps = P.slice(1, 5).map(([x, y], i) => GK.label(b, x, y + 52, T[i][2], 300, 'cap hide'));
    const zero = GK.chip(b, 640, 340, '零结果 ≠ 没人做', 'bad sm');
    const panel = div(b, 'band f hide dn', '', 140, 478, 1400);
    return { set(k, keys) {
      const at = reach(keys, k);
      T.forEach(([key], i) => {
        const on = at(key), last = i === 3;
        pads[i].set(at('h12') ? 'ok' : on ? (last ? 'bad' : 'warn') : 'off');
        tg(chips[i], 'hide', !on); setKind(chips[i], at('h12') ? 'ok' : last ? 'bad' : 'warn');
        tg(caps[i], 'hide', !(on && !at('h11')));
      });
      tg(zero, 'hide', !(at('h4') && !at('h5')));
      solid.style.opacity = at('h0') || k < 0 ? 1 : .5; gap.style.opacity = at('h8') ? 1 : .35;
      sh(panel, at('h11'));
      panel.className = 'band f' + (at('h13') ? ' am' : at('h12') ? ' ice' : '') + (at('h11') ? '' : ' hide dn');
      panel.innerHTML = at('h13') ? '关键：<b>AI 跑腿</b> · 不替人做决定' : at('h12') ? '不是靠“更努力” · 跑腿部分<b>恰好是 AI 擅长的</b>' : '四个坎，靠“更努力”解决不了 · 它们需要<b>流程</b>';
    } };
  }
};

/* 03a · ONE LINE */
V.oneline = {
  title: '这套工作流是什么',
  build(root, api) {
    init(api); atmo(root);
    const b = box(root);
    const big = div(b, 'ol-big f', `<span class="c-ice">AI 跑腿</span><i>·</i><span class="c-am">人只签关键几步</span><i>·</i><span class="c-gr">每一步留痕、可核查</span>`, 0, 0, 1680);
    const cols = [
      ['o2', 'ice', IC.robot(C.ice, 52), 'AI 跑腿', 'ice', ['检索', '下载', '整理', '初步分析', '核对引用'], '重复劳动交给 AI'],
      ['o3', 'am', IC.pen(C.am2, 52), '人只签关键几步', 'am', ['立项', '花钱', '对外发出任何东西'], '作者本人明确同意'],
      ['o4', 'gr', IC.doc(C.gr, 50), '每一步留痕', 'gr', ['检索式', '数据编号', '分析脚本', '每一次决定'], '记在项目文件 · 事后可复查'],
    ].map(([key, cls, ic, t, cc, items, foot], i) => {
      const c = div(b, 'g3 f hide dn', `<div style="display:flex;align-items:center;gap:16px">${ic}<div class="t3">${t}</div></div><div class="chiprow ${cc}">${items.map(x => `<span>${x}</span>`).join('')}</div><div class="s3" style="margin-top:14px">${foot}</div>`, i * 575, 112, 530, 250);
      c.dataset.k = key; c.dataset.c = cls; return c;
    });
    const codex = div(b, 'band ice f hide dn', `${IC.robot(C.ice, 40)}运行在 <b style="color:var(--ice)">Codex</b>（AI 编码助手）里 · 以一个<b>“技能”</b>的形式加载`, 0, 400, 1680);
    const what = div(b, 'band f hide dn', `<span class="strike on c-dm">新网站</span><span class="strike on c-dm">采购硬件</span><span style="color:var(--dim2)">→</span><span>一套<b>写成文件的工作规范</b> ＋ 一组<b>检查脚本</b></span>`, 0, 488, 1680);
    const nxt = div(b, 'band am f hide dn', '下一张：七个阶段的全貌 →', 0, 488, 1680);
    return { set(k, keys) {
      const at = reach(keys, k), cur = keys[k];
      cols.forEach(c => { sh(c, at(c.dataset.k)); tg(c, c.dataset.c, cur === c.dataset.k); });
      sh(codex, at('o5')); sh(what, at('o6') && !at('o7')); sh(nxt, at('o7'));
    } };
  }
};

/* 03b · SEVEN STAGES — glow pads on one curved path; stage ④ expands into the research loop */
V.stages = {
  title: '七个阶段：<em>先评估，再动刀</em>',
  build(root, api) {
    init(api); atmo(root, [[400, 520, 520, 'rgba(79,159,224,.55)', .3], [1500, 480, 520, 'rgba(227,150,43,.5)', .26]]);
    const b = box(root);
    const s = svgIn(b, 1680, 340, 0, 0); GK.defs(s);
    const P = [[110, 200], [350, 140], [590, 200], [830, 140], [1070, 200], [1310, 140], [1560, 200]];
    const ST = ['ai', 'au', 'ai', 'ai', 'warn', 'au', 'go'];
    const N = ['开工自检', '课题门', '文献起步<br>与撞车检查', '研究循环', '湿实验前<br>设计与 SOP', '湿实验', '稿件与<br>证据包'];
    const CH = [['环境·工具·文件', 'ai'], ['✍ 作者签字', 'au'], ['检索记录', 'ai'], ['↺ 一轮一轮', 'ai'], ['纸面干跑', 'warn'], ['人在实验室做', 'au'], ['每个数字可溯源', 'go']];
    const path = GK.path(s, GK.curve(P), [C.ice, C.gold, C.am2], { x1: 110, x2: 1560 });
    const pads = P.map(([x, y], i) => GK.pad(s, x, y, 'off', '①②③④⑤⑥⑦'[i], .7));
    const names = P.map(([x, y], i) => GK.label(b, x, y + 46, `<b>${N[i]}</b>`, 220));
    const chips = P.map(([x, y], i) => GK.chip(b, x, y - 132, CH[i][0], CH[i][1] + ' sm'));
    const LP = ['计划', '文献', '数据', '证据', '留痕', '引用核验', '复盘', '收尾门'];
    const loop = div(b, 'gpanel f hide dn', `<div class="k3 ice" style="text-align:center;margin-bottom:12px">④ 研究循环 · 每一轮同样的节奏</div><div class="lp">${LP.map((t, i) => `<span class="${i === 7 ? 'gate' : ''}">${t}</span>`).join('<i>→</i>')}<i style="color:var(--or2);font-weight:800">↺ 下一轮</i></div>`, 120, 352, 1440);
    const lps = loop.querySelectorAll('.lp span');
    const bandL = div(b, 'band ice f hide dn', '①–⑤ 都在电脑上完成', 0, 360, 1150);
    const bandR = div(b, 'band am f hide dn', '⑥ 花钱的湿实验 · 放在后面', 1190, 360, 490);
    const big = div(b, 'band am f hide dn', `${IC.scalpel(C.am2, 40)}<span style="font-size:38px;font-weight:900">先评估，再动刀</span>`, 440, 462, 800);
    let li = 0;
    api.every(() => { lps.forEach((e, i) => tg(e, 'on', i === li)); li = (li + 1) % lps.length; }, 650);
    const K = ['s2', 's3', 's4', 's5', 's7', 's8', 's9'];
    return { set(k, keys) {
      const at = reach(keys, k), cur = keys[k];
      pads.forEach((p, i) => { const on = at(K[i]); p.set(on ? ST[i] : 'off'); p.g.style.opacity = on || k < 1 ? 1 : .55; tg(chips[i], 'hide', !on); names[i].style.opacity = on || !at('s2') ? 1 : .55; });
      path.style.opacity = at('s9') ? 1 : .55;
      if (at('s10')) pads.forEach((p, i) => { p.g.style.opacity = 1; });
      sh(loop, at('s6') && !at('s10'));
      sh(bandL, at('s10')); sh(bandR, at('s10')); sh(big, at('s11'));
      if (cur === 's5' || cur === 's6') pads[3].set('ok');
    } };
  }
};

/* 03c · SURGICAL ANALOGY */
V.analogy = {
  title: '和外科的老规矩，<em>一一对应</em>',
  build(root, api) {
    init(api); photo(root, 'or', 'f', .4);
    const b = box(root);
    div(b, 'k3 ice', '这套流程', 0, 0, 400).style.textAlign = 'right';
    div(b, 'k3', '外科', 560, 0);
    const R = [['n2', '课题门', '术前讨论与知情同意', '方案定了、本人签字，才能开始'], ['n3', '干实验循环', '术前影像与检验', '先看清楚，再决定怎么做'], ['n4', '独立审查', '会诊', '没参与的人，换个角度再看'], ['n5', 'SOP 纸面干跑', '术前核查表', '器械、药品、步骤，逐项过一遍'], ['n6', '锁定数据', '手术记录', '写下来，就不能事后悄悄改'], ['n7', '证据包', '病理报告', '措辞与证据强度相符']];
    const s = svgIn(b, 1680, 470, 0, 0); GK.defs(s);
    const rows = R.map(([key, l, m, d], i) => {
      const y = 48 + i * 72;
      const line = GK.path(s, `M420 ${y + 32} L540 ${y + 32}`, [C.ice, C.am2], { x1: 420, x2: 540, w: 3 });
      const r = div(b, 'an-row', `<div class="an-l">${l}</div><div style="width:140px"></div><div class="an-r"><span class="m">${m}</span><span class="d">${d}</span></div>`, 0, y, 1680, 60);
      r.dataset.k = key; r._line = line; return r;
    });
    const banner = div(b, 'band am f hide dn', '外科靠规矩把风险降下来 · <b>科研选题，同样可以</b>', 240, 492, 1200);
    return { set(k, keys) {
      const at = reach(keys, k), cur = keys[k];
      rows.forEach(r => { const on = at(r.dataset.k); r.style.opacity = on ? 1 : .2; r._line.style.opacity = on ? 1 : .15; tg(r, 'cur', cur === r.dataset.k); });
      sh(banner, at('n8'));
    } };
  }
};

/* 04 · TOPIC CARD */
V.topiccard = {
  title: '一句话想法 → <em>一张课题卡</em>',
  build(root, api) {
    init(api); photo(root, 'topiccard', 'l', .9);
    const b = box(root);
    const ST = [['k2', '一句话想法', '“我想看看基因 A 和表型 B 有没有关系”'], ['k7', 'AI 最多问 3 个问题', '挑最影响方向的问：模型？预算？'], ['k9', '其余给推荐默认值', '明确标注“待确认”'], ['k11', '作者签字，才算立项', '签字和卡片的“指纹”绑在一起'], ['k13', '改一个字，签字失效', '必须重新确认']];
    const steps = ST.map(([key, t, s2], i) => { const e = div(b, 'tc-step', `<div class="n">${i + 1}</div><div><div class="tt">${t}</div><div class="ss">${s2}</div></div>`, 0, i * 88, 800); e.dataset.k = key; return e; });
    const L1 = div(b, 'f hide dn', ANA('术式变了，<b style="color:var(--or2)">同意书重签</b>'), 0, 470);
    const L2 = div(b, 'band f hide dn', '上会：大家看的是<b>同一张、签过字</b>的卡片', 0, 462, 800);
    const L3 = div(b, 'band am f hide dn', '模糊的想法 → <b>可讨论、可签字</b>', 0, 462, 800);
    const L4 = div(b, 'band ice f hide dn', '下一步：先查撞车 →', 0, 462, 800);
    const F = [['研究问题', '基因 A 是否影响表型 B', 0], ['物种 / 模型', '细胞模型', 1], ['干预', '敲低基因 A', 0], ['读出', '表型 B 相关指标', 1], ['范围', '体外 · 单一细胞系', 0], ['不做什么', '不做动物实验 · 不扩展到其他基因', 0], ['预算', '先做小额验证', 1], ['外部动作政策', '花钱、对外发出 → 逐项同意', 0]];
    const card = div(b, 'g3 f hide dn', `<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px"><div class="k3">课题卡</div><span class="tag3 ill">${ILL}</span></div>
      <div class="rows">${F.map(([l, v, t]) => `<div class="tc-row"><span class="lb">${l}</span><span class="vl">${v}${t ? '<span class="tag3 tbc">待确认</span>' : ''}</span></div>`).join('')}</div>
      <div style="display:flex;align-items:center;justify-content:space-between;margin-top:14px;padding-top:14px;border-top:1px solid rgba(23,32,51,.18)"><span class="sig b3" style="font-weight:700">✍ 作者签字：<span class="c-dm">未签</span></span><span class="fp">指纹 —</span></div>
      <div style="position:absolute;left:30px;top:-20px;background:#fff;border-radius:9px"><span class="stt c-dm">草稿</span></div>`, 870, 0, 810);
    const rows = card.querySelectorAll('.tc-row'), vals = card.querySelectorAll('.tc-row .vl'), tbc = card.querySelectorAll('.tbc');
    const sig = card.querySelector('.sig'), fp = card.querySelector('.fp'), stt = card.querySelector('.stt');
    const scopeOrig = vals[4].innerHTML;
    let filled = false;
    return { set(k, keys, instant) {
      const at = reach(keys, k), cur = keys[k];
      steps.forEach((e, i) => { const on = at(e.dataset.k) || (i === 0 && k < 0); e.style.opacity = on ? 1 : .28; });
      sh(card, at('k3'));
      const fill = at('k4');
      vals.forEach((v, i) => { if (fill && !filled && !instant) api.later(() => { v.style.opacity = 1; }, 150 + i * 230); else v.style.opacity = fill ? 1 : 0; });
      filled = fill;
      tbc.forEach(t => { t.style.opacity = at('k9') ? 1 : 0; });
      rows.forEach((r, i) => { tg(r, 'hl', (i === 5 && cur === 'k5') || (i === 7 && cur === 'k6') || (at('k16') && !at('k17'))); });
      const bad = at('k13') && !at('k15');
      tg(rows[4], 'bad', bad);
      vals[4].innerHTML = at('k13') ? '体外 · 两个细胞系' : scopeOrig;
      if (at('k15')) { stt.textContent = '已重新签字'; stt.className = 'stt c-gr'; }
      else if (bad) { stt.textContent = '已修改 · 签字失效'; stt.className = 'stt c-rd'; }
      else if (at('k11')) { stt.textContent = '已签字 · 立项'; stt.className = 'stt c-gr'; }
      else { stt.textContent = '草稿'; stt.className = 'stt c-dm'; }
      sig.innerHTML = at('k11') ? (bad ? '✍ 作者签字：<span class="c-rd strike on">已签</span> <span class="c-rd">失效</span>' : '✍ 作者签字：<span class="c-gr">已签</span>') : '✍ 作者签字：<span class="c-dm">未签</span>';
      fp.textContent = at('k12') ? (at('k13') ? '指纹 2f81…c03d（示意）' : '指纹 9c4e…a71b（示意）') : '指纹 —';
      fp.style.color = bad ? C.red : C.ice;
      tg(card, 'am', at('k11') && !bad); tg(card, 'rd', bad); tg(card, 'glowp', cur === 'k16');
      sh(L1, at('k14') && !at('k15')); sh(L2, at('k15') && !at('k17')); sh(L3, at('k17') && !at('k18')); sh(L4, at('k18'));
    } };
  }
};

/* 05a · COLLISION CHECK */
V.collide = {
  title: '先查撞车：<em>“查过了”，也要能复查</em>',
  build(root, api) {
    init(api); atmo(root);
    const b = box(root);
    const CORE = ['PubMed', 'Europe PMC', 'Crossref', 'GEO', 'BioStudies', 'PRIDE', 'GDC', '等'];
    const core = div(b, 'g3 ice f hide dn', `<div style="display:flex;align-items:center;justify-content:space-between"><div class="t3">核心检索 · <span class="c-ice">免费</span></div><span class="lockpill hide f">${IC.lock(C.am2, 24)}不可关闭</span></div><div class="chiprow ice" style="margin-top:16px">${CORE.map(c => `<span class="f hide">${c}</span>`).join('')}</div><div class="s3" style="margin-top:12px">文献 · 公开数据库，无论医院是否订阅都会查</div>`, 0, 0, 800, 250);
    const cchips = core.querySelectorAll('.chiprow span'), lockp = core.querySelector('.lockpill');
    const ext = div(b, 'g3 f hide dn', `<div class="t3">扩展 · <span class="c-dm">可关闭</span></div>
      <div style="display:flex;align-items:center;justify-content:space-between;margin-top:14px"><span class="b3">机构数据库（医院订阅）</span><span class="tgl"></span></div>
      <div style="display:flex;align-items:center;justify-content:space-between;margin-top:10px"><span class="b3">额外安装的插件</span><span class="tgl"></span></div>`, 0, 272, 800, 168);
    const tgls = ext.querySelectorAll('.tgl');
    const z = div(b, 'g3 rd f hide dn', `<div class="t3" style="font-size:38px">零结果 ≠ 没人做</div><div class="s3 zr f hide">关键词不对 · 术语不同 · 尚未收录</div>`, 0, 462, 800, 112);
    const zr = z.querySelector('.zr');
    const log = div(b, 'g3 f hide dn', `<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px"><div class="t3">每次检索 · 记下四件事</div><span class="tag3 ill">示意</span></div>
      <div class="kv"><span class="lb">检索式</span><span class="vl">("基因 A") AND ("表型 B")</span><span class="lb">检索日期</span><span class="vl">YYYY-MM-DD</span><span class="lb">返回条数</span><span class="vl">n 条</span><span class="lb">是否截断</span><span class="vl">否</span></div>`, 860, 0, 820, 262);
    const kvs = log.querySelectorAll('.kv .vl');
    const stamp = div(b, 'stamp3', '“查过了” = 可复查', 1330, 180);
    const n9 = div(b, 'band f hide dn', '半年后被问“当时怎么查的” → <b>打开记录就能回答</b>', 860, 286, 820);
    const n9b = div(b, 'band ice f hide dn', '记录可附在标书 / 论文的<b style="color:var(--ice)">补充材料</b>里', 860, 286, 820);
    const ov = div(b, 'g3 am f hide dn', `<div class="t3">相近研究 → <em>重叠程度由人判断</em></div><div style="display:flex;gap:14px;margin-top:14px;align-items:center"><span class="pill3 c-cr" style="font-size:22px">相近研究 1</span><span class="pill3 c-cr" style="font-size:22px">相近研究 2</span><span class="pill3 c-cr" style="font-size:22px">…</span><span class="strike on c-dm" style="font-size:26px;margin-left:auto">新颖性分数</span></div><div class="s3 n13 f hide" style="margin-top:10px">新颖性需要专业判断，不交给一个数字</div>`, 860, 372, 820, 202);
    const n13 = ov.querySelector('.n13');
    return { set(k, keys, instant) {
      const at = reach(keys, k);
      sh(core, at('x2')); sh(ext, at('x2'));
      core.style.opacity = !at('x2') ? '' : (at('x3') ? 1 : .5);
      ext.style.opacity = !at('x2') ? '' : (at('x5') ? 1 : .5);
      tset([...cchips], at('x3'), instant ? { later: f => f() } : api, 110);
      tg(lockp, 'hide', !at('x4'));
      tgls.forEach((t, i) => tg(t, 'on', at('x6') ? true : at('x5') && i === 0));
      sh(log, at('x7')); kvs.forEach((v, i) => { v.style.opacity = at('x7') ? 1 : 0; });
      tg(stamp, 'on', at('x8') && !at('x9'));
      sh(n9, at('x9') && !at('x9b')); sh(n9b, at('x9b'));
      sh(z, at('x10')); tg(zr, 'hide', !at('x11'));
      sh(ov, at('x12')); tg(n13, 'hide', !at('x13'));
    } };
  }
};

/* 05b · "FIRST REPORT" NEEDS A DATED SEARCH RECORD */
V.claimgate = {
  title: '“首次报道”，<em>必须附检索记录</em>',
  build(root, api) {
    init(api); atmo(root, [[300, 500, 500, 'rgba(227,150,43,.45)', .22], [1500, 700, 500, 'rgba(79,159,224,.45)', .24]]);
    const b = box(root);
    const doc = div(b, 'g3 f hide dn', `<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px"><div class="k3">稿件 / 标书 · 立项依据</div><span class="tag3 ill">示意</span></div>
      <div class="b3" style="font-size:28px;line-height:1.7">……本研究<span class="wv">首次报道</span>了基因 A 与表型 B 的关系，<br><span class="wv">国内外未见报道</span>……</div>
      <div style="height:12px;width:86%;border-radius:6px;background:rgba(23,32,51,.1);margin-top:18px"></div><div style="height:12px;width:64%;border-radius:6px;background:rgba(23,32,51,.1);margin-top:12px"></div>`, 0, 0, 900, 286);
    const wv = doc.querySelectorAll('.wv');
    const rule = div(b, 'g3 am f hide dn', `<div class="k3">规则</div><div class="t3" style="margin-top:10px">此类措辞 → 必须附<br><em>“截至某日期”的检索记录</em></div>`, 960, 0, 720, 170);
    const gate = div(b, 'g3 rd f hide dn', `<div style="display:flex;align-items:center;gap:18px"><span style="font-size:52px;color:var(--red);font-weight:900">✗</span><div><div class="t3">投稿前检查：拦下</div><div class="s3">缺检索记录 → 补充，或改写</div></div></div>`, 960, 192, 720, 120);
    const rw = div(b, 'g3 gr f hide dn', `<div class="k3" style="color:var(--green)">改写 · 措辞与证据相符</div><div class="b3" style="margin-top:10px;font-size:27px;line-height:1.6">……<b style="color:var(--green)">截至某年某月</b>，在 PubMed、Europe PMC 等数据库中，未检索到关于基因 A 与表型 B 关系的报道（检索记录见附件）……</div>`, 0, 318, 1100, 166);
    const fact = div(b, 'f hide dn', `<div style="display:flex;flex-direction:column;gap:14px"><span class="gchip go big rel">✓ 可核对的事实</span><span class="gchip dim big rel"><span class="strike on">难以证明的断言</span></span></div>`, 1160, 334);
    const banner = div(b, 'band am f hide dn', '减少标书和论文被质疑<b>“夸大创新性”</b>的空间', 0, 492, 1680);
    return { set(k, keys) {
      const at = reach(keys, k);
      sh(doc, at('y1')); wv.forEach(w => tg(w, 'on', at('y2')));
      sh(rule, at('y3')); sh(gate, at('y4') && !at('y6'));
      sh(rw, at('y5')); sh(fact, at('y6')); sh(banner, at('y7'));
      doc.style.filter = at('y5') ? 'saturate(.5)' : '';
    } };
  }
};

/* 06 · DRY LAB ON PUBLIC DATA */
V.dryrun = {
  title: '公开数据，<em>先跑一遍干实验</em>',
  build(root, api) {
    init(api); atmo(root);
    const b = box(root);
    const pa = div(b, 'f', '', 0, 0, 1680, 580), pb = div(b, 'f hide', '', 0, 0, 1680, 580);
    const s = svgIn(pa, 1680, 120, 0, 0); GK.defs(s);
    const pth = GK.path(s, 'M220 46 L1460 46', [C.am2, C.ice], { x1: 220, x2: 1460 });
    const n1 = GK.chip(pa, 230, 22, '课题卡 · 范围', 'au big'), n2 = GK.chip(pa, 840, 22, '公开组学 / 队列数据', 'ai big'), n3 = GK.chip(pa, 1450, 22, '分析 · 留痕', 'go big');
    const q = GK.chip(pa, 840, 98, 'A、B 同升同降？ · 分组之间有差异？', 'dim sm');
    const rec = GK.chip(pa, 1450, 98, '数据集 · 版本 · 脚本 → 可重跑', 'go sm');
    const bio = div(pa, 'band ice f hide dn', '科室没有专职生信 → 也能先看到<b style="color:var(--ice)">初步答案</b>，再决定要不要请专业的人', 0, 150, 1680);
    const BN = [['d7', '事实', '数据或文献里<br>直接可见', C.ice], ['d8', '关联', '统计上相关<br><b style="color:var(--or2)">≠ 因果</b>', C.am2], ['d9', '推测', '合理推断<br>需要实验验证', C.dim]];
    const bins = BN.map(([key, t, d, c], i) => { const e = div(pa, 'bin3 f hide dn', `<div class="bh" style="color:${c}">${t}</div><div class="bd">${d}</div>`, i * 575, 250, 530, 220); e.style.borderColor = c; e.dataset.k = key; return e; });
    const bh = div(pa, 'k3 f hide', '每一条证据 · 分三类', 0, 214);
    const band = div(pa, 'band am f hide dn', '分清楚 → 不把<b>“相关”</b>说成<b>“导致”</b>', 240, 492, 1200);
    const neg = div(pb, 'g3 f hide dn', `<div class="t3" style="font-size:42px;margin-top:6px">阴性也是结果</div><div class="b3 d12 f hide" style="margin-top:14px">没看到预期关联 → <b class="c-ice">如实记录</b>，不悄悄跳过</div><div class="b3 d13 f hide" style="margin-top:10px">没看到 ≠ 机制一定不存在 · <span class="c-dm">同样写清楚</span></div>`, 0, 0, 1680, 230);
    const d12 = neg.querySelector('.d12'), d13 = neg.querySelector('.d13');
    const tl = div(pb, 'f hide dn', '', 0, 262, 1680, 300);
    tl.innerHTML = `<div class="k3 ice">发现方向问题的时间 → 往前挪</div>
      <div style="position:absolute;left:0;right:0;top:120px;height:4px;border-radius:2px;background:linear-gradient(90deg,var(--ice),rgba(23,32,51,.2) 40%,var(--red))"></div>
      <div class="g3 ice" style="left:0;top:150px;width:700px"><div class="t3">在电脑上发现</div><div class="s3">代价：重新分析一遍</div></div>
      <div class="g3 rd tl2 f" style="left:980px;top:150px;width:700px"><div class="t3">三个月后，在 WB 上发现</div><div class="s3">代价：经费 · 时间 · 学生的信心</div></div>
      <div style="position:absolute;left:30px;top:106px;width:32px;height:32px;border-radius:50%;background:var(--ice);box-shadow:0 0 20px var(--ice)"></div>
      <div style="position:absolute;left:1618px;top:106px;width:32px;height:32px;border-radius:50%;background:var(--red);box-shadow:0 0 20px var(--red)"></div>`;
    const tl2 = tl.querySelector('.tl2');
    return { set(k, keys) {
      const at = reach(keys, k), B = at('d11');
      tg(pa, 'hide', B); tg(pb, 'hide', !B);
      [n1, n2, n3].forEach(c => tg(c, 'hide', false));
      n2.style.opacity = at('d2') ? 1 : .45; n3.style.opacity = at('d4') ? 1 : .45; pth.style.opacity = at('d4') ? 1 : .4;
      tg(q, 'hide', !at('d3')); tg(rec, 'hide', !at('d5'));
      sh(bio, at('d5b') && !at('d6'));
      tg(bh, 'hide', !at('d6')); bins.forEach(e => { sh(e, at('d6')); e.style.opacity = !at('d6') ? '' : (at(e.dataset.k) || at('d10') ? 1 : .45); tg(e, 'on', keys[k] === e.dataset.k); });
      sh(band, at('d10'));
      sh(neg, B); tg(d12, 'hide', !at('d12')); tg(d13, 'hide', !at('d13'));
      sh(tl, at('d14')); tl2.style.opacity = at('d15') ? 1 : .35;
    } };
  }
};

/* 07 · METHODS FROM OPEN-ACCESS FULL TEXT */
V.methods = {
  title: '读得到原文方法，<em>每个参数有出处</em>',
  build(root, api) {
    init(api); atmo(root, [[1300, 520, 560, 'rgba(79,159,224,.5)', .26], [300, 820, 420, 'rgba(227,150,43,.4)', .2]]);
    const b = box(root);
    const s = svgIn(b, 1680, 470, 0, 0); GK.defs(s);
    const up = GK.path(s, 'M150 40 L1500 40', [C.ice, C.gr], { x1: 150, x2: 1500 });
    const lo = GK.path(s, 'M150 418 L690 418', C.red, { dashed: true });
    const lo2 = GK.path(s, 'M760 418 L1180 418', C.gold, { still: true });
    const U = [[150, '开放获取文章', 'ai'], [560, 'Europe PMC 开放获取子集', 'ai'], [1000, '全文 · 指纹 7d2c…（示意）', 'ai'], [1450, '方法节', 'go']].map(([x, t, kd]) => GK.chip(b, x, 16, t, kd + ' big'));
    const tab = div(b, 'g3 f hide dn', `<div style="display:flex;align-items:center;justify-content:space-between"><div class="k3 ice">抽取的参数</div><span class="tag3 ill">示意</span></div><div class="ptab" style="margin-top:10px"><span class="h">参数</span><span class="h">取值</span><span class="h">出处</span>
      ${[['浓度', '…'], ['时间', '…'], ['细胞系 / 抗体', '…']].map(([p, v]) => `<span>${p}</span><span class="c-dm">${v}</span><span class="src f hide">↳ 原文句子 · 指纹 7d2c…</span>`).join('')}</div>`, 760, 96, 920);
    const srcs = tab.querySelectorAll('.src');
    const why = div(b, 'g3 am f hide dn', `<div class="t3">“这个浓度从哪来？”</div><div class="b3" style="margin-top:12px">任何时候都能查到出处<br><span class="c-dm">学生交来的方案，可以逐条核对</span></div>`, 0, 96, 700, 200);
    const L = [[150, '订阅文章', 'dim'], [700, '✗ 不抓取 · 不绕过付费墙', 'bad'], [1180, '作者 · 走机构权限', 'au']].map(([x, t, kd]) => GK.chip(b, x, 392, t, kd + ' big'));
    const floor = GK.chip(b, 1500, 396, '底线：合规 ＞ 方便', 'warn');
    const ver = div(b, 'band f hide dn', '拿到全文 <b>≠</b> 已核实 · 是否适用于自己的模型和条件，<b>由人判断</b>', 0, 492, 1680);
    const ver2 = div(b, 'band ice f hide dn', '工具把出处摆清楚 · <b style="color:var(--ice)">判断留给人</b>', 0, 492, 1680);
    const brick = div(b, 'band am f hide dn', '文献 → 实验方案：这座“桥”的<b>第一块砖</b>', 0, 492, 1680);
    return { set(k, keys) {
      const at = reach(keys, k);
      [at('r2'), at('r3'), at('r3'), at('r4')].forEach((on, i) => tg(U[i], 'hide', !on));
      up.style.opacity = at('r3') ? 1 : .3;
      sh(tab, at('r4')); srcs.forEach((e, i) => tg(e, 'hide', !at('r5')));
      sh(why, at('r6'));
      tg(L[0], 'hide', !at('r7')); tg(L[1], 'hide', !at('r7')); tg(L[2], 'hide', !at('r8')); tg(floor, 'hide', !at('r9'));
      lo.style.opacity = at('r7') ? 1 : 0; lo2.style.opacity = at('r8') ? 1 : 0;
      sh(ver, at('r10') && !at('r12')); sh(ver2, at('r12') && !at('r13')); sh(brick, at('r13'));
    } };
  }
};

/* 08 · TWO CONSULTATIONS — independent review */
V.review = {
  title: '两次“会诊”：<em>独立审查</em>',
  build(root, api) {
    init(api); photo(root, 'review', 'f', .55);
    const b = box(root);
    const tl = div(b, 'f', `<div style="position:absolute;left:0;right:0;top:36px;height:3px;background:linear-gradient(90deg,var(--ice),var(--or2),var(--green))"></div>
      ${[['干实验', 60], ['湿实验', 900], ['写作', 1560]].map(([t, x]) => `<div class="s3" style="position:absolute;left:${x}px;top:46px">${t}</div>`).join('')}`, 0, 0, 1680, 90);
    const g1 = GK.chip(b, 600, 14, '◆ 关口 1 · 买试剂 / 冻结 SOP 之前', 'warn');
    const g2 = GK.chip(b, 1300, 14, '◆ 关口 2 · 投稿之前', 'warn');
    const s = svgIn(b, 1680, 330, 0, 100); GK.defs(s);
    const pA = GK.path(s, 'M300 150 C360 150, 360 60, 430 60', C.ice, { w: 3 });
    const pB = GK.path(s, 'M300 150 C360 150, 360 240, 430 240', C.ice, { w: 3 });
    const pC = GK.path(s, 'M1250 60 C1300 60, 1300 150, 1350 150', C.am2, { w: 3 });
    const pD = GK.path(s, 'M1250 240 C1300 240, 1300 150, 1350 150', C.am2, { w: 3 });
    const mat = div(b, 'g3 f hide dn', `<div class="t3">审查材料</div><div class="s3">只看交给它的内容</div>`, 0, 196, 300, 110);
    const R = (t, y) => div(b, 'g3 ice f hide dn', `<div class="t3" style="font-size:29px">${t}</div><div class="s3">全新上下文 · 未参与前面的工作</div><div style="margin-top:8px"><span class="vchip c-gr">通过</span><span class="vchip c-am">修改</span><span class="vchip c-rd">阻断</span></div>`, 430, y, 820, 128);
    const rA = R('审查 A · 方法学', 100), rB = R('审查 B · 证据', 280);
    const wall = div(b, 'f hide', `<span class="gchip dim sm rel">⟂ 互不看对方结论</span>`, 1010, 236);
    const gate = div(b, 'g3 am f hide dn', `<div class="t3" style="font-size:28px">任一不通过</div><div class="t3" style="font-size:28px;color:var(--or2)">→ 不放行</div><div class="s3 r10 f hide" style="font-size:21px">修改：改完再审<br>阻断：先解决问题</div>`, 1350, 160, 330, 190);
    const r10 = gate.querySelector('.r10');
    const arch = GK.chip(b, 1515, 366, '意见与结论 · 存档可回看', 'go sm');
    const vA = rA.querySelectorAll('.vchip'), vB = rB.querySelectorAll('.vchip');
    let vi = 0, cyc = false;
    api.every(() => { if (!cyc) return; vi = (vi + 1) % 3; vA.forEach((v, i) => tg(v, 'on', i === vi)); vB.forEach((v, i) => tg(v, 'on', i === (vi + 1) % 3)); }, 900);
    const no = div(b, 'band f hide dn', '不派审查：<b>日常检索 · 格式修改</b> → 流程不拖慢', 0, 470, 1680);
    const lim = div(b, 'band am f hide dn', '边界：同一类 AI 模型 · 换干净上下文 <b>≠ 真人专家</b> · 不替代导师、同行、专家组', 0, 470, 1680);
    const pos2 = div(b, 'band ice f hide dn', '先自己过一遍 → 真人专家的时间，花在<b style="color:var(--ice)">真正需要判断</b>的地方', 0, 470, 1680);
    return { set(k, keys) {
      const at = reach(keys, k);
      tg(g1, 'hide', !at('v3')); tg(g2, 'hide', !at('v4'));
      sh(mat, at('v5')); sh(rA, at('v5')); sh(rB, at('v5'));
      [pA, pB].forEach(p => p.style.opacity = at('v5') ? 1 : 0); [pC, pD].forEach(p => p.style.opacity = at('v9') ? 1 : 0);
      tg(rA, 'ice', at('v6')); tg(rB, 'ice', at('v6'));
      tg(wall, 'hide', !at('v7'));
      cyc = at('v8') && !at('v9');
      if (at('v9')) { vA.forEach((v, i) => tg(v, 'on', i === 0)); vB.forEach((v, i) => tg(v, 'on', i === 1)); }
      else if (!at('v8')) { vA.forEach(v => tg(v, 'on', false)); vB.forEach(v => tg(v, 'on', false)); }
      sh(gate, at('v9')); tg(r10, 'hide', !at('v10')); tg(arch, 'hide', !at('v10b'));
      sh(no, at('v11') && !at('v12')); sh(lim, at('v12') && !at('v15')); sh(pos2, at('v15'));
    } };
  }
};

/* 09a · FEASIBILITY + PARAMETER GRADES */
V.prewet = {
  title: '湿实验前：<em>先省钱</em>',
  build(root, api) {
    init(api); photo(root, 'bench', 'f', .5);
    const b = box(root);
    const rep = div(b, 'g3 f hide dn', `<div class="k3">可行性报告 · 结论三选一</div>
      <div class="verd" data-v="go"><span class="vt c-gr">启动</span><span class="vd">方向与条件都具备</span></div>
      <div class="verd" data-v="cond"><span class="vt c-am">补齐条件后启动</span><span class="vd">方向可以，还缺一个前提</span></div>
      <div class="cond s3 f hide" style="margin:10px 0 0 18px;color:var(--or2)">↳ 例：先确认目标分子在细胞里确实表达（示意）</div>
      <div class="verd" data-v="hold"><span class="vt c-dm">暂缓</span><span class="vd">先回到干实验</span></div>`, 0, 0, 800, 380);
    const vds = rep.querySelectorAll('.verd'), cond = rep.querySelector('.cond');
    const gr = div(b, 'g3 f hide dn', `<div class="k3">每个参数 · 来源等级</div>
      <div class="grade" data-g="A"><span class="L" style="color:#fff;background:var(--ice)">A</span><div><div class="gt">有文献依据</div><div class="gd">能追溯到原文句子</div></div></div>
      <div class="grade" data-g="B"><span class="L" style="color:#fff;background:var(--or2)">B</span><div><div class="gt">工具建议值</div><div class="gd">有推理，但没有直接文献</div></div></div>
      <div class="grade" data-g="C"><span class="L" style="color:#fff;background:#b03a2e">C</span><div><div class="gt">实验室核实</div><div class="gd">本室仪器设置、本批试剂条件</div></div></div>
      <div class="csig f hide" style="margin-top:14px"><span class="gchip au rel">✍ 实验室负责人核实并签字 → 才写进最终方案</span></div>`, 860, 0, 820, 420);
    const gs = gr.querySelectorAll('.grade'), csig = gr.querySelector('.csig');
    return { set(k, keys) {
      const at = reach(keys, k);
      sh(rep, at('w2'));
      vds.forEach((v, i) => { v.style.opacity = at('w3') ? 1 : .35; tg(v, 'sel', at('w4') && i === 1); if (at('w4') && i !== 1) v.style.opacity = .5; });
      tg(cond, 'hide', !at('w4'));
      sh(gr, at('w5'));
      gs.forEach((g, i) => { g.style.opacity = at(['w6', 'w7', 'w8'][i]) ? 1 : .25; });
      tg(csig, 'hide', !at('w9'));
    } };
  }
};

/* 09b · SOP PAPER DRY RUN + INVENTORY */
V.sopdry = {
  title: 'SOP 纸面干跑：<em>切皮之前，逐项核查</em>',
  build(root, api) {
    init(api); photo(root, 'or', 'l', .75);
    const b = box(root);
    const STP = [['铺板 · 细胞接种', ''], ['分组：处理组 / 对照组', '缺阴性对照', 'u6'], ['加药处理', ''], ['孵育', '漏加盖', 'u4'], ['加检测试剂', ''], ['读数', '读数前某孔未加样', 'u5'], ['记录 · 锁定原始数据', '']];
    const sop = div(b, 'g3 f hide dn', `<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px"><div class="k3 ice">结构化 SOP · 纸面干跑</div><span class="tag3 ill">示意</span></div>${STP.map(([t, fl], i) => `<div class="sop"><span class="i">${String(i + 1).padStart(2, '0')}</span><span>${t}</span><span class="fl">${fl ? '✗ ' + fl : ''}</span></div>`).join('')}`, 0, 0, 820, 476);
    const rows = sop.querySelectorAll('.sop');
    let si = -1, scanning = false;
    api.every(() => { if (!scanning) { rows.forEach(r => tg(r, 'scan', false)); return; } si = (si + 1) % rows.length; rows.forEach((r, i) => tg(r, 'scan', i === si)); }, 520);
    const inv = div(b, 'g3 f hide dn', `<div class="k3" style="margin-bottom:6px">试剂清单 × 实验室库存</div>
      ${[['试剂 1', 'ok', '有货'], ['试剂 2', 'no', '缺货 → 提前采购'], ['试剂 3', 'ex', '已过期'], ['试剂 4', 'ok', '有货']].map(([n, c, t]) => `<div class="inv"><span>${n}</span><b class="${c} f hide">${t}</b></div>`).join('')}`, 880, 0, 800, 300);
    const ivb = inv.querySelectorAll('b');
    const pay = div(b, 'g3 am f hide dn', `<div style="display:flex;align-items:center;gap:18px">${IC.lock(C.am2, 46)}<div><div class="t3" style="font-size:29px">任何花钱的动作 → 作者明确同意</div><div class="s3">工具不会替任何人下单</div></div></div>`, 880, 326, 800, 120);
    const ana = div(b, 'f hide dn', ANA('术前核查表：器械清点、药品核对，<b style="color:var(--or2)">都在切皮之前</b>'), 0, 492);
    return { set(k, keys) {
      const at = reach(keys, k);
      sh(sop, at('u1')); scanning = at('u2') && !at('u4');
      rows.forEach((r, i) => { const key = STP[i][2]; tg(r, 'bad', key && at(key)); });
      sh(inv, at('u7')); ivb.forEach(x => tg(x, 'hide', !at('u7')));
      sh(pay, at('u8')); sh(ana, at('u9'));
    } };
  }
};

/* 10 · LOCK + DRY DRAFT FIRST + EVIDENCE PACK */
V.lock = {
  title: '数据锁定与<em>证据包</em>',
  build(root, api) {
    init(api); photo(root, 'archive', 'l', .8);
    const b = box(root);
    const T = [['l2', `${IC.lock(C.am2, 34)} 原始数据锁定`, '记下文件指纹 · 改动 → 指纹对不上 → 提示'], ['l5', '判定标准 · 先于数据', '看数据之前定好：什么算支持、什么不算'], ['l8', '阴性 · 如实记录', '它是课题决策的一部分']];
    const cards = T.map(([key, t, d], i) => { const c = div(b, 'g3 f hide dn', `<div class="t3" style="font-size:29px;display:flex;align-items:center;gap:10px">${t}</div><div class="s3" style="margin-top:8px">${d}</div>`, i * 575, 0, 530, 150); c.dataset.k = key; return c; });
    const fpc = GK.chip(b, 265, 164, '指纹 a3e9…（示意）', 'ok sm');
    const draft = div(b, 'g3 f hide dn', `<div class="k3 ice">干稿先行 · 同一篇文章</div><div class="slot3 dry">✓ 干实验结果 · 文章框架</div><div class="slot3 wet">⧗ 湿实验数据 · 回来后补进这里</div>`, 0, 210, 800, 210);
    const wet = draft.querySelector('.wet');
    const pack = div(b, 'g3 gr f hide dn', `<div style="display:flex;align-items:center;justify-content:space-between"><div class="k3" style="color:var(--green)">证据包 · 每个数字可溯源</div><span class="tag3 ill">示意</span></div>
      <div class="trace"><span class="a">图 1 · 某数值</span><span class="ar">→</span><span class="b">原始数据 ＋ 分析脚本</span></div>
      <div class="trace"><span class="a">表 1 · 某数值</span><span class="ar">→</span><span class="b">公开数据集 ＋ 版本</span></div>
      <div class="trace"><span class="a">正文 · 某结论</span><span class="ar">→</span><span class="b">文献 ＋ 原文句子</span></div>`, 860, 210, 820, 236);
    const ana = div(b, 'f hide dn', ANA('病理报告：结论有切片支撑，<b style="color:var(--or2)">措辞与证据强度一致</b>'), 0, 478);
    const end = div(b, 'band am f hide dn', '结题时留下：<b>一篇论文 ＋ 一份可以复查的过程</b>', 0, 478, 1680);
    const ana4 = GK.chip(b, 1110, 164, '外科类比 · 手术记录：写下就不能悄悄改', 'warn sm');
    return { set(k, keys) {
      const at = reach(keys, k), cur = keys[k];
      cards.forEach(c => { sh(c, at(c.dataset.k)); tg(c, 'am', cur && (cur === c.dataset.k || (c.dataset.k === 'l2' && (cur === 'l3' || cur === 'l4')) || (c.dataset.k === 'l5' && (cur === 'l6' || cur === 'l7')))); });
      tg(fpc, 'hide', !at('l2')); setKind(fpc, at('l3') && !at('l4') ? 'bad' : 'ok'); fpc.innerHTML = at('l3') && !at('l4') ? '✗ 指纹对不上 · 已提示' : '指纹 a3e9…（示意）';
      tg(ana4, 'hide', !(at('l4') && !at('l5')));
      sh(draft, at('l9')); tg(wet, 'on', at('l10')); wet.innerHTML = at('l10') ? '✓ 湿实验数据 · 已补进同一篇' : '⧗ 湿实验数据 · 回来后补进这里';
      sh(pack, at('l11'));
      sh(ana, at('l13') && !at('l14')); sh(end, at('l14'));
    } };
  }
};

/* 11 · ILLUSTRATIVE DEMO — fictional timeline (基因 A / 表型 B) */
V.demo = {
  title: '示意演示：<em>基因 A 是否影响表型 B？</em>',
  build(root, api) {
    init(api); atmo(root, [[300, 560, 520, 'rgba(79,159,224,.45)', .24], [1500, 640, 520, 'rgba(227,150,43,.45)', .22]]);
    const b = box(root);
    const tag = div(b, 'tag3 ill', ILL, 1440, -150); tag.style.fontSize = '24px';
    const X = i => 120 + i * 240, Y = 92;
    const base = div(b, '', '', X(0), Y - 2, X(6) - X(0), 4); base.style.background = 'rgba(23,32,51,.18)'; base.style.borderRadius = '2px';
    const fill = div(b, 'f', '', X(0), Y - 3, 0, 6); fill.style.background = 'linear-gradient(90deg,var(--ice),var(--or2))'; fill.style.borderRadius = '3px'; fill.style.boxShadow = '0 0 14px rgba(255,192,98,.5)';
    const LB = ['课题卡', '撞车检查', '公开数据', '可行性报告', '独立审查', 'SOP 干跑', '采购'];
    const labs = LB.map((t, i) => div(b, 'tl-lab', t, X(i), 6));
    const nodes = LB.map((t, i) => div(b, 'tl-node', String(i + 1), X(i), Y - 30));
    const CL = [
      [['e3', 'AI 问 3 问<br>其余待确认'], ['e4', '改范围 · ✍ 签字'], ['e7', '改卡 → 签字失效 → 重签 ✍']],
      [['e5', '发现相近研究（另一模型）'], ['e6', '调整切入点']],
      [['e8', '有关联<br><b class="c-am">方向相反</b>'], ['e9', '记为“关联”<br>假设修正']],
      [['e10', '<b class="c-am">补齐条件后启动</b>'], ['e11', '先确认 A 在目标细胞中表达']],
      [['e12', '方法学：<b class="c-am">修改</b>'], ['e12', '补对照组'], ['e14', '<b class="c-gr">✓ 已补</b>']],
      [['e13', '<b class="c-rd">缺阴性对照</b>'], ['e14', '<b class="c-gr">✓ 已补</b>']],
      [['e15', '<b class="c-gr">✓ 一小份验证试剂</b>'], ['e15', '<span class="strike on c-dm">整套实验的试剂</span>']],
    ];
    const cards = CL.map((ls, i) => { const c = div(b, 'tl-card f hide dn', ls.map(([k2, t]) => `<div class="ln f hide" data-k="${k2}">${t}</div>`).join(''), X(i), Y + 52); return c; });
    const q = div(b, 'band f hide dn', '一位青年医生提出：<b>基因 A，是否影响表型 B？</b>', 240, 330, 1200);
    const br = div(b, 'f hide dn', `<div style="display:flex;gap:30px;justify-content:center"><span class="gchip go big rel">验证通过 → 按计划扩展</span><span class="gchip warn big rel">不通过 → 换方向 · 损失很小</span></div>`, 0, 380, 1680);
    const ill2 = div(b, 'band am f hide dn', `<span class="tag3 ill">${ILL}</span> 只为说明流程如何运转`, 340, 470, 1000);
    const seq = div(b, 'band am f hide dn', '先在电脑上，把能排除的排除 → 再把钱花在<b>最关键的那一步</b>', 0, 470, 1680);
    const trail = div(b, 'band ice f hide dn', '每一次修改 · 每一次签字 · 每一条证据 → <b style="color:var(--ice)">都留在项目记录里</b>', 0, 470, 1680);
    const fin = div(b, 'band gr f hide dn', '上会讨论时，<b style="color:var(--green)">这条时间线本身，就是汇报材料</b>', 0, 470, 1680);
    const ST = [['e3', 'e7'], ['e5', 'e6'], ['e8', 'e9'], ['e10', 'e10'], ['e12', 'e14'], ['e13', 'e14'], ['e15', 'e15']];
    return { set(k, keys) {
      const at = reach(keys, k), cur = keys[k];
      sh(q, at('e2') && !at('e3'));
      let last = -1;
      ST.forEach(([a], i) => { if (at(a)) last = i; });
      fill.style.width = (last < 0 ? 0 : X(last) - X(0)) + 'px';
      nodes.forEach((n, i) => {
        n.className = 'tl-node';
        if (!at(ST[i][0])) return;
        let c = 'on';
        if (i === 0) c = cur === 'e7' ? 'rd' : 'gr';
        if (i === 1) c = 'am';
        if (i === 2) c = 'am';
        if (i === 3) c = 'am';
        if (i === 4 || i === 5) c = at('e14') ? 'gr' : (i === 5 ? 'rd' : 'am');
        if (i === 6) c = 'gr';
        n.classList.add(c);
        labs[i].style.color = 'var(--ink)';
      });
      labs.forEach((l, i) => { if (!at(ST[i][0])) l.style.color = 'var(--dim2)'; });
      cards.forEach((c, i) => { sh(c, at(ST[i][0])); c.querySelectorAll('.ln').forEach(l => tg(l, 'hide', !at(l.dataset.k))); });
      sh(br, at('e16') && !at('e18'));
      sh(ill2, at('e17') && !at('e18')); tg(tag, 'blink', cur === 'e17' || cur === 'e1');
      sh(seq, at('e18') && !at('e19')); sh(trail, at('e19') && !at('e20')); sh(fin, at('e20'));
    } };
  }
};

/* 12 · WHAT IT MEANS FOR A DEPARTMENT (expectations) */
V.dept = {
  title: '对科室意味着什么 · <em>我们的预期</em>',
  build(root, api) {
    init(api); photo(root, 'meeting', 'l', .8);
    const b = box(root);
    const tag = div(b, 'f hide', `<span class="pill3 c-am">预期 · 不是已证明的结果</span>`, 1290, -122);
    const R = [['g2', '选题会更高效', '每个课题带一张课题卡 ＋ 证据表上会 · 聚焦方向、边界、第一步验证', 'g3'], ['g4', '统一流程 · 可检查的留痕', '导师随时看进度 · 学生毕业，过程记录还在', 'g6'], ['g7', '立项依据可溯源', '研究基础的每一句，背后有检索记录与来源', 'g8'], ['g9', '经费花在初步验证过的方向', '公开数据看过 ＋ 最便宜的一步确认过，再投入大的实验', 'g10'], ['g11', '过程留痕，利于科研诚信', '谁 · 何时 · 做了什么 · 为什么这样决定', 'g12']];
    const rows = R.map(([key, t, d, k2], i) => { const r = div(b, 'dp-row f hide dn', `<div class="n">${i + 1}</div><div><div class="tt">${t}</div><div class="ss">${d}</div></div>`, 0, i * 96, 1220); r.dataset.k = key; r.dataset.k2 = k2; return r; });
    const band = div(b, 'band f hide dn', '能实现多少，取决于实际使用 → <b>先用一个真实课题来验证</b>', 0, 492, 1220);
    return { set(k, keys) {
      const at = reach(keys, k), cur = keys[k];
      tg(tag, 'hide', !at('g1'));
      rows.forEach(r => { sh(r, at(r.dataset.k)); tg(r, 'cur', cur === r.dataset.k || cur === r.dataset.k2 || (r.dataset.k === 'g4' && cur === 'g5')); });
      sh(band, at('g13'));
    } };
  }
};

/* 13 · COMPLIANCE */
V.comply = {
  title: '合规与安全：<em>设计的起点</em>',
  build(root, api) {
    init(api); atmo(root, [[960, 600, 640, 'rgba(79,159,224,.5)', .22]]);
    const b = box(root);
    const I = [['q2', '患者数据', '去标识化 · 不上传 · 不上云'], ['q3', '默认只用公开数据', '公开数据库 · 已发表文献'], ['q4', '境外模型 · 数据出境', '按院内规定评估<span class="q5 f hide"><br>未批准不用 · 需要走的流程先走</span>'], ['q6', '不替代伦理审批', '涉及人和动物的研究，照常申请'], ['q7', '花钱 · 对外动作', '逐项授权<span class="q8 f hide"><br>邮件、表格、联系外部：工具不自行发出</span>']];
    const P = [[0, 0], [575, 0], [1150, 0], [287, 222], [862, 222]];
    const cs = I.map(([key, t, d], i) => { const c = div(b, 'g3 f hide dn', `<div class="cp"><div class="ic">${IC.shield(C.ice, 40)}</div><div><div class="t3">${t}</div><div class="s3" style="margin-top:8px">${d}</div></div></div>`, P[i][0], P[i][1], 530, 196); c.dataset.k = key; return c; });
    const q5 = b.querySelector('.q5'), q8 = b.querySelector('.q8');
    const q9 = GK.chip(b, 840, 484, '这些规则写进课题卡的 · 外部动作政策', 'warn');
    const band = div(b, 'band am f hide dn', '合规不是附加条件，是<b>起点</b> · 拿不准，就先停下来问清楚', 0, 492, 1680);
    return { set(k, keys) {
      const at = reach(keys, k), cur = keys[k];
      cs.forEach(c => { sh(c, at(c.dataset.k)); tg(c, 'ice', cur === c.dataset.k || (c.dataset.k === 'q4' && cur === 'q5') || (c.dataset.k === 'q7' && cur === 'q8')); });
      tg(q5, 'hide', !at('q5')); tg(q8, 'hide', !at('q8'));
      tg(q9, 'hide', !(at('q9') && !at('q10'))); sh(band, at('q10'));
    } };
  }
};

/* 14 · WHAT WE PROMISE NOT TO DO */
V.promise = {
  title: '我们<em>承诺不做</em>的事',
  build(root, api) {
    init(api); atmo(root, [[300, 400, 500, 'rgba(227,150,43,.4)', .2], [1600, 800, 500, 'rgba(79,159,224,.4)', .2]]);
    const b = box(root);
    const I = [['b3', 'AI 不做实验 · 湿实验永远由人完成'], ['b4', '不证明新颖性或正确性 · 只把检索与证据摆清楚'], ['b5', '关键步骤必须人签字：立项 · 花钱 · 冻结方案 · 对外'], ['b6', '审查者是同类模型换上下文 · 不是真人专家'], ['b7', '目前运行在 Mac ＋ Codex · 不是现成的院内系统'], ['b8', '院内使用 · 遵守境外模型与数据的规定'], ['b9', '患者数据去标识化 · 永不上传'], ['b10', '不替代伦理审批']];
    const its = I.map(([key, t], i) => { const e = div(b, 'pr f hide dn', `<span class="x">✕</span><span>${t}</span>`, (i % 2) * 850, Math.floor(i / 2) * 82, 830); e.dataset.k = key; return e; });
    const no = div(b, 'g3 f hide dn', `<div class="k3" style="color:var(--dim)">我们没有</div><div class="b3" style="margin-top:8px">院内正式部署的案例<br>经过验证的使用效果数据</div>`, 0, 346, 820, 140);
    const yes = div(b, 'g3 gr f hide dn', `<div class="k3" style="color:var(--green)">我们已有</div><div class="b3" style="margin-top:8px">流程已实现 · 本地离线测试过<br><span class="c-am">真实场景的效果 → 由试点回答</span></div>`, 860, 346, 820, 140);
    const band = div(b, 'band am f hide dn', '信任，建立在<b>说清楚的边界</b>上，而不是漂亮的承诺上', 0, 492, 1680);
    return { set(k, keys) {
      const at = reach(keys, k), cur = keys[k];
      its.forEach(e => { sh(e, at(e.dataset.k)); tg(e, 'cur', cur === e.dataset.k); });
      sh(no, at('b11')); sh(yes, at('b12')); sh(band, at('b13'));
    } };
  }
};

/* 15 · HOW WE WORK TOGETHER */
V.offer = {
  title: '怎么合作：<em>买的是落地</em>',
  build(root, api) {
    init(api); photo(root, 'cover', 'f', .3);
    const b = box(root);
    const os = div(b, 'band ice f hide dn', `${IC.doc(C.ice, 36)}代码<b style="color:var(--ice)">开源 · MIT 许可证 · 免费使用</b><span class="s3 f3 f hide" style="margin-left:14px">有技术条件的团队，可以自己下载、自己配置</span>`, 0, 0, 1680);
    const f3 = os.querySelector('.f3');
    const svc = div(b, 'k3 f hide', '我们提供：让它在科室里真正落地的服务', 0, 92);
    const T = [['f5', '01', '半天工作坊', '拿科室的一次选题会，现场演示整个过程', '用科室自己的一个想法：现场生成课题卡、做撞车检查', 'f6'],
               ['f7', '02', '4–6 周试点', '1–2 个真实课题，从课题卡走到证据包', '交付：课题卡 · 撞车检查记录 · 可行性报告 · 证据包 · 一个清楚的决定', 'f8'],
               ['f9', '03', '院内部署与带教', '按医院的规定完成部署', '带教研究生和青年医生上手', 'f9']];
    const tiers = T.map(([key, no, t, s2, d, k2], i) => { const c = div(b, 'g3 tier f hide dn', `<div class="no">${no}</div><div class="tt">${t}</div><div class="ss">${s2}</div><div class="dl f hide">${d}</div>`, i * 575, 136, 530, 320); c.dataset.k = key; c.dataset.k2 = k2; c._dl = c.querySelector('.dl'); return c; });
    const B = [['f10', 'band', '可以单独选 · 也可以<b>从工作坊开始</b>，逐步推进'], ['f11', 'band ice', '全程遵守<b style="color:var(--ice)">合规规则</b>与<b style="color:var(--ice)">承诺不做的事</b>'], ['f12', 'band', '具体安排，按科室的情况<b>来商量</b>'], ['f13', 'band am', '从小处开始：<b>一个课题，一次试点</b>']];
    const bands = B.map(([key, cls, t]) => { const e = div(b, cls + ' f hide dn', t, 0, 486, 1680); e.dataset.k = key; return e; });
    return { set(k, keys) {
      const at = reach(keys, k), cur = keys[k];
      sh(os, at('f2')); tg(f3, 'hide', !at('f3')); tg(svc, 'hide', !at('f4'));
      tiers.forEach(c => { sh(c, at(c.dataset.k)); tg(c._dl, 'hide', !at(c.dataset.k2)); tg(c, 'am', cur === c.dataset.k || cur === c.dataset.k2 || (c.dataset.k === 'f7' && cur === 'f8b')); });
      const idx = ['f10', 'f11', 'f12', 'f13'].filter(x => at(x)).pop();
      bands.forEach(e => sh(e, e.dataset.k === idx));
    } };
  }
};

/* 16 · CLOSE — one decision */
V.close = {
  title: '',
  build(root, api) {
    init(api); root.classList.add('nohd'); photo(root, 'close', 'l', .95);
    const f = div(root, 'free', '', 0, 0);
    const rec = div(f, 'f hide dn', `<div class="eyebrow">讲完了</div><div class="cv-t" style="font-size:104px;margin-top:20px">选题，<br><em>不再靠拍脑袋</em></div>`, 136, 150, 1200);
    const sub = div(f, 'cv-s f hide dn', '让每个课题在湿实验之前，先做一次<b>“术前评估”</b>', 140, 452, 1200);
    const pills = div(f, 'cv-row f hide dn', `<span class="pill3 c-ice">${IC.robot(C.ice, 30)}AI 跑腿</span><span class="pill3 c-am">${IC.pen(C.am2, 30)}人只签关键几步</span><span class="pill3 c-gr">${IC.doc(C.gr, 28)}每一步留痕、可核查</span>`, 140, 540);
    const dec = div(f, 'f hide dn', `<div class="eyebrow">讲完了 · 您只做一个决定</div><div class="cv-t" style="font-size:118px;margin-top:22px">选一个课题<br><em>来试点</em></div>`, 136, 150, 1200);
    const opt = div(f, 'cv-row f hide dn', `<span class="pill3 c-cr">一个正在犹豫要不要做的课题</span><span class="pill3 c-cr">一个准备写进标书的方向</span>`, 140, 500);
    const wk = div(f, 'cv-s f hide dn', '用 <b>4–6 周</b>，看它能不能让科室的选题更轻松', 140, 590, 1200);
    const thx = div(f, 'f hide dn', `<div class="t3" style="font-size:44px">谢谢您的时间</div><div class="s3" style="margin-top:6px">aiai 人工智能学院 · 丁医生的医学笔记</div>`, 140, 690, 1000);
    return { set(k, keys) {
      const at = reach(keys, k), D = at('z4');
      sh(rec, !D); sh(sub, at('z2') && !D); sh(pills, at('z3') && !D);
      sh(dec, D); sh(opt, at('z5')); sh(wk, at('z6')); sh(thx, at('z7'));
    } };
  }
};

})();
