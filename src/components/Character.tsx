import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Image, Text, View, ViewProps } from 'react-native';

type CharacterProps = ViewProps & {
  id?: string;
  name: string;
  gender: string;
  imageUri: string;
};

const Character = ({ id, name, gender, imageUri, ...props }: CharacterProps) => {
  return (
    <View {...props} className='flex-row w-[180] items-center'>
      <LinearGradient
        className='w-16 h-16 rounded-full z-20'
        colors={['#19A1BE', '#7D4192']}
      >
        <Image
          className='w-[60] h-[60] top-[2] left-[2] rounded-full'
          source={{ uri: imageUri }}
        />
      </LinearGradient>
      <View className='left-[-40] z-10 h-[54] w-[150] '>
        <LinearGradient
          className='p-[1] rounded-2xl'
          colors={['#1e1e22', '#978F8A']}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
          style={{ flex: 1 }}
        >
          <View className='flex-1 pl-[50] pr-[20] bg-black rounded-2xl justify-center'>
            <Text
              numberOfLines={1}
              ellipsizeMode='tail'
              className='text-white text-base font-bold'
            >
              {name}
            </Text>
            <Text
              numberOfLines={1}
              ellipsizeMode='tail'
              className='text-white text-sm font-regular'
            >
              {gender}
            </Text>
          </View>
        </LinearGradient>
      </View>
    </View>
  );
};

export default Character;
