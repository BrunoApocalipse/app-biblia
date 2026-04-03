import { BibleRepository } from "./repositories/BibleRepository"
import { Book } from "../models/domain/Book"
import { Verse } from "../models/domain/Verse"

export class BibleService {

  private repository: BibleRepository

  constructor() {
    this.repository = new BibleRepository()
  }

  getDefaultBooks(version: "acf" | "kjf" | "nbv" | "nvi" = "acf"): Book[] {
    return this.repository.loadDefaultVersion(version)
  }

  getBooks(): Book[] {
    return this.repository.getBooks()
  }

getBookName(
  bookId: number,
  version: "acf" | "kjf" | "nbv" | "nvi" = "acf"
): string {

  this.repository.loadDefaultVersion(version)

  const books = this.repository.getBooks()

  const book = books.find(b => b.id === bookId)

  return book ? book.name : ""
}

  getVerses(
    bookId: number,
    chapter: number,
    version: "acf" | "kjf" | "nbv" | "nvi" = "acf"
  ): Verse[] {

    this.repository.loadDefaultVersion(version)

    return this.repository.getVerses(bookId, chapter)

  }

}