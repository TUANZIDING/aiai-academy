// 12 NEWS PLAYBOOK：data/newsv1.0.json → 首页卡片
(() => {
  const box = document.getElementById('newsList'); if (!box) return;
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  fetch('data/newsv1.0.json?v=1.0').then(r => r.json()).then(d => {
    const rows = [...d.lessons].sort((a, b) => b.eventDate.localeCompare(a.eventDate));
    box.innerHTML = rows.map(n => `<article class="nh-card">
      <a class="nh-thumb" href="${esc(n.href)}" tabindex="-1" aria-hidden="true"><img src="${esc(n.img)}" alt="" loading="lazy" width="640" height="357"><span class="ai">AI 生成插图</span></a>
      <div class="nh-body">
        <p class="nh-no">${esc(n.no)}<span class="nh-badge ${n.evidence.key === 'peer' ? 'peer' : 'warn'}">${esc(n.evidence.label.zh)} · ${esc(n.evidence.label.en)}</span>${n.status === 'preview' ? '<span class="nh-badge prev">预览版 Preview</span>' : ''}</p>
        <h3>${esc(n.title.zh)}</h3>
        <p class="en" lang="en">${esc(n.title.en)}</p>
        <ul class="nh-dates"><li>事件 Event <b>${esc(n.eventDate)}</b></li><li>最近核验 Verified <b>${esc(n.verifiedAt)}</b></li><li>档位 Level <b>${esc(n.level)}</b></li><li>${esc(n.topic.zh)}</li></ul>
        <a class="nh-go" href="${esc(n.href)}">进入本期 · Enter <span aria-hidden="true">↗</span></a>
      </div></article>`).join('') || '<p class="nh-empty">第一期正在制作中。</p>';
    if (location.hash === '#news') { const go = () => document.getElementById('news').scrollIntoView(); go(); setTimeout(go, 700); setTimeout(go, 1600); }
  }).catch(() => { box.innerHTML = '<p class="nh-empty">新闻课加载失败，请刷新页面。</p>'; });
})();
