# AI 文献检索课设计规格

日期：2026-11-08（Asia/Shanghai，UTC+8）
状态：用户已批准设计简报方案 A，并批准本规格中的版权与配图收窄。实现按本文件执行，不再改问方案。

## 1. 目标

做一门可独立部署的中文静态课，服务个人网站、自学、知识传播和线上线下授课。同一份正文有两种视图：

- 自学视图：暖白长页、清晰层级、宽屏侧栏目录、窄屏目录抽屉。
- 授课视图：从同一批章节切出 16:9 大字卡片，深海军蓝舞台。不维护第二份讲稿。

核心命题：**搜不到，不等于不存在。** 工具覆盖不全会被误当成研究空白。

课程是教学整理，不是原文搬家，也不是本项目的独立检索实验。

## 2. 已否决的做法

- 方案 B（纯杂志长文）和方案 C（纯幻灯）不采用。
- 不发布、不合并、不创建站点、不部署。只开独立 PR。
- 不读取、不合并、不改写 LoopGraph PR2 及其分支上未合并的代码。
- 不把原文全文、16 张原帖图片、课堂照片打进公开仓库、公开 ZIP 或本站原创图。那些材料没有转载许可，只留在私人研究包里，本仓库不收录。
- 不做在线检索、账号、语音、视频、访问统计、远程字体。不收集、不保存、不请求真实 API key 或密码。

## 3. 仓库位置

遵循现有课件馆：课程是静态文件，目录卡片写在 `assets/lessons-catalogv1.0.js`。

```
lessons/ai-literature-searchv1.0/
  index.html
  README.md
  assets/css/course.css
  assets/js/rules.js
  assets/js/course.js
  assets/images/*.svg
tests/ai-literature-search.test.mjs
```

- 站点内入口：`lessons/ai-literature-searchv1.0/index.html`
- 资源一律相对该目录，放到个人网站子目录或本地静态服务器都能打开。
- 课件馆增加一条主题为「科研与医学」的卡片，缩略图用本课 `thumb.svg`。首页课件数字的静态兜底从 12 改为 17（原目录 16 条加本课 1 条）。脚本查询参数从 `v=1.7` 升到 `v=1.8`，避免旧缓存。
- `#lessonCatalog` 增加一条 `<noscript>` 链接，无脚本时也能进本课。
- 可下载 ZIP 只含本课目录里的 `index.html`、`README.md` 和 `assets/`。规格、计划和测试留在仓库，不进 ZIP。

## 4. 视觉

| 角色 | 色值 | 用途 |
|---|---|---|
| 阅读底 | `#f6f1e7` | 自学与打印页底 |
| 正文墨色 | `#1c1915` | 正文 |
| 深海军蓝 | `#0e2744` | 标题强调、授课舞台 |
| 青绿 | `#0f766e` | 链接、当前章节、主按钮 |
| 琥珀 | `#9a6700` / 底 `#fff6e4` | 待核验、作者演示边界 |

- 正文字号约 1.125rem，行高 1.8，栏宽约 46rem（720–800px）。
- 字体只用系统字体栈，包含 `WenQuanYi Micro Hei`、`PingFang SC`、`Microsoft YaHei`、`Noto Sans SC`、`sans-serif`。禁止 `@font-face` 远程地址，禁止 Google Fonts。
- 宽屏：左侧目录固定。窄于 880px：目录改为页面顶部的 `<details>`，默认收起。
- 图下文必须有解释和来源，不能只做装饰卡片。
- 授课舞台字号用 `clamp`，一页一个主张。投影时不排满屏小字。
- 动效默认没有滑入。尊重 `prefers-reduced-motion`。

## 5. 内容与标签

三种标签贯穿全文，不能混用：

- **原文观点**：兔老师原文里的做法、案例和判断。
- **官方核对**：2026-11-08（北京时间）对照公开文档的数字与原话口径。收费和收录会变，页面写明核对日并链接官方页。
- **教学补充**：本课为了教判断而写的组织、图解和规则。

来源作者：兔老师，X @DrRabbitAI。原帖：<https://x.com/DrRabbitAI/status/2117952642593017862>。帖文时间 2026-11-04 20:10:34（Asia/Shanghai）。关联文章页只作定位，不把文章全文放进网站。

每章末尾有「这一节的来源」链接。官方 URL 用下列地址，不改写路径：

- OpenAlex 定价：<https://developers.openalex.org/access/pricing/>
- OpenAlex 示例成本：<https://developers.openalex.org/access/example-costs/>
- OpenAlex 限速：<https://developers.openalex.org/how-to-use-the-api/rate-limits-and-authentication>
- OpenAlex 语料口径：<https://developers.openalex.org/how-to-use-the-api/pricing>
- OpenAlex 全文与下载说明：<https://developers.openalex.org/download-all-data/content>
- OpenAlex 文档首页：<https://developers.openalex.org>
- Semantic Scholar API：<https://www.semanticscholar.org/product/api>
- Semantic Scholar 接口根：<https://api.semanticscholar.org>
- SerpApi 定价：<https://serpapi.com/pricing>
- SerpApi Google Scholar：<https://serpapi.com/google-scholar-api>
- PubMed 简介：<https://pubmed.ncbi.nlm.nih.gov/about/>
- PubMed E-utilities（本次抓取未成功，链出去但不写限速）：<https://www.ncbi.nlm.nih.gov/books/NBK25497/>
- arXiv API 帮助：<https://info.arxiv.org/help/api/>
- arXiv 使用条款：<https://info.arxiv.org/help/api/tou.html>
- Google Scholar 帮助：<https://scholar.google.com/intl/en/scholar/help.html>

### 5.1 章节（阅读顺序）

所有正文都在 HTML 里。脚本只负责高亮、选择、复制、自测和授课视图。

1. `s-open` 开场。命题、适用场景、三种标签怎么读。
2. `s-goals` 学习目标。五条：辨认误区、选路线、读懂五类提问、选数据源、完成核验且不泄露密钥。
3. `s-myth` 核心误区。开源检索技能往往只连少数免费源，或无密钥即被限流。结果少的危险是错觉：把「工具没覆盖」当成「方向空白」。教学补充：开题被问「这篇你怎么没看」时，缺的常常是哨兵文献，不是更华丽的提示词。
4. `s-routes` 双路线。路线甲：用已经接入论文库的 Agent，打开即搜。路线乙：自己把论文 API 接进 Agent。作者按自己的使用难度排序为：YILA（甲）→ Grok Bot（乙，第一次接 API）→ Codex 与 WorkBuddy（乙，本地 Agent）。这是原文观点，不是本课实测，也不存在标准答案。
5. `s-route-pick` 路线选择。页面上始终看得见规则表。脚本按同一规则高亮，不伪装成模型推荐。
6. `s-cases-map` 到五个案例节。每例都标「作者演示 · 未独立复现」。结构固定为：这个案例在教什么判断、原始提问（短引）、教学示例、作者当时承认的边界、你该核对什么。
7. `s-matrix` 与 `s-picker`、`s-prices`。五源比较、本地选型、易变的价格和限速。
8. `s-layers` 题录、摘要、全文。
9. `s-security` 接入与安全。Grok Bot、Codex、WorkBuddy 只作为作者当时的流程，界面会变。
10. `s-verify` 检索后核验与漏检。
11. `s-templates` 可复制模板。
12. `s-quiz` 四题解释性自测。
13. `s-sources` 来源、版权、未核验清单。

### 5.2 五个案例（都不是本课结论）

| 节 | 教学判断 | 可以转述的作者演示 | 禁止升级成的结论 |
|---|---|---|---|
| `s-case-proposal` 立项依据 | 去重后的文献池，加上「英文几乎不直接研究该中国议题，只适合做国际参照」这类边界，比硬凑相关文献有用 | 作者称 YILA 查了万方、OpenAlex、Google Scholar，去重后 57 篇，并给出 Excel 候选池 | 57 这个数字、三块代表文献的真实性 |
| `s-case-empirical` 中英文实证 | 截图上的 JCR 分区必须另注版本和学科，不能当成论文的固定属性 | 作者称结果分成中英文表，并提醒现有研究多讲成瘾或问题性使用，而不是普通使用时长 | 样本量、Frontiers in Psychology 的 Q1、Acta Psychologica 的 Q2 |
| `s-case-clinical` 临床 | 相对时间窗会把奠基试验留在窗外；临床检索结果不是诊疗建议 | 作者点名 DELIVER、EMPULSE、2023 ESC 指南更新，并提醒 DAPA-HF、EMPEROR 落在其「近 5 年」之外 | 这些论文的年份、分区、是否被本课打开核对 |
| `s-case-classic` 经典 | 先给阅读路径，再给近期研究；「如果只读三篇」是教学策略，篇目仍要核对存在性 | 作者给出的路径：概念奠基、社会资本与协同治理、中国情境；点名 Norris 等、Aldrich & Meyer | 2007、2014 等年份 |
| `s-case-patent` 专利 | 「值得跟踪的申请人」不是按件数排名；同族未核全；不能当 FTO 或法律意见 | 作者称分成 9 条技术路线，并列出一批申请人；其中把宁德时代放在「国外」 | 9 条路线、申请人名单、地域分类。课程明确写：这一地域分类值得复核，不照搬为事实 |

案例图用 `fig-case-card.svg`：一张标注过的假想结果卡片，字段是「【示例】」和 `10.0000/example.not.real`。图上写明「教学示例，不是搜索截图，也不是论文证据」。真实论文名只出现在正文的「作者演示未核对」列表里，不放进伪造的结果页。

### 5.3 五源：官方核对口径

价格与收录以 2026-11-08 北京时间的公开文档为准，页面写「可能变化」。

**OpenAlex**

- 每个账户每天 1 美元免费额度，UTC 零点重置，即北京时间 08:00。
- 官方示例单价（每 1000 次）：单篇实体免费；列表加筛选 0.10 美元；搜索 1 美元；内容下载 10 美元。换算到单次：筛选 0.0001 美元，基础搜索 0.001 美元，PDF 0.01 美元。
- 1 美元约等于 1000 次基础 API 搜索，不等于在网站上点 1000 次。按同一单价，rerank 搜索约 500 次。
- 用单价做的算术示例，不是实测账单：20 次基础搜索 + 200 次筛选 + 50 次单篇查询 = 0.04 美元。
- 一般限速：无 key 10 RPS；免费 key 或预付费 30 RPS。语义搜索是 1 RPS。10/30 不覆盖全部重型查询。每页最大 100。
- 新免费账户花费第一美元时，速度上限是每 5 分钟 0.10 美元。2026-11-03 之前建立的账户不适用。这不是「注册后干等约 50 分钟就自动解除」。原文的 50 分钟简化，本课改写为官方节奏限制。
- 策展核心语料 3 亿多条作品。文档称截至 2026 年 9 月，默认约 3.27 亿，`corpus=all` 约 4.76 亿。作品不等于全部期刊论文。两套语料不能混比。
- 缓存了 7000 多万篇开放获取全文 PDF，另有 TEI XML。原文「6000 多万」与现文档不同，采用现口径并写日期。元数据 CC0 不等于所链接 PDF 都可以自由转载。
- 原文中的 1.7 亿摘要、1.3 亿开放获取、590 万中文，本次未独立计数，不写成已核验事实。不能把 language 字段当成中文核心覆盖率。

**Semantic Scholar**

- API 介绍页所示规模：2.14 亿篇论文、24.9 亿条引用、7900 万位作者。这是介绍页数字，不是实时精确总数。与原文数量级一致。
- 无密钥用户共享每秒 1000 次的池，不是每个人 1000 RPS。申请 key 后的入门限速是全部端点 1 RPS。
- 介绍页写明 Academic Graph 提供作者、论文、引用、场地和 SPECTER2 向量；Recommendations 提供相似论文。
- 原文所说「摘要因版权缺失」和「关键词检索最多 1000 条」，本次没有拿到对应官方端点文档（尝试过的 FAQ 返回 404）。标为待核验，不装作已核实。TLDR 同样只作为原文观点。

**SerpApi**

- 第三方，不是 Google 官方 API。
- 定价页核对：免费档 0 美元、每月 250 次、每小时 50 次；入门档每月 25 美元、1000 次、每小时 200 次。可能变化。
- 原文「当月没用完就清零」不扩大到所有余额。降档时的 Extra Credits 存在例外。
- 只对成功检索计数；缓存、出错和失败的不计；单次返回多少条不影响信用点。
- `num` 为 1–20，默认 10。示例字段有 `snippet`。片段不是完整摘要。

**PubMed**

- 4000 多万条生物医学题录和摘要。PubMed 本身不收录期刊全文，可链到 PMC 或出版社。PubMed 不是 PMC。
- E-utilities 限速本次未核验（文档抓取被挡）。不写任何硬性限速。

**arXiv**

- legacy API：至少间隔 3 秒，同一时间只保持一个连接。不能靠加机器绕过。
- 转载预印本需要版权人许可。站点只链到摘要页或合法全文位置，不镜像论文 PDF。全文可读不等于可以随便再分发。

**中文核心与学位论文**：这五个来源都不够。知网、万方是原文建议的补充去处，本课不核对其收录量。

**Google Scholar**：帮助页写明多数摘要免费，阅读全文可能需要订阅。第三方 API 不赋予付费全文访问权。

### 5.4 本地规则（确定性，不是模型）

规则表印在 HTML 里。`rules.js` 导出同一套函数。未知输入返回错误，不猜测。

路线 `recommendRoute({ want })`：

| `want` | 结果 | 说明 |
|---|---|---|
| `no` | `connected-agent` | 作者演示工具名 YILA。适合不想自己管密钥的人 |
| `first-api` | `self-api` | 作者演示工具名 Grok Bot |
| `local` | `self-api` | 作者演示工具名 Codex 或 WorkBuddy |
| 其他 | `{ error: "unknown-want" }` | 不给工具名 |

数据源 `recommendSources({ goal, lang, budget })`。`budget` 只改变提醒，不改变选中的源。

| `goal` | 主源 | 同时列出 |
|---|---|---|
| `overview` | OpenAlex | 无 |
| `citations` | Semantic Scholar | OpenAlex |
| `gap` | SerpApi | OpenAlex |
| `biomed` | PubMed | OpenAlex |
| `preprint` | arXiv | OpenAlex |

`lang === "zh-core"` 时 `notEnough: true`，主源仍按上表给出，但文案写明五个源不能替代中文核心库。其他 `lang` 仅接受 `any`。`budget` 仅接受 `free` 或 `paid-ok`。任一枚举非法则 `{ error }`，不返回数据源。

SerpApi 出现时必须带第三方和「价格可能变化」。`budget === "free"` 时追加免费档 250 次/月的提醒。

### 5.5 三层信息

图 `fig-layers.svg` 与正文一致：

- 题录：题名、作者、年份、venue、DOI、被引次数。有题录不等于读过论文。
- 摘要：作者摘要，或数据源明确标注的 TLDR。`snippet` 画在摘要旁边并打叉。
- 全文：开放获取链接，或学校图书馆等合法入口。检索命中不产生下载权或转载权。

### 5.6 安全

- 公开页面、仓库、截图、聊天记录都不放真实 key。
- 模板里的变量名只允许 `OPENALEX_API_KEY` 和占位「【你的关键词】」「【填写】」。
- 建议顺序：工具若有专门的密钥输入框，就用输入框；否则写入本地 `.env`，并要求 Agent 不要打开、打印或在回复里显示该文件。
- Codex 演示里出现过「你把 key 发来」的说法。本课明确改写：不要把 key 粘进对话。
- 本页没有 `type="password"`，没有会提交的密钥表单，脚本不调用 `fetch`、`XMLHttpRequest`、`WebSocket`、`localStorage`、`sessionStorage`。

### 5.7 核验

图 `fig-verify.svg` 为六步，正文用同一顺序：

1. 抽几条，用 DOI 或题名回到数据库查是否真实存在。
2. 核对期刊和年份。分区必须另查版本和学科。
3. 用你已经知道的哨兵文献做漏检检查。哨兵文献没出现，说明这条检索不完整。
4. 预印本、出版版和机构库版本要去重，不能把版本数当成论文数。
5. 记下检索式、数据源和检索日期。作者示例里的「近 5 年」是相对时间，只保留在历史演示。
6. 检查时间窗是否切掉了奠基文献。

### 5.8 模板

HTML 里用 `<pre>` 放全文，无脚本也能阅读和手动复制。

- `tpl-author-safety`：原文安全提示词，保留 `.env` 与「不要打开、打印或在回复中显示这个 key」。
- `tpl-author-cases`：五个原始场景提示词，保留「近 5 年」，标题标明历史演示。
- `tpl-teaching`：教学改写。必填主题、中英文同义词、文献类型、绝对起止日期 `YYYY-MM-DD`、点名的数据源、纳排标准。输出 DOI 和证据定位。无法确认就写「未确认」，禁止编造 DOI。

复制成功：状态文字「已复制到剪贴板。内容只留在你的设备上。」
复制失败：状态文字「复制失败。文字已选中，请使用 Ctrl+C 或长按复制。密钥不会被上传。」并选中对应 `<pre>`。`clipboard` 不存在、非安全上下文、或 Promise 拒绝，都走失败分支。

### 5.9 四题自测

答案和解释写在 HTML 的 `<details>` 里，无脚本可展开。脚本对照 `rules.js` 的 `gradeQuiz`，在同页显示对错，不上传、不写入存储。可重试：再次选择会清除上一轮的对错样式。

| id | 正确选项 | 题干要点 |
|---|---|---|
| `q-blank` | `no-blank` | 只返回十几篇，能否证明方向几乎没人做 |
| `q-snippet` | `not-abstract` | snippet 是不是完整摘要 |
| `q-rights` | `no-grant` | 搜到结果是否就有全文下载权或转载权 |
| `q-key` | `never-html` | 能否把 API key 写进公开课件 HTML |

解释全文以 `rules.js` 导出的字符串为准，HTML 必须包含同一段文字。判分函数对未知题目或未知选项返回 `{ error }`。

## 6. 原创图

每张图是 SVG，含可见中文，不用外部图片。HTML 用 `<figure>` + 有内容的 `alt` + `<figcaption>`（解释 + 来源）。

| 文件 | 教什么 |
|---|---|
| `fig-hero.svg` | 结果计数很少，旁边仍有一叠没被这个工具覆盖的文献 |
| `fig-routes.svg` | 两条路线汇合到同一句：搜不到不等于不存在；两条路都要核验 |
| `fig-matrix.svg` | 五源分别回答哪类问题，以及各自盲区 |
| `fig-layers.svg` | 题录、摘要、全文三层，snippet 不是摘要 |
| `fig-verify.svg` | 六步核验，哨兵文献单独标出 |
| `fig-case-card.svg` | 标注清楚的假想结果卡片，假 DOI |
| `thumb.svg` | 课件馆 4:3 缩略图，只含命题和「文献检索课」 |

图注统一含「教学整理」。不出现伪造的数据库界面、真实检索命中数或真实论文首页。

## 7. 交互

### 7.1 无脚本

- 全部章节、规则表、五案例、五源、模板、自测解释、来源链接都在文档流里。
- 目录是链接，锚点可分享。
- `<details>` 负责窄屏目录和自测解释。

### 7.2 有脚本

- 侧栏用 Intersection Observer 设置 `aria-current`。点击目录不阻止默认锚点。
- 路线选择和数据源选择调用 `rules.js`，把结果写进页面上的 `role="status"`。
- 授课按钮切换 `body.is-teaching`。卡片是带 `.slide` 的同一批 `<section>`。进入时只显示当前一张，焦点移到授课工具条上的「下一页」。退出时焦点回到「进入授课」按钮。
- 方向键右、下、`PageDown`、空格：下一页。左、上、`PageUp`：上一页。`Home` / `End` 到首尾。到边界就停住。
- `Esc`：若黑屏开着，先关黑屏；再按一次退出授课。退出授课也关闭黑屏。
- `B` 切换黑屏。黑屏时方向键不翻页。黑屏层对视觉是纯黑，屏幕阅读器仍能读到「黑屏，按 B 恢复，按 Esc 回到授课」。
- `F` 或全屏按钮调用 `requestFullscreen`。API 不存在或 Promise 拒绝时，保持普通窗口授课，状态文字为「全屏不可用，已用普通窗口授课」。
- 页码格式：`第 n / total 页`，`n` 从 1 计。
- 授课时 `history.replaceState` 写入当前节的 hash，便于复制链接。打开带 hash 的地址时，阅读视图靠浏览器滚动；只有查询参数 `view=teach` 才自动进入授课并定位到该节。
- Tab 在授课工具条内循环。工具条按钮：上一页、下一页、黑屏、全屏、退出。
- 打印样式强制显示全部 `.slide`，隐藏工具条、黑屏和「仅屏幕」控件，链接在打印时追加 URL。背景改为白、文字改为黑。授课中途打印也得到完整讲义。

`teachKey(state, key)` 是纯函数，供测试。`state` 含 `active`、`index`、`count`、`black`。`active === false` 时原样返回。

## 8. 测试与验收

先写 `tests/ai-literature-search.test.mjs`，用 `node --test` 运行。测试至少覆盖：

- 路线表、五源表、`zh-core`、非法输入、预算只改提醒。
- 四题判分、未知 id、解释字符串。
- 模板含绝对日期和 `OPENALEX_API_KEY`，不含 `sk-` 形态、不含 `type="password"` 所需的真实密钥字面量。
- HTML 含全部节 id、三种标签、五个「作者演示」、第 5 节列出的全部官方 URL（含语料口径与全文下载说明）、四段解释、负例句子「昨天，我在学校给研究生上的课终于结课了。」不出现。
- `course.js` 不含 `fetch(`、`XMLHttpRequest`、`localStorage`。
- CSS 不含 `fonts.googleapis`、`@import`。
- 相对资源都存在；课程目录里没有 `cover.jpg` 和原帖图片。
- `teachKey` 的翻页、边界、黑屏、Esc 两段式、未进入授课时忽略按键。

浏览器验收（桌面约 1280×800、手机 390×844、授课 16:9）：

- 控制台无错误。
- 本地资源无 404。
- 阅读视图无横向溢出。
- 授课当前页文字不被舞台裁掉（`scrollHeight` 不大于可视高度）。
- 打印媒体下全部节可见。
- 走一遍：数据源选择、复制失败反馈（无剪贴板权限时）、答错后重试、方向键、Esc、全屏失败回退。

截图至少四张：桌面阅读首页、一张教学图或案例、授课模式、手机阅读。ZIP 与截图放在 artifacts，报告里写绝对路径。

## 9. 自审

- 无 TBD。方案 A 的双视图、配色和章节顺序都落成了可测行为。
- 配图从「授权后使用原图」收窄为「公开版只有原创 SVG」。与用户后来的版权决定一致，不再采用简报里的 16 张原图计划。
- 原文 50 分钟、6000 万 PDF、无 key 日额度只剩十分之一、JCR 分区和案例计数，都写成了「不采用」或「未核验」，与事实核对笔记一致。
- 范围停在一门静态课。在线 API、账号和旧课音频不在本课。
- 无脚本可读与授课大字使用同一批 section，没有第二份讲稿。
