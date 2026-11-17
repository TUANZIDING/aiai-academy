/* 医学科研大模型选型榜 v1.0 —— 图表、筛选、用途卡片、3D 头图懒加载。图表数值取自 2026-11-16 证据文件，2026-11-17 对照一手来源复核。 */
(function () {
  'use strict';
  var RM = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (id) { return document.getElementById(id); };
  var VC = { openai: '#0d8a6a', anthropic: '#c05a33', google: '#2f6fd0' };
  var DOT = { openai: 'd-oa', anthropic: 'd-an', google: 'd-go' };
  var IO = 'IntersectionObserver' in window;
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function onView(el, fn, th) {
    if (!el) return;
    if (!IO || RM) { fn(); return; }
    var o = new IntersectionObserver(function (es) { if (es[0].isIntersecting) { o.disconnect(); fn(); } }, { threshold: th == null ? 0.2 : th });
    o.observe(el);
  }

  // ---------- 阅读进度 + 章节高亮 ----------
  var prog = $('prog');
  addEventListener('scroll', function () { var h = document.documentElement; prog.style.width = (h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight) * 100) + '%'; }, { passive: true });
  var navA = {}; document.querySelectorAll('.links a').forEach(function (a) { navA[a.getAttribute('href').slice(1)] = a; });
  if (IO) {
    var spy = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        for (var k in navA) navA[k].classList.toggle('on', k === e.target.id);
        var a = navA[e.target.id]; if (a && innerWidth < 900) a.parentNode.scrollTo({ left: a.offsetLeft - 40, behavior: RM ? 'auto' : 'smooth' });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    document.querySelectorAll('main>section[id]').forEach(function (s) { spy.observe(s); });
    var rv = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); rv.unobserve(e.target); } }); }, { threshold: 0.12 });
    document.querySelectorAll('.rv').forEach(function (el) { RM ? el.classList.add('in') : rv.observe(el); });
  } else document.querySelectorAll('.rv').forEach(function (el) { el.classList.add('in'); });

  // ---------- 涨价倒计时（按北京时间 2026-12-01 00:00） ----------
  (function () {
    var end = Date.parse('2026-12-01T00:00:00+08:00'), d = Math.ceil((end - Date.now()) / 864e5), el = $('cd');
    if (!el) return;
    el.textContent = d > 0 ? '距涨价约 ' + d + ' 天' : '促销期已过：请按 $4 / $20 标价复核';
  })();

  // ---------- 横条图（HTML） ----------
  // rows: [{label, v, star, vals:[{x, tag, conf}], ci:[lo,hi], note}]
  function bars(el, rows, o) {
    if (!el) return;
    var max = o.max, fmt = o.fmt || function (x) { return x + '%'; };
    el.innerHTML = rows.map(function (r) {
      var b = r.vals.map(function (v, j) {
        var s = Math.max(0.01, v.x / max), inside = s > 0.8;
        var ci = (j === 0 && r.ci) ? '<i class="hci" style="left:' + (r.ci[0] / max * 100) + '%;width:' + ((r.ci[1] - r.ci[0]) / max * 100) + '%"></i>' : '';
        return '<div class="hbar' + (v.conf ? ' conf' : '') + '"><i class="hfill" style="--s:' + s.toFixed(4) + ';background-color:' + VC[r.v] + '"></i>' + ci +
          '<b class="hval' + (inside ? ' inside' : '') + '" style="left:' + ((j === 0 && r.ci ? r.ci[1] / max : s) * 100).toFixed(2) + '%" data-x="' + v.x + '">' + esc(fmt(v.x)) + '</b></div>' + (v.tag ? '<span class="hnote htag">↑ ' + esc(v.tag) + (v.conf ? '（冲突值）' : '') + '</span>' : '');
      }).join('');
      return '<div class="hrow"><div class="hlab"><i class="dot ' + DOT[r.v] + '"></i><span>' + esc(r.label) + '</span>' + (r.star ? '<em class="st">★</em>' : '') + '</div>' +
        '<div class="hbars">' + b + (r.note ? '<span class="hnote">' + esc(r.note) + '</span>' : '') + '</div></div>';
    }).join('');
    onView(el, function () { el.classList.add('in'); countVals(el); }, 0.25);
  }
  function countVals(el) {
    if (RM) return;
    el.querySelectorAll('.hval').forEach(function (b) {
      var x = parseFloat(b.dataset.x), first = b.firstChild; if (!first || first.nodeType !== 3) return;
      var txt = first.nodeValue, num = (txt.match(/^[\d.]+/) || [''])[0], dec = (num.split('.')[1] || '').length, t0 = null;
      var suffix = txt.slice(num.length);
      function f(t) { t0 = t0 || t; var p = Math.min(1, (t - t0) / 1100), e = 1 - Math.pow(1 - p, 3); first.nodeValue = (x * e).toFixed(dec) + suffix; if (p < 1) requestAnimationFrame(f); else first.nodeValue = txt; }
      requestAnimationFrame(f);
    });
  }

  bars($('chHealth'), [
    { label: 'Fable 5.2', v: 'anthropic', star: 1, vals: [{ x: 67.7, tag: 'AA' }], note: 'AA 独立运行居首' },
    { label: 'GPT-6 Astra', v: 'openai', star: 1, vals: [{ x: 66.0, tag: 'AA' }, { x: 70.3, tag: 'Anthropic 运行', conf: 1 }, { x: 64.7, tag: 'OpenAI 系统卡', conf: 1 }], note: '三个值并列' },
    { label: 'GPT-6.1 Sol', v: 'openai', vals: [{ x: 65.1, tag: 'AA' }, { x: 64.2, tag: 'OpenAI', conf: 1 }] },
    { label: 'Sonnet 5.5', v: 'anthropic', vals: [{ x: 63.0, tag: 'AA' }, { x: 69.2, tag: 'Anthropic 自测', conf: 1 }] },
    { label: 'Opus 5.5', v: 'anthropic', vals: [{ x: 59.9, tag: 'AA' }, { x: 65.6, tag: 'Anthropic 自测', conf: 1 }] },
    { label: 'GPT-6.1 Terra', v: 'openai', vals: [{ x: 62.7 }] },
    { label: 'GPT-5.6 Sol', v: 'openai', vals: [{ x: 60.5 }] },
    { label: 'Fable 5.1', v: 'anthropic', vals: [{ x: 57.8 }, { x: 62.1, tag: 'Sonnet 5.5 系统卡', conf: 1 }], note: '冲突：两个值并列' },
    { label: 'GPT-5.5', v: 'openai', vals: [{ x: 51.8, tag: '系统卡' }, { x: 49.5, tag: '发布表', conf: 1 }], note: '冲突：两个值并列' }
  ], { max: 100, fmt: function (x) { return x.toFixed(1) + '%'; } });

  bars($('chBio'), [
    { label: 'GPT-6 Astra', v: 'openai', star: 1, vals: [{ x: 66.7 }], ci: [60.3, 73.1], note: '95% CI 60.3–73.1%' },
    { label: 'GPT-6.1 Sol', v: 'openai', vals: [{ x: 62.0 }], ci: [55.6, 68.4], note: '95% CI 55.6–68.4%' },
    { label: 'GPT-5.6 Sol', v: 'openai', vals: [{ x: 43.8 }] },
    { label: 'GPT-6 Luna', v: 'openai', vals: [{ x: 38.3 }] }
  ], { max: 100, fmt: function (x) { return x.toFixed(1) + '%'; } });

  bars($('chHal'), [
    { label: 'Gemini 4 Argon', v: 'google', vals: [{ x: 4.3 }], note: '最低档（high）' },
    { label: 'Gemini 4 Carbon', v: 'google', star: 1, vals: [{ x: 11.4 }], note: 'high 档；正确率 58%' },
    { label: 'GPT-6 Astra', v: 'openai', star: 1, vals: [{ x: 49.8 }], note: '正确率 62%' },
    { label: 'Opus 5.5', v: 'anthropic', vals: [{ x: 50.3 }] },
    { label: 'Fable 5.2', v: 'anthropic', star: 1, vals: [{ x: 59.3 }], note: '正确率 79%' }
  ], { max: 100, fmt: function (x) { return x.toFixed(1) + '%'; } });

  // ---------- AA Index：先按厂商顺序生长，再“赛跑”到名次 ----------
  (function () {
    var el = $('chAA'); if (!el) return;
    var rows = [
      { label: 'Fable 5.2', v: 'anthropic', star: 1, x: 65, note: '$26.54/任务 · 约 41 分钟' },
      { label: 'Gemini 4 Carbon', v: 'google', star: 1, x: 60, note: '$5.48/任务（促销价计）· 约 32 分钟' },
      { label: 'Opus 5.5', v: 'anthropic', x: 59, note: '$10.04/任务' },
      { label: 'GPT-6 Astra', v: 'openai', star: 1, x: 57, note: '$6.24/任务 · 约 20 分钟' },
      { label: 'Sonnet 5.5', v: 'anthropic', x: 55, note: '$10.02/任务' },
      { label: 'GPT-6.1 Sol', v: 'openai', x: 55, note: '$1.27/任务' },
      { label: 'Gemini 4 Hydrogen', v: 'google', x: 51, note: '$1.87/任务 · 约 8 分钟' },
      { label: 'GPT-6.1 Terra', v: 'openai', x: 51, note: '$0.96/任务' },
      { label: 'Gemini 4 Argon', v: 'google', x: 50, note: '$4.97/任务' }
    ];
    var start = [3, 5, 8, 0, 2, 4, 1, 6, 7]; // 起跑顺序：OpenAI → Anthropic → Google
    var RH = 44, max = 70;
    el.style.position = 'relative'; el.style.height = (rows.length * RH) + 'px'; el.style.display = 'block';
    el.innerHTML = rows.map(function (r, i) {
      var s = r.x / max;
      return '<div class="hrow" style="position:absolute;left:0;right:0;top:0;transform:translateY(' + (start.indexOf(i) * RH) + 'px)" data-rank="' + i + '">' +
        '<div class="hlab"><i class="dot ' + DOT[r.v] + '"></i><span>' + esc(r.label) + '</span>' + (r.star ? '<em class="st">★</em>' : '') + '</div>' +
        '<div class="hbars"><div class="hbar"><i class="hfill" style="--s:' + s.toFixed(4) + ';background-color:' + VC[r.v] + '"></i><b class="hval" style="left:' + (s * 100).toFixed(2) + '%" data-x="' + r.x + '">' + r.x + '</b></div><span class="hnote">' + esc(r.note) + '</span></div></div>';
    }).join('');
    function measure() {
      var mh = 0; el.querySelectorAll('.hrow').forEach(function (row) { mh = Math.max(mh, row.offsetHeight); });
      RH = Math.max(40, mh + 8); el.style.height = (rows.length * RH) + 'px';
    }
    var settled = false;
    function lay() { el.querySelectorAll('.hrow').forEach(function (row, i) { row.style.transform = 'translateY(' + ((settled ? +row.dataset.rank : start.indexOf(i)) * RH) + 'px)'; }); }
    function settle() { settled = true; lay(); }
    measure(); lay();
    addEventListener('resize', function () { measure(); lay(); }, { passive: true });
    if (RM) { settle(); el.classList.add('in'); return; }
    onView(el, function () { el.classList.add('in'); countVals(el); setTimeout(settle, 1250); }, 0.3);
  })();

  // ---------- 价格 vs AA Index 散点 ----------
  (function () {
    var el = $('chScatter'); if (!el) return;
    var P = [
      { n: 'Fable 5.2', v: 'anthropic', star: 1, aa: 65, out: 40, task: 26.54 },
      { n: 'Gemini 4 Carbon', v: 'google', star: 1, aa: 60, out: 10, task: 5.48 },
      { n: 'Opus 5.5', v: 'anthropic', aa: 59, out: 20, task: 10.04 },
      { n: 'GPT-6 Astra', v: 'openai', star: 1, aa: 57, out: 50, task: 6.24 },
      { n: 'Sonnet 5.5', v: 'anthropic', aa: 55, out: 10, task: 10.02, win: 1 },
      { n: 'GPT-6.1 Sol', v: 'openai', aa: 55, out: 10, task: 1.27, win: 1 },
      { n: 'Gemini 4 Hydrogen', v: 'google', aa: 51, out: 7.5, task: 1.87, win: 1 },
      { n: 'Gemini 4 Argon', v: 'google', aa: 50, out: 10, task: 4.97 },
      { n: 'GPT-6.1 Terra', v: 'openai', aa: 51, out: 5, task: 0.96 }
    ];
    // 标签朝向（避免重叠）：[输出价模式, 每任务成本模式]，1=右，-1=左
    var SIDE = { 'Sonnet 5.5': [1, 1], 'GPT-6.1 Sol': [-1, 1], 'Gemini 4 Carbon': [1, -1], 'Gemini 4 Argon': [1, 1], 'Gemini 4 Hydrogen': [1, 1], 'Fable 5.2': [-1, -1], 'GPT-6 Astra': [-1, 1], 'Opus 5.5': [1, 1], 'GPT-6.1 Terra': [1, 1] };
    var DY = { 'Gemini 4 Hydrogen': [-14, 0], 'GPT-6.1 Terra': [16, 16] };
    var W = 760, H = 340, L = 46, R = 24, T = 16, B = 44;
    var AX = { out: { lo: 4, hi: 60, ticks: [5, 10, 20, 50], lab: '输出标价 $/1M（对数）' }, task: { lo: 0.8, hi: 32, ticks: [1, 2, 5, 10, 20], lab: 'AA 每任务成本 $（对数）' } };
    var ylo = 45, yhi = 67;
    function X(mode, x) { var a = AX[mode]; return L + (Math.log(x) - Math.log(a.lo)) / (Math.log(a.hi) - Math.log(a.lo)) * (W - L - R); }
    function Y(a) { return T + (1 - (a - ylo) / (yhi - ylo)) * (H - T - B); }
    var mode = 'out';
    function axes() {
      var a = AX[mode], s = '';
      [50, 55, 60, 65].forEach(function (v) { s += '<line class="ax" x1="' + L + '" x2="' + (W - R) + '" y1="' + Y(v) + '" y2="' + Y(v) + '"/><text class="tk" x="' + (L - 8) + '" y="' + (Y(v) + 4) + '" text-anchor="end">' + v + '</text>'; });
      a.ticks.forEach(function (t) { var x = X(mode, t); s += '<line class="ax" x1="' + x + '" x2="' + x + '" y1="' + T + '" y2="' + (H - B) + '"/><text class="tk" x="' + x + '" y="' + (H - B + 16) + '" text-anchor="middle">$' + t + '</text>'; });
      s += '<text class="al" x="' + (W - R) + '" y="' + (H - 6) + '" text-anchor="end">' + a.lab + ' →</text><text class="al" x="' + L + '" y="' + (T - 4) + '">AA Index ↑</text>';
      return s;
    }
    el.innerHTML = '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="9 款模型的价格与 AA Index 散点图"><g id="scAx">' + axes() + '</g>' +
      P.map(function (p, i) {
        var r = p.star ? 8 : 6.5;
        return '<g class="pt' + (p.win ? ' win' : '') + '" data-i="' + i + '" style="opacity:0"><circle class="halo" r="' + (r + 7) + '"/><circle r="' + r + '" fill="' + VC[p.v] + '"' + (p.star ? ' stroke="#1d1d1f" stroke-width="1.5"' : '') + '/><text y="4">' + (p.star ? '★ ' : '') + esc(p.n) + '</text><title>' + esc(p.n + ' · AA Index ' + p.aa + ' · 输出价 $' + p.out + '/1M' + (p.task != null ? ' · $' + p.task + '/任务' : ' · 每任务成本未找到')) + '</title></g>';
      }).join('') + '</svg>';
    var g = el.querySelectorAll('.pt');
    function place(first) {
      $('scAx').innerHTML = axes();
      var miss = [];
      P.forEach(function (p, i) {
        var x = mode === 'out' ? p.out : p.task, gi = g[i], t = gi.querySelector('text');
        if (x == null) { gi.classList.add('hide'); miss.push(p.n); return; }
        gi.classList.remove('hide');
        var side = (SIDE[p.n] || [1, 1])[mode === 'out' ? 0 : 1];
        t.setAttribute('x', side * (p.star ? 13 : 11)); t.setAttribute('text-anchor', side > 0 ? 'start' : 'end'); t.setAttribute('y', 4 + (DY[p.n] || [0, 0])[mode === 'out' ? 0 : 1]);
        gi.style.transform = 'translate(' + X(mode, x).toFixed(1) + 'px,' + Y(p.aa).toFixed(1) + 'px)';
        if (!first) gi.style.opacity = '';
      });
      $('scNa').textContent = mode === 'task' ? (miss.length ? '每任务成本未找到：' + miss.join('、') + '。' : '') + 'Carbon / Argon 按促销价计（标价下约翻倍）。' : 'Carbon / Argon 的 $10 为促销输出价，12-01 起 $20。';
    }
    place(true);
    function reveal() { g.forEach(function (gi, i) { setTimeout(function () { if (!gi.classList.contains('hide')) gi.style.opacity = ''; }, RM ? 0 : i * 90); }); }
    onView(el, reveal, 0.3);
    document.querySelectorAll('#scWrap [data-x]').forEach(function (b) {
      b.addEventListener('click', function () {
        mode = b.dataset.x;
        document.querySelectorAll('#scWrap [data-x]').forEach(function (x) { x.setAttribute('aria-pressed', x === b); });
        place(false);
      });
    });
  })();

  // ---------- 一眼结论：数字滚动 ----------
  document.querySelectorAll('#verdict .vcard').forEach(function (c, i) {
    var big = c.querySelector('.big'); if (!big) return;
    var txt = big.textContent.trim(), m = txt.match(/^([\d.]+)(.*)$/); if (!m) return;
    var x = parseFloat(m[1]), dec = (m[1].split('.')[1] || '').length, suf = m[2];
    if (RM || !IO) return;
    c.style.setProperty('--p', 0); big.textContent = (0).toFixed(dec) + suf;
    onView(c, function () {
      setTimeout(function () {
        c.style.setProperty('--p', 1);
        var t0 = null;
        function f(t) { t0 = t0 || t; var p = Math.min(1, (t - t0) / 1200), e = 1 - Math.pow(1 - p, 3); big.textContent = (x * e).toFixed(dec) + suf; if (p < 1) requestAnimationFrame(f); else big.textContent = txt; }
        requestAnimationFrame(f);
      }, i * 120);
    }, 0.4);
  });

  // ---------- 用途卡片 ----------
  (function () {
    var UC = window.LLM_RANK_USECASES || [], order = window.LLM_RANK_UC_ORDER || [], grid = $('ucGrid'), det = $('ucDetail');
    if (!grid) return;
    var byId = {}; UC.forEach(function (u) { byId[u.id] = u; });
    var LABEL = { lit: '文献综述 · 少幻觉', bio: '编码 · 生信', wet: '湿实验', clin: '临床推理', write: '长文档 / 基金写作', eng: 'Agentic 工程', value: '性价比' };
    var n = 0, html = '';
    order.forEach(function (id) {
      n++;
      var k = '<span class="uk">场景 ' + (n < 10 ? '0' : '') + n + '</span>';
      if (id === 'value') {
        html += '<button type="button" class="ucc value" data-id="value" aria-expanded="false" aria-controls="ucDetail">' + k + '<h3>' + LABEL.value + '</h3>' +
          '<div class="u1"><i class="dot d-oa"></i>GPT-6.1 Sol<small>点名 3 款</small></div><ol style="list-style:none;padding:0"><li><i class="dot d-go"></i>Gemini 4 Hydrogen</li><li><i class="dot d-an"></i>Sonnet 5.5</li></ol><span class="go">看依据 →</span></button>';
        return;
      }
      var u = byId[id]; if (!u) return;
      html += '<button type="button" class="ucc" data-id="' + id + '" aria-expanded="false" aria-controls="ucDetail">' + k + '<h3>' + esc(LABEL[id] || u.tab) + '</h3>' +
        '<div class="u1"><i class="dot ' + DOT[u.ranks[0].vendor] + '"></i>' + esc(u.ranks[0].name) + '<small>第 1</small></div><ol start="2">' +
        u.ranks.slice(1, 3).map(function (r) { return '<li>' + esc(r.name) + '</li>'; }).join('') + '</ol><span class="go">看名次与依据 →</span></button>';
    });
    grid.innerHTML = html;
    var cur = null;
    function open(id, btn) {
      grid.querySelectorAll('.ucc').forEach(function (b) { b.setAttribute('aria-expanded', b === btn && cur !== id); });
      if (cur === id) { cur = null; det.hidden = true; return; }
      cur = id;
      var h = '<button type="button" class="ucd-x" aria-label="收起">收起</button>';
      if (id === 'value') {
        h += '<h4>性价比</h4><p class="uc-note">依据：一眼结论与 AA Index（独立复测）；价格以总对比表为准，Carbon / Argon 促销价 2026-11-30 到期。</p>' + $('valueTpl').innerHTML;
      } else {
        var u = byId[id];
        h += '<h4>' + u.title + '</h4><p class="uc-note">' + u.note + '</p>' + u.ranks.map(function (r, j) {
          return '<div class="rank-row"><div class="rank-no">' + (j + 1) + '</div><div class="rbody"><div class="rname"><i class="dot ' + DOT[r.vendor] + '"></i>' + r.name + '</div><p>' + r.body + '</p></div></div>';
        }).join('');
      }
      det.innerHTML = h; det.hidden = false;
      det.querySelector('.ucd-x').onclick = function () { open(id, btn); btn.focus(); };
      var top = det.getBoundingClientRect().top;
      if (top > innerHeight * 0.75 || top < 60) det.scrollIntoView({ behavior: RM ? 'auto' : 'smooth', block: 'nearest' });
    }
    grid.addEventListener('click', function (e) { var b = e.target.closest('.ucc'); if (b) open(b.dataset.id, b); });
  })();

  // ---------- 总表筛选 ----------
  (function () {
    var f = { v: 'all', tier: 'all', star: false }, rows = document.querySelectorAll('#tscroll tbody tr'), cnt = $('mfCount');
    function apply() {
      var k = 0;
      rows.forEach(function (r) {
        var ok = (f.v === 'all' || r.dataset.v === f.v) && (f.tier === 'all' || r.dataset.tier === f.tier) && (!f.star || r.dataset.star);
        r.classList.toggle('off', !ok); if (ok) k++;
      });
      cnt.textContent = '显示 ' + k + ' / ' + rows.length + ' 款' + (k ? '' : '：没有符合条件的模型');
    }
    document.querySelectorAll('#mfilter .chip').forEach(function (b) {
      b.addEventListener('click', function () {
        var key = b.dataset.f;
        if (key === 'star') { f.star = !f.star; b.setAttribute('aria-pressed', f.star); }
        else {
          f[key] = b.dataset.k;
          document.querySelectorAll('#mfilter .chip[data-f="' + key + '"]').forEach(function (x) { x.setAttribute('aria-pressed', x === b); });
        }
        apply();
      });
    });
    apply();
  })();

  // ---------- 3D 头图（懒加载；WebGPU → WebGL2 → 静态 SVG） ----------
  (function () {
    var hero = $('top'), host = $('h3dHost'), tipEl = $('h3dTip'), badge = $('h3dBadge'), hint = $('h3dHint');
    var models = window.LLM_RANK_MODELS || [];
    function setBadge(t) { if (badge) badge.textContent = t; hero.dataset.renderer = t; }
    // 静态 SVG 的点也能点出数值
    if (RM) { setBadge('静态图（已开启减少动态效果）'); if (hint) hint.textContent = '悬停圆点查看数值'; return; }
    var gl2 = false;
    try { gl2 = !!document.createElement('canvas').getContext('webgl2'); } catch (e) { }
    if (!('gpu' in navigator) && !gl2) { setBadge('静态图（浏览器不支持 WebGPU / WebGL2）'); return; }
    var KIND = { v501: 'AA Index 图中 9 款之一', old: '其他版本口径，与 v5.0.1 不可比', none: 'AA Index 未找到（地面圆环）' };
    function tip(m, x, y) {
      if (!m) { tipEl.hidden = true; return; }
      tipEl.innerHTML = '<b>' + (m.star ? '★ ' : '') + esc(m.name) + '</b><span>发布：' + esc(m.rel) + '</span><span>价格 $/1M 入/出：' + esc(m.price) + '</span><span>' + esc(m.aaTxt || 'AA Index：未找到') + '</span><span style="opacity:.6">' + KIND[m.kind] + '</span>';
      tipEl.hidden = false;
      var sw = host.clientWidth, sh = host.clientHeight, tw = tipEl.offsetWidth, th = tipEl.offsetHeight;
      tipEl.style.left = Math.max(8, Math.min(sw - tw - 8, x + 14)) + 'px';
      tipEl.style.top = Math.max(8, Math.min(sh - th - 8, y - th - 12)) + 'px';
    }
    onView(hero, function () {
      var url = new URL('../assets/llm-rank-herov1.0.js?v=1.1', location.href).href;
      import(url).then(function (mod) { return mod.initHero(host, models, { tip: tip }); }).then(function (r) {
        hero.classList.add('live'); setBadge(r.backend === 'WebGPU' ? 'WebGPU 实时渲染' : 'WebGL2 实时渲染（WebGPU 不可用，自动回退）');
      }).catch(function (e) {
        setBadge('静态图（3D 初始化失败）');
        if (window.console) console.warn('[llm-rank] 3D hero fallback:', e && e.message);
      });
    }, 0.05);
    document.addEventListener('pointerdown', function (e) { if (!hero.contains(e.target)) tipEl.hidden = true; });
  })();
})();
