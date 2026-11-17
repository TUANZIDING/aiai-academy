/* Loop 与 Graph · 海边读本 v1.1 — 动态层：4 张据原文重绘的 SVG 动态示意 + AI 配图视差。
   进入视口才播放、离开即暂停；「风」按钮暂停全部；prefers-reduced-motion 只画静态终态。无外部依赖。 */
(() => {
  'use strict';
  const NS = 'http://www.w3.org/2000/svg';
  const root = document.documentElement;
  root.classList.add('js');
  const RM = window.matchMedia ? matchMedia('(prefers-reduced-motion: reduce)') : { matches: false };
  const C = {
    ink: '#1f2a33', ink2: '#46545f', mute: '#62707a', sea: '#2f6680', sea2: '#4f87a0', mist: '#e3edf2', mist2: '#eef4f6',
    sand: '#efe6d6', sand2: '#e4d6bd', wood: '#7c5f3f', line: '#cfc6b6', ok: '#2f7a5a', no: '#a5482f', amber: '#9a6d16',
    paper: '#fffdf9', okbg: '#e3f0e8', nobg: '#f7e4dd', ambg: '#f6ecd6', runbg: '#e6f0f5'
  };
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const seg = (t, a, b) => clamp((t - a) / (b - a), 0, 1);
  const ease = x => x < .5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
  const inR = (t, a, b) => t >= a && t < b;

  function E(tag, a, p) { const e = document.createElementNS(NS, tag); for (const k in a) e.setAttribute(k, a[k]); if (p) p.appendChild(e); return e; }
  function T(p, x, y, s, o = {}) {
    const t = E('text', Object.assign({ x, y, dy: '.35em', 'font-size': o.fs || 21, 'text-anchor': o.anchor || 'middle', fill: o.fill || C.ink, 'font-weight': o.fw || 400 }, o.a || {}), p);
    t.textContent = s; return t;
  }
  // text on a soft paper pill so edge labels stay readable over lines
  function L(p, x, y, s, o = {}) {
    const g = E('g', {}, p), fs = o.fs || 18;
    const w = Math.round([...s].reduce((n, ch) => n + (ch.charCodeAt(0) > 255 ? fs : fs * .58), 0) + 16);
    const r = E('rect', { x: x - w / 2, y: y - fs * .78, width: w, height: fs * 1.56, rx: fs * .78, fill: C.paper, stroke: o.stroke || 'none', 'stroke-width': 1.2 }, g);
    const t = T(g, x, y, s, { fs, fill: o.fill || C.mute, fw: o.fw || 500 });
    return { g, r, t };
  }
  function N(p, cx, cy, w, h, label, sub, o = {}) {
    const g = E('g', {}, p);
    const r = E('rect', { x: cx - w / 2, y: cy - h / 2, width: w, height: h, rx: o.rx || 12, fill: C.paper, stroke: C.sea2, 'stroke-width': 2 }, g);
    const t = T(g, cx, sub ? cy - 11 : cy, label, { fs: o.fs || 21, fw: 600 });
    const s = sub ? T(g, cx, cy + 14, sub, { fs: o.sfs || 18, fill: C.mute }) : null;
    return { g, r, t, s, cx, cy, w, h, st: '' };
  }
  const ST = {
    idle: [C.paper, C.sea2, C.ink], run: [C.runbg, C.sea, C.sea], ok: [C.okbg, C.ok, C.ok], no: [C.nobg, C.no, C.no],
    am: [C.ambg, C.amber, C.amber], dim: [C.paper, C.line, C.mute]
  };
  function set(n, st) {
    if (n.st === st) return; n.st = st; const [f, s, i] = ST[st];
    n.r.setAttribute('fill', f); n.r.setAttribute('stroke', s); n.t.setAttribute('fill', st === 'idle' ? C.ink : i);
    n.r.setAttribute('stroke-width', st === 'idle' || st === 'dim' ? 2 : 2.6);
  }
  function show(e, v) { const o = String(Math.round(clamp(v, 0, 1) * 100) / 100); if (e.getAttribute('opacity') !== o) e.setAttribute('opacity', o); }
  function defs(svg, key) {
    const d = E('defs', {}, svg);
    for (const [n, col] of [['s', C.sea2], ['k', C.sea], ['r', C.no], ['g', C.ok], ['m', C.line]]) {
      const m = E('marker', { id: key + '-' + n, viewBox: '0 0 10 10', refX: 8.5, refY: 5, markerWidth: 7, markerHeight: 7, orient: 'auto-start-reverse' }, d);
      E('path', { d: 'M0,0 L10,5 L0,10 z', fill: col }, m);
    }
  }
  function P(p, d, o = {}) {
    const e = E('path', { d, fill: 'none', stroke: o.stroke || C.sea2, 'stroke-width': o.w || 2.2, 'stroke-linecap': 'round' }, p);
    if (o.dash) e.setAttribute('stroke-dasharray', o.dash);
    if (o.m) e.setAttribute('marker-end', 'url(#' + o.m + ')');
    e._len = 0; return e;
  }
  function at(path, f) {
    if (!path._len) path._len = path.getTotalLength();
    const q = path.getPointAtLength(clamp(f, 0, 1) * path._len); return q;
  }
  function tok(p, col, r) { return E('circle', { r: r || 9, cx: 20, cy: 20, fill: col || C.sea, stroke: '#fff', 'stroke-width': 2.5, opacity: 0 }, p); }
  function place(c, path, f, op) { const q = at(path, f); c.setAttribute('cx', q.x.toFixed(1)); c.setAttribute('cy', q.y.toFixed(1)); show(c, op == null ? 1 : op); }
  function hide(c) { show(c, 0); }
  function bar(p, x, y, w, col) {
    E('rect', { x, y, width: w, height: 6, rx: 3, fill: C.mist }, p);
    const b = E('rect', { x, y, width: 0, height: 6, rx: 3, fill: col || C.sea }, p);
    return f => b.setAttribute('width', (w * clamp(f, 0, 1)).toFixed(1));
  }

  /* ---------- 1 · Loop 与天花板 ---------- */
  function loopDg(svg) {
    svg.setAttribute('viewBox', '0 0 600 716');
    defs(svg, 'dl');
    T(svg, 20, 28, '一个 loop：产出 → 检查 → 修正，直到变绿', { anchor: 'start', fw: 600 });
    const round = T(svg, 20, 60, '第 1 轮', { anchor: 'start', fs: 18, fill: C.mute });
    const s1 = P(svg, 'M172,141 C212,92 290,92 330,141', { m: 'dl-s' });
    const s2 = P(svg, 'M372,199 C372,262 352,290 317,290', { m: 'dl-s' });
    const s3 = P(svg, 'M183,290 C150,290 130,262 130,201', { m: 'dl-s' });
    const s4 = P(svg, 'M437,170 L493,170', { m: 'dl-s' });
    const Pn = N(svg, 130, 170, 132, 58, '产出', 'AI 干活');
    const K = N(svg, 370, 170, 132, 58, '检查', '能判不合格');
    const X = N(svg, 250, 290, 132, 58, '修正', '按失败原因改');
    const D = N(svg, 542, 170, 92, 58, '交付', null);
    const vNo = T(svg, 478, 236, '✗ 退出码 1：不合格', { fs: 18, fill: C.no, fw: 600 });
    const vOk = T(svg, 478, 236, '✓ 退出码 0：变绿', { fs: 18, fill: C.ok, fw: 600 });
    T(svg, 300, 348, '检查必须能判“不合格”；“没报错”不算检查', { fs: 18, fill: C.mute });
    const tk = tok(svg, C.sea);
    E('line', { x1: 20, y1: 384, x2: 580, y2: 384, stroke: C.line, 'stroke-dasharray': '3 6' }, svg);
    T(svg, 20, 414, '天花板：每一步都对，形状仍然错', { anchor: 'start', fw: 600 });
    T(svg, 20, 452, '串行：一次一格（虚线 = 不传数据的等待）', { anchor: 'start', fs: 18, fill: C.mute });
    const tA = T(svg, 580, 414, '用时 4 格', { anchor: 'end', fs: 18, fill: C.no, fw: 600 });
    const A = [], aBar = [];
    ['A', 'B', 'C', 'D'].forEach((l, i) => {
      const x = 75 + i * 150;
      if (i) P(svg, `M${x - 110},497 L${x - 44},497`, { dash: '4 6', stroke: C.line, m: 'dl-m' });
      A.push(N(svg, x, 497, 80, 44, l, null, { fs: 20 })); aBar.push(bar(svg, x - 40, 525, 80, C.sea2));
    });
    T(svg, 20, 566, '放进图里：拆分 → 三格同时跑 → 合并 → 闸门', { anchor: 'start', fs: 18, fill: C.mute });
    const tB = T(svg, 580, 566, '用时约 1 格', { anchor: 'end', fs: 18, fill: C.ok, fw: 600 });
    const Sp = N(svg, 62, 642, 84, 44, '拆分', null, { fs: 20 });
    const B = [], bBar = [];
    [604, 642, 680].forEach((y, i) => {
      P(svg, `M104,642 C135,642 135,${y} 163,${y}`, { m: 'dl-s' });
      P(svg, `M237,${y} C265,${y} 265,642 296,642`, { m: 'dl-s' });
      B.push(N(svg, 200, y, 72, 32, 'ABC'[i], null, { fs: 18, rx: 9 }));
    });
    P(svg, 'M382,642 L426,642', { m: 'dl-s' });
    const Mg = N(svg, 340, 642, 84, 44, '合并', null, { fs: 20 });
    const G = N(svg, 470, 642, 84, 44, '闸门', null, { fs: 20 });
    const gNote = T(svg, 470, 692, '你只批准这一步', { fs: 18, fill: C.sea, fw: 600 });
    const bb = bar(svg, 164, 700, 72, C.sea2); // shared parallel progress under ABC
    return {
      T: 11, end: 9.2,
      draw(t) {
        // cycle
        round.textContent = t < 5.2 ? '第 1 轮：先被判不合格' : '第 2 轮：修正后再查';
        let op = t > 10.3 ? 1 - seg(t, 10.3, 10.9) : 1;
        if (t < 1.2) place(tk, s1, ease(seg(t, .1, 1.2)), seg(t, 0, .2));
        else if (t < 2.2) place(tk, s1, 1);
        else if (t < 3.4) place(tk, s2, ease(seg(t, 2.2, 3.4)));
        else if (t < 4.0) place(tk, s2, 1);
        else if (t < 5.2) place(tk, s3, ease(seg(t, 4.0, 5.2)));
        else if (t < 6.4) place(tk, s1, ease(seg(t, 5.2, 6.4)));
        else if (t < 7.4) place(tk, s1, 1);
        else place(tk, s4, ease(seg(t, 7.4, 8.2)), op);
        tk.setAttribute('fill', inR(t, 1.8, 5.2) ? C.no : (t >= 6.9 ? C.ok : C.sea));
        set(Pn, inR(t, 0, .4) || inR(t, 4.9, 5.5) ? 'run' : 'idle');
        set(K, inR(t, 1.2, 1.8) || inR(t, 6.4, 6.9) ? 'run' : inR(t, 1.8, 5.2) ? 'no' : t >= 6.9 && t < 10.6 ? 'ok' : 'idle');
        set(X, inR(t, 3.4, 4.1) ? 'run' : 'idle');
        set(D, t >= 8.2 && t < 10.6 ? 'ok' : 'idle');
        show(vNo, inR(t, 1.8, 5.2) ? 1 : 0); show(vOk, t >= 6.9 ? op : 0);
        // ceiling
        A.forEach((n, i) => { const f = seg(t, i * 1.6, (i + 1) * 1.6); aBar[i](f); set(n, f >= 1 ? 'ok' : f > 0 ? 'run' : 'idle'); });
        show(tA, t >= 6.4 ? op : 0);
        const fb = seg(t, 0, 1.6); bb(fb);
        B.forEach(n => set(n, fb >= 1 ? 'ok' : fb > 0 ? 'run' : 'idle'));
        set(Sp, t < .3 ? 'run' : 'idle');
        set(Mg, inR(t, 1.6, 2.2) ? 'run' : t >= 2.2 ? 'ok' : 'idle');
        set(G, inR(t, 2.2, 3.0) ? 'run' : t >= 3.0 ? 'ok' : 'idle');
        show(tB, t >= 3.0 ? op : 0); show(gNote, t >= 3.0 ? 1 : .55);
        if (op < 1) [K, D, Mg, G, ...A, ...B].forEach(n => n.g.setAttribute('opacity', op.toFixed(2)));
        else [K, D, Mg, G, ...A, ...B].forEach(n => n.g.removeAttribute('opacity'));
      }
    };
  }

  /* ---------- 2 · 四种节点 ---------- */
  function nodesDg(svg) {
    svg.setAttribute('viewBox', '0 0 600 586');
    defs(svg, 'dn');
    T(svg, 20, 28, '四种节点：边上流动的，是叫得出名字的变量', { anchor: 'start', fw: 600 });
    const xs = [105, 300, 495];
    const e1 = xs.map(x => P(svg, `M300,130 C300,182 ${x},172 ${x},223`, { m: 'dn-s' }));
    const e2 = xs.map(x => P(svg, `M${x},287 C${x},340 300,330 300,378`, { m: 'dn-s' }));
    const e3 = P(svg, 'M300,442 L300,498', { m: 'dn-s' });
    const e4 = P(svg, 'M405,532 L447,532', { m: 'dn-s' });
    const S = N(svg, 300, 100, 236, 60, '拆分器 Splitter', '模型 · 每张图 1 个');
    const W = xs.map((x, i) => N(svg, x, 255, 164, 62, '工人 ' + (i + 1), '模型 · 独立上下文'));
    const wb = xs.map(x => bar(svg, x - 60, 294, 120, C.sea2));
    const Cn = N(svg, 300, 410, 260, 62, '代码节点 Code', '合并去重 · 0 token');
    const G = N(svg, 300, 532, 210, 62, '闸门 Gate', '能失败的检查');
    const O = N(svg, 506, 532, 112, 52, '交付', null);
    const l1 = [L(svg, 172, 176, '切片 1'), L(svg, 300, 178, '切片 2'), L(svg, 428, 176, '切片 3')];
    const l2 = [L(svg, 178, 342, '结果 1'), L(svg, 300, 344, '结果 2'), L(svg, 422, 342, '结果 3')];
    const l3 = L(svg, 386, 470, '合并清单');
    const gV = T(svg, 300, 553, '能失败的检查', { fs: 18, fill: C.mute });
    G.s.remove();
    const t1 = xs.map(() => tok(svg)), t2 = xs.map(() => tok(svg)), t3 = tok(svg), t4 = tok(svg, C.ok);
    const hl = (l, on) => { const c = on ? C.sea : C.mute; if (l.t.getAttribute('fill') !== c) { l.t.setAttribute('fill', c); l.r.setAttribute('stroke', on ? C.sea2 : 'none'); } };
    return {
      T: 9.4, end: 7.6,
      draw(t) {
        const op = t > 8.6 ? 1 - seg(t, 8.6, 9.3) : 1;
        set(S, t < .8 ? 'run' : t < 8.8 ? 'ok' : 'idle');
        xs.forEach((x, i) => {
          const a = .8 + i * .12, b = a + 1.1, f = seg(t, a, b);
          if (f > 0 && f < 1) place(t1[i], e1[i], ease(f)); else hide(t1[i]);
          hl(l1[i], f > 0 && f < 1 || inR(t, b, b + .4));
          const done = 3.0 + [.4, 0, .25][i], w = seg(t, 2.0, done);
          wb[i](t < 8.8 ? w : 0);
          set(W[i], t < 2.0 ? 'idle' : w < 1 ? 'run' : t < 8.8 ? 'ok' : 'idle');
          const g = seg(t, done, done + 1.0);
          if (g > 0 && g < 1) place(t2[i], e2[i], ease(g)); else hide(t2[i]);
          hl(l2[i], g > 0 && g < 1 || inR(t, done + 1, done + 1.4));
        });
        set(Cn, inR(t, 4.4, 5.0) ? 'run' : t >= 5.0 && t < 8.8 ? 'ok' : 'idle');
        const f3 = seg(t, 5.0, 5.7); if (f3 > 0 && f3 < 1) place(t3, e3, ease(f3)); else hide(t3);
        hl(l3, f3 > 0 && f3 < 1 || inR(t, 5.7, 6.2));
        set(G, inR(t, 5.7, 6.3) ? 'run' : t >= 6.3 && t < 8.8 ? 'ok' : 'idle');
        gV.textContent = t >= 6.3 && t < 8.8 ? '通过 ✓' : (inR(t, 5.7, 6.3) ? '检查中…' : '能失败的检查');
        gV.setAttribute('fill', t >= 6.3 && t < 8.8 ? C.ok : C.mute);
        const f4 = seg(t, 6.3, 6.9); if (f4 > 0 && f4 < 1) place(t4, e4, ease(f4)); else hide(t4);
        set(O, t >= 6.9 && t < 8.8 ? 'ok' : 'idle');
        svg._g.setAttribute('opacity', op.toFixed(2));
      }
    };
  }

  /* ---------- 3 · 两条回路 ---------- */
  function returnsDg(svg) {
    svg.setAttribute('viewBox', '0 0 600 486');
    defs(svg, 'dr');
    T(svg, 20, 28, '两条回路：短的修这一次，长的修以后每一次', { anchor: 'start', fw: 600 });
    const Y = 268, wy = [198, 268, 338];
    const learn = P(svg, `M545,240 C545,40 60,40 60,240`, { stroke: C.sea, w: 3, m: 'dr-k' });
    const corr = P(svg, `M430,296 C430,430 185,438 185,363`, { stroke: C.no, w: 2.6, dash: '7 7', m: 'dr-r' });
    const fw1 = wy.map(y => P(svg, `M108,${Y} C124,${Y} 118,${y} 133,${y}`, { m: 'dr-s' }));
    const fw2 = wy.map(y => P(svg, `M237,${y} C255,${y} 255,${Y} 271,${Y}`, { m: 'dr-s' }));
    const fm = P(svg, `M357,${Y} L386,${Y}`, { m: 'dr-s' });
    const fg = P(svg, `M472,${Y} L498,${Y}`, { m: 'dr-s' });
    const S = N(svg, 60, Y, 96, 56, '拆分器', null, { fs: 20 });
    const W = wy.map((y, i) => N(svg, 185, y, 104, 46, '工人 ' + (i + 1), null, { fs: 19 }));
    const M = N(svg, 315, Y, 84, 56, '合并', null, { fs: 20 });
    const G = N(svg, 430, Y, 84, 56, '闸门', null, { fs: 20 });
    const R = N(svg, 545, Y, 92, 56, '结果', null, { fs: 20 });
    const lLearn = T(svg, 300, 74, '学习边：结果变成约束，回到拆分器 · 修以后每一次', { fs: 18, fill: C.sea, fw: 600 });
    const lCorr = T(svg, 300, 462, '纠正边：只退回没过的那一个 · 修这一次', { fs: 18, fill: C.no, fw: 600 });
    const bG = L(svg, 430, 216, '工人 3 没过', { fill: C.no, stroke: C.no });
    const bK = L(svg, 300, 160, '工人 1、2 原样保留', { fill: C.ok, stroke: C.ok });
    const bS = L(svg, 60, 320, '+1 条约束', { fill: C.sea, stroke: C.sea2 });
    const bR = L(svg, 545, 320, '已接受', { fill: C.ok, stroke: C.ok });
    const t1 = wy.map(() => tok(svg)), t2 = wy.map(() => tok(svg)), tm = tok(svg), tg = tok(svg, C.ok), tc = tok(svg, C.no), tl = tok(svg, C.sea, 10);
    return {
      T: 15, end: 12.6, both: true,
      draw(t) {
        const op = t > 14.2 ? 1 - seg(t, 14.2, 14.9) : 1;
        // phase A: correction
        set(S, t < .5 ? 'run' : inR(t, 11.2, 14.4) ? 'run' : 'idle');
        wy.forEach((y, i) => {
          const f = seg(t, .3, 1.2); if (f > 0 && f < 1) place(t1[i], fw1[i], ease(f)); else hide(t1[i]);
          const g = seg(t, 2.2, 3.0); if (g > 0 && g < 1) place(t2[i], fw2[i], ease(g)); else hide(t2[i]);
        });
        set(W[0], inR(t, 1.2, 2.2) ? 'run' : t >= 2.2 && t < 14.4 ? 'ok' : 'idle');
        set(W[1], inR(t, 1.2, 2.2) ? 'run' : t >= 2.2 && t < 14.4 ? 'ok' : 'idle');
        set(W[2], inR(t, 1.2, 2.2) || inR(t, 6.0, 6.8) ? 'run' : inR(t, 4.4, 6.0) ? 'no' : t >= 2.2 && t < 14.4 ? 'ok' : 'idle');
        set(M, inR(t, 3.0, 3.4) || inR(t, 7.2, 7.4) ? 'run' : 'idle');
        const fM = seg(t, 3.4, 3.9), fM2 = seg(t, 7.2, 7.6), w3 = seg(t, 6.8, 7.2);
        if (w3 > 0 && w3 < 1) place(tm, fw2[2], ease(w3));
        else if (fM > 0 && fM < 1) place(tm, fm, ease(fM));
        else if (fM2 > 0 && fM2 < 1) place(tm, fm, ease(fM2));
        else hide(tm);
        set(G, inR(t, 3.9, 4.4) || inR(t, 7.6, 7.9) ? 'run' : inR(t, 4.4, 7.6) ? 'no' : inR(t, 7.9, 14.4) ? 'ok' : 'idle');
        show(bG.g, inR(t, 4.4, 7.6) ? 1 : 0);
        show(bK.g, inR(t, 4.4, 7.9) ? 1 : 0);
        const fc = seg(t, 4.6, 6.0); if (fc > 0 && fc < 1) place(tc, corr, ease(fc)); else hide(tc);
        const A = inR(t, 3.9, 7.9);
        // phase B: learning
        const fr = seg(t, 8.0, 8.6); if (fr > 0 && fr < 1) place(tg, fg, ease(fr)); else hide(tg);
        set(R, inR(t, 8.6, 14.4) ? 'ok' : 'idle'); show(bR.g, inR(t, 8.6, 14.4) ? op : 0);
        const fl = seg(t, 8.8, 11.2); if (fl > 0 && fl < 1) place(tl, learn, ease(fl)); else hide(tl);
        show(bS.g, inR(t, 11.2, 15) ? op : 0);
        const B = inR(t, 8.6, 14.4);
        const both = this._static;
        show(corr, both || A ? 1 : .35); show(lCorr, both || A ? 1 : .45);
        show(learn, both || B ? 1 : .35); show(lLearn, both || B ? 1 : .45);
        corr.setAttribute('stroke-width', A ? 3.2 : 2.6); learn.setAttribute('stroke-width', B ? 3.6 : 3);
      }
    };
  }

  /* ---------- 4 · 按爆炸半径开闸 ---------- */
  function gateDg(svg) {
    svg.setAttribute('viewBox', '0 0 600 506');
    T(svg, 20, 28, '按爆炸半径开闸，不按置信度', { anchor: 'start', fw: 600 });
    const lanes = [
      { c: 115, col: C.ok, bg: C.okbg, name: '① 可逆且局限 · 先开', note: '坏了回滚一次' },
      { c: 245, col: C.amber, bg: C.ambg, name: '② 可逆但影响广 · 凭证据开', note: '' },
      { c: 375, col: C.no, bg: C.nobg, name: '③ 难以撤销 · 保持关闭', note: '不论分数' }
    ];
    const GX = 400;
    lanes.forEach(l => {
      E('rect', { x: 10, y: l.c - 52, width: 580, height: 104, rx: 16, fill: l.bg, opacity: .72 }, svg);
      T(svg, 26, l.c - 28, l.name, { anchor: 'start', fs: 19, fw: 600, fill: l.col });
      if (l.note) T(svg, 578, l.c - 28, l.note, { anchor: 'end', fs: 18, fill: l.col });
      E('line', { x1: 30, y1: l.c + 16, x2: 572, y2: l.c + 16, stroke: l.col, 'stroke-opacity': .35, 'stroke-width': 2, 'stroke-dasharray': '2 8', 'stroke-linecap': 'round' }, svg);
      E('rect', { x: GX - 16, y: l.c - 10, width: 6, height: 52, rx: 3, fill: C.wood, opacity: .7 }, svg);
      E('rect', { x: GX + 10, y: l.c - 10, width: 6, height: 52, rx: 3, fill: C.wood, opacity: .7 }, svg);
      l.door = E('rect', { x: GX - 8, y: l.c - 8, width: 16, height: 48, rx: 4, fill: l.col }, svg);
    });
    const item = (col) => E('rect', { width: 26, height: 26, rx: 7, x: 20, y: 20, fill: col, stroke: '#fff', 'stroke-width': 2 }, svg);
    const L1 = [0, 1, 2].map(() => item(C.ok));
    const L2 = item(C.amber), L3 = item(C.no);
    const c1 = L(svg, 396, lanes[1].c - 28, '确定性检查 ✓', { fill: C.amber, stroke: C.amber });
    const c2 = L(svg, 528, lanes[1].c - 28, '轨迹干净 ✓', { fill: C.amber, stroke: C.amber });
    const tag3 = L(svg, 330, lanes[2].c - 28, '自评 98%', { fill: C.no, stroke: C.no });
    const H = N(svg, 520, lanes[2].c + 16, 112, 44, '人来批准', null, { fs: 19 });
    T(svg, 300, 448, '看证据的顺序', { fs: 18, fill: C.mute, fw: 600 });
    T(svg, 300, 480, '确定性结果 → 轨迹 → 回滚历史 → 模型自评（最后）', { fs: 18, fill: C.ink2 });
    const pos = (r, x, c, o) => { r.setAttribute('x', (x - 13).toFixed(1)); r.setAttribute('y', c + 3); show(r, o); };
    const fadeX = x => clamp(Math.min((x - 30) / 50, (566 - x) / 50), 0, 1);
    const door = (l, f) => { l.door.setAttribute('height', (48 - 40 * f).toFixed(1)); show(l.door, 1 - .55 * f); };
    return {
      T: 10, end: 5.8,
      draw(t) {
        door(lanes[0], 1);
        L1.forEach((r, k) => { const x = 30 + ((t * 62 + k * 190) % 570); pos(r, x, lanes[0].c, fadeX(x)); });
        // lane 2: wait for evidence, then open
        const a = lanes[1].c;
        let x2 = t < 2.5 ? 30 + 340 * ease(seg(t, 0, 2.5)) : t < 4.6 ? 370 : 370 + 196 * ease(seg(t, 4.6, 6.4));
        pos(L2, x2, a, t < 6.4 ? fadeX(Math.max(x2, 80)) * (t < .3 ? seg(t, 0, .3) : 1) : 0);
        show(c1.g, inR(t, 2.5, 7.5) ? Math.min(seg(t, 2.5, 2.9), 1 - seg(t, 7, 7.5)) : 0);
        show(c2.g, inR(t, 3.3, 7.5) ? Math.min(seg(t, 3.3, 3.7), 1 - seg(t, 7, 7.5)) : 0);
        door(lanes[1], t < 4.1 ? 0 : t < 6.4 ? ease(seg(t, 4.1, 4.6)) : 1 - ease(seg(t, 6.4, 7)));
        // lane 3: confident, still closed → human
        const b = lanes[2].c;
        const x3 = 30 + 340 * ease(seg(t, .5, 3));
        pos(L3, x3, b, t < 8.6 ? (t < .8 ? seg(t, .5, .8) : 1) : 1 - seg(t, 8.6, 9.4));
        show(tag3.g, inR(t, 3, 9.4) ? Math.min(seg(t, 3, 3.4), 1 - seg(t, 8.6, 9.4)) : 0);
        tag3.g.setAttribute('transform', `translate(${(x3 - 370).toFixed(1)},0)`);
        door(lanes[2], 0);
        const glow = inR(t, 3, 5) ? .5 + .5 * Math.sin((t - 3) * Math.PI * 2) : 1;
        lanes[2].door.setAttribute('opacity', (.7 + .3 * glow).toFixed(2));
        set(H, inR(t, 5, 9.4) ? 'run' : 'idle');
      }
    };
  }

  const BUILD = { loop: loopDg, nodes: nodesDg, returns: returnsDg, gate: gateDg };
  const items = [];
  document.querySelectorAll('.fig.anim[data-dg]').forEach(fig => {
    const host = fig.querySelector('.dg'); const fn = BUILD[fig.dataset.dg]; if (!host || !fn) return;
    const svg = E('svg', { role: 'img', 'aria-label': host.getAttribute('data-label') || '动态示意图', preserveAspectRatio: 'xMidYMid meet' });
    host.appendChild(svg);
    const g = E('g', {}, svg); svg._g = g;
    // build into the group so a whole-diagram fade is one attribute
    const proxy = new Proxy(svg, { get(o, k) { if (k === 'appendChild') return n => g.appendChild(n); if (k === 'setAttribute') return (a, v) => o.setAttribute(a, v); const v = o[k]; return typeof v === 'function' ? v.bind(o) : v; } });
    let d;
    try { d = fn(proxy); } catch (e) { host.classList.add('fail'); return; }
    const it = { fig, svg, d, t: 0, vis: false };
    items.push(it);
    try { d._static = false; d.draw(d.end); } catch (e) { /* first paint */ }
  });

  function staticAll() { items.forEach(it => { it.d._static = true; it.d.draw(it.d.end); }); }
  const calm = () => root.classList.contains('calm');
  let raf = 0, last = 0;
  function frame(now) {
    raf = 0;
    const dt = last ? Math.min(.05, (now - last) / 1000) : 0; last = now;
    let any = false;
    for (const it of items) {
      if (!it.vis) continue; any = true;
      it.t = (it.t + dt) % it.d.T; it.d._static = false; it.d.draw(it.t);
    }
    parallax();
    if (any || pxVis.size) kick();
  }
  function kick() { if (!raf && !RM.matches && !calm() && !document.hidden) { raf = requestAnimationFrame(frame); } }
  function stop() { if (raf) cancelAnimationFrame(raf); raf = 0; last = 0; }

  // AI photos: slow parallax drift (wrapper) — zoom & shimmer live in CSS
  const pxEls = [...document.querySelectorAll('.divider .px')];
  const pxVis = new Set();
  function parallax() {
    const h = innerHeight;
    pxVis.forEach(el => {
      const r = el.parentNode.getBoundingClientRect();
      const k = clamp((r.top + r.height / 2 - h / 2) / h, -1, 1);
      el.style.transform = `translate3d(0,${(k * -16).toFixed(1)}px,0)`;
    });
  }

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(es => {
      es.forEach(e => {
        const el = e.target;
        if (el.classList.contains('fig')) {
          const it = items.find(i => i.fig === el); if (!it) return;
          if (e.isIntersecting && !it.vis) { it.vis = true; if (!it.started) { it.started = true; it.t = 0; } }
          else if (!e.isIntersecting) it.vis = false;
        } else {
          el.classList.toggle('off', !e.isIntersecting);
          const px = el.querySelector('.px'); if (px) { if (e.isIntersecting) pxVis.add(px); else pxVis.delete(px); }
        }
      });
      if (RM.matches) staticAll(); else { last = 0; kick(); }
    }, { rootMargin: '60px 0px', threshold: 0.12 });
    items.forEach(it => io.observe(it.fig));
    document.querySelectorAll('.hero figure, .divider').forEach(el => io.observe(el));
  } else { items.forEach(it => it.vis = true); pxEls.forEach(p => pxVis.add(p)); kick(); }

  if (RM.matches) staticAll();
  (RM.addEventListener ? RM.addEventListener.bind(RM, 'change') : (f => RM.addListener && RM.addListener(f)))(() => { if (RM.matches) { stop(); staticAll(); pxEls.forEach(p => p.style.transform = ''); } else kick(); });
  new MutationObserver(() => { if (calm()) stop(); else { last = 0; kick(); } }).observe(root, { attributes: true, attributeFilter: ['class'] });
  document.addEventListener('visibilitychange', () => { if (document.hidden) stop(); else { last = 0; kick(); } });
  addEventListener('scroll', () => { if (!raf && pxVis.size && !RM.matches && !calm()) requestAnimationFrame(parallax); }, { passive: true });

  // 看原图 toggle: images inside are lazy; nothing else needed. Expose for QA.
  window.__seaside = { items: () => items.map(i => ({ dg: i.fig.dataset.dg, t: +i.t.toFixed(2), vis: i.vis })), running: () => !!raf };
})();
