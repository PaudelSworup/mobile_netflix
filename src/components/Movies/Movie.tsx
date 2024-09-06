import {
  View,
  Text,
  SafeAreaView,
  Image,
  StatusBar,
  Animated,
  Alert,
  BackHandler,
} from 'react-native';
import React, {useCallback, useRef, useState} from 'react';
import Row from './Row';

import {useQuery} from 'react-query';
import MovieBanner from './MovieBanner';
import {
  comedy_movies,
  horror_movies,
  romance_movies,
  scifi_movies,
  upcoming_movies,
  western_movies,
} from '../../apis/api';
import SkeletonLoading from '../../utils/SkeletonLoading';
import {Searchbar} from 'react-native-paper';
import {useAppSelector} from '../../store/store';
import SearchResults from './searchResults';
import {useFocusEffect} from '@react-navigation/native';

const Movie = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const {userInfo} = useAppSelector(state => state.auth);
  const scrollY = useRef(new Animated.Value(0)).current;

  //utility func to shuffle the list of movies
  const shuffleArray = (array: any) => {
    return array.sort(() => Math.random() - 0.5);
  };

  //fetching the list of movies
  const [moviesData, setMoviesData] = useState({
    upcoming: [],
    scifi: [],
    comedy: [],
    horror: [],
    romance: [],
    western: [],
  });

  const fetchMovies = (key: any, apiCall: any) =>
    useQuery(key, () => apiCall(1), {
      onSettled: (data: any) => {
        // console.log(data?.movies);
        const shuffledMovies = shuffleArray(data?.movies || []);
        setMoviesData(prev => ({...prev, [key]: data?.movies}));
        // setMoviesData(prev => ({...prev, [key]: shuffledMovies}));
      },
    });

  fetchMovies('upcoming', upcoming_movies);
  fetchMovies('scifi', scifi_movies);
  fetchMovies('comedy', comedy_movies);
  fetchMovies('horror', horror_movies);
  fetchMovies('romance', romance_movies);
  fetchMovies('western', western_movies);

  const headerBackgroundColor = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: ['transparent', 'black'],
    extrapolate: 'clamp',
  });

  const filteredMovies = Object.values(moviesData)
    .flat()
    .filter((movie: any) =>
      movie?.title?.toLowerCase().includes(searchQuery.toLowerCase()),
    );

  const handleBackPress = useCallback(() => {
    // Show Alert when back button is pressed
    Alert.alert(
      'Hold on!',
      'Are you sure you want to exit?',
      [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: 'YES',
          onPress: () => BackHandler.exitApp(),
        },
      ],
      {cancelable: false},
    );

    // setBackPressedOnce(true);
    // setTimeout(() => setBackPressedOnce(false), 2000);

    // Return true to prevent the default back button action
    return true;
  }, []);

  useFocusEffect(
    useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', handleBackPress);
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
      };
    }, [handleBackPress]),
  );

  return (
    <SafeAreaView className="h-full  pb-2 bg-[#272728]">
      <StatusBar
      // backgroundColor="black"
      // barStyle="light-content"
      />
      {moviesData &&
      Object?.values(moviesData).every(
        (movies: any) => movies?.length === 0,
      ) ? (
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

          <View className="py-5 px-5">
            <Searchbar
              className="h-[50px] rounded-md"
              placeholder="Search"
              onChangeText={setSearchQuery}
              value={searchQuery}
            />
          </View>

          {searchQuery.length > 0 && <SearchResults movies={filteredMovies} />}

          <Animated.ScrollView
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {y: scrollY}}}],
              {useNativeDriver: false},
            )}
            className="px-2">
            <View className="py-2">
              <MovieBanner />
            </View>

            {Object.entries(moviesData).map(([title, movies]) => {
              return <Row key={title} title={title} movies={movies} />;
            })}
          </Animated.ScrollView>
        </>
      )}
    </SafeAreaView>
  );
};

export default Movie;
