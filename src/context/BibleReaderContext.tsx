import { createContext, useContext, useEffect, useState } from "react"
import { Book } from "../models/domain/Book"
import { BibleService } from "../services/BibleService"

type BibleReaderContextType = {
  books: Book[]
  selectedBook: Book | null
  selectedChapter: number | null
  selectBook: (book: Book) => void
  selectChapter: (chapter: number) => void
}

const BibleReaderContext = createContext<BibleReaderContextType | undefined>(undefined)

export function BibleReaderProvider({ children }: { children: React.ReactNode }) {

  const [books, setBooks] = useState<Book[]>([])
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null)

  useEffect(() => {
    const service = new BibleService()
    const data = service.getDefaultBooks()
    setBooks(data)
  }, [])

  function selectBook(book: Book) {
    setSelectedBook(book)
    setSelectedChapter(null)
  }

  function selectChapter(chapter: number) {
    setSelectedChapter(chapter)
  }

  return (
    <BibleReaderContext.Provider
      value={{
        books,
        selectedBook,
        selectedChapter,
        selectBook,
        selectChapter
      }}
    >
      {children}
    </BibleReaderContext.Provider>
  )
}

export function useBibleReaderContext() {
  const context = useContext(BibleReaderContext)

  if (!context) {
    throw new Error("useBibleReaderContext must be used inside BibleReaderProvider")
  }

  return context
}