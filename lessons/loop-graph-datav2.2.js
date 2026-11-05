/* Loop 与 Graph v2.2 lesson script (built by build-datav2.2.py from v2.1). Chapters -> beats (one view each) -> lines.
   v2.2: course analogies switched from football to fracture surgery; structure, beats and Hoodie images unchanged.
   Changed lines voiced zh-CN-YunyangNeural -5% under media/loop-graph-audio/v22/. */
window.LG_DATA = {
 "version": "2.2",
 "voice": "zh-CN-YunyangNeural",
 "rate": "-5%",
 "chapters": [
  {
   "id": "open",
   "no": "00",
   "title": "只签最后一步",
   "kicker": "COLD OPEN",
   "beats": [
    {
     "v": "story",
     "lines": [
      {
       "b": "s1",
       "zh": "2026 年 5 月，Bun 团队让一群 AI 代理，把整个项目从 Zig 改写成 Rust。",
       "en": "May 2026: the Bun team let a crowd of AI agents rewrite the whole project from Zig to Rust.",
       "au": "v21/story-1"
      },
      {
       "b": "s2",
       "zh": "代理连跑了 11 天，写出约 75 万行代码。没有人读得完。",
       "en": "The agents ran for 11 days and wrote about 750,000 lines. Nobody could read it all.",
       "au": "v21/story-2"
      },
      {
       "b": "s3",
       "zh": "最后决定敢不敢合并的，只有一个数：99.8%——原有的测试，照样通过。",
       "en": "What decided the merge was one number: 99.8 percent. The existing tests still passed.",
       "au": "v21/story-3"
      }
     ]
    },
    {
     "v": "coldopen",
     "lines": [
      {
       "b": "in",
       "zh": "你的 AI 智能体已经能连干几个小时，可你还是盯着它的每一步。",
       "en": "Your AI agent can already work for hours. You are still watching every step.",
       "au": "open/000"
      },
      {
       "b": "title",
       "zh": "这节课讲清楚：怎么从盯每一步，变成只在最后一步签字。",
       "en": "This lesson shows how to go from watching every step to signing only the last one.",
       "au": "v22/open-title"
      },
      {
       "b": "words",
       "zh": "两个关键词：Loop，循环；Graph，图。",
       "en": "Two words: Loop, and Graph.",
       "au": "open/002"
      }
     ]
    },
    {
     "v": "trio",
     "lines": [
      {
       "b": "why",
       "zh": "为什么几千次代理运行能被信任？因为每一次的终点，都有个能说「不」的检查。",
       "en": "Why trust thousands of agent runs? Because every run ended with a check that could say no.",
       "au": "open/010"
      },
      {
       "b": "two",
       "zh": "而且活被切成了互不等待的小块。前者叫 loop，后者叫 graph。",
       "en": "And the work was cut into pieces that do not wait on each other. The first is loop. The second is graph.",
       "au": "open/011"
      },
      {
       "b": "loop",
       "zh": "这节课用骨折手术打比方：loop 像复位之后的术中透视，不达标就再调，直到片子过关。",
       "en": "Our analogy is fracture surgery: a loop is the intraoperative fluoroscopy after reduction. If it is not acceptable, adjust again until the image passes.",
       "au": "v22/open-loop"
      },
      {
       "b": "graph",
       "zh": "graph 像整台手术的流程和分工：麻醉、备血、影像、器械，哪些能同时准备，哪一步必须等齐。",
       "en": "A graph is the flow and division of labour of the whole operation: anaesthesia, blood, imaging, instruments; what can be prepared in parallel, and which step must wait for all.",
       "au": "v22/open-graph"
      },
      {
       "b": "gate",
       "zh": "闸门像最终固定前的那次确认：不可逆的那一步，必须由主刀签字。",
       "en": "A gate is the confirmation before final fixation: the irreversible step must be signed by the operating surgeon.",
       "au": "v22/open-gate"
      }
     ]
    },
    {
     "v": "orig-a01",
     "lines": [
      {
       "b": "img",
       "zh": "原文开头就是这张图：两样东西能让你离开椅子，可多数人只做了一样。",
       "en": "The original opens with this picture: two things get you out of the chair, and most people build only one.",
       "au": "v21/orig-a01"
      }
     ]
    }
   ]
  },
  {
   "id": "01",
   "no": "01",
   "title": "少一层，就多一次你亲自上台",
   "kicker": "THREE LAYERS",
   "beats": [
    {
     "v": "layers",
     "lines": [
      {
       "b": "in",
       "zh": "先看三层：harness、loop、graph。",
       "en": "Start with three layers: harness, loop, graph.",
       "au": "01/000"
      },
      {
       "b": "h",
       "zh": "harness 像手术授权和器械台：管它能碰什么、能用什么。",
       "en": "The harness is like surgical privileges and the instrument table: it governs what it may touch and use.",
       "au": "v22/01-h"
      },
      {
       "b": "l",
       "zh": "loop 管这一步做对了没有，就像复位后的那张透视片。",
       "en": "The loop checks whether this step is right, like the fluoroscopy image after reduction.",
       "au": "v22/01-l"
      },
      {
       "b": "g",
       "zh": "graph 管有哪些岗位、按什么顺序、在哪一步由谁签字。",
       "en": "The graph decides which roles exist, in what order, and who signs at which step.",
       "au": "v22/01-g"
      },
      {
       "b": "cost",
       "zh": "少一层，就多一次你亲自上台。",
       "en": "Every missing layer is one more time you have to scrub in yourself.",
       "au": "v22/01-cost"
      },
      {
       "b": "nolg",
       "zh": "没有 harness，你得一直点允许；没有 loop，你要读每一份输出；没有 graph，你要批准每一步。",
       "en": "No harness, and you keep clicking allow. No loop, and you read every output. No graph, and you approve every step.",
       "au": "01/005"
      },
      {
       "b": "quote",
       "zh": "作者原话是：loop 让一块工作在没有你的情况下也能做对；graph 决定有哪些块、什么顺序、在哪里由人签字。",
       "en": "In the author's words: a loop lets one piece of work come out right without you; a graph decides the pieces, the order, and where a person signs.",
       "au": "01/006"
      },
      {
       "b": "most",
       "zh": "多数人只做了第一个，跳过了第二个，所以只能坐着批准每一步。",
       "en": "Most people build only the first and skip the second, so they sit there approving every step.",
       "au": "01/007"
      }
     ]
    },
    {
     "v": "orig-a10",
     "lines": [
      {
       "b": "img",
       "zh": "原文这张图更直白：少掉的每一层，都会变成你手上的一份活。",
       "en": "The original puts it bluntly: every missing layer becomes a job you do by hand.",
       "au": "v21/orig-a10"
      }
     ]
    }
   ]
  },
  {
   "id": "02",
   "no": "02",
   "title": "透视要能叫停",
   "kicker": "THE CHECK",
   "beats": [
    {
     "v": "ladder",
     "lines": [
      {
       "b": "in",
       "zh": "常见做法：让第二个模型去读第一个模型的输出。",
       "en": "The usual move is to have a second model read the first model's output.",
       "au": "02/000"
      },
      {
       "b": "friend",
       "zh": "作者说，这像自己批改作业，再叫个朋友看看。感觉像审查，其实抓不到多少错。",
       "en": "The author says that is like grading your own homework, then asking a friend to glance at it. It feels like review. It catches little.",
       "au": "02/001"
      },
      {
       "b": "real",
       "zh": "真正的检查，是程序能判它失败的检查。",
       "en": "A real check is one a program can fail.",
       "au": "02/002"
      },
      {
       "b": "whistle",
       "zh": "就像复位后的术中透视：对线、对位不达标，关节面台阶超过 2 毫米，就不能往下固定。",
       "en": "Like intraoperative fluoroscopy after reduction: if alignment and apposition are off, or the articular step-off exceeds 2 mm, you do not go on to fix it.",
       "au": "v22/02-whistle"
      },
      {
       "b": "bun",
       "zh": "Bun 的测试集早在代理动手之前就有了，所以没人需要读每一份改动。",
       "en": "Bun's test suite existed before the agents started, so nobody had to read every diff.",
       "au": "02/004"
      },
      {
       "b": "ev",
       "zh": "作者把证据分成四级，从强到弱。",
       "en": "The author sorts evidence into four grades, strong to weak.",
       "au": "02/005"
      },
      {
       "b": "strong",
       "zh": "最强 strong：测试返回 0，输出符合格式，改动没超出计划。",
       "en": "Strong: the test returns 0, the output matches the format, the change stays inside the plan.",
       "au": "02/006"
      },
      {
       "b": "medium",
       "zh": "中等 medium：引用的来源真的支持结论，另一条独立路径得到同一个答案。",
       "en": "Medium: the cited source really supports the claim, or an independent path reaches the same answer.",
       "au": "02/007"
      },
      {
       "b": "weak",
       "zh": "弱 weak：评审代理说通过。噪音 noise：「看着不错」、模型说很有把握、没有报错。",
       "en": "Weak: a reviewer agent says pass. Noise: looks fine, the model says it is confident, there is no error.",
       "au": "02/008"
      },
      {
       "b": "try",
       "zh": "只有最上面这一级，才够格放行。放到骨折上：透视达标是强证据；另一位医生独立阅片得出同样结论，是中等；助手说看着可以，是弱；病人没喊疼，只是噪音。",
       "en": "Only the top rung is strong enough to let work through. In fracture terms: acceptable fluoroscopy is strong; a second surgeon reading the films independently and agreeing is medium; an assistant saying it looks fine is weak; the patient not complaining is just noise.",
       "au": "v22/02-try"
      }
     ]
    },
    {
     "v": "orig-a02",
     "lines": [
      {
       "b": "img",
       "zh": "原文把它画成一把尺：过了虚线才够格合并。Bun 那个 99.8%，量的正是测试。",
       "en": "The original draws it as a ruler: only evidence past the line can merge. Bun's 99.8 percent measured exactly that: tests.",
       "au": "v21/orig-a02"
      }
     ]
    },
    {
     "v": "silence",
     "lines": [
      {
       "b": "silence",
       "zh": "最后一条最扎心：没有报错。",
       "en": "The last one stings: no error was reported.",
       "au": "02/010"
      },
      {
       "b": "empty",
       "zh": "空的错误日志，只说明没人报告，不说明没出错。就像病人没喊疼，不等于复位到位。",
       "en": "An empty error log only says nobody reported anything, not that nothing went wrong. A patient who is not complaining does not mean the reduction is acceptable.",
       "au": "v22/02-empty"
      },
      {
       "b": "loop",
       "zh": "把沉默当成功的 loop，会把同一个错重复到预算用完，日志还一行比一行干净。",
       "en": "A loop that treats silence as success repeats the same mistake until the budget is gone, and the log only gets cleaner.",
       "au": "02/012"
      },
      {
       "b": "rule",
       "zh": "所以，先写检查，再写任务。就像术前先定好复位标准和手术计划，再上台。",
       "en": "So write the check first, then the task. Like setting the reduction criteria and the surgical plan before you scrub in.",
       "au": "v22/02-rule"
      }
     ]
    }
   ]
  },
  {
   "id": "03",
   "no": "03",
   "title": "两轮没有新发现就收工",
   "kicker": "STOP CONDITION",
   "beats": [
    {
     "v": "stop",
     "lines": [
      {
       "b": "in",
       "zh": "「一直做到满意为止」没有终点，代理很乐意再打磨一小时。",
       "en": "Keep going until it feels done has no end. The agent is happy to polish for another hour.",
       "au": "03/000"
      },
      {
       "b": "count",
       "zh": "作者的办法是数东西：每一轮有几个新发现，去掉以前见过的。",
       "en": "The author's method is to count: how many new findings each round, minus what you have already seen.",
       "au": "03/001"
      },
      {
       "b": "run",
       "zh": "连续两轮没有新发现，就停。我们来跑一遍。",
       "en": "Two rounds in a row with nothing new, and you stop. Let's run it.",
       "au": "03/002"
      },
      {
       "b": "seen",
       "zh": "关键在 seen 这个集合：被否掉的发现也要记进去。",
       "en": "The point is the seen set: rejected findings go in there too.",
       "au": "03/003"
      },
      {
       "b": "forget",
       "zh": "现在打开「忘掉已拒绝项」：同样的死胡同每轮都被重新发现，停不下来。",
       "en": "Now turn on forget rejected items: the same dead end is rediscovered every round, and it never stops.",
       "au": "03/004"
      },
      {
       "b": "pay",
       "zh": "最后只能被轮数上限硬切断，而每一轮你都在为旧错付钱。",
       "en": "In the end only the round cap cuts it off, and every round you pay for an old mistake.",
       "au": "03/005"
      }
     ]
    },
    {
     "v": "kit",
     "lines": [
      {
       "b": "five",
       "zh": "每个循环都需要五样东西——五件套。",
       "en": "Every loop needs five things.",
       "au": "03/006"
      },
      {
       "b": "a",
       "zh": "一个说「完成」的测试，一个轮数上限，一份预算。",
       "en": "A test that can say done, a round cap, and a budget.",
       "au": "03/007"
      },
      {
       "b": "b",
       "zh": "对以前尝试的记忆，还有卡住时会被叫醒的那个人。",
       "en": "Memory of earlier tries, and a person who gets woken when it sticks.",
       "au": "03/008"
      },
      {
       "b": "board",
       "zh": "换到手术台上：有复位达标的标准，有复位次数的上限，有止血带时间，记下哪些手法已经失败；两次没有改善，就换方案或呼叫上级。",
       "en": "At the operating table: a standard for acceptable reduction, a cap on reduction attempts, a tourniquet-time budget, a record of manoeuvres that already failed; and if two attempts bring no improvement, change plan or call the senior surgeon.",
       "au": "v22/03-board"
      }
     ]
    },
    {
     "v": "orig-a03",
     "lines": [
      {
       "b": "img",
       "zh": "原文这张图：新发现一轮比一轮少，连续两轮是零，就收工。",
       "en": "The original: new findings shrink each round; two empty rounds in a row, and you stop.",
       "au": "v21/orig-a03"
      }
     ]
    }
   ]
  },
  {
   "id": "04",
   "no": "04",
   "title": "一步复位再漂亮，也撑不起整台手术",
   "kicker": "WHERE LOOPS STOP",
   "beats": [
    {
     "v": "pipeline",
     "lines": [
      {
       "b": "in",
       "zh": "可是 loop 只能把一个步骤做好，就像透视只管这一次复位。",
       "en": "But a loop can only make one step good, the way fluoroscopy only judges this one reduction.",
       "au": "v22/04-in"
      },
      {
       "b": "cant",
       "zh": "它没法告诉你：这一步根本不该存在；五步里有三步本可以同时进行。",
       "en": "It cannot tell you that this step should not exist at all, or that three of the five steps could have run at the same time.",
       "au": "v22/04-cant"
      },
      {
       "b": "green",
       "zh": "于是每一步都通过了，整趟跑下来还是又慢又错。",
       "en": "So every step passed, and the whole drive was still slow and wrong.",
       "au": "04/002"
      },
      {
       "b": "between",
       "zh": "问题不在步骤里面，而在步骤之间。这是 graph 的活。",
       "en": "The problem is not inside the steps. It is between them. That is the graph's job.",
       "au": "04/003"
      }
     ]
    }
   ]
  },
  {
   "id": "05",
   "no": "05",
   "title": "说不出传什么，就删这条边",
   "kicker": "CUT THE ARROWS",
   "beats": [
    {
     "v": "arrows",
     "lines": [
      {
       "b": "in",
       "zh": "节点：一件事、一个输入、一个输出。边：这个节点的输出，是那个节点的输入。",
       "en": "A node: one job, one input, one output. An edge: this node's output is that node's input.",
       "au": "05/000"
      },
      {
       "b": "line",
       "zh": "多数流水线画成一条直线，因为人就是这么写说明的：查资料、看仓库、拉价格、写。",
       "en": "Most pipelines are drawn as a straight line, because that is how people write instructions: look up sources, read the repo, pull prices, write.",
       "au": "05/001"
      },
      {
       "b": "habit",
       "zh": "可拉价格那一步根本不读仓库。顺序来自句子，不是来自工作。",
       "en": "But the price step never reads the repo. The order comes from the sentence, not from the work.",
       "au": "05/002"
      },
      {
       "b": "test",
       "zh": "测试每一条箭头：说出上面传的是哪个变量。说不出来，就删掉。",
       "en": "Test every arrow: name the variable it carries. If you cannot, delete it.",
       "au": "05/003"
      },
      {
       "b": "demo",
       "zh": "看作者的示例：四步按句子顺序串起来，一共 31 分钟。",
       "en": "Here is the author's example: four steps chained in sentence order, 31 minutes in total.",
       "au": "v21/05-demo"
      },
      {
       "b": "cut1",
       "zh": "「资料到仓库」这条箭头上没有变量，删掉。",
       "en": "The arrow from research to repo carries no variable. Cut it.",
       "au": "v21/05-cut1"
      },
      {
       "b": "cut2",
       "zh": "再删「仓库到价格」：三件事同时开工，只剩 17 分钟。",
       "en": "Delete repo to price as well: three jobs start together, and 17 minutes are left.",
       "au": "05/006"
      },
      {
       "b": "save",
       "zh": "没多花一个 token，只是少了没必要的等待。",
       "en": "Not one token less. Just less waiting that was never needed.",
       "au": "05/007"
      },
      {
       "b": "field",
       "zh": "就像术前准备：麻醉评估、备血、影像、器械和内植物，本来就不必排队等彼此，入室到切皮的时间自然就短了。",
       "en": "Like pre-op preparation: anaesthesia assessment, blood, imaging, instruments and implants never needed to queue for each other, so the time from entering the room to incision gets shorter.",
       "au": "v22/05-field"
      },
      {
       "b": "join",
       "zh": "只有下一步真的需要全集的时候才汇合：比如跨来源去重、给所有候选排名。就像切皮前的安全核查，要等每一项都就绪。",
       "en": "Join only when the next step truly needs the full set: deduplicating across sources, ranking all candidates. Like the time-out before incision, which waits until every item is ready.",
       "au": "v22/05-join"
      },
      {
       "b": "fig",
       "zh": "回头看时间轴：同样四步，墙钟时间从 31 分钟降到 17 分钟，少了将近一半。",
       "en": "Look at the timeline again: the same four steps, wall-clock time down from 31 minutes to 17, almost half.",
       "au": "v2/05-fig"
      }
     ]
    },
    {
     "v": "orig-a04",
     "lines": [
      {
       "b": "img",
       "zh": "原文把这件事画成两条时间轴：顺序来自句子，依赖才来自工作。",
       "en": "The original draws it as two timelines: order comes from the sentence; dependency comes from the work.",
       "au": "v21/orig-a04"
      }
     ]
    }
   ]
  },
  {
   "id": "06",
   "no": "06",
   "title": "四行写清一个岗位",
   "kicker": "NODE CONTRACT",
   "beats": [
    {
     "v": "contract",
     "lines": [
      {
       "b": "in",
       "zh": "一个节点如果没法用四行说清楚，你就没法测试它，也没法替换它。",
       "en": "If you cannot say a node in four lines, you cannot test it, and you cannot swap it.",
       "au": "06/000"
      },
      {
       "b": "name",
       "zh": "看作者的例子：节点叫 source researcher，找来源的研究员。",
       "en": "Look at the author's example. The node is called source researcher.",
       "au": "06/001"
      },
      {
       "b": "io",
       "zh": "任务：每个论点找一个一手来源。输入：主题和来源类型。",
       "en": "Task: one primary source per claim. Input: the topic and the source type.",
       "au": "06/002"
      },
      {
       "b": "fail",
       "zh": "输出：论点、链接、原句。失败时报：找不到一手来源。",
       "en": "Output: claim, link, original sentence. On failure, report: no primary source found.",
       "au": "06/003"
      },
      {
       "b": "swap",
       "zh": "合同固定了，换模型、换提示词、换工具，下游都不会坏。就像器械护士这个岗位：输入是手术方案，输出是清点无误的器械和内植物，缺了就报器械缺失，换谁上台都一样。",
       "en": "With the contract fixed, you can swap the model, the prompt or the tool and nothing downstream breaks. Like the scrub nurse role: input, the surgical plan; output, instruments and implants counted and complete; failure reported as missing instruments. Whoever scrubs in, it works the same.",
       "au": "v22/06-swap"
      }
     ]
    },
    {
     "v": "sorter",
     "lines": [
      {
       "b": "ask",
       "zh": "再问每个节点一句：它要判断、决定、评估或总结吗？",
       "en": "Then ask of every node: does it have to judge, decide, evaluate, or summarize?",
       "au": "06/005"
      },
      {
       "b": "model",
       "zh": "要，就用模型：抽取用小模型，综合用强模型。",
       "en": "If yes, use a model. A small one to extract, a strong one to synthesize.",
       "au": "06/006"
      },
      {
       "b": "code",
       "zh": "不要，就写代码：合并、去重、排序、连接记录，都只有一个正确答案。",
       "en": "If no, write code: merge, dedupe, sort, join records. Each has one right answer.",
       "au": "06/007"
      },
      {
       "b": "sort",
       "zh": "交给模型只会更慢、更贵，偶尔还出错。就像纱布器械清点、核对患者身份，靠核查表；复位满不满意、选哪种固定，才需要判断。",
       "en": "Handing those to a model is only slower, costlier, and sometimes wrong. Counting sponges and instruments or verifying patient identity runs on a checklist; whether the reduction is acceptable and which fixation to choose is where judgment belongs.",
       "au": "v22/06-sort"
      }
     ]
    },
    {
     "v": "orig-a05",
     "lines": [
      {
       "b": "img",
       "zh": "原文这张图把两件事放在一起：每个节点签一份合同，再问一句，用模型还是写代码。",
       "en": "The original puts both together: every node signs a contract, then you ask, model or code.",
       "au": "v21/orig-a05"
      }
     ]
    }
   ]
  },
  {
   "id": "07",
   "no": "07",
   "title": "四种形状拼出整台手术",
   "kicker": "FOUR SHAPES",
   "beats": [
    {
     "v": "shapes",
     "lines": [
      {
       "b": "in",
       "zh": "几乎所有流程，都能用四种形状拼出来。",
       "en": "Almost every workflow can be built from four shapes.",
       "au": "07/000"
      },
      {
       "b": "chain",
       "zh": "链：复位、固定、关闭，后一步真吃前一步的输出。",
       "en": "Chain: reduce, fix, close. Each step truly consumes the previous output.",
       "au": "v22/07-chain"
      },
      {
       "b": "fan",
       "zh": "扇出汇合：几名工人各跑一段，再在汇合点对齐。就像多发伤，几个科分头评估，再一起会诊。",
       "en": "Fan-out and join: several workers run their part, then line up at the join. Like polytrauma: several specialties assess in parallel, then meet in one MDT.",
       "au": "v22/07-fan"
      },
      {
       "b": "route",
       "zh": "路由：便宜的分类器把简单任务送进短路，危险任务送进长路。就像分诊：稳定无移位的骨折打石膏，开放或复杂骨折进手术室。",
       "en": "Router: a cheap classifier sends easy tasks down the short path and risky ones down the long path. Like triage: a stable, undisplaced fracture gets a cast; an open or complex fracture goes to theatre.",
       "au": "v22/07-route"
      },
      {
       "b": "cycle",
       "zh": "有界循环：可以再复位一次，但一定有硬上限。",
       "en": "Bounded cycle: you may attempt the reduction again, but there is always a hard cap.",
       "au": "v22/07-cycle"
      }
     ]
    },
    {
     "v": "rooms",
     "lines": [
      {
       "b": "rule",
       "zh": "四种形状共用一条规则：并行的工人，要有各自独立的上下文。",
       "en": "All four shapes share one rule: workers in parallel need their own context.",
       "au": "07/005"
      },
      {
       "b": "shared",
       "zh": "把四个评审放进同一个共享窗口，第一条意见会带偏另外三个。",
       "en": "Put four reviewers in one shared window, and the first opinion pulls the other three off course.",
       "au": "07/006"
      },
      {
       "b": "copy",
       "zh": "你付了四份钱，拿到一份意见，被抄了三遍。",
       "en": "You paid four times and got one opinion, copied three times.",
       "au": "07/007"
      },
      {
       "b": "indep",
       "zh": "切到独立隔间：各看各的，才是真正的四份意见。就像独立阅片，不先看第一个人的报告，才不会被带偏。",
       "en": "Separate rooms: each looks on their own, and you get four real opinions. Like independent film reading: not seeing the first report keeps you from being steered.",
       "au": "v22/07-indep"
      }
     ]
    },
    {
     "v": "orig-a06",
     "lines": [
      {
       "b": "img",
       "zh": "原文把四种形状并排摆好，每一种都写明了适合用在哪、会坏在哪。",
       "en": "The original lays the four shapes side by side, each with where it fits and where it breaks.",
       "au": "v21/orig-a06"
      }
     ]
    }
   ]
  },
  {
   "id": "08",
   "no": "08",
   "title": "纠错在步骤内，调度在步骤间",
   "kicker": "INSIDE / BETWEEN",
   "beats": [
    {
     "v": "zoom",
     "lines": [
      {
       "b": "in",
       "zh": "loop 在步骤内：就像同一个复位步骤里，反复透视、调整，直到片子过关。",
       "en": "The loop lives inside a step: within one reduction, image, adjust, image again, until the film passes.",
       "au": "v22/08-in"
      },
      {
       "b": "graph",
       "zh": "graph 在步骤间：就像整台手术的流程和团队分工，拆分、汇合、退回，谁来签字。",
       "en": "The graph lives between steps: the flow and team roles of the whole operation; split, join, send back, who signs.",
       "au": "v22/08-graph"
      },
      {
       "b": "gonly",
       "zh": "只有 graph 没有 loop：很快产出一大堆没检查过的东西。",
       "en": "Graph without a loop: you quickly get a pile of things nobody checked.",
       "au": "08/002"
      },
      {
       "b": "lonly",
       "zh": "只有 loop 没有 graph：一个很棒的步骤，待在一个设计糟糕的流程里。",
       "en": "Loop without a graph: one excellent step, stuck inside a badly drawn drive.",
       "au": "08/003"
      },
      {
       "b": "both",
       "zh": "两样都要：人做决定，AI 跑路线。",
       "en": "You want both. The person decides. The AI runs the route.",
       "au": "08/004"
      }
     ]
    }
   ]
  },
  {
   "id": "09",
   "no": "09",
   "title": "谁定方案：看频率与撤销成本",
   "kicker": "WHO DRAWS THE GRAPH",
   "beats": [
    {
     "v": "fleet",
     "lines": [
      {
       "b": "in",
       "zh": "今年变化很大：流程图不一定要你手画了。",
       "en": "A lot changed this year: you no longer have to draw the workflow by hand.",
       "au": "v22/09-in"
      },
      {
       "b": "cc",
       "zh": "Claude Code 的动态工作流：模型为每次运行写一个编排脚本。",
       "en": "Claude Code dynamic workflows: the model writes an orchestration script for each run.",
       "au": "09/001"
      },
      {
       "b": "ccnum",
       "zh": "默认最多 16 个代理同时跑，一次运行最多 1,000 个。",
       "en": "By default up to 16 agents run at once, and up to 1,000 per run.",
       "au": "v21/09-ccnum"
      },
      {
       "b": "codex",
       "zh": "Codex 能在配置文件里定义代理角色，每个角色可以用不同的模型。",
       "en": "Codex lets you define agent roles in a config file, each with its own model.",
       "au": "v21/09-codex"
      },
      {
       "b": "lg",
       "zh": "LangGraph 1.0 是另一头：图只写一次，能从检查点重放。",
       "en": "LangGraph 1.0 is the other end: write the graph once, replay it from checkpoints.",
       "au": "v21/09-lg"
      }
     ]
    },
    {
     "v": "quad",
     "lines": [
      {
       "b": "who",
       "zh": "那该谁来画图？看两件事：频率——多久跑一次；撤销成本——出错有多难撤销。",
       "en": "So who draws the graph? Two things: how often it runs, and how hard a mistake is to undo.",
       "au": "09/005"
      },
      {
       "b": "q1",
       "zh": "一次性的重构或审计：让模型生成流程，用完就扔。",
       "en": "A one-off refactor or audit: let the model generate the flow, then throw it away.",
       "au": "09/006"
      },
      {
       "b": "q2",
       "zh": "一次性的生产数据迁移：让模型起草计划，你只读计划。就像罕见的复杂病例，主刀临时定方案，再请人审方案。",
       "en": "A one-off production data migration: let the model draft a plan, and you only read the plan. Like a rare complex case: the surgeon drafts a plan for this patient and has it reviewed.",
       "au": "v22/09-q2"
      },
      {
       "b": "q3",
       "zh": "每周一次、风险低：固定的图放进仓库，让它自己上线。",
       "en": "Weekly, and low risk: a fixed graph in the repo, and it ships itself.",
       "au": "09/008"
      },
      {
       "b": "q4",
       "zh": "每周一次、涉及钱或用户：固定的图，最后一步你签字。就像高风险的常规手术，走固定路径，主刀签最后一步。",
       "en": "Weekly and touching money or users: a pinned graph, and you sign the last step. Like a high-risk routine operation: a fixed pathway, with the surgeon signing the last step.",
       "au": "v22/09-q4"
      },
      {
       "b": "trap",
       "zh": "有个陷阱：每周都让模型从零重新生成流程。",
       "en": "There is a trap: letting the model regenerate the flow from scratch every week.",
       "au": "09/010"
      },
      {
       "b": "loss",
       "zh": "它每次都换一种切法，上一次学到的东西带不过来。",
       "en": "It slices the work differently each time, and what you learned last time does not carry over.",
       "au": "09/011"
      },
      {
       "b": "fix",
       "zh": "把图固定下来，规则才会一周比一周多。就像常规高频的手术，有固定的临床路径。",
       "en": "Pin the graph, and the rules grow week by week. Like routine high-volume operations, which run on a fixed clinical pathway.",
       "au": "v22/09-fix"
      }
     ]
    },
    {
     "v": "orig-a07",
     "lines": [
      {
       "b": "img",
       "zh": "原文用两个问题画出这四格：跑几次，撤销有多难。会重复的，就把图钉住。",
       "en": "The original draws these four boxes from two questions: how often it runs, how hard it is to undo. If it repeats, pin the graph.",
       "au": "v21/orig-a07"
      }
     ]
    }
   ]
  },
  {
   "id": "10",
   "no": "10",
   "title": "只翻修那一枚，别整套重来",
   "kicker": "FAILURE ROUTER",
   "beats": [
    {
     "v": "router",
     "lines": [
      {
       "b": "in",
       "zh": "节点失败了怎么办？要提前定好。",
       "en": "What if a node fails? Decide before it happens.",
       "au": "10/000"
      },
      {
       "b": "retry",
       "zh": "工具或网络抖了一下：重试。模型或来源挂了：换备用。",
       "en": "A tool or the network blips: retry. A model or a source is down: switch to the spare.",
       "au": "10/001"
      },
      {
       "b": "unit",
       "zh": "可选分支失败：跳过。输出没过检查：只修那一个单元。",
       "en": "An optional branch fails: skip it. The output fails the check: repair only that unit.",
       "au": "10/002"
      },
      {
       "b": "escal",
       "zh": "修了三次还不行：上报，说明计划本身错了。",
       "en": "Three repairs still fail: escalate. The plan itself is wrong.",
       "au": "10/003"
      },
      {
       "b": "budget",
       "zh": "碰到预算或权限上限：停下，叫醒一个人。",
       "en": "Hit a budget or permission limit: stop, and wake a person.",
       "au": "v21/10-budget"
      }
     ]
    },
    {
     "v": "sendback",
     "lines": [
      {
       "b": "batch",
       "zh": "代价最大的错误，是整批退回。",
       "en": "The most expensive mistake is sending the whole batch back.",
       "au": "10/005"
      },
      {
       "b": "four",
       "zh": "移植分成四片，一片测试没过，四片全退回去。",
       "en": "The port was split into four slices. One slice failed its test, and all four were sent back.",
       "au": "10/006"
      },
      {
       "b": "rewrite",
       "zh": "三片本来是对的，被重写成新版本，每一版又可能因为新原因失败。",
       "en": "Three slices were already right. They get rewritten, and each new version can fail for a new reason.",
       "au": "10/007"
      },
      {
       "b": "dumb",
       "zh": "流程不再收敛，外面看起来就像模型越来越笨。",
       "en": "The process stops converging. From the outside it looks like the model is getting dumber.",
       "au": "10/008"
      },
      {
       "b": "unitret",
       "zh": "换成只退那一片：带上失败的测试、证据和范围。就像一枚螺钉位置不佳，只翻修这一枚，不拆整套钢板重来。",
       "en": "Instead, send back only that slice, with the failing test, the evidence and the scope. Like one poorly placed screw: revise that screw, do not take down the whole plate.",
       "au": "v22/10-unitret"
      },
      {
       "b": "scope",
       "zh": "范围那一行很重要：「只改这个文件」。就像翻修时写明：只调整这一枚螺钉。",
       "en": "The scope line matters: \"only change this file\". Like writing on the revision plan: adjust this one screw only.",
       "au": "v22/10-scope"
      },
      {
       "b": "scopefail",
       "zh": "没有它，代理会顺手改掉旁边两处，一行的修复变成四个文件的改动。",
       "en": "Without it, the agent tidies two neighbors, and a one-line fix becomes a four-file diff.",
       "au": "10/011"
      },
      {
       "b": "rule",
       "zh": "修好之后，把原因写成规则，留给下次拆活的人。就像术后复盘，写进科室规范。",
       "en": "Once fixed, write the cause down as a rule for whoever splits the work next time. Like a post-op review that becomes a department protocol.",
       "au": "v22/10-rule"
      },
      {
       "b": "ex",
       "zh": "比如：「适配器必须原样保留关键字参数。」这个错就不会再来。",
       "en": "For example: the adapter must keep keyword arguments unchanged. That mistake does not come back.",
       "au": "10/013"
      },
      {
       "b": "end",
       "zh": "几乎没人做这一步，所以多数代理系统很快，却从不进步。",
       "en": "Almost nobody does this step, so most agent systems are fast and never get better.",
       "au": "10/014"
      }
     ]
    },
    {
     "v": "orig-a08",
     "lines": [
      {
       "b": "img",
       "zh": "原文这张图：失败应该是局部的事。退回去的是一张单子，不是整批。",
       "en": "The original: failure should be a local event. You send back one ticket, not the batch.",
       "au": "v21/orig-a08"
      }
     ]
    }
   ]
  },
  {
   "id": "11",
   "no": "11",
   "title": "按撤销难度开三道闸",
   "kicker": "GATES",
   "beats": [
    {
     "v": "gates",
     "lines": [
      {
       "b": "in",
       "zh": "什么时候放行？常见做法是给一个置信度分数，再定一个阈值。",
       "en": "When do you let it through? The usual move is a confidence score and a threshold.",
       "au": "11/000"
      },
      {
       "b": "score",
       "zh": "问题是，置信度恰恰是模型给自己打的分。",
       "en": "The problem: confidence is the score the model gives itself.",
       "au": "11/001"
      },
      {
       "b": "lanes",
       "zh": "改按撤销难度分三条车道。放到骨科：调整石膏随时能改，直接放行；切开复位内固定，要有充分证据；截肢、关节置换这种不可逆的决定，一律由主刀签字。",
       "en": "Instead, three lanes by how hard it is to undo. In orthopaedics: adjusting a cast can be redone any time, so let it through; open reduction and internal fixation needs solid evidence; irreversible decisions like amputation or joint replacement always need the surgeon's signature.",
       "au": "v22/11-lanes"
      },
      {
       "b": "easy",
       "zh": "改文案、加测试、独立函数：错了回滚一次，直接合并。",
       "en": "Copy, added tests, a standalone function: one rollback if it is wrong. Merge.",
       "au": "11/003"
      },
      {
       "b": "mid",
       "zh": "共享工具、改数据结构：先要硬证据。",
       "en": "Shared tools, a data-structure change: hard evidence first.",
       "au": "11/004"
      },
      {
       "b": "hard",
       "zh": "迁移、删除、写生产、付款：不管分数多高，一律关闭。",
       "en": "Migration, deletion, writing production, payment: however high the score, the lane stays closed.",
       "au": "11/005"
      },
      {
       "b": "drag",
       "zh": "阈值一忙起来就会被调低；关闭的车道，没有数字可调。主刀再有信心，也替代不了这道闸。",
       "en": "Thresholds drift down on a busy day. A closed lane has no number to drift. However confident the surgeon is, confidence does not replace this gate.",
       "au": "v22/11-drag"
      },
      {
       "b": "rev",
       "zh": "评审代理有帮助，但它也只是多一个意见。",
       "en": "A reviewer agent helps. It is still just one more opinion.",
       "au": "11/007"
      },
      {
       "b": "order",
       "zh": "看证据要按顺序：先测试，再看这次运行的历史，再看这个节点被回滚过几次。",
       "en": "Read evidence in order: tests first, then this run's history, then how many times this node was rolled back.",
       "au": "11/008"
      },
      {
       "b": "last",
       "zh": "然后才是评审代理，模型自己的说法放最后。",
       "en": "Only then the reviewer agent. What the model says about itself comes last.",
       "au": "11/009"
      },
      {
       "b": "flag",
       "zh": "这就像不可逆操作前的最后确认：全员停下来逐项核对，主刀签了字，才下刀。",
       "en": "This is the final check before an irreversible step: everyone stops and checks item by item, and only after the surgeon signs does the blade go in.",
       "au": "v22/11-flag"
      }
     ]
    },
    {
     "v": "orig-a09",
     "lines": [
      {
       "b": "img",
       "zh": "原文的结论：按撤销成本开闸，不按置信度。人只坐在最右边那一格。",
       "en": "The original's verdict: gate on cost to undo, not on confidence. The person sits only in the far-right box.",
       "au": "v21/orig-a09"
      }
     ]
    }
   ]
  },
  {
   "id": "12",
   "no": "12",
   "title": "你只做一个决定",
   "kicker": "ONE DECISION",
   "beats": [
    {
     "v": "finale",
     "lines": [
      {
       "b": "in",
       "zh": "先建检查，再建图，再建写规则的那一步。",
       "en": "Build the checks first, then the graph, then the step that writes the rule down.",
       "au": "12/000"
      },
      {
       "b": "one",
       "zh": "剩给你的，是每次运行一个决定，就在错误无法撤销的那个点上。就像最终固定、关闭切口前的那次确认。",
       "en": "What is left for you is one decision per run, at the point where a mistake cannot be undone. Like the confirmation before final fixation and wound closure.",
       "au": "v22/12-one"
      },
      {
       "b": "acts",
       "zh": "批准合并、选哪些修复上线、签下迁移。之前的一切都不需要你，而且会自己抓错。",
       "en": "Approve the merge, choose which fixes ship, sign the migration. Everything before that does not need you, and it catches its own mistakes.",
       "au": "12/002"
      }
     ]
    },
    {
     "v": "takeaway",
     "lines": [
      {
       "b": "take",
       "zh": "带走五句话。",
       "en": "Five lines to take with you.",
       "au": "12/003"
      },
      {
       "b": "t1",
       "zh": "一，检查要能失败：程序能判错的才算数。",
       "en": "One. A check has to be able to fail. Only what a program can judge counts.",
       "au": "12/004"
      },
      {
       "b": "t2",
       "zh": "二，数着东西停：两轮没有新发现就停，被拒的也要记住。",
       "en": "Two. Count, then stop. Two rounds with nothing new, and stop. Remember what was rejected.",
       "au": "12/005"
      },
      {
       "b": "t3",
       "zh": "三，测试每条箭头：说不出传什么变量，就删掉。",
       "en": "Three. Test every arrow. If you cannot name the variable, delete it.",
       "au": "12/006"
      },
      {
       "b": "t4",
       "zh": "四，失败只退那一个单元，再把原因写成规则。",
       "en": "Four. On failure, send back only that unit, then write the cause as a rule.",
       "au": "12/007"
      },
      {
       "b": "t5",
       "zh": "五，按撤销难度开闸，不可逆的那一步由人签字。",
       "en": "Five. Open the gate by undo cost. A person signs the irreversible step.",
       "au": "12/008"
      }
     ]
    }
   ]
  },
  {
   "id": "quiz",
   "no": "13",
   "title": "术后复盘与作业",
   "kicker": "DEBRIEF · HOMEWORK",
   "beats": [
    {
     "v": "quiz",
     "lines": [
      {
       "b": "quiz",
       "zh": "术后复盘：三张关键片子，看你还认不认得。",
       "en": "Post-op review: three key films. See if you still recognize them.",
       "au": "v22/quiz-in"
      },
      {
       "b": "back",
       "zh": "哪张没认出来，点「回看」，直接回到那一章。",
       "en": "Missed one? Tap \"Review\" to jump straight back to that chapter.",
       "au": "v22/quiz-back"
      }
     ]
    },
    {
     "v": "homework",
     "lines": [
      {
       "b": "hw",
       "zh": "课后作业：挑一个你每周都在跑的 AI 流程。",
       "en": "Homework: pick one AI workflow you run every week.",
       "au": "v2/hw-in"
      },
      {
       "b": "h1",
       "zh": "第一，给它的终点写一个程序能判失败的检查。",
       "en": "One: give its end a check that a program can fail.",
       "au": "v2/hw-1"
      },
      {
       "b": "h2",
       "zh": "第二，把流程画成图，给每条箭头写上变量名，说不出的就删掉。",
       "en": "Two: draw it as a graph, name the variable on every arrow, and delete the ones you cannot name.",
       "au": "v2/hw-2"
      },
      {
       "b": "h3",
       "zh": "第三，标出撤销成本最高的那一步，只在那里签字。",
       "en": "Three: mark the step that is hardest to undo, and sign only there.",
       "au": "v2/hw-3"
      }
     ]
    }
   ]
  },
  {
   "id": "src",
   "no": "14",
   "title": "来源与核对",
   "kicker": "SOURCES",
   "beats": [
    {
     "v": "sources",
     "lines": [
      {
       "b": "src1",
       "zh": "来源与勘误：Bun 行数有两种口径——约 75 万行 Rust 来自 Anthropic；535,496 行是原 Zig 代码。",
       "en": "Sources and corrections: Bun's line counts come in two figures. About 750,000 lines of Rust from Anthropic. 535,496 is the original Zig.",
       "au": "12/011"
      },
      {
       "b": "src2",
       "zh": "31 到 17 分钟是作者举例，不是实测；Codex 沙箱和 LangGraph 年份按官方文档更正。",
       "en": "31 to 17 minutes is the author's example, not a measurement. The Codex sandbox and the LangGraph year were corrected against the official docs.",
       "au": "12/012"
      },
      {
       "b": "src3",
       "zh": "原文：Hoodie，@HoodieFade_，2026 年 11 月 4 日发在 X 上。关键数字已对照 Bun 和 Anthropic 的官方文章核对。",
       "en": "Original piece: Hoodie, @HoodieFade_, posted on X on 4 November 2026. Key numbers were checked against the official Bun and Anthropic posts.",
       "au": "v2/src-3"
      },
      {
       "b": "close",
       "zh": "记住：人之所以只在最后一步签字，是因为前面每一步都能自己说「不」。",
       "en": "Remember: a person signs only the last step because every step before it can say no on its own.",
       "au": "v22/close"
      }
     ]
    }
   ]
  }
 ],
 "quiz": [
  {
   "ch": "02",
   "q": "下面哪一种，才算能叫停的检查？",
   "opts": [
    "评审代理说看着不错",
    "测试返回 0，而且改动没超出计划",
    "模型说很有把握",
    "错误日志是空的"
   ],
   "a": 1,
   "why": "程序能判它失败，这一步才不能往下走，就像透视不达标就不往下固定。「看着不错」、自信、空日志都叫不停。"
  },
  {
   "ch": "05",
   "q": "一条箭头什么时候该删？",
   "opts": [
    "它让流程图看起来整齐",
    "说不出上面传的是哪个变量",
    "它指向最后写作那一步",
    "它比较短"
   ],
   "a": 1,
   "why": "边的意思是：这个节点的输出，是那个节点的输入。说不出变量，顺序就只是句子习惯。"
  },
  {
   "ch": "11",
   "q": "迁移、删除、写生产、付款，模型自评 0.99 时怎么走？",
   "opts": [
    "超过阈值就自动合并",
    "车道关闭，没有数字可调，人来签字",
    "交给评审代理拍板",
    "再让模型确认一次"
   ],
   "a": 1,
   "why": "按撤销难度开闸。关闭的车道不接受分数，也不接受自评。"
  }
 ],
 "source": {
  "author": "Hoodie",
  "handle": "@HoodieFade_",
  "date": "2026-11-04",
  "url": "https://x.com/HoodieFade_/status/2117959235690524883",
  "title": "Loops & Graphs: how to stop being the slowest node in your agent system and approve only one step"
 },
 "origImages": {
  "a01": {
   "big": "两样东西让你离开椅子",
   "small": "多数人只做了一样",
   "ch": "open"
  },
  "a10": {
   "big": "少一层，多一份手工活",
   "small": "最上面两层，才把时间还给你",
   "ch": "01"
  },
  "a02": {
   "big": "先给证据排座次",
   "small": "过了虚线，才够格合并",
   "ch": "02"
  },
  "a03": {
   "big": "两轮空手，就收工",
   "small": "被否掉的，也要记住",
   "ch": "03"
  },
  "a04": {
   "big": "顺序不等于依赖",
   "small": "同样四步，墙钟时间少了将近一半",
   "ch": "05"
  },
  "a05": {
   "big": "每个节点签一份合同",
   "small": "换模型、换提示词，下游不动",
   "ch": "06"
  },
  "a06": {
   "big": "四种形状拼出整个流程",
   "small": "每一种都有它会坏的地方",
   "ch": "07"
  },
  "a07": {
   "big": "会重复的，就把图钉住",
   "small": "你只读计划，或者只签最后一步",
   "ch": "09"
  },
  "a08": {
   "big": "失败是局部的事",
   "small": "退一张单子，不是整批",
   "ch": "10"
  },
  "a09": {
   "big": "按撤销成本开闸",
   "small": "不按置信度",
   "ch": "11"
  }
 },
 "origCredit": "原文图 · Hoodie @HoodieFade_",
 "analogy": "骨折手术"
};
