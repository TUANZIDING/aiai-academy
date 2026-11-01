// 前沿观察：data/frontierv1.0.json，和课件馆同一套目录样式
(() => {
  const $ = s => document.querySelector(s);
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  let D, topic = 'all', more = false;
  function render() {
    const T = [{ id: 'all', name: '全部观察' }].concat(D.topics);
    const has = (i, t) => t === 'all' || [].concat(i.t).includes(t);
    $('#frChips').innerHTML = T.map(t => `<button type="button" data-t="${t.id}" aria-pressed="${t.id === topic}">${esc(t.name)}<b>${D.items.filter(i => has(i, t.id)).length}</b></button>`).join('');
    $('#frChips').querySelectorAll('button').forEach(b => b.onclick = () => { topic = b.dataset.t; more = false; render(); });
    const rows = D.items.filter(i => has(i, topic)).sort((a, b) => b.date.localeCompare(a.date));
    $('#frLine').textContent = `${T.find(t => t.id === topic).name} · ${rows.length} 篇 · 从新到旧 · 每篇都分开写事实、联想和推测`;
    $('#frList').innerHTML = (more ? rows : rows.slice(0, 6)).map(i => `<article class="lc-card">
      <a class="lc-thumb" href="${esc(i.href)}" tabindex="-1" aria-hidden="true"><img src="${esc(i.img)}" alt="" loading="lazy"></a>
      <div class="lc-body"><p class="lc-kind">观察 ${esc(i.no)} · ${esc(i.kind)}<span class="lc-badge warn">${esc(i.level)}</span></p>
        <h3>${esc(i.title)}</h3><p class="lc-desc">${esc(i.d)}</p>
        <p class="lc-date">更新于 ${esc(i.date)}</p>
        <a class="lc-go" href="${esc(i.href)}">读这篇观察<span aria-hidden="true">↗</span></a></div></article>`).join('') || '<p class="sub">这个主题还没有观察。</p>';
    const m = $('#frMore'); m.hidden = rows.length <= 6; m.textContent = more ? '收起' : `展开全部 ${rows.length} 篇 ↓`;
    m.onclick = () => { more = !more; render(); };
  }
  fetch('data/frontierv1.0.json?v=1.0').then(r => r.json()).then(d => {
    D = d; render();
    if (location.hash === '#frontier') { const go = () => $('#frontier').scrollIntoView(); go(); setTimeout(go, 700); setTimeout(go, 1600); }
  }).catch(() => { $('#frList').innerHTML = '<p class="sub">加载失败，请刷新页面。</p>'; });
})();
