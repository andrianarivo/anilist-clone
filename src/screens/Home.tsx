import Anime from '@components/Anime';
import CollectionView from '@components/CollectionView';
import NewRelease from '@components/NewRelease';
import Watching from '@components/Watching';
import React from 'react';
import { FlatList, Image, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type CollectionType = 'horizontal' | 'grid';

interface SectionData {
  title: string;
  watching?: boolean;
  type: CollectionType;
  data: ReadonlyArray<Item>;
}

interface Item {
  title: string;
  episode?: string;
  progress?: number;
  publisher?: string;
  rating?: number;
  nbUsers?: number;
  season?: string;
  year?: number;
  showInGrid?: boolean;
  uri: string;
  key: string;
}

const WATCHING: ReadonlyArray<Item> = [
  {
    episode: '4',
    title: 'Grappler Baki',
    progress: 0.3,
    season: '1',
    key: '1',
    uri: 'https://w0.peakpx.com/wallpaper/869/317/HD-wallpaper-baki-the-grappler-anime-baki-the-grappler-fight-manga-ufc.jpg',
  },
  {
    episode: '2',
    title: 'Item text 2',
    progress: 0.6,
    season: '1',
    key: '2',
    uri: 'https://picsum.photos/id/10/200',
  },

  {
    episode: '3',
    title: 'Item text 3',
    progress: 0.1,
    season: '1',
    key: '3',
    uri: 'https://picsum.photos/id/1002/200',
  },
  {
    episode: '4',
    title: 'Item text 4',
    progress: 0.8,
    season: '1',
    key: '4',
    uri: 'https://picsum.photos/id/1006/200',
  },
  {
    episode: '5',
    title: 'Item text 5',
    progress: 0.5,
    season: '1',
    key: '5',
    uri: 'https://picsum.photos/id/1008/200',
  },
];

const DATAS = [
  {
    title: 'Item text 1',
    key: '6',
    year: 2022,
    showInGrid: true,
    uri: 'https://picsum.photos/id/1011/200',
  },
  {
    title: 'Item text 2',
    key: '7',
    year: 2022,
    showInGrid: true,
    uri: 'https://picsum.photos/id/1012/200',
  },

  {
    title: 'Item text 3',
    key: '8',
    year: 2022,
    showInGrid: true,
    uri: 'https://picsum.photos/id/1013/200',
  },
  {
    title: 'Item text 4',
    key: '9',
    year: 2022,
    showInGrid: true,
    uri: 'https://picsum.photos/id/1015/200',
  },
  {
    title: 'Item text 5',
    key: '10',
    year: 2022,
    showInGrid: true,
    uri: 'https://picsum.photos/id/1016/200',
  },
];

const SECTIONS: ReadonlyArray<SectionData> = [
  {
    title: 'Continue watching',
    watching: true,
    type: 'horizontal',
    data: WATCHING,
  },
  {
    title: 'Datas',
    type: 'grid',
    data: DATAS,
  },
];

const Home = () => {
  const insets = useSafeAreaInsets();
  return (
    <View
      className='flex-1'
      style={{
        paddingTop: insets.top,
      }}
    >
      <CollectionView
        ListHeaderComponent={
          <View>
            <Text className='ml-4 text-md text-white font-regular my-4'>
              New releases.
            </Text>
            <NewRelease
              className='mx-4'
              title='Demon Slayer'
              publisher='Shueisha'
              ratings={5}
              nbUsers={384}
              coverUri='https://www.cheatsheet.com/wp-content/uploads/2022/04/Demon-Slayer-Tanjiro.jpg'
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
              className='mb-2'
              uri={item.uri}
              title={item.title}
              year={item.year!}
            />
          );
        }}
      />
    </View>
  );
};

export default Home;
/*

      <CollectionView
        sections={SECTIONS}
        renderSectionHeader={({ section }) => (
          <Text className='ml-4 text-md text-white font-regular my-4'>
            {section.title}
          </Text>
        )}
        renderItem={({ item }) => {
          return item.showInGrid ? (
            <Text>CACA</Text>
          ) : (
            <Watching
              season={item.season}
              title={item.title}
              episode={item.episode}
              progress={item.progress}
              uri={item.uri}
            />
          );
        }}
        renderSingle={({ section }) => {
          return (
            
          );
        }}
      />
  {
    title: 'For you',
    type: 'grid',
    data: [
      {
        title: 'Item text 1',
        key: '6',
        year: 2022,
        showInGrid: true,
        uri: 'https://picsum.photos/id/1011/200',
      },
      {
        title: 'Item text 2',
        key: '7',
        year: 2022,
        showInGrid: true,
        uri: 'https://picsum.photos/id/1012/200',
      },

      {
        title: 'Item text 3',
        key: '8',
        year: 2022,
        showInGrid: true,
        uri: 'https://picsum.photos/id/1013/200',
      },
      {
        title: 'Item text 4',
        key: '9',
        year: 2022,
        showInGrid: true,
        uri: 'https://picsum.photos/id/1015/200',
      },
      {
        title: 'Item text 5',
        key: '10',
        year: 2022,
        showInGrid: true,
        uri: 'https://picsum.photos/id/1016/200',
      },
    ],
  },
      */
