// fracture-teach v0.4 (v0.3 + anatomy-expert review: dissection-order layers, 名词委 terms, atlas cross-section) · 一期/二期、临床决策（AO 术后处理）、测验（中 / EN）

export const PRIMARY = {
  zh: {
    intro: '同一条 42-A3 横行骨折，<b>固定的稳定性</b>决定愈合路径。AO：相对稳定（石膏、髓内钉、桥接钢板）→ 间接愈合有骨痂；绝对稳定（加压）→ 直接愈合无骨痂[[AO-ORP]][[AO-PFM]]。Perren 应变 = 断端位移 ÷ 间隙宽度[[PERREN2002]]。',
    rows: [
      ['', '二期（间接）愈合', '一期（直接）愈合'],
      ['稳定性', '相对稳定：髓内钉、石膏/支具、桥接钢板[[AO-ORP]]', '绝对稳定：解剖复位 + 加压钢板/拉力螺钉[[AO-SR-PLATE]]'],
      ['断端应变', '约 2–10%[[PERREN2002]]', '< 2%[[ME2011]]'],
      ['过程', '炎症 1–7 天 → 软骨痂 2–3 周 → 硬骨痂至 3–4 月 → 塑形[[AO-PFM]]', '切割锥 50–100 μm/天跨越骨折线（接触 / 间隙愈合）[[ME2011]]'],
      ['胫骨愈合时间', '扩髓髓内钉中位 18 周[[DAILEY2018]]', '约 4.3 ± 1.5 个月，与髓内钉相近[[SAIED2016]]'],
      ['X 线', '外骨痂，逐步桥接；RUST 适用[[WHELAN2010]]', '无外骨痂，骨折线慢慢消失；出现骨痂提示不稳定[[AO-SR-FA]]'],
      ['负重（AO）', '髓内钉：可立即扶拐、可耐受负重[[AO-SR-NAIL]]', '≤ 15 kg；8–12 周前避免完全负重[[AO-SR-PLATE]]']
    ],
    note: 'AO 提醒：加压钢板若未预弯，对侧皮质张开间隙 → 不稳定 → 延迟愈合或不愈合[[AO-SR-PLATE]]。<b>既不能太松，也不能“刚性 + 留间隙”</b>。',
    calc: '应变计算器：拖动看看', gap: '间隙宽度', disp: '断端位移', strain: '应变', tol: '可形成的组织'
  },
  en: {
    intro: 'For the same 42-A3 transverse fracture, <b>stability</b> decides the route. AO: relative stability (cast, nail, bridge plate) → indirect healing with callus; absolute stability (compression) → direct healing without callus[[AO-ORP]][[AO-PFM]]. Perren strain = displacement ÷ gap width[[PERREN2002]].',
    rows: [
      ['', 'Secondary (indirect)', 'Primary (direct)'],
      ['Stability', 'Relative: IM nail, cast/brace, bridge plate[[AO-ORP]]', 'Absolute: anatomical reduction + compression plate / lag screw[[AO-SR-PLATE]]'],
      ['Strain', '~2–10%[[PERREN2002]]', '< 2%[[ME2011]]'],
      ['Process', 'Inflammation 1–7 d → soft callus 2–3 wk → hard callus to 3–4 mo → remodeling[[AO-PFM]]', 'Cutting cones cross at 50–100 μm/day (contact / gap healing)[[ME2011]]'],
      ['Tibial union time', 'Reamed nail median 18 wk[[DAILEY2018]]', '~4.3 ± 1.5 mo, similar to nail[[SAIED2016]]'],
      ['X-ray', 'External callus, progressive bridging; RUST applies[[WHELAN2010]]', 'No callus; line fades; callus suggests instability[[AO-SR-FA]]'],
      ['Weight bearing (AO)', 'Nail: as tolerated with crutches immediately[[AO-SR-NAIL]]', '≤ 15 kg; avoid full until 8–12 wk[[AO-SR-PLATE]]']
    ],
    note: 'AO warning: a plate that is not overbent compresses the near cortex and opens a gap opposite → instability → delayed or nonunion[[AO-SR-PLATE]]. <b>Neither too loose nor “rigid with a gap”.</b>',
    calc: 'Strain calculator: drag to explore', gap: 'Gap width', disp: 'Displacement', strain: 'Strain', tol: 'Tissue that can form'
  }
};

export const CLINICAL = {
  zh: [
    { k: '负重', h: '负重进阶（AO Surgery Reference）', b: [
      '<b>髓内钉</b>：可<b>立即</b>扶拐、可耐受负重[[AO-SR-NAIL]]。',
      '<b>加压钢板</b>：扶拐限重 <b>≤ 15 kg</b>，在愈合更进一步前（<b>8–12 周</b>）避免完全负重[[AO-SR-PLATE]]。',
      '两者：6–8 周 X 线显示愈合进展后可增加负重[[AO-SR-PLATE]]。软组织保护性夹板不超过 1–2 周[[AO-SR-PLATE]]。',
      '<b>石膏</b>：避免负重 2–4 周，渐进至约 6 周全负重；约 6 周有骨痂后可换 PTB 石膏[[AO-SR-CAST]]。'] },
    { k: '随访', h: '随访与复查 X 线（AO）', b: [
      '术后/复位后即刻：正侧位确认对线、长度与内固定位置。',
      'AO：<b>2、6、12 周</b>复查，之后<b>每 6–12 周</b>直到影像与功能愈合[[AO-SR-NAIL]]。SPRINT 试验随访：2 周、6 周、3/6/9/12 个月[[SPRINT2008]]。',
      '每次看：对线、内固定（松动、断钉）、骨痂与桥接（RUST，4 皮质 × 1–3 分）[[WHELAN2010]]。',
      '石膏：拆石膏很少早于 14 周；拆后约 2 周内复查以免迟发畸形[[AO-SR-CAST]]。'] },
    { k: '延迟/不愈合', h: '延迟愈合 vs 不愈合', b: [
      '<b>延迟愈合</b>：超过预期时间仍未愈合但仍在进展；常在 3–6 个月识别[[BOWERS2024]]。胫骨扩髓髓内钉中位愈合 18 周[[DAILEY2018]]——12 周未愈合不必惊慌。',
      'SPRINT：6 个月前不允许因不愈合再手术；<b>至少推迟到 6 个月</b>可显著减少再手术[[SPRINT2008]]。',
      '<b>不愈合（FDA）</b>：伤后 <b>9 个月</b>未愈合且之前<b>连续 3 个月</b>无进展；文献引用 AO 原则为“6 个月未愈合”[[SAUL2023]]。',
      '肥大性（骨痂多、骨折线持续）→ 加稳定；萎缩性 → 改善生物学 + 稳定；任何不愈合先<b>排除感染</b>。'] },
    { k: '危险因素', h: '影响胫骨愈合的因素', b: [
      '1003 例扩髓髓内钉：骨折形态、开放与软组织损伤程度强烈影响不愈合与愈合时间；吸烟、筋膜间室综合征延长愈合时间[[DAILEY2018]]。',
      '<b>吸烟</b>：胫骨骨折不愈合 OR ≈ 2.2[[SCOLARO2014]]。',
      '<b>NSAIDs</b>：EAST/OTA 2023 有条件推荐急性期短期使用[[EAST2023]]。',
      '机械因素：固定过松，或加压钢板未预弯致对侧间隙[[AO-SR-PLATE]]。'] },
    { k: '骨筋膜室', h: '小腿四个骨筋膜室与骨筋膜室综合征', cs: 1, b: [
      '骨折平面真实断面（点下方“横断面”）：<b>前骨筋膜鞘</b>—胫骨前肌、踇长伸肌、趾长伸肌（第三腓骨肌在下 1/3），胫前动、静脉与腓深神经贴骨间膜前面下行；<b>外侧骨筋膜鞘</b>—腓骨长/短肌，腓浅神经；<b>后鞘浅部</b>—腓肠肌、比目鱼肌、跖肌（腓肠神经、小隐静脉在其浅面的浅筋膜内）；<b>后鞘深部</b>—腘肌、胫骨后肌、趾长屈肌、踇长屈肌，胫神经与胫后血管在小腿横肌间隔深面下行，腓血管贴腓骨后内侧[[CNTERM2013]][[GRAY42]][[RPCOMP]]。胫骨前内侧面无肌肉覆盖，仅有皮肤、浅筋膜和与骨膜融合的深筋膜——这是开放骨折与钢板外露的解剖基础[[BORRELLI2002]]。',
      '116 例胫骨干骨折连续监测前室压力，3 例（2.6%）发生急性骨筋膜室综合征[[MCQ1996]]。',
      '减压阈值用 <b>ΔP = 舒张压 − 间室压 &lt; 30 mmHg</b>；若按绝对压 &gt; 30 mmHg，前 12 小时就有 53 例“超标”，会导致大量不必要的切开[[MCQ1996]]。',
      '解剖推论：腓深神经走在前骨筋膜鞘内，其终末皮支分布于第一趾蹼[[TMA]] → 前鞘高压时可较早出现第一趾蹼感觉减退；1003 例扩髓髓内钉中，骨筋膜室综合征不显著增加不愈合风险，但显著延长愈合时间[[DAILEY2018]]。'] }
  ],
  en: [
    { k: 'Weight bearing', h: 'Weight-bearing progression (AO Surgery Reference)', b: [
      '<b>IM nail</b>: weight bearing as tolerated with crutches may begin <b>immediately</b>[[AO-SR-NAIL]].',
      '<b>Compression plate</b>: limited weight bearing <b>≤ 15 kg</b> with crutches; avoid full weight bearing until healing is more advanced (<b>8–12 weeks</b>)[[AO-SR-PLATE]].',
      'Both: progress weight bearing after 6–8 weeks when x-rays show progressive healing[[AO-SR-PLATE]]. Protective splint no longer than 1–2 weeks[[AO-SR-PLATE]].',
      '<b>Cast</b>: avoid weight bearing 2–4 weeks, graduated to full by ~6 weeks; PTB cast once callus appears (~6 weeks)[[AO-SR-CAST]].'] },
    { k: 'Follow-up', h: 'Follow-up and x-ray timing (AO)', b: [
      'Immediately after reduction/surgery: AP + lateral for alignment, length, implant position.',
      'AO: review at <b>2, 6 and 12 weeks</b>, then <b>every 6–12 weeks</b> until radiographic healing and function are established[[AO-SR-NAIL]]. SPRINT visits: 2 wk, 6 wk, 3/6/9/12 mo[[SPRINT2008]].',
      'Each time: alignment, hardware, callus and bridging (RUST, 4 cortices × 1–3)[[WHELAN2010]].',
      'Cast: removal rarely before 14 weeks; check again within ~2 weeks after removal[[AO-SR-CAST]].'] },
    { k: 'Delayed / nonunion', h: 'Delayed union vs nonunion', b: [
      '<b>Delayed union</b>: not healed by the expected time but still progressing; usually recognised at 3–6 months[[BOWERS2024]]. Reamed nail median healing is 18 weeks[[DAILEY2018]] — not healed at 12 weeks is not alarming.',
      'SPRINT: no reoperation for nonunion before 6 months; <b>waiting ≥ 6 months</b> substantially reduced reoperations[[SPRINT2008]].',
      '<b>Nonunion (FDA)</b>: not healed at <b>9 months</b> with no progress for the previous <b>3 months</b>; AO principles quoted as “not healed after 6 months”[[SAUL2023]].',
      'Hypertrophic (abundant callus, persistent line) → add stability; atrophic → improve biology + stability; always <b>exclude infection</b> first.'] },
    { k: 'Risk factors', h: 'Factors affecting tibial healing', b: [
      '1003 reamed-nail patients: fracture morphology, open injury and soft-tissue severity strongly predicted nonunion and time to union; smoking and compartment syndrome extended healing time[[DAILEY2018]].',
      '<b>Smoking</b>: tibial nonunion OR ≈ 2.2[[SCOLARO2014]].',
      '<b>NSAIDs</b>: EAST/OTA 2023 conditionally recommends short acute use[[EAST2023]].',
      'Mechanics: fixation too loose, or a non-overbent compression plate leaving a gap opposite[[AO-SR-PLATE]].'] },
    { k: 'Compartments', h: 'The four leg compartments and compartment syndrome', cs: 1, b: [
      'Real section at the fracture level (tap “Cross-section” below): <b>anterior</b> — tibialis anterior, EHL, EDL (fibularis tertius in the distal third); anterior tibial vessels and deep fibular nerve on the front of the interosseous membrane; <b>lateral</b> — fibularis longus/brevis, superficial fibular nerve; <b>superficial posterior</b> — gastrocnemius, soleus, plantaris (sural nerve and small saphenous vein lie superficial, in the subcutis); <b>deep posterior</b> — popliteus, tibialis posterior, FDL, FHL; tibial nerve and posterior tibial vessels deep to the transverse intermuscular septum; fibular vessels behind the fibula[[GRAY42]][[RPCOMP]]. The anteromedial tibial surface has no muscle cover — only skin, subcutis and deep fascia fused with periosteum, which is why it is the classic site of open fractures and exposed plates[[BORRELLI2002]].',
      '116 tibial shaft fractures with continuous anterior-compartment monitoring: 3 (2.6%) developed acute compartment syndrome[[MCQ1996]].',
      'Decompression threshold: <b>ΔP = diastolic − compartment pressure &lt; 30 mmHg</b>; an absolute threshold of &gt; 30 mmHg flagged 53 patients in the first 12 h and would have caused many unnecessary fasciotomies[[MCQ1996]].',
      'Anatomical corollary: the deep fibular nerve runs in the anterior compartment and ends in the skin of the first web space[[TMA]], so first-web-space numbness can be an early sign of anterior-compartment pressure; in 1003 reamed nailings compartment syndrome did not raise nonunion risk but significantly prolonged time to union[[DAILEY2018]].'] }
  ]
};

// lv = 'S' 医学生 / 'R' 规培；d = 题目对应时间点；fix = 切换到的固定方式
export const QUIZ = [
  { lv: 'S', d: 2,
    zh: { q: '伤后第 1–3 天，骨折血肿中最先大量出现、随后被巨噬细胞取代的细胞是？', o: ['成骨细胞', '中性粒细胞', '破骨细胞', '软骨细胞'], a: 1, x: '中性粒细胞数小时内到达，巨噬细胞随后接管；AO 炎症期约 1–7 天[[AO-PFM]][[ME2011]]。' },
    en: { q: 'Which cells arrive first in the hematoma (days 1–3) and are then replaced by macrophages?', o: ['Osteoblasts', 'Neutrophils', 'Osteoclasts', 'Chondrocytes'], a: 1, x: 'Neutrophils arrive within hours, then macrophages; AO inflammatory stage is about 1–7 days[[AO-PFM]][[ME2011]].' } },
  { lv: 'S', d: 14, fix: 'nail',
    zh: { q: '髓内钉术后第 2 周复查，X 线常看不到骨痂，主要原因是？', o: ['还没有修复组织', '软骨痂未矿化，X 线不显影', '髓内钉遮挡', '血肿遮挡'], a: 1, x: '软骨痂约 2–3 周形成但不显影；AO 第 6 周复查时才多见云絮状骨痂[[AO-PFM]][[AO-SR-NAIL]]。' },
    en: { q: 'At the 2-week review after nailing the x-ray often shows no callus. Why?', o: ['No repair tissue yet', 'Soft callus is unmineralised and radiolucent', 'The nail hides it', 'The hematoma hides it'], a: 1, x: 'Soft callus forms around 2–3 weeks but is radiolucent; fluffy callus is usually seen by the 6-week review[[AO-PFM]][[AO-SR-NAIL]].' } },
  { lv: 'S',
    zh: { q: 'AO/OTA 42-A3 指的是？', o: ['胫骨干简单螺旋形骨折', '胫骨干简单横行骨折（骨折线与垂直轴夹角 < 30°）', '胫骨干楔形骨折', '胫骨近端关节外骨折'], a: 1, x: '42 = 胫骨干，A = 简单，A3 = 横行，夹角 < 30°[[AO-SR-DEF]]。' },
    en: { q: 'AO/OTA 42-A3 means…', o: ['Simple spiral tibial shaft fracture', 'Simple transverse tibial shaft fracture (< 30° to the perpendicular axis)', 'Wedge tibial shaft fracture', 'Extra-articular proximal tibia'], a: 1, x: '42 = tibial shaft, A = simple, A3 = transverse, inclination < 30°[[AO-SR-DEF]].' } },
  { lv: 'S',
    zh: { q: '按 Perren 应变理论，骨能直接形成的断端应变大约是？', o: ['< 2%', '10–100%', '约 50%', '> 100%'], a: 0, x: '骨 < 2%，软骨约 2–10%，肉芽组织可至约 100%[[PERREN2002]]。' },
    en: { q: 'Per Perren, bone can form directly only below roughly which strain?', o: ['< 2%', '10–100%', 'About 50%', '> 100%'], a: 0, x: 'Bone < 2%, cartilage ~2–10%, granulation up to ~100%[[PERREN2002]].' } },
  { lv: 'S', d: 42, fix: 'plate',
    zh: { q: '解剖复位 + 加压钢板后第 6 周，X 线没有骨痂、骨折线仍可见。正确理解是？', o: ['愈合失败，应翻修', '直接愈合的预期表现：无骨痂、骨折线缓慢消失', '需要立即植骨', '说明固定太松'], a: 1, x: 'AO：预期为无骨痂的直接愈合；骨痂（刺激性骨痂）反而提示不稳定[[AO-SR-FA]][[AO-ORP]]。' },
    en: { q: 'Week 6 after anatomical reduction and compression plating: no callus, line still visible. Correct reading?', o: ['Failure — revise', 'Expected direct healing: no callus, slowly fading line', 'Immediate bone graft', 'Fixation too loose'], a: 1, x: 'AO: direct healing without callus is anticipated; callus (irritation callus) would suggest instability[[AO-SR-FA]][[AO-ORP]].' } },
  { lv: 'R', d: 0, fix: 'nail',
    zh: { q: '按 AO Surgery Reference，胫骨干髓内钉与加压钢板术后的负重建议分别是？', o: ['均 6 周不负重', '髓内钉可立即扶拐、可耐受负重；钢板限重 ≤15 kg，8–12 周前避免完全负重', '髓内钉 12 周后负重；钢板立即全负重', '均立即全负重、不需拐杖'], a: 1, x: '见 AO 术后处理[[AO-SR-NAIL]][[AO-SR-PLATE]]。' },
    en: { q: 'Per AO Surgery Reference, weight bearing after tibial nailing vs compression plating is…', o: ['Both non-weight-bearing 6 wk', 'Nail: as tolerated with crutches immediately; plate: ≤15 kg, avoid full until 8–12 wk', 'Nail after 12 wk; plate full immediately', 'Both full immediately without crutches'], a: 1, x: 'See AO aftercare[[AO-SR-NAIL]][[AO-SR-PLATE]].' } },
  { lv: 'R', d: 126, fix: 'nail',
    zh: { q: '闭合胫骨干骨折扩髓髓内钉，大样本（1003 例）报道的中位愈合时间约为？', o: ['6 周', '10 周', '18 周', '40 周'], a: 2, x: 'Dailey 2018：中位 18 周[[DAILEY2018]]；AO 也指出硬骨痂期持续至 3–4 个月[[AO-PFM]]。' },
    en: { q: 'In a 1003-patient series of reamed tibial nailing, the median time to healing was about…', o: ['6 weeks', '10 weeks', '18 weeks', '40 weeks'], a: 2, x: 'Dailey 2018: median 18 weeks[[DAILEY2018]]; AO also says hard callus lasts to 3–4 months[[AO-PFM]].' } },
  { lv: 'R', d: 84, fix: 'nail',
    zh: { q: '关于 RUST 评分，正确的是？', o: ['只评估正位片 2 个皮质', '正侧位共 4 个皮质，每个 1–3 分，总分 4–12', '每个皮质 0–4 分', '一期愈合也用 RUST 判断'], a: 1, x: '1 = 骨折线无骨痂；2 = 有骨痂、骨折线可见；3 = 桥接、骨折线不可见[[WHELAN2010]]。' },
    en: { q: 'Which statement about RUST is correct?', o: ['Only 2 cortices on AP', '4 cortices on AP + lateral, each 1–3, total 4–12', 'Each cortex 0–4', 'Also used for primary healing'], a: 1, x: '1 = line, no callus; 2 = callus, line visible; 3 = bridged, no line[[WHELAN2010]].' } },
  { lv: 'R', d: 140, fix: 'nail',
    zh: { q: '胫骨髓内钉术后 20 周：骨痂在进展，2 个皮质桥接，无感染征象，负重轻痛。最合适的处理是？', o: ['立即换钉', '立即植骨', '继续随访（每 6–12 周），不愈合再手术宜至少等到 6 个月', '诊断不愈合'], a: 2, x: '仍在进展属正常范围或延迟；SPRINT 提示至少推迟到 6 个月可减少再手术[[SPRINT2008]][[AO-SR-NAIL]]。' },
    en: { q: 'Tibial nail, 20 weeks: callus progressing, 2 cortices bridged, no infection, mild pain on loading. Best next step?', o: ['Exchange nail now', 'Bone graft now', 'Continue follow-up (every 6–12 wk); delay reoperation for nonunion ≥ 6 mo', 'Diagnose nonunion'], a: 2, x: 'Still progressing; SPRINT suggests waiting at least 6 months reduces reoperations[[SPRINT2008]][[AO-SR-NAIL]].' } },
  { lv: 'R', d: 274,
    zh: { q: 'FDA 对骨折不愈合的经典定义是？', o: ['伤后 3 个月未愈合', '伤后 9 个月未愈合，且之前连续 3 个月无进展', '伤后 6 周无骨痂', '伤后 1 年仍疼痛'], a: 1, x: 'FDA 1986 定义[[SAUL2023]][[BOWERS2024]]。' },
    en: { q: 'The classic FDA definition of nonunion is…', o: ['Not healed at 3 months', 'Not healed at 9 months with no progress for the previous 3 months', 'No callus at 6 weeks', 'Pain at 1 year'], a: 1, x: 'FDA 1986 definition[[SAUL2023]][[BOWERS2024]].' } }
];

export const UI = {
  zh: {
    title: '胫骨干骨折愈合', sub: 'AO 42-A3 · 3D 时间漫游', brand: '← aiai 学院 · 医学教学馆',
    tabs: ['时间轴', '细胞与分子', '一期 vs 二期', '影像对照', '临床决策', '测验'],
    tour: '▶ 导览', tourStop: '■ 停止', src: '来源与说明', lang: 'EN',
    tg: { cut: '剖面', peri: '骨膜', cells: '细胞', vessels: '血管', soft: '软组织', labels: '标注' },
    fix: { cast: '石膏', nail: '髓内钉', plate: '加压钢板' },
    course: { normal: '正常愈合', delayed: '延迟愈合', atrophic: '萎缩性不愈合' },
    kv: { h: '模型读数（几何示意，非文献值）', callus: '骨痂最大厚度', min: '骨痂矿化（示意）', bridge: '桥接皮质', rust: 'RUST', union: '影像愈合判定', line: '骨折线可见度' },
    xray: 'X 线 · 由 3D 几何投影', ap: '正位 AP', lat: '侧位 LAT', full: '点击放大 · 全长正侧位',
    rustNote: 'RUST：正侧位 4 个皮质各 1–3 分，4–12 分[[WHELAN2010]]。读数为模型值。',
    rustNA: '一期愈合无桥接骨痂，RUST 不适用；以骨折线消失判断',
    prev: '◀ 上一时间点', next: '下一时间点 ▶',
    loading: '正在加载真实胫腓骨几何…', disc: '教学示意，非诊疗依据。时间依 AO Surgery Reference、AO PFM 与胫骨文献；个体差异大。',
    cellsH: '细胞（点击高亮）', sigH: '分子信号 · 当前活跃度',
    imgH: '各时间点 X 线表现', imgTip: '点击某一行跳到对应时间；左侧 X 线由同一 3D 几何实时投影',
    quizStart: '开始测验', quizNext: '下一题', quizRestart: '再来一次', quizScore: '得分', lvS: '医学生', lvR: '规培',
    labels: { callus: '骨痂（后外侧较厚）', peri: '骨膜', canal: '髓腔', line: '骨折线', necro: '坏死骨端', hema: '血肿', nail: '扩髓髓内钉', plate: '加压钢板（前内侧）', cone: '切割锥', endo: '髓内骨痂', fib: '腓骨（完整）', cast: '石膏', lock: '交锁螺钉' },
    srcH: '来源与说明', srcNote: '时间轴按 AO Surgery Reference（42-A3 术后处理）、AO Principles of Fracture Management（骨愈合生物学）与胫骨临床研究校准；带 <span class="aob">AO</span> 的为 AO 来源。模型具体天数取自所引范围之内，为示意值。胫腓骨与皮肤为真实解剖网格重采样；内固定、骨痂、X 线为程序化建模（X 线由同一几何做线积分投影）。',
    close: '关闭', aoNow: 'AO 术后处理 · 当前与下一步', aoNone: '—', histo: '组织学示意', fullH: '全长 X 线（由 3D 几何投影，示意）'
  },
  en: {
    title: 'Tibial Shaft Fracture Healing', sub: 'AO 42-A3 · 3D time explorer', brand: '← aiai Academy · Medical Teaching Hall',
    tabs: ['Timeline', 'Cells & signals', 'Primary vs secondary', 'Imaging', 'Clinical', 'Quiz'],
    tour: '▶ Tour', tourStop: '■ Stop', src: 'Sources', lang: '中文',
    tg: { cut: 'Section', peri: 'Periosteum', cells: 'Cells', vessels: 'Vessels', soft: 'Soft tissue', labels: 'Labels' },
    fix: { cast: 'Cast', nail: 'IM nail', plate: 'Comp. plate' },
    course: { normal: 'Normal', delayed: 'Delayed', atrophic: 'Atrophic nonunion' },
    kv: { h: 'Model readout (geometry, not literature values)', callus: 'Max callus thickness', min: 'Callus mineral (illustr.)', bridge: 'Bridged cortices', rust: 'RUST', union: 'Radiographic union', line: 'Fracture-line visibility' },
    xray: 'X-ray · projected from the 3D geometry', ap: 'AP', lat: 'LAT', full: 'Tap to enlarge · full-length AP/LAT',
    rustNote: 'RUST: 4 cortices on AP + lateral, each 1–3, total 4–12[[WHELAN2010]]. Model readout.',
    rustNA: 'Primary healing has no bridging callus — RUST n/a; judge by disappearance of the line',
    prev: '◀ Previous', next: 'Next ▶',
    loading: 'Loading real tibia/fibula geometry…', disc: 'Teaching only. Times follow AO Surgery Reference, AO PFM and tibial literature; individual variation is large.',
    cellsH: 'Cells (tap to highlight)', sigH: 'Signals · current activity',
    imgH: 'X-ray findings over time', imgTip: 'Tap a row to jump; the x-ray on the left is projected live from the same 3D geometry',
    quizStart: 'Start quiz', quizNext: 'Next', quizRestart: 'Restart', quizScore: 'Score', lvS: 'Student', lvR: 'Resident',
    labels: { callus: 'Callus (thicker posterolaterally)', peri: 'Periosteum', canal: 'Canal', line: 'Fracture line', necro: 'Necrotic end', hema: 'Hematoma', nail: 'Reamed IM nail', plate: 'Compression plate (anteromedial)', cone: 'Cutting cones', endo: 'Endosteal callus', fib: 'Fibula (intact)', cast: 'Cast', lock: 'Locking screw' },
    srcH: 'Sources & notes', srcNote: 'The timeline follows AO Surgery Reference (42-A3 aftercare), AO Principles of Fracture Management (bone-healing biology) and tibial clinical studies; <span class="aob">AO</span> marks AO sources. Exact model days are chosen inside the cited ranges and are illustrative. Tibia, fibula and skin are resampled real anatomy meshes; implants, callus and the x-ray are procedural (the x-ray is a line-integral projection of the same geometry).',
    close: 'Close', aoNow: 'AO aftercare · now & next', aoNone: '—', histo: 'Histology (schematic)', fullH: 'Full-length x-ray (projected from the 3D geometry, illustrative)'
  }
};

// ---------- v0.3: layered anatomy + standard views ----------
export const ANAT = {
  zh: {
    panel: '逐层解剖', depth: '解剖深度', st: ['隐藏', '半透明', '实体'], xs: '横断面（骨折平面）', xs3d: '3D 横切', close: '关闭',
    layers: { skin: '皮肤', subcut: '浅筋膜：浅静脉 · 皮神经', fascia: '小腿筋膜 · 支持带', gastroc: '腓肠肌 · 跖肌', soleus: '比目鱼肌 · 跟腱', postnv: '横肌间隔 · 胫后血管神经', deeppost: '后群深层（含腘肌）', lateral: '外侧群 · 肌间隔', anterior: '前群', antnv: '腓神经 · 胫前血管', iom: '小腿骨间膜', bone: '骨 / 骨折' },
    layersLong: { skin: '皮肤', subcut: '浅筋膜：皮下脂肪 · 浅静脉 · 皮神经', fascia: '小腿筋膜（深筋膜）· 支持带', gastroc: '后群浅层：腓肠肌 · 跖肌', soleus: '后群浅层：比目鱼肌 · 跟腱', postnv: '小腿横肌间隔 · 胫神经与胫后/腓血管', deeppost: '后群深层：腘肌 · 胫骨后肌 · 趾长屈肌 · 踇长屈肌', lateral: '外侧群：腓骨长/短肌 · 前/后肌间隔', anterior: '前群：胫骨前肌 · 踇长伸肌 · 趾长伸肌 · 第三腓骨肌', antnv: '腓总/腓浅/腓深神经 · 胫前血管', iom: '小腿骨间膜', bone: '骨 / 骨折' },
    tie: '肌肉与愈合', tieB: [
      '早期骨痂的血供主要来自周围软组织（骨外血供）[[RHIN1974]]；胫骨干外侧由胫前动脉分支供应，后方相对乏血管[[BORRELLI2002]]。',
      '前内侧面只有皮肤与深筋膜覆盖，后外侧被肌肉包绕 → 本模型后外侧骨痂较厚；综述亦指出靠近肌肉侧骨痂更大[[CHAN2012]]。',
      '开放骨折：小鼠模型中肌肉覆盖比筋膜皮肤覆盖愈合更快[[HARRY2008]]；清创时未闭合者 72 h 内完成确定性覆盖[[BOAST4]]。'],
    views: { ant: '前面', post: '后面', med: '内侧', lat: '外侧', prox: '上(近)', dist: '下(远)', obl: '前外斜', oblm: '前内斜', reset: '复位', zoom: '骨折处' },
    axes: { A: '前', P: '后', M: '内', L: '外', S: '近', I: '远' },
    xsH: '骨折平面横断面（右小腿中段）· 从远端向近端看（影像学惯例）', xsNote: '真实网格截面（BodyParts3D / Z-Anatomy），按结构分区着色、互不重叠；底色为四个骨筋膜鞘；白线为小腿筋膜、前/后肌间隔与横肌间隔；皮肤与皮下脂肪为示意。', xsLink: '→ 骨筋膜室综合征（临床决策）',
    comp: { ant: '前骨筋膜鞘', lat: '外侧骨筋膜鞘', sp: '后鞘浅部', dp: '后鞘深部' }, hint: '悬停/点按结构显示名称', right: '右小腿', credit: '解剖网格：BodyParts3D © DBCLS (CC BY-SA 2.1 JP) · Z-Anatomy (CC BY-SA 4.0)',
    reviewH: '解剖专家审校（v0.4）', review: [
      '<b>审校方法</b>：按解剖学教授审片流程，逐一渲染 8 个标准视图、12 个解剖层与骨折平面横断面，并用脚本对原始网格做几何关系核查（侧别、毗邻、穿插），对照 Gray’s Anatomy 42 版、人卫第 9 版《系统解剖学》《局部解剖学》、名词委《人体解剖学名词》(2013) 与 TeachMeAnatomy / Radiopaedia 页面[[GRAY42]][[RW9]][[CNTERM2013]][[TMA]][[RPCOMP]]。',
      '<b>名称</b>：“腓总神经交通支”更正为规范名“腓神经交通支”；骨筋膜室按名词委称“小腿前/外侧/后骨筋膜鞘”（后鞘分浅、深部）；伸肌上/下支持带不用旧称“小腿横韧带/十字韧带”；“小腿横肌间隔”注明为教材用名（深横筋膜）；规范字为足字旁加“母”（Unicode U+27FF9，多数字体缺字），页面用常见替代字“踇”[[CNTERM2013]]。',
      '<b>层次</b>：v0.3 把所有神经血管放在肌层之后一次显露，不符合解剖顺序。v0.4 改为 12 层：皮肤 → 浅筋膜（脂肪、大/小隐静脉、隐神经、腓肠神经）→ 小腿筋膜与支持带 → 腓肠肌/跖肌 → 比目鱼肌/跟腱 → 横肌间隔与胫神经、胫后/腓血管 → 深层后群（含腘肌）→ 外侧群与前/后肌间隔 → 前群 → 腓总/腓浅/腓深神经与胫前血管 → 骨间膜 → 骨[[GRAY42]][[RPCOMP]]。',
      '<b>位置核查（通过）</b>：右侧小腿（腓骨在外侧）；胫骨前肌位于胫骨前缘外侧；胫骨内侧面无肌肉覆盖；踝管内由前向后为胫骨后肌腱、趾长屈肌腱、胫后动静脉、胫神经、踇长屈肌腱（动脉位置略偏深）；腓骨长/短肌腱经外踝后方；大隐静脉经内踝前方、小隐静脉与腓肠神经经外踝后方；腓总神经绕腓骨颈；腓浅神经在外侧鞘、于下 1/3 穿出深筋膜；腓深神经贴骨间膜前面；胫神经与胫后动脉在胫骨后肌浅面、比目鱼肌深面；第三腓骨肌位于前鞘下部[[TMA]][[GRAY42]]。',
      '<b>更正</b>：原网格的胫前动、静脉在小腿中段离骨间膜约 1.4 cm、悬于肌间——已按“上 2/3 行于骨间膜前面”重配准（最大平移 1.9 cm，两端渐隐）[[GRAY42]][[TMA]]；皮肤由“深筋膜外推 4.5 mm”改为分区厚度：胫骨内侧面皮肤至骨面约 4–5 mm、内外踝处约 3 mm，小腿后内侧 7–9 mm，并新增皮下脂肪层（示意）[[LEAHY2012]]；剖面与 3D 横切改为实心截面（按结构着色、互不重叠）。',
      '<b>仍存在的局限</b>：BodyParts3D 部分肌肉在起止点与骨轻度穿插（≤ 12% 顶点）；外踝后方腓骨短肌腱略偏后内；踝管内胫后动脉偏深；皮肤与皮下脂肪为生成的示意层；骨折模型中的胫腓骨为真实网格的极坐标重采样（与原网格 Hausdorff 距离 ≤ 0.7 mm、面积差 ≤ 1.6%），以保留骨痂、内固定与 X 线投影功能。']
  },
  en: {
    panel: 'Layered anatomy', depth: 'Dissection depth', st: ['Hide', 'Ghost', 'Solid'], xs: 'Cross-section (fracture level)', xs3d: '3D slice', close: 'Close',
    layers: { skin: 'Skin', subcut: 'Superficial fascia · veins · cut. nn.', fascia: 'Crural fascia · retinacula', gastroc: 'Gastrocnemius · plantaris', soleus: 'Soleus · Achilles', postnv: 'Transverse septum · post. NV', deeppost: 'Deep posterior (+ popliteus)', lateral: 'Lateral group · septa', anterior: 'Anterior group', antnv: 'Fibular nn. · ant. tibial vessels', iom: 'Interosseous membrane', bone: 'Bone / fracture' },
    layersLong: { skin: 'Skin', subcut: 'Superficial fascia: fat · superficial veins · cutaneous nn.', fascia: 'Crural (deep) fascia · retinacula', gastroc: 'Superficial posterior: gastrocnemius · plantaris', soleus: 'Superficial posterior: soleus · calcaneal tendon', postnv: 'Transverse septum · tibial n. & posterior tibial/fibular vessels', deeppost: 'Deep posterior: popliteus · TP · FDL · FHL', lateral: 'Lateral: fibularis longus/brevis · ant./post. septa', anterior: 'Anterior: TA · EHL · EDL · fibularis tertius', antnv: 'Common/superficial/deep fibular nn. · anterior tibial vessels', iom: 'Interosseous membrane', bone: 'Bone / fracture' },
    tie: 'Muscle and healing', tieB: [
      'Early callus is supplied mainly from the surrounding soft tissues (extraosseous supply)[[RHIN1974]]; the lateral tibial shaft is fed by anterior tibial artery branches and the posterior shaft is relatively hypovascular[[BORRELLI2002]].',
      'The anteromedial face is covered only by skin and deep fascia while the posterolateral side is wrapped in muscle → thicker posterolateral callus in this model; callus is larger next to muscle[[CHAN2012]].',
      'Open fractures: muscle cover healed faster than fasciocutaneous cover in a murine model[[HARRY2008]]; definitive cover within 72 h if not closed at debridement[[BOAST4]].'],
    views: { ant: 'Anterior', post: 'Posterior', med: 'Medial', lat: 'Lateral', prox: 'Proximal', dist: 'Distal', obl: 'Ant-lat oblique', oblm: 'Ant-med oblique', reset: 'Reset', zoom: 'Fracture' },
    axes: { A: 'A', P: 'P', M: 'M', L: 'L', S: 'Prox', I: 'Dist' },
    xsH: 'Cross-section at the fracture level (right mid-leg) · viewed from distal (radiological)', xsNote: 'Real-mesh section (BodyParts3D / Z-Anatomy), partitioned so structures never overlap; tints mark the four osseofascial compartments; white lines are crural fascia, anterior/posterior and transverse septa; skin and fat are schematic.', xsLink: '→ Compartment syndrome (Clinical)',
    comp: { ant: 'Anterior', lat: 'Lateral', sp: 'Sup. posterior', dp: 'Deep posterior' }, hint: 'Hover / tap a structure for its name', right: 'Right leg', credit: 'Anatomy meshes: BodyParts3D © DBCLS (CC BY-SA 2.1 JP) · Z-Anatomy (CC BY-SA 4.0)',
    reviewH: 'Anatomy-expert review (v0.4)', review: [
      '<b>Method</b>: every standard view, all 12 layers and the fracture-level section were rendered and inspected as an anatomy professor would; scripted geometry checks on the source meshes (side, relations, interpenetration) were compared with Gray’s Anatomy 42e, PMPH 9th-ed. Systematic/Regional Anatomy, the CNTERM 2013 Chinese terms and TeachMeAnatomy / Radiopaedia[[GRAY42]][[RW9]][[CNTERM2013]][[TMA]][[RPCOMP]].',
      '<b>Names</b>: “腓总神经交通支” → standard “腓神经交通支” (fibular communicating branch); compartments named as osseofascial compartments; superior/inferior extensor retinacula (not the old “transverse/cruciate ligament”); transverse intermuscular septum flagged as textbook usage (deep transverse fascia)[[CNTERM2013]].',
      '<b>Layer order</b>: v0.3 revealed all nerves and vessels in one layer after the muscles. v0.4 follows a dissection: skin → superficial fascia (fat, great/small saphenous veins, saphenous and sural nerves) → crural fascia & retinacula → gastrocnemius/plantaris → soleus/Achilles → transverse septum with tibial nerve and posterior tibial/fibular vessels → deep posterior (incl. popliteus) → lateral group with anterior/posterior septa → anterior group → common/superficial/deep fibular nerves and anterior tibial vessels → interosseous membrane → bone[[GRAY42]][[RPCOMP]].',
      '<b>Relations checked (pass)</b>: right leg (fibula lateral); tibialis anterior lateral to the tibial crest; bare subcutaneous medial tibial surface; tarsal tunnel order TP, FDL, posterior tibial vessels, tibial nerve, FHL (artery slightly deep); fibularis tendons behind the lateral malleolus; GSV anterior to the medial malleolus, SSV and sural nerve behind the lateral malleolus; common fibular nerve round the fibular neck; superficial fibular nerve in the lateral compartment, piercing the fascia distally; deep fibular nerve on the interosseous membrane; tibial nerve/posterior tibial artery between soleus and tibialis posterior; fibularis tertius in the distal anterior compartment[[TMA]][[GRAY42]].',
      '<b>Corrected</b>: the source anterior tibial artery/veins ran ~1.4 cm in front of the interosseous membrane — re-registered onto its anterior surface in the upper two-thirds (max shift 1.9 cm, tapered)[[GRAY42]][[TMA]]; skin rebuilt with regional thickness (≈4–5 mm skin-to-bone over the subcutaneous tibia, ≈3 mm at the malleoli, 7–9 mm over the posteromedial calf) plus a schematic subcutaneous fat layer[[LEAHY2012]]; cut faces are now solid, partitioned sections.',
      '<b>Remaining limits</b>: some BodyParts3D muscles interpenetrate bone slightly at their attachments (≤ 12% of vertices); fibularis brevis tendon sits slightly posteromedial at the malleolus; posterior tibial artery a little deep in the tarsal tunnel; skin and fat are generated; the fracture-model tibia/fibula are a polar resampling of the real meshes (Hausdorff ≤ 0.7 mm, area difference ≤ 1.6%) so callus, implants and the x-ray keep working.']
  }
};
