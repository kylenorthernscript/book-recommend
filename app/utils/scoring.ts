import type { Book } from '../data/books'

export function scoreBook(book: Book, answers: readonly boolean[]): number {
  return answers.reduce(
    (total, yes, index) => total + (yes ? book.scores[index]! : -book.scores[index]!),
    0,
  )
}

/** 最高点の1冊を返す。同点のときは一覧で先にある本を選ぶ。 */
export function recommend(books: readonly Book[], answers: readonly boolean[]): Book {
  return books.reduce((best, book) =>
    scoreBook(book, answers) > scoreBook(best, answers) ? book : best,
  )
}
