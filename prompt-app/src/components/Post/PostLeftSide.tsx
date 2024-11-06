import { Post } from '@/types';
import { blurHash } from '@/utils/blurHash';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import {
  StyleSheet,
  Touchable,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

export default function PostLeftSide(Post: Post) {
  const currentTheme = useColorScheme();
  const borderColor = currentTheme === 'light' ? '#00000020' : '#ffffff20';

  return (
    <View style={{ justifyContent: 'space-between' }}>
      <TouchableOpacity onPress={() => router.push('/(tabs)/profile')}>
        <Image
          source={Post.author.photo}
          style={styles.image}
          placeholder={blurHash}
          contentFit='cover'
          transition={500}
        />
      </TouchableOpacity>
      <View
        style={{
          borderWidth: 1,
          alignSelf: 'center',
          borderColor: borderColor,
          flexGrow: 1,
        }}
      />
      <View
        style={{
          width: 20,
          alignItems: 'center',
          alignSelf: 'center',
          gap: 3,
        }}
      >
        <Image
          // @ts-ignore
          source={Post.replies[0]?.author.photo}
          style={{ width: 10, height: 10, borderRadius: 15 }}
          placeholder={blurHash}
          contentFit='cover'
          transition={500}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 30,
    height: 30,
    borderRadius: 20,
  },
});
