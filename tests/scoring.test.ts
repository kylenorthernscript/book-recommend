import { describe, expect, it } from 'vitest'
import { books } from '../app/data/books'
import { questions } from '../app/data/questions'
import { recommendations, scoreBook } from '../app/utils/scoring'

const allAnswers = Array.from({ length: 2 ** questions.length }, (_, pattern) =>
  questions.map((_, index) => Boolean(pattern & (1 << index))),
)

const bitterQuestion = 1

describe('データ', () => {
  it('20冊と5問がある', () => {
    expect(books).toHaveLength(20)
    expect(questions).toHaveLength(5)
  })

  it('全冊の配点の重みがそろっている', () => {
    for (const book of books) {
      expect(book.scores.reduce((sum, score) => sum + Math.abs(score), 0)).toBe(8)
    }
  })

  it('配点の符号の組み合わせが本ごとに異なる', () => {
    const signs = books.map((book) => book.scores.map(Math.sign).join())
    expect(new Set(signs).size).toBe(books.length)
  })
})

describe('recommendations', () => {
  it('はい・いいえの符号どおりに答えると、その本が選ばれる', () => {
    for (const book of books) {
      expect(recommendations(books, book.scores.map((score) => score > 0))[0]!.id).toBe(book.id)
    }
  })

  it('全冊がいずれかの回答で選ばれ、1冊に偏らない', () => {
    const counts = new Map<number, number>()
    for (const answers of allAnswers) {
      const { id } = recommendations(books, answers)[0]!
      counts.set(id, (counts.get(id) ?? 0) + 1)
    }
    expect(counts.size).toBe(books.length)
    expect(Math.max(...counts.values())).toBeLessThanOrEqual(3)
  })

  it('後味の悪さを望まない人に、方舟と告白を推薦しない', () => {
    for (const answers of allAnswers.filter((a) => !a[bitterQuestion])) {
      expect(['方舟', '告白']).not.toContain(recommendations(books, answers)[0]!.title)
    }
  })

  it('回答と強く矛盾する本を推薦しない', () => {
    for (const answers of allAnswers) {
      const { scores } = recommendations(books, answers)[0]!
      answers.forEach((yes, index) => {
        expect(yes ? scores[index] : -scores[index]!).toBeGreaterThan(-2)
      })
    }
  })

  it('同点のときは一覧で先にある本を選ぶ', () => {
    const [first, second] = books
    const tied = [first!, { ...second!, scores: first!.scores }]
    const answers = first!.scores.map((score) => score > 0)
    expect(scoreBook(tied[0]!, answers)).toBe(scoreBook(tied[1]!, answers))
    expect(recommendations(tied, answers)[0]!.id).toBe(first!.id)
  })

  it('どの回答にも候補が1冊以上ある', () => {
    for (const answers of allAnswers) {
      expect(recommendations(books, answers).length).toBeGreaterThanOrEqual(1)
    }
  })

  it('次点以降も回答と強く矛盾しない', () => {
    for (const answers of allAnswers) {
      for (const { scores } of recommendations(books, answers)) {
        answers.forEach((yes, index) => {
          expect(yes ? scores[index] : -scores[index]!).toBeGreaterThan(-2)
        })
      }
    }
  })

  it('後味の悪さを望まない人の候補に、方舟と告白を含めない', () => {
    for (const answers of allAnswers.filter((a) => !a[bitterQuestion])) {
      const titles = recommendations(books, answers).map((book) => book.title)
      expect(titles).not.toContain('方舟')
      expect(titles).not.toContain('告白')
    }
  })

  it('候補は点の高い順に並ぶ', () => {
    for (const answers of allAnswers) {
      const points = recommendations(books, answers).map((book) => scoreBook(book, answers))
      expect(points).toEqual(points.toSorted((a, b) => b - a))
    }
  })

  it('全問「はい」の候補は地雷グリコの1冊のみ', () => {
    const titles = recommendations(books, questions.map(() => true)).map((book) => book.title)
    expect(titles).toEqual(['地雷グリコ'])
  })

  it('回答と逆向きの配点が -1 や 1 だけの本は除かない', () => {
    const book = books[0]!
    const yesBook = { ...book, scores: [2, 2, 2, 1, -1] as const }
    const noBook = { ...book, scores: [-2, -2, -2, -1, 1] as const }
    expect(recommendations([yesBook], questions.map(() => true))).toEqual([yesBook])
    expect(recommendations([noBook], questions.map(() => false))).toEqual([noBook])
  })

  it('回答と逆向きの配点が -2 や 2 の本は除く', () => {
    const book = books[0]!
    const yesBook = { ...book, scores: [2, 2, 1, 1, -2] as const }
    const noBook = { ...book, scores: [-2, -2, -1, -1, 2] as const }
    expect(recommendations([yesBook], questions.map(() => true))).toEqual([])
    expect(recommendations([noBook], questions.map(() => false))).toEqual([])
  })
})

describe('公開時の注意', () => {
  const publicText = [
    ...questions,
    ...books.flatMap((book) => [book.appeal, book.summary]),
  ].join('\n')

  it.each([
    '叙述', 'トリック', 'どんでん返し', '反転', 'イヤミス', 'ネタバレ', '犯人は',
    '密室', '同一人物', '身分詐称', '別人', 'ロッキー', '異星人', '脱獄',
  ])('「%s」を画面の文章に使わない', (word) => {
    expect(publicText).not.toContain(word)
  })
})
