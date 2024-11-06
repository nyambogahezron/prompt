import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { router } from 'expo-router';

export default function CreatePostCard() {
  return (
    <TouchableOpacity
      onPress={() => router.navigate('/create-prompt')}
      style={styles.container}
    >
      <View style={styles.header}>
        <View style={styles.headerImg}>
          <Image
            source={{
              uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQosQi6DYrpWF8K3w73l7eXPK_Q8csIVim8HUpaZPQJ0AZ39QpAumeJVbb4Gxy68ovhOIE&usqp=CAU',
            }}
            style={styles.profileImage}
          />
          <Text style={styles.username}>nyambogahezron</Text>
        </View>
        <View style={styles.iconRow}>
          <TouchableOpacity>
            <FontAwesome5 name='robot' size={16} color='white' />
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
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 20,
  },
  headerImg: {
    flexDirection: 'row',
    alignItems: 'center',
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
    borderRadius: 20,
    marginRight: 10,
  },
  username: {
    color: 'white',
    fontWeight: 'bold',
    marginTop: -5,
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
