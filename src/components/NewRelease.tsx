import React, { useEffect, useState } from 'react';
import { Image, Text, View, ViewProps } from 'react-native';
import { Blurhash } from 'react-native-blurhash';
import Rating from './Rating';

type Props = ViewProps & {
  title: string;
  publisher: string;
  ratings: number;
  nbUsers: number;
  coverUri: string;
};

const NewRelease = ({
  title,
  publisher,
  ratings,
  nbUsers,
  coverUri,
  ...props
}: Props) => {
  const [blurhash, setBlurhash] = useState('');

  useEffect(() => {
    (async function () {
      const hash = await Blurhash.encode(coverUri, 4, 3);
      setBlurhash(hash);
    })();
  }, []);

  return (
    <View {...props} className='m-1 rounded-md overflow-hidden shadow-lg '>
      <Image
        className='h-[187]'
        resizeMode='cover'
        source={{ uri: coverUri }}
      />
      <View className='absolute w-full h-full justify-end'>
        <View className='flex-row justify-between items-end'>
          {blurhash && (
            <>
              <Blurhash
                resizeMode='cover'
                className='absolute w-full h-full'
                blurhash={blurhash}
              />
              <View className='ml-4 wrap mb-2'>
                <Text className='text-2xl text-white w-[170] font-bold'>
                  {title}
                </Text>
                <Text className='text-xs text-white'>Studio: {publisher}</Text>
              </View>
              <Rating className='mr-4 mb-2' count={ratings} nbUsers={nbUsers} />
            </>
          )}
        </View>
      </View>
    </View>
  );
};

export default NewRelease;
