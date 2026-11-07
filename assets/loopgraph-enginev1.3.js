/* aiai · script-driven stage engine v1.3 (original work; v1.0 = Loop 与 Graph v2).
   v1.3: per-lesson cardWait flag — LG_DATA.cardWait === true keeps each chapter title card fully visible until a click / → / Space / Enter;
         in auto mode narration waits behind the card and resumes after the click. Without the flag the v1.2 timed card is unchanged.
         Also: the first-frame set() of a freshly mounted view uses the current line (fixes a stale state after two quick steps).
   v1.2: per-lesson music flag — LG_DATA.music === false means no background music is loaded or played, the ♪ button is removed and M does nothing.
   v1.1: audio base from LG_DATA.audioBase; portrait reading mode (#msubs: readable subtitles + big controls under the letterboxed stage).
   Data: window.LG_DATA (chapters -> beats -> lines). Views: window.LG_VIEWS[name](root, api) -> {set(k)}.
   Keys: ←/→ step · Space pause/next · P auto/self · S subtitles · M music (when enabled) · T chapters · F fullscreen. */
(() => {
'use strict';
const D = window.LG_DATA, VIEWS = window.LG_VIEWS;
const $ = s => document.querySelector(s);
const stage = $('#stage');
const AUDIO_BASE = D.audioBase || 'media/loop-graph-audio/';
const HOLD = 420, CARD_MS = 1500, CARD_WAIT = D.cardWait === true;
const qs = new URLSearchParams(location.search);

// ---------- flat line index ----------
const FLAT = [];
D.chapters.forEach((c, ci) => c.beats.forEach((b, bi) => b.lines.forEach((l, li) => FLAT.push({ ci, bi, li }))));
const flatIdx = (ci, bi, li) => FLAT.findIndex(p => p.ci === ci && p.bi === bi && p.li === li);

// ---------- scale to fit (letterbox) ----------
function fit() {
  const w = innerWidth, h = innerHeight, s = Math.min(w / 1920, h / 1080);
  const pr = h > w && w < 900;
  const ty = pr && st.portraitOk ? Math.max(56, Math.min((h - 1080 * s) / 2, h * .16)) : (h - 1080 * s) / 2;
  stage.style.transform = `translate(${(w - 1920 * s) / 2}px,${ty}px) scale(${s})`;
  document.body.classList.toggle('portrait', pr && !st.portraitOk);
  document.body.classList.toggle('preading', pr && st.portraitOk);
  const ms = $('#msubs'); if (ms) ms.style.top = (ty + 1080 * s + 14) + 'px';
}
const st = { ci: 0, bi: 0, li: 0, mode: 'auto', playing: false, started: false, subs: 0, music: D.music !== false, portraitOk: false, token: 0, view: null, viewKey: '' };
addEventListener('resize', fit);

// ---------- ambient agent-graph canvas ----------
(function ambient() {
  const cv = $('#amb'), g = cv.getContext('2d');
  cv.width = 1920; cv.height = 1080;
  const N = 38, nodes = [];
  for (let i = 0; i < N; i++) nodes.push({ x: Math.random() * 1920, y: 120 + Math.random() * 840, vx: (Math.random() - .5) * .18, vy: (Math.random() - .5) * .14, r: 1.5 + Math.random() * 2.5 });
  const pulses = [];
  let last = 0;
  function frame(t) {
    requestAnimationFrame(frame);
    if (document.hidden || t - last < 33) return;
    last = t;
    g.clearRect(0, 0, 1920, 1080);
    const E = [];
    for (const n of nodes) { n.x += n.vx; n.y += n.vy; if (n.x < 0 || n.x > 1920) n.vx *= -1; if (n.y < 100 || n.y > 1000) n.vy *= -1; }
    for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) {
      const a = nodes[i], b = nodes[j], d = Math.hypot(a.x - b.x, a.y - b.y);
      if (d < 230) { E.push([a, b]); g.strokeStyle = `rgba(122,231,220,${.10 * (1 - d / 230)})`; g.lineWidth = 1; g.beginPath(); g.moveTo(a.x, a.y); g.lineTo(b.x, b.y); g.stroke(); }
    }
    if (E.length && Math.random() < .08 && pulses.length < 10) { const e = E[(Math.random() * E.length) | 0]; pulses.push({ a: e[0], b: e[1], p: 0, c: Math.random() < .5 ? '232,100,27' : '122,231,220' }); }
    for (let i = pulses.length - 1; i >= 0; i--) {
      const q = pulses[i]; q.p += .02; if (q.p > 1) { pulses.splice(i, 1); continue; }
      const x = q.a.x + (q.b.x - q.a.x) * q.p, y = q.a.y + (q.b.y - q.a.y) * q.p;
      g.fillStyle = `rgba(${q.c},.8)`; g.shadowColor = `rgba(${q.c},1)`; g.shadowBlur = 10; g.beginPath(); g.arc(x, y, 2.4, 0, 7); g.fill(); g.shadowBlur = 0;
    }
    for (const n of nodes) { g.fillStyle = 'rgba(244,234,215,.28)'; g.beginPath(); g.arc(n.x, n.y, n.r, 0, 7); g.fill(); }
  }
  requestAnimationFrame(frame);
})();

// ---------- audio ----------
let voice = new Audio(); voice.preload = 'auto';
const pre = new Audio(); pre.preload = 'auto';
const MUSIC = D.music !== false;
const music = MUSIC ? new Audio('../assets/music/unity-pianov1.0.mp3') : { play() { return Promise.resolve(); }, pause() {}, volume: 0 };
music.loop = true; music.volume = 0;
let musicTarget = 0;
setInterval(() => { const v = music.volume, d = musicTarget - v; if (Math.abs(d) > .004) music.volume = Math.max(0, Math.min(1, v + Math.sign(d) * .006)); }, 40);
function duck(on) { musicTarget = st.music && st.started && st.mode === 'auto' ? (on ? .035 : .09) : 0; }
const lineAt = (ci, bi, li) => D.chapters[ci].beats[bi].lines[li];
const src = l => AUDIO_BASE + l.au + '.mp3';
function stopVoice() { st.token++; clearTimeout(st.timer); voice.onended = voice.onerror = null; try { voice.pause(); } catch (e) {} duck(false); }
function textMs(l) { return Math.min(14000, Math.max(2400, l.zh.length * 230)); }
function speak(delay) {
  stopVoice();
  const tok = st.token, l = lineAt(st.ci, st.bi, st.li);
  const after = () => { if (tok !== st.token) return; duck(false); st.timer = setTimeout(() => { if (tok === st.token && st.playing) next(true); }, HOLD); };
  st.timer = setTimeout(() => {
    if (tok !== st.token) return;
    voice.src = src(l); voice.currentTime = 0;
    voice.onended = after;
    voice.onerror = () => { if (tok !== st.token) return; st.timer = setTimeout(after, textMs(l)); };
    duck(true);
    const p = voice.play();
    if (p && p.catch) p.catch(() => { if (tok === st.token) st.timer = setTimeout(after, textMs(l)); });
    const n = FLAT[flatIdx(st.ci, st.bi, st.li) + 1]; if (n) pre.src = src(lineAt(n.ci, n.bi, n.li));
  }, delay || 0);
}

// ---------- view api ----------
const api = {
  el(tag, cls, parent, html) { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; if (parent) parent.appendChild(e); return e; },
  svg(tag, attrs, parent) { const e = document.createElementNS('http://www.w3.org/2000/svg', tag); for (const k in attrs || {}) e.setAttribute(k, attrs[k]); if (parent) parent.appendChild(e); return e; },
  goChapter(id) { const ci = D.chapters.findIndex(c => c.id === id); if (ci >= 0) jump(ci, 0, 0); },
  get mode() { return st.mode; },
  every(fn, ms) { const h = setInterval(fn, ms); api._timers.push(h); return h; },
  later(fn, ms) { const h = setTimeout(fn, ms); api._timers.push(h); return h; },
  _timers: [],
  src: D.source, quiz: D.quiz,
};
function clearTimers() { api._timers.forEach(h => { clearInterval(h); clearTimeout(h); }); api._timers = []; }

function header(root, c, b) {
  const v = VIEWS[b.v];
  const hd = api.el('div', 'hd', root);
  api.el('div', 'kick', hd, c.no + ' · ' + c.kicker);
  if (v.title) api.el('div', 'h2', hd, v.title);
  if (v.sub) api.el('div', 'sub', hd, v.sub);
}
function mountBeat(ci, bi, li) {
  const c = D.chapters[ci], b = c.beats[bi], key = ci + ':' + bi;
  const keys = b.lines.map(l => l.b);
  if (st.viewKey !== key) {
    const old = st.view && st.view.root;
    clearTimers();
    if (old) { old.classList.add('out'); setTimeout(() => old.remove(), 1100); }
    const root = api.el('div', 'view pre', $('#views'));
    header(root, c, b);
    const inst = VIEWS[b.v].build(root, api, keys) || {};
    st.view = { root, inst, keys };
    st.viewKey = key;
    root.classList.add('snap');
    if (inst.set) inst.set(li - 1, keys, true);
    void root.offsetWidth;
    root.classList.remove('snap');
    requestAnimationFrame(() => { root.classList.remove('pre'); if (inst.set && st.viewKey === key) inst.set(st.li, keys, false); });
  } else if (st.view.inst.set) st.view.inst.set(li, keys, false);
}

// ---------- chrome ----------
function buildRuler() {
  const field = $('#ruler .field');
  const n = FLAT.length;
  for (let i = 0; i <= 50; i++) { const t = api.el('i', 'tick' + (i % 5 ? ' s' : ''), field); t.style.left = (i / 50 * 100) + '%'; }
  D.chapters.forEach((c, ci) => {
    const at = flatIdx(ci, 0, 0) / n * 100;
    const y = api.el('span', 'yd', field, c.no); y.style.left = at + '%'; y.dataset.ci = ci;
  });
  field.onclick = e => {
    const r = field.getBoundingClientRect(), p = (e.clientX - r.left) / r.width;
    let ci = 0; D.chapters.forEach((c, i) => { if (flatIdx(i, 0, 0) / n <= p + .004) ci = i; });
    jump(ci, 0, 0);
  };
}
function chrome() {
  const c = D.chapters[st.ci], l = lineAt(st.ci, st.bi, st.li);
  $('#top .chap').innerHTML = `<i>${c.no}</i>${c.title}`;
  $('#subs .zh').textContent = l.zh; $('#subs .en').textContent = l.en;
  if ($('#msubs')) { $('#msubs .mz').textContent = l.zh; $('#msubs .me').textContent = l.en; $('#msubs .mc').textContent = c.no + ' · ' + c.title; }
  const p = (flatIdx(st.ci, st.bi, st.li) + 1) / FLAT.length * 100;
  $('#ruler .fill').style.width = p + '%'; $('#ruler .ball').style.left = p + '%';
  document.querySelectorAll('#ruler .yd').forEach(y => y.classList.toggle('cur', +y.dataset.ci === st.ci));
  const lines = c.beats[st.bi].lines;
  $('#dots').innerHTML = lines.map((_, i) => `<i class="${i === st.li ? 'on' : i < st.li ? 'done' : ''}"></i>`).join('');
  document.querySelectorAll('#toc button').forEach((b, i) => b.classList.toggle('cur', i === st.ci));
  const u = new URL(location.href); u.searchParams.set('ch', c.id); history.replaceState(null, '', u);
}
function setModeBtn() { $('#bMode').innerHTML = (st.mode === 'auto' ? '自动讲解' : '我自己讲') + '<kbd>P</kbd>'; $('#bMode').classList.toggle('on', st.mode === 'self'); }
const SUBS = ['both', 'zh', 'en', 'off'], SUBL = ['双语', '中', 'EN', '关'];
function setSubs() { $('#subs').dataset.m = SUBS[st.subs]; $('#bSubs').innerHTML = '字幕 ' + SUBL[st.subs] + '<kbd>S</kbd>'; }

// ---------- navigation ----------
function cardOff() { st.cardWait = false; $('#card').classList.remove('on', 'wait'); }
function dismissCard() {
  if (!st.cardWait) return false;
  cardOff();
  mountBeat(st.ci, st.bi, st.li);
  if (st.mode === 'auto') { st.playing = true; syncPause(); speak(450); }
  return true;
}
function show(ci, bi, li, opts = {}) {
  const chapChange = ci !== st.ci || !st.shown;
  st.ci = ci; st.bi = bi; st.li = li; st.shown = true;
  $('#endc').classList.add('gone');
  if (st.cardWait) cardOff();
  let delay = 0;
  if (CARD_WAIT && chapChange && li === 0 && bi === 0 && !opts.noCard) {
    const c = D.chapters[ci];
    $('#card .no').textContent = c.no; $('#card .k').textContent = c.kicker; $('#card .t').textContent = c.title;
    clearTimeout(st.cardT); st.cardWait = true;
    $('#card').classList.add('on', 'wait');
    stopVoice(); chrome(); syncPause();
    return;
  }
  if (chapChange && li === 0 && bi === 0 && !opts.noCard) {
    const c = D.chapters[ci];
    $('#card .no').textContent = c.no; $('#card .k').textContent = c.kicker; $('#card .t').textContent = c.title;
    $('#card').classList.add('on'); clearTimeout(st.cardT); st.cardT = setTimeout(() => $('#card').classList.remove('on'), CARD_MS);
    delay = CARD_MS - 200;
    setTimeout(() => { if (st.ci === ci && st.bi === bi && st.li === li && st.viewKey !== ci + ':' + bi) mountBeat(ci, bi, li); }, 350);
  } else mountBeat(ci, bi, li);
  chrome();
  if (st.mode === 'auto' && st.playing) speak(delay + (opts.extra || 0)); else stopVoice();
}
function next(auto) {
  if (st.cardWait) { dismissCard(); return; }
  const i = flatIdx(st.ci, st.bi, st.li);
  if (i >= FLAT.length - 1) { stopVoice(); st.playing = false; $('#endc').classList.remove('gone'); syncPause(); return; }
  const n = FLAT[i + 1]; show(n.ci, n.bi, n.li, { extra: n.bi !== st.bi && n.ci === st.ci ? 500 : 0 });
}
function prev() { const i = flatIdx(st.ci, st.bi, st.li); if (i > 0) { const p = FLAT[i - 1]; show(p.ci, p.bi, p.li, { noCard: true }); } }
function jump(ci, bi, li) { $('#toc').classList.add('gone'); if (!st.started) begin(st.mode, ci); else show(ci, bi, li); }
function pauseToggle() {
  if (st.cardWait) { dismissCard(); return; }
  if (st.mode !== 'auto') return next();
  st.playing = !st.playing;
  syncPause();
  if (st.playing) speak(0); else stopVoice();
}
function syncPause() {
  const paused = st.mode === 'auto' && !st.playing && st.started;
  $('#bPause').textContent = st.mode === 'auto' && st.playing ? 'Ⅱ' : '▶';
  if ($('#mPause')) $('#mPause').textContent = $('#bPause').textContent;
  $('#bPause').title = st.mode === 'auto' ? (st.playing ? '暂停 空格' : '继续 空格') : '下一句 空格';
  $('#pz').textContent = 'Ⅱ 已暂停 · 空格继续'; $('#pz').classList.toggle('on', paused && !st.cardWait && $('#endc').classList.contains('gone'));
}
function setMode(m) {
  st.mode = m; setModeBtn();
  if (m === 'self') { st.playing = false; stopVoice(); } else { st.playing = true; if (!st.cardWait) speak(200); }
  duck(false); syncPause();
}
function begin(mode, ci) {
  st.started = true; $('#start').classList.add('gone');
  st.mode = mode; st.playing = mode === 'auto'; setModeBtn();
  if (st.music && mode === 'auto') { music.play().catch(() => {}); }
  duck(false); syncPause();
  show(ci || 0, 0, 0);
}

// ---------- boot ----------
function boot() {
  const toc = $('#toc');
  toc.innerHTML = D.chapters.map(c => `<button><i>${c.no}</i><span>${c.title}</span></button>`).join('');
  toc.querySelectorAll('button').forEach((b, i) => b.onclick = () => jump(i, 0, 0));
  buildRuler(); setSubs(); setModeBtn();
  const chq = qs.get('ch');
  let startCi = 0;
  if (chq != null) { const i = D.chapters.findIndex(c => c.id === chq || c.no === chq || c.no === chq.padStart(2, '0')); if (i >= 0) startCi = i; }
  if (startCi) $('#from').textContent = `将从第 ${D.chapters[startCi].no} 章「${D.chapters[startCi].title}」开始`;
  $('#goAuto').onclick = () => begin('auto', startCi);
  $('#goSelf').onclick = () => begin('self', startCi);
  $('#bMode').onclick = () => setMode(st.mode === 'auto' ? 'self' : 'auto');
  $('#bSubs').onclick = () => { st.subs = (st.subs + 1) % 4; setSubs(); };
  if (!MUSIC && $('#bMusic')) $('#bMusic').remove();
  if ($('#bMusic')) $('#bMusic').onclick = () => { st.music = !st.music; $('#bMusic').classList.toggle('on', !st.music); if (st.music) music.play().catch(() => {}); duck(false); };
  $('#bToc').onclick = e => { e.stopPropagation(); toc.classList.toggle('gone'); };
  $('#bFs').onclick = () => { const d = document; if (!d.fullscreenElement) (d.documentElement.requestFullscreen || (() => {})).call(d.documentElement); else d.exitFullscreen(); };
  $('#bPrev').onclick = prev; $('#bNext').onclick = () => next();
  $('#bPause').onclick = pauseToggle;
  if ($('#mPrev')) { $('#mPrev').onclick = () => st.started && prev(); $('#mNext').onclick = () => st.started ? next() : begin('self', startCi); $('#mPause').onclick = () => st.started ? pauseToggle() : begin('auto', startCi); }
  $('#again').onclick = () => jump(0, 0, 0);
  $('#card').addEventListener('click', e => { e.stopPropagation(); dismissCard(); });
  $('#rotOk').onclick = () => { st.portraitOk = true; fit(); };
  if (qs.get('portrait') === 'ok') st.portraitOk = true;
  document.addEventListener('click', e => { const bt = e.target.closest && e.target.closest('button'); if (bt) setTimeout(() => bt.blur(), 0); }, true);
  addEventListener('click', e => { if (!toc.contains(e.target) && e.target.id !== 'bToc') toc.classList.add('gone'); });
  addEventListener('keydown', e => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const k = e.key;
    if (!st.started) { if (k === 'Enter' || k === ' ') { e.preventDefault(); begin('auto', startCi); } else if (k === 'p' || k === 'P') begin('self', startCi); return; }
    if (st.cardWait && k === 'Enter') { e.preventDefault(); dismissCard(); return; }
    if (k === 'ArrowRight' || k === 'PageDown') { e.preventDefault(); next(); }
    else if (k === 'ArrowLeft' || k === 'PageUp') { e.preventDefault(); prev(); }
    else if (k === ' ') { e.preventDefault(); pauseToggle(); }
    else if (k === 'p' || k === 'P') setMode(st.mode === 'auto' ? 'self' : 'auto');
    else if (k === 's' || k === 'S') { st.subs = (st.subs + 1) % 4; setSubs(); }
    else if ((k === 'm' || k === 'M') && MUSIC && $('#bMusic')) $('#bMusic').click();
    else if (k === 't' || k === 'T') toc.classList.toggle('gone');
    else if (k === 'f' || k === 'F') $('#bFs').click();
    else if (k === 'Escape') toc.classList.add('gone');
  });
  let tx = null;
  stage.addEventListener('touchstart', e => { tx = e.touches[0].clientX; }, { passive: true });
  stage.addEventListener('touchend', e => { if (tx == null || !st.started) return; const dx = e.changedTouches[0].clientX - tx; if (Math.abs(dx) > 70) (dx < 0 ? next() : prev()); tx = null; });
  fit();
}
boot();
window.LG = { st, next, prev, jump, setMode, dismissCard };
})();
