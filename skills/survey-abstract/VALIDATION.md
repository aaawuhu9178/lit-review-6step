# 验证记录：survey-abstract

## 验证环境

- 日期：2026-11-09
- 宿主：DSH（Windows 11）
- 验证人：武文政

## 已验证

| 项 | 方法 | 结果 |
|---|---|---|
| frontmatter 合法 | `name` / `description` 存在 | 通过 |
| 模板齐全 | `assets/abstract-blueprint.md` 存在 | 通过 |
| 与正文的分工 | 人工核对：摘要由本 skill 负责，正文交给 survey-writing | 无重叠 |
| 五段结构与例子 | 对照 CS 六句范例检查结构 | 结构自洽 |

## 未验证

- **没有对真实摘要做过评分**：五段式是否比自由写作更好，没有对照数据。
- **医学短摘要（100–150 词）分支未测试**。
- **多语言**：目前只有中文模板，英文摘要按同一结构写但未单独验证。

## 复现步骤

```powershell
node scripts/check.mjs
```
