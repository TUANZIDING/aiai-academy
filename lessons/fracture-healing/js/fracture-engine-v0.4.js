// fracture-engine v0.4 (v0.2 + anatomical skin table, bone/cartilage callus palette) · real tibia/fibula contours + AO-conformant healing model + DRR-style X-ray
// Units: cm. Frame: +y proximal, +x medial, +z anterior (right leg); theta = atan2(z, x). Fracture at y = 0.
import * as THREE from 'three';
import ANAT from './anatomy-v0.4.js';

// ---------- math ----------
export const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
export const ss = (a, b, x) => { const t = clamp((x - a) / (b - a)); return t * t * (3 - 2 * t); };
export const bump = (x, a, b, c, d) => ss(a, b, x) * (1 - ss(c, d, x));
export const lerp = (a, b, t) => a + (b - a) * t;
function hash3(x, y, z) { let h = (x | 0) * 374761393 + (y | 0) * 668265263 + (z | 0) * 2147483647; h = (h ^ (h >>> 13)) * 1274126177; h = h ^ (h >>> 16); return (h & 0xffff) / 0xffff; }
export function vnoise(x, y, z) {
  const xi = Math.floor(x), yi = Math.floor(y), zi = Math.floor(z);
  const xf = x - xi, yf = y - yi, zf = z - zi;
  const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf), w = zf * zf * (3 - 2 * zf);
  let r = 0;
  for (let dx = 0; dx < 2; dx++) for (let dy = 0; dy < 2; dy++) for (let dz = 0; dz < 2; dz++)
    r += (dx ? u : 1 - u) * (dy ? v : 1 - v) * (dz ? w : 1 - w) * hash3(xi + dx, yi + dy, zi + dz);
  return r;
}
export const fbm = (x, y, z) => 0.5 * vnoise(x, y, z) + 0.3 * vnoise(x * 2.1 + 7, y * 2.1, z * 2.1) + 0.2 * vnoise(x * 4.3, y * 4.3 + 3, z * 4.3);
let seed = 7;
export const rnd = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
export { hash3 };

// ---------- time axis ----------
export const DMAX = 730, KA = 5.5;
export const dayToU = d => Math.log(1 + clamp(d, 0, DMAX) / DMAX * (Math.exp(KA) - 1)) / KA;
export const uToDay = u => DMAX * (Math.exp(KA * clamp(u)) - 1) / (Math.exp(KA) - 1);

// ---------- anatomy tables ----------
function mkTable(t) {
  const n = t.y.length, nt = t.nt, ys = Float32Array.from(t.y);
  const R = new Float32Array(n * nt); t.r.forEach((row, i) => row.forEach((v, j) => (R[i * nt + j] = v)));
  const CX = Float32Array.from(t.c.map(c => c[0])), CZ = Float32Array.from(t.c.map(c => c[1]));
  const loc = y => { // index + frac
    if (y <= ys[0]) return [0, 0]; if (y >= ys[n - 1]) return [n - 2, 1];
    let lo = 0, hi = n - 1; while (hi - lo > 1) { const m = (lo + hi) >> 1; if (ys[m] <= y) lo = m; else hi = m; }
    return [lo, (y - ys[lo]) / (ys[lo + 1] - ys[lo])];
  };
  const r = (y, th) => {
    const [i, f] = loc(y);
    let a = th / (2 * Math.PI) * nt; a = ((a % nt) + nt) % nt;
    const j = Math.floor(a), g = a - j, j2 = (j + 1) % nt;
    const r0 = R[i * nt + j] * (1 - g) + R[i * nt + j2] * g, r1 = R[(i + 1) * nt + j] * (1 - g) + R[(i + 1) * nt + j2] * g;
    return r0 * (1 - f) + r1 * f;
  };
  const c = y => { const [i, f] = loc(y); return [CX[i] * (1 - f) + CX[i + 1] * f, CZ[i] * (1 - f) + CZ[i + 1] * f]; };
  // theta-mean radius (for canal shaping)
  const MEAN = new Float32Array(n); for (let i = 0; i < n; i++) { let s = 0; for (let j = 0; j < nt; j++) s += R[i * nt + j]; MEAN[i] = s / nt; }
  const mean = y => { const [i, f] = loc(y); return MEAN[i] * (1 - f) + MEAN[i + 1] * f; };
  return { r, c, mean, y0: ys[0], y1: ys[n - 1], nt };
}
export const TIB = mkTable(ANAT.tibia), FIB = mkTable(ANAT.fibula), SKIN = mkTable(ANAT.skin);
export const Y_TOP = TIB.y1, Y_BOT = TIB.y0;

// tibia outer radius / canal radius about the level centroid
export const Rb = (y, th) => TIB.r(y, th);
const tCort = y => lerp(0.5, 0.17, ss(8.5, 14, Math.abs(y)));
export const Rc = (y, th) => {
  const r = TIB.r(y, th), m = TIB.mean(y);
  const round = lerp(r, m, 0.55); // canal is rounder than the triangular outer contour (thicker crest)
  return Math.max(0.04, (round - tCort(y)) * (1 - ss(16.3, 18.1, Math.abs(y))));
};
export const Cb = y => TIB.c(y);
export const Rf = (y, th) => FIB.r(y, th);
export const Rfc = (y, th) => Math.max(0.03, (FIB.r(y, th) - lerp(0.22, 0.12, ss(10, 15, Math.abs(y + 2)))) * (1 - ss(14, 17.5, Math.abs(y + 1.8))));
export const Cf = y => FIB.c(y);
export const Rs = (y, th) => SKIN.r(y, th);
export const Cs = y => SKIN.c(y);
export const FIB_Y0 = FIB.y0, FIB_Y1 = FIB.y1, SKIN_Y0 = -20.4, SKIN_Y1 = 20.1;

// fracture line irregularity (cm): small jagged transverse line
export const JAG = 0.09;
export const jag = th => JAG * (0.55 * Math.sin(th * 3 + 0.7) + 0.3 * Math.sin(th * 7 + 2.1) + 0.15 * Math.sin(th * 13 + 0.3));

// directions
export const TH_POSTLAT = Math.atan2(-1, -1.1);   // posterolateral (muscle-covered) → thicker callus
export const TH_AM = 0.62;                         // anteromedial subcutaneous face (plate)

// ---------- implants (geometry params, cm) ----------
// reamed tibial nail: straight diaphyseal axis through canal centroids + proximal (Herzog) bend to the entry point
function fitAxis() {
  let n = 0, sy = 0, sx = 0, sz = 0, syy = 0, sxy = 0, szy = 0;
  for (let y = -12; y <= 10; y += 0.5) { const [x, z] = Cb(y); n++; sy += y; sx += x; sz += z; syy += y * y; sxy += x * y; szy += z * y; }
  const d = n * syy - sy * sy, ax = (n * sxy - sx * sy) / d, az = (n * szy - sz * sy) / d;
  return { ax, bx: (sx - ax * sy) / n, az, bz: (sz - az * sy) / n };
}
const AX = fitAxis();
export const NAIL = { r: 0.5, rin: 0.2, y0: Y_BOT + 2.0, yb: Y_TOP - 7.0, y1: Y_TOP - 1.2 };
const entry = (() => { const [x, z] = Cb(Y_TOP - 1.2); return [x + 0.15, z + Rb(Y_TOP - 1.2, Math.PI / 2) * 0.62]; })();
export function nailCenter(y) {
  const sx = AX.ax * y + AX.bx, sz = AX.az * y + AX.bz;
  if (y <= NAIL.yb) return [sx, sz];
  const bx = AX.ax * NAIL.yb + AX.bx, bz = AX.az * NAIL.yb + AX.bz;
  const t = clamp((y - NAIL.yb) / (NAIL.y1 - NAIL.yb)), e = t * t * (3 - 2 * t) * 0.6 + t * 0.4;
  return [lerp(bx + AX.ax * (y - NAIL.yb), entry[0], e), lerp(bz + AX.az * (y - NAIL.yb), entry[1], e)];
}
// locking screws: ML (axis x) unless 'ap'
export const LOCKS = [
  { y: Y_TOP - 3.4, dir: 'ml' }, { y: Y_TOP - 5.0, dir: 'obl' },
  { y: Y_BOT + 3.0, dir: 'ml' }, { y: Y_BOT + 4.3, dir: 'ml' }, { y: Y_BOT + 3.65, dir: 'ap' }
].map(s => {
  const th = s.dir === 'ml' ? 0 : s.dir === 'ap' ? Math.PI / 2 : 0.55;
  const [nx, nz] = nailCenter(s.y), [cx, cz] = Cb(s.y);
  const ext1 = Rb(s.y, th) + 0.3, ext2 = Rb(s.y, th + Math.PI) + 0.12;
  const a = [Math.cos(th), 0, Math.sin(th)];
  // screw spans from far cortex to near (head side = +a)
  const offN = (nx - cx) * a[0] + (nz - cz) * a[2];
  return { y: s.y, a, c: [nx + a[0] * ((ext1 - ext2) / 2 - offN), s.y, nz + a[2] * ((ext1 - ext2) / 2 - offN)], len: ext1 + ext2, r: 0.25, pitch: 0.2 };
});
// 8-hole narrow compression plate on the anteromedial surface, screws 18 mm apart, none across the fracture
export const PLATE = { th: TH_AM, w: 1.35, t: 0.42, y0: -7.6, y1: 7.6, holes: [-6.3, -4.5, -2.7, -0.9, 0.9, 2.7, 4.5, 6.3] };
export const plateArc = y => { const R = Rb(y, PLATE.th) + 0.02; return PLATE.w / R; };
export const PSCREWS = PLATE.holes.map(y => {
  const th = PLATE.th, a = [Math.cos(th), 0, Math.sin(th)], [cx, cz] = Cb(y);
  const near = Rb(y, th) + PLATE.t + 0.02, far = Rb(y, th + Math.PI) + 0.1;
  return { y, a, c: [cx + a[0] * (near - far) / 2, y, cz + a[2] * (near - far) / 2], len: near + far, r: 0.225, pitch: 0.175 };
});

// ---------- healing state (AO-conformant; see ao-timeline-v0.2.md) ----------
// fix: cast | nail | plate ; course: normal | delayed | atrophic
export const UNION_DAY = { nail: 126, cast: 119, plate: 130 }; // model day of radiographic union (normal course)
export function healState(d, fix = 'nail', course = 'normal') {
  const S = { d, fix, course };
  let e = d;
  if (course === 'delayed') e = d * 0.6;
  if (course === 'atrophic') e = d < 28 ? d : 28 + (d - 28) * 0.06;
  S.e = e;
  const primary = fix === 'plate';
  S.primary = primary;
  S.gap = primary ? 0.012 : 0.12;                 // cm (plate: compressed, ~0.1 mm; nail/cast: ~1 mm)
  S.H = primary ? 0.45 * (1 - ss(1, 8, e)) : 1 - ss(3, 14, e);   // hematoma/inflammation 1–7 d (AO-PFM)
  S.N = ss(0.4, 3, e) * (1 - ss(primary ? 60 : 30, primary ? 260 : 120, e)); // necrotic ends
  S.resorb = primary ? 0 : bump(e, 7, 16, 28, 50) * (course === 'atrophic' ? 1.4 : 1);
  S.swell = 1 - ss(2, 21, e);
  if (primary) {
    S.G = 0; S.C = 0; S.W = 0; S.A = 0; S.E = 0; S.M = 0; S.w = 1;
    S.Lm = ss(21, 400, e);
    S.cones = ss(18, 45, e) * (1 - ss(260, 600, e));      // osteonal remodeling units crossing the line
    S.fill = ss(35, 190, e) * 0.78 + 0.22 * ss(190, 365, e); // line fades: ~6 wk → ~19 wk (union ≈ 4.3 mo) → ~12 mo
    S.lineVis = 1 - S.fill;
    S.recan = 1; S.bridge = [0, 0, 0, 0]; S.rust = null; S.rustC = null;
    S.union = e >= UNION_DAY.plate;
  } else {
    const big = fix === 'cast' ? 1.3 : 1, atro = course === 'atrophic';
    S.G = bump(e, 2, 7, 12, 26);
    S.C = bump(e, 6, 14, 28, 60) * (atro ? 0.5 : 1);          // soft callus ≈ 2–3 wk (AO-PFM)
    S.W = ss(18, 63, e) * (1 - ss(150, 540, e));               // woven bone; visible by 6-wk film
    S.Lm = ss(126, 600, e);
    S.oss = ss(12, 100, e);                                    // ossification front (periphery → gap)
    S.Amax = 0.55 * big * (atro ? 0.3 : 1);
    S.A = S.Amax * ss(4, 35, e) * (1 - 0.88 * ss(150, 700, e)); // callus thickness (cm) at peak site
    S.w = (2.2 + 1.3 * ss(4, 35, e)) * (fix === 'cast' ? 1.15 : 1) * (atro ? 0.75 : 1);
    S.M = ss(20, 80, e) * (atro ? 0.45 : 1);                   // callus mineral fraction (radiographic)
    S.E = (atro ? 0.4 : 1) * Math.max(0, bump(e, 8, 35, 160, 420));
    S.recan = ss(180, 640, e);
    S.cones = 0.45 * bump(e, 110, 180, 420, 720);
    const k = fix === 'cast' ? 119 / 126 : 1;
    // cortex order: 0 medial, 1 lateral, 2 anterior, 3 posterior; posterolateral bridges first (muscle cover)
    const t2 = [44, 34, 46, 32].map(x => x * k), t3 = [125, 100, 150, 112].map(x => x * k);
    S.rustC = t2.map((a, i) => (e < a ? 1 : (atro || e < t3[i]) ? 2 : 3));
    S.bridge = t3.map(a => (atro ? 0 : ss(a - 20, a, e)));
    S.rust = S.rustC.reduce((a, b) => a + b, 0);
    S.fill = atro ? 0.15 * ss(30, 120, e) : ss(35, 126 * k, e) * 0.75 + 0.25 * ss(126 * k, 330, e);
    S.lineVis = 1 - S.fill;
    S.union = !atro && S.rustC.filter(v => v === 3).length >= 3;
  }
  S.nBridge = S.primary ? (S.union ? 4 : 0) : S.rustC.filter(v => v === 3).length;
  // cells (relative activity 0..1; order after Marsell & Einhorn 2011 / Einhorn & Gerstenfeld 2015)
  S.cells = {
    neu: bump(e, 0, 0.3, 2, 6),
    mac: bump(e, 0.5, 3, 10, 21),
    msc: primary ? 0.3 * bump(e, 2, 8, 30, 60) : bump(e, 2, 6, 18, 40),
    chd: S.C,
    obl: primary ? 0.6 * bump(e, 14, 35, 300, 700) : ss(5, 20, e) * (1 - 0.6 * ss(200, 700, e)),
    ocl: primary ? clamp(0.85 * S.cones + 0.3 * S.N) : clamp(0.6 * bump(e, 10, 22, 40, 80) + 0.6 * bump(e, 90, 170, 420, 800))
  };
  S.sig = {
    inf: clamp(bump(e, 0, 1, 3, 10) + 0.3 * bump(e, 60, 130, 300, 600)),
    tgf: bump(e, 0, 0.5, 4, 14),
    bmp: clamp(0.85 * bump(e, 0, 1, 5, 12) + 0.6 * bump(e, 7, 14, 28, 50)),
    vegf: primary ? 0.4 * bump(e, 5, 20, 60, 200) : bump(e, 5, 14, 35, 70),
    rank: clamp(0.6 * bump(e, 14, 25, 45, 80) + 0.7 * bump(e, 90, 170, 420, 800))
  };
  const wts = [S.H * 1.4, S.G, S.C * 1.2, S.W, S.Lm * 1.3];
  const sum = wts.reduce((a, b) => a + b, 0) || 1;
  S.tw = wts.map(x => x / sum);
  if (primary) S.stage = e < 7 ? 0 : e < UNION_DAY.plate ? 4 : 3;
  else S.stage = e < 7 ? 0 : e < 21 ? 1 : (S.union ? 3 : 2);
  return S;
}

// ---------- tissue palette (AO-like clinical palette) ----------
export const PAL = {
  cortex: new THREE.Color('#e9dcc0'), hem: new THREE.Color('#5a0b16'), gran: new THREE.Color('#c8676a'),
  cart: new THREE.Color('#d6d3c4'), woven: new THREE.Color('#dcc48c'), lamellar: new THREE.Color('#ece0c6'),
  necro: new THREE.Color('#8f8a80'), marrowY: new THREE.Color('#e3b35c'), marrowR: new THREE.Color('#a8443a')
};

// callus thickness field (cm) — relative stability only. Spindle, asymmetric (thick posterolateral, thin anteromedial), lumpy.
export function callusT(S, y, th) {
  const A = S.A || 0; if (A < 0.002) return 0;
  const yy = y / (S.w * (y > 0 ? 1.08 : 0.95)); if (Math.abs(yy) >= 1) return 0;
  const bell = (1 - yy * yy) ** 2;
  const asym = 0.22 + 0.78 * Math.pow((1 + Math.cos(th - TH_POSTLAT)) / 2, 1.15);
  const lump = 0.42 + 1.05 * fbm(Math.cos(th) * 2.3 + 3, y * 1.7 + 1.7, Math.sin(th) * 2.3) + 0.25 * (vnoise(Math.cos(th) * 6 + 1, y * 5, Math.sin(th) * 6) - 0.5);
  const smoothK = S.Lm || 0; // remodeling smooths the contour
  return A * bell * asym * lerp(lump, 0.9, smoothK * 0.8);
}
// endosteal callus fill fraction at y (relative stability)
export const endoFill = (S, y) => { const E = S.E || 0; if (E < 0.01) return 0; const we = 1.2 + 2.0 * E; const yy = y / we; return Math.abs(yy) >= 1 ? 0 : E * (1 - yy * yy) ** 2; };
// hematoma swelling thickness
export function hemT(S, y, th) {
  const H = S.H; if (H < 0.01) return 0;
  const hw = S.primary ? 2.2 : 3.0, yy = y / hw; if (Math.abs(yy) >= 1) return 0;
  const bell = Math.exp(-yy * yy * 4) * (1 - yy * yy);
  return bell * H * (S.primary ? 0.25 : 0.62) * (0.55 + 0.9 * fbm(Math.cos(th) * 1.3 + 9, y * 1.4 + 4, Math.sin(th) * 1.3)) * (0.5 + 0.5 * Math.pow((1 + Math.cos(th - TH_POSTLAT)) / 2, 0.7));
}
// tissue colour inside the callus at (yy normalised 0 gap..1 ends, rho 0 bone surface..1 callus surface)
export function callusColor(S, yy, rho, out) {
  const c = out || new THREE.Color();
  const f = clamp((Math.abs(yy) - (1 - 1.8 * (S.oss || 0))) / 0.3 + 1.6 * rho * ss(0.08, 0.3, S.oss || 0)); // ossified fraction
  c.copy(PAL.gran).lerp(PAL.cart, clamp(S.C * 2.2 + (S.oss || 0)));
  c.lerp(PAL.woven, clamp(f) * clamp(S.W * 1.6 + S.Lm));
  c.lerp(PAL.lamellar, clamp(S.Lm * 1.1));
  return c;
}

// ---------- solid builder about per-level centres ----------
// o: ys[], rout(y,th), rin(y,th)?, center(y)->[x,z], th0, th1, nth, nr, jagStart/jagEnd(th), color(y,th,rho,part)->[r,g,b], capStart, capEnd
export function buildSolid(o) {
  const ys = o.ys, ny = ys.length, nth = o.nth || 96, nr = o.nr || 4;
  const th0 = o.th0 ?? 0, th1 = o.th1 ?? Math.PI * 2, full = th1 - th0 >= Math.PI * 2 - 1e-6;
  const ctr = o.center || (() => [0, 0]);
  const pos = [], uv = [], col = [], idxMain = [], idxCut = [];
  const js = o.jagStart || (() => 0), je = o.jagEnd || (() => 0);
  const yAt = (i, th) => ys[i] + (i === 0 ? js(th) : 0) + (i === ny - 1 ? je(th) : 0);
  const colorFn = o.color;
  const push = (r, y, th, u, v, part) => {
    const [cx, cz] = ctr(y);
    pos.push(cx + r * Math.cos(th), y, cz + r * Math.sin(th)); uv.push(u, v);
    if (colorFn) { const c = colorFn(y, th, r, part); col.push(c[0], c[1], c[2]); } else col.push(1, 1, 1);
  };
  const ranges = [];
  const surf = inner => {
    const base = pos.length / 3;
    for (let i = 0; i < ny; i++) for (let j = 0; j <= nth; j++) {
      const th = th0 + (th1 - th0) * j / nth, y = yAt(i, th);
      push(inner ? o.rin(y, th) : o.rout(y, th), y, th, j / nth * (o.uvU || 4), y * (o.uvV || 0.3), inner ? 1 : 0);
    }
    const W = nth + 1;
    for (let i = 0; i < ny - 1; i++) for (let j = 0; j < nth; j++) {
      const a = base + i * W + j, b = a + W, c = a + 1, bd = b + 1;
      if (!inner) idxMain.push(a, b, c, b, bd, c); else idxMain.push(a, c, b, b, c, bd);
    }
    ranges.push({ base, W, rows: ny });
  };
  surf(false);
  if (o.rin && !o.noInner) surf(true);
  const cap = top => {
    const i = top ? ny - 1 : 0, base = pos.length / 3, W = nth + 1;
    for (let k = 0; k <= nr; k++) for (let j = 0; j <= nth; j++) {
      const th = th0 + (th1 - th0) * j / nth, y = yAt(i, th);
      const ri = o.rin ? o.rin(y, th) : 0, ro = o.rout(y, th), rho = lerp(ri, ro, k / nr);
      push(rho, y, th, rho * Math.cos(th) * 0.5 + 0.5, rho * Math.sin(th) * 0.5 + 0.5, 2);
    }
    for (let k = 0; k < nr; k++) for (let j = 0; j < nth; j++) {
      const a = base + k * W + j, b = a + W, c = a + 1, bd = b + 1;
      if (top) idxMain.push(a, c, b, b, c, bd); else idxMain.push(a, b, c, b, bd, c);
    }
  };
  if (o.capStart !== false) cap(false);
  if (o.capEnd !== false) cap(true);
  if (!full && o.cutFaces !== false) {
    const face = (th, atEnd) => {
      const base = pos.length / 3, W = nr + 1;
      for (let i = 0; i < ny; i++) for (let k = 0; k <= nr; k++) {
        const y = yAt(i, th), ri = o.rin ? o.rin(y, th) : 0, ro = o.rout(y, th), rho = lerp(ri, ro, k / nr);
        push(rho, y, th, (atEnd ? -1 : 1) * rho * (o.cutU || 1), y * (o.cutV || 1), 3);
      }
      for (let i = 0; i < ny - 1; i++) for (let k = 0; k < nr; k++) {
        const a = base + i * W + k, b = a + 1, c = a + W, bd = c + 1;
        if (atEnd) idxCut.push(a, b, c, b, bd, c); else idxCut.push(a, c, b, b, c, bd);
      }
    };
    face(th0, false); face(th1, true);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  g.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
  g.setIndex([...idxMain, ...idxCut]);
  g.addGroup(0, idxMain.length, 0);
  if (idxCut.length) g.addGroup(idxMain.length, idxCut.length, 1);
  g.computeVertexNormals();
  if (full) {
    const n = g.attributes.normal;
    for (const r of ranges) for (let i = 0; i < r.rows; i++) {
      const a = r.base + i * r.W, b = a + r.W - 1;
      const x = n.getX(a) + n.getX(b), y = n.getY(a) + n.getY(b), z = n.getZ(a) + n.getZ(b), l = Math.hypot(x, y, z) || 1;
      n.setXYZ(a, x / l, y / l, z / l); n.setXYZ(b, x / l, y / l, z / l);
    }
  }
  return g;
}
export function rows(a, b, n, focus = null, k = 2.2) {
  const out = [];
  for (let i = 0; i <= n; i++) {
    let t = i / n;
    if (focus === 'start') t = Math.pow(t, k); else if (focus === 'end') t = 1 - Math.pow(1 - t, k);
    else if (focus === 'mid') t = 0.5 + Math.sign(t - 0.5) * Math.pow(Math.abs(t - 0.5) * 2, k) / 2;
    else if (focus === 'ends') t = 0.5 - 0.5 * Math.cos(Math.PI * t);
    out.push(lerp(a, b, t));
  }
  return out;
}

// ---------- procedural textures ----------
export function makeCanvasTex(size, painter, repeat = true) {
  const c = document.createElement('canvas'); c.width = c.height = size;
  painter(c.getContext('2d'), size);
  const t = new THREE.CanvasTexture(c);
  if (repeat) t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.anisotropy = 4; return t;
}
export function noisePainter(scale, lo, hi) {
  return (ctx, s) => {
    const im = ctx.createImageData(s, s);
    for (let y = 0; y < s; y++) for (let x = 0; x < s; x++) {
      const a = x / s * Math.PI * 2, b = y / s * Math.PI * 2;
      const n = fbm(Math.cos(a) * scale + 10, Math.sin(a) * scale + Math.cos(b) * scale * 3, Math.sin(b) * scale * 3);
      const v = Math.round(255 * lerp(lo, hi, n)), p = (y * s + x) * 4;
      im.data[p] = im.data[p + 1] = im.data[p + 2] = v; im.data[p + 3] = 255;
    }
    ctx.putImageData(im, 0, 0);
  };
}
export function haversPainter(ctx, s) {
  ctx.fillStyle = '#efe4cc'; ctx.fillRect(0, 0, s, s);
  for (let i = 0; i < 700; i++) {
    const x = rnd() * s, y = rnd() * s, r = 3 + rnd() * 4;
    ctx.strokeStyle = 'rgba(165,135,95,.32)'; ctx.lineWidth = 1;
    for (let k = 0; k < 3; k++) { ctx.beginPath(); ctx.ellipse(x, y, (r - k * 1.1) * 1.1, r - k * 1.1, 0, 0, 7); ctx.stroke(); }
    ctx.fillStyle = 'rgba(120,80,60,.5)'; ctx.beginPath(); ctx.arc(x, y, 0.9, 0, 7); ctx.fill();
  }
}
export function marrowPainter(ctx, s) { // adult diaphyseal yellow (fatty) marrow with scattered red islands
  ctx.fillStyle = '#cfae72'; ctx.fillRect(0, 0, s, s);
  for (let i = 0; i < 1500; i++) {
    const x = rnd() * s, y = rnd() * s, r = 2 + rnd() * 6;
    ctx.fillStyle = rnd() < 0.8 ? 'rgba(244,222,170,.5)' : 'rgba(150,50,45,.3)';
    ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill();
  }
}
export function spongyPainter(ctx, s) {
  ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, s, s);
  for (let i = 0; i < 520; i++) {
    const x = rnd() * s, y = rnd() * s, r = 3 + rnd() * 9;
    ctx.fillStyle = `rgba(90,70,60,${0.12 + rnd() * 0.18})`;
    ctx.beginPath(); ctx.ellipse(x, y, r, r * (0.6 + rnd() * 0.6), rnd() * 3, 0, 7); ctx.fill();
  }
}

// =====================================================================
// DRR-style radiograph: line integrals of attenuation through the SAME geometry as the 3D scene.
// AP: rays along z, image column = x (patient's lateral on viewer's left for this right leg).
// LAT: rays along x (viewed from lateral), image column = z (anterior on the right).
// =====================================================================
const MU = { soft: 0.20, cort: 1.0, marrow: 0.16, cart: 0.21, gran: 0.2, hem: 0.22, metal: 7.0, cast: 0.55, fibC: 1.0 };
const NTH = 64, THS = Array.from({ length: NTH }, (_, i) => i / NTH * Math.PI * 2);
const COS = THS.map(Math.cos), SIN = THS.map(Math.sin);
// chord accumulation for a closed polygon given as flat arrays (u = image coordinate, w = ray coordinate)
function polyChord(U, Wd, n, tmp, x0, ip, W) {
  tmp.fill(0);
  for (let i = 0; i < n; i++) {
    const j = (i + 1) % n; let u1 = (U[i] - x0) * ip - 0.5, u2 = (U[j] - x0) * ip - 0.5;
    if (u1 === u2) continue;
    const w1 = Wd[i], w2 = Wd[j], sgn = u2 > u1 ? 1 : -1;
    let a = Math.ceil(Math.min(u1, u2)), b = Math.ceil(Math.max(u1, u2)) - 1;
    if (a < 0) a = 0; if (b > W - 1) b = W - 1;
    const k = (w2 - w1) / (u2 - u1);
    for (let c = a; c <= b; c++) tmp[c] += sgn * (w1 + (c - u1) * k);
  }
}
function addPoly(acc, tmp, mu, W) { for (let c = 0; c < W; c++) if (tmp[c]) acc[c] += mu * Math.abs(tmp[c]); }
// build polygon (u,w) for radial function at y about centre
function radialPoly(U, Wd, rf, y, ctr, lat, scale = 1, add = 0) {
  const [cx, cz] = ctr(y);
  for (let i = 0; i < NTH; i++) {
    const r = rf(y, THS[i]) * scale + (typeof add === 'function' ? add(y, THS[i]) : add);
    const x = cx + r * COS[i], z = cz + r * SIN[i];
    if (lat) { U[i] = z; Wd[i] = x; } else { U[i] = x; Wd[i] = z; }
  }
}
// cylinder (screw) chord along the view ray; s = {c, a, len, r, pitch}
function screwChord(s, u, y, lat) {
  const d = lat ? [1, 0, 0] : [0, 0, 1];
  const da = d[0] * s.a[0] + d[2] * s.a[2];
  const dy = y - s.c[1]; if (Math.abs(dy) >= s.r) return 0;
  const half = Math.sqrt(s.r * s.r - dy * dy) * 2;
  if (Math.abs(da) > 0.96) { // end-on: dense disc
    const cu = lat ? s.c[2] : s.c[0];
    return Math.abs(u - cu) < s.r * Math.sqrt(1 - (dy / s.r) ** 2) ? s.len * 0.9 : 0;
  }
  const sinA = Math.sqrt(1 - da * da);
  // param along axis where the ray meets the axis line (in the u direction)
  const au = lat ? s.a[2] : s.a[0], cu = lat ? s.c[2] : s.c[0];
  if (Math.abs(au) < 1e-4) return 0;
  const t = (u - cu) / au; if (Math.abs(t) > s.len / 2) return 0;
  const thread = 0.82 + 0.18 * Math.abs(Math.sin(Math.PI * t / s.pitch));
  return half / sinA * (t < s.len / 2 - 0.25 ? thread : 1);
}
export function renderDRR(ctx, Wpx, Hpx, S, view, win, opts = {}) {
  // win: {x0 (image u at left), u1, y0 (bottom), y1 (top)} in cm
  const lat = view === 'lat';
  const ip = Wpx / (win.u1 - win.u0), x0 = win.u0;
  const acc = new Float32Array(Wpx), accC = new Float32Array(Wpx), tmp = new Float32Array(Wpx);
  const U = new Float32Array(NTH * 2 + 4), Wd = new Float32Array(NTH * 2 + 4);
  const img = new Float32Array(Wpx * Hpx), calImg = new Float32Array(Wpx * Hpx);
  const nail = S.fix === 'nail', plate = S.fix === 'plate', cast = S.fix === 'cast';
  const g2 = S.gap / 2 * (1 + 2.2 * (S.resorb || 0));
  const muFill = lerp(MU.gran, MU.cort * 0.92, S.fill);
  const swell = 0.5 * (S.swell || 0) * (S.primary ? 0.6 : 1);
  const rowAt = (y, A, C) => {
    A.fill(0); C.fill(0);
    // soft tissue envelope (+ swelling around the fracture)
    if (y > SKIN_Y0 - 3 && y < SKIN_Y1 + 3) {
      radialPoly(U, Wd, Rs, y, Cs, lat, 1, (yy) => swell * Math.exp(-yy * yy / 30));
      polyChord(U, Wd, NTH, tmp, x0, ip, Wpx); addPoly(A, tmp, MU.soft, Wpx);
      if (cast && y > -14.5) {
        radialPoly(U, Wd, Rs, y, Cs, lat, 1, 1.0); polyChord(U, Wd, NTH, tmp, x0, ip, Wpx); addPoly(A, tmp, MU.cast, Wpx);
        radialPoly(U, Wd, Rs, y, Cs, lat, 1, 0.45); polyChord(U, Wd, NTH, tmp, x0, ip, Wpx); addPoly(A, tmp, -MU.cast, Wpx);
      }
    }
    // fibula (intact)
    if (y > FIB_Y0 && y < FIB_Y1) {
      radialPoly(U, Wd, Rf, y, Cf, lat); polyChord(U, Wd, NTH, tmp, x0, ip, Wpx); addPoly(A, tmp, MU.fibC - MU.soft, Wpx);
      radialPoly(U, Wd, Rfc, y, Cf, lat); polyChord(U, Wd, NTH, tmp, x0, ip, Wpx); addPoly(A, tmp, -(MU.fibC - MU.marrow), Wpx);
    }
    if (y < Y_BOT || y > Y_TOP) return;
    // tibia: outer minus canal
    const inBand = Math.abs(y) < g2 + JAG + 0.01;
    const nearEnd = Math.abs(y) - g2;
    let mc = MU.cort;
    if (!S.primary && nearEnd < 0.3 && nearEnd > -JAG) mc *= 1 - 0.4 * (S.resorb || 0) * (1 - clamp(nearEnd / 0.3));
    radialPoly(U, Wd, Rb, y, Cb, lat); polyChord(U, Wd, NTH, tmp, x0, ip, Wpx);
    if (!inBand) addPoly(A, tmp, mc - MU.soft, Wpx);
    else {
      addPoly(A, tmp, muFill - MU.soft, Wpx);
      // sectors where bone is present at this row
      const [cx, cz] = Cb(y); let i0 = -1;
      const present = THS.map(th => Math.abs(y - jag(th)) >= g2);
      if (present.some(v => !v)) {
        let start = present.findIndex(v => !v); // rotate so runs don't wrap
        for (let k = 1; k <= NTH; k++) {
          const i = (start + k) % NTH;
          if (present[i] && i0 < 0) i0 = k;
          if ((!present[i] || k === NTH) && i0 >= 0) {
            const run = []; for (let q = i0; q < (present[i] ? k + 1 : k); q++) run.push((start + q) % NTH);
            if (run.length >= 2) {
              let n = 0;
              for (const ii of run) { const r = Rb(y, THS[ii]), x = cx + r * COS[ii], z = cz + r * SIN[ii]; U[n] = lat ? z : x; Wd[n] = lat ? x : z; n++; }
              for (let q = run.length - 1; q >= 0; q--) { const ii = run[q], r = Rc(y, THS[ii]), x = cx + r * COS[ii], z = cz + r * SIN[ii]; U[n] = lat ? z : x; Wd[n] = lat ? x : z; n++; }
              polyChord(U, Wd, n, tmp, x0, ip, Wpx); addPoly(A, tmp, MU.cort - muFill, Wpx);
            }
            i0 = -1;
          }
        }
      } else { addPoly(A, tmp, MU.cort - muFill, Wpx); }
    }
    // canal: marrow (+ endosteal callus)
    radialPoly(U, Wd, Rc, y, Cb, lat); polyChord(U, Wd, NTH, tmp, x0, ip, Wpx);
    const ef = S.primary ? 0 : endoFill(S, y);
    const muCanal = lerp(MU.marrow, MU.cort * 0.75 * (0.3 + 0.7 * S.M), ef);
    addPoly(A, tmp, -((inBand ? muFill : mc) - muCanal), Wpx);
    // external callus (mineralising) and hematoma
    if (!S.primary && (S.A || 0) > 0.002 && Math.abs(y) < S.w * 1.1) {
      radialPoly(U, Wd, Rb, y, Cb, lat, 1, (yy, th) => callusT(S, yy, th)); polyChord(U, Wd, NTH, tmp, x0, ip, Wpx);
      for (let c = 0; c < Wpx; c++) C[c] += Math.abs(tmp[c]);
      radialPoly(U, Wd, Rb, y, Cb, lat); polyChord(U, Wd, NTH, tmp, x0, ip, Wpx);
      for (let c = 0; c < Wpx; c++) C[c] -= Math.abs(tmp[c]);
    }
    // implants
    if (nail && y > NAIL.y0 && y < NAIL.y1) {
      const [nx, nz] = nailCenter(y), cu = lat ? nz : nx;
      const tip = y < NAIL.y0 + 0.5 ? Math.sqrt(clamp((y - NAIL.y0) / 0.5)) : 1;
      for (let c = 0; c < Wpx; c++) {
        const u = x0 + (c + 0.5) / ip, du = u - cu, ro = NAIL.r * tip, ri = NAIL.rin * tip;
        if (Math.abs(du) < ro) A[c] += (MU.metal - MU.marrow) * (2 * Math.sqrt(ro * ro - du * du) - (Math.abs(du) < ri ? 2 * Math.sqrt(ri * ri - du * du) : 0));
      }
    }
    const scr = nail ? LOCKS : plate ? PSCREWS : [];
    for (const s of scr) if (Math.abs(y - s.y) < s.r) for (let c = 0; c < Wpx; c++) A[c] += (MU.metal - MU.cort * 0.5) * screwChord(s, x0 + (c + 0.5) / ip, y, lat);
    if (plate && y > PLATE.y0 && y < PLATE.y1) {
      const [cx, cz] = Cb(y), half = plateArc(y) / 2, n2 = 14; let n = 0;
      const tp = Math.min(1, (PLATE.y1 - Math.abs(y)) / 0.6);
      for (let k = 0; k <= n2; k++) { const th = PLATE.th - half + 2 * half * k / n2, r = Rb(y, th) + 0.02 + PLATE.t * tp; const x = cx + r * Math.cos(th), z = cz + r * Math.sin(th); U[n] = lat ? z : x; Wd[n] = lat ? x : z; n++; }
      for (let k = n2; k >= 0; k--) { const th = PLATE.th - half + 2 * half * k / n2, r = Rb(y, th) + 0.02; const x = cx + r * Math.cos(th), z = cz + r * Math.sin(th); U[n] = lat ? z : x; Wd[n] = lat ? x : z; n++; }
      // plate holes: thinner where a hole is empty (all filled here) → slight modulation near holes
      polyChord(U, Wd, n, tmp, x0, ip, Wpx); addPoly(A, tmp, MU.metal * 0.85, Wpx);
    }
  };
  const A2 = new Float32Array(Wpx), C2 = new Float32Array(Wpx);
  for (let py = 0; py < Hpx; py++) {
    const y = win.y1 - (py + 0.5) / Hpx * (win.y1 - win.y0);
    const dyp = (win.y1 - win.y0) / Hpx;
    if (Math.abs(y) < 0.5 + dyp) { // supersample rows around the fracture line
      acc.fill(0); accC.fill(0);
      const ns = 6;
      for (let k = 0; k < ns; k++) { rowAt(y + ((k + 0.5) / ns - 0.5) * dyp, A2, C2); for (let c = 0; c < Wpx; c++) { acc[c] += A2[c] / ns; accC[c] += C2[c] / ns; } }
    } else { rowAt(y, acc, accC); }
    img.set(acc, py * Wpx); calImg.set(accC, py * Wpx);
  }
  // callus attenuation: mottled woven bone → homogeneous lamellar
  const muCal = S.primary ? 0 : lerp(MU.cart, MU.cort * 0.95, S.M) - MU.soft;
  const mott = (1 - (S.Lm || 0)) * 0.55;
  const seedO = lat ? 11 : 3;
  for (let py = 0; py < Hpx; py++) for (let c = 0; c < Wpx; c++) {
    const i = py * Wpx + c; if (!calImg[i]) continue;
    const yy = win.y1 - (py + 0.5) / Hpx * (win.y1 - win.y0), u = x0 + (c + 0.5) / ip;
    const n = fbm(u * 2.4 + seedO, yy * 2.0, seedO) + 0.35 * vnoise(u * 7, yy * 6, seedO + 2);
    img[i] += Math.max(0, calImg[i]) * muCal * (1 - mott + mott * 1.6 * (n - 0.35));
  }
  // display transform: log-domain → film-like, edge enhancement, grain, collimation
  const out = ctx.createImageData(Wpx, Hpx), bl = new Float32Array(Wpx * Hpx);
  const k = 0.42;
  for (let i = 0; i < img.length; i++) img[i] = 1 - Math.exp(-k * img[i]);
  // box blur (unsharp mask)
  const R = Math.max(2, Math.round(Wpx / 110)), tmpb = new Float32Array(Wpx * Hpx);
  for (let py = 0; py < Hpx; py++) { let s = 0; for (let c = -R; c <= R; c++) s += img[py * Wpx + clamp(c, 0, Wpx - 1)]; for (let c = 0; c < Wpx; c++) { tmpb[py * Wpx + c] = s / (2 * R + 1); s += img[py * Wpx + Math.min(Wpx - 1, c + R + 1)] - img[py * Wpx + Math.max(0, c - R)]; } }
  for (let c = 0; c < Wpx; c++) { let s = 0; for (let r = -R; r <= R; r++) s += tmpb[clamp(r, 0, Hpx - 1) * Wpx + c]; for (let py = 0; py < Hpx; py++) { bl[py * Wpx + c] = s / (2 * R + 1); s += tmpb[Math.min(Hpx - 1, py + R + 1) * Wpx + c] - tmpb[Math.max(0, py - R) * Wpx + c]; } }
  const frame = opts.frame || 1;
  for (let py = 0; py < Hpx; py++) for (let c = 0; c < Wpx; c++) {
    const i = py * Wpx + c;
    let v = img[i] + 0.9 * (img[i] - bl[i]);
    v = ss(0.12, 0.98, v); v = Math.pow(v, 1.15);
    const grain = (hash3(c * 1.7, py * 1.3, frame) - 0.5) * 0.07 + (hash3(c >> 1, py >> 1, frame + 5) - 0.5) * 0.04;
    v = clamp(0.02 + v * 0.97 + grain * (0.4 + 0.6 * (1 - v)));
    const p = i * 4; out.data[p] = 255 * v * 0.96; out.data[p + 1] = 255 * v * 0.985; out.data[p + 2] = 255 * v; out.data[p + 3] = 255;
  }
  ctx.putImageData(out, 0, 0);
  return { ip };
}
