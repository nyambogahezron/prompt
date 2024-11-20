import { Platform, ToastAndroid, Alert } from 'react-native';
export const Toaster = (message: string) => {
  if (Platform.OS === 'android') {
    ToastAndroid.showWithGravity(
      message,
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM
    );
  }
  if (Platform.OS === 'ios') {
    Alert.alert(message);
  }

  if (Platform.OS === 'web') {
    alert(message);
  }
};
