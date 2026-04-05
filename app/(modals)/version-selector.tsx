import React from "react"
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList
} from "react-native"

import { useRouter, useLocalSearchParams } from "expo-router"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { useSettings, BibleVersion } from "../../src/context/SettingsContext"

type Version = {
  key: BibleVersion
  label: string
}

const VERSIONS: Version[] = [
  { key: "acf", label: "Almeida Corrigida Fiel (ACF)" },
  { key: "nvi", label: "Nova Versão Internacional (NVI)" },
  { key: "kjf", label: "King James Fiel (KJF)" },
  { key: "nbv", label: "Nova Bíblia Viva (NBV)" }
]

export default function VersionSelector() {

  const router = useRouter()
  const params = useLocalSearchParams()
  const insets = useSafeAreaInsets()

  const { bibleVersion, setBibleVersion } = useSettings()

  // 🔥 detecta modo split
  const isSplitMode = params.mode === "split"

  function getParam(p: string | string[] | undefined) {
    if (Array.isArray(p)) return p[0]
    return p ?? ""
  }

  function goBack() {
    router.back()
  }

  function selectVersion(v: Version) {

    const book = getParam(params.book)
    const chapter = getParam(params.chapter)

    // 🔥 MODO SPLIT → define segunda versão e volta para leitura
    if (isSplitMode) {
      router.replace({
        pathname: "/reading/[book]/[chapter]",
        params: {
          book,
          chapter,
          secondVersion: v.key
        }
      })
      return
    }

    // 🔥 MODO NORMAL → troca versão principal
    setBibleVersion(v.key)

    router.replace({
      pathname: "/reading/[book]/[chapter]",
      params: {
        book,
        chapter
      }
    })
  }

  function renderItem({ item }: { item: Version }) {

    const isActive =
      !isSplitMode && item.key === bibleVersion

    return (
      <TouchableOpacity
        style={[
          styles.item,
          isActive && styles.activeItem
        ]}
        onPress={() => selectVersion(item)}
      >
        <Text style={styles.name}>{item.label}</Text>

        {isActive && (
          <Text style={styles.check}>✓</Text>
        )}
      </TouchableOpacity>
    )
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack}>
          <Text style={styles.back}>←</Text>
        </TouchableOpacity>

        <Text style={styles.title}>
          {isSplitMode ? "Escolher segunda versão" : "Versões"}
        </Text>

        <View style={{ width: 24 }} />
      </View>

      {/* LISTA */}
      <FlatList
        data={VERSIONS}
        keyExtractor={(item) => item.key}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 40 }}
      />

    </View>
  )
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#fff"
  },

  header: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee"
  },

  back: {
    fontSize: 20
  },

  title: {
    fontSize: 18,
    fontWeight: "600"
  },

  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0"
  },

  activeItem: {
    backgroundColor: "#f5f5f5"
  },

  name: {
    fontSize: 16,
    flex: 1,
    paddingRight: 10
  },

  check: {
    fontSize: 18,
    fontWeight: "700"
  }

})