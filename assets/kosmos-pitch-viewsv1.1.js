/* aiai · Kosmos-lite 科研闭环 pitch v1.1 — bespoke animated views (v1.1: glow-stage pipeline/case/split-merge/card-sort views, ≥24 px labels, demo-1 plate fix) (original SVG/CSS work, aiai academy).
   Engine contract (loopgraph-engine v1.x): V[name] = { title, sub, build(root, api, keys) -> { set(k, keys, instant) } }.
   set(k) renders the state after line k of the beat (k = -1: before the first line). Demo outputs are illustrative. */
(() => {
'use strict';
const V = window.LG_VIEWS = {};
let A, E, S;
const reach = (keys, k) => b => { const i = keys.indexOf(b); return i >= 0 && i <= k; };
const tg = (el, c, on) => el && el.classList.toggle(c, !!on);
const box = root => A.el('div', 'sv', root);
const pos = (el, x, y, w, h) => { el.style.left = x + 'px'; el.style.top = y + 'px'; if (w != null) el.style.width = w + 'px'; if (h != null) el.style.height = h + 'px'; return el; };
const div = (p, cls, html, x, y, w, h) => { const e = A.el('div', cls, p, html); e.style.position = 'absolute'; if (x != null) pos(e, x, y, w, h); return e; };
const svgIn = (p, w, h, x, y) => { const s = A.svg('svg', { viewBox: `0 0 ${w} ${h}`, width: w, height: h }, p); s.style.position = 'absolute'; s.style.left = (x || 0) + 'px'; s.style.top = (y || 0) + 'px'; s.style.overflow = 'visible'; return s; };
const init = api => { A = api; E = api.el; S = api.svg; };
const C = { or: '#e8641b', or2: '#ff8a3d', te: '#2ec4b6', te2: '#7ae7dc', cr: '#f4ead7', dim: '#9aa7b8', dim2: '#6f7d90', red: '#ff5d5d', gr: '#49d98a', gold: '#f2b134', navy: '#14213d', ln: 'rgba(244,234,215,.18)' };
// show element when cond (fade + slide)
const sh = (el, on) => { tg(el, 'hide', !on); tg(el, 'dn', !on); };
const card = (p, x, y, w, html, cls) => div(p, 'kp-card f hide dn ' + (cls || ''), html, x, y, w);
const ana = (p, x, y, w, html) => div(p, 'ana f hide dn', `<span class="lbl">外科类比</span><span>${html}</span>`, x, y, w);
const term = (p, x, y, w, h, title) => {
  const t = div(p, 'term f', `<div class="bar"><i style="background:#ff5f57"></i><i style="background:#febc2e"></i><i style="background:#28c840"></i><span style="margin-left:10px">${title}</span></div><div class="body"></div>`, x, y, w, h);
  return { el: t, body: t.querySelector('.body') };
};
const tline = (body, html, cls) => { const l = E('div', 'ln f hide ' + (cls || ''), body, html); return l; };
V._h = { reach, tg, box, pos, div, svgIn, init, C, sh, card, ana, term, tline };

/* icon snippets (line-art, original) */
const IC = {
  scalpel: (c = C.or2) => `<svg width="46" height="46" viewBox="0 0 46 46"><path d="M6 40 L26 20 l6 6 L12 46z" fill="none" stroke="${c}" stroke-width="3" stroke-linejoin="round"/><path d="M26 20 l10 -14 q4 -2 4 3 l-8 17" fill="none" stroke="${c}" stroke-width="3" stroke-linejoin="round"/></svg>`,
  robot: (c = C.te2) => `<svg width="64" height="64" viewBox="0 0 64 64"><rect x="12" y="18" width="40" height="30" rx="8" fill="none" stroke="${c}" stroke-width="3"/><circle cx="25" cy="33" r="4" fill="${c}"/><circle cx="39" cy="33" r="4" fill="${c}"/><line x1="32" y1="18" x2="32" y2="8" stroke="${c}" stroke-width="3"/><circle cx="32" cy="7" r="3" fill="${c}"/><path d="M20 56 h24" stroke="${c}" stroke-width="3"/></svg>`,
  person: (c = C.gold) => `<svg width="64" height="64" viewBox="0 0 64 64"><circle cx="32" cy="20" r="11" fill="none" stroke="${c}" stroke-width="3"/><path d="M12 58 q20 -30 40 0" fill="none" stroke="${c}" stroke-width="3"/><path d="M27 36 l5 8 l5 -8" fill="none" stroke="${c}" stroke-width="2.5"/></svg>`,
  lock: (c = C.gold, s = 44) => `<svg width="${s}" height="${s}" viewBox="0 0 44 44"><rect x="8" y="19" width="28" height="21" rx="5" fill="none" stroke="${c}" stroke-width="3"/><path d="M14 19 v-6 a8 8 0 0 1 16 0 v6" fill="none" stroke="${c}" stroke-width="3"/><circle cx="22" cy="29" r="3" fill="${c}"/></svg>`,
  doc: (c = C.cr, s = 44) => `<svg width="${s}" height="${s}" viewBox="0 0 44 44"><path d="M10 4 h17 l9 9 v27 h-26z" fill="none" stroke="${c}" stroke-width="3" stroke-linejoin="round"/><path d="M27 4 v9 h9" fill="none" stroke="${c}" stroke-width="3"/><path d="M15 22 h15 M15 28 h15 M15 34 h10" stroke="${c}" stroke-width="2.5"/></svg>`,
};
V._ic = IC;

/* 0 · COVER */
V.cover = {
  title: '',
  build(root, api) {
    init(api);
    const b = box(root);
    const ring = svgIn(b, 1680, 560, 0, 0);
    const g = S('g', { class: 'f', opacity: .0 }, ring); g.style.transition = 'opacity 1s';
    S('circle', { cx: 840, cy: 250, r: 230, fill: 'none', stroke: 'rgba(46,196,182,.22)', 'stroke-width': 2, 'stroke-dasharray': '4 10' }, g);
    const orb = S('g', { class: 'spin', style: 'animation-duration:60s' }, g);
    for (let i = 0; i < 7; i++) { const a = i / 7 * Math.PI * 2 - Math.PI / 2; S('circle', { cx: 840 + Math.cos(a) * 230, cy: 250 + Math.sin(a) * 230, r: 9, fill: i % 2 ? C.te : C.or }, orb); }
    // c1: twelve weeks that end in a wrong turn
    const wk = div(b, 'f', '', 140, 120, 1400, 260);
    let cells = '';
    for (let i = 0; i < 12; i++) cells += `<div class="wkc" style="flex:1;height:64px;border-radius:10px;background:rgba(244,234,215,.07);border:1px solid var(--line);display:flex;align-items:flex-end;justify-content:center;padding-bottom:6px;font:500 23px var(--mono);color:var(--dim2);transition:background .4s,border-color .4s">W${i + 1}</div>`;
    wk.innerHTML = `<div class="kp-k" style="margin-bottom:16px">一个课题 · 十二周</div><div style="display:flex;gap:10px">${cells}</div>
      <div class="wkx f hide" style="margin-top:26px;display:flex;align-items:center;gap:18px;font-size:40px;font-weight:800;color:${C.cr}"><span style="color:${C.red};font-size:54px">✗</span>第 12 周：方向不对</div>`;
    const wcs = wk.querySelectorAll('.wkc'), wkx = wk.querySelector('.wkx');
    let wi = 0;
    api.every(() => { if (wi < 12) { wcs[wi].style.background = wi < 11 ? 'rgba(232,100,27,.35)' : 'rgba(255,93,93,.5)'; wcs[wi].style.borderColor = wi < 11 ? C.or : C.red; wi++; if (wi === 12) tg(wkx, 'hide', false); } }, 260);
    const ttl = div(b, 'f hide', `<div style="font-size:96px;font-weight:800;color:${C.cr};letter-spacing:.02em;line-height:1.1">Kosmos-lite 科研闭环</div>
      <div style="font-size:64px;font-weight:800;color:${C.or2};margin-top:18px">湿实验之前，先把账算清</div>
      <div class="mono" style="font-size:24px;color:${C.dim};margin-top:20px;letter-spacing:.08em">KOSMOS-LITE RESEARCH LOOP · DRY LAB FIRST, SIGN ONLY WHAT MATTERS</div>`, 0, 40, 1680);
    ttl.style.textAlign = 'center';
    const lead = div(b, 'f hide dn', `<div style="font-size:32px;color:${C.cr};line-height:1.5">AI 负责跑腿，人只签关键几步；每一步留痕、可核查。</div>
      <div style="display:flex;gap:22px;justify-content:center;margin-top:22px">
        <span class="kp-pill c-te">${IC.robot(C.te2).replace('width="64" height="64"', 'width="34" height="34"')}AI 跑腿</span>
        <span class="kp-pill c-gd">${IC.person(C.gold).replace('width="64" height="64"', 'width="34" height="34"')}人签关键几步</span>
        <span class="kp-pill c-gr">${IC.doc(C.gr, 30)}留痕 · 可核查</span></div>`, 0, 350, 1680);
    lead.style.textAlign = 'center';
    const foot = div(b, 'f hide dn', `<span class="kp-pill c-or">${IC.scalpel(C.or2).replace(/46/g, '30')}外科类比</span><span class="kp-pill c-dm">约 13 分钟</span><span class="kp-pill c-cr">最后只请您做一个决定</span>`, 0, 520, 1680);
    foot.style.cssText += ';display:flex;gap:20px;justify-content:center';
    return { set(k, keys) {
      const at = reach(keys, k);
      const t = at('c2');
      tg(wk, 'hide', t); g.setAttribute('opacity', t ? .28 : 0);
      tg(ttl, 'hide', !t);
      sh(lead, at('c3')); sh(foot, at('c4'));
    } };
  }
};

/* 1 · PAIN — three months of WB, three silent failures, the iceberg of cost */
V.pain = {
  title: '三个月的 WB，<em>白做了</em>',
  build(root, api) {
    init(api);
    const b = box(root);
    // membrane
    const mem = div(b, 'kp-card f', '', 0, 0, 740, 300);
    mem.innerHTML = `<div class="kp-k">Western blot · 第 <b class="wkn" style="color:${C.cr}">1</b> 周</div>`;
    const ms = svgIn(mem, 690, 200, 24, 64);
    S('rect', { x: 0, y: 0, width: 690, height: 200, rx: 10, fill: 'rgba(244,234,215,.05)', stroke: C.ln }, ms);
    const bands = [];
    for (let r = 0; r < 3; r++) for (let c = 0; c < 8; c++) bands.push(S('rect', { x: 30 + c * 82, y: 34 + r * 56, width: 60, height: 14, rx: 7, fill: '#d9d2c3', opacity: 0, style: 'transition:opacity .5s' }, ms));
    let bi = 0, wk = 1; const wkn = mem.querySelector('.wkn');
    api.every(() => { if (bi < bands.length) { bands[bi].setAttribute('opacity', (.25 + Math.random() * .6).toFixed(2)); bi++; if (bi % 2 === 0 && wk < 12) wkn.textContent = ++wk; } }, 140);
    // failures
    const fails = [['p2', '没设好对照', '结果没法解释'], ['p3', '试剂过期', '没有人注意到'], ['p4', '方案中途改过', '谁、何时、为何——记录里找不到']];
    const fc = fails.map(([key, t, s], i) => { const c = card(b, 800, i * 112, 880, `<div class="kp-row"><span style="font-size:40px;color:${C.red};width:44px">✗</span><div><div class="kp-t">${t}</div><div class="kp-s" style="margin-top:2px">${s}</div></div></div>`); c.style.padding = '16px 24px'; c.dataset.k = key; return c; });
    // iceberg cost
    const ice = div(b, 'f hide dn', '', 0, 330, 740, 230);
    ice.innerHTML = `<svg width="740" height="230" viewBox="0 0 740 230" style="overflow:visible">
      <line x1="0" y1="62" x2="740" y2="62" stroke="${C.te}" stroke-width="2" stroke-dasharray="10 8" opacity=".6"/>
      <text x="736" y="54" text-anchor="end" fill="${C.te2}" font-size="23" class="m">账面 ↑ ／ 水面下 ↓</text>
      <path d="M300 62 L350 8 L410 30 L450 62Z" fill="rgba(244,234,215,.85)"/>
      <path d="M220 62 L530 62 L600 150 L470 225 L280 225 L160 140Z" fill="rgba(46,196,182,.18)" stroke="${C.te}" stroke-width="2"/>
      <text x="375" y="46" text-anchor="middle" fill="#14213d" font-size="23" font-weight="800">经费</text>
      <text x="375" y="120" text-anchor="middle" fill="${C.cr}" font-size="26" font-weight="700">学生的时间</text>
      <text x="375" y="190" text-anchor="middle" fill="${C.red}" font-size="26" font-weight="800">诚信风险</text></svg>`;
    const hard = card(b, 800, 370, 880, `<div class="kp-t" style="font-size:28px">单个错误都不难发现，<em>难的是动手之前，有人系统地查一遍。</em></div>`);
    const cmp = card(b, 800, 370, 880, `<div style="display:grid;grid-template-columns:120px 1fr 1fr 1fr;gap:10px 14px;align-items:center;font-size:24px">
      <span class="c-or" style="font-weight:700">外科</span><span>✓ 术前讨论</span><span>✓ 器械清点</span><span>✓ 手术记录</span>
      <span class="c-dm" style="font-weight:700">科研</span><span class="c-dm">□ 常常空着</span><span class="c-dm">□ 常常空着</span><span class="c-dm">□ 常常空着</span></div>`);
    return { set(k, keys) {
      const at = reach(keys, k);
      fc.forEach(c => sh(c, at(c.dataset.k)));
      sh(ice, at('p5'));
      sh(hard, at('p6') && !at('p7')); sh(cmp, at('p7'));
    } };
  }
};

/* 2a · CASE — the proposed axis and the usual shopping list */
V.caseq = {
  title: '一个卵巢癌靶点课题 · <em>已匿名</em>',
  build(root, api) {
    init(api);
    const b = box(root);
    const tag = div(b, 'f hide dn', `<span class="kp-pill c-gd">匿名处理 · 不提具体基因</span>`, 0, 0);
    const ax = svgIn(b, 1680, 250, 0, 40);
    const node = (x, label, sub, col, w = 200) => { const g = S('g', { class: 'f' }, ax); S('rect', { x: x - w / 2, y: 60, width: w, height: 120, rx: 60, fill: 'rgba(20,33,61,.9)', stroke: col, 'stroke-width': 3 }, g); S('text', { x, y: 128, 'text-anchor': 'middle', fill: C.cr, 'font-size': 46, 'font-weight': 800 }, g).textContent = label; S('text', { x, y: 220, 'text-anchor': 'middle', fill: C.dim, 'font-size': 23 }, g).textContent = sub; return g; };
    node(380, 'A', '上游分子（匿名）', C.te);
    node(840, 'B', '下游分子（匿名）', C.te);
    node(1300, '肿瘤表型', '迁移 · 增殖等', C.or, 300);
    const arr = [];
    [[480, 740], [940, 1150]].forEach(([x1, x2]) => { const l = S('line', { x1, y1: 120, x2, y2: 120, stroke: C.or2, 'stroke-width': 5, class: 'edge flow', opacity: 0 }, ax); S('path', { d: `M${x2} 106 l18 14 l-18 14z`, fill: C.or2, class: 'edge', opacity: 0 }, ax); arr.push(l, ax.lastChild); });
    const axl = div(b, 'f hide', `<span class="kp-t" style="font-size:26px">设想：<em>A 调控 B，B 推动表型</em>——构成一条轴</span>`, 0, 300, 1680); axl.style.textAlign = 'center';
    const items = ['敲低试剂', '过表达质粒', '回复实验'];
    const cart = div(b, 'f hide dn', `<div class="kp-k" style="margin-bottom:12px;color:${C.dim}">常规路线 · 下一步直接下单</div><div style="display:flex;gap:24px">${items.map(t => `<div class="kp-card" style="position:relative;padding:16px 26px;font-size:26px;color:${C.cr}">🧪 ${t}</div>`).join('')}<div style="font-size:40px;align-self:center;color:${C.dim}">→ 湿实验</div></div>`, 160, 380, 1400);
    const gate = div(b, 'f hide', `<div style="display:flex;align-items:center;gap:22px;padding:18px 30px;border-radius:16px;background:rgba(242,177,52,.14);border:2px solid ${C.gold};box-shadow:0 0 40px rgba(242,177,52,.25)">
      <span style="font-size:46px;color:${C.gold}">‖</span><div><div class="kp-t">先停一下</div><div class="kp-s" style="margin-top:2px;color:${C.cr}">花钱之前，让干实验把这条轴查一遍</div></div></div>`, 1060, 360, 600);
    gate.style.transform = 'translateY(-30px)';
    return { set(k, keys) {
      const at = reach(keys, k);
      sh(tag, at('q1'));
      arr.forEach(a => a.setAttribute('opacity', at('q2') ? 1 : 0)); tg(axl, 'hide', !at('q2'));
      sh(cart, at('q3')); tg(cart, 'dimmed', at('q4'));
      tg(gate, 'hide', !at('q4')); gate.style.transform = at('q4') ? 'none' : 'translateY(-30px)';
    } };
  }
};

/* 2b · FOUR ROUNDS of dry lab */
V.rounds = {
  title: '干实验跑了<em>四轮</em>',
  build(root, api) {
    init(api);
    const b = box(root);
    const R = [['r2', '第 1 轮', '多源文献', 'lit'], ['r3', '第 2 轮', '公开 bulk 转录组', 'sc'], ['r4', '第 3 轮', '公开蛋白组', 'sc'], ['r5', '第 4 轮', '公开单细胞', 'um']];
    const cards = R.map(([key, n, t, kind], i) => {
      const c = card(b, i * 425, 0, 395, `<div class="kp-k">${n}</div><div class="kp-t" style="font-size:28px;margin-top:4px">${t}</div><div class="viz" style="position:relative;height:190px;margin-top:10px"></div>
        <div class="ctl f hide" style="display:flex;gap:10px;margin-top:8px"><span class="tag t-ok">阳性对照 ✓</span><span class="tag t-ok">阴性对照 ✓</span></div>`);
      c.dataset.k = key; c.style.height = '360px';
      const vz = c.querySelector('.viz');
      if (kind === 'lit') vz.innerHTML = `<div style="display:flex;flex-direction:column;gap:10px;padding-top:6px">${[0, 1, 2].map(j => `<div style="display:flex;gap:10px;align-items:center"><span style="width:26px;height:32px;border:2px solid ${C.dim};border-radius:4px"></span><span style="flex:1;height:10px;border-radius:5px;background:rgba(244,234,215,.14)"></span></div>`).join('')}<div style="font-size:23px;color:${C.gold};margin-top:4px">直接证据：未见</div></div>`;
      else {
        const s = svgIn(vz, 340, 190, 0, 0);
        S('line', { x1: 20, y1: 175, x2: 330, y2: 175, stroke: C.ln, 'stroke-width': 2 }, s); S('line', { x1: 20, y1: 10, x2: 20, y2: 175, stroke: C.ln, 'stroke-width': 2 }, s);
        if (kind === 'sc') {
          for (let j = 0; j < 70; j++) S('circle', { cx: 30 + Math.random() * 290, cy: 25 + Math.random() * 140, r: 4, fill: C.te2, opacity: .55 }, s);
          S('line', { x1: 30, y1: 98, x2: 320, y2: 92, stroke: C.or2, 'stroke-width': 3 }, s);
          S('text', { x: 325, y: 22, 'text-anchor': 'end', fill: C.dim, 'font-size': 23, class: 'm' }, s).textContent = 'A vs B · 示意';
        } else {
          const cl = [[90, 70, C.te2, 'A'], [250, 120, C.or2, 'B'], [180, 50, C.dim, '']];
          cl.forEach(([cx, cy, f, l]) => { for (let j = 0; j < 26; j++) S('circle', { cx: cx + (Math.random() - .5) * 90, cy: cy + (Math.random() - .5) * 60, r: 3.5, fill: f, opacity: .7 }, s); if (l) S('text', { x: cx, y: cy - 40, 'text-anchor': 'middle', fill: f, 'font-size': 23, 'font-weight': 700 }, s).textContent = l + ' 高表达'; });
          S('text', { x: 325, y: 186, 'text-anchor': 'end', fill: C.dim, 'font-size': 23, class: 'm' }, s).textContent = '示意';
        }
      }
      return c;
    });
    const verdict = div(b, 'f hide', `<div style="display:flex;align-items:center;gap:20px;padding:18px 30px;border-radius:16px;background:rgba(242,177,52,.12);border:2px solid ${C.gold}">
      <span style="font-size:40px;color:${C.gold}">◎</span><span class="kp-t">四轮都<em>没有看到</em>这条轴所需要的正向共调控</span></div>`, 0, 392, 1680);
    const log = div(b, 'f hide dn', `<div class="kp-row" style="font-size:23px;color:${C.dim};gap:18px"><span class="tag t-ana">证据日志</span>检索式 · 数据编号 · 分析脚本 · 输出 —— 全部留档，事后可复查</div>`, 0, 495, 1680);
    return { set(k, keys) {
      const at = reach(keys, k);
      const pre = at('r1'); let last = -1;
      cards.forEach((c, i) => { const on = at(c.dataset.k); if (on) last = i; sh(c, pre); tg(c, 'dimmed', pre && !on); c.querySelector('.ctl').classList.toggle('hide', !at('r6')); });
      cards.forEach((c, i) => tg(c, 'glow-te', i === last && !at('r6')));
      tg(verdict, 'hide', !at('r7')); sh(log, at('r8'));
    } };
  }
};

/* 2c · DECISION — pause the axis, do the cheapest decisive step */
V.decision = {
  title: '决定：<em>先做最便宜的一步</em>',
  build(root, api) {
    init(api);
    const b = box(root);
    const left = div(b, 'f', '', 0, 0, 760, 330);
    left.innerHTML = `<svg width="760" height="200" viewBox="0 0 760 200" style="overflow:visible">
      <g opacity=".55"><rect x="20" y="50" width="140" height="90" rx="45" fill="none" stroke="${C.dim}" stroke-width="3"/><text x="90" y="108" text-anchor="middle" fill="${C.cr}" font-size="38" font-weight="800">A</text>
      <rect x="300" y="50" width="140" height="90" rx="45" fill="none" stroke="${C.dim}" stroke-width="3"/><text x="370" y="108" text-anchor="middle" fill="${C.cr}" font-size="38" font-weight="800">B</text>
      <rect x="560" y="50" width="190" height="90" rx="45" fill="none" stroke="${C.dim}" stroke-width="3"/><text x="655" y="105" text-anchor="middle" fill="${C.cr}" font-size="28" font-weight="700">表型</text>
      <line x1="165" y1="95" x2="290" y2="95" stroke="${C.dim}" stroke-width="4" stroke-dasharray="10 10"/><line x1="445" y1="95" x2="550" y2="95" stroke="${C.dim}" stroke-width="4" stroke-dasharray="10 10"/>
      <text x="228" y="80" text-anchor="middle" fill="${C.gold}" font-size="34">?</text><text x="498" y="80" text-anchor="middle" fill="${C.gold}" font-size="34">?</text></g></svg>
      <div class="d1 f hide" style="font-size:28px;color:${C.cr};margin-top:6px">公开数据里没看到 <b style="color:${C.or2}">≠</b> 机制不存在</div>`;
    const d1 = left.querySelector('.d1');
    const pause = div(b, 'stamp', '暂停 · 全轴实验', 140, 270); pause.style.color = C.gold; pause.style.fontSize = '42px';
    const tree = div(b, 'f hide dn', '', 820, 0, 860, 380);
    tree.innerHTML = `<div class="kp-card" style="position:relative;border-color:${C.te};box-shadow:0 0 30px rgba(46,196,182,.25)"><div class="kp-k" style="color:${C.te2}">最便宜、最能说明问题的一步</div><div class="kp-t" style="margin-top:6px">确认这个蛋白在自己的细胞里<em>有内源表达</em></div></div>
      <svg width="860" height="80" viewBox="0 0 860 80" style="display:block"><path d="M430 0 v30 h-230 v40 M430 30 h230 v40" fill="none" stroke="${C.dim}" stroke-width="3"/></svg>
      <div class="br" style="display:flex;gap:40px;opacity:0;transition:opacity .6s"><div class="kp-card" style="position:relative;flex:1;border-color:${C.gr}"><div class="kp-k" style="color:${C.gr}">过了</div><div class="kp-t" style="font-size:26px">再买敲低和回复实验试剂</div></div>
      <div class="kp-card" style="position:relative;flex:1;border-color:${C.gold}"><div class="kp-k">过不了</div><div class="kp-t" style="font-size:26px">换方向</div></div></div>`;
    const br = tree.querySelector('.br');
    const quote = div(b, 'f hide dn', `<div style="font-size:34px;font-weight:800;color:${C.cr};line-height:1.4">「干实验先帮我省下了一笔湿实验的钱，<span style="color:${C.or2}">也省下了几个月。</span>」</div>`, 0, 450, 1680);
    const ct = ana(b, 0, 450, 1680, `急诊里的一张 CT：不替你开刀，但会告诉你——<b>这一刀，先别急着开。</b>`);
    return { set(k, keys) {
      const at = reach(keys, k);
      tg(d1, 'hide', !at('d1'));
      tg(pause, 'on', at('d2'));
      sh(tree, at('d3')); br.style.opacity = at('d4') ? 1 : 0;
      sh(quote, at('d5') && !at('d6')); sh(ct, at('d6'));
    } };
  }
};

/* 3 · POSITIONING vs autonomous labs */
V.autolab = {
  title: '自动化的是「手」，还是<em>「决策与证据」</em>',
  build(root, api) {
    init(api);
    const b = box(root);
    const L = card(b, 0, 0, 780, '');
    L.style.minHeight = '450px';
    L.innerHTML = `<div class="kp-k">AutoDNA · Nature 2026</div><div class="kp-t" style="margin-top:4px">AI 原生的自动化生物分子实验室</div><div class="arm" style="position:relative;height:200px;margin-top:10px"></div>
      <div class="st f hide" style="display:flex;gap:12px;flex-wrap:wrap"><span class="kp-pill c-te">20 多类仪器</span><span class="kp-pill c-te">11,000 多个步骤</span><span class="kp-pill c-dm">人：补试剂、耗材等硬件维护</span></div>
      <div class="hd2 f hide" style="margin-top:14px;font-size:30px;font-weight:800;color:${C.te2}">自动化「手」</div>`;
    const arm = L.querySelector('.arm');
    const s = svgIn(arm, 720, 200, 0, 0);
    const xs = [70, 250, 430, 610];
    xs.forEach((x, i) => { S('rect', { x: x - 60, y: 120, width: 120, height: 70, rx: 10, fill: 'rgba(46,196,182,.08)', stroke: C.te, 'stroke-width': 2 }, s); S('text', { x, y: 162, 'text-anchor': 'middle', fill: C.dim, 'font-size': 23 }, s).textContent = ['合成', '扩增', '测序', '检测'][i]; });
    S('line', { x1: 0, y1: 20, x2: 720, y2: 20, stroke: C.ln, 'stroke-width': 4 }, s);
    const head = S('g', {}, s); S('rect', { x: -24, y: 8, width: 48, height: 24, rx: 6, fill: C.te }, head); const rod = S('line', { x1: 0, y1: 32, x2: 0, y2: 90, stroke: C.te2, 'stroke-width': 6 }, head); S('path', { d: 'M-14 90 h28 l-6 16 h-16z', fill: C.te2 }, head);
    let xi = 0; api.every(() => { xi = (xi + 1) % 4; head.style.transition = 'transform 1s cubic-bezier(.5,0,.3,1)'; head.setAttribute('transform', `translate(${xs[xi]},0)`); }, 1300);
    head.setAttribute('transform', `translate(${xs[0]},0)`);
    const R = card(b, 900, 0, 780, '');
    R.style.minHeight = '450px';
    R.innerHTML = `<div class="kp-k" style="color:${C.or2}">Kosmos-lite</div><div class="kp-t" style="margin-top:4px">管研究决策和证据链</div>
      <div style="display:flex;flex-direction:column;gap:12px;margin-top:20px">${['做不做', '怎么做', '做完能说什么'].map((t, i) => `<div class="kp-row" style="font-size:26px;color:${C.cr}"><span style="width:40px;height:40px;border-radius:10px;border:2px solid ${C.gold};display:inline-flex;align-items:center;justify-content:center;font-size:23px;color:${C.gold}">G</span>${t}</div>`).join('')}</div>
      <div class="st2 f hide" style="display:flex;gap:12px;margin-top:20px"><span class="kp-pill c-gr">无需任何硬件</span><span class="kp-pill c-gr">普通实验室明天能用</span></div>
      <div class="hd3 f hide" style="margin-top:14px;font-size:30px;font-weight:800;color:${C.or2}">治理「决策与证据」</div>`;
    const plus = div(b, 'f hide', `<div style="width:96px;height:96px;border-radius:50%;background:rgba(6,10,18,.95);border:2px solid ${C.gold};display:flex;flex-direction:column;align-items:center;justify-content:center;color:${C.gold}"><b style="font-size:36px;line-height:1">+</b><span style="font-size:23px">互补</span></div>`, 792, 170);
    const cite = div(b, 'f hide', `<span class="mono" style="font-size:23px;color:${C.dim2}">Wu, M. et al. An AI-native experimental laboratory for autonomous biomolecular operations. <i>Nature</i> (2026). doi:10.1038/s41586-026-11228-6</span>`, 0, 530, 1680);
    return { set(k, keys) {
      const at = reach(keys, k);
      sh(L, at('a1')); tg(cite, 'hide', !at('a1'));
      tg(L.querySelector('.st'), 'hide', !at('a2')); tg(L.querySelector('.hd2'), 'hide', !at('a3'));
      sh(R, at('a4')); tg(R.querySelector('.hd3'), 'hide', !at('a4'));
      tg(R.querySelector('.st2'), 'hide', !at('a5')); tg(plus, 'hide', !at('a5'));
    } };
  }
};

/* 4 · OVERVIEW with the workflow poster */
V.poster = {
  title: '七步一张图：<em>干实验找方向 → 门控湿实验 → 证据包</em>',
  build(root, api) {
    init(api);
    const b = box(root);
    const fr = div(b, 'f', '', 40, -10, 384, 572);
    fr.innerHTML = `<img src="media/kosmos-pitch/workflow-rc5v1.0.webp" alt="Kosmos-lite v1.4 工作流全图" style="width:384px;height:572px;border-radius:14px;display:block;box-shadow:0 20px 60px rgba(0,0,0,.5)"><div class="scan" style="position:absolute;left:-6px;width:396px;border:3px solid ${C.or2};border-radius:10px;box-shadow:0 0 24px rgba(232,100,27,.6);transition:top .7s var(--ease),height .7s var(--ease),opacity .4s;opacity:0"></div>`;
    const scan = fr.querySelector('.scan');
    // y-bands of the 7 steps on the 572px-tall poster (approximate, from the drawn layout)
    const band = [[50, 95], [125, 140], [262, 45], [305, 30], [335, 52], [390, 60], [450, 60], [512, 58]];
    const roles = div(b, 'f hide dn', `<div style="display:flex;gap:24px"><div class="kp-card" style="position:relative;flex:1;display:flex;gap:16px;align-items:center;padding:14px 20px">${IC.robot()}<div><div class="kp-t" style="font-size:26px">Codex 等 AI 编码助手</div><div class="kp-s" style="margin-top:0">在划定的边界内执行</div></div></div>
      <div class="kp-card" style="position:relative;flex:1;display:flex;gap:16px;align-items:center;padding:14px 20px">${IC.person()}<div><div class="kp-t" style="font-size:26px">作者</div><div class="kp-s" style="margin-top:0">关键决定 + 亲手做实验</div></div></div></div>`, 500, 0, 1180);
    const steps = [['①', '课题配置 + G1 课题门', '术前知情同意'], ['②', '干实验循环', '术前影像与检验'], ['③', '假设表', '鉴别诊断清单'], ['④', '分阶段设计 + 干稿', '损伤控制'], ['⑤', '结构化 SOP', '模拟手术 · 器械清点'], ['⑥', '湿实验 + 质控 + 封存', '术中冰冻 · 手术记录'], ['⑦', '等效门 + 措辞门 → 证据包', '病理报告'], ['底线', 'G-spend / G-external 逐项授权', '主刀签字']];
    const list = div(b, 'f', '', 500, 118, 1180, 440);
    list.innerHTML = steps.map(([n, t, a], i) => `<div class="it f hide" style="display:flex;align-items:center;gap:16px;height:52px;border-bottom:1px solid var(--line)"><b class="mono" style="width:62px;color:${i === 7 ? C.red : C.or2};font-size:${i === 7 ? 20 : 28}px">${n}</b><span style="flex:1;font-size:25px;color:${C.cr}">${t}</span><span class="an f" style="font-size:23px;color:${C.or2};opacity:0">${IC.scalpel(C.or2).replace(/46/g, '22')} ${a}</span></div>`).join('');
    const its = [...list.querySelectorAll('.it')], ans = [...list.querySelectorAll('.an')];
    let si = -1, run = false;
    api.every(() => { if (!run) return; si = (si + 1) % 8; const [y, h] = band[si]; scan.style.top = y + 'px'; scan.style.height = h + 'px'; scan.style.opacity = 1; its.forEach((e, i) => e.style.background = i === si ? 'rgba(232,100,27,.12)' : ''); }, 1500);
    return { set(k, keys) {
      const at = reach(keys, k);
      sh(roles, at('m2'));
      its.forEach((e, i) => { if (at('m3')) api.later(() => tg(e, 'hide', false), i * 160); else tg(e, 'hide', true); });
      run = at('m3'); if (!run) scan.style.opacity = 0;
      ans.forEach(e => e.style.opacity = at('m4') ? 1 : 0);
    } };
  }
};

/* ---------- the seven steps ---------- */
const hexs = n => { const h = '0123456789abcdef'; let s = ''; for (let i = 0; i < n; i++) s += h[(Math.random() * 16) | 0]; return s; };

/* ① topic config + G1 gate (SHA-256 bound) */
V.g1 = {
  title: '① 课题配置 + G1 课题门',
  sub: 'SHA-256 绑定 · 改动即失效',
  build(root, api) {
    init(api);
    const b = box(root);
    const F = [['研究问题', '这条轴是否驱动表型？'], ['模型', '细胞系 → 原代 → 动物'], ['干预', '敲低 / 过表达'], ['读出', '蛋白 · 表型'], ['预算', '上限由作者填写']];
    const cfg = card(b, 0, 0, 640, `<div class="kp-row" style="gap:12px">${IC.doc(C.cr, 36)}<span class="mono" style="font-size:24px;color:${C.cr}">topic.json</span><span class="tag t-ill" style="margin-left:auto">示意</span></div>
      <div style="margin-top:14px;display:grid;grid-template-columns:130px 1fr;gap:12px 16px;font-size:23px">${F.map(([k, v], i) => `<span style="color:${C.dim}">${k}</span><span class="fv${i}" style="color:${C.cr};transition:color .4s,background .4s;border-radius:6px;padding:0 6px">${v}</span>`).join('')}</div>`);
    const hash = div(b, 'f hide', '', 680, 120, 420);
    hash.innerHTML = `<div class="kp-k" style="color:${C.te2}">SHA-256 指纹</div><div class="hv mono" style="font-size:24px;color:${C.te2};word-break:break-all;margin-top:8px;line-height:1.45;transition:color .4s"></div>
      <svg width="420" height="40" viewBox="0 0 420 40"><line x1="0" y1="20" x2="400" y2="20" stroke="${C.te}" stroke-width="3" stroke-dasharray="8 8" class="flow"/><path d="M400 10 l16 10 l-16 10z" fill="${C.te}"/></svg>`;
    const hv = hash.querySelector('.hv');
    let H = hexs(64);
    const showH = (h, col) => { hv.textContent = h.slice(0, 32) + '\n' + h.slice(32); hv.style.color = col || C.te2; };
    showH(H);
    const gate = card(b, 1140, 30, 540, `<div class="kp-row" style="gap:16px">${IC.lock(C.gold, 56)}<div><div class="kp-t">G1 课题门</div><div class="kp-s" style="margin-top:0">作者本人确认后，AI 才能开工</div></div></div>
      <div class="sig f hide" style="margin-top:18px;padding:12px 16px;border-radius:12px;border:1px dashed ${C.gr};font-size:23px;color:${C.gr}">✓ 已确认 · 绑定指纹 <span class="mono hb">${H.slice(0, 8)}…</span></div>`);
    const sig = gate.querySelector('.sig'), hb = gate.querySelector('.hb');
    const stale = div(b, 'stamp', '确认失效 · 需重新确认', 1150, 270); stale.style.color = C.red; stale.style.fontSize = '34px';
    const robot = div(b, 'f hide', `<div class="kp-row" style="font-size:23px;color:${C.dim}">${IC.robot()}<span class="rs">等待 G1 …</span></div>`, 1140, 380, 540);
    const consent = ana(b, 0, 470, 1680, `术前知情同意：<b>术式变了，同意书就得重签</b>，不能拿旧的那张顶着。`);
    let scr = null;
    return { set(k, keys) {
      const at = reach(keys, k);
      sh(cfg, at('g1')); sh(gate, at('g2')); tg(robot, 'hide', !at('g2'));
      tg(hash, 'hide', !at('g3')); tg(sig, 'hide', !at('g3'));
      robot.querySelector('.rs').textContent = at('g4') ? '已暂停：配置变了' : at('g3') ? '已放行 → 开始干实验' : '等待 G1 …';
      const f4 = cfg.querySelector('.fv4');
      if (at('g4')) { f4.textContent = '上限已修改'; f4.style.background = 'rgba(255,93,93,.18)'; f4.style.color = C.red; if (!scr) { scr = 1; showH(hexs(64), C.red); } }
      else { f4.textContent = '上限由作者填写'; f4.style.background = ''; f4.style.color = C.cr; scr = null; showH(H); }
      tg(stale, 'on', at('g4')); tg(sig, 'dimmed', at('g4'));
      sh(consent, at('g5'));
    } };
  }
};

/* ② dry-lab loop */
V.dryloop = {
  title: '② 干实验循环',
  sub: '多源文献 · 公开数据 · 本地分析 → 世界模型（唯一真值）',
  build(root, api) {
    init(api);
    const b = box(root);
    const s = svgIn(b, 1680, 330, 0, 0);
    const cx = 1060, cy = 160;
    const ring = S('g', { class: 'spin', style: 'animation-duration:14s' }, s);
    S('circle', { cx, cy, r: 120, fill: 'none', stroke: C.te, 'stroke-width': 4, 'stroke-dasharray': '150 40' }, ring);
    S('circle', { cx, cy, r: 92, fill: 'rgba(46,196,182,.10)', stroke: C.te2, 'stroke-width': 2 }, s);
    S('text', { x: cx, y: cy - 4, 'text-anchor': 'middle', fill: C.cr, 'font-size': 30, 'font-weight': 800 }, s).textContent = '世界模型';
    S('text', { x: cx, y: cy + 32, 'text-anchor': 'middle', fill: C.te2, 'font-size': 23 }, s).textContent = '唯一真值';
    const sats = [[700, 60, '多源文献'], [1440, 60, '公开数据'], [1440, 270, '本地分析']];
    const satG = sats.map(([x, y, t]) => { const g = S('g', { class: 'f', opacity: 0 }, s); S('rect', { x: x - 110, y: y - 34, width: 220, height: 68, rx: 14, fill: 'rgba(20,33,61,.92)', stroke: C.or, 'stroke-width': 2 }, g); S('text', { x, y: y + 9, 'text-anchor': 'middle', fill: C.cr, 'font-size': 26, 'font-weight': 700 }, g).textContent = t; S('line', { x1: x, y1: y, x2: cx, y2: cy, stroke: 'rgba(232,100,27,.35)', 'stroke-width': 2, 'stroke-dasharray': '6 8' }, g); g.parentNode.insertBefore(g, g.parentNode.firstChild); return { g, x, y }; });
    const parts = S('g', {}, s);
    let flowOn = false;
    api.every(() => {
      if (!flowOn) return;
      const st = sats[(Math.random() * 3) | 0];
      const c = S('circle', { cx: st[0], cy: st[1], r: 6, fill: C.or2 }, parts);
      let t = 0; const iv = setInterval(() => { t += .05; c.setAttribute('cx', st[0] + (cx - st[0]) * t); c.setAttribute('cy', st[1] + (cy - st[1]) * t); if (t >= .78) { clearInterval(iv); c.remove(); } }, 30);
    }, 420);
    const log = card(b, 0, 300, 600, `<div class="kp-k">证据日志</div><div class="ll" style="margin-top:10px;height:150px;overflow:hidden;display:flex;flex-direction:column;gap:8px"></div>`);
    const ll = log.querySelector('.ll');
    const T = [['事实', C.gr, '数据集 D1：样本量与分组已登记'], ['关联', C.te2, 'A 与 B 在 D2 中未见正相关'], ['推测', C.red, 'B 的作用可能依赖特定亚型'], ['事实', C.gr, '阳性对照基因对：相关性复现'], ['关联', C.te2, '蛋白层面趋势与转录层不一致'], ['推测', C.red, '需内源蛋白验证后再判断']];
    let ti = 0, logOn = false;
    api.every(() => { if (!logOn) return; const [t, c, x] = T[ti++ % T.length]; const r = E('div', '', ll, `<span class="tag" style="color:${c};margin-right:12px">${t}</span><span style="font-size:23px;color:${C.cr}">${x}</span>`); while (ll.children.length > 4) ll.removeChild(ll.firstChild); }, 1100);
    const ctl = card(b, 640, 360, 520, `<div class="kp-k" style="color:${C.gr}">预设对照</div><div style="display:flex;gap:12px;margin-top:10px"><span class="tag t-ok">阳性 ✓</span><span class="tag t-ok">阴性 ✓</span></div><div class="kp-s">已知答案都找不出来 → 结果不算数</div>`);
    const ed = card(b, 1200, 360, 480, `<div class="kp-row" style="gap:14px">${IC.lock(C.gold, 40)}<div><div class="kp-t" style="font-size:24px">付费智能体（如 Edison）</div><div class="kp-s" style="margin-top:2px">每次花费先经作者授权</div></div></div>`);
    const an = ana(b, 0, 20, 540, `术前影像与检验：<b>先看清楚，再决定要不要上台。</b>`);
    return { set(k, keys) {
      const at = reach(keys, k);
      satG.forEach(o => o.g.setAttribute('opacity', at('l2') ? 1 : .15));
      flowOn = at('l3'); sh(log, at('l4')); logOn = at('l4');
      if (at('l4') && !ll.children.length) for (let i = 0; i < 3; i++) { const [t, c, x] = T[ti++]; E('div', '', ll, `<span class="tag" style="color:${c};margin-right:12px">${t}</span><span style="font-size:23px;color:${C.cr}">${x}</span>`); }
      sh(ctl, at('l5')); sh(ed, at('l5b')); sh(an, at('l6'));
    } };
  }
};

/* ③ hypothesis table */
V.hypo = {
  title: '③ 假设表：<em>支持 · 削弱 · 已淘汰</em>',
  build(root, api) {
    init(api);
    const b = box(root);
    const H = [['H1', 'A 上调 B 的表达', 'wk'], ['H2', 'B 驱动迁移表型', 'sp'], ['H3', 'A 经旁路影响表型', 'el'], ['H4', '效应只见于特定亚型', 'wk']];
    const ST = { sp: ['支持 ↑', C.gr], wk: ['削弱 ↓', C.gold], el: ['已淘汰 ✗', C.red] };
    const tbl = card(b, 0, 0, 1000, `<div style="display:grid;grid-template-columns:80px 1fr 170px;gap:0;font-size:25px">${['', '假设（示意）', '状态'].map(h => `<span style="color:${C.dim};font-size:23px;padding:6px 0">${h}</span>`).join('')}
      ${H.map(([id, t], i) => `<span class="mono" style="color:${C.or2};padding:16px 0;border-top:1px solid var(--line)">${id}</span><span class="ht${i}" style="color:${C.cr};padding:16px 0;border-top:1px solid var(--line)"><span class="strike">${t}</span><div class="why f hide" style="font-size:23px;color:${C.dim};margin-top:6px">淘汰依据：证据 E-12（公开蛋白组 · 对照通过）· 保留在表中</div></span><span class="hs${i}" style="padding:16px 0;border-top:1px solid var(--line)"><span class="tag t-ill">待定</span></span>`).join('')}</div>`);
    const dd = card(b, 1060, 0, 620, `<div class="kp-k" style="color:${C.or2}">外科类比 · 鉴别诊断清单</div>
      <div style="margin-top:14px;font-size:24px;line-height:1.8;color:${C.cr}">右下腹痛 · 鉴别诊断<br><span style="color:${C.gr}">↑ 急性阑尾炎</span><br><span style="color:${C.red}"><s>✗ 输尿管结石</s></span> <span style="font-size:23px;color:${C.dim}">（尿常规、CT 已排除）</span><br><span style="color:${C.gold}">↓ 附件病变</span></div>
      <div class="kp-s">排除了什么、凭什么排除——下一位医生一看就懂</div>`);
    return { set(k, keys) {
      const at = reach(keys, k);
      sh(tbl, at('h1'));
      H.forEach(([, , s], i) => { const el = tbl.querySelector('.hs' + i); const on = at('h1'); el.innerHTML = on ? `<span class="tag" style="color:${ST[s][1]}">${ST[s][0]}</span>` : `<span class="tag t-ill">待定</span>`; });
      const t3 = tbl.querySelector('.ht2'); t3.querySelector('.strike').classList.toggle('on', at('h1')); t3.style.opacity = at('h1') ? .8 : 1;
      tg(t3.querySelector('.why'), 'hide', !at('h2'));
      sh(dd, at('h3'));
    } };
  }
};

/* ④ staged design + dry draft */
V.stages = {
  title: '④ 分阶段设计 + 干稿',
  sub: '前一关不过，后面的钱就不花',
  build(root, api) {
    init(api);
    const b = box(root);
    const SG = [['体外快筛', '细胞系 · 快 · 便宜', 1], ['原代复证', '原代细胞 · 更贴近人', 2], ['体内验证', '动物模型 · 最贵最慢', 3]];
    const W = 430, G = 195;
    const st = SG.map(([t, s, c], i) => { const e = card(b, i * (W + G), 20, W, `<div class="kp-k">阶段 ${i + 1}</div><div class="kp-t" style="margin-top:4px">${t}</div><div class="kp-s">${s}</div><div style="margin-top:12px;font-size:23px;color:${C.dim}">相对成本 <span style="color:${C.or2};letter-spacing:4px">${'▮'.repeat(c * 2)}</span></div>`); return e; });
    const gates = [0, 1].map(i => div(b, 'f hide', `<div style="width:120px;text-align:center"><div style="width:70px;height:70px;margin:0 auto;transform:rotate(45deg);border:3px solid ${C.gold};border-radius:10px;background:rgba(242,177,52,.12)"></div><div style="font-size:23px;color:${C.gold};margin-top:16px">门槛</div></div>`, W + i * (W + G) + 38, 70));
    const tok = div(b, 'f hide', `<div style="width:34px;height:34px;border-radius:50%;background:${C.or2};box-shadow:0 0 20px ${C.or}"></div>`, 200, 225);
    const fail = div(b, 'f hide', `<span class="kp-pill c-rd">✗ 没过门槛 → 后两阶段不花钱</span>`, 470, 250);
    const draft = card(b, 0, 330, 820, `<div class="kp-row" style="gap:14px">${IC.doc(C.cr, 40)}<span class="kp-t">干稿 · 先想好结果怎么写</span></div>
      <div style="display:flex;gap:14px;margin-top:14px">${['Fig.1 □', 'Fig.2 □', 'Fig.3 □'].map(f => `<div style="flex:1;height:84px;border:2px dashed ${C.dim2};border-radius:10px;display:flex;align-items:center;justify-content:center;color:${C.dim};font-size:23px">${f}</div>`).join('')}</div>
      <div class="kp-s">阳性怎么写 · 阴性怎么写 · 失败怎么记</div>`);
    const an = ana(b, 880, 360, 800, `创伤外科的<b>损伤控制</b>：先做最小、最快、最能说明问题的那一步。`);
    let tx = 0, tmode = 0;
    api.every(() => {
      if (!tmode) return;
      tx += 12;
      const stop = W + 60;
      if (tmode === 2 && tx > stop) { tx = stop; }
      if (tmode === 1 && tx > 3 * W + 2 * G - 40) tx = 120;
      tok.style.left = tx + 'px';
    }, 40);
    return { set(k, keys) {
      const at = reach(keys, k);
      st.forEach(e => sh(e, at('t1')));
      gates.forEach(g => tg(g, 'hide', !at('t2')));
      tg(tok, 'hide', !at('t1')); tmode = at('t2') ? 2 : at('t1') ? 1 : 0; if (tmode === 2) tx = Math.min(tx, W - 20);
      tg(fail, 'hide', !at('t2'));
      st.forEach((e, i) => tg(e, 'dimmed', at('t2') && i > 0));
      sh(draft, at('t3')); sh(an, at('t4'));
    } };
  }
};

/* ⑤ structured SOP — four tools, four surgical habits */
V.sop = {
  title: '⑤ 结构化 SOP',
  sub: '实验步骤从一段文字，变成一张能被检查的表',
  build(root, api) {
    init(api);
    const b = box(root);
    const prose = card(b, 0, 0, 640, `<div class="kp-k" style="color:${C.dim}">以前：一段文字</div><div style="font-size:23px;color:${C.dim};line-height:1.6;margin-top:8px">取 RNA，反转录后配体系，加引物和模板，上机跑 40 个循环……</div>`);
    const tab = card(b, 720, 0, 960, `<div class="kp-k" style="color:${C.te2}">现在：结构化表（示意）</div>
      <div class="mono" style="display:grid;grid-template-columns:70px 1fr 1fr 110px 90px;gap:6px 12px;font-size:23px;margin-top:10px;color:${C.cr}">
      <span style="color:${C.dim}">步骤</span><span style="color:${C.dim}">容器</span><span style="color:${C.dim}">试剂</span><span style="color:${C.dim}">体积</span><span style="color:${C.dim}">盖</span>
      <span>5</span><span>tube-mix</span><span>master mix</span><span>20 µL</span><span>closed</span>
      <span>6</span><span>plate:A1–C4</span><span>cDNA</span><span>2 µL</span><span>sealed</span></div>`);
    const tiles = [['o2', '干跑', '模拟手术', '纸面走一遍每一管、每一孔'], ['o4', '用量清单', '器械清点', '够用 · 不足 · 过期 · 缺失'], ['o5', 'SOP 冻结', '术式确定', '批准后不临时改；改就写理由、重新冻结'], ['o6', '隐性细节提示', '老师傅的口头提醒', '冰上操作 · 防 RNA 酶 · 引物分装']];
    const tw = 400, tg2 = 26;
    const tl = tiles.map(([key, t, a, s], i) => { const c = card(b, i * (tw + tg2), 200, tw, `<div class="kp-t">${t}</div><div class="kp-row" style="gap:8px;margin-top:6px;color:${C.or2};font-size:23px">${IC.scalpel(C.or2).replace(/46/g, '24')} ${a}</div><div class="kp-s">${s}</div><div class="ex" style="margin-top:10px"></div>`); c.dataset.k = key; c.style.minHeight = '330px'; return c; });
    tl[0].querySelector('.ex').innerHTML = `<div class="o3 f hide" style="display:flex;flex-direction:column;gap:6px;font-size:23px"><span class="c-rd">✗ 读数前还没加样</span><span class="c-rd">✗ 漏了 NTC 对照</span><span class="c-gd">! 加热时没盖盖子</span></div>`;
    tl[1].querySelector('.ex').innerHTML = `<div style="display:flex;flex-wrap:wrap;gap:8px"><span class="st av">AVAILABLE</span><span class="st sh">SHORT</span><span class="st ex">EXPIRED</span><span class="st mi">MISSING</span></div>`;
    tl[2].querySelector('.ex').innerHTML = `<div class="kp-row" style="gap:10px">${IC.lock(C.gold, 36)}<span class="mono" style="font-size:23px;color:${C.te2}">sha256 7c1e…</span></div>`;
    tl[3].querySelector('.ex').innerHTML = `<div style="font-size:42px" class="float">💡</div>`;
    return { set(k, keys) {
      const at = reach(keys, k);
      sh(prose, at('o1')); sh(tab, at('o1')); tg(prose, 'dimmed', at('o1'));
      tl.forEach(c => { sh(c, at(c.dataset.k)); tg(c, 'glow-or', at(c.dataset.k) && tiles.findIndex(t => t[0] === c.dataset.k) === tiles.map(t => at(t[0])).lastIndexOf(true)); });
      tg(tl[0].querySelector('.o3'), 'hide', !at('o3'));
    } };
  }
};

/* ⑥ wet lab → instrument QC → lock-wet */
V.wet = {
  title: '⑥ 湿实验：<em>作者执行</em>，AI 不碰仪器',
  build(root, api) {
    init(api);
    const b = box(root);
    const P = [['w1', '作者亲手做', '🧑‍🔬'], ['w2', 'qPCR 仪器导出', '📄'], ['w2', '质控', '🔬'], ['w4', 'lock-wet 封存', '🔒']];
    const pw = 360, pg = 80;
    const ps = P.map(([key, t, ic], i) => { const c = card(b, i * (pw + pg), 0, pw, `<div style="font-size:46px">${ic}</div><div class="kp-t" style="margin-top:8px">${t}</div><div class="det"></div>`); c.dataset.k = key; c.style.minHeight = '300px'; return c; });
    ps[0].querySelector('.det').innerHTML = `<div class="kp-s">台架实验 · 移液 · 上机</div><span class="tag t-warn" style="margin-top:10px">AI 不控制仪器</span>`;
    ps[1].querySelector('.det').innerHTML = `<div class="mono" style="font-size:23px;color:${C.dim};margin-top:8px;line-height:1.6">well,target,Cq<br>A1,REF,18.42<br>A4,NTC,— <br>…</div>`;
    ps[2].querySelector('.det').innerHTML = `<div style="display:flex;flex-direction:column;gap:8px;margin-top:10px;font-size:23px">${['NTC 无扩增', '复孔 SD 合格', '内参稳定'].map(t => `<span class="qc f hide c-gr">✓ ${t}</span>`).join('')}</div>`;
    ps[3].querySelector('.det').innerHTML = `<div class="mono" style="font-size:23px;color:${C.te2};margin-top:10px">sha256 · 3a9d…e04b</div><div class="kp-s">事后再改，能被检出</div>`;
    const arrows = svgIn(b, 1680, 40, 0, 130);
    [0, 1, 2].forEach(i => { const x = (i + 1) * (pw + pg) - pg + 10; S('path', { d: `M${x} 20 h${pg - 30} m-12 -10 l12 10 l-12 10`, fill: 'none', stroke: C.or2, 'stroke-width': 4, class: 'edge' }, arrows); });
    const a1 = ana(b, 0, 330, 820, `<b>术中冰冻</b>：先确认这块组织能不能下结论`);
    const a2 = ana(b, 880, 330, 800, `<b>手术记录封存</b>：写完不再回头补改`);
    let qi = 0;
    return { set(k, keys) {
      const at = reach(keys, k);
      ps.forEach(c => sh(c, at(c.dataset.k)));
      const q = ps[2].querySelectorAll('.qc'); q.forEach((e, i) => { if (at('w2')) api.later(() => tg(e, 'hide', false), 500 + i * 450); else tg(e, 'hide', true); });
      sh(a1, at('w3')); sh(a2, at('w5'));
      tg(ps[2], 'glow-te', at('w3') && !at('w4')); tg(ps[3], 'glow-or', at('w4'));
    } };
  }
};

/* ⑥b three outcomes */
V.outcomes = {
  title: '结果只分三类',
  sub: '阳性 · 信息性阴性 · 技术失败',
  build(root, api) {
    init(api);
    const b = box(root);
    const BN = [['阳性', C.gr, '对照正常，看到效应'], ['信息性阴性', C.te2, '对照正常、方法可靠，没看到效应 → 也是结果，值得记录'], ['技术失败', C.red, '对照没过 → 不能写成阴性，只能重做']];
    const bw = 520, bg = 60;
    const s = svgIn(b, 1680, 250, 0, 0);
    S('path', { d: 'M640 10 h400 l-140 120 h-120z', fill: 'rgba(244,234,215,.06)', stroke: C.ln, 'stroke-width': 2 }, s);
    S('text', { x: 840, y: 60, 'text-anchor': 'middle', fill: C.dim, 'font-size': 23 }, s).textContent = '每一次湿实验结果';
    const balls = S('g', {}, s);
    const bins = BN.map(([t, c, d], i) => card(b, i * (bw + bg), 260, bw, `<div class="kp-t" style="color:${c}">${t}</div><div class="kp-s">${d}</div>`));
    bins.forEach(e => e.style.minHeight = '160px');
    const ban = div(b, 'f hide', `<div class="kp-t" style="text-align:center">信息性阴性 <em>≠</em> 技术失败 —— 少很多「做不出来」的糊涂账</div>`, 0, 470, 1680);
    let on = false;
    api.every(() => {
      if (!on) return;
      const i = Math.random() < .4 ? 0 : Math.random() < .6 ? 1 : 2;
      const c = S('circle', { cx: 840, cy: 120, r: 10, fill: BN[i][1] }, balls);
      const tx = i * (bw + bg) + bw / 2; let t = 0;
      const iv = setInterval(() => { t += .04; c.setAttribute('cx', 840 + (tx - 840) * t); c.setAttribute('cy', 120 + 120 * t * t); if (t >= 1) { clearInterval(iv); c.remove(); } }, 30);
    }, 500);
    return { set(k, keys) {
      const at = reach(keys, k);
      on = at('u1'); bins.forEach(e => sh(e, at('u1')));
      tg(bins[1], 'glow-te', at('u2') && !at('u3')); tg(bins[2], 'glow-or', at('u3'));
      tg(ban, 'hide', !at('u4'));
    } };
  }
};

/* ⑦ equivalence + wording gates → evidence pack */
V.pack = {
  title: '⑦ 等效门 + 措辞门 → <em>证据包</em>',
  build(root, api) {
    init(api);
    const b = box(root);
    const g2 = card(b, 0, 0, 520, `<div class="kp-row" style="gap:14px"><span style="font-size:40px">⚖️</span><span class="kp-t">等效门</span></div><div class="kp-row" style="gap:14px;margin-top:14px"><span style="font-size:40px">✍️</span><span class="kp-t">措辞门</span></div>`);
    const bad = card(b, 580, 0, 1100, `<div class="kp-s" style="margin-top:0">常见写法</div><div style="font-size:30px;color:${C.cr};margin-top:6px">P = 0.21，无显著差异 → <span class="strike" style="color:${C.red}">「两种方法一致」</span></div>`);
    const nl = card(b, 580, 150, 1100, '');
    nl.innerHTML = `<div class="kp-s" style="margin-top:0">要说等效：事先登记界值，再看差值的置信区间</div>`;
    const s = svgIn(nl, 1040, 120, 30, 50);
    S('rect', { x: 300, y: 20, width: 440, height: 70, fill: 'rgba(73,217,138,.12)', stroke: C.gr, 'stroke-dasharray': '6 6' }, s);
    S('line', { x1: 40, y1: 55, x2: 1000, y2: 55, stroke: C.dim, 'stroke-width': 2 }, s);
    S('line', { x1: 520, y1: 15, x2: 520, y2: 95, stroke: C.dim, 'stroke-width': 1.5, 'stroke-dasharray': '4 6' }, s);
    [['−界值', 300], ['0', 520], ['+界值', 740]].forEach(([t, x]) => S('text', { x, y: 116, 'text-anchor': 'middle', fill: C.dim, 'font-size': 23 }, s).textContent = t);
    const ci = S('g', { class: 'f', opacity: 0 }, s);
    const ciL = S('line', { x1: 430, y1: 55, x2: 640, y2: 55, stroke: C.gr, 'stroke-width': 8, 'stroke-linecap': 'round' }, ci); S('circle', { cx: 535, cy: 55, r: 10, fill: C.cr }, ci);
    S('text', { x: 1000, y: 38, 'text-anchor': 'end', fill: C.gr, 'font-size': 23, class: 'm', 'font-weight': 700 }, ci).textContent = '90% CI 在界值内 → EQUIVALENT';
    const pth = ana(b, 0, 300, 520, `病理报告：<b>不确定，就写不确定。</b>`);
    pth.style.alignItems = 'flex-start';
    const box2 = card(b, 580, 330, 1100, `<div class="kp-row" style="gap:18px"><span style="font-size:50px">📦</span><div><div class="kp-t">证据包</div><div class="mono" style="font-size:23px;color:${C.dim}">manifest.sha256 · claims · figures · wetlab raw · approvals</div></div>
      <div style="margin-left:auto;text-align:right" class="mono"><div style="font-size:23px;color:${C.te2}">export-pack</div><div class="vp" style="font-size:23px;color:${C.gr}">verify-pack ✓ PASS</div></div></div>`);
    return { set(k, keys) {
      const at = reach(keys, k);
      sh(g2, at('k1')); sh(bad, at('k2')); bad.querySelector('.strike').classList.toggle('on', at('k3'));
      sh(nl, at('k3')); ci.setAttribute('opacity', at('k3') ? 1 : 0);
      sh(pth, at('k4')); sh(box2, at('k5'));
    } };
  }
};

/* bottom rule: G-spend / G-external */
V.spend = {
  title: '底线：<em>G-spend / G-external</em> 逐项授权',
  build(root, api) {
    init(api);
    const b = box(root);
    const T = [['🪙', 'Edison 积分', '花钱'], ['☁️', '上传数据', '对外'], ['⎇', 'Git push', '对外'], ['✉️', '发邮件', '对外']];
    const tw = 380, gp = 53;
    const tl = T.map(([ic, t, kd], i) => card(b, i * (tw + gp), 40, tw, `<div class="kp-row" style="gap:14px"><span style="font-size:42px">${ic}</span><div><div class="kp-t">${t}</div><div class="tag ${kd === '花钱' ? 't-auth' : 't-ana'}" style="margin-top:6px">${kd}</div></div></div>
      <div class="sg" style="margin-top:16px;height:44px;display:flex;align-items:center;font-size:23px"><span class="stop" style="color:${C.red};font-weight:800">⛔ AI 已停下 · 等签字</span></div>`));
    const log = card(b, 0, 260, 1000, `<div class="kp-k">授权日志</div><div class="mono lg" style="font-size:23px;line-height:1.7;margin-top:8px;color:${C.cr}"></div>`);
    const big = div(b, 'f hide', `<div class="kp-big">主刀签字</div><div class="kp-s" style="color:${C.cr};font-size:24px">助手可以把一切准备好，<br>下刀那一下，写的是主刀的名字。</div>`, 1080, 270, 600);
    let si = 0, signing = false;
    const lg = log.querySelector('.lg');
    api.every(() => {
      if (!signing || si >= 4) return;
      const sg = tl[si].querySelector('.sg'); sg.innerHTML = `<span style="color:${C.gr};font-weight:700">✓ 作者签字</span>`; tg(tl[si], 'glow-te', true);
      E('div', '', lg, `<span style="color:${C.gr}">APPROVED</span>  ${T[si][1].padEnd(10, ' ')}  by 作者（自述） · 时间戳 · 范围`);
      si++;
    }, 1300);
    return { set(k, keys) {
      const at = reach(keys, k);
      tl.forEach(e => sh(e, at('x2')));
      tl.forEach(e => tg(e.querySelector('.stop'), 'blink', at('x2') && !at('x3')));
      signing = at('x3');
      if (!at('x3')) { si = 0; lg.innerHTML = ''; tl.forEach((e, i) => { e.querySelector('.sg').innerHTML = `<span class="stop" style="color:${C.red};font-weight:800">⛔ AI 已停下 · 等签字</span>`; tg(e, 'glow-te', false); }); }
      sh(log, at('x3b')); tg(big, 'hide', !at('x4'));
    } };
  }
};

/* ---------- three demos (illustrative output, fictional data) ---------- */
const illTag = (b, x, y) => div(b, 'ill', '示意 · 数据虚构', x, y);

V.demodry = {
  title: '现场 1 · 干跑：<em>动手之前就报错</em>',
  build(root, api) {
    init(api);
    const b = box(root);
    const t = term(b, 0, 0, 1080, 540, 'kosmos-lite · sop dry-run');
    const L = {
      e2: [`<span class="p">$</span> python3 -B sop-structured-v1.4.0-rc.5.py dry-run design/sop-qpcr-v0.1.json`, `<span class="dm">tracing 12 steps · 24 wells · 3 tubes …</span>`],
      e3: [`<span class="er">✗ ERROR  READ_BEFORE_SAMPLE</span>  step 7`, `<span class="er">  plate:A3 (sample) has no sample material at read-out</span>`],
      e4: [`<span class="er">✗ ERROR  MISSING_CONTROL</span>  controls_required`, `<span class="er">  no read container with role ntc</span>`],
      e5: [`<span class="wa">! WARN   EVAPORATION_RISK</span>  step 5`, `<span class="wa">  tube-mix incubated open at 95 °C; confirm cap/seal</span>`, `status: <span class="er">FAIL</span> · 2 errors · 1 warning`],
      e5b: [`<span class="p">$</span> … dry-run design/sop-qpcr-v0.2.json`, `status: <span class="ok">PASS ✓</span> · 0 errors · ready to freeze`],
    };
    const lines = {};
    for (const k in L) lines[k] = L[k].map(h => tline(t.body, h));
    illTag(b, 900, -54);
    // plate map
    const pl = card(b, 1130, 0, 550, `<div class="kp-k">96 孔板（局部 · 示意）</div><div class="grid" style="display:grid;grid-template-columns:30px repeat(6,1fr);gap:8px;margin-top:14px"></div>
      <div class="kp-row heat" style="margin-top:18px;font-size:23px;color:${C.dim};gap:12px"><svg width="60" height="70" viewBox="0 0 60 70"><path d="M14 22 h32 l-4 44 h-24z" fill="rgba(46,196,182,.15)" stroke="${C.te2}" stroke-width="3"/><path class="lid" d="M10 16 h40" stroke="${C.te2}" stroke-width="5" style="transition:transform .6s;transform-origin:10px 16px"/></svg><span>tube-mix · 95 °C</span></div>`);
    const grid = pl.querySelector('.grid');
    const rows = 'ABCD', wells = {};
    grid.innerHTML = '<span></span>' + [1, 2, 3, 4, 5, 6].map(c => `<span class="mono" style="font-size:23px;color:${C.dim};text-align:center">${c}</span>`).join('');
    for (const r of rows) { E('span', 'mono', grid, r).style.cssText = `font-size:23px;color:${C.dim};align-self:center`; for (let c = 1; c <= 6; c++) { const w = E('span', '', grid); w.style.cssText = `aspect-ratio:1;border-radius:50%;border:2px solid ${C.te};background:rgba(46,196,182,.25);transition:.4s`; wells[r + c] = w; } }
    const ntc = [wells.A6, wells.B6, wells.C6];
    const lid = pl.querySelector('.lid'), heat = pl.querySelector('.heat');
    return { set(k, keys) {
      const at = reach(keys, k);
      for (const key in lines) lines[key].forEach((l, i) => { if (at(key)) api.later(() => tg(l, 'hide', false), i * 260); else tg(l, 'hide', true); });
      sh(pl, at('e2'));
      const fixed = at('e5b');
      const a3 = wells.A3; a3.style.background = at('e3') && !fixed ? 'transparent' : 'rgba(46,196,182,.25)'; a3.style.borderColor = at('e3') && !fixed ? C.red : C.te; tg(a3, 'blink', at('e3') && !fixed);
      ntc.forEach(w => { w.style.borderStyle = at('e4') && !fixed ? 'dashed' : 'solid'; w.style.borderColor = at('e4') && !fixed ? C.red : fixed ? C.gold : C.te; w.style.background = fixed ? 'rgba(242,177,52,.35)' : at('e4') ? 'transparent' : 'rgba(46,196,182,.25)'; });
      lid.style.transform = at('e5') && !fixed ? 'rotate(-35deg)' : 'none'; heat.style.color = at('e5') && !fixed ? C.gold : C.dim;
      tg(t.el, 'glow-te', fixed);
    } };
  }
};

V.demobom = {
  title: '现场 2 · 用量清单：<em>对一下库存</em>',
  build(root, api) {
    init(api);
    const b = box(root);
    const t = term(b, 0, 0, 1680, 450, 'kosmos-lite · sop bom --inventory');
    const R = [['qPCR 预混液（2×）', '1,056 µL', '1,500 µL', 'av', 'AVAILABLE'], ['上游引物 F（10 µM）', '53 µL', '40 µL', 'sh', 'SHORT'], ['下游引物 R（10 µM）', '53 µL', '200 µL', 'av', 'AVAILABLE'], ['反转录缓冲液', '220 µL', '250 µL · 已过期', 'ex', 'EXPIRED'], ['无酶水', '1,100 µL', '—', 'mi', 'MISSING']];
    tline(t.body, `<span class="p">$</span> python3 -B sop-structured-v1.4.0-rc.5.py bom design/sop-qpcr-v0.2.json --inventory design/inventory-v0.1.json`);
    const as = tline(t.body, `<span class="dm">n_samples × technical replicates × independent repeats · dead volume +10% (assumption)</span>`);
    const tb = E('div', 'ln f hide', t.body); tb.innerHTML = `<table><tr><th>REAGENT</th><th>REQUIRED</th><th>ON HAND</th><th>STATUS</th></tr>${R.map(([n, r, o, c, s]) => `<tr class="rw"><td style="color:${C.cr};font-family:var(--sans)">${n}</td><td>${r}</td><td>${o}</td><td><span class="st ${c}">${s}</span></td></tr>`).join('')}</table>`;
    const rws = [...tb.querySelectorAll('.rw')];
    illTag(b, 1500, -54);
    const note = div(b, 'f hide dn', `<div class="kp-row" style="gap:18px;padding:16px 26px;border-radius:16px;border:2px solid ${C.gold};background:rgba(242,177,52,.10)">${IC.lock(C.gold, 46)}<span class="kp-t" style="font-size:28px">只报告，不下单 —— 要不要买、买多少，<em>作者逐项同意</em>（G-spend）</span></div>`, 0, 475, 1680);
    return { set(k, keys) {
      const at = reach(keys, k);
      [...t.body.children].slice(0, 1).forEach(l => tg(l, 'hide', !at('f1')));
      tg(as, 'hide', !at('f2')); tg(tb, 'hide', !at('f1'));
      rws.forEach((r, i) => { const s = R[i][3]; r.style.opacity = at('f2') ? 1 : .25; r.style.background = at('f3') && (s === 'sh' || s === 'ex') ? 'rgba(255,93,93,.08)' : ''; });
      sh(note, at('f4'));
    } };
  }
};

V.demoword = {
  title: '现场 3 · 措辞门：<em>一句话被拦下</em>',
  build(root, api) {
    init(api);
    const b = box(root);
    const ed = card(b, 0, 0, 1680, `<div class="kp-k" style="color:${C.dim}">manuscript · results（草稿）</div><div class="sent" style="font-size:32px;line-height:1.6;color:${C.cr};margin-top:10px">两组 Cq 值比较，<span class="hl">无显著差异（P = 0.21），说明两种方法一致</span>。</div>`);
    const hl = ed.querySelector('.hl');
    const t = term(b, 0, 180, 1000, 300, 'kosmos-lite · manuscript check --stage submission_candidate');
    const fl = [`<span class="er">✗ FAIL  claim C3 · method agreement</span>`, `<span class="er">  wording "无显著差异 … 一致" without an EQUIVALENT record</span>`, `<span class="er">  no pre-registered equivalence margin</span>`, `<span class="wa">  note: P > 0.05 never counts as agreement</span>`].map(h => tline(t.body, h));
    const sug = card(b, 1040, 180, 640, `<div class="kp-k" style="color:${C.gr}">建议改写</div><div style="font-size:26px;line-height:1.6;color:${C.cr};margin-top:8px">两种方法的均值差（90% CI −0.18 至 0.22 Cq）<span style="color:${C.gr}">落在事先设定的界值（±0.5 Cq）之内</span>。</div><div class="kp-s" style="font-size:23px">先登记界值，再判 EQUIVALENT；「一致 / 可互换」仍会被拦</div>`);
    illTag(b, 1500, -54);
    const rv = div(b, 'f hide', `<div class="kp-row" style="gap:16px;font-size:24px;color:${C.dim}"><span class="tag t-ill">审稿意见</span><span style="text-decoration:line-through">The authors conclude the two methods agree based on a non-significant P value; this is not a valid test of equivalence…</span></div>`, 0, 500, 1680);
    return { set(k, keys) {
      const at = reach(keys, k);
      sh(ed, at('n1')); tg(hl, 'wave', at('n1') && !at('n3'));
      tg(t.el, 'hide', !at('n2')); fl.forEach((l, i) => { if (at('n2')) api.later(() => tg(l, 'hide', false), 200 + i * 300); else tg(l, 'hide', true); });
      sh(sug, at('n3')); hl.style.opacity = at('n3') ? .45 : 1;
      tg(rv, 'hide', !at('n4'));
    } };
  }
};

/* ---------- honest limits ---------- */
V.limits = {
  title: '诚实的边界',
  sub: '它做不到什么',
  build(root, api) {
    init(api);
    const b = box(root);
    const L = [['i2', '✗', C.red, '不控制仪器', '不接任何硬件，不替你做实验；湿实验永远是人来做。'], ['i2', '✗', C.red, '不替你下结论', 'AI 只整理证据和提示风险，关键决定由作者签字。'], ['i3', '!', C.gold, '哈希 = 本地自述记录', '能发现事后改动；不能证明时间先后，也不能证明是谁签的。'], ['i4', '!', C.gold, '验证还在早期', '目前是本地 AI 验证 + AI 独立复核；还没有真实课题组的长期使用数据。']];
    const cw = 820, ch = 190;
    const cs = L.map(([key, ic, col, t, s], i) => { const c = card(b, (i % 2) * (cw + 40), ((i / 2) | 0) * (ch + 24), cw, `<div class="kp-row" style="gap:18px;align-items:flex-start"><span style="font-size:42px;font-weight:800;color:${col};width:40px;text-align:center">${ic}</span><div><div class="kp-t">${t}</div><div class="kp-s">${s}</div></div></div>`); c.dataset.k = key; c.style.minHeight = ch + 'px'; return c; });
    const rec = div(b, 'f hide', `<div style="display:flex;align-items:center;justify-content:center;gap:20px;padding:18px;border-radius:16px;border:2px solid ${C.te};background:rgba(46,196,182,.10)"><span style="font-size:30px;color:${C.te2}">●</span><span class="kp-t">正在招募<em>第一批真实试点</em></span></div>`, 0, 450, 1680);
    return { set(k, keys) {
      const at = reach(keys, k);
      cs.forEach(c => sh(c, at(c.dataset.k)));
      tg(rec, 'hide', !at('i5')); tg(rec, 'pulse', at('i5'));
    } };
  }
};

/* ---------- who gets what ---------- */
V.who = {
  title: '谁能得到什么',
  build(root, api) {
    init(api);
    const b = box(root);
    const W = [['j1', '科研处', '🏛', ['每个课题一份可核查的证据包', '花钱、对外动作都要授权', '申报前先做可行性评估']], ['j2', 'PI · 导师', '🎓', ['动手之前查漏', '提前出用量清单', '带教有统一标准']], ['j3', '临床医生', '🩺', ['没有自己的实验室也能开始', '先用公开数据找方向', '再决定要不要做湿实验']]];
    const cw = 530, gp = 45;
    const cs = W.map(([key, t, ic, items], i) => { const c = card(b, i * (cw + gp), 0, cw, `<div class="kp-row" style="gap:14px"><span style="font-size:44px">${ic}</span><span class="kp-t" style="font-size:34px">${t}</span></div><div style="margin-top:16px;display:flex;flex-direction:column;gap:12px">${items.map(x => `<div class="kp-row" style="gap:12px;font-size:24px;color:${C.cr};align-items:flex-start"><span style="color:${C.or2}">▸</span>${x}</div>`).join('')}</div>`); c.dataset.k = key; c.style.minHeight = '290px'; return c; });
    const pk = div(b, 'f hide', '', 0, 300, 1680, 250);
    pk.innerHTML = `<svg width="1680" height="120" viewBox="0 0 1680 120" style="display:block">${[265, 840, 1415].map(x => `<path d="M${x} 0 C ${x} 60, 840 50, 840 110" fill="none" stroke="${C.te}" stroke-width="3" stroke-dasharray="8 8" class="flow"/>`).join('')}</svg>
      <div style="display:flex;justify-content:center"><div class="kp-card" style="position:relative;display:flex;gap:16px;align-items:center;padding:14px 28px;border-color:${C.te}"><span style="font-size:40px">📦</span><span class="kp-t">同一份证据包 · 各看各关心的那一页</span></div></div>`;
    return { set(k, keys) {
      const at = reach(keys, k);
      cs.forEach(c => sh(c, at(c.dataset.k)));
      tg(pk, 'hide', !at('j4'));
    } };
  }
};

/* ---------- the offer ---------- */
V.offer = {
  title: '拿一个课题来<em>试点</em>',
  build(root, api) {
    init(api);
    const b = box(root);
    const ask = div(b, 'f hide', `<div class="kp-big" style="font-size:40px">拿一个<em>正在犹豫要不要做湿实验</em>的课题来试点</div>`, 0, 0, 1680);
    const O = [['z2', '半天工作坊', '现场把一个课题的干实验跑一遍'], ['z3', '4–6 周课题试点陪跑', '从课题门一直走到证据包'], ['z4', '院内部署与带教', '本地运行 · 数据不出院']];
    const cw = 530, gp = 45;
    const cs = O.map(([key, t, s], i) => { const c = card(b, i * (cw + gp), 100, cw, `<div class="kp-k">方式 ${i + 1}</div><div class="kp-t" style="font-size:32px;margin-top:6px">${t}</div><div class="kp-s">${s}</div>`); c.dataset.k = key; c.style.minHeight = '180px'; return c; });
    const out = div(b, 'f hide dn', `<div class="kp-row" style="gap:16px;font-size:26px;color:${C.cr}"><span class="tag t-ok">你会得到</span>一份完整的证据包 + 一个清楚的决定：<b style="color:${C.gr}">做</b> · <b style="color:${C.gold}">缓做</b> · <b style="color:${C.or2}">换方向</b></div>`, 0, 320, 1680);
    const fin = div(b, 'f hide', `<div style="text-align:center"><div style="font-size:60px;font-weight:800;color:${C.cr}">湿实验之前，<span style="color:${C.or2}">先把账算清</span></div>
      <div style="font-size:28px;color:${C.te2};margin-top:14px">联系：丁医生的医学笔记</div></div>`, 0, 395, 1680);
    return { set(k, keys) {
      const at = reach(keys, k);
      tg(ask, 'hide', !at('z1'));
      cs.forEach(c => sh(c, at(c.dataset.k)));
      sh(out, at('z4b')); tg(fin, 'hide', !at('z5'));
    } };
  }
};

/* ================= v1.1 · glow-stage views (original compositions, aiai academy) =================
   Visual language: dark cinematic stage, glowing isometric hex pads on halo dials joined by a luminous
   curved path, small dark status chips, red = failing, amber = paused / waiting for a signature.
   Overrides: poster (pipeline), rounds, decision, dryloop (split → units → merge), spend (card sort),
   demodry (plate callouts match the error), pain / pack (original atmospheric photos). */
const GK = {};
let GID = 0;
GK.defs = svg => {
  const id = 'kg' + (++GID);
  const d = S('defs', {}, svg);
  const f1 = S('filter', { id: id + 's', x: '-60%', y: '-60%', width: '220%', height: '220%' }, d);
  S('feGaussianBlur', { stdDeviation: 5, result: 'b' }, f1);
  const m1 = S('feMerge', {}, f1); S('feMergeNode', { in: 'b' }, m1); S('feMergeNode', { in: 'SourceGraphic' }, m1);
  const f2 = S('filter', { id: id + 'b', x: '-80%', y: '-80%', width: '260%', height: '260%' }, d);
  S('feGaussianBlur', { stdDeviation: 22 }, f2);
  const f3 = S('filter', { id: id + 'm', x: '-40%', y: '-200%', width: '180%', height: '500%' }, d);
  S('feGaussianBlur', { stdDeviation: 7 }, f3);
  svg._g = id;
  return id;
};
const COLS = { ok: C.te2, ai: C.te2, au: C.gold, warn: C.gold, bad: C.red, go: C.gr, off: '#56657a', or: C.or2 };
// isometric hex pad on a halo dial; colour follows CSS `color` (transitions smoothly)
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
  // visible side faces (angles 0..180 → indices 0,1,2,3)
  const side = [top[0], top[1], top[2], top[3], bot[3], bot[2], bot[1], bot[0]];
  S('polygon', { points: side.map(p => p.join(',')).join(' '), fill: 'currentColor', opacity: .42 }, g);
  S('polygon', { points: [top[1], top[2], bot[2], bot[1]].map(p => p.join(',')).join(' '), fill: '#fff', opacity: .10 }, g);
  S('polygon', { points: top.map(p => p.join(',')).join(' '), fill: 'currentColor', opacity: .95, filter: `url(#${id}s)` }, g);
  S('polygon', { points: top.map(p => [p[0] * .62, (p[1] + 22) * .62 - 22].join(',')).join(' '), fill: '#fff', opacity: .55 }, g);
  // floating hologram plate with the glyph
  const holo = S('g', { class: 'holo' }, g);
  S('path', { d: 'M-40 -100 L40 -100 L48 -40 L-48 -40 Z', fill: 'rgba(6,12,22,.72)', stroke: 'currentColor', 'stroke-width': 2, opacity: .95 }, holo);
  S('line', { x1: 0, y1: -40, x2: 0, y2: -26, stroke: 'currentColor', 'stroke-width': 2, opacity: .7 }, holo);
  const t = S('text', { x: 0, y: -58, 'text-anchor': 'middle', fill: '#fff', 'font-size': 36, 'font-weight': 800 }, holo);
  t.textContent = glyph || '';
  return {
    g, set(st) { g.style.color = COLS[st] || st; g.dataset.st = st; },
    glyph(s) { t.textContent = s; },
    show(on) { g.style.opacity = on ? 1 : 0; },
  };
};
// smooth path through points (Catmull-Rom → cubic Bézier)
GK.curve = pts => {
  let d = `M${pts[0][0]} ${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2;
    d += ` C${p1[0] + (p2[0] - p0[0]) / 6} ${p1[1] + (p2[1] - p0[1]) / 6}, ${p2[0] - (p3[0] - p1[0]) / 6} ${p2[1] - (p3[1] - p1[1]) / 6}, ${p2[0]} ${p2[1]}`;
  }
  return d;
};
// luminous path: soft halo + core + travelling sparks; colour can be a gradient [c1, c2]
GK.path = (svg, d, col, opt = {}) => {
  const id = svg._g, g = S('g', { class: 'gpath f' }, svg);
  let stroke = col;
  if (Array.isArray(col)) {
    const gid = id + 'g' + (++GID), defs = svg.querySelector('defs');
    const lg = S('linearGradient', { id: gid, gradientUnits: 'userSpaceOnUse', x1: opt.x1 || 0, y1: 0, x2: opt.x2 || 1680, y2: 0 }, defs);
    col.forEach((c, i) => S('stop', { offset: i / (col.length - 1), 'stop-color': c }, lg));
    stroke = `url(#${gid})`;
  }
  const dash = opt.dashed ? '10 12' : null;
  S('path', { d, fill: 'none', stroke, 'stroke-width': opt.w ? opt.w * 3 : 12, opacity: opt.dashed ? .12 : .45, filter: `url(#${id}m)` }, g);
  const core = S('path', { d, fill: 'none', stroke, 'stroke-width': opt.w || 3.5, 'stroke-linecap': 'round', opacity: opt.dashed ? .55 : 1 }, g);
  if (dash) core.setAttribute('stroke-dasharray', dash);
  if (!opt.dashed && !opt.still) {
    const sp = S('path', { d, fill: 'none', stroke: '#fff', 'stroke-width': 3, 'stroke-linecap': 'round', 'stroke-dasharray': '2 46', opacity: .85, class: 'gspark' }, g);
    sp.style.animationDuration = (opt.speed || 1.6) + 's';
  }
  return g;
};
// dark status chip above a point (HTML, centred on x)
GK.chip = (p, x, y, html, kind) => {
  const c = div(p, 'gchip abs f hide ' + (kind || ''), html);
  c.style.left = x + 'px'; c.style.top = y + 'px';
  return c;
};
GK.label = (p, x, y, html, w = 260, cls = '') => {
  const l = div(p, 'glabel f ' + cls, html, x - w / 2, y, w);
  return l;
};
// atmosphere: soft colour fields behind a view, optional original photo
GK.atmo = (root, blobs, photo, op) => {
  const a = A.el('div', 'gatmo', null);
  root.insertBefore(a, root.firstChild);
  if (photo) { const ph = A.el('div', 'gphoto', a); ph.style.backgroundImage = `url(${photo})`; ph.style.opacity = op || .5; }
  (blobs || []).forEach(([x, y, r, c, o]) => { const bl = A.el('div', 'gblob', a); bl.style.cssText = `left:${x - r}px;top:${y - r}px;width:${2 * r}px;height:${2 * r}px;background:radial-gradient(circle,${c} 0%,transparent 68%);opacity:${o || .35}`; });
  return a;
};
const BG = { lab: 'media/kosmos-pitch/bg-labv1.1.webp', or: 'media/kosmos-pitch/bg-orv1.1.webp', arc: 'media/kosmos-pitch/bg-archivev1.1.webp' };

/* 4 · OVERVIEW — the seven steps as a glowing pad pipeline (poster thumbnail kept for m1) */
V.poster = {
  title: '七步一张图：<em>干实验找方向 → 门控湿实验 → 证据包</em>',
  build(root, api) {
    init(api);
    GK.atmo(root, [[420, 640, 520, 'rgba(46,196,182,.55)', .32], [1500, 560, 560, 'rgba(232,100,27,.5)', .28], [960, 700, 380, 'rgba(242,177,52,.4)', .18]]);
    const b = box(root);
    const s = svgIn(b, 1680, 580, 0, 0); GK.defs(s);
    const P = [[150, 340], [380, 276], [610, 340], [840, 276], [1070, 340], [1300, 276], [1530, 330]];
    const ST = ['au', 'ai', 'ai', 'ai', 'ai', 'au', 'ai'];
    const N = [['课题配置 + G1', '术前知情同意'], ['干实验循环', '术前影像与检验'], ['假设表', '鉴别诊断清单'], ['分阶段 + 干稿', '损伤控制'], ['结构化 SOP', '模拟手术 · 器械清点'], ['湿实验 + 封存', '术中冰冻 · 手术记录'], ['等效门 → 证据包', '病理报告']];
    const CH = [['✓ G1 已签', 'ok'], ['⏸ 待授权 G-spend', 'warn'], ['✗ 已淘汰 · 留痕', 'dim'], ['门槛 ▸ 不过不花钱', ''], ['✓ SOP 冻结', 'ok'], ['lock-wet 🔒', 'warn'], ['✓ verify-pack', 'ok']];
    const path = GK.path(s, GK.curve(P), [C.te2, C.gold, C.or2], { x1: 150, x2: 1530 });
    path.style.opacity = 0;
    const tok = S('circle', { r: 7, fill: '#fff', opacity: 0, filter: `url(#${s._g}s)` }, s);
    const am = S('animateMotion', { dur: '7s', repeatCount: 'indefinite', path: GK.curve(P) }, tok);
    const pads = P.map(([x, y], i) => { const p = GK.pad(s, x, y, 'off', '①②③④⑤⑥⑦'[i], .86); p.g.style.opacity = .25; return p; });
    const names = P.map(([x, y], i) => GK.label(b, x, y + 52, `<b>${N[i][0]}</b>`, 230));
    const anas = P.map(([x, y], i) => GK.label(b, x, y + 92, `${N[i][1]}`, 250, 'or'));
    const chips = P.map(([x, y], i) => GK.chip(b, x, y - 150, CH[i][0], CH[i][1]));
    // roles strip
    const roles = div(b, 'f hide dn', `<div style="display:flex;gap:26px;justify-content:center">
      <div class="gchip ai big" style="position:relative">${IC.robot(C.te2).replace('width="64" height="64"', 'width="38" height="38"')}<span><b>Codex 等 AI 编码助手</b> · 在划定的边界内执行</span></div>
      <div class="gchip au big" style="position:relative">${IC.person(C.gold).replace('width="64" height="64"', 'width="38" height="38"')}<span><b>作者</b> · 关键决定 + 亲手做实验</span></div></div>`, 0, 0, 1680);
    // poster thumbnail (m1 only) — no highlight bands
    const fr = div(b, 'f', `<img src="media/kosmos-pitch/workflow-rc5v1.0.webp" alt="Kosmos-lite v1.4 工作流全图" style="width:340px;height:507px;border-radius:14px;display:block;box-shadow:0 20px 60px rgba(0,0,0,.6),0 0 0 1px rgba(244,234,215,.18)">
      <div class="glabel" style="position:relative;margin-top:10px;width:340px">全貌 · 工作流图</div>`, 1320, -20, 340);
    let failT = 0;
    return { set(k, keys, instant) {
      const at = reach(keys, k);
      const m3 = at('m3');
      fr.style.opacity = at('m2') ? 0 : 1; fr.style.transform = at('m2') ? 'translateX(60px) scale(.9)' : 'none';
      sh(roles, at('m2'));
      path.style.opacity = at('m1') ? (m3 ? 1 : .35) : .12; tok.setAttribute('opacity', m3 ? 1 : 0);
      pads.forEach((p, i) => {
        const on = at('m2') || m3;
        const st = m3 || at('m2') ? ST[i] : 'off';
        if (m3 && !instant) api.later(() => { p.set(ST[i]); p.g.style.opacity = 1; }, i * 180);
        else { p.set(st); p.g.style.opacity = on ? 1 : at('m1') ? .55 : .25; }
        tg(names[i], 'hide', !at('m1')); names[i].style.opacity = '';
        tg(anas[i], 'hide', !at('m4'));
        tg(chips[i], 'hide', !m3);
      });
      // a failing node: SOP edited after freeze → STALE (red) → re-frozen
      if (m3 && !at('m4') && !failT) {
        failT = 1;
        api.later(() => { pads[4].set('bad'); chips[4].innerHTML = '✗ STALE · 冻结后被改'; chips[4].className = chips[4].className.replace(/\b(ok|bad)\b/g, '') + ' bad'; }, instant ? 0 : 2200);
        api.later(() => { pads[4].set('ai'); chips[4].innerHTML = '✓ 写明理由 · 重新冻结'; chips[4].className = chips[4].className.replace(/\bbad\b/g, '') + ' ok'; }, instant ? 10 : 5600);
      }
      if (!m3) { failT = 0; chips[4].innerHTML = CH[4][0]; }
    } };
  }
};

/* 2b · FOUR ROUNDS — four pads, each comes back ✗; controls ✓; evidence log */
V.rounds = {
  title: '干实验跑了<em>四轮</em>',
  build(root, api) {
    init(api);
    GK.atmo(root, [[600, 640, 560, 'rgba(46,196,182,.5)', .3], [1560, 520, 420, 'rgba(242,177,52,.35)', .2]]);
    const b = box(root);
    const s = svgIn(b, 1680, 580, 0, 0); GK.defs(s);
    const P = [[150, 270], [470, 215], [790, 270], [1110, 215]], NX = [1440, 250];
    const R = [['r2', '第 1 轮', '多源文献', '✗ 未见直接证据'], ['r3', '第 2 轮', '公开 bulk 转录组', '✗ 未见正相关'], ['r4', '第 3 轮', '公开蛋白组', '✗ 未见正相关'], ['r5', '第 4 轮', '公开单细胞', '✗ 未见共表达']];
    GK.path(s, GK.curve([...P]), [C.te2, C.te], { x1: 150, x2: 1110 });
    const nx = GK.path(s, GK.curve([P[3], [1280, 238], NX]), C.gold, { dashed: true });
    const q = GK.pad(s, NX[0], NX[1], 'off', '?', .8); q.g.style.opacity = .45;
    const qa = GK.label(b, NX[0], NX[1] + 50, '下一步：怎么决定？', 260, 'dm');
    const pads = P.map(([x, y], i) => GK.pad(s, x, y, 'off', String(i + 1), .9));
    const nm = P.map(([x, y], i) => GK.label(b, x, y + 52, `<span class="m">${R[i][1]}</span><br><b>${R[i][2]}</b>`, 280));
    const ch = P.map(([x, y], i) => GK.chip(b, x, y - 158, R[i][3], 'bad'));
    const ctl = P.map(([x, y]) => GK.chip(b, x, y + 132, '阳性 ✓ 阴性 ✓', 'ok sm'));
    const verdict = div(b, 'f hide', `<div class="gpanel" style="display:flex;align-items:center;gap:22px"><span style="font-size:44px;color:${C.gold}">◎</span><span class="kp-t" style="font-size:32px">四轮都<em>没有看到</em>这条轴所需要的正向共调控</span><span class="tag t-ill" style="margin-left:auto">信息性阴性 · 不是技术失败</span></div>`, 0, 462, 1680);
    const log = div(b, 'gchip ana f hide', '证据日志：检索式 · 数据编号 · 脚本 · 输出', 1270, 330); log.style.whiteSpace = 'normal'; log.style.width = '400px';
    return { set(k, keys) {
      const at = reach(keys, k);
      let last = -1;
      pads.forEach((p, i) => { const on = at(R[i][0]); if (on) last = i; p.set(on ? 'ok' : 'off'); p.g.style.opacity = at('r1') ? (on ? 1 : .5) : .2; tg(ch[i], 'hide', !on); tg(nm[i], 'hide', !at('r1')); tg(ctl[i], 'hide', !at('r6')); });
      pads.forEach((p, i) => p.g.classList.toggle('gfocus', i === last && !at('r6')));
      tg(verdict, 'hide', !at('r7'));
      tg(log, 'hide', !at('r8')); q.g.style.opacity = at('r8') ? .8 : .45; nx.style.opacity = at('r7') ? 1 : .4;
    } };
  }
};

/* 2c · DECISION — pause node glows amber; cheap test node; greyed-out reagent branch */
V.decision = {
  title: '决定：<em>先做最便宜的一步</em>',
  build(root, api) {
    init(api);
    GK.atmo(root, [[760, 560, 480, 'rgba(242,177,52,.55)', .3], [1300, 560, 420, 'rgba(46,196,182,.45)', .22]]);
    const b = box(root);
    const s = svgIn(b, 1680, 580, 0, 0); GK.defs(s);
    const R4 = [[70, 300], [170, 268], [270, 300], [370, 268]], D = [640, 280], T = [1060, 320], OK = [1290, 205], NO = [1290, 420], GR = [1060, 120];
    GK.path(s, GK.curve([...R4, D]), [C.te, C.gold], { x1: 70, x2: 640, w: 3 });
    const grey = GK.path(s, GK.curve([D, [860, 170], GR]), '#6f7d90', { dashed: true });
    const main = GK.path(s, GK.curve([D, [850, 316], T]), [C.gold, C.te2], { x1: 640, x2: 1060 });
    const pOK = GK.path(s, GK.curve([T, [1190, 236], OK]), C.gr, { speed: 1.2 });
    const pNO = GK.path(s, GK.curve([T, [1190, 400], NO]), C.gold, { speed: 1.2 });
    R4.forEach(([x, y]) => { const p = GK.pad(s, x, y, 'ok', '✗', .48); p.g.style.opacity = .7; });
    const c4 = GK.chip(b, 220, 160, '四轮 ✗ 未见正相关', 'bad sm');
    const pd = GK.pad(s, D[0], D[1], 'off', '⏸', 1.05);
    const pt = GK.pad(s, T[0], T[1], 'off', '①', .9);
    const pg = GK.pad(s, GR[0], GR[1], 'off', '🧪', .7); pg.g.style.opacity = .35;
    const po = GK.pad(s, OK[0], OK[1], 'go', '✓', .62), pn = GK.pad(s, NO[0], NO[1], 'warn', '↺', .62);
    const dch = GK.chip(b, D[0], D[1] - 172, '⏸ 暂停 · 先做一步便宜验证', 'warn big');
    const dl = GK.label(b, D[0], D[1] + 58, '<b>暂停全轴实验</b><br><span class="dm">不是砍掉课题</span>', 280);
    const gl = div(b, 'glabel f hide dm', '<s>敲低 / 回复实验试剂</s><br>（暂不购买）', GR[0] + 90, GR[1] - 62, 330); gl.style.textAlign = 'left';
    const tch = GK.chip(b, T[0], T[1] + 62, '最便宜、最能说明问题', 'ok sm');
    const tl = GK.label(b, T[0], T[1] + 112, '<b>确认蛋白在自己细胞里有内源表达</b>', 420);
    const ol = div(b, 'glabel f hide', `<b style="color:${C.gr}">过了</b> → 再买敲低和<br>回复实验试剂`, OK[0] + 78, OK[1] - 50, 300); ol.style.textAlign = 'left';
    const nl = div(b, 'glabel f hide', `<b style="color:${C.gold}">过不了</b> → 换方向`, NO[0] + 78, NO[1] - 34, 230); nl.style.textAlign = 'left';
    const d1 = div(b, 'f hide', `<div class="gchip" style="position:relative;font-size:27px">公开数据里没看到 <b style="color:${C.or2}">≠</b> 机制不存在</div>`, 0, -6);
    const quote = div(b, 'f hide dn', `<div class="gpanel" style="font-size:32px;font-weight:800;color:${C.cr}">「干实验先帮我省下了一笔湿实验的钱，<span style="color:${C.or2}">也省下了几个月。</span>」</div>`, 0, 490, 1680);
    const ct = ana(b, 0, 492, 1680, `急诊里的一张 CT：不替你开刀，但会告诉你——<b>这一刀，先别急着开。</b>`);
    [main, pOK, pNO].forEach(p => p.style.opacity = 0);
    return { set(k, keys) {
      const at = reach(keys, k);
      tg(c4, 'hide', false); tg(d1, 'hide', !at('d1'));
      pd.set(at('d2') ? 'warn' : 'off'); pd.g.classList.toggle('gfocus', at('d2') && !at('d3'));
      tg(dch, 'hide', !at('d2')); tg(dl, 'hide', !at('d2'));
      grey.style.opacity = at('d2') ? 1 : 0; tg(gl, 'hide', !at('d2')); pg.g.style.opacity = at('d2') ? .45 : 0; pg.set(at('d2') ? 'off' : 'off');
      main.style.opacity = at('d3') ? 1 : 0; pt.set(at('d3') ? 'ok' : 'off'); pt.g.style.opacity = at('d3') ? 1 : .2;
      tg(tch, 'hide', !at('d3')); tg(tl, 'hide', !at('d3'));
      [pOK, pNO].forEach(p => p.style.opacity = at('d4') ? 1 : 0); [po, pn].forEach(p => p.g.style.opacity = at('d4') ? 1 : 0); tg(ol, 'hide', !at('d4')); tg(nl, 'hide', !at('d4'));
      sh(quote, at('d5') && !at('d6')); sh(ct, at('d6'));
    } };
  }
};

/* ② DRY-LAB LOOP — split → four parallel units → merge into the evidence log */
V.dryloop = {
  title: '② 干实验循环',
  sub: '多源文献 · 公开数据 · 本地分析 → 世界模型（唯一真值）',
  build(root, api) {
    init(api);
    GK.atmo(root, [[420, 640, 460, 'rgba(232,100,27,.45)', .22], [1000, 600, 520, 'rgba(46,196,182,.55)', .3], [1560, 560, 420, 'rgba(46,196,182,.4)', .22]]);
    const b = box(root);
    const s = svgIn(b, 1680, 580, 0, 0); GK.defs(s);
    const SP = [170, 290], M = [1290, 250], ED = [1130, 60];
    const U = [[730, 80, '文献', '多源检索'], [730, 205, '公开表达数据', 'bulk 转录组'], [730, 330, '蛋白组', '公开数据'], [730, 455, '单细胞', '公开数据']];
    const ins = U.map(([x, y]) => GK.path(s, GK.curve([SP, [430, (SP[1] + y) / 2 + (y - SP[1]) * .2], [x, y]]), [C.or2, C.te2], { x1: 170, x2: 730, w: 3, speed: 1.4 }));
    const outs = U.map(([x, y]) => GK.path(s, GK.curve([[x, y], [1030, (M[1] + y) / 2 + (y - M[1]) * .2], M]), [C.te2, C.te], { x1: 730, x2: 1290, w: 3, speed: 1.4 }));
    const ep = GK.path(s, GK.curve([SP, [700, -10], ED]), C.gold, { dashed: true });
    const psp = GK.pad(s, SP[0], SP[1], 'or', '②', .95);
    const pu = U.map(([x, y], i) => GK.pad(s, x, y, 'off', '', .58));
    const pm = GK.pad(s, M[0], M[1], 'off', '◎', 1);
    const pe = GK.pad(s, ED[0], ED[1], 'warn', '🔒', .56);
    const spl = GK.label(b, SP[0], SP[1] + 56, '<b>拆分</b><br><span class="dm">检索 · 下载 · 本地分析</span>', 280);
    const ul = U.map(([x, y, t, sb]) => { const l = div(b, 'glabel f hide', `<b>${t}</b> <span class="dm">${sb}</span>`, x + 80, y - 44, 330); l.style.textAlign = 'left'; return l; });
    const uc = U.map(([x, y]) => { const c = div(b, 'gchip ok sm f hide', '阳性 ✓ 阴性 ✓', x + 80, y - 8); return c; });
    const ml = GK.label(b, M[0], M[1] + 58, '<b>合并 → 世界模型 · 证据日志</b>', 400);
    const tags = div(b, 'f hide dn', `<div style="display:flex;gap:14px;justify-content:center">
      <span class="gchip ok" style="position:relative">事实</span><span class="gchip ai" style="position:relative">关联</span><span class="gchip bad" style="position:relative">推测</span></div>`, M[0] - 210, M[1] + 110, 420);
    const el = div(b, 'glabel f hide', `<b style="color:${C.gold}">付费智能体（如 Edison）</b><br>每次花费先经作者授权 · <span class="m" style="color:${C.gold}">G-spend</span>`, ED[0] + 76, ED[1] - 50, 470); el.style.textAlign = 'left';
    const ctlNote = div(b, 'glabel f hide', '方法连已知答案都找不出来 → 结果不算数', 730, 512, 480, 'dm');
    ctlNote.style.textAlign = 'left'; ctlNote.style.width = '520px'; ctlNote.style.left = '650px';
    const an = ana(b, 1040, 436, 640, `术前影像与检验：<b>先看清楚，再决定要不要上台。</b>`);
    return { set(k, keys) {
      const at = reach(keys, k);
      const l2 = at('l2');
      ins.forEach(p => p.style.opacity = l2 ? 1 : .08); pu.forEach(p => { p.set(l2 ? 'ok' : 'off'); p.g.style.opacity = l2 ? 1 : .3; });
      ul.forEach(l => tg(l, 'hide', !l2)); tg(spl, 'hide', false);
      outs.forEach(p => p.style.opacity = at('l3') ? 1 : .08); pm.set(at('l3') ? 'ok' : 'off'); pm.g.classList.toggle('gfocus', at('l3') && !at('l5'));
      tg(ml, 'hide', !at('l3')); sh(tags, at('l4'));
      uc.forEach(c => tg(c, 'hide', !at('l5'))); tg(ctlNote, 'hide', !at('l5') || at('l6'));
      ep.style.opacity = at('l5b') ? 1 : 0; pe.g.style.opacity = at('l5b') ? 1 : 0; tg(el, 'hide', !at('l5b'));
      sh(an, at('l6'));
    } };
  }
};

/* 11 · BOTTOM RULE — card sort: what the AI runs vs what a person signs */
V.spend = {
  title: '底线：<em>G-spend / G-external</em> 逐项授权',
  build(root, api) {
    init(api);
    GK.atmo(root, [[1300, 760, 520, 'rgba(242,177,52,.4)', .22], [420, 760, 520, 'rgba(46,196,182,.4)', .2]], BG.or, .42);
    const b = box(root);
    const AIc = ['文献检索', '数据下载', '差异分析', 'SOP 干跑', '用量清单', '措辞检查'];
    const HUc = [['课题批准', 'G1'], ['花钱', 'G-spend'], ['上传 / 推送', 'G-external'], ['原始数据封存', 'lock-wet'], ['最终结论', '作者']];
    const bins = div(b, 'f gbins', `<div class="gbin ai"><div class="bh"><span class="m">AI</span> 来做<span class="bs">跑腿 · 每一步留痕</span></div></div><div class="gbin au"><div class="bh"><span class="m">人</span>来签<span class="bs">逐项授权 · 记进日志</span></div></div>`, 0, 214, 1680, 350);
    const pool = [];
    const W = 380, H = 58;
    AIc.forEach((t, i) => pool.push({ t, tag: '留痕', side: 'ai', i }));
    HUc.forEach(([t, g], i) => pool.push({ t, tag: g, side: 'au', i }));
    // shuffled pool order
    const order = [0, 6, 1, 7, 2, 8, 3, 9, 4, 10, 5];
    const chips = pool.map((o, j) => {
      const c = div(b, 'gcard f hide', `<span>${o.t}</span><span class="gt ${o.side}">${o.tag}</span>`, 0, 0, W);
      c.style.height = H + 'px';
      const pi = order.indexOf(j); o.px = (pi % 4) * (W + 53); o.py = ((pi / 4) | 0) * 68;
      // bin slot: two columns per bin
      const col = o.i % 2, row = (o.i / 2) | 0;
      o.bx = (o.side === 'ai' ? 22 : 882) + col * (W + 16); o.by = 214 + 76 + row * 70;
      o.el = c; return o;
    });
    const log = div(b, 'f hide', `<div class="mono" style="font-size:22px;line-height:1.6;color:${C.cr}"><span style="color:${C.gr}">APPROVED</span> G-spend<br>by 作者 · 时间戳 · 范围</div>`, 1278, 214 + 76 + 2 * 70 + 4, 380);
    const big = div(b, 'f hide', `<div class="gpanel" style="display:flex;align-items:center;gap:22px">${IC.scalpel(C.or2)}<div><div class="kp-t" style="font-size:32px">主刀签字</div><div class="kp-s" style="color:${C.cr};margin-top:2px">助手可以把一切准备好，下刀那一下，写的是主刀的名字。</div></div></div>`, 0, 30, 1680);
    const place = (o, inBin) => { o.el.style.left = (inBin ? o.bx : o.px) + 'px'; o.el.style.top = (inBin ? o.by : o.py) + 'px'; };
    return { set(k, keys, instant) {
      const at = reach(keys, k);
      chips.forEach(o => {
        tg(o.el, 'hide', !at('x1'));
        const go = o.side === 'ai' ? at('x2') : at('x3');
        const delay = instant ? 0 : o.i * 160;
        if (go) api.later(() => place(o, true), delay); else place(o, false);
        const hot = o.side === 'au' && (o.tag === 'G-spend' || o.tag === 'G-external');
        tg(o.el, 'hot', hot && at('x2') && !at('x3'));
        tg(o.el, 'signed', o.side === 'au' && at('x3'));
      });
      tg(log, 'hide', !at('x3b')); tg(big, 'hide', !at('x4'));
    } };
  }
};

/* 12 · DEMO 1 — plate callouts now match the dry-run messages (A3 = missing sample; NTC = no wells) */
{
  const base = V.demodry.build;
  V.demodry = Object.assign({}, V.demodry, {
    build(root, api) {
      const inst = base(root, api);
      const pl = [...root.querySelectorAll('.kp-card')].pop();
      const grid = pl.querySelector('.grid');
      const cells = [...grid.children].filter(e => e.tagName === 'SPAN' && e.style.aspectRatio);
      const W = {}; 'ABCD'.split('').forEach((r, ri) => { for (let c = 1; c <= 6; c++) W[r + c] = cells[ri * 6 + c - 1]; });
      W.A3.style.position = 'relative';
      const note = E('div', 'pnote', pl.querySelector('.heat').parentNode);
      pl.querySelector('.heat').parentNode.insertBefore(note, pl.querySelector('.heat'));
      const ntc = [W.A6, W.B6, W.C6];
      return { set(k, keys, instant) {
        inst.set(k, keys, instant);
        const at = reach(keys, k), fixed = at('e5b');
        // NTC wells only become visible (dashed outline, labelled) when the fix adds them; before that column 6 is ordinary sample wells
        ntc.forEach(w => { w.style.borderStyle = 'solid'; w.style.borderColor = fixed ? C.gold : C.te; w.style.background = fixed ? 'rgba(242,177,52,.35)' : 'rgba(46,196,182,.25)'; w.textContent = fixed ? 'N' : ''; w.classList.toggle('wl', fixed); });
        W.A3.textContent = at('e3') ? 'A3' : ''; W.A3.classList.toggle('wl', at('e3'));
        W.A3.style.boxShadow = at('e3') && !fixed ? `0 0 0 4px rgba(255,93,93,.35),0 0 22px ${C.red}` : fixed ? `0 0 0 3px rgba(73,217,138,.4)` : 'none';
        if (fixed) { W.A3.style.borderColor = C.gr; W.A3.style.background = 'rgba(73,217,138,.3)'; }
        const msg = fixed ? `<span style="color:${C.gr}">✓ A3 已加样 · NTC 补在 A6–C6（N）</span>`
          : at('e4') ? `<span style="color:${C.red}">✗ A3 无样本</span> · <span style="color:${C.red}">✗ 整板没有 NTC 孔</span>`
          : at('e3') ? `<span style="color:${C.red}">✗ A3：第 7 步读数时无样本</span>` : `<span class="c-dm">逐孔追踪 12 步 · 24 孔</span>`;
        note.innerHTML = msg;
      } };
    }
  });
}

/* atmospheric photos on two content views (original generated images, dimmed) */
{
  const wrap = (name, photo, op) => { const base = V[name].build; V[name] = Object.assign({}, V[name], { build(root, api) { init(api); GK.atmo(root, [], photo, op); return base(root, api); } }); };
  wrap('pain', BG.lab, .38);
  wrap('pack', BG.arc, .32);
}

/* autolab: citation line lifted clear of the subtitles */
{ const base = V.autolab.build; V.autolab = Object.assign({}, V.autolab, { build(root, api) { const r = base(root, api); const c = [...root.querySelectorAll('.sv > div')].find(e => e.textContent.indexOf('Wu, M. et al.') === 0); if (c) c.style.top = '466px'; return r; } }); }

/* illustrative tag never wraps and stays inside the stage */
['demobom', 'demoword', 'demodry'].forEach(n => { const base = V[n].build; V[n] = Object.assign({}, V[n], { build(root, api) { const r = base(root, api); root.querySelectorAll('.ill').forEach(t => { if (parseFloat(t.style.left) > 1420) t.style.left = '1420px'; }); return r; } }); });

})();
