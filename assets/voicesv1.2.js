/* AI VOICES · lesson template v1.2 — paged courseware ("deck") rendering data/voices/voices-NNNv1.x.json
   v1.2 adds video.provider "hls": several self-hosted clips (parts) played with hls.js
   (../assets/hlsv1.5.17.min.js, same build as the screening room). One segment = one part;
   sentence times are local to their part. YouTube lessons (v1.1 data) render exactly as before.
   5 chapters, one per screen: 1 一个问题 · 2 现场视频 · 3 三个大想法 · 4 事实核查台 · 5 课堂与医学视角
   Paging: ← / → keys, bottom pager (prev · N / 5 · next), top chapter tabs, swipe on touch, deep links #ch1…#ch5.
   Video: official YouTube embed via IFrame Player API (youtube-nocookie host). Never downloaded or rehosted.
   Fallback (API blocked, e.g. mainland China): transcript stands alone + "open on YouTube from here" links. */
(function () {
  'use strict';
  const root = document.documentElement;
  const app = document.getElementById('app');
  const src = document.body.dataset.lesson;
  const LS = { lang: 'aiai-voices-lang', saved: 'aiai-voices-saved', notes: 'aiai-voices-notes', side: 'aiai-voices-side' };
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { } }
  };
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const fmt = t => { t = Math.max(0, Math.floor(t)); return (t >= 3600 ? Math.floor(t / 3600) + ':' + String(Math.floor(t / 60) % 60).padStart(2, '0') : Math.floor(t / 60)) + ':' + String(t % 60).padStart(2, '0'); };
  const $ = (s, el) => (el || document).querySelector(s);
  const $$ = (s, el) => Array.from((el || document).querySelectorAll(s));
  const pair = (o, tag, cls) => { tag = tag || 'p'; cls = cls || ''; let h = ''; if (o.en) h += `<${tag} class="l-en ${cls}" lang="en">${esc(o.en)}</${tag}>`; if (o.zh) h += `<${tag} class="l-zh ${cls}" lang="zh-CN">${esc(o.zh)}</${tag}>`; return h; };
  const LEGACY = { question: 1, watch: 2, ideas: 3, verify: 4, reflect: 5 };

  let HLS = false, curSeg = null, hlsObj = null, vidEl = null;
  let D, CH, SENT = [], player = null, ready = false, fallback = false, poll = null, active = -1, page = 0;
  let loopAB = null, endedOnce = false, onlySegs = true, round = 2, shadowFor = -1, shadowTimer = null;

  fetch(src, { cache: 'no-cache' }).then(r => { if (!r.ok) throw new Error(r.status); return r.json(); }).then(render).catch(err => {
    app.innerHTML = `<div class="vx-err"><p>课程数据加载失败（${esc(err.message)}）。Lesson data failed to load.</p><p><a href="../index.html#voices">← aiai 人工智能学院</a></p></div>`;
  });

  function setLang(l, save) {
    if (!['bi', 'zh', 'en'].includes(l)) l = 'bi';
    root.dataset.vl = l;
    $$('.vx-lang button').forEach(b => b.setAttribute('aria-checked', String(b.dataset.l === l)));
    if (save) store.set(LS.lang, l);
  }
  // a timestamp button: inside-segment moments carry a sentence id; others a raw time
  const tsBtn = a => a.sid ? `<button type="button" class="vx-ts" data-seekid="${esc(a.sid)}">▶ ${esc(a.label)}</button>`
    : `<button type="button" class="vx-ts" data-seekt="${a.t}">▶ ${esc(a.label)}</button>`;
  const gloss = list => list && list.length ? `<p class="vx-gloss">${list.map(g => `<span><b class="vx-term">${esc(g.t)}</b> = ${esc(g.d)}</span>`).join('')}</p>` : '';

  function render(data) {
    D = data; CH = D.chapters;
    // Keep episode 001's existing saved data; isolate every later lesson.
    if (D.num !== 1) ['saved', 'notes', 'side'].forEach(k => { LS[k] += '-' + D.num; });
    const guide = D.learningMode === 'guide';
    const V = D.video, S = D.sourceMap, C = D.cover;
    HLS = V.provider === 'hls';
    SENT = D.segments.flatMap(g => g.sentences.map(s => Object.assign({ seg: g.id }, s)));
    document.title = `${D.no} · ${D.speaker.name} · ${D.question.zh} | aiai 学院`;
    const ytAt = t => HLS ? V.url : `${V.url}&t=${Math.floor(t)}s`;
    const kick = i => `<p class="vx-kicker"><span>第 ${CH[i].no} 章 · ${esc(CH[i].zh)}</span><i lang="en">${esc(CH[i].en)}</i></p>`;
    const head2 = (i, id) => `${kick(i)}<h2 id="${id}">${esc(CH[i].h2)}</h2><p class="vx-dek">${esc(CH[i].dek)}</p>${gloss(D.glossary && D.glossary[String(CH[i].no)])}`;

    const head = `
<header class="vx-top" id="vxTop">
  <div class="vx-bar">
    <a class="vx-brand" href="../index.html#voices" aria-label="aiai 人工智能学院 首页"><img src="../assets/aiai-wordmarkv1.0.webp" alt="aiai" width="51" height="22"><span>AI VOICES<i>${esc(C.issue.zh)}</i></span></a>
    <nav class="vx-tabs" aria-label="章节 Chapters">${CH.map((c, i) => `<a href="#ch${c.no}" data-go="${i}"><b>${c.no}</b><span>${esc(c.zh)}</span></a>`).join('')}</nav>
  </div>
  <div class="vx-prog" aria-hidden="true"><i id="vxBar"></i></div>
</header>`;

    /* 1 · cover */
    const title = C.titleLines.map(l => esc(l).replace(/\[(.+?)\]/, '<em>$1</em>')).join('<br>');
    const c1 = `
<section class="vx-ch vx-cover-ch" id="ch1" aria-labelledby="vxQ">
  <div class="vx-wide vx-cover-grid">
    <div class="vx-cover-text">
      <p class="vx-series">${esc(C.series.zh)}</p>
      <p class="vx-issue"><b>${esc(C.issue.zh)}</b><span>${esc(C.issue.no)}</span></p>
      <p class="vx-chips"><span class="vx-theme">${esc(C.theme.zh)}</span><span class="vx-extra">${esc(C.extra.zh)}</span></p>
      <h1 id="vxQ">${title}</h1>
      <p class="vx-qen" lang="en">${esc(D.question.en)}</p>
      <p class="vx-who">${esc(C.who.zh)}</p>
      <p class="vx-dateline"><b>日期线</b><span>${esc(C.dateline.zh)}</span></p>
    </div>
    <figure class="vx-fig">
      <button type="button" class="vx-cover" id="vxCover" aria-label="播放视频，进入第 2 章 Play the talk">
        <img src="${esc(C.image.src)}" alt="${esc(C.image.alt)}" width="1280" height="720" fetchpriority="high" referrerpolicy="no-referrer">
        <span class="pl" aria-hidden="true"></span>
      </button>
      <figcaption><b>${esc(D.speaker.name)} · ${esc(D.speaker.zh)}</b><span>${esc(D.speaker.role.zh)}</span><small>${esc(C.image.credit.zh)}</small></figcaption>
    </figure>
    <div class="vx-cover-foot">
      <p class="vx-honest">${esc(C.honesty.zh)}</p>
      <p class="vx-bgline"><b>背景：</b>${esc(C.background.zh)}</p>
      <ul class="vx-facts">${C.facts.map(f => `<li><b>${esc(f.n)}</b><span>${esc(f.zh)}</span></li>`).join('')}</ul>
      <button type="button" class="vx-start" data-go="1">开始上课：先听原声 →</button>
    </div>
  </div>
</section>`;

    /* 2 · watch & listen */
    const tx = D.segments.map(g => `${HLS ? `<div class="vx-part" data-part="${g.id}">` : ''}
      <div class="vx-seg-h"><span>${esc(g.title.zh)} · ${HLS ? fmt(g.end) : fmt(g.start) + '–' + fmt(g.end)}</span><button type="button" data-seg="${g.id}">${HLS ? '▶ 从头播放' : '▶ 播放此段'}</button></div>
      ${g.sentences.map(s => `<button type="button" class="vx-s" id="s-${s.id}" data-id="${s.id}" data-t="${s.start}">
        <span class="tm">${fmt(s.start)}</span>
        <span><span class="en l-en" lang="en">${esc(s.en)}</span><span class="zh l-zh" lang="zh-CN">${esc(s.zh)}</span>
        ${HLS ? '' : `<a class="yt" href="${esc(ytAt(s.start))}" target="_blank" rel="noopener" data-noseek>在 YouTube 打开（从此处）↗</a>`}</span>
      </button>`).join('')}${HLS ? '</div>' : ''}`).join('');
    const saved = store.get(LS.saved, []);
    const ex = D.expressions.map(e => `<li data-e="${e.id}">
      <div class="row"><p class="ph" lang="en">${esc(e.phrase)}</p>
      <div class="acts">
        <button type="button" class="vx-chip" data-seekid="${e.sid}">▶ ${esc(e.at.label)}</button>
        <button type="button" class="vx-chip" data-copyex="${e.id}">复制</button>
        <button type="button" class="vx-chip" data-save="${e.id}" aria-pressed="${saved.includes(e.id)}">${saved.includes(e.id) ? '★ 已收藏' : '☆ 收藏'}</button>
      </div></div>
      <p class="mn">${esc(e.zh)}</p>
      <details><summary>${guide ? '释义、语境、原创例句' : '原句、搭配、语境、例句'}</summary><div class="body">
        <p class="snip" lang="en">${esc(e.snippet)}</p>
        <dl><dt>关键词</dt><dd>${e.keys.map(esc).join('<br>')}</dd><dt>常用搭配</dt><dd lang="en">${e.collocations.map(esc).join(' · ')}</dd><dt>语境</dt><dd>${esc(e.context.zh)}</dd></dl>
        <p><span lang="en">${esc(e.example.en)}</span><br><span class="mut">${esc(e.example.zh)}</span></p>
      </div></details>
    </li>`).join('');
    const R0 = D.rest;
    const c2 = `
<section class="vx-ch" id="ch2" aria-labelledby="h-watch">
  <div class="vx-wide">
    ${head2(1, 'h-watch')}
    <div class="vx-watch">
      <div class="vx-player-col" id="vxPlayerCol">
        <div class="vx-frame" id="vxFrame">
          <div id="vxPlayer"></div>
          <button type="button" class="vx-fsx" id="vxFsx" aria-label="退出全屏 Exit fullscreen">✕ 退出全屏</button>
          <button type="button" class="vx-poster" id="vxPoster" aria-label="播放 Play"><img src="${esc(HLS ? V.parts[0].poster : V.thumbFallback)}" alt="" referrerpolicy="no-referrer"><span class="pl" aria-hidden="true"></span><span class="st" id="vxPState">${HLS ? '正在加载视频…' : '正在连接 YouTube…'}</span></button>
        </div>
        <div class="vx-ctl" role="toolbar" aria-label="播放控制 Player controls">
          <span class="vx-grp${HLS ? ' vx-partgrp' : ''}"><span>${HLS ? '分集' : '片段'}</span>${D.segments.map(g => `<button type="button" class="vx-chip" data-seg="${g.id}"${HLS ? ` aria-pressed="false" title="${esc(g.title.zh)}"` : ''}>${esc(HLS ? (g.short || g.id) : g.id)}</button>`).join('')}</span>
          <span class="vx-grp" role="group" aria-label="速度 Speed"><span>速度</span>${[0.75, 1, 1.25].map(r => `<button type="button" class="vx-chip" data-rate="${r}" aria-pressed="${r === 1}">${r}×</button>`).join('')}</span>
          <button type="button" class="vx-chip" id="vxLoop" aria-pressed="false">${D.syncedParaphrase ? '⟲ 循环这段' : guide ? '⟲ 循环本段' : '⟲ 循环本句'}</button>
          <button type="button" class="vx-chip" id="vxFull">⛶ 全屏</button>
        </div>
        <p class="vx-note">${HLS ? esc(V.playNote.zh) : '逐句听力：视频内默认请求英文 CC 字幕；可在 ⚙ → Subtitles/字幕 中切换。若听到配音，请在 Audio track/音轨 中选择 Original/原始英语。盲听时可关闭 CC。'}</p>
        <p class="vx-cap">${HLS ? esc(V.credit.zh) : `<b>${esc(D.speaker.name)}</b> ${esc(D.speaker.role.zh)} · 视频由 ${esc(V.channel)} ${V.official === false ? '上传（非官方频道）' : '官方上传'}；${guide ? '旁侧内容为 aiai 学院原创导读。' : '中文为 aiai 学院译文。'}`}<span class="vx-now" id="vxNow" aria-live="polite"></span></p>
        <div class="vx-shadow" id="vxShadow" role="status"><span>${guide ? '复述任务：' : '跟读：'}<b id="vxShadowText"></b></span><button type="button" class="vx-chip" id="vxShadowGo">继续 ▶</button></div>
        <div class="vx-fallback" id="vxFallback" role="alert">
          ${HLS ? `<strong>视频没有加载出来。</strong> 可能是网络中断或浏览器不支持 HLS。右边（手机上是下面）的双语文稿可以独立学习。<br><a href="${esc(V.url)}" target="_blank" rel="noopener">查看完整原节目 ↗</a>` : `<strong>视频播放器没有加载出来。</strong> 在中国大陆通常无法访问 YouTube。右边（手机上是下面）的文稿可以独立学习；每一句都附有“在 YouTube 打开（从此处）”链接。<br><a href="${esc(V.url)}" target="_blank" rel="noopener">在 YouTube 打开完整视频 ↗</a>`} · <button type="button" class="vx-chip" id="vxRetry">重试</button>
        </div>
      </div>
      <div class="vx-tx-col" id="vxTxCol">
        <div class="vx-tx-head">
          <h3>${D.syncedParaphrase ? '同步双语要点 · 非原话' : guide ? '原创双语导读' : '双语文稿'}</h3>
          <div class="vx-lang" role="radiogroup" aria-label="文稿语言 Transcript language">
            <button type="button" role="radio" data-l="bi" aria-checked="false">中英双语</button><button type="button" role="radio" data-l="zh" aria-checked="false">只看中文</button><button type="button" role="radio" data-l="en" aria-checked="false">只看英文</button>
          </div>
        </div>
        <div class="vx-tx-sub">
          <div class="vx-rounds" role="group" aria-label="三轮学习 Three rounds"><span>三轮学</span>
            <button type="button" data-round="1" aria-pressed="false">① 盲听</button><button type="button" data-round="2" aria-pressed="true">② 双语</button><button type="button" data-round="3" aria-pressed="false">${guide ? '③ 复述' : '③ 跟读'}</button>
          </div>
          <label class="vx-only"><input type="checkbox" id="vxOnly" checked> ${HLS ? '自动连播下一集' : '只播三段'}</label>
        </div>
        <div class="vx-blind"><strong>第 1 轮 · 先只听</strong><p>${esc(D.blindPrompt || '不看字幕，试着抓住三个词：1.0、2.0、3.0 分别指什么？')}</p><button type="button" class="vx-chip" data-round="2">听完了，看字幕 → 第 2 轮</button></div>
        <div class="vx-tx" id="vxTx" aria-label="${guide ? '分段双语导读 Bilingual listening guide' : '同步文稿 Synced transcript'}">${tx}</div>
        <p class="vx-txnote">${esc(D.transcriptNote.zh)}</p>${guide ? `<p class="vx-txnote"><a href="${esc(S.ted ? S.ted.url : V.url)}" target="_blank" rel="noopener">打开原片／来源转写 ↗</a> · ${HLS ? '英文为原声转写，中文以视频内嵌译文为底本校订。' : '英文导读为课程编写，请勿当作讲者原话引用。'}</p>` : ''}
      </div>
    </div>
    <div class="vx-below">
      <details class="vx-fold vx-exfold"><summary><b>${D.expressions.length} 个${guide ? '主题' : '原声'}英语表达</b><span>${guide ? '关联原声片段 · 原创例句 · 收藏' : '听原句 · 复制 · 收藏（第 2 轮后再看效果最好）'}</span></summary>
        <ul class="vx-ex" id="vxEx">${ex}</ul>
        <p class="vx-saved"><span id="vxSavedN"></span><button type="button" class="vx-chip" id="vxCopySaved">复制全部收藏</button></p>
        <p class="vx-howto"><b>三轮学法：</b>① 盲听——不看字幕听一遍；② 双语——中英对照，点句子反复听；${guide ? '③ 复述——听完片段暂停，用自己的英文回答导读问题，再点继续。导读不是原声字幕。' : '③ 跟读——只看英文，每句结束自动暂停，跟着说一遍再继续。'}</p>
      </details>
      <details class="vx-fold"><summary><b>${esc(R0.title.zh)}</b><span>${guide ? '完整语境与原片入口' : R0.items.length + ' 条简短转述'}</span></summary>
        <p class="vx-note">${esc(R0.note.zh)}</p>
        <ul class="vx-rest">${R0.items.map(it => `<li>${tsBtn(it.at)}<span>${esc(it.zh)}</span></li>`).join('')}</ul>
      </details>
    </div>
  </div>
</section>`;

    /* 3 · three big ideas */
    const IL = D.ideaLabels, K = D.contrast;
    const c3 = `
<section class="vx-ch" id="ch3" aria-labelledby="h-ideas">
  <div class="vx-wide">
    ${head2(2, 'h-ideas')}
    <div class="vx-cards">${D.ideas.map((it, i) => `<article class="vx-card" id="card-${it.id}" tabindex="0" role="button" aria-pressed="false" aria-label="想法 0${i + 1}：${esc(it.front.zh)}，点击翻面"><div class="in">
      <div class="vx-face front"><span class="n">想法 0${i + 1}</span><h3>${esc(it.front.zh)}</h3><p class="fe" lang="en">${esc(it.front.en)}</p>
        <p class="lb"><span class="vx-label ${it.label}">${esc(IL[it.label].zh)}</span>${it.label === 'analysis' ? ` <span class="vx-label open">${esc(IL.open.zh)}</span>` : ''}</p>
        <span class="vx-flip" aria-hidden="true">点击翻面 ↻</span></div>
      <div class="vx-face back" aria-hidden="true">
        <p class="who">${esc(it.quoteLabel || '他说：')}</p>
        <blockquote>${pair(it.quote)}<p>${tsBtn(it.at)}</p></blockquote>
        <p>${esc(it.meaning.zh)}</p>
        <p class="ex"><b>例子：</b>${esc(it.example.zh)}</p>
        <span class="vx-flip" aria-hidden="true">↻ 翻回</span>
      </div></div></article>`).join('')}</div>
    <div class="vx-contrast-row">
      <div class="vx-contrast">
        <h3>${esc(K.title.zh)}</h3>
        <div class="two"><div><b>${esc(K.left.k)}</b><p>${esc(K.left.zh)}</p></div><div><b>${esc(K.right.k)}</b><p>${esc(K.right.zh)}</p></div></div>
        <p class="note">${esc(K.note.zh)} ${tsBtn(K.at)}</p>
        <dl class="vx-legend">${['speaker', 'analysis', 'open'].map(k => `<div><dt><span class="vx-label ${k}">${esc(IL[k].zh)}</span></dt><dd>${esc(IL[k].d)}</dd></div>`).join('')}</dl>
      </div>
      <figure class="vx-ai"><img src="${esc(K.image.src)}" alt="${esc(K.image.alt)}" loading="lazy" width="1200" height="670"><figcaption>${esc(K.image.cap.zh)}<b>${esc(K.image.credit || 'AI 生成示意图')}</b></figcaption></figure>
    </div>
  </div>
</section>`;

    /* 4 · fact-check desk */
    const F = D.factcheck, TAG = {}; F.filters.forEach(f => TAG[f.id] = f.zh);
    const side = store.get(LS.side, '');
    const c4 = `
<section class="vx-ch" id="ch4" aria-labelledby="h-verify">
  <div class="vx-mid">
    <div class="vx-fchead">${kick(3)}<span class="vx-stamp" aria-hidden="true"><b lang="en">${esc(F.stamp.en)}</b>${esc(F.stamp.zh)}</span></div>
    <h2 id="h-verify">${esc(CH[3].h2)}</h2><p class="vx-dek">${esc(CH[3].dek)}</p>
    <div class="vx-filters" role="group" aria-label="按类别筛选 Filter">${F.filters.map(f => `<button type="button" data-f="${f.id}" aria-pressed="${f.id === 'all'}">${esc(f.zh)}<i>${f.id === 'all' ? F.items.length : F.items.filter(x => x.tag === f.id).length}</i></button>`).join('')}</div>
    <ul class="vx-facts-list" id="vxFacts">${F.items.map(it => `<li data-tag="${it.tag}">
      <p class="tg"><span class="vx-tag t-${it.tag}">${esc(TAG[it.tag])}</span>${it.sub ? `<span class="sub">${esc(it.sub)}</span>` : ''}</p>
      <div class="rows"><p><b>${guide ? '辨析命题' : '流传说法'}</b><span>${esc(it.said.zh)}</span></p>
      <p><b>${guide ? '核对与分析' : '原话'}</b><span>${esc(it.orig.zh)} <span class="tss">${it.at.map(tsBtn).join(' ')}</span>${it.src ? ` <a href="${esc(S[it.src].url)}" target="_blank" rel="noopener" class="srcl">出处 ↗</a>` : ''}</span></p></div>
    </li>`).join('')}</ul>
    <p class="vx-empty" id="vxEmpty" hidden>这一类暂时没有条目。</p>
    <details class="vx-fold vx-evi" ${D.claims.length ? '' : 'hidden'}><summary><b>${esc(F.evidenceTitle.zh)}</b><span>调查与研究数据 · ${D.claims.length} 组</span></summary>
      ${D.glossary && D.glossary['4'] ? gloss(D.glossary['4']) : ''}
      ${D.claims.map(k => `<div class="vx-claim">
        <p class="said"><span lang="en">“${esc(k.said.en)}”</span> ${esc(k.said.zh)} ${tsBtn(k.at)}</p>
        <ul class="vx-check"><li><span>这是</span><div>${esc(k.kind.zh)}</div></li><li><span>支持</span><div>${esc(k.support.zh)}</div></li><li><span>反方</span><div>${esc(k.counter.zh)}</div></li><li><span>怎么判断</span><div>${esc(k.judge.zh)}</div></li></ul>
        <ul class="vx-evl">${k.evidence.map(e => `<li>${esc(e.zh)} <a href="${esc(S[e.src].url)}" target="_blank" rel="noopener">${esc(S[e.src].title)} ↗</a></li>`).join('')}</ul>
      </div>`).join('')}
    </details>
    <p class="vx-take">${esc(F.takeaway.zh)}</p>
    <div class="vx-debate">
      <p class="vx-step">思辨 · 两边都想一想</p>
      <h3>${esc(D.debate.q.zh)}</h3>
      <div class="vx-sides">
        <button type="button" class="vx-side" data-side="pro" aria-pressed="${side === 'pro'}"><b>正方</b>${esc(D.debate.pro.zh)}<span class="l-en" lang="en">${esc(D.debate.pro.en)}</span></button>
        <button type="button" class="vx-side" data-side="con" aria-pressed="${side === 'con'}"><b>反方</b>${esc(D.debate.con.zh)}<span class="l-en" lang="en">${esc(D.debate.con.en)}</span></button>
      </div>
      <p class="vx-saved-at" id="vxSideMsg">${side ? '你的选择已保存在本机。再读一遍另一边，它最强的理由是什么？' : '点一边，表明你此刻的倾向（只保存在本机）。'}</p>
    </div>
  </div>
</section>`;

    /* 5 · practice */
    const R = D.reflect, notes = store.get(LS.notes, {}), M = D.medical, Z = D.closing;
    const c5 = `
<section class="vx-ch" id="ch5" aria-labelledby="h-reflect">
  <div class="vx-mid">
    ${head2(4, 'h-reflect')}
    <ul class="vx-pairs">${D.practice.pairs.map((p, i) => `<li><details><summary><span class="bad">坏提示</span><span class="q">${esc(p.bad)}</span><span class="more">看改写 ↓</span></summary>
      <p><b>好提示：</b>${esc(p.good)}</p><p class="why"><b>为什么：</b>${esc(p.why)}</p></details></li>`).join('')}</ul>

    <div class="vx-block"><h3>小测：3 道单选</h3>
      <div class="vx-quiz">${R.quiz.map((q, i) => `<fieldset class="vx-q" data-a="${q.answer}"><legend>Q${i + 1} ${esc(q.q.zh)}</legend>
        ${q.options.map((o, j) => `<label><input type="radio" name="q${i}" value="${j}"><span>${'ABC'[j]}. ${esc(o.zh)}</span></label>`).join('')}
        <p class="vx-why" aria-live="polite" data-why="${esc(q.why.zh)}" data-ans="${'ABC'[q.answer]}"></p></fieldset>`).join('')}</div></div>

    <div class="vx-block"><h3>英语小练笔</h3><p class="mut" lang="en">${esc(R.english.prompt.en)}</p><p class="mut">${esc(R.english.prompt.zh)}</p>
      <ul class="vx-starters">${R.english.starters.map(s => `<li><button type="button" data-starter="${esc(s)}">${esc(s)}</button></li>`).join('')}</ul>
      <textarea class="vx-ta" id="note-en" lang="en" aria-label="English reflection" placeholder="Write 2–3 sentences…">${esc(notes['note-en'] || '')}</textarea><p class="vx-saved-at" data-for="note-en"></p></div>

    <div class="vx-block"><h3>课堂讨论</h3>
      <ol class="vx-disc">${D.discussion.map(d => `<li>${esc(d.zh)}</li>`).join('')}</ol></div>

    <div class="vx-block"><h3>${esc(R.prompt.title.zh)}</h3><p class="mut">复制到 ChatGPT、Claude 或 DeepSeek，把 [your field] 换成你的专业。</p>
      <div class="vx-pwrap"><pre class="vx-prompt" id="vxPrompt" lang="en">${esc(R.prompt.text)}</pre><button type="button" class="vx-chip" id="vxCopyPrompt">复制提示词</button></div></div>

    <div class="vx-til"><h3>今天我真正学会了什么？</h3><p class="sub" lang="en">Today I learned…</p>
      <textarea class="vx-ta" id="note-til" aria-label="Today I learned 今天我学会了" placeholder="一句话就够。">${esc(notes['note-til'] || '')}</textarea><p class="vx-saved-at" data-for="note-til"></p></div>

    <details class="vx-fold vx-med"><summary><b>${esc(M.title.zh)}</b><span>选读</span></summary>
      <p class="mut">作者：${esc(M.author.zh)}</p>${M.points.map(p => `<p>${esc(p.zh)}</p>`).join('')}</details>

    <figure class="vx-ai vx-close-fig"><img src="${esc(Z.image.src)}" alt="${esc(Z.image.alt)}" loading="lazy" width="1200" height="654"><figcaption><b>${esc(Z.image.credit || 'AI 生成示意图')}</b></figcaption></figure>
    <p class="vx-closing">${esc(Z.line.zh)}</p>
    <p class="vx-hw">${esc(Z.homework.zh)}</p>

    <details class="vx-fold"><summary><b>来源与核对</b><span>原视频 · 文稿方法 · 引用</span></summary>
      <ol class="vx-src">${D.sources.map(k => `<li><a href="${esc(S[k].url)}" target="_blank" rel="noopener">${esc(S[k].title)} ↗</a>${S[k].note ? `<br><small>${esc(S[k].note.zh)}</small>` : ''}</li>`).join('')}</ol>
      <p class="vx-note">说明：${esc(D.transcriptNote.zh)} ${esc(D.aiImageNote.zh)}</p>
      <p class="vx-note">延伸阅读：${D.further.map(f => `<a href="${esc(f.url)}" target="_blank" rel="noopener">${esc(f.title)}</a>（${esc(f.zh)}）`).join('；')}</p>
      <p class="vx-note">AI VOICES · ${esc(D.no)} · v${esc(D.version)} · 最近核验 ${esc(D.verifiedAt)} · ${D.publishedAt ? '发布 ' + esc(D.publishedAt) : '预览版 · 尚未正式发布'} · ${esc(D.editor.zh)}</p>
    </details>
    <p class="vx-slogan" lang="en">${esc(C.series.en)}</p>
  </div>
</section>`;

    const pager = `
<nav class="vx-pager" aria-label="翻页 Pager">
  <a class="vx-home" href="../index.html#voices">← 学习中心</a>
  <p class="vx-hint">AI VOICES｜${esc(C.issue.zh)} · 按 ← / → 翻章节</p>
  <div class="vx-pg">
    <button type="button" id="vxPrev" aria-label="上一章 Previous chapter">‹ <span>上一章</span></button>
    <span class="vx-count" aria-live="polite"><b id="vxNo">1</b> / ${CH.length}</span>
    <button type="button" id="vxNext" aria-label="下一章 Next chapter"><span>下一章</span> ›</button>
  </div>
</nav>`;

    app.innerHTML = head + `<main id="main" class="vx-deck">${c1}${c2}${c3}${c4}${c5}</main>` + pager + `<div class="vx-toast" id="vxToast" role="status" aria-live="polite"></div>`;
    setLang(new URLSearchParams(location.search).get('lang') || store.get(LS.lang, 'bi'), false);
    wire();
    go(fromHash(), false, true);
    if (HLS) loadHLS(); else loadYT();
  }

  /* ---------------- paging ---------------- */
  function fromHash() {
    const h = location.hash.replace('#', '');
    const m = /^ch([1-9])$/.exec(h); if (m) return Math.min(CH.length, +m[1]) - 1;
    if (LEGACY[h]) return LEGACY[h] - 1;
    return 0;
  }
  function go(i, push, first) {
    if (i < 0 || i >= CH.length) return;
    const was = page; page = i;
    $$('.vx-ch').forEach((s, j) => { const on = j === i; s.classList.toggle('on', on); s.setAttribute('aria-hidden', String(!on)); if ('inert' in s) s.inert = !on; });
    $$('.vx-tabs a').forEach((a, j) => a.setAttribute('aria-current', j === i ? 'step' : 'false'));
    $('#vxNo').textContent = String(i + 1);
    $('#vxPrev').disabled = i === 0; $('#vxNext').disabled = i === CH.length - 1;
    $('#vxBar').style.width = ((i + 1) / CH.length * 100) + '%';
    const want = '#ch' + (i + 1);
    if (location.hash !== want) { if (push) history.pushState(null, '', want); else history.replaceState(null, '', want); }
    if (!first) window.scrollTo(0, 0);
    if (was === 1 && i !== 1 && ready && player.getPlayerState && player.getPlayerState() === 1) { player.pauseVideo(); toast('已暂停视频 · 回到第 2 章继续'); }
    if (i === 1) fit();
    if (!first) { const h = $('#ch' + (i + 1) + ' h1, #ch' + (i + 1) + ' h2'); if (h) { h.setAttribute('tabindex', '-1'); h.focus({ preventScroll: true }); } }
  }

  /* ---------------- interactions ---------------- */
  function toast(msg) { const t = $('#vxToast'); t.textContent = msg; t.classList.add('on'); clearTimeout(toast.h); toast.h = setTimeout(() => t.classList.remove('on'), 1800); }
  function copy(txt, btn) {
    const o = btn ? btn.textContent : '';
    if (btn) { btn.textContent = '✓ 已复制'; btn.classList.add('done'); setTimeout(() => { btn.textContent = o; btn.classList.remove('done'); }, 1600); }
    toast('已复制 Copied');
    let ok = false;
    const ta = document.createElement('textarea'); ta.value = txt; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.top = '0'; ta.style.opacity = '0'; document.body.appendChild(ta); ta.select();
    try { ok = document.execCommand('copy'); } catch (e) { } ta.remove();
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).catch(() => { if (!ok) { toast('复制失败，请手动选择文字'); if (btn) btn.textContent = o; } });
    else if (!ok) { toast('复制失败，请手动选择文字'); if (btn) btn.textContent = o; }
  }
  const sentById = id => SENT.find(s => s.id === id);
  const segById = id => D.segments.find(g => g.id === id);
  function fit() {
    const col = $('#vxPlayerCol'), txc = $('#vxTxCol'); if (!col || !txc) return;
    if (innerWidth > 900) txc.style.height = Math.max(420, col.offsetHeight) + 'px'; else txc.style.height = '';
  }

  function wire() {
    $$('.vx-lang button').forEach(b => b.addEventListener('click', () => setLang(b.dataset.l, true)));

    // paging: tabs, pager, keys, hash, swipe
    $$('[data-go]').forEach(a => a.addEventListener('click', e => { e.preventDefault(); go(+a.dataset.go, true); if (a.classList.contains('vx-start')) playSeg('A'); }));
    $('#vxPrev').addEventListener('click', () => go(page - 1, true));
    $('#vxNext').addEventListener('click', () => go(page + 1, true));
    addEventListener('popstate', () => go(fromHash(), false));
    addEventListener('hashchange', () => { const i = fromHash(); if (i !== page) go(i, false); });
    document.addEventListener('keydown', e => {
      if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
      const t = e.target; if (t && t.closest && (t.closest('input,textarea,select,[contenteditable="true"]') || t.isContentEditable)) return;
      if (document.fullscreenElement) return;
      if (e.key === 'ArrowRight' || e.key === 'PageDown') { e.preventDefault(); go(page + 1, true); }
      else if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); go(page - 1, true); }
    });
    let sx = 0, sy = 0, st = 0, sOk = false;
    const deck = $('#main');
    deck.addEventListener('touchstart', e => {
      const t = e.touches[0]; sx = t.clientX; sy = t.clientY; st = Date.now();
      sOk = e.touches.length === 1 && !e.target.closest('.vx-frame,.vx-tx,.vx-filters,.vx-ctl,input,textarea,pre,.vx-lang,.vx-rounds');
    }, { passive: true });
    deck.addEventListener('touchend', e => {
      if (!sOk) return; const t = e.changedTouches[0]; const dx = t.clientX - sx, dy = t.clientY - sy;
      if (Date.now() - st < 700 && Math.abs(dx) > 80 && Math.abs(dx) > 2 * Math.abs(dy)) go(page + (dx < 0 ? 1 : -1), true);
    }, { passive: true });

    // cover → watch
    $('#vxCover').addEventListener('click', () => { go(1, true); playSeg('A'); });
    const coverImg = $('#vxCover img'); coverImg.addEventListener('error', () => { if (!coverImg.dataset.f) { coverImg.dataset.f = 1; coverImg.src = D.cover.image.fallback; } else $('#vxCover').classList.add('noimg'); });
    const posterImg = $('#vxPoster img'); posterImg.addEventListener('error', () => posterImg.remove());
    $('#vxPoster').addEventListener('click', () => { if (fallback) return; playSeg(HLS && curSeg ? curSeg : 'A'); });

    // transcript clicks
    $('#vxTx').addEventListener('click', e => {
      if (e.target.closest('[data-noseek]')) return;
      const b = e.target.closest('.vx-s'); if (!b) return;
      const s = sentById(b.dataset.id);
      if (fallback) { if (HLS) toast('视频暂不可用 · 文稿可独立学习'); else window.open(`${D.video.url}&t=${Math.floor(s.start)}s`, '_blank', 'noopener'); return; }
      if (loopAB) setLoop(s);
      seek(s.start, true, s.seg);
    });
    $$('[data-seg]').forEach(b => b.addEventListener('click', () => playSeg(b.dataset.seg)));
    $$('[data-rate]').forEach(b => b.addEventListener('click', () => {
      const r = parseFloat(b.dataset.rate); rate = r; if (ready) player.setPlaybackRate(r);
      $$('[data-rate]').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
    }));
    $('#vxLoop').addEventListener('click', () => {
      if (loopAB) { loopAB = null; $('#vxLoop').setAttribute('aria-pressed', 'false'); toast('已取消循环'); return; }
      const s = SENT[active >= 0 ? active : (HLS ? SENT.findIndex(x => x.seg === curSeg) : 0)] || SENT[0]; setLoop(s); seek(s.start, true, s.seg);
    });
    const exitFs = () => { const x = document.exitFullscreen || document.webkitExitFullscreen; if (document.fullscreenElement || document.webkitFullscreenElement) x && x.call(document); };
    $('#vxFsx').addEventListener('click', exitFs);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') exitFs(); });
    $('#vxFull').addEventListener('click', () => {
      const f = $('#vxFrame'); const req = f.requestFullscreen || f.webkitRequestFullscreen;
      if (document.fullscreenElement || document.webkitFullscreenElement) exitFs(); else if (req) req.call(f); else toast('请使用播放器自带的全屏按钮');
    });
    $('#vxOnly').addEventListener('change', e => onlySegs = e.target.checked);
    $$('[data-round]').forEach(b => b.addEventListener('click', () => setRound(+b.dataset.round)));
    $('#vxShadowGo').addEventListener('click', endShadow);
    $('#vxRetry').addEventListener('click', () => location.reload());

    // timestamp buttons anywhere → chapter 2 + seek
    document.addEventListener('click', e => {
      const b = e.target.closest('[data-seekid],[data-seekt]'); if (!b) return;
      e.stopPropagation();
      let t, idx = -1;
      if (b.dataset.seekid) { const s = sentById(b.dataset.seekid); if (!s) return; t = s.start; idx = SENT.indexOf(s); }
      else { t = parseFloat(b.dataset.seekt); }
      if (fallback) { if (HLS) toast('视频暂不可用 · 文稿可独立学习'); else window.open(`${D.video.url}&t=${Math.floor(t)}s`, '_blank', 'noopener'); return; }
      if (!HLS && idx < 0 && onlySegs) { onlySegs = false; $('#vxOnly').checked = false; toast('这一句不在三段摘录里 · 已切到完整视频'); }
      if (page !== 1) go(1, true);
      seek(t, true, idx >= 0 ? SENT[idx].seg : null); if (idx >= 0) mark(idx, true);
    }, true);

    // expressions copy / save
    const saved = new Set(store.get(LS.saved, []));
    const exTxt = e => `${e.phrase}\n${D.learningMode === 'guide' ? '课程原创练习 · 非讲者引文' : '“' + e.snippet + '” — ' + D.speaker.name}\n${D.talk.title} (${e.at.label})\n${e.zh}\n${e.example.en}\n${e.example.zh}`;
    const upd = () => { $('#vxSavedN').textContent = saved.size ? `已收藏 ${saved.size} 个表达（保存在本机）` : '还没有收藏。点 ☆ 收藏想记住的表达。'; $('#vxCopySaved').disabled = !saved.size; };
    $$('[data-copyex]').forEach(b => b.addEventListener('click', () => copy(exTxt(D.expressions.find(x => x.id === b.dataset.copyex)), b)));
    $$('[data-save]').forEach(b => b.addEventListener('click', () => {
      const id = b.dataset.save; saved.has(id) ? saved.delete(id) : saved.add(id);
      store.set(LS.saved, Array.from(saved)); b.setAttribute('aria-pressed', String(saved.has(id))); b.textContent = saved.has(id) ? '★ 已收藏' : '☆ 收藏'; upd();
    }));
    $('#vxCopySaved').addEventListener('click', e => copy(D.expressions.filter(x => saved.has(x.id)).map(exTxt).join('\n\n'), e.currentTarget));
    upd();

    // flip cards: whole card is the control (click / Enter / Space); timestamp buttons inside don't flip
    $$('.vx-card').forEach(card => {
      const flip = () => {
        const on = !card.classList.contains('flipped');
        card.classList.toggle('flipped', on); card.setAttribute('aria-pressed', String(on));
        $('.front', card).setAttribute('aria-hidden', String(on)); $('.back', card).setAttribute('aria-hidden', String(!on));
        $$('.back .vx-ts', card).forEach(x => x.tabIndex = on ? 0 : -1);
      };
      card.addEventListener('click', e => { if (e.target.closest('.vx-ts,a')) return; flip(); });
      card.addEventListener('keydown', e => { if (e.target !== card) return; if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); flip(); } });
      $$('.back .vx-ts', card).forEach(x => x.tabIndex = -1);
    });

    // fact-check filters
    const facts = $$('#vxFacts > li');
    $$('[data-f]').forEach(b => b.addEventListener('click', () => {
      const f = b.dataset.f; let n = 0;
      $$('[data-f]').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
      facts.forEach(li => { const on = f === 'all' || li.dataset.tag === f; li.hidden = !on; if (on) n++; });
      $('#vxEmpty').hidden = n > 0;
    }));

    // debate side
    $$('[data-side]').forEach(b => b.addEventListener('click', () => {
      store.set(LS.side, b.dataset.side); $$('[data-side]').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
      $('#vxSideMsg').textContent = '你的选择已保存在本机。再读一遍另一边，它最强的理由是什么？';
    }));

    // notes (localStorage)
    const notes = store.get(LS.notes, {});
    $$('.vx-ta').forEach(ta => {
      const msg = $(`.vx-saved-at[data-for="${ta.id}"]`); let h;
      if (notes[ta.id]) msg.textContent = '已保存在本机';
      ta.addEventListener('input', () => { clearTimeout(h); h = setTimeout(() => { notes[ta.id] = ta.value; store.set(LS.notes, notes); msg.textContent = '已保存在本机 · ' + new Date().toLocaleTimeString(); }, 400); });
    });
    $$('[data-starter]').forEach(b => b.addEventListener('click', () => { const ta = $('#note-en'); ta.value = (ta.value ? ta.value.trimEnd() + ' ' : '') + b.dataset.starter + ' '; ta.focus(); ta.dispatchEvent(new Event('input')); }));
    $('#vxCopyPrompt').addEventListener('click', e => copy(D.reflect.prompt.text, e.currentTarget));

    // quiz
    $$('.vx-q').forEach(fs => fs.addEventListener('change', e => {
      const a = +fs.dataset.a, v = +e.target.value;
      $$('label', fs).forEach((l, j) => { l.classList.toggle('right', j === a); l.classList.toggle('wrong', j === v && v !== a); });
      const w = $('.vx-why', fs); w.innerHTML = `<b>${v === a ? '✓ 答对了。' : '✗ 再想想。'}答案 ${esc(w.dataset.ans)}。</b>` + esc(w.dataset.why);
    }));

    if ('ResizeObserver' in window) new ResizeObserver(fit).observe($('#vxPlayerCol')); addEventListener('resize', fit);
  }

  function setRound(r) {
    round = r;
    $$('.vx-rounds [data-round]').forEach(b => b.setAttribute('aria-pressed', String(+b.dataset.round === r)));
    $('#vxTxCol').classList.toggle('blind', r === 1);
    if (r === 2) setLang('bi', false);
    if (r === 3) { setLang('en', false); toast(D.learningMode === 'guide' ? '第 3 轮：每个要点语段结束暂停，用自己的英语复述后点继续' : '第 3 轮：每句结束会暂停，跟读原声后继续'); }
    if (r !== 3) endShadow();
  }
  function setLoop(s) { loopAB = { a: s.start, b: s.end, id: s.id }; $('#vxLoop').setAttribute('aria-pressed', 'true'); $('#vxNow').textContent = ` · 循环 ${fmt(s.start)}–${fmt(s.end)}`; }

  function mark(i, scroll) {
    if (i === active) return;
    const prev = $('.vx-s.on'); if (prev) { prev.classList.remove('on'); prev.removeAttribute('aria-current'); }
    active = i; if (i < 0) return;
    const el = document.getElementById('s-' + SENT[i].id); if (!el) return;
    el.classList.add('on'); el.setAttribute('aria-current', 'true');
    const box = $('#vxTx');
    if (box && box.offsetParent !== null && page === 1) {
      const top = el.getBoundingClientRect().top - box.getBoundingClientRect().top + box.scrollTop - box.clientHeight * 0.3;
      box.scrollTo({ top: Math.max(0, top), behavior: scroll ? 'smooth' : 'auto' });
    }
  }

  /* ---------------- YouTube IFrame API ---------------- */
  function loadYT() {
    const timer = setTimeout(() => { if (!ready) goFallback('timeout'); }, 20000);
    window.onYouTubeIframeAPIReady = function () {
      try {
        player = new YT.Player('vxPlayer', {
          host: 'https://www.youtube-nocookie.com', videoId: D.video.id,
          playerVars: { start: Math.floor(D.segments[0].start), rel: 0, playsinline: 1, modestbranding: 1, iv_load_policy: 3, cc_load_policy: 1, cc_lang_pref: 'en', hl: 'en', origin: location.origin },
          events: {
            onReady: () => { ready = true; fallback = false; clearTimeout(timer); $('#vxFallback').classList.remove('on'); $$('.vx-ctl button').forEach(b => b.disabled = false); $('#vxPState').textContent = '▶ 点击播放片段 A'; root.classList.remove('vx-nf'); startPoll(); tick(); if (pendingSeek !== null) { const p = pendingSeek; pendingSeek = null; seek(p, true); } },
            onStateChange: e => { if (e.data === 1) $('#vxPoster').style.display = 'none'; tick(); },
            onError: e => { clearTimeout(timer); goFallback('error ' + e.data); }
          }
        });
      } catch (err) { goFallback('init'); }
    };
    const s = document.createElement('script'); s.src = 'https://www.youtube.com/iframe_api'; s.async = true;
    s.onerror = () => { clearTimeout(timer); goFallback('blocked'); };
    document.head.appendChild(s);
  }
  let pendingSeek = null;
  function goFallback(why) {
    if (ready && why === 'timeout') return;
    fallback = true; stopPoll(); root.classList.add('vx-nf');
    $('#vxFallback').classList.add('on'); $('#vxPState').textContent = '视频不可用 · 文稿可独立学习';
    $$('.vx-ctl button').forEach(b => b.disabled = true);
    console.info('[AI VOICES] fallback:', why);
  }
  function seek(t, play, seg) {
    if (HLS) { hlsSeek(t, play, seg || curSeg); return; }
    if (!ready) { if (fallback) toast('视频不可用，可在 YouTube 打开'); else { pendingSeek = t; toast('播放器还在加载…'); } return; }
    endShadow(true); shadowFor = -1; endedOnce = false;
    mark(-1, false); player.seekTo(Math.max(0, t), true); if (play) player.playVideo();
  }
  function playSeg(id) {
    const g = segById(id); if (!g) return;
    if (loopAB) { loopAB = null; $('#vxLoop').setAttribute('aria-pressed', 'false'); }
    if (!HLS && !onlySegs) { onlySegs = true; $('#vxOnly').checked = true; }
    seek(g.start, true, g.id);
  }
  function startPoll() { stopPoll(); poll = setInterval(tick, 200); }
  function stopPoll() { if (poll) clearInterval(poll); poll = null; }
  function tick() {
    if (!ready) return;
    const t = player.getCurrentTime();
    const playing = player.getPlayerState() === 1;
    if (playing && loopAB && (t >= loopAB.b - 0.05 || t < loopAB.a - 1.5)) { player.seekTo(loopAB.a, true); return; }
    let i = -1;
    for (let k = 0; k < SENT.length; k++) { if ((!HLS || SENT[k].seg === curSeg) && t >= SENT[k].start && t < SENT[k].end) { i = k; break; } }
    if (i !== active) mark(i, true);
    if (!HLS && playing && onlySegs && !loopAB && i < 0) {
      const gs = D.segments; const nxt = gs.find(g => t < g.start - 0.5);
      const inside = gs.some(g => t >= g.start - 0.5 && t < g.end);
      if (!inside) {
        const last = gs[gs.length - 1];
        if (t >= last.end && t < last.end + 3 && !endedOnce) { endedOnce = true; player.pauseVideo(); toast('三段摘录播完了 · 按 → 进入第 3 章'); }
        else if (nxt && t > gs[0].start) { player.seekTo(nxt.start, true); toast(`跳到 ${nxt.title.zh}`); }
      }
    }
    if (playing && round === 3 && !loopAB && active >= 0 && shadowFor !== active) {
      const s = SENT[active];
      if (t >= s.end - 0.25) {
        shadowFor = active; player.pauseVideo();
        $('#vxShadowText').textContent = s.en; $('#vxShadow').classList.add('on');
        const wait = Math.min(12, Math.max(2.5, (s.end - s.start) * 1.1)) * 1000;
        if (D.learningMode !== 'guide') shadowTimer = setTimeout(endShadow, wait);
      }
    }
    if (!loopAB) $('#vxNow').textContent = ' · ' + (HLS ? `${segById(curSeg).short || curSeg} · ${fmt(t)}` : (i >= 0 ? `${SENT[i].seg} · ${fmt(t)}` : fmt(t)));
  }
  function endShadow(silent) {
    clearTimeout(shadowTimer); const box = $('#vxShadow');
    if (box && box.classList.contains('on')) { box.classList.remove('on'); if (silent !== true && ready && round === 3) player.playVideo(); }
  }

  /* ---------------- self-hosted HLS (v1.2) ---------------- */
  let rate = 1, hlsPending = null;
  function partOf(seg) { const g = segById(seg); return D.video.parts.find(p => p.id === g.part); }
  function loadHLS() {
    vidEl = document.createElement('video');
    vidEl.setAttribute('playsinline', ''); vidEl.setAttribute('controls', ''); vidEl.preload = 'metadata';
    vidEl.setAttribute('aria-label', '课程视频 Lesson video');
    $('#vxPlayer').replaceWith(vidEl); vidEl.id = 'vxPlayer';
    player = {
      getCurrentTime: () => vidEl.currentTime || 0,
      getPlayerState: () => (!vidEl.paused && !vidEl.ended ? 1 : 2),
      seekTo: t => { try { vidEl.currentTime = t; } catch (e) { } },
      playVideo: () => { const p = vidEl.play(); if (p && p.catch) p.catch(() => { }); },
      pauseVideo: () => vidEl.pause(),
      setPlaybackRate: r => { vidEl.playbackRate = r; }
    };
    vidEl.addEventListener('play', () => { $('#vxPoster').style.display = 'none'; tick(); });
    vidEl.addEventListener('pause', tick);
    vidEl.addEventListener('timeupdate', tick);
    vidEl.addEventListener('ended', () => {
      const i = D.segments.findIndex(g => g.id === curSeg), nx = D.segments[i + 1];
      if (onlySegs && nx && page === 1) { toast(`接着播放 ${nx.short || nx.id}`); hlsSeek(0, true, nx.id); }
      else if (!nx) toast('四集都看完了 · 按 → 进入第 3 章');
    });
    vidEl.addEventListener('error', () => { if (!vidEl.currentSrc && !hlsObj) return; goFallback('media error'); });
    const go2 = () => { ready = true; root.classList.remove('vx-nf'); $$('.vx-ctl button').forEach(b => b.disabled = false); setPart(D.segments[0].id, 0, false); $('#vxPState').textContent = '▶ 点击播放第 1 集'; startPoll(); };
    if (vidEl.canPlayType('application/vnd.apple.mpegurl') || window.Hls) { go2(); return; }
    const sc = document.createElement('script'); sc.src = D.video.hlsLib; sc.async = true;
    sc.onload = go2; sc.onerror = () => goFallback('hls.js blocked');
    document.head.appendChild(sc);
  }
  function setPart(seg, t, play) {
    const P = partOf(seg); if (!P) return;
    const same = seg === curSeg;
    curSeg = seg; mark(-1, false);
    $$('.vx-ctl [data-seg]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.seg === seg)));
    $$('.vx-part').forEach(el => el.hidden = el.dataset.part !== seg);
    const box = $('#vxTx'); if (box && !same) box.scrollTop = 0;
    if (same) { player.seekTo(t); if (play) player.playVideo(); return; }
    hlsPending = { t, play };
    if (hlsObj) { hlsObj.destroy(); hlsObj = null; }
    vidEl.poster = P.poster;
    const onMeta = () => { vidEl.removeEventListener('loadedmetadata', onMeta); const p = hlsPending; hlsPending = null; vidEl.playbackRate = rate; if (p) { if (p.t > 0) player.seekTo(p.t); if (p.play) player.playVideo(); } };
    vidEl.addEventListener('loadedmetadata', onMeta);
    if (vidEl.canPlayType('application/vnd.apple.mpegurl')) { vidEl.src = P.src; }
    else if (window.Hls && Hls.isSupported()) {
      hlsObj = new Hls({ maxBufferLength: 30 }); hlsObj.loadSource(P.src); hlsObj.attachMedia(vidEl);
      hlsObj.on(Hls.Events.ERROR, (e, d) => { if (d && d.fatal) goFallback('hls ' + d.type); });
    } else { vidEl.src = P.src; }
  }
  function hlsSeek(t, play, seg) {
    if (!ready) { if (fallback) toast('视频暂不可用 · 文稿可独立学习'); else toast('播放器还在加载…'); return; }
    endShadow(true); shadowFor = -1; endedOnce = false;
    setPart(seg || D.segments[0].id, Math.max(0, t), play);
  }
})();
