# book-recommend

`reading-list-20.md` の20冊から、はい・いいえの5問で1冊を推薦する診断アプリ。Nuxt、Bulma、pnpm を使い、Netlifyで公開する。

## 現在の状況
変化する状態はこのファイルに書かず、次の場所で確認する。

- 進行中の変更：`openspec/changes/`（`openspec list`）
- 現在の仕様：`openspec/specs/`
- タグ：`git tag`
- 最新の経緯：`prompts/` の末尾

## 開発環境

- `nvm use` でNode 24系に切り替えてから作業する。24.2.0はNuxtの対応範囲外。
- 確認は `pnpm test`、`pnpm typecheck`、`pnpm generate`。
- Netlifyでは出力先が `dist` になる（手元の `dist` は `.output/public` へのリンク）。公開の設定を変えるときは、`CI=true NETLIFY=true` でクリーンな複製をビルドして確かめる。
- このリポジトリの `user.email` はGitHubのnoreplyアドレス。Gmailをコミットに出さない。

## デザイン

ライト表示に固定する（Bulmaの `bulma-no-dark-mode` 版を使う）。配色と書体は `app/assets/css/theme.css` のBulmaテーマ変数で調整する。

## Gitのルール

- コミットは、ユーザーに頼まれたときだけ行う。
- 履歴を書き換えない。amend、rebase、force push は使わない。
- タグは、ユーザーが名前を指定したときだけ付ける。公開済みのタグは動かさない。誤りは修正のコミットと新しいタグで対応する。
- ユーザーに頼まれるまで、GitHubへ push しない。
- パスワードやAPIキーなどの秘密情報をコミットしない。

## プロンプトの記録

ユーザーが入力したプロンプトを、`prompts/` に連番のファイルとして原文のまま追加する。秘密情報は `[REDACTED]` に置き換える。

入力ごとに必ず追加する。記録ファイルもコミットの対象なので、ユーザーに頼まれるまでコミットしない。

## ネタバレの禁止

質問と結果の画面に、トリックの分類や結末を出さない。読書体験の言葉で表現する（例：「最後に物語の見え方が変わる驚き」）。`reading-list-20.md` にはトリックの分類など作品の仕掛けに触れる記述が含まれるため、アプリから読み込まず、公開用の文章は `app/data/books.ts` に別に書く。
