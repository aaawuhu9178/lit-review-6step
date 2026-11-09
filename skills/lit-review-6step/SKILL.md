---
name: lit-review-6step
description: 六步文献综述工作流编排器：研究缺口与 RQ → 检索策略 → 多通道检索与初筛 → 精读与提取 → 综合写作 → 统稿与格式。把已装的 literature-review-skill（YAN 五件套）、literature-review-skills（星塔五件套）、sr-screener、academic-paper、survey-writing、survey-abstract 与 AMiner 检索通道串成一条带门禁、有固定产物的流水线。支持从任意阶段进入：只有方向从 S1、已有题目从 S2、已有检索式从 S3、已有文献清单从 S4、已有提取表从 S5、已有初稿从 S6。用户说"做文献综述 / 开题综述 / 综述项目 / 从选题到成稿 / 从 S2 开始 / 检索策略表 / 初筛 / 提取表 / 研究缺口 / 帮我把综述流程搭起来"时触发。
metadata:
  version: "1.0.0"
  updated: "2026-11-09"
---

# 六步文献综述工作流（编排器）

本 skill 不重写方法论，只做三件事：**排阶段、定产物、把门禁**。方法论下沉到已安装的子 skill，按路径读取。

## 依赖

| 依赖 | 路径 | 用在哪 |
|---|---|---|
| YAN 五件套 | `.dsh/skills/literature-review-skill/skills/<子skill>/SKILL.md` | 第 2、4、5、6 步 |
| 星塔五件套 | `.dsh/skills/literature-review-skills/skills/<stage>/SKILL.md` | 第 1 步；第 5 步冲突梳理 |
| sr-screener | `.dsh/skills/sr-screener/SKILL.md` | 第 3 步正式筛选 |
| AMiner MCP | 工具 `mcp__aminer__search_papers_by_keyword` / `_by_venue` / `_by_author` / `_advanced` | 第 2–3 步检索通道 |
| academic-paper | `.dsh/skills/academic-paper/SKILL.md` | 第 6 步引用与格式核查 |
| survey-writing | `.dsh/skills/survey-writing/SKILL.md` | 第 5 步正文结构、taxonomy、图表 |
| survey-abstract | `.dsh/skills/survey-abstract/SKILL.md` | 第 6 步摘要五段式 |
| 证据规范 | `../shared/evidence-norms.md` | 全流程引用、数字与来源标注 |

## 开工前：预检

按顺序做，任何一项失败先报告再决定是否降级，不要闷头往下走：

1. **子 skill 在位**：上表 6 个本地路径的 `SKILL.md` 存在（`Test-Path`）。缺 YAN / 星塔 → 停，提示先跑 `install.ps1 -WithDeps`（或手动 clone），不要假装读过；缺 `sr-screener` / `academic-paper` → 可降级继续，但在阶段报告里注明。
2. **AMiner 通道**：
   ```powershell
   node .dsh/skills/lit-review-6step/scripts/aminer_health.mjs
   ```
   - `OK` → 可以走 AMiner；
   - `EXPIRED` / `INVALID` → 需要换 `AMINER_API_KEY`（见 `references/aminer.md`「换 token」），或走降级；
   - `MISSING` → 未配置，用降级通道。
3. **项目目录**：从 `文献综述项目模板/` 复制一份，命名 `综述_<主题>_<YYYYMMDD>/`。

## 从哪一步开始（入口）

默认从 S1 走，但不要逼已经有材料的用户从头来。开工前先问一句"你手上现在有哪一样"，按下表入口：

| 入口 | 手上有什么 | 入口先做的最小动作 | 跳过 | 留下的欠账（后面补） |
|---|---|---|---|---|
| S1 | 只有方向 | — | — | — |
| **S2** | **已定题目**（±RQ、±范围） | 写 RQ 卡：题目 → 一句 RQ → 概念块 | S1 的缺口分析 | 引言"现有综述总结"（S5 补） |
| S3 | 检索式/策略表，或指定了库和关键词 | 把策略落成表（≥3 行） | S1–S2 | 方法节的检索协议（S6 补） |
| S4 | 筛选后的文献清单（题录 / CSV / BibTeX） | 按清单重建候选表，`included=1` | S1–S3 | 筛选透明度与 PRISMA 计数（S6 补） |
| S5 | 提取表或详细笔记 | 用提取表 id 反推候选表 | S1–S4 | 引用可回溯性（S6 核） |
| S6 | 已有初稿 | 抽引用建候选表，先做结构诊断 | S1–S5 | taxonomy/结构诊断先于润色 |

三条跳步规则：

1. **跳步不免检**：入口阶段的最小输入必须齐（见 `references/pipeline.md`「入口契约」），缺一项就先补那一项。
2. **欠账登记**：跳过 S1 时，在 `00_选题/研究缺口与RQ.md` 顶部写一行 `入口=S2；欠账=缺口论证`，S5/S6 必须回来补。
3. **事实源不变**：无论从哪进，候选表仍是唯一事实源；从 S4/S5 进先重建候选表，再动后面的。

S2 入口的 RQ 卡只要三行：题目、一句 RQ（对象 + 机制 + 边界）、2–5 个概念块。不要求做完整的矛盾点/空白点分析——那是 S1 的活，跳过了就记成欠账。

## 六阶段

| 阶段 | 动作（读哪个） | 产物 | 门禁（不过不进下一步） |
|---|---|---|---|
| S1 选题 | 星塔 `refine-literature-question` + `locate-review-research-gap` | `00_选题/研究缺口与RQ.md` | RQ 一句话可说清；缺口能对应到 RQ；3–5 个综述模块 |
| S2 策略 | YAN `文献检索` | `01_检索/检索策略表.md`、`01_检索/检索日志.md` | 每个概念块有同义词；每行有库/检索式/限定/预计量；AMiner 预检有结论 |
| S3 检索与初筛 | AMiner MCP（+ 手工库）+ `sr-screener` 或轻量筛选 | `01_检索/候选表.csv`、`02_筛选/筛选记录.md` | 候选表每条有 include/exclude + 排除码；PRISMA 计数闭合 |
| S4 精读与提取 | YAN `文献精读` | `03_精读/提取表.csv`、`03_精读/notes/` | 纳入文献 100% 有提取行；局限列必填 |
| S5 综合写作 | YAN `文献综述写作` + 星塔 `map-literature-contradictions` + `survey-writing` | `04_综合/概念矩阵.md`、`04_综合/冲突地图.md`、`05_成稿/提纲.md`、`05_成稿/初稿.md` | 先定结构模式与提纲；taxonomy 过十篇盲测；每段 ≥2 篇对撞；每个 gap 挂到 RQ |
| S6 统稿与格式 | YAN `文献综述章节` + `survey-abstract` + `academic-paper`（citation-check） | `05_成稿/终稿.md`、`05_成稿/摘要.md`、`05_成稿/自检清单.md` | 引用 100% 可回溯；格式统一；摘要承诺逐条兑现；Boote & Beile 达线 |

写整篇综述时（不是只写一节），S5 按**结构模式一「新技术 × 旧问题」**（当前唯一模式），见 `references/survey-structure.md`；按 `assets/survey-outline-pattern1.md` 填完提纲再动笔。摘要放 S6，用 `survey-abstract` 的五段式收口。

阶段内的具体话术、字段定义和检查清单见 `references/pipeline.md`；检索通道细节见 `references/aminer.md`；成稿结构见 `references/survey-structure.md`。

## 项目布局

```
综述_<主题>_<日期>/
├─ 00_选题/研究缺口与RQ.md
├─ 01_检索/检索策略表.md
├─ 01_检索/检索日志.md
├─ 01_检索/候选表.csv
├─ 02_筛选/筛选记录.md
├─ 02_筛选/排除原因码.md
├─ 03_精读/提取表.csv
├─ 03_精读/notes/
├─ 04_综合/概念矩阵.md
├─ 04_综合/冲突地图.md
└─ 05_成稿/提纲.md
   05_成稿/初稿.md
   05_成稿/摘要.md
   05_成稿/终稿.md
   05_成稿/自检清单.md
```

## 三条硬规则

1. **候选表是唯一事实源**。后面每一步只能引用候选表里 `included=1` 的行；表外文献不得进入提取和写作。
2. **每次检索都留痕**。AMiner 也好、手工库也好，一条查询一行日志：日期 / 通道 / 检索式 / 命中 / 保留 / 备注。
3. **门禁不过就停**。缺 RQ 不进检索，缺提取表不进写作——不要在 S5 用"边写边补"掩盖 S3/S4 的洞。

## 降级路径

| 故障 | 降级做法 |
|---|---|
| AMiner token 失效 | 用 WoS/CNKI/Google Scholar 手工检索，结果按候选表字段录入，`channel` 填 `wos`/`cnki`/`gs`；不要把流程停在这里 |
| 拿不到 PDF | 转 YAN `文献获取`（六级合规获取 + 作者信模板）；仍拿不到就在提取表标 `fulltext=no`，只做摘要级提取并注明 |
| 筛选工作量过大 | 课程/叙事综述用轻量筛选：逐条 include/exclude + 排除码，抽 10% 双人复核；系统综述才上 `sr-screener` 全流程 |
| 没有关系图工具 | 用 `04_综合/概念矩阵.md` 的行列关系代替；需要图再导出到绘图工具 |

## 出口标准

一份能交的综述 = 六份产物齐全 + 三条硬规则没破 + 自检清单逐项有结论。做不到就退回对应阶段，不要靠润色补。
