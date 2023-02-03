import Star from '@/svg/Star';
import React from 'react';
import { Text, View, ViewProps } from 'react-native';

type Props = ViewProps & {
  count: number;
  nbUsers: number;
};
const defaults: Props = {
  count: 3,
  nbUsers: 342,
};

const Rating = ({ count, nbUsers, ...props } = defaults) => {
  return (
    <View {...props} className='items-end'>
      <View className='flex-row'>
        {[...Array(Math.floor(count / 20)).keys()].map((key) => {
          let keyString = `star-${key}`;
          return (
            <Star
              key={keyString}
              className='mx-[2] my-[5]'
              width={14}
              height={13}
            />
          );
        })}
      </View>
      <Text className='font-bold text-xs text-white'>{count}/100</Text>
      <Text className='text-xs text-white'>Watched by {nbUsers} users</Text>
    </View>
  );
};

export default Rating;
