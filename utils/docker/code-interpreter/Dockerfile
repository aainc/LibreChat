# aainc fork: upstream ghcr.io/thehapyone/code-interpreter installs Debian's
# nodejs (20.x, EOL). Overlay the official Node.js 24 binary on top of it.
FROM node:24.22.1-slim AS node

FROM ghcr.io/thehapyone/code-interpreter:latest

USER root
COPY --from=node /usr/local/bin/node /usr/local/bin/node
# Point the apt-provided path at the new binary so no EOL node remains.
# npm / ts-node / typescript stay on apt's JS packages and run under this node.
RUN ln -sf /usr/local/bin/node /usr/bin/node \
    && node -v | grep -q '^v24\.22\.1$'
USER app
