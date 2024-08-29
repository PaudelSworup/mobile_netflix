import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  Movie,
  MovieDetail,
  MovieNotification,
  Netflix,
  SignIn,
  SignUp,
} from '../Screens';
import NavigationStrings from '../Constants/NavigationStrings';

const Stack = createNativeStackNavigator();
const MovieStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={NavigationStrings.LOADING}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name={NavigationStrings.REGISTER} component={SignUp} />
      <Stack.Screen name={NavigationStrings.LOGIN} component={SignIn} />
      <Stack.Screen name={NavigationStrings.LOADING} component={Netflix} />
      <Stack.Screen name={NavigationStrings.MOVIE} component={Movie} />
      <Stack.Screen name={NavigationStrings.DETAIL} component={MovieDetail} />
      <Stack.Screen
        name={NavigationStrings.NOTIFICATION}
        component={MovieNotification}
      />
    </Stack.Navigator>
  );
};

export default MovieStack;
