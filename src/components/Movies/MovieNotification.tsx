import {View, Text} from 'react-native';
import React from 'react';
import {
  useRoute,
  RouteProp,
  useNavigation,
  ParamListBase,
} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Button} from 'react-native-paper';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import NavigationStrings from '../../Constants/NavigationStrings';

type RootStackParamList = {
  movieTitle: {title?: string};
};

const MovieNotification = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'movieTitle'>>();
  const {title} = route.params;

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  return (
    <SafeAreaView className="px-2 py-3 bg-black/90 h-full">
      <View className="justify-between flex-1">
        <Text
          className="text-white/70 tracking-wider font-sans"
          style={{fontSize: hp(3)}}>
          Movie {title} has been added
        </Text>
        <Button
          className="rounded-md bg-sky-700"
          onPress={() => navigation.navigate(NavigationStrings.MOVIE)}>
          <Text className="text-white">Go Back</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default MovieNotification;
