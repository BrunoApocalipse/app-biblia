import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from "react-native"

import { useEffect, useState } from "react"
import { HighlightService } from "../services/HighlightService"

type Props = {
  verseNumber: number
  text: string
  book: number
  chapter: number
  fontSize?: number
  isSelected: boolean
  onPress: () => void
  refreshKey?: number
}

export default function VerseItem({
  verseNumber,
  text,
  book,
  chapter,
  fontSize = 18,
  isSelected,
  onPress,
  refreshKey
}: Props) {

  const highlightService = new HighlightService()
  const [selectedColor, setSelectedColor] = useState<string | null>(null)

  useEffect(() => {
    loadHighlight()
  }, [refreshKey])

  async function loadHighlight() {
    const highlight = await highlightService.getHighlight(
      book,
      chapter,
      verseNumber
    )

    setSelectedColor(highlight?.color ?? null)
  }

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <View style={styles.wrapper}>

        {/* BASE */}
        <View
          style={[
            styles.container,
            selectedColor && { backgroundColor: selectedColor }
          ]}
        >
          <Text style={styles.number}>{verseNumber}</Text>
          <Text style={[styles.text, { fontSize }]}>{text}</Text>
        </View>

        {/* OVERLAY seleção */}
        {isSelected && (
          <View style={styles.overlay} />
        )}

      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({

  wrapper: {
    position: "relative",
    marginBottom: 10,
    borderRadius: 8,
    overflow: "hidden"
  },

  container: {
    flexDirection: "row",
    padding: 8,
    borderRadius: 8
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255,255,255,0.45)",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    borderRadius: 8
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