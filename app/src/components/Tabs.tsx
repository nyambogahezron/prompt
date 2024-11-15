import { Colors } from '@/constants/Colors';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type TabsProps = {
  onTabChange: (tab: string) => void;
};

export default function SectionTabs({ onTabChange }: TabsProps) {
  const [activeTab, setActiveTab] = useState('Profile');

  const handleTabPress = (tab: string) => {
    setActiveTab(tab);
    onTabChange(tab);
  };

  return (
    <View style={styles.container}>
      {['Blogs', 'Posts', 'Profile'].map((tab) => (
        <TouchableOpacity
          key={tab}
          style={[styles.tab, activeTab === tab && styles.activeTab]}
          onPress={() => handleTabPress(tab)}
        >
          <Text
            style={[styles.tabText, activeTab === tab && styles.activeTabText]}
          >
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  tab: {
    alignItems: 'center',
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    paddingVertical: 12,
  },
  tabText: {
    color: Colors.border,
  },
  activeTabText: {
    color: Colors.primaryColor,
    fontWeight: 'bold',
  },

  activeTab: {
    borderBottomColor: Colors.primaryColor,
  },
});
