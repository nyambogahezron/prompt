import { View } from 'react-native';
import React from 'react';
import ThemedText from '@/components/ui/Text';


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
