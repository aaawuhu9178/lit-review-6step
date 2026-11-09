#!/usr/bin/env bash
# 安装 lit-review-6step 技能包到目标项目。
# 用法: ./install.sh [项目目录] [--with-deps]
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TARGET="${1:-.}"
WITH_DEPS="${2:-}"

mkdir -p "$TARGET"
TARGET="$(cd "$TARGET" && pwd)"
SKILLS="$TARGET/.dsh/skills"
mkdir -p "$SKILLS"

echo "目标项目: $TARGET"

for name in lit-review-6step survey-writing survey-abstract shared; do
  if [ ! -d "$ROOT/skills/$name" ]; then
    echo "缺少 skills/$name，仓库不完整" >&2
    exit 1
  fi
  rm -rf "$SKILLS/$name"
  cp -R "$ROOT/skills/$name" "$SKILLS/$name"
  echo "  已安装 skill: $name"
done

TPL_SRC="$ROOT/templates/文献综述项目模板"
TPL_DST="$TARGET/文献综述项目模板"
if [ -d "$TPL_SRC" ]; then
  if [ -d "$TPL_DST" ]; then
    echo "  文献综述项目模板/ 已存在，跳过"
  else
    cp -R "$TPL_SRC" "$TPL_DST"
    echo "  已安装模板: 文献综述项目模板/"
  fi
fi

if [ -d "$ROOT/commands" ]; then
  mkdir -p "$TARGET/.dsh/commands"
  cp "$ROOT"/commands/*.md "$TARGET/.dsh/commands/"
  echo "  已安装命令: .dsh/commands/"
fi

if [ "$WITH_DEPS" = "--with-deps" ] || [ "$WITH_DEPS" = "-d" ]; then
  if ! command -v git >/dev/null 2>&1; then
    echo "需要 git 才能下载依赖" >&2
    exit 1
  fi
  clone_dep() {
    local name="$1" url="$2"
    if [ -d "$SKILLS/$name" ]; then
      echo "  已存在，跳过: $name"
      return 0
    fi
    echo "  下载依赖: $name"
    git clone --depth 1 "$url" "$SKILLS/$name" || echo "  警告：$name 下载失败，可稍后手动 clone"
  }
  clone_dep literature-review-skill  https://github.com/YANZHANLIN/literature-review-skill.git
  clone_dep literature-review-skills https://github.com/xingtaxueshu/literature-review-skills.git
fi

echo ""
echo "完成。新开 DSH 会话后说：用 lit-review-6step，从 S1 开始（或从 S2 开始，题目是 …）。"
