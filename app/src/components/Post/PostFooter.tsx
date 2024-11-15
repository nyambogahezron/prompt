import { ThemedText } from "../Themed/ThemedText";

export default function PostFooter({
  replies,
  likes,
}: {
  replies: number;
  likes: number;
}) {
  return (
    <ThemedText style={{ color: 'gray' }}>
      {replies} replies · {likes} likes
    </ThemedText>
  );
}
