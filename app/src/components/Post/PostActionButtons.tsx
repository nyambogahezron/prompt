{
  /* //TODO  first change color then call the action to reduce the change delay time for all actions */
}

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { Ionicons as Icon, FontAwesome6 } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { Colors } from '@/constants/Colors';
import { Toaster } from '@/lib/Toaster';
import { Animated } from 'react-native';
import { useBookmarkStore } from '@/store';
import { Post } from '@/types';
import { useNavigation } from 'expo-router';

const isWeb = Platform.OS === 'web';

export default function PostActionButtons({ Post }: { Post?: Post }) {
  const [isCopied, setIsCopied] = React.useState(false);
  const [isBookmarked, setIsBookmarked] = React.useState(false);
  const [isLiked, setIsLiked] = React.useState(false);
  const [isDisliked, setIsDisliked] = React.useState(false);
  const [postLikes, setPostLikes] = React.useState(Post?.likesCount ?? 0);

  const addToBookmarks = useBookmarkStore((state) => state.addBookmark);
  const bookmarks = useBookmarkStore((state) => state.bookmarks);
  const removeBookmark = useBookmarkStore((state) => state.removeBookmark);

  const navigate = useNavigation();

  React.useEffect(() => {
    if (
      Post &&
      bookmarks &&
      bookmarks?.some((bookmark) => bookmark.id === Post.id)
    ) {
      setIsBookmarked(true);
    } else {
      setIsBookmarked(false);
    }
  }, [bookmarks]);

  React.useEffect(() => {
    if (isLiked) {
      setIsDisliked(false);
    }
  }, [isLiked]);

  const scaleValue = new Animated.Value(1);

  const animateButton = () => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 1.2,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleOnCopy = async () => {
    animateButton();
    if (Post?.content) {
      await Clipboard.setStringAsync(Post?.content);
      Toaster('Copied to clipboard');

      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 10000);
    }
    if (!isWeb) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  };

  const handleOnLike = () => {
    if (!isLiked) {
      setIsLiked(true);
      setPostLikes(postLikes + 1);
    }

    if (isLiked) {
      setIsLiked(false);
      setPostLikes(postLikes - 1);
    }
  };

  const handleOnDislike = () => {
    if (!isDisliked) {
      setIsLiked(false);
      setIsDisliked(true);
    } else {
      setIsDisliked(false);
    }
  };

  const handleOnClickComment = () => {
    // @ts-ignore
    navigate.navigate('prompt-details', { ...Post });
  };

  const handleOnBookmark = () => {
    if (!isBookmarked && Post) {
      addToBookmarks(Post);
      Toaster('Added to bookmarks');
      return;
    }

    // remove from bookmarks
    if (
      Post &&
      bookmarks &&
      bookmarks.some((bookmark) => bookmark.id === Post.id)
    ) {
      removeBookmark(Post.id);
      Toaster('Removed from bookmarks');
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity style={styles.button} onPress={() => handleOnLike()}>
          <Icon
            name='arrow-up-outline'
            size={22}
            color={isLiked ? Colors.primaryColor : Colors.whiteLight}
          />
          <Text style={styles.text}>{postLikes}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => handleOnDislike()}
        >
          <Icon
            name='arrow-down-outline'
            size={22}
            color={isDisliked ? Colors.primaryColor : Colors.whiteLight}
            onPress={() => handleOnDislike()}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => handleOnClickComment()}
        >
          <Icon name='chatbubble-outline' size={22} color={Colors.whiteLight} />
          <Text style={styles.text}>{Post?.repliesCount}</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleOnBookmark()}
        >
          <Icon
            name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
            size={22}
            color={isBookmarked ? Colors.primaryColor : Colors.whiteLight}
          />
        </TouchableOpacity>

        {/* copy  content*/}
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            handleOnCopy();
          }}
        >
          <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
            <FontAwesome6
              name='copy'
              size={22}
              color={isCopied ? Colors.primaryColor : Colors.whiteLight}
            />
          </Animated.View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    marginLeft: -20,
    marginTop: 5,
    marginBottom: -20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 8,
    padding: 3,
  },
  text: {
    marginLeft: 4,
    color: Colors.whiteLight,
    fontSize: 14,
  },
});
