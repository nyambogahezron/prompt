import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import Blogs from './Blogs';
import Posts from './Posts';
import Treading from './Treading';
import { Colors } from '@/constants/Colors';
import { View, Text } from 'react-native';

const TopTab = createMaterialTopTabNavigator();

export default function TopTabLayout() {
  return (
    <TopTab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: Colors.black },
        tabBarActiveTintColor: Colors.primaryColor,
        tabBarLabelStyle: { color: Colors.white },
        tabBarIndicatorStyle: { backgroundColor: Colors.primaryColor },
      }}
    >
      <TopTab.Screen name='Blogs' component={Blogs} />
      <TopTab.Screen name='Posts' component={Posts} />
      <TopTab.Screen
        name='Trending'
        component={Treading}
        options={{
          tabBarLabel: ({ focused, color }) => {
            return (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <MaterialIcons name='whatshot' color={color} size={16} />

                <Text style={{ color: Colors.white, marginLeft: 4 }}>
                  Trending
                </Text>
              </View>
            );
          },
          tabBarIcon: () => <></>,
        }}
      />
    </TopTab.Navigator>
  );
}
