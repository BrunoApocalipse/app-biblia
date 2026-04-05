import { Drawer } from "expo-router/drawer"

export default function DrawerLayout() {
  return (
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
  )
}