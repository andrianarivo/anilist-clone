import { colors } from '@theme/colors';
import React from 'react';
import { Text, TouchableOpacity, View, ViewProps } from 'react-native';
import * as Progress from 'react-native-progress';
import Animated from 'react-native-reanimated';

import { ROUTES } from '@/constants/routes';
import { useRouter } from 'expo-router';

type Props = ViewProps & {
  mediaId: string;
  title: string;
  episode?: string;
  progress?: number;
  season?: string;
  uri: string;
};
const Watching = ({
  mediaId,
  title,
  episode,
  progress,
  uri,
  ...props
}: Props) => {
  const router = useRouter();
  const anime = {
    mediaId: mediaId,
    imgSource: uri,
  };

  return (
    <View {...props} className='mx-2'>
      <TouchableOpacity
        onPress={() => router.push({
          pathname: ROUTES.DYNAMIC.ANIME_DETAILS(mediaId),
          params: { imgSource: uri }
        })}
      >
        <View className='overflow-hidden rounded-lg shadow-lg w-[162] h-[124]'>
          <Animated.Image
            sharedTransitionTag={`image_${mediaId}`}
            resizeMode='cover'
            className='w-full h-full'
            source={{ uri: uri }}
          />
          <Progress.Bar
            className='absolute top-[122] w-full'
            borderWidth={0}
            progress={progress}
            height={2}
            color={colors.palette.angry500}
            width={null}
          />
        </View>
        <View
          className='my-1'
          style={{
            alignItems: episode ? 'flex-start' : 'center',
          }}
        >
          <Text
            ellipsizeMode='tail'
            numberOfLines={1}
            className='font-bold text-md text-white w-[162]'
          >
            {title}
          </Text>
          {episode && (
            <Text className='font-sm text-neutral500'>Episode {episode}</Text>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Watching;
