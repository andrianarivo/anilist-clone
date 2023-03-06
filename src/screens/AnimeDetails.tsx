import useTabBarStyle from '@/hooks/useTabBarStyle';
import Star from '@/svg/Star';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useLayoutEffect } from 'react';
import { Image, Text, View } from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';

const AnimeDetails = () => {
  const navigation = useNavigation();
  const tabBarStyle = useTabBarStyle();

  useEffect(() => {
    navigation
      .getParent()
      ?.setOptions({ tabBarStyle: { display: 'none' }, tabBarVisible: false });
    return () =>
      navigation
        .getParent()
        ?.setOptions({ tabBarStyle: tabBarStyle, tabBarVisible: undefined });
  }, [navigation]);

  return (
    <View>
      <View className='relative'>
        <SharedElement id={'photo'}>
          <Image
            className='h-[374]'
            resizeMode='cover'
            source={{
              uri: 'https://s4.anilist.co/file/anilistcdn/media/anime/banner/16498-8jpFCOcDmneX.jpg',
            }}
          />
        </SharedElement>
        <LinearGradient
          className='w-full h-20 absolute bottom-0 left-0'
          colors={['transparent', '#1e1e22']}
        />
      </View>
      <View className='flex-row justify-between items-center mx-3'>
        <View className='flex-row items-center'>
          <View>
            <Text className='text-white text-2xl font-bold max-w-[93%] mr-1'>
              Shingeki no Kyojin
            </Text>
            <View className='flex-row items-center'>
              <Text className='text-neutral500 text-sm font-regular'>
                Marvel Studios
              </Text>
              <Text className='text-neutral500 text-xs font-regular'> • </Text>
              <Text className='text-neutral500 text-xs font-regular'>2022</Text>
            </View>
          </View>
        </View>
        <View>
          <View className='flex-row'>
            <Star className='mx-[2] my-[5]' width={14} height={13} />
            <Star className='mx-[2] my-[5]' width={14} height={13} />
            <Star className='mx-[2] my-[5]' width={14} height={13} />
            <Star className='mx-[2] my-[5]' width={14} height={13} />
            <Star className='mx-[2] my-[5]' width={14} height={13} />
          </View>
          <Text className='text-neutral500 text-xs'>From 342 users</Text>
        </View>
      </View>
      <Text className='text-neutral500 text-sm m-5'>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cumque odit
        recusandae distinctio quis, ratione iusto at maxime sunt possimus ea
        aperiam et vero, reiciendis enim nam fugit unde, ut earum.
      </Text>
    </View>
  );
};

export default AnimeDetails;
