# AI 文献检索课 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 发布前可独立打开的中文 AI 文献检索静态课：一套 HTML 同时支持暖白自学和 16:9 深蓝授课，并接入课件馆目录。

**Architecture:** `rules.js` 持有选型、判分、模板、授课按键和全屏失败文案，不碰 DOM。`index.html` 放全部可读内容。`course.js` 只做高亮、调用规则、复制、自测和授课视图。测试用 Node 内置测试运行器读规则和静态文件。无构建步骤。

**Tech Stack:** HTML、CSS、无框架 JavaScript、Node.js `node:test`。浏览器验收用本机 Playwright Chromium，不写入仓库依赖。

## Global Constraints

- 规格：`docs/superpowers/specs/2026-11-08-ai-literature-course-design.md`。事实口径只来自该规格与 2026-11-08（Asia/Shanghai）核对结果。
- 公开课不收录原文全文、原帖 16 图、课堂照片。图只使用本课原创 SVG。
- 不合并、不部署。不修改 LoopGraph 课件文件，不引入其他未合并 PR 的代码。
- 无远程字体、无统计脚本、无网络请求、无密钥输入、无 `localStorage`。
- 资源路径相对 `lessons/ai-literature-searchv1.0/`。
- 收费数字旁注明可能变化，并带核对日。
- 案例篇数、样本量、JCR 分区、论文年份、专利路线数和申请人地域不写成独立结论。

本课的 HTML、CSS 和两个脚本是同一交付物，任务之间共享 DOM id。执行时在同一会话按顺序做，不拆给互相看不见页面的并行实现。用户已要求写完计划后直接实现，不再询问执行方式。

---

### Task 1: 失败测试

**Files:**
- Create: `tests/ai-literature-search.test.mjs`
- Test: `node --test tests/ai-literature-search.test.mjs`

**Interfaces:**
- Consumes: 尚不存在的 `lessons/ai-literature-searchv1.0/assets/js/rules.js` 导出
- Produces: 后续任务必须满足的断言

- [ ] **Step 1: 写入测试**

测试用 `createRequire` 加载 `rules.js`。覆盖规格第 5.4、5.8、5.9、7.2、8 节：

- `recommendRoute` 三个合法 `want` 与 `unknown-want`
- `recommendSources` 五个 `goal` 的主源与附加源
- `lang: "zh-core"` 使 `notEnough === true` 且提醒里有「知网」
- `budget: "free"` 与 `paid-ok` 在 `goal: "gap"` 下主源仍是 `serpapi`，提醒不同
- 非法 `goal` / `lang` / `budget` 返回 `error`，且没有 `primary`
- `gradeQuiz` 四题答对答错、未知题目、未知选项；解释字符串与 `QUIZ` 一致
- `TEMPLATES.authorSafety` 含 `OPENALEX_API_KEY` 与「不要打开、打印」
- `TEMPLATES.teaching` 含 `起始日期：【YYYY-MM-DD】` 与「未确认」
- `TEMPLATES.authorCases` 含五个主题短语和「近 5 年」
- 三个模板拼接后不匹配 `/sk-[A-Za-z0-9]{8,}/`
- `teachKey`：未激活忽略；右键到末页停住；黑屏时右键不翻页；黑屏时 Esc 只 `clear-black`；再次 Esc 为 `exit`；`b` 切换；`f` 产生 `fullscreen` 且不改 index
- `fullscreenFallback(new Error("denied")).message` 等于「全屏不可用，已用普通窗口授课」
- `COPY_OK` 与 `COPY_FAIL` 等于规格第 5.8 节两句
- 读 `index.html`：每个 slide id 存在；五个案例节都含「作者演示」和「未独立复现」；含「原文观点」「官方核对」「教学补充」「教学整理」「2026-11-08」
- HTML 含规格第 5 节每一个官方 URL、四段测验解释、两段复制文案、三段模板
- HTML 不含「昨天，我在学校给研究生上的课终于结课了。」
- HTML 不含 `fonts.googleapis`、`googletagmanager`、`type="password"`、`sk-`
- `course.js` 不含 `fetch(`、`XMLHttpRequest`、`localStorage`、`sessionStorage`、`WebSocket`
- `course.css` 不含 `fonts.googleapis` 与 `@import`
- `index.html` 引用的每个本地 `src` 和 `href`（不以 `http`、`mailto`、`#` 开头）都指向存在的文件
- 课程目录不存在 `cover.jpg`
- 七个 SVG 都存在，且每个 SVG 含「教学」或缩略图含「文献检索课」
- `assets/lessons-catalogv1.0.js` 含 `lessons/ai-literature-searchv1.0/index.html`

- [ ] **Step 2: 运行测试并确认失败**

Run: `node --test tests/ai-literature-search.test.mjs`

Expected: FAIL，原因是找不到 `rules.js` 或页面文件，而不是断言写错。

### Task 2: 规则模块

**Files:**
- Create: `lessons/ai-literature-searchv1.0/assets/js/rules.js`
- Test: `node --test tests/ai-literature-search.test.mjs`

**Interfaces:**
- Consumes: 无
- Produces: `LiteratureRules` 浏览器全局，以及 `module.exports`：`SOURCES`、`QUIZ`、`TEMPLATES`、`recommendRoute`、`recommendSources`、`gradeQuiz`、`teachKey`、`fullscreenFallback`、`COPY_OK`、`COPY_FAIL`

- [ ] **Step 3: 写 `rules.js`**

用 UMD 包装。`recommendRoute` / `recommendSources` / `gradeQuiz` / `teachKey` / `fullscreenFallback` 的分支与规格第 5.4、5.9、7.2 节的表一致。模板使用规格第 5.8 节的安全提示词、五个历史场景提示词和教学改写。测验解释使用规格第 5.9 节表下的四段文字。非法输入只返回 `{ ok: false, error }`。

- [ ] **Step 4: 再跑测试**

Expected: 规则断言通过。HTML、CSS、目录断言仍失败。

- [ ] **Step 5: Commit**

```bash
git add tests/ai-literature-search.test.mjs lessons/ai-literature-searchv1.0/assets/js/rules.js docs/superpowers
git commit -m "Add literature-course rules and failing page contract"
```

### Task 3: 页面、样式、图和授课脚本

**Files:**
- Create: `lessons/ai-literature-searchv1.0/index.html`
- Create: `lessons/ai-literature-searchv1.0/assets/css/course.css`
- Create: `lessons/ai-literature-searchv1.0/assets/js/course.js`
- Create: `lessons/ai-literature-searchv1.0/assets/images/fig-hero.svg`
- Create: `lessons/ai-literature-searchv1.0/assets/images/fig-routes.svg`
- Create: `lessons/ai-literature-searchv1.0/assets/images/fig-matrix.svg`
- Create: `lessons/ai-literature-searchv1.0/assets/images/fig-layers.svg`
- Create: `lessons/ai-literature-searchv1.0/assets/images/fig-verify.svg`
- Create: `lessons/ai-literature-searchv1.0/assets/images/fig-case-card.svg`
- Create: `lessons/ai-literature-searchv1.0/assets/images/thumb.svg`
- Create: `lessons/ai-literature-searchv1.0/README.md`
- Modify: `assets/lessons-catalogv1.0.js`
- Modify: `index.html` 的课件脚本版本与课件数字兜底，并在 `#lessonCatalog` 加 noscript 链接

**Interfaces:**
- Consumes: `LiteratureRules`
- Produces: 规格第 3、6、7 节的 DOM

- [ ] **Step 6: 写可无脚本阅读的 `index.html`**

结构：

- 跳到正文的链接、返回 `../../index.html#lessons` 的链接。
- `<nav>` 锚到每个 `.slide`。窄屏时这个 nav 放在 `<details>` 里。
- 每个内容节是 `<section class="slide" id="...">`，id 用规格第 5.1 节。
- 正文按规格第 5 节撰写，三种标签用 `<span class="tag">`。
- 七张图使用相对 `src`，`alt` 写清图意，`<figcaption>` 写解释和来源。
- 路线表和五源规则表是真实 `<table>`，不是只在脚本里生成。
- 路线选择是 `<form id="route-form">`，三个 radio，`name="want"`，values `no` / `first-api` / `local`，结果区 `#route-result`。
- 数据源选择是 `<form id="source-form">`，`goal`、`lang`、`budget` 三组 radio，结果区 `#source-result`。
- 模板三个 `<pre id="tpl-author-safety">`、`tpl-author-cases`、`tpl-teaching`，文字与 `TEMPLATES` 完全一致。每个旁边有 `button.copy`，`data-copy-for` 指向 pre 的 id。状态节点 `role="status"`。
- 四题各是 `<fieldset data-quiz="q-...">`，radio 的 value 用规格表。解释放在 `<details>` 中，文字与 `QUIZ[].explanation` 一致。
- 授课工具条 `#teach-bar`：上一页、下一页、黑屏、全屏、退出、`#page-no`、`#teach-status`。进入按钮 `#enter-teach`。
- 黑屏 `#blackout` 默认 `hidden`。
- 页脚说明本页不收集密钥、不发起检索。

- [ ] **Step 7: 写 `course.css`**

阅读底 `#f6f1e7`，墨色 `#1c1915`，海军蓝 `#0e2744`，青绿 `#0f766e`，琥珀提示。系统字体栈，栏宽 `46rem`，正文行高 1.8。`body.is-teaching` 把非当前 `.slide` 设为 `display: none`，当前页放进 16:9 舞台，底部留出工具条，舞台 `overflow: auto` 只作防裁字兜底。打印时全部 slide 可见、工具条隐藏、颜色改为黑字白底、外链追加 href。窄于 880px 时目录不再侧栏固定。不使用远程字体。

- [ ] **Step 8: 画七张 SVG**

每张 viewBox 足够大，文字用系统无衬线栈。英雄图、双路线、五源、三层、六步核验、假想结果卡片都要能单独看懂。卡片上的 DOI 只能是 `10.0000/example.not.real`。缩略图含「文献检索课」和命题。不要画成某种数据库的仿冒截图。

- [ ] **Step 9: 写 `course.js`**

脚本顺序：`rules.js` 然后 `course.js`。

- 两个表单 `preventDefault`，调用规则，把主源、附加源、提醒或错误写进 status。不发请求。
- 复制：优先 `navigator.clipboard.writeText`。失败则选中 pre，并写入 `COPY_FAIL`。
- 自测：`change` 时 `gradeQuiz`，给 fieldset 加 `is-right` 或 `is-wrong`，打开对应 `details`。再次选择先去掉这两个 class。
- 授课：`enter` 加 `is-teaching`，焦点放到 `#teach-next`。按键交给 `teachKey`。全屏失败调用 `fullscreenFallback` 并显示其 `message`。退出时移除 `is-teaching`、关掉黑屏、焦点回到 `#enter-teach`。页码 `第 n / total 页`。授课中 `replaceState` 更新 hash。`location.search` 含 `view=teach` 时在 DOMContentLoaded 进入授课。
- Tab 循环只在 `#teach-bar` 的可见按钮之间，且仅在 `is-teaching` 时。
- Intersection Observer 给目录链接设置 `aria-current="true"`。

- [ ] **Step 10: 接入课件馆**

在 `ITEMS` 数组第一条插入：

```javascript
{ t: 'sci', kind: '科研方法 · 图文 / 授课', title: '搜不到，不等于不存在：AI 文献检索课', d: '图文自学和 16:9 授课共用一份内容：核心误区、双路线、五个作者演示案例、五数据源、题录摘要全文、密钥与核验。原创教学图。数字核对至 2026-11-08。', date: '2026-11-08', img: 'lessons/ai-literature-searchv1.0/assets/images/thumb.svg', href: 'lessons/ai-literature-searchv1.0/index.html', go: '进入课件' },
```

`index.html` 里课件脚本改为 `assets/lessons-catalogv1.0.js?v=1.8`。`data-n="lessons"` 的兜底数字改为 17。`#lessonCatalog` 内加：

```html
<noscript><p><a href="lessons/ai-literature-searchv1.0/index.html">AI 文献检索课：搜不到，不等于不存在</a></p></noscript>
```

- [ ] **Step 11: README**

说明如何用 `python3 -m http.server` 打开、`file://` 下复制可能失败、ZIP 与页面都不含原文全文和原图、事实核对日、不要填入真实 key。

- [ ] **Step 12: 测试通过**

Run: `node --test tests/ai-literature-search.test.mjs`

Expected: PASS，全部断言通过。

- [ ] **Step 13: Commit**

```bash
git add lessons/ai-literature-searchv1.0 assets/lessons-catalogv1.0.js index.html tests/ai-literature-search.test.mjs
git commit -m "Add the AI literature search lesson and catalog entry"
```

### Task 4: 浏览器验收与 ZIP

**Files:**
- Create outside git: `/opt/cursor/artifacts/ai-literature-search-course.zip`
- Create screenshots under `/opt/cursor/artifacts/`

- [ ] **Step 14: 用 Playwright 打开本地静态服务**

检查桌面阅读、教学图、案例、授课、390px 手机、打印媒体。记录控制台错误、404、横向溢出和授课页是否裁字。有问题先改再测。复制按钮在无权限时必须出现失败文案。数据源选择必须出现 OpenAlex 或与所选 goal 对应的主源。自测选错后再选对，样式要换掉。授课方向键翻页、Esc 退出、全屏 API 被拒绝时仍留在普通窗口并出现回退文案。

- [ ] **Step 15: 打包**

ZIP 根目录就是课程文件：`index.html`、`README.md`、`assets/**`。不含 `docs/`、`tests/`、原图。

- [ ] **Step 16: Commit 修复并推送**

只在验收修复后追加 commit。推送 `cursor/ai-literature-course-a27e`。开 PR，不合并。

## 自审

对照规格第 5–8 节：误区、双路线、五案例、五源、三层、安全、核验、模板、四题、授课按键、无脚本、打印、目录、ZIP 和测试都有对应任务。计划里没有 TBD。`recommendRoute` 的 `want` 值、`recommendSources` 的枚举、`teachKey` 的 action 名、复制文案在 Task 1 与 Task 2 中一致。HTML 不另写一套讲稿，授课视图复用 `.slide`。

未把在线检索、账号、语音放进任何任务。原图不进入 Task 3 的文件清单。

## 增补：Three.js 教学图与单文件（已批准，不再询问）

在 `cursor/ai-literature-course-a27e` 上继续。不合并、不部署、不改 PR2。

- [ ] 规格第 10 节已写入。立体图只表达路线分支、数据源分工、三层信息和核验台阶。
- [ ] `assets/vendor/three.r170.js` 是 Three.js r170 的真实打包，文件头保留 MIT 与版本。
- [ ] `assets/js/diagrams.js` 创建唯一 `WebGLRenderer`，像素比不超过 1.5，离屏与非当前授课页停止循环，上下文丢失时回到 SVG。
- [ ] 四张图的 HTML 保留原 SVG 作为降级，并加上说明与按钮。授课舞台用网格把画面铺开。
- [ ] `build-standalone.mjs` 生成内嵌全部资源的单文件。测试检查其中没有外链脚本、样式、图片，且含 `WebGLRenderer` 与课文。
- [ ] 用浏览器打开 `file://` 且上下文离线：确认有像素输出、降级图、按钮交互、桌面/手机/授课不裁切、打印可见静态图、控制台无未处理错误、没有 http 请求。
- [ ] 原有 `node --test` 与新增测试都通过。单文件和次要 ZIP 放到 `/opt/cursor/artifacts/`。

自审：正文、模板、测验和来源句子不删。五源图不编码收录数量。单文件与多文件课用同一套 DOM 标记。授课方向键在图内优先切换图解，焦点离开图后仍翻页。
