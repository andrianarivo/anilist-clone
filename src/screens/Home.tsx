import React from 'react';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const Home = () => {
  const insets = useSafeAreaInsets();
  return (
    <View
      className='flex-1 bg-graybg-slate-700'
      style={{
        paddingTop: insets.top,
      }}
    ></View>
  );
};
