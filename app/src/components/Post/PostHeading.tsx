import { View } from "react-native";
import { ThemedText } from "../Themed/ThemedText";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { timeAgo } from "@/utils/timeAgo";

export default function PostHeading({
  name,
  createdAt,
  verified,
}: {
  name: string;
  createdAt: string;
  verified: boolean;
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexGrow: 1,
        width: '100%',
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <ThemedText style={{ fontWeight: '500' }}>{name}</ThemedText>
        {verified && (
          <MaterialIcons name='verified' size={14} color='#60a5fa' />
        )}
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <ThemedText style={{ color: 'gray' }}>{timeAgo(createdAt)}</ThemedText>
      </View>
    </View>
  );
}
