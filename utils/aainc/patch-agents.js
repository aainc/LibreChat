/**
 * aainc/LibreChat: @librechat/agents のプロンプトキャッシュ末尾マーカーを動的 tail 以降にも打つ
 *
 * 本家は動的 instruction（メモリ・RAG 文脈）がある run では安定 prefix にだけ cache_control を
 * 置き、動的 tail 以降（最新のユーザー発話と、その run 内のツール往復すべて）にはマーカーを
 * 置かない。そのためツール往復ごとに過去のツール出力が全量キャッシュなしで再送される。
 * 安定 prefix のマーカーはそのまま残し（ターン間の履歴ヒットに必要）、動的 tail 以降の区間に
 * だけ末尾マーカーを追加する。安定 prefix のマーカーは 2 個から 1 個に減らす（ターン間ヒットには
 * 直近 1 個で足りる）。合計 system 1 + 安定 prefix 1 + 末尾 1 = 3 で、Anthropic の上限 4 に対して
 * 1 個の余裕を残す（4 個ちょうどにしたとき本番で "Found 5" の 400 が出た）。
 *
 * 対象文字列が見つからなければ失敗させる: agents のバージョンを上げたときにパッチの
 * 再確認を強制するため。適用済みなら何もしない。
 */
const fs = require('fs');
const path = require('path');

const TARGETS = [
  { rel: 'dist/cjs/agents/AgentContext.cjs', fn: 'require_cache.addTailCacheControl' },
  { rel: 'dist/esm/agents/AgentContext.mjs', fn: 'addTailCacheControl' },
];
const REPLACEMENTS = (fn) => [
  {
    before: `\t\t\t...tail,\n\t\t\t...trailingMessages\n\t\t];`,
    after: `\t\t\t...${fn}([...tail, ...trailingMessages], this.getPromptCacheTtl(promptCacheProvider))\n\t\t];`,
  },
  {
    before: 'addCacheControlToStablePrefixMessages(messages.slice(1), 2, ttl)',
    after: 'addCacheControlToStablePrefixMessages(messages.slice(1), 1, ttl)',
  },
];

const root = path.join(__dirname, '..', '..', 'node_modules', '@librechat', 'agents');
for (const { rel, fn } of TARGETS) {
  const file = path.join(root, rel);
  const src = fs.readFileSync(file, 'utf8');
  const pending = REPLACEMENTS(fn).filter(({ after }) => !src.includes(after));
  if (pending.length === 0) {
    continue;
  }
  const missing = pending.find(({ before }) => !src.includes(before));
  if (missing) {
    throw new Error(
      `[aainc-patch-agents] patch target not found in ${file}; re-check the patch against this @librechat/agents version`,
    );
  }
  fs.writeFileSync(
    file,
    pending.reduce((acc, { before, after }) => acc.replace(before, after), src),
  );
  console.log(`[aainc-patch-agents] patched ${rel}`);
}
