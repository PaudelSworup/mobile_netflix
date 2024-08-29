import React, {useState} from 'react';
import {
  View,
  SafeAreaView,
  Image,
  Text,
  useWindowDimensions,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {navigate} from '../../apis/pushNotification/NavigationService';
import NavigationStrings from '../../Constants/NavigationStrings';
import {useMutation} from 'react-query';
import {signIn} from '../../apis/api';
import {useDispatch} from 'react-redux';
import {loginSuccess} from '../../store/userSlice';

const SignIn = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const {width} = useWindowDimensions();
  const marginHorizontal = width >= 800 ? wp(15) : wp(5);

  const mutation = useMutation(signIn, {
    onSuccess: response => {
      console.log('Sign-in successful:', response);
      if (response.success === true) {
        dispatch(
          loginSuccess({
            token: response.token,
            userInfo: {
              _id: response.user._id,
              email: response.user.email,
              username: response.user.username,
            },
          }),
        );
        navigate(NavigationStrings.MOVIE);
      } else {
        ToastAndroid.show(response.error, ToastAndroid.SHORT);
      }
    },
    onError: error => {
      console.error('Error during sign-in:', error);
    },
  });

  const handleChange = (name: any, value: any) =>
    setForm({...form, [name]: value});

  const handleSignIn = () => {
    mutation.mutate({
      email: form.email,
      password: form.password,
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
        {['email', 'password'].map(field => (
          <TextInput
            key={field}
            label={field.charAt(0).toUpperCase() + field.slice(1)}
            // value={form[field]}
            onChangeText={value => handleChange(field, value)}
            secureTextEntry={field.includes('password')}
            className="mb-4 bg-black  text-lg"
            textColor="gray"
          />
        ))}
        <View className="mt-5">
          <Button className="bg-red-700 rounded-md" onPress={handleSignIn}>
            <Text className="text-white/80">Sign In</Text>
          </Button>
        </View>
        <View className="flex-row mt-2 justify-end">
          <Text className="text-white/80 text-right">
            Don't have an account?
          </Text>
          <TouchableOpacity
            onPress={() => navigate(NavigationStrings.REGISTER)}>
            <Text className="text-white/80 text-right"> Signup</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;
