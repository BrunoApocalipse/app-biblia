import AsyncStorage from "@react-native-async-storage/async-storage"

const STORAGE_KEY = "last_reading"

export type LastReading = {
  bookId: number
  chapter: number
  version: string
}

export async function saveLastReading(data: LastReading) {
  try {
    const json = JSON.stringify(data)
    await AsyncStorage.setItem(STORAGE_KEY, json)
  } catch (error) {
    console.log("Erro ao salvar última leitura:", error)
  }
}

export async function getLastReading(): Promise<LastReading | null> {
  try {
    const json = await AsyncStorage.getItem(STORAGE_KEY)

    if (!json) return null

    return JSON.parse(json)
  } catch (error) {
    console.log("Erro ao recuperar última leitura:", error)
    return null
  }
}

export async function clearLastReading() {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY)
  } catch (error) {
    console.log("Erro ao limpar última leitura:", error)
  }
}