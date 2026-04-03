import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  PanResponder
} from "react-native"

import { SafeAreaView } from "react-native-safe-area-context"
import { useLocalSearchParams, router } from "expo-router"
import { useEffect, useState, useRef } from "react"

import ReadingHeader from "../../../../src/components/ReadingHeader"
import VerseItem from "../../../../src/components/VerseItem"

import { BibleService } from "../../../../src/services/BibleService"
import { useSettings } from "../../../../src/context/SettingsContext"
import { useLastReading } from "../../../../src/hooks/useLastReading"

export default function ReadingPage() {

  const params = useLocalSearchParams()

  const book = Number(params.book)
  const chapter = Number(params.chapter)
  const verseParam = params.verse ? Number(params.verse) : null

  const { bibleVersion } = useSettings()
  const { saveLastReading } = useLastReading()

  const [verses, setVerses] = useState<any[]>([])
  const [selectedVerse, setSelectedVerse] = useState<number | null>(null)

  const scrollRef = useRef<ScrollView>(null)
  const versePositions = useRef<{ [key: number]: number }>({})

  const bibleService = new BibleService()
  const bookName = bibleService.getBookName(book, bibleVersion)

  useEffect(() => {

    const data = bibleService.getVerses(
      book,
      chapter,
      bibleVersion
    )

    setVerses(data)

    saveLastReading(
      book,
      chapter,
      bibleVersion
    )

  }, [book, chapter, bibleVersion])

  useEffect(() => {

    if (!verseParam) return

    setTimeout(() => {

      const y = versePositions.current[verseParam]

      if (y !== undefined && scrollRef.current) {
        scrollRef.current.scrollTo({ y, animated: true })
      }

    }, 300)

  }, [verses])

  function goToNextChapter() {
    router.replace({
      pathname: "/reading/[book]/[chapter]",
      params: {
        book,
        chapter: chapter + 1
      }
    })
  }

  function goToPreviousChapter() {
    if (chapter <= 1) return

    router.replace({
      pathname: "/reading/[book]/[chapter]",
      params: {
        book,
        chapter: chapter - 1
      }
    })
  }

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, g) => Math.abs(g.dx) > 20,
      onPanResponderRelease: (_, g) => {
        if (g.dx > 80) goToPreviousChapter()
        if (g.dx < -80) goToNextChapter()
      }
    })
  ).current

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>

      <ReadingHeader
        book={bookName}
        chapter={chapter}
      />

      <View style={{ flex: 1 }} {...panResponder.panHandlers}>

        <ScrollView
          ref={scrollRef}
          style={styles.scroll}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >

          {verses.map((verse) => (

            <View
              key={verse.verseNumber}
              onLayout={(event) => {
                versePositions.current[verse.verseNumber] =
                  event.nativeEvent.layout.y
              }}
            >
              <VerseItem
                verseNumber={verse.verseNumber}
                text={verse.text}
                book={book}
                chapter={chapter}
                isSelected={selectedVerse === verse.verseNumber}
                onPress={() => setSelectedVerse(verse.verseNumber)}
                onClose={() => setSelectedVerse(null)}
              />
            </View>

          ))}

        </ScrollView>

      </View>

      <View style={styles.navigation}>

        <TouchableOpacity
          style={styles.navButton}
          onPress={goToPreviousChapter}
        >
          <Text style={styles.navText}>← Anterior</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButton}
          onPress={goToNextChapter}
        >
          <Text style={styles.navText}>Próximo →</Text>
        </TouchableOpacity>

      </View>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#fff"
  },

  scroll: {
    flex: 1
  },

  content: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 20
  },

  navigation: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff"
  },

  navButton: {
    paddingVertical: 6
  },

  navText: {
    fontSize: 16,
    fontWeight: "600"
  }

})