import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import React from 'react';
import { Colors } from '@/constants/Colors';
import { router } from 'expo-router';
import { Feather, Ionicons } from '@expo/vector-icons';

export default function CustomProfileHeader() {
  const colorScheme = useColorScheme();

  return (
    <View style={styles.header}>
      <View>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons
            name='chevron-back'
            size={22}
            color={Colors[colorScheme ?? 'light'].icon}
          />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.actionIconsContainer}>
        <TouchableOpacity>
          <Feather
            name='settings'
            size={22}
            color={Colors[colorScheme ?? 'light'].icon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.navigate('/(auth)/sign-in')}>
          <Feather
            name='log-out'
            size={22}
            color={Colors[colorScheme ?? 'light'].icon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 5,
    marginBottom: 7,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  tabContentText: {
    fontSize: 16,
    marginVertical: 16,
    color: Colors.border,
    alignSelf: 'center',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  backText: {
    fontSize: 16,
  },
  actionIconsContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 16,
  },
});
