import { describe, expect, it } from 'vitest'
import { books } from '../app/data/books'
import { questions } from '../app/data/questions'
import { recommend, scoreBook } from '../app/utils/scoring'

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

describe('recommend', () => {
  it('はい・いいえの符号どおりに答えると、その本が選ばれる', () => {
    for (const book of books) {
      expect(recommend(books, book.scores.map((score) => score > 0)).id).toBe(book.id)
    }
  })

  it('全冊がいずれかの回答で選ばれ、1冊に偏らない', () => {
    const counts = new Map<number, number>()
    for (const answers of allAnswers) {
      const { id } = recommend(books, answers)
      counts.set(id, (counts.get(id) ?? 0) + 1)
    }
    expect(counts.size).toBe(books.length)
    expect(Math.max(...counts.values())).toBeLessThanOrEqual(3)
  })

  it('後味の悪さを望まない人に、方舟と告白を推薦しない', () => {
    for (const answers of allAnswers.filter((a) => !a[bitterQuestion])) {
      expect(['方舟', '告白']).not.toContain(recommend(books, answers).title)
    }
  })

  it('回答と強く矛盾する本を推薦しない', () => {
    for (const answers of allAnswers) {
      const { scores } = recommend(books, answers)
      answers.forEach((yes, index) => {
        expect(yes ? scores[index] : -scores[index]!).toBeGreaterThan(-2)
      })
    }
  })

  it('同点のときは一覧で先にある本を選ぶ', () => {
    const [first, second] = books
    const tied = [first!, { ...second!, scores: first!.scores }]
    const answers = questions.map(() => true)
    expect(scoreBook(tied[0]!, answers)).toBe(scoreBook(tied[1]!, answers))
    expect(recommend(tied, answers).id).toBe(first!.id)
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
