import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet
} from "react-native"

import { SafeAreaView } from "react-native-safe-area-context"
import { router } from "expo-router"

import BookListItem from "../components/BookListItem"
import { useBibleReaderContext } from "../context/BibleReaderContext"
import { useLastReading } from "../hooks/useLastReading"

export default function HomeScreen() {

  const { books, selectBook } = useBibleReaderContext()
  const { bookId, chapter } = useLastReading()

  function handleSelectBook(book: any) {

    selectBook(book)

    router.push({
      pathname: "/chapters/[book]",
      params: { book: book.id }
    })
  }

  function handleContinueReading() {

    if (!bookId || !chapter) return

    router.push({
      pathname: "/reading/[book]/[chapter]",
      params: {
        book: bookId,
        chapter: chapter
      }
    })
  }

  const lastBook = books.find((b: any) => b.id === bookId)

  return (

    <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>

      <View style={{ flex: 1 }}>

        {lastBook && chapter && (
          <TouchableOpacity
            style={styles.continueButton}
            onPress={handleContinueReading}
          >
            <Text style={styles.continueTitle}>
              Continuar leitura
            </Text>

            <Text style={styles.continueText}>
              {lastBook.name} {chapter}
            </Text>
          </TouchableOpacity>
        )}

        <FlatList
          data={books}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <BookListItem
              book={item}
              onPress={() => handleSelectBook(item)}
            />
          )}
          contentContainerStyle={{ paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
        />

      </View>

    </SafeAreaView>

  )
}

const styles = StyleSheet.create({

  continueButton: {
    padding: 18,
    backgroundColor: "#f1f1f1",
    borderBottomWidth: 1,
    borderColor: "#ddd"
  },

  continueTitle: {
    fontSize: 14,
    color: "#666"
  },

  continueText: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 4
  }

})