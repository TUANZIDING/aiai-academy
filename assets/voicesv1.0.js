/* AI VOICES · lesson template v1.0 — renders data/voices/voices-NNNv*.json
   Five chapters: 01 THE QUESTION · 02 WATCH & LISTEN · 03 THREE BIG IDEAS · 04 THINK & VERIFY · 05 REFLECT & PRACTICE
   Video: official YouTube embed via IFrame Player API (youtube-nocookie host). Never downloaded or rehosted.
   Fallback (API blocked, e.g. mainland China): standalone transcript + "open on YouTube from here" links. */
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
  const fmt = t => { t = Math.max(0, Math.floor(t)); return Math.floor(t / 60) + ':' + String(t % 60).padStart(2, '0'); };
  const $ = (s, el) => (el || document).querySelector(s);
  const $$ = (s, el) => Array.from((el || document).querySelectorAll(s));
  // pair renderer: English first, Chinese second (bilingual order rule)
  const pair = (o, tag, cls) => { tag = tag || 'p'; cls = cls || ''; let h = ''; if (o.en) h += `<${tag} class="l-en ${cls}" lang="en">${esc(o.en)}</${tag}>`; if (o.zh) h += `<${tag} class="l-zh ${cls}" lang="zh-CN">${esc(o.zh)}</${tag}>`; return h; };
  const CH = [
    { id: 'question', no: '01', en: 'THE QUESTION', zh: '一个问题' },
    { id: 'watch', no: '02', en: 'WATCH & LISTEN', zh: '看与听' },
    { id: 'ideas', no: '03', en: 'THREE BIG IDEAS', zh: '三个大想法' },
    { id: 'verify', no: '04', en: 'THINK & VERIFY', zh: '思考与核实' },
    { id: 'reflect', no: '05', en: 'REFLECT & PRACTICE', zh: '反思与练习' }];

  let D, SENT = [], player = null, ready = false, fallback = false, poll = null, active = -1;
  let loopAB = null, endedOnce = false, onlySegs = true, round = 2, shadowFor = -1, shadowTimer = null;

  fetch(src, { cache: 'no-cache' }).then(r => { if (!r.ok) throw new Error(r.status); return r.json(); }).then(render).catch(err => {
    app.innerHTML = `<div class="vx-err"><p>课程数据加载失败（${esc(err.message)}）。Lesson data failed to load.</p><p><a href="../index.html">← aiai 人工智能学院</a></p></div>`;
  });

  function setLang(l, save) {
    if (!['bi', 'zh', 'en'].includes(l)) l = 'bi';
    root.dataset.vl = l;
    $$('.vx-lang button').forEach(b => b.setAttribute('aria-checked', String(b.dataset.l === l)));
    if (save) store.set(LS.lang, l);
  }

  function render(data) {
    D = data;
    const V = D.video, S = D.sourceMap;
    SENT = D.segments.flatMap(g => g.sentences.map(s => Object.assign({ seg: g.id }, s)));
    document.title = `${D.no} · ${D.speaker.name} · ${D.question.zh} | aiai 学院`;
    const ytAt = t => `${V.url}&t=${Math.floor(t)}s`;

    const head = `
<header class="vx-top" id="vxTop">
  <div class="vx-bar">
    <a class="vx-brand" href="../index.html" aria-label="aiai 人工智能学院 首页"><img src="../assets/aiai-wordmarkv1.0.webp" alt="aiai" width="51" height="22"><span>AI VOICES<i>大师访谈与思想课</i></span></a>
    <span class="vx-sp"></span>
    <span class="vx-count" aria-live="polite"><b id="vxNo">01</b> / 05</span>
    <div class="vx-lang" role="radiogroup" aria-label="字幕语言 Transcript language">
      <button type="button" role="radio" data-l="bi" aria-checked="false">中英</button><button type="button" role="radio" data-l="zh" aria-checked="false">中文</button><button type="button" role="radio" data-l="en" aria-checked="false">EN</button>
    </div>
  </div>
  <div class="vx-prog" aria-hidden="true"><i id="vxBar"></i></div>
</header>
<ol class="vx-dots" aria-label="章节 Chapters">${CH.map(c => `<li><a href="#${c.id}" aria-label="${c.no} ${c.en} ${c.zh}"><span>${c.no} ${c.en}</span></a></li>`).join('')}</ol>`;

    const eb = c => `<p class="vx-eyebrow"><span class="jn">${c.no}</span><span class="ek">${c.en}</span></p>`;

    /* 01 THE QUESTION — first screen: lesson no. + person, one question, background, source line, cover */
    const c1 = `
<section class="vx-ch vx-hero" id="question" aria-labelledby="vxQ">
  <div class="vx-wide">
    <div>
      <p class="vx-kick"><b>${esc(D.no)}</b> · ${esc(D.speaker.name)}</p>
      <h1 id="vxQ">${esc(D.question.zh)}</h1>
      <p class="q-en" lang="en">${esc(D.question.en)}</p>
      <p class="vx-bg">${esc(D.background.zh)}</p>
      <p class="vx-srcline">${esc(D.speaker.name)} · “${esc(D.talk.title)}” · ${esc(D.talk.event)} · ${esc(D.talk.deliveredOn)} · <a href="${esc(V.url)}" target="_blank" rel="noopener">YouTube · ${esc(V.channel)} ↗</a></p>
    </div>
    <button type="button" class="vx-cover" id="vxCover" aria-label="播放视频，进入第 02 章 Play the talk">
      <img src="${esc(V.thumb)}" alt="${esc(D.talk.title)} — YouTube 视频封面" width="1280" height="720" fetchpriority="high" referrerpolicy="no-referrer">
      <span class="pl" aria-hidden="true"></span>
      <span class="cap">▶ 听原声 · 约 5 分钟，三段摘录 · Watch the 3 excerpts</span>
    </button>
  </div>
</section>`;

    /* 02 WATCH & LISTEN */
    const tx = D.segments.map(g => `
      <div class="vx-seg-h"><span>${esc(g.title.zh)} · ${fmt(g.start)}–${fmt(g.end)}</span><button type="button" data-seg="${g.id}">▶ 播放此段</button></div>
      ${g.sentences.map(s => `<button type="button" class="vx-s" id="s-${s.id}" data-id="${s.id}" data-t="${s.start}">
        <span class="tm">${fmt(s.start)}</span>
        <span><span class="en l-en" lang="en">${esc(s.en)}</span><span class="zh l-zh" lang="zh-CN">${esc(s.zh)}</span>
        <a class="yt" href="${esc(ytAt(s.start))}" target="_blank" rel="noopener" data-noseek>在 YouTube 打开（从此处）↗</a></span>
      </button>`).join('')}`).join('');
    const saved = store.get(LS.saved, []);
    const ex = D.expressions.map((e, i) => `<li data-e="${e.id}">
      <p class="ph" lang="en">${esc(e.phrase)}</p>
      <p class="mn">${esc(e.zh)}</p>
      <div class="acts">
        <button type="button" class="vx-chip" data-seekid="${e.sid}">▶ 听原句 ${esc(e.at.label)}</button>
        <button type="button" class="vx-chip" data-copyex="${e.id}">复制</button>
        <button type="button" class="vx-chip" data-save="${e.id}" aria-pressed="${saved.includes(e.id)}">${saved.includes(e.id) ? '★ 已收藏' : '☆ 收藏'}</button>
      </div>
      <details><summary>展开：原句、搭配、语境、例句</summary><div class="body">
        <p class="snip" lang="en">${esc(e.snippet)}</p>
        <dl><dt>关键词</dt><dd>${e.keys.map(esc).join('<br>')}</dd><dt>常用搭配</dt><dd lang="en">${e.collocations.map(esc).join(' · ')}</dd><dt>语境</dt><dd>${esc(e.context.zh)}</dd></dl>
        <p><span lang="en">${esc(e.example.en)}</span><br><span style="color:var(--vx-muted)">${esc(e.example.zh)}</span></p>
      </div></details>
    </li>`).join('');
    const c2 = `
<section class="vx-ch" id="watch" aria-labelledby="h-watch">
  <div class="vx-wide">
    ${eb(CH[1])}
    <h2 id="h-watch">先听他怎么说</h2>
    <p class="vx-lede">三段原声，共约 ${Math.round(D.segments.reduce((a, g) => a + g.end - g.start, 0) / 60)} 分钟。点任意一句，视频就跳到那里。</p>
    <div class="vx-watch">
      <div class="vx-player-col" id="vxPlayerCol">
        <div class="vx-frame" id="vxFrame">
          <div id="vxPlayer"></div>
          <button type="button" class="vx-poster" id="vxPoster" aria-label="播放 Play"><img src="${esc(V.thumbFallback)}" alt="" referrerpolicy="no-referrer"><span class="pl" aria-hidden="true"></span><span class="st" id="vxPState">正在连接 YouTube…</span></button>
        </div>
        <div class="vx-ctl" role="toolbar" aria-label="播放控制 Player controls">
          <span class="vx-grp"><span>片段</span>${D.segments.map(g => `<button type="button" class="vx-chip" data-seg="${g.id}">${g.id}</button>`).join('')}</span>
          <span class="vx-grp" role="group" aria-label="速度 Speed"><span>速度</span>${[0.75, 1, 1.25].map(r => `<button type="button" class="vx-chip" data-rate="${r}" aria-pressed="${r === 1}">${r}×</button>`).join('')}</span>
          <button type="button" class="vx-chip" id="vxLoop" aria-pressed="false">⟲ 循环本句</button>
          <button type="button" class="vx-chip" id="vxFull">⛶ 全屏</button>
        </div>
        <p class="vx-now" id="vxNow" aria-live="polite"></p>
        <div class="vx-shadow" id="vxShadow" role="status"><span>跟读：<b id="vxShadowText"></b></span><button type="button" class="vx-chip" id="vxShadowGo">继续 ▶</button></div>
        <div class="vx-fallback" id="vxFallback" role="alert">
          <strong>视频播放器没有加载出来。</strong> 在中国大陆通常无法访问 YouTube。下面的文稿可以独立学习；每一句都附有“在 YouTube 打开（从此处）”链接，网络可用时可从该时间点观看。<br><a href="${esc(V.url)}" target="_blank" rel="noopener">在 YouTube 打开完整视频 ↗</a> · <button type="button" class="vx-chip" id="vxRetry">重试</button>
        </div>
      </div>
      <div class="vx-tx-col" id="vxTxCol">
        <div class="vx-tx-head">
          <div class="vx-rounds" role="group" aria-label="三轮学习 Three rounds">
            <button type="button" data-round="1" aria-pressed="false">① 盲听</button><button type="button" data-round="2" aria-pressed="true">② 双语</button><button type="button" data-round="3" aria-pressed="false">③ 跟读</button>
          </div>
          <label style="font-size:.76rem;color:var(--vx-muted);display:flex;gap:6px;align-items:center"><input type="checkbox" id="vxOnly" checked> 只播三段</label>
        </div>
        <div class="vx-blind"><strong>第 1 轮 · 先只听</strong><p>不看字幕，试着抓住三个词：1.0、2.0、3.0 分别指什么？</p><button type="button" class="vx-chip" data-round="2">听完了，看字幕 → 第 2 轮</button></div>
        <div class="vx-tx" id="vxTx" aria-label="同步文稿 Synced transcript">${tx}</div>
        <p class="vx-txnote">${esc(D.transcriptNote.zh)}</p>
      </div>
    </div>

    <div class="vx-in" style="margin-left:0">
      <p class="vx-step">第二步 · 记住 ${D.expressions.length} 个原声表达</p>
      <ul class="vx-ex" id="vxEx">${ex}</ul>
      <p class="vx-saved"><span id="vxSavedN"></span><button type="button" class="vx-chip" id="vxCopySaved">复制全部收藏</button></p>
    </div>
  </div>
</section>`;

    /* 03 THREE BIG IDEAS */
    const L = D.labels;
    const c3 = `
<section class="vx-ch" id="ideas" aria-labelledby="h-ideas">
  <div class="vx-wide">
    ${eb(CH[2])}
    <h2 id="h-ideas">三个值得带走的想法</h2>
    <p class="vx-lede">先读正面的一句话，自己想一想，再翻到背面。</p>
    <div class="vx-cards">${D.ideas.map((it, i) => `<article class="vx-card" id="card-${it.id}"><div class="in">
      <div class="vx-face front"><span class="n">0${i + 1}</span><h3>${esc(it.front.zh)}</h3><p class="fe" lang="en">${esc(it.front.en)}</p><button type="button" class="vx-flip" data-flip="${it.id}" aria-expanded="false">翻面 →</button></div>
      <div class="vx-face back" aria-hidden="true">
        <p><span class="vx-label ${it.label}">${esc(L[it.label].zh)}</span>${it.label === 'analysis' ? ` <span class="vx-label open">${esc(L.open.zh)}</span>` : ''}</p>
        <p>${esc(it.meaning.zh)}</p>
        <blockquote>${pair(it.quote)}<p><button type="button" class="vx-ts" data-seekid="${it.at.sid}">原声 ${esc(it.at.label)}</button></p></blockquote>
        <p class="ex"><b>生活里：</b>${esc(it.example.zh)}</p>
        <button type="button" class="vx-flip" data-flip="${it.id}" tabindex="-1">← 翻回</button>
      </div></div></article>`).join('')}</div>
  </div>
</section>`;

    /* 04 THINK & VERIFY */
    const side = store.get(LS.side, '');
    const c4 = `
<section class="vx-ch" id="verify" aria-labelledby="h-verify">
  <div class="vx-in">
    ${eb(CH[3])}
    <h2 id="h-verify">他说的，都对吗？</h2>
    <p class="vx-lede">大师也会预测、也有立场。把“他说了什么”和“证据支持什么”分开看。</p>
    <div class="vx-claims">${D.claims.map(k => `<article class="vx-claim">
      <p class="said" lang="en">“${esc(k.said.en)}”</p>
      <p class="said-zh">${esc(k.said.zh)} · <button type="button" class="vx-ts" data-seekid="${k.at.sid}">原声 ${esc(k.at.label)}</button></p>
      <ul class="vx-check">
        <li><span>这是</span><div>${esc(k.kind.zh)}</div></li>
        <li><span>支持的证据</span><div>${esc(k.support.zh)}</div></li>
        <li><span>反方</span><div>${esc(k.counter.zh)}</div></li>
        <li><span>怎么判断</span><div>${esc(k.judge.zh)}</div></li>
      </ul>
      <details><summary>查看证据细节与来源</summary><ul>${k.evidence.map(e => `<li>${esc(e.zh)} <a href="${esc(S[e.src].url)}" target="_blank" rel="noopener">${esc(S[e.src].title)} ↗</a></li>`).join('')}</ul></details>
    </article>`).join('')}</div>
    <div class="vx-debate">
      <p class="vx-step" style="margin-top:0">思辨 · 两边都想一想</p>
      <h3>${esc(D.debate.q.zh)}</h3>
      <div class="vx-sides">
        <button type="button" class="vx-side" data-side="pro" aria-pressed="${side === 'pro'}"><b>正方</b>${esc(D.debate.pro.zh)}<span class="l-en" lang="en">${esc(D.debate.pro.en)}</span></button>
        <button type="button" class="vx-side" data-side="con" aria-pressed="${side === 'con'}"><b>反方</b>${esc(D.debate.con.zh)}<span class="l-en" lang="en">${esc(D.debate.con.en)}</span></button>
      </div>
      <p class="vx-saved-at" id="vxSideMsg">${side ? '你的选择已保存在本机。下面写写为什么。' : '点一边，表明你此刻的倾向（只保存在本机）。'}</p>
    </div>
  </div>
</section>`;

    /* 05 REFLECT & PRACTICE */
    const R = D.reflect, notes = store.get(LS.notes, {});
    const c5 = `
<section class="vx-ch" id="reflect" aria-labelledby="h-reflect">
  <div class="vx-in">
    ${eb(CH[4])}
    <h2 id="h-reflect">轮到你了</h2>
    <p class="vx-lede">四个小练习，挑一个开始就好。写下的内容只保存在这台设备上。</p>

    <div class="vx-block"><span class="k">A · ENGLISH</span><h3 lang="en">${esc(R.english.prompt.en)}</h3><p style="color:var(--vx-muted);margin:0">${esc(R.english.prompt.zh)}</p>
      <ul class="vx-starters">${R.english.starters.map(s => `<li><button type="button" data-starter="${esc(s)}">${esc(s)}</button></li>`).join('')}</ul>
      <textarea class="vx-ta" id="note-en" lang="en" aria-label="English reflection" placeholder="Write 2–3 sentences…">${esc(notes['note-en'] || '')}</textarea><p class="vx-saved-at" data-for="note-en"></p></div>

    <div class="vx-block"><span class="k">B · 哲学</span><h3>${esc(R.philosophy.zh)}</h3><p style="color:var(--vx-muted);font-family:var(--vx-en);font-style:italic;margin:0" lang="en">${esc(R.philosophy.en)}</p></div>

    <div class="vx-block"><span class="k">C · AI 练习</span><h3>${esc(R.prompt.title.zh)}</h3><p style="color:var(--vx-muted);margin:0 0 12px">复制到 ChatGPT 或 Claude，把 [your field] 换成你的专业。</p>
      <div class="vx-pwrap"><pre class="vx-prompt" id="vxPrompt" lang="en">${esc(R.prompt.text)}</pre><button type="button" class="vx-chip" id="vxCopyPrompt">复制提示词</button></div></div>

    <div class="vx-block"><span class="k">D · 小测</span><h3>三道题，选完即看解析</h3>
      <div class="vx-quiz">${R.quiz.map((q, i) => `<fieldset class="vx-q" data-a="${q.answer}"><legend>${i + 1}. ${esc(q.q.zh)}</legend>
        ${q.options.map((o, j) => `<label><input type="radio" name="q${i}" value="${j}"><span>${esc(o.zh)}</span></label>`).join('')}
        <p class="vx-why" aria-live="polite" data-why="${esc(q.why.zh)}"></p></fieldset>`).join('')}</div></div>

    <div class="vx-til"><h3>今天我真正学会了什么？</h3><p class="sub" lang="en">Today I learned…</p>
      <textarea class="vx-ta" id="note-til" aria-label="Today I learned 今天我学会了" placeholder="一句话就够。">${esc(notes['note-til'] || '')}</textarea><p class="vx-saved-at" data-for="note-til"></p></div>

    <div style="margin-top:72px">
      <details class="vx-fold"><summary>${esc(D.medical.title.zh)}</summary><p>${esc(D.medical.text.zh)}</p></details>
      <details class="vx-fold"><summary>来源与原视频</summary>
        <ol class="vx-src">${D.sources.map(k => `<li><a href="${esc(S[k].url)}" target="_blank" rel="noopener">${esc(S[k].title)} ↗</a>${S[k].note ? `<br><small>${esc(S[k].note.zh)}</small>` : ''}</li>`).join('')}</ol></details>
      <details class="vx-fold"><summary>延伸阅读</summary>
        <ul class="vx-src">${D.further.map(f => `<li><a href="${esc(f.url)}" target="_blank" rel="noopener">${esc(f.title)} ↗</a> <small>${esc(f.zh)}</small></li>`).join('')}</ul></details>
    </div>
  </div>
</section>`;

    const foot = `<footer class="vx-foot"><p class="sl" lang="en">Watch in English. Think in depth. Learn with AI.</p>
      <p>AI VOICES · AI 大师访谈与思想课 · ${esc(D.no)} · v${esc(D.version)} · 最近核验 ${esc(D.verifiedAt)} · ${D.publishedAt ? '发布 ' + esc(D.publishedAt) : '预览版 · 尚未正式发布'}</p>
      <p>${esc(D.editor.zh)}</p>
      <p><a href="../index.html">← aiai 人工智能学院 · AIAI Academy</a></p></footer>`;

    app.innerHTML = head + `<main id="main">${c1}${c2}${c3}${c4}${c5}</main>` + foot + `<div class="vx-toast" id="vxToast" role="status" aria-live="polite"></div>`;
    setLang(new URLSearchParams(location.search).get('lang') || store.get(LS.lang, 'bi'), false);
    wire();
    loadYT();
  }

  /* ---------------- interactions ---------------- */
  function toast(msg) { const t = $('#vxToast'); t.textContent = msg; t.classList.add('on'); clearTimeout(toast.h); toast.h = setTimeout(() => t.classList.remove('on'), 1800); }
  async function copy(txt, btn) {
    let ok = false;
    try { await navigator.clipboard.writeText(txt); ok = true; } catch (e) {
      const ta = document.createElement('textarea'); ta.value = txt; ta.style.position = 'fixed'; ta.style.opacity = '0'; document.body.appendChild(ta); ta.select();
      try { ok = document.execCommand('copy'); } catch (e2) { } ta.remove();
    }
    toast(ok ? '已复制 Copied' : '复制失败，请手动选择');
    if (btn && ok) { const o = btn.textContent; btn.textContent = '✓ 已复制'; setTimeout(() => btn.textContent = o, 1500); }
  }
  const sentById = id => SENT.find(s => s.id === id);
  const segById = id => D.segments.find(g => g.id === id);

  function wire() {
    // language
    $$('.vx-lang button').forEach(b => b.addEventListener('click', () => setLang(b.dataset.l, true)));
    // progress + chapter counter + dots
    const bar = $('#vxBar'), top = $('#vxTop'), no = $('#vxNo');
    const onScroll = () => { const h = document.documentElement; const p = h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight); bar.style.width = (p * 100).toFixed(1) + '%'; top.classList.toggle('scrolled', h.scrollTop > 8); };
    addEventListener('scroll', onScroll, { passive: true }); onScroll();
    const dots = $$('.vx-dots a');
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return; const i = CH.findIndex(c => c.id === e.target.id); if (i < 0) return;
      no.textContent = CH[i].no; dots.forEach((d, j) => d.setAttribute('aria-current', String(i === j)));
    }), { rootMargin: '-45% 0px -50% 0px' });
    CH.forEach(c => { const el = document.getElementById(c.id); if (el) io.observe(el); });

    // cover → watch
    $('#vxCover').addEventListener('click', () => { document.getElementById('watch').scrollIntoView({ behavior: 'smooth' }); playSeg('A'); });
    const coverImg = $('#vxCover img'); coverImg.addEventListener('error', () => { if (!coverImg.dataset.f) { coverImg.dataset.f = 1; coverImg.src = D.video.thumbFallback; } else $('#vxCover').classList.add('noimg'); });
    const posterImg = $('#vxPoster img'); posterImg.addEventListener('error', () => posterImg.remove());
    $('#vxPoster').addEventListener('click', () => { if (fallback) return; playSeg('A'); });

    // transcript clicks
    $('#vxTx').addEventListener('click', e => {
      if (e.target.closest('[data-noseek]')) return;
      const b = e.target.closest('.vx-s'); if (!b) return;
      const s = sentById(b.dataset.id);
      if (fallback) { window.open(`${D.video.url}&t=${Math.floor(s.start)}s`, '_blank', 'noopener'); return; }
      if (loopAB) setLoop(s);
      seek(s.start, true); mark(SENT.indexOf(s), true);
    });
    $$('[data-seg]').forEach(b => b.addEventListener('click', () => playSeg(b.dataset.seg)));
    $$('[data-rate]').forEach(b => b.addEventListener('click', () => {
      const r = parseFloat(b.dataset.rate); if (ready) player.setPlaybackRate(r);
      $$('[data-rate]').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
    }));
    $('#vxLoop').addEventListener('click', () => {
      if (loopAB) { loopAB = null; $('#vxLoop').setAttribute('aria-pressed', 'false'); toast('已取消循环'); return; }
      const s = SENT[active >= 0 ? active : 0]; setLoop(s); seek(s.start, true);
    });
    $('#vxFull').addEventListener('click', () => {
      const f = $('#vxFrame'); const req = f.requestFullscreen || f.webkitRequestFullscreen;
      if (document.fullscreenElement) document.exitFullscreen(); else if (req) req.call(f); else toast('请使用播放器自带的全屏按钮');
    });
    $('#vxOnly').addEventListener('change', e => onlySegs = e.target.checked);
    $$('[data-round]').forEach(b => b.addEventListener('click', () => setRound(+b.dataset.round)));
    $('#vxShadowGo').addEventListener('click', endShadow);
    $('#vxRetry').addEventListener('click', () => location.reload());

    // seek buttons anywhere (expressions, idea backs, claims)
    document.addEventListener('click', e => {
      const b = e.target.closest('[data-seekid]'); if (!b) return;
      const s = sentById(b.dataset.seekid); if (!s) return;
      if (fallback) { window.open(`${D.video.url}&t=${Math.floor(s.start)}s`, '_blank', 'noopener'); return; }
      const fr = $('#vxFrame').getBoundingClientRect();
      if (fr.bottom < 40 || fr.top > innerHeight - 40) $('#vxFrame').scrollIntoView({ behavior: 'smooth', block: 'center' });
      seek(s.start, true); mark(SENT.indexOf(s), true);
    });

    // expressions copy / save
    const saved = new Set(store.get(LS.saved, []));
    const exTxt = e => `${e.phrase}\n“${e.snippet}” — ${D.speaker.name}, ${D.talk.title} (${e.at.label})\n${e.zh}\n${e.example.en}\n${e.example.zh}`;
    const upd = () => { $('#vxSavedN').textContent = saved.size ? `已收藏 ${saved.size} 个表达（保存在本机）` : '还没有收藏。点 ☆ 收藏想记住的表达。'; $('#vxCopySaved').disabled = !saved.size; };
    $$('[data-copyex]').forEach(b => b.addEventListener('click', () => copy(exTxt(D.expressions.find(x => x.id === b.dataset.copyex)), b)));
    $$('[data-save]').forEach(b => b.addEventListener('click', () => {
      const id = b.dataset.save; saved.has(id) ? saved.delete(id) : saved.add(id);
      store.set(LS.saved, Array.from(saved)); b.setAttribute('aria-pressed', String(saved.has(id))); b.textContent = saved.has(id) ? '★ 已收藏' : '☆ 收藏'; upd();
    }));
    $('#vxCopySaved').addEventListener('click', e => copy(D.expressions.filter(x => saved.has(x.id)).map(exTxt).join('\n\n'), e.currentTarget));
    upd();

    // flip cards
    $$('[data-flip]').forEach(b => b.addEventListener('click', () => {
      const card = $('#card-' + b.dataset.flip); const on = !card.classList.contains('flipped');
      card.classList.toggle('flipped', on);
      $('.front', card).setAttribute('aria-hidden', String(on)); $('.back', card).setAttribute('aria-hidden', String(!on));
      $('.front .vx-flip', card).setAttribute('aria-expanded', String(on));
      $('.front .vx-flip', card).tabIndex = on ? -1 : 0; $('.back .vx-flip', card).tabIndex = on ? 0 : -1;
      $$('.back .vx-ts', card).forEach(x => x.tabIndex = on ? 0 : -1);
      (on ? $('.back .vx-flip', card) : $('.front .vx-flip', card)).focus({ preventScroll: true });
    }));
    $$('.vx-card .back .vx-ts').forEach(x => x.tabIndex = -1);

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
      const w = $('.vx-why', fs); w.textContent = (v === a ? '✓ 答对了。' : '✗ 再想想。') + w.dataset.why;
    }));

    // keep transcript column the height of the player column (desktop)
    const col = $('#vxPlayerCol'), txc = $('#vxTxCol');
    const fit = () => { if (innerWidth > 900) txc.style.height = Math.max(420, col.offsetHeight) + 'px'; else txc.style.height = ''; };
    if ('ResizeObserver' in window) new ResizeObserver(fit).observe(col); addEventListener('resize', fit); fit();
  }

  function setRound(r) {
    round = r;
    $$('.vx-rounds [data-round]').forEach(b => b.setAttribute('aria-pressed', String(+b.dataset.round === r)));
    $('#vxTxCol').classList.toggle('blind', r === 1);
    if (r === 2) setLang('bi', false);
    if (r === 3) { setLang('en', false); toast('第 3 轮：每句结束会暂停，跟读原声后继续'); }
    if (r !== 3) endShadow();
  }
  function setLoop(s) { loopAB = { a: s.start, b: s.end, id: s.id }; $('#vxLoop').setAttribute('aria-pressed', 'true'); $('#vxNow').textContent = `循环：${fmt(s.start)}–${fmt(s.end)}`; }

  function mark(i, scroll) {
    if (i === active) return;
    const prev = $('.vx-s.on'); if (prev) prev.classList.remove('on');
    active = i; if (i < 0) return;
    const el = document.getElementById('s-' + SENT[i].id); if (!el) return;
    el.classList.add('on');
    const box = $('#vxTx');
    if (box && box.offsetParent !== null) { // scroll inside the transcript box only, never the page
      const top = el.getBoundingClientRect().top - box.getBoundingClientRect().top + box.scrollTop - box.clientHeight * 0.3;
      box.scrollTo({ top: Math.max(0, top), behavior: scroll ? 'smooth' : 'auto' });
    }
  }

  /* ---------------- YouTube IFrame API ---------------- */
  function loadYT() {
    const timer = setTimeout(() => { if (!ready) goFallback('timeout'); }, 9000);
    window.onYouTubeIframeAPIReady = function () {
      try {
        player = new YT.Player('vxPlayer', {
          host: 'https://www.youtube-nocookie.com', videoId: D.video.id,
          playerVars: { start: Math.floor(D.segments[0].start), rel: 0, playsinline: 1, modestbranding: 1, iv_load_policy: 3, cc_load_policy: 0, origin: location.origin },
          events: {
            onReady: () => { ready = true; clearTimeout(timer); $('#vxPState').textContent = '▶ 点击播放片段 A'; root.classList.remove('vx-nf'); },
            onStateChange: e => { if (e.data === 1) { $('#vxPoster').style.display = 'none'; startPoll(); } else if (e.data === 0 || e.data === 2) stopPoll(); },
            onError: e => { clearTimeout(timer); goFallback('error ' + e.data); }
          }
        });
      } catch (err) { goFallback('init'); }
    };
    const s = document.createElement('script'); s.src = 'https://www.youtube.com/iframe_api'; s.async = true;
    s.onerror = () => { clearTimeout(timer); goFallback('blocked'); };
    document.head.appendChild(s);
  }
  function goFallback(why) {
    if (ready && why === 'timeout') return;
    fallback = true; root.classList.add('vx-nf');
    $('#vxFallback').classList.add('on'); $('#vxPState').textContent = '视频不可用 · 文稿可独立学习';
    $$('.vx-ctl button').forEach(b => b.disabled = true);
    console.info('[AI VOICES] fallback:', why);
  }
  function seek(t, play) {
    if (!ready) { toast(fallback ? '视频不可用，可在 YouTube 打开' : '播放器还在加载…'); return; }
    endShadow(true); shadowFor = -1; endedOnce = false;
    player.seekTo(Math.max(0, t - 0.15), true); if (play) player.playVideo();
  }
  function playSeg(id) {
    const g = segById(id); if (!g) return;
    if (loopAB) { loopAB = null; $('#vxLoop').setAttribute('aria-pressed', 'false'); }
    seek(g.start, true); mark(SENT.findIndex(s => s.seg === id), true);
  }
  function startPoll() { stopPoll(); poll = setInterval(tick, 200); }
  function stopPoll() { if (poll) clearInterval(poll); poll = null; }
  function tick() {
    if (!ready) return;
    const t = player.getCurrentTime();
    if (loopAB && (t >= loopAB.b - 0.05 || t < loopAB.a - 1.5)) { player.seekTo(loopAB.a, true); return; }
    let i = -1;
    for (let k = 0; k < SENT.length; k++) { if (t >= SENT[k].start - 0.05 && t < SENT[k].end - 0.05) { i = k; break; } }
    if (i !== active) mark(i, true);
    // segment-only mode: jump across gaps; stop after the last segment
    if (onlySegs && !loopAB && i < 0) {
      const gs = D.segments; const nxt = gs.find(g => t < g.start - 0.5);
      const inside = gs.some(g => t >= g.start - 0.5 && t < g.end);
      if (!inside) {
        const last = gs[gs.length - 1];
        if (t >= last.end && t < last.end + 3 && !endedOnce) { endedOnce = true; player.pauseVideo(); toast('三段摘录播完了。可以去第 03 章，或在 YouTube 看完整演讲'); }
        else if (nxt && t > gs[0].start) { player.seekTo(nxt.start, true); toast(`跳到 ${nxt.title.zh}`); }
      }
    }
    // round 3: shadowing pause at the end of each sentence
    if (round === 3 && !loopAB && active >= 0 && shadowFor !== active) {
      const s = SENT[active];
      if (t >= s.end - 0.25) {
        shadowFor = active; player.pauseVideo();
        $('#vxShadowText').textContent = s.en; $('#vxShadow').classList.add('on');
        const wait = Math.min(12, Math.max(2.5, (s.end - s.start) * 1.1)) * 1000;
        shadowTimer = setTimeout(endShadow, wait);
      }
    }
    if (!loopAB) $('#vxNow').textContent = i >= 0 ? `${SENT[i].seg} · ${fmt(t)}` : `${fmt(t)}`;
  }
  function endShadow(silent) {
    clearTimeout(shadowTimer); const box = $('#vxShadow');
    if (box && box.classList.contains('on')) { box.classList.remove('on'); if (silent !== true && ready && round === 3) player.playVideo(); }
  }
})();
