import React, { useEffect, useState } from "react"
import { FlatList, Text, StyleSheet, View } from "react-native"
import { useLocalSearchParams } from "expo-router"

import ChapterHeader from "../components/ChapterHeader"
import VerseItem from "../components/VerseItem"

import { BibleService } from "../services/BibleService"
import { Verse } from "../models/domain/Verse"
import { Book } from "../models/domain/Book"
import { useLastReading } from "../hooks/useLastReading"

const bibleService = new BibleService()

export default function ReadingScreen() {

  const { book, chapter, verse } = useLocalSearchParams()

  const bookId = Number(Array.isArray(book) ? book[0] : book)
  const chapterNumber = Number(Array.isArray(chapter) ? chapter[0] : chapter)
  const targetVerse = verse ? Number(verse) : null

  const [verses, setVerses] = useState<Verse[]>([])
  const [bookData, setBookData] = useState<Book | null>(null)
  const [selectedVerse, setSelectedVerse] = useState<number | null>(null)

  const { saveLastReading } = useLastReading()

  // carregar dados
  useEffect(() => {

    const books = bibleService.getBooks()
    const selectedBook = books.find((b) => b.id === bookId)

    setBookData(selectedBook || null)

    const chapterVerses = bibleService.getVerses(bookId, chapterNumber)
    setVerses(chapterVerses)

  }, [bookId, chapterNumber])

  // salvar última leitura
  useEffect(() => {
    if (!bookId || !chapterNumber) return

    saveLastReading(bookId, chapterNumber, "acf")
  }, [bookId, chapterNumber])

  if (!bookData) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Livro não encontrado</Text>
      </View>
    )
  }

  return (

    <FlatList
      data={verses}
      keyExtractor={(item) => String(item.verseNumber)}

      ListHeaderComponent={
        <ChapterHeader
          bookName={bookData.name}
          chapter={chapterNumber}
        />
      }

      initialScrollIndex={
        targetVerse && targetVerse > 0
          ? targetVerse - 1
          : 0
      }

      getItemLayout={(_, index) => ({
        length: 80,
        offset: 80 * index,
        index
      })}

      renderItem={({ item }) => (

        <VerseItem
          verseNumber={item.verseNumber}
          text={item.text}
          book={bookId}
          chapter={chapterNumber}

          isSelected={selectedVerse === item.verseNumber}

          onPress={() => setSelectedVerse(item.verseNumber)}

          onClose={() => setSelectedVerse(null)}
        />

      )}

      contentContainerStyle={styles.list}

    />

  )

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  list: {
    padding: 12,
    backgroundColor: "#fff"
  },

  errorText: {
    fontSize: 18,
    color: "#000"
  }

})