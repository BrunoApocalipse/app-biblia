import { Stack } from "expo-router"
import { SettingsProvider } from "../src/context/SettingsContext"
import { BibleReaderProvider } from "../src/context/BibleReaderContext"

export default function RootLayout() {
  return (
    <SettingsProvider>
      <BibleReaderProvider>

        <Stack screenOptions={{ headerShown: false }}>

          {/* APP PRINCIPAL (com Drawer dentro) */}
          <Stack.Screen name="(drawer)" />

          {/* MODAIS */}
          <Stack.Screen
            name="(modals)/book-selector"
            options={{ presentation: "modal" }}
          />

          <Stack.Screen
            name="(modals)/version-selector"
            options={{ presentation: "modal" }}
          />

        </Stack>

      </BibleReaderProvider>
    </SettingsProvider>
  )
}