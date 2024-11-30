import * as React from 'react';
import {
  Platform,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  View,
  Animated,
  Dimensions,
} from 'react-native';
import Lottie from 'lottie-react-native';
import PostItem from '@/components/Post/Post';
import CreatePostCard from '@/components/Post/CreatePostCard';
import { usePostStore } from '@/store';
import { Post } from '@/types';
import { Stack } from 'expo-router';
import ThemedText from '@/components/ui/Text';
import CustomHeader from '@/components/navigation/CustomHeader';
import { Colors } from '@/constants/Colors';
const width = Dimensions.get('window').width;

export default function TabOneScreen() {
  const animationRef = React.useRef<Lottie>(null);
  const [refreshing, setRefreshing] = React.useState(false);
  const [loadingMore, setLoadingMore] = React.useState(false);
  const [displayedPosts, setDisplayedPosts] = React.useState<Post[]>([]);
  const scrollY = React.useRef(new Animated.Value(0)).current;
  const Posts = usePostStore((state) => state.posts);

  const loadMorePosts = () => {
    if (Posts.length > displayedPosts.length) {
      setLoadingMore(true);
      setTimeout(() => {
        const nextPosts = Posts.slice(
          displayedPosts.length,
          displayedPosts.length + 20
        );
        setDisplayedPosts([...displayedPosts, ...nextPosts]);
        setLoadingMore(false);
      }, 2000);
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    animationRef.current?.play();
    setTimeout(() => {
      setRefreshing(false);
      animationRef.current?.pause();
      setDisplayedPosts(Posts.slice(0, 20));
    }, 2000);
  }, [Posts]);

  React.useEffect(() => {
    animationRef.current?.play();
    setDisplayedPosts(Posts.slice(0, 20));
  }, [Posts]);

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 110],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          header: () => {
            return (
              <Animated.View
                style={[
                  styles.stickyHeader,
                  { opacity: headerOpacity, height: 50 },
                ]}
              >
                <CustomHeader />
              </Animated.View>
            );
          },
        }}
      />

      <Animated.FlatList
        data={displayedPosts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <PostItem Post={item} />}
        contentContainerStyle={{
          paddingTop:
            Platform.OS === 'web' ? 40 : Platform.OS === 'android' ? 30 : 0,
          paddingHorizontal: 10,
          paddingBottom: 20,
          marginTop: 20,
          maxWidth: 1200,
          alignItems: 'center',
          alignSelf: 'center',
        }}
        ListHeaderComponent={
          <>
            {Platform.OS !== 'web' && (
              <>
                <CreatePostCard />
              </>
            )}
          </>
        }
        ListFooterComponent={
          loadingMore && Posts.length > 35 ? (
            <View style={{ padding: 20 }}>
              <ThemedText>Loading...</ThemedText>
            </View>
          ) : null
        }
        onEndReached={loadMorePosts}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            tintColor={'transparent'}
            colors={['transparent']}
            progressBackgroundColor={'transparent'}
            onRefresh={onRefresh}
          />
        }
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  stickyHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: Colors.black,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    width: width,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
