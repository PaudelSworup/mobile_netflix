import {View, Text, SafeAreaView, StatusBar} from 'react-native';
import React, {useEffect} from 'react';
import LottieView from 'lottie-react-native';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import NavigationStrings from '../../Constants/NavigationStrings';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useAppSelector} from '../../store/store';

const Netflix = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const {token, userInfo} = useAppSelector(state => state.auth);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (userInfo && token) {
        navigation.navigate(NavigationStrings.MOVIE);
      } else {
        navigation.navigate(NavigationStrings.LOGIN);
      }
    }, 5000);

    // Clear timeout on component unmount
    return () => clearTimeout(timeout);
  }, [navigation]);
  return (
    <SafeAreaView>
      <View className="h-screen justify-center items-center bg-black/95">
        <StatusBar barStyle={'light-content'} backgroundColor={'black'} />
        <LottieView
          autoPlay
          style={{width: 200, height: 200}}
          source={require('../../../assets/netflix.json')}
        />
      </View>
    </SafeAreaView>
  );
};

export default Netflix;
