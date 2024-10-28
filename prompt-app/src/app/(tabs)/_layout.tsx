import React from 'react';
import { Tabs } from 'expo-router';
import TabBar from '@/components/navigation/TabBar';

export default function TabsLayout() {
  return (
    <Tabs tabBar={(props) => <TabBar {...props} />}>
      <Tabs.Screen
        name='index'
        options={{
          title: 'Home',
        }}
      />
      <Tabs.Screen
        name='explore'
        options={{
          title: 'Explore',
        }}
      />
      <Tabs.Screen
        name='create'
        options={{
          title: 'Create',
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{
          title: 'Profile',
        }}
      />
    </Tabs>
  );
}
