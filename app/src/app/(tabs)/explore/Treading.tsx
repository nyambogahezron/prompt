import { ThemedText } from '@/components/Themed/ThemedText';
import { TreadingItemsDate } from '@/data';
import { TreadingItem } from '@/types';
import { blurHash } from '@/utils/blurHash';
import { useNavigation } from 'expo-router';
import { Image } from 'expo-image';
import React, { useState } from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  Platform,
  Dimensions,
  Pressable,
} from 'react-native';
const width = Dimensions.get('window').width;

export default function Treading() {
  const fallbackImage = require('@assets/images/robot.png');
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const navigation = useNavigation();

  const renderItem = ({ item }: { item: TreadingItem }) => (
    <Pressable
      style={styles.itemContainer}
      // @ts-ignore
      onPress={() => navigation.navigate('trend-details', { item })}
    >
      <Image
        placeholder={blurHash}
        source={failedImages[item.id] ? fallbackImage : { uri: item.icon }}
        style={styles.icon}
        contentFit='contain'
        transition={200}
        onError={() => {
          setFailedImages((prev) => ({
            ...prev,
            [item.id]: true,
          }));
        }}
      />
      <View style={styles.textContainer}>
        <ThemedText style={styles.title}>{item.title}</ThemedText>
        <ThemedText style={styles.description}>
          {item.description.length > 100
            ? item.description.substring(0, 100) + '...'
            : item.description}
        </ThemedText>
        <ThemedText style={styles.author}>{item.author}</ThemedText>
      </View>
    </Pressable>
  );

  return (
    <FlatList
      data={TreadingItemsDate}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      style={styles.container}
      contentContainerStyle={{
        paddingTop: Platform.select({ android: 2 }),
        paddingHorizontal: 10,
        paddingBottom: 20,
        marginTop: 20,
        justifyContent: 'center',
        alignContent: 'center',
        alignSelf: 'center',
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 5,
    width: Platform.select({
      ios: width - 20,
      android: width - 20,
      web: width,
    }),
    maxWidth: Platform.select({ web: 600 }),
  },
  icon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    color: '#ccc',
    fontSize: 14,
  },
  author: {
    color: '#888',
    fontSize: 12,
  },
});
