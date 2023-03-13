import { colors } from '@theme/colors';
import React from 'react';
import { Image, Text, TouchableOpacity, View, ViewProps } from 'react-native';
import * as Progress from 'react-native-progress';
import { SharedElement } from 'react-navigation-shared-element';

type Props = ViewProps & {
  mediaId: string;
  title: string;
  episode?: string;
  progress?: number;
  season?: string;
  uri: string;
  navigation: any;
};
const Watching = ({
  mediaId,
  title,
  episode,
  progress,
  uri,
  navigation,
  ...props
}: Props) => {
  const anime = {
    mediaId: mediaId,
    imgSource: uri,
  };

  return (
    <View {...props} className='mx-2'>
      <TouchableOpacity
        onPress={() => navigation.push('AnimeDetails', { anime })}
      >
        <View className='overflow-hidden rounded-lg shadow-lg w-[162] h-[124]'>
          <SharedElement id={`image_${mediaId}`}>
            <Image
              resizeMode='cover'
              className='w-full h-full'
              source={{ uri: uri }}
            />
          </SharedElement>
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
