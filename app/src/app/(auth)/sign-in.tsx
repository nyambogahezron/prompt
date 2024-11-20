import { useState } from 'react';
import Toast from 'react-native-toast-message';
import { SafeAreaView, StyleSheet } from 'react-native';
import { View, Text, ScrollView, Dimensions, Image } from 'react-native';
import AuthFormFooter from '../../components/AuthFormFooter';
import CustomButton from '@/components/CustomButton';
import FormField from '@/components/FormField';

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const submit = async () => {
    if (form.email === '' || form.password === '') {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please fill in all fields!',
      });

      return;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View
          style={[
            styles.innerContainer,
            { minHeight: Dimensions.get('window').height - 100 },
          ]}
        >
          <Image
            source={require('../../../assets/images/icon.png')}
            resizeMode='contain'
            style={styles.logo}
          />

          <Text style={styles.title}>Log in to Prompt</Text>

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
            title='Sign In'
            handlePress={submit}
            containerStyles={styles.button}
            isLoading={isLoading}
          />
          <AuthFormFooter
            text="Don't have an account?"
            linkText='Signup'
            link='/sign-up'
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#primary',
    height: '100%',
  },
  innerContainer: {
    width: '100%',
    justifyContent: 'center',
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

export default SignIn;
