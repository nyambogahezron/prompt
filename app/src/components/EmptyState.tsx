import { router } from 'expo-router';
import { View, Text, Image, StyleSheet } from 'react-native';
import { images } from '../constants';
import CustomButton from './CustomButton';

type EmptyStateProps = {
  title: string;
  subtitle: string;
};
const EmptyState = ({ title, subtitle }: EmptyStateProps) => {
  return (
    <View style={styles.container}>
      <Image
        source={images.empty}
        resizeMode='contain'
        style={styles.image}
      />

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>
        {subtitle}
      </Text>

      <CustomButton
        title='create video'
        handlePress={() => router.push('/create')}
        containerStyles={styles.buttonContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  image: {
    width: 270,
    height: 216,
  },
  title: {
    fontSize: 14,
    fontFamily: 'pmedium',
    color: '#D1D5DB',
  },
  subtitle: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'psemibold',
    color: '#FFFFFF',
    marginTop: 8,
  },
  buttonContainer: {
    width: '100%',
    marginVertical: 20,
  },
});

export default EmptyState;
