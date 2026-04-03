export interface Book {
  id: number
  name: string
  abbreviation: string
  testament: "old" | "new"
  chapters: number
}