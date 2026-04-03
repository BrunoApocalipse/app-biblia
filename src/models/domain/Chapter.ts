import { Verse } from "./Verse"

export interface Chapter {
  bookId: number
  chapterNumber: number
  verses: Verse[]
}