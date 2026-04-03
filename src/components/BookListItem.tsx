import { Pressable, Text, StyleSheet } from "react-native"
import { Book } from "../models/domain/Book"

type Props = {
  book: Book
  onPress: () => void
}

export default function BookListItem({ book, onPress }: Props) {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Text style={styles.text}>
        {book.name}
      </Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({

  container: {
    paddingVertical: 10,
    paddingHorizontal: 16
  },

  text: {
    fontSize: 18
  }

})