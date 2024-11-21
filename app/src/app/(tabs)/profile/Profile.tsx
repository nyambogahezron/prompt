import { View, ScrollView, StyleSheet, Platform } from 'react-native';
import React from 'react';
import { UserProfile } from '@/components/UserProfile';

const isWeb = Platform.OS === 'web';

export default function Profile() {
  return (
    <View style={styles.container}>
      <ScrollView>
        <UserProfile />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    width: '100%',
    maxWidth: isWeb ? 600 : '100%',
  },
});
