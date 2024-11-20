import { ThemedView } from '@/components/Themed/ThemedView';
import React from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function NewPostScreen() {
  return (
    <SafeAreaView style={styles.page}>
      <ScrollView>
        <ThemedView style={styles.container}>
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
          </View>
          <TextInput
            placeholder='Type prompt now...'
            placeholderTextColor='#888'
            style={styles.placeholderText}
          />
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  placeholderText: {
    color: '#888',
    marginLeft: 50,
    marginTop: -20,
  },
  PostInput: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  headerImg: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  textInputContainer: {
    flex: 1,
  },
  username: {
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  textInput: {
    color: 'white',
    fontSize: 16,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  addToPost: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImageSmall: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  addToPostText: {
    color: '#888',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  replyText: {
    color: '#888',
  },
  postButton: {
    backgroundColor: '#444',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  postButtonText: {
    color: '#888',
  },
});
