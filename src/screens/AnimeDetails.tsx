import {
  default as Character,
  default as VoiceOver,
} from '@/components/Character';
import useTabBarStyle from '@/hooks/useTabBarStyle';
import Star from '@/svg/Star';
import { gql, useLazyQuery } from '@apollo/client';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
import { useWindowDimensions } from 'react-native';

import React, { useEffect, useLayoutEffect } from 'react';
import {
  Button,
  Image,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  ViewProps,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import HTML from 'react-native-render-html';
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

type AnimeCharacter = {
  id: string;
  name: string;
  gender: string;
  imageUri: string;
};

const useLazyAnimeDetails = (animeId: number) => {
  const QUERY = gql`
    {
      Media(id: ${animeId}) {
        id
        studios(isMain: true) {
          nodes {
            name
          }
        }
        startDate{
          year
        }
        popularity
        averageScore
        description(asHtml: true)
        title {
          userPreferred
        }
        characters(role: MAIN) {
          nodes {
            id
            name {
              userPreferred
            }
            gender
            image {
              medium
            }
          }
        }
      }
    }
  `;
  return useLazyQuery(QUERY);
};

const AnimeDetails = ({ route, ...props }: AnimeDetailsProps) => {
  const navigation = useNavigation();
  const tabBarStyle = useTabBarStyle();
  const { anime } = route.params;
  const [getAnimeDetails, animeDetails] = useLazyAnimeDetails(
    Number(anime.mediaId)
  );
  const { width } = useWindowDimensions();
  const { mediaId, imgSource } = anime;

  useEffect(() => {
    getAnimeDetails();
    navigation
      .getParent()
      ?.setOptions({ tabBarStyle: { display: 'none' }, tabBarVisible: false });
    return () =>
      navigation
        .getParent()
        ?.setOptions({ tabBarStyle: tabBarStyle, tabBarVisible: undefined });
  }, [navigation, getAnimeDetails]);

  if (animeDetails.error) {
    <SafeAreaView className='flex-1'>
      <ScrollView
        contentContainerStyle={{
          flex: 1,
        }}
        refreshControl={
          <RefreshControl
            onRefresh={() => {
              getAnimeDetails();
            }}
            refreshing={animeDetails.loading}
          />
        }
      >
        <View className='flex-1 justify-center items-center'>
          <Text className='text-white'>Error fetching data</Text>
        </View>
      </ScrollView>
    </SafeAreaView>;
  }

  if (animeDetails.data && animeDetails.data?.Media) {
    const characters = Array<AnimeCharacter>();
    for (let i = 0; i < animeDetails.data?.Media.characters.nodes.length; i++) {
      characters.push({
        id: animeDetails.data?.Media.characters.nodes[i].id,
        name: animeDetails.data?.Media.characters.nodes[i].name.userPreferred,
        gender: animeDetails.data?.Media.characters.nodes[i].gender,
        imageUri: animeDetails.data?.Media.characters.nodes[i].image.medium,
      });
    }

    const animeDetailsData = {
      studio: animeDetails.data?.Media.studios.nodes[0].name,
      title: animeDetails.data?.Media.title.userPreferred,
      description: animeDetails.data?.Media.description,
      year: animeDetails.data?.Media.startDate.year,
      score: Array.apply(
        null,
        Array(Math.round(animeDetails.data?.Media.averageScore / 20))
      ),
      characters: characters,
      popularity: animeDetails.data?.Media.popularity,
    };

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
                      <Text className='text-white text-2xl font-bold max-w-[98%] mr-1'>
                        {animeDetailsData.title}
                      </Text>
                      <View className='flex-row items-center'>
                        <Text className='text-neutral500 text-sm font-regular'>
                          {animeDetailsData.studio}
                        </Text>
                        <Text className='text-neutral500 text-xs font-regular'>
                          {' '}
                          •{' '}
                        </Text>
                        <Text className='text-neutral500 text-xs font-regular'>
                          {animeDetailsData.year}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View>
                    <View className='flex-row-reverse'>
                      {animeDetailsData.score.map(() => {
                        return (
                          <Star
                            className='mx-[2] my-[5]'
                            width={14}
                            height={13}
                          />
                        );
                      })}
                    </View>
                    <Text className='text-neutral500 text-xs'>
                      From {animeDetailsData.popularity} users
                    </Text>
                  </View>
                </View>
                <View className='text-neutral500 text-sm m-5'>
                  <HTML
                    tagsStyles={{
                      p: {
                        fontFamily: 'Roboto_400Regular',
                        color: '#978F8A',
                      },
                    }}
                    contentWidth={width}
                    source={{ html: animeDetailsData.description }}
                  />
                </View>
              </View>
            );
          }}
          ItemSeparatorComponent={() => {
            return <View className='h-2' />;
          }}
          contentContainerStyle={{ alignItems: 'center' }}
          numColumns={2}
          data={animeDetailsData.characters}
          renderItem={({ item }) => {
            return (
              <Character
                key={item.id}
                id={item.id}
                name={item.name}
                gender={item.gender}
                imageUri={item.imageUri}
              />
            );
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
  }

  return (
    <SafeAreaView className='flex-1'>
      <SharedElement id={`image_${mediaId}`}>
        <Image
          className='h-[374]'
          resizeMode='cover'
          source={{
            uri: imgSource,
          }}
        />
      </SharedElement>
      <View className='flex-1 justify-center items-center'>
        <Text className='text-white'>Loading</Text>
      </View>
    </SafeAreaView>
  );
};

export default AnimeDetails;
