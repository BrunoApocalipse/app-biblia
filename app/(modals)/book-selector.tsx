import React, { useMemo, useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput
} from "react-native"

import { useRouter } from "expo-router"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import acf from "@/assets/bibles/acf.json"

type Book = {
  name: string
  abbrev: string
  chapters: number[]
}

export default function BookSelector() {

  const router = useRouter()
  const insets = useSafeAreaInsets()

  const [search, setSearch] = useState("")

  const books: Book[] = useMemo(() => {
    return (acf as any).books || []
  }, [])

  const filteredBooks = useMemo(() => {
    if (!search) return books

    return books.filter((b) =>
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.abbrev.toLowerCase().includes(search.toLowerCase())
    )
  }, [search, books])

  function goBack() {
    router.back()
  }

  function selectBook(book: Book) {
  router.replace({
    pathname: "/chapters/[book]",
    params: { book: book.abbrev }
  })
}

  function renderItem({ item }: { item: Book }) {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => selectBook(item)}
      >
        <Text style={styles.abbrev}>{item.abbrev.toUpperCase()}</Text>
        <Text style={styles.name}>{item.name}</Text>
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

        <Text style={styles.title}>Índice</Text>

        <View style={{ width: 24 }} />
      </View>

      {/* BUSCA */}
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Buscar livro..."
          value={search}
          onChangeText={setSearch}
          style={styles.input}
        />
      </View>

      {/* LISTA */}
      <FlatList
        data={filteredBooks}
        keyExtractor={(item) => item.abbrev}
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

  searchContainer: {
    padding: 12
  },

  input: {
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40
  },

  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0"
  },

  abbrev: {
    width: 50,
    fontWeight: "700"
  },

  name: {
    fontSize: 16
  }

})