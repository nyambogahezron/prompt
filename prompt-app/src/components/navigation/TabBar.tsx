import { Text, TouchableOpacity, StyleSheet } from 'react-native';
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
    index: (props) => (
      <AntDesign
        name='home'
        size={22}
        {...props}
      />
    ),
    explore: (props) => (
      <Feather
        name='compass'
        size={22}
        {...props}
      />
    ),
    create: (props) => (
      <AntDesign
        name='pluscircleo'
        size={22}
        {...props}
      />
    ),
    profile: (props) => (
      <AntDesign
        name='user'
        size={22}
        {...props}
      />
    ),
  };
  return (
    <ThemedView style={[styles.tabbar]}>
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key]; // info of current tab
        let label;
        if (options.tabBarLabel !== undefined) {
          label = options.tabBarLabel;
        } else if (options.title !== undefined) {
          label = options.title;
        } else {
          label = route.name;
        }

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
            style={styles.tabbarItem}
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
            <Text
              style={{
                color: isFocused
                  ? Colors.primaryColor
                  : Colors[colorScheme ?? 'light'].iconText,
                fontSize: 11,
              }}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  tabbar: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
    borderCurve: 'continuous',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
    shadowOpacity: 0.1,
  },
  tabbarItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
});
