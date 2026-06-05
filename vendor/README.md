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
`packages/api/src/endpoints/anthropic/llm.ts` for the wiring. The same
variable also switches cost accounting to the 1h cache-write rate
(2x base input) for Anthropic-provider usage — see
`packages/data-schemas/src/methods/tx.ts` (`write1h`).

> Note: 1h cache writes are billed at 2x base input (vs 1.25x for 5m).
> Enable only when request gaps between 5 and 60 minutes are frequent
> enough to pay for the higher write cost.

## Docker Compose: build locally to get the fork (required for 1h TTL)

The stock `docker-compose.yml` pulls the official prebuilt image
(`registry.librechat.ai/danny-avila/librechat-dev:latest`), which is
built from upstream and does **not** contain the forked
`@librechat/agents` — with that image the TTL env var has no effect on
requests. To run with the fork, build the image from this repository
via an override file (see the "LOCAL BUILD" section in
`docker-compose.override.yml.example`):

```yaml
# docker-compose.override.yml
services:
  api:
    image: librechat
    build:
      context: .
      target: node
```

Then add the TTL setting to your `.env` (read by the api service):

```
ANTHROPIC_PROMPT_CACHE_TTL=1h
```

And build + start:

```bash
docker compose build api
docker compose up -d
```

The Dockerfile already COPYs `vendor/librechat-agents-*.tgz` before
`npm ci`, so no extra step is needed. To confirm the running image
contains the fork:

```bash
docker compose exec api node -e \
  "console.log(require('@librechat/agents/package.json').version)"
# -> 3.2.2-aainc.1
```

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
