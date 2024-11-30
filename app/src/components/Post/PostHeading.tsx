import { StyleSheet, View } from 'react-native';
import  ThemedText  from '@/components/ui/Text';
import { MaterialIcons } from '@expo/vector-icons';
import { timeAgo } from '@/utils/timeAgo';
import { Colors } from '@/constants/Colors';

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
    <View style={styles.container}>
      <View style={styles.header}>
        <ThemedText style={styles.text}>{name}</ThemedText>
        {verified && (
          <MaterialIcons name='verified' size={14} color={Colors.blue} />
        )}
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <ThemedText style={{ color: 'gray' }}>{timeAgo(createdAt)}</ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexGrow: 1,
    width: '100%',
  },
  header: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  text: { fontWeight: '500' },
});
