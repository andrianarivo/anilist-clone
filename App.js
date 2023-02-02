import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { useFonts } from '@expo-google-fonts/roboto';
import { customFontsToLoad } from '@theme/typography';
import { registerRootComponent } from 'expo';
import * as SplashScreen from 'expo-splash-screen';
import React, { useCallback } from 'react';
import App from './src/App.tsx';

SplashScreen.preventAutoHideAsync();

const client = new ApolloClient({
  uri: 'https://graphql.anilist.co',
  cache: new InMemoryCache(),
});

const AnilistApp = () => {
  const [areFontsLoaded] = useFonts(customFontsToLoad);

  const onLayoutRootView = useCallback(async () => {
    if (areFontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [areFontsLoaded]);

  if (!areFontsLoaded) {
    return null;
  }

  return (
    <ApolloProvider client={client}>
      <App onLayoutRootView={onLayoutRootView} />
    </ApolloProvider>
  );
};

registerRootComponent(AnilistApp);
export default AnilistApp;
