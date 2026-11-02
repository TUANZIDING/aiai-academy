// 12 AI VOICES：data/voicesv1.1.json → 首页卡片（主卡：访谈课；次卡：新闻课）
(() => {
  const box = document.getElementById('voicesList'); if (!box) return;
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const DIM = { AI: 'AI', English: 'English', Philosophy: 'Philosophy', Evidence: 'Evidence' };
  const dims = a => `<ul class="vh-dims" aria-label="学习维度">${(a || []).map(k => `<li class="d-${esc(String(k).toLowerCase())}">${esc(DIM[k] || k)}</li>`).join('')}</ul>`;
  const fixHash = () => {
    const h = location.hash; if (h !== '#voices' && h !== '#news') return;
    const go = () => document.getElementById('voices').scrollIntoView(); go(); setTimeout(go, 700); setTimeout(go, 1600);
  };
  fetch('data/voicesv1.1.json?v=1.1.1').then(r => r.json()).then(d => {
    const eps = [...d.episodes].sort((a, b) => b.num - a.num).map(e => `<article class="vh-card">
      <a class="vh-cover" href="${esc(e.href)}" tabindex="-1" aria-hidden="true"><img src="${esc(e.thumb)}" alt="" loading="lazy" referrerpolicy="no-referrer" width="640" height="360" onerror="if(!this.dataset.f){this.dataset.f=1;this.src=this.src.replace('maxresdefault','hqdefault')}"><span class="vh-tag">${esc(e.no)}</span><span class="vh-note">YouTube 官方封面</span></a>
      <div class="vh-body">
        <p class="vh-who">${esc(e.speaker)}<span>${esc(e.speakerZh || '')}</span></p>
        <h3><a href="${esc(e.href)}">${esc(e.question.zh)}</a></h3>
        <p class="vh-meta"><b>${esc(e.minutes?.zh || '')}</b>${e.minutes?.note ? `（${esc(e.minutes.note)}）` : ''} · 难度 <b>${esc(e.level?.zh || '')}</b></p>
        ${dims(e.dims)}
        <span class="vh-go" aria-hidden="true">进入本期 →</span>
      </div></article>`);
    const also = (d.also || []).map(n => `<article class="vh-card minor">
      <a class="vh-cover" href="${esc(n.href)}" tabindex="-1" aria-hidden="true"><img src="${esc(n.thumb)}" alt="" loading="lazy" width="640" height="357"><span class="vh-tag">${esc(n.label)}</span>${n.thumbNote ? `<span class="vh-note">${esc(n.thumbNote)}</span>` : ''}</a>
      <div class="vh-body">
        <p class="vh-who">${esc(n.label)}<span>${esc(n.source || '')}</span></p>
        <h3><a href="${esc(n.href)}">${esc(n.title)}</a></h3>
        <p class="vh-meta">${esc(n.meta || '')}</p>
        ${dims(n.dims)}
        <span class="vh-go" aria-hidden="true">进入本期 →</span>
      </div></article>`);
    box.innerHTML = [...eps, ...also].join('') || '<p class="vh-empty">第一期正在制作中。</p>';
    fixHash();
  }).catch(() => { box.innerHTML = '<p class="vh-empty">AI VOICES 加载失败，请刷新页面。</p>'; });
})();
