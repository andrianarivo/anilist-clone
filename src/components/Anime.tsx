import { View, Text, Image, ViewProps } from 'react-native';
import React from 'react';

type Props = ViewProps & {
  uri: string;
  title: string;
  year: number;
};

const Anime = ({ uri, title, year, ...props }: Props) => {
  return (
    <View {...props} className='items-center'>
      <View className='overflow-hidden rounded-2xl m-1 shadow-lg w-[124] h-[124]'>
        <Image className='w-full h-full' source={{ uri: uri }} />
      </View>
      <Text className='font-bold text-md text-white'>{title}</Text>
      <Text className='font-regular text-xs text-neutral500'>{year}</Text>
    </View>
  );
};

export default Anime;
