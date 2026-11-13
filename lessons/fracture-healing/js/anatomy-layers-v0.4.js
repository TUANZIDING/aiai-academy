// anatomy-layers v0.4 · standard anatomical views + layered real lower-leg anatomy (right leg)
// v0.4: dissection-order layers (12), solid partitioned cut faces (caps) for 剖面 / 3D 横切, fracture-model bone caps, atlas cross-section
// Meshes: BodyParts3D, © The Database Center for Life Science licensed under CC Attribution-Share Alike 2.1 Japan;
// via Z-Anatomy (CC BY-SA 4.0, github.com/LluisV/Z-Anatomy), converted assets from BodyVista. Derived meshes: CC BY-SA 4.0.
// Scene frame (bone group local): +x medial, +y proximal, +z anterior; cm; y = 0 at the fracture level.
import * as THREE from 'three';
import { GLTFLoader } from '../vendor/gltf-loader-r170.js';
import { ANAT } from './fracture-teach-v0.4.js';

const $ = s => document.querySelector(s);
let C = null;            // context from the app
export const LAYERS = ['skin', 'subcut', 'fascia', 'gastroc', 'soleus', 'postnv', 'deeppost', 'lateral', 'anterior', 'antnv', 'iom', 'bone'];
const st = { ready: false, layer: {}, depth: 3, panel: false, slice: false, hover: null, parts: [], caps: [], json: null, view: 'ant' };
const A = () => ANAT[C.st.lang];
const KIND = {
  muscle: { col: '#ffffff', rough: 0.52, cap: '#7c2a23', vc: true, nm: true, base: 1 },
  tendon: { col: '#ffffff', rough: 0.38, cap: '#cfc8b8', vc: true, nm: true, base: 1 },
  fascia: { col: '#e9e3d6', rough: 0.45, cap: '#bdb5a5', base: 0.42 },
  septum: { col: '#d8f0ee', rough: 0.45, cap: '#9fc9c4', base: 0.6 },
  membrane: { col: '#d9cfb6', rough: 0.5, cap: '#a99f86', base: 0.85 },
  nerve: { col: '#f2c53d', rough: 0.4, cap: '#b38a12', emi: '#3a2a00', base: 1 },
  artery: { col: '#d7263d', rough: 0.3, cap: '#7a0d1a', emi: '#2a0005', base: 1 },
  vein: { col: '#3557d1', rough: 0.32, cap: '#1b2d70', emi: '#05082a', base: 1 },
  bone: { col: '#eadcbc', rough: 0.6, cap: '#c9b58e', base: 1 },
  fat: { col: '#f2cf6a', rough: 0.55, cap: '#e8c45e', base: 0.38 }
};
// atlas colours of solid cut faces
const CAPCOL = { muscle: '#b3463c', tendon: '#ece4d0', nerve: '#f4cb3a', artery: '#e3263f', vein: '#3a5ad6', bone: '#efe2c2', fat: '#f1cf6c', skin: '#e2a487', fascia: '#f7f4ea', septum: '#f7f4ea', membrane: '#e2d6b6', areolar: '#cdb4a6' };
const CAPNAME = { skin: ['皮肤（真皮）', 'Skin (dermis)'], areolar: ['肌间疏松结缔组织', 'Intermuscular loose connective tissue'] };
const DEFAULT_STATE = { skin: 0, subcut: 0, fascia: 0, gastroc: 1, soleus: 1, postnv: 2, deeppost: 1, lateral: 1, anterior: 1, antnv: 2, iom: 2, bone: 2 };
const clipCut = new THREE.Plane(new THREE.Vector3(0, 0, -1), 0);   // keep posterior half (matches v0.2 section θ∈[π,2π])
const clipSlice = new THREE.Plane(new THREE.Vector3(0, -1, 0), 0);  // keep distal part (y < 0)

// ---------- procedural muscle striation normal map ----------
function striationTex() {
  const s = 256, c = document.createElement('canvas'); c.width = c.height = s; const g = c.getContext('2d'); const im = g.createImageData(s, s);
  const h = new Float32Array(s * s); let seed = 11; const r = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const ph = Array.from({ length: 6 }, r);
  for (let y = 0; y < s; y++) for (let x = 0; x < s; x++) {
    const wob = 2.2 * Math.sin((y / s) * Math.PI * 2 * 2 + ph[0] * 6) + 1.2 * Math.sin((y / s) * Math.PI * 2 * 5 + ph[1] * 6);
    const u = (x + wob) / s * Math.PI * 2;
    h[y * s + x] = 0.55 * Math.sin(u * 40 + ph[2] * 6) + 0.3 * Math.sin(u * 87 + ph[3] * 6 + Math.sin(y / s * 12)) + 0.15 * Math.sin(u * 151 + ph[4] * 6);
  }
  for (let y = 0; y < s; y++) for (let x = 0; x < s; x++) {
    const dx = h[y * s + (x + 1) % s] - h[y * s + (x + s - 1) % s], dy = h[((y + 1) % s) * s + x] - h[((y + s - 1) % s) * s + x];
    const n = new THREE.Vector3(-dx * 1.6, -dy * 0.4, 1).normalize(); const i = (y * s + x) * 4;
    im.data[i] = (n.x * 0.5 + 0.5) * 255; im.data[i + 1] = (n.y * 0.5 + 0.5) * 255; im.data[i + 2] = (n.z * 0.5 + 0.5) * 255; im.data[i + 3] = 255;
  }
  g.putImageData(im, 0, 0);
  const t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(0.33, 1.0); t.anisotropy = 4; return t;
}

function makeMat(kind) {
  const k = KIND[kind] || KIND.bone;
  const m = new THREE.MeshPhysicalMaterial({ color: k.col, roughness: k.rough, metalness: 0, vertexColors: !!k.vc, side: THREE.DoubleSide,
    sheen: kind === 'muscle' ? 0.5 : 0.2, sheenColor: new THREE.Color(kind === 'muscle' ? '#ff9c8a' : '#ffffff'), sheenRoughness: 0.6,
    clearcoat: kind === 'muscle' || kind === 'tendon' ? 0.25 : 0.1, clearcoatRoughness: 0.5,
    emissive: new THREE.Color(k.emi || '#000000'), transparent: false });
  if (k.nm) { m.normalMap = C.striation; m.normalScale = new THREE.Vector2(0.55, 0.55); }
  m.userData.u = { uGhost: { value: 0 }, uCap: { value: new THREE.Color(k.cap) }, uHi: { value: 0 } };
  m.onBeforeCompile = sh => {
    Object.assign(sh.uniforms, m.userData.u);
    sh.fragmentShader = 'uniform float uGhost; uniform vec3 uCap; uniform float uHi;\n' + sh.fragmentShader
      .replace('#include <color_fragment>', '#include <color_fragment>\nif (!gl_FrontFacing) { diffuseColor.rgb = uCap; }')
      .replace('#include <opaque_fragment>', `float frg = pow(1.0 - abs(dot(normal, normalize(vViewPosition))), 1.6);
diffuseColor.a = mix(diffuseColor.a, diffuseColor.a * (0.42 + 0.75 * frg), uGhost);
outgoingLight += uHi * vec3(0.10, 0.55, 0.70) * (0.35 + frg);
#include <opaque_fragment>`);
  };
  m.customProgramCacheKey = () => 'anat-' + kind;
  m.userData.kind = kind; m.userData.base = k.base;
  return m;
}

// ---------- init / load ----------
export function init(ctx) {
  C = ctx; C.striation = striationTex();
  C.renderer.localClippingEnabled = true;
  LAYERS.forEach(l => (st.layer[l] = DEFAULT_STATE[l]));
  const qd = new URLSearchParams(location.search).get('depth');
  if (qd !== null) setDepth(+qd, false);
  st.panel = new URLSearchParams(location.search).get('anat') === '1' || (innerWidth >= 900 && new URLSearchParams(location.search).get('anat') !== '0');
  st.root = new THREE.Group(); st.root.name = 'anatomy'; C.bone.add(st.root);
  buildDOM();
  const t0 = performance.now();
  Promise.all([
    new Promise((res, rej) => new GLTFLoader().load('./models/leg-anatomy-v0.4.glb', res, undefined, rej)),
    fetch('./models/leg-anatomy-v0.4.json').then(r => r.json())
  ]).then(([g, js]) => {
    st.json = js;
    const byKey = Object.fromEntries(js.parts.map(p => [p.key, p]));
    const capMats = {};
    g.scene.traverse(o => {
      if (!o.isMesh) return;
      if (o.userData && o.userData.cap) {   // solid cut face
        const u = o.userData, pm = byKey[u.of] || {}, nm = CAPNAME[u.of] || [pm.zh || u.of, pm.en || u.of];
        const ck = u.kind + (u.comp || '');
        capMats[ck] = capMats[ck] || new THREE.MeshStandardMaterial({ color: CAPCOL[u.kind] || '#999', roughness: 0.9, metalness: 0, side: THREE.DoubleSide, emissive: new THREE.Color(CAPCOL[u.kind] || '#999').multiplyScalar(0.12) });
        o.geometry.computeVertexNormals(); o.material = capMats[ck]; o.renderOrder = 1;
        o.userData = { anat: true, isCap: true, cap: u.cap, key: u.of, layer: u.layer, kind: u.kind, zh: nm[0], en: nm[1] };
        st.caps.push(o); return;
      }
      const meta = byKey[o.name] || o.userData; if (!meta || !meta.key) return;
      o.geometry.computeVertexNormals();
      o.material = makeMat(meta.kind);
      o.userData = { ...meta, anat: true };
      o.castShadow = false; o.receiveShadow = false;
      st.parts.push(o);
    });
    st.parts.forEach(o => st.root.add(o)); st.caps.forEach(o => st.root.add(o));
    st.boneCaps = new THREE.Group(); st.boneCaps.name = 'boneCaps'; st.root.add(st.boneCaps);
    st.ready = true; st.loadMs = Math.round(performance.now() - t0);
    window.__anatLoadMs = st.loadMs;
    apply(); renderPanel(); C.requestRender();
  }).catch(e => { console.error('anatomy load failed', e); st.err = String(e); renderPanel(); });
  // pointer picking
  const el = C.renderer.domElement; let down = null;
  el.addEventListener('pointermove', e => { if (e.pointerType === 'mouse' && !e.buttons) pick(e, false); });
  el.addEventListener('pointerdown', e => { down = [e.clientX, e.clientY]; });
  el.addEventListener('pointerup', e => { if (down && Math.hypot(e.clientX - down[0], e.clientY - down[1]) < 6 && e.pointerType !== 'mouse') pick(e, true); down = null; });
  el.addEventListener('pointerleave', () => setHover(null));
}

// ---------- layer state ----------
export function setDepth(k, re = true) {
  st.depth = Math.max(0, Math.min(LAYERS.length - 1, Math.round(k)));
  LAYERS.forEach((l, i) => { st.layer[l] = i < st.depth ? 0 : (l === 'bone' ? 2 : (st.layer[l] === 0 ? 2 : st.layer[l])); });
  if (re) { apply(); renderPanel(); }
}
export function setLayer(l, v, re = true) { st.layer[l] = v; if (re) { apply(); renderPanel(); } }
export function softOn() { return LAYERS.slice(0, 8).some(l => st.layer[l] > 0); }
export function apply() {
  const cut = C.st.cut;
  const planes = [...(cut ? [clipCut] : []), ...(st.slice ? [clipSlice] : [])];
  clipCut.constant = C.E.Cb(0)[1];
  st.parts.forEach(o => {
    const s = st.layer[o.userData.layer] ?? 2, m = o.material, base = m.userData.base;
    o.visible = s > 0;
    const ghost = s === 1, thin = base < 1;
    m.transparent = ghost || thin; m.opacity = ghost ? (thin ? base * 0.5 : 0.72) : base;
    m.userData.u.uGhost.value = ghost ? 1 : 0; m.depthWrite = !(ghost || thin);
    m.side = ghost ? THREE.FrontSide : THREE.DoubleSide;
    m.clippingPlanes = planes; m.needsUpdate = true;
    o.renderOrder = ghost || thin ? 20 + (LAYERS.length - LAYERS.indexOf(o.userData.layer)) : 0;
  });
  // solid cut faces: shown for solid layers only; y-caps for the 3D slice, z-caps for 剖面
  st.caps.forEach(o => {
    const on = o.userData.cap === 'y' ? st.slice : cut;
    o.visible = on && (st.layer[o.userData.layer] ?? 2) === 2;
    o.material.clippingPlanes = o.userData.cap === 'y' ? (cut ? [clipCut] : []) : (st.slice ? [clipSlice] : []);
  });
  // skin layer drives the contour skin mesh of the fracture model
  const sk = st.layer.skin; C.setSoft(sk > 0, sk === 1 ? 0.5 : 0.92);
  // 3D slice clips the bone / implant materials; skin and cast are also clipped by the 剖面 plane (built whole in v0.4)
  Object.entries(C.M).forEach(([k, m]) => { if (m && m.isMaterial) { const pl = st.slice ? [clipSlice] : []; if ((k === 'skin' || k === 'cast') && cut) pl.push(clipCut); m.clippingPlanes = pl; } });
  updateBoneCaps();
  C.requestRender();
}
export function slice3D(on) {
  st.slice = on;
  if (on) { st.depth = 0; LAYERS.forEach(l => (st.layer[l] = 2)); }   // atlas look: every layer solid, cut faces capped
  apply(); renderPanel(); if (on) setView('slice', false, true); $('#xsBtn3')?.classList.toggle('on', on);
}
// ---------- fracture-model bone caps at the slice plane (cortex, canal, callus, nail/plate, fibula) ----------
const bcMat = {};
function bcm(col) { return bcMat[col] || (bcMat[col] = new THREE.MeshStandardMaterial({ color: col, roughness: 0.85, side: THREE.DoubleSide })); }
function ringGeo(y, ctr, rin, rout, n = 96, th0 = 0, th1 = Math.PI * 2) {
  const pos = [], idx = [], full = th1 - th0 >= Math.PI * 2 - 1e-6, m = full ? n : n + 1;
  for (let i = 0; i < m; i++) { const th = th0 + (th1 - th0) * i / n, c = Math.cos(th), s2 = Math.sin(th), a = rin ? rin(th) : 0, b = rout(th);
    pos.push(ctr[0] + a * c, y, ctr[1] + a * s2, ctr[0] + b * c, y, ctr[1] + b * s2); }
  for (let i = 0; i < n; i++) { const j = full ? (i + 1) % n : i + 1; idx.push(2 * i, 2 * j, 2 * i + 1, 2 * i + 1, 2 * j, 2 * j + 1); }
  const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); g.setIndex(idx); g.computeVertexNormals(); return g;
}
export function updateBoneCaps() {
  const G = st.boneCaps; if (!G) return;
  G.children.slice().forEach(c => { c.geometry.dispose(); G.remove(c); });
  const show = st.slice && (st.layer.bone ?? 2) === 2; G.visible = show; if (!show) return;
  const E = C.E, S = C.getS ? C.getS() : null, y = -0.006, fix = C.st.fix;
  const add = (geo, col, dy = 0, name) => { const m = new THREE.Mesh(geo, bcm(col)); m.position.y = dy; m.renderOrder = 2; m.userData = { anat: true, isCap: true, layer: 'bone', zh: name[0], en: name[1] }; m.material.clippingPlanes = C.st.cut ? [clipCut] : []; G.add(m); };
  const cb = E.Cb(y), gapVis = S && (S.primary ? S.lineVis > 0.04 : S.Lm < 0.995);
  const tissue = C.M.tissue ? '#' + C.M.tissue.color.getHexString() : '#c96';
  add(ringGeo(y, cb, th => E.Rc(y, th), th => E.Rb(y, th)), gapVis ? tissue : '#f0e4c6', 0, gapVis ? ['骨折间隙组织', 'Fracture-gap tissue'] : ['胫骨骨皮质', 'Tibial cortex']);
  add(ringGeo(y, cb, null, th => E.Rc(y, th) * 0.998), '#d9a548', -0.001, ['骨髓腔（黄骨髓）', 'Medullary canal (yellow marrow)']);
  if (S && !S.primary && (S.A || 0) > 0.004) {
    const tmp = new THREE.Color(); E.callusColor(S, 0, 0.6, tmp);
    add(ringGeo(y, cb, th => E.Rb(y, th) * 0.999, th => E.Rb(y, th) + Math.max(0.002, E.callusT(S, 0, th))), '#' + tmp.getHexString(), 0.001, ['外骨痂', 'External callus']);
  }
  if (S && S.H > 0.35) add(ringGeo(y, cb, th => E.Rb(y, th) + (S.A > 0.004 ? E.callusT(S, 0, th) : 0), th => E.Rb(y, th) + (S.A > 0.004 ? E.callusT(S, 0, th) : 0) + Math.max(0.002, E.hemT(S, 0, th))), '#6a0f1c', 0.001, ['骨折血肿', 'Fracture haematoma']);
  if (fix === 'nail') { const nc = E.nailCenter(y); add(ringGeo(y, nc, () => E.NAIL.rin, () => E.NAIL.r, 40), '#9aa8b8', 0.003, ['髓内钉（钛合金）', 'IM nail (titanium)']); add(ringGeo(y, nc, null, () => E.NAIL.rin, 24), '#2a3140', 0.003, ['髓内钉中空管道', 'Nail cannulation']); }
  if (fix === 'plate') { const pa = E.plateArc(0) / 2; add(ringGeo(y, cb, th => E.Rb(y, th) + 0.02, th => E.Rb(y, th) + 0.02 + E.PLATE.t, 16, E.PLATE.th - pa, E.PLATE.th + pa), '#9aa8b8', 0.003, ['加压钢板', 'Compression plate']); }
  const cf = E.Cf(y);
  add(ringGeo(y, cf, th => E.Rfc(y, th), th => E.Rf(y, th), 48), '#f0e4c6', 0, ['腓骨骨皮质', 'Fibular cortex']);
  add(ringGeo(y, cf, null, th => E.Rfc(y, th) * 0.998, 32), '#d9a548', -0.001, ['腓骨髓腔', 'Fibular medullary cavity']);
}

// ---------- hover / tap labels ----------
const ray = new THREE.Raycaster(), ndc = new THREE.Vector2();
function pick(e, tap) {
  if (!st.ready) return;
  const r = C.renderer.domElement.getBoundingClientRect();
  ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
  ray.setFromCamera(ndc, C.camera);
  const cand = [...st.parts, ...st.caps, ...(st.boneCaps ? st.boneCaps.children : [])].filter(o => o.visible && (o.parent?.visible ?? true));
  const boneM = [C.meshes.tibP, C.meshes.tibD, C.meshes.fib].filter(Boolean);
  const hits = ray.intersectObjects([...cand, ...boneM], false).filter(h => {
    const pl = h.object.material.clippingPlanes || []; return pl.every(p => p.distanceToPoint(h.point) >= 0);
  });
  const solid = hits.find(h => !h.object.userData.anat || h.object.userData.isCap || st.layer[h.object.userData.layer] === 2);
  const h = solid || hits[0];
  setHover(h ? h.object : null, e.clientX, e.clientY, tap);
}
const BONE_NAMES = { tibP: ['胫骨（近端骨块）', 'Tibia (proximal fragment)'], tibD: ['胫骨（远端骨块）', 'Tibia (distal fragment)'], fib: ['腓骨', 'Fibula'] };
let tipTimer = 0;
function setHover(o, x, y, tap) {
  if (st.hover && st.hover !== o && st.hover.material.userData?.u) st.hover.material.userData.u.uHi.value = 0;
  st.hover = o; const tip = $('#atip');
  if (!o) { tip.style.opacity = 0; C.requestRender(); return; }
  if (o.material.userData?.u) o.material.userData.u.uHi.value = 1;
  let zh, en, sub = '';
  if (o.userData.anat) { zh = o.userData.zh; en = o.userData.en; sub = (o.userData.isCap ? (C.st.lang === 'zh' ? '截面 · ' : 'Cut face · ') : '') + (A().layers[o.userData.layer] || ''); }
  else { const k = Object.keys(BONE_NAMES).find(k => C.meshes[k] === o) || 'fib'; [zh, en] = BONE_NAMES[k]; sub = A().layers.bone; }
  tip.innerHTML = `<b>${C.st.lang === 'zh' ? zh : en}</b><small>${C.st.lang === 'zh' ? en : zh}</small><em>${sub}</em>`;
  tip.style.left = Math.min(innerWidth - 220, x + 14) + 'px'; tip.style.top = Math.max(8, y - 12) + 'px'; tip.style.opacity = 1;
  clearTimeout(tipTimer); if (tap) tipTimer = setTimeout(() => setHover(null), 2600);
  C.requestRender();
}

// ---------- standard views ----------
// directions in the bone (anatomical) frame; axial views carry a small offset so that anterior is "up" on screen
const VIEWS = {
  ant: [0, 0, 1], post: [0, 0, -1], med: [1, 0, 0], lat: [-1, 0, 0],
  prox: [0, 1, -0.02], dist: [0, -1, 0.02], obl: [-0.72, 0.12, 0.69], oblm: [0.72, 0.12, 0.69], reset: [-0.33, 0.22, 0.92], slice: [-0.16, 0.92, 0.36]
};
const tw = { on: false };
export function setView(name, instant = false, close = false) {
  const cam = C.camera, ctl = C.controls;
  const zoom = name === 'zoom' || close;
  const dirLocal = name === 'zoom' ? cam.position.clone().sub(ctl.target).normalize().applyQuaternion(C.bone.quaternion.clone().invert()) : new THREE.Vector3(...VIEWS[name]).normalize();
  const dir = dirLocal.clone().applyQuaternion(C.bone.quaternion);
  const tgtLocal = name === 'slice' ? new THREE.Vector3(-0.6, -2.2, -2.0) : zoom ? new THREE.Vector3(C.E.Cb(0)[0], 0, C.E.Cb(0)[1]) : new THREE.Vector3(0, 0, 0);
  const tgt = tgtLocal.applyMatrix4(C.bone.matrixWorld);
  const dist = C.getFrameD() * (name === 'slice' ? 0.42 : zoom ? 0.55 : 1);
  tw.p0 = cam.position.clone().sub(ctl.target); tw.t0v = ctl.target.clone();
  tw.d0 = tw.p0.length(); tw.u0 = tw.p0.clone().normalize(); tw.u1 = dir; tw.d1 = dist; tw.t1v = tgt;
  tw.start = performance.now(); tw.ms = instant ? 1 : 900; tw.on = true;
  st.view = name;
  if (name === 'ant' || name === 'post') C.setXrView('ap');
  if (name === 'lat' || name === 'med') C.setXrView('lat');
  document.querySelectorAll('#viewbar button').forEach(b => b.classList.toggle('on', b.dataset.v === name || (name === 'slice' && b.dataset.v === 'prox')));
  C.stopTour?.();
}
export function tick(now) {
  if (!tw.on) return false;
  const k = Math.min(1, (now - tw.start) / tw.ms), e = k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
  // slerp direction (handle antipodal)
  const u0 = tw.u0, u1 = tw.u1; let dot = THREE.MathUtils.clamp(u0.dot(u1), -1, 1);
  let u;
  if (dot > 0.9995) u = u0.clone().lerp(u1, e).normalize();
  else {
    let axis = new THREE.Vector3().crossVectors(u0, u1);
    if (axis.lengthSq() < 1e-8) axis = new THREE.Vector3(0, 1, 0).cross(u0).lengthSq() > 1e-6 ? new THREE.Vector3(0, 1, 0).cross(u0) : new THREE.Vector3(1, 0, 0);
    axis.normalize(); u = u0.clone().applyAxisAngle(axis, Math.acos(dot) * e);
  }
  const d = THREE.MathUtils.lerp(tw.d0, tw.d1, e);
  C.controls.target.lerpVectors(tw.t0v, tw.t1v, e);
  C.camera.position.copy(C.controls.target).addScaledVector(u, d);
  C.camera.lookAt(C.controls.target);
  if (k >= 1) tw.on = false;
  return true;
}

// ---------- orientation gizmo + screen-edge labels ----------
const AX = [['A', [0, 0, 1], '#5ee7ff'], ['P', [0, 0, -1], '#5ee7ff'], ['M', [1, 0, 0], '#ffb547'], ['L', [-1, 0, 0], '#ffb547'], ['S', [0, 1, 0], '#7dffb2'], ['I', [0, -1, 0], '#7dffb2']];
const AXV = { A: 'ant', P: 'post', M: 'med', L: 'lat', S: 'prox', I: 'dist' };
let gzHits = [];
const _q = new THREE.Quaternion(), _v = new THREE.Vector3();
export function drawGizmo() {
  const cv = $('#gizmo'); if (!cv) return;
  const dpr = Math.min(devicePixelRatio || 1, 2), S = cv.clientWidth; if (cv.width !== S * dpr) { cv.width = cv.height = S * dpr; }
  const g = cv.getContext('2d'); g.setTransform(dpr, 0, 0, dpr, 0, 0); g.clearRect(0, 0, S, S);
  const R = S * 0.34, cx = S / 2, cy = S / 2;
  g.beginPath(); g.arc(cx, cy, S * 0.47, 0, Math.PI * 2); g.fillStyle = 'rgba(6,12,30,.55)'; g.fill(); g.strokeStyle = 'rgba(140,180,255,.25)'; g.stroke();
  _q.copy(C.camera.quaternion).invert();
  const items = AX.map(([k, d, col]) => { _v.set(...d).applyQuaternion(C.bone.quaternion).applyQuaternion(_q); return { k, col, x: cx + _v.x * R, y: cy - _v.y * R, z: _v.z }; }).sort((a, b) => a.z - b.z);
  gzHits = [];
  const lab = A().axes, small = S < 90;
  items.forEach(it => {
    const front = it.z > -0.05;
    g.globalAlpha = front ? 1 : 0.45;
    g.strokeStyle = it.col; g.lineWidth = 1.6; g.beginPath(); g.moveTo(cx, cy); g.lineTo(it.x, it.y); g.stroke();
    const rr = small ? 9 : 11;
    g.beginPath(); g.arc(it.x, it.y, rr, 0, Math.PI * 2); g.fillStyle = front ? it.col : 'rgba(20,30,60,.9)'; g.fill(); g.strokeStyle = it.col; g.stroke();
    g.fillStyle = front ? '#04122a' : it.col; g.font = `700 ${small ? 9.5 : 11}px -apple-system,"PingFang SC","Noto Sans SC",sans-serif`; g.textAlign = 'center'; g.textBaseline = 'middle';
    g.fillText(lab[it.k].length > 2 ? lab[it.k].slice(0, 1) : lab[it.k], it.x, it.y + 0.5);
    gzHits.push({ k: it.k, x: it.x, y: it.y, r: rr + 3, z: it.z });
  });
  g.globalAlpha = 1;
  // screen-edge labels
  const right = new THREE.Vector3(1, 0, 0).applyQuaternion(C.camera.quaternion), up = new THREE.Vector3(0, 1, 0).applyQuaternion(C.camera.quaternion);
  const toLocal = C.bone.quaternion.clone().invert();
  const best = v => { const l = v.clone().applyQuaternion(toLocal); let bk = null, bd = 0.62; AX.forEach(([k, d]) => { const dd = l.x * d[0] + l.y * d[1] + l.z * d[2]; if (dd > bd) { bd = dd; bk = k; } }); return bk; };
  const full = { A: ['前', 'Anterior'], P: ['后', 'Posterior'], M: ['内', 'Medial'], L: ['外', 'Lateral'], S: ['近', 'Proximal'], I: ['远', 'Distal'] };
  const zh = C.st.lang === 'zh';
  [['r', right], ['l', right.clone().negate()], ['t', up], ['b', up.clone().negate()]].forEach(([id, v]) => {
    const el = document.getElementById('ol-' + id); if (!el) return; const k = best(v);
    el.style.opacity = k ? 1 : 0; if (k) el.textContent = zh ? full[k][0] : full[k][1];
  });
  positionEdgeLabels();
}
function positionEdgeLabels() {
  const f = C.frame(); if (!f) return;
  const set = (id, x, y) => { const el = document.getElementById('ol-' + id); if (el) { el.style.left = x + 'px'; el.style.top = y + 'px'; } };
  set('l', f.x0 + 4, (f.y0 + f.y1) / 2); set('r', f.x1 - 4, (f.y0 + f.y1) / 2); set('t', (f.x0 + f.x1) / 2, f.y0 + 4); set('b', (f.x0 + f.x1) / 2, f.y1 - 4);
}

// ---------- DOM ----------
function buildDOM() {
  const vb = document.createElement('div'); vb.id = 'viewbar'; vb.className = 'glass'; document.body.appendChild(vb);
  const gz = document.createElement('canvas'); gz.id = 'gizmo'; document.body.appendChild(gz);
  const vt = document.createElement('button'); vt.id = 'viewTgl'; vt.className = 'ibtn'; document.body.appendChild(vt);
  ['l', 'r', 't', 'b'].forEach(k => { const d = document.createElement('div'); d.id = 'ol-' + k; d.className = 'olab ol-' + k; document.body.appendChild(d); });
  const tip = document.createElement('div'); tip.id = 'atip'; document.body.appendChild(tip);
  const p = document.createElement('section'); p.id = 'anat'; p.className = 'glass'; ($('#left') || document.body).appendChild(p);
  const xs = document.createElement('div'); xs.id = 'xsec'; xs.innerHTML = '<div class="box glass"><div class="hdr"><b id="xsH"></b><button class="ibtn" id="xsX"></button></div><canvas id="xsc" width="760" height="620"></canvas><div class="ft"><span id="xsN"></span><button class="ibtn hot" id="xsLink"></button></div></div>'; document.body.appendChild(xs);
  const cr = document.createElement('div'); cr.id = 'anatCredit'; document.body.appendChild(cr);
  vb.addEventListener('click', e => { const b = e.target.closest('button'); if (b) { setView(b.dataset.v); if (innerWidth < 900) vb.classList.remove('open'); } });
  vt.addEventListener('click', () => vb.classList.toggle('open'));
  gz.addEventListener('click', e => { const r = gz.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top; const h = gzHits.filter(h => Math.hypot(h.x - x, h.y - y) < h.r).sort((a, b) => b.z - a.z)[0]; if (h) setView(AXV[h.k]); });
  $('#xsX').onclick = () => xs.classList.remove('on');
  xs.addEventListener('click', e => { if (e.target.id === 'xsec') xs.classList.remove('on'); });
  $('#xsLink').onclick = () => { xs.classList.remove('on'); C.gotoCompartment(); };
  p.addEventListener('input', e => { if (e.target.id === 'depthR') { setDepth(+e.target.value); } });
  p.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    if (b.dataset.l) { setLayer(b.dataset.l, +b.dataset.s); }
    if (b.id === 'xsBtn') openSection();
    if (b.id === 'xsBtn3') slice3D(!st.slice);
    if (b.id === 'anatX') setPanel(false);
    if (b.id === 'anatReset') { LAYERS.forEach(l => (st.layer[l] = DEFAULT_STATE[l])); st.depth = 3; apply(); renderPanel(); }
  });
  renderStatic();
}
export function renderStatic() {
  const a = A();
  $('#viewbar').innerHTML = ['ant', 'post', 'med', 'lat', 'prox', 'dist', 'obl', 'oblm', 'reset', 'zoom'].map(v => `<button data-v="${v}" class="${v === st.view ? 'on' : ''}${v === 'reset' || v === 'zoom' ? ' sp' : ''}">${a.views[v]}</button>`).join('');
  $('#viewTgl').textContent = C.st.lang === 'zh' ? '视图 ▾' : 'Views ▾';
  $('#xsH').textContent = a.xsH; $('#xsX').textContent = a.close; $('#xsN').textContent = a.xsNote; $('#xsLink').textContent = a.xsLink;
  $('#anatCredit').textContent = a.credit;
  renderPanel();
}
export function setPanel(on) { st.panel = on; document.body.classList.toggle('anat-on', on); renderPanel(); C.relayout(); }
export function panelOn() { return st.panel; }
function renderPanel() {
  const p = $('#anat'); if (!p) return; const a = A(); const zh = C.st.lang === 'zh';
  document.body.classList.toggle('anat-on', st.panel);
  const cnt = l => st.parts.filter(o => o.userData.layer === l).length + (l === 'skin' ? 1 : 0) + (l === 'bone' ? 2 : 0);
  const refs = s => C.refHTML(s);
  p.innerHTML = `<div class="ah"><span class="k">${a.panel}</span><span class="aright"><button class="mini" id="anatReset">↺</button><button class="mini" id="anatX">✕</button></span></div>
  <label class="dl">${a.depth}<b class="mono">${st.depth} / ${LAYERS.length - 1}</b></label>
  <input type="range" id="depthR" min="0" max="${LAYERS.length - 1}" step="1" value="${st.depth}">
  <div class="dticks"><span>${zh ? '浅' : 'superficial'}</span><span>${zh ? '深' : 'deep'}</span></div>
  <div class="btns" style="margin:0 0 7px"><button class="btn pri" id="xsBtn">${a.xs}</button><button class="btn${st.slice ? ' on' : ''}" id="xsBtn3">${a.xs3d}</button></div>
  <div class="lrows">${LAYERS.map((l, i) => `<div class="lrow${st.layer[l] ? '' : ' off'}" title="${(a.layersLong || a.layers)[l]}"><span class="li">${i}</span><span class="ln">${a.layers[l]}<small>${st.ready || l === 'skin' ? cnt(l) : '…'}</small></span><span class="ls">${[0, 1, 2].map(s => `<button data-l="${l}" data-s="${s}" class="${st.layer[l] === s ? 'on s' + s : ''}" title="${a.st[s]}">${a.st[s].slice(0, zh ? 1 : 1)}</button>`).join('')}</span></div>`).join('')}</div>
  <p class="hint">${st.err ? '⚠ ' + st.err : (st.ready ? a.hint : (zh ? '正在加载解剖网格…' : 'Loading anatomy meshes…'))}</p>
  <details class="tie"><summary>${a.tie}</summary><ul>${a.tieB.map(x => `<li>${refs(x)}</li>`).join('')}</ul></details>
  <p class="hint" style="font-size:9.5px;color:var(--dim)">BodyParts3D, © The Database Center for Life Science licensed under CC Attribution-Share Alike 2.1 Japan · <a href="https://github.com/LluisV/Z-Anatomy" target="_blank" rel="noopener">Z-Anatomy</a> CC BY-SA 4.0 · ${zh ? '衍生网格以 CC BY-SA 4.0 共享，非商业教学' : 'derived meshes CC BY-SA 4.0, non-commercial teaching'}${refs('[[BP3D]]')}</p>`;
}

// ---------- cross-section (2D atlas plate: partitioned real-mesh polygons at y = 0) ----------
const COMP_COL = { ant: '#4f8cff', lat: '#38c98a', sp: '#ff9a3c', dp: '#b07cff' };
const SHORT = { ta: ['胫骨前肌', 'Tibialis anterior'], edl: ['趾长伸肌', 'Ext. digitorum longus'], ehl: ['踇长伸肌', 'Ext. hallucis longus'], fl: ['腓骨长肌', 'Fibularis longus'], fb: ['腓骨短肌', 'Fibularis brevis'], gasm: ['腓肠肌内侧头', 'Gastrocnemius (med.)'], gasl: ['腓肠肌外侧头', 'Gastrocnemius (lat.)'], sol: ['比目鱼肌', 'Soleus'], plant: ['跖肌腱', 'Plantaris tendon'], tp: ['胫骨后肌', 'Tibialis posterior'], fdl: ['趾长屈肌', 'Flex. digitorum longus'], fhl: ['踇长屈肌', 'Flex. hallucis longus'], tibia: ['胫骨', 'Tibia'], fibula: ['腓骨', 'Fibula'], tibn: ['胫神经', 'Tibial n.'], dfn: ['腓深神经', 'Deep fibular n.'], sfn: ['腓浅神经', 'Superficial fibular n.'], ata: ['胫前动脉', 'Anterior tibial a.'], atv: ['胫前静脉', 'Anterior tibial vv.'], pta: ['胫后动脉', 'Posterior tibial a.'], ptv: ['胫后静脉', 'Posterior tibial vv.'], fiba: ['腓动脉', 'Fibular a.'], fibv: ['腓静脉', 'Fibular vv.'], gsv: ['大隐静脉', 'Great saphenous v.'], ssv: ['小隐静脉', 'Small saphenous v.'], iom: ['小腿骨间膜', 'Interosseous membrane'], saphn: ['隐神经', 'Saphenous n.'], sural: ['腓肠神经', 'Sural n.'], tims: ['小腿横肌间隔', 'Transverse intermuscular septum'], aims: ['小腿前肌间隔', 'Anterior intermuscular septum'], pims: ['小腿后肌间隔', 'Posterior intermuscular septum'], crural: ['小腿筋膜', 'Crural fascia'], fat: ['皮下脂肪（示意）', 'Subcutaneous fat (schematic)'], skin: ['皮肤（示意）', 'Skin (schematic)'] };
export function openSection() {
  $('#xsec').classList.add('on'); drawSection();
}
const mix = (a, b, t) => { const A = new THREE.Color(a), B = new THREE.Color(b); return '#' + A.lerp(B, t).getHexString(); };
function drawSection() {
  const cv = $('#xsc'); const mob = innerWidth < 640; const js = st.json; const zh = C.st.lang === 'zh';
  cv.width = mob ? 640 : 900;
  cv.style.width = mob ? '94vw' : 'min(900px,92vw)';
  const cssW = Math.min(mob ? innerWidth * 0.94 : Math.min(900, innerWidth * 0.92), 900), k = cv.width / cssW;  // canvas px per CSS px
  const FS = 13 * k, FSs = 12 * k;   // ≥ 12 CSS px everywhere
  const nLab = js ? js.sections.filter(q => SHORT[q.key] && q.polys.length).length : 0, legendH = Math.ceil(nLab / 2) * FS * 1.32;
  const maxH = mob ? Math.floor(cv.width * (innerHeight * 0.74) / cssW) : 640;
  const plotHm = Math.min(cv.width - 40, maxH - 26 - 12 - legendH - 16 - 1.6 * FS);
  cv.height = mob ? Math.round(26 + plotHm + 12 + legendH + 16 + 1.6 * FS) : 640;
  const g = cv.getContext('2d'), W = cv.width, H = cv.height;
  g.fillStyle = '#060b1d'; g.fillRect(0, 0, W, H);
  if (!js) { g.fillStyle = '#8d9bbd'; g.fillText('…', W / 2, H / 2); return; }
  const S = js.sections, by = key => S.find(q => q.key === key);
  let x0 = Infinity, x1 = -Infinity, z0 = Infinity, z1 = -Infinity;
  (by('skin') || S[0]).polys.forEach(p => p.o.forEach(([x, z]) => { x0 = Math.min(x0, x); x1 = Math.max(x1, x); z0 = Math.min(z0, z); z1 = Math.max(z1, z); }));
  // layout: desktop — leader lines to both sides; mobile — numbered markers + legend below
  const COL = mob ? 0 : 205, plotH = mob ? plotHm : H - 70, plotW = W - 2 * COL - (mob ? 30 : 10);
  const sc = Math.min(plotW / (x1 - x0), plotH / (z1 - z0));
  const cxp = COL + (W - 2 * COL) / 2, cyp = mob ? 26 + plotH / 2 : H / 2 + 4;
  const ox = cxp - (x0 + x1) / 2 * sc, oz = cyp + (z0 + z1) / 2 * sc;
  const P = (x, z) => [ox + x * sc, oz - z * sc];   // viewed from distal, anterior up: medial (+x) on the right
  const path = poly => { g.beginPath(); [poly.o, ...poly.h].forEach(r => r.forEach((q, i) => { const [a, b] = P(q[0], q[1]); i ? g.lineTo(a, b) : g.moveTo(a, b); })); };
  const fillS = (sec, fill, stroke, lw = 1) => sec && sec.polys.forEach(p => { path(p); g.fillStyle = fill; g.fill('evenodd'); if (stroke) { g.strokeStyle = stroke; g.lineWidth = lw; g.stroke(); } });
  const KC = { artery: '#e3263f', vein: '#3a5ad6', nerve: '#f4cb3a', fat: '#efcd6a', skin: '#e2a487', fascia: '#f4f1e6', septum: '#f4f1e6', membrane: '#e9dcb8', areolar: '#bfa596', tendon: '#ece4d0' };
  // compartment underlay (soft tint around each group)
  const compLab = {};
  ['ant', 'lat', 'sp', 'dp'].forEach(c => {
    const ms = S.filter(q => q.comp === c && (q.kind === 'muscle' || q.kind === 'tendon')); if (!ms.length) return;
    let mx = 0, mz = 0, n = 0, A = 0; ms.forEach(q => q.polys.forEach(p => { let a = 0; for (let i = 0; i < p.o.length - 1; i++) a += p.o[i][0] * p.o[i + 1][1] - p.o[i + 1][0] * p.o[i][1]; a = Math.abs(a / 2); p.o.forEach(([x, z]) => { mx += x * a; mz += z * a; n += a; }); A += a; }));
    compLab[c] = [mx / n, mz / n];
  });
  S.forEach(q => { if (q.kind === 'areolar' || q.kind === 'fat' || q.kind === 'skin') fillS(q, KC[q.kind], null); });
  S.filter(q => q.kind === 'muscle').forEach(q => fillS(q, mix('#b3463c', COMP_COL[q.comp] || '#b3463c', 0.08), COMP_COL[q.comp] || '#3a0c08', 1.8 * k));
  S.filter(q => q.kind === 'tendon').forEach(q => fillS(q, KC.tendon, '#6b6252', 0.8 * k));
  S.filter(q => ['fascia', 'septum', 'membrane'].includes(q.kind)).forEach(q => fillS(q, KC[q.kind], null));
  // bones: real cortex outline + canal from the fracture model
  const E = C.E;
  ['tibia', 'fibula'].forEach(b => fillS(by(b), '#f1e5c7', '#fff7e2', 1.2 * k));
  { const [cx, cz] = E.Cb(0); g.beginPath(); for (let i = 0; i <= 64; i++) { const th = i / 64 * Math.PI * 2, r = E.Rc(0, th), [a, b2] = P(cx + r * Math.cos(th), cz + r * Math.sin(th)); i ? g.lineTo(a, b2) : g.moveTo(a, b2); } g.fillStyle = '#d6a24a'; g.fill(); }
  { const [cx, cz] = E.Cf(0); g.beginPath(); for (let i = 0; i <= 48; i++) { const th = i / 48 * Math.PI * 2, r = E.Rfc(0, th), [a, b2] = P(cx + r * Math.cos(th), cz + r * Math.sin(th)); i ? g.lineTo(a, b2) : g.moveTo(a, b2); } g.fillStyle = '#d6a24a'; g.fill(); }
  S.filter(q => KC[q.kind] && ['artery', 'vein', 'nerve'].includes(q.kind)).forEach(q => fillS(q, KC[q.kind], '#0b1430', 0.8 * k));
  // labels
  const area = p => { let a = 0; for (let i = 0; i < p.o.length - 1; i++) a += p.o[i][0] * p.o[i + 1][1] - p.o[i + 1][0] * p.o[i][1]; return Math.abs(a / 2); };
  const cen = q => { let best = q.polys[0]; q.polys.forEach(p => { if (area(p) > area(best)) best = p; });
    if (q.key === 'saphn') { const gv = by('gsv'); if (gv) { const gc = gv.polys[0].o[0]; best = q.polys.reduce((a, b) => Math.hypot(b.o[0][0] - gc[0], b.o[0][1] - gc[1]) < Math.hypot(a.o[0][0] - gc[0], a.o[0][1] - gc[1]) ? b : a); } }
    let x = 0, z = 0; best.o.forEach(([a, b]) => { x += a; z += b; }); x /= best.o.length; z /= best.o.length;
    if (['fascia', 'septum', 'membrane', 'fat', 'skin'].includes(q.kind)) {   // bands/rings: anchor on the band itself
      const ANG = { skin: -2.0, fat: -2.6, crural: 2.3 }; let tx = x, tz = z;
      if (ANG[q.key] !== undefined) { tx = x + 20 * Math.cos(ANG[q.key]); tz = z + 20 * Math.sin(ANG[q.key]); }
      let bd = 1e9, bp = best.o[0]; best.o.forEach(pt => { const d = Math.hypot(pt[0] - tx, pt[1] - tz); if (d < bd) { bd = d; bp = pt; } });
      if (ANG[q.key] !== undefined) { const ins = { crural: 0, skin: 0.09, fat: 0.3 }[q.key]; return [bp[0] - ins * Math.cos(ANG[q.key]), bp[1] - ins * Math.sin(ANG[q.key])]; }
      return bp; }
    return [x, z]; };
  const items = S.filter(q => SHORT[q.key] && q.polys.length).map(q => ({ q, c: cen(q) }));
  const colOf = q => KC[q.kind] && !['fascia', 'septum', 'membrane', 'areolar'].includes(q.kind) ? (q.kind === 'tendon' ? '#e8dcc0' : KC[q.kind]) : q.kind === 'muscle' ? mix('#ff8f7f', COMP_COL[q.comp] || '#ff8f7f', 0.35) : q.kind === 'bone' ? '#f1e5c7' : '#dfe7ff';
  g.textBaseline = 'middle';
  if (!mob) {
    const mid = (x0 + x1) / 2;
    const left = items.filter(i => i.c[0] < mid).sort((a, b) => b.c[1] - a.c[1]), right = items.filter(i => i.c[0] >= mid).sort((a, b) => b.c[1] - a.c[1]);
    const place = (arr, side) => { const top = 26, bot = H - 30, n = arr.length; arr.forEach((it, i) => {
      const [px, py] = P(...it.c); const ly = n > 1 ? top + (bot - top) * i / (n - 1) : py, lx = side < 0 ? 14 : W - 14;
      g.strokeStyle = 'rgba(200,215,255,.5)'; g.lineWidth = 1; g.beginPath(); g.moveTo(px, py); g.lineTo(side < 0 ? COL - 4 : W - COL + 4, ly); g.lineTo(side < 0 ? lx + COL - 24 : lx - COL + 24, ly); g.stroke();
      g.beginPath(); g.arc(px, py, 2.6, 0, 7); g.fillStyle = '#fff'; g.fill();
      g.font = `600 ${FS}px -apple-system,"PingFang SC","Noto Sans SC",sans-serif`; g.fillStyle = colOf(it.q); g.textAlign = side < 0 ? 'left' : 'right'; g.fillText(SHORT[it.q.key][zh ? 0 : 1], lx, ly); }); };
    place(left, -1); place(right, 1);
  } else {
    items.sort((a, b) => b.c[1] - a.c[1] || a.c[0] - b.c[0]);
    items.forEach((it, i) => { const [px, py] = P(...it.c); const r = 10.5 * k * 0.62; g.beginPath(); g.arc(px, py, r, 0, 7); g.fillStyle = 'rgba(6,11,29,.82)'; g.fill(); g.strokeStyle = colOf(it.q); g.lineWidth = 1.4; g.stroke();
      g.font = `700 ${FSs * 0.85}px ui-monospace,Menlo,monospace`; g.fillStyle = '#fff'; g.textAlign = 'center'; g.fillText(String(i + 1), px, py + 0.5); });
    const top = 26 + plotH + 12 + 1.6 * FS, cols = 2, rowH = FS * 1.32, cw = (W - 24) / cols;
    items.forEach((it, i) => { const cx = 12 + (i % cols) * cw, cy = top + Math.floor(i / cols) * rowH + rowH / 2;
      g.font = `700 ${FSs}px ui-monospace,Menlo,monospace`; g.fillStyle = '#8d9bbd'; g.textAlign = 'left'; g.fillText(String(i + 1).padStart(2, ' '), cx, cy);
      g.font = `600 ${FS}px -apple-system,"PingFang SC","Noto Sans SC",sans-serif`; g.fillStyle = colOf(it.q); g.fillText(SHORT[it.q.key][zh ? 0 : 1], cx + FS * 1.7, cy); });
  }
  // compartment names
  g.font = `800 ${FSs}px -apple-system,"PingFang SC","Noto Sans SC",sans-serif`; g.textAlign = 'center';
  const coff = { ant: [0.35, 0.5], lat: [-1.0, 1.2], sp: [0, -0.9], dp: [0.3, 0.15] };
  Object.entries(compLab).forEach(([c, [x, z]]) => { const [px, py] = P(x + coff[c][0], z + coff[c][1]); const t = A().comp[c]; const w = g.measureText(t).width + 10 * k; g.fillStyle = 'rgba(6,11,29,.72)'; g.fillRect(px - w / 2, py - FSs * 0.7, w, FSs * 1.4); g.fillStyle = COMP_COL[c]; g.fillText(t, px, py); });
  // orientation + scale
  g.font = `800 ${FS}px -apple-system,"PingFang SC","Noto Sans SC",sans-serif`;
  const ax = zh ? ['前', '后', '外', '内'] : ['A', 'P', 'L', 'M'], midx = (x0 + x1) / 2, midz = (z0 + z1) / 2;
  const [tx, ty] = P(midx, z1); g.fillStyle = '#5ee7ff'; g.fillText(ax[0], tx, Math.max(FS * 0.7, ty - FS * 0.8)); const [bx, by2] = P(midx, z0); g.fillText(ax[1], bx, by2 + FS * 0.85);
  const [lx2, ly2] = P(x0, midz); g.fillStyle = '#ffb547'; g.fillText(ax[2], lx2 - FS * 0.9, ly2); const [rx2] = P(x1, midz); g.fillText(ax[3], rx2 + FS * 0.9, ly2);
  g.font = `600 ${FSs}px ui-monospace,Menlo,monospace`; g.fillStyle = '#8d9bbd'; g.textAlign = 'left';
  const foot = mob ? 26 + plotH + 1.75 * FS : H - 10;
  g.fillText(zh ? '右小腿 · 骨折平面 · 远端观' : 'Right leg · fracture level · from distal', 12, foot - (mob ? FSs * 0.2 : 0));
  g.strokeStyle = '#8d9bbd'; g.lineWidth = 1.5; g.beginPath(); g.moveTo(W - 14 - sc, foot - FSs * 0.6); g.lineTo(W - 14, foot - FSs * 0.6); g.stroke(); g.textAlign = 'right'; g.fillText('1 cm', W - 18 - sc, foot - (mob ? FSs * 0.2 : 0));
}
export function relang() { renderStatic(); if ($('#xsec').classList.contains('on')) drawSection(); }
export const state = st;
