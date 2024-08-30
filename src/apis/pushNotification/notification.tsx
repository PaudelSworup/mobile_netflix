import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import {Alert, Platform, PermissionsAndroid} from 'react-native';
import {navigate} from './NavigationService';
import NavigationStrings from '../../Constants/NavigationStrings';

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
    navigate(NavigationStrings.NOTIFICATION, {
      title: remoteMessage?.notification.body,
    });
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

export const checkApplicationPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
    } catch (error) {}
  }
};
