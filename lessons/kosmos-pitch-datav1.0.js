/* Kosmos-lite 科研闭环 · pitch lesson v1.0 (PREVIEW) script — built by build-datav1.0.py.
   Chapters -> beats (one view each) -> lines. Narration zh-CN-YunyangNeural -5% under media/kosmos-pitch-audio/. */
window.LG_DATA = {
 "version": "1.0",
 "lesson": "kosmos-lite-pitch",
 "voice": "zh-CN-YunyangNeural",
 "rate": "-5%",
 "audioBase": "media/kosmos-pitch-audio/",
 "chapters": [
  {
   "id": "open",
   "no": "00",
   "title": "湿实验之前，先把账算清",
   "kicker": "KOSMOS-LITE · RESEARCH LOOP",
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
       "zh": "今天介绍一套科研流程：Kosmos-lite 科研闭环。",
       "en": "Today: a research workflow called the Kosmos-lite Research Loop.",
       "au": "open/cover-c2"
      },
      {
       "b": "c3",
       "zh": "一句话概括：AI 负责跑腿，人只签关键几步；每一步留痕、可核查。",
       "en": "In one line: AI does the legwork, people sign only the key steps, and every step leaves an auditable trail.",
       "au": "open/cover-c3"
      },
      {
       "b": "c4",
       "zh": "我用外科手术来打比方，十几分钟，最后只请您做一个决定。",
       "en": "I will explain it with surgical analogies. A little over ten minutes, and at the end I ask you for one decision.",
       "au": "open/cover-c4"
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
       "zh": "从课题配置，到干实验、假设表、分阶段设计、SOP、湿实验，最后打成证据包。",
       "en": "From topic set-up to dry lab, hypothesis table, staged design, SOP, wet lab, and finally an evidence pack.",
       "au": "map/poster-m3"
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
   "title": "① 课题门 = 术前知情同意",
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
       "zh": "它做三件事：多源检索文献，下载公开数据，在本地电脑上做分析。",
       "en": "Three jobs: multi-source literature search, downloading public data, and analysis on a local computer.",
       "au": "s2/dryloop-l2"
      },
      {
       "b": "l3",
       "zh": "所有发现都汇进一个世界模型文件，它是这个课题唯一的「真值」。",
       "en": "All findings flow into one world-model file, the project's single source of truth.",
       "au": "s2/dryloop-l3"
      },
      {
       "b": "l4",
       "zh": "每条证据进日志时都要贴标签：是事实、是关联，还是推测。",
       "en": "Every piece of evidence is labelled in the log: fact, association, or speculation.",
       "au": "s2/dryloop-l4"
      },
      {
       "b": "l5",
       "zh": "分析前先设好阳性和阴性对照：方法连已知答案都找不出来，结果就不算数。",
       "en": "Positive and negative controls are set before analysis; if the method cannot recover known answers, the result does not count.",
       "au": "s2/dryloop-l5"
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
       "zh": "第三步，假设表。每个假设只有三种状态：支持、削弱、已淘汰。",
       "en": "Step three, the hypothesis table. Each hypothesis has three states: supported, weakened, eliminated.",
       "au": "s34/hypo-h1"
      },
      {
       "b": "h2",
       "zh": "被淘汰的假设不删除，留在表里，写清楚是被哪条证据淘汰的。",
       "en": "Eliminated hypotheses are not deleted; they stay in the table, with the evidence that eliminated them.",
       "au": "s34/hypo-h2"
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
       "zh": "每个阶段都设好进入下一阶段的门槛：前一关不过，后面的钱就不花。",
       "en": "Each stage has a threshold for entering the next: if one fails, the next stage's money is not spent.",
       "au": "s34/stages-t2"
      },
      {
       "b": "t3",
       "zh": "同时先写一份干稿：假如结果出来，图怎么放、话怎么说，提前想清楚。",
       "en": "Alongside, a dry draft: if results come in, how the figures go and what we would say, thought through in advance.",
       "au": "s34/stages-t3"
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
   "title": "⑤ 结构化 SOP = 模拟手术与器械清点",
   "kicker": "STEP 5 · STRUCTURED SOP",
   "beats": [
    {
     "v": "sop",
     "lines": [
      {
       "b": "o1",
       "zh": "第五步是这个版本新加的：结构化 SOP。实验步骤不再是一段文字，而是一张能被检查的表。",
       "en": "Step five is new in this version: the structured SOP. Steps are no longer prose but a table that can be checked.",
       "au": "s5/sop-o1"
      },
      {
       "b": "o2",
       "zh": "第一，干跑，等于模拟手术：在纸面上，把每一管、每一孔都走一遍。",
       "en": "First, the dry run, like a simulated operation: walk every tube and every well on paper.",
       "au": "s5/sop-o2"
      },
      {
       "b": "o3",
       "zh": "读数前还没加样、漏了无模板对照 NTC、加热时没盖盖子，都能在动手前查出来。",
       "en": "Reading before the sample is added, a missing no-template control, heating with the lid open: all caught before the bench.",
       "au": "s5/sop-o3"
      },
      {
       "b": "o4",
       "zh": "第二，用量清单，等于器械清点：每种试剂够用、不足、过期还是缺失，一目了然。",
       "en": "Second, the reagent list, like an instrument count: enough, short, expired or missing, at a glance.",
       "au": "s5/sop-o4"
      },
      {
       "b": "o5",
       "zh": "第三，SOP 冻结，等于术式确定：批准之后不临时改；要改，就写理由、重新冻结。",
       "en": "Third, the SOP freeze, like settling the procedure: no ad-hoc changes after approval; to change it, give a reason and freeze again.",
       "au": "s5/sop-o5"
      },
      {
       "b": "o6",
       "zh": "第四，隐性细节提示：那些老师傅只在口头上提醒的细节，提前列出来。",
       "en": "Fourth, hidden-detail reminders: the details senior hands only mention out loud, listed in advance.",
       "au": "s5/sop-o6"
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
       "zh": "做完，把仪器导出的原始文件交回来，先过质控：比如 qPCR 的 NTC、复孔差异、内参稳不稳。",
       "en": "Afterwards, the instrument's raw export comes back for QC: for qPCR, the NTC, replicate spread, and reference-gene stability.",
       "au": "s6/wet-w2"
      },
      {
       "b": "w3",
       "zh": "这就像术中冰冻：先确认这块组织能不能下结论，再往下走。",
       "en": "Like a frozen section: first confirm the tissue can support a conclusion, then go on.",
       "au": "s6/wet-w3"
      },
      {
       "b": "w4",
       "zh": "质控通过后，用 lock-wet 封存原始数据：哈希记录在案，之后再改，能被检出。",
       "en": "Once QC passes, lock-wet seals the raw data: its hash is on record, and later edits can be detected.",
       "au": "s6/wet-w4"
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
       "zh": "结果只分三类：阳性、信息性阴性、技术失败。",
       "en": "Results fall into only three classes: positive, informative negative, technical failure.",
       "au": "s6/outcomes-u1"
      },
      {
       "b": "u2",
       "zh": "信息性阴性，是对照都正常、方法可靠，只是没看到效应。它也是结果，也值得记录。",
       "en": "An informative negative: controls normal, method sound, just no effect seen. It is still a result, worth recording.",
       "au": "s6/outcomes-u2"
      },
      {
       "b": "u3",
       "zh": "技术失败，是对照没过。它不能当成阴性结果来写，只能重做。",
       "en": "A technical failure: the controls failed. It cannot be written up as a negative result, only repeated.",
       "au": "s6/outcomes-u3"
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
   "title": "⑦ 证据包 = 病理报告",
   "kicker": "STEP 7 · EVIDENCE PACK",
   "beats": [
    {
     "v": "pack",
     "lines": [
      {
       "b": "k1",
       "zh": "第七步，下结论之前，还有两道门：等效门和措辞门。",
       "en": "Step seven: before any conclusion, two more gates: the equivalence gate and the wording gate.",
       "au": "s7/pack-k1"
      },
      {
       "b": "k2",
       "zh": "最常见的错误是：P 大于 0.05，「无显著差异」，于是写成「两种方法一致」。",
       "en": "The most common mistake: P above 0.05, \"no significant difference\", so it gets written as \"the two methods agree\".",
       "au": "s7/pack-k2"
      },
      {
       "b": "k3",
       "zh": "可「无显著差异」不等于「一致」。要说等效，得事先登记等效界值，再看差值的置信区间是否落在界值之内。",
       "en": "But \"no significant difference\" is not agreement. To claim equivalence, pre-register a margin, then check whether the CI of the difference falls inside it.",
       "au": "s7/pack-k3"
      },
      {
       "b": "k4",
       "zh": "就像病理报告：不确定，就写不确定，不能为了好看写成确定。",
       "en": "Like a pathology report: if it is uncertain, write uncertain; never make it look certain.",
       "au": "s7/pack-k4"
      },
      {
       "b": "k5",
       "zh": "最后，用 export-pack 打成证据包；别人用 verify-pack，可以逐个文件核对。",
       "en": "Finally, export-pack bundles the evidence pack; anyone can check it file by file with verify-pack.",
       "au": "s7/pack-k5"
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
       "b": "x3b",
       "zh": "每一次批准都记进日志：谁、什么时候、批准了哪一项。",
       "en": "Every approval goes into the log: who, when, and which item.",
       "au": "gate/spend-x3b"
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
   "id": "demo",
   "no": "12",
   "title": "三个现场：动手之前就被拦下",
   "kicker": "THREE DEMOS · ILLUSTRATIVE",
   "beats": [
    {
     "v": "demodry",
     "lines": [
      {
       "b": "e1",
       "zh": "下面看三个现场。屏幕上的输出，是按真实检查项改写的示意，数据是虚构的。",
       "en": "Three scenes. The output on screen is an illustration based on the real checks; the data are fictional.",
       "au": "demo/demodry-e1"
      },
      {
       "b": "e2",
       "zh": "第一个：一份 qPCR 方案，先干跑一遍。",
       "en": "One: a qPCR protocol, dry-run first.",
       "au": "demo/demodry-e2"
      },
      {
       "b": "e3",
       "zh": "红色报错：第七步读数时，A3 孔里还没有加样本。",
       "en": "A red error: at the step-7 read-out, well A3 has no sample yet.",
       "au": "demo/demodry-e3"
      },
      {
       "b": "e4",
       "zh": "第二条：方案要求的无模板对照 NTC，整块板上一个都没有。",
       "en": "Second: the no-template control the protocol requires is nowhere on the plate.",
       "au": "demo/demodry-e4"
      },
      {
       "b": "e5",
       "zh": "还有一条警告：95 度加热那一步，管子是开着盖的。",
       "en": "And a warning: during the 95-degree heating step, the tube is open.",
       "au": "demo/demodry-e5"
      },
      {
       "b": "e5b",
       "zh": "改完再干跑一遍，全部通过，这份方案才能进入冻结。",
       "en": "Fix them, dry-run again, and only when everything passes can the protocol be frozen.",
       "au": "demo/demodry-e5b"
      },
      {
       "b": "e6",
       "zh": "这三处，平时要等结果出来，甚至审稿人问起，才会被发现。",
       "en": "Normally these surface only when the results come out, or even when a reviewer asks.",
       "au": "demo/demodry-e6"
      }
     ]
    },
    {
     "v": "demobom",
     "lines": [
      {
       "b": "f1",
       "zh": "第二个：用量清单，和实验室的库存表对一下。",
       "en": "Two: the reagent list, checked against the lab inventory.",
       "au": "demo/demobom-f1"
      },
      {
       "b": "f2",
       "zh": "按样本数、复孔、重复次数，再加百分之十的死体积余量，算出每种试剂要多少。",
       "en": "From samples, technical replicates and repeats, plus a ten-percent dead-volume margin, it works out what each reagent needs.",
       "au": "demo/demobom-f2"
      },
      {
       "b": "f3",
       "zh": "一条引物不够了，标 SHORT；一盒反转录试剂过期了，标 EXPIRED。",
       "en": "One primer is running short: SHORT. A reverse-transcription kit has expired: EXPIRED.",
       "au": "demo/demobom-f3"
      },
      {
       "b": "f4",
       "zh": "注意，它只报告，不下单。要不要买、买多少，由作者逐项同意。",
       "en": "Note: it reports, it does not order. Whether and how much to buy is approved by the author, item by item.",
       "au": "demo/demobom-f4"
      }
     ]
    },
    {
     "v": "demoword",
     "lines": [
      {
       "b": "n1",
       "zh": "第三个：写稿。有人写下：「无显著差异，说明两种方法一致」。",
       "en": "Three: writing. Someone writes: \"no significant difference, so the two methods agree\".",
       "au": "demo/demoword-n1"
      },
      {
       "b": "n2",
       "zh": "稿件检查直接拦下：没有事先登记的等效界值，也没有等效判定，这句话进不了投稿稿。",
       "en": "The manuscript check blocks it: no pre-registered margin and no equivalence verdict, so the sentence cannot enter a submission draft.",
       "au": "demo/demoword-n2"
      },
      {
       "b": "n3",
       "zh": "建议改成：「两种方法的均值差，落在事先设定的界值之内」，并给出置信区间。",
       "en": "Suggested: \"the mean difference between the methods lies within the pre-set margin\", with the confidence interval.",
       "au": "demo/demoword-n3"
      },
      {
       "b": "n4",
       "zh": "一句话的差别，往往就是审稿意见里一大段的差别。",
       "en": "One sentence often makes the difference of a whole paragraph of reviewer comments.",
       "au": "demo/demoword-n4"
      }
     ]
    }
   ]
  },
  {
   "id": "limits",
   "no": "13",
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
       "zh": "哈希是本地的自述记录：能发现事后被改过，但不能证明时间先后，也不能证明是谁签的。",
       "en": "Hashes are local, self-declared records: they reveal later edits, but cannot prove timing or who signed.",
       "au": "limits/limits-i3"
      },
      {
       "b": "i4",
       "zh": "目前的验证，是本地 AI 验证加上 AI 独立复核，还没有真实课题组的长期使用数据。",
       "en": "Validation so far is local AI validation plus independent AI review; there is no long-term use data from real labs yet.",
       "au": "limits/limits-i4"
      },
      {
       "b": "i5",
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
   "no": "14",
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
       "zh": "对 PI 和导师：动手前查漏，提前出用量清单，带学生也有了一套统一的标准。",
       "en": "For PIs and supervisors: gaps caught before the bench, reagent lists in advance, and one standard for training students.",
       "au": "who/who-j2"
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
   "no": "15",
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
