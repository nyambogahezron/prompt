import {
  TextInput,
  StyleSheet,
  Platform,
  ScrollView,
  View,
  Dimensions,
} from 'react-native';
import React from 'react';
import { ThemedView } from '@/components/Themed/ThemedView';
import CustomButton from '@/components/CustomButton';
import { Colors } from '@/constants/Colors';
import { usePostStore, useUserStore } from '@/store';
import { router } from 'expo-router';
const { height } = Dimensions.get('window');

export default function Create() {
  const [description, setDescription] = React.useState('');
  const [content, setContent] = React.useState('');

  const user = useUserStore((state) => state.user);
  const setPost = usePostStore((state) => state.addPost);

  const handleSubmit = () => {
    if (user) {
      const data = {
        id: Date.now().toString(),
        author: user,
        description,
        content,
        repliesCount: 0,
        likesCount: 0,
        createdAt: Date.now().toLocaleString(),
      };

      setPost(data);
      // submit data to the server

      router.navigate('/(tabs)')
    } else {
      console.error('User is not logged in');
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <ThemedView style={styles.innerContainer}>
          <TextInput
            style={styles.input}
            placeholder='Description'
            placeholderTextColor={Colors.primaryColor}
            multiline={true}
            onFocus={() => {}}
            onChangeText={(text) => setDescription(text)}
          />

          <TextInput
            style={styles.input}
            placeholder='Prompt'
            placeholderTextColor={Colors.primaryColor}
            onFocus={() => {}}
            onChangeText={(text) => setContent(text)}
            multiline={true}
          />
        </ThemedView>
      </ScrollView>

      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <CustomButton
          title='Submit'
          handlePress={() => handleSubmit()}
          containerStyles={styles.submitButton}
          textStyles={styles.buttonText}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: Colors.black,
  },
  innerContainer: {
    flex: 1,
    position: 'relative',
    alignSelf: 'center',
    alignItems: 'flex-start',
    padding: 16,
    width: '100%',
    maxWidth: Platform.OS === 'web' ? 600 : '100%',
    borderWidth: 1,
    height: Platform.OS === 'web' ? '100%' : height,
    backgroundColor: Colors.black,
  },
  input: {
    borderBottomWidth: 2,
    borderColor: Colors.primaryColor,
    marginBottom: 16,
    color: Colors.white,
    width: '100%',
    height: 50,
  },
  submitButton: {
    position: 'absolute',
    backgroundColor: Colors.primaryColor,
    bottom: 80,
    width: '90%',
    marginHorizontal: 'auto',
    alignItems: 'center',
    minHeight: 50,
    maxWidth: Platform.OS === 'web' ? 600 : '100%',
  },
  buttonText: {
    color: Colors.white,
    fontSize: 18,
  },
});
