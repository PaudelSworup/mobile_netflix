import {View, Text, ImageBackground, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {IMAGE_URL} from '../../../config';
import {PlayIcon, StarIcon, XMarkIcon} from 'react-native-heroicons/solid';
import {useQuery} from 'react-query';
import YoutubePlayer from 'react-native-youtube-iframe';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {movies_videos, trending_movies} from '../../apis/api';
import SkeletonBanner from '../../utils/SkeletonBanner';

const MovieBanner = () => {
  const [banner, setBanner] = useState<any>(null);
  const [play, setPlay] = useState(false);
  const [videos, setVideos] = useState<any>(null);

  // Fetch banner movies
  const bannerMovies = useQuery(['trending'], async () => trending_movies(), {
    onSettled: data => {
      if (data?.movies.length) {
        const randomBanner =
          data.movies[Math.floor(Math.random() * data.movies.length)];
        setBanner(randomBanner);
      }
    },
  });

  // Fetch movie videos based on the selected banner
  const moviesVideos = useQuery(
    ['movieVideo', banner?.id],
    async () => movies_videos(banner?.id as any),
    {
      onSettled: data => setVideos(data?.movies),
      enabled: !!banner?.id,
    },
  );

  // Toggle play state
  const setBannerVideo = () => {
    setPlay(prevPlay => !prevPlay);
  };

  // Render the banner
  return (
    <View
      style={{
        height: hp(35),
        borderRadius: 20,
        overflow: 'hidden',
        position: 'relative',
      }}>
      {play ? (
        <YoutubePlayer
          height={hp(35)}
          play={true}
          videoId={videos?.trailer?.youtube_video_id}
        />
      ) : (
        <ImageBackground
          source={{
            uri: `${IMAGE_URL}/${banner?.backdrop_path || banner?.poster_path}`,
          }}
          imageStyle={{opacity: 0.9}}
          blurRadius={2}
          style={{flex: 1, overflow: 'hidden'}}>
          <View
            style={{
              position: 'absolute',
              bottom: 16,
              left: 16,
              right: 16,
              padding: 8,
            }}>
            <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>
              {banner?.title || banner?.original_title || banner?.name}
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <StarIcon size={25} color="yellow" />
              <Text style={{color: 'white', fontSize: 12}}>
                {banner?.vote_average.toFixed(1)}
              </Text>
            </View>
          </View>
        </ImageBackground>
      )}

      <TouchableOpacity
        onPress={setBannerVideo}
        style={{
          position: 'absolute',
          bottom: 16,
          right: 16,
          backgroundColor: 'white',
          borderRadius: 50,
          padding: 5,
        }}>
        {!play ? (
          <PlayIcon size={25} color="red" />
        ) : (
          <XMarkIcon size={25} color="red" />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default MovieBanner;
