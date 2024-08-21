import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MovieStack from './MovieStack';
import {navigationRef} from '../apis/pushNotification/NavigationService';

const Route = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <MovieStack />
    </NavigationContainer>
  );
};

export default Route;
