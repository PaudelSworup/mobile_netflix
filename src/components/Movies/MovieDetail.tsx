import {
  View,
  Text,
  ScrollView,
  Image,
  StatusBar,
  TouchableOpacity,
  Alert,
  BackHandler,
  FlatList,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {
  ParamListBase,
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {useQuery} from 'react-query';
import {
  movies_cast,
  movies_videos,
  recommended_movies,
  single_movies,
} from '../../apis/api';

import {
  ArrowsPointingOutIcon,
  PlayIcon,
  XMarkIcon,
} from 'react-native-heroicons/solid';
// import Video from 'react-native-video';
import Orientation from 'react-native-orientation-locker';
import {ActivityIndicator, Button, Snackbar} from 'react-native-paper';
import {overFlow} from '../../utils/utils';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import YoutubePlayer from 'react-native-youtube-iframe';
import {StarIcon} from 'react-native-heroicons/solid';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {IMAGE_URL} from '../../../config';
import NavigationStrings from '../../Constants/NavigationStrings';
import LottieView from 'lottie-react-native';

type RootStackParamList = {
  movieDetailID: {movieId?: number};
};
const MovieDetail = () => {
  const [fullScreen, setFullScreen] = useState<boolean>(false);
  const [movies, setMovies] = useState<any>();
  const [showVideo, setShowVideo] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [videos, setVideos] = useState<any>();
  const [cast, setCast] = useState<any>();
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [backPressedOnce, setBackPressedOnce] = useState(false);
  const [recommended, setRecommended] = useState<any>();

  const route = useRoute<RouteProp<RootStackParamList, 'movieDetailID'>>();
  const {movieId} = route.params;

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const singleMovies = useQuery(
    ['movieDetails', movieId],
    async () => single_movies(movieId as number),
    {
      onSettled: data => setMovies(data?.movies),
    },
  );

  const recommendedMovies = useQuery(
    ['recommended', movieId],
    async () => recommended_movies(movieId as number),
    {
      onSettled: data => setRecommended(data?.movies),
    },
  );

  // console.log(movies);

  const genres = movies?.genres?.map(
    (genre: {id: number; name: string}) => genre.name,
  );

  const names = genres?.slice(0, 3).join(', ');

  const moviesVideos = useQuery(
    ['movieVideo', movieId],
    async () => movies_videos(movieId as number),
    {
      onSettled: data => setVideos(data?.movies),
      // enabled: !movieId,
    },
  );

  const getCasts = useQuery(
    ['movieCasts', movieId],
    async () => movies_cast(movieId as number),
    {
      onSettled: data => setCast(data?.casts),
      // enabled: !movieId,
    },
  );

  const handleOrientationChange = () => {
    if (fullScreen) {
      Orientation.lockToPortrait();
    } else {
      Orientation.lockToLandscape();
    }
    setFullScreen(!fullScreen);
  };

  const handleBackPress = useCallback(() => {
    if (backPressedOnce) {
      // If back button is pressed twice within a certain time frame, navigate back
      if (navigation.canGoBack()) {
        navigation.goBack();
      } else {
        navigation.navigate(NavigationStrings.MOVIE); // Fallback to a different screen if no previous screen is available
      }
      return true;
    }

    // Show Snackbar when back button is pressed
    setSnackbarVisible(true);

    setBackPressedOnce(true);
    setTimeout(() => setBackPressedOnce(false), 2000);

    // Return true to prevent the default back button action
    return true;
  }, [navigation, backPressedOnce]);

  useFocusEffect(
    useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', handleBackPress);
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
      };
    }, [handleBackPress]),
  );

  const onStateChange = useCallback((state: any) => {
    if (state === 'ended') {
      setPlaying(false);
      Alert.alert('video has finished playing!');
    }
  }, []);

  //cast item for flat list
  const CastItem = React.memo(({item}: any) => (
    <View className="flex-row  space-x-1 mt-1 items-center">
      <Image
        source={{
          // uri: 'https://marketplace.canva.com/EAFltPVX5QA/1/0/800w/canva-cute-cartoon-anime-girl-avatar-D4brQth3b2I.jpg',
          uri: `${IMAGE_URL}${item?.profile_path}`,
        }}
        className="rounded-full"
        style={{height: 90, width: 90, borderRadius: 50}}
      />
      <View className="p-4">
        <Text className="text-[#cbc9c9]/80" style={{fontSize: hp(1.4)}}>
          Actor
        </Text>
        <Text
          className="text-[#cbc9c9]/80  font-bold tracking-wider"
          style={{fontSize: hp(1.89)}}>
          {item?.name}
        </Text>
      </View>
    </View>
  ));

  const GridItem = ({item}: any) => {
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() =>
          navigation.replace(NavigationStrings.DETAIL, {movieId: item?.id})
        }>
        <Image
          source={{
            uri: item
              ? `${IMAGE_URL}/${item.backdrop_path}`
              : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8JrNcJV0PaRPCm3vBRGmxdAE1B993db_Xig',
          }}
          style={styles.image}
        />
        <View style={styles.overlay}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.rating}>
            Rating: {item?.vote_average.toFixed(1)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  if (moviesVideos?.isLoading) {
    return (
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#111',
        }}>
        <LottieView
          autoPlay
          style={{width: 200, height: 200, backgroundColor: '#111'}}
          source={require('../../../assets/loading.json')}
        />
        {/* <ActivityIndicator size="large" animating={true} color="#0000ff" /> */}
      </View>
    );
  }

  return (
    <SafeAreaView>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      {showVideo ? (
        <View className="relative bg-[#272728]" style={{height: hp(100)}}>
          <View className="h-screen">
            <View className=" h-screen ">
              <StatusBar />

              <YoutubePlayer
                height={hp(40)}
                play={playing}
                videoId={videos?.trailer?.youtube_video_id}
                onFullScreenChange={handleOrientationChange}
                onChangeState={onStateChange}
              />

              <Text
                className="p-2 text-white font-bold"
                style={{fontSize: hp(3)}}>
                Recommended for you
              </Text>

              <FlatList
                data={recommended}
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => <GridItem item={item} />}
                numColumns={2} // Number of columns in the grid
                contentContainerStyle={{padding: 5}}
              />

              <View className="flex-1 justify-between">
                <Snackbar
                  className="bg-[#cbc9c9]"
                  visible={snackbarVisible}
                  onDismiss={() => setSnackbarVisible(false)}
                  duration={3000} // 3 seconds
                  action={{
                    label: 'go back',
                    textColor: 'black',
                    onPress: () => {
                      setSnackbarVisible(false);
                      handleBackPress(); // Call handleBackPress again to navigate back
                    },
                  }}>
                  <Text className="text-black">Press again to go back</Text>
                </Snackbar>
              </View>
            </View>
          </View>
          {/* )} */}
        </View>
      ) : (
        <ScrollView className="bg-[#272728] h-full">
          {/* <View className="h-full"> */}
          <View className="relative" style={{height: hp(60)}}>
            <Image
              source={{uri: `${IMAGE_URL}/${movies?.poster_path}`}}
              style={{opacity: 0.7, height: hp(60)}}
              resizeMode="stretch"
              // className="object-contain"
            />

            <TouchableOpacity
              onPress={() => {
                setShowVideo(true);
              }} // Set showVideo state to true when button is clicked
              style={{backgroundColor: 'rgba(0,0,0,0.3)'}}
              className="rounded-l-full absolute bottom-36 p-2 right-0">
              <View className="flex-row items-center space-x-1">
                <View className="bg-white rounded-full p-1">
                  <PlayIcon size={22} color="red" />
                </View>
                <Text
                  className="text-white/50 tracking-wider"
                  style={{fontSize: hp(2)}}>
                  Watch Trailer
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View className="gap-4">
            <View className="flex-row items-center space-x-2 p-2 mt-1">
              <View className="flex-row space-x-1">
                <StarIcon size={22} color="yellow" />
                <Text className="text-white">8.3</Text>
              </View>
              <Button className="bg-[#E6AD18] rounded-md">
                <Text className="text-[#343333]">IMDB 7.5</Text>
              </Button>
            </View>

            <View className="p-2 flex-row space-x-5 mt-1">
              <Text
                className="text-[#cbc9c9] font-light"
                style={{fontSize: hp(1.8)}}>
                {names}
              </Text>
              <Text
                className="text-[#cbc9c9] font-light"
                style={{fontSize: hp(1.8)}}>
                {movies?.runtime} m
              </Text>
            </View>

            <View className="p-3 space-y-12">
              <View>
                <Text
                  className="text-[#cbc9c9]/80 font-bold  tracking-widest"
                  style={{fontSize: hp(2.3)}}>
                  Story Line
                </Text>
                <Text
                  className="text-[#cbc9c9] font-extralight mt-2 tracking-widest text-sm text-justify leading-[30px]"
                  style={{fontSize: hp(1.75)}}
                  numberOfLines={5}
                  ellipsizeMode="tail">
                  {movies?.overview}
                  {/* {overFlow(movies?.overview, 350)} */}
                </Text>
              </View>

              <View className="pt-2">
                <Text
                  className="text-[#cbc9c9]/80 font-bold  tracking-widest"
                  style={{fontSize: hp(2.3)}}>
                  Star cast
                </Text>
                <FlatList
                  horizontal
                  data={cast}
                  keyExtractor={item => item.id.toString()}
                  renderItem={({item}) => <CastItem item={item} />}
                  contentContainerStyle={{marginTop: 5, marginLeft: 2}} // Adjust spacing as needed
                />
              </View>
            </View>
          </View>
          <View className="flex-1 justify-between">
            <Snackbar
              className="bg-[#cbc9c9]"
              visible={snackbarVisible}
              onDismiss={() => setSnackbarVisible(false)}
              duration={1000} // 1 seconds
              action={{
                label: 'go back',
                textColor: 'black',
                onPress: () => {
                  setSnackbarVisible(false);
                  handleBackPress(); // Call handleBackPress again to navigate back
                },
              }}>
              <Text className="text-black">Press again to go back</Text>
            </Snackbar>
          </View>
          {/* </View> */}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default MovieDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: hp(25),
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  rating: {
    color: '#fff',
    fontSize: 14,
  },
});
