import React, { useState, useEffect } from 'react';
import { Platform, Pressable, StyleSheet, View } from 'react-native';
import { Post } from '@/types';
import { ThemedText } from '../Themed/ThemedText';
import { useNavigation } from 'expo-router';
import PostActionButtons from './PostActionButtons';
import PostHeading from './PostHeading';
import PostLeftSide from './PostLeftSide';
import { Colors } from '@/constants/Colors';
const isWeb = Platform.OS === 'web';

const ContentWidth = isWeb ? 600 : '100%';

interface PostItemProps {
  Post: Post;
}

export default function PostItem({ Post }: PostItemProps): JSX.Element {
  const [showMoreDescription, setShowMoreDescription] = useState(false);
  const [showMoreContent, setShowMoreContent] = useState(false);
  const [showFull, setShowFull] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    if (Post.content.length > 300) {
      setDisplayText('Show More');
    }
  }, [Post.content]);

  const handlePress = () => {
    if (!showMoreDescription) {
      setShowMoreDescription(true);
    } else if (!showFull) {
      setShowFull(true);
    } else {
      // @ts-ignore
      navigation.navigate('prompt-details', { ...Post });
    }
  };

  const handleShowContent = () => {
    if (!showMoreContent) {
      setShowMoreContent(true);
      setDisplayText('Show Less');
    } else {
      setShowMoreContent(false);
      setDisplayText('Show More');
    }
  };

  const getPostDescription = () => {
    if (showFull) return Post.description;
    if (showMoreDescription) return Post.description;
    if (Post.description.length > 200)
      return Post.description.slice(0, 200) + '... more';
    return Post.description;
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
              {getPostDescription()}
            </ThemedText>
          </Pressable>
        </View>

        <View style={styles.prompt}>
          <ThemedText style={styles.postText}>
            {showMoreContent
              ? Post.content
              : Post.content.slice(0, 300) + '...'}
          </ThemedText>

          {Post.content.length > 300 && (
            <Pressable onPress={handleShowContent}>
              <ThemedText type='link' style={styles.button}>
                {displayText}
              </ThemedText>
            </Pressable>
          )}
        </View>
        <PostActionButtons Post={Post} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 6,
    paddingBottom: 30,
    maxWidth: ContentWidth,
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
    fontSize: 13,
    padding: 1,
  },
});
