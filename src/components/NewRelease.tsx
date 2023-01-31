import React from 'react';
import { Image, Text, View, ViewProps } from 'react-native';
import Rating from './Rating';

type Props = ViewProps & {
  title: string;
  publisher: string;
  ratings: number;
  nbUsers: number;
  coverUri: string;
};

const NewRelease = ({
  title,
  publisher,
  ratings,
  nbUsers,
  coverUri,
  ...props
}: Props) => {
  return (
    <View {...props} className='rounded-xl overflow-hidden shadow-lg'>
      <Image
        className='w-full h-[187]'
        resizeMode='cover'
        source={{ uri: coverUri }}
      />
      <View className='absolute w-screen'>
        <View className='flex-row justify-between items-end top-32'>
          <View className='ml-4'>
            <Text className='text-2xl text-white font-bold'>{title}</Text>
            <Text className='text-xs text-neutral500'>{publisher}</Text>
          </View>
          <Rating className='mr-12' count={ratings} nbUsers={nbUsers} />
        </View>
      </View>
    </View>
  );
};

export default NewRelease;
