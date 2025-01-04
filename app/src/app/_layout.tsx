import React from 'react';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import 'react-native-reanimated';
import GlobalProvider from '@/context/GlobalProvider';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { Platform, ActivityIndicator, View } from 'react-native';
import * as Font from 'expo-font';

SplashScreen.preventAutoHideAsync();

// SplashScreen.setOptions({
//   duration: 1000,
//   fade: true,
// });

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [appIsReady, setAppIsReady] = React.useState(false);

  React.useEffect(() => {
    async function prepare() {
      try {
        // Load fonts
        await Font.loadAsync({
          'space-mono': require('@assets/fonts/SpaceMono-Regular.ttf'),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = React.useCallback(async () => {
    if (appIsReady) {
      console.log('Hiding splash screen');
      await SplashScreen.hideAsync();
    }
  }, []);

  if (!appIsReady) {
    if (Platform.OS === 'web') {
      return (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <ActivityIndicator size='large' color={Colors.primaryColor} />
        </View>
      );
    }
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <GlobalProvider>
        <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
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
        </View>
      </GlobalProvider>
    </ThemeProvider>
  );
}
