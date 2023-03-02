import { colors } from '@theme/colors';
import React from 'react';
import { Image, Text, View, ViewProps } from 'react-native';
import * as Progress from 'react-native-progress';

type Props = ViewProps & {
  title: string;
  episode?: string;
  progress?: number;
  season?: string;
  uri: string;
};
const Watching = ({ title, episode, progress, uri, ...props }: Props) => {
  return (
    <View {...props} className='mx-2'>
      <View className='overflow-hidden rounded-lg shadow-lg w-[162] h-[124]'>
        <Image className='w-full h-full' source={{ uri: uri }} />
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
    </View>
  );
};

export default Watching;
