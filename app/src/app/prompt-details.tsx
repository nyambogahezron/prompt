import { useRoute } from '@react-navigation/native';
import { Reply, Post } from '@/types';
import PostItem from '@/components/Post/Post';
import {
  Dimensions,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import ReplyItem from '@/components/Post/ReplyItem';
import { useState } from 'react';
import { createRandomFollower } from '../utils/generate-dummy-data';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/Themed/ThemedText';
import { Stack } from 'expo-router';
import { Colors } from '@/constants/Colors';
const width = Dimensions.get('window').width;

export default function PostDetails(): JSX.Element {
  const route = useRoute();
  const [Post, setPost] = useState(route.params as Post);
  const [replyContent, setReplyContent] = useState('');

  function handleReply() {
    const newReply: Reply = {
      author: createRandomFollower(),
      content: replyContent,
      createdAt: new Date().toISOString(),
      id: Math.random().toString(),
      likes: 0,
    };
    setPost((prevState) => ({
      ...prevState,
      replies: [newReply, ...prevState.replies!],
      repliesCount: prevState.repliesCount + 1,
    }));
    setReplyContent('');
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: Colors.black,
          },
        }}
      />

      {!Post && (
        <View>
          <ThemedText>No Post</ThemedText>
        </View>
      )}
      <ScrollView contentContainerStyle={{ padding: 10, marginTop: 4 }}>
        {Post && <PostItem Post={Post} />}

        <View style={{ gap: 15 }}>
          {Post.replies?.map((reply) => (
            <ReplyItem key={reply.id} {...reply} />
          ))}
        </View>
      </ScrollView>
      <View style={styles.replyContainer}>
        <TextInput
          placeholder='Add reply'
          value={replyContent}
          onChangeText={setReplyContent}
          style={styles.input}
          placeholderTextColor={'#888'}
        />
        <Pressable
          disabled={!replyContent}
          onPress={handleReply}
          style={styles.btn}
        >
          <View>
            <Ionicons
              name='send'
              size={24}
              color='blue'
              style={{ marginTop: -2, color: replyContent ? 'blue' : '#888' }}
            />
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    width: width * 0.8,
    backgroundColor: '#111',
    alignItems: 'center',
    marginLeft: 0,
    padding: 10,
    marginBottom: 0,
    borderRadius: 10,
    color: 'white',
  },
  replyContainer: {
    display: 'flex',
    flexDirection: 'row',
    padding: 15,
    columnGap: 10,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  btn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 50,
    transform: [{ rotate: '-35deg' }],
  },
});
