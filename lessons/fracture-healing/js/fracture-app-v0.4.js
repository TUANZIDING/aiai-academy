// fracture-app v0.4 (v0.3 + anatomy-expert revision: 12 dissection layers, solid cut faces, anatomical skin) · 胫骨干骨折（AO 42-A3）愈合 3D 课件主程序
import * as THREE from 'three';
import { OrbitControls } from '../vendor/orbit-controls-r170.js';
import { RoomEnvironment } from '../vendor/room-environment-r170.js';
import * as E from './fracture-engine-v0.4.js';
import { KEYS, STAGES, EVENTS, KEYTEXT, KEYTEXT_P, CASTNOTE, CELLS, SIGNALS, IMAGING, SOURCES, SRC_INDEX } from './fracture-content-v0.4.js';
import { PRIMARY, CLINICAL, QUIZ, UI, ANAT } from './fracture-teach-v0.4.js';
import * as L from './anatomy-layers-v0.4.js';

const { clamp, ss, lerp, Rb, Rc, Cb, PAL } = E;
const $ = s => document.querySelector(s);
const Q = new URLSearchParams(location.search);
const MODES = ['explore', 'cells', 'primary', 'imaging', 'clinical', 'quiz'];
const st = {
  u: E.dayToU(+Q.get('d') || 0), mode: MODES.includes(Q.get('mode')) ? Q.get('mode') : 'explore',
  lang: Q.get('lang') === 'en' ? 'en' : 'zh',
  cut: Q.get('cut') === '1', peri: false, cells: Q.get('cells') === '1', vessels: true, soft: Q.get('soft') === '1', labels: Q.get('labels') !== '0',
  fix: ['cast', 'nail', 'plate'].includes(Q.get('fix')) ? Q.get('fix') : 'nail',
  course: ['normal', 'delayed', 'atrophic'].includes(Q.get('course')) ? Q.get('course') : 'normal',
  view: Q.get('view') === 'lat' ? 'lat' : 'ap', playing: false, tour: false, hl: null, clinTab: 0,
  quiz: { i: -1, score: 0, res: [], picked: null }, strain: { gap: 1.0, disp: 0.05 }, tween: null
};
const T = () => UI[st.lang];
let S = E.healState(0, st.fix, st.course);
let dirtyGeo = true, dirtyStatic = true, dirtyUI = true, lastGeo = 0, lastXr = 0, dirtyXr = true;
const route = () => (st.fix === 'plate' ? 'primary' : 'secondary');

// ---------- refs ----------
const refHTML = s => String(s).replace(/\[\[([A-Z0-9-]+)\]\]/g, (_, id) => {
  const i = SRC_INDEX[id]; if (!i) return '';
  const ao = SOURCES[i - 1].ao;
  return `<a class="ref${ao ? ' ao' : ''}" data-src="${id}" title="${SOURCES[i - 1].t.replace(/"/g, '')}">${ao ? 'AO·' : ''}${i}</a>`;
});

// ================= three.js setup =================
const stageEl = $('#stage');
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance', preserveDrawingBuffer: Q.get('shot') === '1' });
renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.0;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
stageEl.appendChild(renderer.domElement);
const scene = new THREE.Scene();
const pmrem = new THREE.PMREMGenerator(renderer);
scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
scene.environmentIntensity = 0.32;
const camera = new THREE.PerspectiveCamera(28, 1, 0.5, 400);
camera.position.set(-0.33, 0.22, 0.92);
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; controls.dampingFactor = 0.08; controls.enablePan = false; controls.rotateSpeed = 0.7; controls.zoomSpeed = 0.8;
const key = new THREE.DirectionalLight(0xfff3e2, 2.7);
key.position.set(6, 22, 16); key.castShadow = true;
key.shadow.mapSize.set(2048, 2048); key.shadow.bias = -0.0004; key.shadow.normalBias = 0.05;
Object.assign(key.shadow.camera, { left: -26, right: 26, top: 26, bottom: -26, near: 1, far: 90 });
scene.add(key);
const fill = new THREE.DirectionalLight(0xdfe8ff, 0.7); fill.position.set(-10, 6, 14); scene.add(fill);
const rim = new THREE.DirectionalLight(0x7fdcff, 2.2); rim.position.set(-16, 6, -14); scene.add(rim);
const rim2 = new THREE.DirectionalLight(0xffb070, 0.9); rim2.position.set(16, -4, -10); scene.add(rim2);
scene.add(new THREE.HemisphereLight(0xb7d0ff, 0x24161c, 0.28));
const floor = new THREE.Mesh(new THREE.PlaneGeometry(200, 200), new THREE.ShadowMaterial({ opacity: 0.22 }));
floor.rotation.x = -Math.PI / 2; floor.receiveShadow = true; scene.add(floor);
const glowTex = E.makeCanvasTex(256, (ctx, s) => { const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2); g.addColorStop(0, 'rgba(94,231,255,.5)'); g.addColorStop(0.35, 'rgba(60,120,255,.16)'); g.addColorStop(1, 'rgba(0,0,0,0)'); ctx.fillStyle = g; ctx.fillRect(0, 0, s, s); }, false);
const glow = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ map: glowTex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: 0.5 }));
glow.rotation.x = -Math.PI / 2; scene.add(glow);

// ================= materials =================
const noiseTex = E.makeCanvasTex(256, E.noisePainter(3.2, 0.35, 1));
const noiseTex2 = E.makeCanvasTex(256, E.noisePainter(7, 0.2, 1));
const haversTex = E.makeCanvasTex(512, E.haversPainter); haversTex.colorSpace = THREE.SRGBColorSpace; haversTex.repeat.set(2.2, 0.9);
const marrowTex = E.makeCanvasTex(512, E.marrowPainter); marrowTex.colorSpace = THREE.SRGBColorSpace; marrowTex.repeat.set(1.4, 1.4);
const spongyTex = E.makeCanvasTex(512, E.spongyPainter); spongyTex.colorSpace = THREE.SRGBColorSpace; spongyTex.repeat.set(2, 1.4);
const U = { nec: { value: 0 }, gap: { value: 0.06 } };
// bone: physical + fake subsurface (wrap/rim) + necrotic-end greying driven by a uniform
function boneShader(mat, sss = new THREE.Color('#ff9f6e'), withNec = true) {
  mat.onBeforeCompile = sh => {
    sh.uniforms.uNec = U.nec; sh.uniforms.uGap = U.gap; sh.uniforms.uSss = { value: sss };
    sh.vertexShader = sh.vertexShader.replace('#include <common>', '#include <common>\nvarying float vYb;').replace('#include <begin_vertex>', '#include <begin_vertex>\nvYb = position.y;');
    sh.fragmentShader = sh.fragmentShader.replace('#include <common>', '#include <common>\nvarying float vYb; uniform float uNec; uniform float uGap; uniform vec3 uSss;')
      .replace('#include <color_fragment>', `#include <color_fragment>\n${withNec ? 'float nk = uNec * exp(-max(0.0, abs(vYb) - uGap) / 0.42); diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.52,0.50,0.47), nk);' : ''}`)
      .replace('#include <opaque_fragment>', 'float fr = pow(1.0 - saturate(dot(normal, normalize(vViewPosition))), 2.6);\noutgoingLight += uSss * fr * 0.10 + uSss * 0.025;\n#include <opaque_fragment>');
  };
  return mat;
}
function fresnelShell(mat, base = 0.22) {
  mat.onBeforeCompile = sh => {
    sh.fragmentShader = sh.fragmentShader.replace('#include <opaque_fragment>', `float fr2 = pow(1.0 - abs(dot(normal, normalize(vViewPosition))), 1.8);\ndiffuseColor.a *= (${base.toFixed(2)} + 0.9 * fr2);\n#include <opaque_fragment>`);
  };
  return mat;
}
const M = {
  cortex: boneShader(new THREE.MeshPhysicalMaterial({ vertexColors: true, roughness: 0.58, clearcoat: 0.18, clearcoatRoughness: 0.55, sheen: 0.4, sheenColor: new THREE.Color('#ffe9c8'), sheenRoughness: 0.65, bumpMap: noiseTex, bumpScale: 0.6 })),
  cortexCut: new THREE.MeshStandardMaterial({ vertexColors: true, map: haversTex, roughness: 0.85 }),
  fib: boneShader(new THREE.MeshPhysicalMaterial({ vertexColors: true, roughness: 0.6, sheen: 0.35, sheenColor: new THREE.Color('#ffe9c8'), bumpMap: noiseTex, bumpScale: 0.5 }), undefined, false),
  marrow: new THREE.MeshStandardMaterial({ color: '#c8913f', roughness: 0.7 }),
  marrowCut: new THREE.MeshStandardMaterial({ map: marrowTex, roughness: 0.8, polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 2 }),
  callus: boneShader(new THREE.MeshPhysicalMaterial({ vertexColors: true, roughness: 0.72, clearcoat: 0.08, clearcoatRoughness: 0.6, sheen: 0.2, sheenColor: new THREE.Color('#ffe0c0'), bumpMap: noiseTex2, bumpScale: 0.6, transparent: true }), new THREE.Color('#c86a50'), false),
  callusCut: new THREE.MeshStandardMaterial({ vertexColors: true, map: spongyTex, roughness: 0.8, transparent: true, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -4 }),
  tissue: new THREE.MeshPhysicalMaterial({ color: '#c9566a', roughness: 0.5, clearcoat: 0.4, sheen: 0.5, sheenColor: new THREE.Color('#ffd0d8'), bumpMap: noiseTex2, bumpScale: 1.2, transparent: true }),
  tissueCut: new THREE.MeshStandardMaterial({ map: spongyTex, roughness: 0.8, transparent: true, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -4 }),
  hem: new THREE.MeshPhysicalMaterial({ color: '#5e0a15', roughness: 0.2, clearcoat: 1, clearcoatRoughness: 0.15, sheen: 0.6, sheenColor: new THREE.Color('#ff4060'), emissive: new THREE.Color('#220005'), transparent: true, opacity: 0.9 }),
  hemCut: new THREE.MeshStandardMaterial({ color: '#4a0710', roughness: 0.45, transparent: true, polygonOffset: true, polygonOffsetFactor: -3, polygonOffsetUnits: -6 }),
  peri: new THREE.MeshPhysicalMaterial({ color: '#ffc9cf', roughness: 0.5, transparent: true, opacity: 0.14, depthWrite: false, side: THREE.DoubleSide, sheen: 1, sheenColor: new THREE.Color('#ffd6dc') }),
  metal: new THREE.MeshPhysicalMaterial({ color: '#b9c2cf', metalness: 1, roughness: 0.28, clearcoat: 0.5, clearcoatRoughness: 0.2, transparent: true }),
  metalTi: new THREE.MeshPhysicalMaterial({ color: '#9fb0c4', metalness: 1, roughness: 0.32, clearcoat: 0.4, transparent: true }),
  skin: fresnelShell(new THREE.MeshPhysicalMaterial({ color: '#f0b9a0', roughness: 0.55, transparent: true, opacity: 0.5, depthWrite: false, side: THREE.DoubleSide, sheen: 1, sheenColor: new THREE.Color('#ffd8c8') }), 0.12),
  cast: fresnelShell(new THREE.MeshPhysicalMaterial({ color: '#f4f1ea', roughness: 0.9, transparent: true, opacity: 0.55, depthWrite: false, side: THREE.DoubleSide, bumpMap: noiseTex2, bumpScale: 2 }), 0.18),
  vessel: new THREE.MeshStandardMaterial({ color: '#e0283e', emissive: '#5a0010', roughness: 0.32 }),
  cell: new THREE.MeshBasicMaterial({ toneMapped: false }),
  cone: new THREE.MeshBasicMaterial({ color: '#ffb547', toneMapped: false, transparent: true, opacity: 0.95 }),
  fibrin: new THREE.LineBasicMaterial({ color: '#ffd9a0', transparent: true, opacity: 0.5 })
};
const bone = new THREE.Group(); scene.add(bone);
const mk = (mats, shadow = true) => { const m = new THREE.Mesh(new THREE.BufferGeometry(), mats); m.castShadow = shadow; m.receiveShadow = true; bone.add(m); return m; };
const meshes = {
  tibP: mk([M.cortex, M.cortexCut]), tibD: mk([M.cortex, M.cortexCut]), fib: mk([M.fib, M.cortexCut]),
  marP: mk([M.marrow, M.marrowCut], false), marD: mk([M.marrow, M.marrowCut], false), marF: mk([M.marrow, M.marrowCut], false),
  gap: mk([M.tissue, M.tissueCut]), callus: mk([M.callus, M.callusCut]), endo: mk([M.callus, M.callusCut], false),
  hem: mk([M.hem, M.hemCut]), peri: mk([M.peri, M.peri], false), plate: mk([M.metalTi, M.metalTi]), nail: mk([M.metalTi, M.metalTi]),
  skin: mk([M.skin, M.skin], false), cast: mk([M.cast, M.cast], false)
};
meshes.peri.renderOrder = 5; meshes.skin.renderOrder = 7; meshes.cast.renderOrder = 8;
// screws
const screwGroup = new THREE.Group(); bone.add(screwGroup);
function makeScrew(s, headSide = 1, headR = 0.42) {
  const g = new THREE.Group();
  const shaft = new THREE.Mesh(new THREE.CylinderGeometry(s.r, s.r * 0.55, s.len, 18, 1), M.metal); shaft.castShadow = true; g.add(shaft);
  // thread rings
  const n = Math.floor((s.len - 0.35) / s.pitch);
  const ringG = new THREE.TorusGeometry(s.r * 1.02, s.r * 0.16, 6, 18);
  const rings = new THREE.InstancedMesh(ringG, M.metal, n); const m4 = new THREE.Matrix4(), q = new THREE.Quaternion().setFromEuler(new THREE.Euler(Math.PI / 2, 0, 0));
  for (let i = 0; i < n; i++) { m4.compose(new THREE.Vector3(0, -s.len / 2 + 0.3 + (i + 0.5) * s.pitch, 0), q, new THREE.Vector3(1, 1, 1)); rings.setMatrixAt(i, m4); }
  g.add(rings);
  const head = new THREE.Mesh(new THREE.CylinderGeometry(headR, headR * 0.8, 0.32, 24), M.metal); head.position.y = headSide * (s.len / 2 + 0.12); g.add(head);
  g.position.set(...s.c);
  g.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3(...s.a));
  return g;
}
const lockScrews = new THREE.Group(), plateScrews = new THREE.Group(); screwGroup.add(lockScrews, plateScrews);
E.LOCKS.forEach(s => lockScrews.add(makeScrew(s, 1, 0.36)));
E.PSCREWS.forEach(s => plateScrews.add(makeScrew(s, 1, 0.4)));
// vessels (periosteal / extraosseous, grow by drawRange)
const vessels = [];
for (let i = 0; i < 10; i++) {
  const th = (i / 10) * Math.PI * 2 + 0.3, sgn = i % 2 ? 1 : -1, y0 = sgn * (2.4 + 1.0 * ((i * 37) % 10) / 10);
  const pts = [[0.06, y0], [0.18, y0 * 0.7], [0.15, y0 * 0.38], [0.05, y0 * 0.12], [-0.06, y0 * 0.03]].map(([dr, y], k) => {
    const t = th + k * 0.15 * sgn, r = Rb(y, t) + dr, [cx, cz] = Cb(y);
    return new THREE.Vector3(cx + r * Math.cos(t), y, cz + r * Math.sin(t));
  });
  const m = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 60, 0.035, 7, false), M.vessel); m.userData.th = th; bone.add(m); vessels.push(m);
}
// cells
const CELL_N = 120, CT = CELLS.map(c => c.id);
const cellMesh = new THREE.InstancedMesh(new THREE.IcosahedronGeometry(0.07, 1), M.cell, CELL_N * CT.length); bone.add(cellMesh); cellMesh.frustumCulled = false;
const cellData = [];
for (let t = 0; t < CT.length; t++) for (let i = 0; i < CELL_N; i++) cellData.push({ t, rank: E.rnd(), uy: E.rnd() * 2 - 1, ur: E.rnd(), uth: E.rnd(), ph: E.rnd() * 6.28, p: new THREE.Vector3(), s: 0 });
const cellCol = CELLS.map(c => new THREE.Color(c.col));
const CONE_N = 56;
const coneMesh = new THREE.InstancedMesh(new THREE.CapsuleGeometry(0.028, 0.34, 4, 8), M.cone, CONE_N); bone.add(coneMesh);
const coneData = Array.from({ length: CONE_N }, () => ({ rank: E.rnd(), uy: E.rnd() * 2 - 1, ur: E.rnd(), uth: E.rnd() }));
const FIB_N = 260; const fibData = Array.from({ length: FIB_N }, () => [E.rnd() * 2 - 1, E.rnd(), E.rnd(), E.rnd() * 0.4 - 0.2, E.rnd() * 0.3, E.rnd() * 0.5]);
const fibGeo = new THREE.BufferGeometry(); fibGeo.setAttribute('position', new THREE.Float32BufferAttribute(new Float32Array(FIB_N * 6), 3));
const fibrin = new THREE.LineSegments(fibGeo, M.fibrin); bone.add(fibrin);
// ---------- v0.3: layered real anatomy + standard views ----------
let frameBox = null;
function setSoft(on, op) { st.soft = on; M.skin.opacity = op; M.skin.transparent = op < 0.9; M.skin.depthWrite = op >= 0.9; M.skin.needsUpdate = true; document.querySelectorAll('.tg').forEach(e => e.classList.toggle('on', !!st[e.dataset.k])); dirtyGeo = true; needRender = true; }
function setXrView(v) { st.view = v; document.querySelectorAll('#xrSw button').forEach(x => x.classList.toggle('on', x.dataset.v === v)); dirtyXr = true; }
function bodyMode(m) { [...document.body.classList].filter(c => c.startsWith('m-')).forEach(c => document.body.classList.remove(c)); document.body.classList.add('m-' + m); }
L.init({ THREE, scene, camera, controls, renderer, bone, st, meshes, M, E, refHTML, setSoft, setXrView, getS: () => S,
  getFrameD: () => frameD, frame: () => frameBox, requestRender: () => { needRender = true; }, relayout: () => requestAnimationFrame(layout),
  stopTour: () => stopTour(), gotoCompartment: () => { setMode('clinical'); st.clinTab = CLINICAL[st.lang].findIndex(c => c.cs); renderCard(); } });
st.anat = L.panelOn();

// ================= geometry =================
const thRange = () => (st.cut ? [Math.PI, Math.PI * 2] : [0, Math.PI * 2]);
const visTh = u => { const [a, b] = thRange(); return a + (b - a) * u; };
const P = (y, th, r, ctr = Cb) => { const [cx, cz] = ctr(y); return [cx + r * Math.cos(th), y, cz + r * Math.sin(th)]; };
const set = (m, geo) => { m.geometry.dispose(); m.geometry = geo; };
const boneCol = (y, th) => { const v = 0.93 + 0.1 * E.fbm(Math.cos(th) * 2 + 5, y * 0.35, Math.sin(th) * 2) - 0.05 * E.vnoise(th * 5, y * 2.5, 1); const c = PAL.cortex; return [c.r * v, c.g * v, c.b * v * 0.98]; };
function buildStatic() { // tibia fragments, fibula, marrow, skin, cast, implants — rebuilt only on section / fixation change
  const [th0, th1] = thRange(), nth = st.cut ? 72 : 132;
  const g = S.gap; U.gap.value = g / 2;
  const jg = th => E.jag(th);
  set(meshes.tibP, E.buildSolid({ ys: E.rows(g / 2, E.Y_TOP, 84, 'start', 2.0), center: Cb, rin: Rc, rout: Rb, th0, th1, nth, nr: 4, jagStart: jg, uvU: 5, uvV: 0.35, color: boneCol }));
  set(meshes.tibD, E.buildSolid({ ys: E.rows(E.Y_BOT, -g / 2, 84, 'end', 2.0), center: Cb, rin: Rc, rout: Rb, th0, th1, nth, nr: 4, jagEnd: jg, uvU: 5, uvV: 0.35, color: boneCol }));
  set(meshes.fib, E.buildSolid({ ys: E.rows(E.FIB_Y0, E.FIB_Y1, 70, 'ends'), center: E.Cf, rin: E.Rfc, rout: E.Rf, th0, th1, nth: st.cut ? 28 : 48, nr: 2, uvU: 2, uvV: 0.35, color: boneCol }));
  meshes.marP.visible = meshes.marD.visible = meshes.marF.visible = st.cut;
  if (st.cut) {
    const mr = (y, th) => Rc(y, th) * 0.996;
    set(meshes.marP, E.buildSolid({ ys: E.rows(g / 2 + 0.03, E.Y_TOP - 0.05, 40, 'start', 1.6), center: Cb, rout: mr, th0, th1, nth: 48, nr: 3, cutV: 0.5 }));
    set(meshes.marD, E.buildSolid({ ys: E.rows(E.Y_BOT + 0.05, -g / 2 - 0.03, 40, 'end', 1.6), center: Cb, rout: mr, th0, th1, nth: 48, nr: 3, cutV: 0.5 }));
    set(meshes.marF, E.buildSolid({ ys: E.rows(E.FIB_Y0 + 0.4, E.FIB_Y1 - 0.4, 30), center: E.Cf, rout: (y, th) => E.Rfc(y, th) * 0.99, th0, th1, nth: 24, nr: 2, cutV: 0.25 }));
  }
  set(meshes.skin, E.buildSolid({ ys: E.rows(E.SKIN_Y0, E.SKIN_Y1, 60), center: E.Cs, rout: (y, th) => E.Rs(y, th) + 0.5 * (S.swell || 0) * Math.exp(-y * y / 30), th0: 0, th1: Math.PI * 2, nth: 96, nr: 1, capStart: false, capEnd: false, cutFaces: false }));
  meshes.cast.visible = st.fix === 'cast';
  if (meshes.cast.visible) set(meshes.cast, E.buildSolid({ ys: E.rows(-14.5, E.SKIN_Y1, 50), center: E.Cs, rin: (y, th) => E.Rs(y, th) + 0.45, rout: (y, th) => E.Rs(y, th) + 1.0, th0: 0, th1: Math.PI * 2, nth: 96, nr: 2 }));
  // nail (full, semi-transparent in section)
  meshes.nail.visible = lockScrews.visible = st.fix === 'nail';
  if (meshes.nail.visible) {
    const tipR = y => E.NAIL.r * Math.sqrt(clamp((y - E.NAIL.y0) / 0.5 + 0.08));
    set(meshes.nail, E.buildSolid({ ys: E.rows(E.NAIL.y0, E.NAIL.y1, 90, 'start', 1.4), center: E.nailCenter, rout: y => tipR(y), rin: y => E.NAIL.rin * Math.min(1, tipR(y) / E.NAIL.r), nth: 40, nr: 2 }));
  }
  meshes.plate.visible = plateScrews.visible = st.fix === 'plate';
  if (meshes.plate.visible) {
    const pa = y => E.plateArc(y) / 2, tp = y => Math.min(1, (E.PLATE.y1 - Math.abs(y)) / 0.6) * 0.9 + 0.1;
    set(meshes.plate, E.buildSolid({ ys: E.rows(E.PLATE.y0, E.PLATE.y1, 60), center: Cb, rin: (y, th) => Rb(y, th) + 0.02, rout: (y, th) => Rb(y, th) + 0.02 + E.PLATE.t * tp(y), th0: E.PLATE.th - pa(0), th1: E.PLATE.th + pa(0), nth: 16, nr: 2 }));
  }
  const semi = st.cut ? 0.32 : 1;
  [M.metal, M.metalTi].forEach((m, i) => { m.opacity = st.cut ? 0.62 : 1; m.depthWrite = !st.cut; m.metalness = st.cut ? 0.0 : 1; m.roughness = st.cut ? 0.35 : 0.28; m.color.set(st.cut ? '#86a6c8' : (i ? '#9fb0c4' : '#b9c2cf')); m.emissive = new THREE.Color(st.cut ? '#1d3550' : '#000000'); });
  meshes.nail.renderOrder = plateScrews.renderOrder = st.cut ? 9 : 0;
  dirtyXr = true;
}
const tmpC = new THREE.Color();
function rebuild() {
  const g = S.gap, [th0, th1] = thRange(), nth = st.cut ? 72 : 132;
  U.nec.value = S.N * 0.85;
  // skin swelling follows time
  if (st.soft) set(meshes.skin, E.buildSolid({ ys: E.rows(E.SKIN_Y0, E.SKIN_Y1, 60), center: E.Cs, rout: (y, th) => E.Rs(y, th) + 0.5 * (S.swell || 0) * Math.exp(-y * y / 30), th0: 0, th1: Math.PI * 2, nth: 96, nr: 1, capStart: false, capEnd: false, cutFaces: false }));
  meshes.skin.visible = st.soft;
  // gap tissue (cortex ring between the fragment ends)
  const gapVis = S.primary ? S.lineVis > 0.04 : S.Lm < 0.995;
  meshes.gap.visible = gapVis;
  if (gapVis) set(meshes.gap, E.buildSolid({ ys: E.rows(-g / 2 - E.JAG - 0.03, g / 2 + E.JAG + 0.03, 6), center: Cb, rin: (y, th) => Rc(y, th) * 0.985, rout: (y, th) => Rb(y, th) * 0.992, th0, th1, nth, nr: 3, cutU: 2, cutV: 2 }));
  const wts = S.tw; tmpC.setRGB(0, 0, 0);
  [PAL.hem, PAL.gran, PAL.cart, PAL.woven, PAL.lamellar].forEach((c, i) => { tmpC.r += c.r * wts[i]; tmpC.g += c.g * wts[i]; tmpC.b += c.b * wts[i]; });
  if (S.primary) tmpC.lerp(PAL.lamellar, S.fill);
  M.tissue.color.copy(tmpC); M.tissueCut.color.copy(tmpC).multiplyScalar(1.05);
  // external callus — one shell whose surface rises out of the cortex (no seam): thickness→0 hides it inside the bone; colour→cortex at thin edges
  const hasCal = !S.primary && (S.A || 0) > 0.004;
  meshes.callus.visible = hasCal;
  if (hasCal) {
    const w = S.w, yA = -w * 0.95, yB = w * 1.08;
    const col = (y, th, r, part) => {
      const t = E.callusT(S, y, th), rb = Rb(y, th);
      const yy = y / (y > 0 ? yB : -yA), rho = clamp((r - rb) / (t + 1e-4));
      E.callusColor(S, yy, part === 3 ? rho : 1, tmpC);
      const nn = 0.86 + 0.28 * E.fbm(Math.cos(th) * 7 + 2, y * 6, Math.sin(th) * 7); const vasc = 0.12 * S.W * (1 - S.Lm);
      tmpC.r *= nn + vasc * 0.6; tmpC.g *= nn - vasc * 0.3; tmpC.b *= nn - vasc * 0.4;
      const k = ss(0.004, 0.11, t);
      const bc = boneCol(y, th);
      return [lerp(bc[0], tmpC.r, k), lerp(bc[1], tmpC.g, k), lerp(bc[2], tmpC.b, k)];
    };
    set(meshes.callus, E.buildSolid({ ys: E.rows(yA, yB, 64, 'mid', 1.25), center: Cb, rin: (y, th) => Rb(y, th) - 0.03, rout: (y, th) => Rb(y, th) - 0.006 + E.callusT(S, y, th), th0, th1, nth, nr: 4, uvU: 6, uvV: 1.2, cutU: 1.5, cutV: 1, color: col }));
  }
  M.callus.roughness = lerp(0.45, 0.75, clamp(S.W + S.Lm)); M.callus.clearcoat = 0.05 + 0.35 * S.C;
  // endosteal callus (visible in section; with the nail it sits around the nail)
  const ef0 = E.endoFill(S, 0);
  meshes.endo.visible = st.cut && !S.primary && ef0 > 0.02;
  if (meshes.endo.visible) {
    const we = 1.2 + 2.0 * S.E;
    const inner = st.fix === 'nail' ? (y, th) => Math.min(Rc(y, th) * 0.9, E.NAIL.r + 0.02) : () => 0;
    set(meshes.endo, E.buildSolid({ ys: E.rows(-we, we, 22), center: Cb, rin: st.fix === 'nail' ? inner : undefined, noInner: st.fix !== 'nail', rout: (y, th) => { const f = clamp(E.endoFill(S, y) * 1.3); const i = st.fix === 'nail' ? inner(y, th) : 0; return lerp(Rc(y, th) * 0.999, i + 0.002, 1 - f) ; }, th0, th1, nth: 48, nr: 3, cutU: 2, cutV: 1.5,
      color: (y) => { E.callusColor(S, y / we, 0.5, tmpC); return [tmpC.r, tmpC.g, tmpC.b]; } }));
  }
  // hematoma
  meshes.hem.visible = S.H > 0.02;
  if (meshes.hem.visible) { const hw = S.primary ? 2.2 : 3.0; set(meshes.hem, E.buildSolid({ ys: E.rows(-hw, hw, 40), center: Cb, rin: (y, th) => Rb(y, th) - 0.03, rout: (y, th) => Rb(y, th) - 0.006 + E.hemT(S, y, th), th0, th1, nth, nr: 3 })); }
  M.hem.opacity = clamp(S.H * 1.6) * 0.82 * (st.cells ? 0.35 : 1); M.hem.depthWrite = !st.cells && S.H > 0.4; M.hemCut.opacity = clamp(S.H * 1.6) * (st.cells ? 0.4 : 1);
  const see = st.cells ? 0.35 : 1;
  M.callus.opacity = see; M.callus.depthWrite = see > 0.99; M.callusCut.opacity = st.cells ? 0.5 : 1; M.callusCut.depthWrite = !st.cells;
  M.tissue.opacity = see; M.tissue.depthWrite = see > 0.99;
  // periosteum (local zone)
  meshes.peri.visible = st.peri;
  if (st.peri) {
    const po = (y, th) => Math.max(Rb(y, th) + 0.04, Rb(y, th) + E.callusT(S, y, th) + 0.03, Rb(y, th) + 0.75 * E.hemT(S, y, th) + 0.03);
    set(meshes.peri, E.buildSolid({ ys: E.rows(-9, 9, 110, 'mid', 1.6), center: Cb, rin: (y, th) => po(y, th) - 0.015, rout: po, th0, th1, nth, nr: 1, capStart: false, capEnd: false }));
  }
  // vessels
  const vg = S.primary ? 0.25 * ss(10, 40, S.e) * (1 - ss(150, 420, S.e)) : ss(4, 20, S.e) * (1 - ss(150, 420, S.e));
  vessels.forEach(v => {
    const th = ((v.userData.th % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
    v.visible = st.vessels && (st.cut || st.cells) && vg > 0.01 && (!st.cut || th >= Math.PI);
    const n = v.geometry.index.count; v.geometry.setDrawRange(0, Math.floor(n * vg / 6) * 6);
  });
  placeCells();
  if (L.state.slice) L.updateBoneCaps();
  dirtyXr = true;
}
const _m = new THREE.Matrix4(), _q = new THREE.Quaternion(), _s = new THREE.Vector3(), _p = new THREE.Vector3();
function placeCells() {
  const g = S.gap, w = S.w || 2;
  const outR = (y, th) => Rb(y, th) + Math.max(E.callusT(S, y, th), E.hemT(S, y, th), 0.08);
  cellData.forEach(c => {
    const id = CT[c.t], f = S.cells[id] || 0;
    c.s = st.cells && c.rank < f ? 1 : 0; if (!c.s) return;
    const th = visTh(c.uth); let y, r;
    if (id === 'neu' || id === 'mac') { if (c.ur < 0.18) { y = c.uy * g * 0.5; r = Rc(0, th) * c.ur / 0.18 * 1.5; } else { y = c.uy * 1.8; r = lerp(Rb(y, th) + 0.03, outR(y, th), (c.ur - 0.18) / 0.82); } }
    else if (id === 'msc') { y = c.uy * (w + 0.6); r = c.ur < 0.25 ? Rc(y, th) * (0.5 + c.ur * 2) : outR(y, th) - 0.03 - 0.15 * c.ur; }
    else if (id === 'chd') { y = c.uy * w * 0.6; r = lerp(Rb(y, th), outR(y, th), 0.25 + 0.55 * c.ur); if (Math.abs(y) < g) r = lerp(Rc(y, th), Rb(y, th), c.ur); }
    else if (id === 'obl') { y = c.uy * w * 0.95; r = (S.A || 0) > 0.03 ? lerp(Rb(y, th), outR(y, th), 0.55 + 0.4 * c.ur) : Rb(y, th) + 0.04; }
    else { if (S.e < 70 || S.primary) { y = Math.sign(c.uy || 1) * (g / 2 + 0.06 + 0.35 * Math.abs(c.uy)); r = lerp(Rc(y, th), Rb(y, th), c.ur); } else { y = c.uy * w * 0.8; r = outR(y, th) + 0.01; } }
    c.p.set(...P(y, th, r));
  });
  const cn = S.cones || 0;
  coneMesh.visible = st.cut && cn > 0.02;
  coneData.forEach((c, i) => {
    const on = c.rank < cn, th = c.ur > 0.5 ? Math.PI + 0.04 : Math.PI * 2 - 0.04;
    const y = E.jag(th) + c.uy * 0.6, r = lerp(Rc(y, th) + 0.06, Rb(y, th) - 0.06, c.uth);
    const p = P(y, th, r); _p.set(p[0], p[1], 0.035 + Cb(y)[1]);
    _s.setScalar(on ? 1 : 0); _m.compose(_p, _q.identity(), _s); coneMesh.setMatrixAt(i, _m);
  });
  coneMesh.instanceMatrix.needsUpdate = true;
  fibrin.visible = st.cells && S.H > 0.05; M.fibrin.opacity = 0.55 * S.H;
  if (fibrin.visible) {
    const a = fibGeo.attributes.position.array;
    fibData.forEach((f, i) => {
      const th = visTh(f[1]), y = f[0] * 1.5, r = lerp(Rb(y, th), Rb(y, th) + E.hemT(S, y, th), f[2] * 0.9);
      const p1 = P(y, th, r), p2 = P(y + f[4] - 0.15, th + f[3], r + f[5] * 0.3 - 0.1);
      a.set([...p1, ...p2], i * 6);
    });
    fibGeo.attributes.position.needsUpdate = true;
  }
}
function animateCells(t) {
  if (!st.cells) { cellMesh.visible = false; return; }
  cellMesh.visible = true;
  cellData.forEach((c, i) => {
    const hl = st.hl ? (CT[c.t] === st.hl ? 1.35 : 0.55) : 1, big = CT[c.t] === 'ocl' ? 1.9 : CT[c.t] === 'chd' ? 1.25 : 1, wob = 0.035;
    _p.set(c.p.x + Math.sin(t * 1.3 + c.ph) * wob, c.p.y + Math.cos(t * 1.1 + c.ph) * wob, c.p.z + Math.sin(t * 0.9 + c.ph * 2) * wob);
    _s.setScalar(c.s * big * hl); _m.compose(_p, _q.identity(), _s); cellMesh.setMatrixAt(i, _m);
    const col = cellCol[c.t].clone(); if (st.hl && CT[c.t] !== st.hl) col.multiplyScalar(0.25); else col.multiplyScalar(1.25);
    cellMesh.setColorAt(i, col);
  });
  cellMesh.instanceMatrix.needsUpdate = true; if (cellMesh.instanceColor) cellMesh.instanceColor.needsUpdate = true;
}

// ================= layout =================
let horiz = true, frameD = 40;
function layout() {
  const W = innerWidth, H = innerHeight;
  renderer.setSize(W, H); camera.aspect = W / H;
  const mob = W < 900;
  const card = $('#card').getBoundingClientRect(), left = $('#left').getBoundingClientRect(), chips = $('#chips').getBoundingClientRect(), top = $('#top').getBoundingClientRect();
  let x0, x1, y0, y1;
  const anatR = $('#anat') && document.body.classList.contains('anat-on') ? $('#anat').getBoundingClientRect() : null;
  if (mob) { const xr = $('#xr').getBoundingClientRect(); x0 = (anatR ? 6 : xr.right + 4); x1 = W - 6; y0 = $('#segs').getBoundingClientRect().bottom + 4; y1 = (anatR ? anatR.top : card.top) - 6; }
  else { const lr = anatR && !document.body.classList.contains('m-imaging') ? Math.max(left.right, anatR.right) : left.right; x0 = lr + 12; x1 = card.left - 12; y0 = Math.max(top.bottom, ($('#viewbar')?.getBoundingClientRect().bottom || 0)) + 4; y1 = Math.min(chips.top, $('#strip').getBoundingClientRect().top) - 8; }
  frameBox = { x0, x1, y0, y1 };
  const fw = Math.max(80, x1 - x0), fh = Math.max(80, y1 - y0);
  horiz = false; // v0.3: anatomical (vertical) orientation always, so standard views are true anatomical views
  bone.rotation.set(0, 0, 0); bone.updateMatrixWorld();
  const LONG = mob ? 43 : 47, SHORT = 18;
  const ex = horiz ? LONG : SHORT, ey = horiz ? SHORT : LONG;
  const tan = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * 2;
  frameD = Math.max(ex / (tan * camera.aspect * fw / W), ey / (tan * fh / H)) * (mob ? 1.04 : 1);
  const dir = camera.position.clone().sub(controls.target).normalize(); if (!isFinite(dir.x) || dir.length() < 0.5) dir.set(-0.33, 0.22, 0.92).normalize();
  const curD = camera.position.distanceTo(controls.target), zoomed = controls.target.length() > 0.05;
  camera.position.copy(controls.target).addScaledVector(dir, zoomed ? Math.min(curD, frameD) : frameD);
  controls.minDistance = frameD * 0.3; controls.maxDistance = frameD * 3.2;
  camera.setViewOffset(W, H, W / 2 - (x0 + x1) / 2, H / 2 - (y0 + y1) / 2, W, H);
  camera.updateProjectionMatrix();
  const big = true; const fy = horiz ? -(big ? 7.5 : 4.8) : -23.5;
  floor.position.y = fy; glow.position.y = fy + 0.01; glow.scale.set(horiz ? 46 : 22, horiz ? 22 : 22, 1);
  key.shadow.camera.updateProjectionMatrix();
  sizeTimeline(); drawTimeline(); needRender = true;
}

// ================= labels =================
const labelDefs = [
  { k: 'callus', pos: () => { const th = E.TH_POSTLAT + 0.5, y = 0.6; return P(y, th, Rb(y, th) + E.callusT(S, y, th) + 0.02); }, show: () => (S.A || 0) > 0.12 },
  { k: 'hema', pos: () => { const th = 2.2, y = -0.5; return P(y, th, Rb(y, th) + E.hemT(S, y, th)); }, show: () => S.H > 0.35 && !st.soft },
  { k: 'peri', pos: () => P(5, 2.4, Rb(5, 2.4) + 0.05), show: () => st.peri },
  { k: 'canal', pos: () => { const [x, z] = Cb(-4.5); return [x - 0.25, -4.5, z]; }, show: () => st.cut },
  { k: 'endo', pos: () => { const [x, z] = Cb(0.9); return [x + 0.55, 0.9, z]; }, show: () => st.cut && !S.primary && E.endoFill(S, 0) > 0.25 },
  { k: 'line', pos: () => P(E.jag(0.9), 0.9, Rb(0, 0.9) + 0.02), show: () => S.lineVis > 0.45 && (S.A || 0) < 0.15 && S.H < 0.5 && !(S.N > 0.5) },
  { k: 'necro', pos: () => P(-S.gap / 2 - 0.3, 1.0, Rb(-0.3, 1.0)), show: () => S.N > 0.5 && S.H < 0.6 && ((S.A || 0) < 0.15 || st.cut) && !(st.cut && (S.cones || 0) > 0.3) },
  { k: 'nail', pos: () => { const [x, z] = E.nailCenter(6); return [x, 6, z + (st.cut ? 0 : 0)]; }, show: () => st.fix === 'nail' && st.cut },
  { k: 'lock', pos: () => { const s = E.LOCKS[2]; return [s.c[0] + s.a[0] * s.len / 2, s.y, s.c[2]]; }, show: () => st.fix === 'nail' && !horizNarrow() },
  { k: 'plate', pos: () => P(-3.6, E.PLATE.th, Rb(-3.6, E.PLATE.th) + E.PLATE.t + 0.02), show: () => st.fix === 'plate' },
  { k: 'cone', pos: () => { const p = P(0.3, Math.PI * 1.98, (Rc(0.3, Math.PI * 1.98) + Rb(0.3, Math.PI * 1.98)) / 2); return [p[0], p[1], Cb(0.3)[1]]; }, show: () => st.cut && (S.cones || 0) > 0.3 },
  { k: 'fib', pos: () => { const [x, z] = E.Cf(-5); return [x - E.Rf(-5, Math.PI), -5, z]; }, show: () => !st.cut && !st.soft && st.fix !== 'cast' },
  { k: 'cast', pos: () => P(-6, 2.0, E.Rs(-6, 2.0) + 1.0, E.Cs), show: () => st.fix === 'cast' }
];
const horizNarrow = () => innerWidth < 900;
const labEls = {};
function buildLabels() { const host = $('#labels'); host.innerHTML = ''; labelDefs.forEach(d => { const el = document.createElement('div'); el.className = 'lab'; el.innerHTML = `<i></i><em></em><span>${T().labels[d.k]}</span>`; host.appendChild(el); labEls[d.k] = el; }); }
const _v = new THREE.Vector3();
function updateLabels() {
  const W = innerWidth, H = innerHeight;
  labelDefs.forEach(d => {
    const el = labEls[d.k]; if (!el) return;
    if (!(st.labels && d.show()) || L.state.slice) { el.style.opacity = 0; return; }
    _v.set(...d.pos()).applyMatrix4(bone.matrixWorld).project(camera);
    if (_v.z > 1 || Math.abs(_v.x) > 1.05 || Math.abs(_v.y) > 1.05) { el.style.opacity = 0; return; }
    el.style.left = (_v.x * 0.5 + 0.5) * W + 'px'; el.style.top = (-_v.y * 0.5 + 0.5) * H + 'px'; el.style.opacity = 1;
  });
}

// ================= X-ray (DRR) =================
const xrc = $('#xrc'), xctx = xrc.getContext('2d', { willReadFrequently: true });
function xrWin(view, half = 7.2) { const [cx, cz] = Cb(0); const c = view === 'lat' ? cz - 0.4 : cx + 0.1; return { u0: c - half, u1: c + half, y0: -half, y1: half }; }
function drawXray() {
  E.renderDRR(xctx, xrc.width, xrc.height, S, st.view, xrWin(st.view), { frame: 1 });
  const s = xrc.width;
  xctx.font = `600 ${Math.round(s * 0.05)}px ui-monospace,Menlo,monospace`; xctx.fillStyle = 'rgba(255,255,255,.85)';
  xctx.fillText(st.view === 'lat' ? 'LAT' : 'AP', s * 0.2, s * 0.24); xctx.fillText(st.view === 'lat' ? 'A' : 'R', s * 0.74, s * 0.24);
  if ($('#xfull').classList.contains('on')) drawFull();
}
function drawFull() {
  for (const v of ['ap', 'lat']) {
    const c = document.getElementById('xf-' + v), ctx = c.getContext('2d', { willReadFrequently: true });
    const [cx, cz] = Cb(0), H = 42, Wc = H * c.width / c.height, ctr = v === 'lat' ? cz - 1.0 : cx - 1.2;
    E.renderDRR(ctx, c.width, c.height, S, v, { u0: ctr - Wc / 2, u1: ctr + Wc / 2, y0: -21, y1: 21 }, { frame: 2 });
    ctx.font = '600 15px ui-monospace,Menlo,monospace'; ctx.fillStyle = 'rgba(255,255,255,.88)';
    ctx.fillText(v === 'lat' ? 'LAT' : 'AP', 10, 22); ctx.fillText(v === 'lat' ? 'A →' : 'R', c.width - (v === 'lat' ? 44 : 22), 22);
    const dl = dayLabel(S.d); ctx.font = '600 12px ui-monospace,Menlo,monospace'; ctx.fillText(dl.n, 10, c.height - 12);
  }
}

// ================= timeline =================
const tlc = $('#tlc'), tctx = tlc.getContext('2d');
let tlW = 0, tlH = 0, curveCache = null, curveKey = '';
function sizeTimeline() { const r = $('#tl').getBoundingClientRect(), dpr = Math.min(devicePixelRatio || 1, 2); tlW = r.width; tlH = r.height; tlc.width = Math.max(1, r.width * dpr); tlc.height = Math.max(1, r.height * dpr); tctx.setTransform(dpr, 0, 0, dpr, 0, 0); }
const PADL = 14, PADR = 18;
const ux = u => PADL + u * (tlW - PADL - PADR);
const effK = () => (st.course === 'delayed' ? 1 / 0.6 : 1);
function curves() {
  const k = st.fix + st.course + (st.mode === 'cells');
  if (k === curveKey) return curveCache;
  curveKey = k; const N = 240, out = [];
  for (let i = 0; i <= N; i++) { const u = i / N; out.push([u, E.healState(E.uToDay(u), st.fix, st.course)]); }
  return (curveCache = out);
}
function drawTimeline() {
  if (!tlW) return;
  const c = tctx, W = tlW, H = tlH, mob = innerWidth < 900;
  c.clearRect(0, 0, W, H);
  const bandY = 7, bandH = mob ? 15 : 17, axisY = H - (mob ? 15 : 18), cTop = bandY + bandH + 6, cBot = axisY - 4;
  const k = effK();
  STAGES[route()].forEach(s => {
    if (st.course === 'atrophic' && s.id !== 'hem' && s.id !== 'soft') return;
    const x0 = ux(E.dayToU(s.d0 * k)), x1 = ux(E.dayToU(Math.min(s.d1 * k, 730)));
    c.fillStyle = s.col + '2e'; c.strokeStyle = s.col + '88'; c.lineWidth = 1;
    c.beginPath(); c.roundRect(x0 + 1, bandY, Math.max(2, x1 - x0 - 2), bandH, 5); c.fill(); c.stroke();
    c.save(); c.beginPath(); c.rect(x0 + 2, bandY, x1 - x0 - 4, bandH); c.clip();
    c.fillStyle = '#e8eefc'; c.font = `700 ${mob ? 9.5 : 11}px ${getComputedStyle(document.body).fontFamily}`; c.textBaseline = 'middle';
    c.fillText(s[st.lang], x0 + 7, bandY + bandH / 2 + 0.5); c.restore();
  });
  if (st.course === 'atrophic') { const x0 = ux(E.dayToU(21)); c.fillStyle = 'rgba(255,93,143,.16)'; c.strokeStyle = 'rgba(255,93,143,.6)'; c.beginPath(); c.roundRect(x0 + 1, bandY, ux(1) - x0 - 2, bandH, 5); c.fill(); c.stroke(); c.fillStyle = '#ffc2d6'; c.font = `700 ${mob ? 9.5 : 11}px sans-serif`; c.textBaseline = 'middle'; c.fillText(st.lang === 'zh' ? '修复停滞 · 少骨痂' : 'Repair stalls · scant callus', x0 + 7, bandY + bandH / 2); }
  const data = curves();
  const series = st.mode === 'cells' ? SIGNALS.map(s => ({ col: s.col, f: S2 => S2.sig[s.id] }))
    : S.primary ? [{ col: '#ff5d6c', f: S2 => S2.H }, { col: '#ffb547', f: S2 => S2.cones }, { col: '#7dffb2', f: S2 => S2.fill }]
      : [{ col: '#ff5d6c', f: S2 => S2.H }, { col: '#c9566a', f: S2 => S2.G * 0.9 }, { col: '#9cc7ff', f: S2 => S2.C }, { col: '#ffb547', f: S2 => S2.W * S2.M }, { col: '#7dffb2', f: S2 => S2.Lm }];
  series.forEach(s => {
    c.beginPath(); data.forEach(([u, S2], i) => { const x = ux(u), y = cBot - s.f(S2) * (cBot - cTop); i ? c.lineTo(x, y) : c.moveTo(x, y); });
    c.strokeStyle = s.col; c.lineWidth = 1.6; c.globalAlpha = 0.9; c.stroke();
    c.lineTo(ux(1), cBot); c.lineTo(ux(0), cBot); c.closePath(); c.globalAlpha = 0.07; c.fillStyle = s.col; c.fill(); c.globalAlpha = 1;
  });
  if (st.mode !== 'cells' && !S.primary) { c.setLineDash([4, 4]); c.beginPath(); data.forEach(([u, S2], i) => { const x = ux(u), y = cBot - (S2.A / 0.72) * (cBot - cTop); i ? c.lineTo(x, y) : c.moveTo(x, y); }); c.strokeStyle = '#5ee7ff'; c.lineWidth = 1.3; c.stroke(); c.setLineDash([]); }
  // AO events (x-ray reviews as small film icons, others as ticks)
  EVENTS.filter(e => e.fx.includes(st.fix)).forEach(e => {
    const x = ux(E.dayToU(e.d));
    if (e.xr) { c.fillStyle = 'rgba(94,231,255,.9)'; c.fillRect(x - 3.5, cTop - 1, 7, 9); c.fillStyle = '#04122a'; c.fillRect(x - 1.5, cTop + 1, 3, 5); }
    else { c.fillStyle = e.warn ? 'rgba(255,93,143,.85)' : 'rgba(255,181,71,.85)'; c.beginPath(); c.moveTo(x, cTop - 1); c.lineTo(x + 3.5, cTop + 3.5); c.lineTo(x, cTop + 8); c.lineTo(x - 3.5, cTop + 3.5); c.closePath(); c.fill(); }
  });
  c.strokeStyle = 'rgba(140,180,255,.25)'; c.beginPath(); c.moveTo(ux(0), axisY); c.lineTo(ux(1), axisY); c.stroke();
  c.font = `600 ${mob ? 9 : 10}px ui-monospace,Menlo,monospace`; c.textBaseline = 'top'; c.textAlign = 'center';
  KEYS.forEach(kk => { if (mob && ['D3', 'W2', 'M9'].includes(kk.id)) return; const x = ux(E.dayToU(kk.d)); c.fillStyle = 'rgba(140,180,255,.5)'; c.fillRect(x, axisY - 3, 1, 6); c.fillStyle = '#8d9bbd'; c.fillText(kk.id, Math.max(10, x), axisY + 3); });
  c.textAlign = 'left';
  const px = ux(st.u);
  const grd = c.createLinearGradient(px - 14, 0, px + 14, 0); grd.addColorStop(0, 'rgba(94,231,255,0)'); grd.addColorStop(0.5, 'rgba(94,231,255,.22)'); grd.addColorStop(1, 'rgba(94,231,255,0)');
  c.fillStyle = grd; c.fillRect(px - 14, bandY, 28, axisY - bandY);
  c.fillStyle = '#5ee7ff'; c.fillRect(px - 1, bandY - 2, 2, axisY - bandY + 4);
  c.beginPath(); c.arc(px, axisY, 5.5, 0, 7); c.fillStyle = '#fff'; c.fill(); c.lineWidth = 2; c.strokeStyle = '#5ee7ff'; c.stroke();
}

// ================= text helpers =================
function dayLabel(d) {
  if (st.lang === 'zh') {
    if (d < 1) return { n: 'D0', s: '伤后/术后即刻' };
    if (d < 21) return { n: `${Math.round(d)} 天`, s: `第 ${(d / 7).toFixed(1)} 周` };
    if (d < 140) return { n: `${(d / 7).toFixed(1)} 周`, s: `第 ${Math.round(d)} 天` };
    if (d < 365) return { n: `${(d / 30.4).toFixed(1)} 月`, s: `第 ${Math.round(d)} 天` };
    return { n: `${(d / 365).toFixed(2)} 年`, s: `第 ${Math.round(d)} 天` };
  }
  if (d < 1) return { n: 'D0', s: 'injury / surgery' };
  if (d < 21) return { n: `D${Math.round(d)}`, s: `week ${(d / 7).toFixed(1)}` };
  if (d < 140) return { n: `${(d / 7).toFixed(1)} wk`, s: `day ${Math.round(d)}` };
  if (d < 365) return { n: `${(d / 30.4).toFixed(1)} mo`, s: `day ${Math.round(d)}` };
  return { n: `${(d / 365).toFixed(2)} yr`, s: `day ${Math.round(d)}` };
}
const curKey = () => { let k = KEYS[0]; for (const x of KEYS) if (S.d >= x.d * (S.primary ? 1 : 1) - 0.01) k = x; return k; };

// ================= UI build =================
function buildUI() {
  const t = T();
  document.documentElement.lang = st.lang === 'zh' ? 'zh-CN' : 'en';
  $('#brandLink').textContent = t.brand; $('#ttl').textContent = t.title; $('#sub').textContent = t.sub;
  $('#tourBtn').textContent = st.tour ? t.tourStop : t.tour; $('#srcBtn').textContent = t.src; $('#langBtn').textContent = t.lang;
  $('#xrHd').textContent = t.xray; $('#disc').textContent = t.disc; $('#loadTxt').textContent = t.loading; $('#xfH').textContent = t.fullH; $('#xfX').textContent = t.close;
  $('#tabs').innerHTML = MODES.map((m, i) => `<button class="tab${st.mode === m ? ' on' : ''}" data-m="${m}"><b>${i + 1}</b>${t.tabs[i]}</button>`).join('');
  const tg = ['anat', 'cut', 'soft', 'cells', 'vessels', 'peri', 'labels'];
  $('#toggles').innerHTML = tg.map(k => `<div class="tg${st[k] ? ' on' : ''}" data-k="${k}"><i></i>${k === 'anat' ? ANAT[st.lang].panel : t.tg[k]}</div>`).join('');
  $('#segs').innerHTML = `<div class="row" id="fixSeg">${['cast', 'nail', 'plate'].map(f => `<button data-f="${f}" class="${st.fix === f ? 'on' : ''}">${t.fix[f]}</button>`).join('')}</div>`
    + `<div class="row" id="courseSeg">${['normal', 'delayed', 'atrophic'].map(f => `<button data-c="${f}" class="${st.course === f ? 'on' + (f !== 'normal' ? ' warn' : '') : ''}">${t.course[f]}</button>`).join('')}</div>`;
  $('#chips').innerHTML = KEYS.map(k => `<button data-d="${k.d}">${k.id}</button>`).join('');
  document.querySelectorAll('#xrSw button').forEach(b => b.classList.toggle('on', b.dataset.v === st.view));
  $('#xrBox').title = t.full;
  bodyMode(st.mode);
  buildLabels(); renderCard(); renderSources(); L.relang();
}
function renderSources(focus) {
  const t = T();
  $('#srcBox').innerHTML = `<button class="ibtn x" id="srcX">${t.close}</button><h3>${t.srcH}</h3>
  <p class="muted" style="color:#cdd6ee">${t.srcNote}</p>
  <ol>${SOURCES.map(s => `<li id="src-${s.id}"${focus === s.id ? ' class="hl"' : ''}>${s.ao ? '<span class="aob">AO</span> ' : ''}${s.t} <a href="${s.u}" target="_blank" rel="noopener">${s.u.replace('https://', '').slice(0, 70)}${s.u.length > 78 ? '…' : ''}</a><small>${st.lang === 'zh' ? s.n : ''}</small></li>`).join('')}</ol>
  <h3 style="margin-top:14px">${ANAT[st.lang].reviewH}</h3><ul class="review">${ANAT[st.lang].review.map(x => `<li>${refHTML(x)}</li>`).join('')}</ul>
  <p style="color:var(--mute);font-size:12px">${st.lang === 'zh' ? '3D 引擎：Three.js r170（MIT）。本页为教学课件，不能替代临床判断与指南；时间轴的具体天数为所引范围内的示意值。' : '3D engine: Three.js r170 (MIT). Teaching material only; exact model days are illustrative values within the cited ranges.'}</p>`;
  $('#srcX').onclick = () => $('#src').classList.remove('on');
}
function openSrc(id) { renderSources(id); $('#src').classList.add('on'); const el = document.getElementById('src-' + id); if (el) el.scrollIntoView({ block: 'center' }); }

// ---------- card ----------
function stageTag() {
  const list = STAGES[route()], k = effK();
  let s = list[list.length - 1]; for (const x of list) if (S.d < x.d1 * k) { s = x; break; }
  let name = s[st.lang], col = s.col, rng = s[st.lang === 'zh' ? 'zr' : 'er'];
  if (st.course === 'atrophic' && S.d > 35) { name = st.lang === 'zh' ? '萎缩性不愈合（示意）' : 'Atrophic nonunion (illustrative)'; col = '#ff5d8f'; rng = ''; }
  return `<span class="tag" style="background:${col}">${name}</span><span class="rng">${rng}</span>${refHTML(s.src.map(x => `[[${x}]]`).join(''))}`;
}
function kvHTML() {
  const t = T();
  const rows = [
    [t.kv.callus, S.primary ? '—' : `≈ ${((S.A || 0) * 10).toFixed(1)} mm`, 'kvA'], [t.kv.min, S.primary ? '—' : `${Math.round(S.M * 100)}%`, 'kvM'],
    [t.kv.line, `${Math.round(S.lineVis * 100)}%`, 'kvL'], [t.kv.bridge, S.primary ? '—' : `${S.nBridge} / 4`, 'kvB'], [t.kv.rust, S.rust ? `${S.rust} / 12` : '—', 'kvR'],
    [t.kv.union, S.union ? (st.lang === 'zh' ? '是' : 'yes') : (st.lang === 'zh' ? '否' : 'no'), 'kvU']
  ];
  return `<div class="kvs"><div class="k" style="padding:8px 0 2px">${t.kv.h}</div>${rows.map(r => `<div class="kv"><span>${r[0]}</span><b id="${r[2]}">${r[1]}</b></div>`).join('')}</div>`;
}
function aoHTML() {
  const t = T(), ev = EVENTS.filter(e => e.fx.includes(st.fix));
  const past = ev.filter(e => e.d <= S.d + 0.5).slice(-2), next = ev.find(e => e.d > S.d + 0.5);
  const li = (e, cls) => `<li class="${cls}${e.warn ? ' warn' : ''}"><b>${e.d < 7 ? 'D' + e.d : e.d < 140 ? (e.d / 7).toFixed(0) + (st.lang === 'zh' ? ' 周' : ' wk') : (e.d / 30.4).toFixed(0) + (st.lang === 'zh' ? ' 月' : ' mo')}</b> ${e[st.lang]}${refHTML(`[[${e.src}]]`)}</li>`;
  return `<div class="aobox"><div class="k"><span class="aob">AO</span> ${t.aoNow}</div><ul>${past.map(e => li(e, 'past')).join('')}${next ? li(next, 'next') : ''}</ul></div>`;
}
function courseNote() {
  const zh = st.lang === 'zh';
  if (st.course === 'delayed') return `<div class="note">${refHTML(zh ? '延迟愈合（示意）：生物学按约 0.6 倍速度推进，第 3 个皮质约在 30 周桥接——超过 6 个月仍未愈合。延迟愈合常在 3–6 个月识别[[BOWERS2024]]；不愈合再手术宜至少推迟到 6 个月[[SPRINT2008]]。' : 'Delayed union (illustrative): biology at ~0.6× speed; the third cortex bridges at ~30 weeks — still not healed beyond 6 months. Delayed healing is usually recognised at 3–6 months[[BOWERS2024]]; delay reoperation for nonunion ≥ 6 months[[SPRINT2008]].')}</div>`;
  if (st.course === 'atrophic') return `<div class="note">${refHTML(zh ? '萎缩性不愈合（示意）：约 4 周后修复几乎停滞，骨痂稀少、不桥接。伤后 9 个月且连续 3 个月无进展即符合 FDA 不愈合定义[[SAUL2023]]。先排除感染，再改善生物学并提供稳定。' : 'Atrophic nonunion (illustrative): repair stalls after ~4 weeks, scant callus, no bridging. Not healed at 9 months with no progress for 3 months meets the FDA definition[[SAUL2023]]. Exclude infection, then improve biology and stability.')}</div>`;
  return '';
}
// histology schematic
function drawHisto(cv) {
  if (!cv) return;
  const ctx = cv.getContext('2d'), w = cv.width, h = cv.height; let sd = 11; const r = () => { sd = (sd * 16807) % 2147483647; return (sd - 1) / 2147483646; };
  const e = S.e, tw = S.tw, zh = st.lang === 'zh';
  ctx.fillStyle = '#f3e6ea'; ctx.fillRect(0, 0, w, h);
  const lab = [];
  if (S.primary) {
    ctx.fillStyle = '#ecc6cf'; ctx.fillRect(0, 0, w, h);
    for (let i = 0; i < 26; i++) { const x = r() * w, y = r() * h, rr = 9 + r() * 6; for (let k = 3; k >= 0; k--) { ctx.strokeStyle = `rgba(150,60,90,${0.25 + k * 0.05})`; ctx.beginPath(); ctx.ellipse(x, y, rr - k * 2.4, (rr - k * 2.4) * 0.7, 0, 0, 7); ctx.stroke(); } ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(x, y, 1.6, 0, 7); ctx.fill(); }
    ctx.strokeStyle = `rgba(90,30,50,${0.15 + 0.7 * S.lineVis})`; ctx.lineWidth = 2; ctx.beginPath(); for (let x = 0; x <= w; x += 6) ctx.lineTo(x, h / 2 + 3 * Math.sin(x * 0.2)); ctx.stroke(); ctx.lineWidth = 1;
    const nc = Math.round(5 * (S.cones || 0));
    for (let i = 0; i < nc; i++) { const x = 25 + i * (w - 50) / Math.max(1, nc - 1) * 0.95, y0 = h / 2 - 34 + (i % 2) * 18, len = 30 + 30 * (S.cones || 0); ctx.fillStyle = 'rgba(255,255,255,.85)'; ctx.fillRect(x - 4, y0, 8, len); ctx.fillStyle = '#7a3fa0'; for (let k = 0; k < 3; k++) { ctx.beginPath(); ctx.ellipse(x, y0 + len + 2, 7, 4, 0, 0, 7); ctx.fill(); } ctx.fillStyle = '#c8452f'; ctx.fillRect(x - 1, y0, 2, len); ctx.fillStyle = '#5b3a8c'; for (let k = 0; k < 4; k++) { ctx.beginPath(); ctx.arc(x - 5, y0 + 6 + k * 7, 2, 0, 7); ctx.arc(x + 5, y0 + 6 + k * 7, 2, 0, 7); ctx.fill(); } }
    lab.push(zh ? '骨单位 · 切割锥跨越骨折线' : 'Osteons · cutting cones crossing the line');
  } else {
    if (tw[0] > 0.05) { ctx.globalAlpha = clamp(tw[0] * 1.4); for (let i = 0; i < 260; i++) { const x = r() * w, y = r() * h; ctx.fillStyle = '#c8303e'; ctx.beginPath(); ctx.ellipse(x, y, 3.2, 2.3, r() * 3, 0, 7); ctx.fill(); } ctx.strokeStyle = '#e8b0a0'; for (let i = 0; i < 40; i++) { ctx.beginPath(); ctx.moveTo(r() * w, r() * h); ctx.lineTo(r() * w, r() * h); ctx.stroke(); } ctx.fillStyle = '#4a3a90'; for (let i = 0; i < 14; i++) { const x = r() * w, y = r() * h; for (let k = 0; k < 3; k++) { ctx.beginPath(); ctx.arc(x + k * 2.5, y + (k % 2) * 2, 1.8, 0, 7); ctx.fill(); } } lab.push(zh ? '血肿：红细胞、纤维蛋白、中性粒细胞' : 'Hematoma: RBCs, fibrin, neutrophils'); }
    if (tw[1] > 0.08) { ctx.globalAlpha = clamp(tw[1] * 1.5); ctx.strokeStyle = '#c0394a'; ctx.lineWidth = 2; for (let i = 0; i < 9; i++) { const x = r() * w, y = r() * h; ctx.beginPath(); ctx.ellipse(x, y, 10, 5, r() * 3, 0, 7); ctx.stroke(); } ctx.lineWidth = 1; ctx.fillStyle = '#6a4a9a'; for (let i = 0; i < 60; i++) { const x = r() * w, y = r() * h; ctx.beginPath(); ctx.ellipse(x, y, 5, 1.5, 0.3, 0, 7); ctx.fill(); } lab.push(zh ? '肉芽组织：毛细血管、成纤维细胞' : 'Granulation: capillaries, fibroblasts'); }
    if (tw[2] > 0.08) { ctx.globalAlpha = clamp(tw[2] * 1.5); ctx.fillStyle = 'rgba(170,190,230,.7)'; ctx.fillRect(0, 0, w, h); for (let i = 0; i < 70; i++) { const x = r() * w, y = r() * h, s = 3 + r() * 3 + 3 * S.oss; ctx.fillStyle = '#eef3ff'; ctx.beginPath(); ctx.arc(x, y, s + 2, 0, 7); ctx.fill(); ctx.fillStyle = '#5a5aa8'; ctx.beginPath(); ctx.arc(x, y, s * 0.55, 0, 7); ctx.fill(); } lab.push(zh ? '软骨痂：软骨细胞（陷窝）' : 'Soft callus: chondrocytes in lacunae'); }
    if (tw[3] > 0.08) { ctx.globalAlpha = clamp(tw[3] * 1.5); ctx.strokeStyle = '#d0587a'; ctx.lineWidth = 7; for (let i = 0; i < 10; i++) { ctx.beginPath(); let x = r() * w, y = r() * h; ctx.moveTo(x, y); for (let k = 0; k < 4; k++) { x += (r() - 0.5) * 60; y += (r() - 0.5) * 40; ctx.lineTo(x, y); } ctx.stroke(); } ctx.lineWidth = 1; ctx.fillStyle = '#3a2a70'; for (let i = 0; i < 50; i++) { ctx.beginPath(); ctx.arc(r() * w, r() * h, 1.4, 0, 7); ctx.fill(); } lab.push(zh ? '编织骨：不规则骨小梁 + 成骨细胞' : 'Woven bone: irregular trabeculae + osteoblasts'); }
    if (tw[4] > 0.1) { ctx.globalAlpha = clamp(tw[4] * 1.3); ctx.fillStyle = '#ecc6cf'; ctx.fillRect(0, 0, w, h); for (let i = 0; i < 22; i++) { const x = r() * w, y = r() * h, rr = 10 + r() * 6; for (let k = 3; k >= 0; k--) { ctx.strokeStyle = 'rgba(150,60,90,.35)'; ctx.beginPath(); ctx.arc(x, y, rr - k * 2.5, 0, 7); ctx.stroke(); } ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(x, y, 1.8, 0, 7); ctx.fill(); } lab.push(zh ? '板层骨：哈弗斯系统' : 'Lamellar bone: Haversian systems'); }
    ctx.globalAlpha = 1;
  }
  ctx.fillStyle = 'rgba(6,12,30,.72)'; ctx.fillRect(0, h - 18, w, 18); ctx.fillStyle = '#fff'; ctx.font = '600 10.5px sans-serif'; ctx.fillText(lab.slice(-2).join(' · '), 6, h - 5);
}
let cardSig = '';
function renderCard(force = true) {
  const t = T(), m = st.mode, card = $('#card'), k = curKey(), zh = st.lang === 'zh';
  const sig = [m, st.lang, k.id, S.stage, st.fix, st.course, st.hl, st.clinTab, st.quiz.i, st.quiz.picked, st.view, S.union, EVENTS.filter(e => e.d <= S.d + 0.5).length].join('|');
  if (!force && sig === cardSig) return updateCardLive();
  cardSig = sig;
  let h = '';
  if (m === 'explore') {
    const src = S.primary ? KEYTEXT_P : KEYTEXT, kt = (src[k.id] || KEYTEXT[k.id])[st.lang];
    const cn = st.fix === 'cast' && CASTNOTE[k.id] ? `<p class="castn">${CASTNOTE[k.id][st.lang]}</p>` : '';
    h = `${stageTag()}<h2>${kt.h}</h2>${kt.p.map(p => `<p>${p}</p>`).join('')}${cn}${courseNote()}${aoHTML()}
      <div class="histo"><div class="k">${t.histo}</div><canvas id="histo" width="320" height="110"></canvas></div>${kvHTML()}
      <div class="btns"><button class="btn" data-step="-1">${t.prev}</button><button class="btn pri" data-step="1">${t.next}</button></div>`;
  } else if (m === 'cells') {
    h = `<span class="tag" style="background:var(--acc)">${t.tabs[1]}</span><span class="rng" id="cDay"></span>
      <h3>${t.cellsH}</h3><div class="clist">${CELLS.map(c => `<button class="citem${st.hl === c.id ? ' on' : ''}" data-cell="${c.id}"><i style="color:${c.col};background:${c.col}"></i><span class="nm">${c[st.lang]}<small>${zh ? c.zw : c.ew}</small></span><span class="bar"><u id="cb-${c.id}" style="background:${c.col}"></u></span><span class="desc">${zh ? c.zr : c.er}</span></button>`).join('')}</div>
      <h3>${t.sigH}</h3><div class="clist">${SIGNALS.map(s => `<div class="citem on" style="cursor:default"><i style="color:${s.col};background:${s.col}"></i><span class="nm">${s[st.lang]}</span><span class="bar"><u id="sb-${s.id}" style="background:${s.col}"></u></span><span class="desc">${zh ? s.zr : s.er}</span></div>`).join('')}</div>
      <div class="histo"><div class="k">${t.histo}</div><canvas id="histo" width="320" height="110"></canvas></div>
      <p class="muted">${refHTML(zh ? '柱高与曲线为相对活跃度示意（时间顺序据综述[[ME2011]][[EG2015]]），非测量值；分期时间与 AO 一致[[AO-PFM]]。' : 'Bars and curves show relative activity (sequence after reviews[[ME2011]][[EG2015]]), not measurements; stage timing follows AO[[AO-PFM]].')}</p>`;
  } else if (m === 'primary') {
    const Pp = PRIMARY[st.lang];
    h = `<span class="tag" style="background:#b18cff">${t.tabs[2]}</span><h2>${zh ? '稳定性决定愈合方式' : 'Stability decides the healing route'}</h2><p>${refHTML(Pp.intro)}</p>
      <div class="stabs"><button data-f="nail" class="${st.fix === 'nail' ? 'on' : ''}">${zh ? '相对稳定 · 髓内钉 → 二期' : 'Relative · nail → secondary'}</button><button data-f="plate" class="${st.fix === 'plate' ? 'on' : ''}">${zh ? '绝对稳定 · 加压钢板 → 一期' : 'Absolute · plate → primary'}</button></div>
      <table class="tbl">${Pp.rows.map((r, i) => `<tr>${r.map(x => i ? `<td>${refHTML(x)}</td>` : `<th>${x}</th>`).join('')}</tr>`).join('')}</table>
      <div class="calc"><div class="k">${Pp.calc}</div>
        <label>${Pp.gap}<b id="gv"></b></label><input type="range" id="gapR" min="0.1" max="5" step="0.05" value="${st.strain.gap}">
        <label>${Pp.disp}<b id="dv"></b></label><input type="range" id="dispR" min="0" max="1" step="0.01" value="${st.strain.disp}">
        <div class="sbar"><div style="flex:2;background:#7dffb2">${zh ? '骨' : 'bone'}</div><div style="flex:8;background:#9cc7ff">${zh ? '软骨' : 'cartilage'}</div><div style="flex:30;background:#ff9fb0">${zh ? '肉芽组织' : 'granulation'}</div><div style="flex:6;background:#555c72;color:#fff">&gt;100%</div><span class="pin" id="spin"></span></div>
        <div class="verdict" id="sv"></div><div class="muted">${refHTML((zh ? '刻度为对数式示意：2% | 10% | 100%' : 'Log-like scale: 2% | 10% | 100%') + '[[PERREN2002]]')}</div></div>
      <p>${refHTML(Pp.note)}</p>`;
  } else if (m === 'imaging') {
    const list = IMAGING[route()], kk = effK();
    const cur = list.reduce((a, r) => (S.d >= r.d * kk - 0.5 ? r : a), list[0]);
    h = `<span class="tag" style="background:var(--acc2)">${t.tabs[3]}</span><h2>${t.imgH}</h2><p class="muted">${t.imgTip}</p>
      ${list.map(r => `<button class="irow${r === cur ? ' on' : ''}" data-d="${r.d}"><b>${zh ? r.zt : r.et}</b><span>${zh ? r.z : r.e}${refHTML(`[[${r.src}]]`)}</span></button>`).join('')}
      <h3>RUST</h3><p>${refHTML(t.rustNote)}</p>
      <p>${refHTML(zh ? '影像愈合常滞后于力学愈合；研究中常以“≥3 个皮质桥接”定义愈合。一期愈合没有桥接骨痂，RUST 不适用[[AO-SR-FA]]。左侧 X 线：点击可看全长正侧位，可见交锁螺钉 / 钢板全长。' : 'Radiographic union often lags mechanical union; studies use ≥ 3 bridged cortices. Primary healing has no bridging callus, so RUST does not apply[[AO-SR-FA]]. Tap the x-ray for full-length AP/LAT showing locking screws / the whole plate.')}</p>`;
  } else if (m === 'clinical') {
    const C = CLINICAL[st.lang], c = C[st.clinTab];
    const sc = zh ? [['髓内钉 · 6 周复查', 42, 'normal', 'nail'], ['髓内钉 · 18 周愈合', 126, 'normal', 'nail'], ['钢板 · 12 周', 84, 'normal', 'plate'], ['延迟 · 6 个月', 182, 'delayed', 'nail'], ['萎缩性 · 9 个月', 274, 'atrophic', 'nail']]
      : [['Nail · 6-wk review', 42, 'normal', 'nail'], ['Nail · union 18 wk', 126, 'normal', 'nail'], ['Plate · 12 wk', 84, 'normal', 'plate'], ['Delayed · 6 mo', 182, 'delayed', 'nail'], ['Atrophic · 9 mo', 274, 'atrophic', 'nail']];
    h = `<span class="tag" style="background:var(--hot)">${t.tabs[4]}</span><h2>${c.h}</h2>
      <div class="stabs">${C.map((x, i) => `<button data-ct="${i}" class="${i === st.clinTab ? 'on' : ''}">${x.k}</button>`).join('')}</div>
      <ul>${c.b.map(x => `<li>${refHTML(x)}</li>`).join('')}</ul>${c.cs ? `<div class="btns"><button class="btn pri" data-xs="1">${ANAT[st.lang].xs}</button><button class="btn" data-xs3="1">${ANAT[st.lang].xs3d}</button></div>` : ''}${aoHTML()}
      <h3>${zh ? '情景对照（同步 3D 与 X 线）' : 'Scenarios (sync 3D + X-ray)'}</h3>
      <div class="btns">${sc.map(s => `<button class="btn${st.course === s[2] && st.fix === s[3] && Math.abs(S.d - s[1]) < 3 ? ' pri' : ''}" data-sc="${s[1]},${s[2]},${s[3]}">${s[0]}</button>`).join('')}</div>
      ${courseNote()}${kvHTML()}
      <p class="muted">${zh ? '以上为 AO 原则与文献，具体以主刀医生、科室方案与最新指南为准。' : 'AO principles and literature; follow your surgeon, unit protocol and current guidelines.'}</p>`;
  } else if (m === 'quiz') {
    const q = st.quiz;
    if (q.i < 0) h = `<span class="tag" style="background:var(--ok)">${t.tabs[5]}</span><h2>${zh ? '10 道题，检验一下' : '10 questions to check yourself'}</h2><p>${zh ? '前 5 题偏<b>医学生</b>（机制、分型），后 5 题偏<b>规培</b>（AO 术后处理、愈合时间、RUST、不愈合）。部分题会切换固定方式并跳到对应时间点。' : 'Questions 1–5 are <b>student</b> level; 6–10 are <b>resident</b> level (AO aftercare, union time, RUST, nonunion). Some questions switch fixation and move the timeline.'}</p><div class="btns"><button class="btn pri" id="qStart">${t.quizStart}</button></div>`;
    else if (q.i >= QUIZ.length) h = `<span class="tag" style="background:var(--ok)">${t.tabs[5]}</span><h2>${t.quizScore}</h2><div class="score">${q.score} / ${QUIZ.length}</div><div class="dots">${q.res.map((r, i) => `<i class="${r ? 'r' : 'w'}">${i + 1}</i>`).join('')}</div><p>${q.score >= 8 ? (zh ? '很扎实。可以再对比一次髓内钉与钢板的 X 线。' : 'Solid. Compare nail vs plate x-rays once more.') : (zh ? '建议回到“时间轴”和“临床决策”再走一遍。' : 'Go through Timeline and Clinical once more.')}</p><div class="btns"><button class="btn pri" id="qStart">${t.quizRestart}</button></div>`;
    else {
      const it = QUIZ[q.i], qq = it[st.lang], picked = q.picked;
      h = `<span class="tag" style="background:var(--ok)">${t.tabs[5]}</span><span class="lv ${it.lv}">${it.lv === 'S' ? t.lvS : t.lvR}</span>
        <div class="dots">${QUIZ.map((_, i) => `<i class="${i < q.res.length ? (q.res[i] ? 'r' : 'w') : i === q.i ? 'c' : ''}">${i + 1}</i>`).join('')}</div>
        <h2>${q.i + 1}. ${qq.q}</h2>
        <div class="opts">${qq.o.map((o, i) => `<button data-o="${i}" ${picked !== null ? 'disabled' : ''} class="${picked !== null ? (i === qq.a ? 'right' : i === picked ? 'wrong' : '') : ''}">${String.fromCharCode(65 + i)}. ${o}</button>`).join('')}</div>
        ${picked !== null ? `<div class="expl ${picked === qq.a ? 'r' : 'w'}"><b>${picked === qq.a ? (zh ? '✓ 正确' : '✓ Correct') : (zh ? '✗ 再想想' : '✗ Not quite')}</b> ${refHTML(qq.x)}</div><div class="btns"><button class="btn pri" id="qNext">${t.quizNext}</button></div>` : ''}`;
    }
  }
  card.innerHTML = refHTML(h);
  card.scrollTop = 0;
  bindCard(); updateCardLive();
}
function updateCardLive() {
  const setT = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
  setT('kvA', S.primary ? '—' : `≈ ${((S.A || 0) * 10).toFixed(1)} mm`); setT('kvM', S.primary ? '—' : `${Math.round(S.M * 100)}%`);
  setT('kvL', `${Math.round(S.lineVis * 100)}%`); setT('kvB', S.primary ? '—' : `${S.nBridge} / 4`); setT('kvR', S.rust ? `${S.rust} / 12` : '—');
  setT('kvU', S.union ? (st.lang === 'zh' ? '是' : 'yes') : (st.lang === 'zh' ? '否' : 'no'));
  const dl = dayLabel(S.d); setT('cDay', dl.n + ' · ' + dl.s);
  CELLS.forEach(c => { const el = document.getElementById('cb-' + c.id); if (el) el.style.width = Math.round((S.cells[c.id] || 0) * 100) + '%'; });
  SIGNALS.forEach(s => { const el = document.getElementById('sb-' + s.id); if (el) el.style.width = Math.round((S.sig[s.id] || 0) * 100) + '%'; });
  drawHisto(document.getElementById('histo'));
  if (st.mode === 'primary') updateStrain();
}
function updateStrain() {
  const { gap, disp } = st.strain, Pp = PRIMARY[st.lang];
  const s = gap > 0 ? disp / gap * 100 : 999, g = document.getElementById('gv'); if (!g) return;
  g.textContent = gap.toFixed(2) + ' mm'; document.getElementById('dv').textContent = disp.toFixed(2) + ' mm';
  let pos; if (s <= 2) pos = s; else if (s <= 10) pos = 2 + (s - 2); else if (s <= 100) pos = 10 + (Math.log10(s) - 1) * 30; else pos = 40 + Math.min(6, (Math.log10(s) - 2) * 6);
  document.getElementById('spin').style.left = `calc(${pos / 46 * 100}% - 1.5px)`;
  const zh = st.lang === 'zh';
  const v = s < 2 ? [zh ? '骨可直接形成 → 一期愈合条件' : 'Bone can form directly → primary healing', '#7dffb2'] : s < 10 ? [zh ? '软骨可形成 → 二期（软骨痂）' : 'Cartilage can form → secondary (soft callus)', '#9cc7ff'] : s <= 100 ? [zh ? '只能形成肉芽组织 → 需骨痂先降低应变' : 'Only granulation tissue → callus must reduce strain first', '#ff9fb0'] : [zh ? '超过肉芽组织耐受 → 易不愈合' : 'Beyond granulation tolerance → nonunion risk', '#ff5d8f'];
  document.getElementById('sv').innerHTML = `${Pp.strain} ≈ <span class="mono">${s > 999 ? '∞' : s.toFixed(1)}%</span> · <span style="color:${v[1]}">${v[0]}</span>`;
}
function bindCard() {
  const card = $('#card');
  card.querySelectorAll('[data-step]').forEach(b => b.onclick = () => { const i = KEYS.indexOf(curKey()) + (+b.dataset.step); goDay(KEYS[clamp(i, 0, KEYS.length - 1)].d); });
  card.querySelectorAll('[data-cell]').forEach(b => b.onclick = () => { st.hl = st.hl === b.dataset.cell ? null : b.dataset.cell; if (!st.cells) setToggle('cells', true); renderCard(); });
  card.querySelectorAll('.stabs [data-f]').forEach(b => b.onclick = () => setFix(b.dataset.f));
  card.querySelectorAll('[data-ct]').forEach(b => b.onclick = () => { st.clinTab = +b.dataset.ct; renderCard(); });
  card.querySelectorAll('[data-xs]').forEach(b => b.onclick = () => L.openSection());
  card.querySelectorAll('[data-xs3]').forEach(b => b.onclick = () => L.slice3D(true));
  card.querySelectorAll('[data-sc]').forEach(b => b.onclick = () => { const [d, c, f] = b.dataset.sc.split(','); if (f !== st.fix) setFix(f, false); setCourse(c); goDay(+d); });
  card.querySelectorAll('.irow').forEach(b => b.onclick = () => goDay(+b.dataset.d * effK()));
  const gr = $('#gapR'), dr = $('#dispR');
  if (gr) { gr.oninput = () => { st.strain.gap = +gr.value; updateStrain(); }; dr.oninput = () => { st.strain.disp = +dr.value; updateStrain(); }; updateStrain(); }
  const qs = $('#qStart'); if (qs) qs.onclick = () => { st.quiz = { i: 0, score: 0, res: [], picked: null }; quizSync(); renderCard(); };
  card.querySelectorAll('[data-o]').forEach(b => b.onclick = () => { const it = QUIZ[st.quiz.i][st.lang]; st.quiz.picked = +b.dataset.o; const ok = st.quiz.picked === it.a; st.quiz.res.push(ok); if (ok) st.quiz.score++; renderCard(); });
  const qn = $('#qNext'); if (qn) qn.onclick = () => { st.quiz.i++; st.quiz.picked = null; quizSync(); renderCard(); };
}
function quizSync() { const it = QUIZ[st.quiz.i]; if (!it) return; if (it.fix && it.fix !== st.fix) setFix(it.fix, false); if (st.course !== 'normal') setCourse('normal'); if (it.d !== undefined) goDay(it.d); }
function renderRust() {
  const t = T(), box = $('#rust'), lbl = st.lang === 'zh' ? ['内', '外', '前', '后'] : ['Med', 'Lat', 'Ant', 'Post'];
  if (S.primary) { box.innerHTML = `<div class="top"><span class="k">RUST</span><span class="big">—</span></div><p style="display:block">${refHTML(t.rustNA + '[[AO-SR-FA]]')}</p>`; return; }
  box.innerHTML = `<div class="top"><span class="k">RUST<span class="bk"> · ${S.nBridge}/4 ${st.lang === 'zh' ? '桥接' : 'bridged'}</span></span><span class="big">${S.rust}<small> /12</small></span></div>
    <div class="cx">${S.rustC.map((v, i) => `<div class="s${v}"><span>${lbl[i]}</span>${v}</div>`).join('')}</div><p>${refHTML(t.rustNote)}</p>`;
}

// ================= state =================
function setDayU(u) { st.u = clamp(u); }
function goDay(d, ms = 900) { st.tween = { from: st.u, to: E.dayToU(d), t0: performance.now(), ms }; st.playing = false; $('#play').textContent = '▶'; }
function setToggle(k, v) {
  if (k === 'soft') { L.setLayer('skin', v ? 1 : 0); return; }
  if (k === 'anat') { st.anat = v; L.setPanel(v); document.querySelectorAll('.tg').forEach(e => e.classList.toggle('on', !!st[e.dataset.k])); return; }
  st[k] = v; if (k === 'cut') L.apply(); document.querySelectorAll('.tg').forEach(e => e.classList.toggle('on', !!st[e.dataset.k])); dirtyGeo = dirtyUI = true; if (k === 'cut' || k === 'soft') { dirtyStatic = true; if (k === 'soft') layout(); } }
function setFix(f, re = true) { st.fix = f; curveKey = ''; document.querySelectorAll('#fixSeg button').forEach(b => b.classList.toggle('on', b.dataset.f === f)); dirtyStatic = dirtyGeo = dirtyUI = true; S = E.healState(E.uToDay(st.u), st.fix, st.course); layout(); if (re) renderCard(); }
function setCourse(c) { st.course = c; curveKey = ''; document.querySelectorAll('#courseSeg button').forEach(b => { b.className = b.dataset.c === c ? 'on' + (c !== 'normal' ? ' warn' : '') : ''; }); dirtyGeo = dirtyUI = true; renderCard(); }
function setMode(m) {
  st.mode = m; st.hl = null; curveKey = '';
  document.querySelectorAll('.tab').forEach(t => t.classList.toggle('on', t.dataset.m === m));
  bodyMode(m);
  if (m === 'cells' || m === 'primary') L.setDepth(L.LAYERS.length - 1);
  if (m === 'cells') setToggle('cells', true);
  if (m === 'explore' || m === 'imaging' || m === 'clinical') { if (st.cells) setToggle('cells', false); }
  if (m === 'primary') { setToggle('cut', true); if (st.fix !== 'plate') setFix('plate', false); }
  renderCard(); dirtyUI = true; requestAnimationFrame(layout);
}

// ================= events =================
$('#tabs').addEventListener('click', e => { const b = e.target.closest('.tab'); if (b) { stopTour(); setMode(b.dataset.m); } });
$('#toggles').addEventListener('click', e => { const b = e.target.closest('.tg'); if (b) setToggle(b.dataset.k, !st[b.dataset.k]); });
$('#segs').addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; if (b.dataset.f) setFix(b.dataset.f); if (b.dataset.c) setCourse(b.dataset.c); });
$('#chips').addEventListener('click', e => { const b = e.target.closest('button'); if (b) { stopTour(); goDay(+b.dataset.d); } });
$('#xrSw').addEventListener('click', e => { const b = e.target.closest('button'); if (b) { e.stopPropagation(); setXrView(b.dataset.v); L.setView(b.dataset.v === 'lat' ? 'lat' : 'ant'); } });
$('#xrBox').addEventListener('click', () => { $('#xfull').classList.add('on'); drawFull(); });
$('#xfX').addEventListener('click', () => $('#xfull').classList.remove('on'));
$('#xfull').addEventListener('click', e => { if (e.target.id === 'xfull') $('#xfull').classList.remove('on'); });
document.addEventListener('click', e => { const a = e.target.closest('a.ref'); if (a) { e.preventDefault(); openSrc(a.dataset.src); } });
$('#play').addEventListener('click', () => { stopTour(); st.playing = !st.playing; st.tween = null; if (st.playing && st.u >= 0.999) st.u = 0; $('#play').textContent = st.playing ? '❚❚' : '▶'; });
$('#srcBtn').addEventListener('click', () => { renderSources(); $('#src').classList.add('on'); });
$('#src').addEventListener('click', e => { if (e.target.id === 'src') $('#src').classList.remove('on'); });
$('#langBtn').addEventListener('click', () => { st.lang = st.lang === 'zh' ? 'en' : 'zh'; buildUI(); dirtyUI = true; drawTimeline(); });
addEventListener('keydown', e => { if (e.key === 'Escape') { $('#src').classList.remove('on'); $('#xfull').classList.remove('on'); $('#xsec').classList.remove('on'); } if (e.key === ' ' && e.target === document.body) { e.preventDefault(); $('#play').click(); } });
let dragging = false;
const tlEl = $('#tl');
const tlSet = e => { const r = tlEl.getBoundingClientRect(); setDayU((e.clientX - r.left - PADL) / (r.width - PADL - PADR)); st.tween = null; st.playing = false; $('#play').textContent = '▶'; };
tlEl.addEventListener('pointerdown', e => { dragging = true; stopTour(); tlEl.setPointerCapture(e.pointerId); tlSet(e); });
tlEl.addEventListener('pointermove', e => { if (dragging) tlSet(e); });
tlEl.addEventListener('pointerup', () => { dragging = false; });
addEventListener('resize', () => { layout(); needRender = true; });

// ---------- guided tour ----------
const TOUR = [{ d: 0, cut: false, cells: false }, { d: 3, cells: true }, { d: 7, cells: true, cut: true }, { d: 14, cells: false, cut: true }, { d: 21, cut: true }, { d: 42, cut: false }, { d: 84 }, { d: 126, cut: true }, { d: 182, cut: false }, { d: 365 }];
let tourTimer = null, tourI = 0;
function tourStep() { if (!st.tour) return; const s = TOUR[tourI]; if (!s) { stopTour(); return; } if (s.cut !== undefined) setToggle('cut', s.cut); if (s.cells !== undefined) setToggle('cells', s.cells); goDay(s.d, 1200); tourI++; tourTimer = setTimeout(tourStep, 6500); }
function startTour() { st.tour = true; tourI = 0; if (st.fix !== 'nail') setFix('nail', false); if (st.course !== 'normal') setCourse('normal'); setMode('explore'); controls.autoRotate = true; controls.autoRotateSpeed = 0.35; $('#tourBtn').classList.add('on'); $('#tourBtn').textContent = T().tourStop; tourStep(); }
function stopTour() { if (!st.tour) return; st.tour = false; clearTimeout(tourTimer); controls.autoRotate = false; $('#tourBtn').classList.remove('on'); $('#tourBtn').textContent = T().tour; }
$('#tourBtn').addEventListener('click', () => (st.tour ? stopTour() : startTour()));

// ================= loop =================
let lastT = performance.now(), lastU = -1, frame = 0, needRender = true;
const STILL = Q.get('still') === '1';
controls.addEventListener('change', () => { needRender = true; });
function tick(now) {
  const dt = Math.min(0.1, (now - lastT) / 1000); lastT = now;
  if (st.playing) { st.u = Math.min(1, st.u + dt / 24); if (st.u >= 1) { st.playing = false; $('#play').textContent = '▶'; } }
  if (st.tween) { const k = clamp((now - st.tween.t0) / st.tween.ms), e = k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2; st.u = lerp(st.tween.from, st.tween.to, e); if (k >= 1) st.tween = null; }
  if (st.u !== lastU || dirtyUI || dirtyGeo) {
    const changed = st.u !== lastU; lastU = st.u;
    S = E.healState(E.uToDay(st.u), st.fix, st.course);
    if (changed) dirtyGeo = true;
    const dl = dayLabel(S.d); $('#dayNum').textContent = dl.n; $('#daySub').textContent = dl.s;
    const ck = KEYS.reduce((a, k) => (Math.abs(E.dayToU(k.d) - st.u) < Math.abs(E.dayToU(a.d) - st.u) ? k : a), KEYS[0]);
    document.querySelectorAll('#chips button').forEach(b => b.classList.toggle('on', +b.dataset.d === ck.d && Math.abs(E.dayToU(ck.d) - st.u) < 0.025));
    renderCard(false); renderRust(); drawTimeline();
    dirtyUI = false; needRender = true;
  }
  if (dirtyStatic) { buildStatic(); dirtyStatic = false; dirtyGeo = true; }
  if (dirtyGeo && now - lastGeo > 30) { rebuild(); dirtyGeo = false; lastGeo = now; needRender = true; }
  if (dirtyXr && now - lastXr > 120) { drawXray(); dirtyXr = false; lastXr = now; }
  const tw = L.tick(now); if (tw) needRender = true;
  const moved = tw ? false : controls.update();
  if (moved || needRender || st.tween || st.playing || (st.cells && !STILL) || controls.autoRotate || frame < 3) {
    animateCells(STILL ? 0 : now / 1000); bone.updateMatrixWorld(); updateLabels(); renderer.render(scene, camera); L.drawGizmo(); needRender = false;
  }
  frame++; window.__frame = frame;
  if (frame === 3) { $('#loading').classList.add('off'); window.__ready = true; }
  requestAnimationFrame(tick);
}

// ================= init =================
buildUI();
if (st.mode !== 'explore') setMode(st.mode);
S = E.healState(E.uToDay(st.u), st.fix, st.course);
buildStatic(); dirtyStatic = false; rebuild(); drawXray(); renderRust();
if (Q.get('xfull') === '1') { $('#xfull').classList.add('on'); drawFull(); }
requestAnimationFrame(() => { layout(); requestAnimationFrame(tick); });
window.__st = st; window.__E = E;
window.__L = L; window.__R = { renderer, scene, camera };
window.__api = { viewName: (v, inst = true) => L.setView(v, inst), depth: k => L.setDepth(k), layer: (l, v) => L.setLayer(l, v), section: () => L.openSection(), slice: on => L.slice3D(on), panel: on => setToggle('anat', on), day: d => { st.tween = null; st.u = E.dayToU(d); }, setFix, setToggle, setCourse, setMode, view: v => { st.view = v; dirtyXr = true; }, full: on => { $('#xfull').classList.toggle('on', on); if (on) drawFull(); } };
