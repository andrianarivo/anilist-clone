import React from 'react';
import { Image, View } from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';

const AnimeDetails = () => {
  // TODO: use react-navigation-shared-element
  return (
    <View>
      <SharedElement id={'photo'}>
        <Image
          className='h-[374]'
          resizeMode='cover'
          source={{
            uri: 'https://s4.anilist.co/file/anilistcdn/media/anime/banner/16498-8jpFCOcDmneX.jpg',
          }}
        />
      </SharedElement>
    </View>
  );
};

export default AnimeDetails;
