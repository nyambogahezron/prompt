import React from 'react';
import { View, Platform, Animated, FlatList, StyleSheet } from 'react-native';
import PostItem from '@/components/Post/Post';
import { useBookmarkStore } from '@/store';
import ThemedText from '@/components/ui/Text';
import ThemedView from '@/components/ui/View';

import { Colors } from '@/constants/Colors';
const isWeb = Platform.OS === 'web';

export default function bookmarks() {
  const Bookmarks = useBookmarkStore((state) => state.bookmarks);

  const shakeAnimation = new Animated.Value(0);

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shakeAnimation, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnimation, {
          toValue: -1,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnimation, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={{
          marginTop: isWeb ? 20 : 0,
        }}
        data={Bookmarks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <PostItem Post={item} />}
        ListEmptyComponent={() => (
          <ThemedView style={styles.emptyContainer}>
            <ThemedText style={styles.text}>No Bookmarks</ThemedText>
            <Animated.Text
              style={[
                styles.animateText,
                { transform: [{ translateX: shakeAnimation }] },
              ]}
            >
              😢
            </Animated.Text>
          </ThemedView>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.black,
  },
  emptyContainer: {
    flex: 1,
    display: 'flex',
    marginTop: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.black,
    height: '100%',
  },
  animateText: {
    fontSize: 70,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text: {
    color: Colors.white,
    fontSize: 30,
    textAlign: 'center',
    fontStyle: 'italic',
    fontFamily: 'Cochin',
    fontWeight: 'bold',
    padding: 10,
  },
});
