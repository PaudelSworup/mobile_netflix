import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import {Alert} from 'react-native';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    getFCMToken();
  }
}

export async function notificationListner() {
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log('inside app bg state', remoteMessage.notification);
  });

  messaging().onMessage(async (remoteMessage: any) => {
    console.log('inside app foreground state', remoteMessage.notification);
    // Show alert when the notification is received in the foreground

    return Alert.alert(
      'New Notification',
      remoteMessage.notification?.body,
      [{text: 'OK'}],
      {
        cancelable: true,
      },
    );
  });
}

async function getFCMToken() {
  try {
    await messaging().registerDeviceForRemoteMessages();

    let fcm_token = await AsyncStorage.getItem('fcm_token');
    if (!!fcm_token) {
      console.log('OLD FCM token found', fcm_token);
    } else {
      const token = await messaging().getToken();
      await AsyncStorage.setItem('fcm_token', token);
      console.log('NEW FCM token found', token);
    }
  } catch (err) {}
}
