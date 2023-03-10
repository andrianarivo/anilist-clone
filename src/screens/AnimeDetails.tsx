import {
  default as Character,
  default as VoiceOver,
} from '@/components/Character';
import useTabBarStyle from '@/hooks/useTabBarStyle';
import Star from '@/svg/Star';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useLayoutEffect } from 'react';
import {
  Button,
  Image,
  Text,
  TouchableOpacity,
  View,
  ViewProps,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { SharedElement } from 'react-navigation-shared-element';

type RootStackParamList = {
  Home: undefined;
  AnimeDetails: { anime: { mediaId: string; imgSource: string } };
};

type AnimeDetailsRouteProp = RouteProp<RootStackParamList, 'AnimeDetails'>;
type AnimeDetailsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'AnimeDetails'
>;

type AnimeDetailsProps = ViewProps &
  AnimeDetailsRouteProp & {
    route: AnimeDetailsProps;
    navigation: AnimeDetailsScreenNavigationProp;
  };

const AnimeDetails = ({ route, ...props }: AnimeDetailsProps) => {
  const navigation = useNavigation();
  const tabBarStyle = useTabBarStyle();
  const { anime } = route.params;
  const { mediaId, imgSource } = anime;

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
    <View {...props} className='flex-1'>
      <FlatList
        ListHeaderComponent={() => {
          return (
            <View>
              <View className='relative'>
                <SharedElement id={`image_${mediaId}`}>
                  <Image
                    className='h-[374]'
                    resizeMode='cover'
                    source={{
                      uri: imgSource,
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
                      <Text className='text-neutral500 text-xs font-regular'>
                        {' '}
                        •{' '}
                      </Text>
                      <Text className='text-neutral500 text-xs font-regular'>
                        2022
                      </Text>
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
                  <Text className='text-neutral500 text-xs'>
                    From 342 users
                  </Text>
                </View>
              </View>
              <Text className='text-neutral500 text-sm m-5'>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cumque
                odit recusandae distinctio quis, ratione iusto at maxime sunt
                possimus ea aperiam et vero, reiciendis enim nam fugit unde, ut
                earum.
              </Text>
            </View>
          );
        }}
        ItemSeparatorComponent={() => {
          return <View className='h-2' />;
        }}
        contentContainerStyle={{ alignItems: 'center' }}
        numColumns={2}
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
        renderItem={() => {
          return <Character />;
        }}
        ListFooterComponent={() => {
          return (
            <View className='h-[110]  justify-center align-center'>
              <View className='h-[52] w-[211]'>
                <LinearGradient
                  className='p-[2] rounded-full'
                  colors={['#19A1BE', '#7D4192']}
                  start={[0, 1]}
                  end={[1, 1]}
                  style={{ flex: 1 }}
                >
                  <View className='flex-1 relative bg-neutral800 rounded-full justify-center align-center'>
                    <Image
                      className='absolute left-[-25%]'
                      source={require('assets/images/button_bg.png')}
                    />
                    <TouchableOpacity
                      onPress={() => {
                        console.log('touch');
                      }}
                    >
                      <Text className='text-white font-bold text-base text-center'>
                        Watch trailer
                      </Text>
                    </TouchableOpacity>
                  </View>
                </LinearGradient>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default AnimeDetails;
