import { createRequire } from "node:module";
import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

const require = createRequire(import.meta.url);
const root = path.resolve(import.meta.dirname, "..");
const course = path.join(root, "lessons/ai-literature-searchv1.0");
const rulesPath = path.join(course, "assets/js/rules.js");

const SLIDES = [
  "s-open",
  "s-goals",
  "s-myth",
  "s-routes",
  "s-route-pick",
  "s-cases-map",
  "s-case-proposal",
  "s-case-empirical",
  "s-case-clinical",
  "s-case-classic",
  "s-case-patent",
  "s-matrix",
  "s-picker",
  "s-prices",
  "s-layers",
  "s-security",
  "s-verify",
  "s-templates",
  "s-quiz",
  "s-sources",
];

const OFFICIAL_URLS = [
  "https://developers.openalex.org/access/pricing/",
  "https://developers.openalex.org/access/example-costs/",
  "https://developers.openalex.org/how-to-use-the-api/rate-limits-and-authentication",
  "https://developers.openalex.org/how-to-use-the-api/pricing",
  "https://developers.openalex.org/download-all-data/content",
  "https://developers.openalex.org",
  "https://www.semanticscholar.org/product/api",
  "https://api.semanticscholar.org",
  "https://serpapi.com/pricing",
  "https://serpapi.com/google-scholar-api",
  "https://pubmed.ncbi.nlm.nih.gov/about/",
  "https://www.ncbi.nlm.nih.gov/books/NBK25497/",
  "https://info.arxiv.org/help/api/",
  "https://info.arxiv.org/help/api/tou.html",
  "https://scholar.google.com/intl/en/scholar/help.html",
  "https://x.com/DrRabbitAI/status/2117952642593017862",
];

const CASE_IDS = [
  "s-case-proposal",
  "s-case-empirical",
  "s-case-clinical",
  "s-case-classic",
  "s-case-patent",
];

function loadRules() {
  return require(rulesPath);
}

function readCourse(name) {
  return readFileSync(path.join(course, name), "utf8");
}

function squash(value) {
  return String(value).replace(/\s+/g, "");
}

test("recommendRoute follows the three local choices", () => {
  const rules = loadRules();
  assert.deepEqual(rules.recommendRoute({ want: "no" }).route, "connected-agent");
  assert.equal(rules.recommendRoute({ want: "no" }).tool, "YILA");
  assert.equal(rules.recommendRoute({ want: "first-api" }).tool, "Grok Bot");
  assert.equal(rules.recommendRoute({ want: "local" }).tool, "Codex 或 WorkBuddy");
  assert.equal(rules.recommendRoute({ want: "local" }).route, "self-api");
  assert.equal(rules.recommendRoute({ want: "cloud" }).error, "unknown-want");
  assert.equal(rules.recommendRoute({}).ok, false);
});

test("recommendSources picks one primary source per goal", () => {
  const rules = loadRules();
  const expected = {
    overview: ["openalex"],
    citations: ["semanticscholar"],
    gap: ["serpapi"],
    biomed: ["pubmed"],
    preprint: ["arxiv"],
  };
  for (const [goal, primary] of Object.entries(expected)) {
    const result = rules.recommendSources({ goal, lang: "any", budget: "free" });
    assert.deepEqual(result.primary, primary, goal);
    assert.equal(result.ok, true);
    assert.equal(result.notEnough, false);
    if (goal === "overview") assert.deepEqual(result.add, []);
    else assert.deepEqual(result.add, ["openalex"]);
  }
});

test("Chinese core sources are marked insufficient without dropping the supplement", () => {
  const rules = loadRules();
  const result = rules.recommendSources({ goal: "overview", lang: "zh-core", budget: "free" });
  assert.equal(result.notEnough, true);
  assert.deepEqual(result.primary, ["openalex"]);
  assert.ok(result.cautions.some((line) => line.includes("知网")));
});

test("budget changes SerpApi caution and not the chosen source", () => {
  const rules = loadRules();
  const free = rules.recommendSources({ goal: "gap", lang: "any", budget: "free" });
  const paid = rules.recommendSources({ goal: "gap", lang: "any", budget: "paid-ok" });
  assert.deepEqual(free.primary, ["serpapi"]);
  assert.deepEqual(paid.primary, ["serpapi"]);
  assert.ok(free.cautions.some((line) => line.includes("250")));
  assert.ok(paid.cautions.some((line) => line.includes("25")));
  assert.ok(free.cautions.every((line) => line.includes("可能变化") || !line.includes("SerpApi") || line.includes("第三方") || line.includes("250")));
  assert.ok(free.cautions.join("").includes("第三方"));
  assert.ok(paid.cautions.join("").includes("可能变化"));
});

test("unknown source inputs do not invent a database", () => {
  const rules = loadRules();
  for (const input of [
    { goal: "books", lang: "any", budget: "free" },
    { goal: "overview", lang: "ja", budget: "free" },
    { goal: "overview", lang: "any", budget: "invoice" },
  ]) {
    const result = rules.recommendSources(input);
    assert.equal(result.ok, false);
    assert.equal(Object.hasOwn(result, "primary"), false);
  }
});

test("quiz grades only known choices and keeps explanations", () => {
  const rules = loadRules();
  assert.equal(rules.QUIZ.length, 4);
  const pairs = [
    ["q-blank", "no-blank", "yes-blank"],
    ["q-snippet", "not-abstract", "is-abstract"],
    ["q-rights", "no-grant", "grants"],
    ["q-key", "never-html", "ok-html"],
  ];
  for (const [id, right, wrong] of pairs) {
    const good = rules.gradeQuiz(id, right);
    const bad = rules.gradeQuiz(id, wrong);
    assert.equal(good.correct, true);
    assert.equal(bad.correct, false);
    assert.equal(good.explanation, bad.explanation);
    assert.equal(good.explanation, rules.QUIZ.find((item) => item.id === id).explanation);
    assert.ok(good.explanation.length > 40);
  }
  assert.equal(rules.gradeQuiz("q-missing", "no-blank").error, "unknown-question");
  assert.equal(rules.gradeQuiz("q-blank", "maybe").error, "unknown-choice");
});

test("templates keep placeholders and absolute dates", () => {
  const rules = loadRules();
  assert.match(rules.TEMPLATES.authorSafety, /OPENALEX_API_KEY/);
  assert.match(rules.TEMPLATES.authorSafety, /不要打开、打印/);
  assert.match(rules.TEMPLATES.teaching, /起始日期：【YYYY-MM-DD】/);
  assert.match(rules.TEMPLATES.teaching, /未确认/);
  for (const phrase of [
    "人工智能赋能高校思政课实践教学的机制研究",
    "短视频使用与大学生睡眠质量",
    "SGLT2 抑制剂治疗心力衰竭",
    "社区韧性",
    "钙钛矿太阳能电池封装",
    "近 5 年",
  ]) {
    assert.ok(rules.TEMPLATES.authorCases.includes(phrase), phrase);
  }
  const joined = Object.values(rules.TEMPLATES).join("\n");
  assert.equal(/sk-[A-Za-z0-9]{8,}/.test(joined), false);
  assert.equal(joined.includes("sk-"), false);
});

test("teachKey pages, blacks out, and ignores keys before teaching", () => {
  const rules = loadRules();
  const idle = rules.teachKey({ active: false, index: 2, count: 5, black: false }, "ArrowRight");
  assert.equal(idle.state.index, 2);
  assert.deepEqual(idle.actions, []);

  const next = rules.teachKey({ active: true, index: 4, count: 5, black: false }, "ArrowRight");
  assert.equal(next.state.index, 4);
  const back = rules.teachKey({ active: true, index: 0, count: 5, black: false }, "ArrowLeft");
  assert.equal(back.state.index, 0);

  const held = rules.teachKey({ active: true, index: 1, count: 5, black: true }, "ArrowRight");
  assert.equal(held.state.index, 1);
  assert.deepEqual(held.actions, []);

  const clear = rules.teachKey({ active: true, index: 1, count: 5, black: true }, "Escape");
  assert.equal(clear.state.black, false);
  assert.equal(clear.state.active, true);
  assert.deepEqual(clear.actions, ["clear-black"]);

  const leave = rules.teachKey(clear.state, "Escape");
  assert.equal(leave.state.active, false);
  assert.deepEqual(leave.actions, ["exit"]);

  const black = rules.teachKey({ active: true, index: 1, count: 5, black: false }, "b");
  assert.equal(black.state.black, true);
  const full = rules.teachKey({ active: true, index: 1, count: 5, black: false }, "f");
  assert.equal(full.state.index, 1);
  assert.deepEqual(full.actions, ["fullscreen"]);
});

test("fullscreen fallback and copy messages are the public strings", () => {
  const rules = loadRules();
  assert.equal(rules.fullscreenFallback(new Error("denied")).message, "全屏不可用，已用普通窗口授课");
  assert.equal(rules.fullscreenFallback().message, "全屏不可用，已用普通窗口授课");
  assert.equal(rules.COPY_OK, "已复制到剪贴板。内容只留在你的设备上。");
  assert.equal(rules.COPY_FAIL, "复制失败。文字已选中，请使用 Ctrl+C 或长按复制。密钥不会被上传。");
});

test("html contains the readable lesson without remote dependencies", () => {
  const rules = loadRules();
  const html = readCourse("index.html");
  for (const id of SLIDES) assert.match(html, new RegExp(`id="${id}"`));
  for (const id of CASE_IDS) {
    const chunk = html.slice(html.indexOf(`id="${id}"`), html.indexOf(`id="${id}"`) + 2500);
    assert.ok(chunk.includes("作者演示"), id);
    assert.ok(chunk.includes("未独立复现"), id);
  }
  for (const label of ["原文观点", "官方核对", "教学补充", "教学整理", "2026-11-08"]) {
    assert.ok(html.includes(label), label);
  }
  for (const url of OFFICIAL_URLS) assert.ok(html.includes(url), url);
  for (const item of rules.QUIZ) assert.ok(squash(html).includes(squash(item.explanation)), item.id);
  assert.ok(squash(html).includes(squash(rules.COPY_OK)));
  assert.ok(squash(html).includes(squash(rules.COPY_FAIL)));
  for (const template of Object.values(rules.TEMPLATES)) {
    assert.ok(squash(html).includes(squash(template)));
  }
  assert.equal(html.includes("昨天，我在学校给研究生上的课终于结课了。"), false);
  assert.equal(html.includes("fonts.googleapis"), false);
  assert.equal(html.includes("googletagmanager"), false);
  assert.equal(html.includes('type="password"'), false);
  assert.equal(html.includes("sk-"), false);
  assert.match(html, /不是注册后干等/);
  assert.match(html, /每 5 分钟 0\.10 美元/);
  assert.match(html, /不是诊疗建议/);
  assert.match(html, /FTO/);
  assert.match(html, /值得复核/);
  assert.match(html, /10\.0000\/example\.not\.real/);
  const scripts = [...html.matchAll(/<script[^>]+src="([^"]+)"/g)].map((match) => match[1]);
  assert.deepEqual(scripts, ["assets/js/rules.js", "assets/js/course.js"]);
});

test("course script does not collect keys or call the network", () => {
  const js = readCourse("assets/js/course.js");
  for (const banned of ["fetch(", "XMLHttpRequest", "localStorage", "sessionStorage", "WebSocket"]) {
    assert.equal(js.includes(banned), false, banned);
  }
});

test("stylesheet stays local", () => {
  const css = readCourse("assets/css/course.css");
  assert.equal(css.includes("fonts.googleapis"), false);
  assert.equal(/@import/i.test(css), false);
  assert.equal(/url\(\s*["']?https?:/i.test(css), false);
});

test("local assets exist and original screenshots are absent", () => {
  const html = readCourse("index.html");
  const refs = [...html.matchAll(/(?:src|href)="([^"]+)"/g)].map((match) => match[1]);
  for (const ref of refs) {
    if (/^(https?:|mailto:|#|data:)/.test(ref)) continue;
    const file = path.resolve(course, ref.split("#")[0].split("?")[0]);
    assert.ok(existsSync(file), ref);
  }
  assert.equal(existsSync(path.join(course, "cover.jpg")), false);
  const images = readdirSync(path.join(course, "assets/images"));
  for (const name of images) {
    assert.equal(path.extname(name).toLowerCase() === ".jpg", false, name);
    assert.equal(path.extname(name).toLowerCase() === ".png", false, name);
  }
  for (const name of [
    "fig-hero.svg",
    "fig-routes.svg",
    "fig-matrix.svg",
    "fig-layers.svg",
    "fig-verify.svg",
    "fig-case-card.svg",
  ]) {
    const svg = readFileSync(path.join(course, "assets/images", name), "utf8");
    assert.ok(svg.includes("教学"), name);
  }
  const thumb = readFileSync(path.join(course, "assets/images/thumb.svg"), "utf8");
  assert.ok(thumb.includes("文献检索课"));
  const readme = readCourse("README.md");
  assert.match(readme, /2026-11-08/);
  assert.equal(statSync(path.join(course, "README.md")).isFile(), true);
});

test("lesson catalog points at this course", () => {
  const catalog = readFileSync(path.join(root, "assets/lessons-catalogv1.0.js"), "utf8");
  assert.ok(catalog.includes("lessons/ai-literature-searchv1.0/index.html"));
  assert.ok(catalog.includes("lessons/ai-literature-searchv1.0/assets/images/thumb.svg"));
  const home = readFileSync(path.join(root, "index.html"), "utf8");
  assert.match(home, /lessons-catalogv1\.0\.js\?v=1\.8/);
  assert.match(home, /data-n="lessons">17</);
  assert.match(home, /lessons\/ai-literature-searchv1\.0\/index\.html/);
});
