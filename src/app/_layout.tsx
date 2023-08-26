import React from 'react'
import { Stack } from 'expo-router'
import { stackHeaderStyles } from '../styles/headerBar'
import { NativeBaseProvider } from 'native-base'
import { theme } from '../styles/theme'
import AuthProvider from '../context/AuthProvider'
import { useFonts } from 'expo-font'

const HomeStack = () => {
  const [fontsLoaded] = useFonts({
    "Inter-Thin": require("../assets/fonts/Inter-Thin.otf"),
    "Inter-ExtraLight": require("../assets/fonts/Inter-ExtraLight.otf"),
    "Inter-Light": require("../assets/fonts/Inter-Light.otf"),
    "Inter-Regular": require("../assets/fonts/Inter-Regular.otf"),
    "Inter-Medium": require("../assets/fonts/Inter-Medium.otf"),
    "Inter-SemiBold": require("../assets/fonts/Inter-SemiBold.otf"),
    "Inter-Bold": require("../assets/fonts/Inter-Bold.otf"),
    "Inter-ExtraBold": require("../assets/fonts/Inter-ExtraBold.otf"),
    "Inter-Black": require("../assets/fonts/Inter-Black.otf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NativeBaseProvider theme={theme}>
      <AuthProvider>
        <Stack screenOptions={stackHeaderStyles}>
          <Stack.Screen name="(home)" options={{ headerShown: false }} />
          <Stack.Screen name="products" options={{ headerShown: false }} />
        </Stack>
      </AuthProvider>
    </NativeBaseProvider>

  )
}

export default HomeStack