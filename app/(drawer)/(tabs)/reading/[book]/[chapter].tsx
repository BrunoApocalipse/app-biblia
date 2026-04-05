import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  PanResponder,
  Share
} from "react-native"

import { SafeAreaView } from "react-native-safe-area-context"
import { useLocalSearchParams, router } from "expo-router"
import { useEffect, useState, useRef } from "react"

import ReadingHeader from "../../../../../src/components/ReadingHeader"
import VerseItem from "../../../../../src/components/VerseItem"
import ColorPalette from "../../../../../src/components/ColorPalette"
import VerseActionBar from "../../../../../src/components/VerseActionBar"

import { BibleService } from "../../../../../src/services/BibleService"
import { HighlightService } from "../../../../../src/services/HighlightService"
import { useSettings, BibleVersion } from "../../../../../src/context/SettingsContext"
import { useLastReading } from "../../../../../src/hooks/useLastReading"

import * as Clipboard from "expo-clipboard"

export default function ReadingPage() {

  const params = useLocalSearchParams()

  function getParam(p: string | string[] | undefined) {
    if (Array.isArray(p)) return p[0]
    return p ?? ""
  }

  const book = Number(getParam(params.book))
  const chapter = Number(getParam(params.chapter))
  const verseParam = params.verse ? Number(getParam(params.verse)) : null

  const { bibleVersion } = useSettings()
  const { saveLastReading } = useLastReading()

  const [verses, setVerses] = useState<any[]>([])
  const [verses2, setVerses2] = useState<any[]>([])

  const [selectedVerses, setSelectedVerses] = useState<number[]>([])
  const [activeColor, setActiveColor] = useState<string | null>(null)

  const [refreshKey, setRefreshKey] = useState(0)

  const [isSplit, setIsSplit] = useState(false)
  const [secondVersion, setSecondVersion] = useState<BibleVersion>("nvi")

  const scrollRef = useRef<ScrollView>(null)
  const scrollTopRef = useRef<ScrollView>(null)
  const scrollBottomRef = useRef<ScrollView>(null)

  const versePositions = useRef<{ [key: number]: number }>({})
  const isSyncing = useRef(false)

  const bibleService = new BibleService()
  const highlightService = new HighlightService()

  const bookName = bibleService.getBookName(book, bibleVersion)

  // 🔥 recebe versão do split corretamente tipada
  useEffect(() => {
    if (params.secondVersion) {
      const v = getParam(params.secondVersion) as BibleVersion
      setSecondVersion(v)
      setIsSplit(true)
    }
  }, [params.secondVersion])

  useEffect(() => {

    const data = bibleService.getVerses(book, chapter, bibleVersion)
    setVerses(data)

    if (isSplit) {
      const data2 = bibleService.getVerses(book, chapter, secondVersion)
      setVerses2(data2)
    } else {
      setVerses2([])
    }

    saveLastReading(book, chapter, bibleVersion)

  }, [book, chapter, bibleVersion, isSplit, secondVersion])

  function handleToggleSplit() {
    if (!isSplit) {
      router.push(`/version-selector?mode=split&book=${book}&chapter=${chapter}`)
    } else {
      setIsSplit(false)
    }
  }

  useEffect(() => {

    if (!verseParam || isSplit) return

    setTimeout(() => {
      const y = versePositions.current[verseParam]
      if (y !== undefined) {
        scrollRef.current?.scrollTo({ y, animated: true })
      }
    }, 300)

  }, [verses])

  function syncScroll(y: number, source: "top" | "bottom") {

    if (isSyncing.current) return

    isSyncing.current = true

    if (source === "top") {
      scrollBottomRef.current?.scrollTo({ y, animated: false })
    } else {
      scrollTopRef.current?.scrollTo({ y, animated: false })
    }

    setTimeout(() => {
      isSyncing.current = false
    }, 40)
  }

  useEffect(() => {
    updateActiveColor()
  }, [selectedVerses, refreshKey])

  async function updateActiveColor() {

    if (selectedVerses.length === 0) {
      setActiveColor(null)
      return
    }

    const highlights = await Promise.all(
      selectedVerses.map(v =>
        highlightService.getHighlight(book, chapter, v)
      )
    )

    const firstColor = highlights[0]?.color ?? null

    const allSame = highlights.every(
      h => (h?.color ?? null) === firstColor
    )

    setActiveColor(allSame ? firstColor : null)
  }

  function toggleVerse(verseNumber: number) {
    setSelectedVerses(prev =>
      prev.includes(verseNumber)
        ? prev.filter(v => v !== verseNumber)
        : [...prev, verseNumber]
    )
  }

  function clearSelection() {
    setSelectedVerses([])
  }

  async function applyColorToSelected(color: string) {

    for (const v of selectedVerses) {

      const existing = await highlightService.getHighlight(book, chapter, v)

      if (existing?.color === color) {
        await highlightService.removeHighlight(book, chapter, v)
      } else {
        await highlightService.setHighlight({
          book,
          chapter,
          verse: v,
          color
        })
      }
    }

    setRefreshKey(prev => prev + 1)
  }

  function getSelectedText() {
    return selectedVerses
      .map(v => {
        const verse = verses.find(x => x.verseNumber === v)
        return `${bookName} ${chapter}:${v} ${verse?.text}`
      })
      .join("\n")
  }

  async function copySelected() {
    await Clipboard.setStringAsync(getSelectedText())
  }

  async function shareSelected() {
    await Share.share({ message: getSelectedText() })
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

  function goToNextChapter() {
    router.replace({
      pathname: "/reading/[book]/[chapter]",
      params: { book, chapter: chapter + 1 }
    })
  }

  function goToPreviousChapter() {
    if (chapter <= 1) return
    router.replace({
      pathname: "/reading/[book]/[chapter]",
      params: { book, chapter: chapter - 1 }
    })
  }

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>

      <ReadingHeader
        book={bookName}
        chapter={chapter}
        version={bibleVersion.toUpperCase()}
        onToggleSplit={handleToggleSplit}
      />

      <View style={{ flex: 1 }} {...panResponder.panHandlers}>

        {isSplit ? (
          <>
            <ScrollView
              ref={scrollTopRef}
              style={{ flex: 1 }}
              onScroll={(e) => syncScroll(e.nativeEvent.contentOffset.y, "top")}
              scrollEventThrottle={16}
            >
              <View style={styles.content}>
                {verses.map(v => (
                  <VerseItem
                    key={`v1-${v.verseNumber}-${refreshKey}`}
                    {...v}
                    book={book}
                    chapter={chapter}
                    isSelected={selectedVerses.includes(v.verseNumber)}
                    onPress={() => toggleVerse(v.verseNumber)}
                    refreshKey={refreshKey}
                  />
                ))}
              </View>
            </ScrollView>

            <View style={styles.splitDivider}>
              <TouchableOpacity
                style={styles.closeSplit}
                onPress={() => setIsSplit(false)}
              >
                <Text style={{ color: "#fff" }}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView
              ref={scrollBottomRef}
              style={{ flex: 1 }}
              onScroll={(e) => syncScroll(e.nativeEvent.contentOffset.y, "bottom")}
              scrollEventThrottle={16}
            >
              <View style={styles.content}>
                {verses2.map(v => (
                  <VerseItem
                    key={`v2-${v.verseNumber}-${refreshKey}`}
                    {...v}
                    book={book}
                    chapter={chapter}
                    isSelected={selectedVerses.includes(v.verseNumber)}
                    onPress={() => toggleVerse(v.verseNumber)}
                    refreshKey={refreshKey}
                  />
                ))}
              </View>
            </ScrollView>
          </>
        ) : (
          <ScrollView
            ref={scrollRef}
            style={styles.scroll}
            contentContainerStyle={styles.content}
          >
            {verses.map(v => (
              <View
                key={`${v.verseNumber}-${refreshKey}`}
                onLayout={(e) => {
                  versePositions.current[v.verseNumber] =
                    e.nativeEvent.layout.y
                }}
              >
                <VerseItem
                  {...v}
                  book={book}
                  chapter={chapter}
                  isSelected={selectedVerses.includes(v.verseNumber)}
                  onPress={() => toggleVerse(v.verseNumber)}
                  refreshKey={refreshKey}
                />
              </View>
            ))}
          </ScrollView>
        )}

      </View>

      {selectedVerses.length > 0 && (
        <View style={styles.toolbar}>
          <ColorPalette
            onSelectColor={applyColorToSelected}
            selectedColor={activeColor}
          />
          <VerseActionBar
            onCopy={copySelected}
            onShare={shareSelected}
            onOpenColors={() => {}}
            onClose={clearSelection}
          />
        </View>
      )}

      <View style={styles.navigation}>
        <TouchableOpacity onPress={goToPreviousChapter}>
          <Text style={styles.navText}>← Anterior</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={goToNextChapter}>
          <Text style={styles.navText}>Próximo →</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  scroll: { flex: 1 },
  content: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 20
  },
  toolbar: {
    borderTopWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff"
  },
  splitDivider: {
    height: 4,
    backgroundColor: "#999",
    justifyContent: "center"
  },
  closeSplit: {
    position: "absolute",
    right: 10,
    top: -14,
    backgroundColor: "#333",
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center"
  },
  navigation: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    borderTopWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff"
  },
  navText: {
    fontSize: 16,
    fontWeight: "600"
  }
})