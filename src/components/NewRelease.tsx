import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View, ViewProps } from 'react-native';
import { Blurhash } from 'react-native-blurhash';
import Animated from 'react-native-reanimated';
import Rating from './Rating';

import { ROUTES } from '@/constants/routes';
import { useRouter } from 'expo-router';

type Props = ViewProps & {
  mediaId: string;
  title: string;
  publisher: string;
  ratings: number;
  nbUsers: number;
  coverUri: string;
};

const NewRelease = ({
  mediaId,
  title,
  publisher,
  ratings,
  nbUsers,
  coverUri,
  ...props
}: Props) => {
  const router = useRouter();
  const [blurhash, setBlurhash] = useState('');

  const anime = {
    mediaId: mediaId,
    imgSource: coverUri,
  };

  useEffect(() => {
    (async function () {
      const hash = await Blurhash.encode(coverUri, 4, 3);
      setBlurhash(hash);
    })();
  }, []);

  return (
    <View {...props} className='m-1 rounded-md overflow-hidden shadow-lg '>
      <TouchableOpacity
        onPress={() => router.push({
          pathname: ROUTES.DYNAMIC.ANIME_DETAILS(mediaId),
          params: { imgSource: coverUri }
        })}
      >
        <Animated.Image
          sharedTransitionTag={`image_${mediaId}`}
          className='h-[187]'
          resizeMode='cover'
          source={{ uri: coverUri }}
        />
      </TouchableOpacity>

      <View className='absolute w-full h-full justify-end'>
        <View className='flex-row justify-between items-end'>
          {blurhash && (
            <>
              <Blurhash
                resizeMode='cover'
                className='absolute w-full h-full'
                blurhash={blurhash}
              />
              <View className='ml-4 wrap mb-2'>
                <Text
                  numberOfLines={2}
                  ellipsizeMode='tail'
                  className='text-2xl text-white max-w-[70%] font-bold'
                >
                  {title}
                </Text>
                <Text className='text-xs text-white'>Studio: {publisher}</Text>
              </View>
              <Rating className='mr-4 mb-2' count={ratings} nbUsers={nbUsers} />
            </>
          )}
        </View>
      </View>
    </View>
  );
};

export default NewRelease;
