import {type TextProps } from "react-native";

export type TabBarProps = {
  state: any;
  descriptors: any;
  navigation: any;
};

export type Icons = {
  [key: string]: (props: any) => JSX.Element;
};

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};
