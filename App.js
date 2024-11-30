import React, { useEffect } from 'react';
import AppNavigator from './src/components/AppNavigator';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { AuthProvider } from './src/context/AuthContext'; // Import AuthProvider

export default function App() {
  //const [isLoggedIn, setIsLoggedIn] = useState(false); // Manage login state here
  const [fontsLoaded] = useFonts({
    SourGummyBoldItalic: require('./src/assets/fonts/SourGummyBoldItalic.ttf'),
    Pattaya: require('./src/assets/fonts/Pattaya-Regular.ttf'),
  });

  useEffect(() => {
    const prepare = async () => {
      await SplashScreen.preventAutoHideAsync();
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    };
    prepare();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}


