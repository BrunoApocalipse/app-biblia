import { View, FlatList, StyleSheet } from "react-native"
import { router, useLocalSearchParams } from "expo-router"

import VerseBox from "../components/VerseBox"
import ReadingHeader from "../components/ReadingHeader"
import { BibleService } from "../services/BibleService"
import { useSettings } from "../context/SettingsContext"

export default function VersesScreen() {

  const params = useLocalSearchParams()

  const book = Number(params.book)
  const chapter = Number(params.chapter)

  const { bibleVersion } = useSettings()

  const service = new BibleService()

  const verses = service.getVerses(book, chapter, bibleVersion)
  const verseNumbers = verses.map(v => v.verseNumber)

  const bookName = service.getBookName(book, bibleVersion)

  function openVerse(verse: number) {

    router.push({
      pathname: "/reading/[book]/[chapter]",
      params: {
        book: String(book),
        chapter: String(chapter),
        verse: String(verse)
      }
    })

  }

  return (

    <View style={styles.container}>

      <ReadingHeader
        book={bookName}
        chapter={chapter}
      />

      <FlatList
        data={verseNumbers}
        keyExtractor={(item) => String(item)}
        numColumns={4}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <VerseBox
            verse={item}
            onPress={() => openVerse(item)}
          />
        )}
      />

    </View>

  )

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#fff"
  },

  list: {
    padding: 12
  }

})