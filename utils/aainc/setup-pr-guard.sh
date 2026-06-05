#!/usr/bin/env bash
# aainc/LibreChat PR ガードセットアップ
#
# clone 直後に 1 回実行する。フォーク元 (danny-avila/LibreChat) へ誤って
# PR や push をしてしまう事故を防ぐためのローカル設定を一括で行う。
#
# 使い方:
#   bash utils/aainc/setup-pr-guard.sh
#
# 詳細は docs/aainc/pr-guard.md を参照。

set -euo pipefail

AAINC_REPO="aainc/LibreChat"
UPSTREAM_PATTERN="danny-avila/LibreChat"

cd "$(git rev-parse --show-toplevel)"

# 0. origin が aainc fork を指しているか確認
origin_url="$(git remote get-url origin 2>/dev/null || true)"
if [[ "$origin_url" != *"${AAINC_REPO}"* ]]; then
  echo "ERROR: origin が ${AAINC_REPO} を指していません: ${origin_url:-（未設定）}" >&2
  echo "       git remote set-url origin https://github.com/${AAINC_REPO}.git を実行してください。" >&2
  exit 1
fi

# 1. gh の既定リポジトリを aainc fork に固定
#    （fork clone では gh pr create の PR 先既定がフォーク元 upstream に向くため）
if command -v gh >/dev/null 2>&1; then
  gh repo set-default "$AAINC_REPO"
  echo "ok: gh repo set-default ${AAINC_REPO}"
else
  echo "warning: gh コマンドが見つかりません。インストール後に再実行してください。" >&2
fi

# 2. push 先を origin に固定
git config remote.pushDefault origin
echo "ok: git config remote.pushDefault origin"

# 3. フォーク元を指す remote が存在する場合は push を無効化
#    （gh repo clone はフォーク元を upstream remote として自動追加するため）
for remote in $(git remote); do
  [[ "$remote" == "origin" ]] && continue
  url="$(git remote get-url "$remote" 2>/dev/null || true)"
  if [[ "$url" == *"$UPSTREAM_PATTERN"* ]]; then
    git remote set-url --push "$remote" DISABLED_DO_NOT_PUSH_TO_UPSTREAM
    echo "warning: remote '${remote}' はフォーク元 (${UPSTREAM_PATTERN}) を指しています。push を無効化しました。"
    echo "         upstream 同期作業以外でこの remote は不要です。docs/aainc/pr-guard.md を参照。"
  fi
done

echo
echo "セットアップ完了。PR 作成は utils/aainc/create-pr.sh を使用してください。"
