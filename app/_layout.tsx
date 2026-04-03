import { Drawer } from "expo-router/drawer"
import { SettingsProvider } from "../src/context/SettingsContext"
import { BibleReaderProvider } from "../src/context/BibleReaderContext"

export default function RootLayout() {
  return (
    <SettingsProvider>
      <BibleReaderProvider>
        <Drawer screenOptions={{ headerShown: false }}>
          <Drawer.Screen
            name="(tabs)"
            options={{
              title: "Bíblia",
              drawerLabel: "Bíblia"
            }}
          />

          <Drawer.Screen
            name="favorites"
            options={{
              title: "Favoritos",
              drawerLabel: "Favoritos"
            }}
          />

          <Drawer.Screen
            name="settings"
            options={{
              title: "Configurações",
              drawerLabel: "Configurações"
            }}
          />
        </Drawer>
      </BibleReaderProvider>
    </SettingsProvider>
  )
}