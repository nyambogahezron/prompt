import { Pressable, StyleSheet, View } from 'react-native';
import { Post } from '@/types';
import { Image } from 'expo-image';
import { ThemedText } from '../Themed/ThemedText';
import { useNavigation } from 'expo-router';
import { blurHash } from '@/utils/blurHash';
import PostActionButtons from './PostActionButtons';
import PostHeading from './PostHeading';
import PostLeftSide from './PostLeftSide';

interface PostItemProps {
  Post: Post;
}

export default function PostItem({ Post }: PostItemProps): JSX.Element {
  const navigation = useNavigation();
  return (
    <Pressable
      style={styles.container}
      // @ts-ignore
      onPress={() => navigation.navigate('prompt-details', { ...Post })}
    >
      <PostLeftSide {...Post} />
      <View style={{ flexShrink: 1, gap: 6 }}>
        <PostHeading
          name={Post.author.name}
          verified={Post.author.verified}
          createdAt={Post.createdAt}
        />
        <ThemedText>{Post.content}</ThemedText>
        {Post.image && (
          <Image
            source={Post.image}
            style={{ width: '100%', minHeight: 300, borderRadius: 10 }}
            placeholder={blurHash}
            contentFit='cover'
            transition={500}
          />
        )}
        <PostActionButtons
          replies={Post.repliesCount}
          likes={Post.likesCount}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 6,
    paddingBottom: 30,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});
