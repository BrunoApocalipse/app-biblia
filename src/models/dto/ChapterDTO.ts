import { VerseDTO } from "./VerseDTO"

export interface ChapterDTO {
  book_id: number
  chapter: number
  verses: VerseDTO[]
}