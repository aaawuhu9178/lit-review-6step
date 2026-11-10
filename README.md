# lit-review-6step

[English](README.en.md) | **简体中文**

把文献综述拆成六个可验收的阶段：**选题 → 检索策略 → 检索与初筛 → 精读提取 → 综合写作 → 统稿**。每个阶段有固定产物和门禁，支持从任意阶段进入；成稿按「新技术 × 旧问题」的七节骨架写。

一套 [Agent Skills](https://docs.claude.com/en/docs/claude-code/skills) 格式的技能包，纯 Markdown，无运行时依赖。

作者：武文政 · [@wakawaka66614](https://github.com/wakawaka66614)

## 它解决什么

| 常见病 | 这套流程的解法 |
|---|---|
| 综述写成读书笔记 | 概念矩阵（行=文献、列=概念）+ 冲突地图 |
| 搜不全、说不清怎么搜的 | 检索策略表 + 检索日志 + PRISMA 计数 |
| 结构漂移、边写边改 | 先填提纲（两套 taxonomy + 交叉矩阵）再动笔 |
| 跳步导致后面塌 | 入口契约 + 欠账登记，S5/S6 回来补 |

## 组成

| 目录 | 内容 |
|---|---|
| `skills/lit-review-6step/` | 六步编排器：入口选择、门禁、AMiner 通道、结构模式与提纲模板 |
| `skills/survey-writing/` | 综述正文：物种选择、taxonomy、图表规划、Gate A/B/C |
| `skills/survey-abstract/` | 摘要五段式（钩子 → 定位 → 框架 → 证据 → 展望） |
| `skills/shared/evidence-norms.md` | 三个 skill 共用的证据与语言规范 |
| `commands/` | 四个入口命令：`lit-review` / `lit-review-s2` / `survey-outline` / `survey-abstract` |
| `scripts/check.mjs` | 仓库自检：frontmatter、引用路径、个人路径、密钥 |
| `templates/文献综述项目模板/` | 六步目录 + 四张表 + 提纲 / 摘要模板 |
| `docs/workflow.md` | 流程说明、入口契约、结构模式 |

## 安装

需要 DSH（或其他读取 `SKILL.md` 的 agent，如 Claude Code）。

**Windows**

```powershell
git clone https://github.com/wakawaka66614/lit-review-6step.git
cd lit-review-6step
.\install.ps1 -Target C:\path\to\your\project -WithDeps
```

如果提示「无法加载文件，因为在此系统上禁止运行脚本」，用：

```powershell
powershell -ExecutionPolicy Bypass -File .\install.ps1 -Target C:\path\to\your\project -WithDeps
```

**macOS / Linux**

```bash
git clone https://github.com/wakawaka66614/lit-review-6step.git
cd lit-review-6step
./install.sh /path/to/your/project --with-deps
```

装完后项目里是：

```text
<project>/
  .dsh/skills/lit-review-6step/
  .dsh/skills/survey-writing/
  .dsh/skills/survey-abstract/
  .dsh/skills/literature-review-skill/     # 仅 -WithDeps
  .dsh/skills/literature-review-skills/    # 仅 -WithDeps
  文献综述项目模板/
```

Claude Code 用户把目标目录换成 `.claude/skills` 即可（`-Target` 指向项目根，脚本固定写到 `.dsh/skills`，可自行改一行）。

## 自检

```powershell
node scripts/check.mjs
```

检查 7 项：catalog 与目录一致、frontmatter 完整、引用路径存在、README 覆盖、无个人路径、无密钥、install.ps1 编码。每个 skill 另有一份 `VALIDATION.md`，写清验证过什么、**没验证什么**。

## 依赖

| 依赖 | 必须 | 用途 | 获取方式 |
|---|---|---|---|
| DSH / SKILL.md agent | 是 | 运行技能 | — |
| [YAN 五件套](https://github.com/YANZHANLIN/literature-review-skill)（MIT） | 强烈建议 | S2 检索、S4 精读、S5 写作、S6 章节 | `-WithDeps` 自动 clone |
| [星塔五件套](https://github.com/xingtaxueshu/literature-review-skills)（MIT） | 强烈建议 | S1 选题、S5 冲突梳理 | `-WithDeps` 自动 clone |
| `sr-screener` | 可选 | S3 系统综述双盲筛选 | 自行安装 |
| `academic-paper` | 可选 | S6 引用 / 格式核查 | 自行安装 |
| [nature-figure](https://github.com/Yuan1z0825/nature-skills)（Apache-2.0） | 可选 | S5 出图、审图、导出 | 自行安装到 `.dsh/skills/nature-figure/` |
| AMiner MCP | 可选 | S3 机器检索通道 | 见 `skills/lit-review-6step/references/aminer.md` |

缺 YAN / 星塔时，编排器会在预检阶段停下并提示，不会假装读过。

## 从哪一步进入

不必从 S1 开始。告诉 agent 你手上有什么：

| 入口 | 手上有什么 | 跳过 | 欠账（后面补） |
|---|---|---|---|
| S1 | 只有方向 | — | — |
| S2 | 已定题目（±RQ、±范围） | S1 缺口分析 | 引言「现有综述总结」（S5） |
| S3 | 检索式 / 策略表 / 指定库 | S1–S2 | 方法节检索协议（S6） |
| S4 | 筛选后的文献清单 | S1–S3 | PRISMA 计数（S6） |
| S5 | 提取表 / 详细笔记 | S1–S4 | 引用可回溯性（S6） |
| S6 | 已有初稿 | S1–S5 | 先结构诊断，再润色 |

## 命令入口

| 命令 | 用途 |
|---|---|
| `/lit-review` | 从 S1 开始，第一步是选题 |
| `/lit-review-s2` | 已有题目，从 S2 检索策略开始 |
| `/survey-outline` | 只出「新技术 × 旧问题」提纲，不写正文 |
| `/survey-abstract` | 只写或改摘要 |

Claude Code 把 `commands/*.md` 放到 `.claude/commands/`，之后可直接输入 `/lit-review-s2 题目：……`。DSH 用户说“读 `commands/lit-review-s2.md` 并执行”，安装脚本也会把它复制到 `.dsh/commands/`。

## 六步

| 阶段 | 产物 | 门禁 |
|---|---|---|
| S1 选题 | 缺口陈述 + RQ + 3–5 模块 | 第三人能复述 RQ |
| S2 策略 | 检索策略表 + 日志 | 每行有库 / 式 / 限定 / 预计量 |
| S3 检索初筛 | 候选表 + PRISMA 计数 | 计数闭合，每条有排除码 |
| S4 精读提取 | 提取表 + 笔记 | 纳入文献 100% 有行，局限非空 |
| S5 综合写作 | 概念矩阵 + 冲突地图 + 提纲 + 初稿 | taxonomy 过十篇盲测，每段 ≥2 篇对撞 |
| S6 统稿 | 终稿 + 摘要 + 自检清单 | 引用可回溯，格式统一，摘要承诺兑现 |

## 成稿骨架（结构模式一：新技术 × 旧问题）

```text
1 引言：大背景 → 小背景 → 现有综述总结 → 本综述特点 → 论文结构
2 背景知识
  2.1 问题背景：是什么 → 分类 A（a1…am）
  2.2 新技术背景：是什么 → 分类 B（b1…bk）→ 映射声明（b1→第 3 章…）
3 新技术 b1 背景下的问题 a1
4 新技术 b2 背景下的问题 a2
5 新技术 b3 背景下的问题 a3
6 研究挑战与未来方向
7 结论
```

三条硬约束：B 的类数 = 第 3 章起的章数；B×A 交叉矩阵动笔前填满；|A| ≠ |B| 时按 B 分章并说明映射。

## 目录结构

```text
lit-review-6step/
├─ skills/
│  ├─ lit-review-6step/     # 编排器
│  ├─ survey-writing/       # 正文写作
│  ├─ survey-abstract/      # 摘要
│  └─ shared/evidence-norms.md
├─ commands/                # 四个入口
├─ templates/文献综述项目模板/
├─ catalog/skills.json
├─ scripts/check.mjs
├─ docs/workflow.md
├─ install.ps1
├─ install.sh
├─ THIRD_PARTY_NOTICES.md
└─ CITATION.cff
```

## 已知限制

- AMiner 检索通道需要自己的 API key；没有 key 时走手工库降级，候选表字段不变。
- 引用核查依赖可选的 `academic-paper`；没装时只能按清单人工核对。
- 仓库不包含任何第三方 skill 源码，第三方由安装脚本在用户本机下载。
- 结构模式目前只有「新技术 × 旧问题」一种，`references/survey-structure.md` 预留了扩展位。

## 许可证

MIT，见 [LICENSE](LICENSE)。第三方组件见 [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)。

`survey-writing` 与 `survey-abstract` 为本仓库原创。

## 引用

若在论文或课程材料中使用，引用方式见 [CITATION.cff](CITATION.cff)。
