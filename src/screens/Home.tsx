import { gql, useLazyQuery } from '@apollo/client';
import Anime from '@components/Anime';
import CollectionView from '@components/CollectionView';
import NewRelease from '@components/NewRelease';
import Watching from '@components/Watching';
import React, { useEffect } from 'react';
import { RefreshControl, ScrollView, Text, View } from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

type CollectionType = 'horizontal' | 'grid';

interface SectionData {
  title: string;
  watching?: boolean;
  type: CollectionType;
  data: ReadonlyArray<Item>;
}

interface Item {
  title: string;
  description?: string;
  episode?: string;
  progress?: number;
  rating?: number;
  nbUsers?: number;
  season?: string;
  year?: number;
  uri: string;
  key: string;
}

const useLazyMostPopular = () => {
  const QUERY = gql`
    {
      MediaTrend(popularity_greater: 100000) {
        date
        popularity
        averageScore
        media {
          id
          title {
            userPreferred
          }
          bannerImage
          studios(isMain: true) {
            nodes {
              id
              name
            }
          }
        }
      }
    }
  `;
  return useLazyQuery(QUERY);
};

const useLazyAllMedia = () => {
  const QUERY = gql`
    {
      Page(page: 0, perPage: 50) {
        mediaList {
          media {
            id
            popularity
            description
            averageScore
            title {
              userPreferred
            }
            coverImage {
              extraLarge
            }
            startDate {
              year
            }
          }
        }
      }
    }
  `;
  return useLazyQuery(QUERY);
};

const useLazyWatching = () => {
  const QUERY = gql`
    {
      Page(page: 0, perPage: 10) {
        mediaList(status_in: [CURRENT, PAUSED]) {
          progress
          media {
            title {
              userPreferred
            }
            coverImage {
              extraLarge
            }
            episodes
          }
        }
      }
    }
  `;
  return useLazyQuery(QUERY);
};

type HomeProps = {
  navigation: any;
};

const Home = ({ navigation }: HomeProps) => {
  const insets = useSafeAreaInsets();
  const [getMostPopular, mostPopular] = useLazyMostPopular();
  const [getAllMedia, allMedia] = useLazyAllMedia();
  const [getWatching, watching] = useLazyWatching();

  useEffect(() => {
    getMostPopular();
    getAllMedia();
    getWatching();
  }, []);

  if (mostPopular.error && allMedia.error && watching.error) {
    console.log(mostPopular.error);
    console.log(allMedia.error);
    console.log(watching.error);
    return (
      <SafeAreaView className='flex-1'>
        <ScrollView
          contentContainerStyle={{
            flex: 1,
          }}
          refreshControl={
            <RefreshControl
              onRefresh={() => {
                getMostPopular();
                getAllMedia();
                getWatching();
              }}
              refreshing={
                mostPopular.loading && allMedia.loading && watching.loading
              }
            />
          }
        >
          <View className='flex-1 justify-center items-center'>
            <Text className='text-white'>Error fetching data</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (
    mostPopular.data &&
    mostPopular.data.MediaTrend &&
    allMedia.data &&
    allMedia.data.Page &&
    watching.data &&
    watching.data.Page
  ) {
    let bannerItem = {
      title: mostPopular.data.MediaTrend.media.title.userPreferred,
      publisher:
        mostPopular.data.MediaTrend.media.studios.nodes.length > 0
          ? mostPopular.data.MediaTrend.media.studios.nodes[0].name
          : 'Unknown',
      ratings: mostPopular.data.MediaTrend.averageScore,
      nbUsers: mostPopular.data.MediaTrend.popularity,
      coverUri: mostPopular.data.MediaTrend.media.bannerImage,
    };

    let ALL_MEDIAS = allMedia.data.Page.mediaList.map(
      (item: typeof allMedia.data.Page.medialist[0]) => {
        let media: Item = {
          key: item.media.id,
          nbUsers: item.media.popularity,
          description: item.media.description,
          rating: item.media.averageScore,
          title: item.media.title.userPreferred,
          uri: item.media.coverImage.extraLarge,
          year: item.media.startDate.year,
        };
        return media;
      }
    );

    let WATCHING = watching.data.Page.mediaList.map(
      (item: typeof watching.data.Page.mediaList[0]) => {
        let media: Item = {
          key: item.media.id,
          title: item.media.title.userPreferred,
          uri: item.media.coverImage.extraLarge,
          episode: item.progress,
          progress: item.progress / item.media.episodes,
        };
        return media;
      }
    );

    const SECTIONS: ReadonlyArray<SectionData> = [
      {
        title: 'Continue watching',
        watching: true,
        type: 'horizontal',
        data: WATCHING,
      },
      {
        title: 'All',
        watching: false,
        type: 'grid',
        data: ALL_MEDIAS,
      },
    ];

    return (
      <CollectionView
        contentContainerStyle={{
          paddingTop: insets.top,
        }}
        onRefresh={() => {
          getMostPopular();
          getAllMedia();
          getWatching();
        }}
        refreshing={allMedia.loading && mostPopular.loading}
        ListHeaderComponent={
          <View>
            <Text className='ml-4 text-md text-white font-regular my-4'>
              Most popular.
            </Text>
            <NewRelease
              className='mx-4'
              title={bannerItem.title}
              publisher={bannerItem.publisher}
              ratings={bannerItem.ratings}
              nbUsers={bannerItem.nbUsers}
              coverUri={bannerItem.coverUri}
              navigation={navigation}
            />
          </View>
        }
        sections={SECTIONS}
        renderSectionHeader={({ section }) => {
          return section.watching ? (
            <Text className='ml-4 text-md text-white font-regular my-4'>
              {section.title}
            </Text>
          ) : (
            <View className='flex-row justify-between items-center w-3/4'>
              <Text className='ml-4 text-md text-white font-bold my-4'>
                • For you
              </Text>
              <Text className='ml-4 text-md text-neutral500 my-4'>Popular</Text>
              <Text className='ml-4 text-md text-neutral500 my-4'>Popular</Text>
              <Text className='ml-4 text-md text-neutral500 my-4'>Popular</Text>
            </View>
          );
        }}
        renderElement={({ section, item }) => {
          return section.watching ? (
            <Watching
              season={item.season}
              title={item.title}
              episode={item.episode}
              progress={item.progress}
              uri={item.uri}
            />
          ) : (
            <Anime
              nbUsers={item.nbUsers!}
              description={item.description!}
              ratings={item.rating!}
              uri={item.uri}
              title={item.title}
              year={item.year!}
            />
          );
        }}
      />
    );
  }

  return (
    <SafeAreaView className='flex-1'>
      <View className='flex-1 justify-center items-center'>
        <Text className='text-white'>Loading</Text>
      </View>
    </SafeAreaView>
  );
};

export default Home;
