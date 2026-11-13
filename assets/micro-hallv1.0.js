/* 微观馆 · Cells & Molecules v1.0 — homepage section data + render.
   To add a page (e.g. DNA / RNA): fill in href + img and set status:'live'. Cards render in array order. */
(() => {
  const MICRO = [
    { id: 'cell', status: 'live', color: '#a46bff', stops: 9,
      kind: ['细胞生物学', 'Cell biology'], title: ['动物细胞', 'Animal Cell'],
      d: ['镜头依次飞进细胞核、内质网、线粒体、高尔基体、溶酶体、中心体和细胞膜，配教科书典型数值和 3 个课堂问题。',
          'Fly into the nucleus, ER, mitochondria, Golgi, lysosomes, centrosome and plasma membrane, with typical textbook values and three classroom questions.'],
      tags: ['pH · Ca²⁺', '细胞器 Organelles', '课堂问题 Q&A'],
      img: 'assets/cell/cell-herov1.0.webp', href: 'lessons/cell-explorerv1.0.html' },
    { id: 'neuron', status: 'live', color: '#5ee7ff', stops: 9,
      kind: ['神经生物学', 'Neurobiology'], title: ['神经元', 'Neuron'],
      d: ['顺着信号从胞体走到突触：膜电位曲线、跳跃式传导动画，每站附一个临床联系。',
          'Follow a signal from soma to synapse: a membrane-potential trace, saltatory conduction and a clinical link at every stop.'],
      tags: ['动作电位 AP', '髓鞘 Myelin', '突触 Synapse'],
      img: 'assets/neuron/neuron-herov1.0.webp', href: 'lessons/neuron-explorerv1.0.html' },
    { id: 'exosome', status: 'live', color: '#ffb547', stops: 11,
      kind: ['细胞生物学 · 科研方法', 'Cell biology · methods'], title: ['外泌体与细胞外囊泡', 'Exosomes & EVs'],
      d: ['两幕 11 站：从多囊体出芽、货物装载到超速离心、分离和鉴定，配 MISEV2023 要点与参考文献。',
          'Two acts, 11 stops: from MVB budding and cargo loading to ultracentrifugation, separation and characterization, with MISEV2023 notes and references.'],
      tags: ['MVB · ESCRT', '超速离心 UC', 'MISEV2023'],
      img: 'assets/exosome/exosome-herov1.0.webp', href: 'lessons/exosome-explorerv1.0.html' },
    { id: 'ev-guide', status: 'live', color: '#ff8a3d', badge: '互动指南 · GUIDE', go: '打开指南 Open guide',
      kind: ['方法学指南 · 互动工具', 'Methods guide · interactive'], title: ['EV 提取方法指南', 'EV isolation methods guide'],
      d: ['外泌体漫游的姊妹篇：七种提取方法、方案推荐器、MISEV2023 质控清单和 45 篇核验文献。',
          'Companion to the EV explorer: seven isolation methods, a route recommender, a MISEV2023 QC checklist and 45 verified references (in Chinese).'],
      tags: ['方案推荐器 Recommender', '质控 QC', 'MISEV2023'],
      img: 'assets/ev-guide/ev-herov1.0.webp', href: 'lessons/ev-isolation-guidev1.0.html' },
    { id: 'dna', status: 'soon', color: '#38e0c6',
      kind: ['分子生物学', 'Molecular biology'], title: ['DNA 双螺旋与复制', 'DNA double helix & replication'],
      d: ['碱基配对、双螺旋的几何结构，以及复制叉上的解旋酶和 DNA 聚合酶。',
          'Base pairing, the geometry of the double helix, and helicase and DNA polymerase at the replication fork.'] },
    { id: 'rna', status: 'soon', color: '#ff5d9e',
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
  const live = MICRO.filter(m => m.status === 'live');
  const tours = live.filter(m => m.stops);
  const stops = tours.reduce((a, m) => a + (m.stops || 0), 0);
  const sc = document.getElementById('microStats');
  if (sc) sc.innerHTML = `<li><b>${tours.length}</b>场漫游 TOURS</li><li><b>${stops}</b>站 STOPS</li><li><b>${MICRO.length - live.length}</b>即将上线 SOON</li>`;
  grid.innerHTML = MICRO.map(m => {
    const head = `<span class="mh-kind">${esc(m.kind[0])}<i>${esc(m.kind[1])}</i></span>
      <h3>${esc(m.title[0])}<small lang="en">${esc(m.title[1])}</small></h3>
      <p>${esc(m.d[0])}</p><p class="mh-en" lang="en">${esc(m.d[1])}</p>`;
    if (m.status !== 'live') {
      return `<div class="mh-card soon" style="--mc:${m.color}" aria-label="${esc(m.title[0])}：即将上线 Coming soon">
        <div class="mh-pic">${helix(m.color)}<span class="mh-badge">即将上线 · COMING SOON</span></div>
        <div class="mh-txt">${head}<div class="mh-go"><span>筹备中 In the works</span></div></div></div>`;
    }
    return `<a class="mh-card" href="${m.href}" style="--mc:${m.color}">
      <div class="mh-pic"><img src="${m.img}" alt="${esc(m.title[0])}${m.stops ? '漫游' : ''}示意图（AI 生成）" loading="lazy" width="1000" height="1000"><span class="mh-badge">${m.badge ? esc(m.badge) : m.stops + ' 站 · STOPS'}</span></div>
      <div class="mh-txt">${head}
        <div class="mh-tags">${(m.tags || []).map(t => `<i>${esc(t)}</i>`).join('')}</div>
        <div class="mh-go"><span>${m.go ? esc(m.go) : '开始漫游 Explore'}</span><b aria-hidden="true">→</b></div></div></a>`;
  }).join('');
})();
