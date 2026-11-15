// aiai · Codex for Research — 3D scene
// three.js WebGPURenderer: WebGPU where available, automatic WebGL2 fallback elsewhere.
import * as THREE from 'three/webgpu';
import { color, float, pow, normalView, positionView, uniform, mix, time, sin } from 'three/tsl';

const canvas = document.getElementById('gl');
const badge = document.getElementById('gpu');
const labelsEl = document.getElementById('labels');
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

function setBadge(kind, text){ badge.className = 'gpu ' + kind; badge.querySelector('span').textContent = text; }

async function start(){
  const renderer = new THREE.WebGPURenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setSize(innerWidth, innerHeight);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  await renderer.init();
  const isGPU = !!renderer.backend.isWebGPUBackend;
  setBadge(isGPU ? 'webgpu' : 'webgl', isGPU ? 'WebGPU' : 'WebGL2');

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0xf4f5ff, 0.007);
  const camera = new THREE.PerspectiveCamera(42, innerWidth / innerHeight, 0.1, 200);

  scene.add(new THREE.HemisphereLight(0xffffff, 0xb9bcff, 0.8));
  const key = new THREE.DirectionalLight(0xffffff, 1.6); key.position.set(6, 10, 8); scene.add(key);
  const rim = new THREE.PointLight(0x62d6ff, 60, 40); rim.position.set(-8, 3, -6); scene.add(rim);
  const warm = new THREE.PointLight(0xff9bd2, 40, 30); warm.position.set(8, -4, 4); scene.add(warm);

  // ---------- Codex core: cloud of glassy spheres with a >_ prompt ----------
  const core = new THREE.Group(); scene.add(core);
  const pulse = uniform(0);
  const fres = pow(float(1).sub(normalView.dot(positionView.normalize().negate()).clamp()), 2.6);
  const coreMat = new THREE.MeshStandardNodeMaterial({ roughness: 0.25, metalness: 0.1 });
  coreMat.colorNode = mix(color(0x3b3fe0), color(0x8b6dff), fres);
  coreMat.emissiveNode = mix(color(0x7d6bff), color(0x9fe3ff), fres).mul(fres.mul(2.2).add(pulse.mul(0.35)));
  const lobes = new THREE.SphereGeometry(1, 48, 32);
  const shell = new THREE.Mesh(new THREE.SphereGeometry(1.55, 48, 32), coreMat); core.add(shell);
  for (let i = 0; i < 8; i++){
    const a = i / 8 * Math.PI * 2;
    const m = new THREE.Mesh(lobes, coreMat);
    m.position.set(Math.cos(a) * 1.35, Math.sin(a) * 1.35, 0); m.scale.setScalar(0.92);
    core.add(m);
  }
  const white = new THREE.MeshBasicMaterial({ color: 0xffffff, toneMapped: false });
  const chev1 = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.22, 0.22), white);
  chev1.position.set(-0.55, 0.28, 2.15); chev1.rotation.z = -0.62;
  const chev2 = chev1.clone(); chev2.position.y = -0.28; chev2.rotation.z = 0.62;
  const under = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.22, 0.22), white); under.position.set(0.75, -0.55, 2.15);
  const cursor = under; core.add(chev1, chev2, under);

  // halo rings
  const ringMat = new THREE.MeshBasicMaterial({ color: 0x7a5cf5, transparent: true, opacity: 0.28 });
  const rings = [];
  [3.6, 4.4].forEach((r, i) => {
    const t = new THREE.Mesh(new THREE.TorusGeometry(r, 0.012, 8, 160), ringMat);
    t.rotation.x = Math.PI / 2 + (i ? 0.35 : -0.2); t.rotation.y = i ? 0.3 : -0.1; scene.add(t); rings.push(t);
  });

  // ---------- four stations (task folders) ----------
  const ST = [
    { name: '论文搜索', num: '03', c: 0x62d6ff, a: 0.35 },
    { name: '综述写作', num: '04', c: 0x9b7bff, a: 0.35 + Math.PI / 2 },
    { name: '数据分析', num: '05', c: 0x48e3b4, a: 0.35 + Math.PI },
    { name: '答辩 PPT', num: '06', c: 0xffc56b, a: 0.35 + Math.PI * 1.5 },
  ];
  const R = 8.2;
  const folderGeo = new THREE.BoxGeometry(2.4, 1.7, 0.18);
  const tabGeo = new THREE.BoxGeometry(0.9, 0.3, 0.18);
  const sheetGeo = new THREE.BoxGeometry(2.0, 1.3, 0.04);
  ST.forEach((s, i) => {
    const g = new THREE.Group();
    g.position.set(Math.cos(s.a) * R, Math.sin(i * 1.7) * 0.9, Math.sin(s.a) * R);
    const glow = uniform(0.25); s.glow = glow;
    const m = new THREE.MeshStandardNodeMaterial({ roughness: 0.35, metalness: 0.2, transparent: true, opacity: 0.92 });
    m.colorNode = color(s.c).mul(0.75);
    m.emissiveNode = color(s.c).mul(glow.add(fres.mul(1.2)));
    const body = new THREE.Mesh(folderGeo, m);
    const tab = new THREE.Mesh(tabGeo, m); tab.position.set(-0.7, 0.98, 0);
    const sheets = [];
    for (let k = 0; k < 3; k++){
      const sh = new THREE.Mesh(sheetGeo, new THREE.MeshStandardMaterial({ color: 0xeef0ff, roughness: 0.6, emissive: 0x9aa0d0 }));
      sh.position.set(0.04 * k, 0.12 + 0.06 * k, 0.14 + 0.05 * k); g.add(sh); sheets.push(sh);
    }
    const edgeMat = new THREE.LineBasicMaterial({ color: s.c, transparent: true, opacity: 0.9, toneMapped: false });
    const e1 = new THREE.LineSegments(new THREE.EdgesGeometry(folderGeo), edgeMat);
    const e2 = new THREE.LineSegments(new THREE.EdgesGeometry(tabGeo), edgeMat); e2.position.copy(tab.position);
    g.add(body, tab, e1, e2);
    g.lookAt(0, g.position.y, 0); g.rotateY(Math.PI);
    scene.add(g); s.group = g; s.sheets = sheets; s.base = g.position.clone();
    const el = document.createElement('div'); el.className = 'lbl'; el.innerHTML = `<i>${s.num}</i>${s.name}`;
    labelsEl.appendChild(el); s.el = el;
  });

  // ---------- flowing particles core -> stations ----------
  const PER = reduce ? 14 : 34;
  const curves = ST.map(s => {
    const end = s.base.clone();
    const mid = end.clone().multiplyScalar(0.5); mid.y += 2.6;
    return new THREE.QuadraticBezierCurve3(new THREE.Vector3(0, 0, 0), mid, end);
  });
  const dotGeo = new THREE.IcosahedronGeometry(0.06, 1);
  const dots = new THREE.InstancedMesh(dotGeo, new THREE.MeshBasicMaterial({ color: 0xffffff }), PER * ST.length);
  const tmpC = new THREE.Color();
  for (let i = 0; i < ST.length; i++) for (let k = 0; k < PER; k++) dots.setColorAt(i * PER + k, tmpC.set(ST[i].c));
  scene.add(dots);
  const lineMats = ST.map(s => new THREE.LineBasicMaterial({ color: s.c, transparent: true, opacity: 0.18 }));
  curves.forEach((cv, i) => scene.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(cv.getPoints(60)), lineMats[i])));

  // ---------- star dust ----------
  const DUST = reduce ? 300 : 900;
  const dust = new THREE.InstancedMesh(new THREE.IcosahedronGeometry(0.035, 0), new THREE.MeshBasicMaterial({ color: 0x8f86f0, transparent: true, opacity: 0.45 }), DUST);
  const M = new THREE.Matrix4(), P = new THREE.Vector3(), Q = new THREE.Quaternion(), S = new THREE.Vector3(1, 1, 1);
  for (let i = 0; i < DUST; i++){
    const r = 12 + Math.random() * 40, th = Math.random() * Math.PI * 2, ph = Math.acos(2 * Math.random() - 1);
    P.set(r * Math.sin(ph) * Math.cos(th), r * Math.cos(ph) * 0.6, r * Math.sin(ph) * Math.sin(th));
    S.setScalar(0.5 + Math.random() * 1.6); M.compose(P, Q, S); dust.setMatrixAt(i, M);
  }
  scene.add(dust);

  // ---------- camera choreography per chapter ----------
  const wide = () => innerWidth > 860;
  const sv = (i, d, h) => { const b = ST[i].base; const dir = b.clone().setY(0).normalize(); return { pos: b.clone().add(dir.multiplyScalar(-d)).add(new THREE.Vector3(0, h, 0)).add(dir.clone().cross(new THREE.Vector3(0,1,0)).multiplyScalar(2.2)), look: b.clone() }; };
  function shot(ch){
    switch (ch){
      case 0: return { pos: new THREE.Vector3(0, 7, 27), look: new THREE.Vector3(0, 0, 0), focus: -1 };
      case 1: return { pos: new THREE.Vector3(4, 2.2, 16), look: new THREE.Vector3(0, 0, 0), focus: -1 };
      case 2: return { pos: new THREE.Vector3(-11, 6, 15), look: new THREE.Vector3(0, 0.3, 0), focus: -1 };
      case 3: case 4: case 5: case 6: { const s = sv(ch - 3, -6.2, 1.6); s.focus = ch - 3; return s; }
      default: return { pos: new THREE.Vector3(0, 24, 15), look: new THREE.Vector3(0, 0, 0), focus: -2 };
    }
  }
  let target = shot(window.__chapter || 0);
  const camPos = target.pos.clone(), camLook = target.look.clone();
  const fit = s => { if (!wide()) s.pos = s.look.clone().add(s.pos.clone().sub(s.look).multiplyScalar(1.3)); return s; };
  target = fit(target); camPos.copy(target.pos);
  addEventListener('chapter', e => { target = fit(shot(e.detail)); });

  // offset framing: on desktop, push the subject to the right third
  const ptr = { x: 0, y: 0 };
  addEventListener('pointermove', e => { ptr.x = e.clientX / innerWidth - 0.5; ptr.y = e.clientY / innerHeight - 0.5; });

  addEventListener('resize', () => {
    camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix(); renderer.setSize(innerWidth, innerHeight);
  });

  let contentRight = 0;
  const measure = () => { const c = document.querySelector('.ch.on > .reveal'); contentRight = c ? c.getBoundingClientRect().right : 0; };
  addEventListener('chapter', () => setTimeout(measure, 60)); addEventListener('resize', measure); setTimeout(measure, 300);
  const clock = new THREE.Clock();
  const proj = new THREE.Vector3();
  const right = new THREE.Vector3(), fwd = new THREE.Vector3();
  renderer.setAnimationLoop(() => {
    const dt = Math.min(clock.getDelta(), 0.05), t = clock.elapsedTime * (reduce ? 0.3 : 1);
    const k = 1 - Math.pow(0.0015, dt);
    camPos.lerp(target.pos, k * 0.9); camLook.lerp(target.look, k);
    camera.position.copy(camPos).add(new THREE.Vector3(ptr.x * 1.2, -ptr.y * 0.8, 0));
    camera.lookAt(camLook);
    // frame subject to the right on wide screens, upward on phones
    camera.getWorldDirection(fwd); right.crossVectors(fwd, camera.up).normalize();
    if (wide()) camera.setViewOffset(innerWidth, innerHeight, -innerWidth * 0.22, 0, innerWidth, innerHeight);
    else camera.setViewOffset(innerWidth, innerHeight, 0, innerHeight * 0.3, innerWidth, innerHeight);

    core.rotation.y = Math.sin(t * 0.4) * 0.35; core.rotation.x = Math.sin(t * 0.27) * 0.12;
    core.position.y = Math.sin(t * 0.8) * 0.15;
    pulse.value = 0.5 + 0.5 * Math.sin(t * 2.2);
    cursor.visible = (Math.floor(t * 1.6) % 2) === 0;
    rings[0].rotation.z = t * 0.08; rings[1].rotation.z = -t * 0.05;

    ST.forEach((s, i) => {
      const on = target.focus === i || target.focus === -2;
      s.glow.value += ((on ? 0.9 : 0.18) - s.glow.value) * k;
      const g = s.group; g.position.y = s.base.y + Math.sin(t * 0.9 + i) * 0.18;
      const sc = target.focus === i ? 1.25 : 1; g.scale.setScalar(g.scale.x + (sc - g.scale.x) * k);
      s.sheets.forEach((sh, n) => { sh.position.y = 0.12 + 0.06 * n + (target.focus === i ? Math.sin(t * 2 + n) * 0.08 + n * 0.12 : 0); });
      lineMats[i].opacity = on ? 0.55 : 0.22;
      // label
      proj.copy(g.position); proj.y += 1.5; proj.project(camera);
      const vis = proj.z < 1 && Math.abs(proj.x) < 1.1 && Math.abs(proj.y) < 1.1;
      const lx = (proj.x + 1) / 2 * innerWidth;
      const blocked = wide() ? lx < contentRight + 40 : (1 - proj.y) / 2 * innerHeight > innerHeight * 0.3;
      s.el.style.opacity = vis && !blocked ? 1 : 0;
      s.el.style.left = lx + 'px';
      s.el.style.top = ((1 - proj.y) / 2 * innerHeight) + 'px';
      s.el.classList.toggle('on', target.focus === i);
    });

    for (let i = 0; i < ST.length; i++){
      const speed = target.focus === i ? 0.32 : 0.12;
      for (let n = 0; n < PER; n++){
        const u = (n / PER + t * speed) % 1;
        curves[i].getPoint(u, P);
        S.setScalar(0.6 + Math.sin(u * Math.PI) * (target.focus === i ? 1.4 : 0.8));
        M.compose(P, Q, S); dots.setMatrixAt(i * PER + n, M);
      }
    }
    dots.instanceMatrix.needsUpdate = true;
    dust.rotation.y = t * 0.01;

    renderer.render(scene, camera);
  });
}

start().catch(err => {
  console.warn('3D disabled:', err);
  setBadge('', '静态背景');
});
