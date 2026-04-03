import { View, TouchableOpacity, StyleSheet } from "react-native"

const COLORS = [
  "#FFF59D",
  "#FFCC80",
  "#EF9A9A",
  "#80DEEA",
  "#A5D6A7",
  "#CE93D8",
  "#B0BEC5"
]

type Props = {
  onSelectColor: (color: string) => void
}

export default function ColorPalette({ onSelectColor }: Props) {

  return (
    <View style={styles.container}>
      {COLORS.map((color) => (
        <TouchableOpacity
          key={color}
          style={[styles.color, { backgroundColor: color }]}
          onPress={() => onSelectColor(color)}
        />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({

  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#eee"
  },

  color: {
    width: 30,
    height: 30,
    borderRadius: 15
  }

})