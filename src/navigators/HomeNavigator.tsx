import { NavigationContainer } from '@react-navigation/native';
import AnimeDetails from '@screens/AnimeDetails';
import Home from '@screens/Home';
import React from 'react';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';

const Stack = createSharedElementStackNavigator({
  name: 'home-navigation-stack',
});

const HomeNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName='Home'
    >
      <Stack.Screen name='Home' component={Home} />
      <Stack.Screen
        name='AnimeDetails'
        component={AnimeDetails}
        sharedElements={(route) => {
          return [`image_${route.params.anime.mediaId}`];
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
