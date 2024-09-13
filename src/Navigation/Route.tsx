import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MovieStack from './MovieStack';
import {navigationRef} from '../apis/pushNotification/NavigationService';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const Route = () => {
  return (
    <GestureHandlerRootView>
      <NavigationContainer ref={navigationRef}>
        <MovieStack />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default Route;
