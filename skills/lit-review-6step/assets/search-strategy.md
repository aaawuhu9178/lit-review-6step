# 检索策略表

一行 = 一个库 × 一个检索式。AMiner 行在"通道"列写 `aminer`，检索式写实际 keyword 组合。

| # | 概念块 | 中文同义词 | 英文同义词 | 通道 | 检索式 | 限定（年份/语言/文献类型） | 预计命中 |
|---|---|---|---|---|---|---|---|
| 1 |  |  |  | WoS |  |  |  |
| 2 |  |  |  | CNKI |  |  |  |
| 3 |  |  |  | aminer |  | order=n_citation |  |

## 概念块拆解

| 框架 | 适用 | 块 |
|---|---|---|
| PICO | 定量 + 干预 | Population / Intervention / Comparison / Outcome |
| PICOC | 定量 + 社科 | PICO + Context |
| SPIDER | 质性 | Sample / Phenomenon / Design / Evaluation / Research type |

每块填 3–8 个同义词，含学术术语与俗称；中文库另列中文词，不要机翻了事。

## 自检

- [ ] 每个概念块都有中英两列
- [ ] 每个库的语法单独写过（没有跨库复制）
- [ ] 每行都有预计命中，总量与目标篇数匹配
- [ ] AMiner 行做了健康检查，或已注明降级
