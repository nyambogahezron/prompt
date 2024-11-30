import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Platform,
  Dimensions,
  Pressable,
} from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { router } from 'expo-router';
import { useUserStore } from '@/store';
import { Colors } from '@/constants/Colors';
const isWeb = Platform.OS === 'web';
const width = Dimensions.get('window').width;
const contentWidth = 600;

export default function CreatePostCard() {
  const User = useUserStore((state) => state.user);

  return (
    <TouchableOpacity
      onPress={() => router.navigate('/create-prompt')}
      style={styles.container}
    >
      <Pressable
        onPress={() => router.navigate('/(tabs)/profile/Profile')}
        style={styles.header}
      >
        <View style={styles.headerImg}>
          <Image
            source={{
              uri: User?.photo,
            }}
            style={styles.profileImage}
          />
          <View>
            <Text style={styles.username}>{User?.name}</Text>
            <Text style={styles.username}>@{User?.username}</Text>
          </View>
        </View>
      </Pressable>
      <TouchableOpacity
        onPress={() => router.navigate('/create-prompt')}
        style={styles.icon}
      >
        <FontAwesome5 name='plus' size={15} color='white' />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    padding: 1,
    borderRadius: 8,
    borderBottomWidth: 0.1,
    borderColor: Colors.border,
    marginBottom: 20,
    width: width * 0.94,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexDirection: 'row',
    maxWidth: isWeb ? contentWidth : width,
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

  icon: {
    alignItems: 'center',
    alignContent: 'flex-end',
    justifyContent: 'flex-end',
    right: 0,
    marginTop: 10,
    marginRight: 5,
  },
});
