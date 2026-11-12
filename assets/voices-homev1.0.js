// 12 AI VOICES：data/voicesv1.1.json → 首页卡片（主卡：访谈课；次卡：新闻课）
(() => {
  const box = document.getElementById('voicesList'); if (!box) return;
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const DIM = { AI: 'AI', English: 'English', Philosophy: 'Philosophy', Evidence: 'Evidence', Medicine: 'Medicine' };
  const dims = a => `<ul class="vh-dims" aria-label="学习维度">${(a || []).map(k => `<li class="d-${esc(String(k).toLowerCase())}">${esc(DIM[k] || k)}</li>`).join('')}</ul>`;
  const fixHash = () => {
    const h = location.hash; if (h !== '#voices' && h !== '#news') return;
    const go = () => document.getElementById('voices').scrollIntoView(); go(); setTimeout(go, 700); setTimeout(go, 1600);
  };
  fetch('data/voicesv1.1.json?v=1.5.0').then(r => r.json()).then(d => {
    const eps = [...d.episodes].sort((a, b) => b.num - a.num).map(e => `<article class="vh-card">
      <a class="vh-cover" href="${esc(e.href)}" tabindex="-1" aria-hidden="true"><img src="${esc(e.thumb)}" alt="" loading="lazy" referrerpolicy="no-referrer" width="640" height="360" onerror="if(!this.dataset.f){this.dataset.f=1;this.src=this.src.replace('maxresdefault','hqdefault')}"><span class="vh-tag">${esc(e.no)}</span><span class="vh-note">${esc(e.thumbNote || 'YouTube 视频封面')}</span></a>
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
    const cards = [...box.querySelectorAll('.vh-card')];
    if (cards.length) {
      box.setAttribute('role', 'region');
      box.setAttribute('aria-label', '横向选择 AI VOICES 课程');
      box.setAttribute('tabindex', '0');
      const controls = document.createElement('div');
      controls.className = 'vh-controls';
      controls.innerHTML = '<span class="vh-hint">左右选片 · 点击封面开始学习</span><div class="vh-buttons"><button type="button" aria-label="上一门课程" aria-controls="voicesList">←</button><span class="vh-count" aria-live="polite"></span><button type="button" aria-label="下一门课程" aria-controls="voicesList">→</button></div>';
      box.before(controls);
      const [prev, next] = controls.querySelectorAll('button');
      const count = controls.querySelector('.vh-count');
      let current = 0, frame = 0;
      const update = () => {
        const center = box.getBoundingClientRect().left + box.clientWidth / 2;
        let distance = Infinity;
        cards.forEach((card, i) => { const r = card.getBoundingClientRect(); const d = Math.abs(r.left + r.width / 2 - center); if (d < distance) { distance = d; current = i; } });
        cards.forEach((card, i) => card.classList.toggle('is-selected', i === current));
        prev.disabled = current === 0; next.disabled = current === cards.length - 1;
        count.textContent = (current + 1) + ' / ' + cards.length;
      };
      const select = i => {
        const card = cards[Math.max(0, Math.min(cards.length - 1, i))];
        const r = card.getBoundingClientRect(), b = box.getBoundingClientRect();
        box.scrollTo({ left: box.scrollLeft + r.left - b.left - (box.clientWidth - r.width) / 2, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
      };
      prev.addEventListener('click', () => select(current - 1));
      next.addEventListener('click', () => select(current + 1));
      box.addEventListener('keydown', e => {
        if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) return;
        e.preventDefault();
        select(e.key === 'Home' ? 0 : e.key === 'End' ? cards.length - 1 : current + (e.key === 'ArrowRight' ? 1 : -1));
      });
      box.addEventListener('scroll', () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(update); }, { passive: true });
      box.addEventListener('focusin', e => { const i = cards.findIndex(card => card.contains(e.target)); if (i >= 0) select(i); });
      new ResizeObserver(update).observe(box);
      update();
    }
    fixHash();
  }).catch(() => { box.innerHTML = '<p class="vh-empty">AI VOICES 加载失败，请刷新页面。</p>'; });
})();
