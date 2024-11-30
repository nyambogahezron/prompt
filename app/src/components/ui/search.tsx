import { SearchInputProps } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, TouchableOpacity, TextInput, StyleSheet } from 'react-native';

const SearchInput = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}: SearchInputProps) => {
  return (
    <View style={[styles.container, otherStyles]}>
      <TextInput
        style={styles.textInput}
        value={value}
        placeholder={placeholder}
        placeholderTextColor='#CDCDE0'
        onChangeText={handleChangeText}
        {...props}
      />

      <TouchableOpacity>
        <Ionicons
          name='search'
          size={24}
          color='#FFFFFF'
          style={styles.image}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 64,
    paddingHorizontal: 16,
    backgroundColor: '#000000',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#333333',
  },
  textInput: {
    textAlign: 'left',
    alignItems: 'center',
    color: '#FFFFFF',
    flex: 1,
    fontFamily: 'pregular',
  },
  image: {
    alignItems: 'center',
    marginTop: 16,
    width: 20,
    height: 20,
  },
});

export default SearchInput;
