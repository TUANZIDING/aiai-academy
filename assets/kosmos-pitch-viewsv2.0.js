/* aiai · Kosmos-lite 科研闭环 pitch v2.0 — bespoke animated views, content strictly from kosmos-lite-research-loop tag v1.3.0 (v2.0: rc-only views removed; new topic-gate, dry-loop, closing-gate, SOP+facility, wet-slot/lock-wet, outcome, manuscript, how-to and three real-output demo views) (original SVG/CSS work, aiai academy).
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
    const foot = div(b, 'f hide dn', `<span class="kp-pill c-or">${IC.scalpel(C.or2).replace(/46/g, '30')}外科类比</span><span class="kp-pill c-dm">约 18 分钟</span><span class="kp-pill c-cr">最后只请您做一个决定</span>`, 0, 520, 1680);
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



/* ---------- the seven steps ---------- */
const hexs = n => { const h = '0123456789abcdef'; let s = ''; for (let i = 0; i < n; i++) s += h[(Math.random() * 16) | 0]; return s; };



















/* ---------- three demos (illustrative output, fictional data) ---------- */









/* ---------- who gets what ---------- */
V.who = {
  title: '谁能得到什么',
  build(root, api) {
    init(api);
    const b = box(root);
    const W = [['j1', '科研处', '🏛', ['每个课题一份可核查的证据包', '花钱、对外动作都要授权', '申报前先做可行性评估']], ['j2', 'PI · 导师', '🎓', ['动手之前查漏', '提前拿到设施核对清单', '带教有统一标准']], ['j3', '临床医生', '🩺', ['没有自己的实验室也能开始', '先用公开数据找方向', '再决定要不要做湿实验']]];
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
      <div style="font-size:28px;color:${C.te2};margin-top:14px">aiai 人工智能学院 · 丁医生的医学笔记</div></div>`, 0, 395, 1680);
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





/* atmospheric photos on two content views (original generated images, dimmed) */
{
  const wrap = (name, photo, op) => { const base = V[name].build; V[name] = Object.assign({}, V[name], { build(root, api) { init(api); GK.atmo(root, [], photo, op); return base(root, api); } }); };
  wrap('pain', BG.lab, .38);
}

/* autolab: citation line lifted clear of the subtitles */
{ const base = V.autolab.build; V.autolab = Object.assign({}, V.autolab, { build(root, api) { const r = base(root, api); const c = [...root.querySelectorAll('.sv > div')].find(e => e.textContent.indexOf('Wu, M. et al.') === 0); if (c) c.style.top = '466px'; return r; } }); }



/* ================= v2.0 · views rebuilt on the v1.3.0 tag (original compositions, aiai academy) =================
   Every command, file name and terminal line below exists in kosmos-lite-research-loop v1.3.0.
   Terminal text in the three live demos is real script output (trimmed; project path shown as ~/Projects/demo-loop).
   Rule for flow views: the whole skeleton is visible from the first line (dimmed), lines only light it up — no empty arrows. */
const REAL = (b, x, y, t) => div(b, 'real', t || 'v1.3.0 真实输出 · 有删减', x, y);
const lit = (el, on, dimOp) => { el.style.opacity = on ? 1 : (dimOp == null ? .28 : dimOp); };
const tset = (lines, on, api, step) => lines.forEach((l, i) => { if (on) api.later(() => tg(l, 'hide', false), i * (step || 220)); else tg(l, 'hide', true); });

/* 4 · OVERVIEW — seven glowing pads on one curved path; the bottom rule below */
V.poster = {
  title: '七步一张图：<em>干实验找方向 → 门控湿实验 → 稿件与证据包</em>',
  build(root, api) {
    init(api);
    GK.atmo(root, [[420, 640, 520, 'rgba(46,196,182,.55)', .32], [1500, 560, 560, 'rgba(232,100,27,.5)', .28], [960, 700, 380, 'rgba(242,177,52,.4)', .18]]);
    const b = box(root);
    const s = svgIn(b, 1680, 580, 0, 0); GK.defs(s);
    const P = [[130, 300], [365, 236], [600, 300], [835, 236], [1070, 300], [1305, 236], [1545, 300]];
    const ST = ['au', 'ai', 'ai', 'ai', 'warn', 'au', 'ok'];
    const N = [['课题配置 + G1', '术前讨论 · 知情同意'], ['干实验循环', '术前影像与检验'], ['假设表', '鉴别诊断'], ['分阶段设计', '分期手术方案'], ['台架 SOP', '术前核查表'], ['湿实验 + lock-wet', '冰冻 · 手术记录封存'], ['稿件检查 → 证据包', '病理报告措辞']];
    const CH = [['✓ G1 · SHA-256', 'ok'], ['引用核验 · 收尾门', 'ai'], ['支持↑ 削弱↓', 'dim'], ['决策记录', ''], ['【待核实：设施】', 'warn'], ['lock-wet 🔒', 'warn'], ['✓ verify-pack', 'ok']];
    const path = GK.path(s, GK.curve(P), [C.te2, C.gold, C.or2], { x1: 130, x2: 1545 });
    const tok = S('circle', { r: 7, fill: '#fff', opacity: 0, filter: `url(#${s._g}s)` }, s);
    S('animateMotion', { dur: '7s', repeatCount: 'indefinite', path: GK.curve(P) }, tok);
    const pads = P.map(([x, y], i) => GK.pad(s, x, y, 'off', '①②③④⑤⑥⑦'[i], .78));
    const names = P.map(([x, y], i) => GK.label(b, x, y + 48, `<b>${N[i][0]}</b>`, 230));
    const anas = P.map(([x, y], i) => GK.label(b, x, y + 86, N[i][1], 240, 'or hide'));
    const chips = P.map(([x, y], i) => GK.chip(b, x, y - 140, CH[i][0], CH[i][1] + ' sm'));
    const roles = div(b, 'f hide dn', `<div style="display:flex;gap:26px;justify-content:center">
      <div class="gchip ai big" style="position:relative">${IC.robot(C.te2).replace('width="64" height="64"', 'width="38" height="38"')}<span><b>Codex 等 AI 编码助手</b> · 在划定的边界内执行</span></div>
      <div class="gchip au big" style="position:relative">${IC.person(C.gold).replace('width="64" height="64"', 'width="38" height="38"')}<span><b>作者</b> · 关键决定 + 亲手做实验</span></div></div>`, 0, -10, 1680);
    const rule = div(b, 'f hide dn', `<div class="gpanel" style="display:flex;align-items:center;gap:18px;justify-content:center;padding:12px 26px">${IC.scalpel(C.or2).replace(/46/g, '34')}<span style="font-size:27px;color:${C.cr}"><b>底线</b> · G-spend / G-external 逐项授权</span><span style="font-size:25px;color:${C.or2}">= 主刀签字</span></div>`, 330, 500, 1020);
    let failT = 0, m4on = false;
    return { set(k, keys, instant) {
      const at = reach(keys, k), m3 = at('m3'); m4on = at('m4');
      path.style.opacity = m3 ? 1 : at('m1') ? .45 : .2; tok.setAttribute('opacity', m3 ? 1 : 0);
      sh(roles, at('m2') && !at('m4'));
      pads.forEach((p, i) => {
        if (m3 && !instant) api.later(() => { p.set(ST[i]); p.g.style.opacity = 1; }, i * 180);
        else { p.set(m3 ? ST[i] : at('m2') ? (i === 0 || i === 5 ? 'au' : 'ai') : 'off'); p.g.style.opacity = at('m2') || m3 ? 1 : .6; }
        tg(names[i], 'hide', false);
        tg(anas[i], 'hide', !at('m4'));
        tg(chips[i], 'hide', !m3);
      });
      sh(rule, at('m4'));
      // real v1.3.0 behaviour: topic.json edited after G1 → approval invalid → re-confirmed
      if (m3 && !at('m4') && !failT) {
        failT = 1;
        api.later(() => { if (m4on) return; pads[0].set('bad'); chips[0].innerHTML = '✗ topic.json 已修改 · 批准失效'; chips[0].className = chips[0].className.replace(/\bok\b/g, '') + ' bad'; }, instant ? 0 : 2400);
        api.later(() => { if (m4on) return; pads[0].set('au'); chips[0].innerHTML = '✓ 作者重新确认'; chips[0].className = chips[0].className.replace(/\bbad\b/g, '') + ' ok'; }, instant ? 10 : 5600);
      }
      if (!m3 || at('m4')) { failT = at('m4') ? 1 : 0; chips[0].innerHTML = CH[0][0]; chips[0].className = chips[0].className.replace(/\bbad\b/g, '').replace(/\bok\b/g, '') + ' ok'; if (at('m3')) pads[0].set('au'); }
    } };
  }
};

/* ① topic.json + G1 — SHA-256 bound; real hashes of the demo topic before / after a one-number edit */
V.g1 = {
  title: '① 课题配置 + G1 课题门',
  sub: 'topic.json 的 SHA-256 绑定批准 · 任何字节变化，批准自动失效',
  build(root, api) {
    init(api);
    GK.atmo(root, [[360, 600, 460, 'rgba(242,177,52,.4)', .22], [1300, 560, 460, 'rgba(46,196,182,.4)', .2]]);
    const b = box(root);
    const F = [['question', '研究问题'], ['model', '物种 · 模型'], ['intervention', '干预 · 对照'], ['readouts', '读出指标'], ['scope', '范围 · 不做什么'], ['budget', 'edison_monthly_credits: <span class="bv">0</span>']];
    const cfg = card(b, 0, 0, 640, `<div class="kp-row" style="gap:12px">${IC.doc(C.cr, 36)}<span class="mono" style="font-size:25px;color:${C.cr}">topic.json</span><span class="tag t-ill" style="margin-left:auto">字段示意</span></div>
      <div style="margin-top:12px;display:grid;grid-template-columns:190px 1fr;gap:10px 14px;font-size:23px">${F.map(([k, v], i) => `<span class="mono" style="color:${C.dim};font-size:22px">${k}</span><span class="fv${i}" style="color:${C.cr};transition:color .4s,background .4s;border-radius:6px;padding:0 6px">${v}</span>`).join('')}</div>`);
    const H0 = '6bd9d69630fc807e58c48e5be2c023c384cdb8660d9f4bc4a8a177f2c0e06d15', H1 = 'f6551e388363cce82c44fcae8679fc7bec661e74dbace1d18ed46f41f1f9a09e';
    const hash = div(b, 'f hide', `<div class="kp-k" style="color:${C.te2}">SHA-256 指纹</div><div class="hv mono" style="font-size:22px;color:${C.te2};white-space:pre;margin-top:8px;line-height:1.45;transition:color .4s"></div>
      <svg width="400" height="40" viewBox="0 0 400 40"><line x1="0" y1="20" x2="380" y2="20" stroke="${C.te}" stroke-width="3" stroke-dasharray="8 8" class="flow"/><path d="M380 10 l16 10 l-16 10z" fill="${C.te}"/></svg>`, 680, 110, 420);
    const hv = hash.querySelector('.hv');
    const showH = (h, col) => { hv.textContent = h.slice(0, 32) + '\n' + h.slice(32); hv.style.color = col || C.te2; };
    showH(H0);
    const gate = card(b, 1140, 0, 540, `<div class="kp-row" style="gap:16px">${IC.lock(C.gold, 56)}<div><div class="kp-t">G1 课题门</div><div class="kp-s" style="margin-top:0">作者本人确认后，AI 才能开工</div></div></div>
      <div class="sig f hide mono" style="margin-top:16px;padding:10px 14px;border-radius:12px;border:1px dashed ${C.gr};font-size:22px;color:${C.gr}">approve-topic --by "作者"<br>✓ 绑定 <span class="hb">${H0.slice(0, 8)}…</span></div>`);
    const sig = gate.querySelector('.sig');
    const stale = div(b, 'stamp', '批准失效 · 需重新确认', 1170, 250); stale.style.color = C.red; stale.style.fontSize = '32px';
    const st = div(b, 'f hide', '', 1140, 340, 540);
    const ST = {
      wait: `<div class="gchip bad blk" style="position:relative">status --action literature → <b>BLOCKED</b><br><span style="font-size:22px">G1 前只允许 read_only / scoping</span></div>`,
      ok: `<div class="gchip ok" style="position:relative">status --action literature → <b>ALLOWED</b></div>`,
      bad: `<div class="gchip bad blk" style="position:relative"><b>BLOCKED</b> · topic.json 已修改，<br>原批准失效，需作者重新确认（G1）</div>`,
    };
    const consent = ana(b, 0, 470, 1680, `术前讨论与知情同意：<b>术式变了，同意书就得重签</b>，不能拿旧的那张顶着。`);
    return { set(k, keys) {
      const at = reach(keys, k);
      sh(cfg, at('g1')); sh(gate, at('g2')); tg(st, 'hide', !at('g2b'));
      tg(hash, 'hide', !at('g3')); tg(sig, 'hide', !at('g3'));
      st.innerHTML = at('g4') ? ST.bad : at('g3') ? ST.ok : ST.wait;
      const f5 = cfg.querySelector('.fv5'), bv = f5.querySelector('.bv');
      if (at('g4')) { bv.textContent = '50'; f5.style.background = 'rgba(255,93,93,.18)'; f5.style.color = C.red; showH(H1, C.red); }
      else { bv.textContent = '0'; f5.style.background = ''; f5.style.color = C.cr; showH(H0); }
      tg(stale, 'on', at('g4')); tg(sig, 'dimmed', at('g4'));
      sh(consent, at('g5'));
    } };
  }
};

/* ② DRY-LAB LOOP — split → four sources → merge into the world model; side ledger of what gets recorded */
V.dryloop = {
  title: '② 干实验循环',
  sub: '免费检索 · 本地分析 → 世界模型（可修订的研究记录）',
  build(root, api) {
    init(api);
    GK.atmo(root, [[420, 640, 460, 'rgba(232,100,27,.45)', .22], [900, 600, 520, 'rgba(46,196,182,.55)', .3], [1560, 560, 420, 'rgba(46,196,182,.4)', .2]]);
    const b = box(root);
    const s = svgIn(b, 1680, 580, 0, 0); GK.defs(s);
    const SP = [120, 290], M = [1090, 250];
    const U = [[540, 60, 'PubMed', '文献 · 免费'], [540, 190, 'GEO', '公开数据 · 免费'], [540, 320, '多源补充', 'Europe PMC · Crossref · BioStudies · PRIDE'], [540, 450, '本地分析', '固定种子 · 效应量 · 校正']];
    const ins = U.map(([x, y]) => GK.path(s, GK.curve([SP, [330, (SP[1] + y) / 2 + (y - SP[1]) * .2], [x, y]]), [C.or2, C.te2], { x1: 120, x2: 540, w: 3, speed: 1.4 }));
    const outs = U.map(([x, y]) => GK.path(s, GK.curve([[x, y], [880, (M[1] + y) / 2 + (y - M[1]) * .2], M]), [C.te2, C.te], { x1: 540, x2: 1090, w: 3, speed: 1.4 }));
    GK.pad(s, SP[0], SP[1], 'or', '②', .9);
    const pu = U.map(([x, y]) => GK.pad(s, x, y, 'off', '', .5));
    const pm = GK.pad(s, M[0], M[1], 'off', '◎', .95);
    GK.label(b, SP[0], SP[1] + 52, '<b>本轮计划</b><br><span class="dm">G1 之后放行</span>', 240);
    const ul = U.map(([x, y, t, sb]) => { const l = div(b, 'glabel f', `<b>${t}</b><br><span class="dm" style="font-size:22px">${sb}</span>`, x + 70, y - 40, 300); l.style.textAlign = 'left'; return l; });
    const ml = GK.label(b, M[0], M[1] + 52, '<b>世界模型</b><br><span class="dm">可修订 · 不替代原始数据</span>', 330);
    const tags = div(b, 'f hide dn', `<div style="display:flex;gap:12px;justify-content:center"><span class="gchip ok sm" style="position:relative">事实</span><span class="gchip ai sm" style="position:relative">关联</span><span class="gchip bad sm" style="position:relative">推测</span></div>
      <div class="glabel" style="position:relative;margin-top:8px;font-size:22px;white-space:nowrap">来源可追溯：<span class="m">PMID · GSE · 项目文件</span></div>`, M[0] - 230, M[1] + 120, 460);
    // ledger: what each round writes down
    const LG = [['l2b', '覆盖记录', '来源 · 查询 · 返回数 · 截断', 'ai'], ['l2b', 'NEEDS_MAPPING', '样本表对不上 → 停下，人工映射', 'warn'], ['l4', 'evidence-log.md', '事实 / 关联 / 推测 + 来源', 'ok'], ['l4b', 'cycles/trace.jsonl', '取舍一句话 · 谁 · 哪台机器', 'ai'], ['l5', '对照计划快照', 'sha256 · 能看出改动 ≠ 预注册', 'warn'], ['l5c', '人工阴性审阅', '效应·区间·对照·精度 → 不可判', 'warn']];
    const led = div(b, 'f', `<div class="kp-k" style="color:${C.te2};margin-bottom:6px">每一轮记下来的</div>` + LG.map(([key, t, d, c]) => `<div class="lgr" data-k="${key}" style="padding:7px 12px;margin-top:6px;border-radius:10px;border:1.5px solid ${c === 'ok' ? 'rgba(73,217,138,.6)' : c === 'warn' ? 'rgba(242,177,52,.65)' : 'rgba(122,231,220,.55)'};background:rgba(5,9,16,.82);transition:opacity .5s"><div class="mono" style="font-size:22px;color:${C.cr};font-weight:700">${t}</div><div style="font-size:21px;color:${C.dim}">${d}</div></div>`).join(''), 1330, -20, 350);
    const rows = [...led.querySelectorAll('.lgr')];
    const ed = div(b, 'f hide dn', `<div class="gchip au blk" style="position:relative;width:470px">${IC.lock(C.gold, 30)}<span><b>付费智能体（如 Edison）</b><br><span style="font-size:22px">每次花费先经作者授权 · G-spend</span></span></div>`, -20, 480);
    const an = ana(b, 560, 500, 760, `术前影像与检验：<b>先看清楚，再决定要不要上台。</b>`);
    return { set(k, keys) {
      const at = reach(keys, k), l2 = at('l2');
      ins.forEach(p => p.style.opacity = l2 ? 1 : .18); pu.forEach(p => { p.set(l2 ? 'ok' : 'off'); p.g.style.opacity = l2 ? 1 : .45; });
      ul.forEach(l => l.style.opacity = l2 ? 1 : .45);
      outs.forEach(p => p.style.opacity = at('l3') ? 1 : .14); pm.set(at('l3') ? 'ok' : 'off'); pm.g.classList.toggle('gfocus', at('l3') && !at('l4'));
      ml.style.opacity = at('l3') ? 1 : .45; sh(tags, at('l4'));
      rows.forEach(r => { const on = at(r.dataset.k); r.style.opacity = on ? 1 : .22; });
      sh(ed, at('l5b')); sh(an, at('l6'));
    } };
  }
};

/* ② close of a round — citation check + closing gate (next-cycle) */
V.close = {
  title: '一轮的收尾：<em>引用核验 + 收尾门</em>',
  build(root, api) {
    init(api);
    GK.atmo(root, [[700, 620, 520, 'rgba(46,196,182,.45)', .26], [1400, 560, 420, 'rgba(242,177,52,.4)', .2]]);
    const b = box(root);
    const s = svgIn(b, 1680, 580, 0, 0); GK.defs(s);
    const P = [[130, 250], [420, 200], [710, 250]], G = [1010, 230], NX = [1440, 230];
    const L = [['本轮复盘', 'cycles/cycle-N-v0.1.md'], ['validate-project', '证据等级 · 来源格式'], ['verify-citations', '标识存在 · 撤稿标记']];
    P.forEach((p, i) => { if (i) GK.path(s, GK.curve([P[i - 1], [(P[i - 1][0] + p[0]) / 2, Math.min(p[1], P[i - 1][1]) - 20], p]), C.te2, { w: 3 }); });
    GK.path(s, GK.curve([P[2], [860, 250], G]), [C.te2, C.gold], { x1: 710, x2: 1010 });
    const out = GK.path(s, GK.curve([G, [1230, 205], NX]), C.gr);
    const ov = GK.path(s, GK.curve([[680, 500], [900, 430], G]), C.gold, { dashed: true });
    const pads = P.map(([x, y], i) => GK.pad(s, x, y, 'off', ['✎', '✓', '§'][i], .72));
    const pg = GK.pad(s, G[0], G[1], 'off', '⛩', .95), pn = GK.pad(s, NX[0], NX[1], 'off', 'N+1', .72);
    P.forEach(([x, y], i) => GK.label(b, x, y + 46, `<b class="mono" style="font-size:23px">${L[i][0]}</b><br><span class="dm" style="font-size:22px">${L[i][1]}</span>`, 290));
    GK.label(b, G[0], G[1] + 54, '<b>收尾门</b><br><span class="mono dm" style="font-size:22px">next-cycle</span>', 240);
    GK.label(b, NX[0], NX[1] + 50, '<b>下一轮</b>', 200);
    const c1 = div(b, 'f hide dn', `<div class="gpanel mono" style="font-size:22px;line-height:1.6;color:${C.cr};padding:12px 20px">PMID · GSE · DOI → <span style="color:${C.gr}">存在？</span><br>PubMed 出版类型 → <span style="color:${C.gr}">撤稿标记？</span></div>`, 420, -20, 560);
    const c2 = div(b, 'f hide dn', `<div style="display:flex;flex-direction:column;gap:10px"><span class="gchip warn" style="position:relative">网络不通 → <b>UNVERIFIED</b> ≠ PASS</span><span class="gchip dim" style="position:relative">PASS ≠ 原文支持结论</span></div>`, 10, -20);
    const gch = GK.chip(b, G[0], G[1] - 150, '复盘 + validate + 引用 PASS', 'ok sm');
    const ovl = div(b, 'f hide dn', `<div class="gchip au blk" style="position:relative;width:470px"><span><span class="mono">--override "理由"</span><br><span style="font-size:22px">作者明确同意 · 记入历史</span></span></div>`, 200, 470);
    const ai = div(b, 'f hide dn', `<div class="gchip bad" style="position:relative">${IC.robot(C.red).replace('width="64" height="64"', 'width="30" height="30"')} AI 不能自己跳过</div>`, 1250, 340);
    const an = ana(b, 1010, 450, 670, `交班：化验单没回来，<br>交班本写<b>「待回报」</b>，不写「正常」。`);
    return { set(k, keys) {
      const at = reach(keys, k);
      pads.forEach((p, i) => { p.set(at('cc3') ? 'ok' : (i === 2 && at('cc1')) ? (at('cc2') && !at('cc3') ? 'warn' : 'ai') : i < 2 && at('cc1') ? 'ai' : 'off'); p.g.style.opacity = at('cc1') ? 1 : .5; });
      pads[2].g.classList.toggle('gfocus', at('cc1') && !at('cc3'));
      sh(c1, at('cc1') && !at('cc2')); sh(c2, at('cc2'));
      pg.set(at('cc3') ? 'go' : 'off'); out.style.opacity = at('cc3') ? 1 : .15; pn.set(at('cc3') ? 'go' : 'off'); pn.g.style.opacity = at('cc3') ? 1 : .45;
      tg(gch, 'hide', !at('cc3'));
      ov.style.opacity = at('cc4') ? 1 : 0; sh(ovl, at('cc4')); sh(ai, at('cc4'));
      sh(an, at('cc5'));
    } };
  }
};

/* ③ hypothesis table in the world model */
V.hypo = {
  title: '③ 假设表：<em>支持↑ · 削弱↓ · 待定 · 放弃</em>',
  build(root, api) {
    init(api);
    const b = box(root);
    const H = [['H1', 'A 上调 B 的表达', 'wk', 'E3', 'E7, E9', '内源蛋白验证'], ['H2', 'B 驱动迁移表型', 'td', 'E5', '—', '原代复证'], ['H3', 'A 经旁路影响表型', 'dr', '—', 'E12', '—'], ['H4', '效应只见于特定亚型', 'sp', 'E4, E8', '—', '亚型分层']];
    const ST = { sp: ['支持 ↑', C.gr], wk: ['削弱 ↓', C.gold], td: ['待定', C.te2], dr: ['放弃', C.red] };
    const hd = ['ID', '假设（示意）', '状态', '支持证据', '反对证据', '下一步检验'];
    const tbl = card(b, 0, 0, 1120, `<div class="kp-row"><span class="mono" style="font-size:22px;color:${C.dim}">world-model.md · ## 假设表</span><span class="tag t-ill" style="margin-left:auto">示意</span></div>
      <div class="v2tbl" style="grid-template-columns:60px 1fr 120px 130px 130px 190px;margin-top:8px">${hd.map((h, i) => `<span class="h c${i}">${h}</span>`).join('')}
      ${H.map(([id, t, s, sp, op, nx], i) => `<span class="mono" style="color:${C.or2}">${id}</span><span class="ht${i}"><span class="strike">${t}</span></span><span class="hs${i}"><span class="tag t-ill">—</span></span><span class="e c3 mono" style="color:${C.gr}">${sp}</span><span class="e c4 mono" style="color:${C.red}">${op}</span><span class="e c5">${nx}</span>`).join('')}</div>`);
    const dd = card(b, 1160, 0, 520, `<div class="kp-k" style="color:${C.or2}">外科类比 · 鉴别诊断</div>
      <div style="margin-top:12px;font-size:24px;line-height:1.75;color:${C.cr}">右下腹痛<br><span style="color:${C.gr}">↑ 急性阑尾炎</span><br><span style="color:${C.red}"><s>✗ 输尿管结石</s></span><br><span style="font-size:22px;color:${C.dim}">（尿常规、CT 已排除）</span><br><span style="color:${C.gold}">↓ 附件病变</span></div>
      <div class="kp-s">排除了什么、凭什么排除——下一位医生一看就懂</div>`);
    return { set(k, keys) {
      const at = reach(keys, k);
      sh(tbl, true);
      H.forEach(([, , s], i) => { tbl.querySelector('.hs' + i).innerHTML = at('h1') ? `<span class="tag" style="color:${ST[s][1]}">${ST[s][0]}</span>` : `<span class="tag t-ill">—</span>`; });
      const t3 = tbl.querySelector('.ht2'); t3.querySelector('.strike').classList.toggle('on', at('h1')); t3.style.opacity = at('h1') ? .75 : 1;
      tbl.querySelectorAll('.e,.h.c3,.h.c4,.h.c5').forEach(e => e.style.opacity = at('h2') ? 1 : .12);
      sh(dd, at('h3'));
    } };
  }
};

/* ④ staged design + wet-decision record */
V.stages = {
  title: '④ 分阶段设计：<em>分期手术方案</em>',
  sub: '体外快筛 → 原代复证 → 体内验证 · 每一步先写决策记录',
  build(root, api) {
    init(api);
    const b = box(root);
    const SG = [['体外快筛', '细胞系 · 快 · 便宜', 1], ['原代复证', '原代细胞 · 更贴近人', 2], ['体内验证', '动物模型 · 最贵最慢', 3]];
    const W = 430, G = 195;
    const st = SG.map(([t, s, c], i) => card(b, i * (W + G), 0, W, `<div class="kp-k">阶段 ${i + 1}</div><div class="kp-t" style="margin-top:4px">${t}</div><div class="kp-s">${s}</div><div style="margin-top:10px;font-size:23px;color:${C.dim}">相对成本 <span style="color:${C.or2};letter-spacing:4px">${'▮'.repeat(c * 2)}</span></div>`));
    const gates = [0, 1].map(i => div(b, 'f', `<div style="width:150px;text-align:center"><div style="width:62px;height:62px;margin:0 auto;transform:rotate(45deg);border:3px solid ${C.gold};border-radius:10px;background:rgba(242,177,52,.12)"></div><div style="font-size:22px;color:${C.gold};margin-top:16px">决策记录</div></div>`, W + i * (W + G) + 22, 50));
    const t3c = div(b, 'gchip warn sm f hide', '只在问题和证据需要时', 2 * (W + G) + 40, 214);
    const rec = card(b, 0, 290, 900, `<div class="kp-row" style="gap:14px">${IC.doc(C.cr, 38)}<span class="mono" style="font-size:24px;color:${C.cr}">design/wet-decision-v0.1.md</span></div>
      <div style="display:flex;gap:14px;margin-top:14px">${[['继续', C.gr], ['停止', C.red], ['不可判', C.gold]].map(([t, c]) => `<div style="flex:1;padding:12px;border:2px solid ${c};border-radius:12px;text-align:center;color:${c};font-size:26px;font-weight:800">${t}</div>`).join('')}</div>
      <div class="kp-s">实验前填写、保留历史；每个设计选择写依据（PMID 或分析输出）· 空表不代表批准</div>`);
    const an = ana(b, 960, 330, 720, `创伤外科的<b>损伤控制</b>：先做最小、最快、最能说明问题的那一步。`);
    return { set(k, keys) {
      const at = reach(keys, k);
      st.forEach((e, i) => { sh(e, true); e.style.opacity = at('t1') ? (at('t3') && i === 2 ? .55 : 1) : .35; });
      gates.forEach(g => g.style.opacity = at('t2') ? 1 : .3);
      sh(rec, at('t2')); tg(t3c, 'hide', !at('t3')); sh(an, at('t4'));
    } };
  }
};

/* ⑤ bench SOP — defaults with sources; facility-dependent values → facility checklist */
V.sop = {
  title: '⑤ 台架 SOP + <em>设施核对清单</em>',
  sub: '能定的给默认值并注明出处 · 依赖平台的标【待核实：设施】',
  build(root, api) {
    init(api);
    const b = box(root);
    const R = [['细胞培养条件', '37 °C · 5% CO₂', '惯例', 0], ['RNA 保存', '−80 °C', '惯例', 0], ['酶标仪型号 · 滤光片', '<span class="fac">【待核实：设施】</span>', '检测平台', 1], ['流式可用通道', '<span class="fac">【待核实：设施】</span>', '细胞平台', 1], ['动物饲养条件', '<span class="fac">【待核实：设施】</span>', '动物平台', 1]];
    const tb = card(b, 0, 0, 900, `<div class="kp-row"><span class="mono" style="font-size:22px;color:${C.dim}">sop/ · 参数 · 取值 · 来源</span><span class="tag t-ill" style="margin-left:auto">示意</span></div>
      <div class="v2tbl" style="grid-template-columns:270px 1fr 170px;margin-top:4px;font-size:22px"><span class="h">参数</span><span class="h">取值</span><span class="h">来源</span>
      ${R.map(([p, v, src, f], i) => `<span class="r${i}">${p}</span><span class="r${i}">${v}</span><span class="r${i}" style="color:${f ? C.gold : C.te2};font-size:22px">${f ? '待核实' : src}</span>`).join('')}</div>`);
    const PL = [['检测平台', '酶标仪型号 · 滤光片'], ['细胞平台', '流式可用通道'], ['动物平台', '动物饲养条件']];
    const ck = card(b, 960, 0, 720, `<div class="kp-row" style="gap:12px">${IC.doc(C.gold, 34)}<span class="mono" style="font-size:23px;color:${C.cr}">sop/facility-checklist-v0.1.md</span></div>
      <div style="margin-top:10px;display:flex;flex-direction:column;gap:10px">${PL.map(([p, x], i) => `<div class="pl${i}" style="font-size:23px;color:${C.cr};transition:opacity .5s"><span style="color:${C.gold};font-weight:700">${p}</span><div style="margin-top:4px"><span class="chk"></span>${x}</div></div>`).join('')}</div>
      <div class="kp-s">按平台分组 · 作者拿着清单一次问清</div>`);
    const rep = div(b, 'f hide dn', `<div class="gchip warn blk" style="position:relative;width:880px">独立重复单位：独立动物 / 独立批次；<b>同批多次上机 = 技术重复</b></div>`, 0, 396);
    const ho = div(b, 'f hide dn', `<div class="gpanel" style="display:flex;align-items:center;gap:20px;border-color:rgba(73,217,138,.6)"><span class="mono" style="font-size:24px;color:${C.gr}">design/wet-lab-candidates-v0.1.md</span><span style="font-size:26px;color:${C.cr}">湿实验交接：候选靶点 · 证据等级 · 验证实验 · 优先级</span></div>`, 0, 420, 1680);
    const an = ana(b, 0, 478, 1680, `术前核查表：<b>器械、血源、影像，进手术室之前逐项打勾</b>——不是开到一半才发现缺东西。`);
    let tick = null;
    return { set(k, keys) {
      const at = reach(keys, k);
      sh(tb, true);
      R.forEach((r, i) => tb.querySelectorAll('.r' + i).forEach(e => e.style.opacity = (r[3] ? at('o2') : at('o1')) ? 1 : .15));
      sh(ck, true); PL.forEach((p, i) => ck.querySelector('.pl' + i).style.opacity = at('o3') ? 1 : .15);
      tg(ck, 'glow-or', at('o3') && !at('o4'));
      sh(rep, at('o4') && !at('o6')); sh(an, at('o5') && !at('o6')); sh(ho, at('o6'));
      const cks = [...ck.querySelectorAll('.chk')];
      if (at('o5') && !tick) { tick = 1; cks.forEach((c, i) => api.later(() => { c.classList.add('on'); c.textContent = '✓'; }, 500 + i * 600)); }
      if (!at('o5')) { tick = null; cks.forEach(c => { c.classList.remove('on'); c.textContent = ''; }); }
    } };
  }
};

/* ⑥ wet lab → wet slot (PENDING) → wetlab/raw → lock-wet → results; whole pipeline visible from line 1 */
V.wet = {
  title: '⑥ 湿实验：<em>作者执行</em> · 稿件里先留槽位，数据先锁定',
  build(root, api) {
    init(api);
    GK.atmo(root, [[500, 560, 480, 'rgba(242,177,52,.4)', .22], [1300, 520, 460, 'rgba(46,196,182,.45)', .24]]);
    const b = box(root);
    const s = svgIn(b, 1680, 580, 0, 0); GK.defs(s);
    const P = [[120, 175], [460, 120], [800, 175], [1140, 120], [1500, 175]];
    const N = [['作者亲手做', 'AI 不碰仪器'], ['湿实验槽位', 'PENDING WET-LAB DATA'], ['wetlab/raw/', '仪器导出的原始文件'], ['lock-wet', 'SHA-256 记录'], ['写该槽位结果', '锁定之后才允许']];
    const GL = ['🧑‍🔬', '▢', '📄', '🔒', '✎'];
    const path = GK.path(s, GK.curve(P), [C.gold, C.te2, C.gr], { x1: 120, x2: 1500 });
    const pads = P.map(([x, y], i) => GK.pad(s, x, y, 'off', GL[i], .74));
    const nm = P.map(([x, y], i) => GK.label(b, x, y + 44, `<b>${N[i][0]}</b><br><span class="dm" style="font-size:21px">${N[i][1]}</span>`, 300));
    const chA = GK.chip(b, P[0][0] + 60, P[0][1] - 150, 'AI 不控制仪器', 'warn sm');
    const chH = GK.chip(b, P[3][0], P[3][1] - 140, 'sha256 fa6780b5…', 'ok sm');
    const chX = GK.chip(b, P[2][0], P[2][1] - 150, '✗ 锁定后被改动 → check FAIL', 'bad sm');
    const slot = card(b, 0, 296, 860, `<div class="mono" style="font-size:21px;line-height:1.5;color:${C.cr}"><span style="color:${C.dim}">&lt;!-- SLOT:fig4 BEGIN --&gt;</span><br>### Figure 4. Wet-lab validation 1 — <span style="color:${C.gold}">PENDING WET-LAB DATA</span><br>- Design: design/…<br>- Pre-specified decision rule: …<br><span style="color:${C.dim}">&lt;!-- SLOT:fig4 END --&gt;</span></div>
      <div class="nono f hide" style="display:flex;gap:10px;margin-top:10px"><span class="gchip bad sm" style="position:relative">✗ 预期结果</span><span class="gchip bad sm" style="position:relative">✗ P 值</span><span class="gchip bad sm" style="position:relative">✗ 示意图</span></div>`);
    const a1 = ana(b, 920, 300, 760, `<b>术中冰冻</b>：病理没回报前，手术记录只写「已送检」`);
    const a2 = ana(b, 920, 420, 760, `<b>手术记录封存</b>：写完不再回头补改`);
    return { set(k, keys) {
      const at = reach(keys, k);
      const lv = at('w3b') ? 5 : at('w2') ? 2 : at('w1') ? 1 : 0;
      pads.forEach((p, i) => { p.set(i < lv ? (i === 1 && lv < 5 ? 'warn' : i === 0 ? 'au' : 'ok') : 'off'); p.g.style.opacity = i < lv ? 1 : .5; });
      if (at('w4')) { pads[2].set('bad'); pads[4].set('warn'); }
      pads.forEach((p, i) => p.g.classList.toggle('gfocus', i === lv - 1 && !at('w4')));
      path.style.opacity = lv ? .9 : .4;
      tg(chA, 'hide', !at('w1')); tg(chH, 'hide', !at('w3b')); tg(chX, 'hide', !at('w4'));
      sh(slot, at('w2')); tg(slot.querySelector('.nono'), 'hide', !at('w2b')); tg(slot, 'glow-or', at('w2b') && !at('w3'));
      sh(a1, at('w3')); sh(a2, at('w5'));
    } };
  }
};

/* ⑥b record-wet-outcome — QC × direction card sort */
V.outcomes = {
  title: '结果怎么记：<em>质控 × 方向</em>',
  sub: 'record-wet-outcome --qc pass|fail|unknown --outcome supports|does_not_support|inconclusive',
  build(root, api) {
    init(api);
    const b = box(root);
    const bins = div(b, 'f', `<div class="gbins">${[['supports', '支持', 'ok'], ['does_not_support', '不支持', 'ai'], ['inconclusive', '不可判', 'au']].map(([m, t, c]) => `<div class="gbin ${c === 'ok' ? 'ai' : c}" style="height:340px;${c === 'ok' ? 'border-color:rgba(73,217,138,.6)' : ''}"><div class="bh"><span>${t}</span><span class="bs mono">${m}</span></div></div>`).join('')}</div>`, 0, 86, 1680);
    const bw = (1680 - 80) / 3;
    const CARDS = [['u1', 'QC ✓ · 支持', 0, 'ok'], ['u2', 'QC ✓ · 不支持', 1, 'ai'], ['u3', 'QC ✗ · 失败', 2, 'au'], ['u3', 'QC ? · 未知', 2, 'au']];
    const cs = CARDS.map(([key, t, bin, c], i) => { const e = div(b, 'gcard f hide', `<span>${t}</span><span class="gt ${c === 'au' ? 'au' : 'ai'}">${['supports', 'does_not_support', 'inconclusive'][bin]}</span>`, 0, 0, 470); e.style.height = '58px'; e.dataset.k = key; e.dataset.bin = bin; e.dataset.i = i; return e; });
    const pool = [[0, -14], [560, -14], [1120, -14], [1120, -14]];
    const slots = [[(0) * (bw + 40) + 26, 170], [1 * (bw + 40) + 26, 170], [2 * (bw + 40) + 26, 170], [2 * (bw + 40) + 26, 244]];
    const no = div(b, 'f hide', `<div class="gchip bad" style="position:relative"><span class="strike on">写成「阴性结果」</span> ✗</div>`, 2 * (bw + 40) + 40, 330);
    const ban = div(b, 'f hide', `<div class="gpanel" style="text-align:center;font-size:30px;font-weight:800;color:${C.cr}">质控合格的「不支持」 <span style="color:${C.or2}">≠</span> 质控失败的「不可判」 —— 少很多「做不出来」的糊涂账</div>`, 0, 456, 1680);
    return { set(k, keys, instant) {
      const at = reach(keys, k);
      cs.forEach((e, i) => {
        const on = at(e.dataset.k);
        tg(e, 'hide', !at('u1'));
        const [x, y] = on ? slots[i] : pool[i];
        if (on && !instant) api.later(() => { e.style.left = x + 'px'; e.style.top = y + 'px'; }, 120 + i * 120); else { e.style.left = x + 'px'; e.style.top = y + 'px'; }
        tg(e, 'signed', on);
      });
      tg(cs[1], 'hot', at('u2') && !at('u3'));
      tg(no, 'hide', !at('u3')); tg(ban, 'hide', !at('u4'));
    } };
  }
};

/* ⑦ dry-lab manuscript: slots, claims.csv, check, stages, evidence pack */
V.ms = {
  title: '⑦ 干实验文章 → <em>稿件检查 → 证据包</em>',
  build(root, api) {
    init(api);
    GK.atmo(root, [], BG.arc, .26);
    const b = box(root);
    const SL = [['fig1', 'dry', '数据概览与质控'], ['fig2', 'dry', '主要干实验发现'], ['fig3', 'dry', '候选靶点与优先级'], ['fig4', 'wet', 'PENDING WET-LAB DATA'], ['fig5', 'wet', 'PENDING WET-LAB DATA']];
    const doc = card(b, 0, -20, 740, `<div class="kp-row" style="gap:12px">${IC.doc(C.cr, 34)}<span class="mono" style="font-size:23px;color:${C.cr}">manuscript/manuscript-v0.1.md</span><span class="tag t-ana" style="margin-left:auto">English IMRaD</span></div>
      ${SL.map(([id, kd, t], i) => `<div class="slot ${kd} s${i}" style="padding:7px 14px;margin-top:8px"><span class="mono" style="color:${kd === 'dry' ? C.te2 : C.gold}">${id} · ${kd}</span> <span style="color:${C.cr}">${t}</span>${kd === 'dry' ? `<div class="src f hide mono" style="font-size:20px;color:${C.dim};margin-top:2px">figure ✓ · sources: analysis/…py · …csv</div>` : ''}</div>`).join('')}`);
    const cl = card(b, 790, -20, 890, `<div class="mono" style="font-size:22px;color:${C.dim}">manuscript/claims.csv</div>
      <div class="v2tbl mono" style="grid-template-columns:repeat(7,auto);font-size:21px;margin-top:4px">${['id', 'section', 'claim', 'grade', 'evidence', 'slot', 'status'].map(h => `<span class="h">${h}</span>`).join('')}<span>C1</span><span>results</span><span>…</span><span style="color:${C.te2}">关联</span><span>analysis/…</span><span>fig2</span><span style="color:${C.gold}">unverified</span></div>`);
    const ck = term(b, 790, 150, 890, 168, 'manuscript-v1.3.0.py check');
    const ckl = [`<span class="er">FAIL  fig4 湿实验尚无锁定数据，却出现结果性表述</span>`, `<span class="wa">WARN  正文词汇扫描：强词提示，须人工复核</span>`].map(h => tline(ck.body, h));
    const stg = div(b, 'f hide dn', `<div style="display:flex;align-items:center;gap:12px;font:700 22px var(--mono)">${['dry_only', 'dry_plus_wet', 'submission_candidate'].map((t, i) => `<span class="gchip ${i ? 'dim' : 'ok'} sm" style="position:relative">${t}</span>${i < 2 ? `<span style="color:${C.gold}">→</span>` : ''}`).join('')}</div><div class="glabel" style="position:relative;text-align:left;margin-top:8px;font-size:22px">逐级门槛 · <span class="mono" style="color:${C.gold}">set-stage --by "作者"</span> 作者同意才切换</div>`, 790, 340, 890);
    const pk = div(b, 'f hide dn', `<div class="gpanel" style="display:flex;align-items:center;gap:16px;padding:12px 20px"><span style="font-size:42px">📦</span><div><div class="mono" style="font-size:22px;color:${C.cr}">handoff/evidence-pack-&lt;stage&gt;-&lt;时间&gt;/</div><div class="mono" style="font-size:20px;color:${C.dim}">pack-manifest · source-manifest · claim-ledger · slots (.json)</div></div></div><div class="mono" style="margin-top:6px;font-size:22px;color:${C.te2}">export-pack → <span style="color:${C.gr}">verify-pack ✓ 逐文件核对</span></div>`, 790, 430, 890);
    const an = ana(b, 0, 486, 740, `病理报告：<b>不确定，就写不确定。</b>`);
    return { set(k, keys) {
      const at = reach(keys, k);
      sh(doc, true); doc.style.opacity = at('k1') ? 1 : .4;
      [0, 1, 2].forEach(i => { tg(doc.querySelector('.s' + i), 'on', at('k2') && !at('k4')); tg(doc.querySelector('.s' + i + ' .src'), 'hide', !at('k2')); });
      tg(doc.querySelector('.s3'), 'bad', at('k4') && !at('k5'));
      sh(cl, at('k3')); tg(ck.el, 'hide', !at('k4')); tset(ckl, at('k4'), api, 300);
      sh(stg, at('k5')); sh(pk, at('k6')); sh(an, at('k7'));
    } };
  }
};

/* 11 · BOTTOM RULE — card sort, updated to v1.3.0 actions */
V.spend = {
  title: '底线：<em>G-spend / G-external</em> 逐项授权',
  build(root, api) {
    init(api);
    GK.atmo(root, [[1300, 760, 520, 'rgba(242,177,52,.4)', .22], [420, 760, 520, 'rgba(46,196,182,.4)', .2]], BG.or, .42);
    const b = box(root);
    const AIc = ['文献检索', '公开数据下载', '本地分析', '证据日志', '引用核验', '稿件检查'];
    const HUc = [['课题批准', 'G1'], ['花钱 · Edison', 'G-spend'], ['对外动作', 'G-external'], ['原始数据锁定', 'lock-wet'], ['稿件阶段切换', 'set-stage']];
    div(b, 'f gbins', `<div class="gbin ai"><div class="bh"><span class="m">AI</span> 来做<span class="bs">跑腿 · 每一步留痕</span></div></div><div class="gbin au"><div class="bh"><span class="m">人</span>来签<span class="bs">逐项授权</span></div></div>`, 0, 214, 1680, 350);
    const pool = [];
    const W = 380, H = 58;
    AIc.forEach((t, i) => pool.push({ t, tag: '留痕', side: 'ai', i }));
    HUc.forEach(([t, g], i) => pool.push({ t, tag: g, side: 'au', i }));
    const order = [0, 6, 1, 7, 2, 8, 3, 9, 4, 10, 5];
    const chips = pool.map((o, j) => {
      const c = div(b, 'gcard f hide', `<span>${o.t}</span><span class="gt ${o.side}">${o.tag}</span>`, 0, 0, W);
      c.style.height = H + 'px';
      const pi = order.indexOf(j); o.px = (pi % 4) * (W + 53); o.py = ((pi / 4) | 0) * 68;
      const col = o.i % 2, row = (o.i / 2) | 0;
      o.bx = (o.side === 'ai' ? 22 : 882) + col * (W + 16); o.by = 214 + 76 + row * 70;
      o.el = c; return o;
    });
    const cf = div(b, 'f hide', `<div class="term" style="position:relative;width:1680px"><div class="body" style="padding:10px 20px"><div class="ln"><span class="p">$</span> edison-ask-v1.3.0.py ~/Projects/demo-loop literature "…"</div><div class="ln">本月已用 0/50 积分；本次预计 1。</div><div class="ln"><span class="wa">未加 --confirm，未调用。请先向作者说明问题与积分，获同意后再加 --confirm。</span></div></div></div>`, 0, 0, 1680);
    const rl = REAL(b, 1320, 8); rl.classList.add('f', 'hide');
    const log = div(b, 'f hide', `<div class="mono" style="font-size:21px;line-height:1.55;color:${C.cr}">project-state.json · 批准历史<br>runs/edison-ledger.csv · 账本</div>`, 1278, 214 + 76 + 2 * 70 + 4, 390);
    const big = div(b, 'f hide', `<div class="gpanel" style="display:flex;align-items:center;gap:22px">${IC.scalpel(C.or2)}<div><div class="kp-t" style="font-size:32px">主刀签字</div><div class="kp-s" style="color:${C.cr};margin-top:2px">助手可以把一切准备好，下刀那一下，写的是主刀的名字。</div></div></div>`, 0, 30, 1680);
    const place = (o, inBin) => { o.el.style.left = (inBin ? o.bx : o.px) + 'px'; o.el.style.top = (inBin ? o.by : o.py) + 'px'; };
    return { set(k, keys, instant) {
      const at = reach(keys, k);
      chips.forEach(o => {
        tg(o.el, 'hide', !at('x1'));
        const go = o.side === 'ai' ? at('x2') : at('x3');
        if (go) api.later(() => place(o, true), instant ? 0 : o.i * 160); else place(o, false);
        const hot = o.side === 'au' && (o.tag === 'G-spend' || o.tag === 'G-external');
        tg(o.el, 'hot', hot && at('x2') && !at('x3'));
        tg(o.el, 'signed', o.side === 'au' && at('x3'));
      });
      const c3 = at('x3c') && !at('x4');
      tg(cf, 'hide', !c3); tg(rl, 'hide', !c3);
      tg(log, 'hide', !at('x3b')); tg(big, 'hide', !at('x4'));
    } };
  }
};

/* 12 · HOW TO · install on a Mac */
V.install = {
  title: '安装：<em>Mac + Codex</em>',
  build(root, api) {
    init(api);
    GK.atmo(root, [[400, 600, 460, 'rgba(46,196,182,.4)', .22], [1300, 600, 460, 'rgba(232,100,27,.35)', .18]]);
    const b = box(root);
    const req = div(b, 'f', `<div style="display:flex;gap:14px"><span class="gchip ai" style="position:relative">macOS</span><span class="gchip ai" style="position:relative">Codex</span><span class="gchip ai" style="position:relative">Python 3.10–3.14</span><span class="gchip dim" style="position:relative">macOS 自带 3.9 不够</span><span class="gchip dim" style="position:relative">核心脚本只用标准库 · 不用 pip</span></div>`, 0, -20);
    const fd = card(b, 0, 60, 700, `<div class="kp-row" style="gap:8px"><i style="width:12px;height:12px;border-radius:50%;background:#ff5f57;display:inline-block"></i><i style="width:12px;height:12px;border-radius:50%;background:#febc2e;display:inline-block"></i><i style="width:12px;height:12px;border-radius:50%;background:#28c840;display:inline-block"></i><span class="mono" style="font-size:21px;color:${C.dim};margin-left:10px">kosmos-lite-research-loop-v1.3.0</span></div>
      <div style="display:flex;gap:30px;margin-top:18px;justify-content:center"><div class="fico f1"><div class="ic">⚙︎</div>Install.command<span style="font:500 20px var(--sans);color:${C.dim}">首次安装</span></div><div class="fico f2"><div class="ic">⇪</div>Upgrade.command<span style="font:500 20px var(--sans);color:${C.dim}">升级 · 旧版保留</span></div></div>`);
    const mf = card(b, 0, 340, 700, `<div class="kp-row" style="gap:12px">${IC.lock(C.te2, 30)}<span class="mono" style="font-size:22px;color:${C.cr}">MANIFEST-v1.3.0.sha256</span></div>
      <div class="mono" style="font-size:21px;color:${C.dim};margin-top:8px;line-height:1.55"><span class="c-gr">✓</span> SKILL.md <span class="c-gr">✓</span> scripts/… <span class="c-gr">✓</span> templates/…</div>
      <div style="font-size:22px;color:${C.cr};margin-top:6px">首次安装询问：使用者姓名 · NCBI 邮箱<br><span class="mono" style="color:${C.dim};font-size:20px">存在 ~/.config/kosmos-lite/ · 升级不丢</span></div>`);
    const t = term(b, 760, 60, 920, 470, 'doctor-v1.3.0.py --offline');
    const L1 = ['OK    Python 3.12（需要 >=3.10）', 'OK    安装完整性：与 MANIFEST 一致', 'OK    本机配置 · 使用者 · 可写', 'OK    uv：已安装 · git：已安装', '<span class="ok">PASS</span>'].map(h => tline(t.body, h));
    const L2 = [`<span class="dm">（改动一个已安装脚本后再运行）</span>`, `<span class="er">FAIL  安装文件与发布版不一致：</span>`, `<span class="er">      内容与发布版不一致：scripts/geo-search-v1.3.0.py</span>`, `<span class="er">FAIL</span>`].map(h => tline(t.body, h));
    const rl = REAL(b, 1320, 67); rl.classList.add('f', 'hide');
    return { set(k, keys) {
      const at = reach(keys, k);
      req.style.opacity = at('h1') ? 1 : .4;
      sh(fd, at('h2')); [...fd.querySelectorAll('.fico')].forEach(f => f.style.opacity = at('h2') ? 1 : .4);
      sh(mf, at('h3'));
      tg(t.el, 'hide', !at('h4')); tset(L1, at('h4'), api, 260); tset(L2, at('h4'), api, 260);
      if (at('h4')) L2.forEach((l, i) => { tg(l, 'hide', true); api.later(() => tg(l, 'hide', false), 1900 + i * 320); });
      tg(rl, 'hide', !at('h4'));
    } };
  }
};

/* 12b · HOW TO · first project, a typical Codex conversation (illustrative) */
V.first = {
  title: '第一个项目：<em>在 Codex 里怎么说</em>',
  build(root, api) {
    init(api);
    const b = box(root);
    const chat = card(b, 0, -20, 1100, `<div class="kp-row"><span class="mono" style="font-size:22px;color:${C.dim}">Codex · 对话</span><span class="tag t-ill" style="margin-left:auto">对话示意</span></div><div class="cv"></div>`);
    const cv = chat.querySelector('.cv');
    const B = [
      ['f2', 'u', `<code>$kosmos-lite-research-loop-v1-3-0</code> 新建课题，先用演示课题`],
      ['f2', 'a', `<code>init-project-v1.3.0.py … --example demo-dex-atrophy</code> → <span style="color:${C.gr}">已创建项目</span>`],
      ['f3', 'a', `最多问三个问题：① 模型 ② 读出 ③ 预算；其余给默认值，标「待确认」`],
      ['f4', 'u', `确认，可以开始。`],
      ['f4', 'a', `<code>approve-topic --by "作者"</code> → <span style="color:${C.gr}">课题已批准（G1），阶段进入 literature</span>`],
      ['f5', 'a', `本轮小结（3 句）· 待你确认的问题（≤3）· 下一步建议`],
    ];
    const bs = B.map(([key, who, h]) => { const e = E('div', 'bub ' + who + ' f hide', cv, h); e.dataset.k = key; return e; });
    const inv = card(b, 1150, -20, 530, `<div class="kp-k" style="color:${C.te2}">两种调用入口</div>
      <div class="mono" style="font-size:22px;color:${C.cr};margin-top:12px;line-height:1.5">Skill<br><span style="color:${C.te2}">$kosmos-lite-research-loop-v1-3-0</span></div>
      <div class="mono" style="font-size:22px;color:${C.cr};margin-top:14px;line-height:1.5">斜杠命令<br><span style="color:${C.te2}">/kosmos-lite-research-loop-v1-3-0</span><br><span style="color:${C.dim}">&lt;课题或项目目录&gt;</span></div>
      <div class="kp-s">安装后重启 Codex 生效</div>`);
    const g = div(b, 'f hide dn', `<div class="gchip bad sm blk" style="position:relative;width:500px">批准之前：检索与分析一律 BLOCKED</div>`, 1150, 380);
    return { set(k, keys) {
      const at = reach(keys, k);
      sh(chat, true); sh(inv, at('f1')); tg(inv, 'glow-te', at('f1') && !at('f2'));
      const on = bs.filter(e => at(e.dataset.k)), vis = on.slice(-4);
      bs.forEach(e => { e.style.display = vis.includes(e) ? '' : 'none'; tg(e, 'hide', !vis.includes(e)); });
      sh(g, at('f3') && !at('f4'));
    } };
  }
};

/* 12c · HOW TO · which files appear */
V.files = {
  title: '项目目录里会出现<em>哪些文件</em>',
  build(root, api) {
    init(api);
    const b = box(root);
    const T = [['q1', 'topic.json', '课题配置（G1 绑定它的 SHA-256）'], ['q1', 'project-state.json', '阶段 · 轮次 · 批准（唯一权威）'], ['q2', 'world-model.md', '世界模型 · 假设表'], ['q2', 'evidence/', 'evidence-log.md · citation-check.md'], ['q2', 'cycles/', 'cycle-1-v0.1.md · trace.jsonl'], ['q3', 'design/ · sop/', 'wet-decision · facility-checklist'], ['q3', 'manuscript/', 'manuscript-v0.1.md · claims.csv · plan'], ['q3', 'wetlab/raw/', '你的原始数据（lock-wet 只记哈希）'], ['q4', 'handoff/', 'evidence-pack-&lt;stage&gt;-&lt;时间&gt;/']];
    const tr = card(b, 0, -20, 1240, `<div class="mono" style="font-size:23px;color:${C.or2};margin-bottom:6px">~/Projects/demo-loop/</div><div class="tree">${T.map(([key, p, d], i) => `<div class="r" data-k="${key}"><span>${i === T.length - 1 ? '└─' : '├─'} ${p}</span><span class="d">${d}</span></div>`).join('')}</div>`);
    const rows = [...tr.querySelectorAll('.r')];
    const loc = div(b, 'f hide dn', `<div class="gchip ok blk" style="position:relative;width:400px;line-height:1.4">全部在你自己的电脑上<br><span style="font-size:22px;color:${C.dim}">只有检索请求发往公开数据库</span></div>`, 1280, 80);
    const gi = div(b, 'f hide dn', `<div class="gchip dim blk" style="position:relative;width:400px;line-height:1.4">data/ 与 .env 不入库<br><span style="font-size:22px">（项目 .gitignore）</span></div>`, 1280, 250);
    return { set(k, keys) {
      const at = reach(keys, k);
      sh(tr, true);
      let last = null; ['q1', 'q2', 'q3', 'q4'].forEach(q => { if (at(q)) last = q; });
      rows.forEach(r => { r.style.opacity = at(r.dataset.k) ? 1 : .18; tg(r, 'on', r.dataset.k === last); });
      sh(loc, at('q4')); sh(gi, at('q4'));
    } };
  }
};

/* 13 · DEMO A — topic.json edited after approval (real output) */
V.demog1 = {
  title: '现场 1 · 改了 topic.json，<em>批准立刻失效</em>',
  build(root, api) {
    init(api);
    const b = box(root);
    const t = term(b, 0, 0, 1120, 560, 'research-state-v1.3.0.py · ~/Projects/demo-loop');
    const L = {
      e1: [`<span class="p">$</span> research-state-v1.3.0.py status ~/Projects/demo-loop --action literature`, `  "topic_approved": true,`, `  "verdict": "<span class="ok">ALLOWED</span>",`],
      e2: [`<span class="dm">（编辑 topic.json：budget.edison_monthly_credits 0 → 50）</span>`, `<span class="p">$</span> research-state-v1.3.0.py status ~/Projects/demo-loop --action literature`],
      e3: [`  "topic_approved": false,`, `  "topic_note": "<span class="er hl">topic.json 已修改，原批准失效，需作者重新确认（G1）</span>",`, `  "approval_identity": "self-declared; not authenticated",`, `  "verdict": "<span class="er">BLOCKED</span>",`, `  "reason": "…恢复：与作者确认 topic.json 后运行 approve-topic。"`, `<span class="dm">[exit 3]</span>`],
    };
    const lines = {}; for (const key in L) lines[key] = L[key].map(h => tline(t.body, h));
    REAL(b, 760, 7, 'v1.3.0 真实输出 · 有删减');
    const s = svgIn(b, 540, 300, 1140, 0); GK.defs(s);
    const pd = GK.pad(s, 270, 190, 'off', 'G1', 1);
    const hv = div(b, 'f', '', 1160, 290, 520);
    const sm = div(b, 'f hide dn', `<div class="gchip bad blk" style="position:relative;width:500px">AI 不能自己补批准，<br>也不能拿旧的批准顶着</div>`, 1160, 440);
    const H0 = '6bd9d696…0e06d15', H1 = 'f6551e38…1f9a09e';
    return { set(k, keys) {
      const at = reach(keys, k);
      for (const key in lines) tset(lines[key], at(key), api, 220);
      const bad = at('e3');
      pd.set(bad ? 'bad' : at('e1') ? 'ok' : 'off'); pd.glyph(bad ? '✗' : 'G1');
      hv.innerHTML = `<div class="kp-k" style="color:${C.dim}">topic.json · SHA-256</div><div class="mono" style="font-size:24px;margin-top:6px;color:${C.gr}">批准时 ${H0}</div>` + (at('e2') ? `<div class="mono" style="font-size:24px;margin-top:4px;color:${C.red}">现在 ${H1}</div>` : '');
      sh(sm, at('e4'));
    } };
  }
};

/* 13b · DEMO B — result wording in a wet slot before lock-wet (real output) */
V.demowet = {
  title: '现场 2 · 还没锁定数据，<em>先写了结果</em>',
  build(root, api) {
    init(api);
    const b = box(root);
    const ed = card(b, 0, -20, 1680, `<div class="mono" style="font-size:22px;line-height:1.6;color:${C.cr}"><span style="color:${C.dim}">&lt;!-- SLOT:fig4 BEGIN --&gt;</span>  ### Figure 4. Wet-lab validation 1 — <span style="color:${C.gold}">PENDING WET-LAB DATA</span><br>- Status: PENDING WET-LAB DATA. No results are reported until raw data are locked.<br><span class="add" style="font-size:26px">- 处理组指标显著升高。</span><br><span style="color:${C.dim}">&lt;!-- SLOT:fig4 END --&gt;</span></div>`);
    const add = ed.querySelector('.add');
    const t = term(b, 0, 196, 1080, 340, 'manuscript-v1.3.0.py check ~/Projects/demo-loop');
    const L = [`SLOT  fig1     dry:planned`, `SLOT  fig4     wet:pending_data`, `<span class="er hl">FAIL  manuscript/manuscript-v0.1.md：fig4 湿实验尚无锁定数据，</span>`, `<span class="er hl">      却出现结果性表述：'- 处理组指标显著升高。'</span>`, `<span class="er">FAIL（stage=dry_only）</span>  <span class="dm">[exit 1] · 另有 21 条 WARN 已省略</span>`].map(h => tline(t.body, h));
    REAL(b, 720, 203, 'v1.3.0 真实输出 · 有删减');
    const lim = card(b, 1120, 196, 560, `<div class="kp-k" style="color:${C.gold}">它是有限规则</div><div style="font-size:24px;line-height:1.6;color:${C.cr};margin-top:8px">中英文结果性措辞、P 值、倍数变化、图片 → 拦下<br><span style="color:${C.dim}">换个说法可能漏过 · 全文仍需人工核对</span></div>`);
    return { set(k, keys) {
      const at = reach(keys, k);
      sh(ed, true); add.style.opacity = at('n1') ? 1 : 0; tg(add, 'wave', at('n1')); add.style.color = at('n2') ? C.red : C.cr;
      tg(t.el, 'hide', !at('n2')); tset(L, at('n2'), api, 260);
      sh(lim, at('n3'));
    } };
  }
};

/* 13c · DEMO C — next-cycle blocked: citation UNVERIFIED + locked raw data edited (real output) */
V.demonext = {
  title: '现场 3 · 想进下一轮，<em>收尾门拦下</em>',
  build(root, api) {
    init(api);
    GK.atmo(root, [[1400, 560, 420, 'rgba(255,93,93,.35)', .18]]);
    const b = box(root);
    const t = term(b, 0, 0, 1140, 560, '~/Projects/demo-loop');
    const L = {
      y2: [`<span class="p">$</span> verify-citations-v1.3.0.py ~/Projects/demo-loop --offline`, `引用 1 条：问题 0，未核验 1`, `<span class="wa">UNVERIFIED</span>  <span class="dm">[exit 2]</span>`],
      y3: [`<span class="dm">（fig4 已 lock-wet；之后编辑 wetlab/raw/demo-plate-v0.1.csv：0.80 → 0.60）</span>`],
      y4: [`<span class="p">$</span> research-state-v1.3.0.py next-cycle ~/Projects/demo-loop`, `<span class="er">BLOCKED：本轮不能收尾：</span>`, `<span class="er hl">  - manuscript check 未通过： fig4：原始数据在锁定后被改动</span>`, `<span class="er hl">  - 引用核验状态为 UNVERIFIED：问题 []，未核验 1 条</span>`],
      y5: [`<span class="hlok">恢复：补齐后重试；若作者明确同意跳过，用 --override "理由"（会记入历史）。</span>`, `<span class="dm">[exit 3]</span>`],
    };
    const lines = {}; for (const key in L) lines[key] = L[key].map(h => tline(t.body, h));
    REAL(b, 780, 7, 'v1.3.0 真实输出 · 有删减');
    const s = svgIn(b, 520, 560, 1160, 0); GK.defs(s);
    const P = [[110, 70, '复盘', '✓'], [380, 70, 'validate', '✓'], [110, 260, '引用核验', '?'], [380, 260, '稿件 check', '✗']];
    const pads = P.map(([x, y, , g]) => GK.pad(s, x, y + 30, 'off', g, .52));
    P.forEach(([x, y, l]) => GK.label(b, 1160 + x, y + 64, `<b>${l}</b>`, 220));
    const gp = GK.pad(s, 250, 440, 'off', '⛩', .72);
    const gl = div(b, 'f hide', `<div class="gchip bad" style="position:relative">next-cycle · BLOCKED</div>`, 1240, 512);
    return { set(k, keys) {
      const at = reach(keys, k);
      for (const key in lines) tset(lines[key], at(key), api, 220);
      pads[0].set(at('y1') ? 'ok' : 'off'); pads[1].set(at('y1') ? 'ok' : 'off');
      pads[2].set(at('y2') ? 'warn' : 'off'); pads[3].set(at('y3') ? 'bad' : 'off');
      gp.set(at('y4') ? 'bad' : at('y1') ? 'ai' : 'off'); tg(gl, 'hide', !at('y4'));
      gp.g.classList.toggle('gfocus', at('y4') && !at('y5'));
      if (at('y5')) gp.set('warn');
    } };
  }
};

/* 14 · HONEST LIMITS — as stated in the v1.3.0 README / SKILL */
V.limits = {
  title: '诚实的边界',
  sub: '以 v1.3.0 README 与 SKILL 的说法为准',
  build(root, api) {
    init(api);
    const b = box(root);
    const L = [['i2', '✗', C.red, '不控制仪器', '不接任何硬件，不替你做实验；湿实验永远是人来做。'], ['i3', '✗', C.red, '不证明结论正确', '也不证明检索已经穷尽；覆盖记录只汇总所选来源。'], ['i4', '!', C.gold, '哈希与署名 = 本地自述', '能发现事后改动；不认证作者身份，不证明湿数据真实。'], ['i5', '!', C.gold, '引用核验 ≠ 原文支持', '只查标识存在与 PubMed 撤稿标记；DOI/PMC 撤稿未核。'], ['i6', '!', C.gold, '验证还在早期', '本地 AI 验证 + AI 独立复核；远程多平台 CI 尚未运行。'], ['i6', '!', C.gold, '没有长期使用数据', '还没有真实课题组的长期使用记录。']];
    const cw = 820, ch = 128;
    const cs = L.map(([key, ic, col, t, s], i) => { const c = card(b, (i % 2) * (cw + 40), ((i / 2) | 0) * (ch + 18), cw, `<div class="kp-row" style="gap:18px;align-items:flex-start"><span style="font-size:40px;font-weight:800;color:${col};width:40px;text-align:center">${ic}</span><div><div class="kp-t" style="font-size:28px">${t}</div><div class="kp-s" style="margin-top:4px">${s}</div></div></div>`); c.dataset.k = key; c.style.minHeight = ch + 'px'; c.style.padding = '16px 24px'; return c; });
    const rec = div(b, 'f hide', `<div style="display:flex;align-items:center;justify-content:center;gap:20px;padding:16px;border-radius:16px;border:2px solid ${C.te};background:rgba(46,196,182,.10)"><span style="font-size:30px;color:${C.te2}">●</span><span class="kp-t">正在招募<em>第一批真实试点</em></span></div>`, 0, 450, 1680);
    return { set(k, keys) {
      const at = reach(keys, k);
      cs.forEach(c => { sh(c, true); c.style.opacity = at(c.dataset.k) ? 1 : .2; });
      tg(rec, 'hide', !at('i7')); tg(rec, 'pulse', at('i7'));
    } };
  }
};

})();
