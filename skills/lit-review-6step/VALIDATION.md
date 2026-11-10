# 验证记录：lit-review-6step

## 验证环境

- 日期：2026-11-09
- 宿主：DSH（Windows 11），agent 模型 deepseek-flash
- 验证人：武文政

## 已验证

| 项 | 方法 | 结果 |
|---|---|---|
| skill 可被加载 | DSH 技能目录中出现 `lit-review-6step` | 通过 |
| 子 skill 路径 | 逐一 `Test-Path` 6 个依赖的 `SKILL.md` | 6/6 存在 |
| 安装脚本 | 指向空目录执行 `install.ps1`，检查落位 | 3 个 skill + 模板全部到位 |
| AMiner 健康检查 | `node scripts/aminer_health.mjs` | 正确报出 `EXPIRED`（token 2026-10-24 过期） |
| 入口表结构 | 人工核对 S1–S6 的产物与门禁 | 与 pipeline.md 一致 |

## 未验证

- **没有做过真实综述的端到端质量评估**：没有对照实验证明“用这套流程写出来的综述优于不用”。
- **AMiner 检索通道未跑通真实查询**：token 过期，只验证了健康检查与降级路径，没有验证真实检索结果的字段映射。
- **没有跨模型验证**：只在当前模型上加载过，其他 agent（Claude Code / Codex）未测试。
- **没有验证“十篇盲测”等门禁的执行效果**：门禁是文字规则，没有脚本强制。

## 复现步骤

```powershell
git clone https://github.com/wakawaka66614/lit-review-6step.git
cd lit-review-6step
.\install.ps1 -Target C:\tmp\lr-test -WithDeps
Test-Path C:\tmp\lr-test\.dsh\skills\lit-review-6step\SKILL.md
node scripts/check.mjs
```
