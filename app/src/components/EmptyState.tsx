import { router } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import CustomButton from './CustomButton';
import { Ionicons } from '@expo/vector-icons';

type EmptyStateProps = {
  title: string;
  subtitle: string;
};
const EmptyState = ({ title, subtitle }: EmptyStateProps) => {
  return (
    <View style={styles.container}>
      <Ionicons name='videocam' size={100} color='#FFFFFF' />

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>

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
