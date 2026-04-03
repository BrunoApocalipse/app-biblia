import { mapBookDTOToDomain } from "../../src/services/mappers/bibleMapper"
import { BookDTO } from "../../src/models/dto/BookDTO"

describe("Bible Mapper", () => {

  it("should convert BookDTO to Book domain", () => {

    const dto: BookDTO = {
      name: "Genesis",
      abbrev: "Gn",
      chapters: [
        ["No princípio criou Deus os céus e a terra"],
        ["Assim foram concluídos os céus e a terra"]
      ]
    }

    const book = mapBookDTOToDomain(dto)

    expect(book.name).toBe("Genesis")
    expect(book.abbreviation).toBe("Gn")
    expect(book.chapters).toBe(2)

  })

})