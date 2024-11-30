import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/Colors';
import ThemedText from '@/components/ui/Text';
import { useUserStore } from '@/store';

export const UserProfile = () => {
  const isSelf = true;
  const User = useUserStore((state) => state.user);

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.profileTextContainer}>
          <ThemedText style={styles.name}>{User?.name}</ThemedText>
          <ThemedText style={styles.email}>{User?.email}</ThemedText>
        </View>
        <Image source={{ uri: User?.photo }} style={styles.image} />
      </View>

      <ThemedText style={styles.bio}>{User?.bio}</ThemedText>
      <ThemedText>{User?.followers?.length} followers</ThemedText>

      <View style={styles.buttonRow}>
        {isSelf && (
          <>
            <TouchableOpacity style={styles.button}>
              <ThemedText style={styles.buttonText}>Edit profile</ThemedText>
            </TouchableOpacity>
          </>
        )}

        {!isSelf && (
          <>
            <TouchableOpacity style={styles.button}>
              <ThemedText style={styles.fullButtonText}>Follow</ThemedText>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profileTextContainer: {
    gap: 6,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 14,
    color: 'gray',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  bio: {
    fontSize: 14,
    marginTop: 16,
    marginBottom: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 16,
    gap: 16,
  },
  button: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
  },
  fullButton: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullButtonText: {
    fontWeight: 'bold',
    color: 'white',
  },
});
