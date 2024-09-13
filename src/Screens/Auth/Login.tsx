import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import SignIn from '../../components/Auth/SignIn';
import {requestUserPermission} from '../../apis/pushNotification/notification';

const Login = () => {
  useEffect(() => {
    requestUserPermission();
  }, []);
  return <SignIn />;
};

export default Login;
