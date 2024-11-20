import React from 'react';
import { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  TextInput,
  TextInputProps,
  StyleProp,
  ViewStyle,
  StyleSheet,
} from 'react-native';
import { icons } from '../constants';

interface SearchInputProps extends TextInputProps {
  title?: string;
  value?: string;
  placeholder?: string;
  handleChangeText?: (text: string) => void;
  otherStyles?: StyleProp<ViewStyle>;
  initialQuery?:string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}) => {
  return (
    <View
      style={[styles.container, otherStyles]}
    >
      <TextInput
        style={styles.textInput}
        value={value}
        placeholder={placeholder}
        placeholderTextColor='#CDCDE0'
        onChangeText={handleChangeText}
        {...props}
      />

      <TouchableOpacity>
        <Image source={icons.search} style={styles.image} resizeMode='contain' />
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
