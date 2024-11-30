import ThemedText from '@/components/ui/Text';
import { useBlogStore } from '@/store';
import { Blog } from '@/types';
import { blurHash } from '@/utils/blurHash';
import { Image } from 'expo-image';
import React from 'react';
import { View, FlatList, StyleSheet, Platform } from 'react-native';

export default function Blogs() {
  const BlogsData = useBlogStore((state) => state.blogs);

  const BlogItem = (item: Blog) => (
    <View style={styles.blogContainer}>
      <Image
        placeholder={blurHash}
        source={{ uri: item.image }}
        style={styles.image}
        contentFit='cover'
      />
      <ThemedText style={{ fontSize: 18, fontWeight: 'bold' }}>
        {item.title}
      </ThemedText>
      <ThemedText style={{ fontSize: 14, color: 'gray' }}>
        By {item.author.name}
      </ThemedText>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={BlogsData}
        renderItem={({ item }) => <BlogItem {...item} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{
          maxWidth: 1200,
          width: '100%',
          alignItems: 'center',
          alignSelf: 'center',
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  blogContainer: {
    width: '100%',
    maxWidth: Platform.select({ web: 600 }),
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 200,
  },
});
