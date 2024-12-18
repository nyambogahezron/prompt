import React from 'react';
import { Tabs } from 'expo-router';
import TabBar from '@/components/navigation/TabBar';
import { Colors } from '@/constants/Colors';
import { View } from 'react-native';

export default function TabsLayout() {
  return (
    <View style={{ flex: 1 }}>
      <Tabs tabBar={(props) => <TabBar {...props} />}>
        <Tabs.Screen
          name='index'
          options={{
            title: '',
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name='explore'
          options={{
            title: 'Explore',
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name='create'
          options={{
            title: 'Create',
          }}
        />
        <Tabs.Screen
          name='bookmarks'
          options={{
            title: 'Bookmarks',
            headerStyle: { backgroundColor: Colors.black },
          }}
        />
        <Tabs.Screen
          name='profile'
          options={{
            title: '',
            headerShown: false,
          }}
        />
      </Tabs>
    </View>
  );
}
