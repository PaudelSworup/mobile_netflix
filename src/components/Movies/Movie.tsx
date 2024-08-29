import {
  View,
  Text,
  SafeAreaView,
  Image,
  StatusBar,
  Animated,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
// import {Searchbar} from 'react-native-paper';
import Row from './Row';

import {useQuery} from 'react-query';
import MovieBanner from './MovieBanner';
import {
  comedy_movies,
  horror_movies,
  romance_movies,
  scifi_movies,
  upcoming_movies,
} from '../../apis/api';
import SkeletonLoading from '../../utils/SkeletonLoading';
import {Searchbar} from 'react-native-paper';
import {useAppSelector} from '../../store/store';

const Movie = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const {userInfo} = useAppSelector(state => state.auth);
  const scrollY = useRef(new Animated.Value(0)).current;

  //fetching the list of movies
  const [moviesData, setMoviesData] = useState({
    upcoming: [],
    scifi: [],
    comedy: [],
    horror: [],
    romance: [],
  });

  const fetchMovies = (key: any, apiCall: any) =>
    useQuery(key, apiCall, {
      onSettled: (data: any) => {
        setMoviesData(prev => ({...prev, [key]: data?.movies}));
      },
    });

  fetchMovies('upcoming', upcoming_movies);
  fetchMovies('scifi', scifi_movies);
  fetchMovies('comedy', comedy_movies);
  fetchMovies('horror', horror_movies);
  fetchMovies('romance', romance_movies);

  const headerBackgroundColor = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: ['transparent', 'black'],
    extrapolate: 'clamp',
  });

  return (
    <SafeAreaView className="h-full  pb-2 bg-[#272728]">
      <StatusBar
        translucent
        backgroundColor="transparent"
        hidden
        // barStyle="light-content"
      />
      {Object.values(moviesData).every(movies => movies.length === 0) ? (
        <SkeletonLoading />
      ) : (
        <>
          <Animated.View
            style={{
              backgroundColor: headerBackgroundColor,
            }}
            className="flex-row justify-between bg-black py-3 px-2">
            <View>
              <Text className="text-[20px] tracking-wider text-white font-bold">
                Hello {userInfo?.username}
              </Text>
              <Text className="font-light text-white tracking-tight">
                What to Watch?
              </Text>
            </View>
            <View>
              <Image
                source={{
                  uri: 'https://img.freepik.com/premium-vector/beard-man-logo_671039-606.jpg',
                }}
                style={{width: 50, height: 50, borderRadius: 50}}
              />
            </View>
          </Animated.View>

          <Animated.ScrollView
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {y: scrollY}}}],
              {useNativeDriver: false},
            )}
            className="px-2">
            <View className="py-1">
              <Searchbar
                className="h-[50px]"
                placeholder="Search"
                onChangeText={setSearchQuery}
                value={searchQuery}
              />
            </View>

            <View className="py-2">
              <MovieBanner />
            </View>

            {Object.entries(moviesData).map(([title, movies]) => {
              // console.log('Title:', title);
              // console.log('Movies:', movies);

              return <Row key={title} title={title} movies={movies} />;
            })}
          </Animated.ScrollView>
        </>
      )}
    </SafeAreaView>
  );
};

export default Movie;
