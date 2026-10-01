# ghnew-sidebar-crx

GitHub の **検索** と **新規 Repository 作成**だけを行う Side Panel CRX。

## Flow

- 検索 → GitHub の検索結果をメインペインで開く
- repo名 → REST APIで同名チェック
- available → 同じSide PanelからREST APIで作成
- 作成後 → 作成したrepoをメインペインで開く

GitHub API のJSONをブラウザで取得し、Side Panelの最小UIに反映する。

## Authentication

新規作成時にGitHub tokenを一度だけ入力する。
tokenは chrome.storage.local に保存する。

## Scope

検索と新規作成以外は実装しない。
