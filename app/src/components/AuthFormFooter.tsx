import { Link } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
type AuthFormFooterProps = {
  text: string;
  linkText: string;
  link: string;
};
const AuthFormFooter = ({ text, linkText, link }: AuthFormFooterProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
      <Link href={link} style={styles.link}>
        {linkText}
      </Link>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 5,
    gap: 2,
  },
  text: {
    fontSize: 18,
    color: '#D1D5DB',
    fontFamily: 'pregular',
  },
  link: {
    fontSize: 18,
    fontFamily: 'psemibold',
    color: '#6B7280',
  },
});
export default AuthFormFooter;

// boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)';