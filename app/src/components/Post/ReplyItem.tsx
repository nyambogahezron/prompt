import { View } from 'react-native';
import { Reply } from '@/types';
import { ThemedText } from '../Themed/ThemedText';
import { Image } from 'expo-image';
import { blurHash } from '@/utils/blurHash';
import PostHeading from './PostHeading';
import PostFooter from './PostFooter';
import PostActionButtons from './PostActionButtons';


export default function ReplyItem({
  author,
  content,
  createdAt,
  id,
  likes,
}: Reply): JSX.Element {
  return (
    <View style={{ flexDirection: 'row', gap: 10 }}>
      <Image
        source={author?.photo}
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
        }}
        placeholder={blurHash}
        contentFit='cover'
        transition={500}
      />
      <View style={{ flexShrink: 1, gap: 10 }}>
        <PostHeading
          name={author?.name}
          createdAt={createdAt}
          verified={author?.verified}
        />
        <ThemedText>{content}</ThemedText>
        <PostActionButtons />
        <PostFooter replies={0} likes={likes} />
      </View>
    </View>
  );
}
