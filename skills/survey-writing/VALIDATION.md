# 验证记录：survey-writing

## 验证环境

- 日期：2026-11-09
- 宿主：DSH（Windows 11）
- 验证人：武文政

## 已验证

| 项 | 方法 | 结果 |
|---|---|---|
| frontmatter 合法 | `name` / `description` 存在且可解析 | 通过 |
| 引用文件齐全 | `references/playbook.md`、`references/figure-gallery.md`、`assets/review-blueprint.md`、三张示例图 | 全部存在 |
| 安装后可用 | 通过 install.ps1 安装到测试项目 | 加载正常 |
| 与其他 skill 的路由 | 手动检查“写摘要 → survey-abstract”的分工 | 无重复 |

## 未验证

- **没有质量评估**：没有测量使用该 skill 后提纲/正文的质量提升，也没有与其他写作 skill 的对照。
- **示例图只作结构参考**：`assets/fig-*.jpg` 来自公开材料，未验证版权与可复用性，正式使用前需重绘。
- **Gate A/B/C 是文字规则**：没有自动化检查，依赖执行者自觉。
- **只覆盖模式一**：其他综述类型（技术编年、应用全景）的结构未验证。

## 复现步骤

```powershell
node scripts/check.mjs
# 检查 assets/ 与 references/ 是否齐全
```
