# chieco-server: oauth2-proxy による Google ログイン (aainc.co.jp 限定)

人が使う Web 画面を nginx `auth_request` + oauth2-proxy v7.15.2 (Google provider) で保護する。Dify と同方式。
TLS は ALB 終端 (ALB -> nginx:80)。`X-Forwarded-Proto` は ALB 付与の値を使う。既存の VPN IP 制限 (`conf.d/00-vpn-only.conf`) は別層として維持する。

## 対象

| サイト | 扱い |
|---|---|
| chieco.chat | 保護 (`/health` と、upstream 停止中の `/log` は除外) |
| claude-dojo.chieco.chat | 保護 |
| pptx-kaname.chieco.chat / slide.chieco.chat | 保護 (basic 認証を置換、`/healthz` は除外) |
| ax-assessment (MCP + 独自 OAuth), audit (Chrome 拡張), extention (拡張の自動更新), dify-req (機械呼び出し, basic 維持), prompt / vtt (upstream 停止中) | 対象外・無変更 |

## 事前準備 (人間)

1. Google Cloud Console で OAuth 同意画面を **内部** にし、新規「ウェブアプリケーション」クライアントを作る (LibreChat 既存クライアントとは別)。
2. 承認済みリダイレクト URI:
   - https://chieco.chat/oauth2/callback
   - https://claude-dojo.chieco.chat/oauth2/callback
   - https://pptx-kaname.chieco.chat/oauth2/callback
   - https://slide.chieco.chat/oauth2/callback
3. chieco-server で `/home/ubuntu/oauth2-proxy/.env` (0600) を作り、`OAUTH2_PROXY_CLIENT_ID` / `OAUTH2_PROXY_CLIENT_SECRET` を直接記入する (`env.template` 参照。cookie secret は apply が生成する)。

## 展開

リポジトリを chieco-server の checkout に取り込んだ上で:

```bash
cd /home/ubuntu/LibreChat/utils/aainc/oauth2-proxy
./setup.sh check                  # 読み取りのみ
./setup.sh apply claude-dojo      # カナリア。ブラウザで確認
./setup.sh apply slide pptx-kaname
./setup.sh apply chieco
```

`apply` は冪等。サイトごとに初回のみ元の conf を `/home/ubuntu/oauth2-proxy/backup/<site>.conf.orig` に退避し、`nginx -t` が失敗したらそのサイトの conf を直前の状態へ自動で戻す。nginx は reload のみ。

## ロールバック

```bash
./setup.sh rollback   # 退避した元 conf を戻して reload、oauth2-proxy コンテナを stop
```

LibreChat 本体・DB は変更しない。

## 運用上の注意

- 認証は fail-closed。oauth2-proxy が落ちると保護サイトは 500 になる (`restart: unless-stopped`)。
- ログインはホスト別 (cookie はホスト単位, 有効 12h)。新サイトを足すときは redirect URI の追加と conf の追加が要る。
- LibreChat のアプリ内 Google ログインは変更しない。利用者は Google ログインを 2 回通る (2 回目は同一 Google セッションで 1 クリック)。`ALLOW_EMAIL_LOGIN=false` は別途の任意施策。
- 期限切れ後の XHR/SSE は 403 (サインインページ) になる。画面再読み込みで再ログインする。
- `nginx -t` 相当は本番側でしか検証できない (リポジトリ側に nginx が無い)。初回は必ず `check` -> カナリアの順で進める。
