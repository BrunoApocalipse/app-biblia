import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native"
import { useState, useCallback } from "react"
import { router, useFocusEffect } from "expo-router"

import { HighlightService, Highlight } from "../../src/services/HighlightService"
import { BibleService } from "../../src/services/BibleService"
import { useSettings } from "../../src/context/SettingsContext"

export default function FavoritesScreen() {

  const [highlights, setHighlights] = useState<Highlight[]>([])

  const highlightService = new HighlightService()
  const bibleService = new BibleService()

  const { bibleVersion } = useSettings()

  useFocusEffect(
    useCallback(() => {
      loadHighlights()
    }, [])
  )

  async function loadHighlights() {
    const data = await highlightService.getHighlights()
    setHighlights(data)
  }

  function openHighlight(item: Highlight) {

    router.push({
      pathname: "/reading/[book]/[chapter]",
      params: {
        book: item.book,
        chapter: item.chapter,
        verse: item.verse
      }
    })

  }

  function renderItem({ item }: { item: Highlight }) {

    const bookName = bibleService.getBookName(item.book, bibleVersion)

    return (
      <TouchableOpacity
        style={[styles.item, { backgroundColor: item.color }]}
        onPress={() => openHighlight(item)}
      >
        <Text style={styles.reference}>
          {bookName} {item.chapter}:{item.verse}
        </Text>

        <Text style={styles.text}>
          Versículo destacado
        </Text>
      </TouchableOpacity>
    )
  }

  return (

    <View style={styles.container}>

      {highlights.length === 0 ? (
        <Text style={styles.empty}>
          Nenhum destaque ainda
        </Text>
      ) : (
        <FlatList
          data={highlights}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      )}

    </View>

  )
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#fff"
  },

  list: {
    padding: 16
  },

  item: {
    marginBottom: 16,
    padding: 12,
    borderRadius: 10
  },

  reference: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
    color: "#333"
  },

  text: {
    fontSize: 16,
    color: "#222"
  },

  empty: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
    color: "#666"
  }

})