// fracture-content v0.4 (v0.3 + anatomy-expert review sources) · 胫骨干横行骨折（AO/OTA 42-A3）愈合课件文本（中 / EN）
// 时间按 AO Surgery Reference / AO Principles of Fracture Management 与胫骨文献校准（见 ao-timeline-v0.2.md）。
// 文中 [[ID]] 会渲染为可点击的来源角标；AO 来源显示 AO 徽标。

export const SOURCES = [
  { id: 'AO-SR-DEF', ao: true, t: 'AO Surgery Reference · Tibial shaft · Simple fracture, transverse (42A3) – definition. AO Foundation.', u: 'https://surgeryreference.aofoundation.org/orthopedic-trauma/adult-trauma/tibial-shaft/simple-transverse/definition', n: '42A3：骨干简单骨折，骨折线与胫骨垂直轴夹角 < 30°。' },
  { id: 'AO-SR-PLATE', ao: true, t: 'AO Surgery Reference · Tibial shaft · 42A3 · ORIF – compression plating (principles + aftercare). AO Foundation.', u: 'https://surgeryreference.aofoundation.org/orthopedic-trauma/adult-trauma/tibial-shaft/simple-transverse/orif-compression-plating', n: '加压钢板 = 绝对稳定；对侧间隙会致延迟/不愈合；夹板 ≤1–2 周；钢板限重 15 kg，8–12 周前避免完全负重；随访 2、6、12 周，之后每 6–12 周；6–8 周 X 线示进展后增加负重；取内固定至少 12 个月后。' },
  { id: 'AO-SR-NAIL', ao: true, t: 'AO Surgery Reference · Tibial shaft · Basic technique · Infrapatellar / suprapatellar intramedullary nailing – aftercare. AO Foundation.', u: 'https://surgeryreference.aofoundation.org/orthopedic-trauma/adult-trauma/tibial-shaft/basic-technique/infrapatellar-intramedullary-nailing', n: '髓内钉：可立即扶拐、可耐受负重；随访 2、6、12 周，之后每 6–12 周；取钉至少 12 个月后。' },
  { id: 'AO-SR-CAST', ao: true, t: 'AO Surgery Reference · Tibial shaft · Fracture management with limited resources (closed reduction and cast). AO Foundation.', u: 'https://surgeryreference.aofoundation.org/orthopedic-trauma/adult-trauma/tibial-shaft/basic-technique/fracture-management-with-limited-resources', n: '长腿石膏 3–4 周后改膝下；约 6 周有骨痂后换石膏/PTB 并渐进负重；避免负重 2–4 周、约 6 周全负重；胫骨干通常 3–5 个月完全愈合；拆石膏很少早于 14 周。' },
  { id: 'AO-PFM', ao: true, t: 'Buckley R, Moran C, Apivatthakakul T (eds). AO Principles of Fracture Management, 3rd ed. Thieme; 2017. Ch. 1.2 Biology and biomechanics in bone healing.', u: 'https://www.aofoundation.org/what-we-do/education/topic-areas/publishing-and-faculty-support-media/ao-principles-of-fracture-management', n: '直接愈合只发生于绝对稳定；间接愈合形成骨痂。炎症 1–7 天；软骨痂约 2–3 周（断端不再自由活动）；硬骨痂至骨性连接 3–4 个月；塑形数月至数年；局部充血约第 2 周达峰。' },
  { id: 'AO-ORP', ao: true, t: 'Dresing K, Lumpp B. Bone anatomy and healing. AO Trauma ORP study guide. AO Foundation; 2020.', u: 'https://media.aofoundation.org/trauma/-/media/project/aocd/aotrauma/documents/competency-based-education/6orphandoutenglishbone-anatomy-and-healing.pdf', n: '相对稳定（石膏、牵引、髓内钉、桥接钢板）→ 间接愈合；直接愈合：绝对稳定、切割锥骨单位重建、无骨痂。' },
  { id: 'AO-SR-FA', ao: true, t: 'AO Surgery Reference · Forearm shaft · Transverse simple fracture of the radius · ORIF – compression plating (aftercare). AO Foundation.', u: 'https://surgeryreference.aofoundation.org/orthopedic-trauma/adult-trauma/forearm-shaft/transverse-simple-fracture-of-the-radius/orif-compression-plating', n: '“预期为无骨痂的直接愈合”；出现刺激性骨痂提示不稳定。' },
  { id: 'ME2011', t: 'Marsell R, Einhorn TA. The biology of fracture healing. Injury. 2011;42(6):551–555.', u: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC3105171/', n: '接触愈合：间隙 < 0.01 mm、应变 < 2%；切割锥以 50–100 μm/天 跨越骨折线；间隙愈合需间隙 < 800 μm–1 mm。' },
  { id: 'DAILEY2018', t: 'Dailey HL, Wu KA, Wu PS, McQueen MM, Court-Brown CM. Tibial fracture nonunion and time to healing after reamed intramedullary nailing: 1003 patients. J Orthop Trauma. 2018;32(7):e263–e269.', u: 'https://pubmed.ncbi.nlm.nih.gov/29664881/', n: '扩髓髓内钉胫骨骨折：中位愈合时间 18 周；总体不愈合率 12%。' },
  { id: 'SPRINT2008', t: 'SPRINT Investigators. Randomized trial of reamed and unreamed intramedullary nailing of tibial shaft fractures. J Bone Joint Surg Am. 2008;90(12):2567–2578.', u: 'https://pubmed.ncbi.nlm.nih.gov/19047701/', n: '随访：出院后 2 周、6 周、3/6/9/12 个月；6 个月前不允许因不愈合再手术；“不愈合再手术至少推迟 6 个月可显著减少再手术”；4.6% 因不愈合换钉或植骨。' },
  { id: 'SAIED2016', t: 'Saied A, Ostovar M, Mousavi AA, Arabnejhad F. Comparison of intramedullary nail and plating in treatment of diaphyseal tibial fractures with intact fibulae: a randomized controlled trial. Indian J Orthop. 2016;50(3):277.', u: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC4885296/', n: '愈合时间：钢板 4.30 ± 1.48 个月，髓内钉 4.34 ± 1.45 个月。' },
  { id: 'LI2024', t: 'Li X, Chen K, Xue H, Cheng J, et al. Efficacy comparison between intramedullary nail fixation and plate fixation in distal tibia fractures: a meta-analysis of RCTs. J Orthop Surg Res. 2024;19:403.', u: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11241967/', n: '14 项 RCT：髓内钉愈合时间较钢板短 1.56 周（远端胫骨）。' },
  { id: 'WHELAN2010', t: 'Whelan DB, Bhandari M, Stephen D, et al. Development of the radiographic union score for tibial fractures (RUST). J Trauma. 2010;68(3):629–632.', u: 'https://pubmed.ncbi.nlm.nih.gov/19996801/', n: 'RUST：正侧位 4 个皮质，各 1–3 分，总分 4–12。' },
  { id: 'BOWERS2024', t: 'Bowers KM, Anderson DE, et al. Delayed union and nonunion: current concepts, prevention, and correction. Bioengineering. 2024;11(6):525.', u: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11201148/', n: 'FDA：伤后 > 9 个月骨折线仍可见为不愈合；延迟愈合常在 3–6 个月识别；正常情况 3 个月内应见进展。' },
  { id: 'SAUL2023', t: 'Saul D, Menger MM, Ehnert S, et al. Bone healing gone wrong: pathological fracture healing and non-unions. Bioengineering. 2023;10(1):85.', u: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC9855128/', n: '“按 AO 原则，伤后 6 个月未愈合即为不愈合”（二次引用）；FDA 1986：9 个月未愈合且之前 3 个月无进展。' },
  { id: 'EG2015', t: 'Einhorn TA, Gerstenfeld LC. Fracture healing: mechanisms and interventions. Nat Rev Rheumatol. 2015;11(1):45–54.', u: 'https://doi.org/10.1038/nrrheum.2014.164', n: '细胞与分子信号的时间顺序（炎症、BMP、VEGF、RANKL/OPG）。' },
  { id: 'PERREN2002', t: 'Perren SM. Evolution of the internal fixation of long bone fractures. J Bone Joint Surg Br. 2002;84(8):1093–1110.', u: 'https://doi.org/10.1302/0301-620x.84b8.13752', n: '应变理论：骨 < 2%、软骨约 2–10%、肉芽组织可至约 100%。' },
  { id: 'SCOLARO2014', t: 'Scolaro JA, et al. Cigarette smoking increases complications following fracture: a systematic review. J Bone Joint Surg Am. 2014;96(8):674–681.', u: 'https://pubmed.ncbi.nlm.nih.gov/24740664/', n: '吸烟者胫骨骨折不愈合 OR ≈ 2.16。' },
  { id: 'EAST2023', t: 'Murphy PB, et al. NSAIDs for acute pain after orthopedic trauma: EAST/OTA practice management guideline. Trauma Surg Acute Care Open. 2023;8:e001056.', u: 'https://doi.org/10.1136/tsaco-2022-001056', n: '有条件推荐急性期短期使用 NSAIDs。' },
  { id: 'BP3D', t: '3D anatomy: BodyParts3D, © The Database Center for Life Science licensed under CC Attribution-Share Alike 2.1 Japan. Leg bones, 19 muscles/tendons, fascia/septa, interosseous membrane, nerves and vessels via Z-Anatomy (CC BY-SA 4.0), taken from the BodyVista build. Derived meshes (cropped, smoothed, recoloured; anterior tibial vessels re-registered onto the interosseous membrane; tools/prep-leg-v0.4.py) are shared under CC BY-SA 4.0; non-commercial teaching use.', u: 'https://lifesciencedb.jp/bp3d/', n: '小腿骨、肌肉、筋膜、骨间膜、神经血管为真实解剖网格（裁剪、平滑、着色）；v0.4 将胫前动、静脉按教材位置重配准到骨间膜前面；皮肤与皮下脂肪按深筋膜外轮廓 + 分区皮下厚度生成（示意）；内固定、骨痂与髓腔为程序化建模。' },
  { id: 'ZANAT', t: 'Z-Anatomy — open-source 3D atlas of human anatomy (GitHub: LluisV/Z-Anatomy). Models CC BY-SA 4.0, built on BodyParts3D.', u: 'https://github.com/LluisV/Z-Anatomy', n: '分层解剖网格的直接来源（经 BodyVista 构建获得）。' },
  { id: 'BODYVISTA', t: 'BodyVista (FreedomIntelligence). Code MIT © 2026 FreedomAI; model assets keep their Z-Anatomy / BodyParts3D licences. Only its converted model files and structure catalogue were used here (no code).', u: 'https://github.com/FreedomIntelligence/BodyVista', n: '提供已转换的 Z-Anatomy 模型与结构名录；本页未复用其代码。' },
  { id: 'RHIN1974', t: 'Rhinelander FW. Tibial blood supply in relation to fracture healing. Clin Orthop Relat Res. 1974;(105):34–81.', u: 'https://doi.org/10.1097/00003086-197411000-00005', n: '骨折后早期骨痂的血供主要来自周围软组织（骨外血供）。' },
  { id: 'BORRELLI2002', t: 'Borrelli J Jr, Prickett W, Song E, Becker D, Ricci W. Extraosseous blood supply of the tibia and the effects of different plating techniques: a human cadaveric study. J Orthop Trauma. 2002;16(10):691–695.', u: 'https://pubmed.ncbi.nlm.nih.gov/12439191/', n: '胫骨干骨外血管少、后方相对乏血管；外侧由胫前动脉分支供应，部分穿骨间膜。' },
  { id: 'HARRY2008', t: 'Harry LE, Sandison A, Paleolog EM, Hansen U, Pearse MF, Nanchahal J. Comparison of the healing of open tibial fractures covered with either muscle or fasciocutaneous tissue in a murine model. J Orthop Res. 2008;26(9):1238–1244.', u: 'https://doi.org/10.1002/jor.20649', n: '小鼠开放胫骨骨折：肌肉覆盖比筋膜皮肤覆盖愈合更快。' },
  { id: 'CHAN2012', t: 'Chan JK, Harry L, Williams G, Nanchahal J. Soft-tissue reconstruction of open fractures of the lower limb: muscle versus fasciocutaneous flaps. Plast Reconstr Surg. 2012;130(2):284e–295e.', u: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC3408595/', n: '综述：肌肉旁骨痂更大；肌瓣与筋膜皮瓣的证据与选择。' },
  { id: 'BOAST4', t: 'BOA & BAPRAS. BOAST — Open fractures (Dec 2017): definitive soft-tissue closure or coverage within 72 h of injury if not achieved at debridement.', u: 'https://www.boa.ac.uk/resource/boast-4-pdf.html', n: '开放骨折：清创时未能闭合者 72 小时内完成确定性软组织覆盖。' },
  { id: 'GRAY42', t: 'Standring S (ed). Gray’s Anatomy: The Anatomical Basis of Clinical Practice, 42nd ed. Elsevier, 2020 — Ch. “Leg” (compartments, crural fascia, neurovascular relations).', u: 'https://www.us.elsevierhealth.com/grays-anatomy-9780702077050.html', n: '小腿骨筋膜鞘、深筋膜与神经血管毗邻的权威参考（本次审校的主参照）。' },
  { id: 'RW9', t: '丁文龙, 刘学政（主编）《系统解剖学》第 9 版；崔慧先, 李瑞锡（主编）《局部解剖学》第 9 版. 人民卫生出版社, 2018.', u: 'https://www.pmph.com/', n: '中文名称与小腿层次解剖（浅筋膜、深筋膜、骨筋膜鞘、踝管）的教材依据。' },
  { id: 'CNTERM2013', t: '全国科学技术名词审定委员会.《人体解剖学名词》第二版. 科学出版社, 2014（公布 2013）— 小腿肌、筋膜、神经血管条目（02.1771–02.1834, 05.0787, 05.1303–05.1305, 06.0982–06.0999）。', u: 'https://xtjp.fudan.edu.cn/Upload/Files/201804100314393640155.pdf', n: '规范名：小腿前/外侧/后骨筋膜鞘、小腿前/后肌间隔、伸肌上/下支持带、腓骨肌上支持带、腓神经交通支等；“hallux”规范字为足字旁加“母”（U+27FF9，多数字体缺字），页面用常见替代字“踇”。' },
  { id: 'TMA', t: 'TeachMeAnatomy: Tarsal tunnel; Deep fibular nerve; Superficial fibular nerve; Common fibular nerve; Posterior compartment of the leg; Venous drainage of the lower limb (accessed Nov 2026).', u: 'https://teachmeanatomy.info/lower-limb/areas/tarsal-tunnel/', n: '踝管内容由前向后：胫骨后肌腱、趾长屈肌腱、胫后动静脉、胫神经、踇长屈肌腱；腓深神经伴胫前动脉、第一趾蹼皮支；腓浅神经于小腿下 1/3 穿出深筋膜；腓总神经绕腓骨颈；小隐静脉经外踝后方。' },
  { id: 'RPCOMP', t: 'Radiopaedia: Superficial / Deep posterior compartment of the leg; Crural fascia — “The transverse intermuscular septum divides the posterior compartments.”', u: 'https://radiopaedia.org/articles/deep-posterior-compartment-of-the-leg', n: '小腿横肌间隔（深横筋膜）分隔后群浅、深两部；腘肌属深层。' },
  { id: 'LEAHY2012', t: 'Leahy S, Toomey C, McCreesh K, O’Neill C, Jakeman P. Ultrasound measurement of subcutaneous adipose tissue thickness accurately predicts total and segmental body fat of young adults. Ultrasound Med Biol. 2012;38(1):28–34.', u: 'https://doi.org/10.1016/j.ultrasmedbio.2011.10.011', n: '超声测小腿内侧皮下脂肪厚度中位数：男 4.2 mm、女 9.8 mm（用于示意皮下层厚度）。' },
  { id: 'MCQ1996', t: 'McQueen MM, Court-Brown CM. Compartment monitoring in tibial fractures. The pressure threshold for decompression. J Bone Joint Surg Br. 1996;78(1):99–104.', u: 'https://doi.org/10.1302/0301-620X.78B1.0780099', n: '116 例胫骨干骨折前间室连续测压；以 ΔP（舒张压 − 间室压）< 30 mmHg 为减压阈值。' }
];
export const SRC_INDEX = Object.fromEntries(SOURCES.map((s, i) => [s.id, i + 1]));

export const KEYS = [
  { id: 'D0', d: 0 }, { id: 'D3', d: 3 }, { id: 'W1', d: 7 }, { id: 'W2', d: 14 }, { id: 'W3', d: 21 },
  { id: 'W6', d: 42 }, { id: 'W12', d: 84 }, { id: 'W18', d: 126 }, { id: 'M6', d: 182 }, { id: 'M9', d: 274 }, { id: 'Y1', d: 365 }
];

// stage bands per healing route; each carries its source
export const STAGES = {
  secondary: [
    { id: 'hem', d0: 0, d1: 7, col: '#ff5d6c', zh: '血肿与炎症', en: 'Hematoma & inflammation', zr: '1–7 天', er: '1–7 d', src: ['AO-PFM', 'AO-ORP'] },
    { id: 'soft', d0: 7, d1: 21, col: '#7fb8ff', zh: '软骨痂', en: 'Soft callus', zr: '约 2–3 周', er: '~2–3 wk', src: ['AO-PFM'] },
    { id: 'hard', d0: 21, d1: 126, col: '#ffb547', zh: '硬骨痂 → 骨性连接', en: 'Hard callus → union', zr: '3 周–约 4 个月（中位 18 周）', er: '3 wk–~4 mo (median 18 wk)', src: ['AO-PFM', 'DAILEY2018'] },
    { id: 'rem', d0: 126, d1: 730, col: '#7dffb2', zh: '塑形', en: 'Remodeling', zr: '数月–数年', er: 'months–years', src: ['AO-PFM'] }
  ],
  primary: [
    { id: 'hem', d0: 0, d1: 7, col: '#ff5d6c', zh: '炎症', en: 'Inflammation', zr: '1–7 天', er: '1–7 d', src: ['AO-PFM'] },
    { id: 'dir', d0: 7, d1: 130, col: '#b18cff', zh: '直接愈合（骨单位跨越骨折线）', en: 'Direct healing (osteons cross the line)', zr: '无外骨痂；愈合约 4.3 个月', er: 'no callus; union ~4.3 mo', src: ['AO-ORP', 'ME2011', 'SAIED2016'] },
    { id: 'rem', d0: 130, d1: 730, col: '#7dffb2', zh: '塑形', en: 'Remodeling', zr: '数月–数年', er: 'months–years', src: ['AO-PFM'] }
  ]
};

// AO aftercare / follow-up events (drawn on the timeline; listed in the card)
export const EVENTS = [
  { d: 0, fx: ['nail'], zh: '髓内钉：可立即扶拐、可耐受负重', en: 'Nail: weight bearing as tolerated with crutches immediately', src: 'AO-SR-NAIL' },
  { d: 0, fx: ['plate'], zh: '钢板：扶拐限重（≤15 kg）', en: 'Plate: limited weight bearing (≤15 kg) with crutches', src: 'AO-SR-PLATE' },
  { d: 0, fx: ['cast'], zh: '长腿石膏；避免负重 2–4 周', en: 'Long-leg cast; avoid weight bearing 2–4 wk', src: 'AO-SR-CAST' },
  { d: 10, fx: ['nail', 'plate'], zh: '软组织保护性夹板不超过 1–2 周', en: 'Protective splint no longer than 1–2 wk', src: 'AO-SR-PLATE' },
  { d: 14, fx: ['nail', 'plate', 'cast'], xr: true, zh: '第 2 周复查（临床 + X 线）', en: 'Follow-up at 2 wk (clinical + x-ray)', src: 'AO-SR-PLATE' },
  { d: 25, fx: ['cast'], zh: '3–4 周：长腿石膏可改膝下石膏', en: '3–4 wk: long-leg cast may be shortened below knee', src: 'AO-SR-CAST' },
  { d: 42, fx: ['nail', 'plate', 'cast'], xr: true, zh: '第 6 周复查', en: 'Follow-up at 6 wk', src: 'AO-SR-PLATE' },
  { d: 45, fx: ['cast'], zh: '约 6 周有骨痂：换石膏 / PTB，渐进至全负重', en: '~6 wk callus: new cast / PTB, graduated to full weight bearing', src: 'AO-SR-CAST' },
  { d: 49, fx: ['nail', 'plate'], zh: '6–8 周 X 线示愈合进展 → 增加负重', en: '6–8 wk: progress weight bearing if x-ray shows progressive healing', src: 'AO-SR-PLATE' },
  { d: 70, fx: ['plate'], zh: '钢板：完全负重避免至 8–12 周', en: 'Plate: avoid full weight bearing until 8–12 wk', src: 'AO-SR-PLATE' },
  { d: 84, fx: ['nail', 'plate', 'cast'], xr: true, zh: '第 12 周复查；之后每 6–12 周至愈合', en: 'Follow-up at 12 wk, then every 6–12 wk until healed', src: 'AO-SR-PLATE' },
  { d: 98, fx: ['cast'], zh: '拆石膏很少早于 14 周', en: 'Cast removal rarely before 14 wk', src: 'AO-SR-CAST' },
  { d: 126, fx: ['nail'], zh: '扩髓髓内钉中位愈合时间 18 周', en: 'Reamed nail: median time to healing 18 wk', src: 'DAILEY2018' },
  { d: 130, fx: ['plate'], zh: '钢板 ≈ 髓内钉：骨干愈合约 4.3 个月', en: 'Plate ≈ nail: diaphyseal union ~4.3 mo', src: 'SAIED2016' },
  { d: 182, fx: ['nail', 'plate', 'cast'], warn: true, zh: '6 个月：未愈合 → 延迟愈合评估；不愈合再手术宜至少等到 6 个月', en: '6 mo: not healed → assess delayed union; delay reoperation for nonunion ≥ 6 mo', src: 'SPRINT2008' },
  { d: 274, fx: ['nail', 'plate', 'cast'], warn: true, zh: '9 个月 + 连续 3 个月无进展 = FDA 不愈合', en: '9 mo + no progress for 3 consecutive months = FDA nonunion', src: 'SAUL2023' },
  { d: 365, fx: ['nail', 'plate'], zh: '如需取内固定：至少 12 个月、完成塑形后', en: 'Implant removal if needed: ≥12 mo, after remodeling', src: 'AO-SR-PLATE' }
];

// 关键时间点讲解 — 二期愈合（髓内钉基线；石膏附注见 CASTNOTE）
export const KEYTEXT = {
  D0: {
    zh: { h: '伤后即刻：42-A3 横行骨折与血肿', p: [
      'AO/OTA <b>42-A3</b>：胫骨骨干简单骨折，骨折线与垂直轴夹角 < 30°[[AO-SR-DEF]]。断端间约 1 mm 间隙（模型），骨内外膜与髓腔血管断裂，形成<b>骨折血肿</b>。',
      '血肿中的血小板释放 PDGF、TGF-β，纤维蛋白网成为细胞迁入的临时支架[[EG2015]]。前内侧皮下面软组织薄，后外侧有肌肉覆盖——这决定了日后骨痂分布不对称。'] },
    en: { h: 'Moment of injury: 42-A3 transverse fracture & hematoma', p: [
      'AO/OTA <b>42-A3</b>: simple diaphyseal tibial fracture with a line < 30° to the perpendicular axis[[AO-SR-DEF]]. A ~1 mm gap (model) opens; periosteal, endosteal and medullary vessels tear and form the <b>fracture hematoma</b>.',
      'Platelets release PDGF and TGF-β; the fibrin mesh is a provisional scaffold[[EG2015]]. The anteromedial face is subcutaneous while the posterolateral side is muscle-covered — the reason callus later forms asymmetrically.'] }
  },
  D3: {
    zh: { h: '第 3 天：炎症期（1–7 天）', p: [
      'AO：炎症从伤后即刻开始，持续到纤维、软骨或骨开始形成，约 <b>1–7 天</b>[[AO-PFM]]。中性粒细胞先到，巨噬细胞接管清创并分泌 IL-1、IL-6、TNF-α[[ME2011]]。',
      '断端数毫米骨细胞失去血供而坏死（图中变灰），日后被破骨细胞清除或经骨单位重建替代[[AO-PFM]]。'] },
    en: { h: 'Day 3: inflammatory stage (1–7 d)', p: [
      'AO: inflammation starts immediately and lasts until fibrous tissue, cartilage or bone begins to form, about <b>1–7 days</b>[[AO-PFM]]. Neutrophils arrive first; macrophages clear debris and secrete IL-1, IL-6, TNF-α[[ME2011]].',
      'Osteocytes die over a few millimetres of each end (grey); they are later resorbed or replaced by osteonal remodeling[[AO-PFM]].'] }
  },
  W1: {
    zh: { h: '第 1 周：肉芽组织', p: [
      '血肿被富含新生血管与成纤维细胞的肉芽组织取代；骨膜形成层与骨内膜的祖细胞增殖分化[[AO-PFM]]。',
      '远离骨折线、应变低、血供好的骨膜下开始<b>膜内成骨</b>，形成“骨领”[[AO-PFM]]。局部充血约第 2 周达峰，骨痂血供主要来自周围软组织[[AO-PFM]]。'] },
    en: { h: 'Week 1: granulation tissue', p: [
      'Granulation tissue rich in vessels and fibroblasts replaces the hematoma; progenitors in the periosteal cambium and endosteum proliferate[[AO-PFM]].',
      'Away from the gap, where strain is low, <b>intramembranous bone</b> starts forming a cuff under the periosteum[[AO-PFM]]. Hyperaemia peaks at about 2 weeks; callus blood supply comes mainly from surrounding soft tissue[[AO-PFM]].'] }
  },
  W2: {
    zh: { h: '第 2 周：软骨痂（约 2–3 周）', p: [
      'AO：软骨痂期大致对应断端<b>不再自由活动</b>的时间，约伤后 <b>2–3 周</b>；此时足以防止短缩，但仍可能成角[[AO-PFM]]。',
      '软骨痂不含足量矿物质，X 线<b>不显影</b>；断端坏死骨吸收可使骨折线略增宽。AO 建议此时（第 2 周）首次复查[[AO-SR-NAIL]]。'] },
    en: { h: 'Week 2: soft callus (~2–3 wk)', p: [
      'AO: the soft-callus stage corresponds roughly to when fragments <b>no longer move freely</b>, about <b>2–3 weeks</b>; shortening is prevented but angulation may still occur[[AO-PFM]].',
      'Soft callus is <b>radiolucent</b>; resorption of necrotic ends can widen the line slightly. AO recommends the first follow-up at 2 weeks[[AO-SR-NAIL]].'] }
  },
  W3: {
    zh: { h: '第 3 周：硬骨痂开始', p: [
      '断端被软骨痂连接后进入<b>硬骨痂期</b>：膜内成骨继续，间隙内软组织经<b>软骨内成骨</b>转为编织骨；骨化从应变最低的外周开始，逐步向中央推进[[AO-PFM]]。',
      '肥大软骨细胞分泌 VEGF 引导血管侵入——软骨内成骨的“开关”[[EG2015]]。'] },
    en: { h: 'Week 3: hard callus begins', p: [
      'Once soft callus links the ends the <b>hard-callus stage</b> starts: intramembranous bone continues and gap tissue converts to woven bone by <b>endochondral ossification</b>, starting at the low-strain periphery and moving centrally[[AO-PFM]].',
      'Hypertrophic chondrocytes secrete VEGF and drive vascular invasion — the switch for endochondral ossification[[EG2015]].'] }
  },
  W6: {
    zh: { h: '第 6 周：复查 · 骨痂可见', p: [
      'AO 第 6 周复查[[AO-SR-NAIL]]：后外侧出现云絮状、边界不清的骨痂，前内侧（皮下面）骨痂少。骨折线仍清楚——<b>尚未桥接</b>。',
      'AO：6–8 周 X 线显示愈合进展后可增加负重[[AO-SR-NAIL]]。髓内钉术后本可立即扶拐、可耐受负重[[AO-SR-NAIL]]。'] },
    en: { h: 'Week 6: review · callus visible', p: [
      'AO 6-week review[[AO-SR-NAIL]]: fluffy, ill-defined callus posterolaterally, little on the subcutaneous anteromedial face. The line is still clear — <b>not bridged</b>.',
      'AO: weight bearing can be progressed after 6–8 weeks when x-rays show progressive healing[[AO-SR-NAIL]]. After nailing, weight bearing as tolerated with crutches was already allowed immediately[[AO-SR-NAIL]].'] }
  },
  W12: {
    zh: { h: '第 12 周：桥接进行中', p: [
      'AO 第 12 周复查，之后每 6–12 周复查直到影像与功能愈合[[AO-SR-NAIL]]。后侧、外侧皮质先桥接，前内侧最慢（模型）。',
      '胫骨比上肢长骨愈合慢：AO 指出硬骨痂期持续到断端被新骨牢固连接（<b>3–4 个月</b>）[[AO-PFM]]；扩髓髓内钉中位愈合 <b>18 周</b>[[DAILEY2018]]。12 周未愈合并不等于延迟愈合。'] },
    en: { h: 'Week 12: bridging in progress', p: [
      'AO review at 12 weeks, then every 6–12 weeks until radiographic healing and function are established[[AO-SR-NAIL]]. Posterior and lateral cortices bridge first, anteromedial last (model).',
      'The tibia heals more slowly than upper-limb bones: AO says hard callus lasts until the fragments are firmly united (<b>3–4 months</b>)[[AO-PFM]]; reamed nailing median healing time is <b>18 weeks</b>[[DAILEY2018]]. Not united at 12 weeks is not yet delayed union.'] }
  },
  W18: {
    zh: { h: '第 18 周：骨性连接（模型）', p: [
      '模型在第 18 周达到 <b>≥ 3 个皮质桥接</b>（RUST 皮质 = 3）[[WHELAN2010]]，对应扩髓髓内钉的中位愈合时间[[DAILEY2018]]；临床上还需骨折处无压痛、负重无痛。',
      '个体差异大：开放骨折、吸烟、高能量损伤者更慢[[DAILEY2018]]。'] },
    en: { h: 'Week 18: union (model)', p: [
      'The model reaches <b>≥ 3 bridged cortices</b> (RUST cortex = 3)[[WHELAN2010]] at 18 weeks, the median healing time after reamed nailing[[DAILEY2018]]; clinically also no tenderness and painless weight bearing.',
      'Wide variation: open fractures, smoking and high energy heal more slowly[[DAILEY2018]].'] }
  },
  M6: {
    zh: { h: '第 6 个月：塑形 · 延迟愈合的分水岭', p: [
      '编织骨经表面侵蚀与骨单位重建逐步变为板层骨，多余骨痂吸收[[AO-PFM]]。',
      '若此时仍未愈合：延迟愈合常在 3–6 个月识别[[BOWERS2024]]；SPRINT 试验提示因不愈合再手术至少推迟到 6 个月可显著减少再手术[[SPRINT2008]]。'] },
    en: { h: 'Month 6: remodeling · the delayed-union watershed', p: [
      'Woven bone is replaced by lamellar bone through surface erosion and osteonal remodeling; excess callus resorbs[[AO-PFM]].',
      'If still not healed: delayed healing is usually recognised at 3–6 months[[BOWERS2024]]; SPRINT suggests delaying reoperation for nonunion for at least 6 months substantially reduces reoperation[[SPRINT2008]].'] }
  },
  M9: {
    zh: { h: '第 9 个月：不愈合的时间界线', p: [
      'FDA（1986）：伤后 <b>9 个月</b>仍未愈合，且之前<b>连续 3 个月</b>无进展[[SAUL2023]]。文献也引用“按 AO 原则，6 个月未愈合即为不愈合”[[SAUL2023]]。',
      '正常愈合者此时骨折线基本消失、骨痂缩小；切换“延迟/萎缩性不愈合”对比。'] },
    en: { h: 'Month 9: the nonunion time line', p: [
      'FDA (1986): not healed at <b>9 months</b> with no progress during the previous <b>3 months</b>[[SAUL2023]]. Literature also quotes “according to AO principles, a non-union has not healed after 6 months”[[SAUL2023]].',
      'With normal healing the line is essentially gone and callus shrinking; switch to delayed / atrophic to compare.'] }
  },
  Y1: {
    zh: { h: '1 年以后：皮质与髓腔恢复', p: [
      '塑形持续到骨恢复原有形态、髓腔再通，可能需数年[[AO-PFM]]。',
      'AO：如需取内固定，最好在完全塑形后，通常术后<b>至少 12 个月</b>，以降低再骨折风险[[AO-SR-NAIL]]。'] },
    en: { h: 'After 1 year: cortex and canal restored', p: [
      'Remodeling continues until the bone regains its original shape including the medullary canal, possibly years[[AO-PFM]].',
      'AO: if implants must be removed, do it after complete remodeling, usually <b>at least 12 months</b> after surgery, to reduce refracture risk[[AO-SR-NAIL]].'] }
  }
};

// 一期愈合（加压钢板）关键点
export const KEYTEXT_P = {
  D0: { zh: { h: '加压钢板：解剖复位 + 绝对稳定', p: ['AO：加压钢板对骨折<b>预加载</b>以消除断端微动，获得绝对稳定[[AO-SR-PLATE]]。钢板若未预弯，压力先作用于钢板侧皮质，对侧张开间隙 → 不稳定，可致延迟愈合或不愈合[[AO-SR-PLATE]]。', '直接复位需切开，伤口并发症风险增加[[AO-SR-PLATE]]。'] },
        en: { h: 'Compression plate: anatomical reduction + absolute stability', p: ['AO: compression plating pre-loads the fracture to eliminate interfragmentary motion — absolute stability[[AO-SR-PLATE]]. Without overbending, compression occurs under the plate and a gap opens opposite → instability, delayed or nonunion[[AO-SR-PLATE]].', 'Direct reduction carries an increased risk of wound complications[[AO-SR-PLATE]].'] } },
  D3: { zh: { h: '第 3 天：炎症，但不会走向骨痂', p: ['仍有短暂炎症（1–7 天）[[AO-PFM]]，但断端几乎无应变（< 2%），不形成软骨痂[[ME2011]]。', 'AO：扶拐限重 ≤ 15 kg[[AO-SR-PLATE]]。'] },
        en: { h: 'Day 3: inflammation, but no route to callus', p: ['A brief inflammatory phase still occurs (1–7 d)[[AO-PFM]], but strain is < 2%, so no soft callus forms[[ME2011]].', 'AO: limited weight bearing ≤ 15 kg with crutches[[AO-SR-PLATE]].'] } },
  W1: { zh: { h: '第 1 周：接触/间隙愈合的条件', p: ['接触愈合需间隙 < 0.01 mm 且应变 < 2%；间隙愈合需间隙 < 800 μm–1 mm[[ME2011]]。', '夹板保护软组织不超过 1–2 周，随后活动踝与距下关节[[AO-SR-PLATE]]。'] },
        en: { h: 'Week 1: conditions for contact / gap healing', p: ['Contact healing needs a gap < 0.01 mm and strain < 2%; gap healing needs a gap < 800 μm–1 mm[[ME2011]].', 'Splint no longer than 1–2 weeks, then mobilise ankle and subtalar joints[[AO-SR-PLATE]].'] } },
  W2: { zh: { h: '第 2 周：复查 · 无骨痂是预期', p: ['AO 第 2 周复查[[AO-SR-PLATE]]。AO：预期为<b>无骨痂的直接愈合</b>；若出现“刺激性骨痂”，提示不稳定[[AO-SR-FA]]。'] },
        en: { h: 'Week 2: review · no callus is expected', p: ['AO 2-week review[[AO-SR-PLATE]]. AO: <b>direct healing without callus</b> is anticipated; irritation callus signals instability[[AO-SR-FA]].'] } },
  W3: { zh: { h: '第 3 周：切割锥开始跨越骨折线', p: ['破骨细胞组成的<b>切割锥</b>以约 <b>50–100 μm/天</b> 穿越骨折线，后方成骨细胞回填，直接重建哈弗斯系统[[ME2011]][[AO-ORP]]。（剖面中黄色胶囊示意）'] },
        en: { h: 'Week 3: cutting cones begin to cross', p: ['Osteoclastic <b>cutting cones</b> cross the fracture at about <b>50–100 μm/day</b>; osteoblasts behind them refill, rebuilding Haversian systems directly[[ME2011]][[AO-ORP]]. (Yellow capsules in section)'] } },
  W6: { zh: { h: '第 6 周：骨折线仍在，开始变淡', p: ['X 线没有外骨痂，骨折线逐渐模糊——这正是直接愈合的“诚实”表现：<b>影像上看起来更慢、更不明显</b>。', 'AO：6–8 周 X 线示进展后才增加负重[[AO-SR-PLATE]]。'] },
        en: { h: 'Week 6: line still present, starting to fade', p: ['No external callus; the line slowly blurs — the honest appearance of direct healing: <b>radiographically slower and less visible</b>.', 'AO: progress weight bearing only after 6–8 weeks when x-rays show progressive healing[[AO-SR-PLATE]].'] } },
  W12: { zh: { h: '第 12 周：完全负重的时间窗', p: ['AO：钢板固定在愈合更进一步前（<b>8–12 周</b>）避免完全负重[[AO-SR-PLATE]]。第 12 周复查[[AO-SR-PLATE]]。', '骨折线变淡但常仍可辨认。'] },
        en: { h: 'Week 12: window for full weight bearing', p: ['AO: avoid full weight bearing after plating until healing is more advanced (<b>8–12 weeks</b>)[[AO-SR-PLATE]]. 12-week review[[AO-SR-PLATE]].', 'The line is fainter but often still recognisable.'] } },
  W18: { zh: { h: '约 4–5 个月：骨折线消失 = 愈合', p: ['骨干胫骨 RCT：钢板愈合 4.30 ± 1.48 个月，与髓内钉相近[[SAIED2016]]；远端胫骨 meta 分析中髓内钉约快 1.6 周[[LI2024]]。', '一期愈合没有桥接骨痂，<b>RUST 不适用</b>；以骨折线消失 + 无痛负重判断。'] },
        en: { h: '~4–5 months: line disappears = union', p: ['Diaphyseal RCT: plate union 4.30 ± 1.48 months, similar to nailing[[SAIED2016]]; in distal tibia RCTs nailing was ~1.6 weeks faster[[LI2024]].', 'Primary healing has no bridging callus, so <b>RUST does not apply</b>; judge by disappearance of the line plus painless weight bearing.'] } },
  M6: { zh: { h: '第 6 个月：骨单位重建继续', p: ['塑形持续数月至数年[[AO-PFM]]。钢板下方骨可有暂时性疏松（坏死骨的哈弗斯重建）[[AO-PFM]]。'] },
        en: { h: 'Month 6: osteonal remodeling continues', p: ['Remodeling continues for months to years[[AO-PFM]]. Bone under a plate may be temporarily porotic (Haversian remodeling of necrotic bone)[[AO-PFM]].'] } },
  M9: { zh: { h: '第 9 个月', p: ['若此时骨折线仍清楚、且 3 个月无进展，符合 FDA 不愈合定义[[SAUL2023]]。'] },
        en: { h: 'Month 9', p: ['A still-clear line with no progress for 3 months meets the FDA nonunion definition[[SAUL2023]].'] } },
  Y1: { zh: { h: '1 年以后', p: ['如需取钢板，AO 建议至少 12 个月、完成塑形后，以降低再骨折风险[[AO-SR-PLATE]]。'] },
        en: { h: 'After 1 year', p: ['If the plate must be removed, AO advises ≥ 12 months, after remodeling, to reduce refracture risk[[AO-SR-PLATE]].'] } }
};

export const CASTNOTE = {
  D0: { zh: '石膏：闭合复位后长腿石膏（膝上至大腿 1/2–2/3）[[AO-SR-CAST]]。', en: 'Cast: closed reduction, long-leg cast (half to two-thirds up the thigh)[[AO-SR-CAST]].' },
  W3: { zh: '石膏：3–4 周后可改为膝下石膏[[AO-SR-CAST]]。', en: 'Cast: after 3–4 weeks it can be shortened below the knee[[AO-SR-CAST]].' },
  W6: { zh: '石膏：约 6 周开始有骨痂，可换新石膏或 PTB 石膏并渐进负重，约 6 周全负重[[AO-SR-CAST]]。', en: 'Cast: callus at ~6 weeks → new cast or PTB cast with progressive weight bearing, full by ~6 weeks[[AO-SR-CAST]].' },
  W12: { zh: '石膏：拆除很少早于 14 周[[AO-SR-CAST]]。', en: 'Cast: removal rarely before 14 weeks[[AO-SR-CAST]].' },
  W18: { zh: '石膏：胫骨干通常 3–5 个月完全愈合[[AO-SR-CAST]]。', en: 'Cast: tibial shaft fractures usually take 3–5 months to heal completely[[AO-SR-CAST]].' }
};

export const CELLS = [
  { id: 'neu', col: '#ff6b8a', zh: '中性粒细胞', en: 'Neutrophil', zw: '数小时–3 天', ew: 'hours–3 d', zr: '最早到达，吞噬清创，释放趋化因子招募单核细胞。', er: 'First responders; phagocytose debris and recruit monocytes.' },
  { id: 'mac', col: '#ff9f43', zh: '巨噬细胞', en: 'Macrophage', zw: '1 天–2 周', ew: '1 d–2 wk', zr: '清除坏死组织；分泌 IL-1/IL-6/TNF-α；由促炎向修复表型转换。', er: 'Clear necrotic tissue; secrete IL-1/IL-6/TNF-α; shift from pro-inflammatory to reparative.' },
  { id: 'msc', col: '#5ee7ff', zh: '间充质祖细胞', en: 'Mesenchymal progenitor', zw: '3 天–3 周', ew: '3 d–3 wk', zr: '主要来自骨膜形成层与骨内膜；低应变 → 成骨，较高应变 → 成软骨。', er: 'Mainly from periosteal cambium and endosteum; low strain → bone, higher strain → cartilage.' },
  { id: 'chd', col: '#b9d4ff', zh: '软骨细胞', en: 'Chondrocyte', zw: '1–4 周', ew: '1–4 wk', zr: '构成软骨痂；肥大后分泌 VEGF、钙化基质。', er: 'Build soft callus; when hypertrophic secrete VEGF and calcify matrix.' },
  { id: 'obl', col: '#ffb547', zh: '成骨细胞', en: 'Osteoblast', zw: '1 周–数月', ew: '1 wk–months', zr: '沉积类骨质并矿化：早期编织骨，塑形期板层骨。', er: 'Deposit and mineralise osteoid: woven bone early, lamellar later.' },
  { id: 'ocl', col: '#b18cff', zh: '破骨细胞', en: 'Osteoclast', zw: '2 周–数年', ew: '2 wk–years', zr: '吸收坏死骨端与钙化软骨；形成切割锥（50–100 μm/天）。受 RANKL/OPG 调控。', er: 'Resorb necrotic ends and calcified cartilage; form cutting cones (50–100 μm/day). Controlled by RANKL/OPG.' }
];
export const SIGNALS = [
  { id: 'inf', col: '#ff6b8a', zh: 'IL-1 / IL-6 / TNF-α', en: 'IL-1 / IL-6 / TNF-α', zr: '炎症启动，最初 24 h 达峰、约 7 天完成；塑形期再表达。', er: 'Start inflammation, peak within 24 h, complete by ~7 d; re-expressed in remodeling.' },
  { id: 'tgf', col: '#ff9f43', zh: 'PDGF / TGF-β', en: 'PDGF / TGF-β', zr: '血小板与血肿释放，趋化并促进祖细胞增殖。', er: 'From platelets/hematoma; chemotaxis and progenitor proliferation.' },
  { id: 'bmp', col: '#5ee7ff', zh: 'BMP-2 等', en: 'BMP-2 etc.', zr: '早期表达，启动成骨/成软骨分化。', er: 'Early; trigger osteo/chondrogenic differentiation.' },
  { id: 'vegf', col: '#ffb547', zh: 'VEGF', en: 'VEGF', zr: '肥大软骨细胞分泌，驱动血管侵入。', er: 'From hypertrophic chondrocytes; drives vascular invasion.' },
  { id: 'rank', col: '#b18cff', zh: 'RANKL / OPG', en: 'RANKL / OPG', zr: 'RANKL 促破骨分化，OPG 为诱饵受体。', er: 'RANKL drives osteoclastogenesis; OPG is its decoy receptor.' }
];

// 影像对照：按愈合路径
export const IMAGING = {
  secondary: [
    { d: 0, zt: '伤后/术后', et: 'Post-op', z: '骨折线锐利；软组织肿胀；髓内钉与交锁螺钉位置。', e: 'Sharp line; soft-tissue swelling; nail and locking screws.', src: 'AO-SR-NAIL' },
    { d: 14, zt: '第 2 周', et: 'Week 2', z: '无可见骨痂（软骨痂不显影）；断端吸收，骨折线可稍增宽。', e: 'No visible callus (radiolucent soft callus); end resorption may widen the line.', src: 'AO-PFM' },
    { d: 42, zt: '第 6 周', et: 'Week 6', z: '后外侧云絮状骨痂；未桥接；RUST 多为 2 分皮质。', e: 'Fluffy posterolateral callus; not bridged; cortices mostly RUST 2.', src: 'AO-SR-NAIL' },
    { d: 84, zt: '第 12 周', et: 'Week 12', z: '骨痂致密，部分皮质桥接；之后每 6–12 周复查。', e: 'Denser callus, some cortices bridged; then review every 6–12 wk.', src: 'AO-SR-NAIL' },
    { d: 126, zt: '第 18 周', et: 'Week 18', z: '≥3 个皮质桥接 = 影像愈合（中位 18 周）。', e: '≥3 bridged cortices = radiographic union (median 18 wk).', src: 'DAILEY2018' },
    { d: 274, zt: '9 个月', et: '9 months', z: '骨折线基本消失，骨痂缩小；若仍可见且 3 个月无进展 → 不愈合。', e: 'Line essentially gone, callus smaller; if still visible with no progress for 3 mo → nonunion.', src: 'SAUL2023' },
    { d: 540, zt: '1–2 年', et: '1–2 years', z: '塑形：皮质连续、轮廓恢复、髓腔再通。', e: 'Remodeling: continuous cortex, restored contour, recanalised canal.', src: 'AO-PFM' }
  ],
  primary: [
    { d: 0, zt: '术后', et: 'Post-op', z: '解剖复位，骨折线极细；钢板与 8 枚皮质螺钉。', e: 'Anatomical reduction, hairline gap; plate with 8 cortical screws.', src: 'AO-SR-PLATE' },
    { d: 14, zt: '第 2 周', et: 'Week 2', z: '无骨痂（预期如此）。出现骨痂 = 刺激性骨痂，提示不稳定。', e: 'No callus (expected). Callus would be irritation callus = instability.', src: 'AO-SR-FA' },
    { d: 42, zt: '第 6 周', et: 'Week 6', z: '骨折线仍清楚，边缘开始模糊。', e: 'Line still visible, edges begin to blur.', src: 'AO-SR-PLATE' },
    { d: 84, zt: '第 12 周', et: 'Week 12', z: '骨折线变淡；完全负重时间窗 8–12 周。', e: 'Line fainter; full weight bearing window 8–12 wk.', src: 'AO-SR-PLATE' },
    { d: 130, zt: '约 4.3 个月', et: '~4.3 months', z: '骨折线基本不可辨 = 愈合（无桥接骨痂）。', e: 'Line no longer distinct = union (no bridging callus).', src: 'SAIED2016' },
    { d: 400, zt: '1 年+', et: '1 yr+', z: '骨单位重建完成大半；如需取钢板应 ≥12 个月。', e: 'Osteonal remodeling largely complete; plate removal if needed ≥12 mo.', src: 'AO-SR-PLATE' }
  ]
};
