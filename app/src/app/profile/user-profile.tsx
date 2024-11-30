import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const UserProfile = () => {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.headerContainer}>
        <Image
          source={{ uri: 'https://via.placeholder.com/150' }}
          style={styles.headerImage}
        />
        <Text style={styles.headerText}>John Doe</Text>
      </View>
      <View style={styles.profileDetails}>
        <Text style={styles.profileText}>Email: john.doe@example.com</Text>
        <Text style={styles.profileText}>Phone: +1234567890</Text>
        <Text style={styles.profileText}>
          Address: 123 Main St, Anytown, USA
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingBottom: 20,
  },
  headerContainer: {
    height: SCREEN_HEIGHT * 0.75,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  headerImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileDetails: {
    padding: 20,
  },
  profileText: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default UserProfile;
