import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from "react-native"
import { useEffect, useState } from "react"
import { router } from "expo-router"

import { HighlightService, Highlight } from "../../src/services/HighlightService"
import { BibleService } from "../../src/services/BibleService"

export default function FavoritesScreen() {

  const [highlights, setHighlights] = useState<Highlight[]>([])

  const highlightService = new HighlightService()
  const bibleService = new BibleService()

  useEffect(() => {
    loadHighlights()
  }, [])

  async function loadHighlights() {
    const data = await highlightService.getHighlights()
    setHighlights(data)
  }

  function openVerse(item: Highlight) {

    router.push({
      pathname: "/reading/[book]/[chapter]",
      params: {
        book: item.book,
        chapter: item.chapter,
        verse: item.verse
      }
    })

  }

  function removeHighlight(item: Highlight) {

    Alert.alert(
      "Remover destaque",
      "Deseja remover este destaque?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Remover",
          onPress: async () => {

            await highlightService.removeHighlight(
              item.book,
              item.chapter,
              item.verse
            )

            loadHighlights()
          }
        }
      ]
    )

  }

  function renderItem({ item }: { item: Highlight }) {

    const bookName = bibleService.getBookName(item.book)

    return (
      <TouchableOpacity
        style={[styles.item, { backgroundColor: item.color }]}
        onPress={() => openVerse(item)}
        onLongPress={() => removeHighlight(item)}
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

      {highlights.length === 0 && (
        <Text style={styles.empty}>
          Nenhum destaque
        </Text>
      )}

      <FlatList
        data={highlights}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />

    </View>

  )

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff"
  },

  item: {
    marginBottom: 16,
    padding: 12,
    borderRadius: 10
  },

  reference: {
    fontWeight: "bold",
    marginBottom: 4
  },

  text: {
    lineHeight: 24
  },

  empty: {
    textAlign: "center",
    marginTop: 40
  }

})