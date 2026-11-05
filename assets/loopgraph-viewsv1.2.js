/* aiai · Loop 与 Graph v2.2 (views v1.2: fracture-surgery analogies) — bespoke animated views (original SVG/CSS/canvas work, aiai academy).
   Each view: { title, sub, build(root, api, keys) -> { set(k, keys, instant) } }.
   set(k) renders the state reached after line k of the beat (k = -1 means before the first line). */
(() => {
'use strict';
const V = window.LG_VIEWS = {};
let A, E, S;
const reach = (keys, k) => b => { const i = keys.indexOf(b); return i >= 0 && i <= k; };
const tg = (el, c, on) => el && el.classList.toggle(c, !!on);
const box = (root, cls) => { const b = A.el('div', 'sv ' + (cls || ''), root); return b; };
const pos = (el, x, y, w, h) => { el.style.left = x + 'px'; el.style.top = y + 'px'; if (w != null) el.style.width = w + 'px'; if (h != null) el.style.height = h + 'px'; return el; };
const div = (p, cls, html, x, y, w, h) => { const e = A.el('div', cls, p, html); e.style.position = 'absolute'; if (x != null) pos(e, x, y, w, h); return e; };
const svgIn = (p, w, h, x, y) => { const s = A.svg('svg', { viewBox: `0 0 ${w} ${h}`, width: w, height: h }, p); s.style.position = 'absolute'; s.style.left = (x || 0) + 'px'; s.style.top = (y || 0) + 'px'; s.style.overflow = 'visible'; return s; };
const init = api => { A = api; E = api.el; S = api.svg; };
const C = { or: '#e8641b', or2: '#ff8a3d', te: '#2ec4b6', te2: '#7ae7dc', cr: '#f4ead7', dim: '#9aa7b8', red: '#ff5d5d', gr: '#49d98a', gold: '#f2b134', navy: '#14213d', ln: 'rgba(244,234,215,.18)' };
V._h = { reach, tg, box, pos, div, svgIn, init, C };

/* 1 · COLD OPEN — an agent working for hours while a human approves every step */
V.coldopen = {
  title: '智能体连干几小时，<em>你还在盯每一步</em>',
  build(root, api) {
    init(api);
    const b = box(root);
    const term = div(b, 'panel f', '', 0, 0, 880, 560);
    term.innerHTML = `<div class="mono" style="display:flex;gap:10px;align-items:center;padding:16px 22px;border-bottom:1px solid var(--line);font-size:18px;color:var(--dim)">
      <i style="width:12px;height:12px;border-radius:50%;background:${C.gr};box-shadow:0 0 10px ${C.gr}"></i>agent-07 · running
      <span style="flex:1"></span>elapsed <b class="clk" style="color:${C.cr};font-weight:600">03:41:07</b></div>
      <div class="log mono" style="padding:16px 22px;font-size:20px;line-height:1.75;color:${C.dim};height:470px;overflow:hidden"></div>`;
    const log = term.querySelector('.log'), clk = term.querySelector('.clk');
    const steps = ['read  src/parser.zig', 'port  parser.zig → parser.rs', 'run   cargo check  · 3 errors', 'fix   lifetime on Token.span', 'run   cargo check  · ok', 'run   bun test parser  · 212 pass', 'read  src/http/server.zig', 'port  server.zig → server.rs', 'review  ×2 adversarial', 'commit  server.rs'];
    let si = 0, sec = 3 * 3600 + 41 * 60 + 7, approvals = 36;
    const human = div(b, 'f', '', 1020, 20, 660, 540);
    human.innerHTML = `<svg width="660" height="540" viewBox="0 0 660 540" style="overflow:visible">
      <circle cx="330" cy="150" r="70" fill="none" stroke="${C.cr}" stroke-width="3" opacity=".75"/>
      <path d="M190 420 q140 -170 280 0" fill="none" stroke="${C.cr}" stroke-width="3" opacity=".75"/>
      <g class="eye"><ellipse cx="305" cy="150" rx="14" ry="9" fill="${C.cr}"/><ellipse cx="355" cy="150" rx="14" ry="9" fill="${C.cr}"/></g>
      <text x="330" y="500" text-anchor="middle" fill="${C.dim}" font-size="24">你</text></svg>
      <div class="ask panel" style="left:360px;top:0;width:300px;padding:16px 18px;font-size:21px;transition:.35s;opacity:0;transform:translateY(8px)">
        <div class="mono" style="font-size:15px;color:${C.gold};letter-spacing:.1em">PERMISSION</div>
        <div style="margin:6px 0 12px">批准这一步？</div>
        <span class="tag" style="color:#1a0d03;background:${C.or};border-color:${C.or}">允许</span></div>
      <div class="cnt mono" style="position:absolute;left:120px;top:250px;width:420px;text-align:center;font-size:22px;color:${C.or2}">今天已点「允许」 <b>36</b> 次</div>`;
    const ask = human.querySelector('.ask'), cnt = human.querySelector('.cnt b');
    const ttl = div(b, 'f hide', `<div style="font-size:120px;font-weight:800;color:${C.cr};letter-spacing:.04em;text-shadow:0 0 50px rgba(232,100,27,.35)">只签<span style="color:${C.or2}">最后一步</span></div>
      <div class="mono" style="font-size:28px;color:${C.dim};margin-top:14px;letter-spacing:.12em">APPROVE ONLY THE LAST STEP</div>`, 0, 120, 1680);
    ttl.style.textAlign = 'center';
    const words = div(b, 'f hide', '', 0, 330, 1680, 220);
    words.innerHTML = `<div style="display:flex;justify-content:center;gap:120px;align-items:center">
      <div style="display:flex;align-items:center;gap:26px"><svg width="120" height="120" viewBox="0 0 120 120"><circle cx="60" cy="60" r="44" fill="none" stroke="${C.te}" stroke-width="6" stroke-dasharray="210 70" class="spin"/><path d="M98 48 l8 16 l-18 -2z" fill="${C.te}"/></svg>
        <div><div class="mono" style="font-size:54px;font-weight:700;color:${C.te2}">LOOP</div><div style="font-size:30px;color:${C.cr}">循环 · 把一块做对</div></div></div>
      <div style="display:flex;align-items:center;gap:26px"><svg width="140" height="120" viewBox="0 0 140 120"><g stroke="${C.or}" stroke-width="4"><line x1="20" y1="60" x2="70" y2="20"/><line x1="20" y1="60" x2="70" y2="100"/><line x1="70" y1="20" x2="120" y2="60"/><line x1="70" y1="100" x2="120" y2="60"/></g><g fill="${C.or2}"><circle cx="20" cy="60" r="11"/><circle cx="70" cy="20" r="11"/><circle cx="70" cy="100" r="11"/><circle cx="120" cy="60" r="11"/></g></svg>
        <div><div class="mono" style="font-size:54px;font-weight:700;color:${C.or2}">GRAPH</div><div style="font-size:30px;color:${C.cr}">图 · 决定有哪些块</div></div></div></div>`;
    let mode = 'in';
    api.every(() => { sec++; const h = (sec / 3600) | 0, m = ((sec % 3600) / 60) | 0, s = sec % 60; clk.textContent = [h, m, s].map(x => String(x).padStart(2, '0')).join(':'); }, 1000);
    api.every(() => {
      const ln = document.createElement('div'); ln.innerHTML = `<span style="color:${C.gr}">✓</span> ${steps[si++ % steps.length]}`; log.appendChild(ln);
      while (log.children.length > 12) log.removeChild(log.firstChild);
      if (mode === 'in') { ask.style.opacity = 1; ask.style.transform = 'none'; approvals++; cnt.textContent = approvals; setTimeout(() => { ask.style.opacity = 0; ask.style.transform = 'translateY(8px)'; }, 650); }
    }, 1100);
    return { set(k, keys) {
      const at = reach(keys, k);
      mode = at('title') ? 'title' : 'in';
      tg(term, 'hide', at('title')); tg(human, 'hide', at('title'));
      tg(ttl, 'hide', !at('title')); ttl.style.transform = at('words') ? 'translateY(-110px) scale(.8)' : 'none';
      tg(words, 'hide', !at('words'));
    } };
  }
};

/* 2 · BUN — the case, with two official sources side by side */
V.bun = {
  title: '一个真实案例：<em>Bun 从 Zig 移植到 Rust</em>',
  build(root, api) {
    init(api);
    const b = box(root);
    const srcc = div(b, 'panel f hide dn', `<div class="mono" style="font-size:15px;color:${C.gold};letter-spacing:.14em">SOURCE · 本课素材</div>
      <div style="font-size:26px;margin-top:10px;line-height:1.45;color:${C.cr}">Loops &amp; Graphs: how to stop being the slowest node…</div>
      <div style="font-size:21px;color:${C.dim};margin-top:10px">Hoodie <span class="mono">@HoodieFade_</span> · X · 2026-11-04</div>
      `, 0, 0, 560);
    srcc.style.padding = '24px 28px';
    const keysc = div(b, 'f hide dn', ['←', '→', '空格', 'P', 'S', 'T'].map((k, i) => `<span style="display:inline-flex;flex-direction:column;align-items:center;margin-right:14px"><b class="mono" style="min-width:58px;padding:10px 12px;border:1px solid var(--line);border-bottom-width:4px;border-radius:10px;font-size:20px;color:${C.cr};text-align:center">${k}</b><span style="font-size:16px;color:${C.dim};margin-top:6px">${['上一句', '下一句', '暂停', '自己讲', '字幕', '目录'][i]}</span></span>`).join(''), 0, 300, 600);
    // file grid zig -> rust
    const gridW = 1060, gx = 620;
    const lab = div(b, 'f hide', `<span class="mono" style="color:${C.gold}">.zig</span> <span style="color:${C.dim}">→</span> <span class="mono" style="color:${C.or2}">.rs</span> <span style="color:${C.dim};font-size:18px;margin-left:12px">1,448 个文件 · 每格一个（示意）</span>`, gx, 0, gridW);
    lab.style.fontSize = '24px';
    const cv = E('canvas', 'f hide', b); cv.width = gridW; cv.height = 150; pos(cv, gx, 40); cv.style.position = 'absolute';
    const g = cv.getContext('2d'); const cols = 72, rows = 20, cw = gridW / cols, ch = 150 / rows; let flipped = 0, target = 0;
    function draw() { g.clearRect(0, 0, gridW, 150); for (let i = 0; i < cols * rows; i++) { const x = (i % cols) * cw, y = ((i / cols) | 0) * ch; g.fillStyle = i < flipped ? C.or : 'rgba(242,177,52,.38)'; g.fillRect(x + 1, y + 1, cw - 2, ch - 2); } }
    draw();
    api.every(() => { if (flipped < target) { flipped = Math.min(target, flipped + 37); draw(); } }, 40);
    const card = (x, y, w, big, small, tag, tagc) => { const c = div(b, 'panel f hide dn', `<div style="font-size:50px;font-weight:800;color:${C.cr};letter-spacing:.01em">${big}</div><div style="font-size:21px;color:${C.dim};margin-top:6px;line-height:1.45">${small}</div><div style="margin-top:12px">${tag}</div>`, x, y, w); c.style.padding = '20px 24px'; return c; };
    const cA = card(gx, 220, 330, '≈75 万行', 'Rust · 11 天从首次提交到合并', '');
    const cP = card(gx + 360, 220, 330, '99.8%', '原有测试仍通过（Anthropic 口径）', '');
    const cB = card(gx + 720, 220, 340, '535,496 行', 'Zig（不含注释）· 5/3 → 5/14 合并 · 6,778 次提交', '');
    const cR = div(b, 'panel f hide dn', `<div style="display:flex;gap:40px;align-items:center;font-size:26px;color:${C.cr}">
      <span>合并前 <b style="color:${C.gr};font-size:38px">100%</b> 测试通过 · <b style="color:${C.gr}">0</b> 跳过</span>
      <span style="color:${C.dim}">|</span><span>合并后 <b style="color:${C.red};font-size:38px">19</b> 个回归 → 已全部修复</span></div>`, gx, 470, 1060);
    cR.style.padding = '18px 26px';
    return { set(k, keys) {
      const at = reach(keys, k);
      [[srcc, 'src'], [keysc, 'keys'], [lab, 'bun'], [cv, 'bun'], [cA, 'a'], [cP, 'pct'], [cB, 'b'], [cR, 'reg']].forEach(([e, bt]) => { tg(e, 'hide', !at(bt)); tg(e, 'dn', !at(bt)); });
      target = at('bun') ? cols * rows : 0; if (!at('bun')) { flipped = 0; draw(); }
      tg(cP, 'glow-or', at('pct') && !at('b'));
      tg(cR, 'glow-te', at('reg'));
    } };
  }
};

/* 3 · TRIO — a check that can say no + pieces that don't wait; course metaphor */
V.trio = {
  title: '可信的秘密：<em>能说「不」的检查</em> + 互不等待的小块',
  build(root, api) {
    init(api);
    const b = box(root);
    const s = svgIn(b, 1680, 250, 0, 0);
    S('line', { x1: 40, y1: 125, x2: 1640, y2: 125, stroke: C.ln, 'stroke-width': 2 }, s);
    const gate = S('g', { class: 'f', opacity: 0 }, s);
    S('rect', { x: 760, y: 50, width: 160, height: 150, rx: 18, fill: 'rgba(46,196,182,.12)', stroke: C.te, 'stroke-width': 3 }, gate);
    S('text', { x: 840, y: 118, 'text-anchor': 'middle', fill: C.te2, 'font-size': 28, class: 'm', 'font-weight': 700 }, gate).textContent = 'CHECK';
    S('text', { x: 840, y: 156, 'text-anchor': 'middle', fill: C.dim, 'font-size': 20 }, gate).textContent = '测试 · exit 0 ?';
    const lanes = S('g', { class: 'f', opacity: 0 }, s);
    [60, 125, 190].forEach(y => S('line', { x1: 940, y1: y, x2: 1640, y2: y, stroke: 'rgba(232,100,27,.35)', 'stroke-width': 2, 'stroke-dasharray': '8 10' }, lanes));
    const dots = S('g', {}, s);
    let lanesOn = false, gateOn = false;
    const units = [];
    api.every(() => {
      if (!gateOn) return;
      const bad = Math.random() < .3;
      const c = S('circle', { cx: 40, cy: 125, r: 14, fill: bad ? C.red : C.gold }, dots);
      units.push({ c, x: 40, bad, y: 125, lane: [60, 125, 190][(Math.random() * 3) | 0], st: 0 });
    }, 700);
    api.every(() => {
      for (let i = units.length - 1; i >= 0; i--) {
        const u = units[i];
        if (u.st === 0) { u.x += 9; if (u.x >= 740) { if (u.bad) { u.st = 2; u.c.setAttribute('fill', C.red); } else { u.st = 1; u.c.setAttribute('fill', C.gr); } } }
        else if (u.st === 1) { u.x += 9; if (lanesOn && u.x > 940) u.y += (u.lane - u.y) * .18; if (u.x > 1660) { u.c.remove(); units.splice(i, 1); continue; } }
        else { u.x -= 12; u.y = 125 + Math.sin(u.x / 30) * 6; if (u.x < 30) { u.c.remove(); units.splice(i, 1); continue; } }
        u.c.setAttribute('cx', u.x); u.c.setAttribute('cy', u.y);
      }
    }, 33);
    const no = div(b, 'stamp', '不 · NO', 700, -30); no.style.color = C.red;
    const cards = [
      ['loop', 'LOOP', '复位后透视：不达标就再调，直到片子过关', C.te2, `<path d="M60 12 A30 30 0 1 0 60 68" stroke="${C.te}" stroke-width="5" fill="none" stroke-linecap="round"/><rect x="51" y="4" width="18" height="13" rx="3" fill="${C.te}"/><rect x="49" y="64" width="22" height="9" rx="3" fill="${C.te}"/><path d="M60 18 V63" stroke="${C.te}" stroke-width="2" stroke-dasharray="3 4" opacity=".8"/><path d="M38 40 H78" stroke="#f4ead7" stroke-width="5" stroke-linecap="round"/><circle cx="37" cy="37" r="4" fill="#f4ead7"/><circle cx="37" cy="43" r="4" fill="#f4ead7"/><circle cx="79" cy="37" r="4" fill="#f4ead7"/><circle cx="79" cy="43" r="4" fill="#f4ead7"/><path d="M57 36 l4 4 l-4 4" stroke="#ff5d5d" stroke-width="2" fill="none"/>`],
      ['graph', 'GRAPH', '整台手术的流程与分工：哪些并行准备，哪一步等齐', C.or2, `<g stroke="${C.or2}" stroke-width="3" fill="none"><rect x="2" y="6" width="22" height="14" rx="4"/><rect x="2" y="33" width="22" height="14" rx="4"/><rect x="2" y="60" width="22" height="14" rx="4"/><path d="M24 13 Q44 13 52 36 M24 40 H52 M24 67 Q44 67 52 44"/><circle cx="64" cy="40" r="12"/><path d="M58 40 l4 4 l7 -8"/></g>`],
      ['gate', 'GATE', '不可逆的那一步（最终固定前）：主刀签字', C.gold, `<path d="M8 70 q10 -16 18 -4 t16 -6 t14 2 t16 -4" stroke="${C.cr}" stroke-width="3" fill="none"/><path d="M46 50 L70 8 L78 13 L54 55 L44 60z" fill="none" stroke="${C.gold}" stroke-width="3" stroke-linejoin="round"/><path d="M66 15 l8 5" stroke="${C.gold}" stroke-width="3"/>`],
    ].map(([bt, t, d, col, icon], i) => {
      const c = div(b, 'panel f hide dn', `<div style="display:flex;gap:20px;align-items:center"><svg width="80" height="80" viewBox="0 0 80 80" style="overflow:visible">${icon}</svg>
        <div><div class="mono" style="font-size:32px;font-weight:700;color:${col}">${t}</div><div style="font-size:23px;color:${C.cr};margin-top:4px;line-height:1.4">${d}</div></div></div>
        `, i * 570, 300, 540);
      c.style.padding = '22px 24px'; c.dataset.b = bt; return c;
    });
    return { set(k, keys) {
      const at = reach(keys, k);
      gateOn = at('why'); gate.setAttribute('opacity', gateOn ? 1 : 0);
      tg(no, 'on', at('why') && !at('two'));
      lanesOn = at('two'); lanes.setAttribute('opacity', lanesOn ? 1 : 0);
      cards.forEach(c => { tg(c, 'hide', !at(c.dataset.b)); tg(c, 'dn', !at(c.dataset.b)); });
    } };
  }
};

/* 4 · LAYERS — harness / loop / graph, and the manual work each missing layer hands back */
V.layers = {
  title: '三层：<em>少一层，就多一次你亲自上台</em>',
  build(root, api) {
    init(api);
    const b = box(root);
    const L = [
      ['g', 'GRAPH', '有哪些块 · 什么顺序 · 谁签字', C.or2, '没有它：你要批准每一步'],
      ['l', 'LOOP', '这一块做对了没有', C.te2, '没有它：你要读每一份输出'],
      ['h', 'HARNESS', '能碰什么：工具、文件、权限', C.gold, '没有它：你一直点「允许」'],
    ];
    const slabs = L.map(([bt, name, d, col, miss], i) => {
      const y = 40 + i * 150;
      const sl = div(b, 'f hide', `<div style="position:absolute;inset:0;border-radius:20px;background:linear-gradient(90deg,${col}22,rgba(14,22,38,.85) 60%);border:2px solid ${col};transform:skewX(-14deg)"></div>
        <div style="position:relative;display:flex;align-items:center;gap:28px;padding:0 44px;height:100%"><b class="mono" style="font-size:40px;color:${col};width:230px">${name}</b><span style="font-size:28px;color:${C.cr}">${d}</span></div>`, 120, y, 900, 118);
      sl.dataset.b = bt;
      const ms = div(b, 'chip f hide', `<span style="color:${C.red}">✕</span> ${miss}`, 1100, y + 32);
      return { sl, ms, col };
    });
    const quote = div(b, 'panel f hide dn', `<div style="font-size:27px;line-height:1.6;color:${C.cr}">「loop 让一块工作在没有你的情况下也能做对；graph 决定有哪些块、什么顺序、在哪里由人签字。」</div>`, 1060, 360, 620);
    quote.style.padding = '22px 26px';
    const most = div(b, 'stamp', '多数人：只做了 LOOP', 1080, 0); most.style.color = C.gold; most.style.fontSize = '34px';
    return { set(k, keys) {
      const at = reach(keys, k);
      slabs.forEach(s => tg(s.sl, 'hide', !at(s.sl.dataset.b)));
      const cost = at('cost') && !at('quote');
      slabs.forEach((s, i) => { tg(s.ms, 'hide', !(at('nolg') && !at('quote')) && !(cost && i === 2)); });
      slabs.forEach(s => s.sl.style.opacity = '');
      tg(quote, 'hide', !at('quote')); tg(quote, 'dn', !at('quote'));
      tg(most, 'on', at('most'));
      slabs[0].sl.style.filter = at('most') ? 'grayscale(1) opacity(.35)' : '';
      slabs[0].sl.style.borderStyle = '';
    } };
  }
};

/* 5 · LADDER — review theatre vs real check; evidence sorted STRONG → NOISE */
V.ladder = {
  title: '透视要能叫停：<em>程序能判失败</em>的才算检查',
  build(root, api) {
    init(api);
    const b = box(root);
    // left: review theatre
    const th = div(b, 'f', '', 0, 0, 560, 560);
    th.innerHTML = `
      <div class="ma panel f" style="left:0;top:10px;width:250px;padding:16px;font-size:20px"><div class="mono" style="color:${C.dim};font-size:15px">MODEL A · 写</div><div style="margin-top:6px;color:${C.cr}">diff +412 −380</div></div>
      <div class="mb panel f" style="left:290px;top:10px;width:260px;padding:16px;font-size:20px"><div class="mono" style="color:${C.dim};font-size:15px">MODEL B · 读</div><div style="margin-top:6px;color:${C.gr}">「看着不错 👍」</div></div>
      <div class="hw f" style="position:absolute;left:0;top:130px;width:550px;font-size:22px;color:${C.gold}">≈ 自己批改作业，再叫个朋友看看</div>
      <div class="rc panel f" style="left:0;top:200px;width:550px;padding:18px 22px;font-size:21px;line-height:1.7"><div class="mono" style="color:${C.dim};font-size:15px">PROGRAM CHECK</div>
        <div class="mono" style="color:${C.cr}">$ bun test parser</div><div class="mono" style="color:${C.red}">✗ 3 failed · exit 1</div></div>
      <div class="wh f" style="position:absolute;left:0;top:360px;width:550px;display:flex;gap:16px;align-items:center;font-size:24px;color:${C.cr}">
        <svg width="56" height="56" viewBox="0 0 80 80" style="overflow:visible"><path d="M60 12 A30 30 0 1 0 60 68" stroke="${C.te}" stroke-width="5" fill="none" stroke-linecap="round"/><rect x="51" y="4" width="18" height="13" rx="3" fill="${C.te}"/><rect x="49" y="64" width="22" height="9" rx="3" fill="${C.te}"/><path d="M60 18 V63" stroke="${C.te}" stroke-width="2" stroke-dasharray="3 4" opacity=".8"/><path d="M38 40 H78" stroke="#f4ead7" stroke-width="5" stroke-linecap="round"/><circle cx="37" cy="37" r="4" fill="#f4ead7"/><circle cx="37" cy="43" r="4" fill="#f4ead7"/><circle cx="79" cy="37" r="4" fill="#f4ead7"/><circle cx="79" cy="43" r="4" fill="#f4ead7"/><path d="M57 36 l4 4 l-4 4" stroke="#ff5d5d" stroke-width="2" fill="none"/></svg>透视不达标：这一步不能往下固定</div>
      <div class="bn f" style="position:absolute;left:0;top:440px;width:550px;font-size:21px;color:${C.dim};line-height:1.5">Bun 的测试集早在代理动手前就有了 → 没人需要读每一份改动</div>`;
    const q = s => th.querySelector(s);
    // right: ladder
    const lad = div(b, 'f hide', '', 600, 0, 1080, 560);
    const lanes = [['STRONG', C.gr, '强', '≈ 透视达标 · 内固定在计划内'], ['MEDIUM', C.te2, '中', '≈ 另一位医生独立阅片，结论相同'], ['WEAK', C.gold, '弱', '≈ 助手说「看着可以」'], ['NOISE', C.red, '噪音', '≈ 自我感觉良好 · 病人没喊疼']];
    lanes.forEach(([n, col, zh, an], i) => {
      div(lad, '', `<div class="mono" style="font-size:22px;font-weight:700;color:${col}">${n}</div><div style="font-size:18px;color:${C.dim}">${zh}</div><div class="ana f hide" style="font-size:16px;line-height:1.3;color:${col};margin-top:4px">${an}</div>`, i * 270, -18, 250).style.textAlign = 'center';
      const l = div(lad, '', '', i * 270, 92, 250, 470); l.style.borderRadius = '16px'; l.style.border = `1px dashed ${col}55`; l.style.background = `${col}0d`; l.className = 'lane f'; l.dataset.i = i;
    });
    const EV = [['测试 exit 0', 0], ['输出符合 schema', 0], ['diff 没超出计划', 0], ['引用的来源真支持结论', 1], ['独立路径得同一答案', 1], ['评审代理说通过', 2], ['「看着不错」', 3], ['模型说很有把握', 3], ['没有报错', 3]];
    const why = ['程序能判失败', '程序能判失败', '程序能判失败', '可核对，但要人或程序去对', '两条路互相印证', '只是多一个意见', '感觉不是证据', '自评不是证据', '沉默 ≠ 成功'];
    const cnt = [0, 0, 0, 0];
    const cards = EV.map(([t, lv], i) => {
      const c = div(lad, 'chip f', t, 0, 0); c.style.fontSize = '19px'; c.style.cursor = 'pointer'; c.style.width = '236px'; c.style.whiteSpace = 'normal'; c.style.textAlign = 'center'; c.style.padding = '10px 12px';
      c.dataset.lv = lv; c.dataset.slot = cnt[lv]++;
      c.onclick = () => { if (!tryOn) return; info.innerHTML = `<b style="color:${lanes[lv][1]}">${lanes[lv][0]}</b> · ${t} — ${why[i]}`; info.classList.remove('hide'); c.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.1)' }, { transform: 'scale(1)' }], { duration: 400 }); lad.querySelectorAll('.lane').forEach(l => l.style.boxShadow = +l.dataset.i === lv ? `0 0 30px ${lanes[lv][1]}66` : ''); };
      return c;
    });
    const info = div(b, 'chip f hide', '', 600, 590); info.style.fontSize = '20px';
    let tryOn = false;
    function place(c, sorted, i) {
      if (sorted) { const lv = +c.dataset.lv, s = +c.dataset.slot; pos(c, lv * 270 + 7, 110 + s * 92); }
      else pos(c, -560 + (i % 3) * 14, 40 + i * 52);
    }
    return { set(k, keys) {
      const at = reach(keys, k);
      const evOn = at('ev');
      tg(lad, 'hide', !evOn);
      lad.style.left = evOn ? '300px' : '600px'; info.style.left = evOn ? '300px' : '600px';
      th.style.opacity = evOn ? 0 : 1; th.style.transform = evOn ? 'scale(.92)' : ''; th.style.transformOrigin = '0 0';
      tg(q('.mb'), 'hide', !at('in')); tg(q('.ma'), 'hide', !at('in'));
      tg(q('.hw'), 'hide', !at('friend')); tg(q('.rc'), 'hide', !at('real')); tg(q('.wh'), 'hide', !at('whistle')); tg(q('.bn'), 'hide', !at('bun'));
      const lvOn = [at('strong'), at('medium'), at('weak'), at('weak')];
      cards.forEach((c, i) => { place(c, lvOn[+c.dataset.lv], i); c.style.zIndex = 10 + i; });
      tryOn = at('try'); cards.forEach(c => tg(c, 'glow-or', tryOn)); lad.querySelectorAll('.ana').forEach(a => tg(a, 'hide', !tryOn));
      if (!tryOn) info.classList.add('hide');
    } };
  }
};

/* 6 · SILENCE — a spotless log while the same bug loops and the budget drains */
V.silence = {
  title: '<em>没有报错</em> ≠ 没出错',
  build(root, api) {
    init(api);
    const b = box(root);
    const logp = div(b, 'panel f', `<div class="mono" style="padding:16px 22px;border-bottom:1px solid var(--line);color:${C.dim};font-size:18px">errors.log</div>
      <div class="mono" style="padding:60px 22px;text-align:center;font-size:26px;color:${C.gr}">✓ 0 errors<div style="font-size:18px;color:${C.dim};margin-top:12px">clean · clean · clean</div></div>`, 0, 20, 620, 300);
    const lie = div(b, 'f hide', `<div style="font-size:30px;color:${C.cr};line-height:1.5">空日志只说明<b style="color:${C.or2}">没人报告</b>，<br>不说明<b style="color:${C.red}">没出错</b>。</div><div style="font-size:22px;color:${C.gold};margin-top:10px">≈ 病人没喊疼 ≠ 复位到位</div>`, 0, 360, 620);
    const truth = div(b, 'panel f hide', `<div class="mono" style="padding:16px 22px;border-bottom:1px solid var(--line);color:${C.dim};font-size:18px;display:flex">what actually ran<span style="flex:1"></span><span class="it" style="color:${C.cr}">round 1</span></div>
      <div class="rows mono" style="padding:14px 22px;font-size:20px;line-height:1.7;height:250px;overflow:hidden"></div>
      <div style="padding:0 22px 18px"><div style="display:flex;justify-content:space-between;font-size:18px;color:${C.dim}"><span>预算</span><span class="bv mono">$ 200.00</span></div>
      <div style="height:12px;border-radius:6px;background:rgba(255,255,255,.08);margin-top:6px;overflow:hidden"><i class="bar" style="display:block;height:100%;width:100%;background:linear-gradient(90deg,${C.red},${C.or});transition:width .5s"></i></div></div>`, 700, 20, 980);
    const rows = truth.querySelector('.rows'), it = truth.querySelector('.it'), bar = truth.querySelector('.bar'), bv = truth.querySelector('.bv');
    let n = 0, budget = 200, run = false;
    api.every(() => {
      if (!run) return;
      n++; budget = Math.max(0, budget - 11.5);
      const r = document.createElement('div'); r.innerHTML = `<span style="color:${C.dim}">#${String(n).padStart(2, '0')}</span> 修 date 解析 → 静默吞掉异常 → <span style="color:${C.gr}">“通过”</span> <span style="color:${C.red}">同一个错 ×${n}</span>`;
      rows.appendChild(r); while (rows.children.length > 7) rows.removeChild(rows.firstChild);
      it.textContent = 'round ' + n; bar.style.width = (budget / 2) + '%'; bv.textContent = '$ ' + budget.toFixed(2);
      if (budget <= 0) { run = false; it.innerHTML = `<span style="color:${C.red}">budget gone</span>`; }
    }, 750);
    const rule = div(b, 'f hide', `<div style="display:flex;align-items:center;gap:30px;justify-content:center">
      <div class="panel" style="position:relative;padding:20px 34px;font-size:40px;font-weight:800;color:${C.te2};border-color:${C.te}">① 先写检查</div>
      <svg width="90" height="30"><path d="M0 15 H80 M66 3 L84 15 L66 27" stroke="${C.cr}" stroke-width="4" fill="none"/></svg>
      <div class="panel" style="position:relative;padding:20px 34px;font-size:40px;font-weight:800;color:${C.cr}">② 再写任务</div></div><div style="text-align:center;font-size:22px;color:${C.gold};margin-top:14px">≈ 术前先定复位标准和手术计划，再上台</div>`, 0, 405, 1680);
    return { set(k, keys) {
      const at = reach(keys, k);
      logp.style.boxShadow = at('silence') && !at('empty') ? `0 0 0 2px ${C.gr},0 0 40px rgba(73,217,138,.3)` : '';
      tg(lie, 'hide', !at('empty'));
      tg(truth, 'hide', !at('loop')); run = at('loop') && !at('rule') && budget > 0;
      tg(rule, 'hide', !at('rule'));
      if (at('rule')) { lie.classList.add('hide'); truth.style.opacity = .3; logp.style.opacity = .3; } else { truth.style.opacity = ''; logp.style.opacity = ''; }
    } };
  }
};

/* 7 · STOP — count new findings, stop after two dry rounds; forget rejects and it never stops */
V.stop = {
  title: '数着东西停：<em>连续两轮没有新发现</em>，就收工',
  build(root, api) {
    init(api);
    const b = box(root);
    const inf = div(b, 'f', `<svg width="300" height="140" viewBox="0 0 300 140"><path d="M150 70 C110 10 30 10 30 70 C30 130 110 130 150 70 C190 10 270 10 270 70 C270 130 190 130 150 70Z" fill="none" stroke="${C.gold}" stroke-width="6" stroke-dasharray="40 16" class="flow"/></svg>
      <div style="font-size:30px;color:${C.cr};margin-top:8px">「一直做到满意为止」</div><div class="mono" style="font-size:20px;color:${C.dim};margin-top:6px">polish… polish… polish… <span class="pc">+1h</span></div>`, 0, 60, 420);
    const chart = div(b, 'f hide', '', 0, 0, 1080, 560);
    const code = div(chart, 'panel mono', `<div style="color:${C.dim};font-size:15px;letter-spacing:.1em">STOP RULE</div>
      <div class="c1" style="margin-top:8px">新发现 = 本轮发现 − seen</div><div class="c2">seen += 新发现 <span style="color:${C.red}">+ 被否掉的</span></div>
      <div class="c3">dry = 新发现为空 ? dry+1 : 0</div><div class="c4">dry == 2 → <b style="color:${C.gr}">停</b>　轮数上限 6</div>`, 0, 0, 470);
    code.style.padding = '18px 22px'; code.style.fontSize = '21px'; code.style.lineHeight = '1.75'; code.style.color = C.cr;
    code.style.display = 'none'; chart.style.left = '-300px';
    const ROUNDS = 6, bx = 520, bw = 90, base = 470;
    const s = svgIn(chart, 1080, 560, 0, 0);
    S('line', { x1: bx - 20, y1: base, x2: bx + ROUNDS * 95, y2: base, stroke: C.ln, 'stroke-width': 2 }, s);
    const cols = [];
    for (let r = 0; r < ROUNDS; r++) {
      const g = S('g', {}, s);
      S('text', { x: bx + r * 95 + bw / 2, y: base + 30, 'text-anchor': 'middle', fill: C.dim, 'font-size': 18, class: 'm' }, g).textContent = 'R' + (r + 1);
      const fresh = S('rect', { x: bx + r * 95, y: base, width: bw, height: 0, rx: 6, fill: C.te, class: 'f' }, g);
      const rep = S('rect', { x: bx + r * 95, y: base, width: bw, height: 0, rx: 6, fill: 'rgba(255,93,93,.55)', class: 'f' }, g);
      const lbl = S('text', { x: bx + r * 95 + bw / 2, y: base - 10, 'text-anchor': 'middle', fill: C.cr, 'font-size': 20, class: 'm f', opacity: 0 }, g);
      cols.push({ fresh, rep, lbl });
    }
    const dryT = div(chart, 'mono f hide', '', 520, 0, 560); dryT.style.fontSize = '26px'; dryT.style.color = C.cr;
    const stop = div(chart, 'stamp', 'STOP · 收工', 830, 120); stop.style.color = C.gr;
    const cut = div(chart, 'stamp', '被轮数上限切断', 760, 110); cut.style.color = C.red; cut.style.fontSize = '34px';
    const seen = div(b, 'panel f hide', `<div class="mono" style="font-size:15px;color:${C.dim};letter-spacing:.1em">SEEN 集合</div><div class="chips" style="display:flex;flex-wrap:wrap;gap:8px;margin-top:10px"></div>`, 1120, 0, 560);
    seen.style.padding = '18px';
    const chipsEl = seen.querySelector('.chips');
    const F = ['空指针 #1', '时区 #2', '编码 #3', '死胡同 A ✕', '竞态 #4', '死胡同 B ✕', '越界 #5', '缓存 #6', '死胡同 C ✕'];
    F.forEach(t => { const c = E('span', 'f', chipsEl, t); c.style.cssText = `font-size:18px;padding:6px 12px;border-radius:999px;border:1px solid ${t.includes('✕') ? C.red : C.te};color:${t.includes('✕') ? C.red : C.te2};opacity:0`; });
    const fg = div(b, 'chip f hide', `<span class="sw" style="display:inline-block;width:46px;height:24px;border-radius:12px;background:${C.red};vertical-align:middle;position:relative"><i style="position:absolute;right:3px;top:3px;width:18px;height:18px;border-radius:50%;background:#fff"></i></span>　忘掉已拒绝项：开`, 1120, 300);
    const pay = div(b, 'panel f hide', `<div class="mono" style="font-size:15px;color:${C.dim};letter-spacing:.1em">为旧错付的钱</div><div class="mono" style="font-size:44px;color:${C.red};margin-top:6px">$ <span class="pv">0</span></div><div style="font-size:19px;color:${C.dim}">每轮重新发现同一批死胡同</div>`, 1120, 380, 560);
    pay.style.padding = '18px';
    const GOOD = [[5, 0], [3, 0], [1, 0], [0, 0], [0, 0], [0, 0]], BAD = [[5, 0], [3, 2], [1, 3], [0, 3], [0, 3], [0, 3]];
    let anim = [], payV = 0;
    function render(data, upto, forget) {
      cols.forEach((c, r) => {
        const on = r < upto, [f, rp] = data[r];
        const hf = on ? f * 50 : 0, hr = on ? rp * 50 : 0;
        c.fresh.setAttribute('height', hf); c.fresh.setAttribute('y', base - hf);
        c.rep.setAttribute('height', hr); c.rep.setAttribute('y', base - hf - hr);
        c.lbl.textContent = on ? (forget && rp ? `${rp} 旧` : `+${f}`) : ''; c.lbl.setAttribute('y', base - hf - hr - 10); c.lbl.setAttribute('opacity', on ? 1 : 0);
      });
      let dry = 0; for (let r = 0; r < upto; r++) dry = (data[r][0] + (forget ? data[r][1] : 0)) ? 0 : dry + 1;
      dryT.innerHTML = `round <b>${Math.min(upto, 6)}</b> / 6　·　dry = <b style="color:${dry >= 1 ? C.gold : C.cr}">${forget ? 0 : dry}</b>`;
      const nSeen = forget ? Math.min(9, [0, 5, 8, 9, 9, 9, 9][upto]) : Math.min(9, [0, 5, 8, 9, 9, 9, 9][upto]);
      [...chipsEl.children].forEach((c, i) => c.style.opacity = i < nSeen ? (forget && c.textContent.includes('✕') ? .25 : 1) : 0);
    }
    function play(data, n, forget, done) { anim.forEach(clearTimeout); anim = []; for (let i = 0; i <= n; i++) anim.push(api.later(() => { render(data, i, forget); if (i === n && done) done(); }, i * 650)); }
    return { set(k, keys, instant) {
      const at = reach(keys, k);
      tg(inf, 'hide', at('count')); 
      tg(chart, 'hide', !at('count'));
      tg(dryT, 'hide', !at('run'));
      tg(seen, 'hide', !at('seen')); tg(fg, 'hide', !at('forget')); tg(pay, 'hide', !at('pay'));
      stop.classList.remove('on'); cut.classList.remove('on');
      code.querySelector('.c2 span').style.opacity = at('seen') ? 1 : 0;
      if (at('forget')) {
        if (instant) { render(BAD, 6, true); cut.classList.add('on'); }
        else play(BAD, 6, true, () => cut.classList.add('on'));
      } else if (at('run')) {
        if (instant) { render(GOOD, 5, false); stop.classList.add('on'); }
        else play(GOOD, 5, false, () => stop.classList.add('on'));
      } else render(GOOD, 0, false);
      if (at('pay')) { payV = 0; const pv = pay.querySelector('.pv'); const h = api.every(() => { payV += 7; pv.textContent = payV; if (payV >= 84) clearInterval(h); }, 120); }
    } };
  }
};

/* 8 · KIT — five things every cycle needs, as a sideline scoreboard */
V.kit = {
  title: '每个循环都要<em>五件套</em>',
  build(root, api) {
    init(api);
    const b = box(root);
    const K = [['a', '✓', '说「完成」的测试', 'TEST', '复位达标标准'], ['a', '6', '轮数上限', 'ROUNDS', '复位次数上限'], ['a', '$', '一份预算', 'BUDGET', '止血带时间 · 透视次数'], ['b', '≡', '对以前尝试的记忆', 'MEMORY', '记下失败的复位手法'], ['b', '☎', '卡住时被叫醒的人', 'PAGER', '呼叫上级']];
    const cards = K.map(([bt, ic, t, en, an], i) => {
      const c = div(b, 'panel f hide dn', `<div class="mono" style="font-size:64px;color:${C.or2};font-weight:700">${ic}</div><div style="font-size:26px;color:${C.cr};margin-top:8px">${t}</div><div class="mono" style="font-size:16px;color:${C.dim};letter-spacing:.2em;margin-top:6px">${en}</div><div class="ana" style="font-size:19px;color:${C.gold};margin-top:10px;opacity:0;transition:opacity .6s">≈ ${an}</div>`, i * 340, 10, 310);
      c.style.padding = '26px 24px'; c.style.textAlign = 'center'; c.dataset.b = bt; return c;
    });
    const board = div(b, 'panel f hide dn', `<div style="display:flex;align-items:stretch;gap:0;font-family:var(--mono)">
      ${[['复位尝试', 'ATTEMPTS', '2 / 3'], ['止血带时间', 'TOURNIQUET', '00:42'], ['两次无改善', 'ESCALATE', '呼叫上级']].map(([z, e, v], i) => `<div style="flex:1;padding:18px 26px;${i ? 'border-left:1px solid var(--line);' : ''}"><div style="font-size:16px;color:${C.dim};letter-spacing:.2em">${e}</div><div style="font-size:42px;color:${C.gold};margin-top:6px;text-shadow:0 0 18px rgba(242,177,52,.5)">${v}</div><div style="font-family:var(--sans);font-size:20px;color:${C.cr};margin-top:4px">${z}</div></div>`).join('')}
      </div>`, 260, 300, 1160);
    return { set(k, keys) {
      const at = reach(keys, k);
      cards.forEach(c => { const on = at('five') && (at(c.dataset.b) || false); tg(c, 'hide', !at('five')); tg(c, 'dn', !at('five')); c.style.opacity = at('five') ? (on ? 1 : .35) : ''; tg(c, 'glow-or', on && !at('board')); });
      tg(board, 'hide', !at('board')); tg(board, 'dn', !at('board')); cards.forEach(c => c.querySelector('.ana').style.opacity = at('board') ? 1 : 0); if (at('board')) cards.forEach(c => c.style.opacity = 1);
    } };
  }
};

/* 9 · PIPELINE — a perfect loop inside a badly drawn pipeline */
V.pipeline = {
  title: '每一步都通过，<em>整趟还是又慢又错</em>',
  build(root, api) {
    init(api);
    const b = box(root);
    const s = svgIn(b, 1680, 560, 0, 0);
    const N = ['需求', '检索', '复核', '整理', '写作'];
    const xs = N.map((_, i) => 110 + i * 360);
    const edges = [];
    for (let i = 0; i < 4; i++) edges.push(S('line', { x1: xs[i] + 80, y1: 150, x2: xs[i + 1] - 80, y2: 150, stroke: C.ln, 'stroke-width': 4, class: 'edge' }, s));
    const nodes = N.map((n, i) => {
      const g = S('g', { class: 'node' }, s);
      const r = S('rect', { x: xs[i] - 80, y: 100, width: 160, height: 100, rx: 18, fill: 'rgba(20,33,61,.9)', stroke: C.ln, 'stroke-width': 2 }, g);
      S('text', { x: xs[i], y: 160, 'text-anchor': 'middle', fill: C.cr, 'font-size': 26 }, g).textContent = n;
      const ring = S('circle', { cx: xs[i] + 70, cy: 100, r: 18, fill: '#0b1322', stroke: C.te, 'stroke-width': 4, 'stroke-dasharray': '80 33', class: 'spin' }, g);
      const ok = S('text', { x: xs[i] + 70, y: 108, 'text-anchor': 'middle', fill: C.gr, 'font-size': 22, opacity: 0 }, g); ok.textContent = '✓';
      return { g, r, ring, ok };
    });
    const ghost = S('text', { x: xs[2], y: 240, 'text-anchor': 'middle', fill: C.red, 'font-size': 22, opacity: 0, class: 'f' }, s); ghost.textContent = '这一步本不该存在';
    const par = S('path', { d: `M${xs[1] - 90} 270 v20 h${xs[3] - xs[1] + 180} v-20`, stroke: C.gold, 'stroke-width': 3, fill: 'none', opacity: 0, class: 'f' }, s);
    const parT = S('text', { x: (xs[1] + xs[3]) / 2, y: 330, 'text-anchor': 'middle', fill: C.gold, 'font-size': 22, opacity: 0, class: 'f' }, s); parT.textContent = '五步里有三步本可以同时进行';
    // timeline
    const tl = div(b, 'f hide', `<div class="mono" style="font-size:16px;color:${C.dim};letter-spacing:.15em">WALL CLOCK</div><div style="position:relative;height:30px;margin-top:10px;background:rgba(255,255,255,.05);border-radius:8px"><i class="tb" style="position:absolute;left:0;top:0;height:100%;width:0;border-radius:8px;background:linear-gradient(90deg,${C.te},${C.gold},${C.red});transition:width 2.4s var(--ease)"></i></div>
      <div style="display:flex;justify-content:space-between;margin-top:10px;font-size:24px"><span style="color:${C.gr}">5 / 5 步骤 ✓</span><span style="color:${C.red}">结果：✗ 做出了错的东西</span></div>`, 110, 400, 1460);
    const between = S('text', { x: 840, y: 60, 'text-anchor': 'middle', fill: C.or2, 'font-size': 28, opacity: 0, class: 'f', 'font-weight': 700 }, s); between.textContent = '问题不在步骤里面，而在步骤之间 → graph 的活';
    return { set(k, keys) {
      const at = reach(keys, k);
      nodes.forEach(n => { n.ok.setAttribute('opacity', at('green') || at('in') ? 1 : 0); n.r.setAttribute('stroke', at('green') ? C.gr : C.ln); });
      nodes[2].r.setAttribute('stroke-dasharray', at('cant') ? '8 8' : ''); nodes[2].g.setAttribute('opacity', at('cant') ? .55 : 1);
      ghost.setAttribute('opacity', at('cant') ? 1 : 0); par.setAttribute('opacity', at('cant') ? 1 : 0); parT.setAttribute('opacity', at('cant') ? 1 : 0);
      tg(tl, 'hide', !at('green')); tl.querySelector('.tb').style.width = at('green') ? '100%' : '0';
      edges.forEach(e => { e.setAttribute('stroke', at('between') ? C.or : C.ln); tg(e, 'flow', at('between')); });
      between.setAttribute('opacity', at('between') ? 1 : 0);
    } };
  }
};

/* 10 · ARROWS — name the variable on each arrow; cut the empty ones; 31 → 17 */
V.arrows = {
  title: '说不出传什么，<em>就删这条边</em>',
  build(root, api) {
    init(api);
    const b = box(root);
    const s = svgIn(b, 1680, 330, 0, 0);
    const P = { r: [140, 160], p: [560, 160], q: [980, 160], w: [1420, 160] };
    const PAR = { r: [560, 50], p: [560, 160], q: [560, 270], w: [1180, 160] };
    const name = { r: '查资料', p: '看仓库', q: '拉价格', w: '写' };
    const M = { r: 9, p: 8, q: 6, w: 8 };
    const eg = S('g', {}, s), ng = S('g', {}, s);
    const E2 = [['r', 'p', '?'], ['p', 'q', '?'], ['q', 'w', 'price'], ['r', 'w', 'sources'], ['p', 'w', 'repo_facts']];
    const edges = E2.map(([a, z, v]) => ({ a, z, v, l: S('path', { stroke: C.ln, 'stroke-width': 4, fill: 'none', class: 'edge', 'marker-end': 'url(#ah)' }, eg), t: S('text', { 'text-anchor': 'middle', 'font-size': 19, class: 'm f', opacity: 0 }, eg) }));
    const defs = S('defs', {}, s); const mk = S('marker', { id: 'ah', viewBox: '0 0 10 10', refX: 9, refY: 5, markerWidth: 7, markerHeight: 7, orient: 'auto-start-reverse' }, defs); S('path', { d: 'M0 0 L10 5 L0 10z', fill: C.dim }, mk);
    const nodes = {};
    for (const k in P) { const g = S('g', { class: 'f' }, ng); g.style.transition = 'transform 1s var(--ease)'; S('rect', { x: -95, y: -40, width: 190, height: 80, rx: 16, fill: 'rgba(20,33,61,.95)', stroke: C.te, 'stroke-width': 2 }, g); S('text', { x: 0, y: 2, 'text-anchor': 'middle', fill: C.cr, 'font-size': 26 }, g).textContent = name[k]; S('text', { x: 0, y: 30, 'text-anchor': 'middle', fill: C.dim, 'font-size': 16, class: 'm' }, g).textContent = M[k] + ' min'; nodes[k] = g; }
    const scis = S('text', { 'font-size': 34, opacity: 0, class: 'f' }, s); scis.textContent = '✂';
    // timeline
    const tl = div(b, 'panel f hide', '', 0, 350, 1680, 220); tl.style.padding = '18px 26px';
    tl.innerHTML = `<div style="display:flex;align-items:baseline;gap:16px"><span class="mono" style="font-size:16px;color:${C.dim};letter-spacing:.15em">WALL CLOCK</span><span style="flex:1"></span><span class="mono" style="font-size:20px;color:${C.dim}">总计</span><b class="mono tot" style="font-size:46px;color:${C.or2}">31</b><span style="font-size:22px;color:${C.dim}">分钟</span><span class="cav"></span></div>
      <div class="bars" style="position:relative;height:120px;margin-top:10px"></div>`;
    const bars = tl.querySelector('.bars'), tot = tl.querySelector('.tot'), cav = tl.querySelector('.cav');
    const SC = 1560 / 31;
    const bar = {}; ['r', 'p', 'q', 'w'].forEach((k, i) => { const e = div(bars, 'f', name[k], 0, i * 30, 0, 24); e.style.cssText += `;border-radius:6px;background:${k === 'w' ? C.or : C.te}cc;color:#04121a;font-size:16px;padding-left:8px;line-height:24px;overflow:hidden;white-space:nowrap`; bar[k] = e; });
    const cutsBy = at => ({ rp: at('cut1'), pq: at('cut2') });
    function layout(cuts, showVars, tested) {
      const posn = cuts.pq ? PAR : cuts.rp ? { r: [560, 60], p: [440, 230], q: [860, 230], w: [1300, 160] } : P;
      for (const k in nodes) nodes[k].setAttribute('transform', `translate(${posn[k][0]},${posn[k][1]})`);
      edges.forEach(e => {
        const cut = (e.a === 'r' && e.z === 'p' && cuts.rp) || (e.a === 'p' && e.z === 'q' && cuts.pq);
        const side = (e.a === 'r' && e.z === 'w') || (e.a === 'p' && e.z === 'w');
        const [x1, y1] = posn[e.a], [x2, y2] = posn[e.z];
        const straight = !cuts.rp && !cuts.pq;
        let d;
        if (side && straight) { const lift = e.a === 'r' ? -120 : 110; d = `M${x1} ${y1 + (lift < 0 ? -40 : 40)} C ${x1 + 200} ${y1 + lift * 1.3}, ${x2 - 200} ${y2 + lift * 1.3}, ${x2 - 30} ${y2 + (lift < 0 ? -40 : 40)}`; }
        else d = `M${x1 + 95} ${y1} C ${x1 + 200} ${y1}, ${x2 - 220} ${y2}, ${x2 - 98} ${y2}`;
        e.l.setAttribute('d', d);
        e.l.setAttribute('opacity', cut ? 0 : side && !tested ? 0 : 1);
        e.l.setAttribute('stroke', tested ? (e.v === '?' ? C.red : C.te2) : C.ln);
        const mx = side && straight ? (x1 + x2) / 2 : (x1 + x2) / 2, my = side && straight ? y1 + (e.a === 'r' ? -105 : 125) : (y1 + y2) / 2 - 14;
        e.t.setAttribute('x', mx); e.t.setAttribute('y', my); e.t.textContent = e.v === '?' ? '传什么？说不出' : e.v; e.t.setAttribute('fill', e.v === '?' ? C.red : C.te2);
        e.t.setAttribute('opacity', showVars && !cut ? 1 : 0);
      });
      // schedule
      const st = { r: 0, p: cuts.rp ? 0 : 9, q: 0, w: 0 };
      st.q = cuts.pq ? 0 : st.p + 8; const endPre = Math.max(st.r + 9, st.p + 8, st.q + 6); st.w = endPre;
      if (!cuts.rp && !cuts.pq) { st.p = 9; st.q = 17; st.w = 23; }
      for (const k in bar) { bar[k].style.left = st[k] * SC + 'px'; bar[k].style.width = M[k] * SC - 4 + 'px'; }
      return st.w + 8;
    }
    const note = div(b, 'chip f hide', '', 880, -46); note.style.fontSize = '22px';
    return { set(k, keys) {
      const at = reach(keys, k);
      const cuts = cutsBy(at);
      const total = layout(cuts, at('test'), at('test'));
      nodes.q.querySelector('rect').setAttribute('stroke', at('habit') && !at('test') ? C.gold : C.te);
      tg(tl, 'hide', !at('demo')); tot.textContent = total;
      cav.style.boxShadow = at('caveat') ? `0 0 0 3px ${C.gold}` : ''; 
      const sc = at('cut2') && !at('save') ? [700, 150] : at('cut1') && !at('cut2') ? [360, 120] : null;
      if (sc) { scis.setAttribute('x', sc[0]); scis.setAttribute('y', sc[1]); scis.setAttribute('opacity', 1); scis.setAttribute('fill', C.or2); } else scis.setAttribute('opacity', 0);
      nodes.w.querySelector('rect').setAttribute('stroke', at('join') ? C.or2 : C.te);
      nodes.w.querySelector('rect').setAttribute('stroke-width', at('join') ? 4 : 2);
      tot.style.color = at('cut2') ? C.gr : C.or2;
      note.innerHTML = at('fig') ? `<b style="color:${C.cr}">31 → 17 分钟</b>　同样四步，少了将近一半` : at('join') ? '只在需要全集时汇合：跨来源去重、给全部候选排名　≈ 切皮前安全核查，等每一项就绪' : at('field') ? '≈ 术前准备并行：麻醉评估 · 备血 · 影像 · 器械与内植物 → 入室到切皮更快' : at('save') ? `token <b style="color:${C.cr}">不变</b> · 只是少了没必要的等待` : at('join') ? '只在需要全集时汇合：跨来源去重、给全部候选排名　≈ 切皮前安全核查，等每一项就绪' : '';
      tg(note, 'hide', !note.innerHTML);
    } };
  }
};

/* 11 · CONTRACT — four lines make a node testable and swappable */
V.contract = {
  title: '一个节点，<em>四行写清楚</em>',
  build(root, api) {
    init(api);
    const b = box(root);
    const card = div(b, 'panel f', '', 0, 0, 900, 520); card.style.padding = '26px 34px';
    const R = [['name', 'NODE', 'source_researcher', '找来源的研究员'], ['io', 'JOB', 'find one primary source per claim', '每个论点找一个一手来源'], ['io', 'IN', '{ topic, source_type }', '主题 · 来源类型'], ['fail', 'OUT', '{ claim, url, quote }', '论点 · 链接 · 原句'], ['fail', 'FAILS AS', 'no_primary_source', '找不到一手来源']];
    card.innerHTML = `<div class="mono" style="font-size:15px;color:${C.dim};letter-spacing:.15em;margin-bottom:10px">NODE CONTRACT ·</div>` +
      R.map(([bt, k, v, zh]) => `<div class="row f" data-b="${bt}" style="display:flex;gap:22px;align-items:baseline;padding:14px 0;border-top:1px solid var(--line)"><b class="mono" style="width:150px;color:${C.or2};font-size:22px">${k}</b><div><div class="mono" style="font-size:24px;color:${C.cr}">${v}</div><div style="font-size:19px;color:${C.dim};margin-top:2px">${zh}</div></div></div>`).join('');
    const rows = [...card.querySelectorAll('.row')];
    const sw = div(b, 'f hide', '', 960, 0, 720, 520);
    sw.innerHTML = `<div style="font-size:24px;color:${C.cr};margin-bottom:18px">合同固定 → 里面随便换，下游不坏</div>
      <div class="panel" style="position:relative;padding:22px;display:flex;gap:16px;align-items:center;justify-content:center"><span class="mono" style="color:${C.dim};font-size:18px">内部</span><span class="swp chip" style="position:relative;font-size:22px">模型 A</span></div>
      <svg width="720" height="140" viewBox="0 0 720 140"><path d="M360 0 V40 M360 40 L160 100 M360 40 L560 100" stroke="${C.te}" stroke-width="3" fill="none" class="flow"/></svg>
      <div style="display:flex;justify-content:space-around"><span class="chip" style="position:relative">去重 <b style="color:${C.gr}">✓</b></span><span class="chip" style="position:relative">写作 <b style="color:${C.gr}">✓</b></span></div>
      <div class="panel" style="position:relative;margin-top:26px;padding:16px 20px;font-size:20px;line-height:1.6;color:${C.cr}"><div class="mono" style="font-size:14px;color:${C.gold};letter-spacing:.12em">≈ 器械护士这个岗位</div>输入：手术方案 → 输出：清点无误的器械与内植物<br><span style="color:${C.dim}">失败时报：</span><b style="color:${C.red}">器械缺失</b><span style="color:${C.dim}"> · 换谁上台都一样</span></div>`;
    const swp = sw.querySelector('.swp'); const opts = ['模型 A', '模型 B', '新提示词', '换个工具']; let oi = 0, run = false;
    api.every(() => { if (!run) return; oi = (oi + 1) % opts.length; swp.animate([{ opacity: 1, transform: 'translateY(0)' }, { opacity: 0, transform: 'translateY(-10px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 600 }); setTimeout(() => swp.textContent = opts[oi], 300); }, 1400);
    const four = div(b, 'stamp', '说不清 = 测不了、换不掉', 960, 160); four.style.color = C.gold; four.style.fontSize = '32px';
    return { set(k, keys) {
      const at = reach(keys, k);
      rows.forEach(r => { r.style.opacity = at(r.dataset.b) ? 1 : .08; r.style.transform = at(r.dataset.b) ? '' : 'translateX(-14px)'; });
      tg(four, 'on', at('in') && !at('swap'));
      tg(sw, 'hide', !at('swap')); run = at('swap');
    } };
  }
};

/* 12 · SORTER — model where judgment is needed, code where there is one right answer */
V.sorter = {
  title: '要判断才用模型，<em>只有一个正确答案就写代码</em>',
  build(root, api) {
    init(api);
    const b = box(root);
    const gate = div(b, 'panel f hide', `<div style="font-size:26px;color:${C.cr};text-align:center">它要 <b style="color:${C.or2}">判断 · 决定 · 评估 · 总结</b> 吗？</div>`, 520, 0, 640); gate.style.padding = '18px';
    const bins = [['MODEL', '模型', '抽取 → 小模型 · 综合 → 强模型', C.or2, 160, '复位满不满意 · 选哪种固定'], ['CODE', '代码', '合并 · 去重 · 排序 · 连接：一个正确答案', C.te2, 1000, '纱布器械清点 · 核对患者身份']].map(([e, z, d, col, x, an]) => {
      const bn = div(b, 'f hide', `<div class="mono" style="font-size:30px;font-weight:700;color:${col}">${e} <span style="font-family:var(--sans);font-size:24px;color:${C.cr}">${z}</span></div><div style="font-size:19px;color:${C.dim};margin-top:4px">${d}</div><div class="ana" style="position:absolute;left:22px;bottom:16px;font-size:20px;color:${C.gold};opacity:0;transition:opacity .6s">≈ ${an}</div>`, x, 120, 520, 400);
      bn.style.border = `2px dashed ${col}66`; bn.style.borderRadius = '22px'; bn.style.padding = '18px 22px'; bn.style.background = `${col}0a`; return bn;
    });
    const T = [['抽取字段', 'm'], ['综合观点', 'm'], ['判断可信度', 'm'], ['写摘要', 'm'], ['合并列表', 'c'], ['去重', 'c'], ['排序', 'c'], ['连接记录', 'c']];
    const chips = T.map(([t, w], i) => { const c = div(b, 'chip f', t, 700 + (i % 4) * 5, 130 + i * 40); c.dataset.w = w; c.dataset.i = i; return c; });
    const warn = div(b, 'chip f hide', `<span style="color:${C.red}">交给模型：</span>更慢 · 更贵 · 偶尔还错`, 1030, 400); warn.style.fontSize = '21px';
    return { set(k, keys) {
      const at = reach(keys, k);
      tg(gate, 'hide', !at('ask'));
      bins.forEach(bn => tg(bn, 'hide', !at('ask')));
      let mi = 0, ci = 0;
      chips.forEach(c => {
        const w = c.dataset.w, go = (w === 'm' && at('model')) || (w === 'c' && at('code'));
        if (go) { const j = w === 'm' ? mi++ : ci++; pos(c, (w === 'm' ? 190 : 1030) + (j % 2) * 240, 230 + ((j / 2) | 0) * 80); c.style.borderColor = w === 'm' ? C.or : C.te; }
        else { const i = +c.dataset.i; pos(c, 760, 110 + i * 52); c.style.borderColor = ''; }
      });
      tg(warn, 'hide', !at('sort')); bins.forEach(bn => bn.querySelector('.ana').style.opacity = at('sort') ? 1 : 0);
    } };
  }
};

/* 13 · SHAPES — the same nodes morph through chain, fan-out+join, router, bounded cycle */
V.shapes = {
  title: '四种形状，<em>拼出几乎所有流程</em>',
  build(root, api) {
    init(api);
    const b = box(root);
    const s = svgIn(b, 1100, 560, 0, 0);
    const ids = ['a', 'b', 'c', 'd', 'e'];
    const L = {
      chain: { a: [100, 280], b: [325, 280], c: [550, 280], d: [775, 280], e: [1000, 280], E: [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']] },
      fan: { a: [120, 280], b: [480, 110], c: [480, 280], d: [480, 450], e: [880, 280], E: [['a', 'b'], ['a', 'c'], ['a', 'd'], ['b', 'e'], ['c', 'e'], ['d', 'e']] },
      route: { a: [120, 280], b: [420, 280], c: [740, 130], d: [740, 430], e: [1000, 280], E: [['a', 'b'], ['b', 'c'], ['b', 'd'], ['c', 'e'], ['d', 'e']] },
      cycle: { a: [140, 280], b: [440, 160], c: [740, 280], d: [440, 400], e: [1000, 280], E: [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'b'], ['c', 'e']] },
    };
    const lbl = { chain: ['术前', '复位', '固定', '关闭', '复查'], fan: ['多发伤', '骨科', '普外', '神外', 'MDT'], route: ['骨折', '分诊', '石膏', '手术', '随访'], cycle: ['开始', '复位', '透视', '调整', '固定'] };
    const eg = S('g', {}, s);
    const nodes = {};
    ids.forEach(id => { const g = S('g', {}, s); g.style.transition = 'transform 1.1s var(--ease)'; S('circle', { r: 46, fill: 'rgba(20,33,61,.95)', stroke: C.or2, 'stroke-width': 3 }, g); const t = S('text', { y: 8, 'text-anchor': 'middle', fill: C.cr, 'font-size': 20 }, g); nodes[id] = { g, t }; });
    const cap = S('text', { x: 440, y: 515, 'text-anchor': 'middle', fill: C.gold, 'font-size': 22, opacity: 0, class: 'f' }, s); cap.textContent = '硬上限：最多 3 次复位';
    const legend = div(b, 'f', '', 1160, 20, 520, 520);
    const Lg = [['chain', '链', '后一步真吃前一步的输出 · 复位→固定→关闭'], ['fan', '扇出 + 汇合', '调研、评审、审计 · 多发伤各科评估→MDT'], ['route', '路由', '简单走短路，危险走长路 · 无移位打石膏，开放/复杂进手术室'], ['cycle', '有界循环', '可以再来一轮，但有硬上限 · 再复位一次'] ];
    const items = Lg.map(([k, n, d]) => { const e = div(legend, 'panel f', `<div style="font-size:26px;font-weight:700;color:${C.cr}">${n}</div><div style="font-size:19px;color:${C.dim};margin-top:2px;line-height:1.4">${d}</div>`, 0, 0, 520); e.style.position = 'relative'; e.style.marginBottom = '12px'; e.style.padding = '12px 20px'; e.dataset.k = k; return e; });
    function draw(k) {
      const Lk = L[k];
      ids.forEach((id, i) => { nodes[id].g.setAttribute('transform', `translate(${Lk[id][0]},${Lk[id][1]})`); nodes[id].t.textContent = lbl[k][i]; });
      eg.innerHTML = '';
      Lk.E.forEach(([a, z]) => {
        const [x1, y1] = Lk[a], [x2, y2] = Lk[z];
        let d = `M${x1} ${y1} L${x2} ${y2}`;
        if (k === 'cycle' && a === 'd' && z === 'b') d = `M${x1 - 30} ${y1 - 30} Q ${x1 - 120} ${(y1 + y2) / 2} ${x2 - 30} ${y2 + 30}`;
        const p = S('path', { d, stroke: k === 'route' && z === 'd' ? C.red : C.te, 'stroke-width': 4, fill: 'none', class: 'flow', opacity: 0 }, eg);
        p.style.transition = 'opacity .6s .5s'; requestAnimationFrame(() => p.setAttribute('opacity', .85));
      });
    }
    let cur = '';
    return { set(k, keys) {
      const at = reach(keys, k);
      const shape = at('cycle') ? 'cycle' : at('route') ? 'route' : at('fan') ? 'fan' : 'chain';
      if (shape !== cur) { cur = shape; draw(shape); }
      items.forEach(e => { const on = e.dataset.k === shape && at('chain'); e.style.opacity = at('chain') ? (on ? 1 : .35) : .35; tg(e, 'glow-or', on); });
      cap.setAttribute('opacity', shape === 'cycle' ? 1 : 0);
    } };
  }
};

/* 14 · ROOMS — four reviewers in one shared window vs separate contexts */
V.rooms = {
  title: '并行的工人，<em>要有各自的上下文</em>',
  build(root, api) {
    init(api);
    const b = box(root);
    const win = div(b, 'f', '', 0, 20, 1680, 420);
    win.style.border = `2px solid ${C.ln}`; win.style.borderRadius = '22px';
    const rv = [0, 1, 2, 3].map(i => {
      const r = div(b, 'f', `<svg width="90" height="90" viewBox="0 0 90 90"><circle cx="45" cy="30" r="20" fill="none" stroke="${C.cr}" stroke-width="3"/><path d="M12 86 q33 -46 66 0" fill="none" stroke="${C.cr}" stroke-width="3"/></svg><div style="font-size:20px;color:${C.dim}">评审 ${i + 1}</div>`, 0, 0, 120);
      r.style.textAlign = 'center';
      const bub = div(b, 'chip f hide', '', 0, 0); bub.style.fontSize = '20px';
      return { r, bub };
    });
    const F = ['第 3 行越界', '没处理时区', '日志会泄露 token', 'SQL 未转义'];
    const pay = div(b, 'stamp', '付 4 份钱，拿到 1 份意见', 560, 470); pay.style.color = C.red; pay.style.fontSize = '36px';
    const ok = div(b, 'chip f hide', `<b style="color:${C.gr}">4 份真正独立的意见</b> · 各看各的　<span style="color:${C.gold}">≈ 独立阅片</span>`, 560, 480); ok.style.fontSize = '24px';
    return { set(k, keys) {
      const at = reach(keys, k);
      const indep = at('indep');
      win.style.opacity = indep ? 0 : 1;
      rv.forEach((v, i) => {
        const x = indep ? 60 + i * 420 : 380 + i * 260, y = indep ? 80 : 130;
        pos(v.r, x, y); v.r.style.border = indep ? `2px solid ${C.te}` : '0'; v.r.style.borderRadius = '18px'; v.r.style.padding = indep ? '16px 0' : '0'; v.r.style.width = indep ? '360px' : '120px';
        const shared = at('shared') && !indep;
        v.bub.innerHTML = shared ? (i === 0 ? '「第 3 行越界」' : `<span style="color:${C.dim}">同意：第 3 行越界</span>`) : indep ? F[i] : '';
        pos(v.bub, indep ? 80 + i * 420 : 330 + i * 260, indep ? 300 : 300);
        tg(v.bub, 'hide', !(shared || indep));
        v.bub.style.borderColor = indep ? C.te : i ? 'rgba(255,93,93,.5)' : C.or;
      });
      tg(pay, 'on', at('copy') && !indep);
      tg(ok, 'hide', !indep);
    } };
  }
};

/* 15 · ZOOM — loop inside a node, graph between nodes */
V.zoom = {
  title: '<em>loop 在节点内</em>，graph 在节点间',
  build(root, api) {
    init(api);
    const b = box(root);
    const s = svgIn(b, 1680, 560, 0, 0);
    const world = S('g', {}, s); world.style.transition = 'transform 1.2s var(--ease)'; world.style.transformOrigin = '0 0';
    const NP = [[200, 280], [560, 140], [560, 420], [920, 280], [1280, 280]];
    const EG = [[0, 1], [0, 2], [1, 3], [2, 3], [3, 4]];
    const egs = EG.map(([a, z]) => S('line', { x1: NP[a][0], y1: NP[a][1], x2: NP[z][0], y2: NP[z][1], stroke: C.te, 'stroke-width': 4, class: 'edge' }, world));
    const nds = NP.map(([x, y], i) => { const g = S('g', {}, world); S('rect', { x: x - 80, y: y - 50, width: 160, height: 100, rx: 18, fill: 'rgba(20,33,61,.96)', stroke: C.or2, 'stroke-width': 3 }, g); S('text', { x, y: y + 8, 'text-anchor': 'middle', fill: C.cr, 'font-size': 22 }, g).textContent = ['拆分', '节点 A', '节点 B', '合并', i === 4 ? '人 · 签字' : ''][i]; return g; });
    // loop inside node A (drawn small, revealed when zoomed)
    const lp = S('g', { opacity: 0, class: 'f' }, world);
    const [ax, ay] = NP[1];
    S('circle', { cx: ax, cy: ay - 4, r: 30, fill: 'none', stroke: C.te2, 'stroke-width': 3, 'stroke-dasharray': '120 30', class: 'spin' }, lp);
    [['产出', -48, -24], ['检查', 34, -24], ['纠正', -8, 36]].forEach(([t, dx, dy]) => S('text', { x: ax + dx, y: ay + dy, 'font-size': 9, fill: C.cr, 'text-anchor': 'middle' }, lp).textContent = t);
    const ops = div(b, 'f hide', ['拆分', '合并', '退回', '谁来批准'].map(t => `<span class="chip" style="position:relative;margin-right:12px">${t}</span>`).join(''), 360, 500, 1000);
    const pile = S('g', { opacity: 0, class: 'f' }, s);
    for (let i = 0; i < 26; i++) S('rect', { x: 1380 + (i % 6) * 34, y: 470 - ((i / 6) | 0) * 34, width: 28, height: 28, rx: 4, fill: 'rgba(255,93,93,.35)', stroke: C.red }, pile);
    const pileT = S('text', { x: 1480, y: 530, 'text-anchor': 'middle', fill: C.red, 'font-size': 20, opacity: 0, class: 'f' }, s); pileT.textContent = '一大堆没检查过的输出';
    const tangle = S('path', { d: 'M200 280 C 400 600, 700 -40, 920 280 S 1200 600 1280 280 M560 140 C 900 500, 300 500, 1280 280', stroke: C.red, 'stroke-width': 3, fill: 'none', opacity: 0, class: 'f', 'stroke-dasharray': '10 8' }, s);
    const both = div(b, 'chip f hide', `<b style="color:${C.cr}">人做决定</b> · AI 跑路线`, 1180, 60); both.style.fontSize = '26px';
    return { set(k, keys) {
      const at = reach(keys, k);
      const zoomIn = at('in') && !at('graph');
      world.style.transform = zoomIn ? `translate(${840 - ax * 4.2}px,${300 - ay * 4.2}px) scale(4.2)` : 'none';
      lp.setAttribute('opacity', at('in') && !at('gonly') ? 1 : at('both') ? 1 : 0);
      tg(ops, 'hide', !(at('graph') && !at('gonly')));
      const go = at('gonly') && !at('lonly');
      pile.setAttribute('opacity', go ? 1 : 0); pileT.setAttribute('opacity', go ? 1 : 0);
      const lo = at('lonly') && !at('both');
      tangle.setAttribute('opacity', lo ? 1 : 0); egs.forEach(e => e.setAttribute('opacity', lo ? .15 : 1));
      nds.forEach((n, i) => n.setAttribute('opacity', lo && i !== 1 ? .3 : 1));
      tg(both, 'hide', !at('both'));
    } };
  }
};

/* 16 · FLEET — dynamic workflows (16 at a time, ≤1,000 per run), Codex roles, LangGraph checkpoints */
V.fleet = {
  title: '这一年变了：<em>图不一定要你手画</em>',
  build(root, api) {
    init(api);
    const b = box(root);
    const cv = E('canvas', 'f hide', b); cv.width = 1000; cv.height = 520; cv.style.position = 'absolute'; pos(cv, 0, 20);
    const g = cv.getContext('2d');
    let done = 0, active = [], on = false;
    const slots = []; for (let i = 0; i < 16; i++) slots.push({ x: 420 + (i % 4) * 130, y: 70 + ((i / 4) | 0) * 105 });
    api.every(() => {
      if (!on) return;
      g.clearRect(0, 0, 1000, 520);
      g.fillStyle = 'rgba(232,100,27,.15)'; g.strokeStyle = C.or2; g.lineWidth = 2; g.beginPath(); g.roundRect ? g.roundRect(20, 190, 240, 140, 16) : g.rect(20, 190, 240, 140); g.fill(); g.stroke();
      g.fillStyle = C.cr; g.font = '600 22px ui-monospace,Menlo,monospace'; g.fillText('workflow.js', 60, 250); g.fillStyle = C.dim; g.font = '18px ui-monospace,Menlo,monospace'; g.fillText('模型写的编排脚本', 52, 285);
      while (active.length < 16 && done + active.length < 1000) { const sIdx = slots.findIndex((s, i) => !active.some(a => a.s === i)); active.push({ s: sIdx, t: 0, d: 20 + Math.random() * 40 }); }
      for (let i = active.length - 1; i >= 0; i--) { const a = active[i]; a.t++; if (a.t > a.d) { active.splice(i, 1); done++; } }
      slots.forEach((s, i) => {
        const a = active.find(q => q.s === i);
        g.strokeStyle = a ? 'rgba(122,231,220,.35)' : 'rgba(244,234,215,.1)'; g.lineWidth = 1.5; g.beginPath(); g.moveTo(260, 260); g.lineTo(s.x, s.y + 30); g.stroke();
        g.fillStyle = a ? 'rgba(46,196,182,.25)' : 'rgba(255,255,255,.04)'; g.fillRect(s.x, s.y, 110, 64);
        if (a) { g.fillStyle = C.te2; g.fillRect(s.x, s.y + 58, 110 * a.t / a.d, 6); }
        g.fillStyle = a ? C.cr : C.dim; g.font = '15px ui-monospace,Menlo,monospace'; g.fillText(a ? 'agent ' + (done + i + 1) : 'idle', s.x + 10, s.y + 36);
      });
      g.fillStyle = C.cr; g.font = '700 30px ui-monospace,Menlo,monospace'; g.fillText(`并行 ${active.length} / 16`, 20, 120); g.fillStyle = C.gold; g.fillText(`已完成 ${done} / 1000`, 20, 165);
      if (done >= 1000) done = 0;
    }, 50);
    const doc = div(b, 'chip f hide', '　默认最多 16 个同时跑 · 每次运行最多 1,000 个', 0, -40); doc.style.fontSize = '20px';
    const codex = div(b, 'panel f hide', `<div class="mono" style="font-size:15px;color:${C.dim};letter-spacing:.12em">CODEX · 配置文件里的代理角色</div>
      <div class="mono" style="font-size:19px;line-height:1.8;color:${C.cr};margin-top:8px">[agents.reviewer]<br>description = "只读审查"<br>model = <span style="color:${C.gr}">可单独设</span><br>sandbox = <span style="color:${C.gold}">跟随主会话</span></div>
      `, 1060, 0, 620);
    codex.style.padding = '18px 22px';
    const lg = div(b, 'panel f hide', `<div class="mono" style="font-size:15px;color:${C.dim};letter-spacing:.12em">LANGGRAPH 1.0 · 另一头</div>
      <svg width="560" height="70" viewBox="0 0 560 70"><g stroke="${C.te}" stroke-width="3"><line x1="30" y1="35" x2="530" y2="35"/></g>${[30, 155, 280, 405, 530].map((x, i) => `<circle cx="${x}" cy="35" r="13" fill="#0b1322" stroke="${C.or2}" stroke-width="3"/>${i < 4 ? `<rect x="${x + 55}" y="27" width="16" height="16" fill="${C.gold}" transform="rotate(45 ${x + 63} 35)"/>` : ''}`).join('')}<path d="M405 58 Q280 80 155 58" stroke="${C.gold}" stroke-width="2" fill="none" stroke-dasharray="6 6"/></svg>
      <div style="font-size:19px;color:${C.cr}">图写一次 · 从检查点◆重放</div>`, 1060, 340, 620);
    lg.style.padding = '18px 22px';
    return { set(k, keys) {
      const at = reach(keys, k);
      on = at('cc'); tg(cv, 'hide', !at('cc')); tg(doc, 'hide', !at('ccnum'));
      tg(codex, 'hide', !at('codex')); tg(lg, 'hide', !at('lg'));
    } };
  }
};

/* 17 · QUAD — who draws the graph: frequency × cost of undoing */
V.quad = {
  title: '谁来画图？看<em>频率</em>和<em>撤销成本</em>',
  build(root, api) {
    init(api);
    const b = box(root);
    const ox = 160, oy = 0, W = 980, H = 520;
    const ax = div(b, 'f hide', `<div style="position:absolute;left:${ox}px;top:${oy + H}px;width:${W}px;height:2px;background:${C.cr}"></div><div style="position:absolute;left:${ox}px;top:${oy}px;width:2px;height:${H}px;background:${C.cr}"></div>
      <div style="position:absolute;left:${ox}px;top:${oy + H + 12}px;width:${W}px;display:flex;justify-content:space-between;font-size:20px;color:${C.dim}"><span>一次性</span><b style="color:${C.cr}">频率 →</b><span>每周</span></div>
      <div style="position:absolute;left:0;top:${oy}px;width:${ox - 16}px;height:${H}px;display:flex;flex-direction:column;justify-content:space-between;text-align:right;font-size:20px;color:${C.dim}"><span>难撤销</span><b style="color:${C.cr}">撤销<br>成本 ↑</b><span>好撤销</span></div>`, 0, 0, 1200, 600);
    const Q = [['q1', 0, 1, '一次性 · 好撤销', '重构、审计：让模型生成流程，用完就扔', C.te2], ['q2', 0, 0, '一次性 · 难撤销', '生产数据迁移：模型起草计划，你只读计划', C.gold, '罕见复杂病例：主刀定方案，请人审'], ['q3', 1, 1, '每周 · 低风险', '固定的图放进仓库，让它自己上线', C.gr, '常规手术：固定临床路径'], ['q4', 1, 0, '每周 · 涉及钱或用户', '固定的图，最后一步你签字', C.or2, '高风险常规手术：主刀签最后一步']];
    const cells = Q.map(([bt, cx, cy, h, d, col, an]) => { const c = div(b, 'panel f hide', `<div style="font-size:20px;color:${col};font-weight:700">${h}</div><div style="font-size:24px;color:${C.cr};margin-top:8px;line-height:1.45">${d}</div>${an ? `<div style="font-size:19px;color:${C.gold};margin-top:10px">≈ ${an}</div>` : ''}`, ox + 20 + cx * (W / 2), oy + 16 + cy * (H / 2), W / 2 - 40, H / 2 - 32); c.style.padding = '18px 22px'; c.dataset.b = bt; return c; });
    const trap = div(b, 'panel f hide', '', 1200, 0, 480, 520); trap.style.padding = '18px 22px';
    trap.innerHTML = `<div class="mono" style="font-size:15px;color:${C.red};letter-spacing:.12em">陷阱 · 每周从零重画</div><div class="wk" style="margin-top:12px"></div>
      <div class="fx" style="margin-top:16px;font-size:20px;color:${C.cr};line-height:1.6;opacity:0;transition:.6s">固定的图：规则 <b class="rc mono" style="color:${C.gr};font-size:32px">0</b> 条，一周比一周多</div>`;
    const wk = trap.querySelector('.wk');
    const shapes = ['M10 40 L60 40 L110 40 L160 40', 'M10 40 L60 10 L110 40 L60 70 Z', 'M10 10 L160 70 M10 70 L160 10', 'M10 40 L85 10 L160 40 M85 10 L85 70'];
    const rowsW = [1, 2, 3, 4].map(i => { const r = E('div', '', wk); r.style.cssText = 'display:flex;align-items:center;gap:16px;margin:6px 0;font-size:18px;color:' + C.dim; r.innerHTML = `<span class="mono" style="width:44px">W${i}</span><svg width="170" height="80" viewBox="0 0 170 80"><path class="sp" d="${shapes[i - 1]}" stroke="${C.red}" stroke-width="3" fill="none"/></svg><span class="nt">学到的 → 丢了</span>`; return r; });
    return { set(k, keys) {
      const at = reach(keys, k);
      tg(ax, 'hide', !at('who'));
      cells.forEach(c => { tg(c, 'hide', !at(c.dataset.b)); tg(c, 'glow-or', at(c.dataset.b) && keys[k] === c.dataset.b); });
      tg(trap, 'hide', !at('trap'));
      const fixed = at('fix');
      rowsW.forEach((r, i) => { r.querySelector('.sp').setAttribute('d', fixed ? shapes[1] : shapes[i]); r.querySelector('.sp').setAttribute('stroke', fixed ? C.gr : C.red); r.querySelector('.nt').innerHTML = fixed ? `<span style="color:${C.gr}">+1 条规则</span>` : at('loss') ? '学到的 → 丢了' : '换一种切法'; });
      trap.querySelector('.fx').style.opacity = fixed ? 1 : 0;
      const rc = trap.querySelector('.rc'); if (fixed) { let n = 0; const h = api.every(() => { rc.textContent = ++n; if (n >= 4) clearInterval(h); }, 400); } else rc.textContent = 0;
    } };
  }
};

/* 18 · ROUTER — decide in advance what each failure does */
V.router = {
  title: '节点失败了？<em>提前定好去向</em>',
  build(root, api) {
    init(api);
    const b = box(root);
    const R = [['retry', '工具或网络抖了一下', 'RETRY', '重试', C.te2], ['retry', '模型或来源挂了', 'FALLBACK', '换备用', C.te2], ['unit', '可选分支失败', 'SKIP', '跳过', C.dim], ['unit', '输出没过检查', 'REPAIR', '只修那一个单元', C.or2], ['escal', '修了 3 次还不行', 'ESCALATE', '上报：计划本身错了', C.gold], ['budget', '碰到预算或权限上限', 'STOP', '停下，叫醒一个人', C.red]];
    const tbl = div(b, 'panel f', '', 0, 0, 1100, 540); tbl.style.padding = '10px 0'; tbl.style.overflow = 'hidden';
    const rows = R.map(([bt, cond, act, zh, col], i) => {
      const r = E('div', 'f', tbl); r.dataset.b = bt; r.style.cssText = `display:flex;align-items:center;gap:20px;padding:16px 30px;border-top:${i ? '1px solid var(--line)' : '0'};cursor:pointer;opacity:.15`;
      r.innerHTML = `<span style="flex:1;font-size:25px;color:${C.cr}">${cond}</span><svg width="70" height="20"><path d="M0 10 H60 M50 2 L62 10 L50 18" stroke="${col}" stroke-width="3" fill="none"/></svg><b class="mono" style="width:170px;font-size:24px;color:${col}">${act}</b><span style="width:290px;font-size:22px;color:${C.dim}">${zh}</span>`;
      r.onclick = () => { det.innerHTML = DET[i]; det.classList.remove('hide'); rows.forEach(x => x.style.background = ''); r.style.background = 'rgba(232,100,27,.1)'; };
      return r;
    });
    const DET = ['短暂故障 → 原样再来一次，设好次数上限。', '主力不可用 → 切到备用模型或备用来源，结果仍要过同一个检查。', '非必需分支 → 记录后跳过，不拖住主线。', '只把这一个单元退回去修，别动其他已通过的。', '同一单元修 3 次都不过 → 不是执行问题，是计划问题，往上报。', '预算或权限到顶 → 立刻停，叫醒负责的人。'];
    const det = div(b, 'panel f hide', '', 1140, 0, 540); det.style.padding = '22px'; det.style.fontSize = '24px'; det.style.lineHeight = '1.6'; det.style.color = C.cr;
    
    return { set(k, keys) {
      const at = reach(keys, k);
      rows.forEach(r => { r.style.opacity = at(r.dataset.b) ? 1 : .15; });
      if (keys[k] === 'budget') { rows[5].click(); } else if (!at('budget')) det.classList.add('hide');
    } };
  }
};

/* 19 · SENDBACK — return the unit, not the batch; scope line; write the rule */
V.sendback = {
  title: '只退那一片，<em>别整批重来</em>',
  build(root, api) {
    init(api);
    const b = box(root);
    const sl = [0, 1, 2, 3].map(i => { const e = div(b, 'panel f', `<div class="mono" style="font-size:16px;color:${C.dim}">SLICE ${i + 1}</div><div class="st" style="font-size:30px;margin-top:6px">✓ v1</div>`, 40 + i * 230, 20, 200, 130); e.style.padding = '16px 20px'; e.style.textAlign = 'center'; return e; });
    const back = div(b, 'f hide', `<svg width="960" height="80" viewBox="0 0 960 80"><path d="M60 70 Q480 -20 900 70" stroke="${C.red}" stroke-width="3" fill="none" stroke-dasharray="8 8"/></svg><div style="font-size:22px;color:${C.red};text-align:center">整批退回</div>`, 0, 160, 960);
    const conv = div(b, 'panel f hide', `<div class="mono" style="font-size:15px;color:${C.dim};letter-spacing:.12em">失败数 · 每轮</div><svg width="460" height="160" viewBox="0 0 460 160"><polyline points="10,120 80,60 150,100 220,40 290,90 360,30 440,80" fill="none" stroke="${C.red}" stroke-width="4"/></svg><div style="font-size:20px;color:${C.cr}">不再收敛 → 看起来像「模型越来越笨」</div>`, 1060, 0, 520);
    conv.style.padding = '16px 20px';
    const pkt = div(b, 'panel f hide', `<div class="mono" style="font-size:15px;color:${C.or2};letter-spacing:.12em">退回包 · 只给 SLICE 3</div>
      <div style="font-size:22px;color:${C.cr};line-height:1.8;margin-top:6px">✗ 失败的测试<br>≡ 证据（日志、输入）<br><span class="scope">⌖ 范围：<b style="color:${C.gold}">只改这个文件</b><br><span style="font-size:19px;color:${C.gold}">≈ 翻修医嘱：只调整这一枚螺钉</span></span></div>`, 40, 240, 520);
    pkt.style.padding = '18px 22px';
    const diff = div(b, 'panel f hide', `<div class="mono" style="font-size:15px;color:${C.dim};letter-spacing:.12em">DIFF</div><div class="dv mono" style="font-size:24px;margin-top:8px;color:${C.cr}"></div>`, 600, 240, 420);
    const ana = div(b, 'chip f hide', `<svg width="96" height="40" viewBox="0 0 96 40" style="vertical-align:middle;overflow:visible"><path d="M4 20 H92" stroke="#f4ead7" stroke-width="12" stroke-linecap="round" opacity=".35"/><path d="M46 8 l4 24" stroke="#ff5d5d" stroke-width="2"/><rect x="8" y="13" width="80" height="14" rx="7" fill="none" stroke="${C.te}" stroke-width="3"/><circle cx="18" cy="20" r="3.5" fill="${C.te}"/><circle cx="32" cy="20" r="3.5" fill="${C.te}"/><circle cx="58" cy="20" r="3.5" fill="${C.te}"/><circle cx="70" cy="20" r="3.5" fill="#ff5d5d"/></svg>　≈ 一枚螺钉位置不佳：只翻修这一枚，不拆整套钢板`, 40, 500); ana.style.fontSize = '21px';
    diff.style.padding = '18px 22px';
    const rule = div(b, 'panel f hide', `<div class="mono" style="font-size:15px;color:${C.gr};letter-spacing:.12em">RULEBOOK · 留给下次拆活的人</div><div style="font-size:24px;color:${C.cr};margin-top:8px;line-height:1.5">「适配器必须原样保留关键字参数。」</div><div style="font-size:19px;color:${C.gold};margin-top:8px">≈ 术后复盘 → 写进科室规范</div>`, 1060, 240, 520);
    rule.style.padding = '18px 22px';
    const end = div(b, 'chip f hide', `多数代理系统：<b style="color:${C.cr}">很快</b>，却<b style="color:${C.red}">从不进步</b> —— 因为没人写这条规则`, 300, 500); end.style.fontSize = '22px';
    return { set(k, keys) {
      const at = reach(keys, k);
      const batch = at('four') && !at('unitret');
      sl.forEach((e, i) => {
        const stEl = e.querySelector('.st');
        let t = '✓ v1', col = C.gr, bc = '';
        if (at('four') && i === 2) { t = '✗ v1'; col = C.red; bc = C.red; }
        if (at('rewrite') && !at('unitret')) { t = i === 2 ? '✗ v2' : i === 0 ? '✗ v2' : '? v2'; col = i === 1 || i === 3 ? C.gold : C.red; bc = col; }
        if (at('unitret')) { t = i === 2 ? (at('scope') ? '✓ v2' : '↺ 修复中') : '✓ v1'; col = i === 2 && !at('scope') ? C.gold : C.gr; bc = i === 2 ? C.or : ''; }
        stEl.textContent = t; stEl.style.color = col; e.style.borderColor = bc || '';
      });
      tg(back, 'hide', !batch || !at('four'));
      tg(conv, 'hide', !(at('dumb') && !at('unitret')));
      tg(pkt, 'hide', !at('unitret'));
      pkt.querySelector('.scope').style.opacity = at('scope') ? 1 : .15;
      tg(diff, 'hide', !at('scope'));
      diff.querySelector('.dv').innerHTML = at('scopefail') ? `<span style="color:${C.red}">没有范围行：</span><br>+1 行 → <b style="color:${C.red}">4 个文件</b>` : `<span style="color:${C.gr}">有范围行：</span><br>+1 行 · 1 个文件`;
      tg(rule, 'hide', !at('rule')); tg(rule, 'glow-te', at('ex'));
      tg(end, 'hide', !at('end')); tg(ana, 'hide', !at('unitret') || at('end'));
    } };
  }
};

/* 20 · GATES — confidence threshold vs lanes by cost of undoing */
V.gates = {
  title: '按<em>撤销难度</em>开闸，不按置信度',
  build(root, api) {
    init(api);
    const b = box(root);
    const sld = div(b, 'panel f', '', 0, 0, 560, 250); sld.style.padding = '20px 24px';
    sld.innerHTML = `<div class="mono" style="font-size:15px;color:${C.dim};letter-spacing:.12em">置信度阈值</div>
      <div style="position:relative;height:60px;margin-top:26px"><div style="position:absolute;left:0;right:0;top:26px;height:8px;border-radius:4px;background:rgba(255,255,255,.1)"></div>
      <i class="th" style="position:absolute;top:8px;width:6px;height:44px;margin-left:-3px;background:${C.gold};left:80%;transition:left 1.6s var(--ease)"></i>
      <span class="thl mono" style="position:absolute;top:-24px;left:80%;transform:translateX(-50%);color:${C.gold};font-size:18px;transition:left 1.6s var(--ease)">0.80</span>
      <b class="me" style="position:absolute;top:18px;left:93%;width:24px;height:24px;margin-left:-12px;border-radius:50%;background:${C.or2};box-shadow:0 0 16px ${C.or}"></b></div>
      <div class="ms" style="font-size:20px;color:${C.cr};margin-top:12px">模型自评 <b class="mono">0.93</b> → 放行？</div><div class="mw" style="font-size:19px;color:${C.red};margin-top:6px;opacity:0;transition:.5s">这正是模型给自己打的分</div>`;
    const lanes = [['easy', 'OPEN', '直接合并', '改文案 · 加测试 · 独立函数', '错了回滚一次', C.gr, '调整石膏：随时能改'], ['mid', 'EVIDENCE', '先要硬证据', '共享工具 · 改数据结构', '证据到了才开', C.gold, '切开复位内固定：证据充分再做'], ['hard', 'CLOSED', '一律关闭', '迁移 · 删除 · 写生产 · 付款', '多高的分都不开', C.red, '截肢 · 关节置换：主刀签字']].map(([bt, n, z, ex, note, col, an], i) => {
      const l = div(b, 'f hide', `<div style="display:flex;align-items:center;gap:18px"><b class="mono" style="font-size:26px;color:${col};width:150px">${n}</b><span style="font-size:24px;color:${C.cr};width:180px">${z}</span><span style="font-size:22px;color:${C.dim};flex:1;line-height:1.3">${ex}<br><span style="font-size:18px;color:${col}">≈ ${an}</span></span><span class="lk" style="font-size:30px">${i === 2 ? '🔒' : i === 1 ? '◐' : '↻'}</span></div>`, 620, i * 112, 1060, 96);
      l.style.cssText += `;border:2px solid ${col}66;border-radius:18px;padding:14px 26px;background:linear-gradient(90deg,${col}14,transparent)`;
      l.dataset.b = bt; return l;
    });
    const nolower = div(b, 'chip f hide', `阈值是周五忙起来<b style="color:${C.gold}">能被调低的数字</b>；关闭的车道<b style="color:${C.red}">没有数字可调</b>`, 620, 352); nolower.style.fontSize = '21px';
    const order = div(b, 'panel f hide', '', 0, 290, 560, 260); order.style.padding = '18px 22px';
    const O = ['测试', '这次运行的历史', '这个节点被回滚过几次', '评审代理（如 Codex 自动审查）', '模型自己的说法'];
    order.innerHTML = `<div class="mono" style="font-size:15px;color:${C.dim};letter-spacing:.12em">看证据的顺序</div>` + O.map((t, i) => `<div class="oi f" style="font-size:22px;color:${C.cr};margin-top:8px;opacity:.15"><b class="mono" style="color:${C.or2};margin-right:12px">${i + 1}</b>${t}</div>`).join('');
    const ois = [...order.querySelectorAll('.oi')];
    const flag = div(b, 'f hide', `<div style="display:flex;align-items:center;gap:20px"><svg width="150" height="170" viewBox="0 0 150 170"><rect x="16" y="10" width="96" height="130" rx="10" fill="none" stroke="${C.cr}" stroke-width="4"/><path d="M34 40 h60 M34 62 h60 M34 84 h40" stroke="${C.dim}" stroke-width="4"/><path d="M30 118 q10 -14 18 -3 t16 -5 t14 2" stroke="${C.gold}" stroke-width="3" fill="none"/><path d="M96 112 L134 46 L144 52 L106 118 L94 124z" fill="none" stroke="${C.gold}" stroke-width="4" stroke-linejoin="round"/></svg><div style="font-size:28px;color:${C.cr};line-height:1.5">不可逆操作前的最后确认：<br>全员核对，主刀签字，才下刀</div></div>`, 700, 370, 700);
    return { set(k, keys) {
      const at = reach(keys, k);
      sld.querySelector('.mw').style.opacity = at('score') ? 1 : 0;
      lanes.forEach(l => { tg(l, 'hide', !at('lanes')); l.style.opacity = at('lanes') ? (at(l.dataset.b) ? 1 : .4) : ''; });
      const drag = at('drag');
      sld.querySelector('.th').style.left = drag ? '45%' : '80%'; sld.querySelector('.thl').style.left = drag ? '45%' : '80%'; sld.querySelector('.thl').textContent = drag ? '0.45' : '0.80';
      tg(nolower, 'hide', !drag || at('rev'));
      tg(lanes[2], 'glow-or', drag && !at('rev'));
      tg(order, 'hide', !at('rev'));
      ois.forEach((o, i) => o.style.opacity = at('order') ? (i < 3 || at('last') ? 1 : .15) : at('rev') && i === 3 ? 1 : .15);
      tg(flag, 'hide', !at('flag'));
      if (at('flag')) { tg(nolower, 'hide', true); }
    } };
  }
};

/* 21 · FINALE — everything before runs and self-checks; you press one button */
V.finale = {
  title: '最后，<em>你只做一个决定</em>',
  build(root, api) {
    init(api);
    const b = box(root);
    const segs = [['① 检查', C.te2], ['② 图', C.or2], ['③ 写规则', C.gr]];
    const track = div(b, 'f', '', 0, 30, 1680, 150);
    track.innerHTML = `<div style="position:absolute;left:0;right:340px;top:62px;height:4px;background:linear-gradient(90deg,${C.te},${C.or},${C.gr});opacity:.6"></div>` +
      segs.map(([t, c], i) => `<div class="sg f" style="position:absolute;left:${i * 440}px;top:20px;width:380px;padding:16px 20px;border-radius:16px;border:2px solid ${c};background:rgba(14,22,38,.92);font-size:26px;color:${C.cr};opacity:.2">${t}<span class="mono" style="float:right;color:${c};font-size:20px">AUTO ✓</span></div>`).join('');
    const sgs = [...track.querySelectorAll('.sg')];
    const runner = div(b, 'f', '', 0, 85, 20, 20); runner.style.cssText += `;border-radius:50%;background:${C.gold};box-shadow:0 0 20px ${C.gold};transition:left 2.6s linear`;
    const btn = E('button', 'f hide', b); btn.style.cssText = `position:absolute;left:1380px;top:20px;width:300px;height:120px;border-radius:24px;background:${C.or};color:#1a0d03;font-size:34px;font-weight:800;box-shadow:0 0 0 6px rgba(232,100,27,.25),0 20px 60px rgba(232,100,27,.45)`;
    btn.innerHTML = '批准 ✓';
    btn.onclick = () => { btn.innerHTML = '已签字 ✓'; btn.style.background = C.gr; btn.animate([{ transform: 'scale(1)' }, { transform: 'scale(.94)' }, { transform: 'scale(1.04)' }, { transform: 'scale(1)' }], { duration: 500 }); };
    api.every(() => { if (!btn.classList.contains('hide')) btn.animate([{ boxShadow: '0 0 0 6px rgba(232,100,27,.25),0 20px 60px rgba(232,100,27,.45)' }, { boxShadow: '0 0 0 18px rgba(232,100,27,.05),0 20px 60px rgba(232,100,27,.45)' }], { duration: 1200 }); }, 1400);
    const acts = ['批准合并', '选哪些修复上线', '签下迁移'].map((t, i) => { const c = div(b, 'panel f hide dn', `<div class="mono" style="font-size:15px;color:${C.or2};letter-spacing:.12em">DECISION ${i + 1}</div><div style="font-size:32px;color:${C.cr};margin-top:8px">${t}</div>`, 160 + i * 470, 300, 420); c.style.padding = '22px 26px'; return c; });
    const one = div(b, 'f hide', `<div style="font-size:30px;color:${C.cr};text-align:center">每次运行 <b style="color:${C.or2};font-size:44px">1</b> 个决定 —— 就在错误<b style="color:${C.red}">无法撤销</b>的那个点上</div>`, 0, 220, 1680);
    return { set(k, keys) {
      const at = reach(keys, k);
      sgs.forEach(s => s.style.opacity = at('in') ? 1 : .2);
      runner.style.left = at('in') ? '1320px' : '0px';
      tg(btn, 'hide', !at('one')); tg(one, 'hide', !at('one') || at('acts'));
      acts.forEach(a => { tg(a, 'hide', !at('acts')); tg(a, 'dn', !at('acts')); });
    } };
  }
};

/* 22 · TAKEAWAY — five lines to carry out */
V.takeaway = {
  title: '带走<em>五句话</em>',
  build(root, api) {
    init(api);
    const b = box(root);
    const T = [['t1', '检查要能失败', '程序能判错的才算数'], ['t2', '数着东西停', '两轮无新发现就停；被拒的也记住'], ['t3', '测试每条箭头', '说不出传什么变量，就删'], ['t4', '失败只退一个单元', '再把原因写成规则'], ['t5', '按撤销难度开闸', '不可逆的那一步由人签字']];
    const cards = T.map(([bt, h, d], i) => { const c = div(b, 'panel f hide dn', `<div class="mono" style="font-size:54px;font-weight:800;color:transparent;-webkit-text-stroke:2px ${C.or2}">0${i + 1}</div><div style="font-size:30px;font-weight:700;color:${C.cr};margin-top:8px">${h}</div><div style="font-size:21px;color:${C.dim};margin-top:8px;line-height:1.5">${d}</div>`, i * 340, 40, 310, 380); c.style.padding = '26px 24px'; c.dataset.b = bt; return c; });
    return { set(k, keys) { const at = reach(keys, k); cards.forEach(c => { tg(c, 'hide', !at(c.dataset.b)); tg(c, 'dn', !at(c.dataset.b)); tg(c, 'glow-or', keys[k] === c.dataset.b); }); } };
  }
};

/* 23 · QUIZ — three questions, instant feedback, jump back to the chapter */
V.quiz = {
  title: '术后复盘：<em>三张关键片子</em>',
  build(root, api) {
    init(api);
    const b = box(root);
    api.quiz.forEach((q, qi) => {
      const c = div(b, 'panel', '', qi * 570, 0, 540, 560); c.style.padding = '22px 24px';
      c.innerHTML = `<div class="mono" style="font-size:16px;color:${C.or2};letter-spacing:.12em">REVIEW ${qi + 1} · 第 ${q.ch} 章</div><div style="font-size:25px;color:${C.cr};margin:8px 0 14px;line-height:1.45;min-height:72px">${q.q}</div>` +
        q.opts.map((o, i) => `<button data-i="${i}" style="display:block;width:100%;text-align:left;margin:8px 0;padding:12px 16px;border-radius:12px;border:1px solid var(--line);background:rgba(255,255,255,.03);font-size:21px;color:${C.cr};transition:.25s">${'ABCD'[i]}. ${o}</button>`).join('') +
        `<div class="why" style="font-size:19px;line-height:1.5;color:${C.dim};margin-top:10px;min-height:56px"></div><button class="rv tb" style="margin-top:6px;display:none">回看第 ${q.ch} 章 ↺</button>`;
      c.querySelectorAll('button[data-i]').forEach(btn => btn.onclick = e => {
        e.stopPropagation();
        const i = +btn.dataset.i, ok = i === q.a;
        c.querySelectorAll('button[data-i]').forEach(x => { x.style.borderColor = 'var(--line)'; x.style.background = 'rgba(255,255,255,.03)'; });
        btn.style.borderColor = ok ? C.gr : C.red; btn.style.background = ok ? 'rgba(73,217,138,.15)' : 'rgba(255,93,93,.12)';
        c.querySelector('.why').innerHTML = `<b style="color:${ok ? C.gr : C.red}">${ok ? '对，就是这一步' : '再看一眼'}</b>　${ok ? q.why : q.why.split('。')[0] + '。'}`;
        const rv = c.querySelector('.rv'); rv.style.display = ok ? 'none' : 'inline-block';
      });
      c.querySelector('.rv').onclick = e => { e.stopPropagation(); api.goChapter(q.ch); };
    });
    return { set() {} };
  }
};

/* 24 · HOMEWORK */
V.homework = {
  title: '课后作业：<em>拿你自己的流程练一遍</em>',
  build(root, api) {
    init(api);
    const b = box(root);
    const H = [['hw', '挑一个你每周都在跑的 AI 流程', '比如：文献初筛、周报汇总、病例资料整理'], ['h1', '给终点写一个程序能判失败的检查', '格式校验、必填字段、引用能打开'], ['h2', '画成图，给每条箭头写变量名', '说不出的就删 → 看看能并行几步'], ['h3', '标出撤销成本最高的一步', '只在那里签字，其余交给检查']];
    const rows = H.map(([bt, h, d], i) => { const r = div(b, 'panel f hide dn', `<div style="display:flex;gap:22px;align-items:center"><span class="ck mono" style="width:46px;height:46px;border-radius:12px;border:2px solid ${C.or2};display:flex;align-items:center;justify-content:center;font-size:24px;color:${C.or2}">${i ? i : '◎'}</span><div><div style="font-size:28px;color:${C.cr}">${h}</div><div style="font-size:20px;color:${C.dim};margin-top:4px">${d}</div></div></div>`, 160, i * 128, 1360); r.style.padding = '20px 26px'; r.dataset.b = bt; return r; });
    const cp = E('button', 'tb f hide', b); cp.style.position = 'absolute'; cp.style.left = '1540px'; cp.style.top = '0px'; cp.textContent = '复制作业';
    cp.onclick = e => { e.stopPropagation(); const t = H.map(([, h, d], i) => `${i ? i + '. ' : ''}${h}（${d}）`).join('\n'); (navigator.clipboard ? navigator.clipboard.writeText(t) : Promise.reject()).then(() => cp.textContent = '已复制 ✓').catch(() => cp.textContent = '复制失败'); };
    return { set(k, keys) { const at = reach(keys, k); rows.forEach(r => { tg(r, 'hide', !at(r.dataset.b)); tg(r, 'dn', !at(r.dataset.b)); }); tg(cp, 'hide', !at('h3')); } };
  }
};

/* 25 · SOURCES — what is the author's view, what we verified, what is course analogy */
V.sources = {
  title: '来源与核对',
  build(root, api) {
    init(api);
    const b = box(root);
    const S2 = [
      ['作者观点', 't-auth', '原文', `Hoodie <span class="mono">@HoodieFade_</span> · X · 2026-11-04 · <a href="${api.src.url}" target="_blank" rel="noopener">x.com/HoodieFade_/status/2117959235690524883</a>`],
      ['已核实', 't-ok', 'Anthropic · 2026-05-28', '动态工作流发布文：Bun 移植约 75 万行 Rust、11 天首次提交到合并、99.8% 原有测试通过'],
      ['已核实', 't-ok', 'Bun 官方 · 2026-07-08', '另一口径：535,496 行 Zig（不含注释）· 5/3→5/14 合并 · 6,778 次提交 · 合并前 100% 测试通过、0 跳过 · 合并后 19 个回归，均已修复。课里因此只说「约 75 万行」'],
      ['已核实', 't-ok', 'Claude Code 文档', '动态工作流：默认最多 16 个并发代理、每次运行最多 1,000 个'],
      ['有出入', 't-warn', 'Codex 文档', '可按角色设模型；子代理继承主会话的沙箱与权限（作者写“各自沙箱”）'],
      ['已核实', 't-ok', 'LangGraph', '1.0 于 2025-10 发布（GitHub 10-17，GA 公告 10-22），检查点持久化可重放；Claude Code 动态工作流为 2026-05-28 发布'],
      ['作者举例', 't-auth', '31 → 17 分钟', '说明关键路径的示例，非实测；分项分钟为本课示意'],
      ['课程类比', 't-ana', '骨折手术比喻', '术中透视、术前准备并行、器械护士岗位、翻修一枚螺钉、主刀签字等为本课添加，帮助理解，不是原文内容'],
    ];
    const list = div(b, 'panel f', '', 0, -20, 1680, 600); list.style.padding = '10px 26px';
    list.innerHTML = S2.map(([t, c, h, d], i) => `<div class="sr f" style="display:flex;gap:20px;align-items:baseline;padding:12px 0;border-top:${i ? '1px solid var(--line)' : '0'}"><span class="tag ${c}" style="width:110px;text-align:center">${t}</span><b style="width:300px;font-size:22px;color:${C.cr}">${h}</b><span style="flex:1;font-size:20px;color:${C.dim};line-height:1.45">${d}</span></div>`).join('') +
      `<div style="padding:12px 0;border-top:1px solid var(--line);font-size:18px;color:${C.dim2 || C.dim}">动画为 aiai 原创；各章「原文图」引自 Hoodie 原帖，版权归原作者，仅作课堂引用并链接原文。配音为 zh-CN-YunyangNeural 合成语音。</div>`;
    const rows = [...list.querySelectorAll('.sr')];
    const close = div(b, 'f hide', `<div style="font-size:52px;font-weight:800;color:${C.cr};text-align:center;line-height:1.35">人之所以只在最后一步签字，<br>是因为前面每一步<span style="color:${C.or2}">都能自己说「不」</span>。</div>`, 0, 160, 1680);
    return { set(k, keys) {
      const at = reach(keys, k);
      const cl = at('close');
      list.style.opacity = cl ? 0 : 1; tg(close, 'hide', !cl);
      rows.forEach((r, i) => r.style.opacity = at('src3') ? 1 : at('src2') ? ([0, 4, 5, 6].includes(i) ? 1 : .5) : at('src1') ? (i === 1 || i === 2 ? 1 : .5) : .5);
    } };
  }
};

/* 26 · STORY (v2.1 cold open) — eleven days of agents, one number decides the merge */
V.story = {
  title: '',
  build(root, api) {
    init(api);
    root.querySelector('.hd').style.display = 'none';
    const b = A.el('div', '', root); b.style.cssText = 'position:absolute;left:120px;top:150px;width:1680px;height:700px';
    const kick = div(b, 'mono f', 'BUN · 2026 年 5 月', 0, 0, 1680); kick.style.cssText += `;font-size:22px;letter-spacing:.24em;color:${C.gold}`;
    const head = div(b, 'f', `<span class="mono" style="color:${C.gold}">Zig</span> <span style="color:${C.dim};font-size:.7em">→</span> <span class="mono" style="color:${C.or2}">Rust</span>`, 0, 40, 1680);
    head.style.cssText += `;font-size:96px;font-weight:800;letter-spacing:.02em`;
    const gridW = 1680, gh = 150;
    const cv = E('canvas', 'f hide', b); cv.width = gridW; cv.height = gh; cv.style.position = 'absolute'; pos(cv, 0, 200);
    const g = cv.getContext('2d'); const cols = 112, rows = 13, cw = gridW / cols, ch = gh / rows; let flipped = 0, target = 0;
    const N = cols * rows;
    function draw() { g.clearRect(0, 0, gridW, gh); for (let i = 0; i < N; i++) { const x = (i % cols) * cw, y = ((i / cols) | 0) * ch; g.fillStyle = i < flipped ? C.or : 'rgba(242,177,52,.30)'; g.fillRect(x + 1, y + 1, cw - 2, ch - 2); } }
    draw();
    const day = div(b, 'f hide', '', 0, 400, 800);
    day.innerHTML = `<div class="mono" style="font-size:22px;letter-spacing:.2em;color:${C.dim}">AGENTS RUNNING</div><div style="font-size:84px;font-weight:800;color:${C.cr};margin-top:6px"><span class="mono dv">DAY 01</span></div>`;
    const loc = div(b, 'f hide', '', 820, 400, 860);
    loc.innerHTML = `<div class="mono" style="font-size:22px;letter-spacing:.2em;color:${C.dim}">LINES WRITTEN</div><div style="font-size:84px;font-weight:800;color:${C.or2};margin-top:6px">≈<span class="lv">0</span> 万行</div><div class="nr" style="font-size:30px;color:${C.dim};margin-top:4px;opacity:0;transition:opacity .8s">没有人读得完</div>`;
    const dv = day.querySelector('.dv'), lv = loc.querySelector('.lv'), nr = loc.querySelector('.nr');
    const big = div(b, 'f hide', `<div style="font-size:250px;line-height:1;font-weight:800;color:${C.gr};letter-spacing:-.02em;text-shadow:0 0 80px rgba(73,217,138,.35)">99.8%</div>
      <div style="font-size:44px;color:${C.cr};margin-top:18px">原有的测试，<b style="color:${C.gr}">照样通过</b></div>
      <div class="ck" style="display:inline-block;margin-top:34px;padding:14px 30px;border:2px solid ${C.te};border-radius:16px;font-size:30px;color:${C.te2};background:rgba(46,196,182,.08);opacity:0;transform:translateY(12px);transition:.8s var(--ease)">最后能说「不」的那道检查</div>`, 0, 150, 1680);
    big.style.textAlign = 'center';
    let d = 1, l = 0, run = false;
    api.every(() => {
      if (flipped < target) { flipped = Math.min(target, flipped + 11); draw(); }
      if (run) { if (d < 11) d += .06; if (l < 75) l += .42; dv.textContent = 'DAY ' + String(Math.min(11, Math.floor(d))).padStart(2, '0'); lv.textContent = Math.min(75, Math.round(l)); if (l >= 75) nr.style.opacity = 1; }
    }, 40);
    return { set(k, keys, instant) {
      const at = reach(keys, k);
      const s3 = at('s3');
      target = at('s1') ? N : 0; if (!at('s1')) { flipped = 0; draw(); }
      tg(cv, 'hide', !at('s1') || s3);
      tg(day, 'hide', !at('s2') || s3); tg(loc, 'hide', !at('s2') || s3);
      run = at('s2');
      if (instant && at('s2')) { d = 11; l = 75; flipped = N; draw(); }
      head.style.opacity = s3 ? '.0' : ''; kick.style.opacity = s3 ? '0' : '';
      tg(big, 'hide', !s3); big.style.transform = s3 ? 'none' : 'scale(.92)';
      const ck = big.querySelector('.ck');
      if (s3) api.later(() => { ck.style.opacity = 1; ck.style.transform = 'none'; }, instant ? 0 : 2600); else { ck.style.opacity = 0; ck.style.transform = 'translateY(12px)'; }
    } };
  }
};

/* 27 · ORIG — Hoodie's original infographic as a full reveal with a slow Ken Burns drift (whole image, never cropped) */
(window.LG_DATA && window.LG_DATA.origImages ? Object.keys(window.LG_DATA.origImages) : []).forEach(id => {
  const meta = window.LG_DATA.origImages[id];
  V['orig-' + id] = {
    title: '',
    build(root, api) {
      init(api);
      root.querySelector('.hd').style.display = 'none';
      const url = (api.src && api.src.url) || 'https://x.com/hoodiefade_/status/2117959235690524883';
      const W = 1000, H = 750;
      const fr = A.el('figure', 'orig', root);
      fr.style.cssText = `position:absolute;left:150px;top:118px;width:${W}px;height:${H}px;margin:0;border-radius:14px;overflow:hidden;background:#fff;box-shadow:0 30px 90px rgba(0,0,0,.55),0 0 0 1px rgba(244,234,215,.25);clip-path:inset(0 100% 0 0 round 14px);transition:clip-path 1.3s cubic-bezier(.7,0,.2,1)`;
      const im = A.el('img', '', fr); im.src = 'media/loop-graph-hoodie/' + id + '.webp'; im.alt = '原文图：' + meta.big;
      im.style.cssText = 'display:block;width:100%;height:100%;object-fit:contain;transform-origin:50% 50%';
      // Ken Burns on the whole frame: it scales as one card, so nothing inside is ever cropped
      const kb = fr.animate([{ transform: 'scale(1) translate(0,0)' }, { transform: 'scale(1.035) translate(-6px,-5px)' }], { duration: 16000, iterations: Infinity, direction: 'alternate', easing: 'ease-in-out' });
      const side = A.el('div', '', root);
      side.style.cssText = 'position:absolute;left:1220px;top:250px;width:580px;opacity:0;transform:translateX(24px);transition:opacity .9s .5s,transform .9s .5s var(--ease)';
      side.innerHTML = `<div class="mono" style="font-size:20px;letter-spacing:.22em;color:${C.gold}">原文图 · ORIGINAL</div>
        <div style="font-size:56px;font-weight:800;line-height:1.22;color:${C.cr};margin-top:18px">${meta.big}</div>
        <div style="font-size:30px;color:${C.or2};margin-top:20px;line-height:1.4">${meta.small}</div>
        <a href="${url}" target="_blank" rel="noopener" style="display:inline-block;margin-top:42px;font-size:22px;color:${C.dim};text-decoration:none;border-bottom:1px solid rgba(154,167,184,.5);padding-bottom:4px">原文图 · Hoodie @HoodieFade_ ↗</a>`;
      return { set(k, keys, instant) {
        const on = k >= 0;
        if (instant) { fr.style.transition = 'none'; side.style.transition = 'none'; }
        fr.style.clipPath = on ? 'inset(0 0 0 0 round 14px)' : 'inset(0 100% 0 0 round 14px)';
        side.style.opacity = on ? 1 : 0; side.style.transform = on ? 'none' : 'translateX(24px)';
        if (instant) requestAnimationFrame(() => { fr.style.transition = 'clip-path 1.3s cubic-bezier(.7,0,.2,1)'; side.style.transition = 'opacity .9s .5s,transform .9s .5s var(--ease)'; });
      } };
    }
  };
});
})();
