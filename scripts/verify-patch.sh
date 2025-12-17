#!/bin/bash
# パッチ適用確認スクリプト
# Usage: ./scripts/verify-patch.sh

echo "=== @librechat/agents パッチ適用確認 ==="

PATCH_MARKERS=(
    "node_modules/@librechat/agents/dist/cjs/llm/anthropic/index.cjs:ttl: '1h'"
    "node_modules/@librechat/agents/dist/cjs/agents/AgentContext.cjs:isAnthropicWithCaching && Array.isArray"
    "node_modules/@librechat/agents/dist/cjs/graphs/Graph.cjs:isAnthropicWithCaching && Array.isArray"
)

ALL_PASSED=true

for marker in "${PATCH_MARKERS[@]}"; do
    FILE="${marker%%:*}"
    PATTERN="${marker#*:}"

    if [ ! -f "$FILE" ]; then
        echo "❌ ファイルが存在しません: $FILE"
        ALL_PASSED=false
        continue
    fi

    if grep -q "$PATTERN" "$FILE"; then
        echo "✅ パッチ適用済み: $(basename $FILE)"
    else
        echo "❌ パッチ未適用: $(basename $FILE)"
        ALL_PASSED=false
    fi
done

echo ""
if [ "$ALL_PASSED" = true ]; then
    echo "🎉 すべてのパッチが正しく適用されています"
    exit 0
else
    echo "⚠️  一部のパッチが適用されていません"
    echo "   'npm install' を再実行してください"
    exit 1
fi
