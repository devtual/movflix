import { SplashScreen, Stack } from "expo-router";
import './global.css'
import { Easing } from "react-native-reanimated";
import { useStartup } from "@/hooks/useStartup";
import { useEffect } from "react";

const screenOptions:any = {
  headerShown: false,
  gestureEnabled: false,
  gestureDirection: 'horizontal',
  transitionSpec: {
    open: {
      animation: 'timing',
      config: {
        duration: 300,
        easing: Easing.inOut(Easing.ease),
      },
    },
    close: {
      animation: 'timing',
      config: {
        duration: 300,
        easing: Easing.inOut(Easing.ease),
      },
    },
  },
  cardStyleInterpolator: ({ current, next, layouts }: any) => ({
    cardStyle: {
      transform: [
        {
          translateX: current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [layouts.screen.width + 100, 0],
          }),
        },
        {
          translateX: next ? next.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -100],
          }) : 0,
        },
      ],
    },
  }),
}

export default function RootLayout() {
  const [loaded] = useStartup();

  useEffect(() => {
      if (loaded) {
        SplashScreen.hideAsync();
      }
  }, [loaded]);
  
  if (!loaded) {
    return null;
  }

  return <Stack screenOptions={screenOptions}>
    <Stack.Screen name="(tabs)" />
    <Stack.Screen name="movies/[id]" />
  </Stack>
}
