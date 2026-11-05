/* Loop 与 Graph 互动讲解 v1.0
   中文旁白逐句来自课件台本，不改写。英文只作字幕。
   本机朗读使用浏览器 speechSynthesis 的中文语音，不指定、不克隆任何人声。 */
(() => {
const CHAPTERS = [
  {
    "id": "open",
    "title": "只批准最后一档",
    "seconds": 110,
    "lines": [
      {
        "zh": "你的 AI 智能体已经能连干几个小时，可你还是盯着它的每一步。",
        "beat": "in"
      },
      {
        "zh": "这节课讲清楚：怎么从盯每一步，变成只批准最后一档。",
        "beat": "title"
      },
      {
        "zh": "两个关键词：Loop，循环；Graph，图。",
        "beat": "words"
      },
      {
        "zh": "素材是内容创作者 Hoodie 2026 年 11 月 4 日发在 X 上的一篇观点文章。",
        "beat": "src"
      },
      {
        "zh": "按 S 键切换字幕；按 P，可以改成你自己来讲。",
        "beat": "keys"
      },
      {
        "zh": "文章从一个真实案例讲起：Bun 从 Zig 语言移植到 Rust。",
        "beat": "bun"
      },
      {
        "zh": "Anthropic 5 月 28 日的发布文写：约 75 万行 Rust，11 天从第一次提交到合并。",
        "beat": "a"
      },
      {
        "zh": "传得最多的却是另一个数：99.8%，原有测试还能通过的比例。",
        "beat": "pct"
      },
      {
        "zh": "Bun 官方 7 月复盘的口径不同：原 Zig 代码 535,496 行，5 月 3 日到 14 日。",
        "beat": "b"
      },
      {
        "zh": "复盘也承认，合并后发现过 19 个回归问题，都已修好。所以我们只说「约」。",
        "beat": "reg"
      },
      {
        "zh": "为什么几千次代理运行能被信任？因为每一次的终点，都有个能说「不」的检查。",
        "beat": "why"
      },
      {
        "zh": "而且活被切成了互不等待的小块。前者叫 loop，后者叫 graph。",
        "beat": "two"
      },
      {
        "zh": "这节课用球场打比方：loop 像一档进攻后的即时回看与纠错。",
        "beat": "loop"
      },
      {
        "zh": "graph 像整场战术板：谁跑位、谁掩护、何时同时推进。",
        "beat": "graph"
      },
      {
        "zh": "闸门像达阵前的挑战旗：不可逆的那一档，必须由人举牌签字。",
        "beat": "gate"
      }
    ],
    "visual": "三层战术板亮起；Bun 数字卡对照；球场主比喻落位",
    "interaction": "Enter 自动讲解 / P 自讲；S 字幕"
  },
  {
    "id": "01",
    "title": "少一层，就多一次你下场",
    "seconds": 55,
    "lines": [
      {
        "zh": "先看三层：harness、loop、graph。",
        "beat": "in"
      },
      {
        "zh": "harness 是场地规则和球权——管它能碰什么。",
        "beat": "h"
      },
      {
        "zh": "loop 管这一档进攻做对了没有。",
        "beat": "l"
      },
      {
        "zh": "graph 管有哪些位置、按什么顺序、谁来举牌签字。",
        "beat": "g"
      },
      {
        "zh": "少一层，就多一份你亲自下场。",
        "beat": "cost"
      },
      {
        "zh": "没有 harness，你得一直点允许；没有 loop，你要读每一份输出；没有 graph，你要批准每一步。",
        "beat": "nolg"
      },
      {
        "zh": "作者原话是：loop 让一块工作在没有你的情况下也能做对；graph 决定有哪些块、什么顺序、在哪里由人签字。",
        "beat": "quote"
      },
      {
        "zh": "多数人只做了第一个，跳过了第二个，所以只能坐着批准每一步。",
        "beat": "most"
      }
    ],
    "visual": "Harness / Loop / Graph 三格战术板；缺层高亮代价",
    "interaction": "点缺哪一层，看你要亲自下场做什么"
  },
  {
    "id": "02",
    "title": "回看要能吹停",
    "seconds": 95,
    "lines": [
      {
        "zh": "常见做法：让第二个模型去读第一个模型的输出。",
        "beat": "in"
      },
      {
        "zh": "作者说，这像自己批改作业，再叫个朋友看看。感觉像审查，其实抓不到多少错。",
        "beat": "friend"
      },
      {
        "zh": "真正的检查，是程序能判它失败的检查。",
        "beat": "real"
      },
      {
        "zh": "就像回看要能吹停：码数对不上、越位成立，这一档就不能往下走。",
        "beat": "whistle"
      },
      {
        "zh": "Bun 的测试集早在代理动手之前就有了，所以没人需要读每一份改动。",
        "beat": "bun"
      },
      {
        "zh": "作者把证据分成四级，从强到弱。",
        "beat": "ev"
      },
      {
        "zh": "最强 strong：测试返回 0，输出符合格式，改动没超出计划。",
        "beat": "strong"
      },
      {
        "zh": "中等 medium：引用的来源真的支持结论，另一条独立路径得到同一个答案。",
        "beat": "medium"
      },
      {
        "zh": "弱 weak：评审代理说通过。噪音 noise：「看着不错」、模型说很有把握、没有报错。",
        "beat": "weak"
      },
      {
        "zh": "现在轮到你：把每张证据卡拖到它该去的等级。",
        "beat": "try"
      },
      {
        "zh": "最后一条最扎心：没有报错。",
        "beat": "silence"
      },
      {
        "zh": "空的错误日志，只说明没人报告，不说明没出错。",
        "beat": "empty"
      },
      {
        "zh": "把沉默当成功的 loop，会把同一个错重复到预算用完，日志还一行比一行干净。",
        "beat": "loop"
      },
      {
        "zh": "所以，先写检查，再写任务。",
        "beat": "rule"
      }
    ],
    "visual": "裁判吹停回看；证据四级卡 strong/medium/weak/noise",
    "interaction": "拖证据卡到强 / 中 / 弱 / 噪音四档"
  },
  {
    "id": "03",
    "title": "两轮没有新码数就收工",
    "seconds": 70,
    "lines": [
      {
        "zh": "「一直做到满意为止」没有终点，代理很乐意再打磨一小时。",
        "beat": "in"
      },
      {
        "zh": "作者的办法是数东西：每一轮有几个新发现，去掉以前见过的。",
        "beat": "count"
      },
      {
        "zh": "连续两轮没有新发现，就停。我们来跑一遍。",
        "beat": "run"
      },
      {
        "zh": "关键在 seen 这个集合：被否掉的发现也要记进去。",
        "beat": "seen"
      },
      {
        "zh": "现在打开「忘掉已拒绝项」：同样的死胡同每轮都被重新发现，停不下来。",
        "beat": "forget"
      },
      {
        "zh": "最后只能被轮数上限硬切断，而每一轮你都在为旧错付钱。",
        "beat": "pay"
      },
      {
        "zh": "每个循环都需要五样东西——五件套。",
        "beat": "five"
      },
      {
        "zh": "一个说「完成」的测试，一个轮数上限，一份预算。",
        "beat": "a"
      },
      {
        "zh": "对以前尝试的记忆，还有卡住时会被叫醒的那个人。",
        "beat": "b"
      },
      {
        "zh": "就像场边记分板：有码数进度，有超时闹钟，闹钟响了有人上场。",
        "beat": "board"
      }
    ],
    "visual": "发现计数器 + seen 集合；五件套图标",
    "interaction": "开关：忘掉已拒绝项，看停不下来"
  },
  {
    "id": "04",
    "title": "单次进攻再漂亮，也赢不了整场",
    "seconds": 28,
    "lines": [
      {
        "zh": "可是 loop 只能把一档进攻做好。",
        "beat": "in"
      },
      {
        "zh": "它没法告诉你：这一档根本不该存在；五步里有三步本可以同时推进。",
        "beat": "cant"
      },
      {
        "zh": "于是每一步都通过了，整趟跑下来还是又慢又错。",
        "beat": "green"
      },
      {
        "zh": "问题不在步骤里面，而在步骤之间。这是 graph 的活。",
        "beat": "between"
      }
    ],
    "visual": "每步绿灯，整场仍慢；镜头拉到步骤之间",
    "interaction": "无（短章，自动推进）"
  },
  {
    "id": "05",
    "title": "说不出传什么球，就删这条边",
    "seconds": 100,
    "lines": [
      {
        "zh": "节点：一件事、一个输入、一个输出。边：这个节点的输出，是那个节点的输入。",
        "beat": "in"
      },
      {
        "zh": "多数流水线画成一条直线，因为人就是这么写说明的：查资料、看仓库、拉价格、写。",
        "beat": "line"
      },
      {
        "zh": "可拉价格那一步根本不读仓库。顺序来自句子，不是来自工作。",
        "beat": "habit"
      },
      {
        "zh": "测试每一条箭头：说出上面传的是哪个变量。说不出来，就删掉。",
        "beat": "test"
      },
      {
        "zh": "来试试。这是作者的示例：四步按句子顺序串起来，一共 31 分钟。",
        "beat": "demo"
      },
      {
        "zh": "点「资料到仓库」这条箭头：上面没有变量，删掉。",
        "beat": "cut1"
      },
      {
        "zh": "再删「仓库到价格」：三件事同时开工，只剩 17 分钟。",
        "beat": "cut2"
      },
      {
        "zh": "没多花一个 token，只是少了没必要的等待。",
        "beat": "save"
      },
      {
        "zh": "就像球场上：能同时推进的码数别傻等——掩护、拉开、传球本可以并行。",
        "beat": "field"
      },
      {
        "zh": "注意：31 到 17 分钟是作者举例，用来说明关键路径，不是实测成绩。",
        "beat": "caveat"
      },
      {
        "zh": "只有下一步真的需要全集的时候才汇合：比如跨来源去重，或者给所有候选排名。",
        "beat": "join"
      },
      {
        "zh": "这张是作者的原图：同样四步，墙钟时间少了将近一半。",
        "beat": "fig"
      }
    ],
    "visual": "四步串行 31 分钟 → 剪边并行 17 分钟；关键路径高亮",
    "interaction": "点箭头删除；墙钟时间即时重算"
  },
  {
    "id": "06",
    "title": "四行写清一个位置",
    "seconds": 70,
    "lines": [
      {
        "zh": "一个节点如果没法用四行说清楚，你就没法测试它，也没法替换它。",
        "beat": "in"
      },
      {
        "zh": "看作者的例子：节点叫 source researcher，找来源的研究员。",
        "beat": "name"
      },
      {
        "zh": "任务：每个论点找一个一手来源。输入：主题和来源类型。",
        "beat": "io"
      },
      {
        "zh": "输出：论点、链接、原句。失败时报：找不到一手来源。",
        "beat": "fail"
      },
      {
        "zh": "合同固定了，换模型、换提示词、换工具，下游都不会坏。",
        "beat": "swap"
      },
      {
        "zh": "再问每个节点一句：它要判断、决定、评估或总结吗？",
        "beat": "ask"
      },
      {
        "zh": "要，就用模型：抽取用小模型，综合用强模型。",
        "beat": "model"
      },
      {
        "zh": "不要，就写代码：合并、去重、排序、连接记录，都只有一个正确答案。",
        "beat": "code"
      },
      {
        "zh": "交给模型只会更慢、更贵，偶尔还出错。来分一分。",
        "beat": "sort"
      }
    ],
    "visual": "节点合同卡四行；模型 vs 代码分流面板",
    "interaction": "把任务拖到「模型」或「代码」"
  },
  {
    "id": "07",
    "title": "四种阵型拼完整场",
    "seconds": 58,
    "lines": [
      {
        "zh": "几乎所有流程，都能用四种形状拼出来。",
        "beat": "in"
      },
      {
        "zh": "链：一档接一档，后一步真吃前一步的输出。",
        "beat": "chain"
      },
      {
        "zh": "扇出汇合：几名工人各跑一段，再在汇合点对齐。",
        "beat": "fan"
      },
      {
        "zh": "路由：便宜的分类器把简单任务送进短路，危险任务送进长路。",
        "beat": "route"
      },
      {
        "zh": "有界循环：可以再打一轮，但一定有硬上限。",
        "beat": "cycle"
      },
      {
        "zh": "四种形状共用一条规则：并行的工人，要有各自独立的上下文。",
        "beat": "rule"
      },
      {
        "zh": "把四个评审放进同一个共享窗口，第一条意见会带偏另外三个。",
        "beat": "shared"
      },
      {
        "zh": "你付了四份钱，拿到一份意见，被抄了三遍。",
        "beat": "copy"
      },
      {
        "zh": "切到独立隔间：各看各的，才是真正的四份意见。",
        "beat": "indep"
      }
    ],
    "visual": "链 / 扇出 / 路由 / 有界循环四种阵型可切换",
    "interaction": "切换阵型；开关共享窗口 vs 独立隔间"
  },
  {
    "id": "08",
    "title": "纠错在位置内，调度在位置间",
    "seconds": 30,
    "lines": [
      {
        "zh": "loop 在位置内：产出、检查、纠正，直到这一档变绿。",
        "beat": "in"
      },
      {
        "zh": "graph 在位置间：拆分、合并、退回、谁来举牌批准。",
        "beat": "graph"
      },
      {
        "zh": "只有 graph 没有 loop：很快产出一大堆没检查过的东西。",
        "beat": "gonly"
      },
      {
        "zh": "只有 loop 没有 graph：一个很棒的步骤，待在一个设计糟糕的流程里。",
        "beat": "lonly"
      },
      {
        "zh": "两样都要：人做决定，AI 跑路线。",
        "beat": "both"
      }
    ],
    "visual": "节点内环 vs 节点间箭头对照",
    "interaction": "无（短章对照）"
  },
  {
    "id": "09",
    "title": "谁画战术板：看频率与撤销成本",
    "seconds": 120,
    "lines": [
      {
        "zh": "今年变化很大：战术板不一定要你手画了。",
        "beat": "in"
      },
      {
        "zh": "Claude Code 的动态工作流：模型为每次运行写一个编排脚本。",
        "beat": "cc"
      },
      {
        "zh": "官方文档写：默认最多 16 个代理同时跑，每次运行最多 1,000 个。",
        "beat": "ccnum"
      },
      {
        "zh": "Codex 能在配置文件里定义代理角色。按官方文档，模型可以单独设，沙箱跟着主会话走。",
        "beat": "codex"
      },
      {
        "zh": "LangGraph 1.0 是另一头：图只写一次，能从检查点重放。它在 2025 年 10 月发布。",
        "beat": "lg"
      },
      {
        "zh": "那该谁来画图？看两件事：频率——多久跑一次；撤销成本——出错有多难撤销。",
        "beat": "who"
      },
      {
        "zh": "一次性的重构或审计：让模型生成流程，用完就扔。",
        "beat": "q1"
      },
      {
        "zh": "一次性的生产数据迁移：让模型起草计划，你只读计划。",
        "beat": "q2"
      },
      {
        "zh": "每周一次、风险低：固定的图放进仓库，让它自己上线。",
        "beat": "q3"
      },
      {
        "zh": "每周一次、涉及钱或用户：固定的图，最后一步你签字。",
        "beat": "q4"
      },
      {
        "zh": "有个陷阱：每周都让模型从零重新生成流程。",
        "beat": "trap"
      },
      {
        "zh": "它每次都换一种切法，上一次学到的东西带不过来。",
        "beat": "loss"
      },
      {
        "zh": "把图固定下来，规则才会一周比一周多。",
        "beat": "fix"
      },
      {
        "zh": "提到的三个项目都是开源的，我们在 GitHub 上核对过。",
        "beat": "oss"
      },
      {
        "zh": "Bun：JavaScript 运行时，MIT 许可，现在主要语言是 Rust。",
        "beat": "bun"
      },
      {
        "zh": "LangGraph 是 MIT 许可；Codex 是终端里的编程代理，Apache 2.0 许可。",
        "beat": "lic"
      }
    ],
    "visual": "频率 × 撤销成本四象限；工具卡 Claude Code / Codex / LangGraph",
    "interaction": "选场景：谁画板、谁签字"
  },
  {
    "id": "10",
    "title": "只退那一档，别整队重跑",
    "seconds": 100,
    "lines": [
      {
        "zh": "节点失败了怎么办？要提前定好。",
        "beat": "in"
      },
      {
        "zh": "工具或网络抖了一下：重试。模型或来源挂了：换备用。",
        "beat": "retry"
      },
      {
        "zh": "可选分支失败：跳过。输出没过检查：只修那一个单元。",
        "beat": "unit"
      },
      {
        "zh": "修了三次还不行：上报，说明计划本身错了。",
        "beat": "escal"
      },
      {
        "zh": "碰到预算或权限上限：停下，叫醒一个人。可以点每一行看看。",
        "beat": "budget"
      },
      {
        "zh": "代价最大的错误，是整批退回。",
        "beat": "batch"
      },
      {
        "zh": "移植分成四片，一片测试没过，四片全退回去。",
        "beat": "four"
      },
      {
        "zh": "三片本来是对的，被重写成新版本，每一版又可能因为新原因失败。",
        "beat": "rewrite"
      },
      {
        "zh": "流程不再收敛，外面看起来就像模型越来越笨。",
        "beat": "dumb"
      },
      {
        "zh": "换成只退那一片：带上失败的测试、证据和范围。",
        "beat": "unitret"
      },
      {
        "zh": "范围那一行很重要：「只改这个文件」。",
        "beat": "scope"
      },
      {
        "zh": "没有它，代理会顺手改掉旁边两处，一行的修复变成四个文件的改动。",
        "beat": "scopefail"
      },
      {
        "zh": "修好之后，把原因写成规则，留给下次拆活的人。",
        "beat": "rule"
      },
      {
        "zh": "比如：「适配器必须原样保留关键字参数。」这个错就不会再来。",
        "beat": "ex"
      },
      {
        "zh": "几乎没人做这一步，所以多数代理系统很快，却从不进步。",
        "beat": "end"
      }
    ],
    "visual": "失败策略表；整批退回 vs 只退一单元对比",
    "interaction": "点策略行展开；对比退批 / 退单元"
  },
  {
    "id": "11",
    "title": "按撤销难度开三道闸",
    "seconds": 75,
    "lines": [
      {
        "zh": "什么时候放行？常见做法是给一个置信度分数，再定一个阈值。",
        "beat": "in"
      },
      {
        "zh": "问题是，置信度恰恰是模型给自己打的分。",
        "beat": "score"
      },
      {
        "zh": "改按撤销难度分三条车道。",
        "beat": "lanes"
      },
      {
        "zh": "改文案、加测试、独立函数：错了回滚一次，直接合并。",
        "beat": "easy"
      },
      {
        "zh": "共享工具、改数据结构：先要硬证据。",
        "beat": "mid"
      },
      {
        "zh": "迁移、删除、写生产、付款：不管分数多高，一律关闭。",
        "beat": "hard"
      },
      {
        "zh": "拖一下阈值试试：阈值能被调低，关闭的车道没有数字可调。",
        "beat": "drag"
      },
      {
        "zh": "评审代理有帮助，但它也只是多一个意见。",
        "beat": "rev"
      },
      {
        "zh": "看证据要按顺序：先测试，再看这次运行的历史，再看这个节点被回滚过几次。",
        "beat": "order"
      },
      {
        "zh": "然后才是评审代理，模型自己的说法放最后。",
        "beat": "last"
      },
      {
        "zh": "这就是达阵前的挑战旗：大家停下来核对，人举了牌，才落球。",
        "beat": "flag"
      }
    ],
    "visual": "三车道闸门；置信度滑条对照关闭车道",
    "interaction": "拖置信度阈值；对照关闭车道不可调"
  },
  {
    "id": "12",
    "title": "你只做一个决定",
    "seconds": 110,
    "lines": [
      {
        "zh": "先建检查，再建图，再建写规则的那一步。",
        "beat": "in"
      },
      {
        "zh": "剩给你的，是每次运行一个决定，就在错误无法撤销的那个点上。",
        "beat": "one"
      },
      {
        "zh": "批准合并、选哪些修复上线、签下迁移。之前的一切都不需要你，而且会自己抓错。",
        "beat": "acts"
      },
      {
        "zh": "带走五句话。",
        "beat": "take"
      },
      {
        "zh": "一，检查要能失败：程序能判错的才算数。",
        "beat": "t1"
      },
      {
        "zh": "二，数着东西停：两轮没有新发现就停，被拒的也要记住。",
        "beat": "t2"
      },
      {
        "zh": "三，测试每条箭头：说不出传什么变量，就删掉。",
        "beat": "t3"
      },
      {
        "zh": "四，失败只退那一个单元，再把原因写成规则。",
        "beat": "t4"
      },
      {
        "zh": "五，按撤销难度开闸，不可逆的那一步由人签字。",
        "beat": "t5"
      },
      {
        "zh": "下面八道小题。点选答案，马上告诉你对错和理由。",
        "beat": "quiz"
      },
      {
        "zh": "答完可以回到对应的章节再看一遍。",
        "beat": "back"
      },
      {
        "zh": "来源与勘误：Bun 行数有两种口径——约 75 万行 Rust 来自 Anthropic；535,496 行是原 Zig 代码。",
        "beat": "src1"
      },
      {
        "zh": "31 到 17 分钟是作者举例，不是实测；Codex 沙箱和 LangGraph 年份按官方文档更正。",
        "beat": "src2"
      },
      {
        "zh": "观点文章：@HoodieFade_ · Loops & Graphs · X · 2026-11-04。交互参考 oioi；风格对齐 aiai playbook。",
        "beat": "src3"
      },
      {
        "zh": "记住：人之所以只批准最后一档，是因为前面每一档都能自己说「不」。",
        "beat": "close"
      }
    ],
    "visual": "五条带走清单 + 八道小题 + 来源勘误页",
    "interaction": "测验点选；可跳回对应章节"
  }
];
const EN = {
  "open": {
    "in": "Your AI agent can already work for hours. You are still watching every step.",
    "title": "This lesson is how you stop watching every step and approve only the last down.",
    "words": "Two words: Loop, and Graph.",
    "src": "The material is an opinion piece Hoodie posted on X on 4 November 2026.",
    "keys": "Press S to cycle subtitles. Press P to narrate it yourself.",
    "bun": "The piece starts from a real case: Bun, ported from Zig to Rust.",
    "a": "Anthropic's 28 May post said about 750,000 lines of Rust, 11 days from first commit to merge.",
    "pct": "The number that spread furthest was another one: 99.8 percent of existing tests still passing.",
    "b": "Bun's official July write-up uses a different count: 535,496 lines of the original Zig, 3 to 14 May.",
    "reg": "That write-up also says 19 regressions were found after the merge, and all were fixed. So we only say about.",
    "why": "Why trust thousands of agent runs? Because every run ended with a check that could say no.",
    "two": "And the work was cut into pieces that do not wait on each other. The first is loop. The second is graph.",
    "loop": "On a football field, a loop is the instant review and correction after one play.",
    "graph": "A graph is the whole play sheet: who runs, who blocks, and when people move at once.",
    "gate": "The gate is the challenge flag before a touchdown. The irreversible down has to be signed by a person."
  },
  "01": {
    "in": "Start with three layers: harness, loop, graph.",
    "h": "The harness is the field rules and possession: what it is allowed to touch.",
    "l": "The loop checks whether this one play was done right.",
    "g": "The graph decides the positions, the order, and who raises the flag to sign.",
    "cost": "Drop one layer, and you step onto the field yourself one more time.",
    "nolg": "No harness, and you keep clicking allow. No loop, and you read every output. No graph, and you approve every step.",
    "quote": "In the author's words: a loop lets one piece of work come out right without you; a graph decides the pieces, the order, and where a person signs.",
    "most": "Most people build only the first and skip the second, so they sit there approving every step."
  },
  "02": {
    "in": "The usual move is to have a second model read the first model's output.",
    "friend": "The author says that is like grading your own homework, then asking a friend to glance at it. It feels like review. It catches little.",
    "real": "A real check is one a program can fail.",
    "whistle": "Like a replay that can blow the whistle: the yardage does not match, or the offside stands, and this play cannot continue.",
    "bun": "Bun's test suite existed before the agents started, so nobody had to read every diff.",
    "ev": "The author sorts evidence into four grades, strong to weak.",
    "strong": "Strong: the test returns 0, the output matches the format, the change stays inside the plan.",
    "medium": "Medium: the cited source really supports the claim, or an independent path reaches the same answer.",
    "weak": "Weak: a reviewer agent says pass. Noise: looks fine, the model says it is confident, there is no error.",
    "try": "Your turn: put each evidence card in the grade it belongs to.",
    "silence": "The last one stings: no error was reported.",
    "empty": "An empty error log only means nobody reported. It does not mean nothing failed.",
    "loop": "A loop that treats silence as success repeats the same mistake until the budget is gone, and the log only gets cleaner.",
    "rule": "So write the check first, then the task."
  },
  "03": {
    "in": "Keep going until it feels done has no end. The agent is happy to polish for another hour.",
    "count": "The author's method is to count: how many new findings each round, minus what you have already seen.",
    "run": "Two rounds in a row with nothing new, and you stop. Let's run it.",
    "seen": "The point is the seen set: rejected findings go in there too.",
    "forget": "Now turn on forget rejected items: the same dead end is rediscovered every round, and it never stops.",
    "pay": "In the end only the round cap cuts it off, and every round you pay for an old mistake.",
    "five": "Every loop needs five things.",
    "a": "A test that can say done, a round cap, and a budget.",
    "b": "Memory of earlier tries, and a person who gets woken when it sticks.",
    "board": "Like the sideline scoreboard: yardage, a timeout alarm, and someone who comes on when the alarm rings."
  },
  "04": {
    "in": "But a loop can only finish one play.",
    "cant": "It cannot tell you this play should not exist, or that three of five steps could have moved together.",
    "green": "So every step passed, and the whole drive was still slow and wrong.",
    "between": "The problem is not inside the steps. It is between them. That is the graph's job."
  },
  "05": {
    "in": "A node: one job, one input, one output. An edge: this node's output is that node's input.",
    "line": "Most pipelines are drawn as a straight line, because that is how people write instructions: look up sources, read the repo, pull prices, write.",
    "habit": "But the price step never reads the repo. The order comes from the sentence, not from the work.",
    "test": "Test every arrow: name the variable it carries. If you cannot, delete it.",
    "demo": "Try it. This is the author's example: four steps in sentence order, 31 minutes.",
    "cut1": "Click the arrow from sources to the repo: nothing is passed on it. Delete it.",
    "cut2": "Delete repo to price as well: three jobs start together, and 17 minutes are left.",
    "save": "Not one token less. Just less waiting that was never needed.",
    "field": "On the field, yardage that can advance together should not stand around. The block, the split, and the throw can run in parallel.",
    "caveat": "Note: 31 to 17 minutes is the author's example, to show the critical path. It is not a measured result.",
    "join": "Join only when the next step truly needs the full set: deduping across sources, or ranking every candidate.",
    "fig": "This is the author's picture: the same four steps, wall-clock almost cut in half."
  },
  "06": {
    "in": "If you cannot say a node in four lines, you cannot test it, and you cannot swap it.",
    "name": "Look at the author's example. The node is called source researcher.",
    "io": "Task: one primary source per claim. Input: the topic and the source type.",
    "fail": "Output: claim, link, original sentence. On failure, report: no primary source found.",
    "swap": "Once the contract is fixed, you can change the model, the prompt, or the tool, and downstream does not break.",
    "ask": "Then ask of every node: does it have to judge, decide, evaluate, or summarize?",
    "model": "If yes, use a model. A small one to extract, a strong one to synthesize.",
    "code": "If no, write code: merge, dedupe, sort, join records. Each has one right answer.",
    "sort": "Handing those to a model is slower, costlier, and sometimes wrong. Sort them."
  },
  "07": {
    "in": "Almost every workflow can be built from four shapes.",
    "chain": "Chain: one play after another, and the next step really consumes the previous output.",
    "fan": "Fan-out and join: several workers each run a stretch, then meet at the join.",
    "route": "Route: a cheap classifier sends easy work down the short path and dangerous work down the long one.",
    "cycle": "Bounded loop: you may run another round, but there is a hard cap.",
    "rule": "All four shapes share one rule: workers in parallel need their own context.",
    "shared": "Put four reviewers in one shared window, and the first opinion pulls the other three off course.",
    "copy": "You paid four times and got one opinion, copied three times.",
    "indep": "Switch to separate booths. Each one looks alone. That is four opinions."
  },
  "08": {
    "in": "The loop is inside a position: produce, check, correct, until this down goes green.",
    "graph": "The graph is between positions: split, join, send back, and who raises the flag.",
    "gonly": "Graph without a loop: you quickly get a pile of things nobody checked.",
    "lonly": "Loop without a graph: one excellent step, stuck inside a badly drawn drive.",
    "both": "You want both. The person decides. The AI runs the route."
  },
  "09": {
    "in": "This year changed a lot: you do not always have to draw the play sheet by hand.",
    "cc": "Claude Code dynamic workflows: the model writes an orchestration script for each run.",
    "ccnum": "The docs say the default is at most 16 agents at once, and at most 1,000 per run.",
    "codex": "Codex can define agent roles in a config file. Per the docs, the model can be set on its own, and the sandbox follows the main session.",
    "lg": "LangGraph 1.0 is the other end: the graph is written once and can be replayed from a checkpoint. It shipped in October 2025.",
    "who": "So who draws the graph? Two things: how often it runs, and how hard a mistake is to undo.",
    "q1": "A one-off refactor or audit: let the model generate the flow, then throw it away.",
    "q2": "A one-off production data migration: let the model draft the plan. You only read the plan.",
    "q3": "Weekly, and low risk: a fixed graph in the repo, and it ships itself.",
    "q4": "Weekly, and it touches money or users: a fixed graph, and you sign the last step.",
    "trap": "There is a trap: letting the model regenerate the flow from scratch every week.",
    "loss": "It slices the work differently each time, and what you learned last time does not carry over.",
    "fix": "Fix the graph, and the rules accumulate week by week.",
    "oss": "All three projects mentioned are open source. We checked them on GitHub.",
    "bun": "Bun: a JavaScript runtime, MIT license, now mostly Rust.",
    "lic": "LangGraph is MIT. Codex is a coding agent in the terminal, Apache 2.0."
  },
  "10": {
    "in": "What if a node fails? Decide before it happens.",
    "retry": "A tool or the network blips: retry. A model or a source is down: switch to the spare.",
    "unit": "An optional branch fails: skip it. The output fails the check: repair only that unit.",
    "escal": "Three repairs still fail: escalate. The plan itself is wrong.",
    "budget": "You hit a budget or a permission limit: stop, and wake a person. You can click each row.",
    "batch": "The most expensive mistake is sending the whole batch back.",
    "four": "The port was split into four slices. One slice failed its test, and all four were sent back.",
    "rewrite": "Three slices were already right. They get rewritten, and each new version can fail for a new reason.",
    "dumb": "The process stops converging. From the outside it looks like the model is getting dumber.",
    "unitret": "Send back only that slice, with the failing test, the evidence, and the scope.",
    "scope": "The scope line matters: change only this file.",
    "scopefail": "Without it, the agent tidies two neighbors, and a one-line fix becomes a four-file diff.",
    "rule": "After the fix, write the cause down as a rule for the next person who splits the work.",
    "ex": "For example: the adapter must keep keyword arguments unchanged. That mistake does not come back.",
    "end": "Almost nobody does this step, so most agent systems are fast and never get better."
  },
  "11": {
    "in": "When do you let it through? The usual move is a confidence score and a threshold.",
    "score": "The problem: confidence is the score the model gives itself.",
    "lanes": "Split three lanes by how hard it is to undo.",
    "easy": "Copy, added tests, a standalone function: one rollback if it is wrong. Merge.",
    "mid": "Shared tools, a data-structure change: hard evidence first.",
    "hard": "Migration, deletion, writing production, payment: however high the score, the lane stays closed.",
    "drag": "Drag the threshold. The threshold can be lowered. The closed lane has no number to tune.",
    "rev": "A reviewer agent helps. It is still just one more opinion.",
    "order": "Read evidence in order: tests first, then this run's history, then how many times this node was rolled back.",
    "last": "Only then the reviewer agent. What the model says about itself comes last.",
    "flag": "That is the challenge flag before the touchdown. Everyone stops to check. A person raises the flag. Then the ball is down."
  },
  "12": {
    "in": "Build the checks first, then the graph, then the step that writes the rule down.",
    "one": "What is left for you is one decision per run, at the point where the mistake cannot be undone.",
    "acts": "Approve the merge, choose which fixes ship, sign the migration. Everything before that does not need you, and it catches its own mistakes.",
    "take": "Five lines to take with you.",
    "t1": "One. A check has to be able to fail. Only what a program can judge counts.",
    "t2": "Two. Count, then stop. Two rounds with nothing new, and stop. Remember what was rejected.",
    "t3": "Three. Test every arrow. If you cannot name the variable, delete it.",
    "t4": "Four. On failure, send back only that unit, then write the cause as a rule.",
    "t5": "Five. Open the gate by undo cost. A person signs the irreversible step.",
    "quiz": "Eight short questions below. Pick an answer. You get right or wrong, and the reason, immediately.",
    "back": "When you finish, you can jump back to the chapter and look again.",
    "src1": "Sources and corrections: Bun's line counts come in two figures. About 750,000 lines of Rust from Anthropic. 535,496 is the original Zig.",
    "src2": "31 to 17 minutes is the author's example, not a measurement. The Codex sandbox and the LangGraph year were corrected against the official docs.",
    "src3": "Opinion piece: @HoodieFade_, Loops and Graphs, X, 2026-11-04. Interaction referenced from oioi. The style follows the aiai playbook.",
    "close": "Remember: a person approves only the last down because every down before it can say no by itself."
  }
};
CHAPTERS.forEach(ch => {
  const map = EN[ch.id];
  ch.lines.forEach(line => { line.en = map[line.beat]; });
});
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const $ = id => document.getElementById(id);
const TOTAL = CHAPTERS.reduce((n, c) => n + c.lines.length, 0);
const state = {
  mode: 'gate', sub: 'zh', playing: false, tts: false, ci: 0, li: 0, done: false, timer: 0,
  forget: false, seenTouched: false, ctx: 'shared', ctxTouched: false, form: 'chain', formTouched: false,
  quad: 'q4', quadTouched: false, cuts: new Set(), miss: new Set(), ev: {}, tasks: {}, quiz: {},
  failOpen: null, failTouched: false, sel: null, selKey: null, dragId: null
};
let lastCh = null;
let shownCh = null;
let speakToken = 0;

const LAYERS = [
  { id: 'harness', name: 'Harness', role: '场地规则和球权——管它能碰什么。', cost: '没有 harness，你得一直点允许。' },
  { id: 'loop', name: 'Loop', role: '管这一档进攻做对了没有。', cost: '没有 loop，你要读每一份输出。' },
  { id: 'graph', name: 'Graph', role: '管有哪些位置、按什么顺序、谁来举牌签字。', cost: '没有 graph，你要批准每一步。' }
];
const EVIDENCE = [
  { id: 't0', t: '测试返回 0', bin: 'strong', why: '程序能判失败。' },
  { id: 'fmt', t: '输出符合约定格式', bin: 'strong', why: '格式不对就能吹停。' },
  { id: 'plan', t: '改动没超出计划', bin: 'strong', why: '越界是失败，不是风格问题。' },
  { id: 'cite', t: '引用的来源真的支持结论', bin: 'medium', why: '查得过，但不是编译器那种硬失败。' },
  { id: 'path', t: '另一条独立路径得到同一个答案', bin: 'medium', why: '两条路一致，比一个人说了算强。' },
  { id: 'rev', t: '评审代理说通过', bin: 'weak', why: '多一个意见，仍然不是程序判失败。' },
  { id: 'looks', t: '「看着不错」', bin: 'noise', why: '感觉不是证据。' },
  { id: 'conf', t: '模型说很有把握', bin: 'noise', why: '自信是它给自己打的分。' },
  { id: 'none', t: '没有报错', bin: 'noise', why: '空日志只说明没人报告，不说明没出错。' }
];
const EBINS = [
  { id: 'strong', name: '强 · strong' },
  { id: 'medium', name: '中 · medium' },
  { id: 'weak', name: '弱 · weak' },
  { id: 'noise', name: '噪音 · noise' }
];
const TASKS = [
  { id: 'src', t: '给每个论点找一手来源', bin: 'model', why: '要判断来源算不算一手。' },
  { id: 'sum', t: '综合三方分歧写成一段', bin: 'model', why: '要总结。用强模型。' },
  { id: 'ext', t: '从段落里抽出日期', bin: 'model', why: '抽取可以用小模型。' },
  { id: 'merge', t: '把两张表按 id 合并', bin: 'code', why: '只有一个正确答案。' },
  { id: 'dedupe', t: '按链接去重', bin: 'code', why: '去重不是判断题。' },
  { id: 'sort', t: '按日期排序', bin: 'code', why: '排序交给代码。' },
  { id: 'join', t: '用键连接就诊记录', bin: 'code', why: '连接记录只有一种对法。' }
];
const TBINS = [{ id: 'model', name: '模型' }, { id: 'code', name: '代码' }];
const FORMS = {
  chain: { name: '链', view: '<span class="n">查资料</span><span class="arrow">→</span><span class="n">抽取</span><span class="arrow">→</span><span class="n">写</span><p class="note">后一步真吃前一步的输出。</p>' },
  fan: { name: '扇出汇合', view: '<span class="n">来源</span><span class="n">仓库</span><span class="n">价格</span><span class="arrow">→</span><span class="n">汇合</span><p class="note">几名工人各跑一段，再在汇合点对齐。</p>' },
  route: { name: '路由', view: '<span class="n">便宜的分类器</span><span class="arrow">→</span><span class="n">短路 · 改文案</span><span class="n">长路 · 迁移</span><p class="note">简单任务走短路，危险任务走长路。</p>' },
  cycle: { name: '有界循环', view: '<span class="n">产出</span><span class="arrow">→</span><span class="n">检查</span><span class="arrow">→</span><span class="n">再打一轮</span><p class="note">可以再来，硬上限 2 轮。到了就停。</p>' }
};
const QUADS = [
  { id: 'q1', t: '一次性 · 重构或审计', d: '让模型生成流程，用完就扔。你不必签字。' },
  { id: 'q2', t: '一次性 · 生产数据迁移', d: '让模型起草计划。你只读计划。' },
  { id: 'q3', t: '每周 · 风险低', d: '图固定在仓库里，让它自己上线。' },
  { id: 'q4', t: '每周 · 钱或用户', d: '图固定。最后一步你签字。' }
];
const FAILS = [
  { id: 'retry', beats: ['retry'], k: '工具或网络抖了一下', v: '重试', d: '同一档再跑，不换计划。' },
  { id: 'spare', beats: ['retry'], k: '模型或来源挂了', v: '换备用', d: '换一条备用路径，不把整队退回去。' },
  { id: 'skip', beats: ['unit'], k: '可选分支失败', v: '跳过', d: '这条不是关键路径，跳过并记一笔。' },
  { id: 'unit', beats: ['unit'], k: '输出没过检查', v: '只修那一个单元', d: '带上失败的测试、证据和范围。' },
  { id: 'escal', beats: ['escal'], k: '修了三次还不行', v: '上报', d: '计划本身错了，不是再试一次能好的。' },
  { id: 'budget', beats: ['budget'], k: '预算或权限上限', v: '停下，叫醒一个人', d: '没有预算就没有下一轮。人来决定。' },
  { id: 'batch', beats: ['batch', 'four', 'rewrite', 'dumb'], k: '整批退回', v: '别这么做', d: '一片测试没过，四片全退。三片本来是对的，被重写成新版本，每一版又可能因为新原因失败。流程不再收敛，外面看起来就像模型越来越笨。', bad: true },
  { id: 'one', beats: ['unitret', 'scope', 'scopefail', 'rule', 'ex', 'end'], k: '只退那一片', v: '就这么做', d: '带上失败的测试、证据，范围写成「只改这个文件」。没有范围，一行修复会变成四个文件。修好后把原因写成规则，例如：适配器必须原样保留关键字参数。' }
];
const EDGES = [
  { id: 'src-repo', label: '资料 → 仓库', variable: '' },
  { id: 'repo-price', label: '仓库 → 价格', variable: '' },
  { id: 'price-write', label: '价格 → 写', variable: '价格数字' },
  { id: 'src-write', label: '资料 → 写', variable: '要点' },
  { id: 'repo-write', label: '仓库 → 写', variable: '仓库事实' }
];
const QUIZ = [
  { ch: '02', q: '下面哪一种，才算回看能吹停的检查？', opts: ['评审代理说看着不错', '测试返回 0，而且改动没超出计划', '模型说很有把握', '错误日志是空的'], a: 1, why: '程序能判它失败，这一档才不能往下走。看着不错、自信、空日志都吹不停。' },
  { ch: '02', q: '「没有报错」该放进哪一档？', opts: ['强', '中', '弱', '噪音'], a: 3, why: '空的错误日志只说明没人报告，不说明没出错。' },
  { ch: '03', q: '循环该在什么时候停？', opts: ['一直做到满意为止', '连续两轮没有新发现，被拒的也记在 seen 里', '日志变得干净了', '模型说已经完成'], a: 1, why: '数东西，而不是等感觉。被否掉的发现也要记进 seen，不然同一条死胡同会反复计费。' },
  { ch: '05', q: '一条箭头什么时候该删？', opts: ['它让流程图看起来整齐', '说不出上面传的是哪个变量', '它指向写这一步', '它比较短'], a: 1, why: '边的意思是：这个节点的输出，是那个节点的输入。说不出变量，顺序就只是句子习惯。' },
  { ch: '05', q: '31 分钟变成 17 分钟，少掉的是什么？', opts: ['少付了一半 token', '少了没必要的等待（作者举例，不是实测）', '少写了两个节点', '模型跑得更快了'], a: 1, why: '三件互不读取的事同时开工。31 和 17 是作者用来说明关键路径的例子，不是计时成绩。' },
  { ch: '06', q: '合并、去重、排序、连接记录，该交给谁？', opts: ['强模型', '小模型', '代码', '评审代理'], a: 2, why: '这些只有一个正确答案。交给模型更慢、更贵，偶尔还出错。' },
  { ch: '10', q: '四片移植里一片测试没过，该怎么退？', opts: ['四片全部退回重写', '只退那一片，带上失败测试、证据和范围', '把置信度阈值调低再跑', '换一个更贵的模型重跑整队'], a: 1, why: '整批退回会把本来对的三片重写掉，流程不再收敛。范围要写明「只改这个文件」。' },
  { ch: '11', q: '迁移、删除、写生产、付款，置信度 0.99 时怎么走？', opts: ['超过阈值就自动合并', '车道关闭，没有数字可调，人来签字', '交给评审代理拍板', '听模型自己的说法'], a: 1, why: '按撤销难度开闸。关闭的车道不接受分数，也不接受自评。' }
];

function lineAt() { return CHAPTERS[state.ci].lines[state.li]; }
function flatIndex() {
  let n = 0;
  for (let i = 0; i < state.ci; i++) n += CHAPTERS[i].lines.length;
  return n + state.li + 1;
}
function dur(line) {
  const pace = Number(new URLSearchParams(location.search).get('pace'));
  const per = Number.isFinite(pace) && pace > 0 ? pace : 240;
  const ms = Math.round(line.zh.length * per);
  const min = per < 80 ? Math.max(30, per) : 2200;
  return Math.min(14000, Math.max(min, ms));
}
function stopSpeech() {
  speakToken++;
  if (window.speechSynthesis) window.speechSynthesis.cancel();
}
function speak(text, onend) {
  if (!window.speechSynthesis) { onend?.(); return; }
  const token = ++speakToken;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'zh-CN';
  u.rate = 1;
  const v = window.speechSynthesis.getVoices().find(x => /^zh/i.test(x.lang));
  if (v) u.voice = v;
  let done = false;
  const finish = () => {
    if (done) return;
    done = true;
    if (token === speakToken && state.playing && state.tts && state.mode === 'auto') onend?.();
  };
  u.onend = finish;
  u.onerror = finish;
  window.speechSynthesis.speak(u);
}
function schedule() {
  clearTimeout(state.timer);
  if (!state.playing || state.mode !== 'auto' || state.done) return;
  const line = lineAt();
  if (state.tts && window.speechSynthesis) { speak(line.zh, () => step(1)); return; }
  state.timer = setTimeout(() => step(1), dur(line));
}
function pause() {
  state.playing = false;
  clearTimeout(state.timer);
  stopSpeech();
  renderChrome();
}
function resume() {
  if (state.mode === 'gate') return;
  state.mode = 'auto';
  state.playing = true;
  state.done = false;
  $('toast').hidden = true;
  schedule();
  renderChrome();
}
function start(mode) {
  state.mode = mode;
  state.playing = mode === 'auto';
  state.done = false;
  document.body.classList.add('live');
  $('toast').hidden = true;
  go(state.ci, state.li);
}
function flashChapter(ch) {
  const card = $('chapcard');
  if (!card) return;
  $('chapNum').textContent = ch.id === 'open' ? '00' : ch.id;
  $('chapName').textContent = ch.title;
  card.classList.remove('go');
  void card.offsetWidth;
  card.classList.add('go');
}
function go(ci, li) {
  const ch = CHAPTERS[ci];
  state.ci = ci;
  state.li = li;
  state.done = false;
  $('toast').hidden = true;
  clearTimeout(state.timer);
  stopSpeech();
  const stage = $('stage');
  if (stage) stage.dataset.mood = ch.id;
  document.querySelectorAll('.panel').forEach(p => p.classList.toggle('on', p.dataset.ch === ch.id));
  if (shownCh !== ch.id) {
    shownCh = ch.id;
    flashChapter(ch);
  }
  renderChrome();
  syncDemos();
  if (state.playing && state.mode === 'auto') schedule();
}
function step(dir) {
  if (state.mode === 'gate') return;
  const ch = CHAPTERS[state.ci];
  let ci = state.ci;
  let li = state.li + dir;
  if (li >= ch.lines.length) {
    if (ci === CHAPTERS.length - 1) {
      state.done = true;
      state.playing = false;
      clearTimeout(state.timer);
      stopSpeech();
      $('toast').hidden = false;
      renderChrome();
      return;
    }
    ci += 1;
    li = 0;
  } else if (li < 0) {
    if (ci === 0) li = 0;
    else { ci -= 1; li = CHAPTERS[ci].lines.length - 1; }
  }
  go(ci, li);
}
function restart() {
  shownCh = null;
  state.ci = 0;
  state.li = 0;
  state.done = false;
  if (state.mode === 'gate') start('auto');
  else {
    state.playing = state.mode === 'auto';
    go(0, 0);
  }
}
function toggleMode() {
  if (state.mode === 'gate' || state.mode === 'auto') {
    if (state.mode === 'gate') start('self');
    else { state.mode = 'self'; pause(); }
    return;
  }
  resume();
}
function cycleSub() {
  state.sub = { zh: 'en', en: 'both', both: 'off', off: 'zh' }[state.sub];
  renderChrome();
}
function renderChrome() {
  const ch = CHAPTERS[state.ci];
  const line = lineAt();
  const label = ch.id === 'open' ? '片头' : ch.id;
  $('chap').textContent = state.mode === 'gate' ? '片头' : (label + ' · ' + ch.title);
  document.querySelectorAll('#toc button').forEach((b, i) => {
    b.setAttribute('aria-current', String(i === state.ci && state.mode !== 'gate'));
    const fill = b.querySelector('b');
    if (!fill) return;
    if (state.mode === 'gate' || i > state.ci) fill.style.width = '0';
    else if (i < state.ci) fill.style.width = '100%';
    else fill.style.width = ((state.li + 1) / CHAPTERS[i].lines.length * 100) + '%';
  });
  const cap = $('subs');
  cap.classList.toggle('off', state.sub === 'off' || state.mode === 'gate');
  const showZh = state.sub === 'zh' || state.sub === 'both';
  $('capZh').textContent = state.mode === 'gate' ? '' : (state.sub === 'en' ? line.en : (showZh ? line.zh : ''));
  $('capEn').textContent = (state.mode !== 'gate' && state.sub === 'both') ? line.en : '';
  $('btnSub').textContent = { zh: '中', en: 'EN', both: '双语', off: '关' }[state.sub];
  $('btnTts').textContent = state.tts ? '朗读开' : '朗读';
  $('btnTts').classList.toggle('on', state.tts);
  $('btnMode').textContent = state.mode === 'self' ? '自讲' : '自动';
  $('btnMode').classList.toggle('on', state.mode !== 'self');
  if (state.done) $('btnPlay').textContent = '↺';
  else if (state.mode === 'self') $('btnPlay').textContent = '▶';
  else $('btnPlay').textContent = state.playing ? '⏸' : '▶';
  $('btnPlay').setAttribute('aria-label', state.playing && !state.done ? '暂停' : '继续');
  $('toast').hidden = state.mode === 'gate' || !state.done;
}
function markBeats() {
  const ch = CHAPTERS[state.ci];
  const seen = new Set();
  for (let i = 0; i <= state.li; i++) seen.add(ch.lines[i].beat);
  const cur = ch.lines[state.li].beat;
  document.querySelectorAll('.panel.on [data-beats]').forEach(el => {
    const bs = el.dataset.beats.split(/\s+/);
    const was = bs.some(b => seen.has(b));
    el.classList.toggle('hot', bs.includes(cur));
    el.classList.toggle('seen', was);
    el.classList.toggle('dim', el.matches('.take li, .kit li') && !was);
  });
}
function syncDemos() {
  const ch = CHAPTERS[state.ci];
  const beat = lineAt().beat;
  if (ch.id !== lastCh) {
    if (ch.id === '03') state.seenTouched = false;
    if (ch.id === '07') { state.ctxTouched = false; state.formTouched = false; }
    if (ch.id === '09') state.quadTouched = false;
    if (ch.id === '10') state.failTouched = false;
    lastCh = ch.id;
  }
  if (ch.id === '03' && !state.seenTouched) state.forget = beat === 'forget' || beat === 'pay';
  if (ch.id === '07' && !state.formTouched && FORMS[beat]) state.form = beat;
  if (ch.id === '07' && !state.ctxTouched) {
    if (beat === 'shared' || beat === 'copy') state.ctx = 'shared';
    if (beat === 'indep') state.ctx = 'indep';
  }
  if (ch.id === '09' && !state.quadTouched && QUADS.some(q => q.id === beat)) state.quad = beat;
  if (ch.id === '10' && !state.failTouched) {
    const hit = FAILS.find(f => f.beats.includes(beat));
    if (hit) state.failOpen = hit.id;
  }
  renderSeen();
  renderForm();
  renderReviews();
  renderQuads();
  renderPipe();
  renderFails();
  markBeats();
}
function renderSeen() {
  $('forget').checked = state.forget;
  $('seenLog').innerHTML = state.forget
    ? '忘掉已拒绝项：被否掉的「越位漏判」不进 seen。\n第 1 轮  新发现 3。否掉越位漏判，随即忘掉。\n第 2 轮  越位漏判又被当成新发现。\n第 3 轮  还是它。\n第 4 轮  还是它。\n第 5 轮  还是它。\n第 6 轮  轮数上限硬切断。\n<span class="pay">每一轮都在为旧错付钱。日志可以很干净，错还在。</span>'
    : '第 1 轮  新发现 3：越位漏判、码数少记、传球出界。否掉「越位漏判」，记入 seen。\n第 2 轮  又看见越位漏判，但 seen 里有了。新发现 1：掩护早了。\n第 3 轮  新发现 0。连续 1 轮。\n第 4 轮  新发现 0。连续 2 轮。收工。';
}
function renderLayers() {
  $('layers').innerHTML = LAYERS.map(L => {
    const off = state.miss.has(L.id);
    return `<button type="button" class="card${off ? ' hot' : ''}" data-id="${L.id}" aria-pressed="${off}"><b>${off ? '缺席 · ' : ''}${L.name}</b><p>${esc(L.role)}</p><p>${off ? esc(L.cost) : '这一层在场上。点它，看缺了要你亲自下场做什么。'}</p></button>`;
  }).join('');
  $('layerNote').textContent = state.miss.size
    ? [...state.miss].map(id => LAYERS.find(L => L.id === id).cost).join('')
    : '三层都在。少一层，就多一次你下场。';
}
function bindSort(trayId, binsId, items, bins, key, scoreId) {
  const tray = $(trayId);
  const binsEl = $(binsId);
  binsEl.innerHTML = bins.map(b => `<div class="bin ${b.id}" data-bin="${b.id}"><header>${esc(b.name)}</header><div class="slot"></div></div>`).join('');
  const paint = () => {
    tray.innerHTML = '';
    binsEl.querySelectorAll('.slot').forEach(s => { s.innerHTML = ''; });
    items.forEach(item => {
      const placed = state[key][item.id];
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'chip';
      chip.draggable = true;
      chip.dataset.id = item.id;
      chip.append(document.createTextNode(item.t));
      if (placed) {
        chip.classList.add(placed === item.bin ? 'ok' : 'bad');
        const why = document.createElement('small');
        why.textContent = placed === item.bin ? item.why : '再看一眼这一档的定义。';
        chip.appendChild(why);
        binsEl.querySelector(`.bin[data-bin="${placed}"] .slot`).appendChild(chip);
      } else tray.appendChild(chip);
      chip.addEventListener('dragstart', ev => {
        ev.dataTransfer.setData('text/plain', item.id);
        ev.dataTransfer.effectAllowed = 'move';
        state.dragId = item.id;
        state.selKey = key;
      });
      chip.addEventListener('click', () => {
        if (state.sel === item.id && state.selKey === key) {
          delete state[key][item.id];
          state.sel = null;
          paint();
          return;
        }
        document.querySelectorAll('#' + trayId + ' .chip, #' + binsId + ' .chip').forEach(c => c.classList.remove('sel'));
        chip.classList.add('sel');
        state.sel = item.id;
        state.selKey = key;
      });
    });
    const ok = items.filter(it => state[key][it.id] === it.bin).length;
    const placedN = items.filter(it => state[key][it.id]).length;
    $(scoreId).textContent = placedN ? ('放对 ' + ok + ' / ' + items.length) : ('共 ' + items.length + ' 张。点一张，再点档位；也可以拖。');
  };
  binsEl.addEventListener('dragover', e => { if (e.target.closest('.bin')) { e.preventDefault(); e.target.closest('.bin').classList.add('over'); } });
  binsEl.addEventListener('dragleave', e => { const b = e.target.closest('.bin'); if (b) b.classList.remove('over'); });
  binsEl.addEventListener('drop', e => {
    const bin = e.target.closest('.bin');
    if (!bin || state.selKey !== key) return;
    e.preventDefault();
    bin.classList.remove('over');
    const id = e.dataTransfer.getData('text/plain') || state.dragId;
    if (!id) return;
    state[key][id] = bin.dataset.bin;
    paint();
  });
  binsEl.addEventListener('click', e => {
    const bin = e.target.closest('.bin');
    if (!bin || e.target.closest('.chip')) return;
    if (state.sel && state.selKey === key) {
      state[key][state.sel] = bin.dataset.bin;
      paint();
    }
  });
  paint();
}
function renderForm() {
  document.querySelectorAll('#forms button').forEach(b => b.setAttribute('aria-pressed', b.dataset.f === state.form ? 'true' : 'false'));
  $('formBox').innerHTML = FORMS[state.form].view;
}
function renderReviews() {
  const shared = state.ctx === 'shared';
  $('ctxShared').setAttribute('aria-pressed', String(shared));
  $('ctxIndep').setAttribute('aria-pressed', String(!shared));
  const items = shared
    ? ['这条论据不够一手。', '同意上一条。', '同意上一条。', '同意上一条。']
    : ['来源不是一手。', '数字和表格对不上。', '范围写得太宽。', '这段可以留。'];
  $('reviews').className = 'review' + (shared ? ' shared' : '');
  $('reviews').innerHTML = items.map((t, i) => `<div><b>评审 ${i + 1}</b><p>${t}</p></div>`).join('');
  $('ctxNote').textContent = shared ? '同一个共享窗口：你付了四份钱，拿到一份意见，被抄了三遍。' : '独立隔间：各看各的，才是四份意见。';
}
function renderQuads() {
  $('quads').innerHTML = QUADS.map(q => `<button type="button" class="card${state.quad === q.id ? ' hot' : ''}" data-id="${q.id}" aria-pressed="${state.quad === q.id}"><b>${esc(q.t)}</b><p>${esc(q.d)}</p></button>`).join('');
}
function renderFails() {
  $('failRows').innerHTML = FAILS.map(f => {
    const open = state.failOpen === f.id;
    return `<tr class="pick${f.bad ? ' bad' : ''}${open ? ' on' : ''}" data-id="${f.id}" data-beats="${f.beats.join(' ')}"><td>${esc(f.k)}</td><td><b>${esc(f.v)}</b>${open ? `<div class="note">${esc(f.d)}</div>` : ''}</td></tr>`;
  }).join('');
}
function renderPipe() {
  const beat = CHAPTERS[state.ci].id === '05' ? lineAt().beat : '';
  const hint = beat === 'cut1' ? 'src-repo' : beat === 'cut2' ? 'repo-price' : '';
  const btn = edge => {
    const cut = state.cuts.has(edge.id);
    const keep = !!edge.variable;
    const em = cut ? '已删' : (keep ? ('变量：' + esc(edge.variable)) : '没有变量，可删');
    return `<button type="button" class="edge${keep ? ' keep' : ''}${cut ? ' cut' : ''}${hint === edge.id ? ' hot' : ''}" data-edge="${edge.id}">${esc(edge.label)}<em>${em}</em></button>`;
  };
  const byId = id => EDGES.find(e => e.id === id);
  $('pipe').innerHTML = [
    '<div class="node"><b>查资料</b></div>', btn(byId('src-repo')),
    '<div class="node"><b>看仓库</b></div>', btn(byId('repo-price')),
    '<div class="node"><b>拉价格</b></div>', btn(byId('price-write')),
    '<div class="node"><b>写</b></div>',
    btn(byId('src-write')), btn(byId('repo-write'))
  ].join('');
  const both = state.cuts.has('src-repo') && state.cuts.has('repo-price');
  const one = state.cuts.has('src-repo') || state.cuts.has('repo-price');
  $('clock').innerHTML = (both ? '17' : '31') + ' <small>分钟</small>';
  $('clockNote').textContent = both
    ? '两条没有变量的箭头都剪了：三件事同时开工，只剩 17 分钟。作者举例，不是实测。'
    : one
      ? '还留着一条没有变量的等待，三件事还不能同时开工。墙钟仍按 31 分钟这条例子计。'
      : '四步按句子顺序串起来，一共 31 分钟。作者举例。';
}
function renderLanes() {
  const t = +$('th').value;
  $('thVal').textContent = String(t);
  const lanes = [
    { shut: false, title: '好回滚 · 直接合并', body: '改文案、加测试、独立函数。错了回滚一次。', ticket: '改按钮文案', score: 72, mid: false },
    { shut: false, title: '先要硬证据', body: '共享工具、改数据结构。分数不能代替证据。', ticket: '改共享数据结构', score: 88, mid: true },
    { shut: true, title: '关闭', body: '迁移、删除、写生产、付款。没有数字可调。', ticket: '向生产付款', score: 96, mid: false }
  ];
  $('lanes').innerHTML = lanes.map(l => {
    let status;
    if (l.shut) status = '分数 ' + l.score + ' 也进不来。阈值拖到 ' + t + '，这道闸仍关着。';
    else if (l.mid) status = '分数 ' + l.score + '。阈值是 ' + t + '，这道闸仍要硬证据，不看分数放行。';
    else status = l.score >= t ? ('分数 ' + l.score + ' ≥ 阈值 ' + t + '：这一档可以合并。') : ('分数 ' + l.score + ' < 阈值 ' + t + '：先留下。');
    return `<article class="lane${l.shut ? ' shut' : ''}"><b>${l.title}</b><p>${l.body}</p><p><b>${l.ticket}</b> · ${status}</p></article>`;
  }).join('');
}
function renderQuiz() {
  $('quiz').innerHTML = QUIZ.map((q, qi) => `<div class="q" data-q="${qi}"><p><b>${qi + 1}.</b> ${esc(q.q)}</p><div class="opts">${q.opts.map((o, i) => `<button type="button" data-i="${i}">${esc(o)}</button>`).join('')}</div><p class="why"></p></div>`).join('');
}
function answerQuiz(btn) {
  const box = btn.closest('.q');
  const qi = +box.dataset.q;
  const q = QUIZ[qi];
  const pick = +btn.dataset.i;
  state.quiz[qi] = pick;
  box.querySelectorAll('button').forEach((b, i) => {
    b.classList.toggle('ok', i === q.a);
    b.classList.toggle('bad', i === pick && pick !== q.a);
  });
  box.querySelector('.why').innerHTML = (pick === q.a ? '对。' : '这档不对。') + esc(q.why) + ` <a href="#ch-${q.ch}" data-jump="${q.ch}">回到 ${q.ch} 章</a>`;
}
function bind() {
  $('toc').innerHTML = CHAPTERS.map((c, i) => `<button type="button" data-i="${i}" aria-label="${esc(c.id === 'open' ? '开场' : c.id)} ${esc(c.title)}"><i><b></b></i></button>`).join('');
  $('toc').onclick = e => {
    const b = e.target.closest('button');
    if (!b) return;
    if (state.mode === 'gate') start('self');
    go(+b.dataset.i, 0);
  };
  $('btnAuto').onclick = () => start('auto');
  $('btnSelf').onclick = () => start('self');
  $('btnPrev').onclick = () => { if (state.mode === 'gate') start('self'); step(-1); };
  $('btnNext').onclick = () => { if (state.mode === 'gate') start('self'); step(1); };
  $('btnPlay').onclick = () => {
    if (state.mode === 'gate') { start('auto'); return; }
    if (state.done) { restart(); return; }
    if (state.mode === 'self') { resume(); return; }
    if (state.playing) pause(); else resume();
  };
  $('btnMode').onclick = toggleMode;
  $('btnSub').onclick = cycleSub;
  $('btnRestart').onclick = restart;
  $('btnScript').onclick = () => {
    if (state.mode === 'gate') return;
    const ch = CHAPTERS[state.ci];
    const label = ch.id === 'open' ? '片头' : ch.id;
    $('scriptTitle').textContent = label + ' · ' + ch.title;
    $('scriptLines').innerHTML = ch.lines.map((l, i) => `<li><button type="button" data-li="${i}">${esc(l.zh)}</button></li>`).join('');
    $('scriptOv').classList.remove('hide');
    if (state.playing) pause();
  };
  $('scriptClose').onclick = () => $('scriptOv').classList.add('hide');
  $('scriptLines').onclick = e => {
    const b = e.target.closest('button');
    if (!b) return;
    $('scriptOv').classList.add('hide');
    go(state.ci, +b.dataset.li);
  };
  $('btnTts').onclick = () => {
    if (!window.speechSynthesis) return;
    state.tts = !state.tts;
    if (state.playing && state.mode === 'auto') { stopSpeech(); clearTimeout(state.timer); schedule(); }
    else stopSpeech();
    renderChrome();
  };
  if (!window.speechSynthesis) { $('btnTts').disabled = true; $('btnTts').textContent = '本机朗读不可用'; }
  $('forget').addEventListener('change', e => { state.forget = e.target.checked; state.seenTouched = true; renderSeen(); });
  $('layers').onclick = e => {
    const b = e.target.closest('button');
    if (!b) return;
    if (state.miss.has(b.dataset.id)) state.miss.delete(b.dataset.id);
    else state.miss.add(b.dataset.id);
    renderLayers();
  };
  $('forms').innerHTML = Object.entries(FORMS).map(([id, f]) => `<button type="button" data-f="${id}">${f.name}</button>`).join('');
  $('forms').onclick = e => {
    const b = e.target.closest('button');
    if (!b) return;
    state.form = b.dataset.f;
    state.formTouched = true;
    renderForm();
  };
  $('ctxShared').onclick = () => { state.ctx = 'shared'; state.ctxTouched = true; renderReviews(); };
  $('ctxIndep').onclick = () => { state.ctx = 'indep'; state.ctxTouched = true; renderReviews(); };
  $('quads').onclick = e => {
    const b = e.target.closest('button');
    if (!b) return;
    state.quad = b.dataset.id;
    state.quadTouched = true;
    renderQuads();
  };
  $('failRows').onclick = e => {
    const tr = e.target.closest('tr');
    if (!tr) return;
    state.failTouched = true;
    state.failOpen = state.failOpen === tr.dataset.id ? null : tr.dataset.id;
    renderFails();
    markBeats();
  };
  $('pipe').onclick = e => {
    const b = e.target.closest('button');
    if (!b) return;
    const edge = EDGES.find(x => x.id === b.dataset.edge);
    if (edge.variable) {
      const bothCut = state.cuts.has('src-repo') && state.cuts.has('repo-price');
      $('clockNote').textContent = '这条箭头上传的是「' + edge.variable + '」。说得出来，就留着。' + (bothCut ? '两条空箭头已经剪掉，墙钟仍是举例里的 17 分钟。' : '');
      return;
    }
    if (state.cuts.has(edge.id)) state.cuts.delete(edge.id);
    else state.cuts.add(edge.id);
    renderPipe();
  };
  $('th').addEventListener('input', renderLanes);
  $('quiz').onclick = e => { const b = e.target.closest('button[data-i]'); if (b) answerQuiz(b); };
  document.body.addEventListener('click', e => {
    const a = e.target.closest('[data-jump]');
    if (!a) return;
    e.preventDefault();
    const ci = CHAPTERS.findIndex(c => c.id === a.dataset.jump);
    if (ci < 0) return;
    if (state.mode === 'gate') start('self');
    else if (state.playing) pause();
    go(ci, 0);
  });
  document.addEventListener('keydown', e => {
    if (e.target.matches('input, textarea, select')) return;
    const k = e.key;
    if (k === ' ' || k === 'Spacebar') {
      e.preventDefault();
      if (state.mode === 'gate') return;
      if (state.done) { restart(); return; }
      if (state.mode === 'self') { step(1); return; }
      if (state.playing) pause(); else resume();
    } else if (k === 'ArrowRight') { e.preventDefault(); if (state.mode === 'gate') start('self'); step(1); }
    else if (k === 'ArrowLeft') { e.preventDefault(); if (state.mode === 'gate') start('self'); step(-1); }
    else if (k === 'p' || k === 'P') { e.preventDefault(); toggleMode(); }
    else if (k === 's' || k === 'S') { e.preventDefault(); cycleSub(); }
    else if (k === 'Enter' && state.mode === 'gate') { e.preventDefault(); start('auto'); }
  });
}
function init() {
  bindSort('evTray', 'evBins', EVIDENCE, EBINS, 'ev', 'evScore');
  bindSort('taskTray', 'taskBins', TASKS, TBINS, 'tasks', 'taskScore');
  renderLayers();
  renderQuiz();
  bind();
  renderSeen();
  renderForm();
  renderReviews();
  renderQuads();
  renderPipe();
  renderFails();
  renderLanes();
  renderChrome();
  markBeats();
  const q = new URLSearchParams(location.search);
  const ch = q.get('ch');
  if (ch) {
    const ci = CHAPTERS.findIndex(c => c.id === ch);
    if (ci >= 0) { state.ci = ci; start(q.get('mode') === 'auto' ? 'auto' : 'self'); }
  }
}
init();

})();
