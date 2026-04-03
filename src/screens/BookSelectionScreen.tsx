import { View, FlatList } from "react-native"
import { useRouter } from "expo-router"
import BookListItem from "../components/BookListItem"
import { useBibleReader } from "../hooks/useBibleReader"
import { Book } from "../models/domain/Book"

export default function BookSelectionScreen() {

  const router = useRouter()
  const { books, selectBook } = useBibleReader()

  const handleBookPress = (book: Book) => {
    selectBook(book)

    router.push({
      pathname: "/chapters/[book]",
      params: { book: book.id }
    })
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={books}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
<BookListItem
  book={item}
  onPress={() => handleBookPress(item)}
/>
        )}
      />
    </View>
  )
}