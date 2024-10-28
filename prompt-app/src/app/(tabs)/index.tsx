import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { ThemedText } from '@/components/Themed/ThemedText';

export default function Home() {
  return (
    <View style={styles.container}>
      <ThemedText darkColor='red' lightColor='#fff'>
        Home
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
