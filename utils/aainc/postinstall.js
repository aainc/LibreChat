/**
 * aainc/LibreChat PR ガード postinstall フック
 *
 * npm install 時に utils/aainc/setup-pr-guard.sh 相当のガード設定を自動適用する
 * （セットアップスクリプトの実行忘れ対策）。
 *
 * 重要: このスクリプトは install を絶対に失敗させない。
 * - git repo でない環境（tarball 展開 / Docker ビルド等）→ silent skip
 * - CI 環境 → silent skip
 * - gh 不在 / 未認証、origin 不一致 → 警告のみで正常終了
 *
 * 詳細は docs/aainc/pr-guard.md を参照。
 */
const { execSync } = require('child_process');

const AAINC_REPO = 'aainc/LibreChat';
const UPSTREAM_PATTERN = 'danny-avila/LibreChat';
const TAG = '[aainc-pr-guard]';

function tryRun(cmd) {
  try {
    return execSync(cmd, { stdio: ['ignore', 'pipe', 'pipe'] })
      .toString()
      .trim();
  } catch {
    return null;
  }
}

function main() {
  // CI では不要（PR 作成は人間のローカル環境からのみ行う想定）
  if (process.env.CI || process.env.NODE_ENV === 'CI') {
    return;
  }

  // git repo でなければ skip（tarball 展開 / Docker ビルド等）
  if (tryRun('git rev-parse --is-inside-work-tree') !== 'true') {
    return;
  }

  const originUrl = tryRun('git remote get-url origin');
  if (!originUrl || !originUrl.includes(AAINC_REPO)) {
    if (originUrl && originUrl.includes(UPSTREAM_PATTERN)) {
      console.warn(
        `${TAG} warning: origin がフォーク元 (${UPSTREAM_PATTERN}) を指しています。` +
          ` aainc fork で作業する場合は git remote set-url origin https://github.com/${AAINC_REPO}.git を実行してください。`,
      );
    }
    return;
  }

  // 1. push 先を origin に固定
  if (tryRun('git config remote.pushDefault origin') !== null) {
    console.log(`${TAG} git config remote.pushDefault origin を設定しました`);
  }

  // 2. gh の既定リポジトリを aainc fork に固定
  if (tryRun('gh --version') !== null) {
    if (tryRun(`gh repo set-default ${AAINC_REPO}`) !== null) {
      console.log(`${TAG} gh repo set-default ${AAINC_REPO} を設定しました`);
    } else {
      console.warn(
        `${TAG} warning: gh repo set-default に失敗しました（gh 未認証の可能性）。` +
          ` 後で bash utils/aainc/setup-pr-guard.sh を実行してください。`,
      );
    }
  } else {
    console.warn(
      `${TAG} warning: gh コマンドが見つかりません。` +
        ` インストール後に bash utils/aainc/setup-pr-guard.sh を実行してください。`,
    );
  }

  // 3. フォーク元を指す remote の push を無効化
  const remotes = (tryRun('git remote') || '').split('\n').filter(Boolean);
  for (const remote of remotes) {
    if (remote === 'origin') {
      continue;
    }
    const url = tryRun(`git remote get-url ${remote}`);
    if (url && url.includes(UPSTREAM_PATTERN) && !url.startsWith('DISABLED')) {
      const pushUrl = tryRun(`git remote get-url --push ${remote}`);
      if (pushUrl && pushUrl.startsWith('DISABLED')) {
        continue; // 設定済み
      }
      if (tryRun(`git remote set-url --push ${remote} DISABLED_DO_NOT_PUSH_TO_UPSTREAM`) !== null) {
        console.warn(
          `${TAG} warning: remote '${remote}' はフォーク元を指しているため push を無効化しました。` +
            ` docs/aainc/pr-guard.md を参照。`,
        );
      }
    }
  }
}

try {
  main();
} catch (err) {
  // どんな失敗でも install は止めない
  console.warn(`${TAG} skip: ${err.message}`);
}
process.exitCode = 0;
