import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import GlobalProvider from '@/context/GlobalProvider';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { Platform } from 'react-native';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('@assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <GlobalProvider>
        <Stack initialRouteName='(tabs)'>
          <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
          <Stack.Screen name='(auth)' options={{ headerShown: false }} />
          <Stack.Screen
            name='create-prompt'
            options={{
              headerShown: true,
              title: Platform.OS === 'web' ? '' : 'Create Prompt',
              presentation: 'modal',
              headerStyle: {
                backgroundColor: Colors.black,
              },
              headerShadowVisible: false,
              contentStyle: {
                width: '100%',
                backgroundColor: Colors.black,
              },
            }}
          />
          <Stack.Screen name='+not-found' />
        </Stack>
      </GlobalProvider>
    </ThemeProvider>
  );
}
