import { BibleService } from "../../src/services/BibleService"

describe("BibleService", () => {

  it("should load default books through service", () => {

    const service = new BibleService()

    const books = service.getDefaultBooks("acf")

    expect(Array.isArray(books)).toBe(true)
    expect(books.length).toBeGreaterThan(0)

    expect(books[0]).toHaveProperty("id")
    expect(books[0]).toHaveProperty("name")
    expect(books[0]).toHaveProperty("abbreviation")
    expect(books[0]).toHaveProperty("chapters")

  })

})

