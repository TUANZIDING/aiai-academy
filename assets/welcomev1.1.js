(() => {
  const root = document.documentElement;
  const w = document.getElementById('welcome');
  const KEY = 'tz-welcome-seen-20261104';
  const seen = () => { try { return sessionStorage.getItem(KEY) === '1'; } catch (e) { return false; } };
  const deep = location.hash && location.hash !== '#top' && location.hash !== '#welcome';
  let closeTimer;
  function open() { clearTimeout(closeTimer); w.hidden = false; w.classList.remove('leaving'); root.classList.add('w-open'); startNet(); document.getElementById('wEnter').focus(); }
  function close() {
    try { sessionStorage.setItem(KEY, '1'); } catch (e) {}
    w.classList.add('leaving'); root.classList.remove('w-open');
    clearTimeout(closeTimer); closeTimer = setTimeout(() => { w.hidden = true; stopNet(); }, 550);
  }
  addEventListener('message', e => { if(e.origin !== location.origin || e.source !== document.getElementById('wEnter').contentWindow || e.data?.type !== 'aiai-home-enter') return; const hash=e.data.hash; if(!['#academy','#playbook','#gallery','#micro','#top'].includes(hash)) return; close(); location.hash=hash; document.querySelector(hash)?.scrollIntoView(); });
  document.getElementById('reWelcome').onclick = open;
  w.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  if (deep || seen()) { w.hidden = true; } else { root.classList.add('w-open'); }

  // 作品数同步
  fetch('data/projectsv1.0.json').then(r => r.json()).then(d => { const n = document.getElementById('wWorks'); if (n && d.projects) n.textContent = d.projects.length; }).catch(() => {});

  // AI 神经网络背景
  const cv = document.getElementById('wNet'); const ctx = cv ? cv.getContext('2d') : null;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let pts = [], raf = null;
  function size() { cv.width = cv.offsetWidth * devicePixelRatio; cv.height = cv.offsetHeight * devicePixelRatio;
    const n = Math.min(90, Math.floor(cv.offsetWidth * cv.offsetHeight / 16000));
    pts = Array.from({ length: n }, () => ({ x: Math.random() * cv.width, y: Math.random() * cv.height, vx: (Math.random() - .5) * .35 * devicePixelRatio, vy: (Math.random() - .5) * .35 * devicePixelRatio })); }
  function draw() {
    ctx.clearRect(0, 0, cv.width, cv.height); const D = 130 * devicePixelRatio;
    for (const p of pts) { p.x += p.vx; p.y += p.vy; if (p.x < 0 || p.x > cv.width) p.vx *= -1; if (p.y < 0 || p.y > cv.height) p.vy *= -1; }
    for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
      const a = pts[i], b = pts[j], d = Math.hypot(a.x - b.x, a.y - b.y);
      if (d < D) { ctx.strokeStyle = `rgba(34,211,238,${.22 * (1 - d / D)})`; ctx.lineWidth = devicePixelRatio; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); } }
    for (const p of pts) { ctx.fillStyle = 'rgba(165,243,252,.8)'; ctx.beginPath(); ctx.arc(p.x, p.y, 1.6 * devicePixelRatio, 0, 7); ctx.fill(); }
    if (!reduce) raf = requestAnimationFrame(draw);
  }
  function startNet() { if (!cv || raf) return; size(); draw(); }
  function stopNet() { cancelAnimationFrame(raf); raf = null; }
  addEventListener('resize', () => { if (cv && !w.hidden) size(); });
  if (!w.hidden) startNet();

  // 背景音乐已并入音乐室（assets/musicv1.0.js）
})();
