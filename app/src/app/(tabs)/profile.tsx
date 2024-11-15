import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather, Ionicons } from '@expo/vector-icons';
import Tabs from '@/components/Tabs';
import { useState } from 'react';
import { Colors } from '@/constants/Colors';
import { Link } from 'expo-router';
import { useRouter } from 'expo-router';
import { ThemedView } from '@/components/Themed/ThemedView';
import { useColorScheme } from '@/hooks/useColorScheme';
import { UserProfile } from '@/components/UserProfile';
import { generateUserPosts } from '@/utils/generate-dummy-data';
import { Post } from '@/types';
import PostItem from '@/components/Post/ThreadItem';
import { ThemedText } from '@/components/Themed/ThemedText';
import { useUserStore } from '@/store';

type ProfileProps = {
  userId?: string;
  showBackButton?: boolean;
};

const dummyData = [
  { _id: '1', title: 'Thread 1', creator: { name: 'User 1' } },
];

export default function Profile({
  userId,
  showBackButton = true,
}: ProfileProps) {
  const { top } = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState('Profile');
  const router = useRouter();
  const colorScheme = useColorScheme();
  const handleTabChange = (tab: any) => {
    setActiveTab(tab);
  };
  const [Posts, setPosts] = useState<Post[]>([]);
    const User = useUserStore((state) => state.user);


  useEffect(() => {
    const fetchPosts = async () => {
      const response = await generateUserPosts();
      setPosts(response);
    };
    fetchPosts();
  }, []);

  return (
    <ThemedView
      darkColor='#000'
      lightColor='#fff'
      style={[styles.container, { paddingTop: top }]}
    >
      <View style={styles.header}>
        <View>
          {showBackButton && (
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Ionicons
                name='chevron-back'
                size={22}
                color={Colors[colorScheme ?? 'light'].icon}
              />
              <Text style={styles.backText}>Back</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.actionIconsContainer}>
          <TouchableOpacity>
            <Feather
              name='settings'
              size={22}
              color={Colors[colorScheme ?? 'light'].icon}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Feather
              name='log-out'
              size={22}
              color={Colors[colorScheme ?? 'light'].icon}
            />
          </TouchableOpacity>
        </View>
      </View>

      <Tabs onTabChange={handleTabChange} />

      {activeTab === 'Blogs' && (
        <ScrollView>
          {dummyData.map((item) => (
            <ThemedText key={item._id}>Blogs</ThemedText>
          ))}
        </ScrollView>
      )}

      {activeTab === 'Posts' && (
        <FlatList
          data={Posts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <PostItem Post={item} />}
          ListEmptyComponent={
            <Text style={styles.tabContentText}>
              You haven't posted anything yet.
            </Text>
          }
        />
      )}

      {activeTab === 'Profile' && (
        <ScrollView>
          <Link href={`/`} asChild>
            <TouchableOpacity>
              <UserProfile />
            </TouchableOpacity>
          </Link>
        </ScrollView>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 5,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  tabContentText: {
    fontSize: 16,
    marginVertical: 16,
    color: Colors.border,
    alignSelf: 'center',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  backText: {
    fontSize: 16,
  },
  actionIconsContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 16,
  },
});
