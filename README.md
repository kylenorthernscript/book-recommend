# 読書タイプ診断

はい・いいえの5問に答えると、20冊の中から1冊を推薦するアプリです。Nuxt、Bulmaで作り、Netlifyで公開します。

## 開発

```sh
pnpm install
pnpm dev        # 開発サーバー
pnpm test       # テスト
pnpm generate   # 静的サイトを .output/public に生成
```

## 採点の仕組み

各書籍は質問ごとの配点（`app/data/books.ts` の `scores`）を持ちます。「はい」なら配点を加算し、「いいえ」なら減算して、最高点の1冊を推薦します。同点のときは一覧で先にある本を選びます。

## プロンプト記録

開発で入力したプロンプトは [`prompts/`](prompts/) にあります。
