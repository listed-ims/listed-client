import React, { useEffect } from 'react'
import { SplashScreen, Stack } from 'expo-router'
import { NativeBaseProvider } from 'native-base'
import { useFonts } from 'expo-font'
import { theme } from '@listed-styles';
import { AuthProvider } from '@listed-contexts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
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

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const queryClient = new QueryClient();

  return (
    <NativeBaseProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Stack screenOptions={{ animation: "slide_from_right" }} />
        </AuthProvider>
      </QueryClientProvider>
    </NativeBaseProvider>

  )
}

export default RootLayout