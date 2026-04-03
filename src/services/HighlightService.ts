import AsyncStorage from "@react-native-async-storage/async-storage"

const STORAGE_KEY = "bible_highlights"

export type Highlight = {
  book: number
  chapter: number
  verse: number
  color: string
}

export class HighlightService {

  async getHighlights(): Promise<Highlight[]> {
    const data = await AsyncStorage.getItem(STORAGE_KEY)
    if (!data) return []
    return JSON.parse(data)
  }

  async getHighlight(book: number, chapter: number, verse: number) {
    const highlights = await this.getHighlights()

    return highlights.find(
      h =>
        h.book === book &&
        h.chapter === chapter &&
        h.verse === verse
    )
  }

  async setHighlight(highlight: Highlight) {
    const highlights = await this.getHighlights()

    const index = highlights.findIndex(
      h =>
        h.book === highlight.book &&
        h.chapter === highlight.chapter &&
        h.verse === highlight.verse
    )

    if (index >= 0) {
      highlights[index] = highlight
    } else {
      highlights.push(highlight)
    }

    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(highlights)
    )
  }

  async removeHighlight(book: number, chapter: number, verse: number) {
    const highlights = await this.getHighlights()

    const filtered = highlights.filter(
      h =>
        !(
          h.book === book &&
          h.chapter === chapter &&
          h.verse === verse
        )
    )

    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(filtered)
    )
  }

}