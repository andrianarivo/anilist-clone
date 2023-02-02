import { LinearGradient } from 'expo-linear-gradient';
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
    <LinearGradient
      {...props}
      className='rounded-xl'
      colors={['#19A1BE', '#7D4192']}
    >
      <View className='m-1'>
        <View className='w-screen'>
          <View className='flex-row justify-between items-end mb-2'>
            <View className='ml-2 wrap'>
              <Text className='text-2xl text-white font-bold w-[230]'>
                {title}
              </Text>
              <Text className='text-xs text-white'>Studio: {publisher}</Text>
            </View>
            <Rating className='mr-12' count={ratings} nbUsers={nbUsers} />
          </View>
        </View>
        <Image
          className='rounded-md overflow-hidden shadow-lg w-full h-[187]'
          resizeMode='repeat'
          source={{ uri: coverUri }}
        />
      </View>
    </LinearGradient>
  );
};

export default NewRelease;
