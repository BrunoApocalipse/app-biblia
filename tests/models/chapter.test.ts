import { Chapter } from "../../src/models/domain/Chapter"
import { Verse } from "../../src/models/domain/Verse"

describe("Chapter Model", () => {

  it("should create chapter with verses", () => {

    const verse: Verse = {
      bookId: 1,
      chapterNumber: 1,
      verseNumber: 1,
      text: "No princípio..."
    }

    const chapter: Chapter = {
      bookId: 1,
      chapterNumber: 1,
      verses: [verse]
    }

    expect(chapter.verses.length).toBe(1)
    expect(chapter.verses[0].verseNumber).toBe(1)

  })

})