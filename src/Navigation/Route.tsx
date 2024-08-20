import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MovieStack from './MovieStack';

const Route = () => {
  return (
    <NavigationContainer>
      <MovieStack />
    </NavigationContainer>
  );
};

export default Route;
