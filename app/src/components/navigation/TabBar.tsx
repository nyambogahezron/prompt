import {
  TouchableOpacity,
  StyleSheet,
  Platform,
  useWindowDimensions,
} from 'react-native';
import React from 'react';
import { AntDesign, Feather } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { Icons, TabBarProps } from '@/types/index';
import { useColorScheme } from '@/hooks/useColorScheme';
import ThemedView from '@/components/ui/View';
import { router } from 'expo-router';

export default function TabBar({
  state,
  descriptors,
  navigation,
}: TabBarProps) {
  const colorScheme = useColorScheme();
  const { width } = useWindowDimensions();
  const isWeb = Platform.OS === 'web';
  const isMobileView = isWeb && width < 600;

  const icons: Icons = {
    index: (props) => <AntDesign name='home' size={22} {...props} />,
    explore: (props) => <Feather name='compass' size={22} {...props} />,
    create: (props) => <AntDesign name='pluscircleo' size={22} {...props} />,
    bookmarks: (props) => <AntDesign name='staro' size={22} {...props} />,
    profile: (props) => <AntDesign name='user' size={22} {...props} />,
  };

  interface CustomLink {
    name: string;
    icon: (props: { color: string }) => JSX.Element;
    route: string;
  }

  const customLinks: CustomLink[] = [
    {
      name: 'settings',
      icon: (props) => <Feather name='settings' size={22} {...props} />,
      route: '/settings',
    },
    {
      name: 'logout',
      icon: (props) => <Feather name='log-out' size={22} {...props} />,
      route: '/logout',
    },
  ];

  return (
    <ThemedView style={isWeb && !isMobileView ? styles.webTabContainer : styles.tabContainer}>
      <ThemedView
        darkColor='#000'
        lightColor='#fff'
        style={isWeb && !isMobileView ? styles.webTabbar : styles.tabbar}
      >
        {state.routes.map((route: any, index: number) => {
          const { options } = descriptors[route.key];

          if (['_sitemap', '+not-found'].includes(route.name)) return null;

          const isFocused = state.index === index;

          const onPress = () => {
            if (route.name === 'create') {
              router.navigate('/create-prompt');
              return;
            }
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              key={route.name}
              style={isWeb && !isMobileView ? styles.webTabBarItem : styles.tabBarItem}
              accessibilityRole='button'
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
            >
              {icons[route.name]({
                color: isFocused
                  ? Colors[colorScheme ?? 'light'].tint
                  : Colors[colorScheme ?? 'light'].icon,
              })}
            </TouchableOpacity>
          );
        })}
        {isWeb && !isMobileView && (
          <ThemedView style={styles.customLinksContainer}>
            {customLinks.map((link) => (
              <TouchableOpacity
                key={link.name}
                style={styles.webTabBarItem}
                onPress={() => router.navigate(link.route as any)}
              >
                {link.icon({
                  color: Colors[colorScheme ?? 'light'].icon,
                })}
              </TouchableOpacity>
            ))}
          </ThemedView>
        )}
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    backgroundColor: Colors.black,
    width: '100%',
  },
  tabbar: {
    position: 'relative',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 0,
    paddingVertical: 15,
    borderCurve: 'continuous',
    maxWidth: 600,
    alignSelf: 'center',
    width: '100%',
  },
  tabBarItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  webTabContainer: {
    backgroundColor: Colors.black,
    height: '100%',
    width: 80,
    position: 'fixed',
    left: 0,
    top: 0,
  },
  webTabbar: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 20,
    height: '100%',
  },
  webTabBarItem: {
    width: '100%',
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  customLinksContainer: {
    marginTop: 'auto',
    paddingBottom: 20,
    backgroundColor: Colors.black,
  },
});
