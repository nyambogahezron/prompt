import React from 'react';
import { Drawer } from 'expo-router/drawer';
import { useThemeStore } from '@/store/themeStore';
import { colors } from '@/constants/Colors';
import { Home, History, Bookmark, Settings, User } from 'lucide-react-native';
import 'react-native-gesture-handler';

export default function DrawerLayout() {
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';
  const colorScheme = isDark ? colors.dark : colors.light;

  return (
    <Drawer
      screenOptions={{
        headerStyle: {
          backgroundColor: colorScheme.cardBackground,
        },
        headerTintColor: colorScheme.primary,
        headerTitleStyle: {
          fontFamily: 'Inter-Medium',
        },
        drawerStyle: {
          backgroundColor: colorScheme.cardBackground,
          width: 240,
        },
        drawerActiveTintColor: colorScheme.primary,
        drawerInactiveTintColor: colorScheme.secondaryText,
        drawerLabelStyle: {
          fontFamily: 'Inter-Medium',
          marginLeft: -20,
        },
      }}
    >
      <Drawer.Screen
        name="index"
        options={{
          title: 'Home',
          drawerIcon: ({ color, size }) => <Home size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="history"
        options={{
          title: 'History',
          drawerIcon: ({ color, size }) => (
            <History size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="saved"
        options={{
          title: 'Saved',
          drawerIcon: ({ color, size }) => (
            <Bookmark size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="profile"
        options={{
          title: 'Profile',
          drawerIcon: ({ color, size }) => <User size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="settings"
        options={{
          title: 'Settings',
          drawerIcon: ({ color, size }) => (
            <Settings size={size} color={color} />
          ),
        }}
      />
    </Drawer>
  );
}
