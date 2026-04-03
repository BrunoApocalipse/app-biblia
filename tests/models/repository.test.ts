import { BibleRepository } from "../../src/services/repositories/BibleRepository"
import { BookDTO } from "../../src/models/dto/BookDTO"

describe("BibleRepository", () => {

  it("should load books from DTO", () => {

    const repository = new BibleRepository()

    const data: BookDTO[] = [
      {
        name: "Genesis",
        abbrev: "Gn",
        chapters: [
          ["No princípio criou Deus os céus e a terra."],
          ["Assim foram concluídos os céus e a terra."]
        ]
      }
    ]

    const books = repository.loadBooks(data)

    expect(books.length).toBe(1)
    expect(books[0].id).toBe(1)
    expect(books[0].name).toBe("Genesis")
    expect(books[0].abbreviation).toBe("Gn")
    expect(books[0].chapters).toBe(2)

  })

})

