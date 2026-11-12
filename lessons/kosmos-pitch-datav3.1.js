/* aiai · Kosmos-lite 科主任讲解课 — 讲稿数据。演示章节为示意，数据虚构。 */
window.LG_DATA = {
 "version": "3.1",
 "music": false,
 "cardWait": true,
 "lesson": "kosmos-lite-pitch-chiefs",
 "voice": "zh-CN-YunyangNeural",
 "rate": "-5%",
 "audioBase": "media/kosmos-pitch-audio/",
 "chapters": [
  {
   "id": "open",
   "no": "00",
   "title": "选题，不再靠拍脑袋",
   "kicker": "FOR DEPARTMENT CHIEFS",
   "beats": [
    {
     "v": "cover",
     "lines": [
      {
       "b": "c1",
       "zh": "科主任您好。今天想用三十分钟，聊一件每个科室都绕不开的事：科研选题。",
       "en": "Hello, Chief. In thirty minutes, one thing no department can avoid: choosing research topics.",
       "au": "v3/open-cover-c1"
      },
      {
       "b": "c2",
       "zh": "选题定得好，后面的标书、实验、论文都顺；选题定得急，代价往往在几个月后才出现。",
       "en": "A good topic makes the grant, the experiments and the paper flow; a rushed one shows its cost months later.",
       "au": "v3/open-cover-c2"
      },
      {
       "b": "c3",
       "zh": "所以今天的题目是：选题，不再靠拍脑袋。",
       "en": "So today's title: topic selection, no longer by gut feeling.",
       "au": "v3/open-cover-c3"
      },
      {
       "b": "c4",
       "zh": "我们想做的，是让每个课题在湿实验之前，先做一次“术前评估”。",
       "en": "What we want: every project gets a \"pre-operative assessment\" before any wet-lab work.",
       "au": "v3/open-cover-c4"
      },
      {
       "b": "c5",
       "zh": "就像手术前要看影像、查化验、开术前讨论，课题在花钱之前，也值得先查一遍。",
       "en": "Just as surgery starts with imaging, labs and a case conference, a project deserves a check before money is spent.",
       "au": "v3/open-cover-c5"
      },
      {
       "b": "c6",
       "zh": "我介绍的是一套科研工作流，叫 Kosmos-lite。一句话：AI 跑腿，人只签关键几步，每一步留痕、可核查。",
       "en": "The workflow is called Kosmos-lite. In one line: AI does the legwork, people sign only the key steps, every step leaves an auditable trail.",
       "au": "v3/open-cover-c6"
      },
      {
       "b": "c7",
       "zh": "接下来先算三笔账，再讲它怎么让选题变轻松，再讲它不做什么，最后讲怎么合作。",
       "en": "First three ledgers, then how it makes topic selection easier, what it will not do, and how we can work together.",
       "au": "v3/open-cover-c7"
      },
      {
       "b": "c8",
       "zh": "讲完之后，只请您做一个决定。",
       "en": "At the end, I ask you for just one decision.",
       "au": "v3/open-cover-c8"
      }
     ]
    }
   ]
  },
  {
   "id": "ledger",
   "no": "01",
   "title": "科主任的三笔账",
   "kicker": "THREE LEDGERS",
   "beats": [
    {
     "v": "ledger",
     "lines": [
      {
       "b": "a1",
       "zh": "先替科主任算三笔账。",
       "en": "Let us first do three sets of accounts for a department chief.",
       "au": "v3/ledger-ledger-a1"
      },
      {
       "b": "t1",
       "zh": "第一笔是时间账。临床任务重，门诊、手术、值班一排满，科研只能塞进碎片时间。",
       "en": "One: time. Clinics, surgery and night shifts fill the week; research gets squeezed into fragments.",
       "au": "v3/ledger-ledger-t1"
      },
      {
       "b": "t2",
       "zh": "碎片时间最怕的就是“重新开始”：上周查到哪了，这篇文献读过没有，结论记在哪里。",
       "en": "Fragments hate restarting: where did I stop last week, have I read this paper, where did I write the conclusion?",
       "au": "v3/ledger-ledger-t2"
      },
      {
       "b": "t3",
       "zh": "更难的是，查文献、看数据这些跑腿的事，占掉了本该用来思考和判断的时间。",
       "en": "Worse, legwork like searching papers and checking data eats the time meant for thinking and judgement.",
       "au": "v3/ledger-ledger-t3"
      },
      {
       "b": "m1",
       "zh": "第二笔是钱账。试剂、动物、测序，每一项都要从有限的经费里出。",
       "en": "Two: money. Reagents, animals, sequencing: each comes out of a limited budget.",
       "au": "v3/ledger-ledger-m1"
      },
      {
       "b": "m2",
       "zh": "而湿实验有个特点：方向一旦错了，前面花的钱基本收不回来。",
       "en": "And wet-lab work has one trait: once the direction is wrong, the money spent is mostly gone.",
       "au": "v3/ledger-ledger-m2"
      },
      {
       "b": "m3",
       "zh": "很多时候不是实验做得不好，而是课题在立项那一刻，就少问了几个问题。",
       "en": "Often the experiments were fine; the project simply skipped a few questions on the day it was approved.",
       "au": "v3/ledger-ledger-m3"
      },
      {
       "b": "m4",
       "zh": "比如：这个关联在公开数据里看得到吗？最便宜的验证是哪一步？对照设好了吗？",
       "en": "Such as: can this association be seen in public data? Which validation step is cheapest? Are the controls in place?",
       "au": "v3/ledger-ledger-m4"
      },
      {
       "b": "p1",
       "zh": "第三笔是人账。研究生和青年医生的选题，很多时候靠导师的经验和直觉。",
       "en": "Three: people. Topics for graduate students and young doctors often rest on the supervisor's experience and intuition.",
       "au": "v3/ledger-ledger-p1"
      },
      {
       "b": "p2",
       "zh": "经验很宝贵，但导师的时间有限，没法每个课题都从头陪着查。",
       "en": "Experience is precious, but a supervisor's time is limited; nobody can check every topic from scratch.",
       "au": "v3/ledger-ledger-p2"
      },
      {
       "b": "p3",
       "zh": "结果是，有的课题做到一半，才发现别人已经发表了相近的工作，撞车了，前面的投入很难再用上。",
       "en": "So some projects find, halfway through, that someone has already published similar work: a collision, and the effort so far is hard to reuse.",
       "au": "v3/ledger-ledger-p3"
      },
      {
       "b": "p4",
       "zh": "有的课题写进标书，评审意见是：创新性不足，立项依据不充分。",
       "en": "Some go into a grant and come back with: insufficient novelty, weak rationale.",
       "au": "v3/ledger-ledger-p4"
      },
      {
       "b": "p5",
       "zh": "还有的是，学生毕业走了，课题的来龙去脉也跟着走了，下一届接不上。",
       "en": "And when a student graduates, the history of the project leaves too, and the next cohort cannot pick it up.",
       "au": "v3/ledger-ledger-p5"
      },
      {
       "b": "s1",
       "zh": "这三笔账，单看都不陌生，难的是没有一个统一、省力的办法去管。",
       "en": "None of these is new. What is missing is one consistent, low-effort way to manage them.",
       "au": "v3/ledger-ledger-s1"
      },
      {
       "b": "s2",
       "zh": "我们今天要讲的，就是这样一个办法。",
       "en": "That way is what we are presenting today.",
       "au": "v3/ledger-ledger-s2"
      }
     ]
    }
   ]
  },
  {
   "id": "hard",
   "no": "02",
   "title": "选题为什么难",
   "kicker": "WHY IT IS HARD",
   "beats": [
    {
     "v": "hard",
     "lines": [
      {
       "b": "h0",
       "zh": "先说说，选题为什么难。我们看到的难点主要有四个。",
       "en": "Why is choosing a topic hard? We see four main obstacles.",
       "au": "v3/hard-hard-h0"
      },
      {
       "b": "h1",
       "zh": "第一，文献太多，读不完。一个方向搜下去，结果往往多到一个人根本读不过来。",
       "en": "One: too much literature. Search a direction and the results are often far more than one person can read.",
       "au": "v3/hard-hard-h1"
      },
      {
       "b": "h2",
       "zh": "于是我们只能读最前面的几篇，或者熟人推荐的几篇，难免漏掉关键的那一篇。",
       "en": "So we read the top few, or the ones a colleague recommends, and can miss the one that matters.",
       "au": "v3/hard-hard-h2"
      },
      {
       "b": "h3",
       "zh": "第二，撞车很难查。换个说法、换个物种、换个数据库，结果都可能不一样。",
       "en": "Two: collisions are hard to check. Change the wording, the species or the database, and the results may differ.",
       "au": "v3/hard-hard-h3"
      },
      {
       "b": "h4",
       "zh": "一次随手检索没有结果，不等于真的没人做过，也可能只是没找对地方。",
       "en": "One quick search with no hits does not mean nobody has done it; it may just have looked in the wrong place.",
       "au": "v3/hard-hard-h4"
      },
      {
       "b": "h5",
       "zh": "第三，公开数据没人系统挖。大量公开的组学和队列数据就在那里，可以免费下载。",
       "en": "Three: public data goes unmined. Public omics and cohort data sit there, free to download.",
       "au": "v3/hard-hard-h5"
      },
      {
       "b": "h6",
       "zh": "但下载、整理、分析需要时间和技能，临床科室往往没有人专门做这件事。",
       "en": "But downloading, cleaning and analysing take time and skill, and clinical departments rarely have someone for it.",
       "au": "v3/hard-hard-h6"
      },
      {
       "b": "h7",
       "zh": "所以很多想法，本来可以先在公开数据里看一眼，却直接跳到了湿实验。",
       "en": "So many ideas that could first be checked in public data jump straight to the wet lab.",
       "au": "v3/hard-hard-h7"
      },
      {
       "b": "h8",
       "zh": "第四，从想法到实验之间，缺一座桥。",
       "en": "Four: there is no bridge between an idea and an experiment.",
       "au": "v3/hard-hard-h8"
      },
      {
       "b": "h9",
       "zh": "想法写在本子上，实验写在 SOP 上，中间的推理、证据、决定，常常没有地方记。",
       "en": "The idea sits in a notebook, the experiment in an SOP; the reasoning, evidence and decisions in between often have no home.",
       "au": "v3/hard-hard-h9"
      },
      {
       "b": "h10",
       "zh": "这座桥不搭好，实验就容易设计得太大、太贵，或者缺了关键对照。",
       "en": "Without that bridge, experiments get too big, too costly, or miss a key control.",
       "au": "v3/hard-hard-h10"
      },
      {
       "b": "h11",
       "zh": "这四个难点，没有一个是靠“更努力”就能解决的，它们需要流程。",
       "en": "None of these four is solved by trying harder. They need a process.",
       "au": "v3/hard-hard-h11"
      },
      {
       "b": "h12",
       "zh": "好消息是，其中很多跑腿的部分，恰好是 AI 擅长的。",
       "en": "The good news: much of the legwork is exactly what AI is good at.",
       "au": "v3/hard-hard-h12"
      },
      {
       "b": "h13",
       "zh": "关键是：怎么让 AI 跑腿，又不让它替人做决定。",
       "en": "The key is letting AI do the legwork without letting it make the decisions.",
       "au": "v3/hard-hard-h13"
      }
     ]
    }
   ]
  },
  {
   "id": "what",
   "no": "03",
   "title": "这套工作流是什么",
   "kicker": "WHAT IT IS",
   "beats": [
    {
     "v": "oneline",
     "lines": [
      {
       "b": "o1",
       "zh": "先用一句话说清楚：AI 跑腿，人只签关键几步，每一步留痕、可核查。",
       "en": "In one sentence: AI does the legwork, people sign only the key steps, every step is traceable and checkable.",
       "au": "v3/what-oneline-o1"
      },
      {
       "b": "o2",
       "zh": "“AI 跑腿”，是指检索、下载、整理、初步分析、核对引用这些重复劳动，交给 AI。",
       "en": "\"AI does the legwork\": searching, downloading, organising, first-pass analysis and citation checks go to the AI.",
       "au": "v3/what-oneline-o2"
      },
      {
       "b": "o3",
       "zh": "“人只签关键几步”，是指立项、花钱、对外发出任何东西，都必须由作者本人明确同意。",
       "en": "\"People sign the key steps\": approving the project, spending money and sending anything outside need the author's explicit consent.",
       "au": "v3/what-oneline-o3"
      },
      {
       "b": "o4",
       "zh": "“每一步留痕”，是指检索式、数据编号、分析脚本、每一次决定，都记在项目文件里，事后可以复查。",
       "en": "\"Every step leaves a trail\": queries, dataset IDs, scripts and every decision are recorded in project files for later review.",
       "au": "v3/what-oneline-o4"
      },
      {
       "b": "o5",
       "zh": "它运行在 Codex 里，以一个“技能”的形式加载。Codex 是一个 AI 编码助手，可以在电脑上读写文件、运行脚本。",
       "en": "It runs inside Codex, loaded as a \"skill\". Codex is an AI coding agent that can read and write files and run scripts on a computer.",
       "au": "v3/what-oneline-o5"
      },
      {
       "b": "o6",
       "zh": "也就是说，它不是一个新网站，也不是一套要采购的硬件，而是一套写成文件的工作规范，加上一组检查脚本。",
       "en": "So it is not a new website or hardware to buy; it is a working standard written as files, plus a set of checking scripts.",
       "au": "v3/what-oneline-o6"
      },
      {
       "b": "o7",
       "zh": "下面这张图，是它的全貌。",
       "en": "The next picture shows the whole of it.",
       "au": "v3/what-oneline-o7"
      }
     ]
    },
    {
     "v": "stages",
     "lines": [
      {
       "b": "s1",
       "zh": "整套流程分七个阶段。",
       "en": "The workflow has seven stages.",
       "au": "v3/what-stages-s1"
      },
      {
       "b": "s2",
       "zh": "第一，开工自检：检查环境、工具和项目文件是否齐全，缺什么先说清楚。",
       "en": "One, start-up self-check: environment, tools and project files; anything missing is stated first.",
       "au": "v3/what-stages-s2"
      },
      {
       "b": "s3",
       "zh": "第二，课题门：作者签字确认课题卡，AI 才开始正式干活。",
       "en": "Two, the topic gate: only after the author signs the topic card does the AI start real work.",
       "au": "v3/what-stages-s3"
      },
      {
       "b": "s4",
       "zh": "第三，文献起步与撞车检查：先摸清这个方向已经有什么，有没有人做过相近的研究。",
       "en": "Three, literature start and collision check: what already exists, and has anyone done something close?",
       "au": "v3/what-stages-s4"
      },
      {
       "b": "s5",
       "zh": "第四，研究循环：这是干实验的主体，一轮一轮地往前推。",
       "en": "Four, the research loop: the core of the dry lab, moving forward round by round.",
       "au": "v3/what-stages-s5"
      },
      {
       "b": "s6",
       "zh": "每一轮都是同样的节奏：计划、查文献、跑数据、整理证据、留痕、核验引用、复盘，最后过一道收尾门，才能进入下一轮。",
       "en": "Each round has the same rhythm: plan, literature, data, evidence, trail, citation check, review, then a closing gate before the next round.",
       "au": "v3/what-stages-s6"
      },
      {
       "b": "s7",
       "zh": "第五，湿实验前的设计与 SOP：把实验方案写成结构化的步骤，先在纸面上检查。",
       "en": "Five, pre-wet-lab design and SOP: the protocol becomes structured steps, checked on paper first.",
       "au": "v3/what-stages-s7"
      },
      {
       "b": "s8",
       "zh": "第六，湿实验：这一步由人在实验室完成，AI 不碰仪器。",
       "en": "Six, the wet lab: done by people at the bench; the AI touches no instruments.",
       "au": "v3/what-stages-s8"
      },
      {
       "b": "s9",
       "zh": "第七，稿件与证据包：把结论、数据和来源整理在一起，交给写作流程。",
       "en": "Seven, manuscript and evidence pack: conclusions, data and sources together, handed to the writing workflow.",
       "au": "v3/what-stages-s9"
      },
      {
       "b": "s10",
       "zh": "可以看到，前五个阶段都在电脑上完成，花钱的湿实验被放在了后面；真正动手之前，方向、对照和预算都已经过了一遍。",
       "en": "The first five stages happen on a computer; the costly wet lab comes later, after direction, controls and budget have all been checked.",
       "au": "v3/what-stages-s10"
      },
      {
       "b": "s11",
       "zh": "这就是“先评估，再动刀”。",
       "en": "That is \"assess first, then operate\".",
       "au": "v3/what-stages-s11"
      }
     ]
    },
    {
     "v": "analogy",
     "lines": [
      {
       "b": "n1",
       "zh": "这套流程，和外科的老规矩几乎一一对应。",
       "en": "This workflow maps almost one-to-one onto old surgical rules.",
       "au": "v3/what-analogy-n1"
      },
      {
       "b": "n2",
       "zh": "课题门，就是术前讨论与知情同意：方案定了、本人签字，才能开始。",
       "en": "The topic gate is the pre-op conference and informed consent: plan agreed, signed, then start.",
       "au": "v3/what-analogy-n2"
      },
      {
       "b": "n3",
       "zh": "干实验循环，就是术前影像与检验：先看清楚，再决定怎么做。",
       "en": "The dry-lab loop is pre-op imaging and labs: see clearly, then decide.",
       "au": "v3/what-analogy-n3"
      },
      {
       "b": "n4",
       "zh": "独立审查，就是会诊：请没有参与的人，换个角度再看一遍。",
       "en": "Independent review is a consultation: someone not involved looks again from another angle.",
       "au": "v3/what-analogy-n4"
      },
      {
       "b": "n5",
       "zh": "SOP 纸面干跑，就是术前核查表：器械、药品、步骤，开刀前逐项过一遍。",
       "en": "The SOP paper dry run is the surgical checklist: instruments, drugs and steps, one by one before the incision.",
       "au": "v3/what-analogy-n5"
      },
      {
       "b": "n6",
       "zh": "锁定数据，就是手术记录：写下来就不能事后悄悄改。",
       "en": "Locked data is the operative note: once written, it cannot be quietly changed.",
       "au": "v3/what-analogy-n6"
      },
      {
       "b": "n7",
       "zh": "证据包，就是病理报告：结论要有依据，措辞要和证据的强度相符。",
       "en": "The evidence pack is the pathology report: conclusions need grounds, and wording must match the strength of evidence.",
       "au": "v3/what-analogy-n7"
      },
      {
       "b": "n8",
       "zh": "外科靠这些规矩把风险降下来，不是因为外科医生不够聪明，而是因为关键环节值得有人系统地查一遍；科研选题，同样可以。",
       "en": "Surgery lowers risk with these rules, not because surgeons lack skill, but because key steps deserve a systematic check; topic selection can too.",
       "au": "v3/what-analogy-n8"
      }
     ]
    }
   ]
  },
  {
   "id": "card",
   "no": "04",
   "title": "选题轻松①：一句话想法 → 一张课题卡",
   "kicker": "EASIER ① · THE TOPIC CARD",
   "beats": [
    {
     "v": "topiccard",
     "lines": [
      {
       "b": "k1",
       "zh": "先讲选题轻松的第一点：一句话想法，变成一张课题卡。",
       "en": "The first way it makes topics easier: a one-line idea becomes a topic card.",
       "au": "v3/card-topiccard-k1"
      },
      {
       "b": "k2",
       "zh": "很多课题的起点只是一句话，比如“我想看看某个基因和某种表型有没有关系”。",
       "en": "Many projects start as one sentence, like \"I want to see whether a gene is related to a phenotype\".",
       "au": "v3/card-topiccard-k2"
      },
      {
       "b": "k3",
       "zh": "工作流做的第一件事，是把这句话展开成一张结构化的课题卡。",
       "en": "The workflow first expands that sentence into a structured topic card.",
       "au": "v3/card-topiccard-k3"
      },
      {
       "b": "k4",
       "zh": "卡片上有八项：研究问题、物种或模型、干预、读出指标、研究范围、明确不做什么、预算，以及外部动作政策。",
       "en": "Eight fields: question, species or model, intervention, readout, scope, what we will not do, budget, and the external-action policy.",
       "au": "v3/card-topiccard-k4"
      },
      {
       "b": "k5",
       "zh": "“不做什么”这一项特别重要，它帮课题划出边界，防止越做越大。",
       "en": "\"What we will not do\" matters most: it draws the boundary and stops scope creep.",
       "au": "v3/card-topiccard-k5"
      },
      {
       "b": "k6",
       "zh": "“外部动作政策”写的是：哪些事情需要作者逐项同意，比如花钱、联系外部机构、提交任何东西。",
       "en": "The external-action policy lists what needs the author's case-by-case consent: spending, contacting outside parties, submitting anything.",
       "au": "v3/card-topiccard-k6"
      },
      {
       "b": "k7",
       "zh": "填卡的时候，AI 最多只问三个问题。",
       "en": "When filling the card, the AI asks at most three questions.",
       "au": "v3/card-topiccard-k7"
      },
      {
       "b": "k8",
       "zh": "它会挑最影响方向的问题来问，比如模型用细胞还是动物，预算大概在什么范围。",
       "en": "It picks the ones that shape the direction most, such as cells or animals, and the rough budget.",
       "au": "v3/card-topiccard-k8"
      },
      {
       "b": "k9",
       "zh": "其余的项，AI 给出推荐的默认值，并且明确标上“待确认”。",
       "en": "For the rest, the AI proposes defaults and marks them clearly \"to be confirmed\".",
       "au": "v3/card-topiccard-k9"
      },
      {
       "b": "k10",
       "zh": "这样，忙碌的科主任或者学生，不用填一张长表，几分钟就能看到一张完整的草稿卡。",
       "en": "So a busy chief or student skips the long form and sees a complete draft card within minutes.",
       "au": "v3/card-topiccard-k10"
      },
      {
       "b": "k11",
       "zh": "但草稿不等于立项。作者签字，才算立项。",
       "en": "But a draft is not an approved project. Only the author's signature approves it.",
       "au": "v3/card-topiccard-k11"
      },
      {
       "b": "k12",
       "zh": "签字的时候，系统会给这张卡片算一个“指纹”，和签字记录绑在一起。",
       "en": "At signing, the system computes a \"fingerprint\" of the card and binds it to the sign-off record.",
       "au": "v3/card-topiccard-k12"
      },
      {
       "b": "k13",
       "zh": "之后卡片哪怕只改了一个字，指纹就变了，原来的签字自动失效，需要重新确认。",
       "en": "Change even one character and the fingerprint changes; the old signature lapses and must be renewed.",
       "au": "v3/card-topiccard-k13"
      },
      {
       "b": "k14",
       "zh": "这就像知情同意书：术式变了，同意书必须重签，不能拿旧的那张顶着。",
       "en": "Like informed consent: if the procedure changes, consent is signed again; the old form does not cover it.",
       "au": "v3/card-topiccard-k14"
      },
      {
       "b": "k15",
       "zh": "对科主任来说，这意味着每个课题上会讨论的时候，大家看的是同一张、签过字的卡片。",
       "en": "For a chief, every project at the topic meeting is discussed from the same signed card.",
       "au": "v3/card-topiccard-k15"
      },
      {
       "b": "k16",
       "zh": "学生说“我打算做这个”，您看到的是问题、模型、读出、预算和边界，一目了然。",
       "en": "When a student says \"I plan to do this\", you see question, model, readout, budget and boundaries at a glance.",
       "au": "v3/card-topiccard-k16"
      },
      {
       "b": "k17",
       "zh": "这一步的价值，不在于 AI 多聪明，而在于把模糊的想法，变成可以讨论、可以签字的东西。",
       "en": "The value is not how clever the AI is, but turning a vague idea into something you can discuss and sign.",
       "au": "v3/card-topiccard-k17"
      },
      {
       "b": "k18",
       "zh": "有了课题卡，下一步才是查撞车。",
       "en": "With the card in place, the next step is the collision check.",
       "au": "v3/card-topiccard-k18"
      }
     ]
    }
   ]
  },
  {
   "id": "collide",
   "no": "05",
   "title": "选题轻松②：先查撞车",
   "kicker": "EASIER ② · COLLISION CHECK",
   "beats": [
    {
     "v": "collide",
     "lines": [
      {
       "b": "x1",
       "zh": "选题轻松的第二点：先查撞车。",
       "en": "The second way: check for collisions first.",
       "au": "v3/collide-collide-x1"
      },
      {
       "b": "x2",
       "zh": "课题卡签字之后，工作流先做文献起步：系统地看看这个方向已经有什么。",
       "en": "After the card is signed, the workflow starts with literature: a systematic look at what this direction already has.",
       "au": "v3/collide-collide-x2"
      },
      {
       "b": "x3",
       "zh": "检索分两层。第一层是免费的核心检索，包括 PubMed、Europe PMC、Crossref，以及 GEO、BioStudies、PRIDE、GDC 等公开数据库。",
       "en": "Two layers. First, the free core: PubMed, Europe PMC, Crossref, plus public databases such as GEO, BioStudies, PRIDE and GDC.",
       "au": "v3/collide-collide-x3"
      },
      {
       "b": "x4",
       "zh": "这一层不可关闭。无论医院有没有购买数据库，这些免费来源都会查。",
       "en": "This layer cannot be switched off. Whatever the hospital subscribes to, these free sources are always searched.",
       "au": "v3/collide-collide-x4"
      },
      {
       "b": "x5",
       "zh": "第二层是可关闭的扩展：比如医院订阅的机构数据库，或者额外安装的插件。",
       "en": "Second, optional extensions: institutional databases the hospital subscribes to, or extra plug-ins.",
       "au": "v3/collide-collide-x5"
      },
      {
       "b": "x6",
       "zh": "有就用，没有也不影响核心流程。",
       "en": "Use them if you have them; without them the core still works.",
       "au": "v3/collide-collide-x6"
      },
      {
       "b": "x7",
       "zh": "每一次检索，都会记下四件事：检索式、检索日期、返回了多少条、结果是否被截断。",
       "en": "Every search records four things: the query, the date, how many results came back, and whether they were truncated.",
       "au": "v3/collide-collide-x7"
      },
      {
       "b": "x8",
       "zh": "为什么要记这些？因为“查过了”这三个字，本身需要能被复查。",
       "en": "Why? Because \"we searched\" must itself be checkable.",
       "au": "v3/collide-collide-x8"
      },
      {
       "b": "x9",
       "zh": "半年以后，评审或者合作者问“你当时怎么查的”，打开记录就能回答。",
       "en": "Six months later, when a reviewer or partner asks how you searched, the record answers.",
       "au": "v3/collide-collide-x9"
      },
      {
       "b": "x9b",
       "zh": "这份记录，也可以直接附在标书或者论文的补充材料里，说明检索是怎么做的。",
       "en": "The record can also go into the supplementary material of a grant or paper, showing how the search was done.",
       "au": "v3/collide-collide-x9b"
      },
      {
       "b": "x10",
       "zh": "还有一条原则：零结果，不等于没人做。",
       "en": "Another principle: zero results does not mean nobody has done it.",
       "au": "v3/collide-collide-x10"
      },
      {
       "b": "x11",
       "zh": "可能是关键词不对，可能是用了别的术语，也可能是研究还没被收录。",
       "en": "The keywords may be off, others may use different terms, or the work may not be indexed yet.",
       "au": "v3/collide-collide-x11"
      },
      {
       "b": "x12",
       "zh": "所以，重叠程度最后由人来判断。工具会把相近的研究列出来，但不会给课题打一个“新颖性分数”。",
       "en": "So the degree of overlap is judged by people. The tool lists similar studies but never gives a \"novelty score\".",
       "au": "v3/collide-collide-x12"
      },
      {
       "b": "x13",
       "zh": "我们认为，新颖性是一个需要专业判断的问题，不应该交给一个数字。",
       "en": "Novelty needs professional judgement; it should not be handed to a number.",
       "au": "v3/collide-collide-x13"
      }
     ]
    },
    {
     "v": "claimgate",
     "lines": [
      {
       "b": "y1",
       "zh": "这里有一个对标书和论文特别有用的设计。",
       "en": "Here is a design that helps grants and papers in particular.",
       "au": "v3/collide-claimgate-y1"
      },
      {
       "b": "y2",
       "zh": "像“首次报道”“国内外未见报道”这类措辞，评审最容易质疑，也最难自证。",
       "en": "Phrases like \"first report\" or \"not reported at home or abroad\" draw the most reviewer doubt and are the hardest to prove.",
       "au": "v3/collide-claimgate-y2"
      },
      {
       "b": "y3",
       "zh": "在这套流程里，凡是出现这类措辞，必须附带一份截至某个日期的检索记录。",
       "en": "In this workflow, any such phrase must carry a search record as of a stated date.",
       "au": "v3/collide-claimgate-y3"
      },
      {
       "b": "y4",
       "zh": "没有检索记录，到了投稿阶段的检查，这句话会被拦下来，提示作者补充或者改写。",
       "en": "Without one, the pre-submission check stops the sentence and asks the author to add the record or rewrite.",
       "au": "v3/collide-claimgate-y4"
      },
      {
       "b": "y5",
       "zh": "改写不是不让说，而是让措辞和证据相符：比如写成“截至某年某月，在以下数据库中未检索到”。",
       "en": "Rewriting is not a ban; it matches wording to evidence, for example \"as of a given month, not found in the following databases\".",
       "au": "v3/collide-claimgate-y5"
      },
      {
       "b": "y6",
       "zh": "这样写，评审看到的是一个可以核对的事实，而不是一句很难证明的断言。",
       "en": "Then the reviewer sees a checkable fact, not a claim that is hard to prove.",
       "au": "v3/collide-claimgate-y6"
      },
      {
       "b": "y7",
       "zh": "这能减少标书和论文被质疑“夸大创新性”的空间。",
       "en": "That leaves less room for \"overstated novelty\" objections to grants and papers.",
       "au": "v3/collide-claimgate-y7"
      }
     ]
    }
   ]
  },
  {
   "id": "dry",
   "no": "06",
   "title": "选题轻松③：公开数据先跑一遍干实验",
   "kicker": "EASIER ③ · DRY LAB ON PUBLIC DATA",
   "beats": [
    {
     "v": "dryrun",
     "lines": [
      {
       "b": "d1",
       "zh": "选题轻松的第三点：公开数据先跑一遍干实验。",
       "en": "The third way: run a dry lab on public data first.",
       "au": "v3/dry-dryrun-d1"
      },
      {
       "b": "d2",
       "zh": "很多课题的核心假设，其实可以先在公开数据里看一眼。",
       "en": "The core hypothesis of many projects can be glanced at in public data first.",
       "au": "v3/dry-dryrun-d2"
      },
      {
       "b": "d3",
       "zh": "比如，两个分子在疾病样本里是否同升同降，某个指标在不同分组之间有没有差异。",
       "en": "For example, do two molecules rise and fall together in disease samples, does a marker differ between groups?",
       "au": "v3/dry-dryrun-d3"
      },
      {
       "b": "d4",
       "zh": "工作流会在公开的组学数据和队列数据里，按照课题卡的范围，先做一轮验证。",
       "en": "Within the card's scope, the workflow runs a first check on public omics and cohort data.",
       "au": "v3/dry-dryrun-d4"
      },
      {
       "b": "d5",
       "zh": "每次分析用了哪个数据集、哪个版本、哪段脚本，都记在项目里，可以重跑。",
       "en": "Which dataset, which version and which script each analysis used is recorded, so it can be re-run.",
       "au": "v3/dry-dryrun-d5"
      },
      {
       "b": "d5b",
       "zh": "科室里没有专门做生信的人，也能先看到一个初步的答案，再决定要不要请专业的人深入分析。",
       "en": "Even without a bioinformatician in the department, you get a first answer, then decide whether to bring in a specialist.",
       "au": "v3/dry-dryrun-d5b"
      },
      {
       "b": "d6",
       "zh": "得到的每一条证据，都会被分成三类：事实、关联、推测。",
       "en": "Every piece of evidence is sorted into three kinds: fact, association, speculation.",
       "au": "v3/dry-dryrun-d6"
      },
      {
       "b": "d7",
       "zh": "事实，是数据或文献里直接可见的内容。",
       "en": "A fact is directly visible in the data or literature.",
       "au": "v3/dry-dryrun-d7"
      },
      {
       "b": "d8",
       "zh": "关联，是统计上看到的相关，但还不能说明因果。",
       "en": "An association is a statistical correlation that does not yet show cause.",
       "au": "v3/dry-dryrun-d8"
      },
      {
       "b": "d9",
       "zh": "推测，是基于前两者的合理推断，需要实验来验证。",
       "en": "A speculation is a reasonable inference from the first two, to be tested by experiment.",
       "au": "v3/dry-dryrun-d9"
      },
      {
       "b": "d10",
       "zh": "这三类分清楚，讨论课题的时候就不容易把“相关”说成“导致”。",
       "en": "Keep them apart and nobody turns \"correlated with\" into \"causes\" at the topic meeting.",
       "au": "v3/dry-dryrun-d10"
      },
      {
       "b": "d11",
       "zh": "还有一条：阴性结果也是结果。",
       "en": "Also: a negative result is a result.",
       "au": "v3/dry-dryrun-d11"
      },
      {
       "b": "d12",
       "zh": "公开数据里没有看到预期的关联，会如实记录，不会被悄悄跳过。",
       "en": "If public data do not show the expected association, that is recorded honestly, not quietly skipped.",
       "au": "v3/dry-dryrun-d12"
      },
      {
       "b": "d13",
       "zh": "当然，公开数据里没看到，也不代表机制一定不存在，这一点同样会写清楚。",
       "en": "Of course, not seen in public data does not mean the mechanism is absent, and that is written down too.",
       "au": "v3/dry-dryrun-d13"
      },
      {
       "b": "d14",
       "zh": "这一步最大的价值，是把发现方向问题的时间，往前挪。",
       "en": "The biggest value is moving the moment you discover a direction problem earlier.",
       "au": "v3/dry-dryrun-d14"
      },
      {
       "b": "d15",
       "zh": "方向不对，最好是在电脑上发现，而不是三个月后在 WB 上发现。",
       "en": "If the direction is wrong, better to find out on a computer than on a Western blot three months later.",
       "au": "v3/dry-dryrun-d15"
      },
      {
       "b": "d16",
       "zh": "电脑上跑错一次，代价是重新分析；实验台上做错一次，代价是经费、时间，还有学生的信心。",
       "en": "A mistake on the computer costs a re-analysis; a mistake at the bench costs funding, time, and a student's confidence.",
       "au": "v3/dry-dryrun-d16"
      }
     ]
    }
   ]
  },
  {
   "id": "methods",
   "no": "07",
   "title": "选题轻松④：读得到原文方法",
   "kicker": "EASIER ④ · METHODS FROM FULL TEXT",
   "beats": [
    {
     "v": "methods",
     "lines": [
      {
       "b": "r1",
       "zh": "选题轻松的第四点：读得到原文方法。",
       "en": "The fourth way: methods read from the original papers.",
       "au": "v3/methods-methods-r1"
      },
      {
       "b": "r2",
       "zh": "设计实验时，最有参考价值的，往往是别人论文里的方法部分：浓度、时间、细胞系、抗体、分组。",
       "en": "When designing experiments, the most useful part of a paper is often its methods: concentrations, timing, cell lines, antibodies, groups.",
       "au": "v3/methods-methods-r2"
      },
      {
       "b": "r3",
       "zh": "对于开放获取的文章，工作流会从 Europe PMC 的开放获取子集里，自动取回全文。",
       "en": "For open-access papers, the workflow retrieves the full text from the Europe PMC open-access subset.",
       "au": "v3/methods-methods-r3"
      },
      {
       "b": "r4",
       "zh": "然后把方法部分单独抽出来，整理成参数。",
       "en": "Then it extracts the methods section and organises it into parameters.",
       "au": "v3/methods-methods-r4"
      },
      {
       "b": "r5",
       "zh": "每一个参数，都能追溯到原文中的具体句子，以及这份全文文件的指纹。",
       "en": "Every parameter traces back to the exact sentence and to the fingerprint of that full-text file.",
       "au": "v3/methods-methods-r5"
      },
      {
       "b": "r6",
       "zh": "也就是说，“这个浓度是从哪来的”，任何时候都能查到出处，学生交来的方案，您也可以逐条核对。",
       "en": "So \"where did this concentration come from\" can always be answered, and you can check a student's protocol line by line.",
       "au": "v3/methods-methods-r6"
      },
      {
       "b": "r7",
       "zh": "对于订阅文章，工具不抓取，也不绕过付费墙。",
       "en": "For subscription papers, the tool does not scrape and does not get around paywalls.",
       "au": "v3/methods-methods-r7"
      },
      {
       "b": "r8",
       "zh": "这类文章，由作者通过医院或学校的机构权限自己获取。",
       "en": "The author obtains them through hospital or university access.",
       "au": "v3/methods-methods-r8"
      },
      {
       "b": "r9",
       "zh": "这是一个底线：合规比方便更重要。",
       "en": "That is a bottom line: compliance over convenience.",
       "au": "v3/methods-methods-r9"
      },
      {
       "b": "r10",
       "zh": "还要强调一点：拿到全文，不等于已经核实。",
       "en": "And: having the full text is not the same as having verified it.",
       "au": "v3/methods-methods-r10"
      },
      {
       "b": "r11",
       "zh": "抽取出来的参数，仍然需要人来判断是否适用于自己的模型和条件。",
       "en": "People still judge whether extracted parameters fit their own model and conditions.",
       "au": "v3/methods-methods-r11"
      },
      {
       "b": "r12",
       "zh": "工具负责把出处摆清楚，判断留给人。",
       "en": "The tool lays out the sources; the judgement stays with people.",
       "au": "v3/methods-methods-r12"
      },
      {
       "b": "r13",
       "zh": "这样，从文献到实验方案之间，那座“桥”就有了第一块砖。",
       "en": "That puts the first brick in the bridge from literature to protocol.",
       "au": "v3/methods-methods-r13"
      }
     ]
    }
   ]
  },
  {
   "id": "review",
   "no": "08",
   "title": "两次“会诊”：独立审查",
   "kicker": "TWO CONSULTATIONS · INDEPENDENT REVIEW",
   "beats": [
    {
     "v": "review",
     "lines": [
      {
       "b": "v1",
       "zh": "接下来讲两次“会诊”，也就是独立审查。",
       "en": "Next, two \"consultations\": independent review.",
       "au": "v3/review-review-v1"
      },
      {
       "b": "v2",
       "zh": "外科遇到关键决定会请会诊，这套流程也在两个关口，默认安排独立审查。",
       "en": "Surgery calls a consultation for key decisions; this workflow schedules independent review at two gates by default.",
       "au": "v3/review-review-v2"
      },
      {
       "b": "v3",
       "zh": "第一个关口：买试剂、冻结 SOP 之前。",
       "en": "Gate one: before buying reagents and freezing the SOP.",
       "au": "v3/review-review-v3"
      },
      {
       "b": "v4",
       "zh": "第二个关口：投稿之前。",
       "en": "Gate two: before submission.",
       "au": "v3/review-review-v4"
      },
      {
       "b": "v5",
       "zh": "审查时，会派出两个全新上下文的审查智能体。一个看方法学，一个看证据。",
       "en": "Two review agents with fresh context are sent: one for methodology, one for evidence.",
       "au": "v3/review-review-v5"
      },
      {
       "b": "v6",
       "zh": "“全新上下文”的意思是，它们没有参与前面的工作，只看交给它们的材料。",
       "en": "\"Fresh context\" means they took no part in the earlier work and see only the material handed to them.",
       "au": "v3/review-review-v6"
      },
      {
       "b": "v7",
       "zh": "两个审查者互相不看对方的结论，各自独立给出意见。",
       "en": "The two reviewers do not see each other's conclusions; each judges independently.",
       "au": "v3/review-review-v7"
      },
      {
       "b": "v8",
       "zh": "结论只有三种：通过、修改、阻断。",
       "en": "Only three verdicts: pass, revise, block.",
       "au": "v3/review-review-v8"
      },
      {
       "b": "v9",
       "zh": "任何一个审查者没有给出“通过”，这一关就不放行。",
       "en": "If either reviewer does not pass it, the gate stays closed.",
       "au": "v3/review-review-v9"
      },
      {
       "b": "v10",
       "zh": "需要修改的，改完再审；被阻断的，必须先解决问题。",
       "en": "Revisions are reviewed again; a block must be resolved first.",
       "au": "v3/review-review-v10"
      },
      {
       "b": "v10b",
       "zh": "每一次审查的意见和结论都会存档，之后谁都可以回头看，当时为什么放行，为什么拦下。",
       "en": "Every review's comments and verdict are archived, so anyone can later see why something was passed or stopped.",
       "au": "v3/review-review-v10b"
      },
      {
       "b": "v11",
       "zh": "并不是每件事都要会诊。日常的检索、格式修改这类工作，不派审查，避免把流程拖慢。",
       "en": "Not everything needs a consultation. Routine searches and formatting edits get no review, so the process stays quick.",
       "au": "v3/review-review-v11"
      },
      {
       "b": "v12",
       "zh": "这里必须说清楚边界。",
       "en": "The boundary must be clear here.",
       "au": "v3/review-review-v12"
      },
      {
       "b": "v13",
       "zh": "这两个审查者，是同一类 AI 模型，只是换了一个干净的上下文。",
       "en": "The two reviewers are the same kind of AI model, only with a clean context.",
       "au": "v3/review-review-v13"
      },
      {
       "b": "v14",
       "zh": "它们能发现很多遗漏和矛盾，但它们不是真人专家，不能替代导师、同行或者专家组的评审。",
       "en": "They catch many gaps and contradictions, but they are not human experts and do not replace supervisors, peers or expert panels.",
       "au": "v3/review-review-v14"
      },
      {
       "b": "v15",
       "zh": "我们把它定位为：在请真人专家之前，先自己过一遍。",
       "en": "We position it as a self-check before you ask human experts.",
       "au": "v3/review-review-v15"
      },
      {
       "b": "v16",
       "zh": "这样真人专家的时间，可以花在真正需要判断的地方。",
       "en": "Then human experts can spend their time where judgement is truly needed.",
       "au": "v3/review-review-v16"
      }
     ]
    }
   ]
  },
  {
   "id": "prewet",
   "no": "09",
   "title": "湿实验前：先省钱",
   "kicker": "BEFORE THE BENCH · SAVE FIRST",
   "beats": [
    {
     "v": "prewet",
     "lines": [
      {
       "b": "w1",
       "zh": "进入湿实验之前，这套流程最核心的目标是：先省钱。",
       "en": "Before the wet lab, the core goal of the workflow is to save money first.",
       "au": "v3/prewet-prewet-w1"
      },
      {
       "b": "w2",
       "zh": "干实验阶段结束后，工作流会出一份可行性报告。",
       "en": "After the dry-lab phase, the workflow produces a feasibility report.",
       "au": "v3/prewet-prewet-w2"
      },
      {
       "b": "w3",
       "zh": "报告的结论只有三种：启动、补齐条件后启动、暂缓。",
       "en": "Its verdict is one of three: start, start once conditions are met, or hold.",
       "au": "v3/prewet-prewet-w3"
      },
      {
       "b": "w4",
       "zh": "“补齐条件后启动”最常见：方向可以，但还缺一个前提，比如先确认目标分子在细胞里确实表达。",
       "en": "\"Start once conditions are met\" is common: the direction is fine but a prerequisite is missing, such as confirming the target is expressed in the cells.",
       "au": "v3/prewet-prewet-w4"
      },
      {
       "b": "w5",
       "zh": "报告里的每一个实验参数，都会标上来源等级。",
       "en": "Every parameter in the report carries a source grade.",
       "au": "v3/prewet-prewet-w5"
      },
      {
       "b": "w6",
       "zh": "A 级，有文献依据，能追溯到原文句子。",
       "en": "Grade A: backed by literature, traceable to the original sentence.",
       "au": "v3/prewet-prewet-w6"
      },
      {
       "b": "w7",
       "zh": "B 级，是工具给出的建议值，有推理但没有直接文献。",
       "en": "Grade B: a value suggested by the tool, reasoned but without direct literature.",
       "au": "v3/prewet-prewet-w7"
      },
      {
       "b": "w8",
       "zh": "C 级，是必须由实验室核实的值，比如本室仪器的设置、本批试剂的条件。",
       "en": "Grade C: values the lab must verify, such as its own instrument settings or the current reagent batch.",
       "au": "v3/prewet-prewet-w8"
      },
      {
       "b": "w9",
       "zh": "C 级参数需要实验室负责人核实并签字，才能写进最终方案。",
       "en": "Grade C parameters need the lab lead's verification and signature before entering the final protocol.",
       "au": "v3/prewet-prewet-w9"
      }
     ]
    },
    {
     "v": "sopdry",
     "lines": [
      {
       "b": "u1",
       "zh": "方案确定后，工作流会把它写成结构化的 SOP，然后做一次纸面干跑。",
       "en": "Once the plan is set, the workflow writes a structured SOP and does a paper dry run.",
       "au": "v3/prewet-sopdry-u1"
      },
      {
       "b": "u2",
       "zh": "所谓纸面干跑，就是在不碰任何试剂的情况下，按步骤从头到尾走一遍。",
       "en": "A paper dry run walks through every step from start to finish without touching a reagent.",
       "au": "v3/prewet-sopdry-u2"
      },
      {
       "b": "u3",
       "zh": "它能发现一些很常见、却很容易漏掉的问题。",
       "en": "It catches problems that are common yet easy to miss.",
       "au": "v3/prewet-sopdry-u3"
      },
      {
       "b": "u4",
       "zh": "比如，孵育步骤漏了加盖。",
       "en": "For example, an incubation step without a lid.",
       "au": "v3/prewet-sopdry-u4"
      },
      {
       "b": "u5",
       "zh": "比如，读数之前，某个孔还没有加样。",
       "en": "Or a well not yet loaded before the reading.",
       "au": "v3/prewet-sopdry-u5"
      },
      {
       "b": "u6",
       "zh": "再比如，整个实验缺了阴性对照。",
       "en": "Or an entire experiment with no negative control.",
       "au": "v3/prewet-sopdry-u6"
      },
      {
       "b": "u7",
       "zh": "接着，把试剂清单和实验室库存对一遍：哪些缺货，哪些已经过期，提前列出来，避免实验做到一半停下来等试剂。",
       "en": "Then the reagent list is checked against lab inventory: what is missing or expired is listed in advance, so work does not stall halfway waiting for reagents.",
       "au": "v3/prewet-sopdry-u7"
      },
      {
       "b": "u8",
       "zh": "最后是一条底线：任何花钱的动作，都必须由作者明确同意。工具不会替任何人下单。",
       "en": "And a bottom line: any spending needs the author's explicit consent. The tool never places an order for anyone.",
       "au": "v3/prewet-sopdry-u8"
      },
      {
       "b": "u9",
       "zh": "这就像开刀前的核查表：器械清点、药品核对，都在切皮之前完成。",
       "en": "Like the surgical checklist: instrument counts and drug checks are done before the skin incision.",
       "au": "v3/prewet-sopdry-u9"
      }
     ]
    }
   ]
  },
  {
   "id": "lock",
   "no": "10",
   "title": "实验做完：数据锁定与证据包",
   "kicker": "AFTER THE BENCH · LOCK & EVIDENCE PACK",
   "beats": [
    {
     "v": "lock",
     "lines": [
      {
       "b": "l1",
       "zh": "实验做完之后，下一步是数据锁定与证据包。",
       "en": "After the experiments: data locking and the evidence pack.",
       "au": "v3/lock-lock-l1"
      },
      {
       "b": "l2",
       "zh": "原始数据一进项目，就会被锁定，并记下文件指纹。",
       "en": "Raw data are locked as soon as they enter the project, and their file fingerprints are recorded.",
       "au": "v3/lock-lock-l2"
      },
      {
       "b": "l3",
       "zh": "之后如果有人改动了原始数据，指纹对不上，系统会提示。",
       "en": "If anyone changes the raw data later, the fingerprint no longer matches and the system flags it.",
       "au": "v3/lock-lock-l3"
      },
      {
       "b": "l4",
       "zh": "这就像手术记录：写下来之后，不能事后悄悄修改。",
       "en": "Like an operative note: once written, it cannot be quietly edited afterwards.",
       "au": "v3/lock-lock-l4"
      },
      {
       "b": "l5",
       "zh": "还有一个关键顺序：判定标准，要先于数据写下来。",
       "en": "One key order: the decision criteria are written before the data.",
       "au": "v3/lock-lock-l5"
      },
      {
       "b": "l6",
       "zh": "什么结果算支持假设，什么算不支持，在看到数据之前就定好。",
       "en": "What counts as support and what does not is fixed before anyone sees the data.",
       "au": "v3/lock-lock-l6"
      },
      {
       "b": "l7",
       "zh": "这样可以避免看到数据之后，再去调整标准。",
       "en": "That prevents adjusting the criteria after seeing the data.",
       "au": "v3/lock-lock-l7"
      },
      {
       "b": "l8",
       "zh": "阴性结果同样如实记录，它是课题决策的一部分。",
       "en": "Negative results are recorded just as honestly; they are part of the project's decisions.",
       "au": "v3/lock-lock-l8"
      },
      {
       "b": "l9",
       "zh": "写作上，流程采用“干稿先行”：干实验的结果先写成文章框架。",
       "en": "For writing, the dry draft comes first: dry-lab results become the frame of the paper.",
       "au": "v3/lock-lock-l9"
      },
      {
       "b": "l10",
       "zh": "湿实验数据回来以后，补进同一篇文章，而不是另起炉灶。",
       "en": "When wet-lab data return, they go into the same paper instead of a fresh start.",
       "au": "v3/lock-lock-l10"
      },
      {
       "b": "l11",
       "zh": "最后形成证据包：文章里的每一个数字，都能追溯到对应的数据、脚本或文献。",
       "en": "The result is an evidence pack: every number in the paper traces to its data, script or reference.",
       "au": "v3/lock-lock-l11"
      },
      {
       "b": "l12",
       "zh": "证据包交给后续的写作流程，作为写论文、写标书的底稿。",
       "en": "The pack goes to the writing workflow as the base for papers and grant applications.",
       "au": "v3/lock-lock-l12"
      },
      {
       "b": "l13",
       "zh": "这就像病理报告：结论要有切片支撑，措辞要和证据强度一致。",
       "en": "Like a pathology report: conclusions rest on the slides, and wording matches the strength of evidence.",
       "au": "v3/lock-lock-l13"
      },
      {
       "b": "l14",
       "zh": "对科主任来说，这也意味着：课题结题时，留下来的不只是一篇论文，还有一份可以复查的过程。",
       "en": "For a chief, a finished project leaves not only a paper but a process that can be reviewed.",
       "au": "v3/lock-lock-l14"
      }
     ]
    }
   ]
  },
  {
   "id": "demo",
   "no": "11",
   "title": "示意演示：一个虚构课题",
   "kicker": "ILLUSTRATIVE DEMO · FICTIONAL DATA",
   "beats": [
    {
     "v": "demo",
     "lines": [
      {
       "b": "e1",
       "zh": "下面用一个虚构的例子，把整个过程串起来。屏幕上标了“示意，数据虚构”。",
       "en": "Now a fictional example that ties it all together. The screen is labelled \"illustrative, fictional data\".",
       "au": "v3/demo-demo-e1"
      },
      {
       "b": "e2",
       "zh": "假设一位青年医生提出：基因 A，是否影响表型 B？",
       "en": "Suppose a young doctor asks: does gene A affect phenotype B?",
       "au": "v3/demo-demo-e2"
      },
      {
       "b": "e3",
       "zh": "第一步，AI 问了三个问题，生成课题卡；其余各项标为待确认。",
       "en": "Step one: the AI asks three questions and drafts the topic card; the rest is marked \"to be confirmed\".",
       "au": "v3/demo-demo-e3"
      },
      {
       "b": "e4",
       "zh": "作者看过之后，修改了范围，签字立项。",
       "en": "The author reviews it, narrows the scope and signs.",
       "au": "v3/demo-demo-e4"
      },
      {
       "b": "e5",
       "zh": "第二步，撞车检查。检索发现，已有一项相近的研究，研究了基因 A 在另一种模型中的作用。",
       "en": "Step two, the collision check: a similar study already looked at gene A in another model.",
       "au": "v3/demo-demo-e5"
      },
      {
       "b": "e6",
       "zh": "作者判断：直接重复意义不大，于是调整了切入点，聚焦在原研究没有覆盖的场景。",
       "en": "The author judges that repeating it adds little, and shifts the angle to a setting the earlier study did not cover.",
       "au": "v3/demo-demo-e6"
      },
      {
       "b": "e7",
       "zh": "课题卡因此修改，原签字失效，作者重新签字。",
       "en": "The card changes, the old signature lapses, and the author signs again.",
       "au": "v3/demo-demo-e7"
      },
      {
       "b": "e8",
       "zh": "第三步，公开数据。分析显示，基因 A 和表型 B 之间确实有关联，但方向和原来设想的相反。",
       "en": "Step three, public data: gene A and phenotype B are associated, but in the opposite direction to the original idea.",
       "au": "v3/demo-demo-e8"
      },
      {
       "b": "e9",
       "zh": "这条结果被记为“关联”，不是“事实”；同时，课题的假设也随之修正。",
       "en": "This is recorded as an association, not a fact, and the hypothesis is revised.",
       "au": "v3/demo-demo-e9"
      },
      {
       "b": "e10",
       "zh": "第四步，可行性报告。结论是：补齐条件后启动。",
       "en": "Step four, the feasibility report: start once conditions are met.",
       "au": "v3/demo-demo-e10"
      },
      {
       "b": "e11",
       "zh": "条件是：先用最便宜的一步，确认基因 A 在目标细胞中确实表达。",
       "en": "The condition: first, with the cheapest step, confirm gene A is expressed in the target cells.",
       "au": "v3/demo-demo-e11"
      },
      {
       "b": "e12",
       "zh": "第五步，独立审查。方法学审查给出“修改”：要求补充对照组。",
       "en": "Step five, independent review: the methodology reviewer says \"revise\" and asks for a control group.",
       "au": "v3/demo-demo-e12"
      },
      {
       "b": "e13",
       "zh": "第六步，SOP 纸面干跑。干跑又发现，方案里缺少阴性对照。",
       "en": "Step six, the SOP paper dry run finds the protocol lacks a negative control.",
       "au": "v3/demo-demo-e13"
      },
      {
       "b": "e14",
       "zh": "两处问题都补上之后，才进入采购。",
       "en": "Only after both are fixed does purchasing start.",
       "au": "v3/demo-demo-e14"
      },
      {
       "b": "e15",
       "zh": "最后买的，是一小份验证试剂，而不是一整套实验的试剂。",
       "en": "What gets bought is a small batch of validation reagent, not reagents for the whole study.",
       "au": "v3/demo-demo-e15"
      },
      {
       "b": "e16",
       "zh": "如果验证通过，再按计划扩展；如果不通过，就换方向，损失很小。",
       "en": "If validation passes, expand as planned; if not, change direction at little loss.",
       "au": "v3/demo-demo-e16"
      },
      {
       "b": "e17",
       "zh": "请注意，这只是一个示意，数据全部是虚构的，用来说明流程如何运转。",
       "en": "Note: this is only an illustration with entirely fictional data, to show how the process runs.",
       "au": "v3/demo-demo-e17"
      },
      {
       "b": "e18",
       "zh": "它说明的是一个顺序：先在电脑上把能排除的排除，再把钱花在最关键的那一步。",
       "en": "It shows an order: rule out what you can on a computer, then spend money on the most critical step.",
       "au": "v3/demo-demo-e18"
      },
      {
       "b": "e19",
       "zh": "整个过程，每一次修改、每一次签字、每一条证据，都留在项目记录里。",
       "en": "Every change, every signature and every piece of evidence stays in the project record.",
       "au": "v3/demo-demo-e19"
      },
      {
       "b": "e20",
       "zh": "课题上会讨论的时候，这条时间线本身，就是最好的汇报材料。",
       "en": "At the topic meeting, this timeline itself is the best briefing material.",
       "au": "v3/demo-demo-e20"
      }
     ]
    }
   ]
  },
  {
   "id": "dept",
   "no": "12",
   "title": "对科室意味着什么",
   "kicker": "WHAT IT MEANS FOR A DEPARTMENT",
   "beats": [
    {
     "v": "dept",
     "lines": [
      {
       "b": "g1",
       "zh": "那么，对一个科室来说，这意味着什么？下面说的是我们的预期，不是已经证明的结果。",
       "en": "What does this mean for a department? What follows are our expectations, not proven results.",
       "au": "v3/dept-dept-g1"
      },
      {
       "b": "g2",
       "zh": "第一，选题会可能更高效。每个课题上会时，带一张课题卡和一张证据表。",
       "en": "One: topic meetings may be more efficient. Each project arrives with a topic card and an evidence table.",
       "au": "v3/dept-dept-g2"
      },
      {
       "b": "g3",
       "zh": "讨论可以直接聚焦在关键问题上：方向对不对、边界清不清楚、第一步验证做什么。",
       "en": "Discussion can go straight to the key questions: is the direction right, are the boundaries clear, what is the first validation?",
       "au": "v3/dept-dept-g3"
      },
      {
       "b": "g4",
       "zh": "第二，研究生和青年医生有了统一的流程。",
       "en": "Two: graduate students and young doctors share one process.",
       "au": "v3/dept-dept-g4"
      },
      {
       "b": "g5",
       "zh": "每个人的检索、分析、决定都有留痕，导师可以随时检查进度，而不是等到组会才知道。",
       "en": "Everyone's searches, analyses and decisions leave a trail; supervisors can check progress any time, not only at group meetings.",
       "au": "v3/dept-dept-g5"
      },
      {
       "b": "g6",
       "zh": "学生毕业，课题的过程记录还在，下一届可以接着做。",
       "en": "When students graduate, the project record stays and the next cohort can continue.",
       "au": "v3/dept-dept-g6"
      },
      {
       "b": "g7",
       "zh": "第三，标书的立项依据可以溯源。",
       "en": "Three: the rationale in grant applications becomes traceable.",
       "au": "v3/dept-dept-g7"
      },
      {
       "b": "g8",
       "zh": "研究基础写的每一句，背后都有检索记录和证据来源，经得起追问。",
       "en": "Every sentence of the background has a search record and a source behind it, and can stand up to questions.",
       "au": "v3/dept-dept-g8"
      },
      {
       "b": "g9",
       "zh": "第四，经费更可能花在初步验证过的方向上。",
       "en": "Four: funding is more likely to go to directions with preliminary validation.",
       "au": "v3/dept-dept-g9"
      },
      {
       "b": "g10",
       "zh": "先在公开数据里看过、先用最便宜的一步确认过，再投入大的实验，花出去的每一笔钱都更有把握。",
       "en": "Checked in public data, confirmed with the cheapest step, then the big experiments, so each spend rests on firmer ground.",
       "au": "v3/dept-dept-g10"
      },
      {
       "b": "g11",
       "zh": "第五，过程留痕有利于科研诚信。",
       "en": "Five: a recorded process supports research integrity.",
       "au": "v3/dept-dept-g11"
      },
      {
       "b": "g12",
       "zh": "谁、什么时候、做了什么、为什么这样决定，都有记录。",
       "en": "Who did what, when, and why that decision was made: all recorded.",
       "au": "v3/dept-dept-g12"
      },
      {
       "b": "g13",
       "zh": "这些预期能实现多少，取决于每个科室的实际使用。",
       "en": "How much of this comes true depends on how each department actually uses it.",
       "au": "v3/dept-dept-g13"
      },
      {
       "b": "g14",
       "zh": "所以我们更希望先用一个真实课题来验证，而不是靠我们说；效果好不好，由您科室的课题来回答。",
       "en": "So we would rather test it on one real project than ask you to take our word; let your department's project give the answer.",
       "au": "v3/dept-dept-g14"
      }
     ]
    }
   ]
  },
  {
   "id": "comply",
   "no": "13",
   "title": "合规与安全",
   "kicker": "COMPLIANCE & SAFETY",
   "beats": [
    {
     "v": "comply",
     "lines": [
      {
       "b": "q1",
       "zh": "在医院里用 AI，合规和安全是前提。",
       "en": "Using AI in a hospital starts with compliance and safety.",
       "au": "v3/comply-comply-q1"
      },
      {
       "b": "q2",
       "zh": "第一，患者数据必须去标识化，并且不上传、不上云。",
       "en": "One: patient data must be de-identified and never uploaded or put in the cloud.",
       "au": "v3/comply-comply-q2"
      },
      {
       "b": "q3",
       "zh": "第二，这套流程默认只使用公开数据，比如公开数据库和已发表的文献。",
       "en": "Two: by default the workflow uses only public data, such as public databases and published literature.",
       "au": "v3/comply-comply-q3"
      },
      {
       "b": "q4",
       "zh": "第三，目前使用的是境外的 AI 模型。模型的使用和任何数据出境，都要按照医院的规定评估。",
       "en": "Three: it currently uses an overseas AI model. Model use and any cross-border data must be assessed under hospital rules.",
       "au": "v3/comply-comply-q4"
      },
      {
       "b": "q5",
       "zh": "院内没有批准的，就不用；需要走流程的，先走流程。",
       "en": "If the hospital has not approved it, it is not used; if a procedure is required, the procedure comes first.",
       "au": "v3/comply-comply-q5"
      },
      {
       "b": "q6",
       "zh": "第四，它不替代伦理审批。涉及人和动物的研究，仍然按原有程序申请伦理审查。",
       "en": "Four: it does not replace ethics approval. Human and animal research still goes through the usual ethics review.",
       "au": "v3/comply-comply-q6"
      },
      {
       "b": "q7",
       "zh": "第五，花钱的动作和任何对外的动作，都要作者逐项授权。",
       "en": "Five: spending and any external action need the author's case-by-case authorisation.",
       "au": "v3/comply-comply-q7"
      },
      {
       "b": "q8",
       "zh": "对外动作，包括发邮件、提交表格、联系外部机构，工具都不会自行发出。",
       "en": "External actions, such as emails, form submissions or contacting outside parties, are never sent by the tool on its own.",
       "au": "v3/comply-comply-q8"
      },
      {
       "b": "q9",
       "zh": "这些规则写在课题卡的外部动作政策里，每个课题都一样。",
       "en": "These rules live in the external-action policy of the topic card, the same for every project.",
       "au": "v3/comply-comply-q9"
      },
      {
       "b": "q10",
       "zh": "合规不是附加条件，而是这套流程设计的起点；拿不准的地方，宁可先停下来，问清楚再做。",
       "en": "Compliance is not an add-on; it is where the design starts. When in doubt, stop first and ask before going on.",
       "au": "v3/comply-comply-q10"
      }
     ]
    }
   ]
  },
  {
   "id": "promise",
   "no": "14",
   "title": "我们承诺不做的事",
   "kicker": "WHAT WE PROMISE NOT TO DO",
   "beats": [
    {
     "v": "promise",
     "lines": [
      {
       "b": "b1",
       "zh": "接下来这一章，我们叫它：我们承诺不做的事。",
       "en": "This chapter is called: what we promise not to do.",
       "au": "v3/promise-promise-b1"
      },
      {
       "b": "b2",
       "zh": "说清楚边界，是建立信任的第一步。",
       "en": "Clear boundaries are the first step to trust.",
       "au": "v3/promise-promise-b2"
      },
      {
       "b": "b3",
       "zh": "第一，AI 不做实验。湿实验永远由人在实验室完成。",
       "en": "One: the AI does no experiments. Wet-lab work is always done by people.",
       "au": "v3/promise-promise-b3"
      },
      {
       "b": "b4",
       "zh": "第二，它不能证明一个课题是新颖的，也不能证明结论是正确的。它能做的，是把检索和证据摆清楚。",
       "en": "Two: it cannot prove a topic is novel or a conclusion correct. It lays out the searches and the evidence.",
       "au": "v3/promise-promise-b4"
      },
      {
       "b": "b5",
       "zh": "第三，关键步骤必须由人签字：立项、花钱、冻结方案、对外发出任何东西。",
       "en": "Three: key steps need a human signature: approval, spending, freezing the protocol, sending anything out.",
       "au": "v3/promise-promise-b5"
      },
      {
       "b": "b6",
       "zh": "第四，独立审查用的是同一类模型，只是换了干净的上下文，它们不是真人专家。",
       "en": "Four: independent review uses the same kind of model with a clean context; the reviewers are not human experts.",
       "au": "v3/promise-promise-b6"
      },
      {
       "b": "b7",
       "zh": "第五，目前它运行在 Mac 电脑和 Codex 上，还不是一个装好就能用的院内系统。",
       "en": "Five: it currently runs on a Mac with Codex; it is not yet a ready-made in-hospital system.",
       "au": "v3/promise-promise-b7"
      },
      {
       "b": "b8",
       "zh": "第六，在医院里使用，必须遵守院内关于境外模型和数据的规定。",
       "en": "Six: hospital use must follow in-house rules on overseas models and data.",
       "au": "v3/promise-promise-b8"
      },
      {
       "b": "b9",
       "zh": "第七，患者数据必须去标识化，并且永远不上传。",
       "en": "Seven: patient data must be de-identified and never uploaded.",
       "au": "v3/promise-promise-b9"
      },
      {
       "b": "b10",
       "zh": "第八，它不替代伦理审批。",
       "en": "Eight: it does not replace ethics approval.",
       "au": "v3/promise-promise-b10"
      },
      {
       "b": "b11",
       "zh": "我们也没有在医院正式部署的案例，或者经过验证的使用效果数据，可以展示给您。",
       "en": "We also have no formal hospital deployments or validated outcome data to show you.",
       "au": "v3/promise-promise-b11"
      },
      {
       "b": "b12",
       "zh": "流程已经实现，并且在本地离线测试过；真实场景里的效果，需要试点来回答。",
       "en": "The workflow is implemented and tested offline locally; how it works in real settings is for a pilot to answer.",
       "au": "v3/promise-promise-b12"
      },
      {
       "b": "b13",
       "zh": "我们宁愿把这些先讲清楚，再请您决定要不要试；信任应该建立在说清楚的边界上，而不是漂亮的承诺上。",
       "en": "We would rather say this first, then ask whether you want to try; trust should rest on clear boundaries, not on fine promises.",
       "au": "v3/promise-promise-b13"
      }
     ]
    }
   ]
  },
  {
   "id": "work",
   "no": "15",
   "title": "怎么合作",
   "kicker": "HOW WE WORK TOGETHER",
   "beats": [
    {
     "v": "offer",
     "lines": [
      {
       "b": "f1",
       "zh": "最后讲怎么合作。",
       "en": "Finally, how we can work together.",
       "au": "v3/work-offer-f1"
      },
      {
       "b": "f2",
       "zh": "先说一件事：这套工作流的代码是开源的，采用 MIT 许可证，免费使用。",
       "en": "First: the workflow's code is open source under the MIT licence and free to use.",
       "au": "v3/work-offer-f2"
      },
      {
       "b": "f3",
       "zh": "有技术条件的团队，完全可以自己下载、自己配置。",
       "en": "A team with technical capacity can download and set it up themselves.",
       "au": "v3/work-offer-f3"
      },
      {
       "b": "f4",
       "zh": "我们提供的，是让它在科室里真正落地的服务。",
       "en": "What we offer is the service that makes it work in a department.",
       "au": "v3/work-offer-f4"
      },
      {
       "b": "f5",
       "zh": "第一种，半天工作坊。拿科室的一次选题会，现场演示整个过程。",
       "en": "Option one, a half-day workshop: we use one of your topic meetings to demonstrate the whole process live.",
       "au": "v3/work-offer-f5"
      },
      {
       "b": "f6",
       "zh": "用科室自己提出的一个想法，现场生成课题卡、做撞车检查，让大家直观地看到它怎么工作。",
       "en": "From an idea your department raises, we draft the topic card and run the collision check on the spot, so everyone sees how it works.",
       "au": "v3/work-offer-f6"
      },
      {
       "b": "f7",
       "zh": "第二种，四到六周的试点。选一到两个真实课题，从课题卡一直走到证据包。",
       "en": "Option two, a four-to-six-week pilot: one or two real projects, from topic card to evidence pack.",
       "au": "v3/work-offer-f7"
      },
      {
       "b": "f8",
       "zh": "试点结束时，交付课题卡、撞车检查记录、可行性报告和证据包。",
       "en": "At the end you receive the topic card, the collision-check record, the feasibility report and the evidence pack.",
       "au": "v3/work-offer-f8"
      },
      {
       "b": "f8b",
       "zh": "试点结束时您手里的，不是一个演示，而是关于这个课题的一份完整材料，和一个清楚的决定：做、缓做，还是换方向。",
       "en": "At the end of a pilot you hold not a demo but a complete file on the project, and a clear decision: go, wait, or change direction.",
       "au": "v3/work-offer-f8b"
      },
      {
       "b": "f9",
       "zh": "第三种，院内部署与带教。按医院的规定完成部署，带教研究生和青年医生上手。",
       "en": "Option three, in-hospital deployment and coaching: set up under hospital rules, and students and young doctors trained to use it.",
       "au": "v3/work-offer-f9"
      },
      {
       "b": "f10",
       "zh": "三种方式可以单独选，也可以从工作坊开始，逐步推进。",
       "en": "Pick any one, or start with the workshop and build from there.",
       "au": "v3/work-offer-f10"
      },
      {
       "b": "f11",
       "zh": "所有合作，都遵守前面讲的合规规则和承诺不做的事。",
       "en": "All of it follows the compliance rules and the promises you just heard.",
       "au": "v3/work-offer-f11"
      },
      {
       "b": "f12",
       "zh": "具体的安排，可以根据科室的情况来商量。",
       "en": "Details can be arranged around your department's situation.",
       "au": "v3/work-offer-f12"
      },
      {
       "b": "f13",
       "zh": "我们的建议是，从小处开始：一个课题，一次试点。",
       "en": "Our suggestion: start small. One project, one pilot.",
       "au": "v3/work-offer-f13"
      },
      {
       "b": "f14",
       "zh": "用真实的课题，看它到底能不能帮上忙。",
       "en": "Use a real project to see whether it truly helps.",
       "au": "v3/work-offer-f14"
      }
     ]
    }
   ]
  },
  {
   "id": "close",
   "no": "16",
   "title": "讲完了 · 您只做一个决定",
   "kicker": "ONE DECISION",
   "beats": [
    {
     "v": "close",
     "lines": [
      {
       "b": "z1",
       "zh": "讲完了。回到开头的那句话：选题，不再靠拍脑袋。",
       "en": "That is all. Back to where we began: topic selection, no longer by gut feeling.",
       "au": "v3/close-close-z1"
      },
      {
       "b": "z2",
       "zh": "让每个课题在湿实验之前，先做一次术前评估。",
       "en": "Give every project a pre-operative assessment before the wet lab.",
       "au": "v3/close-close-z2"
      },
      {
       "b": "z3",
       "zh": "AI 跑腿，人只签关键几步，每一步留痕、可核查。",
       "en": "AI does the legwork, people sign the key steps, every step is traceable.",
       "au": "v3/close-close-z3"
      },
      {
       "b": "z4",
       "zh": "今天只请您做一个决定：选一个课题来试点。",
       "en": "Today I ask for one decision: choose one project for a pilot.",
       "au": "v3/close-close-z4"
      },
      {
       "b": "z5",
       "zh": "可以是一个正在犹豫要不要做的课题，也可以是一个准备写进标书的方向。",
       "en": "It can be a project you are unsure about, or a direction you plan to put into a grant.",
       "au": "v3/close-close-z5"
      },
      {
       "b": "z6",
       "zh": "用四到六周，看看它能不能让科室的选题更轻松。",
       "en": "Four to six weeks to see whether it makes your department's topic selection easier.",
       "au": "v3/close-close-z6"
      },
      {
       "b": "z7",
       "zh": "谢谢您的时间。",
       "en": "Thank you for your time.",
       "au": "v3/close-close-z7"
      }
     ]
    }
   ]
  }
 ]
};
