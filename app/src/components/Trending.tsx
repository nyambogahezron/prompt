import React, { useState } from 'react';
import { ResizeMode, Video } from 'expo-av';
import * as Animatable from 'react-native-animatable';
import {
  FlatList,
  Image,
  ImageBackground,
  TouchableOpacity,
  ViewToken,
  ViewabilityConfig,
  StyleSheet,
} from 'react-native';

import { icons } from '../constants';

const zoomIn = {
  0: {
    scale: 0.9,
  },
  1: {
    scale: 1,
  },
};

const zoomOut = {
  0: {
    scale: 1,
  },
  1: {
    scale: 0.9,
  },
};

const styles = StyleSheet.create({
  trendingItemContainer: {
    marginRight: 20,
  },
  video: {
    width: 208,
    height: 288,
    borderRadius: 33,
    marginTop: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  thumbnailContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbnail: {
    width: 208,
    height: 288,
    borderRadius: 33,
    marginVertical: 20,
    overflow: 'hidden',
    shadowColor: 'rgba(0, 0, 0, 0.4)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
  },
  playIcon: {
    width: 48,
    height: 48,
    position: 'absolute',
  },
});

interface Post {
  $id: string;
  video: string;
  thumbnail: string;
}

interface TrendingItemProps {
  activeItem: string;
  item: Post;
}

const TrendingItem = ({ activeItem, item }: TrendingItemProps) => {
  const [play, setPlay] = useState(false);

  return (
    <Animatable.View
      style={styles.trendingItemContainer}
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={500}
    >
      {play ? (
        <Video
          source={{ uri: item.video }}
          style={styles.video}
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if (status.isLoaded && !status.isPlaying) {
              setPlay(false);
            }
          }}
        />
      ) : (
        <TouchableOpacity
          style={styles.thumbnailContainer}
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <ImageBackground
            source={{
              uri: item.thumbnail,
            }}
            style={styles.thumbnail}
            resizeMode='cover'
          />

          <Image
            source={icons.play}
            style={styles.playIcon}
            resizeMode='contain'
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

const Trending = ({ posts }: { posts: any }) => {
  const [activeItem, setActiveItem] = useState(posts[0]?.$id || null);

  const viewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: ViewToken[];
  }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key as string);
    }
  };

  const viewabilityConfig: ViewabilityConfig = {
    itemVisiblePercentThreshold: 70,
  };

  return (
    <>
      {activeItem && (
        <FlatList
          data={posts}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.$id}
          renderItem={({ item }) => (
            <TrendingItem activeItem={activeItem} item={item} />
          )}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
          contentOffset={{ x: 170, y: 0 }}
        />
      )}
    </>
  );
};

export default Trending;
