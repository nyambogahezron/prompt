import { Colors } from '@/constants/Colors';
import { Post } from '@/types';
import { blurHash } from '@/utils/blurHash';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import {
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

export default function PostLeftSide(Post: Post) {
  const currentTheme = useColorScheme();
  const borderColor = currentTheme === 'light' ? '#00000020' : '#ffffff20';

  return (
    <View style={{ justifyContent: 'space-between' }}>
      <TouchableOpacity
        onPress={() => router.push('/(tabs)/profile')}
        style={styles.imageWrapper}
      >
        <Image
          source={Post.author.photo}
          style={styles.image}
          placeholder={blurHash}
          contentFit='cover'
          transition={500}
          contentPosition={'center'}
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
    </View>
  );
}

const styles = StyleSheet.create({
  imageWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 35,
    height: 35,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: Colors.primaryColor,
  },
  image: {
    width: 30,
    padding: 10,
    height: 30,
    borderRadius: 8,
  },
});
