import {View, Text, SafeAreaView, StatusBar} from 'react-native';
import React, {useEffect} from 'react';
import LottieView from 'lottie-react-native';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import NavigationStrings from '../../Constants/NavigationStrings';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

const Netflix = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.replace(NavigationStrings.MOVIE); // Replace to avoid going back to the loading screen
    }, 5000); // 6 seconds delay

    // Clean up the timeout if the component unmounts
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
