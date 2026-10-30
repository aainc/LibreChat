#!/usr/bin/env bash
# chieco-server: oauth2-proxy (Google, aainc.co.jp only) + nginx auth_request.
# Usage: setup.sh check | apply <site...|all> | rollback
# Sites: chieco claude-dojo pptx-kaname slide
# Idempotent. Never prints secret values. nginx is only reloaded, never restarted.
set -euo pipefail

SRC="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
APP_DIR="${APP_DIR:-/home/ubuntu/oauth2-proxy}"
NGINX_DIR="${NGINX_DIR:-/etc/nginx}"
BACKUP_DIR="$APP_DIR/backup"
SNIPPETS=(oauth2-locations.conf oauth2-protect.conf)
ALL_SITES=(chieco claude-dojo pptx-kaname slide)
[ "$(id -u)" -eq 0 ] && SUDO="${SUDO-}" || SUDO="${SUDO-sudo -n}"

die() { echo "ERROR: $*" >&2; exit 1; }
log() { echo "[oauth2-proxy] $*"; }

site_conf() { echo "$NGINX_DIR/conf.d/$1.conf"; }

validate_sites() {
  local s a
  for s in "$@"; do
    for a in "${ALL_SITES[@]}"; do [ "$s" = "$a" ] && continue 2; done
    die "unknown site: $s (expected: ${ALL_SITES[*]})"
  done
}

env_has() { [ -f "$APP_DIR/.env" ] && grep -Eq "^$1=.+" "$APP_DIR/.env"; }

nginx_test() { $SUDO nginx -t 2>&1; }

install_file() { # src dest: copy only when content differs
  cmp -s "$1" "$2" 2>/dev/null && return 0
  $SUDO install -m 644 "$1" "$2"
}

cmd_check() {
  log "env keys (presence only)"
  local k
  for k in OAUTH2_PROXY_CLIENT_ID OAUTH2_PROXY_CLIENT_SECRET OAUTH2_PROXY_COOKIE_SECRET; do
    env_has "$k" && echo "  $k: set" || echo "  $k: MISSING"
  done
  log "container"
  $SUDO docker ps --filter name=^oauth2-proxy$ --format '  {{.Names}} {{.Image}} {{.Status}}' || true
  curl -fsS -m 3 http://127.0.0.1:4180/ping >/dev/null 2>&1 && echo "  ping: ok" || echo "  ping: not responding"
  log "snippets"
  local f
  for f in "${SNIPPETS[@]}"; do
    cmp -s "$SRC/nginx/snippets/$f" "$NGINX_DIR/snippets/$f" 2>/dev/null && echo "  $f: up to date" || echo "  $f: differs/missing"
  done
  log "sites"
  local s
  for s in "${ALL_SITES[@]}"; do
    if cmp -s "$SRC/nginx/conf.d/$s.conf" "$(site_conf "$s")"; then
      echo "  $s: applied"
    else
      echo "  $s: NOT applied (diff vs live: $(diff "$(site_conf "$s")" "$SRC/nginx/conf.d/$s.conf" 2>/dev/null | grep -c '^[<>]') lines)"
    fi
    [ -f "$BACKUP_DIR/$s.conf.orig" ] && echo "    backup: present" || echo "    backup: none"
  done
  log "nginx -t"; nginx_test || true
}

ensure_proxy() {
  env_has OAUTH2_PROXY_CLIENT_ID || die "OAUTH2_PROXY_CLIENT_ID missing in $APP_DIR/.env"
  env_has OAUTH2_PROXY_CLIENT_SECRET || die "OAUTH2_PROXY_CLIENT_SECRET missing in $APP_DIR/.env"
  if ! env_has OAUTH2_PROXY_COOKIE_SECRET; then
    local secret
    secret="$(head -c 32 /dev/urandom | base64 | tr -d '\n' | tr '+/' '-_')"
    sed -i '/^OAUTH2_PROXY_COOKIE_SECRET=/d' "$APP_DIR/.env"
    echo "OAUTH2_PROXY_COOKIE_SECRET=$secret" >> "$APP_DIR/.env"
    log "generated cookie secret"
  fi
  chmod 600 "$APP_DIR/.env"
  install -m 644 "$SRC/docker-compose.yml" "$APP_DIR/docker-compose.yml"
  (cd "$APP_DIR" && $SUDO docker compose up -d)
  local i
  for i in $(seq 1 20); do
    curl -fsS -m 3 http://127.0.0.1:4180/ping >/dev/null 2>&1 && { log "oauth2-proxy healthy"; return 0; }
    sleep 1
  done
  die "oauth2-proxy did not become healthy (docker logs oauth2-proxy)"
}

apply_site() {
  local s="$1" live prev
  live="$(site_conf "$s")"
  [ -f "$live" ] || die "$live not found"
  mkdir -p "$BACKUP_DIR"
  [ -f "$BACKUP_DIR/$s.conf.orig" ] || cp "$live" "$BACKUP_DIR/$s.conf.orig"
  if cmp -s "$SRC/nginx/conf.d/$s.conf" "$live"; then log "$s: already applied"; return 0; fi
  prev="$(mktemp -p "$BACKUP_DIR" "$s.prev.XXXXXX")"
  cp "$live" "$prev"
  $SUDO install -m 644 "$SRC/nginx/conf.d/$s.conf" "$live"
  if ! nginx_test >/dev/null; then
    $SUDO install -m 644 "$prev" "$live"
    nginx_test || true
    die "$s: nginx -t failed, restored previous conf"
  fi
  rm -f "$prev"
  log "$s: applied"
}

cmd_apply() {
  [ "$#" -gt 0 ] || die "apply needs sites: ${ALL_SITES[*]} | all"
  local sites=("$@")
  [ "$1" = "all" ] && sites=("${ALL_SITES[@]}")
  validate_sites "${sites[@]}"
  mkdir -p "$APP_DIR"
  ensure_proxy
  local f s
  for f in "${SNIPPETS[@]}"; do install_file "$SRC/nginx/snippets/$f" "$NGINX_DIR/snippets/$f"; done
  for s in "${sites[@]}"; do apply_site "$s"; done
  $SUDO nginx -s reload
  log "nginx reloaded"
}

cmd_rollback() {
  local s orig
  for s in "${ALL_SITES[@]}"; do
    orig="$BACKUP_DIR/$s.conf.orig"
    [ -f "$orig" ] || continue
    $SUDO install -m 644 "$orig" "$(site_conf "$s")"
    log "$s: restored original"
  done
  nginx_test >/dev/null || die "nginx -t failed after restore; fix manually"
  $SUDO nginx -s reload
  [ ! -f "$APP_DIR/docker-compose.yml" ] || (cd "$APP_DIR" && $SUDO docker compose stop)
  log "rolled back (oauth2-proxy stopped, snippets left in place)"
}

case "${1:-}" in
  check) cmd_check ;;
  apply) shift; cmd_apply "$@" ;;
  rollback) cmd_rollback ;;
  *) echo "usage: $0 check | apply <site...|all> | rollback" >&2; exit 2 ;;
esac
