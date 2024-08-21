/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import NavigationStrings from './src/Constants/NavigationStrings';
import { navigate } from './src/apis/pushNotification/NavigationService';

messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log('inside app quit state', remoteMessage.notification);
        console.log('hello');
        navigate(NavigationStrings.NOTIFICATION,{title:remoteMessage.notification.body});
      }
    });


AppRegistry.registerComponent(appName, () => App);
