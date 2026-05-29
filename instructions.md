# AI エージェント用指示 — wogglebug-bot (clasp + TypeScript for GAS)

目的
----
このファイルは、clasp と TypeScript を使った wogglebug-bot Google Apps Script プロジェクトを自動解析、ビルド、（任意で）デプロイするための手順を AI エージェント向けにまとめたものです。

所在
----
リポジトリルート：`c:/Users/wpoqw/dev/gas/wogglebug-bot`

ハイレベル・コントラクト
------------------------
- 入力: リポジトリ内のファイル群（下の「優先ファイル」を参照）
- 出力: 機械可読なレポート（JSON と Markdown）
  - プロジェクトメタ（clasp projectId、outDir、スクリプト）
  - ビルド／デプロイコマンド
  - GAS の公開エントリポイント（doGet/doPost/トリガー/エクスポート関数）
  - 各モジュール（`_init.ts` 等）の短い要約
- エラー状態: `package.json` のビルドスクリプト不在、outDir 不明、`.clasp.json` が読み取れない場合は "要人間確認" としてレポートする。

優先的に読むファイル（順序あり）
-------------------------------
1. `./.clasp.json`
2. `./appsscript.json`
3. `./package.json`
4. `./tsconfig.json`
5. ルートヘルパー: `0_utils.ts`, `999_index.ts`
6. 機能ディレクトリの初期化ファイル: `*/_init.ts` または `*/_inits.ts`（例: `8_neverness-to-everness/_inits.ts`）
7. `_init.ts` から import される TypeScript ファイル群
8. `.vscode/settings.json`（パスエイリアス等の手掛かり）

自動解析手順（チェックリスト）
-----------------------------
1. `package.json` を読み、`scripts`（`build` / `clasp:push` / `deploy` 等）と、パッケージマネージャのヒント（`package-lock.json` や `yarn.lock` の存在など）を記録。
2. `tsconfig.json` を読み、`compilerOptions.outDir` と `paths` を記録。
3. `.clasp.json` を読み、`projectId` と `rootDir`（あれば）を記録。
4. `appsscript.json` を読み、`oauthScopes`、`timeZone`、`executionApi`、`webapp` や `addOns` の設定（存在すれば）を抽出。
5. リポジトリを再帰検索し、`export function` とトップレベルの関数宣言で `doGet` / `doPost` / `onOpen` / `onInstall` / `onEdit` / `onChange` / `onFormSubmit` を検出。
6. `globalThis.<name>`、`this.<name>`、`(global as any)` の代入もスキャンし、公開エントリと見なす。
7. 各 `_init.ts` / `_inits.ts` を解析し、エクスポートと副作用（`globalThis` への登録、`ScriptApp.newTrigger(...)` 等）を記録。
8. 各 `_init.ts` からの静的 `import` をたどり、簡易的な依存マップ（深さ 1）を作成。
9. `report.json` と `report.md` を生成し、リポジトリルートか `.reports/` に保存。

出力スキーマ（report.json）
--------------------------
{
  "project": {"name": string, "claspProjectId": string|null, "outDir": string|null},
  "scripts": { ... },
  "appsscript": {"oauthScopes": [...], "triggers": [...], ...},
  "entryPoints": [ {"file": string, "function": string, "type": "webapp|trigger|global|other"} ],
  "modules": [ {"dir": string, "initFile": string, "summary": string} ],
  "notes": [ ... ]
}

レポート（report.md）
---------------------
- `report.json` の読みやすい要約。人間向けのアクション項目（ビルドスクリプトが無い、環境変数が必要等）を付記する。

ビルドとデプロイ（推奨コマンド）
-------------------------------
PowerShell から実行することを想定しています。`package.json` のスクリプトを先に確認してください。

```powershell
# 依存をインストール
# npm install

# ビルド（package.json の build を優先）
# npm run build

# clasp に push（.clasp.json の認証が必要）
# npx clasp push
```

検出ヒューリスティクスの注意点
------------------------------
- 公開関数検出はトップレベルの `export function` を優先。default export のみの場合は「要手動確認」。
- `appsscript.json` に定義されたトリガーや webapp 設定はコードから検出できない場合があるため、常に明示的に含める。
- `outDir` がソースと異なる場合は、ビルド後の JS 出力名とのマッピングを作成する。

エッジケース
-----------
- ビルド時にエクスポート名が変わるバンドラ／トランスパイラを使っている場合は「ビルド後に確認」とレポートする。
- clasp の認証情報やその他秘密情報はリポジトリ外にあるためアクセス不可。手動ステップとして報告する。

-- 以上 --
