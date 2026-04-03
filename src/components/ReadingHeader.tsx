import React from "react"
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform
} from "react-native"

import { useRouter } from "expo-router"
import { DrawerActions } from "@react-navigation/native"
import { useNavigation } from "@react-navigation/native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

type Props = {
  book: string
  chapter?: number
}

export default function ReadingHeader({ book, chapter }: Props) {

  const router = useRouter()
  const navigation = useNavigation()
  const insets = useSafeAreaInsets()

function handleBack() {
  if (navigation.canGoBack()) {
    router.back()
  } else {
    router.replace("/")
  }
}

  function openMenu() {
    navigation.dispatch(DrawerActions.openDrawer())
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>

      {/* ESQUERDA: MENU + VOLTAR */}
      <View style={styles.leftGroup}>

        <TouchableOpacity onPress={openMenu} style={styles.iconButton}>
          <Text style={styles.icon}>☰</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleBack} style={styles.iconButton}>
          <Text style={styles.icon}>←</Text>
        </TouchableOpacity>

      </View>

      {/* TÍTULO */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          {chapter ? `${book} ${chapter}` : book}
        </Text>
      </View>

      {/* ESPAÇO DIREITA */}
      <View style={styles.rightSpace} />

    </View>
  )
}

const styles = StyleSheet.create({

  container: {
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    height: 60 + (Platform.OS === "android" ? 0 : 0)
  },

  leftGroup: {
    flexDirection: "row",
    alignItems: "center",
    width: 80
  },

  iconButton: {
    marginRight: 10
  },

  icon: {
    fontSize: 22
  },

  titleContainer: {
    flex: 1,
    alignItems: "center"
  },

  title: {
    fontSize: 18,
    fontWeight: "600"
  },

  rightSpace: {
    width: 40
  }

})