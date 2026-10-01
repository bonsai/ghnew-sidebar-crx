# ghnew-sidebar-crx

GitHub の New Repository を置き換える Side Panel CRX。

## MVP

```
repo name
   ↓
HTMX /check
   ↓
available ──→ New Repository
exists    ──→ 既存repoを表示
invalid   ──→ 入力修正
```

### 原則

- repo を作る前に必ず同名チェック
- provisional name を許容
- チェック結果を見てから GitHub New に進む
- UI は HTMX の partial response を中心にする
- GitHub API の認証情報を CRX に固定保存しない

## API contract

`GET /check?owner=bonsai&name=example`

Response:

```html
<span class="status available">✓ available</span>
```

or

```html
<span class="status exists">⚠ already exists</span>
<a href="https://github.com/bonsai/example">Open repository</a>
```

## Next

1. HTMX partial endpoint
2. GitHub existence check
3. Side Panel manifest
4. New Repository handoff
5. search/chat/idea flow
