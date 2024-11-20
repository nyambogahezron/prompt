import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Post } from '@/types';
import { ThemedText } from '../Themed/ThemedText';
import { useNavigation } from 'expo-router';
import PostActionButtons from './PostActionButtons';
import PostHeading from './PostHeading';
import PostLeftSide from './PostLeftSide';
import { Colors } from '@/constants/Colors';

interface PostItemProps {
  Post: Post;
}

export default function PostItem({ Post }: PostItemProps): JSX.Element {
  const [showMore, setShowMore] = useState(false);
  const [showFull, setShowFull] = useState(false);
  const [contextText, setContextText] = useState(Post?.content || '');
  const [displayText, setDisplayText] = useState('');
  const navigation = useNavigation();

  const handlePress = () => {
    if (!showMore) {
      setShowMore(true);
    } else if (!showFull) {
      setShowFull(true);
    } else {
      // @ts-ignore
      navigation.navigate('prompt-details', { ...Post });
    }
  };

  const handleShowContent = () => {
    if (contextText.length > 300) {
      setContextText(Post.content.slice(0, 300) + '...');
      setDisplayText('Show More');
    }

    if (contextText.length < 300) {
      setContextText(Post?.content || '');
      setDisplayText('');
    }

    if (contextText.length > 600 && showMore) {
      setContextText(Post.content.slice(0, 300) + '... ');
      setDisplayText('Show Less');
    }
  };

  const getContent = () => {
    if (showFull) return Post.content;
    if (showMore) return Post.content.slice(0, 120) + '... ';
    if (Post.content.length > 120)
      return Post.content.slice(0, 120) + '... more';
    return Post.content;
  };
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
          <Pressable onPress={handlePress}>
            <ThemedText type='textSm' style={{ padding: 8 }}>
              {getContent()}
            </ThemedText>
          </Pressable>
        </View>

        <View style={styles.prompt}>
          <ThemedText style={styles.postText}>
            {Post.content} {Post.content}
            {Post.content}
            {Post.content.length > 300
              ? Post.content.slice(0, 300) + '...'
              : Post.content}
          </ThemedText>

          {Post.content.length > 300 && (
            <Pressable onPress={() => handleShowContent()}>
              <ThemedText style={styles.button}>{displayText}</ThemedText>
            </Pressable>
          )}
        </View>
        <PostActionButtons
         Post={Post}
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
    borderRadius: 10,
    paddingHorizontal: 1,
    paddingVertical: 10,

    marginLeft: -4,
  },

  prompt: {
    position: 'relative',
    width: '100%',
    minHeight: 85,
    borderRadius: 10,
    paddingHorizontal: 1,
    paddingVertical: 10,
    borderWidth: 0.15,
    borderColor: Colors.primaryColor,
    backgroundColor: Colors.primaryLight,
    marginLeft: -7,
  },
  postText: {
    padding: 10,
    fontSize: 14.5,
    color: Colors.dark.text,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 8,
    padding: 3,
  },
});
