/* AI NEWS PLAYBOOK · 新闻战术课 renderer v1.0
   Reusable template: a lesson page sets <body data-lesson="../data/news/news-00Xv1.0.json"> and loads this file.
   No third-party dependencies. Content lives in JSON; this file only renders and wires interactions. */
(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const isBi = o => o && typeof o === 'object' && ('en' in o || 'zh' in o);
  // inline pair (EN then ZH)
  const T = (o, blk) => isBi(o)
    ? `<span class="t-en${blk ? ' tb' : ''}" lang="en">${esc(o.en)}</span><span class="t-zh${blk ? ' tb' : ''}" lang="zh-CN">${esc(o.zh)}</span>`
    : esc(o);
  // block pair: English paragraph above, Chinese paragraph below
  const P = (o, cls = '', tag = 'p') => isBi(o)
    ? `<div class="bi-block ${cls}"><${tag} class="t-en" lang="en">${esc(o.en)}</${tag}><${tag} class="t-zh" lang="zh-CN">${esc(o.zh)}</${tag}></div>`
    : `<${tag} class="${cls}">${esc(o)}</${tag}>`;
  const UI = {
    lang: { en: 'TEXT', zh: '文稿' }, bi: '中英双语', zh: '只看中文', en: '只看英文',
    back: { en: 'AIAI Academy', zh: '返回学院' }, proj: { en: 'Projector', zh: '投屏模式' },
    prev: { en: 'Previous', zh: '上一章' }, next: { en: 'Next', zh: '下一章' }, keys: { en: '← → keys turn chapters', zh: '键盘 ← → 翻章' },
    all: { en: 'All', zh: '全部' }, showing: (n, t) => ({ en: `Showing ${n} of ${t} claims`, zh: `显示 ${n} / ${t} 条论断` }),
    src: { en: 'Source & original line', zh: '出处与原文' }, copied: '已复制 Copied', copyEn: { en: 'Copy English', zh: '复制英文版' }, copyZh: { en: 'Copy Chinese', zh: '复制中文版' },
    expand: { en: 'Open all cards', zh: '全部展开' }, collapse: { en: 'Close all cards', zh: '全部收起' }, flip: { en: 'Tap to open 6 fields', zh: '点开看 6 个栏目' },
    reset: { en: 'Reset quiz', zh: '重做小测' }, correct: { en: 'Correct.', zh: '答对了。' }, wrong: { en: 'Not quite.', zh: '再想想。' },
    ticker: { en: 'WIRE', zh: '快讯' }, pause: { en: 'Pause ticker', zh: '暂停滚动' }, play: { en: 'Play ticker', zh: '继续滚动' }
  };
  const root = document.documentElement;

  /* ---------- language: ?lang= > localStorage > default bi ---------- */
  const LKEY = 'aiai-news-lang';
  const norm = v => ({ bi: 'bi', zh: 'zh', en: 'en', 'zh-en': 'bi', both: 'bi', cn: 'zh' }[String(v || '').toLowerCase()]);
  function setLang(v, save = true) {
    v = norm(v) || 'bi'; root.dataset.nl = v; root.lang = v === 'en' ? 'en' : 'zh-CN';
    $$('.nx-lang button').forEach(b => { const on = b.dataset.l === v; b.setAttribute('aria-checked', on); b.tabIndex = on ? 0 : -1; });
    if (save) try { localStorage.setItem(LKEY, v); } catch (e) {}
  }
  const qLang = norm(new URLSearchParams(location.search).get('lang'));
  let stored = null; try { stored = localStorage.getItem(LKEY); } catch (e) {}
  setLang(qLang || stored || 'bi', !!qLang);

  /* ---------- projector (shares the site's key) ---------- */
  let proj = false; try { proj = localStorage.getItem('projector') === '1'; } catch (e) {}
  root.classList.toggle('projector', proj);

  const src = document.body.dataset.lesson;
  const app = $('#app');
  fetch(src, { cache: 'no-cache' }).then(r => { if (!r.ok) throw new Error(r.status); return r.json(); }).then(render).catch(err => {
    app.innerHTML = `<div class="nx-err" role="alert">${P({ en: 'The lesson content could not be loaded. Please refresh, or read the original paper below.', zh: '课程内容加载失败。请刷新页面，或直接阅读下方原文。' })}
      <p><a href="https://www.nature.com/articles/s43018-026-01264-6">Nature Cancer · doi:10.1038/s43018-026-01264-6 ↗</a></p><p><a href="../index.html#news">← AIAI Academy</a></p></div>`;
    console.error(err);
  });

  function render(D) {
    const S = Object.fromEntries((D.sources || []).map(s => [s.id, s]));
    const V = D.verdicts;
    document.title = `${D.no} · ${D.title.zh} | aiai 学院`;
    const tick = D.ticker.map(t => `<li>${T(t)}</li>`).join('');
    const chapNav = D.chapters.map((c, i) => `<li><a href="#${c.id}" data-i="${i}"><b>${c.no}</b><span>${esc(c.en)} · ${esc(c.zh)}</span></a></li>`).join('');

    const head = `
<header class="nx-top" id="nxTop">
  <div class="nx-bar">
    <a class="nx-brand" href="../index.html#news" aria-label="aiai 人工智能学院 首页"><img src="../assets/aiai-wordmarkv1.0.webp" alt="aiai" width="69" height="30"><span><b>NEWS PLAYBOOK</b><small>AI 前沿新闻战术课</small></span></a>
    <span class="nx-live" aria-hidden="true"><i></i>LIVE</span>
    <div class="nx-tools">
      <a class="nx-back" href="../index.html#news">← ${T(UI.back)}</a>
      <div class="nx-lang" role="radiogroup" aria-label="文稿语言 Transcript language">
        <span class="lbl" aria-hidden="true">${UI.lang.en} · ${UI.lang.zh}</span>
        <button type="button" role="radio" data-l="bi">${UI.bi}</button><button type="button" role="radio" data-l="zh">${UI.zh}</button><button type="button" role="radio" data-l="en">${UI.en}</button>
      </div>
      <button class="nx-btn" id="nxProj" type="button" aria-pressed="${proj}">${T(UI.proj)}</button>
    </div>
  </div>
  <div class="nx-ticker" id="nxTicker" aria-label="快讯 News wire">
    <span class="tag">${UI.ticker.en} · ${UI.ticker.zh}</span>
    <div class="rail"><ul aria-hidden="true">${tick}${tick}</ul><ul class="sr">${tick}</ul></div>
    <button class="pause" type="button" id="nxPause" aria-pressed="false" aria-label="${UI.pause.zh} ${UI.pause.en}">❚❚</button>
  </div>
</header>
<nav class="nx-chap" id="nxChap" aria-label="章节 Chapters"><ol>${chapNav}</ol><div class="nx-prog" aria-hidden="true"><i id="nxBar"></i></div></nav>`;

    const meta = [
      `<li class="peer">${T(D.evidence.label)}</li>`,
      `<li>${T({ en: 'Event', zh: '事件' })} ${D.eventDate}</li>`,
      `<li>${T({ en: 'Spread', zh: '传播' })} ${D.spreadDates.join(' / ')}</li>`,
      `<li>${T({ en: 'Verified', zh: '最近核验' })} ${D.verifiedAt}</li>`,
      D.publishedAt ? `<li>${T({ en: 'Published', zh: '发布' })} ${D.publishedAt}</li>` : `<li class="prev">${T({ en: 'Preview · not yet published', zh: '预览版 · 尚未正式发布' })}</li>`,
      `<li>${D.level.join(' ')} · ${T({ en: 'Difficulty', zh: '难度' })} ${'●'.repeat(D.difficulty)}${'○'.repeat(5 - D.difficulty)}</li>`
    ].join('');
    const hero = `
<section class="nx-hero" aria-labelledby="nxTitle">
  <div class="nx-hero-in">
    <div>
      <p class="nx-kick"><span class="no">${esc(D.no)}</span>NATURE CANCER · ${D.eventDate}</p>
      <h1 id="nxTitle">${T(D.title, true)}</h1>
      ${P(D.dek, 'nx-dek on-dark')}
      <ul class="nx-meta">${meta}</ul>
    </div>
    <figure><img src="${esc(D.hero.src)}" alt="${esc(D.hero.alt.zh)} ${esc(D.hero.alt.en)}" width="1376" height="768" fetchpriority="high"><figcaption>${T(D.hero.credit)}</figcaption></figure>
  </div>
</section>`;

    const chs = D.chapters.map((c, i) => `<section class="nx-ch" id="${c.id}" data-i="${i}" aria-labelledby="h-${c.id}">
      <p class="eyebrow"><span class="jn">${c.no}</span><span class="ek">${esc(c.en)}</span><span class="yd">${esc(c.level)} · ${esc(c.yard)}</span></p>
      <h2 id="h-${c.id}" tabindex="-1">${T({ en: c.en, zh: c.zh }, true)}</h2>
      ${BUILD[c.id] ? BUILD[c.id](D, S, V) : `<p class="todo"><b>待开发</b></p>`}
    </section>`).join('');

    const foot = `<footer class="nx-foot"><div class="ez" aria-hidden="true"><span>AIAI</span><span>NEWS PLAYBOOK</span></div>
      <p>人做决定，AI 跑路线。· Learn AI. Verify Everything. Build for Care.</p>
      <p>${T(D.editor)}</p>
      <p>${esc(D.no)} · v${esc(D.version)} · ${T({ en: 'Last verified', zh: '最近核验' })} ${D.verifiedAt} · ${(D.revisions || []).map(r => `v${esc(r.v)} ${esc(r.date)} ${T(r.note)}`).join(' · ')}</p>
      <p><a href="../index.html#news">← aiai 人工智能学院 · AIAI Academy</a></p></footer>`;

    app.innerHTML = head + hero + `<main class="nx-stage" id="main">${chs}
      <div class="pager"><button type="button" id="nxPrev">← ${T(UI.prev)}</button><div><span class="pg" id="nxPg">1 / ${D.chapters.length}</span><span class="kb">${T(UI.keys)}</span></div><button type="button" id="nxNext">${T(UI.next)} →</button></div></main>` + foot +
      `<div class="toast" id="nxToast" role="status" aria-live="polite"></div>`;
    setLang(root.dataset.nl, false);
    wire(D);
  }

  /* ---------- chapter builders ---------- */
  const BUILD = {
    kickoff(D) {
      const K = D.kickoff;
      return `${P(K.lede, 'lede')}
      <h3 class="sh"><small>DATELINE</small>${T({ en: 'Event date vs spread date', zh: '事件日期 vs 传播日期' })}</h3>
      <ol class="dl">${K.dateline.map(d => `<li class="${d.key ? 'key' : ''}"><span class="lb">${T(d.label)}</span><time datetime="${d.date}">${d.date}</time><p>${T(d.note)}</p></li>`).join('')}</ol>
      <h3 class="sh"><small>SCOREBOARD</small>${T({ en: 'Three numbers before any headline', zh: '看标题之前，先看三个数字' })}</h3>
      <div class="sb">${K.scoreboard.map(s => `<div><strong>${esc(s.big)}</strong>${P(s.label, 'on-dark')}<small>${T(s.note)}</small></div>`).join('')}</div>
      <h3 class="sh"><small>ONE LINE</small>${T({ en: 'The story in one breath', zh: '一口气讲完' })}</h3>
      ${P(K.oneLine, 'oneline')}
      <details class="reveal"><summary><span>${T(K.question.q)}</span><span class="hint">${T({ en: 'think, then open', zh: '先想再点开' })}</span></summary>${P(K.question.reveal)}</details>`;
    },
    replay(D) {
      const R = D.replay, C = D.charts;
      const tx = R.transcript.map(s => `<li><div><p class="t-en s-en" lang="en">${esc(s.en)}</p><p class="t-zh s-zh" lang="zh-CN">${esc(s.zh)}</p></div><p class="s-note">${T(s.note)}</p></li>`).join('');
      const f1 = C.f1.bars.map(b => `<div class="bar"><span class="lb">${T(b.label)}</span><span class="track"><span class="fill ${b.tone === 'teal' ? '' : b.tone}" style="width:${b.v / C.f1.max * 100}%"></span></span><span class="v">${b.v.toFixed(2)}</span></div>`).join('');
      const tm = C.time.rows.map(r => `<div class="rng"><span class="lb">${T(r.label)}</span><span class="track"><span class="iqr ${r.tone}" style="left:${r.lo / C.time.max * 100}%;width:${(r.hi - r.lo) / C.time.max * 100}%"></span><span class="med" style="left:${r.med / C.time.max * 100}%"></span></span><span class="v">${r.med}s</span></div>`).join('');
      const al = C.alpha.rows.map(r => `<div class="db"><span class="lb">${T(r.label)}</span><span class="track"><span class="ln" style="left:${r.a * 100}%;width:${(r.b - r.a) * 100}%"></span><span class="pt a" style="left:${r.a * 100}%"></span><span class="pt b" style="left:${r.b * 100}%"></span></span><span class="v">${r.a.toFixed(2)}→${r.b.toFixed(2)}</span></div>`).join('');
      return `${P(R.lede, 'lede')}
      <h3 class="sh"><small>TRANSCRIPT</small>${T({ en: 'Bilingual transcript · the abstract, sentence by sentence', zh: '双语文稿 · 摘要逐句对照' })}</h3>
      <ol class="tx">${tx}</ol>
      ${P(R.translationNote, 'credit')}
      <h3 class="sh"><small>TIMELINE</small>${T({ en: 'Three phases, three kinds of evidence', zh: '三个阶段，三种证据' })}</h3>
      <div class="tl">${R.timeline.map(t => `<article data-p="${esc(t.phase)}"><h4>${T(t.title)}</h4><p class="when">${T(t.when)}</p>${P(t.n)}${P(t.result, 'res')}</article>`).join('')}</div>
      <h3 class="sh"><small>CHARTS</small>${T({ en: 'The numbers, redrawn', zh: '把数字重新画出来' })}</h3>
      <div class="charts">
        <div class="chart wide"><h4>${T(C.f1.title)} · F1</h4>${f1}<p class="cap">${T({ en: 'Redrawn by AIAI Academy from numbers in the paper; bars are not directly comparable metrics (detection vs grading vs binary labels).', zh: 'aiai 学院按论文数字重绘；各条指标口径不同（检测、分级、二分类），不能直接横比。' })}</p></div>
        <div class="chart"><h4>${T(C.time.title)}</h4>${tm}<p class="cap">${T({ en: 'Band = interquartile range, dot = median. Phase 3, 316 observations.', zh: '色带为四分位距，圆点为中位数。第三阶段，316 次观察。' })}</p></div>
        <div class="chart"><h4>${T(C.alpha.title)}</h4>${al}<p class="cap">${T({ en: 'Grey = manual, teal = AI-assisted. Higher agreement ≠ higher correctness.', zh: '灰点为纯人工，青点为 AI 辅助。一致性高 ≠ 正确率高。' })}</p></div>
      </div>
      <h3 class="sh"><small>GLOSSARY</small>${T({ en: 'Terms on the spot', zh: '术语就地解释' })}</h3>
      <div class="gl">${R.glossary.map(g => `<div><b>${T(g.term)}</b>${P(g.def)}</div>`).join('')}</div>
      <details class="fold"><summary>${T({ en: 'What the abstract does not say (from the full text)', zh: '摘要没说的部分（来自正文）' })}</summary><ul>${R.unsaid.map(u => `<li>${P(u)}</li>`).join('')}</ul></details>`;
    },
    playbook(D) {
      const L = D.fieldLabels;
      return `${P({ en: 'Three ideas worth stealing. Each card opens into six fields.', zh: '三个值得学走的战术。每张卡点开都有六个栏目。' }, 'lede')}
      <div class="pb-tools"><button type="button" id="pbAll" aria-pressed="false">${T(UI.expand)}</button></div>
      <div class="pb">${D.playbook.map(p => `<article class="pc" data-open="false">
        <button type="button" aria-expanded="false" aria-controls="pc-${p.id}"><span class="tg">${esc(p.tag)}</span><span class="lv">${esc(p.level)}</span>
          <h3>${T(p.title, true)}</h3><span class="front">${T(p.fields.plain, true)}</span><span class="flip">${T(UI.flip)}</span></button>
        <dl id="pc-${p.id}">${Object.keys(L).filter(k => k !== 'plain').map(k => `<dt class="k-${k}">${T(L[k])}</dt><dd class="k-${k}">${P(p.fields[k])}</dd>`).join('')}</dl>
      </article>`).join('')}</div>`;
    },
    review(D, S, V) {
      const keys = Object.keys(V);
      return `${P(D.review.lede, 'lede')}
      <div class="vchips" role="group" aria-label="按裁决筛选 Filter by verdict" id="vChips">
        <button type="button" data-v="all" aria-pressed="true">${T(UI.all)}<b>${D.claims.length}</b></button>
        ${keys.map(k => `<button type="button" data-v="${k}" aria-pressed="false"><span class="vb ${k}"><i>${V[k].icon}</i></span>${T(V[k].label)}<b>${D.claims.filter(c => c.verdict === k).length}</b></button>`).join('')}
      </div>
      <p class="vline" id="vLine" aria-live="polite"></p>
      <table class="mx"><thead><tr><th scope="col">${T({ en: 'CLAIM', zh: '论断' })}</th><th scope="col">${T({ en: 'VERDICT', zh: '裁决' })}</th><th scope="col">${T({ en: 'WHY', zh: '依据' })}</th></tr></thead><tbody>
      ${D.claims.map(c => { const s = S[c.sourceId] || {}; return `<tr class="${c.verdict}" data-v="${c.verdict}">
        <td><span class="who">${T(c.who)}</span>${P(c.text)}<span class="tags">${(c.tags || []).map(t => `<span>${esc(t)}</span>`).join('')}</span></td>
        <td><span class="vb ${c.verdict}"><i>${V[c.verdict].icon}</i>${T(V[c.verdict].label)}</span></td>
        <td>${P(c.evidence)}<details><summary>${T(UI.src)}</summary><blockquote><p class="t-en" lang="en">“${esc(c.quote)}”</p><p class="t-zh" lang="zh-CN">“${esc(c.quoteZh)}”</p></blockquote>
          <p class="src"><a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.title)} ↗</a>${s.license ? ' · ' + esc(s.license) : ''}${c.quoteZh ? ' · ' + T({ en: 'Chinese: translated by AIAI', zh: '中文为 aiai 译文' }) : ''}</p></details></td></tr>`; }).join('')}
      </tbody></table>
      <div class="legend">${keys.map(k => `<div><span class="vb ${k}"><i>${V[k].icon}</i>${T(V[k].label)}</span> ${T(V[k].desc)}</div>`).join('')}</div>
      <div class="pattern"><b>SPREAD PATTERN · 传播规律</b>${P(D.review.pattern, 'on-dark')}</div>`;
    },
    practice(D, S, V) {
      const R = D.practice;
      const opts = Object.keys(V);
      return `${P(R.lede, 'lede')}
      <p class="warn">${T(R.safety)}</p>
      <div class="simnote"><span class="lbl">${T(R.note.label)}</span>${P(R.note.text)}</div>
      ${R.prompts.map(p => `<div class="prompt"><h4>${T(p.title, true)}</h4><pre class="t-en" lang="en">${esc(p.text.en)}</pre><pre class="t-zh" lang="zh-CN">${esc(p.text.zh)}</pre>
        <button type="button" class="copy t-en" data-copy="${p.id}" data-l="en">${T(UI.copyEn)}</button><button type="button" class="copy t-zh" data-copy="${p.id}" data-l="zh">${T(UI.copyZh)}</button></div>`).join('')}
      <details class="fold"><summary>${T({ en: 'Reference answer — open after you try', zh: '参考答案——自己试过再点开' })}</summary>${P(R.key)}</details>
      <h3 class="sh"><small>REWRITE</small>${T({ en: 'Bad question → good question', zh: '坏问题 → 好问题' })}</h3>
      <div class="rw"><div class="bad"><b>BAD · 坏问题</b>${P(R.rewrite.bad)}</div><div class="good"><b>GOOD · 好问题</b>${P(R.rewrite.good)}</div></div>
      ${P(R.rewrite.why, 'credit')}
      <h3 class="sh"><small>DRILL</small>${T({ en: 'Classify the headline', zh: '给标题判类' })}</h3>
      ${P(R.headlinesNote, 'credit')}
      <ol class="hl">${R.headlines.map((h, i) => `<li data-a="${h.answer}"><p class="h">${T(h.h)}</p>
        <div class="opts" role="group" aria-label="选择裁决 Choose a verdict">${opts.map(k => `<button type="button" data-k="${k}" aria-pressed="false">${V[k].icon} ${T(V[k].label)}</button>`).join('')}</div>
        <div class="fb" aria-live="polite" data-why='${esc(JSON.stringify(h.why))}'></div></li>`).join('')}</ol>`;
    },
    gameplan(D, S) {
      const G = D.gameplan;
      return `${P(G.lede, 'lede')}
      <h3 class="sh"><small>TRANSFER</small>${T({ en: 'Emergency & trauma: a trauma-registry version, L0 → L4', zh: '急诊创伤：创伤登记版，L0 → L4' })}</h3>
      <ol class="ladder">${G.transfer.map(t => `<li><span class="lv">${esc(t.level)}<small>${esc(t.yard)}</small></span><div><h4>${T(t.step)}</h4>${P(t.detail)}</div></li>`).join('')}</ol>
      <h3 class="sh"><small>QUIZ</small>${T({ en: 'Three questions, instant feedback', zh: '三道小测，即时解析' })}</h3>
      <div class="quiz" id="quiz">${G.quiz.map((q, i) => `<fieldset class="qz" data-a="${q.answer}"><legend><span class="n">Q${i + 1}</span>${T(q.q)}</legend>
        ${q.options.map((o, j) => `<label><input type="radio" name="q${i}" value="${j}"><span>${T(o)}</span></label>`).join('')}
        <div class="why" aria-live="polite" data-why='${esc(JSON.stringify(q.why))}'></div></fieldset>`).join('')}</div>
      <p><button type="button" class="qreset" id="qReset">${T(UI.reset)}</button></p>
      <h3 class="sh"><small>ONE PAGE</small>${T({ en: 'Summary', zh: '一页总结' })}</h3>
      <div class="sum"><ol>${G.summary.map(s => `<li>${P(s, 'on-dark')}</li>`).join('')}</ol></div>
      <h3 class="sh"><small>READ MORE</small>${T({ en: 'Further reading & sources', zh: '延伸阅读与来源' })}</h3>
      <ul class="reading">${G.reading.map(id => { const s = S[id]; return s ? `<li><span class="ty">${esc(s.type.toUpperCase())}</span><a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.title)} ↗</a><span class="nt">${s.license ? esc(s.license) + ' · ' : ''}${T({ en: 'accessed', zh: '访问于' })} ${esc(s.accessed)} · ${T(s.note)}</span></li>` : ''; }).join('')}</ul>
      <h3 class="sh"><small>CROSS-LINKS</small>${T({ en: 'Keep training across the academy', zh: '在学院里接着练' })}</h3>
      <div class="rel">${D.related.map(r => `<a href="${esc(r.href)}"${r.ext ? ' target="_blank" rel="noopener"' : ''}><small>${T(r.kind)}</small>${T(r.title)}${r.ext ? ' ↗' : ''}</a>`).join('')}</div>
      <h3 class="sh"><small>STATUS</small>${T({ en: 'Not built yet', zh: '尚未完成' })}</h3>
      <div class="todo">${D.todo.map(t => P(t)).join('')}</div>`;
    }
  };

  /* ---------- interactions ---------- */
  function wire(D) {
    const N = D.chapters.length;
    const top = $('#nxTop');
    const setH = () => root.style.setProperty('--nx-top-h', top.offsetHeight + 'px');
    setH(); if ('ResizeObserver' in window) new ResizeObserver(setH).observe(top); else addEventListener('resize', setH);

    // language radiogroup (roving tabindex, arrow keys move within the group)
    const lg = $('.nx-lang');
    lg.addEventListener('click', e => { const b = e.target.closest('button[data-l]'); if (b) setLang(b.dataset.l); });
    lg.addEventListener('keydown', e => {
      if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) return;
      e.preventDefault(); e.stopPropagation();
      const bs = $$('button', lg), i = bs.findIndex(b => b.dataset.l === root.dataset.nl);
      const n = bs[(i + (e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 1) + bs.length) % bs.length];
      setLang(n.dataset.l); n.focus();
    });
    setLang(root.dataset.nl, false);

    // projector
    $('#nxProj').onclick = e => { proj = !proj; root.classList.toggle('projector', proj); e.currentTarget.setAttribute('aria-pressed', proj); try { localStorage.setItem('projector', proj ? '1' : '0'); } catch (x) {} setH(); };

    // ticker pause
    const tk = $('#nxTicker'), pz = $('#nxPause');
    pz.onclick = () => { const p = !tk.classList.contains('paused'); tk.classList.toggle('paused', p); pz.setAttribute('aria-pressed', p); pz.textContent = p ? '▶' : '❚❚'; pz.setAttribute('aria-label', p ? `${UI.play.zh} ${UI.play.en}` : `${UI.pause.zh} ${UI.pause.en}`); };

    // chapters
    const secs = $$('.nx-ch'), links = $$('#nxChap a');
    let cur = 0; const seen = new Set();
    function go(i, focus = true, push = true) {
      i = Math.max(0, Math.min(N - 1, i)); cur = i; seen.add(i);
      secs.forEach((s, k) => s.classList.toggle('on', k === i));
      links.forEach((a, k) => { a.toggleAttribute('aria-current', false); if (k === i) a.setAttribute('aria-current', 'step'); a.classList.toggle('done', seen.has(k) && k !== i); });
      $('#nxBar').style.width = ((i + 1) / N * 100) + '%';
      $('#nxPg').textContent = `${i + 1} / ${N}`;
      $('#nxPrev').disabled = i === 0; $('#nxNext').disabled = i === N - 1;
      links[i].scrollIntoView({ block: 'nearest', inline: 'center' });
      if (push) history.replaceState(null, '', '#' + D.chapters[i].id);
      if (focus) { const m = $('#main'); const y = m.getBoundingClientRect().top + scrollY - top.offsetHeight - $('#nxChap').offsetHeight - 8; scrollTo({ top: Math.max(0, y) }); $('#h-' + D.chapters[i].id).focus({ preventScroll: true }); }
    }
    links.forEach(a => a.addEventListener('click', e => { e.preventDefault(); go(+a.dataset.i); }));
    $('#nxPrev').onclick = () => go(cur - 1); $('#nxNext').onclick = () => go(cur + 1);
    document.addEventListener('keydown', e => {
      if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
      const t = e.target; if (t.closest && (t.closest('input,textarea,select,[contenteditable],[role=radiogroup]'))) return;
      if (e.key === 'ArrowRight') { e.preventDefault(); go(cur + 1); } else if (e.key === 'ArrowLeft') { e.preventDefault(); go(cur - 1); }
    });
    const fromHash = () => { const h = location.hash.slice(1); const i = D.chapters.findIndex(c => c.id === h); return i; };
    const h0 = fromHash(); go(h0 >= 0 ? h0 : 0, h0 >= 0, false);
    addEventListener('hashchange', () => { const i = fromHash(); if (i >= 0 && i !== cur) go(i); });

    // playbook cards
    const setCard = (c, o) => { c.dataset.open = o; $('button', c).setAttribute('aria-expanded', o); };
    $$('.pc').forEach(c => $('button', c).addEventListener('click', () => setCard(c, c.dataset.open !== 'true')));
    const pa = $('#pbAll');
    if (pa) pa.onclick = () => { const o = pa.getAttribute('aria-pressed') !== 'true'; pa.setAttribute('aria-pressed', o); pa.innerHTML = T(o ? UI.collapse : UI.expand); $$('.pc').forEach(c => setCard(c, o)); };

    // claim matrix filter
    const vc = $('#vChips');
    const applyV = v => {
      $$('button', vc).forEach(b => b.setAttribute('aria-pressed', b.dataset.v === v));
      let n = 0; $$('.mx tbody tr').forEach(r => { const on = v === 'all' || r.dataset.v === v; r.hidden = !on; if (on) n++; });
      $('#vLine').innerHTML = T(UI.showing(n, D.claims.length));
    };
    if (vc) { vc.addEventListener('click', e => { const b = e.target.closest('button'); if (b) applyV(b.dataset.v); }); applyV('all'); }

    // copy prompts
    const toast = msg => { const t = $('#nxToast'); t.textContent = msg; t.classList.add('on'); clearTimeout(toast.t); toast.t = setTimeout(() => t.classList.remove('on'), 1600); };
    $$('[data-copy]').forEach(b => b.addEventListener('click', async () => {
      const p = D.practice.prompts.find(x => x.id === b.dataset.copy); const txt = p.text[b.dataset.l];
      try { await navigator.clipboard.writeText(txt); toast(UI.copied); }
      catch (e) { const ta = document.createElement('textarea'); ta.value = txt; ta.style.position = 'fixed'; ta.style.opacity = '0'; document.body.appendChild(ta); ta.select(); let ok = false; try { ok = document.execCommand('copy'); } catch (x) {} ta.remove(); toast(ok ? UI.copied : '复制失败，请手动选择 Copy failed — select manually'); }
    }));

    // headline drill
    $$('.hl li').forEach(li => li.addEventListener('click', e => {
      const b = e.target.closest('button[data-k]'); if (!b) return;
      const ok = b.dataset.k === li.dataset.a, why = JSON.parse($('.fb', li).dataset.why);
      $$('button', li).forEach(x => { x.setAttribute('aria-pressed', x === b); x.classList.remove('ok', 'no'); });
      b.classList.add(ok ? 'ok' : 'no');
      const ans = D.verdicts[li.dataset.a].label;
      $('.fb', li).innerHTML = `<b>${T(ok ? UI.correct : UI.wrong)}</b> ${ok ? '' : T({ en: 'Answer: ' + ans.en + '.', zh: '答案：' + ans.zh + '。' })} ${T(why)}`;
    }));

    // quiz
    $$('.qz').forEach(f => f.addEventListener('change', e => {
      const v = +e.target.value, a = +f.dataset.a, why = JSON.parse($('.why', f).dataset.why);
      $$('label', f).forEach((l, j) => { l.classList.toggle('ok', j === a); l.classList.toggle('no', j === v && v !== a); });
      $('.why', f).innerHTML = `<b>${T(v === a ? UI.correct : UI.wrong)}</b> ${T(why)}`;
    }));
    const qr = $('#qReset');
    if (qr) qr.onclick = () => $$('.qz').forEach(f => { $$('input', f).forEach(i => i.checked = false); $$('label', f).forEach(l => l.classList.remove('ok', 'no')); $('.why', f).innerHTML = ''; });
  }
})();
