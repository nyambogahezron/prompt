import { Colors } from '@/constants/Colors';
import { TreadingItem } from '@/types';
import { useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';

export default function TrendDetails() {
  const route = useRoute();
  const [trend, setTrend] = useState(route.params as TreadingItem);

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <Image source={{ uri: trend?.icon }} style={styles.logo} />
      <Text style={styles.title}>Consensus</Text>
      <Text style={styles.author}>By consensus.app</Text>

      {/* Icons Section */}
      <View style={styles.socialIcons}>
        <TouchableOpacity style={styles.iconButton}>
          <Text style={styles.iconText}>in</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Text style={styles.iconText}>🐦</Text>{' '}
          {/* Replace with an icon library if needed */}
        </TouchableOpacity>
      </View>

      {/* Description Section */}
      <Text style={styles.description}>{trend.description}</Text>

      {/* Stats Section */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>4.3</Text>
          <Text style={styles.statLabel}>Ratings {trend.rating}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>#2</Text>
          <Text style={styles.statLabel}> {trend.knownFor}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>7M+</Text>
          <Text style={styles.statLabel}>Conversations</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>{trend.description}</Text>

      {/* Ratings Section */}
      <Text style={styles.sectionTitle}>Ratings</Text>
      <View style={styles.ratingBarContainer}>
        <Text style={styles.starText}>{trend.rating}</Text>
        <View style={styles.ratingBar}>
          <View style={[styles.ratingBarFill, { width: '80%' }]} />
        </View>
      </View>

      {/* Start Chat Button */}
      <TouchableOpacity style={styles.chatButton}>
        <Text style={styles.chatButtonText}>Start chat</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
    padding: 20,
    alignSelf: 'center',
    width: '100%',
    maxWidth: Platform.select({ web: 600 }),
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    borderRadius: 40,
    marginTop: 20,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
  author: {
    color: '#aaa',
    fontSize: 14,
    textAlign: 'center',
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  iconButton: {
    backgroundColor: '#333',
    borderRadius: 20,
    padding: 8,
    marginHorizontal: 5,
  },
  iconText: {
    color: '#fff',
    fontSize: 14,
  },
  description: {
    color: '#ccc',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  statLabel: {
    color: '#aaa',
    fontSize: 12,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  conversationList: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  conversationItem: {
    backgroundColor: '#222',
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
  },
  conversationText: {
    color: '#fff',
    fontSize: 14,
  },
  ratingBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  starText: {
    color: '#fff',
    fontSize: 14,
    marginRight: 10,
  },
  ratingBar: {
    flex: 1,
    height: 10,
    backgroundColor: '#333',
    borderRadius: 5,
    overflow: 'hidden',
  },
  ratingBarFill: {
    height: '100%',
    backgroundColor: '#fff',
  },
  chatButton: {
    backgroundColor: '#444',
    borderRadius: 20,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  chatButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
