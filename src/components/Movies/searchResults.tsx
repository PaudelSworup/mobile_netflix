import React, {useCallback} from 'react';
import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import {IMAGE_URL} from '../../../config';
import NavigationStrings from '../../Constants/NavigationStrings';
import {navigate} from '../../apis/pushNotification/NavigationService';

const SearchResults = ({movies}: any) => {
  const renderSection = useCallback(({item}: {item: any}) => {
    return (
      <TouchableOpacity
        onPress={() => navigate(NavigationStrings.DETAIL, {movieId: item?.id})}
        className="flex-row items-center p-2 border-b border-gray-600">
        <Image
          source={{
            uri: item
              ? `${IMAGE_URL}/${item.backdrop_path}`
              : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8JrNcJV0PaRPCm3vBRGmxdAE1B993db_Xig',
          }}
          // style={{height: 160, width: 250, borderRadius: 20}}
          style={{width: 50, height: 75, borderRadius: 5}}
          blurRadius={2}
        />
        <Text className="text-white ml-4">{item.title}</Text>
      </TouchableOpacity>
    );
  }, []);
  // const renderItem = ({item}: any) => (

  // );

  return (
    <View className="bg-[#1c1c1c] p-2 mt-2 rounded-lg">
      <FlatList
        data={movies}
        renderItem={renderSection}
        keyExtractor={item =>
          item.id.toString() + `${item.title || item.name}-${Math.random()}`
        }
        ListEmptyComponent={
          <Text className="text-white">No results found</Text>
        }
      />
    </View>
  );
};

export default SearchResults;
