import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Image, Text, View } from 'react-native';

const Character = () => {
  return (
    <View className='flex-row max-w-[190] items-center'>
      <LinearGradient
        className='w-16 h-16 rounded-full z-20'
        colors={['#19A1BE', '#7D4192']}
      >
        <Image
          className='w-[60] h-[60] top-[2] left-[2] rounded-full'
          source={require('assets/images/movie1.png')}
        />
      </LinearGradient>
      <View className='left-[-40] z-10 h-[54] max-w-[165] '>
        <LinearGradient
          className='p-[1] rounded-2xl'
          colors={['#1e1e22', '#978F8A']}
          start={[0, 1]}
          end={[1, 0]}
          style={{ flex: 1 }}
        >
          <View className='flex-1 pl-[50] pr-[20] bg-black rounded-2xl justify-center'>
            <Text
              numberOfLines={1}
              ellipsizeMode='tail'
              className='text-white text-base font-bold'
            >
              Eren Yeager
            </Text>
            <Text
              numberOfLines={1}
              ellipsizeMode='tail'
              className='text-white text-sm font-regular'
            >
              As Morbius
            </Text>
          </View>
        </LinearGradient>
      </View>
    </View>
  );
};

export default Character;
