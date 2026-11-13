/* 医学教学馆 · Medical Teaching Hall v2.0 — homepage section 09 (id #micro; aliases #medhall, #macro).
   One hall, two doors: 微观馆 (track 'micro', cells & molecules) and 宏观馆 (track 'macro', anatomy & clinical).
   To add a page: give it a track, fill in href + img, set status:'live'. Cards render in array order; feat:true = full-width card.
   Door choice: #micro / #macro in the URL win; otherwise the last door the visitor opened (localStorage), else 微观馆. */
(() => {
  const DOORS = [
    { id: 'micro', zh: '微观馆', en: 'MICRO', sub: ['细胞与分子', 'Cells & molecules'], color: '#a46bff',
      imgs: ['assets/cell/cell-herov1.0.webp', 'assets/neuron/neuron-herov1.0.webp', 'assets/exosome/exosome-herov1.0.webp'],
      intro: ['显微镜下的世界：细胞、分子与囊泡，全屏自动漫游', 'The world under the microscope: cells, molecules and vesicles as full-screen guided tours.'] },
    { id: 'macro', zh: '宏观馆', en: 'MACRO', sub: ['人体解剖与临床', 'Anatomy & clinical'], color: '#ff6b5e',
      imgs: ['assets/fracture/fracture-herov1.0.webp'],
      intro: ['肉眼解剖到临床决策：可旋转、可逐层剥离的 3D 人体与创伤课件', 'From gross anatomy to clinical decisions: 3D body and trauma courseware you can rotate and dissect layer by layer.'] }
  ];
  const KEY = 'aiai-medhall-door';
  const HALL = [

    { id: 'cell', track: 'micro', status: 'live', color: '#a46bff', stops: 9,
      kind: ['细胞生物学', 'Cell biology'], title: ['动物细胞', 'Animal Cell'],
      d: ['镜头依次飞进细胞核、内质网、线粒体、高尔基体、溶酶体、中心体和细胞膜，配教科书典型数值和 3 个课堂问题。',
          'Fly into the nucleus, ER, mitochondria, Golgi, lysosomes, centrosome and plasma membrane, with typical textbook values and three classroom questions.'],
      tags: ['pH · Ca²⁺', '细胞器 Organelles', '课堂问题 Q&A'],
      img: 'assets/cell/cell-herov1.0.webp', href: 'lessons/cell-explorerv1.0.html' },
    { id: 'neuron', track: 'micro', status: 'live', color: '#5ee7ff', stops: 9,
      kind: ['神经生物学', 'Neurobiology'], title: ['神经元', 'Neuron'],
      d: ['顺着信号从胞体走到突触：膜电位曲线、跳跃式传导动画，每站附一个临床联系。',
          'Follow a signal from soma to synapse: a membrane-potential trace, saltatory conduction and a clinical link at every stop.'],
      tags: ['动作电位 AP', '髓鞘 Myelin', '突触 Synapse'],
      img: 'assets/neuron/neuron-herov1.0.webp', href: 'lessons/neuron-explorerv1.0.html' },
    { id: 'exosome', track: 'micro', status: 'live', color: '#ffb547', stops: 11,
      kind: ['细胞生物学 · 科研方法', 'Cell biology · methods'], title: ['外泌体与细胞外囊泡', 'Exosomes & EVs'],
      d: ['两幕 11 站：从多囊体出芽、货物装载到超速离心、分离和鉴定，配 MISEV2023 要点与参考文献。',
          'Two acts, 11 stops: from MVB budding and cargo loading to ultracentrifugation, separation and characterization, with MISEV2023 notes and references.'],
      tags: ['MVB · ESCRT', '超速离心 UC', 'MISEV2023'],
      img: 'assets/exosome/exosome-herov1.0.webp', href: 'lessons/exosome-explorerv1.0.html' },
    { id: 'ev-guide', track: 'micro', status: 'live', color: '#ff8a3d', badge: '互动指南 · GUIDE', go: '打开指南 Open guide',
      kind: ['方法学指南 · 互动工具', 'Methods guide · interactive'], title: ['EV 提取方法指南', 'EV isolation methods guide'],
      d: ['外泌体漫游的姊妹篇：七种提取方法、方案推荐器、MISEV2023 质控清单、17 张文献原图和 49 篇核验文献。',
          'Companion to the EV explorer: seven isolation methods, a route recommender, a MISEV2023 QC checklist, 17 figures reproduced from the literature and 49 verified references (in Chinese).'],
      tags: ['方案推荐器 Recommender', '质控 QC', 'MISEV2023'],
      img: 'assets/ev-guide/ev-herov1.0.webp', href: 'lessons/ev-isolation-guidev1.0.html' },
    { id: 'fracture', track: 'macro', status: 'live', color: '#ff6b5e', feat: true, badge: '3D · WEBGL', go: '打开课件 Open courseware',
      kind: ['骨科创伤 · 医学生 / 规培医生', 'Orthopaedic trauma · students & residents'], title: ['胫骨干骨折愈合', 'Tibial shaft fracture healing'],
      sub: ['3D 解剖与 AO 时间轴', '3D anatomy & AO timeline'],
      d: ['真实小腿解剖 12 层逐层剥离，骨折平面横断面，按 AO 校准的愈合时间轴（D0 到 1 年），骨筋膜室综合征识别，配 10 题测验。',
          'Real lower-leg anatomy in 12 dissection layers, a cross-section at the fracture plane, an AO-calibrated healing timeline from day 0 to one year, compartment syndrome, and a 10-question quiz.'],
      tags: ['12 层解剖 Layers', 'AO 时间轴 Timeline', '骨筋膜室 Compartment', '测验 Quiz'],
      img: 'assets/fracture/fracture-herov1.0.webp', alt: '胫骨干骨折愈合 3D 课件截图：小腿肌肉、血管与骨折处血肿', href: 'lessons/fracture-healing/fracture-healingv0.4.html' },
    { id: 'bodyvista', track: 'macro', status: 'soon', color: '#ff8a3d', glyph: 'body',
      kind: ['系统解剖 · 3D', 'Systemic anatomy · 3D'], title: ['3D 解剖馆 · 全身系统解剖（BodyVista）', '3D anatomy hall · whole-body systems (BodyVista)'],
      d: ['BodyVista 全身模型：按系统点亮骨骼、肌肉、血管与神经，可旋转、可逐层剥离。',
          'A whole-body BodyVista model: light up bones, muscles, vessels and nerves system by system, rotate and peel layer by layer.'] },
    { id: 'pelvis', track: 'macro', status: 'soon', color: '#e8534a', glyph: 'pelvis',
      kind: ['急诊创伤 · 解剖', 'Emergency trauma · anatomy'], title: ['骨盆骨折与骨盆带', 'Pelvic fractures & the pelvic ring'],
      d: ['骨盆环的稳定结构、骨折分型与出血来源，到急诊骨盆带的放置位置和时机。',
          'The pelvic ring and what keeps it stable, fracture patterns and bleeding sources, and where and when to apply a pelvic binder in the ED.'] },
    { id: 'dna', track: 'micro', status: 'soon', color: '#38e0c6',
      kind: ['分子生物学', 'Molecular biology'], title: ['DNA 双螺旋与复制', 'DNA double helix & replication'],
      d: ['碱基配对、双螺旋的几何结构，以及复制叉上的解旋酶和 DNA 聚合酶。',
          'Base pairing, the geometry of the double helix, and helicase and DNA polymerase at the replication fork.'] },
    { id: 'rna', track: 'micro', status: 'soon', color: '#ff5d9e',
      kind: ['分子生物学', 'Molecular biology'], title: ['RNA 转录与翻译', 'RNA transcription & translation'],
      d: ['从 RNA 聚合酶读出 mRNA，到核糖体按密码子把氨基酸连成肽链。',
          'From RNA polymerase reading out mRNA to the ribosome joining amino acids codon by codon.'] }
  ];
  const grid = document.getElementById('microGrid');
  if (!grid) return;
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
  const helix = c => {
    let rungs = '';
    for (let k = 0; k < 14; k++) {
      const y = 12 + k * 13, ph = k * 0.62, x1 = 80 + 42 * Math.sin(ph), x2 = 80 - 42 * Math.sin(ph);
      rungs += `<line x1="${x1.toFixed(1)}" y1="${y}" x2="${x2.toFixed(1)}" y2="${y}" stroke="${c}" stroke-opacity=".35" stroke-width="2"/>` +
        `<circle cx="${x1.toFixed(1)}" cy="${y}" r="4" fill="${c}"/><circle cx="${x2.toFixed(1)}" cy="${y}" r="4" fill="#cfe8ff" fill-opacity=".8"/>`;
    }
    return `<svg class="mh-helix" viewBox="0 0 160 200" aria-hidden="true">${rungs}</svg>`;
  };
  // Simple line glyphs for the macro "coming soon" cards (a body outline, a pelvic ring with a binder band).
  const glyphs = {
    body: c => `<svg class="mh-glyph" viewBox="0 0 160 200" aria-hidden="true" fill="none" stroke="${c}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="80" cy="26" r="15"/><path d="M80 41v8M56 58c8-6 40-6 48 0l10 52M56 58l-10 52M64 62l2 52-6 74M96 62l-2 52 6 74M66 114h28M80 70v40" />
      <path d="M80 72c-6 10-6 22 0 30M80 72c6 10 6 22 0 30" stroke="#cfe8ff" stroke-opacity=".7" stroke-width="2"/></svg>`,
    pelvis: c => `<svg class="mh-glyph" viewBox="0 0 160 200" aria-hidden="true" fill="none" stroke="${c}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
      <path d="M80 60c-10 0-14 8-14 16v18M80 60c10 0 14 8 14 16v18"/>
      <path d="M66 80C48 66 26 66 20 82c-6 18 10 40 30 50 10 6 18 14 22 22M94 80c18-14 40-14 46 2 6 18-10 40-30 50-10 6-18 14-22 22"/>
      <ellipse cx="80" cy="128" rx="22" ry="16" stroke="#cfe8ff" stroke-opacity=".75" stroke-width="2"/>
      <path d="M14 118h132" stroke="#cfe8ff" stroke-opacity=".55" stroke-width="7"/></svg>`
  };
  const by = id => HALL.filter(m => m.track === id);
  const nLive = id => by(id).filter(m => m.status === 'live').length;
  const nSoon = HALL.filter(m => m.status !== 'live').length;
  const sc = document.getElementById('microStats');
  if (sc) sc.innerHTML = `<li><b>${nLive('micro')}</b>微观 MICRO</li><li><b>${nLive('macro')}</b>宏观 MACRO</li><li><b>${nSoon}</b>即将上线 SOON</li>`;
  const card = m => {
    const head = `<span class="mh-kind">${esc(m.kind[0])}<i>${esc(m.kind[1])}</i></span>
      <h3>${esc(m.title[0])}${m.sub ? ` · ${esc(m.sub[0])}` : ''}<small lang="en">${esc(m.title[1])}${m.sub ? ` · ${esc(m.sub[1])}` : ''}</small></h3>
      <p>${esc(m.d[0])}</p><p class="mh-en" lang="en">${esc(m.d[1])}</p>`;
    if (m.status !== 'live') {
      const art = m.glyph ? glyphs[m.glyph](m.color) : helix(m.color);
      return `<div class="mh-card soon${m.track === 'micro' ? ' tall' : ''}" style="--mc:${m.color}" role="group" aria-label="${esc(m.title[0])}：即将上线 Coming soon">
        <div class="mh-pic">${art}<span class="mh-badge">即将上线 · COMING SOON</span></div>
        <div class="mh-txt">${head}<div class="mh-go"><span>筹备中 In the works</span></div></div></div>`;
    }
    return `<a class="mh-card${m.feat ? ' feat' : ''}" href="${m.href}" style="--mc:${m.color}">
      <div class="mh-pic"><img src="${m.img}" alt="${m.alt ? esc(m.alt) : esc(m.title[0]) + (m.stops ? '漫游' : '') + '示意图（AI 生成）'}" loading="lazy" width="1000" height="${m.feat ? 625 : 1000}"><span class="mh-badge">${m.badge ? esc(m.badge) : m.stops + ' 站 · STOPS'}</span></div>
      <div class="mh-txt">${head}
        <div class="mh-tags">${(m.tags || []).map(t => `<i>${esc(t)}</i>`).join('')}</div>
        <div class="mh-go"><span>${m.go ? esc(m.go) : '开始漫游 Explore'}</span><b aria-hidden="true">→</b></div></div></a>`;
  };

  const doorsEl = document.getElementById('medDoors');
  const intro = document.getElementById('medIntro');
  let cur = null;
  if (doorsEl) {
    doorsEl.innerHTML = DOORS.map(d => {
      const live = nLive(d.id), soon = by(d.id).length - live;
      const pics = d.imgs.map(s => `<img src="${s}" alt="" loading="lazy" width="400" height="400">`).join('');
      return `<button type="button" role="tab" class="mh-door" id="medDoor-${d.id}" data-h="${d.id}" aria-controls="microGrid" aria-selected="false" tabindex="-1" style="--dc:${d.color}">
        <span class="mh-door-pic n${d.imgs.length}" aria-hidden="true">${pics}</span>
        <span class="mh-door-txt"><span class="mh-door-k">${esc(d.en)} · ${esc(d.sub[0])}</span>
          <span class="mh-door-name">${esc(d.zh)}</span><span class="mh-door-en" lang="en">${esc(d.sub[1])}</span>
          <span class="mh-door-n"><b>${live}</b> 件上线${soon ? ` · ${soon} 即将` : ''}</span></span>
        <span class="mh-door-arrow" aria-hidden="true">→</span></button>`;
    }).join('');
  }
  const select = (id, opts = {}) => {
    if (!DOORS.some(d => d.id === id)) id = 'micro';
    const d = DOORS.find(x => x.id === id);
    if (doorsEl) doorsEl.querySelectorAll('.mh-door').forEach(b => {
      const on = b.dataset.h === id;
      b.setAttribute('aria-selected', on); b.tabIndex = on ? 0 : -1;
    });
    if (intro) intro.innerHTML = `<b>${esc(d.zh)}</b>${esc(d.intro[0])}<span class="en" lang="en">${esc(d.intro[1])}</span>`;
    grid.setAttribute('aria-labelledby', 'medDoor-' + id);
    grid.dataset.hall = id;
    const paint = () => { grid.innerHTML = by(id).map(card).join(''); };
    if (cur === null || opts.instant || matchMedia('(prefers-reduced-motion: reduce)').matches) { paint(); }
    else if (cur !== id) {
      grid.classList.add('mh-out');
      setTimeout(() => { paint(); grid.classList.remove('mh-out'); grid.classList.add('mh-in'); requestAnimationFrame(() => requestAnimationFrame(() => grid.classList.remove('mh-in'))); }, 180);
    }
    cur = id;
    if (opts.remember) { try { localStorage.setItem(KEY, id); } catch (e) {} }
  };
  const stored = () => { try { return localStorage.getItem(KEY); } catch (e) { return null; } };
  const fromHash = () => { const m = location.hash.match(/^#(micro|macro)$/); return m ? m[1] : null; };
  if (doorsEl) {
    doorsEl.addEventListener('click', e => {
      const b = e.target.closest('.mh-door'); if (!b) return;
      select(b.dataset.h, { remember: true });
      if (/^#(micro|macro|medhall)$/.test(location.hash)) history.replaceState(null, '', '#' + b.dataset.h);
    });
    doorsEl.addEventListener('keydown', e => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) return;
      const bs = [...doorsEl.querySelectorAll('.mh-door')], i = bs.indexOf(document.activeElement);
      if (i < 0) return; e.preventDefault();
      const j = e.key === 'Home' ? 0 : e.key === 'End' ? bs.length - 1 : (i + (e.key === 'ArrowRight' ? 1 : -1) + bs.length) % bs.length;
      bs[j].focus(); bs[j].click();
    });
  }
  select(fromHash() || stored() || 'micro', { instant: true });
  window.addEventListener('hashchange', () => {
    const h = fromHash();
    if (h) select(h, { remember: true });
    else if (location.hash === '#medhall') select(stored() || 'micro');
  });
  // Deep links (#micro / #macro / #medhall): content above loads late and pushes the hall down, so re-align once after load.
  const realign = () => {
    if (!/^#(micro|macro|medhall)$/.test(location.hash)) return;
    const sec = document.getElementById('micro'), top = sec.getBoundingClientRect().top;
    if (Math.abs(top) > 120) sec.scrollIntoView({ block: 'start' });
  };
  window.addEventListener('load', () => { setTimeout(realign, 400); setTimeout(realign, 1600); });
})();
