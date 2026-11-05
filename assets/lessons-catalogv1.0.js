/* 课件馆目录 v1.0：主题筛选 + 横卡列表（参考 OiOi 医疗学习模块的结构） */
(() => {
  const TOPICS = [
    { id: 'all', name: '全部课件' },
    { id: 'case', name: '实战案例' },
    { id: 'offline', name: '线下课程' },
    { id: 'basic', name: 'AI 认知' },
    { id: 'sci', name: '科研与医学' }
  ];
  const HIS = 'https://hark.site/s/263c1fe8-4cbe-45de-81ef-4c687d5b9a99?hark_region=us';
  const ITEMS = [
    { t: 'basic', kind: 'AI 智能体 · 互动讲解', title: 'Loop 与 Graph：只批准最后一档', d: '从 Bun 的 11 天讲起：检查要能失败、两轮无新发现就停、删掉不传变量的箭头、失败只退一个单元、按撤销难度开闸。原创动画 + 原文配图，中文配音、双语字幕。', date: '2026-11-05', img: 'assets/story/loop-graph-thumbv2.0.svg', href: 'lessons/loop-graph-playbookv2.1.html', go: '开始讲解' },
    { t: 'sci', kind: '细胞生物学 · 交互漫游', title: '外泌体与细胞外囊泡漫游：从多囊体出芽到超速离心', d: '两幕 11 站：EV 家族、内吞、多囊体出芽、货物装载、释放、体液漂流、摄取，再进实验室看差速超速离心、分离方法比较和鉴定；配 EV 生命周期动画、离心沉降与 NTA 粒径分布示意，每站一个科研/临床联系。', date: '2026-11-01', img: 'assets/exosome/exosome-herov1.0.webp', href: 'lessons/exosome-explorerv1.0.html', go: '开始漫游' },
    { t: 'sci', kind: '神经生物学 · 交互漫游', title: '神经元漫游：顺着信号从胞体走到突触', d: '镜头按信号走向停 8 站：胞体、尼氏体、高尔基体、线粒体、轴丘、髓鞘与郎飞结、末梢、突触；实时膜电位曲线和跳跃式传导动画（示意），每站附一个临床联系。', date: '2026-11-01', img: 'assets/neuron/neuron-herov1.0.webp', href: 'lessons/neuron-explorerv1.0.html', go: '开始漫游' },
    { t: 'sci', kind: '生物学 · 交互漫游', title: '动物细胞漫游：镜头飞进细胞核、线粒体和溶酶体', d: '自动镜头依次放大 8 个细胞结构，每站一张中文讲解卡，配教科书典型数值（pH、Ca²⁺、尺寸）和 3 个课堂问题，适合投屏讲给学生和孩子。', date: '2026-11-01', img: 'assets/cell/cell-herov1.0.webp', href: 'lessons/cell-explorerv1.0.html', go: '开始漫游' },
    { t: 'case', kind: '博士申请 · 投屏课件', title: '从急诊室到博士录取：我的申请路线图', d: '在职临床医生约 6 周集中准备：英语、研究方向、面试 PPT、医学英语到录取衔接，每站分清我做的和 AI 帮的，附 6 段提示词。', date: '2026-10-31', img: 'assets/story/phd-herov1.0.webp', href: 'lessons/phd-journeyv2.0.html', go: '进入课件' },
    { t: 'sci', kind: '科研工作流 · 实战课', title: '让 AI 当你的科研合伙人：Kosmos-lite', d: '从提出问题、检索文献到分析数据，让 AI 跑完整个科研循环，但每个结论都要回到证据，由人来下判断。', date: '2026-10-30', img: 'assets/story/kosmos-thumbv1.0.webp', href: 'lessons/kosmos-lite-coursev1.0.html', go: '进入课件' },
    { t: 'offline', kind: '梅斯医学工作坊 · 一页纸课纲', title: 'AI 进医院、进实验室、进家门（投屏版）', d: '两天线下工作坊的一页纸大纲：D1 医学教学、D2 医学科研与孩子教育，讲一段、练一段，适合开场投屏。', date: '2026-10-27', img: 'assets/story/medsci-herov1.0.webp', href: 'lessons/medsci-onepagev1.0.html', go: '打开课纲' },
    { t: 'offline', kind: '梅斯医学工作坊 · 完整课纲', title: 'AI 进医院、进实验室、进家门（10 个模块）', d: '10 个模块讲练交替，每个模块配真实作品和可复制提示词卡，从医学教学、科研写作一路讲到亲子项目。', date: '2026-10-27', img: 'assets/story/medsci-d1v1.0.webp', href: 'lessons/medsci-2dayv1.0.html', go: '打开课纲' },
    { t: 'basic', kind: 'AI 简史 · 故事课件', title: '七十年一场比赛：AI 是怎么走到今天的', d: '从图灵 1950 年的提问到 AlphaGo 第 37 手，再到大模型，24 页全屏故事讲清 AI 的历史和今天该怎么用。', date: '2026-10-27', img: 'assets/story/hist-move37v1.0.jpg', href: 'lessons/ai-historyv1.0.html', go: '进入课件' },
    { t: 'basic', kind: 'AI 判断力 · 故事课件', title: '驯化算法，守住判断：别被 AI 牵着鼻子走', d: '反过来利用推荐算法学习，用领域深耕和权威锚点，练出判断 AI 回答靠不靠谱的能力。', date: '2026-10-20', img: 'assets/story/judg-feedv1.0.jpg', href: 'lessons/ai-judgmentv1.0.html', go: '进入课件' },
    { t: 'sci', kind: '肿瘤学知识图谱 · 故事课件', title: '一张地图，装下肿瘤学：OnCo 入门', d: '用战术板和检验报告单的比喻，读懂开源肿瘤学知识图谱 OnCo，以及医生、研究者和 AI 各自怎么用它。', date: '2026-10-19', img: 'assets/story/onco-mapv1.0.jpg', href: 'lessons/onco-guidev1.0.html', go: '进入课件' },
    { t: 'sci', kind: '论文精读 · 多智能体', title: '谁派活，谁负责到底：RCM 论文精读', d: '用首诊负责制和会诊单，读懂多智能体协作论文 RCM（arXiv 预印本），数字逐一对照原文表格。', date: '2026-10-18', img: 'assets/story/rcm-erv1.0.jpg', href: 'lessons/rcm-paperv1.0.html', go: '进入课件' },
    { t: 'case', kind: '亲子伴读 · 实战案例', title: '从一本书到会说话的绘本', d: '一个急诊外科爸爸加 AI，10 天把孩子爱看的书做成漫画伴读、有声书和互动小游戏，需求、迭代和分工全过程。', date: '2026-10-16', img: 'assets/case-picturebook-coverv1.0.jpg', href: HIS, go: '进入案例', ext: 1 },
    { t: 'offline', kind: '示范路线 · 约 60 分钟 · 入门', title: 'AI 使用策略入门：先问，再核对', d: '同一个临床问题三种问法现场对比；让 AI 给出处、标边界；统计方法怎么问、怎么验收。', img: '', href: 'https://github.com/TUANZIDING/research-evidence', go: '看示范作品', ext: 1, route: 1 },
    { t: 'offline', kind: '示范路线 · 约 90 分钟 · 进阶', title: '从一次对话到一套工作流', d: '笔记到推文的证据可追溯写作流、多智能体接力、把好结果沉淀成技能、防幻觉引用的文献智能体。', img: '', href: 'https://github.com/TUANZIDING/codex-hark-bridge', go: '看示范作品', ext: 1, route: 1 },
    { t: 'offline', kind: '示范路线 · 半天 · 实操', title: '医生也能做出互动作品', d: '骨科创伤 3D 图谱拆解、证据分层的机制图谱、给自己孩子做读物、事实与推测分开画的阿房宫复原。', img: '', href: 'https://tuanziding.github.io/orthopaedic-trauma-atlas/', go: '看示范作品', ext: 1, route: 1 }
  ];
  const root = document.getElementById('lessonCatalog');
  if (!root) return;
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const SHOW = 6;
  let topic = 'all', open = false;
  const chips = root.querySelector('.lc-chips'), list = root.querySelector('.lc-list'), line = root.querySelector('.lc-line'), more = root.querySelector('.lc-more');
  chips.innerHTML = TOPICS.map(t => {
    const n = t.id === 'all' ? ITEMS.length : ITEMS.filter(i => i.t === t.id).length;
    return `<button type="button" data-t="${t.id}" aria-pressed="${t.id === topic}">${t.name}<b>${n}</b></button>`;
  }).join('');
  function render() {
    const rows = ITEMS.filter(i => topic === 'all' || i.t === topic);
    const tn = TOPICS.find(t => t.id === topic).name;
    line.textContent = `${tn} · ${rows.length} 门课件 · 从新到旧`;
    const vis = open ? rows : rows.slice(0, SHOW);
    list.innerHTML = vis.map(i => `<article class="lc-card${i.route ? ' is-route' : ''}">
      <a class="lc-thumb" href="${esc(i.href)}"${i.ext ? ' target="_blank" rel="noopener"' : ''} tabindex="-1" aria-hidden="true">${i.img ? `<img src="${esc(i.img)}" alt="" loading="lazy">` : `<span class="lc-route">示范<br>路线</span>`}</a>
      <div class="lc-body"><p class="lc-kind">${esc(i.kind)}</p><h3>${esc(i.title)}</h3><p class="lc-desc">${esc(i.d)}</p>
      <p class="lc-date">${i.date ? '更新于 ' + i.date : '线下示范 · 课后课件按场次上架'}</p>
      <a class="lc-go" href="${esc(i.href)}"${i.ext ? ' target="_blank" rel="noopener"' : ''}>${esc(i.go)}<span aria-hidden="true">↗</span></a></div></article>`).join('');
    more.hidden = rows.length <= SHOW;
    more.textContent = open ? '收起' : `展开全部 ${rows.length} 门 ↓`;
  }
  chips.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    topic = b.dataset.t; open = false;
    chips.querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', x === b));
    render();
  });
  more.onclick = () => { open = !open; render(); if (!open) root.scrollIntoView({ block: 'start' }); };
  render();
})();
