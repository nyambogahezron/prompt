import React from 'react';
import { Tabs } from 'expo-router';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TabBar from '@/components/navigation/TabBar';
import { Colors } from '@/constants/Colors';
import { Text, View, Platform } from 'react-native';

const Drawer = createDrawerNavigator();

export default function TabsLayout() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name='Home' options={{ headerShown: false }}>
        {() => (
          <View
            style={{
              flex: 1,
              flexDirection: Platform.OS === 'web' ? 'row' : 'column',
            }}
          >
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
          </View>
        )}
      </Drawer.Screen>
      <Drawer.Screen
        name='Settings'
        component={SettingsScreen}
        options={{ title: 'Settings' }}
      />
      <Drawer.Screen
        name='Help'
        component={HelpScreen}
        options={{ title: 'Help' }}
      />
    </Drawer.Navigator>
  );
}

function SettingsScreen() {
  return (
    <View>
      <Text>Settings</Text>
    </View>
  );
}

function HelpScreen() {
  return (
    <View>
      <Text>Help</Text>
    </View>
  );
}
