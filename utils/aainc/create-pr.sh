#!/usr/bin/env bash
# aainc/LibreChat 向け PR 作成 wrapper
#
# PR 先を常に aainc/LibreChat (base: main) に明示して gh pr create を実行する。
# フォーク元 (danny-avila/LibreChat) へ誤って PR を出す事故を構造的に防ぐ。
#
# 使い方:
#   bash utils/aainc/create-pr.sh [gh pr create の追加オプション...]
#
# 例:
#   bash utils/aainc/create-pr.sh --title "feat: ..." --body "..."
#   bash utils/aainc/create-pr.sh --fill
#   bash utils/aainc/create-pr.sh --base release/v0.8 --title "..."  # base 上書きも可
#
# 詳細は docs/aainc/pr-guard.md を参照。

set -euo pipefail

AAINC_REPO="aainc/LibreChat"

# --repo が引数で渡されていても aainc 以外は拒否する
for arg in "$@"; do
  case "$arg" in
    --repo|--repo=*|-R)
      if [[ "$arg" != "--repo=${AAINC_REPO}" ]]; then
        echo "ERROR: --repo の上書きは禁止です。PR は常に ${AAINC_REPO} に向けます。" >&2
        exit 1
      fi
      ;;
  esac
done

# --base は後勝ちのため、追加引数での上書き（aainc 内の別ブランチ向け）は許容される
exec gh pr create --repo "$AAINC_REPO" --base main "$@"
