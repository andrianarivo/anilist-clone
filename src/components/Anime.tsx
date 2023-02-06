import React, { useEffect, useState } from 'react';
import { Image, Text, View, ViewProps } from 'react-native';
import Rating from './Rating';

type Props = ViewProps & {
  uri: string;
  ratings: number;
  description: string;
  nbUsers: number;
  title: string;
  year: number;
};

const Anime = ({
  uri,
  ratings,
  title,
  year,
  nbUsers,
  description,
  ...props
}: Props) => {
  useEffect(() => {}, []);

  return (
    <View
      {...props}
      className='m-2 bg-deep-dark p-4 rounded-lg overflow-hidden flex-row items-center'
    >
      <View className='overflow-hidden rounded-2xl mr-2 shadow-lg w-[124] h-[194]'>
        <Image className='w-full h-full' source={{ uri: uri }} />
      </View>
      <View className='flex-1 flex-grow'>
        <Text className='font-bold text-md text-white flex-wrap'>{title}</Text>
        <Text className='font-regular text-xs text-neutral500'>{year}</Text>
        <Text
          className='font-regular text-xs text-white flex-1 flex-wrap'
          numberOfLines={7}
        >
          {description}
        </Text>
        <Rating className='' count={ratings} nbUsers={nbUsers} />
      </View>
    </View>
  );
};

export default Anime;
