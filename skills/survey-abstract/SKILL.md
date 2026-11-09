---
name: survey-abstract
description: "Use when drafting, revising, or auditing the abstract of an academic literature review or survey, including the five-part formula, six-sentence CS realization, background tension, gap statement, positioning, taxonomy/coverage framework, resource/evidence, and challenges/opportunities ending. 中文触发：写综述摘要、改摘要、摘要五段式、abstract、summary。"
---

# 综述摘要：五段式

综述摘要不是研究论文摘要的变体。它要在 200–300 词（医学/药物 100–150 词）内完成五件事：**钩子 → 身份 → 地图 → 证据 → 展望**。顺序固定，功能不能混。

数字与引用遵守 `../shared/evidence-norms.md`：摘要里每个数字都要能回到正文。

## 五段结构

| 段 | 功能 | 长度 | 是否必写 |
|---|---|---|---|
| ① 背景钩子 | 用问题、矛盾或新趋势让读者非读不可 | 1–2 句 | 必写 |
| ② 定位声明 | 标明这是综述，并给出对象与范围 | 1 句 | 必写 |
| ③ 纵览框架 | 用分类轴交代覆盖板块，给可核验数字 | 占一半以上 | 必写 |
| ④ 价值/证据 | benchmark 对比、方法选择建议 | 1 句 | 可选 |
| ⑤ 挑战与展望 | challenge 与 opportunity/future direction 成对 | 1 句 | 必写 |

五段是逻辑结构。CS/工程摘要通常把它展开成六句（S1–S6）：**S1 背景张力 → S2 指出缺口 → S3 综述定位 → S4 展开框架 → S5 资源/证据 → S6 展望收尾**。S2 可视为第①段的后半；医学短摘要常把 S2 并入 S1。

### CS 六句实现

| 句 | 对应五段 | 功能 | 高频句式 | 示例 |
|---|---|---|---|---|
| S1 | ① 前半 | 背景张力 | `With the explosive growth of…` / `X is achieving ever-increasing performance on…` / `X aims to…, which is a fundamental task…` | With the explosive growth of online information, recommender systems play a key role… |
| S2 | ① 后半 / ② 前 | 指出缺口 | `However, there is neither… nor…` / `However, this is sub-optimal due to: (i)…; (ii)…; (iii)…` | However, there is neither a unified treatment of GNN explainability methods, nor a standard benchmark… |
| S3 | ② | 综述定位 | `This article/survey aims to provide a comprehensive review of…` / `In this survey, we conduct a comprehensive survey on… by proposing a new taxonomy of…` | This article aims to provide a comprehensive review of recent research efforts on GNN-based recommender systems. |
| S4 | ③ | 展开框架 | `Specifically, we provide a taxonomy of X according to A and B.` / `Moreover, we systematically analyze/summarize…` / `Furthermore, we state new perspectives pertaining to…` | Specifically, we provide a taxonomy of GNN-based recommendation models according to the types of information used and recommendation tasks. |
| S5 | ④ | 资源贡献 | `We collect the representative papers along with their open-source implementations in [URL].` / `we provide a testbed…, including datasets, common algorithms and evaluation metrics.` | To facilitate evaluations, we provide a testbed for GNN explainability, including datasets, common algorithms and evaluation metrics. |
| S6 | ⑤ | 展望收尾 | `Last but not least, we state new perspectives and suggest challenging directions which deserve further investigations in the future.` / `Finally, future directions for research are suggested.` | — |

## ① 背景钩子

以问题、矛盾或新趋势开头，不写「X 是一个重要领域」。

可用三种钩子：

- **条件转变**：「实验室受控到 in-the-wild 条件的转变，加上深度学习近期成功，使深度网络被越来越多地用于 FER。」
- **部署矛盾**：「高性能深度网络计算/参数密集，难以部署在资源受限的边缘设备。」
- **疗效与代价**：「免疫疗法在多种实体瘤/血液肿瘤中诱导持久应答，改变了治疗格局——但带来了独特毒性谱。」

写法要点：

- 第一句出现转变、矛盾、新需求或新失败。
- 不用「随着……的快速发展」「近年来……受到广泛关注」开头。
- 不先给定义；定义可以放到第②段或正文。

## 缺口句（S2）

五段逻辑里，缺口通常并入第①段；CS 摘要常把它单独成句。缺口句决定综述的合法性，必须具体。

- **二元否定**：`However, there is neither a unified treatment of… nor a standard benchmark…`
- **编号归因**：`However, existing methods are sub-optimal due to: (i)…; (ii)…; (iii)…`
- **具体失败**：指出哪个任务、哪个数据条件、哪个评价维度上失败，而不是“研究仍不充分”。

缺口越具体，第③段的定位越有说服力。不要用“然而，现有综述还不够全面”这种可以套在任何领域的句子。

## ② 定位声明

用综述文体动词，让读者知道这是综述，不是方法论文或立场文章。

- `This survey provides a comprehensive review of [object], [scope].`
- `We review the current landscape from a [mechanistic / systems / clinical] perspective.`
- `本文综述 [对象]，覆盖 [范围]，并给出 [分类/框架/议程]。`

这一句必须包含**对象 + 范围**。不要只写「本文进行了全面综述」；不要省略，否则读者无法判断文体。

## ③ 纵览框架

这是摘要的核心，通常占 50–65%。用分类轴交代覆盖板块，而不是「本文介绍了 A、B、C」。

**Pipeline 式**（CS/工程常用）：

> 数据集与评价原则 → 标准 pipeline 各阶段 → SOTA 方法（按静态图 vs 动态序列分类）及优劣 → benchmark 性能对比 → 扩展议题与应用场景。

**编号式**（板块多、层次深时）：

> (1) 背景与核心思想；(2) 作用机制；(3) 知识形式四分类；(4) 关键方法对比（知识合并、多教师、跨模态、自蒸馏）；(5) 与 GAN/NAS/联邦学习等技术的融合；(6) 多领域应用；(7) 挑战与未来方向。

**漏斗式**（医学/药物常用）：

> 机制 → 临床影响 → 综述焦点（病理生理、诊断、管理）。

写法要点：

- 覆盖范围必须用**分类轴**表达：按知识类型、按机制、按数据集/pipeline 阶段。
- **数字是可信度标志**：多少数据集、多少方法、多少平台、多少在研管线。如「20+ 商业化平台、2 个上市、85+ 在临床开发」。
- 数字必须可核验；不要为了显得全面而编造。
- 板块数量控制在 3–7 个；超过 7 个时用编号，不要让读者迷路。

## ④ 价值/证据句

给读者一个「这篇综述能拿来做什么」的落点。工程/计算类常写：

> 本文总结了主流 benchmark 上的性能对比，并给出方法选择建议。

医学/药物类可以并入第③段，不单独成句。不要写「本文具有重要参考价值」这种空话。

## ⑤ 挑战与展望收尾

把 challenge 与 opportunity/future direction 成对写出：

> 最后，本文讨论剩余挑战、对应机会，以及 [领域] 未来方向。

不能只写「仍有挑战」「仍需进一步研究」。顶刊综述几乎都以「挑战 + 机会/方向」收尾。

## 可直接套用的英文模板（CS 六句）

> S1 With the [rapid development / explosive growth] of [X], [task/system] [plays a key role in… / is achieving ever-increasing performance].
> S2 However, [there is neither a unified treatment of… nor…] / [existing methods are sub-optimal due to: (i)…; (ii)…; (iii)…].
> S3 In this survey, we conduct a comprehensive survey on [field] by proposing a new taxonomy of existing state-of-the-art literature.
> S4 Specifically, we [板块 A]; Moreover, we systematically [板块 B]; Furthermore, we [板块 C: applications/benchmark comparison].
> S5 To facilitate [evaluations/research], we provide [testbed/open-source collection] including [datasets, algorithms and metrics].
> S6 Last but not least, we state new perspectives and suggest challenging directions that deserve further investigation.

中文写作时保留同样的六句推进，不要逐字翻译英文壳：

> S1 随着 [领域] 的 [增长/转变]，[任务/系统] 成为……。
> S2 然而，现有工作既缺少……，也缺少……；或存在 (i)……；(ii)……；(iii)…… 三个不足。
> S3 本文综述 [对象]，覆盖 [范围]，并提出 [taxonomy/框架]。
> S4 具体而言，我们……；进一步，我们系统分析……；此外，我们……。
> S5 为便于评测，我们提供 [testbed/开源集合]，包括 [数据集、算法与指标]。
> S6 最后，本文讨论剩余挑战、对应机会与未来方向。

## 语言风格六个特征

1. **路标副词固定成套。** `Specifically → Moreover → Furthermore → Last but not least`（或 `First/Then/Finally`）。每个副词对应一个内容板块，读者不看正文也能猜到结构。
2. **三组动词分工明确。**
   - 框架动词：`provide / conduct / present a (comprehensive) review/survey`
   - 分析动词：`systematically analyze / critically review / summarize / categorize / compare`
   - 贡献动词：`propose a taxonomy / provide a testbed / state new perspectives / suggest directions`
3. **`taxonomy` 是核心词。** CS 顶刊综述几乎必提 `taxonomy / classification`（如 `propose a new taxonomy of existing state-of-the-art literature`）。分类学贡献是综述区别于普通论文的身份标志；有 taxonomy 就明写，没有就不要硬贴。
4. **缺口句必用 `However` 转折。** 用二元否定 `neither… nor…` 或编号归因 `(i)…; (ii)…; (iii)…`。缺口越具体，综述合法性越强；不要写“研究仍不充分”。
5. **形容词克制但有节律。** 高频：`comprehensive / systematic / unified / standardized / representative / state-of-the-art`。不用 `novel`——`novel` 留给研究论文；综述的增量用 `taxonomy / unified / systematic` 表达。
6. **数字化贡献收尾。** 给可核验资源：GitHub 链接、testbed、benchmark 实验对比。一句带过，不展开数字细节；链接必须真实可访问。

## 领域差异

| 维度 | CS / 工程类 | 医学 / 药物类 |
|---|---|---|
| 长度 | 约 200–300 词 | 约 100–150 词 |
| 框架 | 枚举细密，可用 (1)…(7) | 不做编号枚举 |
| 组织 | 数据集 → pipeline → 方法分类 → benchmark | 机制 → 临床影响 → 综述焦点（病理生理、诊断、管理） |
| 数字 | 数据集数、方法数、benchmark 数 | 平台数、上市数、临床管线数 |
| 价值句 | 常单独写 benchmark 对比 | 常并入框架段 |

## 摘要自检

- 第一句是问题/矛盾/趋势，还是「X 很重要」？
- 有没有一句 `However` 缺口句？缺口是具体的 neither…nor… 或 (i)(ii)(iii)，还是“研究不充分”？
- 有没有一句 `This survey/review provides…` 或等价的定位声明？
- 第③段有没有分类轴？有没有可核验数字？
- 第③段是否占了一半以上？
- 如果提出 taxonomy，摘要里有没有明写 `taxonomy / classification`？
- 路标词是否成套：`Specifically → Moreover → Furthermore → Last but not least`？
- 有没有误用 `novel`？综述的增量应落在 taxonomy / unified / systematic。
- 资源句是否有真实链接或 testbed，而不是空泛承诺？
- 结尾是否把 challenge 和 opportunity/future direction 成对写出？
- 删掉任何一句「全面综述」「重要参考价值」，信息是否不变？如果不变，删掉。
- 摘要承诺的板块，正文是否都兑现？

## 叙事型例外

叙事型可以压缩成四句，但仍保留「钩子 → 定位 → 框架 → 展望」。不要退回「定义 → 战绩 → 分述」的旧写法；那只适合极少数被约稿的领域定义之作。

需要填空时，复制 `assets/abstract-blueprint.md`。正文结构、taxonomy 和图表规划用 `survey-writing` 技能，不要在本技能里展开。
