import * as React from 'react';
import {
  Platform,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native';
import Lottie from 'lottie-react-native';
import { useGlobalContext } from '@/context/GlobalProvider';
import PostItem from '@/components/Post/ThreadItem';
import CreatePostCard from '@/components/Post/CreatePostCard';
const isWeb = Platform.OS === 'web';

export default function TabOneScreen() {
  const animationRef = React.useRef<Lottie>(null);
  const { Posts } = useGlobalContext();
  // console.log(Posts);

  React.useEffect(() => {
    animationRef.current?.play();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={{
          paddingTop: Platform.select({ android: 30 }),
          paddingHorizontal: 10,
        }}
        refreshControl={
          <RefreshControl
            refreshing={false}
            tintColor={'transparent'}
            onRefresh={() => animationRef.current?.play()}
          />
        }
      >
        {/* // TODO fix the animation on web */}
        {!isWeb && (
          <Lottie
            ref={animationRef}
            source={require('../../../assets/animations/loading.json')}
            style={{
              width: 70,
              height: 70,
              alignSelf: 'center',
            }}
            loop={false}
            onAnimationFinish={() => animationRef.current?.pause()}
          />
        )}
        <CreatePostCard />
        {Posts && Posts.map((Post) => <PostItem key={Post.id} Post={Post} />)}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
