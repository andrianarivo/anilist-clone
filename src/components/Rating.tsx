import Star from '@/svg/Star';
import React from 'react';
import { Text, View, ViewProps } from 'react-native';

type Props = ViewProps & {
  count: number;
  nbUsers?: number;
};
const defaults: Props = {
  count: 3,
  nbUsers: 342,
};

const Rating = ({ count, nbUsers, ...props } = defaults) => {
  return (
    <View {...props} className='items-end'>
      <View className='flex-row items-center justify-between bg-white px-1 rounded-full'>
        <Text className='font-bold text-xs text-deep-dark'>{count / 20}/5</Text>
        <Star className='mx-[2] my-[5]' width={14} height={13} />
      </View>
      {nbUsers && (
        <View className='flex-row'>
          <Text className='text-xs text-white'>Listed by </Text>
          <Text className='text-xs font-bold text-white'>{nbUsers}</Text>
          <Text className='text-xs text-white'> users</Text>
        </View>
      )}
    </View>
  );
};

export default Rating;
