import { View, Text, FlatList, StyleSheet } from 'react-native';
import React from 'react';
import { usePostStore } from '@/store';
import PostItem from '@/components/Post/Post';
import { Colors } from '@/constants/Colors';

export default function Posts() {
  const Posts = usePostStore((state) => state.posts);
  return (
    <View
      style={{
        flex: 1,
        marginTop: 10,
      }}
    >
      <FlatList
        contentContainerStyle={{
          justifyContent: 'center',
          alignContent: 'center',
          alignSelf: 'center',
        }}
        data={Posts.slice(0, 10)}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PostItem Post={item} />}
        ListEmptyComponent={
          <Text style={styles.tabContentText}>
            You haven't posted anything yet.
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  tabContentText: {
    fontSize: 16,
    marginVertical: 16,
    color: Colors.border,
    alignSelf: 'center',
  },
});
