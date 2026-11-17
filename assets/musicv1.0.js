/* aiai 音乐室 v1.0 · 一个 <audio> + data/musicv1.0.json 歌单
   - 从不自动播放：只有点击 ▶ / 歌单 才开始；preload="none"，不点就不耗流量
   - 记住：上一首、音量、随机漫游开关、展开/收起（localStorage）
   - 放完自动下一首；站内任何其他 <audio>/<video>（如放映厅 #vplayer）开始播放时自动暂停 */
(() => {
  const root = document.documentElement;
  const box = document.getElementById('mroom');
  if (!box) return;
  const $ = s => box.querySelector(s);
  const audio = $('audio');
  const fab = $('.mr-fab'), panel = $('.mr-panel'), minBtn = $('.mr-min');
  const playBtn = $('.mr-play'), prevBtn = $('.mr-prev'), nextBtn = $('.mr-next');
  const shufBtn = $('.mr-shuf'), vol = $('.mr-vol'), listBtn = $('.mr-listbtn'), list = $('.mr-list'), ol = $('.mr-list ol');
  const tEl = $('.mr-t'), aEl = $('.mr-a'), stEl = $('.mr-st'), cnt = $('.mr-count');
  const bar = $('.mr-bar i'), timeEl = $('.mr-time');
  const read = k => { try { return localStorage.getItem(k); } catch (e) { return null; } };
  const save = (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} };

  let tracks = [], cur = 0, shuffle = read('aiai-mr-shuffle') !== '0', loading = false, failed = false, hist = [], bag = [];
  const v0 = read('aiai-mr-vol') ?? read('tz-music-volume');
  audio.volume = v0 !== null && isFinite(Number(v0)) ? Math.max(0, Math.min(1, Number(v0))) : 0.3;
  vol.value = String(Math.round(audio.volume * 100));

  const fmt = s => !isFinite(s) ? '0:00' : Math.floor(s / 60) + ':' + String(Math.floor(s % 60)).padStart(2, '0');
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  function setOpen(open, remember = true) {
    panel.hidden = !open; box.classList.toggle('open', open);
    fab.setAttribute('aria-expanded', String(open));
    if (!open) { list.hidden = true; listBtn.setAttribute('aria-expanded', 'false'); }
    if (remember) save('aiai-mr-open', open ? '1' : '0');
  }
  function render() {
    const t = tracks[cur], playing = !audio.paused && !audio.ended;
    box.classList.toggle('playing', playing);
    fab.setAttribute('aria-pressed', String(playing));
    playBtn.textContent = playing ? 'Ⅱ' : '▶';
    playBtn.setAttribute('aria-label', playing ? '暂停' : '播放');
    if (t) { tEl.textContent = t.zh || t.title; aEl.textContent = (t.zh ? t.title + ' · ' : '') + t.artist + ' · ' + t.license; }
    stEl.textContent = failed ? '加载失败 · 点击 ▶ 重试' : loading ? '正在加载…' : playing ? (shuffle ? '正在播放 · 随机漫游' : '正在播放 · 顺序播放') : '点 ▶ 开始，不会自动播放';
    shufBtn.setAttribute('aria-pressed', String(shuffle));
    fab.setAttribute('aria-label', playing ? '音乐室 · 正在播放 ' + (t ? t.title : '') : '打开音乐室');
    ol.querySelectorAll('button').forEach((b, i) => b.setAttribute('aria-current', String(i === cur)));
  }
  function load(i) {
    cur = (i + tracks.length) % tracks.length;
    const t = tracks[cur];
    audio.src = t.file; failed = false;
    bar.style.width = '0%'; timeEl.textContent = '0:00';
    save('aiai-mr-track', t.id);
  }
  async function play() {
    if (!tracks.length) return;
    if (!audio.getAttribute('src') || failed) load(cur);
    loading = true; failed = false; render();
    try { await audio.play(); } catch (e) { if (e.name !== 'AbortError') failed = true; }
    loading = false; render();
  }
  function pick(i) { if (i !== cur) hist.push(cur); load(i); play(); }
  function nextIndex() {
    if (!shuffle) return cur + 1;
    if (!bag.length) { bag = tracks.map((_, i) => i).filter(i => i !== cur); for (let i = bag.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [bag[i], bag[j]] = [bag[j], bag[i]]; } }
    return bag.shift();
  }
  function next() { pick(nextIndex()); }
  function prev() {
    if (audio.currentTime > 4) { audio.currentTime = 0; return; }
    if (shuffle && hist.length) { load(hist.pop()); play(); return; }
    load(cur - 1); play();
  }

  fab.addEventListener('click', () => setOpen(panel.hidden));
  minBtn.addEventListener('click', () => { setOpen(false); fab.focus(); });
  playBtn.addEventListener('click', () => { audio.paused ? play() : audio.pause(); });
  nextBtn.addEventListener('click', next);
  prevBtn.addEventListener('click', prev);
  shufBtn.addEventListener('click', () => { shuffle = !shuffle; bag = []; save('aiai-mr-shuffle', shuffle ? '1' : '0'); render(); });
  vol.addEventListener('input', () => { audio.volume = vol.value / 100; save('aiai-mr-vol', String(audio.volume)); });
  listBtn.addEventListener('click', () => { list.hidden = !list.hidden; listBtn.setAttribute('aria-expanded', String(!list.hidden)); });
  ol.addEventListener('click', e => { const b = e.target.closest('button[data-i]'); if (b) pick(Number(b.dataset.i)); });
  box.addEventListener('keydown', e => { if (e.key === 'Escape' && !panel.hidden) { setOpen(false); fab.focus(); } });
  $('.mr-bar').addEventListener('click', e => { if (!audio.duration) return; const r = e.currentTarget.getBoundingClientRect(); audio.currentTime = audio.duration * (e.clientX - r.left) / r.width; });

  audio.addEventListener('ended', next);
  audio.addEventListener('timeupdate', () => { if (audio.duration) { bar.style.width = (audio.currentTime / audio.duration * 100) + '%'; timeEl.textContent = fmt(audio.currentTime) + ' / ' + fmt(audio.duration); } });
  ['playing', 'pause', 'waiting', 'canplay'].forEach(ev => audio.addEventListener(ev, () => { if (ev === 'playing' || ev === 'canplay') loading = false; render(); }));
  audio.addEventListener('error', () => { if (audio.getAttribute('src')) { failed = true; loading = false; render(); } });

  // 让路：站内其他音视频一开始，音乐室就暂停（不会自动恢复）
  document.addEventListener('play', e => { const m = e.target; if (m !== audio && (m instanceof HTMLMediaElement) && !m.muted && !audio.paused) audio.pause(); }, true);
  const vp = document.getElementById('vplayer');
  if (vp) new MutationObserver(() => { if (vp.open && !audio.paused) audio.pause(); }).observe(vp, { attributes: true, attributeFilter: ['open'] });
  // 投屏模式：自动收起成小圆钮，不挡课件
  new MutationObserver(() => { if (root.classList.contains('projector') && !panel.hidden) setOpen(false, false); }).observe(root, { attributes: true, attributeFilter: ['class'] });

  function build(data) {
    tracks = (data && data.tracks || []).filter(t => t.file);
    if (!tracks.length) return;
    cnt.textContent = '随机漫游 · ' + tracks.length + ' 首';
    ol.innerHTML = tracks.map((t, i) => `<li><button type="button" data-i="${i}"><span class="mr-no">${String(i + 1).padStart(2, '0')}</span><span class="mr-lt"><b>${esc(t.zh || t.title)}</b><small>${esc(t.title)} · ${esc(t.artist)}</small></span></button></li>`).join('');
    const last = tracks.findIndex(t => t.id === read('aiai-mr-track'));
    cur = last >= 0 ? last : 0;
    render();
  }
  setOpen(read('aiai-mr-open') === '1' && !root.classList.contains('projector'), false);
  render();
  fetch(box.dataset.list || 'data/musicv1.0.json').then(r => r.json()).then(build)
    .catch(() => build({ tracks: [{ id: 'unity-piano', title: 'Unity', zh: '热血钢琴', artist: 'Kevin MacLeod', license: 'CC BY 4.0', file: 'assets/music/unity-pianov1.0.mp3' }] }));
})();
