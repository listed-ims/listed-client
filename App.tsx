import { NativeBaseProvider } from 'native-base';
import { useFonts } from "expo-font";
import { theme } from './src/styles/Theme';
import { NavigationContainer } from '@react-navigation/native';
import HomeNavigation from './src/navigation/HomeNavigation';
import AuthProvider from './src/context/AuthProvider';


export default function App() {
  const [fontsLoaded] = useFonts({
    "Inter-Thin": require("./src/assets/fonts/Inter-Thin.otf"),
    "Inter-ExtraLight": require("./src/assets/fonts/Inter-ExtraLight.otf"),
    "Inter-Light": require("./src/assets/fonts/Inter-Light.otf"),
    "Inter-Regular": require("./src/assets/fonts/Inter-Regular.otf"),
    "Inter-Medium": require("./src/assets/fonts/Inter-Medium.otf"),
    "Inter-SemiBold": require("./src/assets/fonts/Inter-SemiBold.otf"),
    "Inter-Bold": require("./src/assets/fonts/Inter-Bold.otf"),
    "Inter-ExtraBold": require("./src/assets/fonts/Inter-ExtraBold.otf"),
    "Inter-Black": require("./src/assets/fonts/Inter-Black.otf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NativeBaseProvider theme={theme}>
      <AuthProvider>
        <NavigationContainer>
          <HomeNavigation />
        </NavigationContainer>
      </AuthProvider>
    </NativeBaseProvider>
  )
}
