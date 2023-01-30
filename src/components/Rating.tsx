import Star from '@/svg/Star';
import React from 'react';
import { View, ViewProps } from 'react-native';
import { Text } from 'react-native-paper';

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
        {[...Array(count).keys()].map((key) => {
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
      <Text className='text-xs text-neutral500'>From {nbUsers} users</Text>
    </View>
  );
};

export default Rating;
