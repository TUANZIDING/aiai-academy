/* 文献检索课的本地规则。不访问网络，不读取密钥。 */
(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.LiteratureRules = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  const SOURCES = {
    openalex: "OpenAlex",
    semanticscholar: "Semantic Scholar",
    serpapi: "SerpApi",
    pubmed: "PubMed",
    arxiv: "arXiv",
  };

  const GOALS = {
    overview: { primary: ["openalex"], add: [], ruleId: "R-overview" },
    citations: { primary: ["semanticscholar"], add: ["openalex"], ruleId: "R-citations" },
    gap: { primary: ["serpapi"], add: ["openalex"], ruleId: "R-gap" },
    biomed: { primary: ["pubmed"], add: ["openalex"], ruleId: "R-biomed" },
    preprint: { primary: ["arxiv"], add: ["openalex"], ruleId: "R-preprint" },
  };

  const QUIZ = [
    {
      id: "q-blank",
      correct: "no-blank",
      explanation:
        "只返回十几篇，说明这个工具这条检索式这次覆盖到的结果少。它不能证明该方向没有文献。开源技能常常只连了少数免费来源，或在无密钥时被限流。下一步是换数据源、核对检索式，并用你已经知道的哨兵文献检查有没有漏检。",
    },
    {
      id: "q-snippet",
      correct: "not-abstract",
      explanation:
        "Google Scholar 经 SerpApi 返回的 snippet 是结果页上的片段。SerpApi 文档把 num 限制在 1 到 20、默认 10，并在示例里使用 snippet 字段。片段不是完整摘要，检索结果也不是全文。核对日 2026-11-08。",
    },
    {
      id: "q-rights",
      correct: "no-grant",
      explanation:
        "搜到一条题录，只说明工具返回了这条记录。Google Scholar 帮助页写明：多数文章摘要可免费看，阅读全文可能需要订阅。arXiv 使用条款要求转载预印本须得到版权人许可，并建议链接到摘要页。第三方 API 不授予付费全文的访问权或转载权。",
    },
    {
      id: "q-key",
      correct: "never-html",
      explanation:
        "API key 可以消耗你的账户额度，不能写进公开 HTML、仓库、截图或聊天记录。本课模板只使用占位符 OPENALEX_API_KEY。页面不提供密钥输入框，也不把任何输入发送到服务器。",
    },
  ];

  const TEMPLATES = {
    authorSafety: `我想让你通过 OpenAlex API 帮我检索论文。
API 文档：https://developers.openalex.org
我的 API key 已经放在当前文件夹的 .env 文件里，变量名是 OPENALEX_API_KEY。
请写一个检索脚本，从环境变量读取 key。不要打开、打印或在回复中显示这个 key。
写好后，用“【你的关键词】”测试一次，返回前 20 篇论文的：
标题、作者、年份、期刊、被引次数和 DOI。`,
    authorCases: `【历史演示】下面五段是作者原提示词，保留「近 5 年」。过几年再读，「近 5 年」的边界会变。你自己的练习用教学模板，填写绝对日期。

场景一，立项依据：
我在申报一个省社科课题，题目是"人工智能赋能高校思政课实践教学的机制研究"。请按"现状、影响机制、实践路径"三个研究内容，分别检索近 5 年中英文代表性文献，用来写立项依据。

场景二，中英文实证：
帮我检索近 5 年关于"短视频使用与大学生睡眠质量"的中英文实证研究，中文和英文各列出代表性文献，优先高质量期刊。

场景三，临床进展：
查找近 5 年 SGLT2 抑制剂治疗心力衰竭的研究进展，优先随机对照试验、系统综述和指南，按"疗效、安全性、适用人群"分类整理。

场景四，经典文献：
我是刚转到公共管理方向的研究生，想了解"社区韧性"这个概念。请先给我奠基性的经典文献，再补近几年的代表性研究，帮我建立这个领域的基本脉络。

场景五，专利：
我在做钙钛矿太阳能电池封装方向的研究，想了解这项技术的专利布局。请检索近 5 年中国和全球的相关专利，按技术路线分类整理，列出主要申请人，并说明每类专利主要解决什么问题。`,
    teaching: `请检索文献，并只依据检索结果回答。无法确认的字段写“未确认”，不要编造 DOI、作者或期刊分区。

主题：【填写】
中文同义词：【填写】
英文同义词：【填写】
文献类型：【期刊论文 / 预印本 / 综述 / 指南 / 专利】
起始日期：【YYYY-MM-DD】
截止日期：【YYYY-MM-DD】
数据源：【从 OpenAlex、Semantic Scholar、SerpApi、PubMed、arXiv 里点名；中文核心另说明知网或万方】
纳入标准：【填写】
排除标准：【填写】

对每条结果输出：题名、作者、年份、来源、DOI、你用来定位证据的原句位置、开放获取链接或“未见合法全文链接”。
最后列出：检索式、检索日期、可能的漏检（时间窗之外的奠基文献、中文核心、付费全文）。`,
  };

  const COPY_OK = "已复制到剪贴板。内容只留在你的设备上。";
  const COPY_FAIL = "复制失败。文字已选中，请使用 Ctrl+C 或长按复制。密钥不会被上传。";

  function recommendRoute({ want } = {}) {
    if (want === "no") {
      return {
        ok: true,
        route: "connected-agent",
        tool: "YILA",
        ruleId: "T-agent",
        note: "作者演示：已经接入论文库的 Agent。本课未复现。",
      };
    }
    if (want === "first-api") {
      return {
        ok: true,
        route: "self-api",
        tool: "Grok Bot",
        ruleId: "T-grok",
        note: "作者演示：第一次自己接 API。界面可能已经变化。",
      };
    }
    if (want === "local") {
      return {
        ok: true,
        route: "self-api",
        tool: "Codex 或 WorkBuddy",
        ruleId: "T-local",
        note: "作者演示：本地 Agent。本课未复测。",
      };
    }
    return { ok: false, error: "unknown-want" };
  }

  function recommendSources({ goal, lang, budget } = {}) {
    const row = GOALS[goal];
    if (!row) return { ok: false, error: "unknown-goal" };
    if (lang !== "any" && lang !== "zh-core") return { ok: false, error: "unknown-lang" };
    if (budget !== "free" && budget !== "paid-ok") return { ok: false, error: "unknown-budget" };
    const names = row.primary.concat(row.add);
    const cautions = [];
    if (names.includes("serpapi")) {
      cautions.push("SerpApi 是第三方，不是 Google 官方 API。价格可能变化。核对日 2026-11-08。");
      if (budget === "free") {
        cautions.push("免费档每月 250 次成功检索、每小时 50 次。用尽后需要付费。只对成功检索计数。");
      } else {
        cautions.push("入门档标价每月 25 美元、1000 次、每小时 200 次。可能变化。未用完次数不要理解成所有余额都会清零。");
      }
    }
    if (lang === "zh-core") {
      cautions.push("这五个来源不能替代知网、万方里的中文核心和学位论文。OpenAlex 的 language 字段不能当成中文核心覆盖率。");
    }
    return {
      ok: true,
      ruleId: row.ruleId,
      primary: row.primary.slice(),
      add: row.add.slice(),
      notEnough: lang === "zh-core",
      cautions,
    };
  }

  function gradeQuiz(id, choice) {
    const item = QUIZ.find((entry) => entry.id === id);
    if (!item) return { ok: false, error: "unknown-question" };
    const known = {
      "q-blank": ["yes-blank", "no-blank"],
      "q-snippet": ["is-abstract", "not-abstract"],
      "q-rights": ["grants", "no-grant"],
      "q-key": ["ok-html", "never-html"],
    };
    if (!known[id].includes(choice)) return { ok: false, error: "unknown-choice" };
    return { ok: true, correct: choice === item.correct, explanation: item.explanation };
  }

  function teachKey(state, key) {
    const next = {
      active: state.active,
      index: state.index,
      count: state.count,
      black: state.black,
    };
    const actions = [];
    if (!next.active) return { state: next, actions };
    if (key === "Escape") {
      if (next.black) {
        next.black = false;
        actions.push("clear-black");
        return { state: next, actions };
      }
      next.active = false;
      next.black = false;
      actions.push("exit");
      return { state: next, actions };
    }
    if (key === "b" || key === "B") {
      next.black = !next.black;
      actions.push(next.black ? "black-on" : "black-off");
      return { state: next, actions };
    }
    if (next.black) return { state: next, actions };
    if (key === "ArrowRight" || key === "ArrowDown" || key === "PageDown" || key === " ") {
      next.index = Math.min(next.count - 1, next.index + 1);
      actions.push("go");
    } else if (key === "ArrowLeft" || key === "ArrowUp" || key === "PageUp") {
      next.index = Math.max(0, next.index - 1);
      actions.push("go");
    } else if (key === "Home") {
      next.index = 0;
      actions.push("go");
    } else if (key === "End") {
      next.index = Math.max(0, next.count - 1);
      actions.push("go");
    } else if (key === "f" || key === "F") {
      actions.push("fullscreen");
    }
    return { state: next, actions };
  }

  function fullscreenFallback(error) {
    return {
      mode: "window",
      message: "全屏不可用，已用普通窗口授课",
      reason: error ? String(error.message || error) : "unsupported",
    };
  }

  return {
    SOURCES,
    QUIZ,
    TEMPLATES,
    COPY_OK,
    COPY_FAIL,
    recommendRoute,
    recommendSources,
    gradeQuiz,
    teachKey,
    fullscreenFallback,
  };
});
