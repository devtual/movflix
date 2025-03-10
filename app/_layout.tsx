import { Stack } from "expo-router";
import './global.css'

const screenOptions = {
  headerShown: false,
  gestureEnabled: false,
  cardShadowEnabled: false,
  cardStyleInterpolator: ({ current, next, inverted, layouts: { screen }, closing }: any) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [screen.width, 0],
            }),
          },
          {
            translateX: next ? next.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [0, -screen.width],
            }) : 1,
          },
        ],
      },
    };
  }
}

export default function RootLayout() {
  return <Stack screenOptions={screenOptions}>
    <Stack.Screen name="(tabs)" />
    <Stack.Screen name="movies/[id]" />
  </Stack>;
}
