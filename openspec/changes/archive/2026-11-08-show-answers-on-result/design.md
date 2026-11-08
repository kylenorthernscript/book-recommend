# Design

## Context

回答は `app/app.vue` の `answers`（`boolean[]`）に出題順で入っており、設問文は `app/data/questions.ts` の配列にある。添字で対応するため、新しい状態は必要ない。`answers` の変更時には、`main` 内で最初の `h2` にフォーカスを移している。

要件は `specs/result-answer-review/spec.md` を参照。

## Goals / Non-Goals

**Goals:**

- 既存の状態とBulmaのクラスだけで振り返りを表示する。
- 結果画面のフォーカス移動を変えない。

**Non-Goals:**

- コンポーネントのテスト環境の導入。

## Decisions

### 設問と回答はpropsで `ResultCard` に渡す

`app.vue` から `questions` と `answers` を渡し、`ResultCard` は表示だけを担当する。`book` と同じ受け渡し方で、`ResultCard` がデータの場所を知らずに済む。`ResultCard` 内で `questions` をimportする案は、回答はどのみちpropsが必要で、受け取り方が分かれるため採らない。

### 振り返りは `ResultCard` の中に書く

表示は短いリスト1つで、他の画面では使わないため、別コンポーネントに分けない。

### 見出しは `h3`、一覧は `ol` にする

書名の `h2` の下位の区分なので `h3` にする。これにより、最初の `h2` へのフォーカス移動にも影響しない。出題順に意味があるため一覧は `ol` とする。

### 回答は文字付きのBulmaの `tag` で示す

質問画面のボタンに合わせ、「はい」は `is-primary`、「いいえ」は `is-primary is-light` にする。色だけに頼らず、文字で回答が読めるようにする。

## Risks / Trade-offs

- [結果画面が縦に長くなり、「もう一度診断する」が下に移動する] → 5行の短いリストに留め、スマートフォン幅の表示を実機相当の幅で確認する。
- [表示の自動テストがない] → 依存パッケージを増やさず、ブラウザで操作して確認する。推薦ロジックは変更しないため、既存のテストはそのまま有効である。
