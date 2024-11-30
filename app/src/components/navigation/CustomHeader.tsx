import React from 'react';
import { View, Text, StyleSheet, Dimensions, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';
const width = Dimensions.get('window').width;

export default function CustomHeader() {
  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <View style={styles.rightIcons}>
          <Pressable onPress={() => router.navigate('/(tabs)/profile/Profile')}>
            <MaterialCommunityIcons
              name='fire'
              size={28}
              color={Colors.primaryColor}
              style={styles.iconSpacing}
            />
          </Pressable>
          <Pressable
            onPress={() => router.navigate('/(tabs)/profile/Profile')}
            style={styles.profileCircle}
          >
            <Text style={styles.profileText}>H</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
    width: width,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 10,
    backgroundColor: Colors.black,
  },
  logoSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 24,
    height: 24,
    marginLeft: 10,
    borderRadius: 10,
  },

  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconSpacing: {
    marginLeft: 10,
  },
  profileCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  profileText: {
    color: Colors.white,
    fontWeight: 'bold',
  },
});
