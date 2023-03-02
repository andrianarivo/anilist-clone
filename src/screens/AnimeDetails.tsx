import React from 'react';
import { Image, Text, View } from 'react-native';

const AnimeDetails = () => {
  // TODO: use react-navigation-shared-element
  return (
    <View>
      <Image
        className='h-[50%]'
        resizeMode='cover'
        source={{
          uri: 'https://s4.anilist.co/file/anilistcdn/media/anime/banner/16498-8jpFCOcDmneX.jpg',
        }}
      />
    </View>
  );
};

export default AnimeDetails;
