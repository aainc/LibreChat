/**
 * promptCacheTTL wiring (LibreChat side):
 * 1. `ANTHROPIC_PROMPT_CACHE_TTL=1h` makes getLLMConfig emit `promptCacheTTL`
 *    on the llmConfig passed to the agents SDK.
 * 2. The *installed* `@librechat/agents` (forked build, vendored file: tarball)
 *    actually honors the TTL and stamps `cache_control: { type: 'ephemeral', ttl: '1h' }`.
 */
import { HumanMessage, AIMessage } from '@langchain/core/messages';
import { addCacheControl, makeEphemeralCacheControl } from '@librechat/agents';
import { getLLMConfig } from './llm';

describe('promptCacheTTL end-to-end wiring', () => {
  const originalEnv = process.env.ANTHROPIC_PROMPT_CACHE_TTL;

  afterEach(() => {
    if (originalEnv === undefined) {
      delete process.env.ANTHROPIC_PROMPT_CACHE_TTL;
    } else {
      process.env.ANTHROPIC_PROMPT_CACHE_TTL = originalEnv;
    }
  });

  it('emits promptCacheTTL on llmConfig when env is set and model supports caching', () => {
    process.env.ANTHROPIC_PROMPT_CACHE_TTL = '1h';
    const result = getLLMConfig('test-key', {
      modelOptions: { model: 'claude-sonnet-4-20250514', promptCache: true },
    });
    expect(result.llmConfig.promptCache).toBe(true);
    expect((result.llmConfig as Record<string, unknown>).promptCacheTTL).toBe('1h');
  });

  it('omits promptCacheTTL when env is not set', () => {
    delete process.env.ANTHROPIC_PROMPT_CACHE_TTL;
    const result = getLLMConfig('test-key', {
      modelOptions: { model: 'claude-sonnet-4-20250514', promptCache: true },
    });
    expect(result.llmConfig.promptCache).toBe(true);
    expect((result.llmConfig as Record<string, unknown>).promptCacheTTL).toBeUndefined();
  });

  it('omits promptCacheTTL when promptCache is disabled', () => {
    process.env.ANTHROPIC_PROMPT_CACHE_TTL = '1h';
    const result = getLLMConfig('test-key', {
      modelOptions: { model: 'claude-sonnet-4-20250514', promptCache: false },
    });
    expect((result.llmConfig as Record<string, unknown>).promptCacheTTL).toBeUndefined();
  });

  it('installed @librechat/agents fork stamps ttl on cache_control markers', () => {
    // Proves the file: tarball wiring delivers the TTL-capable fork,
    // not the upstream registry build.
    expect(makeEphemeralCacheControl('1h')).toEqual({
      type: 'ephemeral',
      ttl: '1h',
    });

    const messages = [
      new HumanMessage('First'),
      new AIMessage('Reply'),
      new HumanMessage('Second'),
    ];
    const marked = addCacheControl(messages, '1h');
    const last = marked[marked.length - 1];
    const blocks = last.content as Array<{
      type: string;
      cache_control?: { type: string; ttl?: string };
    }>;
    expect(blocks[blocks.length - 1].cache_control).toEqual({
      type: 'ephemeral',
      ttl: '1h',
    });
  });
});
