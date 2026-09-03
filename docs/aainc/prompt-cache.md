# aainc/LibreChat の Anthropic プロンプトキャッシュ運用

このフォークは 100 名規模の利用者で Anthropic のプロンプトキャッシュを共有することを
前提にしている。本家 (danny-avila/LibreChat) の実装に乗り、フォーク側では
「決定論的なツール順序」「TTL の固定」「1h 書き込みの課金レート」だけを足している。

## 本家が提供するもの（フォークでは触らない）

- **安定部分と動的部分の分離**: `@librechat/agents` がシステムプロンプトを
  安定部分（エージェント instructions、MCP 指示、ツール説明）と動的部分
  （追加 instructions、RAG のファイル文脈、ユーザーメモリ、添付文脈）に分け、
  安定部分だけに `cache_control` を付ける。動的部分はキャッシュ境界の後ろ
  （会話末尾の human メッセージ）に移されるため、ユーザー固有の内容が
  キャッシュキーを壊さない。
- **`promptCacheTtl`**: モデルパラメータとして `5m` / `1h` を指定できる。
  未指定時は agents SDK 側で `1h` が既定。

## フォークで足しているもの

| 変更 | 場所 | 目的 |
|---|---|---|
| MCP サーバー・ツールの名前順ソート | `api/app/clients/tools/util/handleTools.js`, `packages/api/src/mcp/MCPManager.ts` | ツール定義と MCP 指示の順序がリクエストごとに揺れてキャッシュが外れるのを防ぐ |
| `ANTHROPIC_PROMPT_CACHE_TTL` で TTL を固定 | `packages/api/src/endpoints/anthropic/llm.ts` | 利用者ごとの UI 設定で TTL がばらつくと共有キャッシュが分裂するため、環境変数があればそれで上書きする |
| 1h 書き込みレート `write1h` | `packages/data-schemas/src/methods/tx.ts` ほか | Anthropic は 1h TTL のキャッシュ書き込みを基本入力の 2 倍で課金するが、本家は 5m の 1.25 倍で計上する。`ANTHROPIC_PROMPT_CACHE_TTL=1h` かつ provider が `anthropic` のときだけ 2 倍を適用する |
| `docker-compose.override.yml` をコミット | リポジトリ直下 | ローカルビルド + `ANTHROPIC_PROMPT_CACHE_TTL=1h` を既定にする |

課金側は使用量に TTL の内訳が含まれないため、環境変数を唯一の情報源にしている。
環境変数を外すと本家と同じ挙動（TTL は SDK 既定の 1h、課金は 5m レート）に戻る。

## 確認方法

```bash
# 単体テスト
cd packages/data-schemas && npx jest src/methods/tx.spec.ts
cd packages/api && npx jest src/endpoints/anthropic/llm.spec.ts src/agents/transactions.spec.ts
cd api && npx jest app/clients/tools/util/handleTools.test.js

# compose の合成結果に TTL とローカルビルドが載っているか
docker compose config | grep -n "ANTHROPIC_PROMPT_CACHE_TTL\|target: node"
```

本番では Anthropic のレスポンスの `cache_read_input_tokens` が 2 ターン目以降、
別ユーザーのリクエストでも増えていることをログで確認する。
