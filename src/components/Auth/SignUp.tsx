import React, {useState} from 'react';
import {
  View,
  SafeAreaView,
  Image,
  Text,
  useWindowDimensions,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {useMutation} from 'react-query';
import {signUp} from '../../apis/api';
import {navigate} from '../../apis/pushNotification/NavigationService';
import NavigationStrings from '../../Constants/NavigationStrings';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignUp = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    verify_Password: '',
  });

  const {width} = useWindowDimensions();
  const marginHorizontal = width >= 800 ? wp(15) : wp(5);

  const mutation = useMutation(signUp, {
    onSuccess: data => {
      console.log('Sign-up successful:', data);
    },
    onError: error => {
      console.error('Error during sign-up:', error);
    },
  });

  const handleChange = (name: any, value: any) => {
    setForm({...form, [name]: value});
  };

  const handleSignUp = async () => {
    console.log(form.password, form.verify_Password);
    let fcm_token = await AsyncStorage.getItem('fcm_token');
    if (form.password !== form.verify_Password) {
      // Handle password mismatch, e.g., show an error message
      ToastAndroid.show('password do not match !', ToastAndroid.SHORT);

      return;
    }

    mutation.mutate({
      username: form.username,
      email: form.email,
      password: form.password,
      deviceToken: fcm_token,
    });
  };

  return (
    <SafeAreaView className="bg-black h-full">
      <View className="flex-1 justify-center" style={{marginHorizontal}}>
        <View className="justify-center items-center">
          <Image
            source={{
              uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGZhYUrmk6vDmi1-Pj7oI-HzTpQDCi9-IFTA&s',
            }}
            className="h-20 w-20 rounded-full"
          />
        </View>
        {['username', 'email', 'password', 'verify_Password'].map(field => (
          <TextInput
            key={field}
            label={
              field === 'verify_Password'
                ? 'Verify_Password'
                : field.charAt(0).toUpperCase() + field.slice(1)
            }
            // value={form[field]}
            onChangeText={value => handleChange(field, value)}
            secureTextEntry={
              field === 'password' || field === 'verify_Password'
            }
            className="mb-4 bg-black  text-lg"
            textColor="gray"
          />
        ))}
        <View className="mt-5">
          <Button className="bg-red-700 rounded-md" onPress={handleSignUp}>
            <Text className="text-white/80">Sign Up</Text>
          </Button>
        </View>
        <View className="flex-row mt-2 justify-end">
          <Text className="text-white/80 text-right ">
            Already have an account?
          </Text>
          <TouchableOpacity onPress={() => navigate(NavigationStrings.LOGIN)}>
            <Text className="text-white/80 text-right "> Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;
