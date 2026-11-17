// 医学科研大模型选型榜 · 头图 3D 场景（three.js r187 WebGPURenderer，无 WebGPU 时自动回退 WebGL2）
// 数据只来自页面内 window.LLM_RANK_MODELS（与总对比表同源）；失败时保留静态 SVG。
import * as T from './vendor/three-webgpu-r187v1.0.min.js';

export async function initHero(host, models, opts) {
  opts = opts || {};
  const cv = document.createElement('canvas');
  cv.className = 'h3d-canvas';
  cv.setAttribute('aria-hidden', 'true');
  host.appendChild(cv);

  const renderer = new T.WebGPURenderer({ canvas: cv, antialias: true, alpha: true });
  await renderer.init();
  const backend = renderer.backend && renderer.backend.isWebGPUBackend ? 'WebGPU' : 'WebGL2';
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setClearColor(0x000000, 0);

  const scene = new T.Scene();
  scene.fog = new T.Fog(0x0e1830, 14, 34);
  const cam = new T.PerspectiveCamera(42, 1, 0.1, 100);
  const world = new T.Group();
  scene.add(world);

  // 坐标：x = log10(输出价)，y = AA Index，z = 厂商
  const LX = (p) => ((Math.log10(p) - Math.log10(0.5)) / (Math.log10(50) - Math.log10(0.5))) * 12 - 6;
  const LY = (a) => ((a - 35) / 31) * 6;
  const LZ = { openai: -2.6, anthropic: 0, google: 2.6 };
  const COL = { openai: 0x2fd3a3, anthropic: 0xff8a5c, google: 0x6ea5ff };
  const FLOOR = -0.9;

  // 地面网格（价格刻度）与高度刻度线
  const gl = [];
  [0.5, 1, 5, 10, 20, 50].forEach((p) => { const x = LX(p); gl.push(x, FLOOR, -3.8, x, FLOOR, 3.8); });
  [-2.6, 0, 2.6].forEach((z) => gl.push(-6.6, FLOOR, z, 6.4, FLOOR, z));
  [40, 50, 60].forEach((a) => { const y = LY(a); gl.push(-6.6, y, -3.8, -6.6, y, 3.8); gl.push(-6.6, y, -3.8, 6.4, y, -3.8); });
  gl.push(-6.6, FLOOR, -3.8, -6.6, LY(66), -3.8);
  const gg = new T.BufferGeometry();
  gg.setAttribute('position', new T.Float32BufferAttribute(gl, 3));
  world.add(new T.LineSegments(gg, new T.LineBasicMaterial({ color: 0x8fa6d8, transparent: true, opacity: 0.22 })));

  // 星尘
  const dust = [];
  for (let i = 0; i < 260; i++) dust.push((Math.random() - 0.5) * 30, Math.random() * 14 - 4, (Math.random() - 0.5) * 30);
  const dg = new T.BufferGeometry();
  dg.setAttribute('position', new T.Float32BufferAttribute(dust, 3));
  const dustPts = new T.Points(dg, new T.PointsMaterial({ color: 0xb9c8ff, size: 0.05, transparent: true, opacity: 0.5 }));
  scene.add(dustPts);

  // 发光贴图
  const gc = document.createElement('canvas'); gc.width = gc.height = 128;
  const g2 = gc.getContext('2d');
  const rg = g2.createRadialGradient(64, 64, 0, 64, 64, 64);
  rg.addColorStop(0, 'rgba(255,255,255,1)'); rg.addColorStop(0.18, 'rgba(255,255,255,.55)');
  rg.addColorStop(0.5, 'rgba(255,255,255,.12)'); rg.addColorStop(1, 'rgba(255,255,255,0)');
  g2.fillStyle = rg; g2.fillRect(0, 0, 128, 128);
  const glowTex = new T.CanvasTexture(gc); glowTex.colorSpace = T.SRGBColorSpace;

  const sph = new T.SphereGeometry(1, 24, 16);
  const ring = new T.RingGeometry(0.85, 1, 32);
  const nodes = [];
  const stems = [];
  models.forEach((m) => {
    const x = m.out ? LX(m.out) : -7.6;
    const y = m.aa != null ? LY(m.aa) : FLOOR + 0.25;
    const z = LZ[m.v];
    const c = new T.Color(COL[m.v]);
    const solid = m.kind === 'v501';
    const r = m.star ? 0.3 : solid ? 0.2 : 0.15;
    const mesh = new T.Mesh(sph, new T.MeshBasicMaterial({ color: solid ? c : c.clone().multiplyScalar(0.45), transparent: !solid, opacity: solid ? 1 : 0.55 }));
    mesh.scale.setScalar(r); mesh.position.set(x, y, z); mesh.userData.m = m;
    world.add(mesh);
    if (m.kind !== 'none') {
      const glow = new T.Sprite(new T.SpriteMaterial({ map: glowTex, color: c, transparent: true, opacity: solid ? 0.9 : 0.35, blending: T.AdditiveBlending, depthWrite: false }));
      glow.scale.setScalar(r * (m.star ? 9 : 6)); glow.position.copy(mesh.position);
      world.add(glow); mesh.userData.glow = glow;
      stems.push(x, FLOOR, z, x, y - r, z);
    } else {
      const rr = new T.Mesh(ring, new T.MeshBasicMaterial({ color: 0x9aa7c7, transparent: true, opacity: 0.6, side: T.DoubleSide }));
      rr.scale.setScalar(0.3); rr.position.set(x, FLOOR + 0.02, z); rr.rotation.x = -Math.PI / 2;
      world.add(rr);
    }
    nodes.push(mesh);
  });
  const sg = new T.BufferGeometry();
  sg.setAttribute('position', new T.Float32BufferAttribute(stems, 3));
  world.add(new T.LineSegments(sg, new T.LineBasicMaterial({ color: 0xc8d4ff, transparent: true, opacity: 0.25 })));

  // HTML 标签层（投影坐标）
  const layer = document.createElement('div'); layer.className = 'h3d-labels'; host.appendChild(layer);
  const tags = [];
  function addTag(text, pos, cls) { const el = document.createElement('span'); el.className = 'h3d-tag ' + (cls || ''); el.textContent = text; layer.appendChild(el); tags.push({ el, p: new T.Vector3().copy(pos), minor: / minor|^minor/.test(' ' + (cls || '')) }); return el; }
  nodes.forEach((n) => { const m = n.userData.m; const p = n.position.clone(); p.y += n.scale.x + 0.18; if (m.star || m.kind === 'v501') addTag(m.short, p, m.star ? 'star' : 'minor'); });
  [[0.5, '$0.5'], [1, '$1'], [5, '$5'], [10, '$10'], [20, '$20'], [50, '$50']].forEach(([p, t]) => addTag(t, new T.Vector3(LX(p), FLOOR - 0.35, 3.9), 'axis'));
  [40, 50, 60].forEach((a) => addTag('AA ' + a, new T.Vector3(-6.9, LY(a), -3.8), 'axis'));
  addTag('价格未找到', new T.Vector3(-7.6, FLOOR - 0.35, 0.6), 'axis');
  [['OpenAI', 'openai'], ['Anthropic', 'anthropic'], ['Google', 'google']].forEach(([t, v]) => addTag(t, new T.Vector3(6.9, FLOOR, LZ[v]), 'lane ' + v));

  tags.sort((a, b) => (a.minor ? 1 : 0) - (b.minor ? 1 : 0));
  const tip = opts.tip;
  const ray = new T.Raycaster(); const ptr = new T.Vector2(); let hover = null;
  function pick(ev) {
    const b = cv.getBoundingClientRect();
    ptr.set(((ev.clientX - b.left) / b.width) * 2 - 1, -((ev.clientY - b.top) / b.height) * 2 + 1);
    ray.setFromCamera(ptr, cam);
    // 放大命中半径，方便手指点
    let best = null, bd = 1e9;
    nodes.forEach((n) => { const d = ray.ray.distanceSqToPoint(n.position); const lim = Math.pow(n.scale.x + 0.35, 2); if (d < lim && d < bd) { bd = d; best = n; } });
    return { best, x: ev.clientX - b.left, y: ev.clientY - b.top };
  }
  function show(r) {
    nodes.forEach((n) => { if (n.userData.glow) n.userData.glow.material.opacity = (n.userData.m.kind === 'v501' ? 0.9 : 0.35) * (r.best && r.best !== n ? 0.5 : 1); });
    hover = r.best;
    if (tip) tip(r.best ? r.best.userData.m : null, r.x, r.y);
  }
  cv.addEventListener('pointermove', (e) => { if (e.pointerType === 'mouse') show(pick(e)); });
  cv.addEventListener('pointerdown', (e) => show(pick(e)));
  cv.addEventListener('pointerleave', (e) => { if (e.pointerType === 'mouse') show({ best: null }); });

  let W = 0, H = 0;
  function resize() {
    const b = host.getBoundingClientRect(); W = Math.max(1, b.width); H = Math.max(1, b.height);
    renderer.setSize(W, H, false); cam.aspect = W / H;
    cam.fov = W < 600 ? 50 : 40; cam.updateProjectionMatrix();
  }
  resize();
  new ResizeObserver(resize).observe(host);

  let ang = 0.55, t0 = performance.now(), running = false;
  const target = new T.Vector3(0, 2.0, 0);
  const v = new T.Vector3();
  function frame(now) {
    const dt = Math.min(0.05, (now - t0) / 1000); t0 = now;
    if (!hover) ang += dt * 0.12;
    // 按画面宽高比自动拉远，保证左右两端（含厂商标签）都在画面内
    const hf = Math.atan(Math.tan((cam.fov * Math.PI / 180) / 2) * cam.aspect);
    const R = Math.max(15.5, (cam.aspect < 1.1 ? 9.4 : 8.6) / Math.tan(hf));
    cam.position.set(Math.sin(ang) * R, (W < 600 ? 3.6 : 5.2) + Math.sin(ang * 0.7) * 0.7, Math.cos(ang) * R);
    cam.lookAt(target);
    dustPts.rotation.y += dt * 0.01;
    nodes.forEach((n, i) => { if (n.userData.glow) { const s = 1 + Math.sin(now / 900 + i) * 0.06; n.userData.glow.scale.setScalar(n.scale.x * (n.userData.m.star ? 9 : 6) * s); } });
    renderer.render(scene, cam);
    // 标签投影 + 简单避让：旗舰与坐标轴优先，次要标签与已放置的重叠就隐藏
    const placed = [];
    for (const t of tags) {
      v.copy(t.p).project(cam);
      const x = (v.x * 0.5 + 0.5) * W, y = (-v.y * 0.5 + 0.5) * H;
      t.el.style.transform = 'translate(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px) translate(-50%,-100%)';
      if (t.w == null) { t.w = t.el.offsetWidth; t.h = t.el.offsetHeight; }
      const box = [x - t.w / 2, y - t.h, x + t.w / 2, y];
      let hide = v.z >= 1;
      if (!hide && t.minor) hide = placed.some((b) => box[0] < b[2] && box[2] > b[0] && box[1] < b[3] && box[3] > b[1]);
      if (!hide) placed.push(box);
      t.el.style.opacity = hide ? '0' : '';
    }
  }
  function start() { if (running) return; running = true; t0 = performance.now(); renderer.setAnimationLoop(frame); }
  function stop() { if (!running) return; running = false; renderer.setAnimationLoop(null); }
  let onScreen = true;
  new IntersectionObserver((es) => { onScreen = es[0].isIntersecting; onScreen && !document.hidden ? start() : stop(); }).observe(host);
  document.addEventListener('visibilitychange', () => { document.hidden ? stop() : onScreen && start(); });
  start();
  frame(performance.now());
  return { backend, start, stop };
}
