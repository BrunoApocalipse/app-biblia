import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Share
} from "react-native"

import * as Clipboard from "expo-clipboard"
import { useEffect, useState } from "react"

import { BibleService } from "../services/BibleService"
import { HighlightService } from "../services/HighlightService"
import { useSettings } from "../context/SettingsContext"

import VerseActionBar from "./VerseActionBar"
import ColorPalette from "./ColorPalette"

type Props = {
  verseNumber: number
  text: string
  book: number
  chapter: number
  fontSize?: number
  isSelected: boolean
  onPress: () => void
  onClose: () => void
}

export default function VerseItem({
  verseNumber,
  text,
  book,
  chapter,
  fontSize = 18,
  isSelected,
  onPress,
  onClose
}: Props) {

  const bibleService = new BibleService()
  const highlightService = new HighlightService()
  const { bibleVersion } = useSettings()

  const [selectedColor, setSelectedColor] = useState<string | null>(null)

  useEffect(() => {
    loadHighlight()
  }, [])

  async function loadHighlight() {
    const highlight = await highlightService.getHighlight(
      book,
      chapter,
      verseNumber
    )

    if (highlight) {
      setSelectedColor(highlight.color)
    }
  }

  function getVerseText() {
    const bookName = bibleService.getBookName(book, bibleVersion)
    return `${bookName} ${chapter}:${verseNumber}\n${text}`
  }

  async function copyVerse() {
    await Clipboard.setStringAsync(getVerseText())
    onClose()
  }

  async function shareVerse() {
    await Share.share({ message: getVerseText() })
    onClose()
  }

  async function applyColor(color: string) {
    setSelectedColor(color)

    await highlightService.setHighlight({
      book,
      chapter,
      verse: verseNumber,
      color
    })
  }

  return (
    <View>

      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        <View
          style={[
            styles.container,
            isSelected && styles.highlight,
            selectedColor && { backgroundColor: selectedColor }
          ]}
        >
          <Text style={styles.number}>{verseNumber}</Text>
          <Text style={[styles.text, { fontSize }]}>{text}</Text>
        </View>
      </TouchableOpacity>

      {isSelected && (
        <>
          <ColorPalette onSelectColor={applyColor} />

          <VerseActionBar
            onCopy={copyVerse}
            onShare={shareVerse}
            onOpenColors={() => {}}
            onClose={onClose}
          />
        </>
      )}

    </View>
  )
}

const styles = StyleSheet.create({

  container: {
    flexDirection: "row",
    marginBottom: 10,
    padding: 6,
    borderRadius: 6
  },

  highlight: {
    borderWidth: 1,
    borderColor: "#ccc"
  },

  number: {
    fontSize: 12,
    marginRight: 6,
    color: "#666"
  },

  text: {
    flex: 1,
    lineHeight: 28,
    color: "#222"
  }

})