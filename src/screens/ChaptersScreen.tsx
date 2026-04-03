import { View, FlatList, StyleSheet, Pressable, Text } from "react-native"
import { router } from "expo-router"
import { useBibleReaderContext } from "../context/BibleReaderContext"
import ReadingHeader from "../components/ReadingHeader"

export default function ChaptersScreen() {

  const { selectedBook, selectChapter } = useBibleReaderContext()

  if (!selectedBook) {
    return <Text>Livro não selecionado</Text>
  }

  const book = selectedBook

  const chapters = Array.from(
    { length: book.chapters },
    (_, i) => i + 1
  )

  function openChapter(chapter: number) {

    selectChapter(chapter)

    router.push({
      pathname: "/(tabs)/verses/[book]/[chapter]",
      params: {
        book: String(book.id),
        chapter: String(chapter)
      }
    })

  }

  return (

    <View style={styles.container}>

      <ReadingHeader
       book={book.name}
       chapter={undefined as any}
      />

      <FlatList
        data={chapters}
        keyExtractor={(item) => String(item)}
        numColumns={4}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (

          <Pressable
            style={({ pressed }) => [
              styles.box,
              pressed && styles.pressed
            ]}
            onPress={() => openChapter(item)}
          >

            <Text style={styles.text}>
              {item}
            </Text>

          </Pressable>

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
  },

  box: {
    flex: 1,
    margin: 6,
    height: 60,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  },

  pressed: {
    backgroundColor: "#f0f0f0"
  },

  text: {
    fontSize: 18,
    fontWeight: "600"
  }

})