# lit-review-6step

[简体中文](README.md) | **English**

Break a literature review into six checkable stages: **question → search strategy → search & screening → close reading & extraction → synthesis & drafting → final editing**. Each stage has fixed artifacts and a gate, and you can enter at any stage. The manuscript follows a seven-section outline for the "new technology on an old problem" pattern.

A skill pack in [Agent Skills](https://docs.claude.com/en/docs/claude-code/skills) format. Plain Markdown, no runtime dependencies.

Author: 武文政 (Wu Wenzheng) · [@wakawaka66614](https://github.com/wakawaka66614)

> The skill instructions themselves are currently written in Chinese. The workflow is usable by non-Chinese readers, but expect Chinese text inside `SKILL.md` files.

## What it solves

| Common failure | How this pipeline handles it |
|---|---|
| The review reads like a stack of paper summaries | Concept matrix (rows = papers, columns = concepts) + contradiction map |
| Search is incomplete and undocumented | Search strategy table + search log + PRISMA counts |
| Structure drifts while writing | Fill the outline first (two taxonomies + cross matrix), then write |
| Skipping stages breaks the ending | Entry contracts + recorded debt, paid back at S5/S6 |

## What's inside

| Path | Content |
|---|---|
| `skills/lit-review-6step/` | Six-stage orchestrator: entry points, gates, AMiner channel, structure patterns and outline templates |
| `skills/survey-writing/` | Survey body: choosing the review species, taxonomy, figures, Gates A/B/C |
| `skills/survey-abstract/` | Five-part abstract (hook → positioning → framework → evidence → outlook) |
| `skills/shared/evidence-norms.md` | Shared evidence and language rules for all three skills |
| `commands/` | Four entry commands: `lit-review` / `lit-review-s2` / `survey-outline` / `survey-abstract` |
| `scripts/check.mjs` | Repo self-check: frontmatter, referenced paths, personal paths, secrets |
| `templates/文献综述项目模板/` | Six-stage folder layout, four tables, outline and abstract templates |
| `docs/workflow.md` | Workflow overview, entry contracts, structure pattern |

## Install

Requires DSH or any other agent that reads `SKILL.md` (e.g. Claude Code).

**Windows**

```powershell
git clone https://github.com/wakawaka66614/lit-review-6step.git
cd lit-review-6step
.\install.ps1 -Target C:\path\to\your\project -WithDeps
```

If PowerShell refuses to run the script ("running scripts is disabled on this system"):

```powershell
powershell -ExecutionPolicy Bypass -File .\install.ps1 -Target C:\path\to\your\project -WithDeps
```

**macOS / Linux**

```bash
git clone https://github.com/wakawaka66614/lit-review-6step.git
cd lit-review-6step
./install.sh /path/to/your/project --with-deps
```

After installation the target project contains:

```text
<project>/
  .dsh/skills/lit-review-6step/
  .dsh/skills/survey-writing/
  .dsh/skills/survey-abstract/
  .dsh/skills/literature-review-skill/     # only with -WithDeps
  .dsh/skills/literature-review-skills/    # only with -WithDeps
  文献综述项目模板/
```

Claude Code users can point the installer at a project and change `.dsh/skills` to `.claude/skills` (one line in the script).

## Self-check

```powershell
node scripts/check.mjs
```

Seven checks: catalog matches directories, frontmatter complete, referenced paths exist, README covers every skill, no personal paths, no secrets, `install.ps1` encoding. Each skill also ships a `VALIDATION.md` stating what was tested and, explicitly, what was not.

## Requirements

| Dependency | Required | Used for | How to get it |
|---|---|---|---|
| DSH / SKILL.md agent | Yes | Running the skills | — |
| [YAN suite](https://github.com/YANZHANLIN/literature-review-skill) (MIT) | Strongly recommended | S2 search, S4 close reading, S5 writing, S6 chapter | `-WithDeps` clones it |
| [StarTower suite](https://github.com/xingtaxueshu/literature-review-skills) (MIT) | Strongly recommended | S1 question refinement, S5 contradiction mapping | `-WithDeps` clones it |
| `sr-screener` | Optional | S3 blinded screening for systematic reviews | Install separately |
| `academic-paper` | Optional | S6 citation / format checks | Install separately |
| [nature-figure](https://github.com/Yuan1z0825/nature-skills) (Apache-2.0) | Optional | S5 figure rendering, auditing, export | Install into `.dsh/skills/nature-figure/` |
| AMiner MCP | Optional | S3 machine search channel | See `skills/lit-review-6step/references/aminer.md` |

If YAN or StarTower is missing, the orchestrator stops at preflight and tells you — it will not pretend to have read them.

## Entry points

You do not have to start at S1. Tell the agent what you already have:

| Entry | What you have | Skipped | Debt (paid later) |
|---|---|---|---|
| S1 | Only a broad direction | — | — |
| S2 | A fixed topic (± RQ, ± scope) | S1 gap analysis | "Existing surveys" paragraph (S5) |
| S3 | Search strings / strategy table / chosen databases | S1–S2 | Search protocol subsection (S6) |
| S4 | A screened reading list | S1–S3 | PRISMA counts (S6) |
| S5 | An extraction table / detailed notes | S1–S4 | Citation traceability (checked at S6) |
| S6 | A draft | S1–S5 | Structural diagnosis before polishing |

## Commands

| Command | Purpose |
|---|---|
| `/lit-review` | Start at S1, from a broad direction |
| `/lit-review-s2` | Start at S2 with a fixed topic |
| `/survey-outline` | Produce the "new technology × old problem" outline only |
| `/survey-abstract` | Write or revise the abstract only |

In Claude Code, copy `commands/*.md` into `.claude/commands/` and run `/lit-review-s2 topic: ...`. In DSH, say "execute `commands/lit-review-s2.md`"; the installer also copies them to `.dsh/commands/`.

## The six stages

| Stage | Artifacts | Gate |
|---|---|---|
| S1 Question | Gap statement + RQ + 3–5 modules | A third party can restate the RQ |
| S2 Strategy | Search strategy table + log | Every row has database / query / limits / expected hits |
| S3 Search & screening | Candidate table + PRISMA counts | Counts reconcile; every exclusion has a code |
| S4 Close reading | Extraction table + notes | 100% of included papers have a row; limitations filled |
| S5 Synthesis | Concept matrix + contradiction map + outline + draft | Taxonomy passes the ten-paper blind test; every section contrasts ≥2 papers |
| S6 Final editing | Manuscript + abstract + checklist | Citations traceable, format consistent, abstract promises fulfilled |

## Manuscript outline (pattern 1: new technology × old problem)

```text
1 Introduction: broad background → narrow background → existing surveys → this survey → structure
2 Background
  2.1 Problem background: what it is → taxonomy A (a1…am)
  2.2 Technology background: what it is → taxonomy B (b1…bk) → mapping statement (b1 → §3 …)
3 Problem a1 under technology b1
4 Problem a2 under technology b2
5 Problem a3 under technology b3
6 Challenges and future directions
7 Conclusion
```

Three hard constraints: the number of B branches equals the number of chapters from §3; the B×A cross matrix is filled before writing; if |A| ≠ |B|, organize chapters by B and state the mapping.

## Repository layout

```text
lit-review-6step/
├─ skills/
│  ├─ lit-review-6step/     # orchestrator
│  ├─ survey-writing/       # body writing
│  ├─ survey-abstract/      # abstract
│  └─ shared/evidence-norms.md
├─ commands/                # four entry commands
├─ templates/文献综述项目模板/
├─ catalog/skills.json
├─ scripts/check.mjs
├─ docs/workflow.md
├─ install.ps1
├─ install.sh
├─ THIRD_PARTY_NOTICES.md
└─ CITATION.cff
```

## Known limitations

- The AMiner channel needs your own API key. Without one, fall back to manual database search; the candidate table schema does not change.
- Citation checking depends on the optional `academic-paper`; without it, verification is manual.
- The repository bundles no third-party skill code; the installer fetches MIT dependencies on the user's machine.
- Only one structure pattern ("new technology × old problem") is implemented. `references/survey-structure.md` has room for more.
- Skill instructions are in Chinese.

## License

MIT — see [LICENSE](LICENSE). Third-party components are listed in [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

`survey-writing` and `survey-abstract` are original to this repository.

## Citation

If you use this workflow in research or teaching, see [CITATION.cff](CITATION.cff).
