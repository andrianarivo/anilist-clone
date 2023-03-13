import React, { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View, ViewProps } from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';
import Rating from './Rating';

type Props = ViewProps & {
  uri: string;
  mediaId: string;
  ratings: number;
  description: string;
  nbUsers: number;
  title: string;
  year: number;
  navigation: any;
};

const Anime = ({
  mediaId,
  uri,
  ratings,
  title,
  year,
  nbUsers,
  description,
  navigation,
  ...props
}: Props) => {
  useEffect(() => {}, []);

  const anime = {
    mediaId: mediaId,
    imgSource: uri,
  };

  return (
    <TouchableOpacity
      onPress={() => navigation.push('AnimeDetails', { anime })}
    >
      <View
        {...props}
        className='m-2 bg-deep-dark p-4 rounded-lg overflow-hidden flex-row items-center'
      >
        <View className='overflow-hidden rounded-2xl mr-2 shadow-lg w-[124] h-[194]'>
          <SharedElement id={`image_${anime.mediaId}`}>
            <Image className='w-full h-full' source={{ uri: uri }} />
          </SharedElement>
        </View>
        <View className='flex-1 flex-grow'>
          <Text className='font-bold text-md text-white flex-wrap'>
            {title}
          </Text>
          <Text className='font-regular text-xs text-neutral500'>{year}</Text>
          <Text
            className='font-regular text-xs text-white flex-1 flex-wrap'
            numberOfLines={7}
          >
            {description}
          </Text>
          <Rating count={ratings} nbUsers={nbUsers} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Anime;
