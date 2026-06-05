# vendor/ — Forked @librechat/agents (prompt cache TTL support)

## What is this?

`librechat-agents-3.2.2-aainc.1.tgz` is a forked build of
[`@librechat/agents`](https://github.com/danny-avila/agents) v3.2.2
(upstream commit `e2b8235`) that adds a `promptCacheTTL?: '5m' | '1h'`
option to `AnthropicClientOptions`. When set, every `cache_control`
marker the SDK emits (system stable block, conversation messages, tool
definitions, compaction summary) becomes
`{ type: 'ephemeral', ttl: '1h' }` instead of `{ type: 'ephemeral' }`,
extending the Anthropic prompt cache TTL from the default 5 minutes to
1 hour (GA — no beta header required).

`api/package.json` and `packages/api/package.json` reference this
tarball via a `file:` spec instead of the npm registry version. The
Dockerfiles COPY it before `npm ci` so container builds resolve it.

When `promptCacheTTL` is not set, the fork behaves identically to
upstream v3.2.2 (default 5m TTL, full backward compatibility).

## How to enable 1h TTL

Set the environment variable on the LibreChat API server:

```
ANTHROPIC_PROMPT_CACHE_TTL=1h
```

Unset (default) keeps the 5m TTL. See
`packages/api/src/endpoints/anthropic/llm.ts` for the wiring.

> Note: 1h cache writes are billed at 2x base input (vs 1.25x for 5m).
> Enable only when request gaps between 5 and 60 minutes are frequent
> enough to pay for the higher write cost.

## How to rebuild the tarball

```bash
git clone --filter=blob:none https://github.com/danny-avila/agents.git agents-fork
cd agents-fork
git checkout e2b8235
git apply ../agents-fork-3.2.2-aainc.1.patch
npm install --ignore-scripts
npm run build            # rollup + tsc
npx jest promptCacheTTL  # 5 TTL propagation tests
npm pack                 # -> librechat-agents-3.2.2-aainc.1.tgz
```

The full fork diff (source changes + tests, no dist patching) is
recorded in `agents-fork-3.2.2-aainc.1.patch` in this directory.

## Upstream follow-up

The proper long-term fix is an upstream PR adding `promptCacheTTL` to
`@librechat/agents`; this patch is intentionally minimal so it can be
used as the basis for that PR. Until merged, bumping the agents version
requires: rebase patch -> rebuild -> repack -> update `file:` specs and
lockfile.
