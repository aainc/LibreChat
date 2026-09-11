/**
 * patch-agents.js の動作確認: 動的 instruction がある run で、安定 prefix のマーカーを
 * 残したまま、ツール往復中の最終メッセージにも cache_control が付くこと。
 * `node utils/aainc/patch-agents.check.js`
 */
const assert = require('assert');
const { AIMessage, HumanMessage, ToolMessage } = require('@langchain/core/messages');
const {
  AgentContext,
} = require('../../node_modules/@librechat/agents/dist/cjs/agents/AgentContext.cjs');

const hasMarker = (m) =>
  Array.isArray(m.content) && m.content.some((b) => b.cache_control?.ttl === '1h');

(async () => {
  const ctx = new AgentContext({
    agentId: 'a',
    provider: 'anthropic',
    clientOptions: { promptCache: true, promptCacheTtl: '1h' },
    instructions: 'stable instructions',
    additionalInstructions: 'dynamic memory context',
  });
  const runnable = ctx.buildSystemRunnable({
    stableInstructions: 'stable instructions',
    dynamicInstructions: 'dynamic memory context',
  });
  const out = await runnable.invoke([
    new HumanMessage('turn 0'),
    new AIMessage('answer 0'),
    new HumanMessage('turn 1'),
    new AIMessage('answer 1'),
    new HumanMessage('turn 2'),
    new AIMessage({ content: [{ type: 'tool_use', id: 't1', name: 'scrape', input: {} }] }),
    new ToolMessage({ tool_call_id: 't1', content: 'x'.repeat(1000) }),
  ]);
  const types = out.map((m) => m.getType());
  assert.deepStrictEqual(
    types,
    ['system', 'human', 'ai', 'human', 'ai', 'human', 'human', 'ai', 'tool'],
    'dynamic tail sits before the last human turn',
  );
  assert.ok(hasMarker(out[0]), 'system marker kept');
  assert.ok(
    hasMarker(out[4]),
    'one stable prefix marker on the latest stable assistant turn (needed for cross-turn hits)',
  );
  assert.ok(!hasMarker(out[2]), 'older stable turns carry no marker');
  assert.ok(hasMarker(out[8]), 'tail marker added on the latest tool result');
  assert.strictEqual(
    out.filter(hasMarker).length,
    3,
    'system + 1 stable prefix + tail = 3, leaving headroom under the Anthropic 4-breakpoint limit',
  );
  console.log(
    'ok: stable prefix markers kept and tail marker placed with dynamic instructions present',
  );
})().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
