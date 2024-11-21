import { View } from 'react-native';
import React from 'react';
import { ThemedText } from '@/components/Themed/ThemedText';

export default function Blogs() {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignContent: 'center',
        alignSelf: 'center',
      }}
    >
      <ThemedText>Blogs</ThemedText>
    </View>
  );
}
