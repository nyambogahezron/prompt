import { View, Platform } from 'react-native';
import React from 'react';
import Animated from 'react-native-reanimated';
import { usePostStore } from '@/store';
import PostItem from '@/components/Post/Post';

export default function Explore() {
  const Posts = usePostStore((state) => state.posts);
  return (
    <View>
      <Animated.FlatList
        data={Posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <PostItem Post={item} />}
        contentContainerStyle={{
          paddingTop: Platform.select({ android: 2 }),
          paddingHorizontal: 10,
          paddingBottom: 20,
          marginTop: 20,
          justifyContent: 'center',
          alignContent: 'center',
          alignSelf: 'center',
        }}
      />
    </View>
  );
}
