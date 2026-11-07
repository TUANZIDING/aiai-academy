/* Kosmos-lite 科研闭环 · pitch lesson v2.0 (PREVIEW) script — built by build-datav2.0.py; content strictly from tag v1.3.0 of kosmos-lite-research-loop.
   Unchanged lines reuse v1.x mp3; new lines live under media/kosmos-pitch-audio/v2/. No background music; chapter cards wait for a click (cardWait). */
window.LG_DATA = {
 "version": "2.0",
 "music": false,
 "cardWait": true,
 "lesson": "kosmos-lite-pitch",
 "basedOn": "kosmos-lite-research-loop v1.3.0 (git tag v1.3.0)",
 "voice": "zh-CN-YunyangNeural",
 "rate": "-5%",
 "audioBase": "media/kosmos-pitch-audio/",
 "chapters": [
  {
   "id": "open",
   "no": "00",
   "title": "湿实验之前，先把账算清",
   "kicker": "KOSMOS-LITE · RESEARCH LOOP v1.3.0",
   "beats": [
    {
     "v": "cover",
     "lines": [
      {
       "b": "c1",
       "zh": "做科研的人都知道，最贵的往往不是试剂，而是做了三个月，才发现方向不对。",
       "en": "Every researcher knows: the most expensive thing is often not the reagents, but finding out after three months that the direction was wrong.",
       "au": "open/cover-c1"
      },
      {
       "b": "c2",
       "zh": "今天介绍一套科研流程：Kosmos-lite 科研闭环，讲的是 v1.3.0 版本。",
       "en": "Today: a research workflow, the Kosmos-lite Research Loop, version 1.3.0.",
       "au": "v2/open-cover-c2"
      },
      {
       "b": "c3",
       "zh": "一句话概括：AI 负责跑腿，人只签关键几步；每一步留痕、可核查。",
       "en": "In one line: AI does the legwork, people sign only the key steps, and every step leaves an auditable trail.",
       "au": "open/cover-c3"
      },
      {
       "b": "c4",
       "zh": "我用外科手术来打比方，再教您怎么装、怎么用，最后只请您做一个决定。",
       "en": "I will explain it with surgical analogies, show you how to install and use it, and at the end ask you for one decision.",
       "au": "v2/open-cover-c4"
      }
     ]
    }
   ]
  },
  {
   "id": "pain",
   "no": "01",
   "title": "三个月的 WB 白做了",
   "kicker": "THE PAIN",
   "beats": [
    {
     "v": "pain",
     "lines": [
      {
       "b": "p1",
       "zh": "先说一个很多课题组都见过的场景：一组 Western blot，做了整整三个月。",
       "en": "A scene many labs know: a set of Western blots, three full months of work.",
       "au": "pain/pain-p1"
      },
      {
       "b": "p2",
       "zh": "回头一看，第一，没设好对照，结果没法解释。",
       "en": "Looking back: first, no proper control, so the result cannot be interpreted.",
       "au": "pain/pain-p2"
      },
      {
       "b": "p3",
       "zh": "第二，试剂早就过期了，没有人注意到。",
       "en": "Second, a reagent had expired long ago, and nobody noticed.",
       "au": "pain/pain-p3"
      },
      {
       "b": "p4",
       "zh": "第三，方案中途改过，可记录里找不到是谁、什么时候、为什么改的。",
       "en": "Third, the protocol changed midway, and the records do not say who changed it, when, or why.",
       "au": "pain/pain-p4"
      },
      {
       "b": "p5",
       "zh": "账面上损失的是经费，背后是学生的时间，最深处是诚信风险。",
       "en": "On paper the loss is funding; behind it, students' time; at the bottom, research-integrity risk.",
       "au": "pain/pain-p5"
      },
      {
       "b": "p6",
       "zh": "这些错误单拎出来都不难发现，难的是在动手之前，有人系统地查一遍。",
       "en": "None of these errors is hard to spot alone. The hard part is having someone check systematically before the bench work starts.",
       "au": "pain/pain-p6"
      },
      {
       "b": "p7",
       "zh": "外科早就有这一套：术前讨论、器械清点、手术记录。在科研里，这一环常常是空的。",
       "en": "Surgery has long had this: pre-op case conferences, instrument counts, operative notes. In research, this link is often missing.",
       "au": "pain/pain-p7"
      }
     ]
    }
   ]
  },
  {
   "id": "case",
   "no": "02",
   "title": "一个真实课题：先省下一笔湿实验",
   "kicker": "REAL CASE · ANONYMIZED",
   "beats": [
    {
     "v": "caseq",
     "lines": [
      {
       "b": "q1",
       "zh": "讲一个我们最近真实跑过的课题。做了匿名处理，不提具体基因。",
       "en": "A real project we ran recently. Anonymized: no specific genes named.",
       "au": "case/caseq-q1"
      },
      {
       "b": "q2",
       "zh": "这是一个卵巢癌靶点课题。设想是：A 调控 B，B 再推动肿瘤表型，构成一条轴。",
       "en": "An ovarian-cancer target project. The idea: A regulates B, and B drives a tumour phenotype, forming one axis.",
       "au": "case/caseq-q2"
      },
      {
       "b": "q3",
       "zh": "按常规路线，下一步就该买敲低、过表达和回复实验的试剂，开始湿实验。",
       "en": "The usual route: next, buy knockdown, overexpression and rescue reagents, and start the wet lab.",
       "au": "case/caseq-q3"
      },
      {
       "b": "q4",
       "zh": "我们先停了一下：在花钱之前，让干实验把这条轴查一遍。",
       "en": "We paused first: before spending money, let the dry lab check this axis.",
       "au": "case/caseq-q4"
      }
     ]
    },
    {
     "v": "rounds",
     "lines": [
      {
       "b": "r1",
       "zh": "干实验一共跑了四轮。",
       "en": "The dry lab ran four rounds.",
       "au": "case/rounds-r1"
      },
      {
       "b": "r2",
       "zh": "第一轮，文献：多个来源检索，看这条轴有没有直接证据。",
       "en": "Round one, literature: a multi-source search for direct evidence of the axis.",
       "au": "case/rounds-r2"
      },
      {
       "b": "r3",
       "zh": "第二轮，公开的 bulk 转录组数据：看 A 和 B 在肿瘤样本里，是不是同升同降。",
       "en": "Round two, public bulk transcriptome data: do A and B rise and fall together in tumour samples?",
       "au": "case/rounds-r3"
      },
      {
       "b": "r4",
       "zh": "第三轮，公开的蛋白组数据：在蛋白层面再看一次。",
       "en": "Round three, public proteomic data: look again at the protein level.",
       "au": "case/rounds-r4"
      },
      {
       "b": "r5",
       "zh": "第四轮，公开的单细胞数据：看它们是不是出现在同一类细胞里。",
       "en": "Round four, public single-cell data: do they show up in the same cell types?",
       "au": "case/rounds-r5"
      },
      {
       "b": "r6",
       "zh": "每一轮都预设了阳性和阴性对照，先确认分析方法本身能看出已知的关系。",
       "en": "Every round had pre-set positive and negative controls, to confirm the method itself can detect known relationships.",
       "au": "case/rounds-r6"
      },
      {
       "b": "r7",
       "zh": "结论是：四轮都没有看到这条轴所需要的正向共调控。",
       "en": "The result: across all four rounds, none of the positive co-regulation this axis would need.",
       "au": "case/rounds-r7"
      },
      {
       "b": "r8",
       "zh": "所有检索式、数据编号、分析脚本和输出，都留在证据日志里，事后谁都可以复查。",
       "en": "Every query, dataset accession, analysis script and output stays in the evidence log, open to anyone for later review.",
       "au": "case/rounds-r8"
      }
     ]
    },
    {
     "v": "decision",
     "lines": [
      {
       "b": "d1",
       "zh": "这不等于这条轴一定是错的。公开数据里没看到，不代表机制不存在。",
       "en": "This does not prove the axis is wrong. Not seen in public data does not mean the mechanism is absent.",
       "au": "case/decision-d1"
      },
      {
       "b": "d2",
       "zh": "所以决定不是砍掉课题，而是：先暂停整条轴的全套实验。",
       "en": "So the decision was not to kill the project, but to pause the full set of axis experiments.",
       "au": "case/decision-d2"
      },
      {
       "b": "d3",
       "zh": "先做最便宜的一步：确认这个蛋白，在我们自己的细胞里确实有内源表达。",
       "en": "First, the cheapest step: confirm the protein is really expressed endogenously in our own cells.",
       "au": "case/decision-d3"
      },
      {
       "b": "d4",
       "zh": "这一步过了，再买敲低和回复实验的试剂；过不了，就换方向。",
       "en": "If it passes, then buy the knockdown and rescue reagents; if not, change direction.",
       "au": "case/decision-d4"
      },
      {
       "b": "d5",
       "zh": "干实验先帮我省下了一笔湿实验的钱，也省下了几个月。",
       "en": "The dry lab saved me a chunk of wet-lab money first, and a few months as well.",
       "au": "case/decision-d5"
      },
      {
       "b": "d6",
       "zh": "就像急诊里的一张 CT：它不替你开刀，但会告诉你，这一刀先别急着开。",
       "en": "Like a CT scan in the emergency room: it does not operate for you, but it tells you not to rush this incision.",
       "au": "case/decision-d6"
      }
     ]
    }
   ]
  },
  {
   "id": "position",
   "no": "03",
   "title": "它和自动化实验室不一样",
   "kicker": "POSITIONING",
   "beats": [
    {
     "v": "autolab",
     "lines": [
      {
       "b": "a1",
       "zh": "2026 年 11 月，Nature 发表了 AutoDNA：一个 AI 原生的自动化生物分子实验室。",
       "en": "In November 2026, Nature published AutoDNA: an AI-native autonomous biomolecular laboratory.",
       "au": "position/autolab-a1"
      },
      {
       "b": "a2",
       "zh": "它让 AI 调度二十多类仪器、一万一千多个步骤，人主要只做补充试剂、耗材这类硬件维护。",
       "en": "AI orchestrates over 20 instrument types and more than 11,000 steps; humans mainly do hardware upkeep such as restocking reagents and labware.",
       "au": "position/autolab-a2"
      },
      {
       "b": "a3",
       "zh": "它自动化的是「手」：用机器人把实验做出来。",
       "en": "It automates the hands: robots carry out the experiments.",
       "au": "position/autolab-a3"
      },
      {
       "b": "a4",
       "zh": "Kosmos-lite 管的是「决策和证据」：做不做、怎么做、做完能说什么。",
       "en": "Kosmos-lite governs decisions and evidence: whether to do it, how, and what you may claim afterwards.",
       "au": "position/autolab-a4"
      },
      {
       "b": "a5",
       "zh": "它不需要任何硬件，普通实验室明天就能用。两者不是替代关系，可以互补。",
       "en": "It needs no hardware; an ordinary lab can use it tomorrow. They do not replace each other; they can be complementary.",
       "au": "position/autolab-a5"
      }
     ]
    }
   ]
  },
  {
   "id": "map",
   "no": "04",
   "title": "七步总览",
   "kicker": "THE LOOP · OVERVIEW",
   "beats": [
    {
     "v": "poster",
     "lines": [
      {
       "b": "m1",
       "zh": "整套流程一共七步，这张图是全貌。",
       "en": "The whole workflow has seven steps. This picture is the full view.",
       "au": "map/poster-m1"
      },
      {
       "b": "m2",
       "zh": "左边是 AI 编码助手，比如 Codex，在划定的边界内执行；右边是作者，做关键决定，亲手做实验。",
       "en": "On the left, an AI coding agent such as Codex works inside set bounds; on the right, the author makes the key decisions and does the bench work.",
       "au": "map/poster-m2"
      },
      {
       "b": "m3",
       "zh": "从课题配置，到干实验、假设表、分阶段设计、台架 SOP、湿实验封存，最后是稿件检查和证据包。",
       "en": "From topic set-up to dry lab, hypothesis table, staged design, bench SOP, sealing wet-lab data, and finally the manuscript check and the evidence pack.",
       "au": "v2/map-poster-m3"
      },
      {
       "b": "m4",
       "zh": "接下来一步一步讲，每一步都对应外科里的一条老规矩。",
       "en": "Next, step by step; each step maps to an old rule of surgery.",
       "au": "map/poster-m4"
      }
     ]
    }
   ]
  },
  {
   "id": "s1",
   "no": "05",
   "title": "① 课题门 = 术前讨论与知情同意",
   "kicker": "STEP 1 · TOPIC GATE",
   "beats": [
    {
     "v": "g1",
     "lines": [
      {
       "b": "g1",
       "zh": "第一步，课题配置：研究问题、模型、干预、读出、预算，写进同一份配置文件。",
       "en": "Step one, topic set-up: question, model, intervention, readout and budget go into one configuration file.",
       "au": "s1/g1-g1"
      },
      {
       "b": "g2",
       "zh": "然后过 G1 课题门：作者本人确认之后，AI 才能开始干活。",
       "en": "Then the G1 topic gate: only after the author confirms may the AI start work.",
       "au": "s1/g1-g2"
      },
      {
       "b": "g2b",
       "zh": "在这之前，AI 只能做只读和填配置所需的少量检索；想查文献，状态检查直接返回 BLOCKED。",
       "en": "Before that, the AI may only read and do the few searches needed to fill the configuration; a literature action returns BLOCKED.",
       "au": "v2/s1-g1-g2b"
      },
      {
       "b": "g3",
       "zh": "确认时，系统给这份文件算一个 SHA-256 指纹，和确认记录绑在一起。",
       "en": "At confirmation, the system computes a SHA-256 fingerprint of the file and binds it to the sign-off record.",
       "au": "s1/g1-g3"
      },
      {
       "b": "g4",
       "zh": "文件改一个字，指纹就变，之前的确认自动失效，必须重新确认。",
       "en": "Change one character and the fingerprint changes; the earlier confirmation lapses and must be renewed.",
       "au": "s1/g1-g4"
      },
      {
       "b": "g5",
       "zh": "这就像术前知情同意：术式变了，同意书就得重签，不能拿旧的那张顶着。",
       "en": "Like informed consent before surgery: if the procedure changes, consent is signed again; the old form does not cover it.",
       "au": "s1/g1-g5"
      }
     ]
    }
   ]
  },
  {
   "id": "s2",
   "no": "06",
   "title": "② 干实验循环 = 术前影像与检验",
   "kicker": "STEP 2 · DRY-LAB LOOP",
   "beats": [
    {
     "v": "dryloop",
     "lines": [
      {
       "b": "l1",
       "zh": "第二步，干实验循环，这是 AI 跑腿最多的地方。",
       "en": "Step two, the dry-lab loop, where the AI does most of the legwork.",
       "au": "s2/dryloop-l1"
      },
      {
       "b": "l2",
       "zh": "它用免费的 PubMed 和 GEO 检索文献和公开数据，需要时补充其他来源，再在本地电脑上分析。",
       "en": "It searches literature and public data through free PubMed and GEO, adds other sources when needed, and analyses on the local computer.",
       "au": "v2/s2-dryloop-l2"
      },
      {
       "b": "l2b",
       "zh": "每次检索都记下来源、查询、返回多少、有没有截断；样本表对不上，就停下来等人工映射，不按列的顺序去猜。",
       "en": "Each search records source, query, hits and truncation; if sample tables do not match, it stops for manual mapping instead of guessing by column order.",
       "au": "v2/s2-dryloop-l2b"
      },
      {
       "b": "l3",
       "zh": "所有发现汇进世界模型：它记录当前的理解，可以随证据修订，但不替代原始数据。",
       "en": "Findings flow into the world model: it records the current understanding and can be revised with evidence, but it never replaces the raw data.",
       "au": "v2/s2-dryloop-l3"
      },
      {
       "b": "l4",
       "zh": "每条证据进日志都要分级：事实、关联，还是推测；来源必须能追溯到 PMID、GSE 或项目里的文件。",
       "en": "Every entry in the evidence log is graded fact, association or speculation, and its source must trace to a PMID, a GSE or a project file.",
       "au": "v2/s2-dryloop-l4"
      },
      {
       "b": "l4b",
       "zh": "数据怎么选、参数怎么定、假设怎么升降，各用一句话记进 trace.jsonl，连同是谁、在哪台机器上。",
       "en": "How data were chosen, parameters set and hypotheses moved: one line each in trace.jsonl, with who and on which machine.",
       "au": "v2/s2-dryloop-l4b"
      },
      {
       "b": "l5",
       "zh": "需要对照时，先写对照计划并存一份快照，记下哈希；之后改了能看出来，但它不等于预注册。",
       "en": "When controls are needed, write a control plan and snapshot it with a hash; later edits show up, but it is not a preregistration.",
       "au": "v2/s2-dryloop-l5"
      },
      {
       "b": "l5c",
       "zh": "主分析没信号时，由作者做一次阴性审阅：效应、区间、对照、精度；材料不够，就写不可判。",
       "en": "If the main analysis shows no signal, the author records a null-result review: effect, interval, controls, precision; without enough material it stays undecidable.",
       "au": "v2/s2-dryloop-l5c"
      },
      {
       "b": "l5b",
       "zh": "需要时也可以调用付费的科研智能体服务，比如 Edison；但每一次花费，都要作者先授权。",
       "en": "When needed it can call paid research-agent services such as Edison, but every spend needs the author’s approval first.",
       "au": "s2/dryloop-l5b"
      },
      {
       "b": "l6",
       "zh": "这就是术前的影像和检验：先看清楚，再决定要不要上台。",
       "en": "This is pre-op imaging and lab work: see clearly first, then decide whether to operate.",
       "au": "s2/dryloop-l6"
      }
     ]
    },
    {
     "v": "close",
     "lines": [
      {
       "b": "cc1",
       "zh": "一轮结束前，先过引用核验：每个 PMID、GSE、DOI 是否真实存在，PubMed 有没有标记撤稿。",
       "en": "Before a round ends, the citation check: does each PMID, GSE and DOI exist, and has PubMed flagged a retraction?",
       "au": "v2/s2-close-cc1"
      },
      {
       "b": "cc2",
       "zh": "网络不通，记为未核验，不算通过。核验通过，也只说明标识存在，不说明原文支持你的结论。",
       "en": "No network means UNVERIFIED, not a pass. A pass only means the identifiers exist, not that the papers support your claim.",
       "au": "v2/s2-close-cc2"
      },
      {
       "b": "cc3",
       "zh": "然后是收尾门：本轮复盘写了、项目校验通过、引用核验 PASS，才能进入下一轮。",
       "en": "Then the closing gate: a written review of the round, project validation passing and the citation check at PASS, before the next round.",
       "au": "v2/s2-close-cc3"
      },
      {
       "b": "cc4",
       "zh": "要跳过，必须作者明确同意，用 override 写明理由，记入历史；AI 不能自己跳。",
       "en": "Skipping needs the author’s explicit consent with an override and a reason, written to the history; the AI cannot skip by itself.",
       "au": "v2/s2-close-cc4"
      },
      {
       "b": "cc5",
       "zh": "就像交班：化验单还没回来，交班本上写「待回报」，而不是「正常」。",
       "en": "Like a handover: if a lab result is not back, the handover note says pending, not normal.",
       "au": "v2/s2-close-cc5"
      }
     ]
    }
   ]
  },
  {
   "id": "s34",
   "no": "07",
   "title": "③④ 鉴别诊断与分期手术",
   "kicker": "STEPS 3–4 · HYPOTHESES & STAGES",
   "beats": [
    {
     "v": "hypo",
     "lines": [
      {
       "b": "h1",
       "zh": "第三步，假设表，写在世界模型里。每个假设标上支持、削弱、待定或放弃，同时考虑反证和替代假说。",
       "en": "Step three, the hypothesis table in the world model. Each hypothesis is marked supported, weakened, open or dropped, with counter-evidence and alternatives considered.",
       "au": "v2/s34-hypo-h1"
      },
      {
       "b": "h2",
       "zh": "每一行都写上支持证据和反对证据的编号，以及下一步怎么检验。",
       "en": "Each row lists the supporting and opposing evidence numbers, and how it will be tested next.",
       "au": "v2/s34-hypo-h2"
      },
      {
       "b": "h3",
       "zh": "这就是鉴别诊断清单：排除了什么、凭什么排除，下一位医生一看就懂。",
       "en": "It is a differential-diagnosis list: what was ruled out and why, clear to the next doctor at a glance.",
       "au": "s34/hypo-h3"
      }
     ]
    },
    {
     "v": "stages",
     "lines": [
      {
       "b": "t1",
       "zh": "第四步，分阶段设计：先体外快筛，再原代细胞复证，最后才是体内验证。",
       "en": "Step four, staged design: a rapid in-vitro screen, then confirmation in primary cells, and only then in-vivo validation.",
       "au": "s34/stages-t1"
      },
      {
       "b": "t2",
       "zh": "动手之前先写一份湿实验决策记录：继续、停止，还是不可判；每个设计选择都写上依据。",
       "en": "Before the bench, a wet-lab decision record: continue, stop or undecidable; every design choice states its basis.",
       "au": "v2/s34-stages-t2"
      },
      {
       "b": "t3",
       "zh": "只有问题和证据真的需要，才往更贴近生理的模型、往体内走。",
       "en": "Move to more physiological models or in vivo only when the question and the evidence truly need it.",
       "au": "v2/s34-stages-t3"
      },
      {
       "b": "t4",
       "zh": "就像创伤外科的损伤控制：先做最小、最快、最能说明问题的那一步。",
       "en": "Like damage control in trauma surgery: do the smallest, fastest, most decisive step first.",
       "au": "s34/stages-t4"
      }
     ]
    }
   ]
  },
  {
   "id": "s5",
   "no": "08",
   "title": "⑤ 台架 SOP = 术前核查表",
   "kicker": "STEP 5 · BENCH SOP",
   "beats": [
    {
     "v": "sop",
     "lines": [
      {
       "b": "o1",
       "zh": "第五步，台架 SOP。能按国际标准和惯例定的参数，直接给默认值，并注明出处。",
       "en": "Step five, the bench SOP. Parameters that follow international standards or convention get defaults, with their source.",
       "au": "v2/s5-sop-o1"
      },
      {
       "b": "o2",
       "zh": "真正依赖你们平台的参数，比如仪器型号、可用的检测项目，就标上「待核实：设施」。",
       "en": "Parameters that depend on your own facility, such as instrument models or available assays, are tagged “to verify: facility”.",
       "au": "v2/s5-sop-o2"
      },
      {
       "b": "o3",
       "zh": "这些待核实项汇总成一张设施核对清单，按平台分组，作者拿着它一次问清楚。",
       "en": "These items roll up into a facility checklist grouped by platform, so the author can settle them in one visit.",
       "au": "v2/s5-sop-o3"
      },
      {
       "b": "o4",
       "zh": "SOP 里还要写清楚独立重复的单位：同一批样本多次上机，通常只是技术重复。",
       "en": "The SOP also states the unit of independent replication: running one batch several times is usually a technical replicate.",
       "au": "v2/s5-sop-o4"
      },
      {
       "b": "o5",
       "zh": "这就是术前核查表：器械、血源、影像，进手术室之前逐项打勾，而不是开到一半才发现缺东西。",
       "en": "This is the pre-op checklist: instruments, blood, imaging ticked off before entering theatre, not discovered missing halfway through.",
       "au": "v2/s5-sop-o5"
      },
      {
       "b": "o6",
       "zh": "最后写一份湿实验交接：候选靶点、证据等级、验证实验和优先级。",
       "en": "Finally a wet-lab handoff: candidate targets, evidence grades, validation experiments and priorities.",
       "au": "v2/s5-sop-o6"
      }
     ]
    }
   ]
  },
  {
   "id": "s6",
   "no": "09",
   "title": "⑥ 湿实验 = 术中冰冻与手术记录",
   "kicker": "STEP 6 · WET LAB",
   "beats": [
    {
     "v": "wet",
     "lines": [
      {
       "b": "w1",
       "zh": "第六步，湿实验。这一步由作者亲手做，AI 不碰仪器。",
       "en": "Step six, the wet lab. The author does it by hand; the AI never touches the instruments.",
       "au": "s6/wet-w1"
      },
      {
       "b": "w2",
       "zh": "数据出来之前，稿件里已经给它留好了位置，叫湿实验槽位。",
       "en": "Before the data exist, the manuscript already holds a place for them: the wet-lab slot.",
       "au": "v2/s6-wet-w2"
      },
      {
       "b": "w2b",
       "zh": "槽位里只能写实验设计和预设的判定标准，保留「等待湿实验数据」的标记；不许写预期结果、P 值或示意图。",
       "en": "The slot may hold only the design and the pre-specified decision rule, keeping the PENDING WET-LAB DATA mark; no expected results, P values or mock figures.",
       "au": "v2/s6-wet-w2b"
      },
      {
       "b": "w3",
       "zh": "就像术中冰冻：病理没回报之前，手术记录里只写「已送检」，不写结论。",
       "en": "Like a frozen section: until pathology reports back, the operative note says sent for analysis, not a conclusion.",
       "au": "v2/s6-wet-w3"
      },
      {
       "b": "w3b",
       "zh": "原始数据放进 wetlab/raw，作者确认后运行 lock-wet，记下文件的 SHA-256；锁定之后，才能写这个槽位的结果。",
       "en": "Raw data go into wetlab/raw; after the author confirms, lock-wet records the files’ SHA-256, and only then may the slot’s results be written.",
       "au": "v2/s6-wet-w3b"
      },
      {
       "b": "w4",
       "zh": "锁定后谁再改原始数据，稿件检查就会报错。",
       "en": "If anyone changes the raw data after locking, the manuscript check reports it.",
       "au": "v2/s6-wet-w4"
      },
      {
       "b": "w5",
       "zh": "这就是手术记录的封存：写完就不再回头补改。",
       "en": "That is sealing the operative note: once written, it is not amended afterwards.",
       "au": "s6/wet-w5"
      }
     ]
    },
    {
     "v": "outcomes",
     "lines": [
      {
       "b": "u1",
       "zh": "作者看过真实数据后，记录质控和结果方向：支持、不支持，还是不可判。",
       "en": "After reviewing the real data, the author records QC and the direction: supports, does not support, or inconclusive.",
       "au": "v2/s6-outcomes-u1"
      },
      {
       "b": "u2",
       "zh": "质控合格、但不支持预设判断，照实记录，不用删掉。这也是结果。",
       "en": "QC passed but the pre-set rule is not supported: record it as it is, no need to delete it. It is still a result.",
       "au": "v2/s6-outcomes-u2"
      },
      {
       "b": "u3",
       "zh": "质控失败或者说不清，只能记为不可判，不能当成阴性结果来写。",
       "en": "If QC failed or is unknown, it can only be inconclusive, never written up as a negative result.",
       "au": "v2/s6-outcomes-u3"
      },
      {
       "b": "u4",
       "zh": "把这两种分开，就能少很多「做不出来」的糊涂账。",
       "en": "Keeping the two apart clears up a lot of muddled \"it just didn't work\" accounting.",
       "au": "s6/outcomes-u4"
      }
     ]
    }
   ]
  },
  {
   "id": "s7",
   "no": "10",
   "title": "⑦ 稿件与证据包 = 病理报告",
   "kicker": "STEP 7 · MANUSCRIPT & EVIDENCE PACK",
   "beats": [
    {
     "v": "ms",
     "lines": [
      {
       "b": "k1",
       "zh": "第七步，干实验文章：把真实分析写成英文 IMRaD 稿，作者随时看得到进展。",
       "en": "Step seven, the dry-lab article: real analyses written up as an English IMRaD draft the author can follow at any time.",
       "au": "v2/s7-ms-k1"
      },
      {
       "b": "k2",
       "zh": "干实验槽位要标完成，图文件必须存在，还要登记产生它的脚本和输出表。",
       "en": "To mark a dry slot done, the figure file must exist and the script and output table that produced it must be registered.",
       "au": "v2/s7-ms-k2"
      },
      {
       "b": "k3",
       "zh": "每条论断登记进 claims.csv：等级、证据、所属槽位，以及有没有人工核对。",
       "en": "Every claim goes into claims.csv: grade, evidence, slot, and whether a person has checked it.",
       "au": "v2/s7-ms-k3"
      },
      {
       "b": "k4",
       "zh": "每次改稿都跑一遍稿件检查：湿槽位里的结果性措辞、过强的用词，都会被标出来。",
       "en": "Every revision runs the manuscript check: result wording in wet slots and over-strong words are flagged.",
       "au": "v2/s7-ms-k4"
      },
      {
       "b": "k5",
       "zh": "稿件分三个阶段：只有干实验、干加湿、投稿候选。每升一级都有门槛，作者同意才切换。",
       "en": "Three manuscript stages: dry only, dry plus wet, submission candidate. Each step up has a threshold, and switches only with the author’s consent.",
       "au": "v2/s7-ms-k5"
      },
      {
       "b": "k6",
       "zh": "最后，用 export-pack 打成证据包；别人用 verify-pack，可以逐个文件核对。",
       "en": "Finally, export-pack bundles the evidence pack; anyone can check it file by file with verify-pack.",
       "au": "s7/pack-k5"
      },
      {
       "b": "k7",
       "zh": "就像病理报告：不确定，就写不确定，不能为了好看写成确定。",
       "en": "Like a pathology report: if it is uncertain, write uncertain; never make it look certain.",
       "au": "s7/pack-k4"
      }
     ]
    }
   ]
  },
  {
   "id": "gate",
   "no": "11",
   "title": "花钱和对外，逐项授权",
   "kicker": "THE BOTTOM RULE",
   "beats": [
    {
     "v": "spend",
     "lines": [
      {
       "b": "x1",
       "zh": "贯穿七步的，还有一条底线规则：G-spend 和 G-external，逐项授权。",
       "en": "Running under all seven steps is one bottom rule: G-spend and G-external, authorised item by item.",
       "au": "gate/spend-x1"
      },
      {
       "b": "x2",
       "zh": "凡是花钱的，比如消耗 Edison 积分；凡是对外的，比如上传数据、推送 Git、发邮件——",
       "en": "Anything that spends money, such as Edison credits; anything external, such as uploading data, a Git push, or an email—",
       "au": "gate/spend-x2"
      },
      {
       "b": "x3",
       "zh": "AI 都必须停下来，等作者一项一项签字。",
       "en": "the AI must stop and wait for the author to sign off, one item at a time.",
       "au": "gate/spend-x3"
      },
      {
       "b": "x3c",
       "zh": "花钱这一道，脚本自己也会拦：不加 confirm 参数不调用，超过课题里写的月度上限也不调用。",
       "en": "For spending, the script itself blocks: no call without the confirm flag, and none beyond the monthly cap set in the topic.",
       "au": "v2/gate-spend-x3c"
      },
      {
       "b": "x3b",
       "zh": "课题批准记进项目历史，每次 Edison 花费记进账本：谁、什么时候、花了多少。",
       "en": "Topic approvals go into the project history and every Edison spend into a ledger: who, when, how much.",
       "au": "v2/gate-spend-x3b"
      },
      {
       "b": "x4",
       "zh": "这就是主刀签字：助手可以把一切准备好，但下刀那一下，写的是主刀的名字。",
       "en": "That is the surgeon's signature: assistants may prepare everything, but the incision carries the surgeon's name.",
       "au": "gate/spend-x4"
      }
     ]
    }
   ]
  },
  {
   "id": "howto",
   "no": "12",
   "title": "怎么用起来",
   "kicker": "HOW TO USE IT",
   "beats": [
    {
     "v": "install",
     "lines": [
      {
       "b": "h1",
       "zh": "下面讲怎么用起来。需要一台 Mac、Codex，和 3.10 到 3.14 之间的 Python；核心脚本只用标准库，不用 pip。",
       "en": "Now, how to use it. You need a Mac, Codex, and Python 3.10 to 3.14; the core scripts use only the standard library, no pip.",
       "au": "v2/howto-install-h1"
      },
      {
       "b": "h2",
       "zh": "下载压缩包解压，双击 Install.command；已经装过旧版，就双击 Upgrade.command，旧版本默认保留。",
       "en": "Download and unzip, double-click Install.command; if an older version is installed, double-click Upgrade.command, and the old one is kept by default.",
       "au": "v2/howto-install-h2"
      },
      {
       "b": "h3",
       "zh": "安装前，先按 MANIFEST 校验每个文件的指纹；首次安装会问使用者姓名和 NCBI 邮箱，以后用 configure 修改。",
       "en": "Before installing it checks every file against the MANIFEST; the first install asks for your name and NCBI email, editable later with configure.",
       "au": "v2/howto-install-h3"
      },
      {
       "b": "h4",
       "zh": "装完运行 doctor 体检：Python 版本、文件完整性、本机配置。安装文件被改过，doctor 直接报 FAIL。",
       "en": "Then run doctor: Python version, file integrity, local configuration. If an installed file was altered, doctor reports FAIL.",
       "au": "v2/howto-install-h4"
      }
     ]
    },
    {
     "v": "first",
     "lines": [
      {
       "b": "f1",
       "zh": "重启 Codex，输入 $kosmos-lite-research-loop-v1-3-0，就能调用这个技能。",
       "en": "Restart Codex and type $kosmos-lite-research-loop-v1-3-0 to call the skill.",
       "au": "v2/howto-first-f1"
      },
      {
       "b": "f2",
       "zh": "第一次建议用自带的演示课题练手：init-project 加上 --example demo-dex-atrophy。",
       "en": "For a first run, use the bundled demo topic: init-project with --example demo-dex-atrophy.",
       "au": "v2/howto-first-f2"
      },
      {
       "b": "f3",
       "zh": "一次典型对话是这样的：你说「新建课题，放在这个目录」，它最多问三个问题，其余给默认值，标「待确认」。",
       "en": "A typical conversation: you say “new topic, in this folder”; it asks at most three questions, fills the rest with defaults marked to-be-confirmed.",
       "au": "v2/howto-first-f3"
      },
      {
       "b": "f4",
       "zh": "你确认课题后，它运行 approve-topic 记下你的名字；从这一刻起，检索和分析才放行。",
       "en": "Once you confirm, it runs approve-topic with your name; only from then on are searches and analyses allowed.",
       "au": "v2/howto-first-f4"
      },
      {
       "b": "f5",
       "zh": "每一轮结束，它给你三句话总结、最多三个待你确认的问题，和下一步建议。",
       "en": "At the end of each round you get a three-sentence summary, at most three questions for you, and a suggested next step.",
       "au": "v2/howto-first-f5"
      }
     ]
    },
    {
     "v": "files",
     "lines": [
      {
       "b": "q1",
       "zh": "项目目录里会出现这些文件：topic.json 和 project-state.json，管课题和批准。",
       "en": "These files appear in the project folder: topic.json and project-state.json hold the topic and approvals.",
       "au": "v2/howto-files-q1"
      },
      {
       "b": "q2",
       "zh": "world-model.md 是世界模型；evidence 里是证据日志和引用核验；cycles 里是每轮复盘和留痕。",
       "en": "world-model.md is the world model; evidence holds the evidence log and citation check; cycles holds round reviews and the trace.",
       "au": "v2/howto-files-q2"
      },
      {
       "b": "q3",
       "zh": "design 和 sop 放设计和 SOP；manuscript 放稿件、槽位和 claims.csv；wetlab/raw 放你的原始数据。",
       "en": "design and sop hold designs and SOPs; manuscript holds the draft, slots and claims.csv; wetlab/raw holds your raw data.",
       "au": "v2/howto-files-q3"
      },
      {
       "b": "q4",
       "zh": "交接时，handoff 里会出现证据包。这些文件都在你自己的电脑上；只有检索请求会发到公开数据库。",
       "en": "At handoff the evidence pack appears under handoff. All these files stay on your own computer; only search queries go out to public databases.",
       "au": "v2/howto-files-q4"
      }
     ]
    }
   ]
  },
  {
   "id": "demo",
   "no": "13",
   "title": "三个现场：真实脚本，当场拦下",
   "kicker": "THREE LIVE DEMOS · REAL v1.3.0 OUTPUT",
   "beats": [
    {
     "v": "demog1",
     "lines": [
      {
       "b": "e1",
       "zh": "下面看三个现场。屏幕上是 v1.3.0 脚本在演示课题上的真实输出，只做了删减。",
       "en": "Three scenes. On screen is real output of the v1.3.0 scripts on the demo topic, only trimmed.",
       "au": "v2/demo-demog1-e1"
      },
      {
       "b": "e2",
       "zh": "第一个：课题批准之后，有人顺手把 topic.json 里的预算改了一下。",
       "en": "One: after the topic was approved, someone casually changed the budget in topic.json.",
       "au": "v2/demo-demog1-e2"
      },
      {
       "b": "e3",
       "zh": "再检查一次文献权限：BLOCKED。topic.json 已修改，原批准失效，需要作者重新确认。",
       "en": "Check literature permission again: BLOCKED. topic.json was modified; the approval lapsed and the author must confirm again.",
       "au": "v2/demo-demog1-e3"
      },
      {
       "b": "e4",
       "zh": "只改了一个数字，也一样。AI 不能自己补批准，也不能拿旧的批准顶着。",
       "en": "One number changed, same result. The AI cannot re-approve itself or lean on the old approval.",
       "au": "v2/demo-demog1-e4"
      }
     ]
    },
    {
     "v": "demowet",
     "lines": [
      {
       "b": "n1",
       "zh": "第二个：湿实验数据还没锁定，有人在 fig4 槽位里先写了一句「处理组指标显著升高」。",
       "en": "Two: the wet data are not locked yet, and someone writes in slot fig4: “the marker rose significantly in the treated group”.",
       "au": "v2/demo-demowet-n1"
      },
      {
       "b": "n2",
       "zh": "稿件检查直接 FAIL：fig4 湿实验尚无锁定数据，却出现结果性表述。",
       "en": "The manuscript check fails at once: fig4 has no locked data, yet result wording appears.",
       "au": "v2/demo-demowet-n2"
      },
      {
       "b": "n3",
       "zh": "这是有限的关键词规则：能拦住常见写法，但不保证识别所有改写，全文仍要人工看。",
       "en": "It is a limited keyword rule: it catches common phrasings but cannot promise to catch every rewording, so a person still reads the whole text.",
       "au": "v2/demo-demowet-n3"
      }
     ]
    },
    {
     "v": "demonext",
     "lines": [
      {
       "b": "y1",
       "zh": "第三个：一轮结束，想进入下一轮。",
       "en": "Three: a round ends and we want to move to the next one.",
       "au": "v2/demo-demonext-y1"
      },
      {
       "b": "y2",
       "zh": "引用核验离线运行，有一条引用没能核实，状态是 UNVERIFIED，不算通过。",
       "en": "The citation check ran offline; one citation could not be verified, so the status is UNVERIFIED, not a pass.",
       "au": "v2/demo-demonext-y2"
      },
      {
       "b": "y3",
       "zh": "与此同时，fig4 锁定之后，原始数据里有一个数被改了。",
       "en": "Meanwhile, after fig4 was locked, one number in the raw data was changed.",
       "au": "v2/demo-demonext-y3"
      },
      {
       "b": "y4",
       "zh": "next-cycle 被拦下，两条理由都列出来：原始数据锁定后被改动；引用核验未核验。",
       "en": "next-cycle is blocked with both reasons listed: raw data changed after locking; citation check unverified.",
       "au": "v2/demo-demonext-y4"
      },
      {
       "b": "y5",
       "zh": "恢复只有两条路：补齐，或者作者明确同意，用 override 写明理由，记入历史。",
       "en": "Only two ways forward: fix it, or the author explicitly agrees and writes the reason with an override, recorded in the history.",
       "au": "v2/demo-demonext-y5"
      }
     ]
    }
   ]
  },
  {
   "id": "limits",
   "no": "14",
   "title": "诚实的边界",
   "kicker": "HONEST LIMITS",
   "beats": [
    {
     "v": "limits",
     "lines": [
      {
       "b": "i1",
       "zh": "也要说清楚，它做不到什么。",
       "en": "It is just as important to say what it cannot do.",
       "au": "limits/limits-i1"
      },
      {
       "b": "i2",
       "zh": "它不控制仪器，也不替你做实验；湿实验永远是人来做。",
       "en": "It does not control instruments or run experiments for you; the wet lab is always done by people.",
       "au": "limits/limits-i2"
      },
      {
       "b": "i3",
       "zh": "程序检查不能证明科研结论正确，也不能证明检索已经穷尽。",
       "en": "Program checks cannot prove a scientific conclusion correct, nor that a search was exhaustive.",
       "au": "v2/limits-limits-i3"
      },
      {
       "b": "i4",
       "zh": "哈希和署名只是本地自述：能发现事后改动，但不能证明作者身份，也不能证明湿实验数据是真的。",
       "en": "Hashes and names are local self-declarations: they reveal later edits, but cannot prove who the author is or that wet-lab data are genuine.",
       "au": "v2/limits-limits-i4"
      },
      {
       "b": "i5",
       "zh": "引用核验只说明标识存在、未见撤稿标记，不说明原文支持你的结论。",
       "en": "The citation check only shows identifiers exist without a retraction flag; it does not show the papers support your claim.",
       "au": "v2/limits-limits-i5"
      },
      {
       "b": "i6",
       "zh": "目前的验证，是本地 AI 验证加上 AI 独立复核，还没有真实课题组的长期使用数据。",
       "en": "Validation so far is local AI validation plus independent AI review; there is no long-term use data from real labs yet.",
       "au": "limits/limits-i4"
      },
      {
       "b": "i7",
       "zh": "所以，我们正在招募第一批真实试点。",
       "en": "That is why we are recruiting the first real pilots.",
       "au": "limits/limits-i5"
      }
     ]
    }
   ]
  },
  {
   "id": "who",
   "no": "15",
   "title": "谁能得到什么",
   "kicker": "WHO GETS WHAT",
   "beats": [
    {
     "v": "who",
     "lines": [
      {
       "b": "j1",
       "zh": "对科研处：每个课题都有可核查的证据包；花钱和对外动作都要授权；申报之前，可以先做一次可行性评估。",
       "en": "For research offices: a verifiable evidence pack per project; spending and external actions need sign-off; a feasibility check before grant applications.",
       "au": "who/who-j1"
      },
      {
       "b": "j2",
       "zh": "对 PI 和导师：动手前查漏，提前拿到设施核对清单，带学生也有了一套统一的标准。",
       "en": "For PIs and supervisors: gaps caught before the bench, a facility checklist in advance, and one standard for training students.",
       "au": "v2/who-who-j2"
      },
      {
       "b": "j3",
       "zh": "对临床医生：没有自己的实验室也能开始，先用公开数据找方向，再决定要不要做湿实验。",
       "en": "For clinicians: start even without your own lab; use public data to find a direction, then decide on wet work.",
       "au": "who/who-j3"
      },
      {
       "b": "j4",
       "zh": "三类人看的是同一份证据包，只是各自关心的那一页不同。",
       "en": "All three read the same evidence pack; each simply cares about a different page.",
       "au": "who/who-j4"
      }
     ]
    }
   ]
  },
  {
   "id": "offer",
   "no": "16",
   "title": "拿一个课题来试点",
   "kicker": "THE OFFER",
   "beats": [
    {
     "v": "offer",
     "lines": [
      {
       "b": "z1",
       "zh": "最后，只请您做一个决定：拿一个正在犹豫要不要做湿实验的课题，来试点。",
       "en": "Finally, just one decision: bring a project where you are unsure about starting wet work, and pilot it.",
       "au": "offer/offer-z1"
      },
      {
       "b": "z2",
       "zh": "可以是半天工作坊，现场把一个课题的干实验跑一遍。",
       "en": "It can be a half-day workshop, running one project's dry lab live.",
       "au": "offer/offer-z2"
      },
      {
       "b": "z3",
       "zh": "可以是四到六周的课题试点陪跑，从课题门一直走到证据包。",
       "en": "A four-to-six-week project pilot, walked through from the topic gate to the evidence pack.",
       "au": "offer/offer-z3"
      },
      {
       "b": "z4",
       "zh": "也可以是院内部署与带教：在本地运行，数据不出院。",
       "en": "Or in-hospital deployment and training: runs locally, and data never leave the hospital.",
       "au": "offer/offer-z4"
      },
      {
       "b": "z4b",
       "zh": "试点结束时，您手里会有一份完整的证据包，和一个清楚的决定：做、缓做，还是换方向。",
       "en": "At the end of a pilot you hold a complete evidence pack and a clear decision: go, wait, or change direction.",
       "au": "offer/offer-z4b"
      },
      {
       "b": "z5",
       "zh": "湿实验之前，先把账算清。谢谢。",
       "en": "Before the wet lab, settle the accounts first. Thank you.",
       "au": "offer/offer-z5"
      }
     ]
    }
   ]
  }
 ],
 "source": {
  "autodna": {
   "cite": "Wu, M. et al. An AI-native experimental laboratory for autonomous biomolecular operations. Nature (2026)",
   "doi": "10.1038/s41586-026-11228-6",
   "url": "https://doi.org/10.1038/s41586-026-11228-6"
  }
 }
};
