import {View, Text, Image, FlatList, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {IMAGE_URL} from '../../../config';
import {StarIcon} from 'react-native-heroicons/solid';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {overFlow} from '../../utils/utils';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {moviesProps} from '../../interfaces/interface';
import NavigationStrings from '../../Constants/NavigationStrings';
import Skeleton from '../../utils/Skeleton';

const Row: React.FC<{title: string; movies?: any}> = ({title, movies}) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if movies data is loaded
    if (movies && movies.length > 0) {
      setLoading(false);
    }
  }, [movies]);

  const MovieItem: React.FC<{item: moviesProps}> = React.memo(({item}) => (
    <View
      className="relative"
      style={{
        borderRadius: 20,
        marginRight: 10,
      }}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(NavigationStrings.DETAIL, {movieId: item?.id})
        }>
        <Image
          source={{
            uri: item
              ? `${IMAGE_URL}/${item.backdrop_path}`
              : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8JrNcJV0PaRPCm3vBRGmxdAE1B993db_Xig',
          }}
          // style={{height: 160, width: 250, borderRadius: 20}}
          style={{height: hp(20), width: wp(60), borderRadius: 20}}
        />
      </TouchableOpacity>
      <View
        className="absolute bottom-0 h-[70px] p-2  w-full "
        style={{
          backgroundColor: 'rgba(255,255,255,0.2)',
          borderBottomLeftRadius: 20,
        }}>
        <Text className="text-white font-bold text-base tracking-wide ">
          {overFlow(item?.title, 25)}
        </Text>
        <View className="flex-row items-center space-x-1">
          <StarIcon size={22} color="yellow" />
          <Text className="text-white text-base">
            {item?.vote_average.toFixed(1)}
          </Text>
        </View>
      </View>
    </View>
  ));

  return (
    <View className="mt-3">
      <View className="flex-row  justify-between">
        <Text className="text-lg font-bold text-white tracking-wider">
          {title}
        </Text>
        <Text className="font-light tracking-tight text-sm text-white">
          See All
        </Text>
      </View>
      {loading ? ( // Render skeleton if loading state
        <Skeleton />
      ) : (
        // Render movie items if data is loaded
        <FlatList
          horizontal
          data={movies}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => <MovieItem item={item} />}
          contentContainerStyle={{marginTop: 5, marginLeft: 2}} // Adjust spacing as needed
        />
      )}
    </View>
  );
};

export default Row;
