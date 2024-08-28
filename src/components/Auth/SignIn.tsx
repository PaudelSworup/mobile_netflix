import React, {useState} from 'react';
import {
  View,
  SafeAreaView,
  Image,
  Text,
  useWindowDimensions,
} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

const SignIn = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const {width} = useWindowDimensions();
  const marginHorizontal = width >= 800 ? wp(15) : wp(5);

  const handleChange = (name: any, value: any) =>
    setForm({...form, [name]: value});

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
          <Button className="bg-red-700 rounded-md">
            <Text className="text-white/80">Sign In</Text>
          </Button>
        </View>
        <Text className="text-white/80 text-right mt-2 ">
          Don't have an account? Sign Up
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;
