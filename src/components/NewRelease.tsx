import React from 'react';
import { Text, View, ViewProps } from 'react-native';
import { Card } from 'react-native-paper';
import Rating from './Rating';

type Props = ViewProps & {
  title: string;
  publisher: string;
};

const NewRelease = ({ title, publisher, ...props }: Props) => {
  return (
    <Card {...props} className='mx-4'>
      <Card.Cover source={require('assets/images/movie1.png')} />
      <Card.Content className='absolute w-screen'>
        <View className='flex-row justify-between items-end left-2 top-32 w-11/12'>
          <View>
            <Text className='text-2xl text-white font-bold'>{title}</Text>
            <Text className='text-xs text-neutral500'>{publisher}</Text>
          </View>
          <Rating className='mr-4' count={5} nbUsers={348} />
        </View>
      </Card.Content>
    </Card>
  );
};

export default NewRelease;
