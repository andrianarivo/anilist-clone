import NewRelease from '@/components/NewRelease';
import HorizontalList from '@components/HorizontalList';
import ListItem from '@components/ListItem';
import React from 'react';
import { Image, View } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const SECTIONS = [
  {
    title: 'Continue Watching.',
    data: [
      {
        episode: '4',
        title: 'Grappler Baki',
        uri: 'https://m.media-amazon.com/images/M/MV5BOWI2ZjAzZTktYjYxNC00NzM1LThmMzEtZTJhMjBmMGIzNzgyXkEyXkFqcGdeQXVyMTEzMTI1Mjk3._V1_FMjpg_UX1000_.jpg',
      },
      {
        episode: '2',
        title: 'Item text 2',
        uri: 'https://picsum.photos/id/10/200',
      },

      {
        episode: '3',
        title: 'Item text 3',
        uri: 'https://picsum.photos/id/1002/200',
      },
      {
        episode: '4',
        title: 'Item text 4',
        uri: 'https://picsum.photos/id/1006/200',
      },
      {
        episode: '5',
        title: 'Item text 5',
        uri: 'https://picsum.photos/id/1008/200',
      },
    ],
  },
  {
    title: 'For you',
    data: [
      {
        episode: '1',
        title: 'Item text 1',
        uri: 'https://picsum.photos/id/1011/200',
      },
      {
        episode: '2',
        title: 'Item text 2',
        uri: 'https://picsum.photos/id/1012/200',
      },

      {
        episode: '3',
        title: 'Item text 3',
        uri: 'https://picsum.photos/id/1013/200',
      },
      {
        episode: '4',
        title: 'Item text 4',
        uri: 'https://picsum.photos/id/1015/200',
      },
      {
        episode: '5',
        title: 'Item text 5',
        uri: 'https://picsum.photos/id/1016/200',
      },
    ],
  },
];

const Home = () => {
  const insets = useSafeAreaInsets();
  return (
    <View
      className='flex-1 '
      style={{
        paddingTop: insets.top,
      }}
    >
      <Text className='text-md text-white font-regular m-4'>New releases.</Text>
      <NewRelease title='Morbius' publisher='Marvel Studios' />

      <HorizontalList
        sections={SECTIONS}
        renderSectionHeader={({ section }) => (
          <Text className='text-md text-white font-regular my-4'>
            {section.title}
          </Text>
        )}
        renderItem={({ item }) => {
          return (
            <View className='mx-2'>
              <Card className='overflow-hidden w-[162] h-[124]'>
                <Card.Cover source={{ uri: item.uri }} />
              </Card>
              <View>
                <Text className='font-bold text-md text-white'>
                  {item.title}
                </Text>
                <Text className='font-sm text-neutral500'>
                  Episode {item.episode}
                </Text>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default Home;
