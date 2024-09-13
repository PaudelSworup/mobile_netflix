import {
  View,
  Text,
  SafeAreaView,
  Image,
  Dimensions,
  TouchableOpacity,
  FlatList,
  useWindowDimensions,
} from 'react-native';
import React, {useState} from 'react';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {useAppSelector} from '../../store/store';
import {Path, Svg} from 'react-native-svg';
import {useQuery} from 'react-query';
import {getProfile, trailer_movies, uplaodImage} from '../../apis/api';
import {BASE_URL, IMAGE_URL} from '../../../config';
import {navigate} from '../../apis/pushNotification/NavigationService';
import NavigationStrings from '../../Constants/NavigationStrings';
import {pickImage} from '../../utils/documentPicker';
import {Button} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserProfile = () => {
  const {userInfo} = useAppSelector(state => state.auth);
  const {width} = useWindowDimensions();
  const numColumns = width < 768 ? 2 : 3;

  const [trailer, setTrailer] = useState([]);
  const getTrailer = useQuery(
    ['trailer'],
    () => trailer_movies(userInfo?._id),
    {
      onSuccess: data => {
        if (data && data?.movies) {
          setTrailer(data?.movies);
        }
      },
    },
  );

  const [profile, setProfile] = useState<any>();
  const getProfileImage = useQuery(
    ['profile', userInfo?._id],
    () => getProfile(userInfo?._id),
    {
      enabled: !!userInfo?._id, // Ensure the query only runs if userInfo?._id is available
      onSuccess: data => {
        if (data && data?.profile) {
          setProfile(data?.profile?.profileImage);
        }
      },
      refetchOnWindowFocus: true,
    },
  );

  console.log(profile);

  const uploadProfile = async () => {
    pickImage().then(profileImage => {
      if (profileImage === null) return;

      console.log(profileImage[0].uri);
      console.log(profileImage[0].name);
      console.log(profileImage[0].type);

      //appending necessary data to send image file in backend
      let body = new FormData();
      body.append('image', {
        uri: profileImage[0].uri,
        name: profileImage[0].name,
        fileName: profileImage[0].name,
        type: profileImage[0].type,
      });

      //uplaod image in the backend
      uplaodImage(body, userInfo?._id).then(res => {
        console.log(res);
      });
    });
  };

  const handleLogout = async () => {
    try {
      // Clear all data from AsyncStorage
      await AsyncStorage.clear();
      console.log('Storage cleared!');

      // Navigate to the login page
      navigate(NavigationStrings.LOGIN);
    } catch (error) {
      console.error('Error clearing AsyncStorage', error);
    }
  };

  const GridItem = ({item}: any) => (
    <TouchableOpacity
      className="flex-1 m-1.5 rounded-lg overflow-hidden bg-white"
      onPress={() =>
        navigate(NavigationStrings.DETAIL, {movieId: item?.movieId})
      }>
      <Image
        source={{
          uri: `${IMAGE_URL}/${item.image}`,
        }}
        className={`w-full`}
        style={{height: hp(25)}} // Dynamic height still using hp
      />
      <View className="absolute bottom-0 left-0 right-0 p-2.5 bg-black/50">
        <Text className="text-white text-base font-bold">
          {item?.trailerName}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="bg-[#111]">
      <View className="h-full justify-between">
        <View
          style={{height: hp(20)}}
          className="  bg-[#222] justify-center items-center">
          <TouchableOpacity onPress={uploadProfile}>
            <Image
              source={{
                // uri: 'https://t4.ftcdn.net/jpg/02/83/72/41/360_F_283724163_kIWm6DfeFN0zhm8Pc0xelROcxxbAiEFI.jpg',
                uri:
                  profile != null
                    ? `http://192.168.1.67:8000/${profile}`
                    : 'https://t4.ftcdn.net/jpg/02/83/72/41/360_F_283724163_kIWm6DfeFN0zhm8Pc0xelROcxxbAiEFI.jpg',
              }}
              className="h-40 w-40 rounded-full items-center"
            />
          </TouchableOpacity>
          <View className="gap-3">
            <Text
              className="font-semibold text-center tracking-widest text-white/40"
              style={{fontSize: hp(2)}}>
              {userInfo?.username}
            </Text>
            <Text
              className="font-light text-center tracking-widest text-white/40"
              style={{fontSize: hp(2)}}>
              {userInfo?.email}
            </Text>
          </View>
        </View>
        <View className="h-16 bg-[#222]">
          <Svg
            height={300} // You can adjust the height to fit your needs
            width={Dimensions.get('window').width}
            viewBox="0 0 1400 320">
            <Path
              opacity="1"
              fill="#222"
              d="M0,320L48,320C96,320,192,320,288,293.3C384,267,480,213,576,160C672,107,768,53,864,58.7C960,64,1056,128,1152,165.3C1248,203,1344,213,1392,218.7L1440,224L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
            />
          </Svg>
        </View>
        <View className="mt-60 p-5">
          <Text
            className="font-light  tracking-widest text-white/40"
            style={{fontSize: hp(2)}}>
            Trailers you've watched
          </Text>
          <View className="h-1 mt-3 bg-white/40" />
        </View>
        <FlatList
          data={trailer}
          renderItem={GridItem}
          keyExtractor={(item: any) => item?._id.toString()}
          onEndReachedThreshold={0.5}
          numColumns={numColumns} // Number of columns in the grid
          contentContainerStyle={{padding: 5}}
        />

        <TouchableOpacity className="p-3" onPress={handleLogout}>
          <Button
            className="rounded-lg bg-red-800"
            contentStyle={{height: hp(4)}} // Adjust height to match your design
            // Ensure consistent styling
            mode="contained">
            <Text className="text-white tracking-widest text-2xl">Logout</Text>
          </Button>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default UserProfile;
