import React from "react"
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from "react-native"

import { useRouter } from "expo-router"
import { DrawerActions, useNavigation } from "@react-navigation/native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

type Props = {
  book: string
  chapter?: number
  version?: string
  onToggleSplit?: () => void
}

export default function ReadingHeader({
  book,
  chapter,
  version = "ACF",
  onToggleSplit
}: Props) {

  const router = useRouter()
  const navigation = useNavigation()
  const insets = useSafeAreaInsets()

  function openMenu() {
    navigation.dispatch(DrawerActions.openDrawer())
  }

  function goBack() {
    if (navigation.canGoBack()) {
      router.back()
    } else {
      router.replace("/")
    }
  }

  function openBookSelector() {
  router.push("/book-selector")
}

function openVersionSelector() {
  router.push("/version-selector")
}

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>

      {/* ESQUERDA */}
      <View style={styles.left}>
        <TouchableOpacity onPress={openMenu}>
          <Text style={styles.icon}>☰</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={goBack}>
          <Text style={styles.icon}>←</Text>
        </TouchableOpacity>
      </View>

      {/* CENTRO */}
      <TouchableOpacity onPress={openBookSelector} style={styles.center}>
        <View style={styles.titleWrapper}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={styles.title}
          >
            {book}
          </Text>

          {chapter && (
            <Text style={styles.chapter}>
              {" "}{chapter}
            </Text>
          )}
        </View>

        <Text style={styles.arrow}>▼</Text>
      </TouchableOpacity>

      {/* VERSÃO */}
      <TouchableOpacity onPress={openVersionSelector} style={styles.versionBox}>
        <Text style={styles.version}>
          {version} ▼
        </Text>
      </TouchableOpacity>

      {/* DIREITA */}
      <View style={styles.right}>

        <TouchableOpacity>
          <Text style={styles.smallIcon}>🔉</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.smallIcon}>Tt</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onToggleSplit}>
          <Text style={[
            styles.smallIcon,
            { opacity: onToggleSplit ? 1 : 0.4 }
          ]}>
            ⧉
          </Text>
        </TouchableOpacity>

      </View>

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
    paddingHorizontal: 8,
    paddingBottom: 6
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  },

  icon: {
    fontSize: 20
  },

  center: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 8,
    marginRight: 6,
    maxWidth: "45%"
  },

  titleWrapper: {
    flexDirection: "row",
    alignItems: "center",
    flexShrink: 1
  },

  title: {
    fontSize: 15,
    fontWeight: "600",
    maxWidth: "80%"
  },

  chapter: {
    fontSize: 15,
    fontWeight: "600"
  },

  versionBox: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 6
  },

  version: {
    fontSize: 13,
    fontWeight: "500"
  },

  arrow: {
    fontSize: 9,
    marginLeft: 2
  },

  right: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },

  smallIcon: {
    fontSize: 14
  }

})