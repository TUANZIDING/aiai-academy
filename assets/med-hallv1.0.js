/* 医学教学馆 · Medical Teaching Hall v1.0 — homepage section 09 (was 微观馆 v1.0; section id stays #micro, alias #medhall).
   Two tracks: micro (细胞与分子) and clinical (解剖与临床). To add a page: give it a track, fill in href + img, set status:'live'.
   Cards render in array order; feat:true = wide card (spans 4 of 6 columns). */
(() => {
  const TRACKS = [
    { id: 'all', zh: '全部', en: 'All' },
    { id: 'micro', zh: '微观 · 细胞与分子', en: 'Cells & molecules' },
    { id: 'clinical', zh: '解剖与临床', en: 'Anatomy & clinical' }
  ];
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
    { id: 'fracture', track: 'clinical', status: 'live', color: '#ff6b5e', feat: true, badge: '3D · WEBGL', go: '打开课件 Open courseware',
      kind: ['骨科创伤 · 医学生 / 规培医生', 'Orthopaedic trauma · students & residents'], title: ['胫骨干骨折愈合', 'Tibial shaft fracture healing'],
      sub: ['3D 解剖与 AO 时间轴', '3D anatomy & AO timeline'],
      d: ['真实小腿解剖 12 层逐层剥离，骨折平面横断面，按 AO 校准的愈合时间轴（D0 到 1 年），骨筋膜室综合征识别，配 10 题测验。',
          'Real lower-leg anatomy in 12 dissection layers, a cross-section at the fracture plane, an AO-calibrated healing timeline from day 0 to one year, compartment syndrome, and a 10-question quiz.'],
      tags: ['12 层解剖 Layers', 'AO 时间轴 Timeline', '骨筋膜室 Compartment', '测验 Quiz'],
      img: 'assets/fracture/fracture-herov1.0.webp', alt: '胫骨干骨折愈合 3D 课件截图：小腿肌肉、血管与骨折处血肿', href: 'lessons/fracture-healing/fracture-healingv0.4.html' },
    { id: 'cads-ct', track: 'clinical', status: 'live', color: '#4fd1e8', badge: 'CT · v1.1', go: '打开课件 Open courseware',
      kind: ['影像解剖 · 医学生 / 规培医生', 'Imaging anatomy · students & residents'], title: ['CADS 全身 CT 交互解剖阅片', 'CADS Interactive Whole-body CT Anatomy'],
      d: ['真实创伤 CT，109 个彩色结构，横断 / 冠状 / 矢状 / 3D 四窗联动，悬停显示中英拉丁名，配 6 个教学导览和找结构测验。',
          'A real trauma CT with 109 colour-coded structures, linked axial / coronal / sagittal / 3D views, zh/EN/Latin names on hover, six guided stops and a find-the-structure quiz.'],
      tags: ['真实 CT Real CT', '109 结构 Structures', '中英拉丁 zh/EN/Lat', 'GitHub 开源 Open source'],
      img: 'assets/cads/cads-ct-herov1.0.webp', alt: 'CADS 全身 CT 阅片器截图：冠状面与矢状面彩色结构标注及中文名称', href: 'lessons/cads-ct-teaching/cads-ct-teachingv1.1.html' },
    // To add BodyVista later: another track:'clinical' card here (no feat), status:'live', img + href.
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
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
  const helix = c => {
    let rungs = '';
    for (let k = 0; k < 14; k++) {
      const y = 12 + k * 13, ph = k * 0.62, x1 = 80 + 42 * Math.sin(ph), x2 = 80 - 42 * Math.sin(ph);
      rungs += `<line x1="${x1.toFixed(1)}" y1="${y}" x2="${x2.toFixed(1)}" y2="${y}" stroke="${c}" stroke-opacity=".35" stroke-width="2"/>` +
        `<circle cx="${x1.toFixed(1)}" cy="${y}" r="4" fill="${c}"/><circle cx="${x2.toFixed(1)}" cy="${y}" r="4" fill="#cfe8ff" fill-opacity=".8"/>`;
    }
    return `<svg class="mh-helix" viewBox="0 0 160 200" aria-hidden="true">${rungs}</svg>`;
  };
  const live = HALL.filter(m => m.status === 'live');
  const sc = document.getElementById('microStats');
  if (sc) sc.innerHTML = `<li><b>${live.length}</b>件上线 LIVE</li><li><b>${TRACKS.length - 1}</b>个分区 TRACKS</li><li><b>${HALL.length - live.length}</b>即将上线 SOON</li>`;
  const card = m => {
    const head = `<span class="mh-kind">${esc(m.kind[0])}<i>${esc(m.kind[1])}</i></span>
      <h3>${esc(m.title[0])}${m.sub ? ` · ${esc(m.sub[0])}` : ''}<small lang="en">${esc(m.title[1])}${m.sub ? ` · ${esc(m.sub[1])}` : ''}</small></h3>
      <p>${esc(m.d[0])}</p><p class="mh-en" lang="en">${esc(m.d[1])}</p>`;
    if (m.status !== 'live') {
      return `<div class="mh-card soon" style="--mc:${m.color}" aria-label="${esc(m.title[0])}：即将上线 Coming soon">
        <div class="mh-pic">${helix(m.color)}<span class="mh-badge">即将上线 · COMING SOON</span></div>
        <div class="mh-txt">${head}<div class="mh-go"><span>筹备中 In the works</span></div></div></div>`;
    }
    return `<a class="mh-card${m.feat ? ' feat' : ''}" href="${m.href}" style="--mc:${m.color}">
      <div class="mh-pic"><img src="${m.img}" alt="${m.alt ? esc(m.alt) : esc(m.title[0]) + (m.stops ? '漫游' : '') + '示意图（AI 生成）'}" loading="lazy" width="1000" height="${m.feat ? 625 : 1000}"><span class="mh-badge">${m.badge ? esc(m.badge) : m.stops + ' 站 · STOPS'}</span></div>
      <div class="mh-txt">${head}
        <div class="mh-tags">${(m.tags || []).map(t => `<i>${esc(t)}</i>`).join('')}</div>
        <div class="mh-go"><span>${m.go ? esc(m.go) : '开始漫游 Explore'}</span><b aria-hidden="true">→</b></div></div></a>`;
  };
  const chips = document.getElementById('medChips');
  const render = t => { grid.innerHTML = HALL.filter(m => t === 'all' || m.track === t).map(card).join(''); };
  if (chips) {
    chips.innerHTML = TRACKS.map((t, i) => {
      const n = HALL.filter(m => t.id === 'all' || m.track === t.id).length;
      return `<button type="button" data-t="${t.id}" aria-pressed="${i === 0}">${esc(t.zh)}<span class="mh-chip-en" lang="en">${esc(t.en)}</span> <b>${n}</b></button>`;
    }).join('');
    chips.addEventListener('click', e => {
      const b = e.target.closest('button[data-t]'); if (!b) return;
      chips.querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', x === b));
      render(b.dataset.t);
    });
  }
  render('all');
  // Deep links (#micro / #medhall): content above loads late and pushes the hall down, so re-align once after load.
  const realign = () => {
    if (!/^#(micro|medhall)$/.test(location.hash)) return;
    const sec = document.getElementById('micro'), top = sec.getBoundingClientRect().top;
    if (Math.abs(top) > 120) sec.scrollIntoView({ block: 'start' });
  };
  window.addEventListener('load', () => { setTimeout(realign, 400); setTimeout(realign, 1600); });
})();
