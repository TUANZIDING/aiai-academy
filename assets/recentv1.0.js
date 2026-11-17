/* 最近更新 v1.0：从已有数据中只取带真实日期的条目，按日期倒序取前 6 条，横向展示。
   来源：data/frontierv1.0.json（date）、课件馆 ITEMS（lessons-catalogv1.2.js 暴露的 window.AIAI_LESSON_ITEMS，date）、
   data/voicesv1.1.json（已发布期次的 verifiedAt 核查日）。没有日期的条目一律不收。 */
(() => {
  const root = document.getElementById('recentRail');
  if (!root) return;
  const MAX = 6;
  const okDate = s => typeof s === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(s);
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const getJSON = u => fetch(u).then(r => (r.ok ? r.json() : null)).catch(() => null);

  function fromFrontier(d) {
    return ((d && d.items) || []).filter(i => okDate(i.date) && i.href).map(i => ({
      mod: '前沿观察', date: i.date, title: i.title, sub: i.d || i.kind || '', href: i.href, go: '读这篇', ext: false
    }));
  }
  function fromLessons(items) {
    return (items || []).filter(i => okDate(i.date) && i.href).map(i => ({
      mod: '课件馆', date: i.date, title: i.title, sub: i.d || i.kind || '', href: i.href, go: i.go || '打开课件', ext: !!i.ext || /^https?:/.test(i.href)
    }));
  }
  function fromVoices(d) {
    return ((d && d.episodes) || []).filter(e => e.status === 'published' && okDate(e.verifiedAt) && e.href).map(e => ({
      mod: 'AI VOICES', date: e.verifiedAt, title: (/^[×x]/.test(e.speakerZh || '') ? e.speaker + ' ' + e.speakerZh : (e.speakerZh || e.speaker || '')) + ' · ' + (e.title || ''),
      sub: (e.question && e.question.zh) || '', href: e.href, go: '进入这一期', ext: false
    }));
  }

  function card(it) {
    const tgt = it.ext ? ' target="_blank" rel="noopener"' : '';
    return `<a class="rc-card" href="${esc(it.href)}"${tgt}>
      <span class="rc-meta"><i>${esc(it.mod)}</i><time datetime="${esc(it.date)}">${esc(it.date)}</time></span>
      <b class="rc-t">${esc(it.title)}</b>
      <span class="rc-s">${esc(it.sub)}</span>
      <span class="rc-go">${esc(it.go)} ${it.ext ? '↗' : '→'}</span>
    </a>`;
  }

  Promise.all([getJSON('data/frontierv1.0.json?v=1.6'), getJSON('data/voicesv1.1.json?v=1.5.0')]).then(([fr, vo]) => {
    const all = [].concat(fromFrontier(fr), fromLessons(window.AIAI_LESSON_ITEMS), fromVoices(vo));
    const seen = new Set();
    const list = all.map((x, i) => Object.assign(x, { i }))
      .filter(x => (seen.has(x.href) ? false : seen.add(x.href)))
      .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : a.i - b.i))
      .slice(0, MAX);
    root.innerHTML = list.length ? list.map(card).join('') : '<p class="rc-empty">暂时没有带日期的更新。</p>';
  });
})();
