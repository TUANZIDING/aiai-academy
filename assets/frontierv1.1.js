// 前沿观察 v1.1：横向滚动选择，按更新日期从新到旧
(() => {
  const $ = s => document.querySelector(s);
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  let D, topic = 'all', more = false;
  function render() {
    const T = [{ id: 'all', name: '全部观察' }].concat(D.topics);
    const has = (i, t) => t === 'all' || [].concat(i.t).includes(t);
    $('#frChips').innerHTML = T.map(t => `<button type="button" data-t="${t.id}" aria-pressed="${t.id === topic}">${esc(t.name)}<b>${D.items.filter(i => has(i, t.id)).length}</b></button>`).join('');
    $('#frChips').querySelectorAll('button').forEach(b => b.onclick = () => { topic = b.dataset.t; more = false; render(); });
    const rows = D.items.filter(i => has(i, topic)).sort((a, b) => b.date.localeCompare(a.date) || String(b.no).localeCompare(String(a.no)));
    $('#frLine').textContent = `${T.find(t => t.id === topic).name} · ${rows.length} 篇 · 从新到旧 · 左右滑动选择`;
    $('#frList').innerHTML = rows.map(i => `<article class="lc-card">
      <a class="lc-thumb" href="${esc(i.href)}" tabindex="-1" aria-hidden="true"><img src="${esc(i.img)}" alt="" loading="lazy"></a>
      <div class="lc-body"><p class="lc-kind">观察 ${esc(i.no)} · ${esc(i.kind)}<span class="lc-badge${i.level === '同行评审' ? '' : ' warn'}">${esc(i.level)}</span></p>
        <h3>${esc(i.title)}</h3><p class="lc-desc">${esc(i.d)}</p>
        <p class="lc-date">更新于 ${esc(i.date)}</p>
        <a class="lc-go" href="${esc(i.href)}">读这篇观察<span aria-hidden="true">↗</span></a></div></article>`).join('') || '<p class="sub">这个主题还没有观察。</p>';
    $('#frMore').hidden = true; $('#frList').scrollLeft = 0; railBtns();
  }
  const css = document.createElement('style');
  css.textContent = `#frontier .fr-railbar{display:flex;align-items:center;gap:10px;margin:0 0 12px}
#frontier .fr-railbar .lc-line{margin:0;flex:1}
#frontier .fr-arrow{width:44px;height:44px;border-radius:50%;border:1.5px solid rgba(23,51,44,.5);background:#fbfaf5;color:#17332c;font-size:18px;cursor:pointer;flex:none}
#frontier .fr-arrow:disabled{opacity:.3;cursor:default}
#frontier .fr-arrow:not(:disabled):hover{background:#17332c;color:#fbfaf5}
#frontier .lc-list{display:flex;grid-template-columns:none;gap:20px;overflow-x:auto;scroll-snap-type:x mandatory;scroll-behavior:smooth;padding:4px 2px 18px;scrollbar-width:thin;overscroll-behavior-x:contain}
#frontier .lc-card{flex:0 0 min(600px,calc(100% - 48px));scroll-snap-align:start}
#frontier .lc-card:hover{transform:none}
#frontier .lc-thumb img{width:100%;height:100%;object-fit:cover}
@media (max-width:520px){#frontier .lc-card{flex-basis:calc(100% - 28px)}}
@media (prefers-reduced-motion:reduce){#frontier .lc-list{scroll-behavior:auto}}`;
  document.head.appendChild(css);
  const line = $('#frLine'), bar = document.createElement('div');
  bar.className = 'fr-railbar'; line.before(bar); bar.appendChild(line);
  bar.insertAdjacentHTML('beforeend', '<button type="button" class="fr-arrow" id="frPrev" aria-label="看更新的">←</button><button type="button" class="fr-arrow" id="frNext" aria-label="看更早的">→</button>');
  const L = () => $('#frList');
  const step = () => { const c = L().querySelector('.lc-card'); return c ? c.offsetWidth + 20 : 600; };
  function railBtns() { const l = L(); $('#frPrev').disabled = l.scrollLeft <= 4; $('#frNext').disabled = l.scrollLeft + l.clientWidth >= l.scrollWidth - 4; }
  $('#frPrev').onclick = () => L().scrollBy({ left: -step() });
  $('#frNext').onclick = () => L().scrollBy({ left: step() });
  L().addEventListener('scroll', railBtns, { passive: true }); addEventListener('resize', railBtns);
  L().setAttribute('tabindex', '0'); L().setAttribute('aria-label', '前沿观察列表，左右滑动选择');
  fetch('data/frontierv1.0.json?v=1.5').then(r => r.json()).then(d => {
    D = d; render();
    if (location.hash === '#frontier') { const go = () => $('#frontier').scrollIntoView(); go(); setTimeout(go, 700); setTimeout(go, 1600); }
  }).catch(() => { $('#frList').innerHTML = '<p class="sub">加载失败，请刷新页面。</p>'; });
})();
