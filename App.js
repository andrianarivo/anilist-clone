import { useFonts } from '@expo-google-fonts/roboto';
import { customFontsToLoad } from '@theme/typography';
import { registerRootComponent } from 'expo';
import * as SplashScreen from 'expo-splash-screen';
import React, { useCallback } from 'react';
import App from './src/App.tsx';

SplashScreen.preventAutoHideAsync();

function AnilistApp() {
  const [areFontsLoaded] = useFonts(customFontsToLoad);

  const onLayoutRootView = useCallback(async () => {
    if (areFontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [areFontsLoaded]);

  if (!areFontsLoaded) {
    return null;
  }

  return <App onLayoutRootView={onLayoutRootView} />;
}

registerRootComponent(AnilistApp);
export default AnilistApp;
