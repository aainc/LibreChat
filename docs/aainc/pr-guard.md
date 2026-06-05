# aainc/LibreChat PR ガード運用ガイド

本リポジトリは [danny-avila/LibreChat](https://github.com/danny-avila/LibreChat) の fork であり、
社内カスタマイズを主目的とする。**PR は常に aainc/LibreChat 内（base リポジトリ: aainc）に向ける。**

このドキュメントは、誤ってフォーク元 (upstream) に PR を出してしまう事故を防ぐための
ローカル側ガードと運用ルールをまとめたものである。

## なぜ事故が起きるのか

- fork の clone で `gh pr create` を実行すると、gh はフォーク元 (danny-avila/LibreChat) を
  PR の base リポジトリ候補として扱う。`gh repo set-default` 未設定の場合、対話プロンプトの
  既定値や非対話実行時の解決先がフォーク元に向くことがある。
- `gh repo clone aainc/LibreChat` で clone すると、フォーク元が `upstream` remote として
  **自動追加**される。これにより gh の base リポジトリ解決がフォーク元に引っ張られる。
- GitHub 側に「fork の PR 先既定を変える」設定は存在しないため、ガードはローカル / clone 側で
  多層に敷く必要がある。

## 初回セットアップ（clone 直後に必ず実行）

```bash
git clone https://github.com/aainc/LibreChat.git
cd LibreChat
bash utils/aainc/setup-pr-guard.sh
```

`setup-pr-guard.sh` は以下を一括で行う:

1. `gh repo set-default aainc/LibreChat` — gh の PR / issue 操作の既定リポジトリを aainc に固定
2. `git config remote.pushDefault origin` — push 先を origin (aainc) に固定
3. フォーク元を指す remote が存在する場合、その push URL を無効化

### npm install 時の自動適用

セットアップスクリプトの実行忘れ対策として、`npm install` 実行時に同等のガード設定が
`postinstall` フック（`utils/aainc/postinstall.js`）で自動適用される。

- 適用内容は `setup-pr-guard.sh` と同等（`gh repo set-default` / `remote.pushDefault` /
  フォーク元 remote の push 無効化）
- CI 環境・git repo でない環境（tarball 展開 / Docker ビルド等）では何もせず skip する
- gh 不在・未認証・origin 不一致などの異常時も **install は失敗させず**、警告表示に留める。
  警告が出た場合は原因を解消のうえ `bash utils/aainc/setup-pr-guard.sh` を手動実行すること

## 運用ルール

### 1. upstream remote を追加しない

通常の開発でフォーク元 remote は不要。**`git remote add upstream ...` をしないこと。**
upstream 同期（フォーク元の取り込み）が必要な場合は、担当者が同期作業時のみ一時的に追加し、
作業後に `git remote remove upstream` で削除する。残す場合は `setup-pr-guard.sh` を再実行して
push を無効化しておく。

### 2. PR 作成は wrapper script を使う

```bash
bash utils/aainc/create-pr.sh --title "..." --body "..."
```

wrapper は `gh pr create --repo aainc/LibreChat --base main` を強制する。
aainc 内の別ブランチに向けたい場合のみ `--base <branch>` を追加で渡す（後勝ちで上書きされる）。

### 3. 素の gh pr create を使う場合は --repo を必ず明示

wrapper を使えない事情がある場合でも、必ず以下の形で実行する:

```bash
gh pr create --repo aainc/LibreChat --base main ...
```

`--repo` を省略した `gh pr create` は禁止。CI / 自動化スクリプトから PR を作成する場合も同様に
`--repo aainc/LibreChat` を明示すること。

### 4. Web UI から PR を作成する場合

GitHub の compare 画面では base リポジトリのドロップダウンが
`danny-avila/LibreChat` に向いていないか**必ず確認**する。
URL で直接指定するのが安全:

```
https://github.com/aainc/LibreChat/compare/main...<branch>
```

## PR 作成前チェックリスト

- [ ] `gh repo set-default --view` が `aainc/LibreChat` を返す
- [ ] `git remote -v` にフォーク元への push 可能な remote がない
- [ ] PR 作成コマンドに `--repo aainc/LibreChat` が明示されている（または wrapper を使用）
- [ ] 作成後、PR の URL が `github.com/aainc/LibreChat/pull/...` であることを確認

## 誤ってフォーク元に PR を出してしまった場合

1. 即座に該当 PR をクローズする（マージ権限がなくても作成者はクローズできる）
2. PR 本文・コミットに社内情報が含まれていないか確認する。含まれていた場合は
   リーダーに報告する（フォーク元のリポジトリ管理者への削除依頼が必要になることがある）
3. `bash utils/aainc/setup-pr-guard.sh` を再実行してガード設定を復旧する
