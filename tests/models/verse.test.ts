import { Verse } from "../../src/models/domain/Verse"

describe("Verse Model", () => {

  it("should create a verse", () => {

    const verse: Verse = {
      bookId: 1,
      chapterNumber: 1,
      verseNumber: 1,
      text: "No princípio Deus criou..."
    }

    expect(verse.text).toContain("Deus")
    expect(verse.verseNumber).toBe(1)

  })

})