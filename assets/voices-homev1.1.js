// 13 AI VOICES v1.1（横滑等宽卡片排，替代 v1.0 的 coverflow 大卡）：data/voicesv1.1.json → 首页卡片（主卡：访谈课；次卡：新闻课）
(() => {
  const box = document.getElementById('voicesList'); if (!box) return;
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const DIM = { AI: 'AI', English: 'English', Philosophy: 'Philosophy', Evidence: 'Evidence', Medicine: 'Medicine' };
  const dims = a => `<ul class="vh-dims" aria-label="学习维度">${(a || []).map(k => `<li class="d-${esc(String(k).toLowerCase())}">${esc(DIM[k] || k)}</li>`).join('')}</ul>`;
  const fixHash = () => {
    const h = location.hash; if (h !== '#voices' && h !== '#news') return;
    const go = () => document.getElementById('voices').scrollIntoView(); go(); setTimeout(go, 700); setTimeout(go, 1600);
  };
  fetch('data/voicesv1.1.json?v=1.6.0').then(r => r.json()).then(d => {
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
    // v1.1：与其他馆相同的横滑卡片排（等宽等高、snap 对齐左侧、‹ › 每次翻约一屏），去掉 coverflow 缩放/淡出
    const cards = [...box.querySelectorAll('.vh-card')];
    if (cards.length && !box.dataset.shelf) {
      box.dataset.shelf = '1';
      box.classList.add('shelf', 'vh-rail');
      box.setAttribute('role', 'region');
      box.setAttribute('aria-label', '横向选择 AI VOICES 课程');
      box.tabIndex = 0;
      const wrap = document.createElement('div'); wrap.className = 'shelf-wrap vh-wrap';
      box.parentNode.insertBefore(wrap, box); wrap.appendChild(box);
      const bar = document.createElement('div'); bar.className = 'sh-bar';
      bar.innerHTML = '<span class="sh-count"></span><span class="sh-btns"><button type="button" class="sh-btn prev" aria-label="向左滑" aria-controls="voicesList">‹</button><button type="button" class="sh-btn next" aria-label="向右滑" aria-controls="voicesList">›</button></span>';
      wrap.insertBefore(bar, box);
      const [prev, next] = bar.querySelectorAll('button');
      const label = bar.firstChild;
      const go = d => box.scrollBy({ left: d * box.clientWidth * 0.85, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
      prev.onclick = () => go(-1); next.onclick = () => go(1);
      const upd = () => {
        const s = box.scrollLeft, m = box.scrollWidth - box.clientWidth;
        label.textContent = cards.length + ' 期' + (m >= 8 ? ' · 左右滑动选片' : '') + ' · 点击封面开始学习';
        prev.disabled = s < 8; next.disabled = s >= m - 8;
        wrap.classList.toggle('at-start', s < 8); wrap.classList.toggle('at-end', s >= m - 8); wrap.classList.toggle('no-scroll', m < 8);
      };
      box.addEventListener('scroll', upd, { passive: true }); addEventListener('resize', upd);
      requestAnimationFrame(upd); setTimeout(upd, 400);
    }
    fixHash();
  }).catch(() => { box.innerHTML = '<p class="vh-empty">AI VOICES 加载失败，请刷新页面。</p>'; });
})();
