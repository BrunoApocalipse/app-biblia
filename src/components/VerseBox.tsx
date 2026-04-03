import { Pressable, Text, StyleSheet } from "react-native"

type Props = {
  verse: number
  onPress: () => void
}

export default function VerseBox({ verse, onPress }: Props) {

  return (

    <Pressable
      style={({ pressed }) => [
        styles.box,
        pressed && styles.pressed
      ]}
      onPress={onPress}
    >

      <Text style={styles.text}>
        {verse}
      </Text>

    </Pressable>

  )

}

const styles = StyleSheet.create({

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