import { TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { AntDesign, Feather } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { Icons, TabBarProps } from '@/types/index';
import { useColorScheme } from '@/hooks/useColorScheme';
import { ThemedView } from '../Themed/ThemedView';

export default function TabBar({
  state,
  descriptors,
  navigation,
}: TabBarProps) {
  const colorScheme = useColorScheme();

  const icons: Icons = {
    index: (props) => <AntDesign name='home' size={22} {...props} />,
    explore: (props) => <Feather name='compass' size={22} {...props} />,
    create: (props) => <AntDesign name='pluscircleo' size={22} {...props} />,
    bookmarks: (props) => <AntDesign name='staro' size={22} {...props} />,
    profile: (props) => <AntDesign name='user' size={22} {...props} />,
  };
  return (
    <ThemedView style={styles.tabContainer}>
      <ThemedView darkColor='#000' lightColor='#fff' style={styles.tabbar}>
        {state.routes.map((route: any, index: number) => {
          const { options } = descriptors[route.key];

          if (['_sitemap', '+not-found'].includes(route.name)) return null;

          const isFocused = state.index === index;

          const onPress = () => {
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
              style={styles.tabBarItem}
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
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    backgroundColor: '#000000',
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    borderCurve: 'continuous',
  },
  tabbar: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 0,
    paddingVertical: 15,
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    borderCurve: 'continuous',
  },
  tabBarItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
});
