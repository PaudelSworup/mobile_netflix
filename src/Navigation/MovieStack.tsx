import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  ExploreAll,
  Movie,
  MovieDetail,
  MovieNotification,
  Netflix,
  Profile,
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
      <Stack.Screen
        name={NavigationStrings.EXPLORE_ALL}
        component={ExploreAll}
      />
      <Stack.Screen
        name={NavigationStrings.PROFILE}
        component={Profile}
        options={{
          headerShown: true,
          headerStyle: {backgroundColor: 'black'},
          headerTintColor: 'white',
          headerTitle: '',
        }}
      />
    </Stack.Navigator>
  );
};

export default MovieStack;
