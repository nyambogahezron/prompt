import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { router } from 'expo-router';
import { useUserStore } from '@/store';
import { Colors } from '@/constants/Colors';

export default function CreatePostCard() {
  const User = useUserStore((state) => state.user);

  return (
    <TouchableOpacity
      onPress={() => router.navigate('/create-prompt')}
      style={styles.container}
    >
      <View style={styles.header}>
        <View style={styles.headerImg}>
          <Image
            source={{
              uri: User?.photo,
            }}
            style={styles.profileImage}
          />
          <View style={{ marginTop: -5 }}>
            <Text style={styles.username}>{User?.name}</Text>
            <Text style={styles.username}>@{User?.username}</Text>
          </View>
        </View>
        <View style={styles.iconRow}>
          <TouchableOpacity>
            <FontAwesome5 name='robot' size={13} color='white' />
          </TouchableOpacity>
        </View>
      </View>
      <TextInput
        placeholder='Share prompt now...'
        placeholderTextColor='#888'
        style={styles.placeholderText}
        onFocus={() => router.navigate('/create-prompt')}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    padding: 1,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 20,
  },
  headerImg: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 10,
    marginRight: 10,
    borderWidth: 2,
    borderColor: Colors.primaryColor,
    padding: 8,
  },
  username: {
    color: 'white',
    fontWeight: 'bold',
  },
  placeholderText: {
    color: '#888',
    marginLeft: 50,
    marginTop: -20,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
