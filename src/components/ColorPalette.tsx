import { View, TouchableOpacity, StyleSheet, Text } from "react-native"

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
  selectedColor: string | null
}

export default function ColorPalette({ onSelectColor, selectedColor }: Props) {

  return (
    <View style={styles.container}>

      {COLORS.map((color) => {

        const isActive = selectedColor === color

        return (
          <TouchableOpacity
            key={color}
            style={[
              styles.color,
              { backgroundColor: color },

              // 🔥 destaque mais forte quando ativo
              isActive && styles.activeColor
            ]}
            onPress={() => onSelectColor(color)}
            activeOpacity={0.7}
          >
            {/* 🔥 X aparece quando a cor está ativa */}
            {isActive && (
              <Text style={styles.x}>✕</Text>
            )}
          </TouchableOpacity>
        )
      })}

    </View>
  )
}

const styles = StyleSheet.create({

  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#eee"
  },

  color: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",

    // 🔥 leve sombra para parecer botão real
    elevation: 2
  },

  activeColor: {
    borderWidth: 2,
    borderColor: "#000",
    transform: [{ scale: 1.1 }] // 🔥 leve zoom ao selecionar
  },

  x: {
    color: "#000",
    fontSize: 14,
    fontWeight: "bold"
  }

})