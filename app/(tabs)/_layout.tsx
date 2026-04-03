import { Stack } from "expo-router"

export default function TabsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="chapters/[book]" />
      <Stack.Screen name="verses/[book]/[chapter]" />
      <Stack.Screen name="reading/[book]/[chapter]" />
    </Stack>
  )
}