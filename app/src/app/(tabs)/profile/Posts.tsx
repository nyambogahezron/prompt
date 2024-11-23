import { View, Text, FlatList, StyleSheet } from 'react-native';
import React from 'react';
import { usePostStore, useUserStore } from '@/store';
import PostItem from '@/components/Post/Post';
import { Colors } from '@/constants/Colors';
import { Post } from '@/types';
import CustomButton from '@/components/CustomButton';
import { router } from 'expo-router';

export default function Posts() {
  const [usePosts, setPosts] = React.useState<Post[]>([]);
  const Posts = usePostStore((state) => state.posts);
  const User = useUserStore((state) => state.user);

  React.useEffect(() => {
    if (User) {
      const data = Posts.filter((post) => post.author.id === User.id);
      if (data.length > 0) {
        setPosts(data);
      } else {
        setPosts([]);
      }
    }
  }, [User]);
  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.contentContainerStyle}
        data={usePosts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PostItem Post={item} />}
        ListEmptyComponent={
          <View style={styles.container}>
            <Text style={styles.tabContentText}>
              You haven't posted anything yet.
            </Text>

            <CustomButton
              title='Create Post'
              handlePress={() => router.navigate('/create-prompt')}
              containerStyles={styles.submitButton}
              textStyles={styles.buttonText}
            />
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    padding: 8,
  },
  contentContainerStyle: {
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
  },
  tabContentText: {
    fontSize: 16,
    marginVertical: 16,
    color: Colors.border,
    alignSelf: 'center',
  },
  submitButton: {
    width: '100%',
    marginVertical: 16,
    backgroundColor: Colors.primaryColor,
  },
  buttonText: {
    color: Colors.white,
  },
});
