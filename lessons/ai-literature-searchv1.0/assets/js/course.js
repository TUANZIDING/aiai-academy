/* 文献检索课的页面行为。规则在 rules.js。这里不联网、不保存密钥。 */
(function () {
  const rules = window.LiteratureRules;
  const body = document.body;
  const slides = () => [...document.querySelectorAll("main .slide")];
  let index = 0;

  function setStatus(id, text) {
    const node = document.getElementById(id);
    if (node) node.textContent = text;
  }

  function names(ids) {
    return ids.map((id) => rules.SOURCES[id] || id).join("、");
  }

  function indexFromHash() {
    const id = decodeURIComponent(location.hash.replace(/^#/, ""));
    const found = slides().findIndex((slide) => slide.id === id);
    return found >= 0 ? found : 0;
  }

  function render(nextIndex) {
    const all = slides();
    index = Math.max(0, Math.min(all.length - 1, nextIndex));
    all.forEach((slide, item) => slide.classList.toggle("is-current", item === index));
    const page = document.getElementById("page-no");
    if (page) page.textContent = `第 ${index + 1} / ${all.length} 页`;
    if (body.classList.contains("is-teaching") && all[index]) {
      history.replaceState(null, "", `#${all[index].id}`);
    }
    if (window.LiteratureDiagrams) window.LiteratureDiagrams.sync();
  }

  function setBlack(on) {
    const layer = document.getElementById("blackout");
    if (layer) layer.hidden = !on;
  }

  function enterTeach(start) {
    body.classList.add("is-teaching");
    setBlack(false);
    render(start == null ? indexFromHash() : start);
    const next = document.getElementById("teach-next");
    if (next) next.focus();
  }

  function exitTeach() {
    body.classList.remove("is-teaching");
    setBlack(false);
    setStatus("teach-status", "");
    const opener = document.getElementById("enter-teach");
    if (opener) opener.focus();
    if (document.fullscreenElement && document.exitFullscreen) {
      document.exitFullscreen().catch(() => {});
    }
    if (window.LiteratureDiagrams) window.LiteratureDiagrams.sync();
  }

  async function requestFullscreen() {
    const root = document.documentElement;
    if (!root.requestFullscreen) {
      setStatus("teach-status", rules.fullscreenFallback(null).message);
      return;
    }
    try {
      await root.requestFullscreen();
      setStatus("teach-status", "已进入全屏。");
    } catch (error) {
      setStatus("teach-status", rules.fullscreenFallback(error).message);
    }
  }

  function applyKey(key) {
    if (!body.classList.contains("is-teaching")) return;
    const result = rules.teachKey({
      active: true,
      index,
      count: slides().length,
      black: !document.getElementById("blackout").hidden,
    }, key);
    if (!result.actions.length) return;
    if (result.actions.includes("exit")) {
      exitTeach();
      return;
    }
    setBlack(result.state.black);
    if (result.actions.includes("go") || result.actions.includes("clear-black")) render(result.state.index);
    if (result.actions.includes("fullscreen")) requestFullscreen();
  }

  function trapTab(event) {
    if (event.key !== "Tab" || !body.classList.contains("is-teaching")) return;
    const slide = document.querySelector("main .slide.is-current");
    const extra = slide ? [...slide.querySelectorAll(".diagram, .diagram button")] : [];
    const buttons = [...document.querySelectorAll("#teach-bar button"), ...extra];
    if (!buttons.length) return;
    const first = buttons[0];
    const last = buttons[buttons.length - 1];
    const index = buttons.indexOf(document.activeElement);
    if (index === -1) {
      event.preventDefault();
      (event.shiftKey ? last : first).focus();
    } else if (event.shiftKey && index === 0) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && index === buttons.length - 1) {
      event.preventDefault();
      first.focus();
    }
  }

  document.getElementById("enter-teach").addEventListener("click", () => enterTeach(indexFromHash()));
  document.getElementById("teach-prev").addEventListener("click", () => applyKey("ArrowLeft"));
  document.getElementById("teach-next").addEventListener("click", () => applyKey("ArrowRight"));
  document.getElementById("teach-black").addEventListener("click", () => applyKey("b"));
  document.getElementById("teach-full").addEventListener("click", () => requestFullscreen());
  document.getElementById("teach-exit").addEventListener("click", () => exitTeach());
  document.getElementById("blackout").addEventListener("click", () => applyKey("b"));

  document.addEventListener("keydown", (event) => {
    trapTab(event);
    if (!body.classList.contains("is-teaching")) return;
    if (event.target && event.target.closest && event.target.closest(".diagram")) return;
    if (event.target && (event.target.closest("input, textarea"))) return;
    const watched = ["ArrowRight", "ArrowLeft", "ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", "Escape", " ", "b", "B", "f", "F"];
    if (!watched.includes(event.key)) return;
    event.preventDefault();
    applyKey(event.key);
  }, true);

  document.getElementById("route-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const want = new FormData(event.target).get("want");
    const result = rules.recommendRoute({ want });
    const out = document.getElementById("route-result");
    if (!result.ok) {
      out.textContent = "请先选择一种用法。这是本地规则，不是模型判断。";
      return;
    }
    const routeName = result.route === "connected-agent" ? "已接入论文库的 Agent" : "自己给 Agent 接 API";
    out.textContent = `规则 ${result.ruleId}：选择「${routeName}」。作者演示里对应的工具是 ${result.tool}。${result.note}`;
  });

  document.getElementById("source-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const result = rules.recommendSources({
      goal: data.get("goal"),
      lang: data.get("lang"),
      budget: data.get("budget"),
    });
    const out = document.getElementById("source-result");
    if (!result.ok) {
      out.textContent = "请把三道题都选完。选不出来就不会替你指定数据源。";
      return;
    }
    const extra = result.add.length ? `同时可以加上 ${names(result.add)}。` : "这一规则没有附加源。";
    const caution = result.cautions.join("");
    const gap = result.notEnough ? "这五个来源不够。" : "";
    out.textContent = `规则 ${result.ruleId}：主源是 ${names(result.primary)}。${extra}${gap}${caution}`;
  });

  document.querySelectorAll(".copy").forEach((button) => {
    button.addEventListener("click", async () => {
      const id = button.getAttribute("data-copy-for");
      const pre = document.getElementById(id);
      const status = document.querySelector(`[data-status-for="${id}"]`);
      const text = pre.textContent.replace(/^\n+|\n+$/g, "");
      try {
        if (!navigator.clipboard || !window.isSecureContext) throw new Error("unavailable");
        await navigator.clipboard.writeText(text);
        status.textContent = rules.COPY_OK;
      } catch (error) {
        const range = document.createRange();
        range.selectNodeContents(pre);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        status.textContent = rules.COPY_FAIL;
      }
    });
  });

  document.querySelectorAll("[data-quiz]").forEach((group) => {
    group.addEventListener("change", () => {
      const choice = group.querySelector("input:checked");
      group.classList.remove("is-right", "is-wrong");
      const graded = rules.gradeQuiz(group.dataset.quiz, choice && choice.value);
      const live = group.querySelector("[data-quiz-live]");
      if (!graded.ok) {
        live.textContent = "这道题还不能判分。";
        return;
      }
      group.classList.add(graded.correct ? "is-right" : "is-wrong");
      const details = group.querySelector("details");
      if (details) details.open = true;
      live.textContent = graded.correct ? "答对了。解释就在这一题下面。" : "还不是这一题的判断。解释就在这一题下面，可以改选再试。";
    });
  });

  const links = [...document.querySelectorAll(".toc a")];
  if ("IntersectionObserver" in window) {
    const watcher = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((link) => {
          if (link.getAttribute("href") === `#${entry.target.id}`) link.setAttribute("aria-current", "true");
          else link.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-15% 0px -65% 0px", threshold: 0.1 });
    slides().forEach((slide) => watcher.observe(slide));
  }

  if (new URLSearchParams(location.search).get("view") === "teach") enterTeach(indexFromHash());
  else render(indexFromHash());
})();
