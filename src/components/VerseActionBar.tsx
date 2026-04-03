import { View, StyleSheet, TouchableOpacity } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"

type Props = {
  onCopy: () => void
  onShare: () => void
  onOpenColors: () => void
  onClose: () => void
}

export default function VerseActionBar({
  onCopy,
  onShare,
  onOpenColors,
  onClose
}: Props) {

  return (
    <View style={styles.container}>

      <TouchableOpacity onPress={onCopy}>
        <MaterialIcons name="content-copy" size={26} color="#333" />
      </TouchableOpacity>

      <TouchableOpacity onPress={onShare}>
        <MaterialIcons name="share" size={26} color="#333" />
      </TouchableOpacity>

      <TouchableOpacity onPress={onOpenColors}>
        <MaterialIcons name="edit" size={26} color="#333" />
      </TouchableOpacity>

      <TouchableOpacity onPress={onClose}>
        <MaterialIcons name="close" size={26} color="#333" />
      </TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({

  container: {
    position: "absolute",
    bottom: 60, // acima da navegação
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#eee"
  }

})