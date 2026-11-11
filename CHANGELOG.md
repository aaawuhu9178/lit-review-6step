# Changelog

## 1.3.0 — 2026-11-11

- 新增两个只读辅助模型：**CR-S**（结构-逻辑审查：七节骨架、B 类数与章数、章节映射、论证链、防御性语言，只报 P0/P1）与 **HLA-S**（人类语言对齐：章际承接、段落节奏、术语一致、去 AI 腔）
- 每章写完先 CR-S 再 HLA-S，摘要定稿前单独过 CR-S，结果写入 `05_成稿/审校记录.md`
- 新增 `skills/survey-writing/references/review-and-alignment.md`（规则、词表、输出模板）与模板 `05_成稿/审校记录.md`
- S5/S6 门禁同步：每章需有 CR-S / HLA-S 记录，摘要需 CR-S

## 1.2.0 — 2026-11-10

- 接入 `nature-figure`（可选依赖，Apache-2.0）到 S5：图表计划逐张落地，数据图走 Python/R 后端，结构图走矢量示意图，交付前跑自带 audit
- 出图统一存 `04_综合/figures/`，命名 `Fig1_xxx.pdf/.svg/.png`
- S5 门禁增加"图表计划里的每张图要么出图、要么注明不画"
- README、THIRD_PARTY_NOTICES、catalog 同步更新

## 1.1.0 — 2026-11-09

- 新增 `commands/` 四个入口命令：`lit-review`、`lit-review-s2`、`survey-outline`、`survey-abstract`
- 新增 `skills/shared/evidence-norms.md`：证据与语言规范，三个 skill 共用
- 新增 `scripts/check.mjs`：七项仓库自检（catalog、frontmatter、引用路径、README 覆盖、个人路径、密钥、编码）
- 新增 `catalog/skills.json`：skill 目录的单一事实源
- 每个 skill 增加 `VALIDATION.md`：写明验证过什么、没验证什么
- 安装脚本增加命令复制（`.dsh/commands/`）

## 1.0.0 — 2026-11-09

首个公开版本。

- 六阶段编排器 `lit-review-6step`：选题、检索策略、检索与初筛、精读提取、综合写作、统稿
- 入口选择：S1–S6 任一阶段进入，含最小输入契约与欠账登记
- 结构模式一「新技术 × 旧问题」：七节骨架、B×A 交叉矩阵、四条结构门禁
- `survey-writing`：物种选择、taxonomy、图表规划、Gate A/B/C
- `survey-abstract`：摘要五段式
- 项目模板：六步目录、检索策略表、候选表、提取表、提纲、摘要、自检清单
- 可选 AMiner 检索通道与健康检查脚本
