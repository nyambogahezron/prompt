import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  Image,
  StyleSheet,
} from 'react-native';
import AuthFormFooter from '../../components/AuthFormFooter';
import Toast from 'react-native-toast-message';
import FormField from '@/components/FormField';
import CustomButton from '@/components/CustomButton';

const SignUp = () => {
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  });

  // sign -up the user and redirect to home page
  const submit = async () => {
    if (form.username === '' || form.email === '' || form.password === '') {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please fill in all fields!',
      });

      return;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        <View
          style={[
            styles.container,
            { minHeight: Dimensions.get('window').height - 100 },
          ]}
        >
          <Image
            source={require('../../../assets/images/icon.png')}
            resizeMode='contain'
            style={styles.logo}
          />

          <Text style={styles.title}>Sign Up to Prompt</Text>

          <FormField
            title='Username'
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles={styles.formField}
          />

          <FormField
            title='Email'
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles={styles.formField}
            keyboardType='email-address'
          />

          <FormField
            title='Password'
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles={styles.formField}
          />

          <CustomButton
            title='Sign Up'
            handlePress={submit}
            containerStyles={styles.button}
            isLoading={isSubmitting}
          />

          <AuthFormFooter
            text='Have an account already?'
            linkText='Login'
            link='/sign-in'
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#primary',
    height: '100%',
  },
  container: {
    width: '100%',
    justifyContent: 'center',
    height: '100%',
    paddingHorizontal: 16,
    marginVertical: 24,
  },
  logo: {
    width: 115,
    height: 34,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#fff',
    marginTop: 40,
    fontFamily: 'psemibold',
  },
  formField: {
    marginTop: 28,
  },
  button: {
    marginTop: 28,
  },
});

export default SignUp;
