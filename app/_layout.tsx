import { Stack } from "expo-router";
import './global.css'

const screenOptions = {
  headerShown: false,
  gestureEnabled: false,
  cardShadowEnabled: false
}

export default function RootLayout() {
  return <Stack screenOptions={screenOptions}>
    <Stack.Screen name="(tabs)" />
    <Stack.Screen name="movies/[id]" />
  </Stack>;
}
