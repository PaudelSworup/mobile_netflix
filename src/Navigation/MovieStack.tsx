import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Movie, MovieDetail} from '../Screens';
import NavigationStrings from '../Constants/NavigationStrings';

const Stack = createNativeStackNavigator();
const MovieStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={NavigationStrings.MOVIE}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name={NavigationStrings.MOVIE} component={Movie} />
      <Stack.Screen name={NavigationStrings.DETAIL} component={MovieDetail} />
    </Stack.Navigator>
  );
};

export default MovieStack;