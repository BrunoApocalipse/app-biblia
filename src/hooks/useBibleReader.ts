import { useState, useEffect } from "react"
import { Book } from "../models/domain/Book"
import { Verse } from "../models/domain/Verse"
import { BibleService } from "../services/BibleService"

export function useBibleReader() {
  const service = new BibleService()

  const [books, setBooks] = useState<Book[]>([])
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null)
  const [verses, setVerses] = useState<Verse[]>([])

  useEffect(() => {
    const defaultBooks = service.getDefaultBooks()
    setBooks(defaultBooks)
  }, [])

  function selectBook(book: Book) {
    setSelectedBook(book)
    setSelectedChapter(null)
    setVerses([])
  }

  function selectChapter(chapter: number) {
    if (!selectedBook) return

    setSelectedChapter(chapter)

    const chapterVerses = service.getVerses(selectedBook.id, chapter)
    setVerses(chapterVerses)
  }

  return {
    books,
    selectedBook,
    selectedChapter,
    verses,
    selectBook,
    selectChapter
  }
}