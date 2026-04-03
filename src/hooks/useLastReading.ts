import { useState, useEffect } from "react"
import {
  saveLastReading as saveStorage,
  getLastReading,
  LastReading
} from "../storage/LastReadingStorage"

export function useLastReading() {

  const [bookId, setBookId] = useState<number | null>(null)
  const [chapter, setChapter] = useState<number | null>(null)
  const [version, setVersion] = useState<string | null>(null)

  useEffect(() => {
    load()
  }, [])

  async function load() {
    const data = await getLastReading()

    if (data) {
      setBookId(data.bookId)
      setChapter(data.chapter)
      setVersion(data.version)
    }
  }

  async function reload() {
    await load()
  }

  async function saveLastReading(book: number, chap: number, ver: string) {

    setBookId(book)
    setChapter(chap)
    setVersion(ver)

    const data: LastReading = {
      bookId: book,
      chapter: chap,
      version: ver
    }

    await saveStorage(data)
  }

  return {
    bookId,
    chapter,
    version,
    reload,
    saveLastReading
  }

}