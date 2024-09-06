import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  useWindowDimensions,
} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {IMAGE_URL} from '../../../config';
import NavigationStrings from '../../Constants/NavigationStrings';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {useQuery} from 'react-query';
import {
  animation_movies,
  comedy_movies,
  horror_movies,
  romance_movies,
  scifi_movies,
  upcoming_movies,
  western_movies,
} from '../../apis/api';
import {Button} from 'react-native-paper';

type ExploreAllScreenRouteProp = RouteProp<
  {params: {title: string; movies: any}},
  'params'
>;

const ExploreAll = () => {
  const {width} = useWindowDimensions();
  const route = useRoute<ExploreAllScreenRouteProp>();
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [currentPage, setCurrentPage] = useState<number>(1);

  //for showing grid items based on screen size
  const numColumns = width < 768 ? 2 : 3;

  const {title} = route.params;

  const {
    data: moviesData,
    isLoading,
    isError,
  } = useQuery(
    [title, currentPage],
    () => {
      switch (title) {
        case 'upcoming':
          return upcoming_movies(currentPage);
        case 'horror':
          return horror_movies(currentPage);
        case 'romance':
          return romance_movies(currentPage);
        case 'animation':
          return animation_movies(currentPage);
        case 'comedy':
          return comedy_movies(currentPage);
        case 'western':
          return western_movies(currentPage);
        case 'scifi':
          return scifi_movies(currentPage);
        default:
          return Promise.resolve({movies: [], hasMore: false});
      }
    },
    {
      keepPreviousData: true,
    },
  );

  const fetchNextPage = () => {
    console.log(currentPage);
    setCurrentPage(prevPage => prevPage + 1);
  };

  const fetchPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  const GridItem = ({item}: any) => (
    <TouchableOpacity
      className="flex-1 m-1.5 rounded-lg overflow-hidden bg-white"
      onPress={() =>
        navigation.replace(NavigationStrings.DETAIL, {movieId: item?.id})
      }>
      <Image
        source={{
          uri: item
            ? `${IMAGE_URL}/${item.backdrop_path}`
            : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8JrNcJV0PaRPCm3vBRGmxdAE1B993db_Xig',
        }}
        className={`w-full`}
        style={{height: hp(25)}} // Dynamic height still using hp
      />
      <View className="absolute bottom-0 left-0 right-0 p-2.5 bg-black/50">
        <Text className="text-white text-base font-bold">
          {item.title?.length > 30
            ? `${item.title.slice(0, 30)}...`
            : item.title}
        </Text>
        <Text className="text-white text-sm">
          Rating: {item?.vote_average?.toFixed(1)}
        </Text>
      </View>
    </TouchableOpacity>
  );

  if (isLoading) return <Text>Loading...</Text>;
  if (isError) return <Text>Error loading movies</Text>;

  return (
    <SafeAreaView className="bg-[#111]">
      <View className="h-full">
        <Text className="text-white text-2xl p-5 font-bold">{title}</Text>
        <FlatList
          data={moviesData?.movies}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => <GridItem item={item} />}
          numColumns={numColumns} // Number of columns in the grid
          contentContainerStyle={{padding: 5}}
        />
        <View className="flex-row justify-between p-2">
          <Button
            onPress={fetchPrevPage}
            className="bg-cyan-900 rounded-full"
            disabled={currentPage === 1 ? true : false}>
            <Text className="text-white tracking-widest font-bold">
              Previous
            </Text>
          </Button>
          <Button
            className="bg-cyan-900 rounded-full"
            onPress={fetchNextPage}
            disabled={moviesData?.success === false}>
            <Text className="text-white tracking-widest font-bold">Next</Text>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ExploreAll;
