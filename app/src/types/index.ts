import {
  StyleProp,
  TextInputProps,
  TextStyle,
  ViewStyle,
  type TextProps,
} from 'react-native';

export type event = React.FormEvent<HTMLInputElement>;

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
  type?:
    | 'default'
    | 'title'
    | 'defaultSemiBold'
    | 'subtitle'
    | 'link'
    | 'textSm';
};

export interface GlobalContextProps {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
  ThemeToggle: (theme: 'light' | 'dark') => void;
  Posts: Post[];
}

export interface Post {
  id: string;
  author: User;
  description: string;
  content: string;
  image?: string;
  replies?: Reply[];
  repliesCount: number;
  likesCount: number;
  createdAt: string;
}

export interface Reply {
  id: string;
  author: User;
  content: string;
  likes: number;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  verified: boolean;
  photo: string;
  bio: string;
  link?: string;
  followers?: User[];
}

export interface FormFieldProps extends TextInputProps {
  title: string;
  value: string;
  placeholder?: string;
  handleChangeText: (text: string) => void;
  otherStyles?: StyleProp<ViewStyle>;
}

export type CustomButtonProps = {
  title: string;
  handlePress: () => void;
  containerStyles?: StyleProp<ViewStyle>;
  textStyles?: StyleProp<TextStyle>;
  isLoading?: boolean;
};
