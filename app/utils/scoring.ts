import type { Book } from '../data/books'

export function scoreBook(book: Book, answers: readonly boolean[]): number {
  return answers.reduce(
    (total, yes, index) => total + (yes ? book.scores[index]! : -book.scores[index]!),
    0,
  )
}

function contradicts(book: Book, answers: readonly boolean[]): boolean {
  return answers.some((yes, index) => (yes ? book.scores[index]! : -book.scores[index]!) <= -2)
}

/** 回答と強く矛盾しない本を、点の高い順に返す。同点のときは一覧で先にある本を先にする。 */
export function recommendations(books: readonly Book[], answers: readonly boolean[]): Book[] {
  return books
    .filter((book) => !contradicts(book, answers))
    .sort((a, b) => scoreBook(b, answers) - scoreBook(a, answers))
}
