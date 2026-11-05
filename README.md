# 読書タイプ診断

はい・いいえの5問に答えると、20冊の中から1冊を推薦するアプリです。Nuxt、Bulmaで作り、Netlifyで公開します。

> [!WARNING]
> **このリポジトリにはネタバレが含まれます。** [`reading-list-20.md`](reading-list-20.md) のあらすじには作品の結末が書かれています。[`tests/scoring.test.ts`](tests/scoring.test.ts) の禁止語リストにも、結末を連想させる語があります。これから作品を読む方は、これらのファイルを開かないでください。アプリの質問と結果の画面には、結末やトリックの分類を表示しません。

## 開発

```sh
pnpm install
pnpm dev        # 開発サーバー
pnpm test       # テスト
pnpm generate   # 静的サイトを dist に生成
```

## 採点の仕組み

各書籍は質問ごとの配点（`app/data/books.ts` の `scores`）を持ちます。「はい」なら配点を加算し、「いいえ」なら減算して、最高点の1冊を推薦します。同点のときは一覧で先にある本を選びます。

## プロンプト記録

開発で入力したプロンプトは [`prompts/`](prompts/) にあります。

## ライセンス

読書記録を含め、このリポジトリ全体に [MIT License](LICENSE) を適用します。
