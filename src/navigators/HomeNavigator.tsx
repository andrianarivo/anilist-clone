import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AnimeDetails from '@screens/AnimeDetails';
import Home from '@screens/Home';
import React from 'react';

export type RootStackParamList = {
  Home: undefined;
  AnimeDetails: { anime: { mediaId: string; imgSource: string } };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const HomeNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName='Home'
    >
      <Stack.Screen name='Home' component={Home} />
      <Stack.Screen name='AnimeDetails' component={AnimeDetails} />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
