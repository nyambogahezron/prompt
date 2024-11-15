import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons as Icon, FontAwesome6 } from '@expo/vector-icons';

const ActionButtons = ({
  replies,
  likes,
}: {
  replies?: number;
  likes?: number;
}) => {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity style={styles.button}>
          <Icon name='arrow-up-outline' size={22} color='#ccc' />
          <Text style={styles.text}>{likes}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Icon name='arrow-down-outline' size={22} color='#ccc' />
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Icon name='chatbubble-outline' size={22} color='#ccc' />
          <Text style={styles.text}>{replies}</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <TouchableOpacity style={styles.button}>
          <Icon name='bookmark-outline' size={22} color='#ccc' />
        </TouchableOpacity>
        {/* copy */}
        <TouchableOpacity style={styles.button}>
          <FontAwesome6 name='copy' size={22} color='#ccc' />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    marginLeft: -20,
    marginTop: 5,
    marginBottom: -20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 8,
    padding: 3,
  },
  text: {
    marginLeft: 4,
    color: '#ccc',
    fontSize: 14,
  },
});

export default ActionButtons;
