# AMiner 检索通道

## 它是什么

DSH 里配置的 MCP server `aminer`（`@scipen/aminer-mcp-server`），底层接口：

```
https://datacenter.aminer.cn/gateway/open_platform/api/paper/list/by/search/venue
```

鉴权用 `AMINER_API_KEY`（JWT），配在 `~/.dsh/profiles/web/cordis.patch.yml` 的 `mcp-aminer` 条目里。它是**元数据发现通道**：给题录、摘要、引用数、DOI/URL，不给全文。

## 四个工具

| 工具 | 必填 | 可选 | 用途 |
|---|---|---|---|
| `mcp__aminer__search_papers_by_keyword` | `keyword` | `page` `size` `order` | 概念块检索（主通道） |
| `mcp__aminer__search_papers_by_venue` | `venue` | 同上 | 期刊定向补漏 |
| `mcp__aminer__search_papers_by_author` | `author` | 同上 | 追核心作者 |
| `mcp__aminer__search_papers_advanced` | 任意组合 | 同上 | 关键词 + 期刊 + 作者组合 |

参数约束：`size` 最大 **10**；`page` 从 **0** 开始；`order` 只有 `year` 或 `n_citation`。

## 返回字段

`title`（有中文标题时优先 `title_zh`）、`authors[]`（name / org）、`venue`（name_zh / name_en / alias）、`year`、`citations`、`abstract`（优先 `abstract_zh`）、`doi`、`url`、`keywords[]`、`language`，外层还有 `summary.total`、`hasMore`。

## 查询模板

1. **奠基文献**：`keyword="<概念块英文同义词>"`，`order=n_citation`，`page=0..2`
2. **前沿文献**：同关键词，`order=year`，`page=0..2`
3. **期刊定向**：`venue="<期刊名>"`，`order=year`
4. **作者追踪**：`author="<姓名>"`，`order=year`
5. **中文补充**：`keyword="<中文术语>"`，看 `title_zh` / `abstract_zh`

一个概念块至少跑"奠基 + 前沿"两轮；概念块之间用 AND 逻辑在检索策略表里组合，AMiner 里逐块跑再在候选表合并去重。

## 写进候选表

| 候选表字段 | 取值 |
|---|---|
| `id` | `AM-0001` 递增 |
| `channel` | `aminer` |
| `query` | 实际传的 keyword / venue / author |
| `title` `year` `venue` `authors` `doi` `citations` `url` | 原样映射 |
| `lang` | 返回的 `language`，缺省按标题判断 |
| `included` | 初筛后填 0/1 |
| `exclude_code` | 排除时填 E1–E7 |
| `note` | 为什么排除 / 为什么重要 |

## 限制（必须在流程里承认）

- **没有引文网络**：不能做前向/后向引文扩展。需要雪球法时用 OpenAlex、Semantic Scholar 或手工。
- **没有全文**：只到摘要和链接；PDF 转 `文献获取` skill。
- **`total` 可能不准**：以 `hasMore=false` 为翻页终止条件，不要拿 total 做精确计数。
- **单页 10 条**：深翻成本高，优先换 `order` 和更准的关键词，而不是翻到第 10 页。
- **token 会过期**：过期时网关返回 HTTP 500 + `{"code":40308,"msg":"Invalid Token"}`，MCP 统一报 `Search failed`。这不是网络问题。

## 换 token

1. 在 AMiner 开放平台重新签发 `AMINER_API_KEY`。
2. 打开 `~/.dsh/profiles/web/cordis.patch.yml`，替换 `mcp-aminer.config.env.AMINER_API_KEY` 的值。
3. 重启 DSH（MCP 子进程在启动时读取 env）。

> 必须写在 `env` 块里：DSH 生成 MCP 子进程时会擦除名字含 `KEY|PASSWORD|SECRET|TOKEN` 的父进程环境变量，靠系统环境变量传不进去。

## 健康检查

```powershell
node .dsh/skills/lit-review-6step/scripts/aminer_health.mjs
```

输出 JSON：`{"status":"OK|EXPIRED|INVALID|MISSING|NETWORK","http":200,"tokenExp":"...","hint":"..."}`。

- `OK` → 正常检索
- `EXPIRED` / `INVALID` → 换 token，或按主文件"降级路径"走手工库
- `MISSING` → 没配 key
- `NETWORK` → 网关不可达，稍后重试或降级

## 已知状态（2026-11-09）

当前 `AMINER_API_KEY` 的 JWT `exp` 为 2026-10-24，已过期，网关返回 `Invalid Token`。在换新 token 之前，第 3 步的 AMiner 通道不可用，只能用降级路径。
