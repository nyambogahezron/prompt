import { Pressable, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Post } from '@/types';
import { Image } from 'expo-image';
import { ThemedText } from '../Themed/ThemedText';
import { useNavigation } from 'expo-router';
import { blurHash } from '@/utils/blurHash';
import PostActionButtons from './PostActionButtons';
import PostHeading from './PostHeading';
import PostLeftSide from './PostLeftSide';
import { FontAwesome6 } from '@expo/vector-icons';

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
        <View style={styles.postContainer}>
          <ThemedText style={styles.postText}>{Post.content}</ThemedText>
        </View>
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
  postContainer: {
    position: 'relative',
    width: '100%',
    minHeight: 85,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    // borderWidth: 1,
    // borderColor: 'rgba(0,0,0,1)',
    // backgroundColor: '#101',
    marginLeft: -4,
  },
  postText: {},
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 8,
    padding: 3,
  },
});
