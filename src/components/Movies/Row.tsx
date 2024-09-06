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
          style={{height: hp(25), width: wp(65), borderRadius: 20}}
          blurRadius={2}
        />
      </TouchableOpacity>
      <View
        className="absolute bottom-0 h-[70px] p-2  w-full "
        style={{
          backgroundColor: 'rgba(0,0,0,0.59)',
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        }}>
        <Text className="text-white/70 font-bold text-base tracking-wide ">
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
      <View className="flex-row p-2 justify-between">
        <Text
          className="text-lg uppercase font-bold text-white tracking-wider"
          style={{fontSize: hp(2)}}>
          {title}
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(NavigationStrings.EXPLORE_ALL, {
              title, // Pass the title of the movie category
              movies, // Pass the movies array
            });
          }}>
          <Text
            className="font-extralight tracking-tight text-lg text-white"
            style={{fontSize: hp(2)}}>
            Explore all
          </Text>
        </TouchableOpacity>
      </View>
      {Object.values(movies).every((movies: any) => movies.length === 0) ? (
        <Skeleton />
      ) : (
        /* {loading ? ( // Render skeleton if loading state
        <Skeleton /> */
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
