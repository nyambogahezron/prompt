import { View, Text, StyleSheet } from 'react-native';
type InfoBoxProps = {
  title: string | number;
  subtitle?: string;
  containerStyles?: string;
  titleStyles: string;
};

const InfoBox = ({
  title,
  subtitle,
  containerStyles,
  titleStyles,
}: InfoBoxProps) => {
  return (
    <View style={[styles.container, containerStyles && { ...containerStyles }]}>
      <Text style={[styles.title, titleStyles && { ...titleStyles }]}>
        {title}
      </Text>
      <Text style={styles.subtitle}>
        {subtitle}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // Add your container styles here
  },
  title: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'psemibold',
    // Add other title styles here
  },
  subtitle: {
    fontSize: 12,
    color: 'gray',
    textAlign: 'center',
    fontFamily: 'pregular',
    // Add other subtitle styles here
  },
});

export default InfoBox;
