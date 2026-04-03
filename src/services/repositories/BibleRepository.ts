import { Book } from "../../models/domain/Book"
import { Verse } from "../../models/domain/Verse"
import { BookDTO } from "../../models/dto/BookDTO"

import acf from "../../assets/bibles/acf.json"
import kjf from "../../assets/bibles/kjf.json"
import nbv from "../../assets/bibles/nbv.json"
import nvi from "../../assets/bibles/nvi.json"

type BibleVersion = "acf" | "kjf" | "nbv" | "nvi"

export class BibleRepository {

  private books: Book[] = []
  private data: BookDTO[] = []

  loadBooks(data: BookDTO[]): Book[] {

    this.data = data

    this.books = data.map((dto, index) => ({
      id: index + 1,
      name: dto.name,
      abbreviation: dto.abbrev,
      testament: "old",
      chapters: dto.chapters.length
    }))

    return this.books
  }

  loadDefaultVersion(version: BibleVersion = "acf"): Book[] {

    let data: BookDTO[] = []

    switch (version) {
      case "acf":
        data = acf as BookDTO[]
        break

      case "kjf":
        data = kjf as BookDTO[]
        break

      case "nbv":
        data = nbv as BookDTO[]
        break

      case "nvi":
        data = nvi as BookDTO[]
        break
    }

    return this.loadBooks(data)
  }

  getBooks(): Book[] {
    return this.books
  }

  getBookById(id: number): Book | undefined {
    return this.books.find(b => b.id === id)
  }

  getVerses(bookId: number, chapterNumber: number): Verse[] {

    const book = this.data[bookId - 1]

    if (!book) return []

    const chapter = book.chapters[chapterNumber - 1]

    if (!chapter) return []

    return chapter.map((text, index) => ({
      bookId: bookId,
      chapterNumber: chapterNumber,
      verseNumber: index + 1,
      text
    }))
  }

}