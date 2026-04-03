import { BookDTO } from "../../models/dto/BookDTO"
import { ChapterDTO } from "../../models/dto/ChapterDTO"
import { VerseDTO } from "../../models/dto/VerseDTO"

import { Book } from "../../models/domain/Book"
import { Chapter } from "../../models/domain/Chapter"
import { Verse } from "../../models/domain/Verse"

export function mapBookDTOToDomain(dto: BookDTO, index: number = 0): Book {
  return {
    id: index + 1,
    name: dto.name,
    abbreviation: dto.abbrev,
    testament: "old", // temporário até existir campo no DTO
    chapters: dto.chapters.length
  }
}

export function mapVerseDTOToDomain(dto: VerseDTO): Verse {
  return {
    bookId: dto.book_id,
    chapterNumber: dto.chapter,
    verseNumber: dto.verse,
    text: dto.text
  }
}

export function mapChapterDTOToDomain(dto: ChapterDTO): Chapter {
  return {
    bookId: dto.book_id,
    chapterNumber: dto.chapter,
    verses: dto.verses.map(mapVerseDTOToDomain)
  }
}

