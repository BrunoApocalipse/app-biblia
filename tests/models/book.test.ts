import { Book } from "../../src/models/domain/Book"
import { BookDTO } from "../../src/models/dto/BookDTO"

describe("Book Model", () => {

  it("should create a valid domain book", () => {

    const book: Book = {
      id: 1,
      name: "Genesis",
      abbreviation: "Gn",
      testament: "old",
      chapters: 50
    }

    expect(book.id).toBe(1)
    expect(book.name).toBe("Genesis")
    expect(book.chapters).toBe(50)

  })

  it("should match DTO structure", () => {

    const dto: BookDTO = {
      name: "Genesis",
      abbrev: "Gn",
      chapters: [
        ["In the beginning God created the heaven and the earth."]
      ]
    }

    expect(dto.abbrev).toBe("Gn")
    expect(dto.chapters.length).toBe(1)

  })

})