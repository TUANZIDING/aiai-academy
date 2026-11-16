// 训练营 v1.1：横向滑动选择，从新到旧（按加入课程表的先后，后加入的在前）
(() => {
  const $ = s => document.querySelector(s);
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  let camp = null;
  const IMG = { 'lessons/ai-historyv1.0.html': 'assets/story/hist-move37v1.0.jpg', 'lessons/onco-guidev1.0.html': 'assets/story/onco-mapv1.0.jpg', 'lessons/ai-judgmentv1.0.html': 'assets/story/judg-feedv1.0.jpg', 'lessons/rcm-paperv1.0.html': 'assets/story/rcm-erv1.0.jpg', 'lessons/kosmos-lite-coursev1.0.html': 'assets/story/kosmos-thumbv1.0.webp' };
  let topic = 'all', more = false;

  const css = document.createElement('style');
  css.textContent = `#camp .fr-railbar{display:flex;align-items:center;gap:10px;margin:0 0 12px}
#camp .fr-railbar .lc-line{margin:0;flex:1}
#camp .fr-arrow{width:44px;height:44px;border-radius:50%;border:1.5px solid rgba(23,51,44,.5);background:#fbfaf5;color:#17332c;font-size:18px;cursor:pointer;flex:none}
#camp .fr-arrow:disabled{opacity:.3;cursor:default}
#camp .fr-arrow:not(:disabled):hover{background:#17332c;color:#fbfaf5}
#camp .lc-list{display:flex;grid-template-columns:none;gap:20px;overflow-x:auto;scroll-snap-type:x mandatory;scroll-behavior:smooth;padding:4px 2px 18px;scrollbar-width:thin;overscroll-behavior-x:contain}
#camp .lc-card{flex:0 0 min(600px,calc(100% - 48px));scroll-snap-align:start}
#camp .lc-card:hover{transform:none}
@media (max-width:520px){#camp .lc-card{flex-basis:calc(100% - 28px)}}
@media (prefers-reduced-motion:reduce){#camp .lc-list{scroll-behavior:auto}}`;
  document.head.appendChild(css);
  const cl = $('#campLine'), bar = document.createElement('div');
  bar.className = 'fr-railbar'; cl.before(bar); bar.appendChild(cl);
  bar.insertAdjacentHTML('beforeend', '<button type="button" class="fr-arrow" id="campPrev" aria-label="看更新的">←</button><button type="button" class="fr-arrow" id="campNext" aria-label="看更早的">→</button>');
  const CL = () => $('#campTracks');
  const cstep = () => { const c = CL().querySelector('.lc-card'); return c ? c.offsetWidth + 20 : 600; };
  function railBtns() { const l = CL(); $('#campPrev').disabled = l.scrollLeft <= 4; $('#campNext').disabled = l.scrollLeft + l.clientWidth >= l.scrollWidth - 4; }
  $('#campPrev').onclick = () => CL().scrollBy({ left: -cstep() });
  $('#campNext').onclick = () => CL().scrollBy({ left: cstep() });
  CL().addEventListener('scroll', railBtns, { passive: true }); addEventListener('resize', railBtns);
  CL().setAttribute('tabindex', '0'); CL().setAttribute('aria-label', '训练营课程列表，左右滑动选择');
  function no(l) { const ks = Object.keys(camp.tracks), ti = ks.indexOf(l.track); return (ti ? 'S' : 'O') + String(camp.lessons.filter(x => x.track === l.track).indexOf(l) + 1).padStart(2, '0'); }
  function render() {
    const T = [['all', '全部课程', () => true]].concat(Object.entries(camp.tracks).map(([k, t]) => [k, t.name, l => l.track === k]), [['story', '故事版', l => !!l.story]]);
    const cur = T.find(t => t[0] === topic);
    $('#campChips').innerHTML = T.map(([k, n, f]) => `<button type="button" data-t="${k}" aria-pressed="${k === topic}">${esc(n)}<b>${camp.lessons.filter(f).length}</b></button>`).join('');
    $('#campChips').querySelectorAll('button').forEach(b => b.onclick = () => { topic = b.dataset.t; more = false; render(); });
    const rows = camp.lessons.filter(cur[2]).slice().reverse();
    const mins = rows.reduce((a, l) => a + (+l.min || 0), 0);
    $('#campLine').textContent = `${cur[1]} · ${rows.length} 堂 · 约 ${mins} 分钟 · 从新到旧 · 左右滑动选择`;
    const vis = rows;
    $('#campTracks').innerHTML = vis.map(l => {
      const t = camp.tracks[l.track], img = l.story && IMG[l.story], kind = l.story ? '故事版' : l.deck ? '投屏课件' : '课程卡';
      return `<article class="lc-card">
        <a class="lc-thumb" href="${l.story ? esc(l.story) : '#camp-' + l.id}" data-id="${l.id}" tabindex="-1" aria-hidden="true">${img ? `<img src="${esc(img)}" alt="" loading="lazy">` : `<span class="lc-tile"><b>${no(l)}</b><small>${esc(t.name.split(' · ')[0])}</small></span>`}</a>
        <div class="lc-body"><p class="lc-kind">${no(l)} · ${esc(t.name.split(' · ')[1] || t.name)} · ${esc(l.level)} · ${esc(l.min)} 分钟</p>
          <h3>${esc(l.title)}</h3><p class="lc-desc">${esc(l.one)}</p>
          <p class="lc-date">${l.story ? '▶ 全屏故事版课件' : l.deck ? '▣ 要点卡 + 投屏课件' : '要点卡'} · 更新于 ${esc(camp.updated)}</p>
          <a class="lc-go" href="${l.story ? esc(l.story) : '#camp-' + l.id}" data-id="${l.id}">${l.story ? '进入故事版' : '看要点和课件'}<span aria-hidden="true">↗</span></a></div></article>`;
    }).join('');
    $('#campTracks').querySelectorAll('[data-id]').forEach(a => a.onclick = e => { const l = camp.lessons.find(x => x.id === a.dataset.id); if (l.story) return; e.preventDefault(); open(l.id, true); });
    $('#campMore').hidden = true; $('#campTracks').scrollLeft = 0; railBtns();
  }
  function open(id, push) {
    const all = camp.lessons, idx = all.findIndex(l => l.id === id); if (idx < 0) return;
    const l = all[idx], t = camp.tracks[l.track], same = all.filter(x => x.track === l.track), n = same.indexOf(l) + 1;
    const prev = all[idx - 1], next = all[idx + 1];
    $('#crBody').innerHTML = `
      <p class="cr-kick">${esc(t.name)} · 第 ${n} 课 · ${l.level} · ${l.min} 分钟</p>
      <h2 id="crTitle">${esc(l.title)}</h2>
      ${l.deck ? `<a class="cr-deck" href="${esc(l.deck)}" target="_blank" rel="noopener">▣ 打开投屏课件 ↗</a>` : ''}
      <p class="cr-one">${esc(l.one)}</p>
      <div class="cr-play"><span>🏈 球场比喻</span><p>${esc(l.play)}</p></div>
      <h4>本课要点</h4><ol class="cr-points">${l.points.map(p => `<li>${esc(p)}</li>`).join('')}</ol>
      <div class="cr-grid">
        <div class="cr-box case"><span>🚑 临床与科研场景</span><p>${esc(l.case)}</p></div>
        <div class="cr-box drill"><span>✍️ 课堂练习</span><p>${esc(l.drill)}</p></div>
      </div>
      <div class="cr-care"><b>⚠️ 小心：</b>${esc(l.care)}</div>
      <nav class="cr-nav">${prev ? `<button data-go="${prev.id}">← ${esc(prev.title)}</button>` : '<span></span>'}${next ? `<button data-go="${next.id}">${esc(next.title)} →</button>` : '<span></span>'}</nav>
      <p class="cr-sign">丁海祥 · aiai 学院原创课程 · 更新于 ${esc(camp.updated)}</p>`;
    $('#crBody').querySelectorAll('[data-go]').forEach(b => b.onclick = () => open(b.dataset.go, true));
    const r = $('#campReader'); r.hidden = false; document.documentElement.classList.add('cr-open');
    r.querySelector('.cr-sheet').scrollTop = 0;
    if (push) history.replaceState(null, '', '#camp-' + id);
  }
  function close() { $('#campReader').hidden = true; document.documentElement.classList.remove('cr-open'); history.replaceState(null, '', '#camp'); }
  document.addEventListener('click', e => { if (e.target.closest('[data-cr-close]')) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !$('#campReader').hidden) close(); });
  fetch('data/campv1.0.json?v=1.4').then(r => r.json()).then(d => {
    camp = d; render();
    if (location.hash === '#camp') { const go = () => $('#camp').scrollIntoView(); go(); setTimeout(go, 700); setTimeout(go, 1600); }
    const m = location.hash.match(/^#camp-(\w+)/); if (m) { $('#camp').scrollIntoView(); open(m[1], false); }
  }).catch(() => { $('#campTracks').innerHTML = '<p class="sub">课程加载失败，请刷新页面。</p>'; });
})();
