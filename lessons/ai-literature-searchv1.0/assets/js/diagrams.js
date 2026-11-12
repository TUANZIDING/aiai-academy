/* 文献检索课的立体教学图。只用一个 WebGL 上下文，不联网。 */
(function () {
  const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const TEXT = {
    routes: {
      a: ["路线甲 · 已有论文库", "用已经接入论文库的 Agent。作者演示过 YILA，本课没有复现那个界面。打开就能搜，不代表结果已经核验。"],
      b: ["路线乙 · 自己接 API", "把论文 API 接到 Agent。密钥放进工具自己的输入框，或放进本地 .env。不要写进公开网页，也不要贴进聊天。"],
      join: ["汇合之后才谈空白", "两条分支在这里相遇。搜不到，不等于不存在。下一步都是回到数据库核对，并用你已知的哨兵文献查漏。"],
    },
    sources: {
      openalex: ["OpenAlex · 摸清方向", "分工是摸清一个方向、做筛选。节点一样大，因为这张图不表示收录数量，也不是论文互相引用。它覆盖不了中文核心。"],
      s2: ["Semantic Scholar · 沿引用", "分工是从已经找到的论文沿引用关系接着找。无密钥用户共用一个限速池。摘要是否因版权缺失，本次仍待核验。"],
      serpapi: ["SerpApi · 补漏", "分工是补 Google Scholar 那一类结果。它是第三方，不是 Google 官方 API。snippet 不是摘要，价格可能变化。"],
      pubmed: ["PubMed · 生物医学", "分工是生物医学的题录和摘要。PubMed 本身不收录期刊全文，也不等于 PMC。"],
      arxiv: ["arXiv · 预印本", "分工是看物理、数学、计算机等方向的预印本。全文能打开，不等于可以把 PDF 再镜像出去。"],
      zh: ["中文核心 · 五个都不够", "这颗琥珀节点故意不连线。中文核心和学位论文不在这五条分工里，还是要去知网、万方。language 字段不能当成覆盖率。"],
    },
    layers: {
      record: ["1 · 题录", "题名、作者、年份、出处、DOI。有一条题录，只说明工具返回了这条记录，不等于你读过论文。"],
      abstract: ["2 · 摘要", "这一层是作者摘要，或来源明确标出的一句话摘要。旁边的 snippet 没有连过来，因为它不是摘要。"],
      full: ["3 · 全文", "开放获取链接，或学校图书馆等合法入口。检索命中不产生下载权，也不产生转载权。"],
      snippet: ["snippet · 不是摘要", "这是结果页上的一小段。SerpApi 的示例字段就叫 snippet，每页 1 到 20 条。它停在摘要旁边，中间没有连接。"],
    },
    verify: {
      s1: ["1 · 查存在", "抽几条，用 DOI 或题名回到数据库。聊天记录里的一篇论文，要能在库里被找到。"],
      s2: ["2 · 核对期刊和年份", "期刊、年份要另核。截图上的分区必须再写版本和学科，它不是论文的固定属性。"],
      s3: ["3 · 哨兵文献", "把你本来就知道的重要论文当作哨兵。它们没出现，说明这条检索不完整，不是这个方向没有文献。这一级被抬高，因为最容易被忽略。"],
      s4: ["4 · 版本去重", "同一篇的预印本、出版版和机构库版本要并成一条。版本数不是论文数。"],
      s5: ["5 · 记下检索式和日期", "写下检索式、数据源和绝对日期。作者示例里的「近 5 年」只留在历史演示里。"],
      s6: ["6 · 检查时间窗", "问一句：这个时间窗有没有把奠基文献切掉。临床和经典案例里，这是作者自己提醒过的边界。"],
    },
  };

  const state = {
    renderer: null,
    canvas: null,
    failed: false,
    activeId: null,
    frames: 0,
    ratios: new Map(),
    built: {},
    anim: 0,
  };

  function clay(color, extra) {
    return new THREE.MeshStandardMaterial(Object.assign({
      color: color,
      roughness: 0.46,
      metalness: 0.08,
    }, extra || {}));
  }

  function studio(scene) {
    scene.add(new THREE.AmbientLight(0xfff8ef, 0.72));
    scene.add(new THREE.HemisphereLight(0xfff6ea, 0xc9bfae, 0.55));
    const key = new THREE.DirectionalLight(0xfffaf4, 1.45);
    key.position.set(-5, 9, 6);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0x7dcec4, 0.42);
    rim.position.set(6, 3, -4);
    scene.add(rim);
    const disc = new THREE.Mesh(
      new THREE.CircleGeometry(7.2, 80),
      new THREE.MeshStandardMaterial({ color: 0xe7dccb, roughness: 0.94, metalness: 0 })
    );
    disc.rotation.x = -Math.PI / 2;
    disc.receiveShadow = false;
    scene.add(disc);
  }

  function label(lines, tint, worldWidth) {
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = lines.length > 1 ? 360 : 220;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const pad = 16;
    roundRect(ctx, pad, pad, canvas.width - pad * 2, canvas.height - pad * 2, 48);
    ctx.fillStyle = "rgba(255,250,243,0.96)";
    ctx.fill();
    ctx.lineWidth = 14;
    ctx.strokeStyle = tint || "#0f766e";
    ctx.stroke();
    ctx.fillStyle = "#10233c";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = '700 78px "WenQuanYi Micro Hei", "PingFang SC", "Microsoft YaHei", sans-serif';
    const step = 96;
    lines.forEach((line, index) => {
      ctx.fillText(line, canvas.width / 2, canvas.height / 2 + (index - (lines.length - 1) / 2) * step);
    });
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 8;
    const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture, transparent: true, depthWrite: false, depthTest: false }));
    sprite.renderOrder = 3;
    const aspect = canvas.width / canvas.height;
    const width = worldWidth || 1.7;
    sprite.scale.set(width, width / aspect, 1);
    sprite.position.y = 0.95;
    sprite.center.set(0.5, 0);
    return sprite;
  }

  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  function puck(color) {
    const group = new THREE.Group();
    const body = new THREE.Mesh(new THREE.CylinderGeometry(0.48, 0.52, 0.24, 48), clay(color, { roughness: 0.38, metalness: 0.12 }));
    body.position.y = 0.14;
    const top = new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.36, 0.06, 40), clay(0xfffaf3, { roughness: 0.55, metalness: 0 }));
    top.position.y = 0.28;
    const hit = new THREE.Mesh(new THREE.CylinderGeometry(0.62, 0.62, 0.4, 16), new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 }));
    hit.position.y = 0.2;
    group.add(body, top, hit);
    group.userData.parts = [body];
    return group;
  }

  function shadow(radius) {
    const mesh = new THREE.Mesh(
      new THREE.CircleGeometry(radius, 32),
      new THREE.MeshBasicMaterial({ color: 0x1c1915, transparent: true, opacity: 0.12, depthWrite: false })
    );
    mesh.rotation.x = -Math.PI / 2;
    mesh.position.y = 0.012;
    return mesh;
  }

  function tube(from, to, color) {
    const mid = from.clone().lerp(to, 0.5);
    mid.y += 0.28;
    const curve = new THREE.CatmullRomCurve3([from.clone().setY(0.2), mid, to.clone().setY(0.2)]);
    return new THREE.Mesh(
      new THREE.TubeGeometry(curve, 28, 0.045, 12, false),
      clay(color, { roughness: 0.32, metalness: 0.2 })
    );
  }

  function mark(group, id) {
    group.userData.sel = id;
    group.traverse((obj) => { obj.userData.sel = id; });
    return group;
  }

  function node(id, color, lines) {
    const group = mark(puck(color), id);
    group.add(label(lines, color === 0x9a6700 ? "#9a6700" : "#0f766e"));
    group.add(shadow(0.62));
    group.userData.baseY = 0;
    return group;
  }

  function camera(x, y, z, target, fov) {
    const cam = new THREE.PerspectiveCamera(fov || 36, 1, 0.1, 50);
    cam.position.set(x, y, z);
    cam.lookAt(target.x, target.y, target.z);
    return cam;
  }

  function buildRoutes() {
    const scene = new THREE.Scene();
    studio(scene);
    const groups = {};
    const place = (id, color, lines, x, z) => {
      const group = node(id, color, lines);
      group.position.set(x, 0, z);
      scene.add(group);
      groups[id] = group;
      return group;
    };
    const start = place("start", 0x0e2744, ["检索"], 0, -1.35);
    place("a", 0x0f766e, ["路线甲", "已有论文库"], -1.55, 0.15);
    place("b", 0x16365c, ["路线乙", "自己接 API"], 1.55, 0.15);
    place("join", 0x9a6700, ["汇合核验", "搜不到≠不存在"], 0, 1.6);
    scene.add(tube(start.position, groups.a.position, 0x0f766e));
    scene.add(tube(start.position, groups.b.position, 0x24556f));
    scene.add(tube(groups.a.position, groups.join.position, 0x9a6700));
    scene.add(tube(groups.b.position, groups.join.position, 0x9a6700));
    return { scene, camera: camera(0, 5.5, 7.2, new THREE.Vector3(0, 0.35, 0.15), 34), groups, order: ["a", "b", "join"], initial: "join" };
  }

  function buildSources() {
    const scene = new THREE.Scene();
    studio(scene);
    const groups = {};
    const hub = mark(new THREE.Group(), "hub");
    const disc = new THREE.Mesh(new THREE.CylinderGeometry(0.72, 0.78, 0.16, 48), clay(0x0e2744, { roughness: 0.4, metalness: 0.16 }));
    disc.position.y = 0.1;
    hub.add(disc, label(["你的问题"], "#0e2744"));
    hub.position.set(0, 0, -0.55);
    scene.add(hub);
    const items = [
      ["openalex", "OpenAlex", "摸清方向", -2.35],
      ["s2", "Semantic Scholar", "沿引用", -1.18],
      ["serpapi", "SerpApi", "补漏", 0],
      ["pubmed", "PubMed", "生物医学", 1.18],
      ["arxiv", "arXiv", "预印本", 2.35],
    ];
    items.forEach((item) => {
      const group = node(item[0], 0x0f766e, [item[1], item[2]]);
      group.children.forEach((child) => {
        if (child.isSprite) child.scale.multiplyScalar(0.62);
      });
      group.position.set(item[3], 0, 1.05);
      scene.add(group);
      scene.add(tube(hub.position, group.position, 0x1f6f68));
      groups[item[0]] = group;
    });
    const zh = node("zh", 0x9a6700, ["中文核心", "不连线"]);
    zh.position.set(0, 0, -2.05);
    scene.add(zh);
    groups.zh = zh;
    return {
      scene,
      camera: camera(0, 6.6, 7.4, new THREE.Vector3(0, 0.15, 0.1), 40),
      groups,
      order: ["openalex", "s2", "serpapi", "pubmed", "arxiv", "zh"],
      initial: "openalex",
    };
  }

  function buildLayers() {
    const scene = new THREE.Scene();
    studio(scene);
    const groups = {};
    function board(id, color, lines, w, d, h, y, x) {
      const group = mark(new THREE.Group(), id);
      const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), clay(color, { roughness: 0.34, metalness: 0.06 }));
      const edge = new THREE.Mesh(new THREE.BoxGeometry(w + 0.08, h * 0.28, d + 0.08), clay(0xd9cbb6, { roughness: 0.8, metalness: 0 }));
      edge.position.y = -h * 0.32;
      mesh.position.y = h / 2;
      group.add(edge, mesh, label(lines, color === 0x9a6700 ? "#9a6700" : "#0f766e"));
      group.position.set(x, y, 0);
      group.userData.baseY = y;
      group.userData.parts = [mesh];
      scene.add(group);
      groups[id] = group;
      return group;
    }
    board("full", 0x0e2744, ["3 全文"], 2.8, 1.85, 0.32, 0, -0.15);
    board("abstract", 0x0f766e, ["2 摘要"], 2.45, 1.6, 0.24, 0.55, -0.15);
    board("record", 0xfffaf3, ["1 题录"], 2.1, 1.35, 0.16, 1.02, -0.15);
    board("snippet", 0x9a6700, ["snippet", "不是摘要"], 1.35, 0.95, 0.16, 0.2, 1.85);
    return {
      scene,
      camera: camera(2.4, 4.2, 6.4, new THREE.Vector3(0.15, 0.7, 0), 34),
      groups,
      order: ["record", "abstract", "full", "snippet"],
      initial: "record",
    };
  }

  function buildVerify() {
    const scene = new THREE.Scene();
    studio(scene);
    const groups = {};
    const steps = [
      ["s1", "1 查存在", 0x0e2744, 0],
      ["s2", "2 核年份", 0x16365c, 0],
      ["s3", "3 哨兵文献", 0x9a6700, 0.28],
      ["s4", "4 去重", 0x0f766e, 0],
      ["s5", "5 记下日期", 0x0e2744, 0],
      ["s6", "6 查时间窗", 0x16365c, 0],
    ];
    steps.forEach((step, index) => {
      const group = node(step[0], step[2], [step[1]]);
      group.children.forEach((child) => {
        if (child.isSprite) child.scale.multiplyScalar(0.58);
      });
      const x = -2.55 + index * 1.02;
      group.position.set(x, step[3], Math.sin(index * 0.55) * 0.18);
      if (index === 2) group.scale.set(1.08, 1.08, 1.08);
      scene.add(group);
      groups[step[0]] = group;
      if (index > 0) {
        const prev = groups[steps[index - 1][0]];
        scene.add(tube(prev.position, group.position, index === 3 ? 0x9a6700 : 0x1f6f68));
      }
    });
    return {
      scene,
      camera: camera(0, 6.2, 8.4, new THREE.Vector3(0, 0.25, 0), 36),
      groups,
      order: steps.map((step) => step[0]),
      initial: "s3",
    };
  }

  const BUILDERS = { routes: buildRoutes, sources: buildSources, layers: buildLayers, verify: buildVerify };

  function ensureRenderer() {
    if (state.failed || !window.THREE) return null;
    if (state.renderer) return state.renderer;
    const canvas = document.createElement("canvas");
    canvas.setAttribute("aria-hidden", "true");
    let gl = null;
    try {
      gl = canvas.getContext("webgl2", { alpha: true, antialias: true, powerPreference: "low-power", preserveDrawingBuffer: true })
        || canvas.getContext("webgl", { alpha: true, antialias: true, powerPreference: "low-power", preserveDrawingBuffer: true });
    } catch (error) {
      gl = null;
    }
    if (!gl) {
      state.failed = true;
      return null;
    }
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, context: gl, alpha: true, antialias: true, preserveDrawingBuffer: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    canvas.addEventListener("webglcontextlost", (event) => {
      event.preventDefault();
      state.failed = true;
      detach(false);
      document.querySelectorAll("[data-diagram]").forEach((fig) => fig.classList.add("is-static"));
    });
    state.renderer = renderer;
    state.canvas = canvas;
    return renderer;
  }

  function model(id) {
    if (!state.built[id]) state.built[id] = BUILDERS[id]();
    return state.built[id];
  }

  function paint(id) {
    const renderer = state.renderer;
    const view = state.canvas && state.canvas.parentElement;
    const figModel = model(id);
    if (!renderer || !view) return;
    const width = view.clientWidth;
    const height = view.clientHeight;
    if (width < 2 || height < 2) return;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setSize(width, height, false);
    figModel.camera.aspect = width / height;
    figModel.camera.updateProjectionMatrix();
    renderer.render(figModel.scene, figModel.camera);
    state.frames += 1;
  }

  function highlight(id) {
    if (!state.activeId || !TEXT[state.activeId] || !TEXT[state.activeId][id]) return;
    const figModel = model(state.activeId);
    Object.keys(figModel.groups).forEach((key) => {
      const group = figModel.groups[key];
      const on = key === id;
      (group.userData.parts || []).forEach((mesh) => {
        mesh.material.emissive = new THREE.Color(on ? 0x115e59 : 0x000000);
        mesh.material.emissiveIntensity = on ? 0.55 : 0;
      });
      group.userData.lift = on ? 0.16 : 0;
    });
    const root = document.querySelector('[data-diagram="' + state.activeId + '"]');
    const copy = TEXT[state.activeId][id];
    if (root && copy) {
      root.querySelector("[data-diagram-title]").textContent = copy[0];
      root.querySelector("[data-diagram-copy]").textContent = copy[1];
      root.querySelectorAll("[data-select]").forEach((button) => {
        button.setAttribute("aria-pressed", button.dataset.select === id ? "true" : "false");
      });
    }
    figModel.selected = id;
    ease();
  }

  function ease() {
    cancelAnimationFrame(state.anim);
    const figModel = state.activeId && state.built[state.activeId];
    if (!figModel) return;
    if (REDUCED) {
      Object.values(figModel.groups).forEach((group) => { group.position.y = (group.userData.baseY || 0) + (group.userData.lift || 0); });
      paint(state.activeId);
      return;
    }
    const started = performance.now();
    const from = {};
    Object.entries(figModel.groups).forEach(([key, group]) => { from[key] = group.position.y; });
    const step = (now) => {
      if (!state.activeId || !state.built[state.activeId]) return;
      const t = Math.min(1, (now - started) / 180);
      const k = 1 - Math.pow(1 - t, 3);
      Object.entries(figModel.groups).forEach(([key, group]) => {
        const target = (group.userData.baseY || 0) + (group.userData.lift || 0);
        group.position.y = from[key] + (target - from[key]) * k;
      });
      paint(state.activeId);
      if (t < 1) state.anim = requestAnimationFrame(step);
    };
    state.anim = requestAnimationFrame(step);
  }

  function detach(keepStill) {
    cancelAnimationFrame(state.anim);
    if (!state.activeId) return;
    const fig = document.querySelector('[data-diagram="' + state.activeId + '"]');
    if (keepStill && fig && state.canvas && state.canvas.parentElement) {
      paint(state.activeId);
      try {
        let still = fig.querySelector(".diagram-still");
        if (!still) {
          still = document.createElement("img");
          still.className = "diagram-still";
          still.alt = "";
          fig.querySelector(".diagram-stage").appendChild(still);
        }
        still.src = state.canvas.toDataURL("image/png");
        still.hidden = false;
      } catch (error) {
        /* 上下文丢失时保留 SVG。 */
      }
    }
    if (fig) fig.classList.remove("is-live");
    if (state.canvas) state.canvas.remove();
    state.activeId = null;
  }

  function attach(id) {
    if (state.failed || !BUILDERS[id]) return;
    const fig = document.querySelector('[data-diagram="' + id + '"]');
    if (!fig || fig.classList.contains("is-static")) return;
    if (!ensureRenderer()) {
      document.querySelectorAll("[data-diagram]").forEach((node) => node.classList.add("is-static"));
      return;
    }
    if (state.activeId === id && state.canvas.parentElement) {
      paint(id);
      return;
    }
    detach(true);
    const view = fig.querySelector("[data-diagram-view]");
    view.appendChild(state.canvas);
    fig.classList.add("is-live");
    const still = fig.querySelector(".diagram-still");
    if (still) still.hidden = true;
    state.activeId = id;
    const figModel = model(id);
    if (!figModel.selected) highlight(figModel.initial);
    else paint(id);
    requestAnimationFrame(() => { if (state.activeId === id) paint(id); });
  }

  function desired() {
    if (state.failed) return null;
    const figures = [...document.querySelectorAll("[data-diagram]")];
    if (document.body.classList.contains("is-teaching")) {
      const slide = document.querySelector("main .slide.is-current");
      const fig = slide && slide.querySelector("[data-diagram]");
      if (!fig || fig.classList.contains("is-static")) return null;
      return fig.dataset.diagram;
    }
    let best = null;
    let ratio = 0.28;
    figures.forEach((fig) => {
      if (fig.classList.contains("is-static")) return;
      const value = state.ratios.get(fig) || 0;
      if (value > ratio) {
        ratio = value;
        best = fig.dataset.diagram;
      }
    });
    return best;
  }

  function sync() {
    const id = desired();
    if (!id) detach(true);
    else attach(id);
  }

  function bind(fig) {
    const id = fig.dataset.diagram;
    fig.addEventListener("keydown", (event) => {
      const order = model(id).order;
      const current = (state.built[id] && state.built[id].selected) || model(id).initial;
      const index = Math.max(0, order.indexOf(current));
      let next = null;
      if (event.key === "ArrowRight" || event.key === "ArrowDown") next = order[(index + 1) % order.length];
      if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = order[(index - 1 + order.length) % order.length];
      if (!next) return;
      event.preventDefault();
      event.stopPropagation();
      if (state.activeId !== id) attach(id);
      highlight(next);
    });
    fig.querySelectorAll("[data-select]").forEach((button) => {
      button.addEventListener("click", () => {
        if (state.failed || fig.classList.contains("is-static")) return;
        attach(id);
        highlight(button.dataset.select);
        fig.focus();
      });
    });
    const toggle = fig.querySelector("[data-static]");
    if (toggle) {
      toggle.addEventListener("click", () => {
        fig.classList.toggle("is-static");
        const manual = fig.classList.contains("is-static");
        toggle.textContent = manual ? "看立体图" : "看静态图";
        if (manual && state.activeId === id) detach(false);
        sync();
      });
    }
    const view = fig.querySelector("[data-diagram-view]");
    view.addEventListener("pointerdown", (event) => {
      if (!state.canvas || state.activeId !== id) return;
      const rect = state.canvas.getBoundingClientRect();
      const pointer = {
        x: ((event.clientX - rect.left) / rect.width) * 2 - 1,
        y: -((event.clientY - rect.top) / rect.height) * 2 + 1,
      };
      const ray = new THREE.Raycaster();
      ray.setFromCamera(pointer, model(id).camera);
      const hits = ray.intersectObjects(model(id).scene.children, true);
      for (let i = 0; i < hits.length; i += 1) {
        let obj = hits[i].object;
        while (obj && !obj.userData.sel) obj = obj.parent;
        if (obj && obj.userData.sel && TEXT[id][obj.userData.sel]) {
          highlight(obj.userData.sel);
          fig.focus();
          break;
        }
      }
    });
  }

  function boot() {
    if (!window.THREE || !THREE.WebGLRenderer) return;
    const figures = [...document.querySelectorAll("[data-diagram]")];
    if (!figures.length) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => state.ratios.set(entry.target, entry.isIntersecting ? entry.intersectionRatio : 0));
      sync();
    }, { threshold: [0, 0.3, 0.6] });
    figures.forEach((fig) => {
      bind(fig);
      observer.observe(fig);
    });
    window.addEventListener("resize", () => { if (state.activeId) paint(state.activeId); });
    if (window.ResizeObserver) {
      const resize = new ResizeObserver(() => { if (state.activeId) paint(state.activeId); });
      figures.forEach((fig) => resize.observe(fig.querySelector("[data-diagram-view]")));
    }
    sync();
  }

  window.LiteratureDiagrams = {
    sync: sync,
    frames: function () { return state.frames; },
    contexts: function () { return state.renderer ? 1 : 0; },
    failed: function () { return state.failed; },
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
