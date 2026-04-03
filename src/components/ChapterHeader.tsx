import { View, Text, StyleSheet } from "react-native"

type Props = {
  bookName: string
  chapter: number
}

export default function ChapterHeader({ bookName, chapter }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {bookName} {chapter}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: "#ddd"
  },
  title: {
    fontSize: 20,
    fontWeight: "bold"
  }
})